"use client";

import Link from "next/link";
import { FaCamera, FaInfoCircle, FaStar, FaCheckCircle, FaAmazon, FaShoppingCart } from "react-icons/fa";
import { MdPhotoCamera, MdCameraAlt, MdOutlineHistory } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Sample Compact camera data
const compactCameras = [
    {
      id: 1,
      name: "Sony RX100 VII",
      image: "https://m.media-amazon.com/images/I/71YWxwDZK7L._AC_SL1500_.jpg",
      rating: 4.8,
      description: "Best overall compact camera with professional features",
      price: "$1,298.00",
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
      image: "https://m.media-amazon.com/images/I/71KOhL5x3wL._AC_SL1500_.jpg",
      rating: 4.9,
      description: "Best fixed-lens compact camera for street photography",
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
      name: "Ricoh GR IIIx",
      image: "https://m.media-amazon.com/images/I/71nk6C8-SDL._AC_SL1500_.jpg",
      rating: 4.7,
      description: "Best compact camera for street photography",
      price: "$996.95",
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
      image: "https://m.media-amazon.com/images/I/61IwTzUzU9L._AC_SL1000_.jpg",
      rating: 4.6,
      description: "Best compact camera for enthusiast photographers",
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
      name: "Panasonic Lumix LX100 II",
      image: "https://m.media-amazon.com/images/I/81quLZcjdvL._AC_SL1500_.jpg",
      rating: 4.7,
      description: "Best compact camera for manual control enthusiasts",
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

  }, []);

  // Function to handle card hover animations
  const handleCardHover = (index: number | null) => {
    setHoveredCard(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        {/* Hero Image */}
        <div className="absolute inset-0 bg-black/70">
          <div className="w-full h-full bg-[url('/images/cameras/compact-hero.webp')] bg-cover bg-center opacity-30 mix-blend-plus-darker"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center md:items-start text-white">
          <h1 ref={heroTitleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center md:text-left">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Best 5 Compact Cameras of 2024
            </span>
          </h1>
          <h2 ref={heroSubtitleRef} className="text-xl md:text-2xl mb-6 text-gray-200 max-w-2xl text-center md:text-left">
            Professional quality in your pocket with the best compact cameras
          </h2>
          <div ref={heroButtonsRef} className="flex gap-4 flex-col sm:flex-row items-center">
            <Link href="#top-cameras" className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium transition duration-300 flex items-center gap-2">
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
            Compact Cameras: Power in Your Pocket
          </h2>
          <div ref={introTextRef} className="space-y-6">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Modern compact cameras prove that size isn&apos;t everything. These powerful devices pack professional-level sensors and advanced features into incredibly portable bodies.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              From street photography to travel, compact cameras offer the perfect balance of image quality and portability, making them ideal for photographers who don&apos;t want to compromise on quality.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Today&apos;s compact cameras feature large sensors, fast lenses, and advanced autofocus systems, delivering professional results in a pocket-sized package.
            </p>
          </div>
        </div>
      </section>

      {/* Camera Cards Section */}
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
                <div className="absolute top-2 left-2 bg-purple-600 text-white py-1 px-3 rounded-full text-sm font-medium z-10">
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
                      className={`px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg flex items-center gap-2 transition-all duration-300 ${
                        hoveredCard === index ? 'bg-purple-600 shadow-lg' : ''
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
            Compact Camera Tips & Techniques
          </h2>
          <p className="text-lg text-center mb-10 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master your compact camera with these essential tips for better photography
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
      <section id="compact-categories" ref={categoriesRef} className="py-16 px-4 bg-white dark:bg-gray-800">
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
      <section id="compact-history" ref={historyRef} className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <MdOutlineHistory className="text-3xl text-purple-500 dark:text-purple-400" />
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
      <section ref={ctaSectionRef} className="py-20 px-4 bg-gradient-to-br from-purple-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-500 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-violet-400 rounded-full filter blur-2xl"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-lg p-10 rounded-3xl border border-white/10 shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Go Compact?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Find the perfect compact camera that fits your style and never miss a moment.
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