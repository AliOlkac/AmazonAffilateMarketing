/* eslint-disable react/no-unescaped-entities */
"use client";

import { FaCamera, FaInfoCircle, FaStar, FaCheckCircle, FaAmazon, FaShoppingCart } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Sample Action camera data
const actionCameras = [
    {
      id: 1,
      name: "DJI Osmo Action 5 Pro",
      image: "/images/cameras/dji-osmo-action-5-pro.jpg",
      rating: 4.8,
      description: "Best Overall Action Camera: Premium device with exceptional image quality, stabilization, and underwater capabilities.",
      price: "$450-500",
      key_features: [
        "High-quality sensor",
        "Advanced stabilization",
        "Underwater performance",
        "Dual touch screens",
        "4K 120fps video"
      ],
      pros: ["Excellent image quality", "Superb stabilization", "Waterproof design", "User-friendly interface", "Great low-light performance"],
      cons: ["Premium price", "Larger size than some competitors", "Battery life could be better"],
      amazon_link: "https://www.amazon.com/DJI-Standard-Waterproof-Stabilization-Touchscreens/dp/B0DBQTC2P7/",
      detailed_description: "A professional-grade action camera with exceptional image quality and stabilization. Perfect for professional content creators and extreme sports enthusiasts."
    },
    {
      id: 2,
      name: "GoPro Hero 13 Black",
      image: "/images/cameras/gopro-hero13-black.jpg",
      rating: 4.7,
      description: "Best for Creative Shooting: Latest flagship GoPro with innovative lens modules and exceptional video capabilities.",
      price: "$400-450",
      key_features: [
        "Interchangeable lens modules",
        "Magnetic mounting",
        "5.3K video",
        "Advanced HDR",
        "HyperSmooth stabilization"
      ],
      pros: ["Versatile lens options", "Excellent image quality", "Class-leading stabilization", "Robust ecosystem", "Good low-light performance"],
      cons: ["Modules sold separately", "Complex for beginners", "Battery life limitations"],
      amazon_link: "https://www.amazon.com/GoPro-HERO13-Black-Compatability-HB/dp/B0DCM34GXX/",
      detailed_description: "According to TechRadar, offers creative shooting options with the newest lens mods and ND filters. The ultimate tool for professional content creators and extreme sports athletes."
    },
    {
      id: 3,
      name: "Insta360 X4",
      image: "/images/cameras/insta360-x4.jpg",
      rating: 4.6,
      description: "Best 360° Action Camera: Revolutionary device that captures immersive spherical video with advanced editing features.",
      price: "$500-550",
      key_features: [
        "360° shooting",
        "5.7K video",
        "AI editing features",
        "FlowState stabilization",
        "Waterproof design"
      ],
      pros: ["Unique 360° capture", "Innovative editing tools", "High-quality video", "Versatile mounting", "Good software support"],
      cons: ["Higher price point", "Steeper learning curve", "Memory-intensive footage"],
      amazon_link: "https://www.amazon.com/Insta360-Standard-Bundle-Waterproof-Stabilization/dp/B0DBQBMQH2/",
      detailed_description: "The ultimate tool for capturing immersive content, perfect for 360° content creators and virtual reality project shooters looking for unmatched creative possibilities."
    },
    {
      id: 4,
      name: "AKASO EK7000 Pro",
      image: "/images/cameras/akaso-ek7000-pro.jpg",
      rating: 4.5,
      description: "Best Budget Action Camera: Affordable device with impressive features and good performance for casual users.",
      price: "$80-100",
      key_features: [
        "4K 25fps video",
        "Electronic image stabilization",
        "40m waterproof",
        "WiFi connectivity",
        "Remote control"
      ],
      pros: ["Exceptional value", "Good image quality", "Included accessories", "Waterproof case", "Easy to use"],
      cons: ["Limited low-light performance", "Basic stabilization", "Lower frame rates"],
      amazon_link: "https://www.amazon.com/AKASO-Touch-Screen-Underwater-Waterproof-Accessories/dp/B07SJ3X5GD/",
      detailed_description: "A feature-packed budget option that delivers impressive results without breaking the bank. Perfect for casual users, beginners, and those with basic action camera needs."
    },
    {
      id: 5,
      name: "GoPro HERO",
      image: "/images/cameras/gopro-hero.jpg",
      rating: 4.5,
      description: "Best Entry-Level GoPro: Simplified action camera with core GoPro features at a more accessible price point.",
      price: "$200-250",
      key_features: [
        "Compact waterproof design",
        "User-friendly interface",
        "1080p video",
        "Basic stabilization",
        "GoPro ecosystem access"
      ],
      pros: ["GoPro quality", "Simplified interface", "Compatible with GoPro mounts", "Durable construction", "Good image quality"],
      cons: ["Limited resolution", "Basic features", "No front display"],
      amazon_link: "https://www.amazon.com/GoPro-Hero-Compact-Waterproof-Action/dp/B0DCLRRHSP/",
      detailed_description: "A simplified GoPro model that focuses on the essential features while maintaining good image quality and ease of use. Perfect for action camera beginners and budget-conscious users."
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
    name: "AKASO EK7000",
    image: "/images/cameras/akaso-ek7000.jpg",
    rating: 4.6,
    description: "Entry-level action camera with 4K recording and waterproof case",
    price: "$60-80",
    category: "Entry-Level",
    salesCount: "250K+",
    key_features: [
      "4K 25fps video",
      "30m waterproof",
      "WiFi connectivity",
      "170° wide angle lens",
      "Multiple shooting modes"
    ],
    pros: [
      "Exceptional value",
      "Good image quality for the price",
      "Includes accessories and case",
      "Easy to use"
    ],
    cons: [
      "Basic stabilization",
      "Limited low-light performance",
      "Average battery life"
    ],
    amazon_link: "https://www.amazon.com/AKASO-EK7000-Sports-Waterproof-Camcorder/dp/B01HGM33HG/"
  },
  {
    id: 2,
    name: "DJI Osmo Action 4",
    image: "/images/cameras/dji-osmo-action-4.jpg",
    rating: 4.7,
    description: "Advanced action camera with exceptional low-light performance",
    price: "$350-400",
    category: "Advanced",
    salesCount: "120K+",
    key_features: [
      "4K 120fps video",
      "Advanced stabilization",
      "Long battery life",
      "Superior low-light capability",
      "Waterproof design"
    ],
    pros: [
      "Excellent low-light performance",
      "Superior image quality",
      "User-friendly interface",
      "Reliable stabilization"
    ],
    cons: [
      "Higher price point",
      "Limited ecosystem compared to GoPro",
      "Heavier than some competitors"
    ],
    amazon_link: "https://www.amazon.com/DJI-Essential-Waterproof-Performance-Long-Lasting/dp/B0DS2B3P2B/"
  },
  {
    id: 3,
    name: "GoPro HERO13 Black",
    image: "/images/cameras/gopro-hero13-black.jpg",
    rating: 4.8,
    description: "Flagship action camera with innovative lens system and professional features",
    price: "$400-450",
    category: "Professional",
    salesCount: "180K+",
    key_features: [
      "5.3K 60fps video",
      "New lens modules",
      "Advanced stabilization",
      "10-bit color",
      "Professional workflow support"
    ],
    pros: [
      "Class-leading image quality",
      "Revolutionary lens system",
      "Best-in-class stabilization",
      "Professional software ecosystem"
    ],
    cons: [
      "Premium price",
      "Additional cost for lens mods",
      "Complex for casual users"
    ],
    amazon_link: "https://www.amazon.com/GoPro-HERO13-Black-Compatability-HB/dp/B0DCM34GXX/"
  },
  {
    id: 4,
    name: "GoPro Hero12 Black",
    image: "/images/cameras/gopro-hero12-black.jpg",
    rating: 4.7,
    description: "Powerful previous-generation GoPro with excellent features and performance",
    price: "$350-400",
    category: "Advanced-Professional",
    salesCount: "200K+",
    key_features: [
      "5.3K video",
      "HyperSmooth 5.0",
      "HDR video",
      "27MP photos",
      "Pro-level color options"
    ],
    pros: [
      "Excellent image quality",
      "Superior stabilization",
      "Professional color options",
      "Robust accessory ecosystem"
    ],
    cons: [
      "Battery limitations in cold weather",
      "Higher price point",
      "Learning curve for advanced features"
    ],
    amazon_link: "https://www.amazon.com/GoPro-Hero12-Black-Commerce-Package/dp/B0DD5G9QGJ/"
  },
  {
    id: 5,
    name: "DJI Osmo Action 5 Pro",
    image: "/images/cameras/dji-osmo-action-5-pro.jpg",
    rating: 4.8,
    description: "Premium action camera with dual screens and exceptional image quality",
    price: "$450-500",
    category: "Professional",
    salesCount: "95K+",
    key_features: [
      "Dual touch screens",
      "4K 120fps",
      "Advanced stabilization",
      "Magnetic mounting system",
      "Waterproof design"
    ],
    pros: [
      "Superior image quality",
      "Excellent stabilization",
      "Innovative magnetic mounts",
      "User-friendly dual-screen design"
    ],
    cons: [
      "Premium price",
      "Newer to the market",
      "Limited third-party accessories"
    ],
    amazon_link: "https://www.amazon.com/DJI-Standard-Waterproof-Stabilization-Touchscreens/dp/B0DBQTC2P7/"
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
      <section className="relative h-[100vh] md:h-[100vh] overflow-hidden flex items-center justify-center">
        {/* Background Image with Overlay - Turuncu tonlu overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/30 to-orange-700/30 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/images/cameras/categories/action.webp)` }}
          ref={parallaxBgRef}
        ></div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-20 text-center">
          <h1 ref={heroTitleRef} className="text-4xl md:text-6xl font-bold text-white mb-6">Action Cameras</h1>
          <p ref={heroSubtitleRef} className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Capture your adventures with the most rugged and versatile action cameras on the market
          </p>
          
          {/* Hero Buttons - Turuncu tonlarda butonlar */}
          <div ref={heroButtonsRef} className="flex flex-wrap gap-4 justify-center">
            <a href="#top-cameras" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2">
              <FaCamera /> Explore Top Picks
            </a>
            <a href="#guide" className="bg-transparent border-2 border-orange-400 text-orange-400 px-6 py-3 rounded-full font-medium hover:bg-orange-400/10 transition-all flex items-center gap-2">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={camerasWrapperRef}>
            {popularActionCameras.map((camera, index) => (
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

      {/* Top Action Cameras Section */}
      <section id="top-cameras" className="py-16 px-4 bg-white dark:bg-gray-800 rounded-t-[40px] shadow-lg">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Top Action Cameras of 2024</h2>
          <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our expert selection of the best action cameras for every adventure, based on performance, durability, and value
          </p>

          {/* Action Camera Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {actionCameras.map((camera) => (
              <div 
                key={camera.id} 
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="h-56 overflow-hidden relative bg-gray-100 dark:bg-gray-700">
                  <Image 
                    src={camera.image} 
                    alt={camera.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 py-1 px-3 rounded-full flex items-center gap-1 font-medium">
                    <FaStar /> {camera.rating}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{camera.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{camera.description}</p>
                  <div className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">{camera.price}</div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {camera.key_features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <a 
                    href={camera.amazon_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-center w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <FaAmazon /> View on Amazon
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photography Tips Section */}
      <section id="guide" className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-white">Action Camera Photography Tips</h2>
          <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Expert advice to help you get the most out of your action camera
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" ref={tipsRef}>
            {photographyTips.map((tip, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{tip.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Case Categories Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-white">Action Camera Categories</h2>
          <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Different types of action cameras for specific uses
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" ref={categoriesRef}>
            {cameraCategories.map((category, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
                ref={(el) => {
                  if (guideSectionsRefs.current) {
                    guideSectionsRefs.current[index] = el;
                  }
                }}
              >
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{category.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{category.description}</p>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Examples: <span className="text-blue-600 dark:text-blue-400">{category.examples}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-900 to-black text-white relative overflow-hidden" ref={ctaSectionRef}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-teal-400 rounded-full filter blur-2xl"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-lg p-10 rounded-3xl border border-white/10 shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Capture Your Adventures?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Browse our selection of the best action cameras and find the perfect companion for your next adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#top-cameras" className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 rounded-full font-medium text-lg transition duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-600/30 flex items-center justify-center gap-2">
                <FaCamera /> Explore Cameras
              </a>
              <a href="#guide" className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full font-medium text-lg transition duration-300 backdrop-blur-sm flex items-center justify-center gap-2">
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