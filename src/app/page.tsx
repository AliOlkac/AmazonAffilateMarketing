"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Kamera kategorileri için veri
const cameraCategories = [
  {
    id: "dslr",
    title: "DSLR Cameras",
    description: "Professional cameras with interchangeable lenses for the highest image quality",
    image: "/images/cameras/hero-bg.webp",
    color: "#00FFFF", // Neon mavi
    link: "/dslr-cameras",
  },
  {
    id: "mirrorless",
    title: "Mirrorless Cameras",
    description: "Compact professional cameras with advanced features and excellent image quality",
    image: "/images/cameras/hero-bg.webp",
    color: "#FF00FF", // Neon pembe
    link: "/mirrorless-cameras",
  },
  {
    id: "action",
    title: "Action Cameras",
    description: "Durable cameras for capturing your adventures in extreme conditions",
    image: "/images/cameras/hero-bg.webp",
    color: "#00FF00", // Neon yeşil
    link: "/action-cameras",
  },
  {
    id: "vlog",
    title: "Vlog Cameras",
    description: "Perfect cameras for content creators and vloggers with advanced video features",
    image: "/images/cameras/hero-bg.webp",
    color: "#FF5500", // Neon turuncu
    link: "/vlog-cameras",
  },
  {
    id: "compact",
    title: "Compact Cameras",
    description: "Portable, easy-to-use cameras for everyday photography",
    image: "/images/cameras/hero-bg.webp",
    color: "#FFFF00", // Neon sarı
    link: "/compact-cameras",
  },
];

// Öne çıkan kameralar için veri
const featuredCameras = [
  {
    id: "sony-a7iv",
    title: "Sony A7 IV",
    category: "Mirrorless",
    image: "/images/cameras/hero-bg.webp",
    price: "$2,499",
    rating: 4.9,
    link: "/mirrorless-cameras",
  },
  {
    id: "canon-r6",
    title: "Canon EOS R6",
    category: "Mirrorless",
    image: "/images/cameras/hero-bg.webp",
    price: "$2,299",
    rating: 4.8,
    link: "/mirrorless-cameras",
  },
  {
    id: "gopro-hero11",
    title: "GoPro Hero 11",
    category: "Action",
    image: "/images/cameras/hero-bg.webp",
    price: "$399",
    rating: 4.7,
    link: "/action-cameras",
  },
];

export default function Home() {
  // GSAP animasyonları için referanslar
  const heroRef = useRef(null);
  const sliderRef = useRef(null);
  const categoriesRef = useRef(null);
  const featuredRef = useRef(null);
  const guideRef = useRef(null);
  const ctaRef = useRef(null);
  
  // Slider için state
  const [currentSlide, setCurrentSlide] = React.useState(0);
  // Neon parçacıkları istemci tarafında render etmek için state
  const [particles, setParticles] = useState<Array<{
    id: number;
    width: string;
    height: string;
    color: string;
    shadow: string;
    left: string;
    top: string;
    opacity: number;
    animation: string;
  }>>([]);

  // Neon parçacıkları yalnızca istemci tarafında oluştur
  useEffect(() => {
    const newParticles = [...Array(20)].map((_, i) => ({
      id: i,
      width: `${Math.random() * 10 + 2}px`,
      height: `${Math.random() * 10 + 2}px`,
      color: cameraCategories[i % cameraCategories.length].color,
      shadow: `0 0 20px ${cameraCategories[i % cameraCategories.length].color}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.5 + 0.2,
      animation: `float ${Math.random() * 20 + 10}s linear infinite`
    }));
    
    setParticles(newParticles);
  }, []);

  // GSAP animasyonları
  useEffect(() => {
    // ScrollTrigger plugin'ini kaydet
    gsap.registerPlugin(ScrollTrigger);
    
    // Ana timeline'ı oluştur
    const tl = gsap.timeline();
    
    // Hero animasyonu
    tl.from(".hero-title", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    })
    .from(".hero-subtitle", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6")
    .from(".hero-cta", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6");
    
    // Slider animasyonu
    gsap.from(".slider-container", {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: sliderRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
    
    // Kategoriler animasyonu
    gsap.from(".category-card", {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: categoriesRef.current,
        start: "top 70%",
        toggleActions: "play none none none"
      }
    });
    
    // Öne çıkan kameralar animasyonu
    gsap.from(".featured-camera", {
      opacity: 0,
      x: -50,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: featuredRef.current,
        start: "top 70%",
        toggleActions: "play none none none"
      }
    });
    
    // Rehber bölümü animasyonu
    gsap.from(".guide-content", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      scrollTrigger: {
        trigger: guideRef.current,
        start: "top 70%",
        toggleActions: "play none none none"
      }
    });
    
    // CTA bölümü animasyonu
    gsap.from(".cta-content", {
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      scrollTrigger: {
        trigger: ctaRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
    
    // Otomatik slider için interval
    const sliderInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % cameraCategories.length);
    }, 5000);
    
    // Cleanup fonksiyonu
    return () => {
      clearInterval(sliderInterval);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Hero bölümü */}
      <section 
        ref={heroRef} 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: "radial-gradient(circle at center, rgba(25,25,35,1) 0%, rgba(10,10,20,1) 100%)"
        }}
      >
        {/* Neon renkli parçacıklar (sadece görsel efekt) */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <div 
              key={particle.id}
              className="absolute rounded-full"
              style={{
                width: particle.width,
                height: particle.height,
                backgroundColor: particle.color,
                boxShadow: particle.shadow,
                left: particle.left,
                top: particle.top,
                opacity: particle.opacity,
                animation: particle.animation
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-6 z-10 text-center">
          <h1 className="hero-title text-5xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] via-[#FF00FF] to-[#FFFF00]">
            Find Your Perfect Camera
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Expert reviews and buying guides for every photography need
          </p>
          <button className="hero-cta bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] hover:from-[#00FFFF] hover:to-[#FF00FF] text-black font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(255,0,255,0.7)]">
            Explore Cameras
          </button>
        </div>
        
        {/* Scroll down indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>
      
      {/* Döngüsel slider bölümü */}
      <section ref={sliderRef} className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#FF00FF]">
              Discover Camera Categories
            </span>
          </h2>
          
          <div className="slider-container relative h-[400px] md:h-[500px] overflow-hidden rounded-2xl shadow-[0_0_50px_rgba(255,0,255,0.3)]">
            {cameraCategories.map((category, index) => (
              <div 
                key={category.id}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
                style={{
                  background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${category.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderLeft: `8px solid ${category.color}`,
                  boxShadow: `0 0 30px ${category.color}80`
                }}
              >
                <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                  <h3 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: category.color }}>
                    {category.title}
                  </h3>
                  <p className="text-lg md:text-xl mb-6 max-w-2xl">
                    {category.description}
                  </p>
                  <Link 
                    href={category.link}
                    className="inline-flex items-center gap-2 py-2 px-6 rounded-full text-black font-semibold transition-all duration-300 hover:pl-4 hover:pr-8"
                    style={{ 
                      backgroundColor: category.color,
                      boxShadow: `0 0 20px ${category.color}`
                    }}
                  >
                    Explore <FaArrowRight />
                  </Link>
                </div>
              </div>
            ))}
            
            {/* Slider indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
              {cameraCategories.map((_, index) => (
                <button
                  key={index}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? "w-8 bg-white" : "bg-white/50"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Kategoriler vitrini */}
      <section ref={categoriesRef} className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFF00] to-[#00FF00]">
              Camera Categories
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cameraCategories.map((category) => (
              <Link 
                href={category.link} 
                key={category.id}
                className="category-card group relative overflow-hidden rounded-xl transition-all duration-500 hover:transform hover:scale-[1.02]"
                style={{
                  boxShadow: `0 0 20px ${category.color}30`
                }}
              >
                <div className="h-60 relative overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-80"
                    style={{
                      background: `linear-gradient(to top, black, transparent), linear-gradient(45deg, ${category.color}40, transparent)`
                    }}
                  />
                </div>
                <div className="p-6 bg-gray-800">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300" 
                    style={{ 
                      color: category.color,
                      backgroundImage: `linear-gradient(45deg, ${category.color}, white)`
                    }}>
                    {category.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    {category.description}
                  </p>
                  <div className="flex justify-end">
                    <span className="inline-flex items-center gap-1 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
                      style={{ color: category.color }}>
                      View Guide <FaArrowRight />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Öne çıkan kameralar */}
      <section ref={featuredRef} className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF00] to-[#00FFFF]">
              Featured Cameras
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCameras.map((camera) => (
              <Link 
                href={camera.link} 
                key={camera.id}
                className="featured-camera bg-gray-900 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] transform hover:scale-[1.03]"
              >
                <div className="h-48 relative">
                  <Image
                    src={camera.image}
                    alt={camera.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold">{camera.title}</h3>
                    <span className="text-[#00FFFF] font-bold">{camera.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">{camera.category}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[#FFFF00]">★</span>
                      <span>{camera.rating}/5</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00FFFF] to-[#00FF00] hover:from-[#00FF00] hover:to-[#00FFFF] text-black font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(0,255,255,0.7)]"
            >
              View All Cameras <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Kamera seçim rehberi */}
      <section ref={guideRef} className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="guide-content max-w-4xl mx-auto bg-gray-800 p-8 md:p-12 rounded-2xl shadow-[0_0_30px_rgba(255,255,0,0.2)]">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFF00] to-[#FF00FF]">
                How to Choose Your Perfect Camera
              </span>
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#FFFF00] text-black flex items-center justify-center font-bold text-xl shrink-0">1</div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-[#FFFF00]">Define Your Photography Needs</h3>
                  <p className="text-gray-300">Are you shooting landscapes, portraits, action sports, or making videos? Each camera type excels in different scenarios.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#FF00FF] text-black flex items-center justify-center font-bold text-xl shrink-0">2</div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-[#FF00FF]">Consider Your Budget</h3>
                  <p className="text-gray-300">Cameras range from a few hundred to several thousand dollars. We help you find the best value in your price range.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#00FFFF] text-black flex items-center justify-center font-bold text-xl shrink-0">3</div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-[#00FFFF]">Think About Size and Weight</h3>
                  <p className="text-gray-300">If you&apos;ll be carrying your camera for long periods, a lighter mirrorless or compact camera might be preferable.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#00FF00] text-black flex items-center justify-center font-bold text-xl shrink-0">4</div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-[#00FF00]">Research Available Lenses</h3>
                  <p className="text-gray-300">For DSLR and mirrorless cameras, the lens ecosystem is crucial for your photography&apos;s future expansion.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <Link 
                href="/buying-guide" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFFF00] to-[#FF00FF] hover:from-[#FF00FF] hover:to-[#FFFF00] text-black font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,0,0.7)]"
              >
                Read Full Guide <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA bölümü */}
      <section ref={ctaRef} className="py-20 bg-gray-800 relative overflow-hidden">
        {/* Neon ışık efekti */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-30">
          <div className="w-[800px] h-[800px] rounded-full bg-[#FF00FF] blur-[150px]"></div>
          <div className="absolute w-[600px] h-[600px] rounded-full bg-[#00FFFF] blur-[150px] -right-64"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="cta-content max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] via-[#FF00FF] to-[#FFFF00]">
                Ready to Find Your Perfect Camera?
              </span>
            </h2>
            
            <p className="text-xl mb-10 max-w-2xl mx-auto">
              Our expert reviews and comprehensive guides will help you make the right choice for your photography journey.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="/all-cameras" 
                className="bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] hover:from-[#00FFFF] hover:to-[#FF00FF] text-black font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(255,0,255,0.7)]"
              >
                Browse All Cameras
              </Link>
              
              <Link 
                href="/buying-guide" 
                className="bg-transparent border-2 border-[#00FFFF] text-[#00FFFF] hover:text-white hover:border-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(0,255,255,0.7)]"
              >
                Read Buying Guide
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Keyframe animasyonları */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(20px) translateX(10px); }
          50% { transform: translateY(0) translateX(20px); }
          75% { transform: translateY(-20px) translateX(10px); }
          100% { transform: translateY(0) translateX(0); }
        }
      `}</style>
    </div>
  );
}
