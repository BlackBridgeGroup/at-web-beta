'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { getDictionary, type Locale } from '../lib/i18n';

interface AppBarProps {
  locale: Locale;
}

export function AppBar({ locale }: AppBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const base = `/${locale}`;
  const d = getDictionary(locale);
  const n = d.ui.nav;

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 'var(--z-sticky)',
        background: 'color-mix(in srgb, var(--bg) 92%, transparent)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        className="at-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
          gap: 16,
        }}
      >
        {/* Logo */}
        <Link
          href={base}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '1.125rem',
            color: 'var(--at-alpine-green)',
            textDecoration: 'none',
            letterSpacing: '-0.02em',
            flexShrink: 0,
          }}
        >
          AlpenTalent
        </Link>

        {/* Desktop nav */}
        <nav
          style={{ display: 'flex', alignItems: 'center', gap: 2 }}
          className="at-desktop-nav"
        >
          <NavLink href={`${base}/jobs`}>{n.jobs}</NavLink>
          <NavLink href={`${base}/for-candidates`}>{n.forCandidates}</NavLink>
          <NavLink href={`${base}/for-employers`}>{n.forEmployers}</NavLink>
          <NavLink href={`${base}/how-it-works`}>{n.howItWorks}</NavLink>
          <NavLink href={`${base}/resources`}>{n.resources}</NavLink>
          <NavLink href={`${base}/about`}>{n.about}</NavLink>
        </nav>

        {/* Right cluster */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <span className="at-desktop-nav">
            <LanguageSwitcher locale={locale} />
          </span>
          <span className="at-desktop-nav">
            <ThemeToggle locale={locale} />
          </span>
          <Link
            href={`/login?role=candidate`}
            className="at-btn at-btn--ghost at-btn--sm at-desktop-nav"
          >
            {n.login}
          </Link>
          <Link
            href={`${base}/jobs`}
            className="at-btn at-btn--primary at-btn--sm"
          >
            {n.findOpportunities}
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="at-mobile-hamburger at-focus-ring"
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
              color: 'var(--text)',
            }}
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="4" x2="16" y2="16" /><line x1="16" y1="4" x2="4" y2="16" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="17" y2="6" /><line x1="3" y1="10" x2="17" y2="10" /><line x1="3" y1="14" x2="17" y2="14" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      {menuOpen && (
        <div
          style={{
            borderTop: '1px solid var(--border)',
            background: 'var(--bg-elevated)',
            padding: '16px 0 24px',
          }}
        >
          <div className="at-container" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[
              [n.jobs, `${base}/jobs`],
              [n.forCandidates, `${base}/for-candidates`],
              [n.forEmployers, `${base}/for-employers`],
              [n.howItWorks, `${base}/how-it-works`],
              [n.resources, `${base}/resources`],
              [n.about, `${base}/about`],
              [n.login, `/login?role=candidate`],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-chip)',
                  color: 'var(--text)',
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'background var(--dur-fast) var(--ease)',
                }}
              >
                {label}
              </Link>
            ))}
            <div style={{ padding: '8px 16px', display: 'flex', gap: 12, alignItems: 'center' }}>
              <LanguageSwitcher locale={locale} />
              <ThemeToggle locale={locale} />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1099px) {
          .at-desktop-nav { display: none !important; }
          .at-mobile-hamburger { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        padding: '6px 8px',
        borderRadius: 'var(--radius-chip)',
        color: 'var(--text-muted)',
        textDecoration: 'none',
        fontSize: '0.875rem',
        fontWeight: 500,
        whiteSpace: 'nowrap',
        transition: 'color var(--dur-fast) var(--ease), background var(--dur-fast) var(--ease)',
      }}
    >
      {children}
    </Link>
  );
}
