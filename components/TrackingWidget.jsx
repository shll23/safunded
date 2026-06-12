"use client";
/**
 * SAFunded — Kunden-Live-Tracking-Widget v3
 * ==========================================
 * Neu in v3:
 *  - Volle Breite + responsives Layout (Mobil & Desktop)
 *  - Trading-Journal: Monatskalender mit Tages-PnL und Trade-Anzahl
 *  - Handelshistorie mit "Mehr anzeigen" (alle Trades abrufbar)
 * Live-Daten weiterhin jede Sekunde, Statistik minütlich.
 */

import { useEffect, useMemo, useState } from "react";

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
const fmt0 = (n) =>
  n == null ? "–" : Number(n).toLocaleString("de-DE", { maximumFractionDigits: 0 });

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

const MONTHS = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];
const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

const SectionTitle = ({ children }) => (
  <div
    style={{
      color: C.gold,
      fontSize: 11.5,
      fontWeight: 600,
      letterSpacing: ".1em",
      textTransform: "uppercase",
      margin: "20px 0 10px",
    }}
  >
    {children}
  </div>
);

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
          flexWrap: "wrap",
          gap: 4,
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
        background: C.surface,
        border: `1px solid ${C.line}`,
        borderRadius: 10,
        padding: "12px 8px",
        textAlign: "center",
      }}
    >
      <b style={{ fontFamily: mono, fontSize: 17, display: "block", color: C.ink }}>{value}</b>
      <span
        style={{
          fontSize: 10,
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

/** Grid, das sich automatisch an die Breite anpasst (Desktop mehrspaltig, mobil 2 Spalten). */
const autoGrid = (min) => ({
  display: "grid",
  gridTemplateColumns: `repeat(auto-fit, minmax(${min}px, 1fr))`,
  gap: 10,
});

/** Equity-Kurve als pures SVG. */
function EquityChart({ curve, accountSize }) {
  if (!curve || curve.length < 2) return null;
  const W = 1000;
  const H = 180;
  const PAD = 6;
  const xs = curve.map((p) => p[0]);
  const ys = curve.map((p) => p[1]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys, accountSize);
  const maxY = Math.max(...ys, accountSize);
  const spanY = maxY - minY || 1;
  const X = (t) => PAD + ((t - minX) / (maxX - minX || 1)) * (W - 2 * PAD);
  const Y = (v) => H - PAD - ((v - minY) / spanY) * (H - 2 * PAD);

  const line = curve
    .map((p, i) => `${i ? "L" : "M"}${X(p[0]).toFixed(1)},${Y(p[1]).toFixed(1)}`)
    .join("");
  const area = `${line}L${X(maxX).toFixed(1)},${H - PAD}L${X(minX).toFixed(1)},${H - PAD}Z`;
  const up = ys[ys.length - 1] >= ys[0];
  const col = up ? C.emerald : C.red;
  const baseY = Y(accountSize);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 11,
          color: C.muted,
          fontFamily: mono,
          marginBottom: 4,
        }}
      >
        <span>Hoch {fmt(maxY)} €</span>
        <span>Tief {fmt(minY)} €</span>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        style={{ width: "100%", height: 180, display: "block" }}
      >
        <path d={area} fill={col} opacity="0.12" />
        {baseY > PAD && baseY < H - PAD && (
          <line
            x1={PAD}
            x2={W - PAD}
            y1={baseY}
            y2={baseY}
            stroke={C.muted}
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.5"
          />
        )}
        <path d={line} fill="none" stroke={col} strokeWidth="2" />
      </svg>
      <div style={{ fontSize: 10.5, color: C.muted, marginTop: 2 }}>
        Equity-Verlauf · letzte 14 Tage · gestrichelt = Account-Größe
      </div>
    </div>
  );
}

/** Trading-Journal: Monatskalender mit Tages-PnL (Stil FTMO Daily PnL). */
function JournalCalendar({ daily }) {
  const byDay = useMemo(() => {
    const m = {};
    (daily || []).forEach((d) => {
      m[d.day] = d;
    });
    return m;
  }, [daily]);

  const now = new Date();
  const [view, setView] = useState({ y: now.getFullYear(), m: now.getMonth() });

  const first = new Date(view.y, view.m, 1);
  const startOffset = (first.getDay() + 6) % 7; // Montag = 0
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const monthSum = Object.values(byDay)
    .filter((d) => {
      const dt = new Date(d.day);
      return dt.getFullYear() === view.y && dt.getMonth() === view.m;
    })
    .reduce(
      (acc, d) => ({ result: acc.result + d.result, trades: acc.trades + d.trades }),
      { result: 0, trades: 0 }
    );

  const nav = (dir) =>
    setView(({ y, m }) => {
      const d = new Date(y, m + dir, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });

  const navBtn = {
    background: C.surface,
    border: `1px solid ${C.line}`,
    color: C.ink,
    borderRadius: 8,
    width: 30,
    height: 30,
    cursor: "pointer",
    fontSize: 14,
    lineHeight: "26px",
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 10,
          flexWrap: "wrap",
        }}
      >
        <button style={navBtn} onClick={() => nav(-1)} aria-label="Vorheriger Monat">
          ‹
        </button>
        <b style={{ fontSize: 14, minWidth: 130 }}>
          {MONTHS[view.m]} {view.y}
        </b>
        <button style={navBtn} onClick={() => nav(1)} aria-label="Nächster Monat">
          ›
        </button>
        <span style={{ marginLeft: "auto", fontSize: 12, color: C.muted }}>
          Monat:{" "}
          <b
            style={{
              fontFamily: mono,
              color: monthSum.result >= 0 ? C.emerald : C.red,
            }}
          >
            {monthSum.result >= 0 ? "+" : ""}
            {fmt(monthSum.result)} €
          </b>{" "}
          · {monthSum.trades} Trades
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 4,
        }}
      >
        {WEEKDAYS.map((w) => (
          <div
            key={w}
            style={{
              textAlign: "center",
              fontSize: 10,
              color: C.muted,
              textTransform: "uppercase",
              letterSpacing: ".05em",
              padding: "2px 0",
            }}
          >
            {w}
          </div>
        ))}
        {cells.map((d, i) => {
          if (d == null)
            return <div key={i} style={{ minHeight: 52 }} />;
          const key = `${view.y}-${String(view.m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
          const e = byDay[key];
          const bg = e
            ? e.result >= 0
              ? "rgba(45,212,167,.13)"
              : "rgba(226,85,106,.13)"
            : C.surface;
          const bd = e ? (e.result >= 0 ? C.emerald : C.red) : C.line;
          return (
            <div
              key={i}
              style={{
                minHeight: 52,
                background: bg,
                border: `1px solid ${bd}`,
                borderRadius: 8,
                padding: "4px 5px",
                overflow: "hidden",
              }}
            >
              <div style={{ fontSize: 10, color: C.muted }}>{d}</div>
              {e && (
                <>
                  <div
                    style={{
                      fontFamily: mono,
                      fontSize: 10.5,
                      fontWeight: 700,
                      color: e.result >= 0 ? C.emerald : C.red,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {e.result >= 0 ? "+" : ""}
                    {fmt0(e.result)} €
                  </div>
                  <div style={{ fontSize: 9.5, color: C.muted }}>{e.trades} Tr.</div>
                </>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ fontSize: 10.5, color: C.muted, marginTop: 4 }}>
        Trading-Journal · realisiertes Tagesergebnis (Zeitzone Europe/Berlin)
      </div>
    </div>
  );
}

export default function TrackingWidget({ token }) {
  const [data, setData] = useState(null);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(false);
  const [shownTrades, setShownTrades] = useState(10);

  // Live-Daten: jede Sekunde
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

  // Statistik: einmal pro Minute
  useEffect(() => {
    if (!token) return;
    let alive = true;
    const load = async () => {
      try {
        const r = await fetch(`/api/tracking/${token}/stats`, { cache: "no-store" });
        if (!r.ok) throw new Error();
        const json = await r.json();
        if (alive) setStats(json);
      } catch {
        /* Statistik ist optional */
      }
    };
    load();
    const t = setInterval(load, 60000);
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
    padding: "clamp(14px, 3vw, 26px)",
    color: C.ink,
    fontFamily: "'Poppins',sans-serif",
    width: "100%",
    boxSizing: "border-box",
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
  const s = stats?.stats;
  const allTrades = stats?.trades || [];
  const maxDaily = r.day_start_equity != null ? r.day_start_equity - r.daily_loss_limit : 1;
  const maxOverall = data.account_size * 0.1;
  const sizeLabel =
    data.account_size >= 1e6
      ? data.account_size / 1e6 + "M"
      : Math.round(data.account_size / 1000) + "K";

  return (
    <div style={box}>
      {/* Kopf */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 14,
          marginBottom: 18,
          flexWrap: "wrap",
        }}
      >
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
          <div
            style={{
              fontFamily: mono,
              fontSize: "clamp(20px, 4vw, 28px)",
              fontWeight: 600,
            }}
          >
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 18,
          flexWrap: "wrap",
        }}
      >
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

      {/* Equity-Kurve */}
      {stats?.equity_curve?.length > 1 && (
        <>
          <SectionTitle>Equity-Verlauf</SectionTitle>
          <EquityChart curve={stats.equity_curve} accountSize={data.account_size} />
        </>
      )}

      {/* Handelsstatistik */}
      {s && s.trades > 0 && (
        <>
          <SectionTitle>Statistik</SectionTitle>
          <div style={autoGrid(150)}>
            <Pill value={s.win_rate != null ? fmt(s.win_rate) + " %" : "–"} label="Winrate" />
            <Pill value={s.trades} label="Trades" />
            <Pill value={fmt(s.total_lots)} label="Lots" />
            <Pill
              value={s.profit_factor != null ? fmt(s.profit_factor) : "–"}
              label="Profit Factor"
            />
            <Pill value={s.avg_win != null ? fmt(s.avg_win) + " €" : "–"} label="Ø Gewinn" />
            <Pill value={s.avg_loss != null ? fmt(s.avg_loss) + " €" : "–"} label="Ø Verlust" />
            <Pill
              value={s.expectancy != null ? fmt(s.expectancy) + " €" : "–"}
              label="Erwartung/Trade"
            />
            <Pill
              value={s.net_total != null ? fmt(s.net_total) + " €" : "–"}
              label="Gesamt realisiert"
            />
          </div>
        </>
      )}

      {/* Trading-Journal (Kalender) */}
      {stats?.daily?.length > 0 && (
        <>
          <SectionTitle>Trading-Journal</SectionTitle>
          <JournalCalendar daily={stats.daily} />
        </>
      )}

      {/* Handelshistorie */}
      {allTrades.length > 0 && (
        <>
          <SectionTitle>Handelshistorie</SectionTitle>
          <div style={{ fontSize: 12.5 }}>
            {allTrades.slice(0, shownTrades).map((t, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: C.surface,
                  border: `1px solid ${C.line}`,
                  borderRadius: 8,
                  padding: "7px 10px",
                  marginBottom: 6,
                  flexWrap: "wrap",
                }}
              >
                <b style={{ fontFamily: mono, minWidth: 70 }}>{t.symbol || "—"}</b>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: ".05em",
                    padding: "2px 7px",
                    borderRadius: 99,
                    border: `1px solid ${t.direction === "LONG" ? C.emerald : C.red}`,
                    color: t.direction === "LONG" ? C.emerald : C.red,
                  }}
                >
                  {t.direction}
                </span>
                <span style={{ fontFamily: mono, color: C.muted, fontSize: 11.5 }}>
                  {fmt(t.volume)} Lot
                </span>
                <span
                  style={{
                    marginLeft: "auto",
                    fontFamily: mono,
                    color: C.muted,
                    fontSize: 11,
                  }}
                >
                  {new Date(t.closed_at).toLocaleString("de-DE", {
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <b
                  style={{
                    fontFamily: mono,
                    minWidth: 90,
                    textAlign: "right",
                    color: t.net_profit >= 0 ? C.emerald : C.red,
                  }}
                >
                  {t.net_profit >= 0 ? "+" : ""}
                  {fmt(t.net_profit)} €
                </b>
              </div>
            ))}
          </div>
          {allTrades.length > shownTrades && (
            <button
              onClick={() => setShownTrades((n) => n + 25)}
              style={{
                width: "100%",
                background: C.surface,
                border: `1px solid ${C.line}`,
                color: C.ink,
                borderRadius: 10,
                padding: "10px 0",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Poppins',sans-serif",
              }}
            >
              Mehr anzeigen ({allTrades.length - shownTrades} weitere)
            </button>
          )}
          {shownTrades > 10 && allTrades.length <= shownTrades && (
            <button
              onClick={() => setShownTrades(10)}
              style={{
                width: "100%",
                background: "transparent",
                border: `1px solid ${C.line}`,
                color: C.muted,
                borderRadius: 10,
                padding: "8px 0",
                fontSize: 12,
                cursor: "pointer",
                fontFamily: "'Poppins',sans-serif",
              }}
            >
              Weniger anzeigen
            </button>
          )}
        </>
      )}

      {/* Auszahlungs-Fortschritt */}
      <SectionTitle>Auszahlungs-Fortschritt</SectionTitle>
      <div style={autoGrid(150)}>
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
          <SectionTitle>Regel-Ereignisse</SectionTitle>
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
        Simuliertes Handelskonto. Alle Angaben ohne Gewähr · Live-Daten jede Sekunde, Statistik
        minütlich aktualisiert.
      </div>
    </div>
  );
}
