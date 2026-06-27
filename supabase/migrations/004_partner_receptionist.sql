alter table public.users drop constraint if exists users_role_check;
alter table public.users add constraint users_role_check check (role in ('candidate','employer','partner','admin'));

create table if not exists public.partner_profiles (
  user_id uuid primary key references public.users(id),
  name text,
  company text,
  website text,
  proposal text,
  phone text,
  status text not null default 'NEW_PARTNER' check(status in ('NEW_PARTNER','PARTNER_REVIEW','CONTACTED','ACTIVE','DECLINED','CLOSED')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.partner_profiles enable row level security;

drop policy if exists "read own partner profile" on public.partner_profiles;
create policy "read own partner profile" on public.partner_profiles for select using(auth.uid()=user_id);

drop policy if exists "update own partner profile" on public.partner_profiles;
create policy "update own partner profile" on public.partner_profiles for update using(auth.uid()=user_id) with check(auth.uid()=user_id);

-- Service role/admin automation creates partner profiles, changes partner status, and writes status_history.
-- Claude follow-up: add a Partners tab and partner_status vocabulary to the live Sheet; do not write live Sheet from this migration.
