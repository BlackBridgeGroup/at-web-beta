# AlpenTalent Audit — 2026-07-06

## Executive verdict

AlpenTalent is not a finished revenue machine yet. It is a strong prototype with a coherent operating system, a buildable Next.js app, auth, guided onboarding, Supabase schema, and a clear recruitment workflow. The biggest gap is not code quality. The biggest gap is that public conversion paths, live data, legal/commercial proof, and operational wiring are not production-ready.

Current status: pre-revenue production candidate, not launch-ready for paid traffic.

Best path to money: sell direct placement manually first, use the web only as trust + intake, and postpone full marketplace/job-board ambition until real employer roles and candidate outcomes exist.

## What is good

- The core offer is clear enough: hospitality recruiting for Austrian/DACH employers, with Czech/Slovak/international candidate supply.
- The OS documentation is unusually complete: workflow, revenue model, quality gates, monitoring, status lifecycle, Zapier/Make mapping, candidate/employer rules.
- The web app builds successfully with `npm run build`.
- Next.js App Router structure is present for marketing, localized pages, auth, candidate/employer/partner portals, API routes, sitemap, robots, and legal routes.
- Supabase architecture is sensible: public tables, RLS, service-role server routes, profile creation, status history, role/submission tables, and Edge Function sync design.
- The guided onboarding flow for authenticated candidate/employer/partner users is real and posts to `/api/profile`.
- AI receptionist has a low-cost fallback path through local KB files and does not require an LLM key to function.
- The revenue model has a simple first target: 2 direct placements per month at EUR 1,500.

## What is not good enough yet

- The public `/[locale]/fragebogen` questionnaire is only a static form. It has no submit handler and explicitly says submission depends on Supabase configuration.
- The public `/[locale]/contact` form is also static. It collects name/email/message in the UI but sends nowhere.
- Candidate job listings are mock data in both `app/[locale]/page.tsx` and `lib/mockJobs.ts`. These pages currently imply real jobs, salaries, hotels, and match scores.
- Several public claims are marked `data-placeholder="verify"`: 300+ hotels, 10,000+ professionals, 4.9 rating, time-to-interview, dropout reduction, speed multipliers, salary guide values, and pricing.
- Legal pages exist, but owner TODO says Impressum/Datenschutz need real company details and processor disclosures.
- Contact/demo booking is not wired to Calendly, email, CRM, Sheet, or Supabase.
- Google OAuth/Supabase/Zapier/Sheet sync are documented but not proven in production from this repo.
- Pricing is inconsistent: OS says AT-01 EUR 1,500 success fee and AT-02 campaign pricing; website says "Auf Anfrage" tiers and names like Retained/RPO.
- There is no real case evidence yet: success stories are placeholders, salary ranges are placeholders, open questions remain RAW/ASSUMPTION.
- Visual assets are placeholder-like: owner TODO still needs real hospitality photos and final brand/legal content.

## Technical findings

1. Critical: public lead capture is not connected.
   - `app/[locale]/fragebogen/page.tsx` has a plain `<form>` with no action/client submit.
   - `app/[locale]/contact/page.tsx` has a plain `<form>` with no action/client submit.
   - Business effect: paid or organic traffic can submit interest and no lead reaches Patrik, Supabase, Sheet, or email.

2. Critical: public job board presents mock inventory.
   - `app/[locale]/page.tsx` defines `mockJobs`.
   - `lib/mockJobs.ts` defines job details, salary, hotels, start dates, match scores.
   - Business/legal effect: this risks trust damage and potential misleading advertising if launched as real vacancies.

3. High: verified claims are not verified.
   - `OWNER_TODO.md` explicitly lists unverified numbers.
   - Many public components render `data-placeholder="verify"`.
   - Business effect: do not use paid ads or employer outbound pointing to these pages until claims are removed or proven.

4. High: website pricing does not match the operating model.
   - OS: EUR 1,500 success fee, EUR 500 campaign setup, EUR 500 per campaign placement.
   - Web: "Lead-gen", "Retained Search", "Embedded / RPO" with "Auf Anfrage".
   - Business effect: harder to close because the offer is less concrete than the OS.

5. High: production wiring is unproven.
   - Build passes locally.
   - Netlify deploy, Supabase migrations, Google OAuth, Edge Functions, DB webhooks, Zapier sync, and Sheet writeback still need live verification.

6. Medium: app routes exist beyond current operational readiness.
   - Candidate/employer dashboards, documents, messages, invoices, placements, campaigns exist as routes.
   - If exposed too early, they create expectations of a mature SaaS marketplace rather than a concierge recruiting service.

7. Medium: code maintainability needs cleanup after revenue blockers.
   - Some large single-line files make changes harder (`GuidedQuestionnaire.tsx`, API routes).
   - Inline SVGs are repeated where an icon library would be cleaner.
   - This is not the immediate money blocker.

## Product/business verdict

The right MVP is not "job marketplace". The right MVP is:

Employer urgent role -> manual qualification -> candidate sourcing/screening -> shortlist -> interview/trial -> placement -> invoice.

The website should support this with:

- employer lead capture,
- candidate intake,
- proof/trust,
- clear pricing,
- fast WhatsApp/contact,
- operational dashboard for Patrik,
- no fake marketplace claims.

## Launch block list

Must fix before any paid traffic:

- Wire `/de/contact` and all contact CTAs to a real lead destination.
- Replace static `/[locale]/fragebogen` with either authenticated onboarding or a public lead-capture route.
- Remove or clearly mark fake job listings until real roles exist.
- Remove unverified metrics and placeholder success stories from public pages.
- Finalize legal pages with real company/operator details.
- Make one offer page brutally clear: "EUR 1,500 success fee after successful start/probation" or the exact approved variant.
- Verify production Supabase, OAuth, Netlify, and Zapier/Sheet sync end-to-end.

Can wait:

- Full candidate portal depth.
- Employer portal depth.
- Partner portal.
- AI LLM upgrade.
- Sophisticated dashboards.
- Full content machine.
- RPO/retained offers.

## 7-day revenue plan

Day 1:
- Pick one product only: AT-01 direct placement.
- Make website CTA collect employer role briefs into Supabase/Sheet/email.
- Hide unverified claims and fake proof.

Day 2:
- Make candidate intake actually submit.
- Add a simple internal "new leads today" workflow: Supabase/Sheet -> notification.
- Test Google login and onboarding in production.

Day 3:
- Create one real employer offer page: Austrian hospitality, success fee, no upfront, shortlist target, human-reviewed.
- Prepare 20 employer outbound messages and 20 candidate sourcing messages.

Day 4:
- Start manual outbound to employers with real pain: Tyrol/Salzburg hotels/restaurants hiring service/kitchen/housekeeping.
- Capture every response in the Sheet.

Day 5:
- Source candidates manually for the first real role.
- Use OS quality gates before sharing any profile.

Day 6:
- Send first shortlist or "no-match yet" update.
- Log bottlenecks in Activity_Feed.

Day 7:
- Decide based on evidence:
  - if employers respond but candidates are weak, focus on candidate acquisition;
  - if candidates exist but employers do not close, tighten offer/outbound;
  - if both respond, build the smallest admin board for active cases.

## Recommended next build order

1. `POST /api/public-lead` for contact/questionnaire/receptionist leads.
2. Replace static contact and questionnaire forms with working client forms.
3. Add lead notification destination: email, Sheet, or both.
4. Remove public mock jobs or add "sample roles" gating until real roles exist.
5. Replace verified-stat components with conservative trust copy.
6. Align pricing copy with `10_KNOWLEDGE/REVENUE_MODEL.md`.
7. Production smoke test: landing -> lead -> Sheet/email -> owner follow-up -> status update.

## Bottom line

Do not spend time polishing the marketplace. The money is in the first two real placements. The system should be cut down to a reliable concierge recruiting funnel, tested live, and then expanded only after real employer/candidate data proves where the bottleneck is.
