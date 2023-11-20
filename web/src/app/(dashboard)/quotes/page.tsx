import type { Metadata } from 'next';

import { createServerSupabaseClient, getSession } from '@/utils/supabase';

import { Quote } from '../_components/quote';

export const metadata: Metadata = {
  title: 'Quotes - PaperFrame',
};

export default async function Messages() {
  const supabase = createServerSupabaseClient();
  const session = await getSession();
  const user = session?.user;

  const { data: quotes } = await supabase
    .from('quotes')
    .select('quote_text')
    .eq('user_id', user?.id);

  return (
    <div className="grid h-screen w-full flex-1 grid-cols-1 gap-4 overflow-y-scroll p-8 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8">
      {quotes?.map((quote, i) => (
        <Quote key={i} text={quote.quote_text} />
      ))}
    </div>
  );
}
