import { notFound } from 'next/navigation';
import { SiteShell } from '../../../components/SiteShell';
import { locales, normalizeLocale, type Locale } from '../../../lib/i18n';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export const metadata: Metadata = { title: 'Contact' };

export default async function Contact({ params }: { params: Promise<{ locale: string }> }) {
  const raw = (await params).locale;
  if (!['de', 'cz', 'en'].includes(raw)) notFound();
  const locale = normalizeLocale(raw) as Locale;

  return (
    <SiteShell locale={locale}>
      <div style={{ paddingBlock: 'clamp(48px, 8vw, 96px)' }}>
        <div className="at-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-8)', alignItems: 'start' }}>
            {/* Left: info */}
            <div>
              <p style={{ margin: '0 0 12px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--at-alpine-green)' }}>Get in touch</p>
              <h1 className="at-h1" style={{ margin: '0 0 var(--space-2)' }}>Let's talk.</h1>
              <p style={{ margin: '0 0 var(--space-4)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                30 minutes. No obligation. Whether you're a candidate with questions or a hotel looking for staff — we're here.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <a
                  href="https://wa.me/436769124013"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: 'var(--at-alpine-green)', fontWeight: 600, textDecoration: 'none', fontSize: '0.9375rem' }}
                >
                  <span style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--at-alpine-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--at-alpine-green)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </span>
                  Message us on WhatsApp
                </a>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  <span style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--bg-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⏱️</span>
                  We reply within 24 hours, usually much faster.
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  <span style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--bg-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </span>
                  Vienna, Austria — serving all regions
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="at-card" style={{ padding: 'var(--space-4)' }}>
              <h2 className="at-h3" style={{ margin: '0 0 var(--space-3)' }}>Send us a message</h2>
              <form style={{ display: 'grid', gap: 'var(--space-2)' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: 6, color: 'var(--text-muted)' }}>Name</label>
                  <input className="at-input" type="text" placeholder="Your name" required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: 6, color: 'var(--text-muted)' }}>Email</label>
                  <input className="at-input" type="email" placeholder="your@email.com" required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: 6, color: 'var(--text-muted)' }}>I am a…</label>
                  <select className="at-input">
                    <option value="">Select role</option>
                    <option>Candidate looking for work</option>
                    <option>Employer / hotel</option>
                    <option>Partner or other</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: 6, color: 'var(--text-muted)' }}>Message</label>
                  <textarea
                    className="at-input"
                    placeholder="How can we help?"
                    rows={4}
                    style={{ resize: 'vertical' }}
                    required
                  />
                </div>
                <button type="submit" className="at-btn at-btn--primary" style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}>
                  Send message
                </button>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-subtle)', textAlign: 'center' }}>
                  We only use your details to respond to your message.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
