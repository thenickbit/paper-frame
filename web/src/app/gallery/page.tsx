import { ImageCard } from "@/components/ImageCard";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

const Gallery = async () => {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  const { data: imageListData, error: imageListError } = await supabase.storage
    .from("images")
    .list();

  if (imageListError) {
    return <></>;
  }

  const urls = [];
  for (const file of imageListData) {
    const { data } = await supabase.storage
      .from("images")
      .createSignedUrl(file.name, 60 * 60 * 24);

    if (data) {
      urls.push(data.signedUrl);
    }
  }

  return (
    <div className="grid grid-cols-4 p-4">
      {urls.map((url) => (
        <ImageCard key={url} url={url} />
      ))}
    </div>
  );
};

export default Gallery;
