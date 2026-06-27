'use client';
import { useState } from 'react';
type Role = 'candidate' | 'employer' | 'partner';

export function ProfileForm({ role, labels }: { role: Role; labels: any }) {
  const [message, setMessage] = useState('');

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch('/api/profile', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...values, role }),
    });
    setMessage(res.ok ? labels.saved : labels.error);
  }

  const l = labels[role];

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 'var(--space-2)' }}>
      {role === 'candidate' ? (
        <>
          <input className="at-input" name="name" placeholder={l.name} required />
          <input className="at-input" name="phone" placeholder={l.phone} />
          <input className="at-input" name="country" placeholder={l.country} required />
          <input className="at-input" name="location" placeholder={l.location} />
          <input className="at-input" name="region" placeholder={l.region} required />
          <input className="at-input" name="roles_wanted" placeholder={l.rolesWanted} required />
          <input className="at-input" name="language" placeholder={l.language} required />
          <input className="at-input" name="salary_expectation" type="number" placeholder={l.salaryExpectation} />
          <input className="at-input" name="availability" placeholder={l.availability} required />
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.875rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <input name="housing_needed" type="checkbox" /> {l.housingNeeded}
          </label>
          <select className="at-input" name="preferred_contact" aria-label={l.preferredContact}>
            <option>WhatsApp</option><option>Telegram</option><option>Email</option><option>Phone</option>
          </select>
          <input className="at-input" name="whatsapp_number" placeholder={l.whatsappNumber} />
          <input className="at-input" name="telegram_username" placeholder={l.telegramUsername} />
        </>
      ) : role === 'employer' ? (
        <>
          <input className="at-input" name="company_name" placeholder={l.companyName} required />
          <input className="at-input" name="contact_person" placeholder={l.contactPerson} required />
          <input className="at-input" name="phone" placeholder={l.phone} />
          <input className="at-input" name="city" placeholder={l.city} />
          <input className="at-input" name="business_type" placeholder={l.businessType} />
          <input className="at-input" name="role_title" placeholder={l.roleTitle} required />
          <input className="at-input" name="role_region" placeholder={l.roleRegion} required />
          <input className="at-input" name="salary_offer" type="number" placeholder={l.salaryOffer} />
          <input className="at-input" name="role_languages" placeholder={l.roleLanguages} />
          <input className="at-input" name="start_date" type="date" aria-label={l.startDate} />
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.875rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <input name="housing_provided" type="checkbox" /> {l.housingProvided}
          </label>
        </>
      ) : (
        <>
          <input className="at-input" name="name" placeholder={l.name} required />
          <input className="at-input" name="company" placeholder={l.company} required />
          <input className="at-input" name="website" placeholder={l.website} />
          <textarea className="at-input" name="proposal" placeholder={l.proposal} required rows={4} style={{ resize: 'vertical' }} />
          <input className="at-input" name="email_note" placeholder={l.emailNote} aria-label={l.email} disabled />
          <input className="at-input" name="phone" placeholder={l.phone} />
        </>
      )}

      <button type="submit" className="at-btn at-btn--primary" style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}>
        {l.save}
      </button>

      {message && (
        <p role="status" style={{ margin: 0, color: message === labels.saved ? 'var(--at-alpine-green)' : 'red', fontSize: '0.875rem' }}>
          {message}
        </p>
      )}
    </form>
  );
}
