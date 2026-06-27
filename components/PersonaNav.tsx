'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getDictionary, type Locale } from '../lib/i18n';

function BellIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
    </svg>
  );
}

function ChefHatIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/>
      <line x1="6" x2="18" y1="17" y2="17"/>
    </svg>
  );
}

function BedDoubleIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/>
      <path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/>
      <path d="M12 10v10"/>
      <path d="M2 20h20"/>
    </svg>
  );
}

function UtensilsIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
      <path d="M7 2v20"/>
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3v7"/>
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    </svg>
  );
}

const BASE_STYLE: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 5,
  padding: '4px 12px',
  borderRadius: 'var(--radius-pill)',
  border: '1px solid var(--border)',
  background: 'var(--bg-elevated)',
  color: 'var(--text-muted)',
  fontSize: '0.8125rem',
  fontWeight: 500,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  flexShrink: 0,
  transition: 'color var(--dur-fast) var(--ease), border-color var(--dur-fast) var(--ease), background var(--dur-fast) var(--ease)',
};

const ACTIVE_STYLE: React.CSSProperties = {
  ...BASE_STYLE,
  borderColor: 'var(--at-alpine-green)',
  color: 'var(--at-alpine-green)',
  background: 'var(--at-alpine-light)',
};

function PersonaStrip({ locale, activeRole }: { locale: Locale; activeRole: string }) {
  const d = getDictionary(locale);
  const p = d.ui.persona;

  const chips = [
    { slug: 'reception',    label: p.reception,    icon: <BellIcon /> },
    { slug: 'chef',         label: p.chef,         icon: <ChefHatIcon /> },
    { slug: 'housekeeping', label: p.housekeeping, icon: <BedDoubleIcon /> },
    { slug: 'waiter',       label: p.waiter,       icon: <UtensilsIcon /> },
    { slug: 'manager',      label: p.manager,      icon: <BriefcaseIcon /> },
  ];

  return (
    <div
      style={{
        position: 'sticky',
        top: 64,
        zIndex: 39,
        background: 'color-mix(in srgb, var(--bg) 94%, transparent)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        className="at-container"
        style={{ display: 'flex', gap: 6, paddingBlock: 7, overflowX: 'auto' }}
      >
        {chips.map(chip => {
          const active = activeRole === chip.slug;
          return (
            <Link
              key={chip.slug}
              href={`/${locale}/jobs?role=${chip.slug}`}
              style={active ? ACTIVE_STYLE : BASE_STYLE}
              aria-current={active ? 'page' : undefined}
            >
              {chip.icon}
              {chip.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function PersonaNavInner({ locale }: { locale: Locale }) {
  const searchParams = useSearchParams();
  return <PersonaStrip locale={locale} activeRole={searchParams.get('role') ?? ''} />;
}

export function PersonaNav({ locale }: { locale: Locale }) {
  return (
    <Suspense fallback={<PersonaStrip locale={locale} activeRole="" />}>
      <PersonaNavInner locale={locale} />
    </Suspense>
  );
}
