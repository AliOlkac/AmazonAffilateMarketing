import Image from 'next/image';
import { CSSProperties } from 'react';

interface OptimizedBackgroundImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  overlayClassName?: string;
}

/**
 * Bu bileşen, arka plan görüntülerini Next.js Image bileşeni kullanarak optimize eder
 * Absolute positioning ile arka plan görüntüsü olarak davranmasını sağlar
 */
export default function OptimizedBackgroundImage({
  src,
  alt,
  className = '',
  priority = false,
  overlayClassName = 'bg-gradient-to-r from-blue-900/30 to-indigo-700/30'
}: OptimizedBackgroundImageProps) {
  return (
    <>
      {/* Arka plan renkli bir overlay için */}
      <div className={`absolute inset-0 z-10 ${overlayClassName}`}></div>
      
      {/* Optimize edilmiş arka plan görüntüsü için */}
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={src}
            alt={alt}
            fill
            quality={75}
            priority={priority}
            className="object-cover"
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
          />
        </div>
      </div>
    </>
  );
} 