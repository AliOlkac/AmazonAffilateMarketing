'use client';

import Link from "next/link";
import { FaCamera, FaInfoCircle, FaStar, FaCheckCircle, FaAmazon, FaShoppingCart } from "react-icons/fa";
import { MdCompare, MdPhotoCamera, MdCameraAlt, MdVideocam, MdSettings, MdOutlineHistory } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Metadata for DSLR Cameras page - Metadata doesn't work in client components in Next.js, so we removed it
// export const metadata = {
//   title: "Best DSLR Cameras | 2025 Buying Guide",
//   description: "The best DSLR cameras of 2025, features, price comparison, and professional reviews.",
// };


// Most Popular DSLR Cameras Data
const popularDslrCameras = [
  {
    id: "pop1",
    name: "Canon EOS Rebel T7",
    image: "/images/cameras/hero-bg.webp",
    rating: 4.7,
    salesCount: "50,000+",
    price: "$479.00",
    key_features: [
      "24.1MP APS-C CMOS Sensor",
      "DIGIC 4+ Image Processor",
      "3.0\" 920k-Dot LCD Monitor",
      "Full HD 1080/30p Video Recording",
      "9-Point AF System",
      "ISO 100-6400, Up to 3 fps Shooting",
      "Built-in Wi-Fi and NFC"
    ],
    amazon_link: "https://www.amazon.com/Canon-Rebel-T7-18-55mm-II/dp/B07C2Z21X5"
  },
  {
    id: "pop2",
    name: "Canon EOS Rebel SL3 / 250D",
    image: "/images/cameras/hero-bg.webp",
    rating: 4.8,
    salesCount: "45,000+",
    price: "$699.00",
    category: "Entry-Level DSLR",
    key_features: [
      "24.1MP APS-C CMOS Sensor",
      "DIGIC 8 Image Processor",
      "3.0\" 1.04m-Dot Vari-Angle Touchscreen",
      "UHD 4K24p Video and 4K Time-Lapse Movie",
      "9-Point AF System with Dual Pixel CMOS AF",
      "ISO 100-25600, Up to 5 fps Shooting",
      "Built-in Wi-Fi and Bluetooth"
    ],
    amazon_link: "https://www.amazon.com/canon-rebel-18-55mm-lens-white/dp/b07qhpt781"
  },
  {
    id: "pop3",
    name: "Nikon D7500 DX-Format",
    image: "/images/cameras/hero-bg.webp",
    rating: 4.6,
    salesCount: "35,000+",
    price: "$996.95",
    category: "Enthusiast DSLR",
    key_features: [
      "20.9MP DX-Format CMOS Sensor",
      "EXPEED 5 Image Processor",
      "3.2\" 922k-Dot Tilting Touchscreen LCD",
      "4K UHD Video Recording at 30 fps",
      "51-Point AF System",
      "ISO 100-51200, Up to 8 fps Shooting",
      "AF-S DX NIKKOR 18-140mm f/3.5-5.6G ED VR Lens"
    ],
    amazon_link: "https://www.amazon.com/Nikon-20-9MP-Camera-18-140mm-3-5-5-6G/dp/B06Y5RTN1T"
  },
  {
    id: "pop4",
    name: "Canon EOS Rebel T100 / 4000D",
    image: "/images/cameras/hero-bg.webp",
    rating: 4.5,
    salesCount: "32,000+",
    price: "$447.05",
    category: "Budget DSLR",
    key_features: [
      "18MP APS-C CMOS Sensor",
      "DIGIC 4+ Image Processor",
      "3.0\" 920k-Dot LCD Monitor",
      "Full HD 1080p Video Recording at 30 fps",
      "9-Point AF System",
      "ISO 100-6400, Up to 3 fps Shooting",
      "Built-in Wi-Fi"
    ],
    amazon_link: "https://www.amazon.com/Canon-18-55mm-3-5-5-6-Grip-Pod-Professional/dp/B0C7WJ9B5B"
  },
  {
    id: "pop5",
    name: "Canon EOS Rebel T7 Bundle",
    image: "/images/cameras/hero-bg.webp",
    rating: 4.6,
    salesCount: "28,000+",
    price: "$449.00",
    category: "Value Bundle",
    key_features: [
      "24.1MP APS-C CMOS Sensor",
      "DIGIC 4+ Image Processor",
      "3.0\" 920k-Dot LCD Monitor",
      "Full HD 1080/30p Video Recording",
      "9-Point AF System",
      "ISO 100-6400 (Expandable to 12800)",
      "Includes 18-55mm Lens, Filters, and Accessories"
    ],
    amazon_link: "https://www.amazon.com/Canon-18-55mm-3-5-5-6-Filters-Professional/dp/B08BFHJX1J"
  }
];


// Sample DSLR camera data
const dslrCameras = [
    {
      id: 1,
      name: "Nikon D850",
      image: "/images/cameras/hero-bg.webp",
      rating: 4.9,
      description: "Best Overall DSLR: Professional-grade full-frame camera with exceptional resolution and versatility.",
      price: "$2,996.95",
      key_features: [
        "45.7MP FX-Format BSI CMOS Sensor",
        "EXPEED 5 Image Processor",
        "3.2\" 2.36m-Dot Tilting Touchscreen LCD",
        "4K UHD Video Recording at 30 fps",
        "Multi-CAM 20K 153-Point AF System",
        "Native ISO: 64-25600"
      ],
      pros: ["Excellent image quality", "Fast autofocus", "Great handling", "Good battery life", "Weather-sealed body"],
      cons: ["No in-body stabilization", "Heavy for extended use", "Limited 4K video options"],
      amazon_link: "https://www.amazon.com/Nikon-D850-Digital-Camera-20-9MP/dp/B077D7WZBX",
      detailed_description: "The Nikon D850 is a professional-grade full-frame DSLR that combines high resolution with impressive speed. Perfect for wildlife and sports photography, it offers professional-grade features in a durable body."
    },
    {
      id: 2,
      name: "Canon EOS 5D Mark IV",
      image: "/images/cameras/hero-bg.webp",
      rating: 4.8,
      description: "Best for Professional Photography: Versatile full-frame DSLR with excellent image quality and reliable performance.",
      price: "$2,699.00",
      key_features: [
        "30.4MP full-frame sensor",
        "DIGIC 6+ processor",
        "4K UHD video",
        "61-point AF system",
        "7fps continuous shooting"
      ],
      pros: ["Excellent image quality", "Great low-light performance", "Advanced video features", "Long battery life", "Robust build"],
      cons: ["Expensive", "Heavy body", "Limited AF points compared to mirrorless"],
      amazon_link: "https://www.amazon.com/Canon-EOS-5D-Mark-IV-Body/dp/B075F5N7WZ",
      detailed_description: "The Canon EOS 5D Mark IV is a versatile DSLR that combines high resolution with impressive speed. Perfect for wildlife and sports photography, it offers professional-grade features in a durable body."
    },
    {
      id: 3,
      name: "Canon EOS 90D",
      image: "/images/cameras/hero-bg.webp",
      rating: 4.7,
      description: "Best APS-C DSLR: High-resolution crop sensor camera with fast performance and excellent ergonomics.",
      price: "$1,199.00",
      key_features: [
        "32.5MP APS-C CMOS sensor",
        "DIGIC 8 processor",
        "4K video recording",
        "45-point AF system",
        "10fps continuous shooting"
      ],
      pros: ["Excellent image quality", "Fast autofocus", "Great handling", "Good battery life", "Weather-sealed body"],
      cons: ["No in-body stabilization", "Heavy for extended use", "Limited 4K video options"],
      amazon_link: "https://www.amazon.com/Canon-Digital-Camera-Black-3616C002/dp/B07WFQXN2Z",
      detailed_description: "The Canon EOS 90D is a versatile DSLR that combines high resolution with impressive speed. Perfect for wildlife and sports photography, it offers professional-grade features in a durable body."
    },
    {
      id: 4,
      name: "Nikon D7500",
      image: "/images/cameras/hero-bg.webp",
      rating: 4.7,
      description: "Best Mid-Range DSLR: Excellent balance of performance, features, and price for enthusiast photographers.",
      price: "$996.95",
      key_features: [
        "20.9MP APS-C sensor",
        "EXPEED 5 processor",
        "4K UHD video",
        "153-point AF system",
        "10fps continuous shooting"
      ],
      pros: ["Professional build quality", "Exceptional AF system", "Fast continuous shooting", "Deep buffer", "Excellent handling"],
      cons: ["No built-in flash", "Heavy body", "Expensive for APS-C"],
      amazon_link: "https://www.amazon.com/Nikon-D7500-Digital-Camera-Body/dp/B07FZ5XWZS",
      detailed_description: "The Nikon D7500 is a professional-grade APS-C DSLR that excels in fast-action photography. Its advanced autofocus system and robust build make it ideal for sports and wildlife photographers."
    },
    {
      id: 5,
      name: "Canon EOS Rebel T8i / 850D",
      image: "/images/cameras/hero-bg.webp",
      rating: 4.6,
      description: "Best Entry-Level DSLR: User-friendly camera with guided interface and solid image quality for beginners.",
      price: "$749.00",
      key_features: [
        "24.2MP APS-C sensor",
        "DIGIC 8 processor",
        "4K UHD video",
        "45-point AF system",
        "5fps continuous shooting"
      ],
      pros: ["Affordable full-frame", "Excellent image quality", "Vari-angle touchscreen", "Built-in GPS", "Good low-light performance"],
      cons: ["No 4K video", "Single card slot", "Basic AF system"],
      amazon_link: "https://www.amazon.com/Canon-EOS-Rebel-T8i-Digital-Camera/dp/B07FZ5XWZS",
      detailed_description: "The Canon EOS Rebel T8i is a user-friendly DSLR camera designed for beginners. It offers solid image quality, a vari-angle touchscreen, and guided shooting modes for easy photography."
    }
];



// Photography tips for DSLR cameras
const photographyTips = [
  {
    title: "Understanding the Exposure Triangle",
    content: "Learn to balance aperture, shutter speed, and ISO for perfectly exposed photos. Aperture controls depth of field, shutter speed manages motion, and ISO determines light sensitivity. Mastering this relationship is fundamental to DSLR photography."
  },
  {
    title: "Taking Advantage of RAW Format",
    content: "Shoot in RAW format instead of JPEG for maximum post-processing flexibility. RAW files contain all the image data captured by your sensor, allowing for extensive adjustments to white balance, exposure, and color without quality loss."
  },
  {
    title: "Mastering Manual Focus",
    content: "While autofocus is convenient, learning manual focusing techniques can be invaluable in certain situations like macro photography, low light conditions, or when seeking creative control over your focal point."
  },
  {
    title: "Using the Histogram",
    content: "Learn to read your camera&apos;s histogram to ensure proper exposure. This graphical representation of your image&apos;s tonal range helps you avoid blown highlights or crushed shadows that can&apos;t be recovered in post-processing."
  }
];

// DSLR camera categories and use cases
const cameraCategories = [
  {
    title: "Entry-Level DSLRs",
    description: "Perfect for beginners transitioning from smartphone or point-and-shoot photography. These cameras offer user-friendly interfaces, guided shooting modes, and excellent image quality at affordable prices.",
    examples: "Canon EOS Rebel series, Nikon D3500, Pentax K-70"
  },
  {
    title: "Mid-Range DSLRs",
    description: "Ideal for enthusiasts and semi-professionals looking for advanced features and better performance. These cameras typically offer improved autofocus systems, faster burst rates, and better low-light capabilities.",
    examples: "Canon EOS 90D, Nikon D7500, Pentax KP"
  },
  {
    title: "Professional DSLRs",
    description: "Designed for professional photographers who demand the utmost in image quality, durability, and performance. These cameras feature top-tier autofocus systems, rugged weather-sealed bodies, and exceptional image sensors.",
    examples: "Canon EOS 5D Mark IV, Nikon D850, Pentax K-1 Mark II"
  }
];

export default function DSLRCameras() {
  // State for card hover animations
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Refs for animations
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroButtonsRef = useRef(null);
  const introTitleRef = useRef(null);
  const introTextRef = useRef(null);
  const camerasWrapperRef = useRef(null);
  const cameraCardsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const guideSectionsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaSectionRef = useRef(null);
  const tipsRef = useRef(null);
  const categoriesRef = useRef(null);
  const historyRef = useRef(null);
  const parallaxBgRef = useRef(null);

  useEffect(() => {
    // Register ScrollTrigger plugin with GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Page loading animations
    const tl = gsap.timeline();

    // Hero section animations
    tl.from(heroTitleRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out"
    })
    .from(heroSubtitleRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.4")
    .from(heroButtonsRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.2");
    
    // Parallax effect for hero background
    if (parallaxBgRef.current) {
      gsap.to(parallaxBgRef.current, {
        scrollTrigger: {
          trigger: parallaxBgRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        y: 150,
        scale: 1.1,
        ease: "none"
      });
    }

    // Intro section animation
    gsap.from(introTitleRef.current, {
      scrollTrigger: {
        trigger: introTitleRef.current,
        start: "top 80%"
      },
      opacity: 0,
      y: 30,
      duration: 0.6
    });

    gsap.from(introTextRef.current, {
      scrollTrigger: {
        trigger: introTextRef.current,
        start: "top 80%"
      },
      opacity: 0,
      y: 30,
      duration: 0.6,
      delay: 0.2
    });

    // Camera cards animation
    gsap.from(camerasWrapperRef.current, {
      scrollTrigger: {
        trigger: camerasWrapperRef.current,
        start: "top 80%"
      },
      opacity: 0,
      y: 40,
      duration: 0.5
    });

    // Staggered animation for each camera card
    cameraCardsRefs.current.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%"
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        delay: index * 0.15, // Increasing delay for each card
        ease: "power3.out"
      });
    });

    // Staggered animation for guide sections
    guideSectionsRefs.current.forEach((section, index) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 85%"
        },
        opacity: 0,
        x: index % 2 === 0 ? -40 : 40, // Alternate entry directions
        duration: 0.7,
        delay: index * 0.1,
        ease: "power2.out"
      });
    });

    // Animation for tips section
    gsap.from(tipsRef.current, {
      scrollTrigger: {
        trigger: tipsRef.current,
        start: "top 80%"
      },
      opacity: 0,
      y: 30,
      duration: 0.6
    });

    // Animation for categories section
    gsap.from(categoriesRef.current, {
      scrollTrigger: {
        trigger: categoriesRef.current,
        start: "top 80%"
      },
      opacity: 0,
      y: 30,
      duration: 0.6
    });

    // Animation for history section
    gsap.from(historyRef.current, {
      scrollTrigger: {
        trigger: historyRef.current,
        start: "top 80%"
      },
      opacity: 0,
      y: 30,
      duration: 0.6
    });

    // CTA section animation
    gsap.from(ctaSectionRef.current, {
      scrollTrigger: {
        trigger: ctaSectionRef.current,
        start: "top 80%"
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out"
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Function to handle card hover animations
  const handleCardHover = (index: number | null) => {
    setHoveredCard(index);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-16">
      {/* Hero Section with Parallax Effect */}
      <section className="relative h-[100vh] md:h-[100vh] overflow-hidden flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-indigo-700/30 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/images/cameras/categories/dslr.webp)` }}
          ref={parallaxBgRef}
        ></div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-20 text-center">
          <h1 ref={heroTitleRef} className="text-4xl md:text-6xl font-bold text-white mb-6">DSLR Cameras</h1>
          <p ref={heroSubtitleRef} className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Find the perfect DSLR camera for your photography needs with our comprehensive 2025 buying guide
          </p>
          
          {/* Hero Buttons */}
          <div ref={heroButtonsRef} className="flex flex-wrap gap-4 justify-center">
            <a href="#top-cameras" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2">
              <FaCamera /> Explore Top Picks
            </a>
            <a href="#guide" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-all flex items-center gap-2">
              <FaInfoCircle /> Read Buying Guide
            </a>
          </div>
        </div>
      </section>

      {/* Introduction Section - Enhanced with more SEO content */}
      <section className="py-16 px-4 container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 ref={introTitleRef} className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">DSLR Cameras: The Foundation of Professional Photography</h2>
          <div ref={introTextRef} className="space-y-6">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              DSLR (Digital Single-Lens Reflex) cameras continue to be the primary choice for professional photographers with their interchangeable lenses, optical viewfinders, and advanced sensors. 
              These cameras offer superior image quality, fast performance, and a wide lens ecosystem, making them ideal choices for both professionals and beginners in photography.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              What sets DSLR cameras apart is their unique mirror mechanism that reflects light from the lens to an optical viewfinder, allowing photographers to see exactly what they&apos;re capturing in real-time without any digital delay or interpretation. This optical viewfinder experience remains a significant advantage for many photographers who prefer the direct optical connection to their subject.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Despite the rising popularity of mirrorless cameras, DSLRs maintain several advantages: longer battery life, extensive lens selections built up over decades, better handling with larger grips, and often more affordable prices for comparable image quality. The optical viewfinder also eliminates the need to constantly power a digital display, saving battery and providing a distraction-free viewing experience.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              On this page, you&apos;ll find the most preferred and best-performing DSLR cameras of 2025, 
              compare their features, and choose the model that best fits your budget and photography needs. Whether you&apos;re shooting landscapes, portraits, sports, or wildlife, there&apos;s a DSLR camera here that will help you capture stunning images.
            </p>
          </div>
        </div>
      </section>
      
      {/* Most Popular DSLR Cameras Section */}
      <section id="popular-cameras" className="py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-white">Most Popular DSLR Cameras</h2>
          <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            The best-selling DSLR cameras chosen by photographers worldwide, based on sales data and customer satisfaction
          </p>

          {/* Popular DSLR Camera Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularDslrCameras.map((camera, index) => (
              <div 
                key={camera.id} 
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 transform hover:shadow-xl hover:-translate-y-2"
              >
                {/* Camera Image */}
                <div className="h-64 overflow-hidden relative bg-gray-100 dark:bg-gray-700">
                  <Image 
                    src={camera.image} 
                    alt={camera.name}
                    fill
                    quality={90}
                    priority={index === 0}
                    className="object-contain p-4 transition-transform duration-300 hover:scale-110"
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 30vw"
                  />
                  
                  {/* Rating badge overlay */}
                  <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 py-1 px-3 rounded-full flex items-center gap-1 font-medium z-10">
                    <FaStar /> {camera.rating}
                  </div>
                  
                  {/* Category badge */}
                  {camera.category && (
                    <div className="absolute top-2 left-2 bg-blue-500 text-white py-1 px-3 rounded-full text-sm font-medium z-10">
                      {camera.category}
                    </div>
                  )}
                  
                  {/* Sales badge */}
                  <div className="absolute bottom-2 left-2 bg-green-500 text-white py-1 px-3 rounded-full text-sm font-medium z-10 flex items-center gap-1">
                    <FaShoppingCart /> {camera.salesCount} Sold
                  </div>
                </div>

                {/* Camera Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white group">
                    {camera.name}
                    <span className="block h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  </h3>
                  
                  {/* Price */}
                  <div className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                    {camera.price}
                  </div>
                  
                  {/* Key Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {camera.key_features.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Amazon Link */}
                  <a 
                    href={camera.amazon_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center gap-2 justify-center transition-all duration-300"
                  >
                    <FaAmazon /> View on Amazon
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top DSLR Cameras Section */}
      <section id="top-cameras" className="py-16 px-4 bg-white dark:bg-gray-800 rounded-t-[40px] shadow-lg">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-white">Best DSLR Cameras of 2025</h2>
          <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            The best DSLR cameras for different needs and budgets, selected based on our expert reviews and user experiences
          </p>

          {/* DSLR Camera Cards - Enhanced with hover animations */}
          <div ref={camerasWrapperRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dslrCameras.map((camera, index) => (
              <div 
                key={camera.id} 
                ref={el => {
                  cameraCardsRefs.current[index] = el;
                }}
                className={`bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 transform ${
                  hoveredCard === index ? 'scale-[1.02] shadow-2xl' : 'hover:shadow-xl hover:-translate-y-2'
                }`}
                onMouseEnter={() => handleCardHover(index)}
                onMouseLeave={() => handleCardHover(null)}
              >
                {/* Camera Image */}
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
                  {/* Rating badge overlay */}
                  <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 py-1 px-3 rounded-full flex items-center gap-1 font-medium z-10">
                    <FaStar className={`${hoveredCard === index ? 'animate-pulse' : ''}`} /> {camera.rating}
                  </div>
                </div>

                {/* Camera Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white group">
                    {camera.name}
                    <span className={`block h-0.5 bg-blue-500 transform scale-x-0 transition-transform duration-300 ${
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

                  {/* Detailed description that shows on hover */}
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
                      className={`px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center gap-2 transition-all duration-300 ${
                        hoveredCard === index ? 'bg-blue-600 shadow-lg' : ''
                      }`}
                    >
                      <FaAmazon className={hoveredCard === index ? 'animate-bounce' : ''} /> View on Amazon
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photography Tips Section - New section for SEO */}
      <section id="photography-tips" ref={tipsRef} className="py-16 px-4 bg-gray-100 dark:bg-gray-700">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Essential DSLR Photography Tips</h2>
          <p className="text-lg text-center mb-10 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master your DSLR camera with these professional tips and techniques that will help elevate your photography
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {photographyTips.map((tip, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                    <MdPhotoCamera className="text-blue-500 dark:text-blue-300 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{tip.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{tip.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DSLR Categories Section - New section for SEO */}
      <section id="dslr-categories" ref={categoriesRef} className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">DSLR Camera Categories</h2>
          <p className="text-lg text-center mb-10 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Understanding the different types of DSLR cameras and which one is right for your specific needs
          </p>
          
          <div className="space-y-8">
            {cameraCategories.map((category, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0 flex items-start justify-center">
                    <div className="bg-indigo-100 dark:bg-indigo-900 p-4 rounded-full">
                      <MdCameraAlt className="text-indigo-500 dark:text-indigo-300 text-3xl" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{category.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">{category.description}</p>
                    <div className="bg-gray-100 dark:bg-gray-600 p-3 rounded-lg">
                      <span className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Popular Models:</span>
                      <span className="text-gray-700 dark:text-gray-300">{category.examples}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History of DSLR Cameras Section - New section for SEO */}
      <section id="dslr-history" ref={historyRef} className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <MdOutlineHistory className="text-3xl text-blue-500 dark:text-blue-400" />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">The Evolution of DSLR Cameras</h2>
          </div>
          
          <div className="space-y-6 text-gray-600 dark:text-gray-300">
            <p className="text-lg">
              The history of DSLR cameras dates back to the late 1990s when digital technology began to merge with traditional SLR (Single-Lens Reflex) designs. The first commercially successful DSLR was the Nikon D1, released in 1999, which offered professional image quality in a familiar SLR form factor.
            </p>
            <p className="text-lg">
              Throughout the 2000s, DSLR technology rapidly advanced, with manufacturers like Canon, Nikon, and Pentax introducing models with increasing resolution, improved autofocus systems, and better low-light performance. The introduction of more affordable entry-level DSLRs like the Canon Digital Rebel (2003) helped democratize digital photography, making it accessible to enthusiasts beyond professional photographers.
            </p>
            <p className="text-lg">
              By the 2010s, DSLRs reached new heights with models like the Canon 5D Mark III and Nikon D800, which offered full-frame sensors, high resolution, and video capabilities that were good enough for professional filmmaking. These advancements cemented the DSLR&apos;s position as the tool of choice for serious photographers.
            </p>
            <p className="text-lg">
              While mirrorless cameras have gained popularity in recent years, DSLR cameras continue to evolve with models like the Nikon D850 and Canon 5D Mark IV offering unmatched reliability, battery life, and an extensive ecosystem of lenses and accessories. For many photographers, the optical viewfinder experience and tactile handling of DSLRs remain irreplaceable aspects of their creative process.
            </p>
          </div>
        </div>
      </section>

      {/* Buying Guide Section */}
      <section id="buying-guide" className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">DSLR Camera Buying Guide</h2>
          
          <div className="space-y-8">
            {[
              {
                title: "Sensor Size and Resolution",
                content: "DSLR cameras typically have APS-C or Full Frame sensors. Full Frame sensors are larger and offer better low-light performance, but are more expensive. Megapixel count determines the resolution of your photos, but higher megapixels don't always mean better image quality.",
                icon: <MdSettings />
              },
              {
                title: "Autofocus System",
                content: "A good autofocus system is critical, especially when shooting moving subjects. More AF points and cross-type AF sensors provide faster and more accurate focusing. Today&apos;s modern DSLRs also have advanced hybrid AF systems that work in live view mode.",
                icon: <MdCameraAlt />
              },
              {
                title: "Video Features",
                content: "If you&apos;ll be shooting video, it&apos;s important that the camera can record high-resolution video like 4K. Also, consider external microphone input, slow-motion capabilities, and video focusing performance.",
                icon: <MdVideocam />
              },
              {
                title: "Lens Ecosystem",
                content: "Available lens options for DSLR cameras vary between different brands. Large brands like Canon and Nikon have wider lens ecosystems. Make sure the appropriate lenses are available for the type of photography you want to do.",
                icon: <MdCompare />
              }
            ].map((section, index) => (
              <div 
                key={index}
                ref={el => {
                  guideSectionsRefs.current[index] = el;
                }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 p-3 rounded-lg h-fit">
                    <span className="text-blue-600 dark:text-blue-300 text-xl">
                      {section.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{section.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{section.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action - Redesigned to be more modern */}
      <section ref={ctaSectionRef} className="py-20 px-4 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-cyan-400 rounded-full filter blur-2xl"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-lg p-10 rounded-3xl border border-white/10 shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Capture Perfect Moments?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Find the ideal DSLR camera that matches your style, budget, and photographic ambitions. Start your journey to stunning photography today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#top-cameras" className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-full font-medium text-lg transition duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-600/30 flex items-center justify-center gap-2">
                <FaShoppingCart /> Explore Cameras
              </Link>
              <Link href="#buying-guide" className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full font-medium text-lg transition duration-300 backdrop-blur-sm flex items-center justify-center gap-2">
                <FaInfoCircle /> Read Buying Guide
              </Link>
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
