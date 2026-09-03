-- ---------------------------------------------------------------------------
-- Contact enquiries captured by the portfolio form.
-- Run this in the Supabase SQL editor (Dashboard → SQL → New query).
-- ---------------------------------------------------------------------------

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text        not null check (char_length(name) between 2 and 120),
  email       text        not null check (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$'),
  company     text,
  budget      text,
  service     text,
  message     text        not null check (char_length(message) between 12 and 4000),
  source      text        not null default 'portfolio-contact-form',
  user_agent  text,
  status      text        not null default 'new'
              check (status in ('new', 'contacted', 'qualified', 'archived'))
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx     on public.leads (status);

-- ---------------------------------------------------------------------------
-- Row Level Security.
--
-- No policies are created for anon/authenticated, so the public anon key can
-- neither read nor write this table. Inserts happen server-side in
-- app/api/contact/route.ts using the service role key, which bypasses RLS.
-- Read your leads in the Supabase dashboard, or add an authenticated-admin
-- policy below when you build an internal panel.
-- ---------------------------------------------------------------------------

alter table public.leads enable row level security;

-- Optional: uncomment once you have an authenticated admin user.
-- create policy "admins read leads"
--   on public.leads for select
--   to authenticated
--   using (auth.jwt() ->> 'email' = 'yacine.belkhouche23@gmail.com');
