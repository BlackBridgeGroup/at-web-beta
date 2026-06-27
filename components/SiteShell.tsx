import { AppBar } from './AppBar';
import { SiteFooter } from './SiteFooter';
import { ReceptionistWidget } from './ReceptionistWidget';
import { normalizeLocale, type Locale } from '../lib/i18n';

interface SiteShellProps {
  children: React.ReactNode;
  app?: boolean;
  locale?: string;
}

export function SiteShell({ children, app = false, locale: rawLocale = 'en' }: SiteShellProps) {
  const locale = normalizeLocale(rawLocale) as Locale;
  return (
    <>
      <a href="#main-content" className="at-skip-link">Skip to main content</a>
      <AppBar locale={locale} />
      <main id="main-content" style={{ minHeight: 'calc(100vh - 64px)' }}>{children}</main>
      <SiteFooter locale={locale} />
      <ReceptionistWidget app={app} locale={locale} />
    </>
  );
}
