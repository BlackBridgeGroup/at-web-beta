# AlpenTalent — co potřebuju od tebe (Patrik)

Seznam všeho, co je potřeba dodat / rozhodnout, aby web byl produkčně hotový.
Odškrtávej a doplňuj. Já mezitím dolokalizuju zbytek a čekám na tvoje reference
k homepage konci + About.

## A. Fotky / vizuální assety (dodáš soubory)
- [ ] **Hero fotky** — autentické rakouské/alpské pohostinství. Ideálně 3 varianty:
      de (employer/hotel), en (mezinárodní kandidát), cz (kandidát). Min. ~1600px šířka.
- [ ] **Bento / sekce fotky** — pár warm hospitality fotek (kuchyně, recepce, hotel).
- [ ] **Success story portréty** — 3 reálné fotky lidí (nebo necháme ikony).
- [ ] **Logo + favicon** — potvrdit, že `assets/FinalLogo.svg` + `favicon.svg` jsou finální.
- Kam: hoď do složky `public/` a pošli mi názvy, napojím je.

## B. Reálný obsah (dodáš texty)
- [ ] **Homepage „konec" (explore + bandy)** — reference, jak to chceš (chystáš).
- [ ] **About** — reference / směr (chystáš).
- [ ] **Success stories** — 3 příběhy jsou teď smyšlené placeholdery. Reálné, nebo nechat?
- [ ] **Salary guide** — reálné platové rozsahy pro pozice (teď placeholder).
- [ ] **Resources články** — německé právní znění (smlouva, daně) dát zkontrolovat
      rodilému mluvčímu (je to strojový překlad).
- [ ] **Impressum + Datenschutz** — reálné firemní údaje (název firmy, adresa, UID/IČO,
      ECG §5, kontakt). Bez nich nejsou legal stránky platné.

## C. Čísla k ověření (teď `data-placeholder="verify"`)
Najdeš příkazem: `grep -rl 'data-placeholder' app`
- [ ] 300+ partnerských hotelů
- [ ] 10 000+ / 4 000+ profesionálů
- [ ] 4.9 spokojenost (zvážit úplně vyhodit, dokud nejsou reálné recenze)
- [ ] „9 dní do pohovoru", „9 z 10 nastoupí", „−40 %", „3×", „1 200+ pozic"
- [ ] platové rozsahy v salary-guide
> Dokud nejsou reálná, nedávej je do placeného marketingu (riziko nekalé soutěže).

## D. Rozhodnutí
- [ ] **Pricing** — názvy tierů + reálné ceny (Lead-gen €290? Retained fee? RPO paušál?).
- [ ] **„Demo buchen" cíl** — reálný booking odkaz (Calendly apod.) nebo kontaktní formulář?
- [ ] **WhatsApp číslo** — potvrdit, že `+43 676 9124013` je produkční.
- [ ] **EN audience** — potvrdit směr (en = mezinárodní vízoví kandidáti + showcase projektu).
- [ ] **Match score veřejně** — teď schované pro nepřihlášené. Nechat tak?
- [ ] **AI recepční** — zapnout placené LLM Q&A? (provider + klíč) Teď běží zdarma z KB.

## E. Data / integrace
- [ ] **Job board** — reálná data místo mock (`lib/mockJobs.ts`). Zdroj/feed? Pak napojím na Supabase.
- [ ] **Kontaktní formulář + leady** — kam mají chodit? (e-mail, Sheet, CRM)
- [ ] **Supabase** — potvrdit, že migrace jsou nasazené a candidate/employer flow reálně projde.

## Co dělám já mezitím (nepotřebuju od tebe)
- Dolokalizovat zbytek: **job detail, candidate/employer dashboard, salary-guide labely, jobs sort**.
- Čekám na tvoje reference k **homepage konci** a **About** → pak je předělám.
