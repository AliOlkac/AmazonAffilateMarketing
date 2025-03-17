/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from "next/link";
import Image from "next/image";
import { FaCamera, FaSearchPlus, FaShoppingBag, FaCheck, FaArrowRight } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import CameraCard from "./components/CameraCard";
import camerasData from "../../public/cameras.json";

// Camera categories data
const cameraCategories = [
  {
    id: "dslr",
    title: "DSLR Cameras",
    description: "Professional cameras with interchangeable lenses for the highest image quality",
    image: "/images/cameras/categories/dslr.webp",
    color: "#00FFFF", // Neon blue
    link: "/dslr-cameras",
  },
  {
    id: "mirrorless",
    title: "Mirrorless Cameras",
    description: "Compact professional cameras with advanced features and excellent image quality",
    image: "/images/cameras/categories/mirrorless.webp",
    color: "#FF00FF", // Neon pink
    link: "/mirrorless-cameras",
  },
  {
    id: "action",
    title: "Action Cameras",
    description: "Durable cameras for capturing your adventures in extreme conditions",
    image: "/images/cameras/categories/action.webp",
    color: "#00FF00", // Neon green
    link: "/action-cameras",
  },
  {
    id: "vlog",
    title: "Vlog Cameras",
    description: "Perfect cameras for content creators and vloggers with advanced video features",
    image: "/images/cameras/categories/vlog.webp",
    color: "#FF5500", // Neon orange
    link: "/vlog-cameras",
  },
  {
    id: "compact",
    title: "Compact Cameras",
    description: "Portable, easy-to-use cameras for everyday photography",
    image: "/images/cameras/categories/compact.webp",
    color: "#FFFF00", // Neon yellow
    link: "/compact-cameras",
  },
];

// Function to get featured cameras for the homepage from JSON
const getHomePageFeaturedCameras = () => {
  // Select the most popular camera from each category
  const featuredDSLR = camerasData.dslr.best2025?.[0] || camerasData.dslr.amazonBestSellers[0];
  const featuredMirrorless = camerasData.mirrorless.best2025?.[0] || camerasData.mirrorless.amazonBestSellers[0];
  const featuredAction = camerasData.action.best2025?.[0] || camerasData.action.amazonBestSellers[0];
  const featuredVlog = camerasData.vlog.best2025?.[0] || camerasData.vlog.amazonBestSellers[0];
  const featuredCompact = camerasData.compact.best2025?.[0] || camerasData.compact.amazonBestSellers[0];
  
  // Select one top-selling camera from each category
  const topSellingDSLR = camerasData.dslr.amazonBestSellers[0];
  const topSellingMirrorless = camerasData.mirrorless.amazonBestSellers[0];
  
  // Convert camera data to the format used by the CameraCard component
  const formatCamera = (camera: {
    name: string; 
    imageUrl?: string; 
    level: string; 
    idealUser: string; 
    price: string; 
    features: string[]; 
    whyGreat?: string; 
    link: string;
  }, category: string, categoryColor: string, index: number, kameraId?: number) => {
    const imageName = camera.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    const correctImageUrl = camera.imageUrl ? camera.imageUrl.replace('.jpg', '.png') : null;
    const fallbackImage = "/images/cameras/hero-bg.webp";
    
    return {
      id: kameraId || index + 1,
      name: camera.name,
      image: correctImageUrl || `/images/cameras/${imageName}.png` || fallbackImage,
      rating: 4.5,
      category: category,
      categoryColor: categoryColor,
      description: `Best ${camera.level} ${category}: Perfect for ${camera.idealUser}`,
      price: camera.price,
      key_features: camera.features,
      amazon_link: camera.link,
      page_link: `/${category.toLowerCase()}-cameras`,
      detailed_description: camera.whyGreat || `Perfect for ${camera.idealUser}. Advanced ${camera.level} ${category.toLowerCase()} camera with excellent features.`
    };
  };
  
  // Combine all categories
  return [
    formatCamera(featuredDSLR, "DSLR", "blue", 0),
    formatCamera(featuredMirrorless, "Mirrorless", "purple", 1),
    formatCamera(featuredAction, "Action", "cyan", 2),
    formatCamera(featuredVlog, "Vlog", "green", 3),
    formatCamera(featuredCompact, "Compact", "pink", 4),
    formatCamera(topSellingDSLR, "DSLR", "blue", 5),
    formatCamera(topSellingMirrorless, "Mirrorless", "purple", 6)
  ];
};

// Featured cameras data for the homepage (automatically fetched from JSON)
const featuredCameras = getHomePageFeaturedCameras();

export default function Home() {
  // Refs for scrolling
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // State for slider
  const [currentSlide, setCurrentSlide] = useState(0);
  // State for hovered card
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  // State for rendering neon particles on client side
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

  // Card hover handler
  const handleCardHover = (id: number | null) => {
    setHoveredCard(id);
  };
  
  // Function to scroll to slider section
  const scrollToSlider = () => {
    sliderRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Create neon particles only on client side
  useEffect(() => {
    // Increasing the number of particles from 20 to 60
    const newParticles = [...Array(60)].map((_, i) => {
      // Select a random category color for each particle
      const randomCategoryIndex = Math.floor(Math.random() * cameraCategories.length);
      const particleColor = cameraCategories[randomCategoryIndex].color;
      
      // Using a wider range for particle size (2-15px)
      const particleSize = Math.random() * 13 + 2;
      
      // Making some particles round, some oval
      const isRound = Math.random() > 0.3;
      
      // Starting some particles from the bottom of the screen
      const startFromBottom = Math.random() > 0.7;
      const topPosition = startFromBottom ? `${100 + Math.random() * 20}%` : `${Math.random() * 100}%`;
      
      return {
      id: i,
        width: isRound ? `${particleSize}px` : `${particleSize}px`,
        height: isRound ? `${particleSize}px` : `${particleSize * (Math.random() * 0.5 + 0.5)}px`,
        color: particleColor,
        shadow: `0 0 ${Math.random() * 15 + 10}px ${particleColor}`,
      left: `${Math.random() * 100}%`,
        top: topPosition,
        opacity: Math.random() * 0.6 + 0.2, // Wider opacity range (0.2-0.8)
        // Reducing animation duration to 5-15 seconds (faster)
        animation: startFromBottom 
          ? `floatUp ${Math.random() * 10 + 15}s linear infinite` 
          : `float${Math.floor(Math.random() * 3) + 1} ${Math.random() * 10 + 5}s linear infinite`
      };
    });
    
    setParticles(newParticles);
  }, []);

  // Automatic slider interval
  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % cameraCategories.length);
    }, 5000);
    
    // Cleanup function
    return () => {
      clearInterval(sliderInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Hero section */}
      <section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: "radial-gradient(circle at center, rgba(25,25,35,1) 0%, rgba(10,10,20,1) 100%)"
        }}
      >
        {/* Background glow effect */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#FF00FF] blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#00FFFF] blur-[120px]"></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-[#FFFF00] blur-[120px]"></div>
        </div>
        
        {/* Neon colored particles (visual effect only) */}
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
        
        <div className="container mx-auto px-6 z-10 text-center animate-fade-in">
          <h1 className="hero-title text-5xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] via-[#FF00FF] to-[#FFFF00] animate-slide-up">
            Find Your Perfect Camera
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-slide-up-delay-1">
            Expert reviews and buying guides for every photography need
          </p>
          <button 
            onClick={scrollToSlider}
            className="hero-cta bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] hover:from-[#00FFFF] hover:to-[#FF00FF] text-black font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(255,0,255,0.7)] animate-slide-up-delay-2"
          >
            Explore Cameras
          </button>
        </div>
        
        {/* Scroll down indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
          onClick={scrollToSlider}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>
      
      {/* Carousel slider section */}
      <section 
        className="py-24 relative"
        style={{
          background: "linear-gradient(to bottom, rgba(10,10,20,1) 0%, rgba(25,25,35,1) 50%, rgba(15,15,25,1) 100%)"
        }}
      >
        {/* Background glow effect */}
        <div className="absolute inset-0 opacity-30 overflow-hidden">
          <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-[#00FFFF] blur-[150px]"></div>
          <div className="absolute bottom-1/3 left-1/4 w-72 h-72 rounded-full bg-[#FF00FF] blur-[150px]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-5xl font-bold mb-16 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] via-[#FF00FF] to-[#FFFF00]">
              Discover Camera Categories
            </span>
          </h2>
          
          <div ref={sliderRef} className="slider-container relative overflow-hidden rounded-3xl shadow-[0_0_80px_rgba(255,0,255,0.2)] animate-fade-in">
            {/* Main slider */}
            <div 
              className="relative h-[450px] md:h-[600px] lg:h-[700px] overflow-hidden"
              style={{
                background: "#0a0a0f"
              }}
            >
              {/* Manual previous/next navigation buttons */}
              <button 
                onClick={() => setCurrentSlide((prev) => (prev === 0 ? cameraCategories.length - 1 : prev - 1))}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition-all duration-300"
                aria-label="Previous slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
                </svg>
              </button>
              
              <button 
                onClick={() => setCurrentSlide((prev) => (prev + 1) % cameraCategories.length)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition-all duration-300"
                aria-label="Next slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                </svg>
              </button>
                
              {/* Slides */}
            {cameraCategories.map((category, index) => (
              <div 
                key={category.id}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
                >
                  {/* Background and border effect */}
                  <div 
                    className="absolute inset-0 overflow-hidden bg-cover bg-center"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url(${category.image})`
                    }}
                  >
                    {/* Neon border effect */}
                    <div 
                      className={`absolute inset-y-0 left-0 w-1 md:w-2`}
                      style={{ 
                        backgroundColor: `var(--color-${category.id})`,
                        boxShadow: `var(--color-${category.id}-shadow)`
                      }}
                    ></div>
                  </div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full md:max-w-3xl bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                    <h3 
                      className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                style={{
                        color: `var(--color-${category.id})`,
                        textShadow: `0 0 20px var(--color-${category.id})80` 
                      }}
                    >
                    {category.title}
                  </h3>
                    <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl">
                    {category.description}
                  </p>
                  <Link 
                    href={category.link}
                      className={`inline-flex items-center gap-3 py-3 px-8 rounded-full text-black font-semibold transition-all duration-300 transform hover:scale-105 hover:gap-4 btn-gradient-${category.id}`}
                  >
                    Explore <FaArrowRight />
                  </Link>
                </div>
              </div>
            ))}
            
              {/* Slider mini preview and indicators */}
              <div className="absolute bottom-6 right-6 z-30 hidden md:flex flex-col items-end gap-4">
                <div className="flex gap-3">
                  {cameraCategories.map((category, index) => (
                    <button
                      key={index}
                      aria-label={`Go to slide ${index + 1}`}
                      onClick={() => setCurrentSlide(index)}
                      className={`group relative transition-all duration-300 ${
                        index === currentSlide ? "opacity-100 scale-110" : "opacity-60 hover:opacity-90 scale-100"
                      }`}
                    >
                      <div
                        className="w-16 h-10 rounded overflow-hidden border-2 transition-all duration-300"
                        style={{
                          backgroundImage: `url(${category.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          borderColor: index === currentSlide ? category.color : "transparent",
                          boxShadow: index === currentSlide ? `0 0 15px ${category.color}` : "none"
                        }}
                      ></div>
                    </button>
                  ))}
                </div>
                
                {/* Current/total slide indicator */}
                <div className="text-white bg-black/30 backdrop-blur-md px-4 py-1 rounded-full">
                  <span className="font-semibold text-lg">{currentSlide + 1}</span>
                  <span className="mx-1 opacity-60">/</span>
                  <span className="opacity-60">{cameraCategories.length}</span>
                </div>
              </div>
            </div>
            
            {/* Page dots for mobile devices */}
            <div className="md:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
              {cameraCategories.map((_, index) => (
                <button
                  key={index}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? "w-10 bg-white" : "bg-white/50"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Camera Models */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-900 to-gray-800 rounded-t-[40px] shadow-lg relative">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-500/10 blur-[100px]"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-purple-500/10 blur-[100px]"></div>
          <div className="absolute top-3/4 right-1/3 w-80 h-80 rounded-full bg-cyan-500/10 blur-[100px]"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFF00] via-[#00FF00] to-[#00FFFF]">
              Featured Camera Models
            </span>
          </h2>
          <p className="text-lg text-center mb-12 text-gray-300 max-w-3xl mx-auto">
            Discover our handpicked selection of top-rated cameras that deliver exceptional performance for every photography need
          </p>
          
          {/* Camera Cards Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {featuredCameras.slice(0, 8).map((camera, index) => (
              <CameraCard
                key={camera.id}
                camera={camera}
                index={index}
                hoveredCard={hoveredCard}
                handleCardHover={handleCardHover}
              />
            ))}
          </div>
          
          {/* View all cameras button */}
          <div className="text-center mt-12">
            <Link 
              href="/cameras"
              className="inline-flex items-center justify-center gap-2 py-3 px-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(129,140,248,0.6)] transform hover:scale-105"
            >
              View All Cameras 
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Camera Selection Guide */}
      <section className="py-24 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f111a] via-[#131626] to-[#0f111a]"></div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#FF00FF]/10 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-t from-[#00FFFF]/10 to-transparent"></div>
          <div className="absolute top-1/4 right-[10%] w-72 h-72 rounded-full bg-[#FF00FF]/5 blur-[80px]"></div>
          <div className="absolute bottom-1/3 left-[5%] w-80 h-80 rounded-full bg-[#00FFFF]/5 blur-[100px]"></div>
          
          {/* Decorative camera silhouettes */}
          <div className="absolute -right-20 top-20 w-80 h-80 opacity-5">
            <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 17.5C15.0376 17.5 17.5 15.0376 17.5 12C17.5 8.96243 15.0376 6.5 12 6.5C8.96243 6.5 6.5 8.96243 6.5 12C6.5 15.0376 8.96243 17.5 12 17.5Z" />
              <path d="M2 8.34233V15.6577C2 17.4903 2 18.4071 2.5192 19.0476C2.80721 19.4023 3.20643 19.6674 3.65823 19.8129C4.54278 20.0737 5.6192 19.68 7.77203 18.8926C9.44872 18.2797 10.2871 17.9733 11.1456 17.9914C11.3829 17.9972 11.6181 18.0147 11.8507 18.0437C12.5983 18.1547 13.2382 18.4178 14.5181 18.9439L16.6283 19.8111C18.1927 20.4567 18.975 20.7794 19.5773 20.6383C19.8853 20.5659 20.1583 20.4053 20.3644 20.1759C20.8106 19.6788 20.8262 18.8543 20.8573 17.2054C20.8776 16.1972 20.8878 15.6931 20.7656 15.2198C20.6649 14.8306 20.4844 14.4669 20.2367 14.151C19.9243 13.7574 19.4895 13.4487 18.6198 12.8313L16.5231 11.3905C16.1684 11.1442 15.9911 11.021 15.8121 10.917C14.7502 10.3656 13.5414 10.1382 12.342 10.2615C12.1449 10.2836 11.9499 10.3216 11.5599 10.3975L11.1783 10.4716C10.5662 10.5961 10.2601 10.6584 9.9659 10.7005C9.11741 10.8258 8.2588 10.7783 7.42708 10.5618C7.0956 10.4683 6.78841 10.3293 6.17403 10.0513L4.24407 9.07415C3.15456 8.58683 2.6098 8.34317 2.29678 8.49629C2.12633 8.57446 1.98569 8.70332 1.89399 8.86539C1.7 9.19299 1.7 9.76362 1.7 10.9049V12.7969" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          
          <div className="absolute -left-32 bottom-10 w-80 h-80 opacity-5">
            <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.5 9C8.22386 9 8 9.22386 8 9.5C8 9.77614 8.22386 10 8.5 10C8.77614 10 9 9.77614 9 9.5C9 9.22386 8.77614 9 8.5 9Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15.5 9C15.2239 9 15 9.22386 15 9.5C15 9.77614 15.2239 10 15.5 10C15.7761 10 16 9.77614 16 9.5C16 9.22386 15.7761 9 15.5 9Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 11.9997C2 7.28562 2 4.92856 3.46447 3.46409C4.92893 1.99963 7.28596 1.99963 12 1.99963C16.714 1.99963 19.0711 1.99963 20.5355 3.46409C22 4.92856 22 7.28562 22 11.9997C22 16.7137 22 19.0708 20.5355 20.5352C19.0711 21.9997 16.714 21.9997 12 21.9997C7.28596 21.9997 4.92893 21.9997 3.46447 20.5352C2 19.0708 2 16.7137 2 11.9997Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFF00] via-[#FF00FF] to-[#00FFFF]">
                How to Choose Your Perfect Camera
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Follow our expert guidance to find the camera that matches your needs, budget, and shooting style
            </p>
          </div>
          
          <div className="guide-content max-w-6xl mx-auto">
            {/* Step cards - modern layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Step 1 */}
              <div 
                className="relative overflow-hidden bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-white/5 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,0,0.15)] hover:border-[#FFFF00]/20 group"
              >
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFFF00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="flex items-start gap-6 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFFF00] to-[#DDAA00] text-black flex items-center justify-center font-bold text-2xl shrink-0 shadow-[0_0_20px_rgba(255,255,0,0.3)]">
                    1
                  </div>
                <div>
                    <h3 className="text-2xl font-bold mb-4 text-[#FFFF00]">Define Your Photography Needs</h3>
                    <p className="text-gray-300 mb-4">
                      Different cameras excel at different types of photography. Consider what you&apos;ll primarily shoot:
                    </p>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <span className="text-[#FFFF00]">•</span>
                        <span><strong>Landscape:</strong> High resolution, weather sealing</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[#FFFF00]">•</span>
                        <span><strong>Portrait:</strong> Shallow depth of field, skin tone reproduction</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[#FFFF00]">•</span>
                        <span><strong>Action:</strong> Fast autofocus, high burst rate</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[#FFFF00]">•</span>
                        <span><strong>Video:</strong> 4K resolution, stabilization, audio options</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div 
                className="relative overflow-hidden bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-white/5 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,0,255,0.15)] hover:border-[#FF00FF]/20 group"
              >
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF00FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="flex items-start gap-6 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF00FF] to-[#9900CC] text-black flex items-center justify-center font-bold text-2xl shrink-0 shadow-[0_0_20px_rgba(255,0,255,0.3)]">
                    2
                  </div>
                <div>
                    <h3 className="text-2xl font-bold mb-4 text-[#FF00FF]">Consider Your Budget Range</h3>
                    <p className="text-gray-300 mb-4">
                      Cameras come at every price point, each offering different features and capabilities:
                    </p>
                    <div className="space-y-3">
                      <div className="bg-black/30 p-3 rounded-lg">
                        <p className="font-semibold text-[#FF00FF] mb-1">Entry-Level: $400-800</p>
                        <p className="text-sm text-gray-300">Great for beginners, basic features, good image quality</p>
                      </div>
                      <div className="bg-black/30 p-3 rounded-lg">
                        <p className="font-semibold text-[#FF00FF] mb-1">Mid-Range: $800-1,500</p>
                        <p className="text-sm text-gray-300">Better build quality, improved autofocus, weather resistance</p>
                      </div>
                      <div className="bg-black/30 p-3 rounded-lg">
                        <p className="font-semibold text-[#FF00FF] mb-1">Professional: $1,500+</p>
                        <p className="text-sm text-gray-300">Top-tier performance, durability, specialized features</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div 
                className="relative overflow-hidden bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-white/5 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,255,255,0.15)] hover:border-[#00FFFF]/20 group"
              >
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00FFFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="flex items-start gap-6 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00FFFF] to-[#0088AA] text-black flex items-center justify-center font-bold text-2xl shrink-0 shadow-[0_0_20px_rgba(0,255,255,0.3)]">
                    3
                  </div>
                <div>
                    <h3 className="text-2xl font-bold mb-4 text-[#00FFFF]">Consider Size and Weight</h3>
                    <p className="text-gray-300 mb-4">
                      The camera&apos;s portability affects how likely you are to bring it with you:
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 flex-shrink-0 bg-black/30 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-[#00FFFF]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <p className="text-gray-300">
                          <strong className="text-[#00FFFF]">DSLR:</strong> Larger, heavier, but excellent ergonomics
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 flex-shrink-0 bg-black/30 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-[#00FFFF]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <p className="text-gray-300">
                          <strong className="text-[#00FFFF]">Mirrorless:</strong> Compact but powerful, excellent for travel
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 flex-shrink-0 bg-black/30 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-[#00FFFF]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <p className="text-gray-300">
                          <strong className="text-[#00FFFF]">Compact:</strong> Ultra-portable, fits in pocket, ideal for everyday
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 4 */}
              <div 
                className="relative overflow-hidden bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-white/5 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,255,0,0.15)] hover:border-[#00FF00]/20 group"
              >
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00FF00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="flex items-start gap-6 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00FF00] to-[#008800] text-black flex items-center justify-center font-bold text-2xl shrink-0 shadow-[0_0_20px_rgba(0,255,0,0.3)]">
                    4
                  </div>
                <div>
                    <h3 className="text-2xl font-bold mb-4 text-[#00FF00]">Research Available Lenses</h3>
                    <p className="text-gray-300 mb-4">
                      For interchangeable lens cameras, the lens ecosystem is crucial for your photography&apos;s future:
                    </p>
                    <div className="relative h-36 overflow-hidden rounded-xl bg-black/20">
                      <div className="absolute inset-0 flex items-center p-4 bg-gradient-to-r from-black/70 via-black/40 to-transparent">
                        <div className="space-y-3 max-w-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#00FF00]"></span>
                            <p className="text-sm text-gray-300">Wide selection of lenses for different needs</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#00FF00]"></span>
                            <p className="text-sm text-gray-300">Consider third-party options for better value</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#00FF00]"></span>
                            <p className="text-sm text-gray-300">Factor lens costs into your overall budget</p>
                          </div>
                        </div>
                      </div>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-16">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 py-3 px-8 rounded-xl bg-gradient-to-r from-[#FFFF00] via-[#FF00FF] to-[#00FFFF] hover:from-[#00FFFF] hover:via-[#FF00FF] hover:to-[#FFFF00] text-black font-bold transition-all duration-500 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,0,0.3)]"
              >
                Read Our Complete Camera Guide <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-20 bg-gray-800 relative overflow-hidden">
        {/* Neon light effect */}
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
                href="/" 
                className="bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] hover:from-[#00FFFF] hover:to-[#FF00FF] 
                text-black font-bold py-3 px-8 rounded-full transition-[background-color] duration-500 ease-in-out 
                transform hover:scale-105 hover:shadow-[0_0_25px_rgba(255,0,255,0.7)]"              >
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
      
      {/* Keyframe animations */}
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
