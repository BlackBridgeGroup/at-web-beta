import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteShell } from '../../../components/SiteShell';
import { JobCard } from '../../../components/JobCard';
import { EmptyState } from '../../../components/EmptyState';
import { locales, normalizeLocale, getDictionary, type Locale } from '../../../lib/i18n';
import { mockJobs, type MockJob } from '../../../lib/mockJobs';

export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

const pageH1: Record<Locale, string> = {
  en: 'Hospitality jobs in Austria',
  de: 'Stellen in der Hotellerie in Österreich',
  cz: 'Pracovní nabídky v hotelnictví v Rakousku',
};

const ROLE_KEYWORDS: Record<string, string[]> = {
  reception:    ['receptionist', 'reception', 'front desk', 'concierge'],
  chef:         ['chef', 'cook', 'kitchen', 'culinary', 'pastry', 'sous'],
  housekeeping: ['housekeep', 'housekeeper', 'room attendant', 'cleaner'],
  waiter:       ['waiter', 'waitress', 'server', 'service'],
  manager:      ['manager', 'director', 'supervisor', 'head'],
};

function matchesRole(job: MockJob, role: string): boolean {
  if (!role || !ROLE_KEYWORDS[role]) return true;
  const name = job.roleName.toLowerCase();
  return ROLE_KEYWORDS[role].some(kw => name.includes(kw));
}

export default async function JobsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ role?: string }>;
}) {
  const raw = (await params).locale;
  if (!['de', 'cz', 'en'].includes(raw)) notFound();
  const locale = normalizeLocale(raw) as Locale;
  const { role = '' } = await searchParams;

  const d = getDictionary(locale);
  const j = d.ui.jobs;
  const p = d.ui.persona;

  const filteredJobs = mockJobs.filter(job => matchesRole(job, role));

  const PERSONA_CHIPS = [
    { slug: 'reception',    label: p.reception },
    { slug: 'chef',         label: p.chef },
    { slug: 'housekeeping', label: p.housekeeping },
    { slug: 'waiter',       label: p.waiter },
    { slug: 'manager',      label: p.manager },
  ];

  return (
    <SiteShell locale={locale}>
      {/* Search hero */}
      <div style={{ background: 'var(--bg-sunken)', borderBottom: '1px solid var(--border)', paddingBlock: 'var(--space-6)' }}>
        <div className="at-container">
          <h1 className="at-h1" style={{ margin: '0 0 var(--space-3)' }}>{pageH1[locale]}</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, maxWidth: 720 }}>
            <input
              className="at-input"
              placeholder={j.searchPlaceholder}
              style={{ flex: '1 1 280px' }}
              readOnly
            />
            <select className="at-input" style={{ flex: '0 0 160px' }} defaultValue="">
              <option value="">{j.allRegions}</option>
              <option>Tyrol</option>
              <option>Salzburg</option>
              <option>Vorarlberg</option>
              <option>Vienna</option>
            </select>
            <button className="at-btn at-btn--primary">{j.searchBtn}</button>
          </div>
        </div>
      </div>

      {/* Filter chips */}
      <div style={{ borderBottom: '1px solid var(--border)', paddingBlock: 10 }}>
        <div className="at-container" style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginRight: 2 }}>{j.filterLabel}</span>
          {PERSONA_CHIPS.map(chip => {
            const active = role === chip.slug;
            return (
              <Link
                key={chip.slug}
                href={active ? `/${locale}/jobs` : `/${locale}/jobs?role=${chip.slug}`}
                className="at-chip"
                style={active ? {
                  borderColor: 'var(--at-alpine-green)',
                  color: 'var(--at-alpine-green)',
                  background: 'var(--at-alpine-light)',
                  textDecoration: 'none',
                } : { textDecoration: 'none' }}
              >
                {chip.label}
              </Link>
            );
          })}
          <span style={{ marginLeft: 'auto', fontSize: '0.8125rem', color: 'var(--text-subtle)' }}>
            {filteredJobs.length} {locale === 'de' ? 'Stellen' : locale === 'cz' ? 'pozic' : 'roles'}
          </span>
        </div>
      </div>

      {/* Sort + grid */}
      <div className="at-container" style={{ paddingBlock: 'var(--space-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--space-2)' }}>
          <select className="at-input" style={{ width: 'auto' }} defaultValue="best">
            <option value="best">{j.sortBestMatch}</option>
            <option value="newest">{j.sortNewest}</option>
            <option value="salary">{j.sortSalary}</option>
          </select>
        </div>

        {filteredJobs.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-2)' }}>
            {filteredJobs.map(job => (
              <JobCard
                key={job.slug}
                slug={job.slug}
                hotelName={job.hotelName}
                roleName={job.roleName}
                location={job.location}
                salary={job.salary}
                contractType={job.contractType}
                housingProvided={job.housingProvided}
                locale={locale}
                showSaveHeart
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title={j.noRolesTitle}
            body={j.noRolesBody}
          />
        )}
      </div>
    </SiteShell>
  );
}
