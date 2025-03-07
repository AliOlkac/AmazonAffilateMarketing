"use client";

import Link from "next/link";
import { FaCamera, FaInfoCircle, FaStar, FaCheckCircle, FaAmazon, FaShoppingCart } from "react-icons/fa";
import { MdPhotoCamera, MdCameraAlt, MdOutlineHistory, MdVideocam, MdFlipCameraAndroid } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { FaMicrophone } from "react-icons/fa";

// Vlog cameras data
const vlogCameras = [
    {
      id: 1,
      name: "Sony ZV-1 II",
      image: "/images/cameras/hero-bg.webp",
      rating: 4.8,
      description: "Best Overall: Compact vlogging camera with excellent autofocus, built-in ND filter, and high-quality 4K video specifically designed for content creators.",
      price: "$899.99",
      key_features: [
        "18-50mm equivalent zoom lens",
        "4K 60p video recording",
        "Real-time Eye AF",
        "Product Showcase Setting",
        "Built-in ND filter"
      ],
      pros: ["Excellent autofocus", "Compact design", "Great image quality", "Built for content creation", "Good low-light performance"],
      cons: ["Limited battery life", "No headphone jack", "Small buttons"],
      amazon_link: "https://amazon.com/product-link",
      detailed_description: "The Sony ZV-1 II is specifically designed for vloggers and content creators, offering the perfect balance of image quality, portability, and creator-focused features."
    },
    {
      id: 2,
      name: "Canon PowerShot G7 X Mark III",
      image: "/images/cameras/hero-bg.webp",
      rating: 4.7,
      description: "Best Compact Vlog Camera: Pocket-sized camera with 4K video, vertical video support, and live streaming capabilities.",
      price: "$749.00",
      key_features: [
        "20.1MP 1-inch sensor",
        "4K 30p video",
        "Vertical video support",
        "Live streaming capability",
        "24-100mm f/1.8-2.8 lens"
      ],
      pros: ["Great image quality", "YouTube live streaming", "Compact size", "Touch screen", "Good zoom range"],
      cons: ["No external mic input", "Average battery life", "Contrast-detect AF"],
      amazon_link: "https://amazon.com/product-link",
      detailed_description: "The Canon PowerShot G7 X Mark III is a powerful compact camera that's perfect for vloggers who need portability without sacrificing quality."
    },
    {
      id: 3,
      name: "Panasonic LUMIX GH6",
      image: "/images/cameras/hero-bg.webp",
      rating: 4.9,
      description: "Best Professional Vlog Camera: High-end Micro Four Thirds camera with exceptional video features, including 5.7K recording and professional codecs.",
      price: "$1,997.99",
      key_features: [
        "20.3MP MFT sensor",
        "4K 30p video",
        "OZO Audio by Nokia",
        "5-axis hybrid IS",
        "Fully articulating screen"
      ],
      pros: ["Superior audio quality", "Lightweight design", "Good image stabilization", "Clear EVF", "Great for beginners"],
      cons: ["Crop in 4K", "Limited battery life", "No headphone jack"],
      amazon_link: "https://amazon.com/product-link",
      detailed_description: "The Panasonic LUMIX G100 stands out with its innovative audio technology and user-friendly features, making it perfect for vloggers who prioritize sound quality."
    },
    {
      id: 4,
      name: "Sony Alpha ZV-E10",
      image: "/images/cameras/hero-bg.webp",
      rating: 4.7,
      description: "Best Interchangeable Lens Vlog Camera: Compact APS-C camera with excellent autofocus, interchangeable lenses, and creator-focused features.",
      price: "$699.99",
      key_features: [
        "26.1MP X-Trans CMOS 4",
        "4K 30p video",
        "In-body stabilization",
        "Fully articulating screen",
        "F-Log recording"
      ],
      pros: ["Excellent image quality", "Great stabilization", "Professional features", "Compact body", "Film simulations"],
      cons: ["Higher price point", "Complex menu system", "Average battery life"],
      amazon_link: "https://amazon.com/product-link",
      detailed_description: "The Fujifilm X-S10 offers a perfect balance for content creators who need both excellent video and still photo capabilities in a compact body."
    },
    {
      id: 5,
      name: "DJI Pocket 3",
      image: "/images/cameras/hero-bg.webp",
      rating: 4.6,
      description: "Best Stabilized Vlog Camera: Innovative camera with built-in 3-axis gimbal, 4K video, and intelligent tracking features.",
      price: "$519.00",
      key_features: [
        "1-inch sensor",
        "4K 120fps video",
        "3-axis stabilization",
        "1.5-inch touchscreen",
        "AI tracking"
      ],
      pros: ["Excellent stabilization", "Compact size", "Great image quality", "Easy to use", "Active tracking"],
      cons: ["Limited battery life", "No zoom lens", "Limited low-light performance"],
      amazon_link: "https://amazon.com/product-link",
      detailed_description: "The DJI Pocket 3 combines incredible stabilization with high-quality imaging, making it perfect for on-the-go vloggers who need reliable stabilization."
    }
];

// Popular Vlog Cameras Data
const popularVlogCameras = [
  {
    id: 1,
    name: "Sony ZV-1",
    image: "/images/cameras/hero-bg.webp",
    rating: 4.8,
    description: "Purpose-built vlogging camera with excellent autofocus and audio quality",
    price: "$748.00",
    category: "Compact",
    salesCount: "185K+",
    key_features: [
      "20.1MP 1\" Exmor RS CMOS Sensor",
      "ZEISS 24-70mm f/1.8-2.8 lens",
      "Real-time Eye AF & tracking",
      "Background defocus button",
      "Product showcase setting",
      "Directional 3-capsule microphone",
      "4K video with no recording limit",
      "Flip-out touchscreen"
    ],
    pros: [
      "Excellent autofocus performance",
      "Superior audio quality",
      "Compact and lightweight",
      "Purpose-built for vlogging"
    ],
    cons: [
      "Limited battery life",
      "No headphone jack",
      "No built-in viewfinder"
    ],
    amazon_link: "https://www.amazon.com/Sony-Content-Creators-Vlogging-Microphone/dp/B088XCGLCD"
  },
  {
    id: 2,
    name: "Canon PowerShot G7 X Mark III",
    image: "/images/cameras/hero-bg.webp",
    rating: 4.7,
    description: "Popular vlogging compact with YouTube live streaming capabilities",
    price: "$749.00",
    category: "Compact",
    salesCount: "145K+",
    key_features: [
      "20.1MP 1\" Stacked CMOS Sensor",
      "DIGIC 8 Image Processor",
      "24-100mm f/1.8-2.8 lens",
      "Uncropped 4K30p video",
      "YouTube live streaming",
      "Vertical video support",
      "3.0\" tilting touchscreen LCD",
      "Microphone input"
    ],
    pros: [
      "Excellent image stabilization",
      "Great low-light performance",
      "Live streaming capability",
      "Compact and portable"
    ],
    cons: [
      "No eye detection AF",
      "No hot shoe for accessories",
      "Below average battery life"
    ],
    amazon_link: "https://www.amazon.com/Canon-PowerShot-Digital-Camera-Streaming/dp/B07TKNCQZX"
  },
  {
    id: 3,
    name: "Sony Alpha ZV-E10",
    image: "/images/cameras/hero-bg.webp",
    rating: 4.8,
    description: "Interchangeable lens vlogging camera with APS-C sensor",
    price: "$698.00",
    category: "Mirrorless",
    salesCount: "170K+",
    key_features: [
      "24.2MP APS-C Exmor CMOS Sensor",
      "Interchangeable lens system",
      "Real-time Eye AF & tracking",
      "Background defocus button",
      "Product showcase setting",
      "Directional 3-capsule microphone",
      "4K30p & S-Log3/S-Gamut3",
      "Fully articulating touchscreen"
    ],
    pros: [
      "Excellent image quality",
      "Great low-light performance",
      "Flexible lens options",
      "Superior audio recording"
    ],
    cons: [
      "No in-body stabilization",
      "Rolling shutter in 4K",
      "Overheating concerns"
    ],
    amazon_link: "https://www.amazon.com/Sony-Alpha-ZV-E10-Interchangeable-Lens-Camera/dp/B09BBN2B4X"
  },
  {
    id: 4,
    name: "DJI Pocket 2",
    image: "/images/cameras/hero-bg.webp",
    rating: 4.6,
    description: "Ultra-compact gimbal camera with excellent stabilization",
    price: "$349.00",
    category: "Gimbal",
    salesCount: "210K+",
    key_features: [
      "1/1.7\" CMOS sensor",
      "3-axis mechanical gimbal",
      "4K/60fps video",
      "8x zoom (4x lossless in 1080p)",
      "ActiveTrack 3.0",
      "Hyperlapse and timelapse",
      "Story mode with templates",
      "Lightweight: only 117g"
    ],
    pros: [
      "Outstanding stabilization",
      "Extremely portable",
      "Excellent tracking features",
      "Good battery life"
    ],
    cons: [
      "Small sensor size",
      "Audio quality is average",
      "Limited in low light",
      "Accessories sold separately"
    ],
    amazon_link: "https://www.amazon.com/DJI-Pocket-Stabilizer-Smartphone-OSMO/dp/B08LYKQ5Y8"
  },
  {
    id: 5,
    name: "Panasonic LUMIX G100",
    image: "/images/cameras/hero-bg.webp",
    rating: 4.5,
    description: "Lightweight mirrorless vlogging camera with Nokia OZO Audio",
    price: "$647.99",
    category: "Mirrorless",
    salesCount: "95K+",
    key_features: [
      "20.3MP MFT Digital Live MOS Sensor",
      "5-axis hybrid I.S. (with compatible lens)",
      "Nokia OZO Audio with 3 microphones",
      "4K30p video recording",
      "V-Log L profile",
      "Face/eye detection AF",
      "Fully articulating touchscreen",
      "Compact frame weighing only 345g"
    ],
    pros: [
      "Excellent audio quality",
      "Compact and lightweight",
      "Clear, bright electronic viewfinder",
      "Good ergonomics"
    ],
    cons: [
      "4K video has significant crop",
      "Limited battery life",
      "No headphone jack"
    ],
    amazon_link: "https://www.amazon.com/PANASONIC-Mirrorless-Recording-Technology-DC-G100KKIT/dp/B08965JV8D"
    }
];

// Photography tips for Vlog cameras
const photographyTips = [
  {
    title: "Perfect Audio Setup",
    content: "Good audio is crucial for vlogging. Use external microphones when possible, and always monitor your audio levels. Consider the environment and background noise when choosing your shooting location."
  },
  {
    title: "Lighting Techniques",
    content: "Natural light is great, but consider investing in a portable LED light for consistent lighting. Position yourself facing the light source and avoid backlighting unless it's for creative effect."
  },
  {
    title: "Composition for Vlogs",
    content: "Use the rule of thirds for better framing. Keep your eyes at the upper third of the frame and leave some headroom. Consider your background and keep it interesting but not distracting."
  },
  {
    title: "Camera Settings",
    content: "Use Face/Eye Detection AF for sharp focus. Set your aperture wider for background blur, but ensure you remain in focus. Consider using Picture Profiles for better color grading flexibility."
  }
];

// Vlog camera categories and use cases
const cameraCategories = [
  {
    title: "Lifestyle Vlogging",
    description: "Perfect for daily life and travel vlogging. These cameras offer good autofocus, flip screens, and portable designs ideal for self-recording.",
    examples: "Sony ZV-1 II, Canon PowerShot G7 X Mark III"
  },
  {
    title: "Professional Content Creation",
    description: "Ideal for professional YouTubers and content creators who need higher production value and versatility.",
    examples: "Fujifilm X-S10, Panasonic LUMIX G100"
  },
  {
    title: "Mobile Vlogging",
    description: "Specialized cameras designed for on-the-go content creation with superior stabilization and compact form factors.",
    examples: "DJI Pocket 3, Sony ZV-1 II"
  }
];

export default function VlogCameras() {
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
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-gray-900/70 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/images/cameras/hero-bg.webp)` }}
          ref={parallaxBgRef}
        ></div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-20 text-center">
          <h1 ref={heroTitleRef} className="text-4xl md:text-6xl font-bold text-white mb-6">Vlog Cameras</h1>
          <p ref={heroSubtitleRef} className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Create professional-quality content with cameras designed specifically for vloggers and content creators
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

      {/* Introduction Section */}
      <section className="py-16 px-4 container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 ref={introTitleRef} className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Vlog Cameras: Tools for Creative Storytelling</h2>
          <div ref={introTextRef} className="space-y-6">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Vlog cameras are specially designed to meet the unique needs of content creators who need to record themselves while producing engaging video content. These cameras combine excellent video quality with features specifically tailored for self-recording and storytelling.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              What sets vlog cameras apart are features like flip screens for framing yourself, enhanced audio recording capabilities, compact form factors for portability, and specialized shooting modes for content creation. Many also include connectivity options that make sharing your content faster and easier.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Modern vlog cameras offer impressive 4K video quality, advanced autofocus systems that can track faces and eyes, and sophisticated image stabilization to keep footage smooth even when recording on the move. These capabilities ensure your content looks professional without requiring extensive equipment or technical expertise.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Whether you're an established content creator or just starting your vlogging journey, choosing the right camera can significantly enhance the quality of your videos and streamline your production process.
            </p>
          </div>
        </div>
      </section>

      {/* Most Popular Vlog Cameras Section */}
      <section id="popular-cameras" className="py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-white">Most Popular Vlog Cameras</h2>
          <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            The best-selling cameras for content creators with features that make vlogging and video creation seamless
          </p>

          {/* Popular Vlog Camera Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={camerasWrapperRef}>
            {popularVlogCameras.map((camera, index) => (
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

      {/* Top Vlog Cameras Section */}
      <section id="top-cameras" className="py-16 px-4 bg-white dark:bg-gray-800 rounded-t-[40px] shadow-lg">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-white">
            Best 5 Vlog Cameras for Content Creation
          </h2>
          <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From YouTube videos to social media content, find the perfect camera for your creative needs
          </p>

          {/* Camera Cards */}
          <div ref={camerasWrapperRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vlogCameras.map((camera, index) => (
              <div 
                key={camera.id}
                onMouseEnter={() => handleCardHover(index)}
                onMouseLeave={() => handleCardHover(null)}
                className={`bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 transform ${
                  hoveredCard === index ? 'scale-[1.02] shadow-2xl' : 'hover:shadow-xl hover:-translate-y-2'
                }`}
              >
                <div className="absolute top-2 left-2 bg-green-600 text-white py-1 px-3 rounded-full text-sm font-medium z-10">
                  {index === 0 && "Best Overall"}
                  {index === 1 && "Best Compact"}
                  {index === 2 && "Best Audio"}
                  {index === 3 && "Best Hybrid"}
                  {index === 4 && "Best Stabilized"}
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
                    <span className={`block h-0.5 bg-green-500 transform scale-x-0 transition-transform duration-300 ${
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
                      className={`px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center gap-2 transition-all duration-300 ${
                        hoveredCard === index ? 'bg-green-600 shadow-lg' : ''
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
            Vlogging Tips & Techniques
          </h2>
          <p className="text-lg text-center mb-10 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master your vlog camera with these essential tips for better content creation
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {photographyTips.map((tip, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                    <MdPhotoCamera className="text-green-500 dark:text-green-300 text-xl" />
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
      <section id="vlog-categories" className="py-16 px-4 bg-white dark:bg-gray-800" ref={categoriesRef}>
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            Vlog Camera Categories
          </h2>
          <p className="text-lg text-center mb-10 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Find the perfect vlog camera for your content style
          </p>
          
          <div className="space-y-8">
            {cameraCategories.map((category, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0 flex items-start justify-center">
                    <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full">
                      <MdCameraAlt className="text-green-500 dark:text-green-300 text-3xl" />
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
      <section id="vlog-history" className="py-16 px-4 bg-gray-50 dark:bg-gray-900" ref={historyRef}>
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <MdOutlineHistory className="text-3xl text-green-500 dark:text-green-400" />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">The Evolution of Vlog Cameras</h2>
          </div>
          
          <div className="space-y-6 text-gray-600 dark:text-gray-300">
            <p className="text-lg">
              The rise of vlogging in the early 2010s created a new demand for cameras specifically designed for content creators. This led to the development of cameras with features like flip screens and advanced autofocus systems.
            </p>
            <p className="text-lg">
              The introduction of dedicated vlogging cameras like the Sony RX100 series and later the ZV line marked a significant shift in how camera manufacturers approached the content creator market.
            </p>
            <p className="text-lg">
              Today&apos;s vlog cameras combine advanced video capabilities with creator-friendly features like product showcase settings, built-in ND filters, and advanced audio options. They&apos;ve become essential tools for content creators across all platforms.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-900 to-black text-white relative overflow-hidden" ref={ctaSectionRef}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-64 h-64 bg-green-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-500 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-teal-400 rounded-full filter blur-2xl"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-lg p-10 rounded-3xl border border-white/10 shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Creating?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Find the perfect vlog camera to bring your creative vision to life and engage with your audience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#top-cameras" className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-full font-medium text-lg transition duration-300 shadow-lg shadow-green-500/20 hover:shadow-green-600/30 flex items-center justify-center gap-2">
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

      {/* Vlog Camera Buying Guide */}
      <section id="buying-guide" className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-10 text-gray-800 dark:text-white text-center">Vlog Camera Buying Guide</h2>
          
          <div className="space-y-8">
            {[
              {
                title: "Video Quality & Resolution",
                content: "Look for cameras that offer at least 4K video resolution with good bitrates (100Mbps+). Higher frame rates like 60fps or 120fps are useful for smooth slow-motion footage. For serious vloggers, 10-bit color recording is a plus.",
                icon: <MdVideocam className="text-2xl" />
              },
              {
                title: "Audio Features",
                content: "Great audio is essential for vlogging. Prioritize cameras with external microphone inputs, good quality built-in microphones, and ideally, headphone jacks for audio monitoring. Some vlogging cameras include special wind noise reduction features.",
                icon: <FaMicrophone className="text-2xl" />
              },
              {
                title: "Flip Screen & Monitoring",
                content: "A fully articulating flip screen is crucial for vlogging to frame yourself properly. Cameras with flip screens that can face forward let you monitor your composition, exposure and focus while recording yourself.",
                icon: <MdFlipCameraAndroid className="text-2xl" />
              },
              {
                title: "Autofocus Performance",
                content: "Look for cameras with reliable face/eye detection autofocus that works well in video mode. Good focus tracking will keep you sharp as you move around, which is essential for dynamic vlogs and on-the-go content.",
                icon: <MdCameraAlt className="text-2xl" />
              }
            ].map((section, index) => (
              <div key={index} ref={(el) => {
                if (guideSectionsRefs.current) {
                  guideSectionsRefs.current[index] = el;
                }
              }}>
                <div className="flex gap-5 items-start bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex-shrink-0 bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900 dark:to-teal-900 p-3 rounded-lg">
                    <span className="text-green-600 dark:text-green-300 text-xl">
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
    </div>
  );
} 