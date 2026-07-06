import { getDictionary, type Locale } from '../lib/i18n';

interface TrustMetric {
  value: string;
  label: string;
  verify?: boolean;
  starAfter?: boolean;
}

const employerMetrics: TrustMetric[] = [
  { value: 'AT', label: 'Hospitality-Fokus' },
  { value: 'Fast', label: 'persoenliche Rueckmeldung' },
  { value: '0', label: 'Vorauszahlung' },
  { value: 'Human', label: 'gepruefte Matches' },
];

interface TrustBarProps {
  variant?: 'candidate' | 'employer';
  metrics?: TrustMetric[];
  locale?: Locale;
}

export function TrustBar({ variant = 'candidate', metrics, locale = 'de' }: TrustBarProps) {
  const d = getDictionary(locale);
  const t = d.ui.trust;

  const candidateMetrics: TrustMetric[] = [
    { value: '0 EUR', label: locale === 'cz' ? 'pro uchazece' : 'for candidates' },
    { value: 'AT', label: locale === 'cz' ? 'rakouske role' : 'Austria roles' },
    { value: t.coverage, label: '' },
    { value: 'Human', label: locale === 'cz' ? 'rucni kontrola' : 'reviewed matching' },
  ];

  const items = metrics ?? (variant === 'employer' ? employerMetrics : candidateMetrics);

  return (
    <div
      style={{
        background: 'var(--bg-elevated)',
        borderBottom: '1px solid var(--border)',
        paddingBlock: 'var(--space-3)',
      }}
    >
      <div
        className="at-container"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(16px, 4vw, 48px)',
        }}
      >
        {items.map((m, i) => (
          <div
            key={i}
            style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexShrink: 0 }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 2,
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.125rem',
                color: 'var(--at-alpine-green)',
                fontVariantNumeric: 'tabular-nums',
              }}
              {...(m.verify ? { 'data-placeholder': 'verify' } : {})}
            >
              {m.value}
              {m.starAfter && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginTop: 1 }}>
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              )}
            </span>
            {m.label && (
              <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{m.label}</span>
            )}
          </div>
        ))}

        {/* Google sign-in trust badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '5px 12px',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid var(--border)',
            background: 'var(--bg)',
            fontSize: '0.8125rem',
            color: 'var(--text-muted)',
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {t.googleCta}
        </div>
      </div>
    </div>
  );
}
