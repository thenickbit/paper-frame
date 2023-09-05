import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

type FileObject = {
  name: string;
  bucket_id: string;
  owner: string;
  id: string;
  updated_at: string;
  created_at: string;
  last_accessed_at: string;
  metadata: Record<string, any>;
  buckets: any;
};

const getRandomImageName = (images: FileObject[]) => {
  const randomImage = images[Math.floor(Math.random() * images.length)];
  return randomImage.name;
};

const isKeyValid = async (key: string) => {
  const res = await fetch('https://api.unkey.dev/v1/keys/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ key }),
  });

  const json = await res.json();
  return json?.valid;
};

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key');
  if (!key) return NextResponse.json({ error: 'No key provided' }, { status: 400 });

  const validKey = await isKeyValid(key);
  // if (!validKey) return NextResponse.json({ error: 'Invalid key' }, { status: 400 });

  const supabase = createRouteHandlerClient({ cookies });
  const { data } = await supabase.from('users').select('id').eq('api_key', key).single();
  if (!data) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const userId = data.id;

  const { data: images } = await supabase.storage.from('images').list(userId, {
    sortBy: {
      column: 'created_at',
      order: 'desc',
    },
  });
  if (!images || images.length === 0)
    return NextResponse.json({ error: 'No images found' }, { status: 404 });

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
