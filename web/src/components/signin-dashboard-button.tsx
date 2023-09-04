import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { getSession } from '@/utils/supabase';

import { Icons } from './ui/icons';

export async function SigninDashboardButton() {
  const session = await getSession();
  const user = session?.user;

  if (user) {
    return (
      <Link href="/gallery">
        <Button variant="outline">
          Dashboard <Icons.chevronRight />
        </Button>
      </Link>
    );
  }

  return (
    <Link href="/auth/signin">
      <Button variant="outline">
        Sign in <Icons.chevronRight />
      </Button>
    </Link>
  );
}
