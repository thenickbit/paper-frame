// import Link from 'next/link';
import { redirect } from 'next/navigation';

// import { ThemeToggle } from '@/components/theme-toggle';
// import { Icons } from '@/components/ui/icons';
// import { TypographyH4 } from '@/components/ui/typography';
import { getSession } from '@/utils/supabase';

// import SideNavLink from './_components/side-nav-link';

// type Link = {
//   name: string;
//   path: string;
//   icon: keyof typeof Icons;
// };

// const links: Link[] = [
//   { name: 'Gallery', path: '/gallery', icon: 'media' },
// ];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  const user = session?.user;

  if (!user) redirect('/auth/signin');

  return (
    <div className="flex h-screen gap-4 ">
      {/* <div className="flex w-52 flex-col gap-8 border-r p-4">
        <div className="flex items-center justify-between">
          <TypographyH4 className="select-none">Paper Frame</TypographyH4>
          <ThemeToggle />
        </div>
        <nav className="flex flex-col gap-2">
          {links.map(({ name, path, icon }) => (
            <SideNavLink key={name} name={name} path={path} iconName={icon} />
          ))}
        </nav>
      </div> */}

      <main className="flex flex-1 justify-center">{children}</main>
    </div>
  );
}
