'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';

export const ImageUploader = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef(null);

  const uploadFiles = async (files: FileList | null) => {
    if (!files) return;

    setLoading(true);

    const {
      data: { session },
    } = await supabase.auth.getSession();
    const user = session?.user;

    if (!user) return;

    for (const file of files) {
      const { error } = await supabase.storage
        .from('images')
        .upload(`${user.id}/${uuidv4()}`, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw new Error(error.message);
    }

    setLoading(false);
    router.refresh();
  };

  return (
    <div>
      <input
        className="hidden"
        type="file"
        ref={inputRef}
        multiple
        onChange={(e) => {
          uploadFiles(e.target.files);
        }}
      />

      <Button
        className="ml-auto"
        variant="outline"
        onClick={() => inputRef.current && inputRef.current.click()}
        disabled={loading}
      >
        {loading ? 'Uploading' : 'Upload'}
        {loading ? <Icons.spinner className="animate-spin" /> : <Icons.upload />}
      </Button>
    </div>
  );
};
