"use client";

import Link from "next/link";
import { FaCamera, FaInfoCircle, FaMicrophone } from "react-icons/fa";
import { MdCompare, MdPhotoCamera, MdCameraAlt, MdVideocam, MdFlipCameraAndroid } from "react-icons/md";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CameraCard from "../components/CameraCard";

// Vlog cameras data
const vlogCameras = [
    {
      id: 1,
      name: "Sony ZV-E1",
      image: "/images/cameras/sony-zv-e1.jpg",
      rating: 4.9,
      description: "Best Professional Vlog Camera: Full-frame camera with exceptional image quality and advanced features for professional content creators.",
      price: "$2,000-2,200",
      key_features: [
        "Full-frame sensor",
        "Background blur",
        "Excellent audio recording quality",
        "Advanced AF tracking",
        "High-quality 4K video"
      ],
      pros: ["Exceptional image quality", "Professional audio features", "Best-in-class autofocus", "Low-light performance", "Cinematic video options"],
      cons: ["Higher price point", "Larger size than some competitors", "Steeper learning curve"],
      amazon_link: "https://amazon.com/product-link",
      detailed_description: "According to PCMag, the best vlogging camera ever tested. A professional-grade tool for YouTube content creators, influencers and serious video producers."
    },
    {
      id: 2,
      name: "Canon PowerShot V1",
      image: "/images/cameras/canon-powershot-v1.jpg",
      rating: 4.7,
      description: "Best Mid-Range Vlog Camera: Compact, purpose-built camera with excellent features for social media content creators.",
      price: "$500-600",
      key_features: [
        "Compact design",
        "Built-in LED light",
        "Advanced audio recording capabilities",
        "Vertical video support",
        "Wireless streaming"
      ],
      pros: ["Purpose-built for vlogging", "Excellent audio quality", "Integrated LED light", "Easy to use", "Good value"],
      cons: ["Smaller sensor than mirrorless cameras", "Limited lens options", "Basic manual controls"],
      amazon_link: "https://amazon.com/product-link",
      detailed_description: "A camera specifically designed for content creators with thoughtful features like built-in lighting and advanced audio capabilities. Perfect for professional vloggers and social media content creators."
    },
    {
      id: 3,
      name: "Sony ZV-1 II",
      image: "/images/cameras/sony-zv-1-ii.jpg",
      rating: 4.8,
      description: "Best Compact Vlog Camera: Powerful point-and-shoot with creator-focused features in a pocket-sized package.",
      price: "$750-800",
      key_features: [
        "Wide-angle lens",
        "Product showcase mode",
        "New 'Cinematic Vlog' setting",
        "Real-time tracking and Eye AF",
        "Directional 3-capsule mic"
      ],
      pros: ["Excellent autofocus", "Compact and portable", "Great in-camera audio", "Creator-focused features", "Good image quality"],
      cons: ["Screen difficult to see in sunlight", "Limited battery life", "Fixed lens"],
      amazon_link: "https://amazon.com/product-link",
      detailed_description: "According to Wirecutter, the screen can be difficult to see in sunlight but it's easily controlled with Sony's phone app. A perfect blend of portability and performance for YouTube vloggers, product reviewers, and content creators."
    },
    {
      id: 4,
      name: "Panasonic LUMIX GH7",
      image: "/images/cameras/panasonic-lumix-gh7.jpg",
      rating: 4.8,
      description: "Best for Advanced Video: Hybrid camera with professional-grade video features and excellent flexibility.",
      price: "$2,000-2,200",
      key_features: [
        "Micro Four Thirds sensor",
        "Professional video features",
        "Advanced audio recording options",
        "Extensive frame rate options",
        "V-Log profile included"
      ],
      pros: ["Professional video capabilities", "Excellent stabilization", "Great ergonomics", "Rugged construction", "Extensive lens ecosystem"],
      cons: ["Complex menu system", "Autofocus not best-in-class", "Bulkier than some vlog cameras"],
      amazon_link: "https://amazon.com/product-link",
      detailed_description: "According to RTINGS, the best camera tested for advanced video work and vlogs. The ultimate tool for professional videographers and YouTube production teams requiring maximum creative control."
    },
    {
      id: 5,
      name: "DJI Osmo Pocket 3",
      image: "/images/cameras/dji-osmo-pocket-3.jpg",
      rating: 4.6,
      description: "Best Stabilized Vlog Camera: Innovative camera with built-in gimbal for smooth footage on the move.",
      price: "$500-550",
      key_features: [
        "Advanced gimbal",
        "Large sensor",
        "Compact design",
        "4K 120fps video",
        "Tracking features"
      ],
      pros: ["Exceptional stabilization", "Pocketable size", "Good image quality", "Built-in gimbal", "AI tracking features"],
      cons: ["Limited in low light", "No interchangeable lenses", "Audio not best-in-class"],
      amazon_link: "https://www.amazon.com/DJI-Vlogging-Stabilization-Tracking-Photography/dp/B0CG19FGQ5/",
      detailed_description: "The perfect tool for on-the-go content creators who need reliable stabilization in a compact package. Ideal for mobile vloggers and travel content creators who prioritize portability."
    }
];

// Popular Vlog Cameras Data
const popularVlogCameras = [
  {
    id: 1,
    name: "Sony ZV-E1",
    image: "/images/cameras/sony-zv-e1.jpg",
    rating: 4.9,
    description: "Best Professional Vlog Camera: Full-frame camera with exceptional image quality and advanced features for professional content creators.",
    price: "$2,000-2,200",
    key_features: [
      "Full-frame sensor",
      "Background blur",
      "Excellent audio recording quality",
      "Advanced AF tracking",
      "High-quality 4K video"
    ],
    detailed_description: "According to PCMag, the best vlogging camera ever tested. A professional-grade tool for YouTube content creators, influencers and serious video producers.",
    amazon_link: "https://amazon.com/product-link"
  },
  {
    id: 2,
    name: "Canon PowerShot V1",
    image: "/images/cameras/canon-powershot-v1.jpg",
    rating: 4.7,
    description: "Best Mid-Range Vlog Camera: Compact, purpose-built camera with excellent features for social media content creators.",
    price: "$500-600",
    key_features: [
      "Compact design",
      "Built-in LED light",
      "Advanced audio recording capabilities",
      "Vertical video support",
      "Wireless streaming"
    ],
    detailed_description: "A camera specifically designed for content creators with thoughtful features like built-in lighting and advanced audio capabilities.",
    amazon_link: "https://amazon.com/product-link"
  },
  {
    id: 3,
    name: "Sony ZV-1 II",
    image: "/images/cameras/sony-zv-1-ii.jpg",
    rating: 4.8,
    description: "Best Compact Vlog Camera: Powerful point-and-shoot with creator-focused features in a pocket-sized package.",
    price: "$750-800",
    key_features: [
      "Wide-angle lens",
      "Product showcase mode",
      "New 'Cinematic Vlog' setting",
      "Real-time tracking and Eye AF",
      "Directional 3-capsule mic"
    ],
    detailed_description: "According to Wirecutter, the screen can be difficult to see in sunlight but it's easily controlled with Sony's phone app.",
    amazon_link: "https://amazon.com/product-link"
  },
  {
    id: 4,
    name: "Panasonic LUMIX GH7",
    image: "/images/cameras/panasonic-lumix-gh7.jpg",
    rating: 4.8,
    description: "Best for Advanced Video: Hybrid camera with professional-grade video features and excellent flexibility.",
    price: "$2,000-2,200",
    key_features: [
      "Micro Four Thirds sensor",
      "Professional video features",
      "Advanced audio recording options",
      "Extensive frame rate options",
      "V-Log profile included"
    ],
    pros: ["Professional video capabilities", "Excellent stabilization", "Great ergonomics", "Rugged construction", "Extensive lens ecosystem"],
    cons: ["Complex menu system", "Autofocus not best-in-class", "Bulkier than some vlog cameras"],
    amazon_link: "https://amazon.com/product-link",
    detailed_description: "According to RTINGS, the best camera tested for advanced video work and vlogs. The ultimate tool for professional videographers and YouTube production teams requiring maximum creative control."
  },
  {
    id: 5,
    name: "DJI Osmo Pocket 3",
    image: "/images/cameras/dji-osmo-pocket-3.jpg",
    rating: 4.6,
    description: "Best Stabilized Vlog Camera: Innovative camera with built-in gimbal for smooth footage on the move.",
    price: "$500-550",
    key_features: [
      "Advanced gimbal",
      "Large sensor",
      "Compact design",
      "4K 120fps video",
      "Tracking features"
    ],
    pros: ["Exceptional stabilization", "Pocketable size", "Good image quality", "Built-in gimbal", "AI tracking features"],
    cons: ["Limited in low light", "No interchangeable lenses", "Audio not best-in-class"],
    amazon_link: "https://www.amazon.com/DJI-Vlogging-Stabilization-Tracking-Photography/dp/B0CG19FGQ5/",
    detailed_description: "The perfect tool for on-the-go content creators who need reliable stabilization in a compact package. Ideal for mobile vloggers and travel content creators who prioritize portability."
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
        {/* Background Image with Overlay - Yeşil tonlu overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 to-emerald-700/30 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/images/cameras/categories/vlog.webp)` }}
        ></div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Vlog Cameras</h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Create professional-quality content with cameras designed specifically for vloggers and content creators
          </p>
          
          {/* Hero Buttons - Yeşil tonlarda butonlar */}
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#top-cameras" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2">
              <FaCamera /> Explore Top Picks
            </a>
            <a href="#guide" className="bg-transparent border-2 border-emerald-400 text-emerald-400 px-6 py-3 rounded-full font-medium hover:bg-emerald-400/10 transition-all flex items-center gap-2">
              <FaInfoCircle /> Read Buying Guide
            </a>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 px-4 container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Vlog Cameras: Tools for Creative Storytelling</h2>
          <div className="space-y-6">
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
              Whether you&apos;re an established content creator or just starting your vlogging journey, choosing the right camera can significantly enhance the quality of your videos and streamline your production process.
            </p>
          </div>
        </div>
      </section>

      {/* Top Vlog Cameras Section */}
      <section id="top-cameras" className="py-16 px-4 bg-white dark:bg-gray-800 rounded-t-[40px] shadow-lg">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-white">Best Vlog Cameras of 2024</h2>
          <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            The best vlog cameras for different needs and budgets, selected based on our expert reviews and user experiences
          </p>

          {/* Vlog Camera Cards - Yeni bileşen kullanarak */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vlogCameras.map((camera, index) => (
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

      {/* Popular Vlog Cameras Section */}
      <section id="popular-cameras" className="py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-white">Most Popular Vlog Cameras</h2>
          <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            The best-selling vlog cameras chosen by content creators worldwide, based on sales data and customer satisfaction
          </p>

          {/* Popular Vlog Camera Cards - Yeni bileşen kullanarak */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularVlogCameras && popularVlogCameras.map((camera, index) => (
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
      <section id="vlog-categories" className="py-16 px-4 bg-white dark:bg-gray-800">
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
      <section id="vlog-history" className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <MdCompare className="text-3xl text-green-500 dark:text-green-400" />
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
      <section className="py-20 px-4 bg-gradient-to-br from-green-900 to-black text-white relative overflow-hidden">
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
                <FaCamera /> Explore Cameras
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
              <div key={index} className="flex gap-5 items-start bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
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
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 