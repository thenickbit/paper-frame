import Image from 'next/image';

import { createServerSupabaseClient, getSession } from '@/utils/supabase';

export async function ImageGallery() {
  const supabase = createServerSupabaseClient();
  const session = await getSession();
  const user = session?.user;

  const { data: images, error } = await supabase.storage.from('images').list(user?.id, {
    sortBy: {
      column: 'created_at',
      order: 'desc',
    },
  });

  const filteredImages = images?.filter((image) => image.name !== '.emptyFolderPlaceholder');
  if (!filteredImages || error || !user) return null;

  const imagePaths = filteredImages.map((image) => `${user?.id}/${image.name}`);

  const { data: signedUrls } = await supabase.storage
    .from('images')
    .createSignedUrls(imagePaths, 60);

  if (!signedUrls || signedUrls.length === 0) return null;

  return (
    <div className="grid h-screen w-full flex-1 grid-cols-1 gap-4 overflow-y-scroll p-8 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8">
      {signedUrls?.map(({ signedUrl }) => (
        <Image key={signedUrl} src={signedUrl} alt="image" width={300} height={500} />
      ))}
    </div>
  );
}
