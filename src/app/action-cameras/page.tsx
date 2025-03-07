/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import { FaCamera, FaInfoCircle, FaStar, FaCheckCircle, FaAmazon, FaShoppingCart } from "react-icons/fa";
import { MdPhotoCamera, MdCameraAlt, MdOutlineHistory } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Sample Action camera data
const actionCameras = [
    {
      id: 1,
      name: "GoPro HERO11 Black",
      image: "/images/cameras/hero-bg.webp",
      rating: 4.8,
      description: "Best Overall: Industry-leading action camera with incredible image stabilization, 5.3K video, and waterproof design for adventure enthusiasts and content creators.",
      price: "$399.99",
      key_features: [
        "5.3K60 video recording",
        "27MP photos",
        "HyperSmooth 5.0 stabilization",
        "10-bit color depth",
        "Waterproof to 33ft"
      ],
      pros: ["Excellent image stabilization", "High-resolution sensor", "Advanced features", "Rugged build", "Great low-light performance"],
      cons: ["Premium price", "Battery life could be better", "Learning curve for advanced features"],
      amazon_link: "https://amazon.com/product-link",
      detailed_description: "The GoPro HERO11 Black sets the standard for action cameras with its revolutionary stabilization, high-resolution sensor, and professional-grade features. Perfect for extreme sports and adventure photography."
    },
    {
      id: 2,
      name: "DJI Osmo Action 4",
      image: "/images/cameras/hero-bg.webp",
      rating: 4.7,
      description: "Best for Low Light: Premium action camera with exceptional low-light performance, 4K/120fps video, and innovative magnetic mounting system.",
      price: "$379.00",
      key_features: [
        "4K120 video recording",
        "155° super-wide FOV",
        "RockSteady 3.0",
        "Dual touchscreens",
        "16m waterproof"
      ],
      pros: ["Dual screens", "Excellent stabilization", "Great audio quality", "Magnetic mounting", "Fast charging"],
      cons: ["Limited third-party accessories", "No built-in GPS", "Slightly larger form factor"],
      amazon_link: "https://amazon.com/product-link",
      detailed_description: "The DJI Osmo Action 4 combines innovative features with excellent image quality, making it perfect for vloggers and content creators who need reliability and versatility."
    },
    {
      id: 3,
      name: "Insta360 X3",
      image: "/images/cameras/hero-bg.webp",
      rating: 4.6,
      description: "Best 360° Camera: Versatile action camera that captures immersive 360° footage and can be converted to traditional action camera mode.",
      price: "$449.99",
      key_features: [
        "5.7K 360° capture",
        "72MP photos",
        "Active HDR video",
        "Invisible selfie stick",
        "IPX8 waterproof"
      ],
      pros: ["Versatile 360° capture", "Excellent app features", "Good stabilization", "Creative shooting modes", "Durable build"],
      cons: ["Higher price point", "Complex editing workflow", "Large file sizes"],
      amazon_link: "https://amazon.com/product-link",
      detailed_description: "The Insta360 X3 revolutionizes action photography with its 360-degree capture capabilities, allowing for unique perspectives and creative storytelling options."
    },
    {
      id: 4,
      name: "GoPro HERO10 Black",
      image: "/images/cameras/hero-bg.webp",
      rating: 4.7,
      description: "Best Value: Previous generation GoPro with excellent performance at a more affordable price point.",
      price: "$299.99",
      key_features: [
        "4K30 video recording",
        "20MP photos",
        "IPX8 waterproof",
        "Dual screens",
        "6-axis stabilization"
      ],
      pros: ["Affordable price", "Good image quality", "Dual screens", "Included accessories", "User-friendly"],
      cons: ["Lower frame rates", "Basic stabilization", "Average low-light performance"],
      amazon_link: "https://amazon.com/product-link",
      detailed_description: "The GoPro HERO10 Black offers impressive value with features typically found in premium action cameras, making it perfect for beginners and budget-conscious adventurers."
    },
    {
      id: 5,
      name: "AKASO Brave 7 LE",
      image: "/images/cameras/hero-bg.webp",
      rating: 4.5,
      description: "Best Budget Option: Affordable action camera with dual screens, 4K recording, and IPX7 waterproof rating.",
      price: "$139.99",
      key_features: [
        "4K30 video recording",
        "20MP photos",
        "IPX8 waterproof",
        "Dual screens",
        "6-axis stabilization"
      ],
      pros: ["Affordable price", "Good image quality", "Dual screens", "Included accessories", "User-friendly"],
      cons: ["Lower frame rates", "Basic stabilization", "Average low-light performance"],
      amazon_link: "https://amazon.com/product-link",
      detailed_description: "The AKASO Brave 7 LE offers impressive value with features typically found in premium action cameras, making it perfect for beginners and budget-conscious adventurers."
    }
];

// Photography tips for Action cameras
const photographyTips = [
  {
    title: "Mastering Stabilization",
    content: "Learn to use your action camera&apos;s stabilization modes effectively. Different activities may require different stabilization settings - experiment to find what works best for your specific scenario."
  },
  {
    title: "Optimal Mounting Techniques",
    content: "The right mount can make or break your shot. Use chest mounts for immersive POV footage, helmet mounts for height perspective, and handlebar mounts for smooth tracking shots."
  },
  {
    title: "Understanding Field of View",
    content: "Action cameras typically offer different FOV settings. Wide is great for immersive action shots, while Linear or Narrow can be better for vlogging and more traditional filming."
  },
  {
    title: "Managing Battery Life",
    content: "Carry spare batteries and optimize your settings. Higher resolutions and frame rates drain battery faster, so adjust according to your shooting needs."
  }
];

// Action camera categories and use cases
const cameraCategories = [
  {
    title: "Adventure Sports",
    description: "Perfect for capturing high-speed action and extreme sports. These cameras offer superior stabilization and durability for challenging conditions.",
    examples: "GoPro HERO11 Black, DJI Osmo Action 4, Insta360 ONE RS"
  },
  {
    title: "Vlogging and Content Creation",
    description: "Ideal for creators who need compact, versatile cameras with good audio and front-facing screens.",
    examples: "DJI Osmo Action 4, GoPro HERO11 Black, Sony RX0 II"
  },
  {
    title: "Underwater and Elements",
    description: "Specialized cameras designed for underwater photography and extreme weather conditions.",
    examples: "GoPro HERO11 Black, Insta360 X3, AKASO Brave 7 LE"
  }
];

// Popular Action Cameras Data
const popularActionCameras = [
  {
    id: 1,
    name: "GoPro HERO11 Black",
    image: "/images/cameras/gopro-hero11.webp",
    rating: 4.8,
    description: "Flagship action camera with revolutionary sensor and unmatched stabilization",
    price: "$399.99",
    category: "Premium",
    salesCount: "240K+",
    key_features: [
      "5.3K60 video & 27MP photos",
      "New 8:7 aspect ratio sensor",
      "HyperSmooth 5.0 stabilization",
      "10-bit color with over 1 billion colors",
      "Waterproof to 33ft (10m)",
      "Horizon Lock stabilization",
      "TimeWarp 3.0 & 8X Slo-Mo",
      "Dual LCD screens"
    ],
    pros: [
      "Best-in-class image stabilization",
      "Excellent image quality",
      "Versatile mounting options",
      "Robust app ecosystem"
    ],
    cons: [
      "Battery life could be better",
      "Premium price point",
      "Can overheat during extended recording"
    ],
    amazon_link: "https://www.amazon.com/GoPro-HERO11-Black-Waterproof-Stabilization/dp/B0BD91XYQS"
  },
  {
    id: 2,
    name: "DJI Osmo Action 4",
    image: "/images/cameras/dji-action4.webp",
    rating: 4.7,
    description: "Feature-rich action camera with exceptional low-light performance and magnetic mounting",
    price: "$379.00",
    category: "Premium",
    salesCount: "155K+",
    key_features: [
      "4K/120fps video & 10-bit D-Log M",
      "1/1.3\" sensor with improved low-light",
      "155° super-wide FOV",
      "RockSteady 2.0 stabilization",
      "HorizonSteady horizon leveling",
      "Magnetic quick-release system",
      "Waterproof to 16m without case",
      "Dual touchscreens"
    ],
    pros: [
      "Excellent low-light performance",
      "Convenient magnetic mounting",
      "User-friendly interface",
      "Good battery life"
    ],
    cons: [
      "App can be occasionally buggy",
      "Limited third-party accessories",
      "Image stabilization not as good as GoPro"
    ],
    amazon_link: "https://www.amazon.com/DJI-Action-Standard-Combo-Camera/dp/B0CHXV6KNS"
  },
  {
    id: 3,
    name: "Insta360 ONE RS",
    image: "/images/cameras/insta360-one-rs.webp",
    rating: 4.6,
    description: "Modular action camera system with interchangeable lenses including 360° capabilities",
    price: "$299.99",
    category: "Modular",
    salesCount: "110K+",
    key_features: [
      "Interchangeable lens modules",
      "4K Boost Lens: 4K/60fps & 48MP photos",
      "360 Lens: 5.7K 360° capture",
      "FlowState Stabilization",
      "AI editing features",
      "IPX8 waterproof to 16ft (5m)",
      "Invisible selfie stick effect",
      "Active HDR video"
    ],
    pros: [
      "Versatile modular design",
      "Excellent 360° video capabilities",
      "Creative editing options",
      "Good value for multiple camera types"
    ],
    cons: [
      "Battery life limited, especially with 360 lens",
      "App processing can be slow",
      "Steeper learning curve"
    ],
    amazon_link: "https://www.amazon.com/Insta360-ONE-RS-Twin-Edition/dp/B09QK2TWTQ"
  },
  {
    id: 4,
    name: "AKASO Brave 7 LE",
    image: "/images/cameras/akaso-brave7.webp",
    rating: 4.4,
    description: "Budget-friendly action camera with dual screens and impressive specifications",
    price: "$139.99",
    category: "Budget",
    salesCount: "185K+",
    key_features: [
      "4K30fps video & 20MP photos",
      "IPX7 waterproof without case",
      "Electronic image stabilization",
      "Dual screens (front & back)",
      "170° wide-angle lens",
      "Time-lapse & slow motion",
      "Wi-Fi & remote control",
      "External microphone support"
    ],
    pros: [
      "Excellent value for money",
      "Good image quality for the price",
      "Front screen for selfies/vlogging",
      "Comes with many accessories"
    ],
    cons: [
      "Stabilization not as good as premium options",
      "App needs improvement",
      "Battery life limited to about 90 minutes"
    ],
    amazon_link: "https://www.amazon.com/AKASO-Brave-Touch-Screens-Waterproof/dp/B08D99XNM1"
  },
  {
    id: 5,
    name: "Sony RX0 II",
    image: "/images/cameras/sony-rx0ii.webp",
    rating: 4.5,
    description: "Premium compact action camera with 1-inch sensor and professional image quality",
    price: "$698.00",
    category: "Premium",
    salesCount: "76K+",
    key_features: [
      "1.0\" Exmor RS CMOS sensor",
      "ZEISS® Tessar T* 24mm F4 lens",
      "4K internal recording",
      "Electronic SteadyShot stabilization",
      "Waterproof to 33ft (10m)",
      "Shockproof from 6.5ft (2m)",
      "S-Log2 picture profile",
      "180° tiltable LCD screen"
    ],
    pros: [
      "Exceptional image quality",
      "Professional video features",
      "Extremely durable build",
      "Compact form factor"
    ],
    cons: [
      "Very expensive",
      "Battery life only about 60 minutes",
      "Limited mounting options compared to GoPro"
    ],
    amazon_link: "https://www.amazon.com/Sony-Premium-Waterproof-Digital-Recording/dp/B07P7J9L3W"
  }
];

export default function ActionCameras() {
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
  const parallaxBgRef = useRef(null); // Parallax efekti için referans eklendi

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

    // Other section animations
    // ... other animations ...

  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-16">
      {/* Hero Section with Parallax Effect */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-gray-900/70 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/images/cameras/action-hero.webp)` }}
          ref={parallaxBgRef}
        ></div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-20 text-center">
          <h1 ref={heroTitleRef} className="text-4xl md:text-6xl font-bold text-white mb-6">Action Cameras</h1>
          <p ref={heroSubtitleRef} className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Capture your adventures with the most rugged and versatile action cameras on the market
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
          <h2 ref={introTitleRef} className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Action Cameras: Capture Your Adventures</h2>
          <div ref={introTextRef} className="space-y-6">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Action cameras are compact, rugged devices designed to capture high-quality video in extreme conditions. These versatile cameras are built to withstand water, shock, dust, and extreme temperatures, making them perfect for outdoor adventures and sports.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              The key advantage of action cameras is their size and durability. Despite their small form factor, modern action cameras can record 4K or even 5.3K video with impressive stabilization technology that keeps footage smooth even during the most intense activities.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              With features like voice control, touch screens, GPS, and live streaming capabilities, today's action cameras are more versatile than ever. Their wide-angle lenses capture expansive views, while mounting accessories allow them to be attached to helmets, bikes, surfboards, and more.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Whether you're a professional athlete looking to capture amazing footage or an adventure enthusiast wanting to document your experiences, the right action camera can be an invaluable addition to your gear.
            </p>
          </div>
        </div>
      </section>
      
      {/* Most Popular Action Cameras Section */}
      <section id="popular-cameras" className="py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-white">Most Popular Action Cameras</h2>
          <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            The best-selling action cameras with exceptional performance, durability, and features, based on global sales data
          </p>

          {/* Popular Action Camera Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularActionCameras.map((camera, index) => (
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

      {/* Top Action Cameras Section */}
      <section id="top-cameras" className="py-16 px-4 bg-white dark:bg-gray-800 rounded-t-[40px] shadow-lg">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-white">
            Best 5 Action Cameras for Every Adventure
          </h2>
          <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From extreme sports to underwater exploration, find the perfect action camera for your adventures
          </p>

          {/* Camera Cards */}
          <div ref={camerasWrapperRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {actionCameras.map((camera, index) => (
              <div 
                key={camera.id}
                onMouseEnter={() => handleCardHover(index)}
                onMouseLeave={() => handleCardHover(null)}
                className={`bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 transform ${
                  hoveredCard === index ? 'scale-[1.02] shadow-2xl' : 'hover:shadow-xl hover:-translate-y-2'
                }`}
              >
                <div className="absolute top-2 left-2 bg-orange-600 text-white py-1 px-3 rounded-full text-sm font-medium z-10">
                  {index === 0 && "Best Overall"}
                  {index === 1 && "Best for Vlogging"}
                  {index === 2 && "Best 360°"}
                  {index === 3 && "Best Budget"}
                  {index === 4 && "Best Professional"}
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
                          <FaCheckCircle className={`text-orange-500 mt-1 flex-shrink-0 ${
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

      {/* Tips Section */}
      <section id="photography-tips" className="py-16 px-4 bg-gray-100 dark:bg-gray-700">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            Action Camera Tips
          </h2>
          <p className="text-lg text-center mb-10 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master your action camera with these essential tips and techniques
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {photographyTips.map((tip, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full">
                    <MdPhotoCamera className="text-orange-500 dark:text-orange-300 text-xl" />
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
      <section id="action-categories" className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            Action Camera Categories
          </h2>
          <p className="text-lg text-center mb-10 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Find the perfect action camera for your specific needs
          </p>
          
          <div className="space-y-8">
            {cameraCategories.map((category, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0 flex items-start justify-center">
                    <div className="bg-orange-100 dark:bg-orange-900 p-4 rounded-full">
                      <MdCameraAlt className="text-orange-500 dark:text-orange-300 text-3xl" />
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
      <section id="action-history" className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <MdOutlineHistory className="text-3xl text-orange-500 dark:text-orange-400" />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">The Evolution of Action Cameras</h2>
          </div>
          
          <div className="space-y-6 text-gray-600 dark:text-gray-300">
            <p className="text-lg">
              Whether you&apos;re a YouTube creator, adventure sports enthusiast, or travel vlogger, action cameras have become essential tools for capturing dynamic moments in stunning quality.
            </p>
            <p className="text-lg">
              The evolution of action cameras has been remarkable, from basic waterproof cameras to today&apos;s sophisticated devices with advanced stabilization, 4K resolution, and AI-powered features. These innovations have transformed how we capture life&apos;s most exciting moments.
            </p>
            <p className="text-lg">
              Today&apos;s action cameras continue to push boundaries with features like 5K resolution, 360-degree capture, and AI-powered stabilization, making them more versatile than ever before.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-orange-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-500 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-yellow-400 rounded-full filter blur-2xl"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-lg p-10 rounded-3xl border border-white/10 shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Your Next Adventure?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Find the perfect action camera to capture your most exciting moments and share your adventures with the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#top-cameras" className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 rounded-full font-medium text-lg transition duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-600/30 flex items-center justify-center gap-2">
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