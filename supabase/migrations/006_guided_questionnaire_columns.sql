alter table public.candidate_profiles
  add column if not exists position text,
  add column if not exists experience text,
  add column if not exists german_level text,
  add column if not exists work_eligibility text,
  add column if not exists email text,
  add column if not exists consent boolean default false,
  add column if not exists custom_answers jsonb not null default '{}'::jsonb;

alter table public.employer_profiles
  add column if not exists email text,
  add column if not exists business_type text;

alter table public.roles
  add column if not exists headcount text,
  add column if not exists german_required text,
  add column if not exists urgency text,
  add column if not exists salary_offered text,
  add column if not exists custom_answers jsonb not null default '{}'::jsonb;

alter table public.partner_profiles
  add column if not exists email text,
  add column if not exists partner_type text,
  add column if not exists network_region text,
  add column if not exists brings text,
  add column if not exists cooperation_model text,
  add column if not exists volume text,
  add column if not exists consent boolean default false,
  add column if not exists custom_answers jsonb not null default '{}'::jsonb;

-- Guided questionnaire writes use existing service-role server route after user auth/role check.
-- Live Sheet columns are owned by Claude/Cowork and are not touched here.
