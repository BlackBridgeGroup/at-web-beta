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
    en: 'Privacy Policy',
    de: 'Datenschutzerklärung',
    cz: 'Zásady ochrany osobních údajů',
  };
  return {
    title: titles[locale],
    alternates: {
      canonical: `https://alpentalent.com/${locale}/datenschutz`,
      languages: { de: '/de/datenschutz', cs: '/cz/datenschutz', en: '/en/datenschutz' },
    },
  };
}

export default async function Privacy({ params }: { params: Promise<{ locale: string }> }) {
  const raw = (await params).locale;
  if (!['de', 'cz', 'en'].includes(raw)) notFound();
  const locale = normalizeLocale(raw) as Locale;

  return (
    <SiteShell locale={locale}>
      <div style={{ paddingBlock: 'clamp(48px, 8vw, 96px)' }}>
        <div className="at-container" style={{ maxWidth: 720 }}>
          <h1 className="at-h1" style={{ margin: '0 0 var(--space-2)' }}>Datenschutzerklärung / Privacy Policy</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-6)' }}>
            Zuletzt aktualisiert / Last updated: Januar 2025
          </p>

          {[
            {
              title: 'Verantwortlicher / Controller',
              body: 'AlpenTalent, Wien, Österreich · E-Mail: info@alpentalent.com',
            },
            {
              title: 'Welche Daten wir erheben / Data we collect',
              body: 'Wir erheben nur die Daten, die Sie uns direkt mitteilen: Name, E-Mail-Adresse, berufliche Informationen (Rolle, Region, Sprachkenntnisse) sowie Ihre Kontaktpräferenz. Arbeitgeber übermitteln Unternehmensname, Ansprechpartner und Stellenangebote.\n\nWe collect only data you provide directly: name, email address, professional information (role, region, language skills) and contact preference. Employers submit company name, contact person and job vacancies.',
            },
            {
              title: 'Rechtsgrundlage / Legal basis',
              body: 'Die Verarbeitung basiert auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sowie auf unserem berechtigten Interesse an der Vermittlung von Stellen (Art. 6 Abs. 1 lit. f DSGVO).\n\nProcessing is based on your consent (Art. 6(1)(a) GDPR) and our legitimate interest in placing candidates (Art. 6(1)(f) GDPR).',
            },
            {
              title: 'Verwendungszweck / Purpose',
              body: 'Ihre Daten verwenden wir ausschließlich zur Vermittlung von Arbeitsstellen im österreichischen Hotelgewerbe, zur Kommunikation mit Ihnen und zur Verbesserung unserer Dienste.\n\nWe use your data exclusively for placing you in hospitality roles in Austria, for communication with you, and to improve our service.',
            },
            {
              title: 'Weitergabe an Dritte / Third-party sharing',
              body: 'Wir geben Ihr Profil nur mit Ihrer ausdrücklichen Zustimmung an Arbeitgeber weiter. Wir verkaufen keine personenbezogenen Daten.\n\nWe share your profile with employers only with your explicit consent. We do not sell personal data.',
            },
            {
              title: 'Speicherdauer / Retention',
              body: 'Wir speichern Ihre Daten so lange, wie es für die Dienstvermittlung erforderlich ist, oder bis Sie die Löschung beantragen. Inaktive Profile werden nach 24 Monaten gelöscht.\n\nWe retain your data for as long as needed for the placement service, or until you request deletion. Inactive profiles are deleted after 24 months.',
            },
            {
              title: 'Ihre Rechte / Your rights',
              body: 'Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Kontaktieren Sie uns unter info@alpentalent.com.\n\nYou have the right to access, rectify, erase, restrict processing, data portability and object. Contact us at info@alpentalent.com.',
            },
            {
              title: 'Cookies',
              body: 'Wir verwenden nur technisch notwendige Cookies (Session, Locale-Präferenz). Es werden keine Tracking- oder Werbe-Cookies gesetzt.\n\nWe use only technically necessary cookies (session, locale preference). No tracking or advertising cookies are set.',
            },
            {
              title: 'Beschwerderecht / Right to lodge a complaint',
              body: 'Sie haben das Recht, eine Beschwerde bei der Österreichischen Datenschutzbehörde (www.dsb.gv.at) einzureichen.\n\nYou have the right to lodge a complaint with the Austrian Data Protection Authority (www.dsb.gv.at).',
            },
          ].map(({ title, body }) => (
            <section key={title} style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--border)' }}>
              <h2 className="at-h3" style={{ margin: '0 0 var(--space-1)', color: 'var(--at-alpine-green)' }}>{title}</h2>
              {body.split('\n\n').map((para, i) => (
                <p key={i} style={{ margin: '0 0 8px', color: 'var(--text-muted)', lineHeight: 1.75, fontSize: '0.9375rem' }}>{para}</p>
              ))}
            </section>
          ))}

          <p style={{ color: 'var(--text-subtle)', fontSize: '0.8125rem' }}>
            Fragen? / Questions? <a href="mailto:info@alpentalent.com" style={{ color: 'var(--primary)' }}>info@alpentalent.com</a>
          </p>
        </div>
      </div>
    </SiteShell>
  );
}
