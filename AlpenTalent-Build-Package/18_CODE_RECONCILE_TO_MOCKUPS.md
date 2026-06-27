# 18 — Code: reconcile build to P0/P1 mockups (Sonnet medium)

Goal: bring the live pages up to the richness of the approved **P0/P1** design
(`AlpenTalent.dc.html`). Mock data stays, no backend changes, copy in `lib/i18n.ts`.
**Compare each page to its mockup frame and ADD what's missing — don't rebuild what
already matches.** Locked tokens win.

> Strongly recommended: export the P0/P1 canvas frames as PNGs into
> `/AT Design assets/p0p1-reference/` and mirror them. Work from these specs if not.

Do it in **two waves**, build clean + report after each.

## WAVE A — Homepages (cz/de/en) to P0
Match the homepage frames:
- **Bento "platform/why" section**: feature tile (alpine-green) + two stat tiles
  (big number + label, e.g. "9 in 10", "9 days") + a media tile (photo slot) +
  an avatar-stack tile. Asymmetric grid like the mockup, 20px radius, hover lift.
- **DE only**: problem section = 3 tiles (Lange Vakanzen / Falsche Treffer / Frühe
  Abgänge); KI-matching section = green highlight tile ("Nur Kandidat:innen, die
  wirklich passen") + two stats (−40% / 3×) + photo tile; pricing = 3 `PriceTier`s
  (Lead-Gen / Embedded·RPO / Retained), middle highlighted; closing demo band.
- **EN only**: Visa & relocation 4-tile band (Visa & permits / Staff housing /
  German classes / a real person) + Platform showcase band (3-item checklist +
  photo) — confirm these match the frame.
- **All**: trust bar, featured jobs row (cz/en), compact how-it-works, employer CTA
  band, FAQ teaser, ridge footer. Keep `data-placeholder="verify"` on stats.

## WAVE B — Candidate Dashboard, Employer Dashboard, Job Detail
- **Candidate Dashboard**: greeting (time-aware + 👋), 4 `StatCard`s with "+N new"
  badges, **ProfileCompletion** progress bar ("70% — finish to unlock better
  matches"), **top-match hero card** (alpine-green, ridge motif, `MatchScore` ring
  92%, Apply now + View job), **RecommendedJobs** ranked list with match % rows.
- **Employer Dashboard**: greeting, Current Openings stat cards, **`CandidatesTable`**
  (candidate · role · match · stage pill · last activity · action) with green
  status pills, row hover; mobile = stacked row-cards.
- **Job Detail**: `JobHeader` + `MatchScore` ring + `MatchBreakdown` chips (role /
  German / region / availability / salary) + sticky Apply card + facts grid +
  description + similar roles. (Match shown here only in candidate/app context, not
  the public list — per package 14.)

## Done criteria (each wave)
- Pages visually match the P0/P1 frames (layout, sections, hover, light+dark,
  responsive). No regression to i18n/persona/emoji work.
- `npm run build` clean. Stop and report which sections changed.
