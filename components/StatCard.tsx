import Link from 'next/link';

interface StatCardProps {
  value: string;
  label: string;
  href?: string;
  linkLabel?: string;
  verify?: boolean;
  badge?: string;
}

export function StatCard({ value, label, href, linkLabel, verify, badge }: StatCardProps) {
  return (
    <div className="at-card" style={{ padding: 'var(--space-3)', position: 'relative' }}>
      {badge && (
        <span
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            padding: '2px 8px',
            borderRadius: 'var(--radius-pill)',
            background: 'var(--at-alpine-green)',
            color: '#fff',
            fontSize: '0.6875rem',
            fontWeight: 700,
            lineHeight: 1.4,
          }}
        >
          {badge}
        </span>
      )}
      <p
        style={{
          margin: '0 0 4px',
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '2rem',
          color: 'var(--at-alpine-green)',
          lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
        }}
        {...(verify ? { 'data-placeholder': 'verify' } : {})}
      >
        {value}
      </p>
      <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.4 }}>
        {label}
      </p>
      {href && linkLabel && (
        <Link
          href={href}
          style={{
            display: 'block',
            marginTop: 8,
            color: 'var(--primary)',
            fontSize: '0.75rem',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}
