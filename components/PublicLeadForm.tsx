'use client';

import { useState } from 'react';
import type { Locale } from '../lib/i18n';

type ContactLabels = {
  name: string;
  namePh: string;
  email: string;
  iam: string;
  selectRole: string;
  roleCand: string;
  roleEmp: string;
  rolePartner: string;
  message: string;
  messagePh: string;
  send: string;
  privacy: string;
};

type QuestionnaireLabels = {
  name: string;
  role: string;
  languages: string;
  region: string;
  availability: string;
  contact: string;
  consent: string;
  continue: string;
};

const messages = {
  de: {
    success: 'Danke. Die Anfrage ist angekommen. AlpenTalent meldet sich persoenlich.',
    error: 'Senden fehlgeschlagen. Bitte schreibe uns direkt per WhatsApp.',
    phone: 'Telefon / WhatsApp',
    role: 'Rolle',
    contactValue: 'Kontakt',
  },
  cz: {
    success: 'Diky. Anfrage dorazila. AlpenTalent se ozve osobne.',
    error: 'Odeslani se nepodarilo. Napis nam prosim primo na WhatsApp.',
    phone: 'Telefon / WhatsApp',
    role: 'Role',
    contactValue: 'Kontakt',
  },
  en: {
    success: 'Thank you. Your request has arrived. AlpenTalent will contact you personally.',
    error: 'Could not send. Please message us directly on WhatsApp.',
    phone: 'Phone / WhatsApp',
    role: 'Role',
    contactValue: 'Contact',
  },
};

const labelStyle = {
  display: 'block',
  fontSize: '0.8125rem',
  fontWeight: 600,
  marginBottom: 6,
  color: 'var(--text-muted)',
} as const;

function roleToKind(role: string) {
  if (role === 'candidate') return 'candidate';
  if (role === 'employer') return 'employer';
  if (role === 'partner') return 'partner';
  return 'general';
}

export function ContactLeadForm({ locale, labels }: { locale: Locale; labels: ContactLabels }) {
  const t = messages[locale] ?? messages.de;
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('sending');
    setError('');
    const form = new FormData(event.currentTarget);
    const role = String(form.get('role') || 'general');
    const response = await fetch('/api/public-lead', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        kind: roleToKind(role),
        locale,
        source: 'contact',
        payload: {
          name: String(form.get('name') || ''),
          email: String(form.get('email') || ''),
          phone: String(form.get('phone') || ''),
          role,
          message: String(form.get('message') || ''),
        },
      }),
    });
    if (response.ok) {
      event.currentTarget.reset();
      setState('success');
      return;
    }
    const body = await response.json().catch(() => ({}));
    setError(body.error || '');
    setState('error');
  }

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 'var(--space-2)' }}>
      <div>
        <label style={labelStyle}>{labels.name}</label>
        <input className="at-input" name="name" type="text" placeholder={labels.namePh} required />
      </div>
      <div>
        <label style={labelStyle}>{labels.email}</label>
        <input className="at-input" name="email" type="email" placeholder="your@email.com" required />
      </div>
      <div>
        <label style={labelStyle}>{t.phone}</label>
        <input className="at-input" name="phone" type="tel" placeholder="+43 ..." />
      </div>
      <div>
        <label style={labelStyle}>{labels.iam}</label>
        <select className="at-input" name="role" defaultValue="">
          <option value="general">{labels.selectRole}</option>
          <option value="candidate">{labels.roleCand}</option>
          <option value="employer">{labels.roleEmp}</option>
          <option value="partner">{labels.rolePartner}</option>
        </select>
      </div>
      <div>
        <label style={labelStyle}>{labels.message}</label>
        <textarea className="at-input" name="message" placeholder={labels.messagePh} rows={4} style={{ resize: 'vertical' }} required />
      </div>
      <button type="submit" className="at-btn at-btn--primary" disabled={state === 'sending'} style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}>
        {state === 'sending' ? '...' : labels.send}
      </button>
      <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-subtle)', textAlign: 'center' }}>{labels.privacy}</p>
      {state === 'success' && <p role="status" style={{ margin: 0, color: 'var(--positive)', fontWeight: 700 }}>{t.success}</p>}
      {state === 'error' && <p role="alert" style={{ margin: 0, color: 'var(--danger)', fontWeight: 700 }}>{t.error} {error}</p>}
    </form>
  );
}

export function QuestionnaireLeadForm({ locale, labels }: { locale: Locale; labels: QuestionnaireLabels }) {
  const t = messages[locale] ?? messages.de;
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('sending');
    setError('');
    const form = new FormData(event.currentTarget);
    const response = await fetch('/api/public-lead', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        kind: 'candidate',
        locale,
        source: 'public_questionnaire',
        payload: {
          name: String(form.get('name') || ''),
          email: String(form.get('email') || ''),
          phone: String(form.get('phone') || ''),
          desired_role: String(form.get('role') || ''),
          languages: String(form.get('languages') || ''),
          region: String(form.get('region') || ''),
          availability: String(form.get('availability') || ''),
          preferred_contact: String(form.get('preferred_contact') || ''),
          consent: form.get('consent') === 'on',
        },
      }),
    });
    if (response.ok) {
      event.currentTarget.reset();
      setState('success');
      return;
    }
    const body = await response.json().catch(() => ({}));
    setError(body.error || '');
    setState('error');
  }

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 'var(--space-2)' }}>
      <input className="at-input" name="name" placeholder={labels.name} required />
      <input className="at-input" name="email" type="email" placeholder="Email" />
      <input className="at-input" name="phone" type="tel" placeholder={t.phone} required />
      <input className="at-input" name="role" placeholder={labels.role} required />
      <input className="at-input" name="languages" placeholder={labels.languages} />
      <input className="at-input" name="region" placeholder={labels.region} />
      <input className="at-input" name="availability" placeholder={labels.availability} />
      <select className="at-input" name="preferred_contact" defaultValue="" required>
        <option value="" disabled>{labels.contact}</option>
        <option>WhatsApp</option>
        <option>Telegram</option>
        <option>Email</option>
        <option>Phone</option>
      </select>
      <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
        <input name="consent" type="checkbox" required style={{ marginTop: 2, flexShrink: 0 }} />
        {labels.consent}
      </label>
      <button type="submit" className="at-btn at-btn--primary" disabled={state === 'sending'} style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}>
        {state === 'sending' ? '...' : labels.continue}
      </button>
      {state === 'success' && <p role="status" style={{ margin: 0, color: 'var(--positive)', fontWeight: 700 }}>{t.success}</p>}
      {state === 'error' && <p role="alert" style={{ margin: 0, color: 'var(--danger)', fontWeight: 700 }}>{t.error} {error}</p>}
    </form>
  );
}
