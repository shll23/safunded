-- =====================================================================
-- SAFunded · Clickwrap-Zustimmung (Weg 1)
-- Append-only Audit-Tabelle fuer die Vertragszustimmung des Kunden.
-- In Supabase SQL Editor ausfuehren (Projekt ttlbfpmfngahrcgavdcp).
-- =====================================================================

create table if not exists public.agreement_acceptances (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid not null references auth.users (id) on delete cascade,
  email             text not null,
  agreement_type    text not null default 'customer_agreement',
  agreement_version text not null,            -- z. B. '1.0'
  agreement_sha256  text not null,            -- Hash des exakt gehosteten PDFs
  accepted_at       timestamptz not null default now(),
  ip                text,                     -- Client-IP zum Zeitpunkt der Zustimmung
  user_agent        text,
  pdf_url           text
);

-- Eine Zustimmung pro User + Vertragstyp + Version (macht das Schreiben idempotent)
create unique index if not exists agreement_acceptances_user_version_uniq
  on public.agreement_acceptances (user_id, agreement_type, agreement_version);

create index if not exists agreement_acceptances_user_idx
  on public.agreement_acceptances (user_id);

-- RLS: Nutzer duerfen NUR ihre eigenen Zustimmungen lesen.
-- Es gibt bewusst KEINE insert/update/delete-Policy fuer normale Nutzer,
-- d. h. nur der Service-Role-Key (umgeht RLS) darf schreiben. So bleibt die
-- Tabelle ein unveraenderliches Beweis-Log (append-only).
alter table public.agreement_acceptances enable row level security;

drop policy if exists "read own acceptances" on public.agreement_acceptances;
create policy "read own acceptances"
  on public.agreement_acceptances
  for select
  using (auth.uid() = user_id);
