import Link from 'next/link';
import { Ridge } from './Ridge';
import { getDictionary, type Locale } from '../lib/i18n';

interface SiteFooterProps {
  locale: Locale;
}

export function SiteFooter({ locale }: SiteFooterProps) {
  const d = getDictionary(locale);
  const f = d.ui.footer;

  const columns = [
    {
      title: f.colCandidates,
      links: [
        [f.linkFindJobs, '/jobs'],
        [f.linkHowItWorks, '/how-it-works'],
        [f.linkSalaryGuide, '/salary-guide'],
        [f.linkRegions, '/regions'],
        [f.linkResources, '/resources'],
      ],
    },
    {
      title: f.colEmployers,
      links: [
        [f.linkForEmployers, '/for-employers'],
        [f.linkPostVacancy, '/login?role=employer'],
        [f.linkSuccessStories, '/success-stories'],
      ],
    },
    {
      title: f.colCompany,
      links: [
        [f.linkAbout, '/about'],
        [f.linkContact, '/contact'],
        [f.linkFaq, '/faq'],
      ],
    },
    {
      title: f.colLegal,
      links: [
        [f.linkPrivacy, '/datenschutz'],
        [f.linkImprint, '/impressum'],
      ],
    },
  ];

  return (
    <footer style={{ marginTop: 'var(--space-8)' }}>
      <Ridge variant="footer" opacity={0.07} />
      <div
        style={{
          background: 'var(--bg-sunken)',
          borderTop: '1px solid var(--border)',
          paddingBlock: 'var(--space-8)',
        }}
      >
        <div className="at-container">
          {/* Top row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 'var(--space-4)',
              marginBottom: 'var(--space-6)',
            }}
          >
            {/* Brand column */}
            <div style={{ gridColumn: 'span 1' }}>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.125rem',
                  color: 'var(--at-alpine-green)',
                  margin: '0 0 8px',
                  letterSpacing: '-0.02em',
                }}
              >
                AlpenTalent
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', margin: '0 0 16px', maxWidth: 200 }}>
                {f.tagline}
              </p>
              <a
                href="https://wa.me/436769124013"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  color: 'var(--at-alpine-green)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.13.558 4.13 1.534 5.866L.064 23.5l5.793-1.517A11.935 11.935 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.797 9.797 0 01-5.011-1.38l-.36-.213-3.44.902.917-3.35-.235-.374A9.78 9.78 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
                </svg>
                {f.whatsappLabel}
              </a>
            </div>

            {/* Link columns */}
            {columns.map(col => (
              <div key={col.title}>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '0.8125rem',
                    color: 'var(--text)',
                    margin: '0 0 12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  {col.title}
                </p>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {col.links.map(([label, href]) => (
                    <li key={href}>
                      <Link
                        href={`/${locale}${href}`}
                        style={{
                          color: 'var(--text-muted)',
                          textDecoration: 'none',
                          fontSize: '0.875rem',
                          transition: 'color var(--dur-fast) var(--ease)',
                        }}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom row */}
          <div
            style={{
              borderTop: '1px solid var(--border)',
              paddingTop: 'var(--space-3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <p style={{ margin: 0, color: 'var(--text-subtle)', fontSize: '0.8125rem', display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
              {f.copyright}
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                ['EN', '/en'],
                ['DE', '/de'],
                ['CZ', '/cz'],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-chip)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-muted)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    background: locale === href.slice(1) ? 'var(--bg-elevated)' : 'transparent',
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
