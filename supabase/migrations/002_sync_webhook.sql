-- Required by Task 11: status writeback records the automation actor as text.
alter table public.status_history alter column changed_by type text using changed_by::text;

-- Supabase Database Webhook configuration (owner action in Dashboard):
-- Events: INSERT on public.candidate_profiles and public.employer_profiles.
-- Destination: Edge Function sync-signup; include the default webhook body with record/table.
-- The Edge Function uses SUPABASE_SERVICE_ROLE_KEY and ZAPIER_SIGNUP_HOOK_URL only from
-- Supabase Function Secrets. No secret is stored in this migration or application client.
