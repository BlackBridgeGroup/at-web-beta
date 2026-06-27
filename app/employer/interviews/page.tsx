import { SectionStub } from '../../../components/SectionStub';
import { getAppLocale } from '../../../lib/appLocale';
import { createClient } from '../../../lib/supabase/server';

export default async function Page() {
  const locale = await getAppLocale();
  const s = await createClient();
  const { data: { user } } = await s.auth.getUser();
  const userName = (user?.user_metadata?.name as string | undefined) ?? undefined;
  return <SectionStub role="employer" locale={locale} userName={userName} titles={{ de: 'Interviews', cz: 'Pohovory', en: 'Interviews' }} />;
}
