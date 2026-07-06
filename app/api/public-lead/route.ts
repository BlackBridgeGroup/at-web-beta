import { NextResponse } from 'next/server';
import { createAdminClient } from '../../../lib/supabase/admin';

const kinds = ['candidate', 'employer', 'partner', 'general'] as const;
type PublicLeadKind = (typeof kinds)[number];

const isKind = (value: string): value is PublicLeadKind =>
  (kinds as readonly string[]).includes(value);

const clean = (value: unknown, max = 2000) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const kindRaw = clean(body.kind, 32);
  const kind = isKind(kindRaw) ? kindRaw : 'general';
  const locale = clean(body.locale, 8) || 'de';
  const source = clean(body.source, 80) || 'public_site';
  const payloadRaw = body.payload && typeof body.payload === 'object' ? body.payload : {};
  const payload = {
    ...payloadRaw,
    source,
    submitted_at: new Date().toISOString(),
  };

  const name = clean((payloadRaw as Record<string, unknown>).name, 200);
  const email = clean((payloadRaw as Record<string, unknown>).email, 320);
  const phone = clean((payloadRaw as Record<string, unknown>).phone, 80);
  const message = clean((payloadRaw as Record<string, unknown>).message, 4000);
  const consent = Boolean((payloadRaw as Record<string, unknown>).consent);

  if (!name) return NextResponse.json({ error: 'missing_name' }, { status: 400 });
  if (!email && !phone) return NextResponse.json({ error: 'missing_contact' }, { status: 400 });
  if (kind === 'candidate' && !consent) {
    return NextResponse.json({ error: 'consent_required' }, { status: 400 });
  }
  if (source === 'contact' && !message) {
    return NextResponse.json({ error: 'missing_message' }, { status: 400 });
  }

  const admin = createAdminClient();
  const { error } = await admin.from('receptionist_leads').insert({
    kind,
    locale,
    payload,
    status: kind === 'candidate' ? 'NEW_CANDIDATE_LEAD' : kind === 'employer' ? 'NEW_EMPLOYER_LEAD' : kind === 'partner' ? 'NEW_PARTNER_LEAD' : 'NEW_LEAD',
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  const hook = process.env.PUBLIC_LEAD_WEBHOOK_URL;
  if (hook) {
    await fetch(hook, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ kind, locale, payload }),
    }).catch(() => null);
  }

  return NextResponse.json({ ok: true });
}
