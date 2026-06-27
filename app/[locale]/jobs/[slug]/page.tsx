import { notFound } from 'next/navigation';
import { SiteShell } from '../../../../components/SiteShell';
import { JobCard } from '../../../../components/JobCard';
import { locales, normalizeLocale, type Locale } from '../../../../lib/i18n';
import { mockJobs } from '../../../../lib/mockJobs';

export function generateStaticParams() {
  return locales.flatMap(locale =>
    mockJobs.map(job => ({ locale, slug: job.slug }))
  );
}

function FactRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-subtle)' }}>
        {label}
      </span>
      <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text)' }}>{value}</span>
    </div>
  );
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!['de', 'cz', 'en'].includes(raw)) notFound();
  const locale = normalizeLocale(raw) as Locale;

  const job = mockJobs.find(j => j.slug === slug);
  if (!job) notFound();

  const similar = mockJobs
    .filter(j => j.slug !== slug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  return (
    <SiteShell locale={locale}>
      {/* Green hero header */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--at-alpine-green) 0%, #1E4D38 100%)',
          paddingBlock: 'var(--space-6)',
        }}
      >
        <div className="at-container">
          {/* Back link */}
          <a
            href={`/${locale}/jobs`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              color: 'rgba(255,255,255,0.7)',
              fontSize: '0.875rem',
              textDecoration: 'none',
              marginBottom: 'var(--space-3)',
            }}
          >
            ← Back to jobs
          </a>

          <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* Hotel logo placeholder */}
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 'var(--radius-card)',
                background: 'rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.85)',
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18z"/>
                <path d="M6 12H4a2 2 0 0 0-2 2v8h4"/>
                <path d="M18 9h2a2 2 0 0 1 2 2v11h-4"/>
                <path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>
              </svg>
            </div>

            {/* Role info */}
            <div style={{ flex: 1, minWidth: 240 }}>
              <p style={{ margin: '0 0 4px', color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem', fontWeight: 500 }}>
                {job.hotelName}
              </p>
              <h1
                className="at-display"
                style={{ margin: '0 0 var(--space-2)', color: '#fff', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}
              >
                {job.roleName}
              </h1>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 'var(--space-2)' }}>
                <span
                  style={{
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-pill)',
                    background: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    color: '#fff',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {job.location}
                </span>
                <span
                  style={{
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-pill)',
                    background: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    color: '#fff',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                  }}
                >
                  {job.contractType}
                </span>
                {job.housingProvided && (
                  <span
                    style={{
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-pill)',
                      background: 'rgba(255,255,255,0.2)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      color: '#fff',
                      fontSize: '0.8125rem',
                      fontWeight: 500,
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    Housing included
                  </span>
                )}
              </div>
              <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#fff', fontVariantNumeric: 'tabular-nums' }}>
                {job.salary}
              </p>
            </div>

            {/* Match score hidden on public detail — only shown in candidate app */}
          </div>
        </div>
      </div>

      {/* Sticky apply bar */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 'var(--z-sticky)' as any,
          background: 'var(--bg-elevated)',
          borderBottom: '1px solid var(--border)',
          paddingBlock: 12,
        }}
      >
        <div
          className="at-container"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}
        >
          <div>
            <span style={{ fontWeight: 700, fontSize: '1rem' }}>{job.salary}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginLeft: 8 }}>{job.contractType}</span>
          </div>
          <a href={`/${locale}/login?role=candidate`} className="at-btn at-btn--primary">
            Apply now →
          </a>
        </div>
      </div>

      {/* Main content */}
      <div className="at-container" style={{ paddingBlock: 'var(--space-6)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr)',
            gap: 'var(--space-6)',
          }}
        >
          {/* Facts grid */}
          <div
            className="at-card"
            style={{
              padding: 'var(--space-4)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: 'var(--space-4)',
            }}
          >
            <FactRow label="Salary" value={job.salary} />
            <FactRow label="Contract" value={job.contractType} />
            {job.hoursPerWeek && <FactRow label="Hours / week" value={`${job.hoursPerWeek}h`} />}
            {job.startDate && <FactRow label="Start date" value={job.startDate} />}
            <FactRow label="Housing" value={job.housingProvided ? 'Included' : 'Not included'} />
            {job.languages && <FactRow label="Languages" value={job.languages.join(', ')} />}
          </div>

          {/* Description */}
          <div>
            <h2 className="at-h2" style={{ margin: '0 0 var(--space-2)' }}>About the role</h2>
            <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.75, fontSize: '0.9375rem' }}>
              {job.description}
            </p>
          </div>

          {/* Apply CTA */}
          <div
            className="at-card"
            style={{
              padding: 'var(--space-5)',
              textAlign: 'center',
              background: 'var(--at-alpine-light)',
              border: '1px solid color-mix(in srgb, var(--at-alpine-green) 20%, transparent)',
            }}
          >
            <p
              style={{
                margin: '0 0 4px',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.125rem',
                color: 'var(--at-alpine-green)',
              }}
            >
              Ready to apply?
            </p>
            <p style={{ margin: '0 0 var(--space-3)', color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
              Create a profile and we'll match you to this and similar roles.
            </p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={`/${locale}/login?role=candidate`} className="at-btn at-btn--primary">
                Apply with Google →
              </a>
              <a href={`/${locale}/jobs`} className="at-btn at-btn--secondary">
                Browse more roles
              </a>
            </div>
          </div>

          {/* Similar roles */}
          <div>
            <h2 className="at-h2" style={{ margin: '0 0 var(--space-2)' }}>Similar roles</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
              {similar.map(j => (
                <JobCard
                  key={j.slug}
                  slug={j.slug}
                  hotelName={j.hotelName}
                  roleName={j.roleName}
                  location={j.location}
                  salary={j.salary}
                  contractType={j.contractType}
                  housingProvided={j.housingProvided}
                  compact
                  locale={locale}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
