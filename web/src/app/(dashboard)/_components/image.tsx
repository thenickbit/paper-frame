'use client';

import 'react-medium-image-zoom/dist/styles.css';

import NextImage from 'next/image';
import Zoom from 'react-medium-image-zoom';

type ImageProps = {
  src: string;
};

export function Image({ src }: ImageProps) {
  return (
    <Zoom
      classDialog="bg-transparent dark:bg-black"
      ZoomContent={({ img, onUnzoom }) => (
        <div className="absolute h-screen w-screen bg-background" onClick={onUnzoom}>{img}</div>
      )}
    >
      <NextImage
        className="cursor-pointer rounded-lg transition-transform hover:scale-110 shadow-md"
        src={src}
        alt="image"
        width={300}
        height={500}
      />
    </Zoom>
  );
}
