'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Icons } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

type SideNavLinkProps = {
  name: string;
  path: string;
  iconName: keyof typeof Icons;
};

export default function SideNavLink({ name, path, iconName }: SideNavLinkProps) {
  const pathname = usePathname();

  const active = pathname === path;
  const IconElement = Icons[iconName];

  return (
    <Link key={name} href={path}>
      <div
        className={cn(
          'flex aspect-square h-12 items-center justify-center rounded-full',
          active && 'bg-muted'
        )}
      >
        {IconElement && <IconElement />}
      </div>
    </Link>
  );
}
