import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { SiteHeader } from '@/components/site-header';

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect('/dashboard');
  }

  return (
    <>
      <SiteHeader />
      <div className="bg-dotted-spacing-4 bg-dotted-gray-200 dark:bg-dotted-gray-900">
        <div className="relative isolate pt-14">
          <div className="py-24 sm:py-32 lg:pb-40">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Paper frame</h1>
                <p className="mt-6 text-lg leading-8">Add description</p>
              </div>
              {/* <div className="mt-16 flow-root sm:mt-24">
                <Image
                  src="/app-screenshot-dark.png"
                  alt="App screenshot"
                  width={2432}
                  height={1442}
                  className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
