import { NextResponse } from "next/server";
import { SUPPORT_KB } from "@/lib/support-kb";

/**
 * POST /api/support
 *
 * Stateless support assistant. Takes the user's question plus a short context
 * window (the last ~6 messages) and asks Claude Haiku to answer STRICTLY from
 * the curated knowledge base (lib/support-kb.ts). The model must reply with
 * pure JSON:
 *   { "needs_human": true }
 *   { "needs_human": false, "answer": "..." }
 *
 * Anything not unambiguously covered by the KB — and anything account-specific
 * (account status, a concrete payment/payout, KYC, blocks, complaints,
 * refunds, account actions) — yields needs_human:true, which the widget turns
 * into the contact form.
 *
 * The handler is fail-safe: a missing API key, an API error, a non-JSON reply
 * or a missing field all degrade to { needs_human: true }. It never crashes
 * and never returns unvetted model text to the customer.
 *
 * ENV (server-side only):
 *   ANTHROPIC_API_KEY  (required — without it the bot falls back to the form)
 *   SUPPORT_MODEL      (optional, default "claude-haiku-4-5")
 */

export const runtime = "nodejs";

const ANTHROPIC_ENDPOINT = "https://api.anthropic.com/v1/messages";
const DEFAULT_MODEL = "claude-haiku-4-5";
const MAX_CONTEXT_MESSAGES = 6;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `Du bist der Support-Assistent von SAFunded. Beantworte Fragen AUSSCHLIESSLICH anhand des folgenden WISSENS. Steht die Antwort nicht eindeutig drin, RATE NICHT und erfinde nichts — gib dann exakt {"needs_human": true} zurück. Geht es um ein konkretes Konto, eine Zahlung/Auszahlung, KYC, Sperre, Beschwerde, Rückerstattung oder eine Aktion am Konto → immer {"needs_human": true} (du hast keinen Zugriff auf Kundendaten). Keine Finanz-/Trading-Beratung, keine Versprechen, keine Regeln/Fristen erfinden. Sonst antworte knapp und freundlich in der Sprache des Kunden (DE/EN) und gib {"needs_human": false, "answer": "..."} zurück. Antworte NUR mit gültigem JSON, ohne Markdown, ohne weiteren Text. WISSEN: ${SUPPORT_KB}`;

/** The fail-safe response: hand the customer over to a human. */
function handoff() {
  return NextResponse.json({ needs_human: true });
}

/** Coerces arbitrary message input into a clean, role-tagged history. */
function sanitizeMessages(input: unknown): ChatMessage[] {
  if (!Array.isArray(input)) return [];
  const cleaned: ChatMessage[] = [];
  for (const m of input) {
    if (!m || typeof m !== "object") continue;
    const role = (m as { role?: unknown }).role;
    const content = (m as { content?: unknown }).content;
    if ((role === "user" || role === "assistant") && typeof content === "string") {
      const text = content.trim();
      if (text) cleaned.push({ role, content: text.slice(0, 2000) });
    }
  }
  // Keep only the last few turns and make sure the history starts with a user
  // turn (the Anthropic API requires the first message to be from the user).
  const tail = cleaned.slice(-MAX_CONTEXT_MESSAGES);
  while (tail.length && tail[0].role !== "user") tail.shift();
  return tail;
}

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  // No key configured → never crash, just route to a human.
  if (!apiKey) return handoff();

  let body: { message?: unknown; messages?: unknown };
  try {
    body = await req.json();
  } catch {
    return handoff();
  }

  const question =
    typeof body.message === "string" ? body.message.trim().slice(0, 2000) : "";
  if (!question) return handoff();

  // Prior context (last ~6 messages), then the new question as the final turn.
  const history = sanitizeMessages(body.messages);
  const messages: ChatMessage[] = [...history];
  if (messages.length && messages[messages.length - 1].content === question) {
    // The client already appended the new question — don't duplicate it.
  } else {
    messages.push({ role: "user", content: question });
  }
  if (!messages.length) messages.push({ role: "user", content: question });

  const model = process.env.SUPPORT_MODEL || DEFAULT_MODEL;

  let res: Response;
  try {
    res = await fetch(ANTHROPIC_ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: 400,
        temperature: 0,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });
  } catch (err) {
    console.error("[support] Anthropic request failed:", err);
    return handoff();
  }

  if (!res.ok) {
    console.error(`[support] Anthropic API returned ${res.status}`);
    return handoff();
  }

  let raw: string;
  try {
    const data = (await res.json()) as {
      content?: Array<{ type?: string; text?: string }>;
    };
    raw = (data.content ?? [])
      .filter((b) => b?.type === "text" && typeof b.text === "string")
      .map((b) => b.text as string)
      .join("")
      .trim();
  } catch (err) {
    console.error("[support] Could not read Anthropic response:", err);
    return handoff();
  }

  if (!raw) return handoff();

  // Parse the model's JSON. Tolerate a stray code-fence just in case.
  let parsed: { needs_human?: unknown; answer?: unknown };
  try {
    const jsonText = raw
      .replace(/^```(?:json)?/i, "")
      .replace(/```$/i, "")
      .trim();
    parsed = JSON.parse(jsonText);
  } catch {
    console.error("[support] Model reply was not valid JSON; routing to human.");
    return handoff();
  }

  // Only return an answer when the model explicitly cleared it and gave text.
  if (parsed.needs_human === false && typeof parsed.answer === "string") {
    const answer = parsed.answer.trim();
    if (answer) return NextResponse.json({ needs_human: false, answer });
  }

  return handoff();
}
