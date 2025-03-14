import Image from 'next/image';
import React from 'react';
import { FaStar, FaCheckCircle, FaAmazon } from 'react-icons/fa';
import { FaStarHalfAlt } from 'react-icons/fa';
import Link from 'next/link';

// Kamera kartı bileşeni için tip tanımlaması
interface CameraCardProps {
  camera: {
    id: number;
    name: string;
    image: string;
    rating: number;
    description: string;
    price: string;
    key_features: string[];
    detailed_description: string;
    amazon_link: string;
    category?: string; // Kategori bilgisi (opsiyonel)
    categoryColor?: string; // Kategori rengi (opsiyonel)
    page_link?: string; // Sayfa linki (opsiyonel)
  };
  index: number;
  hoveredCard: number | null;
  handleCardHover: (index: number | null) => void;
}

// Kategori renklerine karşılık gelen Tailwind renk sınıflarını döndüren yardımcı fonksiyon
const getCategoryColorClasses = (categoryColor: string | undefined) => {
  switch (categoryColor) {
    case 'blue':
      return {
        badge: 'bg-blue-500',
        border: 'bg-blue-500',
        highlight: 'bg-blue-500',
        icon: 'text-blue-500'
      };
    case 'purple':
      return {
        badge: 'bg-purple-500',
        border: 'bg-purple-500',
        highlight: 'bg-purple-500',
        icon: 'text-purple-500'
      };
    case 'cyan':
      return {
        badge: 'bg-cyan-500',
        border: 'bg-cyan-500',
        highlight: 'bg-cyan-500',
        icon: 'text-cyan-500'
      };
    case 'green':
      return {
        badge: 'bg-green-500',
        border: 'bg-green-500',
        highlight: 'bg-green-500',
        icon: 'text-green-500'
      };
    case 'pink':
      return {
        badge: 'bg-pink-500',
        border: 'bg-pink-500',
        highlight: 'bg-pink-500',
        icon: 'text-pink-500'
      };
    default:
      return {
        badge: 'bg-orange-500',
        border: 'bg-orange-500',
        highlight: 'bg-orange-500',
        icon: 'text-green-500'
      };
  }
};

/**
 * Tüm kamera sayfalarında kullanılacak standart kamera kartı bileşeni
 * Hover animasyonları ve detaylı bilgi gösterimi gibi interaktif özellikler içerir
 */
export default function CameraCard({ camera, index, hoveredCard, handleCardHover }: CameraCardProps) {
  // Kategori renklerini al
  const colorClasses = getCategoryColorClasses(camera.categoryColor);
  
  return (
    <div 
      key={camera.id} 
      className={`bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 transform flex flex-col h-full ${
        hoveredCard === index ? 'scale-[1.02] shadow-2xl' : 'hover:shadow-xl hover:-translate-y-2'
      }`}
      onMouseEnter={() => handleCardHover(index)}
      onMouseLeave={() => handleCardHover(null)}
    >
      {/* Kamera Görseli */}
      <div className="h-56 md:h-64 lg:h-72 overflow-hidden relative bg-gray-100 dark:bg-gray-700">
        <Image 
          src={camera.image} 
          alt={camera.name}
          fill
          quality={75}
          loading={index < 3 ? "eager" : "lazy"}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
          priority={index === 0}
          className="object-contain p-4 transition-transform duration-300 hover:scale-110"
          sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 25vw"
        />
        
        {/* Kategori rozeti - eğer kategori belirtilmişse göster */}
        {camera.category && (
          <div className={`absolute top-2 left-2 ${colorClasses.badge} text-white py-1 px-3 rounded-full text-sm font-medium z-10`}>
            {camera.category}
          </div>
        )}
        
        {/* Puan rozeti */}
        <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 py-1 px-3 rounded-full flex items-center gap-1 font-medium z-10">
          {/* 5 yıldız gösterimi - ilk 4 tam, sonuncu yarım dolu */}
          {[...Array(4)].map((_, i) => (
            <FaStar 
              key={i} 
              className={`${hoveredCard === index ? 'animate-pulse' : ''}`}
            />
          ))}
          <FaStarHalfAlt className={`${hoveredCard === index ? 'animate-pulse' : ''}`} />
        </div>
      </div>

      {/* Kamera Bilgileri */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white group">
          {camera.name}
          <span className={`block h-0.5 ${colorClasses.highlight} transform scale-x-0 transition-transform duration-300 ${
            hoveredCard === index ? 'scale-x-100' : ''
          }`}></span>
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{camera.description}</p>
        
        <div className="mb-3 flex-grow">
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Key Features:</h4>
          <ul className="space-y-1">
            {camera.key_features.slice(0, 4).map((feature, idx) => (
              <li key={idx} className={`flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300 transition-transform duration-300 ${
                hoveredCard === index ? `transform translate-x-${idx}` : ''
              }`}>
                <FaCheckCircle className={`${colorClasses.icon} mt-0.5 flex-shrink-0 ${
                  hoveredCard === index ? 'animate-bounce' : ''
                }`} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Hover durumunda gösterilen detaylı açıklama */}
        <div className={`mb-3 overflow-hidden transition-all duration-300 ${
          hoveredCard === index ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <p className="text-xs text-gray-600 dark:text-gray-300 italic">
            {camera.detailed_description}
          </p>
        </div>

        {/* Fiyat ve butonlar - alt kısım */}
        <div className="flex flex-col gap-2 mt-auto">
          {/* Fiyat bilgisi */}
          <div className="text-lg font-bold text-gray-800 dark:text-white">{camera.price}</div>
          
          {/* Butonlar */}
          <div className="flex gap-2 justify-between">
            <a 
              href={camera.amazon_link} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex-1 px-3 py-2 text-center text-sm ${colorClasses.badge} hover:opacity-90 text-white rounded-lg flex items-center justify-center gap-1 transition-all duration-300 ${
                hoveredCard === index ? 'opacity-90 shadow-lg' : ''
              }`}
            >
              <FaAmazon className={hoveredCard === index ? 'animate-bounce' : ''} /> 
              <span className="hidden sm:inline">View on Amazon</span>
              <span className="sm:hidden">Amazon</span>
            </a>
            
            {/* Daha fazla bilgi butonu - eğer page_link varsa göster */}
            {camera.page_link && (
              <Link 
                href={camera.page_link}
                className={`flex-1 px-3 py-2 text-center text-sm border border-${colorClasses.badge.replace('bg-', '')} text-${colorClasses.icon} rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300`}
              >
                <span className="hidden sm:inline">More Info</span>
                <span className="sm:hidden">Info</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 