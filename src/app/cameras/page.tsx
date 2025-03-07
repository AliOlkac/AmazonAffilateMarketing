/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from "next/link";
import Image from "next/image";
import { FaCamera, FaStar, FaCheckCircle, FaAmazon, FaShoppingCart, FaInfoCircle } from "react-icons/fa";
import { MdPhotoCamera, MdCameraAlt, MdVideocam } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Tüm kamera verilerinin bir araya getirilmiş hali
const featuredCameras = [
  // DSLR Kameralar
  {
    id: 1,
    name: "Nikon D850",
    image: "/images/cameras/hero-bg.webp",
    rating: 4.9,
    category: "DSLR",
    categoryColor: "blue",
    description: "Professional full-frame DSLR with 45.7MP resolution and exceptional low light performance",
    price: "$2,996.95",
    key_features: [
      "45.7MP Full-Frame BSI CMOS Sensor",
      "8K Time-lapse recording",
      "ISO range 64-25,600",
      "7fps continuous shooting"
    ],
    amazon_link: "https://www.amazon.com/Nikon-D850-FX-Format-Digital-Camera/dp/B07524LHMT",
    page_link: "/dslr-cameras"
  },
  {
    id: 2,
    name: "Canon EOS 90D",
    image: "/images/cameras/hero-bg.webp",
    rating: 4.7,
    category: "DSLR",
    categoryColor: "blue",
    description: "Versatile enthusiast DSLR with 32.5MP APS-C sensor and uncropped 4K video",
    price: "$1,199.00",
    key_features: [
      "32.5MP APS-C CMOS Sensor",
      "4K30p & HD120p video",
      "45-point all cross-type AF",
      "10fps continuous shooting"
    ],
    amazon_link: "https://www.amazon.com/Canon-Digital-Camera-Black-3616C002/dp/B07WFQYDD5",
    page_link: "/dslr-cameras"
  },
  
  // Mirrorless Kameralar
  {
    id: 3,
    name: "Sony Alpha a7 III",
    image: "/images/cameras/hero-bg.webp",
    rating: 4.8,
    category: "Mirrorless",
    categoryColor: "purple",
    description: "Powerful full-frame mirrorless with excellent dynamic range and 4K video capabilities",
    price: "$1,998.00",
    key_features: [
      "24.2MP Full-Frame Exmor R Sensor",
      "693-point AF system",
      "5-axis stabilization",
      "10fps silent shooting"
    ],
    amazon_link: "https://www.amazon.com/Sony-Full-Frame-Mirrorless-Interchangeable-Lens-ILCE7M3/dp/B07B43WPVK",
    page_link: "/mirrorless-cameras"
  },
  {
    id: 4,
    name: "Fujifilm X-T4",
    image: "/images/cameras/hero-bg.webp",
    rating: 4.7,
    category: "Mirrorless",
    categoryColor: "purple",
    description: "Premium APS-C mirrorless with in-body stabilization and beautiful film simulations",
    price: "$1,699.00",
    key_features: [
      "26.1MP X-Trans CMOS 4 Sensor",
      "5-axis IBIS (6.5 stops)",
      "4K60p 10-bit video",
      "15fps mechanical shutter"
    ],
    amazon_link: "https://www.amazon.com/Fujifilm-X-T4-Mirrorless-Camera-Body/dp/B0844K1CH5",
    page_link: "/mirrorless-cameras"
  },
  
  // Action Kameralar
  {
    id: 5,
    name: "GoPro HERO11 Black",
    image: "/images/cameras/hero-bg.webp",
    rating: 4.8,
    category: "Action",
    categoryColor: "cyan",
    description: "Ultimate action camera with 5.3K video, HyperSmooth 5.0 stabilization, and waterproof design",
    price: "$399.99",
    key_features: [
      "27MP photos",
      "5.3K60 video recording",
      "HyperSmooth 5.0 stabilization",
      "Waterproof to 33ft"
    ],
    amazon_link: "https://www.amazon.com/GoPro-HERO11-Black-Waterproof-Stabilization/dp/B0BD91XYQS",
    page_link: "/action-cameras"
  },
  {
    id: 6,
    name: "DJI Osmo Action 4",
    image: "/images/cameras/hero-bg.webp",
    rating: 4.7,
    category: "Action",
    categoryColor: "cyan",
    description: "Feature-rich action camera with excellent low-light performance and magnetic mounting",
    price: "$379.00",
    key_features: [
      "1/1.3\" sensor with improved low-light",
      "4K/120fps video & 10-bit D-Log M",
      "155° super-wide FOV",
      "Waterproof to 16m"
    ],
    amazon_link: "https://www.amazon.com/DJI-Action-Standard-Combo-Camera/dp/B0CHXV6KNS",
    page_link: "/action-cameras"
  },
  
  // Vlog Kameralar
  {
    id: 7,
    name: "Sony ZV-1",
    image: "/images/cameras/hero-bg.webp",
    rating: 4.8,
    category: "Vlog",
    categoryColor: "green",
    description: "Purpose-built vlogging camera with excellent autofocus and audio quality",
    price: "$748.00",
    key_features: [
      "20.1MP 1\" Exmor RS Sensor",
      "Real-time Eye AF & tracking",
      "Background defocus button",
      "Directional 3-capsule mic"
    ],
    amazon_link: "https://www.amazon.com/Sony-Content-Creators-Vlogging-Microphone/dp/B088XCGLCD",
    page_link: "/vlog-cameras"
  },
  {
    id: 8,
    name: "Canon PowerShot G7 X Mark III",
    image: "/images/cameras/hero-bg.webp", 
    rating: 4.7,
    category: "Vlog",
    categoryColor: "green",
    description: "Popular vlogging compact with YouTube live streaming capabilities",
    price: "$749.00",
    key_features: [
      "20.1MP 1\" Stacked CMOS Sensor",
      "4K30p video",
      "YouTube live streaming",
      "Vertical video support"
    ],
    amazon_link: "https://www.amazon.com/Canon-PowerShot-Digital-Camera-Streaming/dp/B07TKNCQZX",
    page_link: "/vlog-cameras"
  },
  
  // Kompakt Kameralar
  {
    id: 9,
    name: "Sony RX100 VII",
    image: "/images/cameras/hero-bg.webp",
    rating: 4.8,
    category: "Compact",
    categoryColor: "pink",
    description: "Premium compact camera with exceptional autofocus and professional image quality",
    price: "$1,299.99",
    key_features: [
      "20.1MP 1\" Exmor RS CMOS Sensor",
      "ZEISS® 24-200mm f/2.8-4.5 Lens",
      "357-point phase-detection AF",
      "4K Video with S-Log3 & HLG"
    ],
    amazon_link: "https://www.amazon.com/Sony-Cyber-shot-DSC-RX100-VII-Shooting/dp/B07VPQV7BY",
    page_link: "/compact-cameras"
  },
  {
    id: 10,
    name: "Fujifilm X100V",
    image: "/images/cameras/hero-bg.webp",
    rating: 4.9,
    category: "Compact",
    categoryColor: "pink",
    description: "Premium compact with APS-C sensor and unique hybrid viewfinder",
    price: "$1,399.00",
    key_features: [
      "26.1MP APS-C X-Trans CMOS 4",
      "23mm f/2 fixed lens",
      "4K30p 8-bit video",
      "Hybrid optical/EVF viewfinder"
    ],
    amazon_link: "https://www.amazon.com/Fujifilm-X100V-Digital-Camera-Silver/dp/B08485Z9D8",
    page_link: "/compact-cameras"
  }
];

// Kamera kategorileri ve linkleri
const cameraCategories = [
  {
    name: "DSLR Cameras",
    description: "Traditional cameras with optical viewfinders and exceptional battery life",
    icon: <MdCameraAlt className="text-blue-500 text-3xl" />,
    color: "blue",
    link: "/dslr-cameras"
  },
  {
    name: "Mirrorless Cameras",
    description: "Modern, compact cameras with electronic viewfinders and excellent video capabilities",
    icon: <MdPhotoCamera className="text-purple-500 text-3xl" />,
    color: "purple",
    link: "/mirrorless-cameras"
  },
  {
    name: "Action Cameras",
    description: "Rugged, waterproof cameras for capturing adventures and extreme sports",
    icon: <FaCamera className="text-cyan-500 text-3xl" />,
    color: "cyan",
    link: "/action-cameras"
  },
  {
    name: "Vlog Cameras",
    description: "Content creation focused cameras with flip screens and superior audio features",
    icon: <MdVideocam className="text-green-500 text-3xl" />,
    color: "green",
    link: "/vlog-cameras"
  },
  {
    name: "Compact Cameras",
    description: "Pocket-sized cameras that balance portability with image quality",
    icon: <FaCamera className="text-pink-500 text-3xl" />,
    color: "pink",
    link: "/compact-cameras"
  }
];

// Kullanıcı için kamera seçim ipuçları
const cameraSelectionTips = [
  {
    title: "Consider Your Experience Level",
    content: "Beginners might prefer user-friendly models with auto modes, while pros need advanced controls and features."
  },
  {
    title: "Decide on Your Primary Use",
    content: "Sports photography requires fast autofocus and burst rates, while landscape photography benefits from high resolution sensors."
  },
  {
    title: "Set a Realistic Budget",
    content: "Consider not just the camera body cost, but also lenses, accessories, and potential upgrades in the future."
  },
  {
    title: "Think About Size and Weight",
    content: "If you'll carry your camera for long periods, compact mirrorless systems might be preferable to larger DSLRs."
  }
];

export default function Cameras() {
  // State'ler
  // Kamera filtreleme ve arama için state'ler
  const [activeFilter, setActiveFilter] = useState<string>("All"); // Aktif kategori filtresi
  const [hoveredCard, setHoveredCard] = useState<number | null>(null); // Hover yapılan kartın indeksi
  
  // GSAP animasyonları için referanslar
  const heroRef = useRef<HTMLDivElement>(null); // Hero bölümü için ref
  const heroTextRef = useRef(null);
  const heroButtonsRef = useRef(null);
  const categoriesRef = useRef(null);
  const categoryCardsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const filteredCamerasRef = useRef<HTMLDivElement>(null);
  const cameraCardsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const featuredSectionRef = useRef(null);
  const tipsRef = useRef(null);
  const ctaSectionRef = useRef(null);
  
  // Kategoriye göre filtrelenmiş kameralar
  const filteredCameras = activeFilter === "All" 
    ? featuredCameras 
    : featuredCameras.filter(camera => camera.category === activeFilter);
  
  // Kart hover efekti
  const handleCardHover = (index: number | null) => {
    setHoveredCard(index);
  };
  
  // GSAP ve ScrollTrigger setup
  useEffect(() => {
    // GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    
    // Sayfa yüklendiğinde hero animasyonları
    const heroTimeline = gsap.timeline();
    
    heroTimeline.fromTo(heroTextRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    ).fromTo(heroButtonsRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      "-=0.4"
    );
    
    // Kategori bölümü animasyonu
    gsap.fromTo(categoriesRef.current,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.7, 
        scrollTrigger: {
          trigger: categoriesRef.current,
          start: "top 80%"
        }
      }
    );
    
    // Kategori kartları animasyonu
    categoryCardsRefs.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.5, 
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 85%"
            }
          }
        );
      }
    });
    
    // Öne çıkan kameralar bölümü animasyonu
    gsap.fromTo(featuredSectionRef.current,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.7, 
        scrollTrigger: {
          trigger: featuredSectionRef.current,
          start: "top 80%"
        }
      }
    );
    
    // Kamera kartları animasyonu
    cameraCardsRefs.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          { opacity: 0, scale: 0.9 },
          { 
            opacity: 1, 
            scale: 1, 
            duration: 0.5, 
            delay: index * 0.08,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: card,
              start: "top 90%"
            }
          }
        );
      }
    });
    
    // İpuçları bölümü animasyonu
    gsap.fromTo(tipsRef.current,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.7, 
        scrollTrigger: {
          trigger: tipsRef.current,
          start: "top 80%"
        }
      }
    );
    
    // CTA bölümü animasyonu
    gsap.fromTo(ctaSectionRef.current,
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 1, 
        scrollTrigger: {
          trigger: ctaSectionRef.current,
          start: "top 80%"
        }
      }
    );
    
    // Cleanup fonksiyonu
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // Filtreleme değiştiğinde animasyon
  useEffect(() => {
    if (filteredCamerasRef.current) {
      // Container'ın içindeki tüm kartları yeniden animate et
      const children = filteredCamerasRef.current.children;
      if (children && children.length) {
        gsap.fromTo(children,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.out"
          }
        );
      }
    }
  }, [activeFilter]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-16">
      {/* Hero Bölümü */}
      <section 
        ref={heroRef}
        className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-gray-900 text-white"
      >
        {/* Arkaplan Görüntüsü */}
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(/images/cameras/hero-bg.webp)` }}></div>
        
        {/* Renkli overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-purple-900/70 to-pink-900/70"></div>
        
        {/* Hero İçeriği */}
        <div className="container mx-auto px-4 z-10 text-center" ref={heroTextRef}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Find Your Perfect Camera
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-gray-200">
            Explore our curated selection of the best cameras for every photographer - from beginners to professionals
          </p>
          
          <div ref={heroButtonsRef} className="flex flex-wrap gap-4 justify-center">
            <a href="#camera-categories" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 rounded-full text-lg font-medium shadow-lg shadow-blue-500/20 transition duration-300 flex items-center gap-2">
              <FaCamera /> Explore Cameras
            </a>
            <a href="#camera-tips" className="bg-white/10 hover:bg-white/20 border border-white/30 px-8 py-4 rounded-full text-lg font-medium transition duration-300 backdrop-blur-sm flex items-center gap-2">
              <FaInfoCircle /> Camera Buying Guide
            </a>
          </div>
        </div>
      </section>
      
      
      {/* Öne Çıkan Kameralar Bölümü */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto" ref={featuredSectionRef}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-gray-800 dark:text-white">
            Featured Cameras
          </h2>
          <p className="text-lg text-center mb-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our selection of the best cameras across all categories
          </p>
          
          
          {/* Kamera Kartları */}
          <div 
            ref={filteredCamerasRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredCameras.map((camera, index) => (
              <div
                key={camera.id}
                className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-${camera.categoryColor}-200 dark:border-${camera.categoryColor}-800/50`}
                ref={(el) => {
                  if (el) cameraCardsRefs.current[index] = el;
                }}
                onMouseEnter={() => handleCardHover(index)}
                onMouseLeave={() => handleCardHover(null)}
              >
                {/* Kamera Resmi */}
                <div className="h-64 relative overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <Image 
                    src={camera.image} 
                    alt={camera.name}
                    fill
                    className={`object-cover transition-transform duration-500 ${hoveredCard === index ? "scale-110" : "scale-100"}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  
                  {/* Kategori badge */}
                  <div className={`absolute top-2 left-2 bg-${camera.categoryColor}-500 text-white py-1 px-3 rounded-full text-sm font-medium z-10`}>
                    {camera.category}
                  </div>
                  
                  {/* Rating badge */}
                  <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 py-1 px-3 rounded-full flex items-center gap-1 font-medium z-10">
                    <FaStar className={`${hoveredCard === index ? "animate-pulse" : ""}`} /> {camera.rating}
                  </div>
                </div>
                
                {/* Kamera Bilgileri */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white group">
                    {camera.name}
                    <span className={`block h-0.5 bg-${camera.categoryColor}-500 transform transition-transform duration-300 ${
                      hoveredCard === index ? "scale-x-100" : "scale-x-0"
                    }`}></span>
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {camera.description}
                  </p>
                  
                  <div className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                    {camera.price}
                  </div>
                  
                  {/* Özellikler */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Key Features:</h4>
                    <ul className="space-y-2">
                      {camera.key_features.map((feature, idx) => (
                        <li key={idx} className={`flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300 transition-all duration-300 ${
                          hoveredCard === index ? `transform translate-x-${idx + 1}` : ""
                        }`}>
                          <FaCheckCircle className={`text-${camera.categoryColor}-500 mt-1 flex-shrink-0 ${
                            hoveredCard === index ? "animate-pulse" : ""
                          }`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Butonlar */}
                  <div className="flex gap-2">
                    <a 
                      href={camera.amazon_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg flex items-center justify-center gap-2 transition-colors duration-300 ${
                        hoveredCard === index ? "animate-pulse" : ""
                      }`}
                    >
                      <FaAmazon /> View on Amazon
                    </a>
                    <Link 
                      href={camera.page_link}
                      className={`px-4 py-2 bg-${camera.categoryColor}-100 dark:bg-${camera.categoryColor}-900/30 text-${camera.categoryColor}-700 dark:text-${camera.categoryColor}-300 rounded-lg transition-colors duration-300 hover:bg-${camera.categoryColor}-200 dark:hover:bg-${camera.categoryColor}-800/50`}
                    >
                      More Info
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Kamera Seçim İpuçları */}
      <section id="camera-tips" className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto" ref={tipsRef}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-gray-800 dark:text-white">
            How to Choose the Right Camera
          </h2>
          <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Tips for selecting the perfect camera for your needs
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cameraSelectionTips.map((tip, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
                  {tip.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {tip.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Bölümü */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-900 to-purple-900 text-white relative overflow-hidden" ref={ctaSectionRef}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-cyan-400 rounded-full filter blur-2xl"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-lg p-10 rounded-3xl border border-white/10 shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Find Your Perfect Camera Today</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Browse our comprehensive collection of cameras and discover the ideal tool to capture your creative vision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#camera-categories" className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full font-medium text-lg transition duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-600/30 flex items-center justify-center gap-2">
                <FaShoppingCart /> Explore All Cameras
              </a>
              <a href="#camera-tips" className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full font-medium text-lg transition duration-300 backdrop-blur-sm flex items-center justify-center gap-2">
                <FaInfoCircle /> Read Buying Guide
              </a>
            </div>
          </div>
          
          <div className="mt-12 text-gray-400 text-sm">
            <p>Our reviews are based on extensive testing and research. We may earn a commission through affiliate links at no extra cost to you.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
