alter table public.candidate_profiles
  alter column salary_expectation type text using salary_expectation::text,
  alter column housing_needed type text using case when housing_needed is true then 'NEEDED' when housing_needed is false then 'NOT_NEEDED' else null end;

alter table public.roles
  alter column housing_provided type text using case when housing_provided is true then 'YES' when housing_provided is false then 'NO' else null end;

-- Canonical questionnaire values are stored as text UPPER_SNAKE values for matching and Sheet sync.
