-- ─────────────────────────────────────────────────────────────────────────────
-- Table for interview booking requests (the Careers / Hiring card on /schedule,
-- posted through /api/interview).
--
-- Purely additive: creates a new table, indexes and an RLS policy. Drops nothing.
-- Run in Supabase Dashboard → SQL Editor.
--
-- Until this runs, /api/interview still works exactly as before: the candidate
-- gets through and the team email is sent — only the dashboard row is skipped
-- (logged as a warning). Running this makes the Interviews tab populate.
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.interview_requests (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),

  -- Submitted by the candidate
  name        text not null,
  email       text not null,
  phone       text not null,
  position    text not null,
  linkedin    text,
  tz          text not null,
  preferred   text,
  notes       text,
  has_resume  boolean not null default false,

  -- Captured automatically
  ip          text,

  -- Team workflow
  status      text not null default 'new',
  admin_notes text
);

create index if not exists interview_requests_created_at_idx on public.interview_requests (created_at desc);
create index if not exists interview_requests_status_idx     on public.interview_requests (status);

-- The API route uses the service-role key, which bypasses RLS, so enabling
-- this blocks anon/public access without affecting the route.
alter table public.interview_requests enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'interview_requests'
      and policyname = 'service_role_full_access'
  ) then
    create policy service_role_full_access on public.interview_requests
      for all to service_role using (true) with check (true);
  end if;
end $$;
