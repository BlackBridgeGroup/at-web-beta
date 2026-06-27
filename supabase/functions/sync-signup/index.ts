import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

type Webhook = { type?: string; record?: Record<string, unknown>; table?: string };
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

Deno.serve(async (request) => {
  if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);
  const event = await request.json() as Webhook;
  const record = event.record ?? event;
  const kind = event.table === 'partner_profiles' || record.kind === 'partner' ? 'partner' : event.table === 'employer_profiles' || record.kind === 'employer' ? 'employer' : 'candidate';
  const userId = String(record.user_id ?? '');
  if (!userId) return json({ error: 'missing_user_id' }, 400);
  const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  const { data: user, error } = await admin.from('users').select('email').eq('id', userId).single();
  if (error) return json({ error: 'user_lookup_failed' }, 400);
  const payload = kind === 'partner' ? { kind, user_id: userId, email: user.email, name: record.name ?? '', company: record.company ?? '', website: record.website ?? '', proposal: record.proposal ?? '', phone: record.phone ?? '', status: record.status ?? 'NEW_PARTNER', source: 'website' } : kind === 'candidate' ? {
    kind, user_id: userId, email: user.email, name: record.name ?? '', role_fit: record.roles_wanted ?? '', source: 'website', preferred_contact: record.preferred_contact ?? '', telegram_username: record.telegram_username ?? '', whatsapp_number: record.whatsapp_number ?? '', phone: record.phone ?? '', language: record.language ?? record.languages ?? '', country: record.country ?? '', region: record.region ?? '', position: record.roles_wanted ?? '', salary_expectation: record.salary_expectation ?? '', availability: record.availability ?? '', housing_needed: record.housing_needed ?? record.accommodation_needed ?? '', consent: 'TRUE', stage: 'SOURCED', screening_status: 'PENDING'
  } : {
    kind, user_id: userId, email: user.email, company: record.company_name ?? '', contact_person: record.contact_person ?? '', phone: record.phone ?? '', city: record.city ?? '', business_type: record.business_type ?? '', hiring_signal: record.hiring_needs ?? '', status: 'NEW_COMPANY', source: 'website'
  };
  const hook = Deno.env.get('ZAPIER_SIGNUP_HOOK_URL');
  if (!hook) return json({ error: 'missing_hook_url' }, 500);
  const response = await fetch(hook, { method: 'POST', headers: { 'content-type': 'application/json', 'idempotency-key': userId }, body: JSON.stringify(payload) });
  return response.ok ? json({ ok: true, kind, user_id: userId }) : json({ error: 'zapier_hook_failed' }, 502);
});
