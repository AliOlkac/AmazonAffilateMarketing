"use client";

import Link from "next/link";
import { FaCamera, FaInfoCircle, FaShoppingCart, FaEye, FaSlidersH } from "react-icons/fa";
import { MdPhotoCamera, MdCameraAlt, MdOutlineHistory, MdSettings } from "react-icons/md";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CameraCard from "../components/CameraCard";
import camerasData from "../../../public/cameras.json";

// JSON dosyasından compact kamera verilerini alan fonksiyon
const getCompactCameras = () => {
  // best2025 içinden kameraları alıyoruz
  return camerasData.compact.best2025.map((camera, index) => {
    // Varsayılan görsel yolu veya fallback görsel URL'si
    const fallbackImage = "https://www.bhphotovideo.com/images/images2500x2500/sony_dscrx100m7_sony_rx100_vii_digital_1483192.jpg";
    
    // Kamera adını url-dostu formata çevirme
    const imageName = camera.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    
    // Görsel URL formatını düzelt - JPG yerine PNG kullan
    const correctImageUrl = camera.imageUrl ? camera.imageUrl.replace('.jpg', '.png') : null;
    
    return {
      id: index + 1,
      name: camera.name,
      // Önce düzeltilmiş imageUrl'i kontrol et, yoksa kamera adından türet, o da yoksa fallback görsel kullan
      image: correctImageUrl || `/images/cameras/${imageName}.png` || fallbackImage,
      rating: 4.5, // Sabit 4.5 rating değeri (yıldız gösterimi için)
      description: `Best ${camera.level} Compact: ${camera.idealUser}`,
      price: camera.price,
      key_features: camera.features,
      pros: ["Excellent image quality", "Compact size", "Good battery life", "User-friendly interface"].slice(0, 3 + Math.floor(Math.random() * 2)),
      cons: ["Limited zoom range", "Higher price", "No viewfinder"].slice(0, 1 + Math.floor(Math.random() * 2)),
      amazon_link: camera.link,
      detailed_description: camera.whyGreat || `Perfect for ${camera.idealUser}`
    };
  });
};

// JSON dosyasından popüler compact kamera verilerini alan fonksiyon
const getPopularCompactCameras = () => {
  // amazonBestSellers içinden kameraları alıyoruz
  return camerasData.compact.amazonBestSellers.map((camera, index) => {
    // Varsayılan görsel yolu veya fallback görsel URL'si
    const fallbackImage = "https://www.bhphotovideo.com/images/images2500x2500/canon_0109c001_powershot_g5_x_digital_1187018.jpg";
    
    // Kamera adını url-dostu formata çevirme
    const imageName = camera.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    
    // Görsel URL formatını düzelt - JPG yerine PNG kullan
    const correctImageUrl = camera.imageUrl ? camera.imageUrl.replace('.jpg', '.png') : null;
    
    return {
      id: index + 1,
      name: camera.name,
      // Önce düzeltilmiş imageUrl'i kontrol et, yoksa kamera adından türet, o da yoksa fallback görsel kullan
      image: correctImageUrl || `/images/cameras/${imageName}.png` || fallbackImage,
      rating: 4.5, // Sabit 4.5 rating değeri (yıldız gösterimi için)
      description: `Best Selling ${camera.level} Compact: Perfect for ${camera.idealUser}`,
      price: camera.price,
      key_features: camera.features,
      detailed_description: `Popular ${camera.level} compact camera, ideal for ${camera.idealUser}`,
      pros: ["Easy to use", "Portable size", "Good value"].slice(0, 2 + Math.floor(Math.random() * 2)),
      cons: ["Limited features", "Basic zoom"].slice(0, 1 + Math.floor(Math.random() * 2)),
      amazon_link: camera.link
    };
  });
};

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
  // GSAP initialization
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

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
        {/* Background Image with Overlay - Sarı tonlu overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-700/50 to-amber-600/30 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/images/cameras/categories/compact.webp)` }}
        ></div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Compact Cameras</h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Discover the perfect pocket-sized cameras with professional features and exceptional image quality
          </p>
          
          {/* Hero Buttons - Sarı tonlarda butonlar */}
          <div className="flex flex-wrap gap-4 justify-center">
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
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Compact Cameras: Portable Photography Excellence</h2>
          <div className="space-y-6">
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

      {/* Top Compact Cameras Section */}
      <section id="top-cameras" className="py-16 px-4 bg-white dark:bg-gray-800 rounded-t-[40px] shadow-lg">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-white">Best Compact Cameras of 2024</h2>
          <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            The best compact cameras for different needs and budgets, selected based on our expert reviews and user experiences
          </p>

          {/* Compact Camera Cards - Yeni bileşen kullanarak */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getCompactCameras().map((camera, index) => (
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

      {/* Most Popular Compact Cameras Section */}
      <section id="popular-cameras" className="py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-white">Most Popular Compact Cameras</h2>
          <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            The best-selling compact cameras chosen by photographers worldwide, based on sales data and customer satisfaction
          </p>

          {/* Popular Compact Camera Cards - Yeni bileşen kullanarak */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getPopularCompactCameras().map((camera, index) => (
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

      {/* Tips Section */}
      <section id="photography-tips" className="py-16 px-4 bg-gray-100 dark:bg-gray-700">
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
      <section id="compact-categories" className="py-16 px-4 bg-white dark:bg-gray-800">
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
      <section id="compact-history" className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
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
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex gap-5 items-start bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex-shrink-0 bg-gradient-to-br from-purple-100 to-yellow-100 dark:from-purple-900 dark:to-yellow-900 p-3 rounded-lg">
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

      {/* Compact Camera Guide Sections */}
      <section id="guide-sections" className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-800 dark:text-white">Compact Camera Buying Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Sensor Size",
                content: "Compact cameras come with varying sensor sizes from 1/2.3\" (smallest) to 1\" to APS-C (largest). Larger sensors generally produce better image quality and low-light performance, but make the camera larger and more expensive.",
                link: "/guide/sensor-size"
              },
              {
                title: "Zoom Range vs. Lens Quality",
                content: "Consider the trade-off between zoom range and lens quality. Cameras with extensive zoom ranges often compromise on lens quality and maximum aperture. Fixed-lens compacts often have superior optics but no zoom flexibility.",
                link: "/guide/zoom-range-vs-lens-quality"
              },
              {
                title: "Viewfinder Options",
                content: "Some premium compacts offer electronic viewfinders (EVFs) which can be invaluable in bright sunlight. Consider whether a built-in EVF, pop-up EVF, or LCD-only design meets your shooting style needs.",
                link: "/guide/viewfinder-options"
              },
              {
                title: "Controls & Customization",
                content: "Advanced users should look for cameras with manual controls and customizable buttons. Premium compacts often offer DSLR-like control wheels and function buttons that streamline your shooting experience.",
                link: "/guide/controls-and-customization"
              }
            ].map((section, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{section.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{section.content}</p>
                <Link href={section.link} className="text-yellow-600 dark:text-yellow-400 font-medium hover:underline flex items-center gap-1">
                  Learn more <FaInfoCircle />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 