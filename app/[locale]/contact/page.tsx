import { notFound } from 'next/navigation';
import { SiteShell } from '../../../components/SiteShell';
import { locales, normalizeLocale, type Locale } from '../../../lib/i18n';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export const metadata: Metadata = { title: 'Contact' };

const T: Record<string, {
  eyebrow: string; h1: string; sub: string;
  whatsapp: string; reply: string; location: string;
  formTitle: string; name: string; namePh: string; email: string;
  iam: string; selectRole: string; roleCand: string; roleEmp: string; rolePartner: string;
  message: string; messagePh: string; send: string; privacy: string;
}> = {
  de: {
    eyebrow: 'Kontakt', h1: 'Sprechen wir.',
    sub: '30 Minuten. Unverbindlich. Ob du Kandidat mit Fragen bist oder ein Hotel, das Personal sucht — wir sind für dich da.',
    whatsapp: 'Schreib uns auf WhatsApp', reply: 'Wir antworten innerhalb von 24 Stunden, meist viel schneller.', location: 'Wien, Österreich — für alle Regionen.',
    formTitle: 'Schreib uns', name: 'Name', namePh: 'Dein Name', email: 'E-Mail',
    iam: 'Ich bin…', selectRole: 'Rolle wählen', roleCand: 'Kandidat auf Jobsuche', roleEmp: 'Arbeitgeber / Hotel', rolePartner: 'Partner oder andere',
    message: 'Nachricht', messagePh: 'Wie können wir helfen?', send: 'Nachricht senden', privacy: 'Wir nutzen deine Daten nur, um auf deine Nachricht zu antworten.',
  },
  cz: {
    eyebrow: 'Kontakt', h1: 'Pojďme si promluvit.',
    sub: '30 minut. Nezávazně. Ať jsi uchazeč s otázkami, nebo hotel hledající personál — jsme tu pro tebe.',
    whatsapp: 'Napiš nám na WhatsApp', reply: 'Odpovídáme do 24 hodin, obvykle mnohem dřív.', location: 'Vídeň, Rakousko — pro všechny regiony.',
    formTitle: 'Napiš nám', name: 'Jméno', namePh: 'Tvé jméno', email: 'E-mail',
    iam: 'Jsem…', selectRole: 'Vyber roli', roleCand: 'Uchazeč hledající práci', roleEmp: 'Zaměstnavatel / hotel', rolePartner: 'Partner nebo jiné',
    message: 'Zpráva', messagePh: 'Jak můžeme pomoct?', send: 'Odeslat zprávu', privacy: 'Tvé údaje použijeme jen k odpovědi na tvou zprávu.',
  },
  en: {
    eyebrow: 'Get in touch', h1: "Let's talk.",
    sub: "30 minutes. No obligation. Whether you're a candidate with questions or a hotel looking for staff — we're here.",
    whatsapp: 'Message us on WhatsApp', reply: 'We reply within 24 hours, usually much faster.', location: 'Vienna, Austria — serving all regions.',
    formTitle: 'Send us a message', name: 'Name', namePh: 'Your name', email: 'Email',
    iam: 'I am a…', selectRole: 'Select role', roleCand: 'Candidate looking for work', roleEmp: 'Employer / hotel', rolePartner: 'Partner or other',
    message: 'Message', messagePh: 'How can we help?', send: 'Send message', privacy: 'We only use your details to respond to your message.',
  },
};

export default async function Contact({ params }: { params: Promise<{ locale: string }> }) {
  const raw = (await params).locale;
  if (!['de', 'cz', 'en'].includes(raw)) notFound();
  const locale = normalizeLocale(raw) as Locale;
  const t = T[locale] ?? T.de;
  const labelStyle = { display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: 6, color: 'var(--text-muted)' } as const;

  return (
    <SiteShell locale={locale}>
      <div style={{ paddingBlock: 'clamp(48px, 8vw, 96px)' }}>
        <div className="at-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-8)', alignItems: 'start' }}>
            {/* Left: info */}
            <div>
              <p style={{ margin: '0 0 12px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--at-alpine-green)' }}>{t.eyebrow}</p>
              <h1 className="at-h1" style={{ margin: '0 0 var(--space-2)' }}>{t.h1}</h1>
              <p style={{ margin: '0 0 var(--space-4)', color: 'var(--text-muted)', lineHeight: 1.7 }}>{t.sub}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <a href="https://wa.me/436769124013" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: 'var(--at-alpine-green)', fontWeight: 600, textDecoration: 'none', fontSize: '0.9375rem' }}>
                  <span style={{ width: 36, height: 36, borderRadius: '50%', background: 'color-mix(in srgb, var(--at-alpine-green) 14%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--at-alpine-green)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </span>
                  {t.whatsapp}
                </a>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  <span style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--bg-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </span>
                  {t.reply}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  <span style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--bg-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </span>
                  {t.location}
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="at-card" style={{ padding: 'var(--space-4)' }}>
              <h2 className="at-h3" style={{ margin: '0 0 var(--space-3)' }}>{t.formTitle}</h2>
              <form style={{ display: 'grid', gap: 'var(--space-2)' }}>
                <div>
                  <label style={labelStyle}>{t.name}</label>
                  <input className="at-input" type="text" placeholder={t.namePh} required />
                </div>
                <div>
                  <label style={labelStyle}>{t.email}</label>
                  <input className="at-input" type="email" placeholder="your@email.com" required />
                </div>
                <div>
                  <label style={labelStyle}>{t.iam}</label>
                  <select className="at-input" defaultValue="">
                    <option value="">{t.selectRole}</option>
                    <option>{t.roleCand}</option>
                    <option>{t.roleEmp}</option>
                    <option>{t.rolePartner}</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>{t.message}</label>
                  <textarea className="at-input" placeholder={t.messagePh} rows={4} style={{ resize: 'vertical' }} required />
                </div>
                <button type="submit" className="at-btn at-btn--primary" style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}>{t.send}</button>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-subtle)', textAlign: 'center' }}>{t.privacy}</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
