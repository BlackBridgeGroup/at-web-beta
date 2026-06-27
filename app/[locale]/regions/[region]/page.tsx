import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SiteShell } from '../../../../components/SiteShell';
import { JobCard } from '../../../../components/JobCard';
import { locales, normalizeLocale, type Locale } from '../../../../lib/i18n';
import { mockJobs } from '../../../../lib/mockJobs';
import type { Metadata } from 'next';

const regions = [
  { slug: 'tyrol',      name: 'Tyrol',     nameDe: 'Tirol',      highlights: 'Kitzbühel, Innsbruck, St. Anton',           body: 'Tyrol is Austria\'s premier ski and outdoor destination, home to some of the country\'s most iconic resorts. Hotels here are open year-round, with peak demand in winter (December–March) and summer (June–August). Housing is almost always included. Languages: German is essential for most roles; English is increasingly common in five-star properties.' },
  { slug: 'salzburg',   name: 'Salzburg',  nameDe: 'Salzburg',   highlights: 'Salzburg city, Zell am See, Obertauern',    body: 'Salzburg combines Austria\'s most famous city with mountain resort towns. Zell am See and Obertauern attract international guests all year. English is widely spoken in city hotels. Excellent transport links to Germany and Czech Republic make it a popular placement region.' },
  { slug: 'vorarlberg', name: 'Vorarlberg',nameDe: 'Vorarlberg', highlights: 'Lech, Bregenz, Montafon',                   body: 'Austria\'s westernmost province is home to Lech am Arlberg — one of the most exclusive ski areas in the Alps. Salaries and tips tend to be higher than average. The region has strong connections to Germany and Switzerland. Hotels typically run from December to April and June to October.' },
  { slug: 'vienna',     name: 'Vienna',    nameDe: 'Wien',        highlights: 'International hotels, restaurants, fine dining', body: 'Vienna hosts some of Europe\'s finest grand hotels and a thriving restaurant scene. Roles here are predominantly year-round and include more management and fine-dining positions than alpine resorts. German is essential. The city\'s international character means multiple languages are an asset.' },
  { slug: 'styria',     name: 'Styria',    nameDe: 'Steiermark', highlights: 'Graz, Schladming, Bad Aussee',               body: 'Styria is less crowded than Tyrol but equally beautiful. Schladming hosted the 2013 Alpine Ski World Championships and remains a major resort. The Graz restaurant scene is growing fast. Salaries are comparable to other regions; housing is often included in resort areas.' },
  { slug: 'carinthia',  name: 'Carinthia', nameDe: 'Kärnten',    highlights: 'Klagenfurt, Velden, Villach',                body: 'Carinthia borders Slovenia and Italy, giving it a distinctly Mediterranean feel. Lake Wörthersee is Austria\'s most popular summer resort area. The season runs from May to September. Italian and Slovenian speakers find natural advantages here; German remains essential.' },
];

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
  return locales.flatMap(locale =>
    regions.map(r => ({ locale, region: r.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; region: string }>;
}): Promise<Metadata> {
  const { locale: raw, region: slug } = await params;
  const locale = normalizeLocale(raw) as Locale;
  const r = regions.find(x => x.slug === slug);
  if (!r) return {};
  return {
    title: `Hospitality Jobs in ${r.name}, Austria`,
    description: `Find hospitality jobs in ${r.name} — hotels, restaurants and resorts in ${r.highlights}.`,
    alternates: {
      canonical: `https://alpentalent.com/${locale}/regions/${slug}`,
      languages: {
        de: `/de/regions/${slug}`,
        cs: `/cz/regions/${slug}`,
        en: `/en/regions/${slug}`,
      },
    },
  };
}

export default async function RegionDetail({
  params,
}: {
  params: Promise<{ locale: string; region: string }>;
}) {
  const { locale: raw, region: slug } = await params;
  if (!['de', 'cz', 'en'].includes(raw)) notFound();
  const locale = normalizeLocale(raw) as Locale;

  const region = regions.find(r => r.slug === slug);
  if (!region) notFound();

  const regionJobs = mockJobs.filter(j =>
    j.location.toLowerCase().includes(region.name.toLowerCase()) ||
    j.location.toLowerCase().includes(region.nameDe.toLowerCase())
  );

  const otherRegions = regions.filter(r => r.slug !== slug).slice(0, 3);

  return (
    <SiteShell locale={locale}>
      {/* Hero */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--at-alpine-green) 0%, #1E4D38 100%)',
          paddingBlock: 'clamp(48px, 8vw, 80px)',
        }}
      >
        <div className="at-container">
          <Link
            href={`/${locale}/regions`}
            style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', textDecoration: 'none', display: 'inline-block', marginBottom: 'var(--space-3)' }}
          >
            ← All regions
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 'var(--space-2)' }}>
            <div style={{ color: 'rgba(255,255,255,0.85)', flexShrink: 0 }} aria-hidden="true"><RegionIcon slug={region.slug} size={36} /></div>
            <h1 className="at-display" style={{ color: '#fff', margin: 0 }}>{region.name}</h1>
          </div>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: '1rem' }}>
            {region.highlights}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="at-container" style={{ paddingBlock: 'var(--space-6)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-6)',
            alignItems: 'start',
          }}
        >
          {/* About section */}
          <div>
            <h2 className="at-h2" style={{ margin: '0 0 var(--space-2)' }}>About {region.name}</h2>
            <p style={{ margin: '0 0 var(--space-4)', color: 'var(--text-muted)', lineHeight: 1.75 }}>
              {region.body}
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span className="at-chip">{region.highlights.split(', ')[0]}</span>
              <span className="at-chip">{region.highlights.split(', ')[1]}</span>
            </div>
          </div>

          {/* Jobs in this region */}
          <div>
            <h2 className="at-h2" style={{ margin: '0 0 var(--space-2)' }}>
              Open roles in {region.name}
            </h2>
            {regionJobs.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                {regionJobs.map(job => (
                  <JobCard
                    key={job.slug}
                    slug={job.slug}
                    hotelName={job.hotelName}
                    roleName={job.roleName}
                    location={job.location}
                    salary={job.salary}
                    contractType={job.contractType}
                    housingProvided={job.housingProvided}
                    compact
                    locale={locale}
                    showSaveHeart
                  />
                ))}
              </div>
            ) : (
              <div className="at-card" style={{ padding: 'var(--space-4)', textAlign: 'center' }}>
                <p style={{ margin: '0 0 var(--space-2)', color: 'var(--text-muted)' }}>
                  New roles in {region.name} are added regularly.
                </p>
                <Link href={`/${locale}/jobs`} className="at-btn at-btn--primary at-btn--sm">
                  Browse all jobs →
                </Link>
              </div>
            )}
            <div style={{ marginTop: 'var(--space-3)' }}>
              <Link href={`/${locale}/jobs`} className="at-btn at-btn--secondary at-btn--sm">
                See all Austria roles →
              </Link>
            </div>
          </div>
        </div>

        {/* Other regions */}
        <div style={{ marginTop: 'var(--space-8)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--border)' }}>
          <h2 className="at-h2" style={{ margin: '0 0 var(--space-3)' }}>Other regions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-2)' }}>
            {otherRegions.map(r => (
              <Link
                key={r.slug}
                href={`/${locale}/regions/${r.slug}`}
                className="at-card at-card--interactive"
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 'var(--space-2)', textDecoration: 'none' }}
              >
                <div style={{ color: 'var(--at-alpine-green)', flexShrink: 0 }} aria-hidden="true"><RegionIcon slug={r.slug} size={22} /></div>
                <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.9375rem' }}>{r.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
