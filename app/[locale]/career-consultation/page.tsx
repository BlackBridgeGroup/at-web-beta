import { redirect } from 'next/navigation';
import { locales, normalizeLocale } from '../../../lib/i18n';

// Paid B2C consultation cancelled (owner decision). Route kept as a redirect.
export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export default async function CareerConsultationRemoved({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = normalizeLocale(raw);
  redirect(`/${locale}/for-candidates`);
}
