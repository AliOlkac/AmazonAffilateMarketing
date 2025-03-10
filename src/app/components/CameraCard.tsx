import Image from 'next/image';
import React, { useRef } from 'react';
import { FaStar, FaCheckCircle, FaAmazon } from 'react-icons/fa';
import { FaStarHalfAlt } from 'react-icons/fa';

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
  };
  index: number;
  hoveredCard: number | null;
  handleCardHover: (index: number | null) => void;
}

/**
 * Tüm kamera sayfalarında kullanılacak standart kamera kartı bileşeni
 * Hover animasyonları ve detaylı bilgi gösterimi gibi interaktif özellikler içerir
 */
export default function CameraCard({ camera, index, hoveredCard, handleCardHover }: CameraCardProps) {
  return (
    <div 
      key={camera.id} 
      className={`bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 transform ${
        hoveredCard === index ? 'scale-[1.02] shadow-2xl' : 'hover:shadow-xl hover:-translate-y-2'
      }`}
      onMouseEnter={() => handleCardHover(index)}
      onMouseLeave={() => handleCardHover(null)}
    >
      {/* Kamera Görseli */}
      <div className="h-72 md:h-80 lg:h-96 overflow-hidden relative bg-gray-100 dark:bg-gray-700">
        <Image 
          src={camera.image} 
          alt={camera.name}
          fill
          quality={100}
          priority={index === 0}
          className="object-contain p-4 transition-transform duration-300 hover:scale-110"
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 30vw"
        />
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
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white group">
          {camera.name}
          <span className={`block h-0.5 bg-orange-500 transform scale-x-0 transition-transform duration-300 ${
            hoveredCard === index ? 'scale-x-100' : ''
          }`}></span>
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{camera.description}</p>
        
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Key Features:</h4>
          <ul className="space-y-2">
            {camera.key_features.map((feature, idx) => (
              <li key={idx} className={`flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300 transition-transform duration-300 ${
                hoveredCard === index ? `transform translate-x-${idx}` : ''
              }`}>
                <FaCheckCircle className={`text-green-500 mt-1 flex-shrink-0 ${
                  hoveredCard === index ? 'animate-bounce' : ''
                }`} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Hover durumunda gösterilen detaylı açıklama */}
        <div className={`mb-4 overflow-hidden transition-all duration-300 ${
          hoveredCard === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <p className="text-sm text-gray-600 dark:text-gray-300 italic">
            {camera.detailed_description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-gray-800 dark:text-white">{camera.price}</div>
          <a 
            href={camera.amazon_link} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center gap-2 transition-all duration-300 ${
              hoveredCard === index ? 'bg-orange-600 shadow-lg' : ''
            }`}
          >
            <FaAmazon className={hoveredCard === index ? 'animate-bounce' : ''} /> View on Amazon
          </a>
        </div>
      </div>
    </div>
  );
} 