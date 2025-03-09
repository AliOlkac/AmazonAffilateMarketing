"use client";

import Link from "next/link";
import { FaCamera, FaInfoCircle, FaStar, FaCheckCircle, FaAmazon, FaShoppingCart } from "react-icons/fa";
import { MdPhotoCamera, MdCameraAlt, MdOutlineHistory, MdSettings } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Sample Mirrorless camera data
const mirrorlessCameras = [
    {
      id: 1,
      name: "Sony α1 II",
      image: "/images/cameras/sony-a1-ii.jpg",
      rating: 4.9,
      description: "Best Professional Mirrorless: Flagship camera with exceptional resolution, speed, and video capabilities for professionals.",
      price: "$6,500+",
      key_features: [
        "50MP full-frame sensor",
        "8K video",
        "30fps continuous shooting",
        "Advanced AI-powered AF",
        "Robust professional build quality"
      ],
      pros: ["Exceptional resolution", "Incredible speed", "Professional video features", "Best-in-class AF", "Dual card slots"],
      cons: ["Very expensive", "Complex menu system", "Learning curve for new users"],
      amazon_link: "https://amazon.com/product-link",
      detailed_description: "A professional-grade powerhouse designed for studio photographers, sports photographers, and professional video production. The ultimate hybrid shooting tool for demanding professionals."
    },
    {
      id: 2,
      name: "Sony α7 IV",
      image: "/images/cameras/sony-a7-iv.jpg",
      rating: 4.8,
      description: "Best All-Around Mirrorless: Versatile full-frame camera with excellent image quality and advanced features for enthusiasts and professionals.",
      price: "$2,400-2,600",
      key_features: [
        "33MP full-frame sensor",
        "Advanced autofocus",
        "4K 60p video",
        "Creative shooting modes",
        "10-bit 4:2:2 video"
      ],
      pros: ["Excellent image quality", "Best autofocus system on market", "Great dynamic range", "Professional video capabilities", "Good battery life"],
      cons: ["Rolling shutter in video", "Complex menu system", "Relatively heavy"],
      amazon_link: "https://amazon.com/product-link",
      detailed_description: "According to WIRED, offers excellent dynamic range and the best autofocus system on the market. Perfect for professional photographers, portrait photographers, and serious video creators."
    },
    {
      id: 3,
      name: "Nikon Z7 II",
      image: "/images/cameras/nikon-z7-ii.jpg",
      rating: 4.8,
      description: "Best for Landscape Photography: High-resolution mirrorless camera with exceptional dynamic range and detail rendering.",
      price: "$2,800-3,000",
      key_features: [
        "45.7MP full-frame sensor",
        "Base ISO 64",
        "Dual processors",
        "5-axis image stabilization",
        "4K 60p video"
      ],
      pros: ["Exceptional detail", "Excellent dynamic range", "Robust weather sealing", "Good ergonomics", "Improved AF system"],
      cons: ["Buffer limitations", "Limited native lens options", "AF tracking not best-in-class"],
      amazon_link: "https://amazon.com/product-link",
      detailed_description: "With its high-resolution sensor and base ISO of 64, the Nikon Z7 II is the ultimate tool for landscape photographers, studio photographers, and other detail-oriented shooters."
    },
    {
      id: 4,
      name: "Fujifilm X-T30 II",
      image: "/images/cameras/fujifilm-x-t30-ii.jpg",
      rating: 4.7,
      description: "Best Mid-Range APS-C: Compact camera with excellent image quality, film simulations, and impressive performance in a smaller body.",
      price: "$900-1,000",
      key_features: [
        "26MP APS-C sensor",
        "4K video",
        "Film simulations",
        "Fast autofocus system",
        "Classic retro design"
      ],
      pros: ["Excellent image quality", "Compact size", "Great color reproduction", "Good value for money", "Intuitive controls"],
      cons: ["No in-body stabilization", "Limited battery life", "Small grip"],
      amazon_link: "https://amazon.com/product-link",
      detailed_description: "The perfect travel and street photography camera with Fujifilm's renowned color science and film simulations in a compact, affordable package."
    },
    {
      id: 5,
      name: "Olympus OM-D E-M10 Mark IV",
      image: "/images/cameras/olympus-om-d-e-m10-mark-iv.jpg",
      rating: 4.6,
      description: "Best Entry-Level Mirrorless: Compact, feature-rich Micro Four Thirds camera with excellent stabilization and user-friendly interface.",
      price: "$700-800",
      key_features: [
        "20MP Micro Four Thirds sensor",
        "5-axis image stabilization",
        "4K video",
        "Flip-down selfie screen",
        "Lightweight design"
      ],
      pros: ["Excellent stabilization", "Compact and lightweight", "Good image quality", "Feature-rich for beginners", "Affordable price"],
      cons: ["Smaller sensor than APS-C", "Limited low-light performance", "Basic AF system"],
      amazon_link: "https://amazon.com/product-link",
      detailed_description: "According to Wirecutter, the best mirrorless camera for most people. Perfect for photography beginners and those seeking a lightweight and compact camera system."
    }
];

// Photography tips for Mirrorless cameras
const photographyTips = [
  {
    title: "Making the Most of Electronic Viewfinder",
    content: "Take advantage of the EVF's real-time exposure preview and focus peaking features. This allows you to see exactly how your image will look before taking the shot, helping you achieve perfect exposure and focus every time."
  },
  {
    title: "Customizing Function Buttons",
    content: "Mirrorless cameras offer extensive customization options. Set up your function buttons for quick access to frequently used settings like ISO, white balance, or focus modes to speed up your workflow."
  },
  {
    title: "Using Eye AF Effectively",
    content: "Modern mirrorless cameras excel at eye detection autofocus. Enable Eye AF for portraits to ensure sharp focus on your subject's eyes, even when shooting with shallow depth of field."
  },
  {
    title: "Managing Battery Life",
    content: "Mirrorless cameras typically have shorter battery life than DSLRs. Carry spare batteries and learn to use power-saving features like airplane mode and auto LCD/EVF switching to extend shooting time."
  }
];

// Mirrorless camera categories and use cases
const cameraCategories = [
  {
    title: "Entry-Level Mirrorless",
    description: "Perfect for photographers transitioning from smartphones or basic cameras. These models offer excellent image quality and basic features in a compact, user-friendly package.",
    examples: "Sony A6100, Canon EOS RP, Fujifilm X-T200"
  },
  {
    title: "Mid-Range Mirrorless",
    description: "Ideal for enthusiast photographers seeking advanced features and better performance. These cameras offer excellent autofocus, improved image quality, and robust video capabilities.",
    examples: "Sony A7 IV, Canon EOS R6, Fujifilm X-T5"
  },
  {
    title: "Professional Mirrorless",
    description: "Built for professional photographers and videographers who demand the ultimate in image quality and features. These cameras offer top-tier sensors, advanced AF systems, and professional video capabilities.",
    examples: "Sony A1, Canon EOS R3, Nikon Z9"
  }
];

// Popular Mirrorless Cameras Data
const popularMirrorlessCameras = [
  {
    id: 1,
    name: "Canon EOS R50",
    image: "/images/cameras/canon-eos-r50.jpg",
    rating: 4.8,
    description: "Compact and capable mirrorless camera for beginners and content creators",
    price: "$800-900",
    category: "Entry-Mid",
    salesCount: "95K+",
    key_features: [
      "24.2MP APS-C sensor",
      "4K video",
      "Smartphone connectivity",
      "Vari-angle touchscreen",
      "Dual Pixel CMOS AF"
    ],
    pros: [
      "Compact and lightweight",
      "User-friendly interface",
      "Excellent autofocus",
      "Good image quality"
    ],
    cons: [
      "Limited battery life",
      "Limited native RF-S lens options",
      "No in-body stabilization"
    ],
    amazon_link: "https://www.amazon.com/Canon-Mirrorless-RF-S18-45mm-Smartphone-Connection/dp/B0BTTV6CT1/"
  },
  {
    id: 2,
    name: "Canon EOS R6 Mark II",
    image: "/images/cameras/canon-eos-r6-mark-ii.jpg",
    rating: 4.7,
    description: "High-performance full-frame mirrorless for professionals and serious enthusiasts",
    price: "$2,500-2,700",
    category: "Professional",
    salesCount: "75K+",
    key_features: [
      "24.2MP full-frame sensor",
      "40fps electronic shutter",
      "6K oversampling",
      "Dual Pixel CMOS AF II",
      "In-body image stabilization"
    ],
    pros: [
      "Exceptional autofocus",
      "Fast burst shooting",
      "Excellent image quality",
      "Professional video features"
    ],
    cons: [
      "Higher price point",
      "Battery life could be better",
      "Limited buffer with RAW files"
    ],
    amazon_link: "https://www.amazon.com/Canon-EOS-Mark-Mirrorless-Oversampling/dp/B0BL7ZVY78/"
  },
  {
    id: 3,
    name: "Sony Alpha ZV-E10",
    image: "/images/cameras/sony-alpha-zv-e10.jpg",
    rating: 4.6,
    description: "Vlog-focused mirrorless camera with excellent video features for content creators",
    price: "$700-800",
    category: "Entry-Mid",
    salesCount: "120K+",
    key_features: [
      "24.2MP APS-C sensor",
      "Flip-out screen",
      "Product showcase mode",
      "Directional 3-capsule mic",
      "Real-time Eye AF"
    ],
    pros: [
      "Excellent autofocus",
      "Great video quality",
      "Specialized vlogging features",
      "Compact size"
    ],
    cons: [
      "No viewfinder",
      "Limited battery life",
      "No in-body stabilization"
    ],
    amazon_link: "https://www.amazon.com/Sony-Alpha-ZV-E10-Interchangeable-Mirrorless/dp/B09BBLH4SG/"
  },
  {
    id: 4,
    name: "Sony Alpha a6400",
    image: "/images/cameras/sony-alpha-a6400.jpg",
    rating: 4.7,
    description: "Fast and capable APS-C mirrorless with excellent autofocus and 4K video",
    price: "$900-1,000",
    category: "Mid-Range",
    salesCount: "110K+",
    key_features: [
      "24.2MP APS-C sensor",
      "180° rotating screen",
      "4K video",
      "Real-time Eye AF",
      "425-point phase-detection AF"
    ],
    pros: [
      "Excellent autofocus tracking",
      "High-quality 4K video",
      "Compact and lightweight",
      "Weather-sealed construction"
    ],
    cons: [
      "No in-body stabilization",
      "Somewhat limited buffer",
      "Complex menu system"
    ],
    amazon_link: "https://www.amazon.com/Sony-Alpha-a6400-Mirrorless-Camera/dp/B07MV3P7M8/"
  },
  {
    id: 5,
    name: "Sony Alpha a7 III",
    image: "/images/cameras/sony-alpha-a7-iii.jpg",
    rating: 4.8,
    description: "Popular full-frame mirrorless with excellent all-around performance",
    price: "$1,800-2,000",
    category: "Advanced-Professional",
    salesCount: "150K+",
    key_features: [
      "24.2MP full-frame sensor",
      "5-axis image stabilization",
      "4K HDR video",
      "693-point AF system",
      "10fps continuous shooting"
    ],
    pros: [
      "Excellent dynamic range",
      "Great low-light performance",
      "Fast and reliable autofocus",
      "Good battery life"
    ],
    cons: [
      "Dated menu system",
      "Average EVF resolution",
      "Limited touchscreen functionality"
    ],
    amazon_link: "https://www.amazon.com/Sony-Full-frame-Mirrorless-Interchangeable-Lens-ILCE7M3K/dp/B07B45D8WV/"
  }
];

export default function MirrorlessCameras() {
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
          delay: index * 0.15,
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
          x: index % 2 === 0 ? -40 : 40,
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
      <section className="relative h-[100vh] md:h-[100vh] overflow-hidden flex items-center justify-center">
        {/* Background Image with Overlay - Mavi-indigo tonlu overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-indigo-700/30 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/images/cameras/categories/mirrorless.webp)` }}
          ref={parallaxBgRef}
        ></div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-20 text-center">
          <h1 ref={heroTitleRef} className="text-4xl md:text-6xl font-bold text-white mb-6">Mirrorless Cameras</h1>
          <p ref={heroSubtitleRef} className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Discover the perfect balance of power and portability with our comprehensive mirrorless camera guide
          </p>
          
          {/* Hero Buttons - Mavi-indigo tonlarda butonlar */}
          <div ref={heroButtonsRef} className="flex flex-wrap gap-4 justify-center">
            <a href="#top-cameras" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2">
              <FaCamera /> Explore Top Picks
            </a>
            <a href="#guide" className="bg-transparent border-2 border-indigo-400 text-indigo-400 px-6 py-3 rounded-full font-medium hover:bg-indigo-400/10 transition-all flex items-center gap-2">
              <FaInfoCircle /> Read Buying Guide
            </a>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 px-4 container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 ref={introTitleRef} className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Mirrorless Cameras: The Future of Photography</h2>
          <div ref={introTextRef} className="space-y-6">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Mirrorless cameras represent the cutting edge of digital photography technology, offering DSLR-level image quality in a more compact and lightweight form factor. By eliminating the mirror mechanism found in DSLRs, these cameras can be smaller while still accepting interchangeable lenses.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              The key advantage of mirrorless cameras is their electronic viewfinder (EVF), which shows you exactly what the sensor captures, including exposure, white balance, and depth of field in real-time. This &quot;what-you-see-is-what-you-get&quot; approach makes photography more intuitive.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Modern mirrorless cameras excel in video recording capabilities, often offering 4K or even 8K video, in-body image stabilization, and advanced autofocus with eye and face detection. These features make them ideal for both photographers and content creators who need versatility.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Whether you&apos;re a professional photographer looking to lighten your gear bag or an enthusiast seeking the latest technology, mirrorless cameras offer compelling advantages that make them worth serious consideration.
            </p>
          </div>
        </div>
      </section>

      {/* Most Popular Mirrorless Cameras Section */}
      <section id="popular-cameras" className="py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-white">Most Popular Mirrorless Cameras</h2>
          <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            The best-selling mirrorless cameras with exceptional performance and features, based on global sales data
          </p>

          {/* Popular Mirrorless Camera Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={camerasWrapperRef}>
            {popularMirrorlessCameras.map((camera, index) => (
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

      {/* Top Mirrorless Cameras Section */}
      <section id="top-cameras" className="py-16 px-4 bg-white dark:bg-gray-800 rounded-t-[40px] shadow-lg">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-white">
            Best 5 Mirrorless Cameras for Every Need
          </h2>
          <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From professional photography to travel, find the perfect mirrorless camera for your specific needs
          </p>

          {/* Camera Cards */}
          <div ref={camerasWrapperRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mirrorlessCameras.map((camera, index) => (
              <div 
                key={camera.id}
                onMouseEnter={() => handleCardHover(index)}
                onMouseLeave={() => handleCardHover(null)}
                className={`bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 transform ${
                  hoveredCard === index ? 'scale-[1.02] shadow-2xl' : 'hover:shadow-xl hover:-translate-y-2'
                }`}
              >
                <div className="absolute top-2 left-2 bg-purple-600 text-white py-1 px-3 rounded-full text-sm font-medium z-10">
                  {index === 0 && "Best Overall"}
                  {index === 1 && "Best for Action"}
                  {index === 2 && "Best for Enthusiasts"}
                  {index === 3 && "Best Value"}
                  {index === 4 && "Best Compact"}
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
                    <span className={`block h-0.5 bg-purple-500 transform scale-x-0 transition-transform duration-300 ${
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
                          <FaCheckCircle className={`text-purple-500 mt-1 flex-shrink-0 ${
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
                      className={`px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center gap-2 transition-all duration-300 ${
                        hoveredCard === index ? 'bg-orange-600 shadow-lg' : ''
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

      {/* Mirrorless Camera Buying Guide */}
      <section id="buying-guide" className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-10 text-gray-800 dark:text-white text-center">Mirrorless Camera Buying Guide</h2>
          
          <div className="space-y-8">
            {[
              {
                title: "Sensor Size and Resolution",
                content: "Mirrorless cameras come with different sensor sizes: Micro Four Thirds, APS-C, and Full Frame. Larger sensors generally perform better in low light but are more expensive. Resolution (megapixels) matters but isn't the only factor in image quality.",
                icon: <MdSettings className="text-2xl" />
              },
              {
                title: "Autofocus Performance",
                content: "Modern mirrorless cameras excel in autofocus with features like eye tracking and subject detection. If you shoot moving subjects, prioritize cameras with advanced AF systems and fast tracking capabilities.",
                icon: <MdCameraAlt className="text-2xl" />
              },
              {
                title: "In-Body Image Stabilization (IBIS)",
                content: "IBIS helps reduce camera shake, allowing for sharper images in low light conditions. Some systems offer up to 8 stops of stabilization, which is particularly useful for video or slow shutter photography.",
                icon: <MdPhotoCamera className="text-2xl" />
              },
              {
                title: "Electronic Viewfinder Quality",
                content: "The EVF is one of the main interfaces with your camera. Look for high resolution (at least 2.36M dots), fast refresh rate, and good magnification for a comfortable shooting experience.",
                icon: <MdOutlineHistory className="text-2xl" />
              }
            ].map((section, index) => (
              <div key={index} ref={(el) => {
                if (guideSectionsRefs.current) {
                  guideSectionsRefs.current[index] = el;
                }
              }}>
                <div className="flex gap-5 items-start bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex-shrink-0 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 p-3 rounded-lg">
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

      {/* Tips Section */}
      <section id="photography-tips" className="py-16 px-4 bg-gray-100 dark:bg-gray-700" ref={tipsRef}>
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            Mirrorless Photography Tips
          </h2>
          <p className="text-lg text-center mb-10 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master your mirrorless camera with these essential tips and techniques
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {photographyTips.map((tip, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                    <MdPhotoCamera className="text-purple-500 dark:text-purple-300 text-xl" />
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
      <section id="mirrorless-categories" className="py-16 px-4 bg-white dark:bg-gray-800" ref={categoriesRef}>
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            Mirrorless Camera Categories
          </h2>
          <p className="text-lg text-center mb-10 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Find the perfect mirrorless camera for your photography needs
          </p>
          
          <div className="space-y-8">
            {cameraCategories.map((category, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0 flex items-start justify-center">
                    <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full">
                      <MdCameraAlt className="text-purple-500 dark:text-purple-300 text-3xl" />
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
      <section id="mirrorless-history" className="py-16 px-4 bg-gray-50 dark:bg-gray-900" ref={historyRef}>
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <MdOutlineHistory className="text-3xl text-purple-500 dark:text-purple-400" />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">The Rise of Mirrorless Cameras</h2>
          </div>
          
          <div className="space-y-6 text-gray-600 dark:text-gray-300">
            <p className="text-lg">
              The mirrorless revolution began in 2008 when Panasonic and Olympus introduced the Micro Four Thirds system. This innovation eliminated the mirror mechanism found in traditional DSLRs, allowing for significantly smaller camera bodies while maintaining excellent image quality.
            </p>
            <p className="text-lg">
              Sony&apos;s introduction of full-frame mirrorless cameras with the A7 series in 2013 marked a turning point in the industry. This development proved that mirrorless cameras could deliver professional-level image quality in a compact form factor, challenging the dominance of traditional DSLRs.
            </p>
            <p className="text-lg">
              Today, mirrorless cameras lead the way in technological innovation, with advanced features like real-time eye tracking, in-body image stabilization, and superior video capabilities. Major manufacturers like Canon and Nikon have fully embraced mirrorless technology, developing new lens systems and advanced cameras that push the boundaries of what&apos;s possible in digital photography.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-900 to-black text-white relative overflow-hidden" ref={ctaSectionRef}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-500 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-violet-400 rounded-full filter blur-2xl"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-lg p-10 rounded-3xl border border-white/10 shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Embrace the Future?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Discover the perfect mirrorless camera to elevate your photography and unlock your creative potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#top-cameras" className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-full font-medium text-lg transition duration-300 shadow-lg shadow-purple-500/20 hover:shadow-purple-600/30 flex items-center justify-center gap-2">
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