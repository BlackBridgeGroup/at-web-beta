# 10 — SEO Copy & Positioning V1 (AI workforce platform)

Supersedes the marketing copy in `08_COPYWRITING.md` for the **public/marketing**
surface where the two differ. App/dashboard copy in 08 still stands. No backend
changes — existing backend remains source of truth.

## 1. Positioning (sharpened)

**AlpenTalent is an AI-powered workforce platform for Austrian hospitality.**
Recruitment and placement are part of it, but the story is solving the workforce
shortage with AI, automation, and modern onboarding — with human review in the loop.

- Stay distinct from generic **HR software** (SAP/Personio) and from **job boards**
  (Indeed): we're a *hospitality-specific workforce platform*, not a database.
- Funding posture: build a legitimate AI-enabled product that *naturally* fits
  innovation/SME-digitalization frameworks. **Never** market as subsidy-chasing.
  No "grant-funded" language anywhere on the public site.

### 1.1 Locale = audience (THE organizing rule)

Positioning is **split by language**, matching the existing repo routing. Each
locale homepage is a different page with a different audience, hero, CTA and SEO
target. This resolves the earlier "employer vs candidate" confusion.

| Locale | Audience | Mode | Homepage hero leads | Primary CTA | Secondary CTA |
|---|---|---|---|---|---|
| **`cs` Czech** | Job seekers | **B2C** | "Najdi svou roli v Rakousku" (candidate, = approved hero) | "Najít příležitosti" (Find opportunities) | "Jak to funguje" |
| **`de` German** | Hotels & restaurants | **B2B** | "Personal schneller finden — mit KI" (employer / AI platform) | "Demo buchen" (Book a demo) | "Mehr erfahren" |
| **`en` English** | Intl. showcase + visa-need job seekers | B2C-led + project showcase | "Build your hospitality career in Austria" | "Find opportunities" | "About the platform" |

`en` serves two jobs at once: (a) **present the project internationally** outside
the DACH region (investors, partners, press, intl. employers), and (b) a
**recruitment page for international job seekers who need a work visa** to come to
Austria. So `en` leads candidate (visa/relocation), with a platform-showcase band
for the international-presentation use. It is **not** the B2B "Book a demo" page —
that is `de`.

Rules that follow:
- The employer copy in §3 is the **`de`** homepage. The **`en`** homepage uses the
  intl. candidate + showcase copy in §3B. The **`cs`** homepage uses the candidate
  hero/sections (approved hero + candidate copy in `08_COPYWRITING.md`, in Czech).
- Cross-link, don't blend: cs → "Jste zaměstnavatel?" → /de employer; de →
  "Suchen Sie Arbeit?" → /cs or /en jobs; en → "Are you an employer?" → /de.
- SEO keywords are per **language**, not shared (see §5).

### Strategic flags (decide when convenient — not blocking)
1. **Demo booking surface.** "Book a demo" lives on `de` (and /for-employers).
   Confirm the demo route (/contact vs a dedicated booking page).
2. **"AI recruiting" keyword vs "not an agency" positioning.** We rank for "AI
   recruiting Austria" (high intent) while positioning as a platform — handled by
   leading copy with "workforce platform" and using "recruiting" mainly in
   meta/keywords, not as the brand promise.

## 2. Voice

Confident, warm, plain. Employer copy is credible and ROI-aware without corporate
bloat. Candidate copy stays human and reassuring. Short sentences. Specifics over
adjectives. English is primary; `de` for employers (Sie, business-credible), `cs`
for candidates (friendly, practical).

## 3. Homepage copy — `de` (employer-led, B2B)

This is the **German** homepage (Austrian hotels & restaurants). `en` is in §3B,
`cs` is B2C candidate (approved hero "Najdi svou roli v Rakousku" + candidate copy
from `08_COPYWRITING.md` in Czech). Do not put the employer hero on `cs`.

### Hero (`Hero`) — de
- **H1 (de):** "Personal für Hotellerie & Gastronomie — schneller finden mit KI."
- **Subhead (de):** "AlpenTalent hilft österreichischen Hotels und Restaurants,
  Mitarbeitende durch intelligente Automatisierung und persönliche Betreuung
  schneller zu gewinnen und einzuarbeiten."
- **CTA primary:** "Demo buchen" (Book a demo) → /contact (or demo booking)
- **CTA secondary (candidate cross-link):** "Suchen Sie Arbeit? →" → /cs or /en jobs
- Keep mountain-ridge motif, warm hospitality photo, overlay 80–85%.
- H1 alternatives to A/B later: "Lösen Sie Ihren Personalmangel — mit KI." ·
  "Die KI-Workforce-Plattform für die österreichische Hotellerie."

### Trust bar (`TrustBar`)
"300+ partner hotels · 10,000+ hospitality professionals · Austria-wide ·
Human review included · GDPR-conscious". (Drop "4.9 satisfaction" here only if
verifiable; otherwise keep on candidate surfaces.)

### Problem section (`BentoSection` or band)
- **H2:** "Hospitality is facing a workforce shortage."
- **Copy:** "Hotels and restaurants lose weeks to manual searching, scattered
  applications and candidates who slip away mid-process. AlpenTalent streamlines
  it — AI-assisted matching, candidate management and onboarding support, with a
  human reviewing every step."

### Features (4 `BentoTile`s)
- **AI matching** — "Surface suitable candidates in hours, not weeks."
- **Automated communication** — "Cut repetitive admin — outreach and updates run
  themselves."
- **Candidate dashboard** — "Applicants track applications and onboarding in one
  place."
- **Hospitality focus** — "Built for Austrian hotels, restaurants and resorts —
  not a generic HR tool."

### Employer section (`BentoSection` / band)
- **H2:** "Recruitment built for hospitality businesses."
- **Benefits (chips/list):** Less administration · Faster hiring · Better candidate
  experience · Transparent process · Hospitality expertise.
- **CTA:** "Book a demo" / "Talk to us"

### Candidate section (`BentoSection` / band)
- **H2:** "More than a job board."
- **Copy:** "Build your profile once. Get matched automatically. Track your
  applications. Discover roles across Austria."
- **CTA:** "Find your role →" → /jobs  (this carries the approved candidate line)

### How it works (`HowItWorksSection`, unchanged 5 steps)
Create profile → Get matched → Interview → Trial shift → Move to Austria.

### Trust layer (band above footer)
"Human review included · GDPR-conscious processes · Hospitality-focused expertise ·
Transparent communication · Austria-first." Quiet, no badges-as-noise.

### Footer (`SiteFooter`) — unchanged structure.

## 3B. Homepage copy — `en` (intl. showcase + visa-seeker recruitment)

The **English** homepage leads **international job seekers who need a work visa**
to come to Austria, and doubles as the **project showcase** for an international
audience (investors, partners, press, employers outside DACH). Candidate-led, warm,
with a clear platform-story band. Not the B2B demo page.

### Hero (`Hero`) — en
- **H1:** "Build your hospitality career in Austria."
- **Subhead:** "AlpenTalent connects international hospitality professionals with
  Austrian hotels and restaurants — and supports your visa, relocation and
  onboarding the whole way."
- **CTA primary:** "Find opportunities →" → /jobs
- **CTA secondary:** "About the platform" → /about (serves the showcase use)
- Keep mountain-ridge motif, warm hospitality photo, overlay 80–85%.
- H1 alternatives: "Work in Austrian hospitality — visa and relocation support
  included." · "Your move to Austria starts here."

### Visa & relocation band (`BentoSection`) — en-only, the differentiator
- **H2:** "We help you get there — not just hired."
- 4 `BentoTile`s:
  - **Visa & work permit** — "Guidance through Austrian work-permit requirements,
    step by step."
  - **Relocation support** — "Housing, paperwork and arrival — sorted with you."
  - **Language help** — "Start with the German each role actually needs."
  - **Human support** — "A real person with you from application to first shift."

### Platform showcase band (`BentoSection`) — for the intl. presentation use
- **H2:** "An AI workforce platform for Austrian hospitality."
- **Copy:** "AlpenTalent pairs AI-assisted matching and automated workflows with
  human review — helping Austrian hotels and restaurants solve workforce shortages,
  and helping international professionals build careers in Austria."
- **CTA:** "How it works →" → /how-it-works · quiet link "Are you an employer? →" → /de

### Candidate section + How it works + Trust layer
Reuse the candidate section (§3 "More than a job board"), the 5-step
`HowItWorksSection`, and the trust layer (add **"Visa & relocation support"** to the
trust line on `en`). Footer unchanged.

## 4. Elevator pitch (about/meta use)
"AlpenTalent helps hospitality businesses hire and onboard employees faster using
AI-assisted workflows, automation and human expertise."

## 5. SEO

### Keywords by locale (search in the language of the audience)

**`en` (B2C intl. job seekers + visa + showcase):** hospitality jobs Austria visa
sponsorship · work in Austria hospitality · hotel jobs Austria English speaking ·
Austria work visa hospitality · relocate to Austria hospitality job · seasonal
hospitality work Austria. (Employer/B2B terms like "AI recruiting Austria" live on
`de` and /for-employers, not the `en` home.)

**`de` (B2B / employers):** Personalvermittlung Hotellerie Österreich ·
Hotelpersonal finden · Mitarbeiter Gastronomie finden · Personal Hotel Österreich ·
KI Recruiting Hotellerie · Personalsuche Gastronomie.

**`cs` (B2C / candidates):** práce v Rakousku gastronomie · práce hotel Rakousko ·
číšník Rakousko práce · práce kuchař Rakousko · brigáda Rakousko hotel ·
práce v hotelnictví Rakousko.

Don't translate keywords literally — use the phrase each audience actually searches.
Slugs and metadata are localized per language; never reuse English slugs on cs/de.

### Page → primary keyword map
| Page | Primary keyword | Secondary |
|---|---|---|
| Homepage `en` | hospitality jobs Austria visa sponsorship | work in Austria hospitality |
| Homepage `de` | Hotelpersonal finden | Personalvermittlung Hotellerie Österreich |
| Homepage `cs` | práce v hotelnictví Rakousko | práce gastronomie Rakousko |
| /for-employers | hospitality recruitment Austria | restaurant hiring Austria |
| /jobs | gastronomy jobs Austria | hotel staff Austria |
| /how-it-works | hospitality onboarding Austria | — |
| /salary-guide | hospitality salary Austria | hotel staff salary |
| /regions/[region] | hotel jobs {region} | gastronomy jobs {region} |

### Meta (per page; ~55-char titles, ~150–160-char descriptions)
Home is **per locale** (different audience each):
- **Home `en` title:** "Hospitality Jobs in Austria with Visa Support | AlpenTalent"
- **Home `en` description:** "Build your hospitality career in Austria. AlpenTalent
  matches international professionals with hotels and restaurants — with visa,
  relocation and onboarding support."
- **Home `de` title:** "Hotelpersonal & Gastro-Personal finden mit KI | AlpenTalent"
- **Home `de` description:** "AlpenTalent hilft österreichischen Hotels und
  Restaurants, Mitarbeitende schneller zu finden und einzuarbeiten — mit KI,
  Automatisierung und persönlicher Betreuung."
- **Home `cs` title:** "Práce v hotelnictví a gastronomii v Rakousku | AlpenTalent"
- **Home `cs` description:** "Najdi svou roli v rakouských hotelech a restauracích.
  Vytvoř profil jednou, nech se spárovat a sleduj své přihlášky — s lidskou podporou."
- **Employers title:** "Hire Hotel & Restaurant Staff in Austria | AlpenTalent"
- **Employers description:** "Solve your hospitality staffing shortage. AI matching,
  automated communication and onboarding support — built for Austrian hotels and
  restaurants."
- **Jobs title:** "Hospitality Jobs in Austria | Hotels & Restaurants | AlpenTalent"
- **Jobs description:** "Find hotel, kitchen and restaurant jobs across Austria.
  Build one profile, get matched automatically, track every application."

### On-page structure rules
- One `<h1>` per page = the hero H1; sections use `<h2>`. Don't skip levels.
- Front-load the primary keyword in H1, first paragraph, and meta.
- Descriptive, keyworded `alt` on hero/persona/story images (no keyword stuffing).
- Internal links: Home → For Employers, Jobs, How it works, Salary Guide, Regions.
- Localized slugs + `hreflang` for en/de/cs; canonical per locale.

### Structured data (JSON-LD)
- `Organization` (name, logo, sameAs, areaServed: AT) — site-wide.
- `Service` / `ProfessionalService` on /for-employers.
- `JobPosting` on each job detail (title, hiringOrganization, jobLocation,
  baseSalary, employmentType) — strong rich-result win for /jobs.
- `FAQPage` on /faq.
- `BreadcrumbList` on detail pages.

## 6. Implementation map (no backend changes)

| Copy block | Component | File |
|---|---|---|
| Hero H1/sub/CTAs | `Hero` | `components/Hero.tsx` |
| Trust bar | `TrustBar` | `components/TrustBar.tsx` |
| Problem/features/employer/candidate bands | `BentoSection`/`BentoTile` | `components/BentoSection.tsx` + homepage |
| How it works | `HowItWorksSection` | `components/HowItWorksSection.tsx` |
| Meta + JSON-LD | per-route `metadata` + a `JsonLd` helper | `app/[locale]/*/page.tsx` |
| Strings (all locales) | i18n dictionary | `lib/i18n.ts` |

Keep all copy in `lib/i18n.ts` (en/de/cs), never hard-coded in components or
images. `de` = employer voice, `cs` = candidate voice; English carries both.

## 7. Suggested next step
Validate the six target keywords against real search volume/competition before
finalizing slugs (optional, can be done later). Until then these mappings are the
working plan.
