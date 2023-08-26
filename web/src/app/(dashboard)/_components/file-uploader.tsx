'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';

export const FileUploader = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const uploadFile = async () => {
    if (!files) return;

    setLoading(true);

    const {
      data: { session },
    } = await supabase.auth.getSession();
    const user = session?.user;

    if (!user) return;

    for (const file of files) {
      await supabase.storage.from('images').upload(`${user.id}/${uuidv4()}`, file, {
        cacheControl: '3600',
        upsert: false,
      });
    }

    setLoading(false);
    router.refresh();
  };

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={(e) => {
          setFiles(e.target.files);
        }}
      />

      <Button className="ml-auto" variant="outline" onClick={uploadFile} disabled={loading}>
        {loading ? 'Uploading' : 'Upload'}
        {loading ? <Icons.spinner className="animate-spin" /> : <Icons.upload />}
      </Button>
    </div>
  );
};
