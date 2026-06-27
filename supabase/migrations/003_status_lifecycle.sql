alter table public.candidate_profiles drop constraint if exists candidate_profiles_status_check;
alter table public.candidate_profiles alter column status set default 'NEW_PROFILE';
alter table public.candidate_profiles add constraint candidate_profiles_status_check check (status in ('NEW_PROFILE','PROFILE_IN_REVIEW','MISSING_INFO','READY_FOR_MATCHING','MATCHED','SENT_TO_EMPLOYER','TRIAL_REQUESTED','TRIAL_SCHEDULED','PLACED','REJECTED','PAUSED'));
alter table public.employer_profiles drop constraint if exists employer_profiles_status_check;
alter table public.employer_profiles alter column status set default 'NEW_COMPANY';
alter table public.employer_profiles add constraint employer_profiles_status_check check (status in ('NEW_COMPANY','COMPANY_REVIEW','HIRING_NEED_CREATED','CANDIDATE_SEARCH','CANDIDATES_SUBMITTED','TRIAL_PHASE','PLACEMENT_SUCCESS','INVOICE_PENDING','CLOSED'));
alter table public.candidate_profiles add column if not exists country text, add column if not exists salary_expectation numeric, add column if not exists housing_needed boolean, add column if not exists language text, add column if not exists telegram_username text;
create table public.roles (id uuid primary key default gen_random_uuid(), employer_user_id uuid not null references public.users(id), title text not null, region text, salary_offer numeric, housing_provided boolean, languages text, start_date date, status text not null default 'OPEN' check(status in ('OPEN','ON_HOLD','FILLED','CLOSED')), created_at timestamptz default now());
create table public.submissions (id uuid primary key default gen_random_uuid(), role_id uuid not null references public.roles(id), candidate_user_id uuid not null references public.users(id), score int, status text not null default 'SENT' check(status in ('SENT','TRIAL_REQUESTED','TRIAL_SCHEDULED','PLACED','REJECTED','WITHDRAWN')), trial_date date, created_at timestamptz default now(), updated_at timestamptz default now());
alter table public.roles enable row level security; alter table public.submissions enable row level security;
create policy "employer reads own roles" on public.roles for select using(auth.uid()=employer_user_id);
create policy "candidate reads own submissions" on public.submissions for select using(auth.uid()=candidate_user_id);
create policy "employer reads role submissions" on public.submissions for select using(exists(select 1 from public.roles r where r.id=role_id and r.employer_user_id=auth.uid()));
-- Service role/automation alone creates or changes roles, submissions, score, trial_date, and statuses.
