import Image, { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc?: string;
}

export function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  fallbackSrc,
  width,
  height,
  ...props 
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Convert to WebP if not already
    const webpSrc = src.replace(/\.(jpg|jpeg|png)/, '.webp');
    
    // Check if WebP is supported
    const img = new window.Image();
    img.onload = () => setImgSrc(webpSrc);
    img.onerror = () => setImgSrc(src);
    img.src = webpSrc;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  if (!imgSrc) return null;

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={`transition-opacity duration-300 ${!isLoaded ? 'opacity-0' : 'opacity-100'} ${className}`}
      onLoadingComplete={() => setIsLoaded(true)}
      loading="lazy"
      quality={85}
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${btoa(
        `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" fill="#e5e7eb"><rect width="100%" height="100%" rx="4" ry="4" /></svg>`
      )}`}
      unoptimized={false}
      {...props}
    />
  );
}
