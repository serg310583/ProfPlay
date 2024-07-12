import { useEffect } from 'react';

export function PreloadImages({ images }) {
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();

      img.src = src;
      // img.onload = () => console.log(`Preloaded: ${src}`)
      // img.onerror = () => console.error(`Failed to preload: ${src}`)
    });
  }, [images]);

  return null;
}
