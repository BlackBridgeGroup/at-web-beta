import { redirect } from 'next/navigation';
import { locales, normalizeLocale } from '../../../lib/i18n';

// Product renamed Entry Consultation -> Career Consultation. Keep the old URL working.
export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export default async function EntryConsultationRedirect({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = normalizeLocale(raw);
  redirect(`/${locale}/for-candidates`);
}
