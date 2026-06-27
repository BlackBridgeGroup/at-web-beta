import Link from 'next/link';

export interface PriceTierProps {
  name: string;
  price: string;
  period?: string;
  note?: string;
  features: string[];
  cta: string;
  ctaHref: string;
  featured?: boolean;
}

interface PricingBlockProps {
  eyebrow?: string;
  heading: string;
  sub?: string;
  tiers: PriceTierProps[];
}

export function PricingBlock({ eyebrow, heading, sub, tiers }: PricingBlockProps) {
  return (
    <section style={{ paddingBlock: 'var(--space-8)' }}>
      <div className="at-container">
        <div style={{ marginBottom: 'var(--space-6)', maxWidth: 560 }}>
          {eyebrow && (
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
              {eyebrow}
            </p>
          )}
          <h2 className="at-h1" style={{ margin: '0 0 8px' }}>{heading}</h2>
          {sub && (
            <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.6 }}>{sub}</p>
          )}
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'var(--space-2)',
            alignItems: 'start',
          }}
        >
          {tiers.map((tier, i) => (
            <PriceTier key={i} {...tier} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function PriceTier({ name, price, period, note, features, cta, ctaHref, featured = false }: PriceTierProps) {
  return (
    <div
      className="at-card"
      style={{
        padding: 'var(--space-4)',
        background: featured ? 'var(--at-alpine-green)' : 'var(--bg-elevated)',
        color: featured ? 'var(--text-on-brand)' : 'var(--text)',
        position: 'relative',
      }}
    >
      {featured && (
        <span
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            padding: '2px 10px',
            borderRadius: 'var(--radius-pill)',
            background: 'rgba(255,255,255,0.2)',
            fontSize: '0.6875rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: '#fff',
          }}
        >
          Empfohlen
        </span>
      )}

      <p
        style={{
          margin: '0 0 var(--space-2)',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '1rem',
          color: featured ? 'rgba(255,255,255,0.85)' : 'var(--text)',
        }}
      >
        {name}
      </p>

      <div style={{ marginBottom: 'var(--space-3)' }}>
        <span
          data-placeholder="verify"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '2rem',
            lineHeight: 1,
            color: featured ? '#fff' : 'var(--at-alpine-green)',
          }}
        >
          {price}
        </span>
        {period && (
          <span
            style={{
              marginLeft: 6,
              fontSize: '0.875rem',
              color: featured ? 'rgba(255,255,255,0.65)' : 'var(--text-muted)',
            }}
          >
            {period}
          </span>
        )}
        {note && (
          <p
            style={{
              margin: '4px 0 0',
              fontSize: '0.75rem',
              color: featured ? 'rgba(255,255,255,0.6)' : 'var(--text-subtle)',
            }}
          >
            {note}
          </p>
        )}
      </div>

      <ul
        style={{
          margin: '0 0 var(--space-4)',
          padding: 0,
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {features.map((f, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 8,
              fontSize: '0.875rem',
              lineHeight: 1.5,
              color: featured ? 'rgba(255,255,255,0.88)' : 'var(--text-muted)',
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={featured ? 'rgba(255,255,255,0.7)' : 'var(--at-alpine-mid)'}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ flexShrink: 0, marginTop: 2 }}
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      <Link
        href={ctaHref}
        className="at-btn"
        style={
          featured
            ? {
                background: '#fff',
                color: 'var(--at-alpine-green)',
                fontWeight: 700,
                width: '100%',
                justifyContent: 'center',
              }
            : {
                background: 'transparent',
                color: 'var(--primary)',
                boxShadow: 'inset 0 0 0 1.5px var(--primary)',
                width: '100%',
                justifyContent: 'center',
              }
        }
      >
        {cta}
      </Link>
    </div>
  );
}
