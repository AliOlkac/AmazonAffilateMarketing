"use client";

import Link from "next/link";
import { FaCamera, FaInfoCircle, FaStar, FaCheckCircle, FaAmazon, FaShoppingCart, FaEye, FaSlidersH } from "react-icons/fa";
import { MdPhotoCamera, MdCameraAlt, MdOutlineHistory, MdSettings } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Sample Compact camera data
const compactCameras = [
    {
      id: 1,
      name: "Sony RX100 VII",
      image: "/images/cameras/hero-bg.webp",
      rating: 4.8,
      description: "Best Premium Compact: Advanced 1-inch sensor compact camera with incredible autofocus, 4K video, and high-speed shooting capabilities.",
      price: "$1,299.99",
      key_features: [
        "20.1MP 1-inch sensor",
        "24-200mm f/2.8-4.5 lens",
        "4K 30p video",
        "Real-time tracking AF",
        "Pop-up EVF"
      ],
      pros: ["Excellent image quality", "Versatile zoom range", "Advanced AF system", "Compact size", "Great for both photos and videos"],
      cons: ["High price", "Complex menu system", "Small buttons"],
      amazon_link: "https://amazon.com/product-link",
      detailed_description: "The Sony RX100 VII is the ultimate pocket camera, combining professional-level features and image quality in an incredibly compact body."
    },
    {
      id: 2,
      name: "Fujifilm X100V",
      image: "/images/cameras/hero-bg.webp",
      rating: 4.9,
      description: "Best Fixed Lens Compact: Premium compact with APS-C sensor, hybrid viewfinder, and exceptional image quality in a stylish, weather-resistant body.",
      price: "$1,399.00",
      key_features: [
        "26.1MP X-Trans CMOS 4",
        "23mm f/2 lens",
        "4K 30p video",
        "Hybrid viewfinder",
        "Weather resistant"
      ],
      pros: ["Outstanding image quality", "Classic design", "Great ergonomics", "Film simulations", "Weather sealed"],
      cons: ["Fixed focal length", "Premium price", "Limited zoom capability"],
      amazon_link: "https://amazon.com/product-link",
      detailed_description: "The Fujifilm X100V combines classic design with modern technology, making it perfect for street photography and everyday carry."
    },
    {
      id: 3,
      name: "Ricoh GR III",
      image: "/images/cameras/hero-bg.webp",
      rating: 4.7,
      description: "Best Pocket Camera: Ultra-compact camera with APS-C sensor, sharp 28mm equivalent lens, and excellent street photography capabilities.",
      price: "$899.95",
      key_features: [
        "24.2MP APS-C sensor",
        "40mm equivalent lens",
        "3-axis stabilization",
        "Touch screen focus",
        "Snap focus feature"
      ],
      pros: ["Excellent image quality", "Ultra-compact size", "Fast operation", "Great ergonomics", "Perfect focal length"],
      cons: ["No viewfinder", "Limited video features", "Average battery life"],
      amazon_link: "https://amazon.com/product-link",
      detailed_description: "The Ricoh GR IIIx is a street photographer&apos;s dream, offering APS-C image quality in an incredibly compact body with an ideal 40mm equivalent lens."
    },
    {
      id: 4,
      name: "Canon PowerShot G5 X Mark II",
      image: "/images/cameras/hero-bg.webp",
      rating: 4.6,
      description: "Best All-Around Compact: Versatile compact camera with 1-inch sensor, pop-up EVF, and excellent zoom range for everyday photography.",
      price: "$899.00",
      key_features: [
        "20.1MP 1-inch sensor",
        "24-120mm f/1.8-2.8 lens",
        "4K 30p video",
        "Pop-up EVF",
        "Tilting touchscreen"
      ],
      pros: ["Great image quality", "Fast lens", "Good ergonomics", "Pop-up viewfinder", "Versatile zoom range"],
      cons: ["No weather sealing", "Limited buffer depth", "Average battery life"],
      amazon_link: "https://amazon.com/product-link",
      detailed_description: "The Canon PowerShot G5 X Mark II offers a perfect balance of features and portability for enthusiast photographers who want a capable compact camera."
    },
    {
      id: 5,
      name: "Panasonic LUMIX LX100 II",
      image: "/images/cameras/hero-bg.webp",
      rating: 4.7,
      description: "Best for Manual Control: Premium compact with Four Thirds sensor, Leica lens, and extensive physical controls for enthusiast photographers.",
      price: "$797.99",
      key_features: [
        "17MP Four Thirds sensor",
        "24-75mm f/1.7-2.8 lens",
        "4K 30p video",
        "EVF",
        "Dedicated exposure controls"
      ],
      pros: ["Excellent controls", "Fast lens", "Great image quality", "4K photo modes", "Compact size"],
      cons: ["Fixed screen", "No weather sealing", "Older sensor design"],
      amazon_link: "https://amazon.com/product-link",
      detailed_description: "The Panasonic Lumix LX100 II is perfect for photographers who love manual controls, offering a traditional shooting experience in a modern compact camera."
    }
];

// Popular Compact Cameras Data
const popularCompactCameras = [
  {
    id: 1,
    name: "Sony RX100 VII",
    image: "/images/cameras/hero-bg.webp",
    rating: 4.8,
    description: "Premium compact camera with exceptional autofocus and professional image quality",
    price: "$1,299.99",
    category: "Premium",
    salesCount: "105K+",
    key_features: [
      "20.1MP 1\" Exmor RS CMOS Sensor",
      "ZEISS® Vario-Sonnar T* 24-200mm Lens",
      "357-point phase-detection AF",
      "4K Video with S-Log3 & HLG",
      "20fps shooting with no blackout",
      "Real-time tracking & Eye AF",
      "0.02s autofocus acquisition",
      "Flip-up touchscreen LCD"
    ],
    pros: [
      "Exceptional image quality",
      "Professional-level autofocus",
      "Impressive zoom range",
      "Pocketable form factor"
    ],
    cons: [
      "Premium price point",
      "Limited battery life",
      "Somewhat complex menu system"
    ],
    amazon_link: "https://www.amazon.com/Sony-Cyber-shot-DSC-RX100-VII-Shooting/dp/B07VPQV7BY"
  },
  {
    id: 2,
    name: "Canon PowerShot G7 X Mark III",
    image: "/images/cameras/hero-bg.webp",
    rating: 4.6,
    description: "Versatile compact camera ideal for vlogging and content creation",
    price: "$749.00",
    category: "Advanced",
    salesCount: "120K+",
    key_features: [
      "20.1MP 1\" Stacked CMOS Sensor",
      "DIGIC 8 Image Processor",
      "24-100mm f/1.8-2.8 lens",
      "4K30p & 120p Full HD video",
      "Vertical video support",
      "Built-in ND filter",
      "Live streaming to YouTube",
      "Flip-up touchscreen"
    ],
    pros: [
      "Excellent for vlogging",
      "Great low-light performance",
      "Direct YouTube streaming",
      "Good build quality"
    ],
    cons: [
      "No viewfinder",
      "Middling battery life",
      "Contrast-detection AF only"
    ],
    amazon_link: "https://www.amazon.com/Canon-PowerShot-Digital-Camera-Streaming/dp/B07TKNCQZX"
  },
  {
    id: 3,
    name: "Ricoh GR III",
    image: "/images/cameras/hero-bg.webp",
    rating: 4.7,
    description: "Ultra-compact street photography camera with APS-C sensor",
    price: "$899.95",
    category: "Advanced",
    salesCount: "85K+",
    key_features: [
      "24.2MP APS-C CMOS Sensor",
      "GR Engine 6 Imaging Processor",
      "18.3mm f/2.8 lens (28mm equivalent)",
      "3-axis image stabilization",
      "Touchscreen LCD",
      "Hybrid autofocus system",
      "1080p30 video recording",
      "Pocket-sized design"
    ],
    pros: [
      "Extremely compact for an APS-C camera",
      "Outstanding image quality",
      "Perfect for street photography",
      "Intuitive controls"
    ],
    cons: [
      "No 4K video",
      "Fixed focal length",
      "Limited battery life"
    ],
    amazon_link: "https://www.amazon.com/Ricoh-Digital-Camera-Black-Standard/dp/B07NP4LCVS"
  },
  {
    id: 4,
    name: "Panasonic Lumix ZS200 / TZ200",
    image: "/images/cameras/hero-bg.webp",
    rating: 4.5,
    description: "Travel zoom compact with impressive 15x optical zoom",
    price: "$647.99",
    category: "Travel",
    salesCount: "95K+",
    key_features: [
      "20.1MP 1\" MOS Sensor",
      "LEICA DC 15x Zoom Lens (24-360mm)",
      "5-axis hybrid O.I.S stabilization",
      "4K video & 4K PHOTO",
      "0.21\" EVF with 2.33m-Dot",
      "3.0\" touchscreen LCD",
      "Focus stacking capability",
      "Wi-Fi & Bluetooth connectivity"
    ],
    pros: [
      "Exceptional zoom range",
      "Comfortable handling",
      "Good image quality",
      "Built-in EVF"
    ],
    cons: [
      "Lens aperture not as bright at telephoto",
      "Fixed LCD screen",
      "AF can struggle in low light"
    ],
    amazon_link: "https://www.amazon.com/PANASONIC-Megapixel-High-Resolution-Viewfinder-DC-ZS200S/dp/B079M64SQF"
  },
  {
    id: 5,
    name: "Fujifilm X100V",
    image: "/images/cameras/hero-bg.webp",
    rating: 4.9,
    description: "Premium compact with APS-C sensor and unique hybrid viewfinder",
    price: "$1,399.00",
    category: "Premium",
    salesCount: "110K+",
    key_features: [
      "26.1MP APS-C X-Trans CMOS 4 Sensor",
      "X-Processor 4 image processor",
      "23mm f/2 lens (35mm equivalent)",
      "Hybrid optical/electronic viewfinder",
      "4K30p video recording",
      "Built-in ND filter",
      "Weather-resistant construction",
      "Classic film simulation modes"
    ],
    pros: [
      "Outstanding image quality",
      "Beautiful retro design",
      "Unique hybrid viewfinder",
      "Excellent JPEG colors"
    ],
    cons: [
      "Fixed focal length",
      "Premium price",
      "Video features not as advanced"
    ],
    amazon_link: "https://www.amazon.com/Fujifilm-X100V-Digital-Camera-Silver/dp/B084B6D63Y"
    }
];

// Photography tips for Compact cameras
const photographyTips = [
  {
    title: "Maximizing Pocket Cameras",
    content: "Always carry your compact camera with you - the best camera is the one you have. Use wrist straps for security and quick access, and consider a small protective case."
  },
  {
    title: "Working with Limited Zoom",
    content: "With fixed or limited zoom lenses, practice &apos;zoom with your feet&apos; - move closer or further from your subject to compose. This can actually improve your photography skills."
  },
  {
    title: "Low Light Photography",
    content: "Use faster apertures and image stabilization to your advantage in low light. Many compact cameras have excellent fast lenses - learn to use them effectively."
  },
  {
    title: "Street Photography Techniques",
    content: "Use zone focusing and snap focus features for quick shots. Learn to be discreet and anticipate moments - compact cameras are perfect for candid photography."
  }
];

// Compact camera categories and use cases
const cameraCategories = [
  {
    title: "Premium Compacts",
    description: "High-end compact cameras with larger sensors and professional features, perfect for serious photographers who need portability.",
    examples: "Sony RX100 VII, Fujifilm X100V"
  },
  {
    title: "Street Photography",
    description: "Compact cameras designed for discreet shooting with fast lenses and quick operation.",
    examples: "Ricoh GR IIIx, Fujifilm X100V"
  },
  {
    title: "Travel Photography",
    description: "Versatile compact cameras with good zoom range and all-around capabilities.",
    examples: "Canon PowerShot G5 X Mark II, Sony RX100 VII"
  }
];

export default function CompactCameras() {
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
  const guideSectionsRefs = useRef<(HTMLDivElement | null)[]>([]); // Rehber bölümleri için referans
  const ctaSectionRef = useRef(null);
  const tipsRef = useRef(null);
  const categoriesRef = useRef(null);
  const historyRef = useRef(null);
  const parallaxBgRef = useRef(null);

  // Handle camera card hover
  const handleCardHover = (index: number | null) => {
    setHoveredCard(index);
  };

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Animation timeline
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

    // Camera cards animation for the container
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
      if (card) {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%"
          },
          opacity: 0,
          y: 50,
          duration: 0.6,
          delay: index * 0.15, // Kademeli gecikmeli animasyon
          ease: "power3.out"
        });
      }
    });

    // Staggered animation for guide sections
    guideSectionsRefs.current.forEach((section, index) => {
      if (section) {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 85%"
          },
          opacity: 0,
          x: index % 2 === 0 ? -40 : 40, // Farklı yönlerden giriş efekti
          duration: 0.7,
          delay: index * 0.1,
          ease: "power2.out"
        });
      }
    });

    // Animation for tips section
    if (tipsRef.current) {
    gsap.from(tipsRef.current, {
      scrollTrigger: {
        trigger: tipsRef.current,
        start: "top 80%"
      },
      opacity: 0,
      y: 30,
      duration: 0.6
    });
    }

    // Animation for categories section
    if (categoriesRef.current) {
    gsap.from(categoriesRef.current, {
      scrollTrigger: {
        trigger: categoriesRef.current,
        start: "top 80%"
      },
      opacity: 0,
      y: 30,
      duration: 0.6
    });
    }

    // Animation for history section
    if (historyRef.current) {
    gsap.from(historyRef.current, {
      scrollTrigger: {
        trigger: historyRef.current,
        start: "top 80%"
      },
      opacity: 0,
      y: 30,
      duration: 0.6
    });
    }

    // CTA section animation
    if (ctaSectionRef.current) {
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
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-16">
      {/* Hero Section with Parallax Effect */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden flex items-center justify-center">
        {/* Background Image with Overlay - Sarı tonlu overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-700/30 to-amber-600/30 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/images/cameras/hero-bg.webp)` }}
          ref={parallaxBgRef}
        ></div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-20 text-center">
          <h1 ref={heroTitleRef} className="text-4xl md:text-6xl font-bold text-white mb-6">Compact Cameras</h1>
          <p ref={heroSubtitleRef} className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Discover the perfect pocket-sized cameras with professional features and exceptional image quality
          </p>
          
          {/* Hero Buttons - Sarı tonlarda butonlar */}
          <div ref={heroButtonsRef} className="flex flex-wrap gap-4 justify-center">
            <a href="#top-cameras" className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2">
              <FaCamera /> Explore Top Picks
            </a>
            <a href="#guide" className="bg-transparent border-2 border-amber-400 text-amber-400 px-6 py-3 rounded-full font-medium hover:bg-amber-400/10 transition-all flex items-center gap-2">
              <FaInfoCircle /> Read Buying Guide
            </a>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 px-4 container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 ref={introTitleRef} className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Compact Cameras: Portable Photography Excellence</h2>
          <div ref={introTextRef} className="space-y-6">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Compact cameras offer a perfect balance of portability and image quality, making them ideal for travelers, street photographers, and everyday use. Despite their small size, modern compact cameras deliver impressive performance with features previously found only in larger camera systems.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              The main advantage of compact cameras is their convenience. They slip easily into a pocket or small bag, yet offer significant upgrades over smartphone photography with larger sensors, optical zoom capabilities, and dedicated photographic controls for more creative flexibility.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Today&apos;s premium compact cameras often feature 1-inch or even larger sensors, bright lenses with wide apertures, 4K video recording, and advanced autofocus systems. They represent a compelling option for those who want quality images without the bulk and complexity of interchangeable lens systems.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Whether you&apos;re looking for your first dedicated camera or a capable backup to your DSLR or mirrorless system, compact cameras offer surprising capabilities in remarkably small packages.
            </p>
          </div>
        </div>
      </section>

      {/* Most Popular Compact Cameras Section */}
      <section id="popular-cameras" className="py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-white">Most Popular Compact Cameras</h2>
          <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            The best-selling compact cameras with professional features in pocket-sized bodies, based on global sales data
          </p>

          {/* Popular Compact Camera Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={camerasWrapperRef}>
            {popularCompactCameras.map((camera, index) => (
              <div 
                key={camera.id} 
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 transform hover:shadow-xl hover:-translate-y-2"
                ref={(el) => {
                  if (cameraCardsRefs.current) {
                    cameraCardsRefs.current[index] = el;
                  }
                }}
                onMouseEnter={() => handleCardHover(index)}
                onMouseLeave={() => handleCardHover(null)}
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
                  <div className="absolute top-2 left-2 bg-blue-500 text-white py-1 px-3 rounded-full text-sm font-medium z-10">
                    {camera.category}
                  </div>
                  
                  {/* Sales badge */}
                  <div className="absolute bottom-2 left-2 bg-green-500 text-white py-1 px-3 rounded-full text-sm font-medium z-10 flex items-center gap-1">
                    <FaShoppingCart /> {camera.salesCount} Sold
                  </div>
                </div>

                {/* Camera Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white group">
                    {camera.name}
                    <span className={`block h-0.5 bg-blue-500 transform transition-transform duration-300 ${
                      hoveredCard === index ? 'scale-x-100' : 'scale-x-0'
                    }`}></span>
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
                        <li key={idx} className={`flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300 transition-transform duration-300 ${
                          hoveredCard === index ? `transform translate-x-${idx+1}` : ''
                        }`}>
                          <FaCheckCircle className={`text-green-500 mt-1 flex-shrink-0 ${
                            hoveredCard === index ? 'animate-pulse' : ''
                          }`} />
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
                    className={`w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center gap-2 justify-center transition-all duration-300 ${
                      hoveredCard === index ? 'bg-orange-600 shadow-lg' : ''
                    }`}
                  >
                    <FaAmazon /> View on Amazon
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Compact Cameras Section */}
      <section id="top-cameras" className="py-16 px-4 bg-white dark:bg-gray-800 rounded-t-[40px] shadow-lg">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-white">
            Best 5 Compact Cameras for Every Photographer
          </h2>
          <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From street photography to travel, find the perfect compact camera for your style
          </p>

          {/* Camera Cards */}
          <div ref={camerasWrapperRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {compactCameras.map((camera, index) => (
              <div 
                key={camera.id}
                onMouseEnter={() => handleCardHover(index)}
                onMouseLeave={() => handleCardHover(null)}
                className={`bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 transform ${
                  hoveredCard === index ? 'scale-[1.02] shadow-2xl' : 'hover:shadow-xl hover:-translate-y-2'
                }`}
              >
                <div className="absolute top-2 left-2 bg-yellow-600 text-white py-1 px-3 rounded-full text-sm font-medium z-10">
                  {index === 0 && "Best Overall"}
                  {index === 1 && "Best Fixed Lens"}
                  {index === 2 && "Best for Street"}
                  {index === 3 && "Best Enthusiast"}
                  {index === 4 && "Best Manual Control"}
                </div>
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
                    <span className={`block h-0.5 bg-yellow-500 transform scale-x-0 transition-transform duration-300 ${
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
                          <FaCheckCircle className={`text-yellow-500 mt-1 flex-shrink-0 ${
                            hoveredCard === index ? 'animate-bounce' : ''
                          }`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Detailed description */}
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
                      className={`px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg flex items-center gap-2 transition-all duration-300 ${
                        hoveredCard === index ? 'bg-yellow-600 shadow-lg' : ''
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

      {/* Tips Section */}
      <section id="photography-tips" className="py-16 px-4 bg-gray-100 dark:bg-gray-700" ref={tipsRef}>
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            Compact Camera Tips & Techniques
          </h2>
          <p className="text-lg text-center mb-10 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master your compact camera with these essential tips for better photography
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {photographyTips.map((tip, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full">
                    <MdPhotoCamera className="text-yellow-500 dark:text-yellow-300 text-xl" />
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

      {/* Categories Section */}
      <section id="compact-categories" className="py-16 px-4 bg-white dark:bg-gray-800" ref={categoriesRef}>
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            Compact Camera Categories
          </h2>
          <p className="text-lg text-center mb-10 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Find the perfect compact camera for your photography style
          </p>
          
          <div className="space-y-8">
            {cameraCategories.map((category, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0 flex items-start justify-center">
                    <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-full">
                      <MdCameraAlt className="text-yellow-500 dark:text-yellow-300 text-3xl" />
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

      {/* History Section */}
      <section id="compact-history" className="py-16 px-4 bg-gray-50 dark:bg-gray-900" ref={historyRef}>
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <MdOutlineHistory className="text-3xl text-yellow-500 dark:text-yellow-400" />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">The Evolution of Compact Cameras</h2>
          </div>
          
          <div className="space-y-6 text-gray-600 dark:text-gray-300">
            <p className="text-lg">
              Compact cameras have come a long way from their point-and-shoot origins. The introduction of larger sensors and advanced features has transformed them into serious photographic tools.
            </p>
            <p className="text-lg">
              The rise of premium compact cameras like the Sony RX100 series and Fujifilm X100 series showed that professional image quality could be achieved in a pocket-sized camera.
            </p>
            <p className="text-lg">
              Today&apos;s compact cameras continue to push boundaries with features like phase-detect autofocus, 4K video, and computational photography, making them more capable than ever before.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-yellow-700 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-yellow-400 rounded-full filter blur-2xl"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-lg p-10 rounded-3xl border border-white/10 shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Go Compact?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Find the perfect compact camera that fits your style and never miss a moment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#top-cameras" className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-pink-600 hover:from-yellow-600 hover:to-pink-700 rounded-full font-medium text-lg transition duration-300 shadow-lg shadow-purple-500/20 hover:shadow-purple-600/30 flex items-center justify-center gap-2">
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

      {/* Compact Camera Buying Guide */}
      <section id="buying-guide" className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-10 text-gray-800 dark:text-white text-center">Compact Camera Buying Guide</h2>
          
          <div className="space-y-8">
            {[
              {
                title: "Sensor Size",
                content: "Compact cameras come with varying sensor sizes from 1/2.3\" (smallest) to 1\" to APS-C (largest). Larger sensors generally produce better image quality and low-light performance, but make the camera larger and more expensive.",
                icon: <MdSettings className="text-2xl" />
              },
              {
                title: "Zoom Range vs. Lens Quality",
                content: "Consider the trade-off between zoom range and lens quality. Cameras with extensive zoom ranges often compromise on lens quality and maximum aperture. Fixed-lens compacts often have superior optics but no zoom flexibility.",
                icon: <MdCameraAlt className="text-2xl" />
              },
              {
                title: "Viewfinder Options",
                content: "Some premium compacts offer electronic viewfinders (EVFs) which can be invaluable in bright sunlight. Consider whether a built-in EVF, pop-up EVF, or LCD-only design meets your shooting style needs.",
                icon: <FaEye className="text-2xl" />
              },
              {
                title: "Controls & Customization",
                content: "Advanced users should look for cameras with manual controls and customizable buttons. Premium compacts often offer DSLR-like control wheels and function buttons that streamline your shooting experience.",
                icon: <FaSlidersH className="text-2xl" />
              }
            ].map((section, index) => (
              <div key={index} ref={(el) => {
                if (guideSectionsRefs.current) {
                  guideSectionsRefs.current[index] = el;
                }
              }}>
                <div className="flex gap-5 items-start bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex-shrink-0 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 p-3 rounded-lg">
                    <span className="text-purple-600 dark:text-purple-300 text-xl">
                      {section.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{section.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{section.content.replace("'", "&apos;")}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 