-- ─────────────────────────────────────────────────────────────────────────────
-- Table for homepage lead-capture forms (/api/lead)
--
-- Purely additive: creates a new table, indexes and an RLS policy. Drops nothing.
-- Run in Supabase Dashboard → SQL Editor.
--
-- Until this runs, /api/lead still works: the notification email is sent and
-- only the database insert is skipped (logged as a warning, never shown to the
-- visitor). Running this turns on persistence.
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),

  -- Submitted by the visitor
  name        text not null,
  business    text,
  phone       text not null,
  email       text not null,
  industry    text not null,

  -- Which form it came from: 'hero' or 'contact'
  source      text not null default 'contact',

  -- Captured automatically
  ip          text,
  user_agent  text,
  referer     text,

  -- Team workflow
  status      text not null default 'new',
  notes       text
);

-- Added for the V2 audit form, which asks two extra qualifying questions.
-- Additive and safe to run on an existing leads table.
alter table public.leads add column if not exists market    text;
alter table public.leads add column if not exists challenge text;

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx     on public.leads (status);
create index if not exists leads_email_idx      on public.leads (email);

-- Lock the table down. The API route uses the service-role key, which bypasses
-- RLS, so enabling this blocks anon/public access without affecting the route.
alter table public.leads enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'leads' and policyname = 'service_role_full_access'
  ) then
    create policy service_role_full_access on public.leads
      for all to service_role using (true) with check (true);
  end if;
end $$;
