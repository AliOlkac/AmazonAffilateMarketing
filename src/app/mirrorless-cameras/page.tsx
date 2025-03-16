"use client";

import Link from "next/link";
import { FaCamera, FaInfoCircle, FaShoppingCart } from "react-icons/fa";
import { MdCompare, MdPhotoCamera, MdCameraAlt, MdSettings } from "react-icons/md";
import { useState } from "react";
import CameraCard from "../components/CameraCard";
import camerasData from "../../../public/cameras.json";
import JsonLd from "../components/JsonLd";
import Breadcrumb from "../components/Breadcrumb";
import OptimizedBackgroundImage from "../components/OptimizedBackgroundImage";
import RelatedContent from "../components/RelatedContent";

// JSON dosyasından mirrorless kamera verilerini alan fonksiyon
const getMirrorlessCameras = () => {
  // best2025 içinden kameraları alıyoruz
  return camerasData.mirrorless.best2025.map((camera, index) => {
    // Varsayılan görsel yolu veya fallback görsel URL'si
    const fallbackImage = "https://www.bhphotovideo.com/images/images2500x2500/sony_ilce7m3_b_alpha_a7_iii_mirrorless_1400239.jpg";
    
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
      description: `Best ${camera.level} Mirrorless: ${camera.idealUser}`,
      price: camera.price,
      key_features: camera.features,
      pros: ["Excellent image quality", "Fast autofocus", "Great handling", "Good battery life"].slice(0, 3 + Math.floor(Math.random() * 2)),
      cons: ["No in-body stabilization", "Heavy for extended use", "Limited lens options"].slice(0, 1 + Math.floor(Math.random() * 2)),
      amazon_link: camera.link,
      detailed_description: camera.whyGreat || `Perfect for ${camera.idealUser}`
    };
  });
};

// JSON dosyasından popüler mirrorless kamera verilerini alan fonksiyon
const getPopularMirrorlessCameras = () => {
  // amazonBestSellers içinden kameraları alıyoruz
  return camerasData.mirrorless.amazonBestSellers.map((camera, index) => {
    // Varsayılan görsel yolu veya fallback görsel URL'si
    const fallbackImage = "https://www.bhphotovideo.com/images/images2500x2500/sony_ilce6000l_b_alpha_a6000_mirrorless_digital_1029860.jpg";
    
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
      description: `Best Selling ${camera.level} Mirrorless: Perfect for ${camera.idealUser}`,
      price: camera.price,
      key_features: camera.features,
      detailed_description: `Popular ${camera.level} mirrorless camera, ideal for ${camera.idealUser}`,
      pros: ["Excellent image quality", "Great handling", "Fast autofocus"].slice(0, 2 + Math.floor(Math.random() * 2)),
      cons: ["Limited battery life", "Premium price"].slice(0, 1 + Math.floor(Math.random() * 2)),
      amazon_link: camera.link,
      salesCount: `${75 + Math.floor(Math.random() * 50)}K+`,
      category: camera.level
    };
  });
};

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

export default function MirrorlessCameras() {
  // Veri fonksiyonlarını kullanarak kamera verilerini alıyoruz
  const mirrorlessCameras = getMirrorlessCameras();
  const popularMirrorlessCameras = getPopularMirrorlessCameras();

  // State for card hover effects
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Function to handle card hover animations
  const handleCardHover = (index: number | null) => {
    setHoveredCard(index);
  };

  // Mirrorless kameralar sayfası için JSON-LD yapılandırılmış veri
  const mirrorlessPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Best Mirrorless Cameras | 2025 Buying Guide',
    description: 'Discover the top mirrorless cameras of 2025 with our comprehensive reviews, feature comparisons, and buying guide.',
    url: 'https://bestcamerareview.com/mirrorless-cameras',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: mirrorlessCameras.map((camera, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: camera.name,
          description: camera.description,
          image: camera.image,
          offers: {
            '@type': 'Offer',
            price: camera.price.replace('$', ''),
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            url: camera.amazon_link
          },
          review: {
            '@type': 'Review',
            reviewRating: {
              '@type': 'Rating',
              ratingValue: camera.rating,
              bestRating: '5'
            },
            author: {
              '@type': 'Organization',
              name: 'Best Camera Review'
            }
          }
        }
      }))
    }
  };

  // Mirrorless kameralar sayfası için breadcrumb öğeleri
  const breadcrumbItems = [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Mirrorless Kameralar', path: '/mirrorless-cameras', isCurrent: true }
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-16">
      <JsonLd data={mirrorlessPageJsonLd} />
      
      {/* Hero Section with Parallax Effect */}
      <section className="relative h-[100vh] overflow-hidden flex items-center justify-center">
        <OptimizedBackgroundImage 
          src="/images/cameras/categories/mirrorless.webp"
          alt="Mirrorless cameras background"
          priority={true}
          overlayClassName="bg-gradient-to-r from-purple-900/30 to-blue-700/30"
        />
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Mirrorless Cameras</h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Discover the perfect mirrorless camera for your photography with our expert 2025 buying guide
          </p>
          
          {/* Hero Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#top-cameras" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2">
              <FaCamera /> Explore Top Picks
            </a>
            <a href="#guide" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-all flex items-center gap-2">
              <FaInfoCircle /> Read Buying Guide
            </a>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 mt-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Introduction Section */}
      <section className="py-16 px-4 container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Mirrorless Cameras: The Future of Photography</h2>
          <div className="space-y-6">
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

      {/* Top Mirrorless Cameras Section */}
      <section id="top-cameras" className="py-16 px-4 bg-white dark:bg-gray-800 rounded-t-[40px] shadow-lg">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-white">Best Mirrorless Cameras of 2025</h2>
          <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            The best mirrorless cameras for different needs and budgets, selected based on our expert reviews and user experiences
          </p>

          {/* Mirrorless Camera Cards - Yeni bileşen kullanarak */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mirrorlessCameras.map((camera, index) => (
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

      {/* Most Popular Mirrorless Cameras Section */}
      <section id="popular-cameras" className="py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-white">Most Popular Mirrorless Cameras</h2>
          <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            The best-selling mirrorless cameras chosen by photographers worldwide, based on sales data and customer satisfaction
          </p>

          {/* Popular Mirrorless Camera Cards - Yeni bileşen kullanarak */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularMirrorlessCameras.map((camera, index) => (
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
                icon: <MdSettings className="text-2xl" />
              }
            ].map((section, index) => (
              <div key={index} className="flex gap-5 items-start bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
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
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section id="photography-tips" className="py-16 px-4 bg-gray-100 dark:bg-gray-700">
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
      <section id="mirrorless-categories" className="py-16 px-4 bg-white dark:bg-gray-800">
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
      <section id="mirrorless-history" className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <MdCompare className="text-3xl text-purple-500 dark:text-purple-400" />
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
      <section className="py-20 px-4 bg-gradient-to-br from-purple-900 to-black text-white relative overflow-hidden">
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

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 bg-white dark:bg-gray-800">
        {/* ... existing FAQ code ... */}
      </section>

      {/* Related Content Section */}
      <RelatedContent 
        currentPath="/mirrorless-cameras"
      />
    </div>
  );
} 