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
    en: 'Hospitality Salary Guide — Austria 2025',
    de: 'Gehaltsübersicht Hotellerie — Österreich 2025',
    cz: 'Průvodce platy v hotelnictví — Rakousko 2025',
  };
  return {
    title: titles[locale],
    description: 'Real salary ranges for hospitality roles in Austrian hotels and restaurants — 2024/2025 placements.',
    alternates: {
      canonical: `https://alpentalent.com/${locale}/salary-guide`,
      languages: { de: '/de/salary-guide', cs: '/cz/salary-guide', en: '/en/salary-guide' },
    },
  };
}

const salaries = [
  { role: 'Receptionist', level: 'Entry', range: '€1,800 – €2,300', median: '€2,050', region: 'Tyrol / Salzburg' },
  { role: 'Receptionist', level: 'Experienced', range: '€2,300 – €2,800', median: '€2,550', region: 'Tyrol / Salzburg' },
  { role: 'Chef de Partie', level: 'Mid', range: '€2,400 – €3,000', median: '€2,700', region: 'All regions' },
  { role: 'Sous Chef', level: 'Senior', range: '€2,800 – €3,500', median: '€3,100', region: 'All regions' },
  { role: 'Kitchen Assistant', level: 'Entry', range: '€1,700 – €2,100', median: '€1,900', region: 'All regions' },
  { role: 'Waiter / Waitress', level: 'Entry', range: '€1,800 – €2,400', median: '€2,100', region: 'All regions' },
  { role: 'Housekeeper', level: 'Entry', range: '€1,700 – €2,000', median: '€1,850', region: 'All regions' },
  { role: 'Hotel Manager', level: 'Senior', range: '€3,500 – €5,000+', median: '€4,200', region: 'All regions' },
];

export default async function SalaryGuide({ params }: { params: Promise<{ locale: string }> }) {
  const raw = (await params).locale;
  if (!['de', 'cz', 'en'].includes(raw)) notFound();
  const locale = normalizeLocale(raw) as Locale;

  return (
    <SiteShell locale={locale}>
      <div style={{ paddingBlock: 'clamp(48px, 8vw, 96px)' }}>
        <div className="at-container">
          <div style={{ maxWidth: 600, marginBottom: 'var(--space-6)' }}>
            <p style={{ margin: '0 0 12px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--at-alpine-green)' }}>
              Salary guide · Austria 2025
            </p>
            <h1 className="at-h1" style={{ margin: '0 0 var(--space-2)' }}>Hospitality salaries in Austria</h1>
            <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Real salary ranges from our partner hotels. Figures are monthly gross, based on 2024–2025 placements.
              Seasonal roles may include housing and meals — this affects net take-home meaningfully.
            </p>
          </div>

          {/* Salary table */}
          <div className="at-card" style={{ overflow: 'hidden', padding: 0, marginBottom: 'var(--space-2)' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontVariantNumeric: 'tabular-nums', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-sunken)', borderBottom: '1px solid var(--border)' }}>
                    {['Role', 'Level', 'Range', 'Median', 'Regions'].map(h => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, whiteSpace: 'nowrap', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {salaries.map((row, i) => (
                    <tr key={i} style={{ borderBottom: i < salaries.length - 1 ? '1px solid var(--border)' : 'none' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 600 }}>{row.role}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>{row.level}</td>
                      <td style={{ padding: '12px 16px' }} data-placeholder="verify">{row.range}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--at-alpine-green)', fontWeight: 600 }} data-placeholder="verify">{row.median}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>{row.region}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p style={{ marginBottom: 'var(--space-8)', color: 'var(--text-subtle)', fontSize: '0.8125rem' }}>
            Ranges are indicative. Exact salary depends on employer, experience, and contract type.
            Housing and meal provisions can add €300–€500/month in effective value.
          </p>
        </div>
      </div>

      {/* Context bento */}
      <BentoSection
        eyebrow="Understanding Austrian pay"
        heading="What affects your take-home"
        sub="Austrian salaries come with strong legal protections and sector-wide minimums. Here's what matters."
        tiles={[
          {
            variant: 'stat',
            stat: '~18%',
            title: 'Social insurance contribution',
            body: 'Employee share of pension, health, accident and unemployment insurance — automatically deducted from gross.',
          },
          {
            variant: 'feature',
            title: 'Kollektivvertrag',
            body: 'The sector collective agreement (KV) sets legally binding minimum wages for every role. Your employer cannot pay below KV, regardless of what they offer. Updated each December.',
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
            ),
          },
          {
            variant: 'stat',
            stat: '+€300–500',
            title: 'Housing & meals',
            body: 'Staff housing and meal provisions add meaningful net value not reflected in the gross salary. Always factor them in when comparing offers.',
          },
          {
            variant: 'feature',
            title: 'Alpine premium',
            body: 'Resort roles in Tyrol, Vorarlberg and Salzburg often pay 10–20% above KV minimum due to demand, seasonality and cost of living in ski destinations.',
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
              </svg>
            ),
          },
        ]}
      />
    </SiteShell>
  );
}
