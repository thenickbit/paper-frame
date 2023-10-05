import { ImageUploader } from '../_components/image-uploader';

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="flex w-full items-center justify-between gap-4 p-8">
        <h1 className="flex-1 text-4xl font-extrabold tracking-tight lg:text-5xl">Gallery</h1>
        <ImageUploader />
      </div>
      {children}
    </div>
  );
}
