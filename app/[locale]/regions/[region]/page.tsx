import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SiteShell } from '../../../../components/SiteShell';
import { locales, normalizeLocale, type Locale } from '../../../../lib/i18n';
import type { Metadata } from 'next';

type LS = Record<string, string>;
type Region = { slug: string; name: LS; highlights: LS; body: LS };

const regions: Region[] = [
  {
    slug: 'tyrol',
    name: { de: 'Tirol', cz: 'Tyrolsko', en: 'Tyrol' },
    highlights: { de: 'Kitzbühel, Innsbruck, St. Anton', cz: 'Kitzbühel, Innsbruck, St. Anton', en: 'Kitzbühel, Innsbruck, St. Anton' },
    body: {
      en: "Tyrol is Austria's premier ski and outdoor destination, home to some of the country's most iconic resorts. Hotels here are open year-round, with peak demand in winter (December–March) and summer (June–August). Housing is almost always included. German is essential for most roles; English is increasingly common in five-star properties.",
      de: 'Tirol ist Österreichs führende Ski- und Outdoor-Destination mit einigen der bekanntesten Resorts des Landes. Hotels haben hier ganzjährig geöffnet, mit Spitzen im Winter (Dezember–März) und Sommer (Juni–August). Eine Unterkunft ist fast immer inklusive. Deutsch ist für die meisten Stellen unerlässlich; Englisch wird in Fünf-Sterne-Häusern immer üblicher.',
      cz: 'Tyrolsko je přední rakouská lyžařská a outdoorová destinace s několika nejznámějšími středisky v zemi. Hotely tu mají otevřeno celoročně, s vrcholem v zimě (prosinec–březen) a v létě (červen–srpen). Ubytování bývá téměř vždy v ceně. Němčina je pro většinu pozic nezbytná; angličtina je stále běžnější v pětihvězdičkových hotelech.',
    },
  },
  {
    slug: 'salzburg',
    name: { de: 'Salzburg', cz: 'Salcbursko', en: 'Salzburg' },
    highlights: { de: 'Salzburg, Zell am See, Obertauern', cz: 'Salzburg, Zell am See, Obertauern', en: 'Salzburg city, Zell am See, Obertauern' },
    body: {
      en: 'Salzburg combines Austria\'s most famous city with mountain resort towns. Zell am See and Obertauern attract international guests all year. English is widely spoken in city hotels. Excellent transport links to Germany and Czech Republic make it a popular placement region.',
      de: 'Salzburg verbindet Österreichs berühmteste Stadt mit Bergresort-Orten. Zell am See und Obertauern ziehen das ganze Jahr internationale Gäste an. In Stadthotels wird viel Englisch gesprochen. Gute Verkehrsanbindungen nach Deutschland und Tschechien machen die Region zu einem beliebten Einsatzgebiet.',
      cz: 'Salcbursko spojuje nejslavnější rakouské město s horskými středisky. Zell am See a Obertauern lákají mezinárodní hosty po celý rok. V městských hotelech se hodně mluví anglicky. Dobré spojení do Německa a Česka dělá z regionu oblíbenou oblast pro umístění.',
    },
  },
  {
    slug: 'vorarlberg',
    name: { de: 'Vorarlberg', cz: 'Vorarlbersko', en: 'Vorarlberg' },
    highlights: { de: 'Lech, Bregenz, Montafon', cz: 'Lech, Bregenz, Montafon', en: 'Lech, Bregenz, Montafon' },
    body: {
      en: "Austria's westernmost province is home to Lech am Arlberg — one of the most exclusive ski areas in the Alps. Salaries and tips tend to be higher than average. The region has strong connections to Germany and Switzerland. Hotels typically run from December to April and June to October.",
      de: 'Österreichs westlichste Provinz beheimatet Lech am Arlberg — eines der exklusivsten Skigebiete der Alpen. Gehälter und Trinkgelder liegen über dem Durchschnitt. Die Region ist eng mit Deutschland und der Schweiz verbunden. Hotels haben meist von Dezember bis April und von Juni bis Oktober geöffnet.',
      cz: 'Nejzápadnější rakouská provincie je domovem Lech am Arlberg — jednoho z nejexkluzivnějších lyžařských areálů v Alpách. Platy a spropitné bývají nadprůměrné. Region má silné vazby na Německo a Švýcarsko. Hotely obvykle fungují od prosince do dubna a od června do října.',
    },
  },
  {
    slug: 'vienna',
    name: { de: 'Wien', cz: 'Vídeň', en: 'Vienna' },
    highlights: { de: 'Internationale Hotels, Restaurants, Fine Dining', cz: 'Mezinárodní hotely, restaurace, fine dining', en: 'International hotels, restaurants, fine dining' },
    body: {
      en: "Vienna hosts some of Europe's finest grand hotels and a thriving restaurant scene. Roles here are predominantly year-round and include more management and fine-dining positions than alpine resorts. German is essential. The city's international character means multiple languages are an asset.",
      de: 'Wien beherbergt einige der feinsten Grandhotels Europas und eine lebendige Restaurantszene. Stellen sind hier überwiegend ganzjährig und umfassen mehr Management- und Fine-Dining-Positionen als alpine Resorts. Deutsch ist unerlässlich. Der internationale Charakter der Stadt macht mehrere Sprachen zum Vorteil.',
      cz: 'Vídeň hostí jedny z nejlepších grandhotelů v Evropě a živou restaurační scénu. Pozice jsou tu převážně celoroční a zahrnují víc manažerských a fine-dining míst než alpská střediska. Němčina je nezbytná. Mezinárodní charakter města dělá z více jazyků výhodu.',
    },
  },
  {
    slug: 'styria',
    name: { de: 'Steiermark', cz: 'Štýrsko', en: 'Styria' },
    highlights: { de: 'Graz, Schladming, Bad Aussee', cz: 'Graz, Schladming, Bad Aussee', en: 'Graz, Schladming, Bad Aussee' },
    body: {
      en: 'Styria is less crowded than Tyrol but equally beautiful. Schladming hosted the 2013 Alpine Ski World Championships and remains a major resort. The Graz restaurant scene is growing fast. Salaries are comparable to other regions; housing is often included in resort areas.',
      de: 'Die Steiermark ist weniger überlaufen als Tirol, aber genauso schön. Schladming war Austragungsort der Alpinen Ski-WM 2013 und ist nach wie vor ein bedeutendes Resort. Die Grazer Restaurantszene wächst schnell. Die Gehälter sind mit anderen Regionen vergleichbar; in Resort-Gebieten ist die Unterkunft oft inklusive.',
      cz: 'Štýrsko je méně přeplněné než Tyrolsko, ale stejně krásné. Schladming hostil mistrovství světa v alpském lyžování 2013 a zůstává významným střediskem. Restaurační scéna v Grazu rychle roste. Platy jsou srovnatelné s ostatními regiony; ve střediscích bývá ubytování často v ceně.',
    },
  },
  {
    slug: 'carinthia',
    name: { de: 'Kärnten', cz: 'Korutany', en: 'Carinthia' },
    highlights: { de: 'Klagenfurt, Velden, Villach', cz: 'Klagenfurt, Velden, Villach', en: 'Klagenfurt, Velden, Villach' },
    body: {
      en: "Carinthia borders Slovenia and Italy, giving it a distinctly Mediterranean feel. Lake Wörthersee is Austria's most popular summer resort area. The season runs from May to September. Italian and Slovenian speakers find natural advantages here; German remains essential.",
      de: 'Kärnten grenzt an Slowenien und Italien und hat dadurch ein mediterranes Flair. Der Wörthersee ist Österreichs beliebtestes Sommerresort-Gebiet. Die Saison läuft von Mai bis September. Italienisch- und Slowenischsprechende haben hier natürliche Vorteile; Deutsch bleibt unerlässlich.',
      cz: 'Korutany sousedí se Slovinskem a Itálií, díky čemuž mají středomořskou atmosféru. Jezero Wörthersee je nejoblíbenější rakouská letní rekreační oblast. Sezóna trvá od května do září. Mluvčí italštiny a slovinštiny tu mají přirozenou výhodu; němčina zůstává nezbytná.',
    },
  },
];

const UI: Record<string, { all: string; about: string; openRoles: string; newRoles: string; browse: string; seeAll: string; other: string }> = {
  de: { all: '← Alle Regionen', about: 'Über', openRoles: 'Rollen in', newRoles: 'Wir matchen Rollen in dieser Region nach Profil und Verfügbarkeit.', browse: 'Profil senden →', seeAll: 'Profil für Österreich senden →', other: 'Andere Regionen' },
  cz: { all: '← Všechny regiony', about: 'O regionu', openRoles: 'Role v regionu', newRoles: 'Role v tomto regionu párujeme podle profilu a dostupnosti.', browse: 'Vyplnit profil →', seeAll: 'Vyplnit profil pro Rakousko →', other: 'Další regiony' },
  en: { all: '← All regions', about: 'About', openRoles: 'Roles in', newRoles: 'We match roles in this region based on profile and availability.', browse: 'Send profile →', seeAll: 'Send Austria profile →', other: 'Other regions' },
};

function RegionIcon({ slug, size = 24 }: { slug: string; size?: number }) {
  const s = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };
  switch (slug) {
    case 'tyrol':      return <svg {...s}><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 7l-5-5-5 5"/><path d="M17 17l-5 5-5-5"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M7 7l-5 5 5 5"/><path d="M17 7l5 5-5 5"/></svg>;
    case 'salzburg':   return <svg {...s}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>;
    case 'vorarlberg': return <svg {...s}><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>;
    case 'vienna':     return <svg {...s}><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18z"/><path d="M6 12H4a2 2 0 0 0-2 2v8h4"/><path d="M18 9h2a2 2 0 0 1 2 2v11h-4"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>;
    case 'styria':     return <svg {...s}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>;
    case 'carinthia':  return <svg {...s}><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>;
    default: return null;
  }
}

export function generateStaticParams() {
  return locales.flatMap(locale => regions.map(r => ({ locale, region: r.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; region: string }> }): Promise<Metadata> {
  const { locale: raw, region: slug } = await params;
  const locale = normalizeLocale(raw) as Locale;
  const r = regions.find(x => x.slug === slug);
  if (!r) return {};
  const name = r.name[locale] ?? r.name.en;
  return {
    title: `Hospitality Jobs in ${name}, Austria`,
    description: `Find hospitality jobs in ${name} — hotels, restaurants and resorts in ${r.highlights[locale] ?? r.highlights.en}.`,
    alternates: {
      canonical: `https://alpentalent.com/${locale}/regions/${slug}`,
      languages: { de: `/de/regions/${slug}`, cs: `/cz/regions/${slug}`, en: `/en/regions/${slug}` },
    },
  };
}

export default async function RegionDetail({ params }: { params: Promise<{ locale: string; region: string }> }) {
  const { locale: raw, region: slug } = await params;
  if (!['de', 'cz', 'en'].includes(raw)) notFound();
  const locale = normalizeLocale(raw) as Locale;
  const u = UI[locale] ?? UI.de;

  const region = regions.find(r => r.slug === slug);
  if (!region) notFound();

  const name = region.name[locale] ?? region.name.en;
  const highlights = region.highlights[locale] ?? region.highlights.en;
  const otherRegions = regions.filter(r => r.slug !== slug).slice(0, 3);

  return (
    <SiteShell locale={locale}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, var(--at-alpine-green) 0%, #1E4D38 100%)', paddingBlock: 'clamp(48px, 8vw, 80px)' }}>
        <div className="at-container">
          <Link href={`/${locale}/regions`} style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', textDecoration: 'none', display: 'inline-block', marginBottom: 'var(--space-3)' }}>{u.all}</Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 'var(--space-2)' }}>
            <div style={{ color: 'rgba(255,255,255,0.85)', flexShrink: 0 }} aria-hidden="true"><RegionIcon slug={region.slug} size={36} /></div>
            <h1 className="at-display" style={{ color: '#fff', margin: 0 }}>{name}</h1>
          </div>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: '1rem' }}>{highlights}</p>
        </div>
      </div>

      {/* Content */}
      <div className="at-container" style={{ paddingBlock: 'var(--space-6)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)', alignItems: 'start' }}>
          <div>
            <h2 className="at-h2" style={{ margin: '0 0 var(--space-2)' }}>{u.about} {name}</h2>
            <p style={{ margin: '0 0 var(--space-4)', color: 'var(--text-muted)', lineHeight: 1.75 }}>{region.body[locale] ?? region.body.en}</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span className="at-chip">{highlights.split(', ')[0]}</span>
              <span className="at-chip">{highlights.split(', ')[1]}</span>
            </div>
          </div>

          <div>
            <h2 className="at-h2" style={{ margin: '0 0 var(--space-2)' }}>{u.openRoles} {name}</h2>
            <div className="at-card" style={{ padding: 'var(--space-4)', textAlign: 'center' }}>
              <p style={{ margin: '0 0 var(--space-2)', color: 'var(--text-muted)' }}>{u.newRoles}</p>
              <Link href={`/${locale}/fragebogen`} className="at-btn at-btn--primary at-btn--sm">{u.browse}</Link>
            </div>
            <div style={{ marginTop: 'var(--space-3)' }}>
              <Link href={`/${locale}/fragebogen`} className="at-btn at-btn--secondary at-btn--sm">{u.seeAll}</Link>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 'var(--space-8)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--border)' }}>
          <h2 className="at-h2" style={{ margin: '0 0 var(--space-3)' }}>{u.other}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-2)' }}>
            {otherRegions.map(r => (
              <Link key={r.slug} href={`/${locale}/regions/${r.slug}`} className="at-card at-card--interactive" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 'var(--space-2)', textDecoration: 'none' }}>
                <div style={{ color: 'var(--at-alpine-green)', flexShrink: 0 }} aria-hidden="true"><RegionIcon slug={r.slug} size={22} /></div>
                <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.9375rem' }}>{r.name[locale] ?? r.name.en}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
