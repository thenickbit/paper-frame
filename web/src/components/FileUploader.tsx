"use client";

import { useSupabase } from "@/app/supabase-provider";
import { useState } from "react";

export const FileUploader = () => {
  const { supabase } = useSupabase();
  const [files, setFiles] = useState<FileList | null>(null);

  const uploadFile = async () => {
    if (!files) return;

    for (const file of files) {
      const { data, error } = await supabase.storage
        .from("images")
        .upload(file.name, file, {
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
