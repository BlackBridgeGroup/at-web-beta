# Code instruction — DE positioning blend (V1 cleanup)

Copy + metadata only, all in `lib/i18n.ts`. No backend changes. Goal: DE leads as
the **AI workforce platform**, keeps the concrete staffing proof as a *benefit*, and
drops off-strategy reseller services.

### 1. DE meta (platform-led, concrete proof kept lower)
- **de title:** `Hotelpersonal & Gastro-Personal finden mit KI | AlpenTalent`
- **de description:** `AlpenTalent hilft österreichischen Hotels und Restaurants,
  Mitarbeitende schneller zu finden und einzuarbeiten — KI-gestütztes Matching,
  vorqualifizierte Kandidaten und faire Konditionen.`
- Remove the agency hook `Fixgebühr nur bei Antritt — kein Risiko` from the **meta
  description**. It stays as a benefit line lower on the page (see §3).

### 2. Remove off-strategy services (all locales: de/en/cz inherit)
In the `services.items` arrays, **delete**:
- `03 Payment Solutions / SumUp Terminals`
- `04 Signage & Branding / Digital Displays · Merch`
Keep only the workforce-relevant capabilities (`01 Recruiting`, `02 Hiring
Campaigns`) and reframe them as platform capabilities, not a reseller "complete
stack". Drop the phrase "The Complete Stack" / "Der komplette Stack".

### 3. Keep the concrete proof — as a benefit, not the headline
On the DE homepage/employer surface, keep a quiet trust/benefit line (chip strip or
under the hero), NOT as H1 or meta:
`Vorqualifizierte Kandidaten · Fixgebühr nur bei Antritt · kein Risiko`
DE hero stays: H1 `Personal schneller finden — mit KI`, primary CTA `Demo buchen`.

### 4. Sweep for leftover agency-as-headline
Grep the repo for `SumUp`, `Signage`, `komplette Stack`, `complete stack`,
`Fixgebühr` and confirm none appear as a homepage hero, section H1/H2, or meta on
any locale. `Fixgebühr` may remain only inside a benefit/pricing line.

### Stop point
Report the updated `/de` (meta + visible copy) for review. No other pages.
