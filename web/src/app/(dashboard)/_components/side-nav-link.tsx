'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Icons } from '@/components/ui/icons';
import { cn } from '@/utils/cn';

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
    <Link key={name} href={path} className="w-full">
      <div
        className={cn(
          'flex h-8 w-full items-center justify-start gap-4 rounded-md px-2 text-sm font-semibold',
          active && 'bg-muted'
        )}
      >
        {IconElement && <IconElement className="h-[18px] w-[18px]" />}
        {name}
      </div>
    </Link>
  );
}
