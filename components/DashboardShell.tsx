'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type ReactNode } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { SignOut } from './SignOut';
import { ReceptionistWidget } from './ReceptionistWidget';
import type { Locale } from '../lib/i18n';

type Role = 'candidate' | 'employer' | 'partner';

interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
}

const candidateNav: NavItem[] = [
  { label: 'Dashboard', href: '/candidate/dashboard', icon: <HomeIcon /> },
  { label: 'Jobs', href: '/candidate/matches', icon: <SearchIcon /> },
  { label: 'Applications', href: '/candidate/applications', icon: <FileIcon /> },
  { label: 'Messages', href: '/candidate/messages', icon: <MessageIcon /> },
  { label: 'Saved', href: '/candidate/saved', icon: <HeartIcon /> },
  { label: 'Documents', href: '/candidate/documents', icon: <DocumentIcon /> },
  { label: 'Profile', href: '/candidate/profile', icon: <UserIcon /> },
];

const employerNav: NavItem[] = [
  { label: 'Dashboard', href: '/employer/dashboard', icon: <HomeIcon /> },
  { label: 'Vacancies', href: '/employer/vacancies', icon: <BriefcaseIcon /> },
  { label: 'Candidates', href: '/employer/candidates', icon: <UsersIcon /> },
  { label: 'Interviews', href: '/employer/interviews', icon: <CalendarIcon /> },
  { label: 'Placements', href: '/employer/placements', icon: <CheckIcon /> },
  { label: 'Campaigns', href: '/employer/campaigns', icon: <MegaphoneIcon /> },
  { label: 'Invoices', href: '/employer/invoices', icon: <InvoiceIcon /> },
  { label: 'Branding', href: '/employer/branding', icon: <StarIcon /> },
];

const partnerNav: NavItem[] = [
  { label: 'Dashboard', href: '/partner/dashboard', icon: <HomeIcon /> },
  { label: 'Pipeline', href: '/partner/pipeline', icon: <UsersIcon /> },
];

const navByRole: Record<Role, NavItem[]> = {
  candidate: candidateNav,
  employer: employerNav,
  partner: partnerNav,
};

// Localized nav labels keyed by href. EN falls back to the labels defined above.
const NAV_LABELS: Record<string, Record<string, string>> = {
  de: {
    '/candidate/dashboard': 'Übersicht', '/candidate/matches': 'Stellen',
    '/candidate/applications': 'Bewerbungen', '/candidate/messages': 'Nachrichten',
    '/candidate/saved': 'Gespeichert', '/candidate/documents': 'Dokumente', '/candidate/profile': 'Profil',
    '/employer/dashboard': 'Übersicht', '/employer/vacancies': 'Stellenangebote',
    '/employer/candidates': 'Kandidaten', '/employer/interviews': 'Interviews',
    '/employer/placements': 'Vermittlungen', '/employer/campaigns': 'Kampagnen',
    '/employer/invoices': 'Rechnungen', '/employer/branding': 'Employer Branding',
    '/partner/dashboard': 'Übersicht', '/partner/pipeline': 'Pipeline',
  },
  cz: {
    '/candidate/dashboard': 'Přehled', '/candidate/matches': 'Pozice',
    '/candidate/applications': 'Přihlášky', '/candidate/messages': 'Zprávy',
    '/candidate/saved': 'Uložené', '/candidate/documents': 'Dokumenty', '/candidate/profile': 'Profil',
    '/employer/dashboard': 'Přehled', '/employer/vacancies': 'Pozice',
    '/employer/candidates': 'Kandidáti', '/employer/interviews': 'Pohovory',
    '/employer/placements': 'Umístění', '/employer/campaigns': 'Kampaně',
    '/employer/invoices': 'Faktury', '/employer/branding': 'Employer branding',
    '/partner/dashboard': 'Přehled', '/partner/pipeline': 'Pipeline',
  },
};

interface DashboardShellProps {
  children: ReactNode;
  role: Role;
  locale?: Locale;
  userName?: string;
  signOutLabel?: string;
}

export function DashboardShell({
  children,
  role,
  locale = 'en',
  userName,
  signOutLabel = 'Sign out',
}: DashboardShellProps) {
  const labels = NAV_LABELS[locale];
  const nav = labels
    ? navByRole[role].map(item => ({ ...item, label: labels[item.href] ?? item.label }))
    : navByRole[role];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Sidebar — desktop */}
      <aside
        className="at-sidebar"
        style={{
          width: 232,
          flexShrink: 0,
          background: 'var(--bg-elevated)',
          borderRight: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflowY: 'auto',
        }}
      >
        {/* Logo */}
        <Link
          href={`/${locale}`}
          style={{
            display: 'block',
            padding: '20px 20px 16px',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '1rem',
            color: 'var(--at-alpine-green)',
            textDecoration: 'none',
            letterSpacing: '-0.02em',
            borderBottom: '1px solid var(--border)',
          }}
        >
          AlpenTalent
        </Link>

        {/* Nav items */}
        <nav style={{ flex: 1, padding: '12px 8px' }}>
          {nav.map(item => (
            <SidebarItem key={item.href} item={item} />
          ))}
        </nav>

        {/* Bottom actions */}
        <div
          style={{
            padding: '12px 8px 20px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <div style={{ padding: '8px 12px' }}>
            <ThemeToggle />
          </div>
          <SignOut label={signOutLabel} />
        </div>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <main style={{ flex: 1, padding: 'var(--space-4)', maxWidth: 1200, width: '100%', marginInline: 'auto' }}>
          {children}
        </main>
      </div>

      {/* Bottom tab bar — mobile */}
      <nav
        className="at-bottom-tab"
        style={{
          display: 'none',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'var(--bg-elevated)',
          borderTop: '1px solid var(--border)',
          zIndex: 'var(--z-sticky)',
          padding: '8px 0 env(safe-area-inset-bottom)',
        }}
        aria-label="Navigation"
      >
        {nav.slice(0, 5).map(item => (
          <BottomTabItem key={item.href} item={item} />
        ))}
      </nav>

      <ReceptionistWidget app locale={locale} />

      <style>{`
        @media (max-width: 1023px) {
          .at-sidebar { display: none !important; }
          .at-bottom-tab { display: flex !important; justify-content: space-around; }
          main { padding-bottom: 80px !important; }
        }
      `}</style>
    </div>
  );
}

function SidebarItem({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const active = pathname === item.href || pathname.startsWith(item.href + '/');
  return (
    <Link
      href={item.href}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '9px 12px',
        borderRadius: 'var(--radius-chip)',
        textDecoration: 'none',
        color: active ? 'var(--at-alpine-green)' : 'var(--text-muted)',
        fontWeight: active ? 600 : 400,
        fontSize: '0.875rem',
        background: active ? 'var(--at-alpine-light)' : 'transparent',
        borderLeft: active ? '2.5px solid var(--at-alpine-green)' : '2.5px solid transparent',
        transition: 'all var(--dur-fast) var(--ease)',
        marginBottom: 2,
      }}
    >
      <span style={{ flexShrink: 0, opacity: active ? 1 : 0.7 }}>{item.icon}</span>
      {item.label}
    </Link>
  );
}

function BottomTabItem({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const active = pathname === item.href || pathname.startsWith(item.href + '/');
  return (
    <Link
      href={item.href}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        padding: '4px 8px',
        textDecoration: 'none',
        color: active ? 'var(--at-alpine-green)' : 'var(--text-subtle)',
        fontSize: '0.6875rem',
        fontWeight: active ? 600 : 400,
      }}
    >
      <span style={{ opacity: active ? 1 : 0.6 }}>{item.icon}</span>
      {item.label}
    </Link>
  );
}

/* ── Icon components ── */
function HomeIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>; }
function SearchIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>; }
function FileIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>; }
function MessageIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>; }
function HeartIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>; }
function DocumentIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>; }
function UserIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>; }
function BriefcaseIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>; }
function UsersIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>; }
function CalendarIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>; }
function CheckIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>; }
function MegaphoneIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>; }
function InvoiceIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>; }
function StarIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>; }
