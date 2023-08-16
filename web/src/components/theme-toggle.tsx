'use client';

import { useTheme } from 'next-themes';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <Button variant="ghost" size="sm" className="w-9 px-0" onClick={handleToggle}>
      <Icons.sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Icons.moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
