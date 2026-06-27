import { notFound } from 'next/navigation';
import { SiteShell } from '../../../components/SiteShell';
import { locales, normalizeLocale, type Locale } from '../../../lib/i18n';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const raw = (await params).locale;
  const locale = normalizeLocale(raw) as Locale;
  const titles: Record<Locale, string> = {
    en: 'Imprint',
    de: 'Impressum',
    cz: 'Tiráž',
  };
  return {
    title: titles[locale],
    alternates: {
      canonical: `https://alpentalent.com/${locale}/impressum`,
      languages: { de: '/de/impressum', cs: '/cz/impressum', en: '/en/impressum' },
    },
  };
}

export default async function Impressum({ params }: { params: Promise<{ locale: string }> }) {
  const raw = (await params).locale;
  if (!['de', 'cz', 'en'].includes(raw)) notFound();
  const locale = normalizeLocale(raw) as Locale;

  return (
    <SiteShell locale={locale}>
      <div style={{ paddingBlock: 'clamp(48px, 8vw, 96px)' }}>
        <div className="at-container" style={{ maxWidth: 680 }}>
          <h1 className="at-h1" style={{ margin: '0 0 var(--space-6)' }}>Impressum</h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <section>
              <h2 className="at-h3" style={{ margin: '0 0 var(--space-1)', color: 'var(--at-alpine-green)' }}>
                Angaben gemäß § 5 ECG / Information pursuant to § 5 ECG
              </h2>
              <div style={{ color: 'var(--text-muted)', lineHeight: 2, fontSize: '0.9375rem' }}>
                <p style={{ margin: 0 }}><strong style={{ color: 'var(--text)' }}>AlpenTalent</strong></p>
                <p style={{ margin: 0 }}>Wien, Österreich</p>
                <p style={{ margin: 0 }}>E-Mail: <a href="mailto:info@alpentalent.com" style={{ color: 'var(--primary)' }}>info@alpentalent.com</a></p>
                <p style={{ margin: 0 }}>WhatsApp: <a href="https://wa.me/436769124013" style={{ color: 'var(--primary)' }}>+43 676 912 4013</a></p>
              </div>
            </section>

            <div style={{ height: 1, background: 'var(--border)' }} />

            <section>
              <h2 className="at-h3" style={{ margin: '0 0 var(--space-1)', color: 'var(--at-alpine-green)' }}>
                Unternehmensgegenstand / Purpose of the company
              </h2>
              <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.75, fontSize: '0.9375rem' }}>
                Vermittlung von Arbeitskräften in der österreichischen Hotellerie und Gastronomie. Betrieb einer Online-Plattform zur Stellenvermittlung (AlpenTalent).
              </p>
              <p style={{ margin: '8px 0 0', color: 'var(--text-muted)', lineHeight: 1.75, fontSize: '0.9375rem' }}>
                Placement of workers in the Austrian hotel and restaurant industry. Operation of an online job placement platform (AlpenTalent).
              </p>
            </section>

            <div style={{ height: 1, background: 'var(--border)' }} />

            <section>
              <h2 className="at-h3" style={{ margin: '0 0 var(--space-1)', color: 'var(--at-alpine-green)' }}>
                Haftungsausschluss / Disclaimer
              </h2>
              <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.75, fontSize: '0.9375rem' }}>
                Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
              </p>
              <p style={{ margin: '8px 0 0', color: 'var(--text-muted)', lineHeight: 1.75, fontSize: '0.9375rem' }}>
                The contents of this website have been created with the greatest possible care. However, we cannot accept any liability for the accuracy, completeness and topicality of the content.
              </p>
            </section>

            <div style={{ height: 1, background: 'var(--border)' }} />

            <section>
              <h2 className="at-h3" style={{ margin: '0 0 var(--space-1)', color: 'var(--at-alpine-green)' }}>
                Urheberrecht / Copyright
              </h2>
              <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.75, fontSize: '0.9375rem' }}>
                Die durch den Betreiber dieser Seite erstellten Inhalte und Werke unterliegen dem österreichischen Urheberrecht. © {new Date().getFullYear()} AlpenTalent. Alle Rechte vorbehalten.
              </p>
            </section>

            <div style={{ height: 1, background: 'var(--border)' }} />

            <section>
              <h2 className="at-h3" style={{ margin: '0 0 var(--space-1)', color: 'var(--at-alpine-green)' }}>
                Online-Streitbeilegung / Online dispute resolution
              </h2>
              <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.75, fontSize: '0.9375rem' }}>
                Gemäß Verordnung über Online-Streitbeilegung in Verbraucherangelegenheiten (ODR-Verordnung) möchten wir Sie über die Online-Streitbeilegungsplattform (OS-Plattform) der Europäischen Kommission informieren:&nbsp;
                <a href="https://ec.europa.eu/consumers/odr" style={{ color: 'var(--primary)' }} target="_blank" rel="noopener noreferrer">
                  ec.europa.eu/consumers/odr
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
