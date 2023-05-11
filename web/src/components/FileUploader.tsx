"use client";

import { useSupabase } from "@/app/supabase-provider";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const FileUploader = () => {
  const { supabase } = useSupabase();
  const [files, setFiles] = useState<FileList | null>(null);

  const uploadFile = async () => {
    if (!files) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    for (const file of files) {
      const { data, error } = await supabase.storage
        .from("images")
        .upload(`${user.id}/${uuidv4()}`, file, {
          cacheControl: "3600",
          upsert: false,
        });

      console.log({ data, error });
    }
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
      <button onClick={uploadFile}>Upload</button>
    </div>
  );
};
