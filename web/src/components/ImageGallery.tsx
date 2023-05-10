import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Image from "next/image";

export const ImageGallery = async () => {
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

  const images = urls.map((url) => (
    <Image
      key={url}
      alt="image"
      width={220}
      height={275}
      src={url}
      className="hover:scale-95 transition transform duration-300 ease-in-out"
    />
  ));

  return <div className="grid grid-cols-4 p-4">{images}</div>;

  return;
};
