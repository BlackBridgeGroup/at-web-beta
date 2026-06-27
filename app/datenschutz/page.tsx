import { SiteShell } from '../../components/SiteShell';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy Policy / Datenschutz' };

export default function Datenschutz() {
  return (
    <SiteShell locale="de">
      <div style={{ paddingBlock: 'clamp(48px, 8vw, 80px)' }}>
        <div
          style={{
            maxWidth: 720,
            marginInline: 'auto',
            paddingInline: 'var(--space-3)',
          }}
        >
          <p style={{ margin: '0 0 8px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--at-alpine-green)' }}>
            Legal
          </p>
          <h1 className="at-h1" style={{ margin: '0 0 4px' }}>Datenschutzerklärung</h1>
          <p style={{ margin: '0 0 var(--space-6)', color: 'var(--text-subtle)', fontSize: '0.8125rem' }}>
            Zuletzt aktualisiert: Juni 2025
          </p>

          <div style={{ lineHeight: 1.8, color: 'var(--text-muted)' }}>
            <h2 className="at-h2" style={{ color: 'var(--text)', marginBottom: 'var(--space-2)' }}>1. Verantwortlicher</h2>
            <p>AlpenTalent, Wien, Österreich · info@alpentalent.com</p>

            <h2 className="at-h2" style={{ color: 'var(--text)', marginTop: 'var(--space-4)', marginBottom: 'var(--space-2)' }}>2. Datenverarbeitung</h2>
            <p>
              Wir verarbeiten personenbezogene Daten (Name, E-Mail, Berufsprofil) zur Vermittlung von Arbeitsstellen
              in der österreichischen Hotellerie und Gastronomie. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO
              (Vertragserfüllung) sowie Einwilligung gem. Art. 6 Abs. 1 lit. a DSGVO.
            </p>

            <h2 className="at-h2" style={{ color: 'var(--text)', marginTop: 'var(--space-4)', marginBottom: 'var(--space-2)' }}>3. Drittanbieter</h2>
            <ul>
              <li><strong>Supabase</strong> — Datenbank und Authentifizierung (EU-Server)</li>
              <li><strong>Google OAuth</strong> — Anmeldung (Google LLC, USA; EU–US Data Privacy Framework)</li>
              <li><strong>Netlify</strong> — Hosting (USA; Standardvertragsklauseln)</li>
            </ul>

            <h2 className="at-h2" style={{ color: 'var(--text)', marginTop: 'var(--space-4)', marginBottom: 'var(--space-2)' }}>4. Ihre Rechte</h2>
            <p>
              Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerspruch.
              Kontakt: info@alpentalent.com
            </p>

            <p style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', background: 'var(--bg-sunken)', borderRadius: 'var(--radius-chip)', fontSize: '0.8125rem' }}>
              <strong>Hinweis für den Betreiber:</strong> Diese Erklärung muss vor dem Launch vollständig
              rechtlich geprüft und ergänzt werden (Aufbewahrungsfristen, vollständige DPA-Liste, Beschwerdestelle).
            </p>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
