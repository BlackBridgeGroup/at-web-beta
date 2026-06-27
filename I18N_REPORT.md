# I18N Report

## Task

Codex Task 13 consolidated the approved standalone `de.html`, `cz.html`, and `en.html` marketing copy into the shared Next.js locale system in the AT web beta repo.

No live Google Sheet, Zapier, Gmail, Supabase deploy, or Netlify deploy was touched.

## Files changed

- `lib/i18n.ts` — centralized dictionaries, locale normalization, stable key tree, German fallback, dev missing-key warning.
- `components/LanguageChoice.tsx` — root language detector using localStorage, browser language, then German fallback.
- `components/LanguageSwitcher.tsx` — visible DE / CZ / EN switcher that persists the selected locale.
- `components/SiteShell.tsx` — shared layout now reads navigation/footer text from dictionaries.
- `app/page.tsx` — language choice page now uses the detector component.
- `app/[locale]/page.tsx` — shared locale marketing page renders from dictionaries.
- `app/[locale]/fragebogen/page.tsx` — questionnaire labels render from dictionaries.
- `app/layout.tsx` — global metadata now includes hreflang alternates.
- `app/sitemap.ts` — canonical Czech route changed from `/cs` to `/cz`.
- `next.config.ts` — redirects updated for `/cz`, `/cs -> /cz`, old `.html` URLs, and legal `.html` URLs.
- `components/ReceptionistWidget.tsx` — locale id aligned from `cs` to canonical `cz` while still recognizing old `/cs` paths during redirects.

## New i18n structure

```text
lib/i18n.ts
├── locales = ['de', 'cz', 'en']
├── normalizeLocale(input)
├── dictionaries.de
├── dictionaries.cz
├── dictionaries.en
├── getDictionary(locale)
├── getText(locale, key)
└── i18nKeyTree
```

## Stable key tree

```text
meta.title
meta.description
nav.brand
nav.de
nav.cz
nav.en
nav.cta
nav.login
nav.whatsapp
root.*
hero.*
stats[]
trust[]
services.*
process.*
contact.*
team.*
questionnaire.*
footer.*
```

## Locale behavior

- Canonical SEO routes are `/de`, `/cz`, `/en`.
- `/cs` and `/cs/:path*` 301-redirect to `/cz` and `/cz/:path*`.
- Browser mapping:
  - `de`, `de-AT`, `de-DE` → `de`
  - `cs`, `cz`, `sk` → `cz`
  - `en`, `en-US`, `en-GB` → `en`
  - everything else → `de`
- Detection order on `/`:
  1. saved `localStorage.alpentalent_locale`
  2. browser language
  3. German fallback
- Language switcher persists the chosen locale to localStorage.

## Approved copy preservation

Primary marketing copy was moved from the approved standalone pages into `lib/i18n.ts` without intentional rewriting. The source files used were:

- `de.html`
- `cz.html`
- `en.html`

The shared page keeps the existing simple Next.js design/layout rather than restoring the old standalone HTML styling. This matches the task constraint to avoid redesign and keep backend/structure as priority.

## Removed duplicated standalone maintenance

Deleted root-level standalone HTML files after migration:

- `index.html`
- `de.html`
- `en.html`
- `cz.html`
- `dotaznik.html`
- `de-recruiting.html`
- `en-recruiting.html`
- `de-hiring-campaigns.html`
- `en-hiring-campaigns.html`
- `impressum.html`
- `datenschutz.html`

`public/legacy/impressum.html` and `public/legacy/datenschutz.html` remain because the legal Next.js pages embed those legacy legal texts.

## Redirects kept

Old public routes redirect to the new canonical pages, including:

- `/de.html -> /de`
- `/en.html -> /en`
- `/cz.html -> /cz`
- `/dotaznik.html -> /cz/fragebogen`
- `/impressum.html -> /impressum`
- `/datenschutz.html -> /datenschutz`
- `/bewerber -> /cz`
- `/arbeitgeber -> /de`

## Flags / unclear mappings

- The old standalone pages contain more dense sections than the current compact Next.js layout. I mapped the approved high-value text into stable dictionary sections and preserved the current layout; I did not recreate the old standalone visual structure.
- Legal copy was not merged into dictionaries because current legal pages intentionally embed `public/legacy/*` verbatim.
- `content/kb/de.md`, `content/kb/cz.md`, and `content/kb/en.md` had pre-existing uncommitted edits and were not touched/staged by this task.

## Validation

`npm` is unavailable in this environment, so local `npm install`, `npm run build`, and Lighthouse could not be run. Netlify preview must validate the build.

## Final status

Task 13 local implementation complete. Netlify preview build remains required.
