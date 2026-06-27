import { redirect } from 'next/navigation';

// German is the primary language of the site — land visitors on /de by default.
export default function Home() {
  redirect('/de');
}
