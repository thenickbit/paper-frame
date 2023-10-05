import type { Metadata } from 'next';

import { ImageGallery } from '../_components/image-gallery';

export const metadata: Metadata = {
  title: 'Gallery - PaperFrame',
};

export default function Gallery() {
  return <ImageGallery />;
}
