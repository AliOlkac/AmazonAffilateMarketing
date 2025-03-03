"use client";

import Link from "next/link";
import { FaCamera, FaInfoCircle, FaStar, FaCheckCircle, FaAmazon, FaShoppingCart } from "react-icons/fa";
import { MdCompare, MdPhotoCamera, MdCameraAlt, MdVideocam, MdSettings, MdOutlineHistory } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Metadata for DSLR Cameras page - Metadata doesn't work in client components in Next.js, so we removed it
// export const metadata = {
//   title: "Best DSLR Cameras | 2024 Buying Guide",
//   description: "The best DSLR cameras of 2024, features, price comparison, and professional reviews.",
// };

// Sample DSLR camera data
const dslrCameras = [
  {
    id: 1,
    name: "Canon EOS 90D",
    image: "/images/cameras/canon-90d.jpg", // Camera image to be added
    rating: 4.8,
    description: "Professional DSLR camera experience with advanced features and impressive performance",
    price: "$1,199.00",
    key_features: [
      "32.5 MP APS-C CMOS sensor",
      "DIGIC 8 processor",
      "4K video recording",
      "Dual Pixel CMOS AF",
      "45-point cross-type AF"
    ],
    pros: ["High resolution", "Fast autofocus", "Ergonomic design", "Excellent battery life", "Weather sealing"],
    cons: ["Heavy body", "Limited battery life", "Menu system could be more intuitive"],
    amazon_link: "https://amazon.com/product-link",
    detailed_description: "The Canon EOS 90D is a versatile DSLR camera that excels in both photography and videography. With its high-resolution 32.5MP APS-C sensor, it captures incredibly detailed images with vibrant colors and excellent dynamic range. The camera's advanced 45-point all cross-type AF system ensures fast and accurate focusing, making it ideal for action and wildlife photography."
  },
  {
    id: 2,
    name: "Nikon D780",
    image: "/images/cameras/nikon-d780.jpg", // Camera image to be added
    rating: 4.7,
    description: "Advanced DSLR offering superior performance for both professionals and semi-professionals",
    price: "$2,299.00",
    key_features: [
      "24.5 MP FX-format CMOS sensor",
      "EXPEED 6 processor",
      "4K UHD video",
      "273-point hybrid AF system",
      "ISO 100-51,200"
    ],
    pros: ["Excellent low light performance", "Fast autofocus", "Superior connectivity options", "Long battery life", "Dual SD card slots"],
    cons: ["High price", "Heavy equipment", "Limited touchscreen functionality"],
    amazon_link: "https://amazon.com/product-link",
    detailed_description: "The Nikon D780 represents the perfect fusion of DSLR and mirrorless technology, offering the best of both worlds. Its full-frame 24.5MP sensor delivers exceptional image quality with remarkable dynamic range and low-light performance. The advanced 273-point phase-detection autofocus system borrowed from Nikon's mirrorless cameras provides lightning-fast and precise focusing in live view, while the traditional 51-point AF system performs admirably when using the optical viewfinder."
  },
  {
    id: 3,
    name: "Pentax K-3 Mark III",
    image: "/images/cameras/canon-90d.jpg", // Camera image to be added
    rating: 4.6,
    description: "Ideal for nature photography with durable body and advanced sensor technology",
    price: "$1,999.00",
    key_features: [
      "25.73 MP APS-C CMOS sensor",
      "PRIME V processor",
      "4K video recording",
      "101-point SAFOX 13 AF",
      "5.5 stop image stabilization"
    ],
    pros: ["Weather resistant", "Advanced image stabilization", "Ergonomic handling", "Pixel Shift technology", "Bright optical viewfinder"],
    cons: ["Fewer lens options compared to Canon and Nikon", "Limited battery life", "Autofocus not as advanced for video"],
    amazon_link: "https://amazon.com/product-link",
    detailed_description: "The Pentax K-3 Mark III is a rugged, weather-sealed DSLR that's built to withstand the elements. Its robust construction makes it perfect for outdoor photographers who shoot in challenging conditions. The camera's 5.5-stop in-body image stabilization system effectively compensates for camera shake, allowing for sharp handheld shots at slower shutter speeds, while the 101-point SAFOX 13 AF system ensures reliable focusing even in dim lighting conditions."
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
  // Element references
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        {/* Hero Image - A sample DSLR camera photo will be added */}
        <div className="absolute inset-0 bg-black/70">
          <div className="w-full h-full bg-[url('/images/cameras/hero-bg.webp')] bg-cover bg-center opacity-30 mix-blend-plus-darker"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center md:items-start text-white">
          <h1 ref={heroTitleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center md:text-left">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Best DSLR Cameras
            </span>
          </h1>
          <h2 ref={heroSubtitleRef} className="text-xl md:text-2xl mb-6 text-gray-200 max-w-2xl text-center md:text-left">
            The best DSLR camera options and expert recommendations for professional quality photos in 2024
          </h2>
          <div ref={heroButtonsRef} className="flex gap-4 flex-col sm:flex-row items-center">
            <Link href="#top-cameras" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition duration-300 flex items-center gap-2">
              <FaCamera className="text-lg" /> Best Cameras
            </Link>
            <Link href="#buying-guide" className="px-8 py-3 bg-transparent hover:bg-white/10 border border-white text-white rounded-full font-medium transition duration-300 flex items-center gap-2">
              <FaInfoCircle className="text-lg" /> Buying Guide
            </Link>
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
              On this page, you&apos;ll find the most preferred and best-performing DSLR cameras of 2024, 
              compare their features, and choose the model that best fits your budget and photography needs. Whether you&apos;re shooting landscapes, portraits, sports, or wildlife, there&apos;s a DSLR camera here that will help you capture stunning images.
            </p>
          </div>
        </div>
      </section>

      {/* Top DSLR Cameras Section */}
      <section id="top-cameras" className="py-16 px-4 bg-white dark:bg-gray-800 rounded-t-[40px] shadow-lg">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-white">Best DSLR Cameras of 2024</h2>
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
                className={`bg-gray-50 dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 transform ${
                  hoveredCard === index ? 'scale-[1.02] shadow-2xl' : 'hover:shadow-xl hover:-translate-y-2'
                }`}
                onMouseEnter={() => handleCardHover(index)}
                onMouseLeave={() => handleCardHover(null)}
              >
                {/* Camera Image Placeholder - Real images will be added */}
                <div className="relative h-60 bg-gray-200 dark:bg-gray-600 overflow-hidden">
                  <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 py-1 px-3 rounded-full flex items-center gap-1 font-medium z-10">
                    <FaStar className={`${hoveredCard === index ? 'animate-pulse' : ''}`} /> {camera.rating}
                  </div>
                  {/* Camera image will be added - Adding a zoom effect on hover */}
                  <div className={`w-full h-full flex items-center justify-center text-gray-400 transition-transform duration-700 ${
                    hoveredCard === index ? 'scale-110' : ''
                  }`}>
                    <FaCamera size={60} className={`${hoveredCard === index ? 'animate-pulse text-gray-500' : ''}`} />
                  </div>
                  
                  {/* Overlay that appears on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 flex items-end justify-center pb-4 ${
                    hoveredCard === index ? 'opacity-100' : ''
                  }`}>
                    <span className="text-white font-medium px-3 py-1 rounded bg-black/30 backdrop-blur-sm">
                      View Details
                    </span>
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
