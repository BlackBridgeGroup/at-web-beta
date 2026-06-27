import Link from 'next/link';
import { Ridge } from './Ridge';
import type { Locale } from '../lib/i18n';

interface HeroProps {
  locale: Locale;
  eyebrow?: string;
  h1: string;
  sub: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  /** When true, show a right-panel photo placeholder (pre-wired for real photo). */
  showPhotoPanel?: boolean;
}

export function Hero({
  eyebrow,
  h1,
  sub,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  showPhotoPanel = true,
}: HeroProps) {
  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 'clamp(64px, 10vw, 112px)',
        paddingBottom: 0,
        color: 'var(--text-on-brand)',
      }}
    >
      {/* Alpine Green background — real photo goes here as bg-image when available */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, var(--at-alpine-green) 0%, #1E4D38 100%)',
        }}
      />

      {/* Photo overlay at locked 0.82 opacity — transparent until photo added */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(45,106,79,0)',
          opacity: 0.82,
          pointerEvents: 'none',
        }}
      />

      {/* Subtle mountain ridge motif in background */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.06,
          pointerEvents: 'none',
        }}
      >
        <svg
          viewBox="0 0 1200 400"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          style={{ width: '100%', height: '100%' }}
        >
          <path
            d="M0 300 L80 220 L160 270 L240 160 L320 230 L400 100 L480 200 L560 130 L640 210 L720 80 L800 190 L880 120 L960 200 L1040 90 L1120 170 L1200 110 L1200 400 L0 400Z"
            fill="white"
          />
        </svg>
      </div>

      <div className="at-container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="at-hero-grid">
          {/* Left — text content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {eyebrow && (
              <p
                style={{
                  margin: 0,
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  opacity: 0.75,
                }}
              >
                {eyebrow}
              </p>
            )}

            <h1 className="at-display" style={{ margin: 0, color: '#fff' }}>
              {h1}
            </h1>

            <p
              style={{
                margin: 0,
                fontSize: '1.125rem',
                lineHeight: 1.6,
                opacity: 0.88,
                maxWidth: 480,
              }}
            >
              {sub}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <Link
                href={primaryHref}
                className="at-btn"
                style={{
                  background: '#fff',
                  color: 'var(--at-alpine-green)',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                }}
              >
                {primaryLabel} →
              </Link>
              <Link
                href={secondaryHref}
                className="at-btn"
                style={{
                  background: 'transparent',
                  color: '#fff',
                  boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.5)',
                  fontSize: '0.9375rem',
                }}
              >
                {secondaryLabel}
              </Link>
            </div>

          </div>

          {/* Right — photo panel (pre-wired; replace placeholder with real photo via backgroundImage) */}
          {showPhotoPanel && (
            <div
              aria-hidden="true"
              style={{
                borderRadius: 'var(--radius-card)',
                overflow: 'hidden',
                aspectRatio: '4/3',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)',
                border: '1px solid rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 280,
                position: 'relative',
              }}
            >
              {/* When real photo is available: add backgroundImage + backgroundSize:cover here */}
              <div
                style={{
                  textAlign: 'center',
                  opacity: 0.4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span style={{ fontSize: '0.75rem', color: '#fff', fontWeight: 500 }}>
                  Authentic photo here
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Ridge bottom transition */}
      <div style={{ marginTop: 64 }}>
        <Ridge variant="hero" opacity={1} />
      </div>
    </section>
  );
}
