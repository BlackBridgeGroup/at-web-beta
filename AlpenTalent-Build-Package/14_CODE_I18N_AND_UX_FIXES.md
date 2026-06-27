# 14 — Code work-package: full i18n + UX fixes (Sonnet medium)

Live review found: only the hero is localized; the surrounding chrome is hardcoded
English on cz/de. Fix all of the below. Copy → `lib/i18n.ts` (de/cz/en). No backend
changes. **DE is the primary locale, then CZ, EN is supplementary** — keep
`normalizeLocale` defaulting to `de`.

## 1. Localize ALL UI strings (the big one)
These components receive `locale` but hardcode English. Replace every hardcoded
string with a dictionary lookup keyed by locale.

| Component / file | Hardcoded strings to move into i18n |
|---|---|
| `components/AppBar.tsx` | nav: Jobs, For Employers, How it works, Resources, About; Login; the CTA (use existing `d.nav.cta`) — both desktop + mobile menu |
| `components/ThemeToggle.tsx` | Light / Dark / Auto |
| `components/TrustBar.tsx` | Partner hotels, Hospitality professionals, Coverage/Austria-wide, Candidate satisfaction |
| `components/HowItWorksSection.tsx` | section eyebrow + H2 + all 5 step titles & bodies |
| `app/[locale]/jobs/page.tsx` | search placeholder, "Search" button, sort options (Best match/Newest/Salary), filter labels (Role/Region/Contract/Housing/Salary) |
| `components/JobCard.tsx` | "Housing included", "View job →", "Match", "Featured" |
| `components/SiteFooter.tsx` | any hardcoded column titles/links/labels |
| Any `EmptyState`, `Skeleton`, sort/filter chips | their visible text |

### Translation table (wording suggestions — owner may refine the Czech)
| EN | DE | CZ |
|---|---|---|
| Jobs | Stellenangebote | Otevřené pozice |
| For Employers | Für Arbeitgeber | Pro zaměstnavatele |
| How it works | So funktioniert's | Jak to funguje |
| Resources | Ratgeber | Rádce |
| About | Über uns | O nás |
| Login | Anmelden | Přihlásit |
| Light / Dark / Auto | Hell / Dunkel / Auto | Světlý / Tmavý / Auto |
| Partner hotels | Partnerhotels | partnerských hotelů |
| Hospitality professionals | Fachkräfte | profesionálů |
| Austria-wide / Coverage | Österreichweit | Celé Rakousko |
| Candidate satisfaction | Bewertung | spokojenost |
| Search roles, hotels, locations… | Stellen, Hotels, Orte suchen… | Hledat pozice, hotely, lokality… |
| Search | Suchen | Hledat |
| Role / Region / Contract / Housing / Salary | Position / Region / Vertrag / Unterkunft / Gehalt | Pozice / Region / Úvazek / Ubytování / Mzda |
| Best match / Newest / Salary | Beste Übereinstimmung / Neueste / Gehalt | Nejlepší shoda / Nejnovější / Mzda |
| Housing included | Unterkunft inkl. | Ubytování v ceně |
| View job → | Stelle ansehen → | Zobrazit pozici → |
| Match | Übereinstimmung | shoda |
| How it works steps | Profil erstellen · Passende Stellen · Vorstellung · Schnuppertag · Umzug nach Österreich | Vytvoř profil · Najdeme shodu · Pohovor · Zkušební směna · Přesun do Rakouska |

Rule: **no English on cz/de pages.** After the change, load /cz and /de and confirm
every visible label is in the page language.

## 2. "Auto" theme = follow time of day (Central European Time / SEČ)
Change Auto so it resolves by **Europe/Vienna local time**: day → light, night →
dark (e.g. light 07:00–18:59 CET, dark otherwise). Re-evaluate on load. Light and
Dark stay as explicit manual overrides. (Currently Auto follows the OS
`prefers-color-scheme` — replace that with the time-based rule in `ThemeScript` /
the theme logic.)

## 3. Buttons: every button-looking thing is a real button/link
Audit all CTAs, nav, filter chips, sort, persona chips, card actions: each must be a
real `<a>`/`<button>` with a correct destination/action, hover + focus-visible
states, and a pointer cursor. Remove or wire any dead/placeholder affordance. The
persona row and the "Authentic photo here" box are non-interactive — make sure they
don't look like buttons (no button styling) OR make them functional filters.

## 4. Jobs match score = mock, not real
The public jobs board shows match % but it's mock data with no logged-in candidate.
Match is candidate-specific, so showing a % to logged-out visitors is misleading.
**Recommendation:** hide `MatchScore` on the public `/[locale]/jobs` list and job
cards when there's no candidate session; show it only in the candidate app
(dashboard/matches/saved). Keep the mock data for layout. (Real DB wiring comes
later — owner will update the job board with live data.)

## 5. Done criteria
- `/cz` and `/de` render with **zero English** in nav, footer, trust bar,
  how-it-works, theme toggle, jobs filters/search, job cards.
- Auto theme switches by CET time of day.
- All button-styled elements are real, functional, keyboard-focusable.
- Public jobs list no longer shows candidate match % to logged-out users.
- `npm run build` clean. Stop and report.
