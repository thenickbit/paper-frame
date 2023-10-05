import Image from 'next/image';
import Link from 'next/link';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { createServerSupabaseClient, getSession } from '@/utils/supabase';

export async function ImageGallery() {
  const supabase = createServerSupabaseClient();
  const session = await getSession();
  const user = session?.user;

  const getImagePublicUrl = (imageId: string): string => {
    const {
      data: { publicUrl },
    } = supabase.storage.from('images').getPublicUrl(imageId);
    return publicUrl;
  };

  const { data: allImages, error } = await supabase.storage.from('images').list(user?.id, {
    sortBy: {
      column: 'created_at',
      order: 'desc',
    },
  });

  const filteredImages = allImages?.filter((image) => image.name !== '.emptyFolderPlaceholder');
  if (!filteredImages || error || !user) return null;

  const images = filteredImages.map((image) => ({
    id: `${user?.id}/${image.name}`,
    url: getImagePublicUrl(`${user?.id}/${image.name}`),
  }));

  if (!images || images.length === 0) return null;

  // const { data: signedUrls } = await supabase.storage
  //   .from('images')
  //   .createSignedUrls(imagePaths, 60);

  // if (!signedUrls || signedUrls.length === 0) return null;

  // console.log(signedUrls);

  return (
    <div className="grid h-screen w-full flex-1 grid-cols-1 gap-4 overflow-y-scroll p-8 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8">
      {images?.map(({ id, url }) => (
        <Dialog key={id}>
          <DialogTrigger className="h-fit">
            <Link href={`/gallery/${id}`}>
              <Image
                className="cursor-pointer transition-transform hover:scale-110"
                src={url}
                alt="image"
                width={300}
                height={500}
              />
            </Link>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account and remove
                your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
