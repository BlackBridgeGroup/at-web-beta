# Resume Prompt — Claude Code (positioning V1 integration)

Paste this into Claude Code with the repo open.

---

Resume the AlpenTalent build. The full design layer is already built and verified
(tokens, fonts, theme, shell, homepage, dashboards, content pages). Now integrate
the **positioning update** in `AlpenTalent-Build-Package/10_SEO_COPY_POSITIONING_V1.md`.
This is **copy + metadata only — no backend changes.** Keep all auth, Supabase, RLS,
sync, redirects, and the receptionist API untouched. All strings go in
`lib/i18n.ts` (en/de/cs), never hard-coded in components or images.

### Core rule: locale = audience (different homepage per language)
- **`cs` (B2C, job seekers):** keep the candidate hero "Najdi svou roli v Rakousku"
  + candidate sections (from `08_COPYWRITING.md`, in Czech). Primary CTA "Najít
  příležitosti" → /jobs.
- **`de` (B2B, hotels & restaurants):** employer hero "Personal schneller finden —
  mit KI" + problem/features/employer sections from doc §3. Primary CTA "Demo
  buchen" → /contact. Secondary "Suchen Sie Arbeit? →" → /cs jobs.
- **`en` (intl. job seekers needing a visa + project showcase):** hero "Build your
  hospitality career in Austria" (doc §3B). Primary CTA "Find opportunities" →
  /jobs, secondary "About the platform" → /about. Add the **Visa & relocation
  band** (Visa & work permit / Relocation / Language / Human support) and the
  **Platform showcase band**. Add "Visa & relocation support" to the `en` trust bar.

### Tasks
1. Refactor the homepage so the hero + section content is **locale-driven** (read
   from i18n by locale), not one hard-coded English homepage. Three audiences, three
   sets of copy, one component tree.
2. Add the new copy from doc §3 (de), §3B (en), and candidate copy (cs) to
   `lib/i18n.ts`. Use the exact strings in the doc; translate the candidate set to
   Czech for `cs`.
3. Build the **Visa & relocation** `BentoSection` and **Platform showcase** band as
   `en`-only homepage sections (conditional by locale).
4. Per-locale **metadata** (title/description) from doc §5 — different per language.
   Add `hreflang` alternates (en/de/cs) + canonical per locale.
5. Add **JSON-LD**: `Organization` site-wide, `JobPosting` on job detail,
   `FAQPage` on /faq, `BreadcrumbList` on detail pages (a small `JsonLd` helper).
6. Cross-links between audiences (cs → "Jste zaměstnavatel?" → /de; de → candidate;
   en → "Are you an employer?" → /de). Quiet, in header or footer.

### Also fold in these 3 small fixes (from the design verification)
- `JobCard` match score 70–79% (Sunset) must use **dark text** (`--at-neutral-900`)
  on the number; keep Sunset only on the dot/ring. (Contrast fix.)
- `badge--sunset` uses an off-system brown `#8B4513` — replace with
  `--at-neutral-900` or document it as a derived token.
- Hero photo overlay is 0.88 — bring to **0.85** (brief says 80–85%).

### Stop point
After the homepage is locale-driven in all three languages with correct metadata,
pause and report (with the three home URLs /en /de /cs) so I can review before you
touch the remaining pages.
