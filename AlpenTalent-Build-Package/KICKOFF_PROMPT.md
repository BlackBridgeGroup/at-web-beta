# Kickoff Prompt — Claude Code

Paste this into Claude Code together with this repo + the `AlpenTalent-Build-Package`
folder.

---

You are building the AlpenTalent web app — a hospitality talent marketplace for
Austria. This repo already exists (Next.js App Router, locales en/de/cs, Supabase
Google OAuth, roles candidate/employer/partner, guided questionnaires, AI
receptionist widget). Your job is a **design-layer rebuild** to the locked
AlpenTalent design system. **Do not touch** auth, RLS, Supabase↔Sheet sync,
redirects, robots/sitemap, or the receptionist API logic.

Read `AlpenTalent-Build-Package/` in this order: `00_README` → `09_HANDOFF_CHECKLIST`
→ `03_DESIGN_TOKENS` → the rest as needed.

Hard rules:
- Extend the locked design system; never redesign it. Tokens in `design-tokens.css`
  are the source of truth.
- `app/globals.css` currently has PLACEHOLDER tokens (teal #0f766e, Arial). These
  must be fully removed, not left alongside the new ones.
- Forbidden visuals: purple gradients, glassmorphism, crypto/fintech UI, 3D
  illustration, neon, heavy corporate, stock-HR look.
- Sunset (#F4A261) is never body text on light; Neutral-400 is never content text
  (see `07_ACCESSIBILITY`). Honor `prefers-reduced-motion`. Light + dark parity.

### PHASE 1 — Foundation (do this first, then STOP and report)

This is the gate that unblocks the Design agent. Complete only this, then summarize.

1. Replace the placeholder `:root` block in `app/globals.css` with the contents of
   `AlpenTalent-Build-Package/design-tokens.css` (keep `@import "tailwindcss";` at top).
2. Load **Plus Jakarta Sans** (display) and **Inter** (body) via `next/font` and
   map them to `--font-display` / `--font-body`.
3. Add the **ThemeToggle** (Light / Dark / Auto) wired via `data-theme` on `<html>`,
   with the OS-preference fallback already in the CSS.
4. Build the primitive components from `04_COMPONENT_INVENTORY` §A (Button, Input,
   Select, Checkbox, Toggle, Chip, Avatar, Badge, Ridge SVG set, Skeleton) and put
   them on a single `/styleguide` preview route showing every variant + state in
   light and dark.

**Report when Phase 1 is done:** confirm no teal/Arial remain, fonts render,
theme toggle works, and share a screenshot or the `/styleguide` route. That is the
signal that the Design agent can start.

### PHASE 2 — Full build (only after Phase 1 is confirmed + mockups exist)

Follow the build order in `09_HANDOFF_CHECKLIST` (shell → homepage → jobs → job
detail → auth/onboarding → dashboards → content pages → receptionist → QA). Build
to the Build-Package specs **and** the approved Design mockups. If they ever
conflict, the locked design system + tokens win. Run the a11y checklist in
`07_ACCESSIBILITY §8` before calling a page done.

Do not start Phase 2 until I confirm Phase 1 is approved and design mockups are in.
