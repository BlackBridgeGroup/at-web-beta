'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, normalizeLocale } from '../lib/i18n';
import type { Locale } from '../lib/i18n';

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const path = usePathname();

  function target(next: Locale) {
    const m = path.match(/^\/(de|cz|cs|en)(\/.*)?$/);
    return m ? `/${next}${m[2] || ''}` : `/${next}`;
  }

  function remember(next: Locale) {
    try {
      localStorage.setItem('alpentalent_locale', next);
      document.cookie = `alpentalent_locale=${next};path=/;max-age=31536000;samesite=lax`;
    } catch {}
  }

  const current = normalizeLocale(locale);

  return (
    <div style={{ display: 'inline-flex', gap: 2 }} aria-label="Language switcher">
      {locales.map(l => (
        <Link
          key={l}
          href={target(l)}
          onClick={() => remember(l)}
          aria-current={current === l ? 'page' : undefined}
          style={{
            padding: '4px 8px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.75rem',
            fontWeight: current === l ? 700 : 400,
            color: current === l ? 'var(--primary)' : 'var(--text-muted)',
            textDecoration: 'none',
            background: current === l ? 'var(--at-alpine-light)' : 'transparent',
            transition: 'all var(--dur-fast) var(--ease)',
          }}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
