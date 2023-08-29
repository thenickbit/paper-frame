import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Image from 'next/image';

export async function ImageGallery() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();
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
    <div className="grid h-screen w-full flex-1 grid-cols-4 gap-4 overflow-y-scroll rounded-md border p-4">
      {signedUrls?.map(({ signedUrl }) => (
        <Image key={signedUrl} src={signedUrl} alt="image" width={300} height={500} />
      ))}
    </div>
  );
}
