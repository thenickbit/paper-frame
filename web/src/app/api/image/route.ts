import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { verifyKey } from '@unkey/api';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const getRandomImageName = (images: typeof unfilteredImages) => {
    if (!images) return null;
    const randomImage = images[Math.floor(Math.random() * images.length)];
    return randomImage.name;
  };

  // Get key from query
  const key = req.nextUrl.searchParams.get('key');
  if (!key) return NextResponse.json({ error: 'No key provided' }, { status: 400 });

  // Verify key
  const { result: unkeyResult, error: unkeyError } = await verifyKey(key);
  if (unkeyError) return NextResponse.json({ error: unkeyError.message }, { status: 500 });
  if (!unkeyResult.valid) return NextResponse.json({ error: 'Invalid key' }, { status: 400 });

  // Verify user
  const supabase = createRouteHandlerClient({ cookies });
  const userId = unkeyResult.ownerId;

  // Get images
  const { data: unfilteredImages } = await supabase.storage.from('images').list(userId, {
    sortBy: {
      column: 'created_at',
      order: 'desc',
    },
  });

  const images = unfilteredImages?.filter((image) => image.name !== '.emptyFolderPlaceholder');
  if (!images || images.length === 0) {
    return NextResponse.json({ error: 'No images found' }, { status: 404 });
  }

  // Get random image
  const randomImage = getRandomImageName(images);
  const { data: imageData } = await supabase.storage
    .from('images')
    .download(`${userId}/${randomImage}`);

  if (!imageData) return NextResponse.json({ error: 'Image not found' }, { status: 404 });

  return new NextResponse(imageData, {
    headers: {
      'Content-Type': 'image/png',
    },
  });
}
