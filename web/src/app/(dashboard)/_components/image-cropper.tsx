'use client';

import 'react-image-crop/dist/ReactCrop.css';

import NextImage from 'next/image';
import { useEffect, useRef, useState } from 'react';
import ReactCrop, { centerCrop, type Crop, makeAspectCrop } from 'react-image-crop';
import { v4 } from 'uuid';

import { Button } from '@/components/ui/button';

type ImageCropperProps = {
  fileList: File[];
  uploadFiles: (files: File[]) => Promise<void>;
  loading: boolean;
};

const ASPECT_RATIO = 3 / 5;

export function ImageCropper({ fileList, uploadFiles, loading }: ImageCropperProps) {
  const [currentFileIdx, setCurrentFileIdx] = useState<number>(0);
  const [croppedImages, setCroppedImages] = useState<File[]>([]);
  const [crop, setCrop] = useState<Crop>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const imageFile = fileList[currentFileIdx];

    if (canvas && context && imageFile) {
      const image = new Image();
      image.onload = () => {
        const maxWidth = window.innerWidth - 32;
        const maxHeight = window.innerHeight - 200;
        const aspectRatio = image.width / image.height;

        let canvasWidth = maxWidth;
        let canvasHeight = canvasWidth / aspectRatio;

        if (canvasHeight > maxHeight) {
          canvasHeight = maxHeight;
          canvasWidth = canvasHeight * aspectRatio;
        }

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        context.drawImage(image, 0, 0, canvasWidth, canvasHeight);
        setCrop(centerAspectCrop(image.width, image.height, ASPECT_RATIO));
      };
      image.src = URL.createObjectURL(imageFile);
    }
  }, [canvasRef, currentFileIdx, fileList]);

  function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        aspect,
        mediaWidth,
        mediaHeight
      ),
      mediaWidth,
      mediaHeight
    );
  }

  const handleNextImg = () => {
    if (!crop) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const imageFile = fileList[currentFileIdx];

    if (canvas && context && imageFile) {
      const image = new Image();
      image.onload = async () => {
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const offscreenCanvas = new OffscreenCanvas(crop.width * scaleX, crop.height * scaleY);
        const offscreenContext = offscreenCanvas.getContext('2d');

        if (!offscreenContext) {
          throw new Error('No 2d context');
        }

        offscreenContext.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width,
          crop.height,
          0,
          0,
          crop.width * scaleX,
          crop.height * scaleY
        );

        const croppedImgBlob = await offscreenCanvas.convertToBlob({
          type: 'image/jpeg',
          quality: 1.0,
        });

        const newCroppedImages = [...croppedImages];
        newCroppedImages[currentFileIdx] = new File([croppedImgBlob], v4(), {
          type: 'image/jpeg',
        });

        setCroppedImages(newCroppedImages);
        setCurrentFileIdx(currentFileIdx + 1);
        setCrop(centerAspectCrop(image.width, image.height, ASPECT_RATIO));
      };

      image.src = canvas.toDataURL();
    }
  };

  if (currentFileIdx >= fileList.length) {
    return (
      <>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {croppedImages.map((image) => (
            <NextImage
              key={image.name}
              src={URL.createObjectURL(image)}
              height={450}
              width={200}
              alt="preview cropped image"
              className='rounded-lg'
            />
          ))}
        </div>
        <div className="flex gap-4">
          <Button
            className="flex-1"
            variant="outline"
            disabled={loading}
            onClick={() => setCurrentFileIdx(0)}
          >
            Reset crop
          </Button>
          <Button className="flex-1" disabled={loading} onClick={() => uploadFiles(croppedImages)}>
            {loading ? <p>Saving...</p> : <p>Save all</p>}
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <ReactCrop aspect={ASPECT_RATIO} crop={crop} onChange={(c) => setCrop(c)}>
        <canvas ref={canvasRef} width={480} height={800} />
      </ReactCrop>
      <div className="flex select-none items-center justify-end gap-4">
        <Button
          className="flex-1"
          disabled={currentFileIdx === 0}
          onClick={() => setCurrentFileIdx(currentFileIdx - 1)}
        >
          Prev
        </Button>
        <Button className="flex-1" disabled={!crop} onClick={() => handleNextImg()}>
          Next
        </Button>
      </div>
    </>
  );
}
