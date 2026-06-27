import Link from 'next/link';
import { getDictionary, type Locale } from '../lib/i18n';

const stepIcons = [
  <svg key="1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>,
  <svg key="2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>,
  <svg key="3" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>,
  <svg key="4" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>,
  <svg key="5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="3 11 22 2 13 21 11 13 3 11"/>
  </svg>,
];

const stepNums = ['01', '02', '03', '04', '05'];

interface HowItWorksSectionProps {
  locale: Locale;
  compact?: boolean;
}

export function HowItWorksSection({ locale, compact = false }: HowItWorksSectionProps) {
  const d = getDictionary(locale);
  const hiw = d.ui.howItWorks;

  return (
    <section
      style={{
        paddingBlock: compact ? 'var(--space-6)' : 'var(--space-8)',
        background: 'var(--bg-sunken)',
      }}
    >
      <div className="at-container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
          <p
            style={{
              margin: '0 0 8px',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--at-alpine-green)',
            }}
          >
            {hiw.eyebrow}
          </p>
          <h2 className="at-h1" style={{ margin: 0 }}>{hiw.heading}</h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'var(--space-3)',
          }}
        >
          {hiw.steps.map((step: { title: string; body: string }, i: number) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 12,
                padding: 'var(--space-3)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 'var(--radius-pill)',
                    background: 'var(--at-alpine-green)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {stepIcons[i]}
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '0.75rem',
                    color: 'var(--text-subtle)',
                    letterSpacing: '0.08em',
                  }}
                >
                  {stepNums[i]}
                </span>
              </div>
              <div>
                <p className="at-h3" style={{ margin: '0 0 4px' }}>{step.title}</p>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem' }}>{step.body}</p>
              </div>
            </div>
          ))}
        </div>

        {compact && (
          <div style={{ marginTop: 'var(--space-4)', textAlign: 'center' }}>
            <Link href={`/${locale}/how-it-works`} className="at-btn at-btn--secondary">
              {locale === 'de' ? 'Mehr erfahren →' : locale === 'cz' ? 'Zjistit více →' : 'See full process →'}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
