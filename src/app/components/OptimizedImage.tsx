import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  fill?: boolean;
}

// Performans için optimize edilmiş görsel bileşeni
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 90,
  loading = 'lazy',
  onLoad,
  fill = false,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Görsel yükleme tamamlandığında çalışacak fonksiyon
  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  return (
    <div className={`relative overflow-hidden ${className}`} style={fill ? { position: 'relative', width: '100%', height: '100%' } : {}}>
      {/* Görsel yüklenene kadar placeholder gösterilir */}
      {!isLoaded && !priority && (
        <div 
          className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"
          style={width && height ? { width: `${width}px`, height: `${height}px` } : {}}
        />
      )}
      
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        quality={quality}
        priority={priority}
        sizes={sizes}
        loading={loading}
        onLoad={handleImageLoad}
        fill={fill}
      />
    </div>
  );
} 