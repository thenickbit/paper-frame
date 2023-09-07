import { Unkey } from '@unkey/api';
import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const token = process.env.UNKEY_TOKEN!;
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const apiId = process.env.UNKEY_API_ID!;
const unkey = new Unkey({ token });

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userid') || '';

  const { result, error } = await unkey.keys.create({
    apiId,
    prefix: 'pframe',
    byteLength: 16,
    ownerId: userId,
    ratelimit: {
      type: 'fast',
      limit: 10,
      refillRate: 1,
      refillInterval: 1000,
    },
  });

  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json({ key: result.key });
}
