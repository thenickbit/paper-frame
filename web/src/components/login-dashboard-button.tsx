import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { Icons } from './ui/icons';

export async function LoginDashboardButton() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return (
      <Link href="/dashboard">
        <Button variant="outline">
          Dashboard <Icons.chevronRight />
        </Button>
      </Link>
    );
  }

  return (
    <Link href="/auth/login">
      <Button variant="outline">
        Login <Icons.chevronRight />
      </Button>
    </Link>
  );
}
