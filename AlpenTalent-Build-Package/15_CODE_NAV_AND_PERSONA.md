# 15 — Code: top nav layout + global persona quick-filter (Sonnet medium)

Two UX fixes found on live `/cz`. Copy in `lib/i18n.ts`. No backend changes.

## 1. Top nav — single line, even sizing
On cz/de the longer labels wrap to two lines, so the header looks ragged
(`components/AppBar.tsx`).
- Force nav items to **one line each** (`white-space: nowrap`) and align them on a
  single baseline/row, equal size.
- Tighten the gap and/or drop the nav font to ~15px so all items + language +
  theme toggle + Login + CTA fit one row on desktop.
- If it still doesn't fit at a given width, **collapse to the hamburger earlier**
  (raise the breakpoint, e.g. switch to the mobile sheet below ~1100px instead of
  768px) — better than wrapping.
- Optional shorter cz label: "Pro zaměstnavatele" → "Zaměstnavatelé".
- Verify in all three locales (de words are also long).

## 2. Persona row = global, clickable, redirects
The Reception / Chef / Housekeeping / Waiter / Hotel Manager chips currently live
only in the hero and are non-interactive.
- Extract into a reusable **`PersonaNav`** component.
- Show it **on every page** as a slim quick-filter strip directly **under the
  `AppBar`** (sticky with the header), site-wide (public pages).
- Each chip is a real `<Link>` → **`/{locale}/jobs?role=<persona>`** (jobs list
  pre-filtered by that role). Wire the jobs page to read `?role=` and apply the
  filter.
- Replace the **emoji with Lucide icons** (2px stroke) to match the locked system:
  Reception → `ConciergeBell`/`BellRing`, Chef → `ChefHat`, Housekeeping → `BedDouble`,
  Waiter → `Utensils`, Hotel Manager → `Briefcase` (pick the closest Lucide).
- Localize the labels (cz/de/en) via `d.ui` and keep them on one line each.
- States: hover (green border + lift), focus-visible, active (current role
  filter highlighted). Real buttons/links, keyboard-accessible.

### Persona → filter mapping (values to pass in `?role=`)
`reception` · `chef` · `housekeeping` · `waiter` · `manager`. Match these to the
job data's role field so the jobs filter actually narrows results (mock data is
fine for now).

## Done criteria
- Header is a clean single row in cz/de/en (no wrapping), or collapses to hamburger
  before it would wrap.
- `PersonaNav` appears on every public page, uses Lucide icons, localized labels,
  and each chip redirects to the role-filtered jobs page.
- `npm run build` clean. Stop and report.
