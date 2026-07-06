import { redirect } from 'next/navigation';
import { locales, normalizeLocale } from '../../../../lib/i18n';

export function generateStaticParams() {
  return locales.map(locale => ({ locale, slug: 'roles' }));
}

export default async function JobDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw } = await params;
  const locale = normalizeLocale(raw);
  redirect(`/${locale}/jobs`);
}
