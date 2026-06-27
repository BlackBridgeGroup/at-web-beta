# 16 — Code: Resources polish + emoji→Lucide (Sonnet medium)

Copy in `lib/i18n.ts`. No backend changes. **Do NOT touch /about** — it's being
redesigned separately by the owner.

## 1. Elevate the Resources page (`/[locale]/resources`)
Currently a flat list of plain white cards — too basic, no AlpenTalent signature.
Bring it up to the locked design language using EXISTING patterns (no new visual
system, no bespoke mockup needed):

- **Page hero**: eyebrow (e.g. EN "ALPENLIFE" / DE "ALPENLIFE" / CZ "ALPENLIFE"),
  H1 (localized, e.g. "Everything you need to land in Austria"), one-line sub, and
  a **mountain-ridge divider** beneath the hero (signature element).
- **Featured guide**: promote the first/most-important guide into a larger
  card (wider, warm-neutral or alpine-green tint, ridge accent), then the rest in a
  2-up grid below — bento feel, not a flat stack.
- **Cards**: keep the category eyebrow (MOVING / LANGUAGE / LEGAL / HOUSING / WORK),
  20px radius, soft shadow, **hover = Alpine-Green border + 2px lift** (locked
  behavior), arrow nudges right on hover. Icon tile uses Alpine-Light green tint.
- Keep it calm and minimal (Apple/Linear restraint) — add signature, don't clutter.
- Localize all copy (cz/de/en) via `lib/i18n.ts`.

## 2. Replace emoji with Lucide icons (system-wide, except /about)
The locked system uses **Lucide, 2px stroke** — not emoji. Swap emoji for Lucide
on every surface that renders now:
- Resources category icons: Moving→`Plane`, Language→`Languages`, Legal→`FileText`,
  Housing→`Home`, Work→`CalendarDays` (pick closest Lucide).
- Homepage bento / "why" tiles and any other emoji in components.
- Persona icons (if not already done in package 15): Lucide per that spec.
- Icons inherit text color or use Alpine Green for emphasis; sit in the
  Alpine-Light tile.
- Skip `/about` (being redesigned) — but note the emoji there for later.

## Done criteria
- Resources page has a hero + ridge divider + featured card + richer grid with
  hover green-border, all localized, Lucide icons (no emoji).
- No emoji left on rendered public pages except /about.
- `npm run build` clean. Stop and report.
