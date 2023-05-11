import { FileUploader } from "@/components/FileUploader";
import { ImageCard } from "@/components/ImageCard";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";

const concatImageUrl = (userId: string, fileName: string) => {
  return `https://bjhggmghrukolvrzasek.supabase.co/storage/v1/object/public/images/${userId}/${fileName}`;
};

const Gallery = async () => {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/");

  const { data, error } = await supabase.storage.from("images").list(user?.id);

  if (error) {
    return <></>;
  }

  const urls =
    data.length <= 1
      ? []
      : data.map((file) => concatImageUrl(user?.id, file.name));

  return (
    <div className="grid grid-cols-4 p-4">
      {urls.length === 0 && (
        <div className="col-span-4 text-center">
          <h1 className="text-2xl font-bold">No images yet</h1>
        </div>
      )}
      {urls.map((url) => (
        <ImageCard key={url} url={url} />
      ))}
      <FileUploader />
    </div>
  );
};

export default Gallery;
