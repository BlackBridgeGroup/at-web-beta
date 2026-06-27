create table if not exists public.receptionist_leads (
  id uuid primary key default gen_random_uuid(),
  kind text not null check(kind in ('employer','partner','general')),
  locale text not null default 'de',
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'NEW_LEAD',
  created_at timestamptz default now()
);

alter table public.receptionist_leads enable row level security;

-- No browser RLS policies: public widget writes through a server route using the service role.
-- Claude follow-up: sync receptionist_leads(kind='partner') into a live Sheet Partners tab.
