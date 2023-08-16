// TODO: Duplicate or move this file outside the `_examples` folder to make it a route

import {
  createServerActionClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function ProtectedRoute() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // This route can only be accessed by authenticated users.
    // Unauthenticated users will be redirected to the `/login` route.
    redirect('/login');
  }

  const signOut = async () => {
    'use server';
    const supabase = createServerActionClient({ cookies });
    await supabase.auth.signOut();
    redirect('/login');
  };

  return (
    <div className="mt-24 flex max-w-3xl flex-1 flex-col">
      <h1 className="mb-2 flex justify-between text-2xl">
        <span className="sr-only">Supabase and Next.js Starter Template</span>
      </h1>

      <div className="flex border-b py-3 text-sm text-neutral-100">
        <div className="flex w-full items-center justify-between">
          <code className="rounded-lg bg-neutral-700 px-3 py-1 text-sm">Protected page</code>
          <span className="flex gap-4">
            Hey, {user.email}! <span className="border-r"></span>{' '}
            <form action={signOut}>
              <button className="text-neutral-100">Logout</button>
            </form>
          </span>
        </div>
      </div>

      <div className="mt-12 flex justify-center gap-8">
        <Image src="/supabase.svg" alt="Supabase Logo" width={225} height={45} priority />
        <div className="h-10 rotate-45 border-l"></div>
        <Image src="/next.svg" alt="Vercel Logo" width={150} height={36} priority />
      </div>

      <p className="mx-auto mt-8 max-w-2xl text-center text-3xl text-white">
        The fastest way to get started building apps with <strong>Supabase</strong> and{' '}
        <strong>Next.js</strong>
      </p>

      <div className="mt-12 flex justify-center">
        <span className="rounded-lg bg-neutral-100 px-6 py-3 font-mono text-sm text-neutral-900">
          Get started by editing <strong>app/page.tsx</strong>
        </span>
      </div>
    </div>
  );
}
