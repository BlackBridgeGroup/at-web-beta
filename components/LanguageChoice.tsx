'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { getDictionary, normalizeLocale, type Locale } from '../lib/i18n';
import { Ridge } from './Ridge';

export function LanguageChoice() {
  const d = getDictionary('de');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('alpentalent_locale');
      const locale = saved ? normalizeLocale(saved) : normalizeLocale(navigator.language);
      if (locale) location.replace(`/${locale}`);
    } catch {}
  }, []);

  function remember(l: Locale) {
    try {
      localStorage.setItem('alpentalent_locale', l);
      document.cookie = `alpentalent_locale=${l};path=/;max-age=31536000;samesite=lax`;
    } catch {}
  }

  const options: { locale: Locale; label: string; sub: string; variant: 'primary' | 'secondary' }[] = [
    { locale: 'en', label: 'English', sub: 'Candidates & Employers', variant: 'primary' },
    { locale: 'de', label: 'Deutsch', sub: 'Arbeitgeber / Betriebe', variant: 'secondary' },
    { locale: 'cz', label: 'Čeština', sub: 'Uchazeči / Kandidáti', variant: 'secondary' },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--at-alpine-green)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-3)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background ridge */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, pointerEvents: 'none' }} aria-hidden="true">
        <Ridge variant="footer" opacity={0.08} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 480, width: '100%' }}>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '1.5rem',
            color: '#fff',
            margin: '0 0 var(--space-2)',
            letterSpacing: '-0.02em',
          }}
        >
          AlpenTalent
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(1.5rem, 5vw, 2rem)',
            color: '#fff',
            margin: '0 0 var(--space-6)',
          }}
        >
          {d.root.title}
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {options.map(opt => (
            <Link
              key={opt.locale}
              href={`/${opt.locale}`}
              onClick={() => remember(opt.locale)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderRadius: 'var(--radius-card)',
                background: opt.variant === 'primary' ? '#fff' : 'rgba(255,255,255,0.12)',
                color: opt.variant === 'primary' ? 'var(--at-alpine-green)' : '#fff',
                textDecoration: 'none',
                transition: 'all var(--dur-fast) var(--ease)',
                border: '1.5px solid',
                borderColor: opt.variant === 'primary' ? '#fff' : 'rgba(255,255,255,0.25)',
              }}
            >
              <div style={{ textAlign: 'left' }}>
                <p style={{ margin: 0, fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: '1rem' }}>{opt.label}</p>
                <p style={{ margin: 0, fontSize: '0.8125rem', opacity: 0.75 }}>{opt.sub}</p>
              </div>
              <span aria-hidden="true" style={{ fontSize: '1.25rem', opacity: 0.8 }}>→</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
