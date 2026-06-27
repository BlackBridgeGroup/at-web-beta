# Supabase ↔ Sheet: Two-Zap Recipe

Sheet ID: `1QEhQ2zy3DKFzSsJOR-VLYE1uyM_SKbPrHaEzjmnAqdU`. The Sheet is an ops mirror; Supabase remains canonical.

## Zap 1 — Signup → Sheet

1. **Trigger:** Webhooks by Zapier, Catch Hook. Copy its URL into Supabase Function Secret `ZAPIER_SIGNUP_HOOK_URL` for `sync-signup`.
2. **Path A (`kind=candidate`):** Google Sheets Create Spreadsheet Row, worksheet `Candidates`. Explicit instructions: `candidate_id = "CAN-<generated>"; user_id = "{{user_id}}"; name = "{{name}}"; role_fit = "{{role_fit}}"; source = "website"; preferred_contact = "{{preferred_contact}}"; telegram_username = "{{telegram_username}}"; whatsapp_number = "{{whatsapp_number}}"; email = "{{email}}"; phone = "{{phone}}"; consent = "TRUE"; language = "{{language}}"; country = "{{country}}"; region = "{{region}}"; position = "{{position}}"; salary_expectation = "{{salary_expectation}}"; availability = "{{availability}}"; housing_needed = "{{housing_needed}}"; stage = "SOURCED"; screening_status = "PENDING"`.
3. **Path B (`kind=employer`):** Google Sheets Create Spreadsheet Row, worksheet `Employers`. The live contract uses `company` (not `company_name`): `employer_id = "EMP-<generated>"; user_id = "{{user_id}}"; company = "{{company}}"; contact_person = "{{contact_person}}"; phone = "{{phone}}"; email = "{{email}}"; city = "{{city}}"; business_type = "{{business_type}}"; hiring_signal = "{{hiring_signal}}"; source = "website"; status = "NEW"`.
4. **Both paths:** Create Activity_Feed row: candidate = `workflow C3; step candidate_captured; actor zapier; entity_type candidate; ref_id candidate_id; phase SOURCED; status ok`; employer = `workflow W2; step lead_added; actor zapier; entity_type employer; ref_id employer_id; phase NEW; status ok`.
5. **Idempotency:** use `user_id` as a stored mirror key and lookup before Create Row. **Flag:** `user_id` is not listed in the current documented live Sheets schema; owner/Cowork must add/confirm it before enabling this Zap.

## Zap 2 — Sheet Status → Supabase

1. **Trigger:** Google Sheets Updated Spreadsheet Row for `Candidates` and separately `Employers`, watching `stage`/candidate status or `status` respectively.
2. **Filter:** `user_id` present and status changed; do not trigger on the Signup Zap's initial `SOURCED`/`NEW` write.
3. **Action:** Webhooks by Zapier POST `https://<project-ref>.supabase.co/functions/v1/status-writeback` with header `x-status-writeback-secret: <STATUS_WRITEBACK_SECRET>` and JSON `{ "kind": "candidate|employer", "user_id": "{{user_id}}", "new_status": "{{status}}" }`.
4. The function updates the profile and appends `status_history` with `changed_by=automation`. Zapier must store the secret, not the Sheet.


## Task 14 partner/receptionist follow-up

- Add a live Sheet `Partners` tab before enabling partner sync.
- Extend the Supabase Database Webhook to include `partner_profiles` INSERT events into `sync-signup`.
- Public `receptionist_leads` are stored locally first; Claude/owner should decide whether they sync through a new Zap or through the existing review queue after the `Partners` tab exists.
- No live Sheet, Zapier, or Gmail write is performed by the website code in this task.
