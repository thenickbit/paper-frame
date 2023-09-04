import Link from 'next/link';
import { Suspense } from 'react';

import { ThemeToggle } from '@/components/theme-toggle';
import { Icons } from '@/components/ui/icons';
import { navItems, siteConfig } from '@/config/site';
import { cn } from '@/utils/cn';

import { SigninDashboardButton } from './signin-dashboard-button';

export function SiteHeader() {
  return (
    <nav className="container z-50 flex h-16 items-center border-b bg-background">
      <div className="mr-8 hidden items-center md:flex">
        <Icons.github className="mr-2 h-6 w-6" />
        <span className="text-lg font-bold tracking-tight">{siteConfig.name}</span>
      </div>
      {/* <MobileDropdown /> */}
      <nav className={cn('hidden items-center space-x-4 md:flex lg:space-x-6')}>
        {navItems.map((item, idx) => (
          <Link
            href={item.href}
            key={`${item.href}-${idx}`}
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              idx !== 0 && 'text-muted-foreground'
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <Suspense>
          <SigninDashboardButton />
        </Suspense>
      </div>
    </nav>
  );
}
