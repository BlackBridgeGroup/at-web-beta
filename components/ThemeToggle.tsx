'use client';
import { useEffect, useState } from 'react';
import { getDictionary, type Locale } from '../lib/i18n';

type Theme = 'light' | 'dark' | 'auto';

interface ThemeToggleProps {
  locale?: Locale;
}

function cetHour() {
  return new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Europe/Vienna' })
  ).getHours();
}

export function ThemeToggle({ locale = 'de' }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>('auto');
  const d = getDictionary(locale);

  useEffect(() => {
    const saved = localStorage.getItem('at-theme') as Theme | null;
    if (saved === 'light' || saved === 'dark') setTheme(saved);
    else setTheme('auto');
  }, []);

  function apply(t: Theme) {
    setTheme(t);
    if (t === 'auto') {
      localStorage.removeItem('at-theme');
      const h = cetHour();
      document.documentElement.setAttribute('data-theme', (h >= 7 && h < 19) ? 'light' : 'dark');
    } else {
      localStorage.setItem('at-theme', t);
      document.documentElement.setAttribute('data-theme', t);
    }
  }

  const options: { value: Theme; label: string }[] = [
    { value: 'light', label: d.ui.theme.light },
    { value: 'dark',  label: d.ui.theme.dark  },
    { value: 'auto',  label: d.ui.theme.auto  },
  ];

  return (
    <div
      role="group"
      aria-label="Color theme"
      style={{
        display: 'inline-flex',
        background: 'var(--bg-sunken)',
        borderRadius: 'var(--radius-pill)',
        padding: '3px',
        gap: '2px',
      }}
    >
      {options.map(o => (
        <button
          key={o.value}
          onClick={() => apply(o.value)}
          aria-pressed={theme === o.value}
          style={{
            padding: '5px 12px',
            borderRadius: 'var(--radius-pill)',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            fontWeight: 500,
            background: theme === o.value ? 'var(--bg-elevated)' : 'transparent',
            color: theme === o.value ? 'var(--text)' : 'var(--text-muted)',
            boxShadow: theme === o.value ? 'var(--shadow-sm)' : 'none',
            transition: 'all var(--dur-fast) var(--ease)',
          }}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
