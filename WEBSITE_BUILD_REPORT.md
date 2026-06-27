# Website Build Report

## Locales and routing

- `/` is a language-choice page.
- `/de` speaks to German-speaking employers, `/cs` to Czech candidates, and `/en` to both audiences.
- Every locale has `/[locale]/fragebogen`; `/bewerber` redirects to `/cs` and `/arbeitgeber` to `/de`.
- All historic HTML URLs redirect to a locale home or questionnaire in `next.config.ts`.

## Login and app

`/login?role=candidate`, `/login?role=employer`, or `/login?role=partner` preselects the role toggle before Google sign-in. The OAuth callback must persist that selected role to `users.role` and route to the corresponding onboarding/dashboard. Existing Supabase schema, RLS, sync spec, legal pages, redirects, robots, OpenGraph metadata, Netlify config, and `.env.example` remain in place.

## WhatsApp and questionnaire

The header and footer include a `wa.me` contact link. The short locale questionnaire retains the consent gate and is ready to connect to the existing Supabase intake flow.

## Changed since 3da45bd

Removed standalone marketing audience pages in favour of language-first locale homes; added DE/EN/CZ routes, language choice/switching, role-first login, and locale questionnaires.

## Environment and owner to-dos

Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `GOOGLE_CLIENT_ID`, and `GOOGLE_CLIENT_SECRET` in Netlify. Configure the OAuth callback, confirm the production WhatsApp number, update legal processor disclosures (Supabase, Netlify, Google), and deploy a Netlify preview before production.

## Validation

`npm` is unavailable in this local environment, so Netlify must run `npm install` and `npm run build` for preview validation. No preview or production deploy was attempted.

## Supabase Google OAuth

Implemented browser/server/middleware Supabase clients, Google OAuth start, `/auth/callback` code exchange, first-login role persistence, protected role routes, RLS-safe profile creation, dashboard profile/history reads, and sign-out. `SUPABASE_SERVICE_ROLE_KEY` is imported only by server route/client modules.

### Netlify deploy-preview checklist

1. Confirm all five environment variables are set for Deploy Previews as well as Production.
2. Test Google login as a candidate; verify a `users` row with `role=candidate`, candidate onboarding, profile row, dashboard, and sign-out.
3. Repeat as an employer; verify the employer route/profile/dashboard.
4. Confirm role mismatch redirects, unauthenticated route protection, session refresh, and no service-role key in browser bundles.
5. Confirm Supabase Google provider scopes remain only `openid email profile` and the callback URL is `https://jvlotqqukqmpaiqdjjrd.supabase.co/auth/v1/callback`.

## Supabase ↔ Sheet sync backend

Added Edge Functions `sync-signup` and `status-writeback`, migration `002_sync_webhook.sql`, and `ZAP_SYNC_RECIPE.md`. Function secrets required in Supabase (not Netlify client code): `ZAPIER_SIGNUP_HOOK_URL` and `STATUS_WRITEBACK_SECRET`, plus the existing server-only `SUPABASE_SERVICE_ROLE_KEY`.

Owner/Claude must deploy both functions, configure INSERT DB Webhooks on candidate/employer profile tables, create the two Zaps exactly from the recipe, and confirm/add the `user_id` mirror column in the Candidates and Employers Sheets before enablement. No Sheet write has been made by this repository.

## Status lifecycle and status panels

Migration `003_status_lifecycle.sql` adds the canonical candidate, employer, and submission status vocabularies plus `roles` and `submissions`. Candidate intake now captures country, primary language, salary expectation, housing requirement, and Telegram username. Employer intake creates the first structured role.

Claude/Cowork must mirror the new status dropdown values in Candidates and Employers and ensure the Sheet Roles/Pipeline mirrors include `user_id` and submission `score`; roles mirror `Roles`, submissions mirror `Pipeline`. The app does not write to the Sheet.

Netlify preview: test lifecycle labels, candidate missing-field checklist, candidate submission list, employer role/submission list, trial date, invoice-pending read-only panel, and status-history timeline. Backlog deliberately deferred: Storage document uploads, two-way messaging, real invoicing, and web admin dashboard.


## Task 14 — AI receptionist, in-app assistant, and partner role

Implemented locally in commits `c5d27b1` and `5ee75bd`.

- Added `partner` as an allowed `users.role`, plus `partner_profiles` with RLS, `/partner/onboarding`, `/partner/dashboard`, role-mismatch guards, and Google-login role selection.
- Added a floating `ReceptionistWidget` on `SiteShell`, available on public pages and in app mode on candidate/employer/partner onboarding and dashboards.
- Public widget starts with the four-menu flow: employer, candidate, partner, and general question. Employer and partner flows collect one field at a time and store a server-side `receptionist_leads` row. Candidate flow asks the specified fields but ends by guiding the visitor to `/[locale]/fragebogen` + Google registration so GDPR consent is captured before storing candidate data.
- General Q&A reads `content/kb/{de,cz,en}.md`. Placeholder TODO content is present; Claude/owner must write the real FAQ/process KB.
- `/api/assistant` uses the knowledge base and, in app context, reads only the logged-in user’s own status/history through RLS-safe Supabase queries. It never exposes other users’ data.
- If no LLM key is configured, `/api/assistant` returns KB search results plus escalation fallback, so the feature is graceful and zero-cost.
- Optional LLM is server-side only via `ALPENTALENT_LLM_API_KEY`, `ALPENTALENT_LLM_MODEL`, and `ALPENTALENT_LLM_BASE_URL`; no LLM key is exposed to browser code.
- `sync-signup` now understands `partner_profiles`, but live Sheet sync remains disabled until Claude/owner adds Sheet support.

Owner decision to confirm before enabling paid Q&A: choose the LLM provider/key and confirm per-message cost is acceptable. Until then, leave `ALPENTALENT_LLM_API_KEY` empty.

Claude/Cowork follow-up: add a live Sheet `Partners` tab, partner status vocabulary, and partner/receptionist lead sync mapping. Also fill the real DE/CZ/EN KB content in `content/kb/`. No live Google Sheet, Zapier, Gmail, Supabase deploy, or Netlify deploy was touched by this task.


## Task 15 — Authenticated app i18n

Implemented authenticated-app localization for candidate, employer, and partner areas.

- Added `lib/appLocale.ts`, which resolves server-side app locale from `alpentalent_locale` cookie, then `Accept-Language`, then German fallback via `normalizeLocale()`.
- Extended `lib/i18n.ts` with `app.profile.*`, `app.dash.*`, `app.status.*`, and `app.next.*` dictionary sections for DE/CZ/EN.
- Localized onboarding pages:
  - `/candidate/onboarding`
  - `/employer/onboarding`
  - `/partner/onboarding`
- Localized dashboard pages:
  - `/candidate/dashboard`
  - `/employer/dashboard`
  - `/partner/dashboard`
- `ProfileForm` now receives localized labels from the app dictionary.
- `SignOut` now accepts a localized label.
- `SiteShell` passes the resolved app locale into the in-app receptionist widget so assistant context follows the same app locale.
- OAuth callback already redirects to clean `/{role}/onboarding` or `/{role}/dashboard` URLs without preserving `code` or `role` query parameters.

Netlify preview should verify DE/CZ/EN app copy by setting the language on the public site, logging in, and checking onboarding, dashboard status labels, empty states, status-history labels, and sign-out.

## Task 16 — Guided onboarding questionnaire

Replaced the flat onboarding form on `/candidate/onboarding`, `/employer/onboarding`, and `/partner/onboarding` with a guided one-question-at-a-time questionnaire.

- Source content and canonical values come from `10_KNOWLEDGE/QUESTIONNAIRES.md`.
- Shared questionnaire schema lives in `lib/questionnaires.ts`.
- Localized strings are exposed through `lib/i18n.ts` at:
  - `app.q.common`
  - `app.q.candidate.C1` through `app.q.candidate.C8`
  - `app.q.employer.E1` through `app.q.employer.E8`
  - `app.q.partner.P1` through `app.q.partner.P5`
- UI behavior:
  - one question per screen;
  - three canonical option chips;
  - custom free-text option;
  - progress indicator;
  - back/next controls;
  - option selection auto-advances;
  - final contact step with required fields.
- Consent remains required for candidate and partner submissions. Employer onboarding shows the Datenschutz note and does not require a consent checkbox.
- No live Google Sheet write is performed by the app. Sheet updates remain routed through the existing Supabase-to-Zapier review/sync design.

### Stored fields

Candidate guided onboarding stores canonical values for `position`, `experience`, `german_level`, `work_eligibility`, `region`, `availability`, `housing_needed`, `salary_expectation`, and `language`, plus contact fields, consent, and `custom_answers`. If any required guided answer is missing, or a custom answer has no text, the profile status becomes `MISSING_INFO`; otherwise it becomes `NEW_PROFILE`.

Employer guided onboarding stores `business_type` and contact fields on `employer_profiles`, then creates a `roles` row with `title`, `headcount`, `region`, `housing_provided`, `german_required`, `urgency`, `salary_offered`, and `custom_answers`.

Partner guided onboarding stores `partner_type`, `network_region`, `brings`, `cooperation_model`, `volume`, contact fields, consent, and `custom_answers`.

### Supabase migrations

- `006_guided_questionnaire_columns.sql` adds the guided questionnaire storage columns.
- `007_guided_questionnaire_canonical_types.sql` converts previously boolean/numeric matching fields that now need canonical text values.

Netlify preview should verify all three guided flows in DE/CZ/EN, custom answers, consent enforcement, employer role creation, candidate `MISSING_INFO` vs `NEW_PROFILE`, and that no service-role key or Sheet write path is exposed to browser code.
