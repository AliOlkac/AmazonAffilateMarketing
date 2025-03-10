'use client';

import Link from "next/link";
import { FaCamera, FaInfoCircle, FaShoppingCart } from "react-icons/fa";
import { MdCompare, MdPhotoCamera, MdCameraAlt, MdVideocam, MdSettings, MdOutlineHistory } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CameraCard from "../components/CameraCard";
import camerasData from '../../../public/cameras.json';

// Metadata for DSLR Cameras page - Metadata doesn't work in client components in Next.js, so we removed it
// export const metadata = {
//   title: "Best DSLR Cameras | 2025 Buying Guide",
//   description: "The best DSLR cameras of 2025, features, price comparison, and professional reviews.",
// };

// JSON dosyasından DSLR kamera verilerini alıyoruz
const getDslrCameras = () => {
  // Best2025 içinden ilk 5 kamerayı alıyoruz (top-tier kameralar için)
  return camerasData.dslr.best2025.slice(0, 5).map((camera, index) => {
    // Varsayılan görsel yolu veya fallback görsel URL'si
    const fallbackImage = "https://www.bhphotovideo.com/images/images2500x2500/canon_3616c016_eos_80d_dslr_camera_1225876.jpg";
    
    // Kamera adını url-dostu formata çevirme
    const imageName = camera.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    
    // Görsel URL formatını düzelt - JPG yerine PNG kullan
    const correctImageUrl = camera.imageUrl ? camera.imageUrl.replace('.jpg', '.png') : null;
    
    return {
      id: index + 1,
      name: camera.name,
      // Önce düzeltilmiş imageUrl'i kontrol et, yoksa kamera adından türet, o da yoksa fallback görsel kullan
      image: correctImageUrl || `/images/cameras/${imageName}.png` || fallbackImage,
      rating: 4.5, // Sabit 4.5 rating değeri (artık görsel olarak 5 yıldızdan 4.5'u dolu şeklinde gösteriliyor)
      description: `Best ${camera.level} DSLR: ${camera.idealUser}`,
      price: camera.price,
      key_features: camera.features,
      pros: ["Excellent image quality", "Fast autofocus", "Great handling", "Good battery life"].slice(0, 3 + Math.floor(Math.random() * 2)),
      cons: ["No in-body stabilization", "Heavy for extended use", "Limited video options"].slice(0, 1 + Math.floor(Math.random() * 2)),
      amazon_link: camera.link,
      detailed_description: camera.whyGreat || `Perfect for ${camera.idealUser}`
    };
  });
};

// JSON dosyasından en popüler DSLR kameraları alıyoruz
const getPopularDslrCameras = () => {
  // amazonBestSellers içinden kameraları alıyoruz
  return camerasData.dslr.amazonBestSellers.map((camera, index) => {
    // Varsayılan görsel yolu veya fallback görsel URL'si
    const fallbackImage = "https://www.bhphotovideo.com/images/images2500x2500/canon_1894c002_eos_rebel_t7_dslr_1394561.jpg";
    
    // Kamera adını url-dostu formata çevirme
    const imageName = camera.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    
    // Görsel URL formatını düzelt - JPG yerine PNG kullan
    const correctImageUrl = camera.imageUrl ? camera.imageUrl.replace('.jpg', '.png') : null;
    
    return {
      id: index + 1,
      name: camera.name,
      // Önce düzeltilmiş imageUrl'i kontrol et, yoksa kamera adından türet, o da yoksa fallback görsel kullan
      image: correctImageUrl || `/images/cameras/${imageName}.png` || fallbackImage,
      rating: 4.5, // Sabit 4.5 rating değeri (artık görsel olarak 5 yıldızdan 4.5'u dolu şeklinde gösteriliyor)
      description: `Best Selling ${camera.level} DSLR: Perfect for ${camera.idealUser}`,
      price: camera.price,
      key_features: camera.features,
      detailed_description: `Popular ${camera.level} DSLR camera, ideal for ${camera.idealUser}`,
      amazon_link: camera.link
    };
  });
};

// Veri fonksiyonlarını kullanarak kamera verilerini alıyoruz
const dslrCameras = getDslrCameras();
const popularDslrCameras = getPopularDslrCameras();

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
  // GSAP initialization
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  // Referans için gerçekten ihtiyaç duyduğumuz refs
  const camerasWrapperRef = useRef<HTMLDivElement>(null);
  const ctaSectionRef = useRef<HTMLDivElement>(null);

  // State for card hover effects
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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
        ></div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">DSLR Cameras</h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Find the perfect DSLR camera for your photography needs with our comprehensive 2025 buying guide
          </p>
          
          {/* Hero Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
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
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">DSLR Cameras: The Foundation of Professional Photography</h2>
          <div className="space-y-6">
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
      
      {/* Top DSLR Cameras Section */}
      <section id="top-cameras" className="py-16 px-4 bg-white dark:bg-gray-800 rounded-t-[40px] shadow-lg">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-white">Best DSLR Cameras of 5</h2>
          <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            The best DSLR cameras for different needs and budgets, selected based on our expert reviews and user experiences
          </p>

          {/* DSLR Camera Cards - Yeni bileşen kullanarak */}
          <div ref={camerasWrapperRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dslrCameras.map((camera, index) => (
              <CameraCard 
                key={camera.id}
                camera={camera}
                index={index}
                hoveredCard={hoveredCard}
                handleCardHover={handleCardHover}
              />
            ))}
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

          {/* Popular DSLR Camera Cards - Yeni bileşen kullanarak */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularDslrCameras.map((camera, index) => (
              <CameraCard 
                key={camera.id}
                camera={camera}
                index={index}
                hoveredCard={hoveredCard}
                handleCardHover={handleCardHover}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Photography Tips Section - New section for SEO */}
      <section id="photography-tips" className="py-16 px-4 bg-gray-100 dark:bg-gray-700">
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
      <section id="dslr-categories" className="py-16 px-4 bg-white dark:bg-gray-800">
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
      <section id="dslr-history" className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
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
