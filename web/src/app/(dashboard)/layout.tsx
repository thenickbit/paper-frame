import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Icons } from '@/components/ui/icons';
import { getSession } from '@/utils/supabase';

import SideNavLink from './_components/side-nav-link';

type Link = {
  name: string;
  path: string;
  icon: keyof typeof Icons;
};

const links: Link[] = [
  { name: 'Gallery', path: '/gallery', icon: 'media' },
  { name: 'Quotes', path: '/quotes', icon: 'quote' },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  const user = session?.user;

  if (!user) redirect('/auth/signin');

  return (
    <div className="flex h-screen">
      <nav className="flex h-full w-24 flex-col items-center gap-4 border-r py-8">
        {links.map(({ name, path, icon }) => (
          <SideNavLink key={name} name={name} path={path} iconName={icon} />
        ))}
      </nav>
      <main className="flex flex-1 justify-center">{children}</main>
    </div>
  );
}
