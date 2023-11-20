'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Icons } from '@/components/ui/icons';
import { Textarea } from '@/components/ui/textarea';

export const QuoteUploader = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  const handleDialogStateChange = (state: boolean) => {
    setOpenDialog(state);
    if (state === false) setText('');
  };

  const uploadQuote = async () => {
    setLoading(true);

    const {
      data: { session },
    } = await supabase.auth.getSession();
    const user = session?.user;

    if (!user) return;

    await supabase.from('quotes').insert([
      {
        user_id: user.id,
        quote_text: text,
      },
    ]);

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
            <DialogTitle>Write a quote</DialogTitle>
          </DialogHeader>
          <Textarea value={text} onChange={(e) => setText(e.target.value)} className="h-24 w-56" />
          <Button onClick={uploadQuote} disabled={!text}>
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
