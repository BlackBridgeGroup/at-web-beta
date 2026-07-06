import { redirect } from 'next/navigation';
import { locales, normalizeLocale } from '../../../../lib/i18n';

const slugs = ['jan-from-brno', 'petra-from-prague', 'tomas-from-bratislava'];

export function generateStaticParams() {
  return locales.flatMap(locale => slugs.map(slug => ({ locale, slug })));
}

export default async function StoryDetail({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw } = await params;
  const locale = normalizeLocale(raw);
  redirect(`/${locale}/success-stories`);
}
