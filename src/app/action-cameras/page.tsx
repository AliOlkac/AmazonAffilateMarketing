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

export default function ActionCameras() {
  // Element references
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroButtonsRef = useRef(null);
  const introTitleRef = useRef(null);
  const introTextRef = useRef(null);
  const camerasWrapperRef = useRef(null);
  const ctaSectionRef = useRef(null);
  const tipsRef = useRef(null);
  const categoriesRef = useRef(null);
  const historyRef = useRef(null);

  // State for card hover animations
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        {/* Hero Image */}
        <div className="absolute inset-0 bg-black/70">
          <div className="w-full h-full bg-[url('/images/cameras/hero-bg.webp')] bg-cover bg-center opacity-30 mix-blend-plus-darker"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center md:items-start text-white">
          <h1 ref={heroTitleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center md:text-left">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Best 5 Action Cameras of 2024
            </span>
          </h1>
          <h2 ref={heroSubtitleRef} className="text-xl md:text-2xl mb-6 text-gray-200 max-w-2xl text-center md:text-left">
            Capture your adventures with the most rugged and capable action cameras
          </h2>
          <div ref={heroButtonsRef} className="flex gap-4 flex-col sm:flex-row items-center">
            <Link href="#top-cameras" className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-medium transition duration-300 flex items-center gap-2">
              <FaCamera className="text-lg" /> Best Cameras
            </Link>
            <Link href="#buying-guide" className="px-8 py-3 bg-transparent hover:bg-white/10 border border-white text-white rounded-full font-medium transition duration-300 flex items-center gap-2">
              <FaInfoCircle className="text-lg" /> Buying Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 px-4 container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 ref={introTitleRef} className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
            Action Cameras: Capture Every Adventure
          </h2>
          <div ref={introTextRef} className="space-y-6">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Action cameras have revolutionized the way we capture adventures and extreme sports. These compact, rugged devices combine durability with advanced features like superior image stabilization and high frame rates.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Modern action cameras offer incredible versatility, from underwater photography to immersive POV footage. Their small size and mounting options allow for unique perspectives that would be impossible with traditional cameras.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              With features like 5K resolution, advanced stabilization, and waterproof construction, today&apos;s action cameras are more capable than ever, making them essential tools for adventurers, content creators, and sports enthusiasts.
            </p>
          </div>
        </div>
      </section>

      {/* Camera Cards Section */}
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
      <section id="photography-tips" ref={tipsRef} className="py-16 px-4 bg-gray-100 dark:bg-gray-700">
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
      <section id="action-categories" ref={categoriesRef} className="py-16 px-4 bg-white dark:bg-gray-800">
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
      <section id="action-history" ref={historyRef} className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
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
      <section ref={ctaSectionRef} className="py-20 px-4 bg-gradient-to-br from-orange-900 to-black text-white relative overflow-hidden">
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