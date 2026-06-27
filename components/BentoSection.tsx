import type { ReactNode } from 'react';

interface BentoTile {
  variant?: 'feature' | 'stat' | 'media' | 'cta' | 'quote' | 'avatars';
  title: string;
  body?: string;
  stat?: string;
  /** Shows data-placeholder="verify" on the stat number */
  verify?: boolean;
  icon?: ReactNode;
  span?: 1 | 2;
  accent?: boolean;
  /** For quote variant */
  quote?: string;
  author?: string;
  authorRole?: string;
  /** For media variant — use placeholder if not set */
  mediaSrc?: string;
  mediaAlt?: string;
}

interface BentoSectionProps {
  eyebrow?: string;
  heading: string;
  sub?: string;
  tiles: BentoTile[];
  className?: string;
}

export function BentoSection({ eyebrow, heading, sub, tiles, className }: BentoSectionProps) {
  return (
    <section className={className} style={{ paddingBlock: 'var(--space-8)' }}>
      <div className="at-container">
        {(eyebrow || heading) && (
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
        )}

        <style>{`
          .bento-grid .at-card { transition: transform var(--dur-fast,0.15s) var(--ease,ease), box-shadow var(--dur-fast,0.15s) var(--ease,ease); }
          .bento-grid .at-card:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(0,0,0,0.10); }
        `}</style>
        <div
          className="bento-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 'var(--space-2)',
          }}
        >
          {tiles.map((tile, i) => (
            <BentoTileCard key={i} tile={tile} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BentoTileCard({ tile }: { tile: BentoTile }) {
  const isAccent = tile.accent;
  const bg = isAccent ? 'var(--at-alpine-green)' : 'var(--bg-elevated)';
  const color = isAccent ? 'var(--text-on-brand)' : 'var(--text)';

  const base: React.CSSProperties = {
    gridColumn: tile.span === 2 ? 'span 2' : undefined,
    background: bg,
    color,
    position: 'relative',
    overflow: 'hidden',
  };

  // Quote variant
  if (tile.variant === 'quote') {
    return (
      <div
        className="at-card"
        style={{
          ...base,
          padding: 'var(--space-4)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-2)',
        }}
      >
        <svg
          aria-hidden="true"
          width="28"
          height="20"
          viewBox="0 0 28 20"
          fill={isAccent ? 'rgba(255,255,255,0.25)' : 'var(--at-alpine-light)'}
        >
          <path d="M0 20V12C0 5.373 4.477 1.333 13.43 0L14 2c-3.56.667-5.803 1.8-6.73 3.4C6.343 7 6 8.667 6 10h6v10H0Zm14 0V12c0-6.627 4.477-10.667 13.43-11.667L28 2c-3.56.667-5.803 1.8-6.73 3.4-.927 1.6-1.27 3.267-1.27 5h6v10H14Z" />
        </svg>
        {tile.quote && (
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: '1rem',
              lineHeight: 1.5,
              color: isAccent ? '#fff' : 'var(--text)',
              fontStyle: 'italic',
            }}
          >
            "{tile.quote}"
          </p>
        )}
        {tile.author && (
          <div style={{ marginTop: 'auto' }}>
            <p
              style={{
                margin: 0,
                fontSize: '0.875rem',
                fontWeight: 600,
                color: isAccent ? 'rgba(255,255,255,0.9)' : 'var(--text)',
              }}
            >
              {tile.author}
            </p>
            {tile.authorRole && (
              <p
                style={{
                  margin: '2px 0 0',
                  fontSize: '0.75rem',
                  color: isAccent ? 'rgba(255,255,255,0.65)' : 'var(--text-subtle)',
                }}
              >
                {tile.authorRole}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  // Media variant
  if (tile.variant === 'media') {
    return (
      <div
        className="at-card"
        style={{ ...base, padding: 0, minHeight: 200 }}
      >
        <div
          style={{
            height: '100%',
            minHeight: 200,
            background: tile.mediaSrc
              ? `url(${tile.mediaSrc}) center/cover`
              : 'linear-gradient(135deg, var(--at-alpine-light) 0%, var(--bg-sunken) 100%)',
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <div style={{ padding: 'var(--space-3)', background: 'rgba(0,0,0,0.35)', width: '100%' }}>
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '1rem',
                color: '#fff',
              }}
            >
              {tile.title}
            </p>
            {tile.body && (
              <p style={{ margin: '4px 0 0', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.8)' }}>
                {tile.body}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Avatar-stack variant
  if (tile.variant === 'avatars') {
    const avatarColors = ['#4A9A6B', '#3B7A55', '#2D6040', '#5DB07D'];
    const initials = ['M', 'K', 'J', 'A'];
    return (
      <div className="at-card" style={{ ...base, padding: 'var(--space-4)' }}>
        <div style={{ display: 'flex', marginBottom: 14 }}>
          {initials.map((init, i) => (
            <div
              key={i}
              style={{
                width: 34, height: 34, borderRadius: '50%',
                background: avatarColors[i],
                border: '2px solid var(--bg-elevated)',
                marginLeft: i === 0 ? 0 : -10,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', zIndex: 4 - i,
                color: '#fff', fontSize: '0.6875rem', fontWeight: 700, flexShrink: 0,
              }}
            >
              {init}
            </div>
          ))}
          <div style={{
            width: 34, height: 34, borderRadius: '50%',
            background: 'var(--bg-sunken)',
            border: '2px solid var(--bg-elevated)',
            marginLeft: -10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', zIndex: 0,
            color: 'var(--text-muted)', fontSize: '0.625rem', fontWeight: 700, flexShrink: 0,
          }}>+99</div>
        </div>
        <p className="at-h3" style={{ margin: '0 0 4px', color: isAccent ? '#fff' : 'var(--text)' }}>
          {tile.title}
        </p>
        {tile.body && (
          <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: 1.6, color: isAccent ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)' }}>
            {tile.body}
          </p>
        )}
      </div>
    );
  }

  // Feature / stat / default
  return (
    <div
      className="at-card"
      style={{ ...base, padding: 'var(--space-4)' }}
    >
      {tile.icon && (
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 'var(--radius-chip)',
            background: isAccent ? 'rgba(255,255,255,0.15)' : 'var(--at-alpine-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 'var(--space-2)',
            color: isAccent ? '#fff' : 'var(--at-alpine-green)',
            flexShrink: 0,
          }}
        >
          {tile.icon}
        </div>
      )}
      {tile.stat && (
        <p
          style={{
            margin: '0 0 4px',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '2rem',
            color: isAccent ? '#fff' : 'var(--at-alpine-green)',
            fontVariantNumeric: 'tabular-nums',
            lineHeight: 1,
          }}
          {...(tile.verify ? { 'data-placeholder': 'verify' } : {})}
        >
          {tile.stat}
        </p>
      )}
      <p
        className="at-h3"
        style={{ margin: '0 0 8px', color: isAccent ? '#fff' : 'var(--text)' }}
      >
        {tile.title}
      </p>
      {tile.body && (
        <p
          style={{
            margin: 0,
            fontSize: '0.875rem',
            lineHeight: 1.6,
            color: isAccent ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)',
          }}
        >
          {tile.body}
        </p>
      )}
    </div>
  );
}
