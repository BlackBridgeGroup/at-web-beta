import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteShell } from '../../../components/SiteShell';
import { locales, normalizeLocale, type Locale } from '../../../lib/i18n';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const raw = (await params).locale;
  const locale = normalizeLocale(raw) as Locale;
  const titles: Record<Locale, string> = {
    en: 'Hospitality Roles We Place — Austria | AlpenTalent',
    de: 'Hospitality-Rollen, die wir vermitteln — Österreich | AlpenTalent',
    cz: 'Pozice v hotelnictví, které umísťujeme — Rakousko | AlpenTalent',
  };
  return {
    title: titles[locale],
    description: 'The hospitality roles AlpenTalent places in Austria — with real salary ranges and regions. We match candidates personally; we are not an anonymous job board.',
    alternates: {
      canonical: `https://alpentalent.com/${locale}/jobs`,
      languages: { de: '/de/jobs', cs: '/cz/jobs', en: '/en/jobs' },
    },
  };
}

type Role = { name: string; salary: string; regions: string; desc: string; housing?: boolean };
type Content = {
  eyebrow: string; h1: string; sub: string; cta: string;
  marketEyebrow: string; marketHeading: string; marketSub: string;
  stats: [string, string][];
  marketSource: string;
  rolesEyebrow: string; rolesHeading: string; rolesSub: string;
  salaryLabel: string; regionsLabel: string; housingLabel: string;
  roles: Role[];
  ctaT: string; ctaB: string; ctaBook: string; ctaProfile: string;
  disclaimer: string;
};

const T: Record<string, Content> = {
  de: {
    eyebrow: 'Rollen & Markt',
    h1: 'Die Rollen, die wir in Österreich vermitteln.',
    sub: 'AlpenTalent ist kein anonymes Jobboard. Wir nehmen dein Profil auf, prüfen Region, Sprache, Erfahrung und Verfügbarkeit und schlagen dir passende Rollen persönlich vor. Unten siehst du die typischen Positionen mit realen Gehaltsspannen.',
    cta: 'Profil senden',
    marketEyebrow: 'Der Markt',
    marketHeading: 'Österreich sucht Hospitality-Fachkräfte.',
    marketSub: 'Der Fachkräftemangel in Tourismus und Gastronomie ist strukturell — gut für Kandidaten, die jetzt einsteigen.',
    stats: [
      ['~30.000', 'fehlende Arbeitskräfte im österreichischen Tourismus'],
      ['Mangelberuf', 'nahezu alle Hospitality-Berufe stehen auf der AMS-Liste 2025'],
      ['~20.000', 'zusätzlicher Bedarf bis 2040 in Beherbergung & Gastronomie'],
    ],
    marketSource: 'Quellen: AMS Österreich (Mangelberufsliste 2025), WKO, ORF.',
    rolesEyebrow: 'Rollenkatalog',
    rolesHeading: 'Positionen, die wir regelmäßig besetzen',
    rolesSub: 'Reale Gehaltsspannen (Brutto/Monat), basierend auf Vermittlungen 2024–2025. Der genaue Wert hängt von Betrieb, Erfahrung und Region ab.',
    salaryLabel: 'Gehalt', regionsLabel: 'Regionen', housingLabel: 'Unterkunft oft inklusive',
    roles: [
      { name: 'Rezeption / Front Office', salary: '€1.800 – €2.800', regions: 'Tirol, Salzburg, Wien', desc: 'Check-in, Gästebetreuung, Reservierungen. Deutsch wichtig, Englisch von Vorteil.' },
      { name: 'Chef de Partie', salary: '€2.400 – €3.000', regions: 'Alle Regionen', desc: 'Verantwortung für einen Küchenposten. Erfahrung in der gehobenen Küche gefragt.', housing: true },
      { name: 'Sous Chef', salary: '€2.800 – €3.500', regions: 'Alle Regionen', desc: 'Stellvertretung der Küchenleitung, Führung des Teams im Service.', housing: true },
      { name: 'Küchenhilfe', salary: '€1.700 – €2.100', regions: 'Alle Regionen', desc: 'Einstieg in die Küche. Ideal für den Berufsstart oder Saisonarbeit.', housing: true },
      { name: 'Service / Kellner:in', salary: '€1.800 – €2.400', regions: 'Alle Regionen', desc: 'Gästeservice im Restaurant. Trinkgeld kommt zum Gehalt hinzu.', housing: true },
      { name: 'Housekeeping', salary: '€1.700 – €2.000', regions: 'Alle Regionen', desc: 'Zimmerreinigung und -pflege. Verlässlichkeit zählt mehr als Sprache.', housing: true },
      { name: 'Hotel Management', salary: '€3.500 – €5.000+', regions: 'Alle Regionen', desc: 'Betriebs- und Abteilungsleitung. Mehrjährige Erfahrung vorausgesetzt.' },
    ],
    ctaT: 'Passt eine dieser Rollen zu dir?', ctaB: 'Sende dein Profil oder buche eine Career Consultation — wir melden uns mit passenden Rollen.',
    ctaBook: 'Career Consultation', ctaProfile: 'Profil senden',
    disclaimer: 'Dies ist ein Überblick der Rollen, die wir vermitteln — keine Liste tagesaktueller Einzelstellen. Konkrete offene Positionen stimmen wir individuell nach deinem Profil ab.',
  },
  cz: {
    eyebrow: 'Role a trh',
    h1: 'Pozice, které umísťujeme v Rakousku.',
    sub: 'AlpenTalent není anonymní job board. Nejdřív zjistíme tvoje zkušenosti, němčinu, dostupnost a region — pak ti osobně navrhneme vhodné role. Níže vidíš typické pozice s reálnými platovými rozpětími.',
    cta: 'Vyplnit profil',
    marketEyebrow: 'Trh',
    marketHeading: 'Rakousko hledá lidi do hotelnictví.',
    marketSub: 'Nedostatek personálu v turismu a gastronomii je strukturální — výhoda pro kandidáty, kteří nastoupí teď.',
    stats: [
      ['~30 000', 'chybějících pracovníků v rakouském turismu'],
      ['Nedostatkový obor', 'téměř všechny pozice v hotelnictví jsou na seznamu AMS 2025'],
      ['~20 000', 'další potřeba do roku 2040 v ubytování a gastronu'],
    ],
    marketSource: 'Zdroje: AMS Rakousko (Mangelberufsliste 2025), WKO, ORF.',
    rolesEyebrow: 'Katalog rolí',
    rolesHeading: 'Pozice, které pravidelně obsazujeme',
    rolesSub: 'Reálná platová rozpětí (hrubé/měsíc) na základě umístění 2024–2025. Přesná částka závisí na provozu, praxi a regionu.',
    salaryLabel: 'Plat', regionsLabel: 'Regiony', housingLabel: 'Ubytování často v ceně',
    roles: [
      { name: 'Recepce / Front Office', salary: '€1.800 – €2.800', regions: 'Tyrolsko, Salcbursko, Vídeň', desc: 'Check-in, péče o hosty, rezervace. Němčina důležitá, angličtina výhodou.' },
      { name: 'Chef de Partie', salary: '€2.400 – €3.000', regions: 'Všechny regiony', desc: 'Odpovědnost za jeden kuchyňský post. Praxe ve vyšší gastronomii vítána.', housing: true },
      { name: 'Sous Chef', salary: '€2.800 – €3.500', regions: 'Všechny regiony', desc: 'Zástup šéfkuchaře, vedení týmu v provozu.', housing: true },
      { name: 'Pomocná síla v kuchyni', salary: '€1.700 – €2.100', regions: 'Všechny regiony', desc: 'Vstup do kuchyně. Ideální pro začátek nebo sezónu.', housing: true },
      { name: 'Obsluha / číšník', salary: '€1.800 – €2.400', regions: 'Všechny regiony', desc: 'Servis hostů v restauraci. Spropitné navíc k platu.', housing: true },
      { name: 'Housekeeping', salary: '€1.700 – €2.000', regions: 'Všechny regiony', desc: 'Úklid a péče o pokoje. Spolehlivost víc než jazyk.', housing: true },
      { name: 'Hotel management', salary: '€3.500 – €5.000+', regions: 'Všechny regiony', desc: 'Vedení provozu či oddělení. Nutná víceletá praxe.' },
    ],
    ctaT: 'Sedí ti některá z těch rolí?', ctaB: 'Pošli profil nebo si rezervuj kariérní konzultaci — ozveme se s vhodnými rolemi.',
    ctaBook: 'Kariérní konzultace', ctaProfile: 'Vyplnit profil',
    disclaimer: 'Tohle je přehled rolí, které umísťujeme — ne seznam denně aktualizovaných jednotlivých inzerátů. Konkrétní otevřené pozice ladíme individuálně podle tvého profilu.',
  },
  en: {
    eyebrow: 'Roles & market',
    h1: 'The roles we place in Austria.',
    sub: 'AlpenTalent is not an anonymous job board. We take your profile, review region, language, experience, and availability, then suggest fitting roles personally. Below are the typical positions with real salary ranges.',
    cta: 'Send profile',
    marketEyebrow: 'The market',
    marketHeading: 'Austria is hiring hospitality talent.',
    marketSub: 'The labour shortage in tourism and hospitality is structural — an advantage for candidates entering now.',
    stats: [
      ['~30,000', 'missing workers in Austrian tourism'],
      ['Shortage occupation', 'nearly all hospitality roles are on the 2025 AMS list'],
      ['~20,000', 'additional need by 2040 in accommodation & hospitality'],
    ],
    marketSource: 'Sources: AMS Austria (2025 shortage-occupation list), WKO, ORF.',
    rolesEyebrow: 'Role catalogue',
    rolesHeading: 'Positions we place regularly',
    rolesSub: 'Real salary ranges (monthly gross), based on 2024–2025 placements. The exact figure depends on the property, experience, and region.',
    salaryLabel: 'Salary', regionsLabel: 'Regions', housingLabel: 'Housing often included',
    roles: [
      { name: 'Reception / Front Office', salary: '€1,800 – €2,800', regions: 'Tyrol, Salzburg, Vienna', desc: 'Check-in, guest care, reservations. German important, English an advantage.' },
      { name: 'Chef de Partie', salary: '€2,400 – €3,000', regions: 'All regions', desc: 'Responsibility for a kitchen station. Experience in quality kitchens valued.', housing: true },
      { name: 'Sous Chef', salary: '€2,800 – €3,500', regions: 'All regions', desc: 'Deputy to the head chef, leading the team in service.', housing: true },
      { name: 'Kitchen Assistant', salary: '€1,700 – €2,100', regions: 'All regions', desc: 'An entry into the kitchen. Ideal for starting out or seasonal work.', housing: true },
      { name: 'Service / Waiter', salary: '€1,800 – €2,400', regions: 'All regions', desc: 'Guest service in the restaurant. Tips come on top of salary.', housing: true },
      { name: 'Housekeeping', salary: '€1,700 – €2,000', regions: 'All regions', desc: 'Room cleaning and care. Reliability matters more than language.', housing: true },
      { name: 'Hotel Management', salary: '€3,500 – €5,000+', regions: 'All regions', desc: 'Property or department leadership. Several years of experience required.' },
    ],
    ctaT: 'Does one of these roles fit you?', ctaB: 'Send your profile or book an Career Consultation — we reach out with matching roles.',
    ctaBook: 'Career Consultation', ctaProfile: 'Send profile',
    disclaimer: 'This is an overview of the roles we place — not a list of day-to-day individual vacancies. Specific open positions are matched to you individually based on your profile.',
  },
};

export default async function JobsPage({ params }: { params: Promise<{ locale: string }> }) {
  const raw = (await params).locale;
  if (!['de', 'cz', 'en'].includes(raw)) notFound();
  const locale = normalizeLocale(raw) as Locale;
  const t = T[locale] ?? T.de;

  return (
    <SiteShell locale={locale}>
      {/* Hero */}
      <section style={{ background: 'var(--bg-sunken)', borderBottom: '1px solid var(--border)', paddingBlock: 'clamp(56px, 8vw, 96px)' }}>
        <div className="at-container" style={{ maxWidth: 760 }}>
          <p style={{ margin: '0 0 12px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--at-alpine-green)' }}>{t.eyebrow}</p>
          <h1 className="at-h1" style={{ margin: '0 0 var(--space-2)' }}>{t.h1}</h1>
          <p style={{ margin: '0 0 var(--space-4)', color: 'var(--text-muted)', lineHeight: 1.75, fontSize: '1rem' }}>{t.sub}</p>
          <Link href={`/${locale}/fragebogen`} className="at-btn at-btn--primary">{t.cta}</Link>
        </div>
      </section>

      {/* Market context */}
      <section style={{ paddingBlock: 'var(--space-8)' }}>
        <div className="at-container" style={{ maxWidth: 900 }}>
          <p style={{ margin: '0 0 8px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--at-alpine-green)' }}>{t.marketEyebrow}</p>
          <h2 className="at-h1" style={{ margin: '0 0 8px' }}>{t.marketHeading}</h2>
          <p style={{ margin: '0 0 var(--space-4)', color: 'var(--text-muted)', lineHeight: 1.7 }}>{t.marketSub}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-2)' }}>
            {t.stats.map(([num, label]) => (
              <div key={label} className="at-card" style={{ padding: 'var(--space-4)' }}>
                <p style={{ margin: '0 0 4px', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.875rem', color: 'var(--at-alpine-green)', lineHeight: 1.05 }}>{num}</p>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{label}</p>
              </div>
            ))}
          </div>
          <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.75rem', color: 'var(--text-subtle)' }}>{t.marketSource}</p>
        </div>
      </section>

      {/* Role catalogue */}
      <section style={{ paddingBlock: 'var(--space-8)', background: 'var(--bg-sunken)', borderBlock: '1px solid var(--border)' }}>
        <div className="at-container">
          <p style={{ margin: '0 0 8px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--at-alpine-green)' }}>{t.rolesEyebrow}</p>
          <h2 className="at-h1" style={{ margin: '0 0 8px' }}>{t.rolesHeading}</h2>
          <p style={{ margin: '0 0 var(--space-5)', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 720 }}>{t.rolesSub}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-3)' }}>
            {t.roles.map(role => (
              <div key={role.name} className="at-card" style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p className="at-h3" style={{ margin: 0 }}>{role.name}</p>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9375rem', lineHeight: 1.6, flex: 1 }}>{role.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, borderTop: '1px solid var(--border)', paddingTop: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--text-subtle)' }}>{t.salaryLabel}</span>
                    <span style={{ fontWeight: 700, color: 'var(--at-alpine-green)', fontVariantNumeric: 'tabular-nums' }}>{role.salary}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                    <span style={{ color: 'var(--text-subtle)' }}>{t.regionsLabel}</span>
                    <span style={{ textAlign: 'right' }}>{role.regions}</span>
                  </div>
                  {role.housing && (
                    <span style={{ marginTop: 2, fontSize: '0.75rem', color: 'var(--at-alpine-green)', fontWeight: 600 }}>✓ {t.housingLabel}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p style={{ margin: 'var(--space-4) 0 0', fontSize: '0.8125rem', color: 'var(--text-subtle)', lineHeight: 1.6, maxWidth: 720 }}>{t.disclaimer}</p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--at-alpine-green)', color: '#fff', paddingBlock: 'var(--space-8)', textAlign: 'center' }}>
        <div className="at-container" style={{ maxWidth: 620 }}>
          <h2 className="at-h1" style={{ color: '#fff', margin: '0 0 8px' }}>{t.ctaT}</h2>
          <p style={{ margin: '0 0 var(--space-4)', opacity: 0.9 }}>{t.ctaB}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <Link href={`/${locale}/career-consultation`} className="at-btn" style={{ background: '#fff', color: 'var(--at-alpine-green)', fontWeight: 700 }}>{t.ctaBook}</Link>
            <Link href={`/${locale}/fragebogen`} className="at-btn" style={{ background: 'transparent', color: '#fff', boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.5)' }}>{t.ctaProfile}</Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
