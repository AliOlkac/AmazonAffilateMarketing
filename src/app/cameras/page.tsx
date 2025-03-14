/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from "next/link";
import Image from "next/image";
import { FaCamera, FaStar, FaCheckCircle, FaAmazon, FaShoppingCart, FaInfoCircle } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { MdPhotoCamera, MdCameraAlt, MdVideocam } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import camerasData from "../../../public/cameras.json";
import CameraCard from "../components/CameraCard";

// JSON dosyasından featured camera verilerini alan fonksiyon
const getFeaturedCameras = () => {
  // Her kategoriden en iyi kameraları alıyoruz
  const featuredDSLR = camerasData.dslr.best2025.map((camera, index) => {
    const imageName = camera.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    const correctImageUrl = camera.imageUrl ? camera.imageUrl.replace('.jpg', '.png') : null;
    const fallbackImage = "/images/cameras/hero-bg.webp";
    
    return {
      id: index + 1,
      name: camera.name,
      image: correctImageUrl || `/images/cameras/${imageName}.png` || fallbackImage,
      rating: 4.5,
    category: "DSLR",
    categoryColor: "blue",
      description: `Professional ${camera.level} DSLR camera, ideal for ${camera.idealUser}`,
      price: camera.price,
      key_features: camera.features,
      amazon_link: camera.link,
      page_link: "/dslr-cameras",
      detailed_description: camera.whyGreat || `Perfect for ${camera.idealUser}. Professional ${camera.level} DSLR camera with exceptional image quality.`
    };
  });
  
  const featuredMirrorless = camerasData.mirrorless.best2025.map((camera, index) => {
    const imageName = camera.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    const correctImageUrl = camera.imageUrl ? camera.imageUrl.replace('.jpg', '.png') : null;
    const fallbackImage = "/images/cameras/hero-bg.webp";
    
    return {
      id: index + 1 + featuredDSLR.length, // DSLR kameralardan sonra devam eden ID değerleri
      name: camera.name,
      image: correctImageUrl || `/images/cameras/${imageName}.png` || fallbackImage,
      rating: 4.5,
      category: "Mirrorless",
      categoryColor: "purple",
      description: `Advanced ${camera.level} mirrorless camera, ideal for ${camera.idealUser}`,
      price: camera.price,
      key_features: camera.features,
      amazon_link: camera.link,
      page_link: "/mirrorless-cameras",
      detailed_description: camera.whyGreat || `Perfect for ${camera.idealUser}. Advanced ${camera.level} mirrorless camera with excellent features.`
    };
  });
  
  const featuredAction = camerasData.action.best2025.map((camera, index) => {
    const imageName = camera.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    const correctImageUrl = camera.imageUrl ? camera.imageUrl.replace('.jpg', '.png') : null;
    const fallbackImage = "/images/cameras/hero-bg.webp";
    
    return {
      id: index + 1 + featuredDSLR.length + featuredMirrorless.length, // Önceki kameralardan sonra devam eden ID değerleri
      name: camera.name,
      image: correctImageUrl || `/images/cameras/${imageName}.png` || fallbackImage,
      rating: 4.5,
      category: "Action",
      categoryColor: "cyan",
      description: `Durable ${camera.level} action camera, perfect for ${camera.idealUser}`,
      price: camera.price,
      key_features: camera.features,
      amazon_link: camera.link,
      page_link: "/action-cameras",
      detailed_description: camera.whyGreat || `Perfect for ${camera.idealUser}. Durable ${camera.level} action camera for capturing adventures.`
    };
  });
  
  const featuredVlog = camerasData.vlog.best2025.map((camera, index) => {
    const imageName = camera.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    const correctImageUrl = camera.imageUrl ? camera.imageUrl.replace('.jpg', '.png') : null;
    const fallbackImage = "/images/cameras/hero-bg.webp";
    
    return {
      id: index + 1 + featuredDSLR.length + featuredMirrorless.length + featuredAction.length, // Önceki kameralardan sonra devam eden ID değerleri
      name: camera.name,
      image: correctImageUrl || `/images/cameras/${imageName}.png` || fallbackImage,
      rating: 4.5,
      category: "Vlog",
      categoryColor: "green",
      description: `Content creation focused ${camera.level} camera, ideal for ${camera.idealUser}`,
      price: camera.price,
      key_features: camera.features,
      amazon_link: camera.link,
      page_link: "/vlog-cameras",
      detailed_description: camera.whyGreat || camera.note || `Perfect for ${camera.idealUser}. Specialized ${camera.level} vlog camera for content creators.`
    };
  });
  
  const featuredCompact = camerasData.compact.best2025.map((camera, index) => {
    const imageName = camera.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    const correctImageUrl = camera.imageUrl ? camera.imageUrl.replace('.jpg', '.png') : null;
    const fallbackImage = "/images/cameras/hero-bg.webp";
    
    return {
      id: index + 1 + featuredDSLR.length + featuredMirrorless.length + featuredAction.length + featuredVlog.length, // Önceki kameralardan sonra devam eden ID değerleri
      name: camera.name,
      image: correctImageUrl || `/images/cameras/${imageName}.png` || fallbackImage,
      rating: 4.5,
      category: "Compact",
      categoryColor: "pink",
      description: `Portable ${camera.level} compact camera, perfect for ${camera.idealUser}`,
      price: camera.price,
      key_features: camera.features,
      amazon_link: camera.link,
      page_link: "/compact-cameras",
      detailed_description: camera.whyGreat || `Perfect for ${camera.idealUser}. Portable ${camera.level} compact camera with excellent image quality.`
    };
  });
  
  // Daha fazla ürün için Amazon best seller listelerinden de kamera ekleyelim
  const amazonDSLR = camerasData.dslr.amazonBestSellers.map((camera, index) => {
    const imageName = camera.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    const correctImageUrl = camera.imageUrl ? camera.imageUrl.replace('.jpg', '.png') : null;
    const fallbackImage = "/images/cameras/hero-bg.webp";
    
    return {
      id: index + 1 + featuredDSLR.length + featuredMirrorless.length + featuredAction.length + featuredVlog.length + featuredCompact.length,
      name: camera.name,
      image: correctImageUrl || `/images/cameras/${imageName}.png` || fallbackImage,
      rating: 4.5,
    category: "DSLR",
    categoryColor: "blue",
      description: `Best Selling ${camera.level} DSLR camera, perfect for ${camera.idealUser}`,
      price: camera.price,
      key_features: camera.features,
      amazon_link: camera.link,
      page_link: "/dslr-cameras",
      detailed_description: `Popular ${camera.level} DSLR camera, ideal for ${camera.idealUser}. One of the best selling models in its category.`
    };
  });
  
  const amazonMirrorless = camerasData.mirrorless.amazonBestSellers.map((camera, index) => {
    const imageName = camera.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    const correctImageUrl = camera.imageUrl ? camera.imageUrl.replace('.jpg', '.png') : null;
    const fallbackImage = "/images/cameras/hero-bg.webp";
    
    return {
      id: index + 1 + featuredDSLR.length + featuredMirrorless.length + featuredAction.length + featuredVlog.length + featuredCompact.length + amazonDSLR.length,
      name: camera.name,
      image: correctImageUrl || `/images/cameras/${imageName}.png` || fallbackImage,
      rating: 4.5,
    category: "Mirrorless",
    categoryColor: "purple",
      description: `Popular ${camera.level} mirrorless camera, ideal for ${camera.idealUser}`,
      price: camera.price,
      key_features: camera.features,
      amazon_link: camera.link,
      page_link: "/mirrorless-cameras",
      detailed_description: `Popular ${camera.level} mirrorless camera, ideal for ${camera.idealUser}. Highly rated by users for its performance and features.`
    };
  });
  
  const amazonAction = camerasData.action.amazonBestSellers.map((camera, index) => {
    const imageName = camera.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    const correctImageUrl = camera.imageUrl ? camera.imageUrl.replace('.jpg', '.png') : null;
    const fallbackImage = "/images/cameras/hero-bg.webp";
    
    return {
      id: index + 1 + featuredDSLR.length + featuredMirrorless.length + featuredAction.length + featuredVlog.length + featuredCompact.length + amazonDSLR.length + amazonMirrorless.length,
      name: camera.name,
      image: correctImageUrl || `/images/cameras/${imageName}.png` || fallbackImage,
      rating: 4.5,
    category: "Action",
    categoryColor: "cyan",
      description: `Popular ${camera.level} action camera, ideal for ${camera.idealUser}`,
      price: camera.price,
      key_features: camera.features,
      amazon_link: camera.link,
      page_link: "/action-cameras",
      detailed_description: `Popular ${camera.level} action camera, ideal for ${camera.idealUser}. Designed for durability and high-quality video capture in extreme conditions.`
    };
  });
  
  const amazonVlog = camerasData.vlog.amazonBestSellers.map((camera, index) => {
    const imageName = camera.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    const correctImageUrl = camera.imageUrl ? camera.imageUrl.replace('.jpg', '.png') : null;
    const fallbackImage = "/images/cameras/hero-bg.webp";
    
    return {
      id: index + 1 + featuredDSLR.length + featuredMirrorless.length + featuredAction.length + featuredVlog.length + featuredCompact.length + amazonDSLR.length + amazonMirrorless.length + amazonAction.length,
      name: camera.name,
      image: correctImageUrl || `/images/cameras/${imageName}.png` || fallbackImage,
      rating: 4.5,
    category: "Vlog",
    categoryColor: "green",
      description: `Popular ${camera.level} vlog camera, ideal for ${camera.idealUser}`,
      price: camera.price,
      key_features: camera.features,
      amazon_link: camera.link,
      page_link: "/vlog-cameras",
      detailed_description: `Popular ${camera.level} vlog camera, ideal for ${camera.idealUser}. Optimized for content creation with excellent audio and video features.`
    };
  });
  
  const amazonCompact = camerasData.compact.amazonBestSellers.map((camera, index) => {
    const imageName = camera.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    const correctImageUrl = camera.imageUrl ? camera.imageUrl.replace('.jpg', '.png') : null;
    const fallbackImage = "/images/cameras/hero-bg.webp";
    
    return {
      id: index + 1 + featuredDSLR.length + featuredMirrorless.length + featuredAction.length + featuredVlog.length + featuredCompact.length + amazonDSLR.length + amazonMirrorless.length + amazonAction.length + amazonVlog.length,
      name: camera.name,
      image: correctImageUrl || `/images/cameras/${imageName}.png` || fallbackImage,
      rating: 4.5,
    category: "Compact",
    categoryColor: "pink",
      description: `Popular ${camera.level} compact camera, ideal for ${camera.idealUser}`,
      price: camera.price,
      key_features: camera.features,
      amazon_link: camera.link,
      page_link: "/compact-cameras",
      detailed_description: `Popular ${camera.level} compact camera, ideal for ${camera.idealUser}. Excellent choice for those seeking portability without sacrificing image quality.`
    };
  });
  
  // Tüm kategorilerden seçilen kameraları birleştir
  return [...featuredDSLR, ...featuredMirrorless, ...featuredAction, ...featuredVlog, ...featuredCompact, ...amazonDSLR, ...amazonMirrorless, ...amazonAction, ...amazonVlog, ...amazonCompact];
};

// Tüm kamera verilerinin bir araya getirilmiş hali
const featuredCameras = getFeaturedCameras();

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
        className="relative h-[100vh] flex items-center justify-center overflow-hidden bg-gray-900 text-white"
      >
        {/* Arkaplan Görüntüsü */}
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(/images/cameras/categories/all-cameras.webp)` }}></div>
        
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
            <a href="/buying-guide" className="bg-white/10 hover:bg-white/20 border border-white/30 px-8 py-4 rounded-full text-lg font-medium transition duration-300 backdrop-blur-sm flex items-center gap-2">
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
              <CameraCard
                key={camera.id}
                camera={camera}
                index={index}
                hoveredCard={hoveredCard}
                handleCardHover={handleCardHover}
              />
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
