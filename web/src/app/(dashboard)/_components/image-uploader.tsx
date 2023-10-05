'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Icons } from '@/components/ui/icons';

export const ImageUploader = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
        disabled={loading}
        onClick={() => setOpenDialog(true)}
      >
        {loading ? 'Uploading' : 'Upload'}
        <span className="ml-2">
          {loading ? <Icons.spinner className="animate-spin" /> : <Icons.upload />}
        </span>
      </Button>

      <Dialog open={openDialog} onOpenChange={(state) => setOpenDialog(state)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload images</DialogTitle>
          </DialogHeader>
          <div
            {...getRootProps()}
            className="rounded-md border border-dashed border-ring bg-secondary p-6"
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
