import { ImageGallery } from "@/components/ImageGallery";

const Gallery = async () => {
  return (
    <div className="h-full w-full">
      {/* @ts-expect-error Async Server Component */}
      <ImageGallery />
    </div>
  );
};

export default Gallery;
