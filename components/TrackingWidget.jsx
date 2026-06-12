"use client";
/**
 * SAFunded — Kunden-Live-Tracking-Widget
 * =======================================
 * Zeigt einem eingeloggten Kunden sein Konto live: Equity, Status,
 * Verlust-Puffer (Tag/Gesamt), Payout-Fortschritt und Regel-Events.
 *
 * Verwendung:   <TrackingWidget token={account.tracking_token} />
 * Datenquelle:  /api/tracking/<token>  (Netlify-Proxy -> Tracking-API)
 *
 * Bewusst self-contained (Inline-Styles, keine Abhaengigkeiten),
 * damit es ohne Anpassungen in das bestehende Next.js-Projekt passt.
 */

import { useEffect, useState } from "react";

const C = {
  navyDeep: "#070B16",
  navy: "#0A0F1E",
  surface: "#101729",
  line: "#1c2740",
  ink: "#EDF1F7",
  muted: "#8b96ad",
  emerald: "#2DD4A7",
  gold: "#CBA35C",
  red: "#e2556a",
};
const mono = "ui-monospace,'SF Mono',Menlo,Consolas,monospace";

const fmt = (n) =>
  n == null
    ? "–"
    : Number(n).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const STATUS_LABEL = {
  ACTIVE: { txt: "Aktiv", col: C.emerald },
  PENDING_SETUP: { txt: "Wird eingerichtet", col: C.gold },
  PASSED: { txt: "Bestanden", col: C.gold },
  FAILED_DAILY_LOSS: { txt: "Beendet · Tagesverlust-Limit", col: C.red },
  FAILED_MAX_LOSS: { txt: "Beendet · Gesamtverlust-Limit", col: C.red },
  FAILED_RULE_VIOLATION: { txt: "Beendet · Regelverstoß", col: C.red },
  UNDER_REVIEW: { txt: "In Prüfung", col: C.gold },
  DISABLED: { txt: "Deaktiviert", col: C.muted },
};

const EVENT_LABEL = {
  DAILY_LOSS: "Tagesverlust-Limit überschritten",
  MAX_LOSS: "Gesamtverlust-Limit überschritten",
  PROFIT_TARGET: "Profit-Ziel erreicht",
};

function Bar({ label, buffer, maxBuffer, limit }) {
  if (buffer == null) return null;
  const pct = Math.max(0, Math.min(100, (buffer / maxBuffer) * 100));
  const col = pct < 20 ? C.red : pct < 45 ? C.gold : C.emerald;
  return (
    <div style={{ marginBottom: 12 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
          color: C.muted,
          marginBottom: 4,
        }}
      >
        <span>
          {label} · Limit {fmt(limit)} €
        </span>
        <b style={{ color: C.ink, fontFamily: mono }}>{fmt(buffer)} € Puffer</b>
      </div>
      <div style={{ height: 8, borderRadius: 99, background: C.surface, overflow: "hidden" }}>
        <div
          style={{
            width: pct + "%",
            height: "100%",
            borderRadius: 99,
            background: col,
            transition: "width .6s ease, background .6s",
          }}
        />
      </div>
    </div>
  );
}

function Pill({ value, label }) {
  return (
    <div
      style={{
        flex: 1,
        background: C.surface,
        border: `1px solid ${C.line}`,
        borderRadius: 10,
        padding: "10px 8px",
        textAlign: "center",
      }}
    >
      <b style={{ fontFamily: mono, fontSize: 18, display: "block", color: C.ink }}>{value}</b>
      <span
        style={{
          fontSize: 10.5,
          color: C.muted,
          textTransform: "uppercase",
          letterSpacing: ".05em",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function TrackingWidget({ token }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!token) return;
    let alive = true;
    const load = async () => {
      try {
        const r = await fetch(`/api/tracking/${token}`, { cache: "no-store" });
        if (!r.ok) throw new Error();
        const json = await r.json();
        if (alive) {
          setData(json);
          setError(false);
        }
      } catch {
        if (alive) setError(true);
      }
    };
    load();
    const t = setInterval(load, 1000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, [token]);

  if (!token) return null;

  const box = {
    background: C.navy,
    border: `1px solid ${C.line}`,
    borderRadius: 16,
    padding: 22,
    color: C.ink,
    fontFamily: "'Poppins',sans-serif",
    maxWidth: 720,
  };

  if (error && !data)
    return (
      <div style={box}>
        <span style={{ color: C.muted, fontSize: 14 }}>
          Live-Daten sind gerade nicht erreichbar – bitte später erneut versuchen.
        </span>
      </div>
    );
  if (!data)
    return (
      <div style={box}>
        <span style={{ color: C.muted, fontSize: 14 }}>Lade Live-Daten …</span>
      </div>
    );

  const st = STATUS_LABEL[data.status] || { txt: data.status, col: C.muted };
  const r = data.rules || {};
  const p = data.progress || {};
  const maxDaily = r.day_start_equity != null ? r.day_start_equity - r.daily_loss_limit : 1;
  const maxOverall = data.account_size * 0.1;
  const sizeLabel =
    data.account_size >= 1e6
      ? data.account_size / 1e6 + "M"
      : Math.round(data.account_size / 1000) + "K";

  return (
    <div style={box}>
      {/* Kopf */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.05 }}>{sizeLabel}</div>
          <div
            style={{
              color: C.gold,
              fontSize: 11.5,
              fontWeight: 600,
              letterSpacing: ".05em",
              textTransform: "uppercase",
            }}
          >
            {data.challenge_type}
          </div>
        </div>
        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <div style={{ fontFamily: mono, fontSize: 26, fontWeight: 600 }}>
            {fmt(data.equity)} €
          </div>
          <div
            style={{
              fontFamily: mono,
              fontSize: 12,
              color: (data.floating_pnl ?? 0) >= 0 ? C.emerald : C.red,
            }}
          >
            {(data.floating_pnl ?? 0) >= 0 ? "+" : ""}
            {fmt(data.floating_pnl)} € · {data.open_positions} Position
            {data.open_positions === 1 ? "" : "en"}
          </div>
        </div>
      </div>

      {/* Status */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <span
          style={{
            fontSize: 11.5,
            fontWeight: 600,
            letterSpacing: ".04em",
            padding: "4px 11px",
            borderRadius: 99,
            border: `1px solid ${st.col}`,
            color: st.col,
          }}
        >
          {st.txt}
        </span>
        {!data.live_data && (
          <span style={{ fontSize: 11.5, color: C.gold }}>
            Live-Daten momentan verzögert – Anzeige aktualisiert sich automatisch.
          </span>
        )}
      </div>

      {/* Puffer-Balken */}
      {r.daily_buffer != null && (
        <>
          <Bar
            label="Tagesverlust"
            buffer={r.daily_buffer}
            maxBuffer={maxDaily}
            limit={r.daily_loss_limit}
          />
          <Bar
            label="Gesamtverlust"
            buffer={r.overall_buffer}
            maxBuffer={maxOverall}
            limit={r.overall_loss_limit}
          />
        </>
      )}

      {/* Payout-Fortschritt */}
      <div
        style={{
          color: C.gold,
          fontSize: 11.5,
          fontWeight: 600,
          letterSpacing: ".1em",
          textTransform: "uppercase",
          margin: "18px 0 10px",
        }}
      >
        Auszahlungs-Fortschritt
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <Pill value={`${p.age_days ?? 0} / ${p.min_days_required ?? 14}`} label="Tage aktiv" />
        <Pill
          value={`${p.profitable_days ?? 0} / ${p.profitable_days_required ?? 3}`}
          label="Profitable Tage"
        />
        <Pill value={p.trading_days ?? 0} label="Handelstage" />
      </div>
      <div
        style={{
          marginTop: 12,
          padding: 10,
          borderRadius: 10,
          textAlign: "center",
          fontWeight: 600,
          fontSize: 13,
          background: p.payout_ready ? "rgba(45,212,167,.12)" : C.surface,
          color: p.payout_ready ? C.emerald : C.muted,
          border: `1px solid ${p.payout_ready ? C.emerald : C.line}`,
        }}
      >
        {p.payout_ready
          ? "✓ Auszahlungs-Bedingungen erfüllt – Auszahlung kann beantragt werden"
          : "Auszahlungs-Bedingungen noch nicht erfüllt"}
      </div>

      {/* Regel-Events */}
      {data.events?.length > 0 && (
        <>
          <div
            style={{
              color: C.gold,
              fontSize: 11.5,
              fontWeight: 600,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              margin: "18px 0 10px",
            }}
          >
            Regel-Ereignisse
          </div>
          {data.events.map((e, i) => (
            <div
              key={i}
              style={{
                borderLeft: `2px solid ${e.rule_code === "PROFIT_TARGET" ? C.gold : C.red}`,
                background: C.surface,
                borderRadius: "0 8px 8px 0",
                padding: "8px 12px",
                marginBottom: 8,
              }}
            >
              <div style={{ fontFamily: mono, fontSize: 11, color: C.muted }}>
                {new Date(e.occurred_at).toLocaleString("de-DE")}
              </div>
              <div style={{ fontSize: 12.5, marginTop: 2 }}>
                {EVENT_LABEL[e.rule_code] || e.rule_code} · Equity {fmt(e.equity)} € (Limit{" "}
                {fmt(e.threshold)} €)
              </div>
            </div>
          ))}
        </>
      )}

      <div style={{ marginTop: 14, fontSize: 10.5, color: C.muted }}>
        Simuliertes Handelskonto. Alle Angaben ohne Gewähr · Aktualisierung automatisch jede
        Sekunde.
      </div>
    </div>
  );
}
