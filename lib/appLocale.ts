import { cookies, headers } from 'next/headers';
import { normalizeLocale, type Locale } from './i18n';

export async function getAppLocale(): Promise<Locale> {
  const ck = await cookies();
  const hd = await headers();
  return normalizeLocale(ck.get('alpentalent_locale')?.value || hd.get('accept-language') || 'de');
}
