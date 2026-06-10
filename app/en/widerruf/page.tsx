import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import {
  WIDERRUF_BLOCKS_EN,
  WIDERRUF_META_EN,
  type WiderrufBlock,
} from "@/lib/widerruf";
import { legalAlternates } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Right of Withdrawal — SAFunded",
  alternates: legalAlternates("widerruf"),
};

/** Renders a single content block in the shared legal dark theme. */
function Block({ block }: { block: WiderrufBlock }) {
  switch (block.t) {
    case "note":
      return (
        <p className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm leading-7 text-faint">
          {block.text}
        </p>
      );
    case "hr":
      return <hr className="my-10 border-white/[0.08]" />;
    case "h2":
      return (
        <h2 className="mt-12 font-display text-xl font-semibold tracking-tight text-white">
          {block.text}
        </h2>
      );
    case "p":
      return <p className="mt-4 text-[15px] leading-7 text-muted">{block.text}</p>;
    case "lines":
      return (
        <p className="mt-4 text-[15px] leading-7 text-white">
          {block.lines.map((line, i) => (
            <span key={i}>
              {line}
              {i < block.lines.length - 1 && <br />}
            </span>
          ))}
        </p>
      );
    case "ol":
      return (
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-[15px] leading-7 text-muted marker:text-faint">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      );
    case "blank":
      return (
        <p className="mt-4 select-none font-mono text-[15px] leading-7 text-faint">
          ___________________________________________
        </p>
      );
    case "fields":
      return (
        <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-7 text-muted marker:text-faint">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "footer":
      return (
        <p className="mt-4 text-sm italic leading-7 text-faint">{block.text}</p>
      );
  }
}

export default function WiderrufEnPage() {
  return (
    <LegalShell title="Right of Withdrawal" lang="en" showAsOf={false}>
      {/* Operator / imprint header */}
      <dl className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
        {WIDERRUF_META_EN.map((m) => (
          <div
            key={m.label}
            className="flex flex-col gap-0.5 py-1.5 sm:flex-row sm:gap-3"
          >
            <dt className="shrink-0 text-sm font-semibold text-white sm:w-40">
              {m.label}
            </dt>
            <dd className="text-[15px] leading-7 text-muted">{m.value}</dd>
          </div>
        ))}
      </dl>

      {WIDERRUF_BLOCKS_EN.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </LegalShell>
  );
}
