alter table public.receptionist_leads drop constraint if exists receptionist_leads_kind_check;
alter table public.receptionist_leads
  add constraint receptionist_leads_kind_check check(kind in ('candidate','employer','partner','general'));

-- Public contact and questionnaire forms store lightweight inbound leads here.
-- Full candidate/employer profiles are still created only after auth or manual review.
