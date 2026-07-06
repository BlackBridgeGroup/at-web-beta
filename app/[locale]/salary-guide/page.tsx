import { notFound } from 'next/navigation';
import { SiteShell } from '../../../components/SiteShell';
import { BentoSection } from '../../../components/BentoSection';
import { locales, normalizeLocale, type Locale } from '../../../lib/i18n';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const raw = (await params).locale;
  const locale = normalizeLocale(raw) as Locale;
  const titles: Record<Locale, string> = {
    en: 'Hospitality Salary Guide — Austria',
    de: 'Gehaltsübersicht Hotellerie — Österreich',
    cz: 'Průvodce platy v hotelnictví — Rakousko',
  };
  const descriptions: Record<Locale, string> = {
    en: 'Indicative salary ranges for hospitality roles in Austrian hotels and restaurants — for orientation before a personal match.',
    de: 'Orientierende Gehaltsspannen für Hospitality-Positionen in österreichischen Hotels und Restaurants — als Grundlage vor dem persönlichen Matching.',
    cz: 'Orientační platová rozpětí pro pozice v rakouských hotelech a restauracích — jako základ před osobním výběrem role.',
  };
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: `https://alpentalent.com/${locale}/salary-guide`,
      languages: { de: '/de/salary-guide', cs: '/cz/salary-guide', en: '/en/salary-guide' },
    },
  };
}

type LS = Record<string, string>;
const pickFactory = (locale: Locale) => (m: LS) => m[locale] ?? m.en;

const ROLES: Record<string, LS> = {
  reception_entry: { de: 'Rezeptionist:in', cz: 'Recepční', en: 'Receptionist' },
  reception_exp: { de: 'Rezeptionist:in', cz: 'Recepční', en: 'Receptionist' },
  chef_de_partie: { de: 'Chef de Partie', cz: 'Chef de Partie', en: 'Chef de Partie' },
  sous_chef: { de: 'Sous Chef', cz: 'Sous Chef', en: 'Sous Chef' },
  kitchen_assistant: { de: 'Küchenhilfe', cz: 'Pomocná síla v kuchyni', en: 'Kitchen Assistant' },
  waiter: { de: 'Kellner:in', cz: 'Číšník / servírka', en: 'Waiter / Waitress' },
  housekeeper: { de: 'Zimmerreinigung', cz: 'Pokojská', en: 'Housekeeper' },
  chef_de_cuisine: { de: 'Chef de Cuisine', cz: 'Šéfkuchař', en: 'Chef de Cuisine' },
};

const LEVELS: Record<string, LS> = {
  entry: { de: 'Einstieg', cz: 'Začátečník', en: 'Entry' },
  experienced: { de: 'Erfahren', cz: 'Zkušený', en: 'Experienced' },
  mid: { de: 'Mittel', cz: 'Střední', en: 'Mid' },
  senior: { de: 'Senior', cz: 'Senior', en: 'Senior' },
};

const REGIONS: Record<string, LS> = {
  tyrol_salzburg: { de: 'Tirol / Salzburg', cz: 'Tyrolsko / Salcbursko', en: 'Tyrol / Salzburg' },
  all: { de: 'Alle Regionen', cz: 'Všechny regiony', en: 'All regions' },
};

const salaries = [
  { role: 'reception_entry', level: 'entry', range: '€24.600 – €34.400', median: '€29.500', region: 'all' },
  { role: 'reception_exp', level: 'experienced', range: '€30.000 – €35.000', median: '€32.500', region: 'tyrol_salzburg' },
  { role: 'chef_de_partie', level: 'mid', range: '€27.100 – €41.100', median: '€34.100', region: 'all' },
  { role: 'sous_chef', level: 'senior', range: '€31.100 – €46.000', median: '€38.550', region: 'all' },
  { role: 'kitchen_assistant', level: 'entry', range: '€21.300 – €30.000', median: '€25.650', region: 'all' },
  { role: 'waiter', level: 'entry', range: '€22.200 – €31.000', median: '€26.600', region: 'all' },
  { role: 'housekeeper', level: 'entry', range: '€23.500 – €31.600', median: '€27.550', region: 'tyrol_salzburg' },
  { role: 'chef_de_cuisine', level: 'senior', range: '€37.000 – €56.600', median: '€46.800', region: 'all' },
];

type Content = {
  eyebrow: string; h1: string; intro: string;
  headers: { role: string; level: string; range: string; median: string; regions: string };
  disclaimer: string; sourceLine: string;
  bentoEyebrow: string; bentoHeading: string; bentoSub: string;
  t1title: string; t1body: string;
  t2title: string; t2body: string;
  t3title: string; t3body: string;
  t4title: string; t4body: string;
};

const T: Record<string, Content> = {
  de: {
    eyebrow: 'Gehaltsguide · Österreich',
    h1: 'Gehälter in der österreichischen Hotellerie',
    intro: 'Orientierende Gehaltsspannen für österreichische Hospitality-Rollen. Angaben sind Brutto pro Jahr. Saisonstellen beinhalten oft Unterkunft und Verpflegung — das beeinflusst den effektiven Netto-Wert deutlich.',
    headers: { role: 'Position', level: 'Level', range: 'Spanne brutto/Jahr', median: 'Mitte', regions: 'Regionen' },
    disclaimer: 'Die Spannen sind Richtwerte. Das genaue Gehalt hängt von Arbeitgeber, Erfahrung, Region, Saison und Vertragsart ab. Unterkunft und Verpflegung können zusätzlich effektiven Wert schaffen.',
    sourceLine: 'Stand: Juli 2026. Grundlage: öffentlich sichtbare Angaben von StepStone Österreich, hogastjob, ERI/SalaryExpert sowie österreichische KV-/Mindestlohn-Informationen. „Mitte“ ist die rechnerische Mitte der genannten Spanne, keine Gehaltsgarantie.',
    bentoEyebrow: 'Österreichische Löhne verstehen',
    bentoHeading: 'Was dein Netto beeinflusst',
    bentoSub: 'Österreichische Gehälter kommen mit starkem gesetzlichem Schutz und branchenweiten Mindestlöhnen. Das ist entscheidend.',
    t1title: 'Sozialversicherung',
    t1body: 'Arbeitnehmeranteil für Pensions-, Kranken-, Unfall- und Arbeitslosenversicherung — automatisch vom Brutto abgezogen.',
    t2title: 'Kollektivvertrag',
    t2body: 'Der Kollektivvertrag (KV) legt für jede Position gesetzlich verbindliche Mindestlöhne fest. Dein Arbeitgeber darf nicht unter KV zahlen. Wird jeden Dezember aktualisiert.',
    t3title: 'Unterkunft & Verpflegung',
    t3body: 'Personalunterkunft und Verpflegung bringen echten Netto-Mehrwert, der im Brutto nicht sichtbar ist. Beim Vergleich von Angeboten immer einrechnen.',
    t4title: 'Alpen-Aufschlag',
    t4body: 'Resort-Stellen in Tirol, Vorarlberg und Salzburg zahlen oft 10–20% über dem KV-Minimum — wegen Nachfrage, Saisonalität und Lebenshaltungskosten in Skiregionen.',
  },
  cz: {
    eyebrow: 'Průvodce platy · Rakousko',
    h1: 'Platy v rakouském hotelnictví',
    intro: 'Orientační platová rozpětí pro rakouské hospitality pozice. Údaje jsou v hrubém za rok. Sezónní pozice často zahrnují ubytování a stravu — to výrazně ovlivňuje efektivní čistou hodnotu nabídky.',
    headers: { role: 'Pozice', level: 'Úroveň', range: 'Rozpětí hrubě/rok', median: 'Střed', regions: 'Regiony' },
    disclaimer: 'Rozpětí jsou orientační. Přesný plat závisí na zaměstnavateli, praxi, regionu, sezóně a typu smlouvy. Ubytování a strava mohou navíc přidat reálnou hodnotu.',
    sourceLine: 'Stav: červenec 2026. Základ: veřejně dostupná data ze StepStone Österreich, hogastjob, ERI/SalaryExpert a rakouské informace ke KV/minimálním mzdám. „Střed“ je matematická polovina uvedeného rozpětí, ne garance mzdy.',
    bentoEyebrow: 'Jak funguje rakouská mzda',
    bentoHeading: 'Co ovlivňuje tvůj čistý příjem',
    bentoSub: 'Rakouské platy mají silnou zákonnou ochranu a oborové minimální mzdy. Tohle je klíčové.',
    t1title: 'Sociální pojištění',
    t1body: 'Zaměstnancova část důchodového, zdravotního, úrazového a nezaměstnaneckého pojištění — automaticky strženo z hrubého.',
    t2title: 'Kollektivvertrag (KV)',
    t2body: 'Oborová kolektivní smlouva (KV) stanovuje zákonně závazné minimální mzdy pro každou pozici. Zaměstnavatel nesmí platit pod KV. Aktualizuje se každý prosinec.',
    t3title: 'Ubytování a strava',
    t3body: 'Ubytování a strava pro personál přidávají reálnou čistou hodnotu, která není vidět v hrubé mzdě. Při porovnávání nabídek vždy započítej.',
    t4title: 'Alpský příplatek',
    t4body: 'Pozice ve střediscích v Tyrolsku, Vorarlbersku a Salcbursku často platí 10–20 % nad minimem KV — kvůli poptávce, sezónnosti a nákladům na život v lyžařských destinacích.',
  },
  en: {
    eyebrow: 'Salary guide · Austria',
    h1: 'Hospitality salaries in Austria',
    intro: 'Indicative salary ranges for Austrian hospitality roles. Figures are annual gross. Seasonal roles may include housing and meals — this affects the effective net value meaningfully.',
    headers: { role: 'Role', level: 'Level', range: 'Gross/year range', median: 'Midpoint', regions: 'Regions' },
    disclaimer: 'Ranges are indicative. Exact salary depends on employer, experience, region, season, and contract type. Housing and meal provisions can add effective value.',
    sourceLine: 'Updated July 2026. Based on publicly visible data from StepStone Austria, hogastjob, ERI/SalaryExpert, and Austrian collective-agreement/minimum-wage information. “Midpoint” is the mathematical middle of the listed range, not a salary guarantee.',
    bentoEyebrow: 'Understanding Austrian pay',
    bentoHeading: 'What affects your take-home',
    bentoSub: "Austrian salaries come with strong legal protections and sector-wide minimums. Here's what matters.",
    t1title: 'Social insurance contribution',
    t1body: 'Employee share of pension, health, accident and unemployment insurance — automatically deducted from gross.',
    t2title: 'Kollektivvertrag',
    t2body: 'The sector collective agreement (KV) sets legally binding minimum wages for every role. Your employer cannot pay below KV, regardless of what they offer. Updated each December.',
    t3title: 'Housing & meals',
    t3body: 'Staff housing and meal provisions add meaningful net value not reflected in the gross salary. Always factor them in when comparing offers.',
    t4title: 'Alpine premium',
    t4body: 'Resort roles in Tyrol, Vorarlberg and Salzburg often pay 10–20% above KV minimum due to demand, seasonality and cost of living in ski destinations.',
  },
};

const fileIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);
const peakIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
  </svg>
);

export default async function SalaryGuide({ params }: { params: Promise<{ locale: string }> }) {
  const raw = (await params).locale;
  if (!['de', 'cz', 'en'].includes(raw)) notFound();
  const locale = normalizeLocale(raw) as Locale;
  const t = T[locale] ?? T.de;
  const pick = pickFactory(locale);

  return (
    <SiteShell locale={locale}>
      <div style={{ paddingBlock: 'clamp(48px, 8vw, 96px)' }}>
        <div className="at-container">
          <div style={{ maxWidth: 600, marginBottom: 'var(--space-6)' }}>
            <p style={{ margin: '0 0 12px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--at-alpine-green)' }}>
              {t.eyebrow}
            </p>
            <h1 className="at-h1" style={{ margin: '0 0 var(--space-2)' }}>{t.h1}</h1>
            <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.7 }}>{t.intro}</p>
          </div>

          {/* Salary table */}
          <div className="at-card" style={{ overflow: 'hidden', padding: 0, marginBottom: 'var(--space-2)' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontVariantNumeric: 'tabular-nums', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-sunken)', borderBottom: '1px solid var(--border)' }}>
                    {[t.headers.role, t.headers.level, t.headers.range, t.headers.median, t.headers.regions].map(h => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, whiteSpace: 'nowrap', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {salaries.map((row, i) => (
                    <tr key={i} style={{ borderBottom: i < salaries.length - 1 ? '1px solid var(--border)' : 'none' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 600 }}>{pick(ROLES[row.role])}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>{pick(LEVELS[row.level])}</td>
                      <td style={{ padding: '12px 16px' }}>{row.range}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--at-alpine-green)', fontWeight: 600 }}>{row.median}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>{pick(REGIONS[row.region])}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p style={{ margin: '0 0 6px', color: 'var(--text-subtle)', fontSize: '0.8125rem' }}>{t.disclaimer}</p>
          <p style={{ marginBottom: 'var(--space-8)', color: 'var(--text-subtle)', fontSize: '0.75rem', lineHeight: 1.6 }}>{t.sourceLine}</p>
        </div>
      </div>

      {/* Context bento */}
      <BentoSection
        eyebrow={t.bentoEyebrow}
        heading={t.bentoHeading}
        sub={t.bentoSub}
        tiles={[
          { variant: 'stat', stat: '~18%', title: t.t1title, body: t.t1body },
          { variant: 'feature', title: t.t2title, body: t.t2body, icon: fileIcon },
          { variant: 'stat', stat: '+€300–500', title: t.t3title, body: t.t3body },
          { variant: 'feature', title: t.t4title, body: t.t4body, icon: peakIcon },
        ]}
      />
    </SiteShell>
  );
}
