"use client";

import Link from "next/link";
import { FaCamera, FaInfoCircle, FaStar, FaCheckCircle, FaAmazon } from "react-icons/fa";
import { useEffect, useRef } from "react";
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
    image: "/images/cameras/canon-eos-90d.jpg", // Camera image to be added
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
    pros: ["High resolution", "Fast autofocus", "Ergonomic design"],
    cons: ["Heavy body", "Limited battery life"],
    amazon_link: "https://amazon.com/product-link"
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
    pros: ["Excellent low light performance", "Fast autofocus", "Superior connectivity options"],
    cons: ["High price", "Heavy equipment"],
    amazon_link: "https://amazon.com/product-link"
  },
  {
    id: 3,
    name: "Pentax K-3 Mark III",
    image: "/images/cameras/pentax-k3.jpg", // Camera image to be added
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
    pros: ["Weather resistant", "Advanced image stabilization", "Ergonomic handling"],
    cons: ["Fewer lens options compared to Canon and Nikon", "Limited battery life"],
    amazon_link: "https://amazon.com/product-link"
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        {/* Hero Image - A sample DSLR camera photo will be added */}
        <div className="absolute inset-0 bg-black/70">
          <div className="w-full h-full bg-[url('/images/hero-dslr.jpg')] bg-cover bg-center opacity-70 mix-blend-overlay"></div>
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

      {/* Introduction Section */}
      <section className="py-16 px-4 container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 ref={introTitleRef} className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">DSLR Cameras: The Foundation of Professional Photography</h2>
          <div ref={introTextRef}>
            <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
              DSLR (Digital Single-Lens Reflex) cameras continue to be the primary choice for professional photographers with their interchangeable lenses, optical viewfinders, and advanced sensors. 
              These cameras offer superior image quality, fast performance, and a wide lens ecosystem, making them ideal choices for both professionals and beginners in photography.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              On this page, you can find the most preferred and best-performing DSLR cameras of 2024, 
              compare their features, and choose the model that best fits your budget.
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

          {/* DSLR Camera Cards */}
          <div ref={camerasWrapperRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dslrCameras.map((camera, index) => (
              <div 
                key={camera.id} 
                ref={el => {
                  cameraCardsRefs.current[index] = el;
                }}
                className="bg-gray-50 dark:bg-gray-700 rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-2"
              >
                {/* Camera Image Placeholder - Real images will be added */}
                <div className="relative h-60 bg-gray-200 dark:bg-gray-600 overflow-hidden">
                  <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 py-1 px-3 rounded-full flex items-center gap-1 font-medium">
                    <FaStar /> {camera.rating}
                  </div>
                  {/* Camera image will be added */}
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <FaCamera size={60} />
                  </div>
                </div>

                {/* Camera Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{camera.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{camera.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Key Features:</h4>
                    <ul className="space-y-2">
                      {camera.key_features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Pros:</h4>
                      <ul className="space-y-1">
                        {camera.pros.map((pro, idx) => (
                          <li key={idx} className="text-sm text-gray-600 dark:text-gray-300">+ {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Cons:</h4>
                      <ul className="space-y-1">
                        {camera.cons.map((con, idx) => (
                          <li key={idx} className="text-sm text-gray-600 dark:text-gray-300">- {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold text-gray-800 dark:text-white">{camera.price}</div>
                    <a 
                      href={camera.amazon_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center gap-2 transition duration-300"
                    >
                      <FaAmazon /> View on Amazon
                    </a>
                  </div>
                </div>
              </div>
            ))}
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
                content: "DSLR cameras typically have APS-C or Full Frame sensors. Full Frame sensors are larger and offer better low-light performance, but are more expensive. Megapixel count determines the resolution of your photos, but higher megapixels don't always mean better image quality."
              },
              {
                title: "Autofocus System",
                content: "A good autofocus system is critical, especially when shooting moving subjects. More AF points and cross-type AF sensors provide faster and more accurate focusing. Today&apos;s modern DSLRs also have advanced hybrid AF systems that work in live view mode."
              },
              {
                title: "Video Features",
                content: "If you'll be shooting video, it's important that the camera can record high-resolution video like 4K. Also, consider external microphone input, slow-motion capabilities, and video focusing performance."
              },
              {
                title: "Lens Ecosystem",
                content: "Available lens options for DSLR cameras vary between different brands. Large brands like Canon and Nikon have wider lens ecosystems. Make sure the appropriate lenses are available for the type of photography you want to do."
              }
            ].map((section, index) => (
              <div 
                key={index}
                ref={el => {
                  guideSectionsRefs.current[index] = el;
                }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
              >
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{section.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section ref={ctaSectionRef} className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Choose the Right DSLR Camera for the Best Photography Experience!</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Whether for portraits, landscapes, or moving subjects, there's a DSLR camera that suits your needs.
            Check out our recommendations above and take your photography journey to the next level.
          </p>
          <Link href="#top-cameras" className="px-8 py-4 bg-white text-blue-700 rounded-full font-medium text-lg hover:bg-blue-50 transition duration-300">
            Explore Now
          </Link>
        </div>
      </section>
    </div>
  );
}
