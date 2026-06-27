# 13 — Code Build Plan: 3 Passes (Sonnet, medium)

Goal: bring the live Next.js build up to the approved **P0 + P1** design (richer
than the current build) and finish the remaining pages — in **three self-contained
passes**. Owner reviews & tests at the end. Model: **Sonnet 4.6, medium** reasoning
(bump to high only on a specific hard layout if output drifts).

## Ground rules (all passes)
- **Locked system + tokens win.** Use `design-tokens.css` values; the P0/P1 canvas
  (`AlpenTalent.dc.html`) and these specs are the visual contract.
- **No backend changes.** Don't touch auth, Supabase, RLS, sync, redirects, the
  receptionist API. Copy stays in `lib/i18n.ts` (en/de/cz). Locale = audience
  (cz B2C candidates · de B2B hotels · en intl. visa + showcase).
- **Light + dark + responsive** on everything (tokens + breakpoints handle it).
- Tag business-claim numbers `data-placeholder="verify"` (match the design).
- Reuse the existing components; don't fork new ones for things already solved.
- After each pass: build clean (`npm run build`), no console errors, **stop and
  post a short report** (what changed + any blockers). Owner does the deep
  review/test after Pass 3.
- Reference detailed specs: `04_COMPONENT_INVENTORY`, `05_PAGE_SPECS`,
  `06_RESPONSIVE_STRATEGY`, `07_ACCESSIBILITY`, `10_SEO_COPY_POSITIONING_V1`.

> Optional booster: export the P0/P1 canvas to per-screen PNGs into
> `/AT Design assets/p0p1-reference/` so Code can mirror layouts exactly. Plan
> works from the written specs even without it.

---

## PASS 1 — Component library + 3 homepages (the contract)
Bring the shared building blocks to P0 fidelity, then the homepages. Everything
downstream reuses these, so get them right first.

**Components to finish/upgrade to the mockups:**
`Hero` (3 locale variants, ridge + photo, overlay ≤0.85), `TrustBar`,
`BentoSection`/`BentoTile` (feature/stat/media/quote), `JobCard` (full + compact,
MatchScore, save-heart, housing chip), `MatchScore` (pill + ring, bands; 70–79 =
dark number + sunset dot), `DashboardShell` (sidebar desktop / bottom tab bar
mobile), `StatCard`, `Accordion`, `PricingBlock`/`PriceTier`, `Ridge`,
`EmptyState`, `Skeleton`, `SiteFooter` (ridge divider, 4 columns, WhatsApp).

**Homepages (cz/de/en)** to P0: hero + trust bar + bento + (featured jobs cz/en |
how-it-works de) + en-only Visa & Showcase bands + ridge footer. Keep the DE
problem section + KI-matching + pricing tiers + the en visa band layout from the
mockups.

**Done:** `/styleguide` shows all upgraded components L/D; the 3 homepages match
the P0 frames; build clean. Report.

---

## PASS 2 — Auth + candidate app + employer app (P0/P1 screens)
Build/reconcile the authenticated product to the P1 + P0 frames, using Pass-1
components. Candidate context locales cz/en; employer de.

- **Login/Register** — RoleToggle, Google button, ridge card, states.
- **Questionnaire** — restyle existing guided flow (one-Q-per-screen, chips +
  custom, progress, consent). Keep all logic.
- **Candidate Dashboard** — greeting, 4 StatCards, ProfileCompletion bar,
  top-match hero card (ridge), RecommendedJobs list.
- **Matches** — MatchScore + MatchBreakdown chips + JobCard grid.
- **Jobs index** — SearchBar + FilterBar + 3-up JobCard grid + sort + skeleton +
  ridge empty state.
- **Job Detail** — header + MatchScore/Breakdown + sticky Apply bar + facts grid +
  description + similar roles.
- **Applications** — 6-stage `Timeline` + list + status pills + empty state.
- **Messages** — ThreadList + Thread + composer + empty state.
- **Saved Jobs** — JobCard grid (heart filled) + empty state.
- **Employer Dashboard** — sidebar + Current Openings stats + `CandidatesTable`
  (stage pills, row drawer); vacancies/interviews/placements/invoices(read-only).

**Done:** all the above match P0/P1 frames L/D + mobile; build clean. Report.

---

## PASS 3 — P2 content/marketing pages + final polish
Build the remaining pages from existing components + `05_PAGE_SPECS` (recombinations
— no new visual language needed).

- **For Employers** (hero + services bento + PricingBlock + FAQ), **How It Works**
  (5-step path), **Regions** (+ region detail), **Salary Guide** (table + bento),
  **Success Stories** (+ detail), **Resources/AlpenLife** (hub + article),
  **About**, **Contact** (form + WhatsApp), **FAQ** (plain white accordion),
  **Privacy/Terms/Imprint** (legal template restyle).
- **Final polish:** verify per-locale metadata + hreflang + JSON-LD
  (Organization/JobPosting/FAQPage/Breadcrumb); a11y sweep per `07_ACCESSIBILITY §8`
  (Lighthouse a11y ≥95 on homepage/jobs/job-detail/dashboards; keyboard pass;
  reduced-motion); confirm all `data-placeholder="verify"` stats are tagged.

**Done:** all pages live in cz/de/en, build clean, a11y pass. Report — ready for
owner review/test.

---

## Owner review & test checklist (after Pass 3)
- [ ] Walk each locale home: cz candidate / de employer / en visa+showcase — right audience, right hero/CTA.
- [ ] Candidate flow: jobs → job detail → apply → login → questionnaire → dashboard → matches/applications/messages/saved.
- [ ] Employer: /de → dashboard → candidates table → vacancy.
- [ ] Toggle Light/Dark/Auto on 5+ pages; check mobile (nav → bottom tab bar, filters sheet, sticky Apply).
- [ ] Spot-check German copy widths on pill buttons; check FAQ accordion, footer links.
- [ ] Replace `data-placeholder="verify"` numbers with real/agreed values before any public launch.
- [ ] `npm run build` + a Netlify deploy-preview.
