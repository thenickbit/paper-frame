'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Icons } from '@/components/ui/icons';

import { ImageCropper } from './image-cropper';

export const ImageUploader = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [fileList, setFileList] = useState<File[]>();

  const onDrop = useCallback((acceptedFiles: File[]) => setFileList(acceptedFiles), []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleDialogStateChange = (state: boolean) => {
    setOpenDialog(state);
    if (state === false) setFileList(undefined);
  };

  const uploadFiles = async (files: File[]) => {
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
        .upload(`${user.id}/${file.name}`, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw new Error(error.message);
    }

    setLoading(false);
    setOpenDialog(false);
    router.refresh();
  };

  return (
    <div>
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

      <Dialog open={openDialog} onOpenChange={(state) => handleDialogStateChange(state)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload images</DialogTitle>
          </DialogHeader>
          {fileList ? (
            <ImageCropper fileList={fileList} uploadFiles={uploadFiles} loading={loading} />
          ) : (
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
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
