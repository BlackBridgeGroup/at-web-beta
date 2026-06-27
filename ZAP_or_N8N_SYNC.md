# Supabase ↔ AlpenTalent OS Sync

Supabase is the canonical app store; the Google Sheet is the operations mirror. A Supabase database webhook/Edge Function invokes Zapier or n8n only after a new profile or internal status change.

- New candidate profile: append `Candidates` with `stage=SOURCED`, `screening_status=PENDING`, consent, mapped fields; append C3 Activity_Feed event.
- New employer profile: append `Employers` with `status=NEW`; append W2 Activity_Feed event.
- Internal Sheet/cockpit status update: webhook writes back to the matching Supabase profile and `status_history` using service role.

Use Sheet ID `1QEhQ2zy3DKFzSsJOR-VLYE1uyM_SKbPrHaEzjmnAqdU`, lookup/dedupe stable IDs, and explicit `header = "value"` mapping. The browser app never calls the Sheet.
