/* eslint-disable react/no-unescaped-entities */
"use client";

import { FaCamera, FaInfoCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CameraCard from "../components/CameraCard";

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
    name: "GoPro HERO12 Black",
    image: "/images/cameras/gopro-hero12-black.jpg",
    rating: 4.8,
    description: "Best-Selling Action Camera: The market leader with proven reliability and excellent ecosystem support.",
    price: "$350-400",
    key_features: [
      "5.3K video",
      "27MP photos",
      "HyperSmooth 6.0",
      "10m waterproof",
      "HDR video support"
    ],
    detailed_description: "The most popular action camera on the market, trusted by millions of adventurers for its reliability and ecosystem of mounts and accessories.",
    amazon_link: "https://www.amazon.com/GoPro-Waterproof-Stabilization-Battery-Included/dp/B0CGXJ4N2R/"
  },
  {
    id: 2,
    name: "DJI Osmo Action 4",
    image: "/images/cameras/dji-osmo-action-4.jpg",
    rating: 4.7,
    description: "Popular Alternative: DJI's powerful GoPro competitor with excellent stabilization and image quality.",
    price: "$300-350",
    key_features: [
      "4K 120fps video",
      "Rocksteady stabilization",
      "10-bit D-Log M",
      "16m waterproof",
      "Dual displays"
    ],
    detailed_description: "A top seller among professionals seeking an alternative to GoPro with some unique features and excellent color science.",
    amazon_link: "https://www.amazon.com/DJI-Osmo-Action-Camera-Adventure/dp/B0CBYSK5NH/"
  },
  {
    id: 3,
    name: "Insta360 ONE RS",
    image: "/images/cameras/insta360-one-rs.jpg",
    rating: 4.6,
    description: "Best Modular Option: Popular modular system allowing for different lens configurations in one device.",
    price: "$280-350",
    key_features: [
      "Interchangeable modules",
      "5.7K 360° option",
      "FlowState stabilization",
      "5m waterproof",
      "AI editing features"
    ],
    detailed_description: "A favorite among content creators who need versatility, with the ability to switch between standard, wide, and 360° modules.",
    amazon_link: "https://www.amazon.com/Insta360-Mini-Extended-Battery-FlowState/dp/B09R21C3RP/"
  }
];

export default function ActionCameras() {
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
        {/* Background Image with Overlay - Turuncu tonlu overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/30 to-orange-700/30 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/images/cameras/categories/action.webp)` }}
        ></div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Action Cameras</h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Capture your adventures with the most rugged and versatile action cameras on the market
          </p>
          
          {/* Hero Buttons - Turuncu tonlarda butonlar */}
          <div className="flex flex-wrap gap-4 justify-center">
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
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Action Cameras: Capture Your Adventures</h2>
          <div className="space-y-6">
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
      
      {/* Top Action Cameras Section */}
      <section id="top-cameras" className="py-16 px-4 bg-white dark:bg-gray-800 rounded-t-[40px] shadow-lg">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-white">Best Action Cameras of 2024</h2>
          <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            The best action cameras for different needs and budgets, selected based on our expert reviews and user experiences
          </p>

          {/* Action Camera Cards - Yeni bileşen kullanarak */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {actionCameras.map((camera, index) => (
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

      {/* Most Popular Action Cameras Section - YENİ BÖLÜM */}
      <section id="popular-cameras" className="py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-white">Most Popular Action Cameras</h2>
          <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            The best-selling action cameras chosen by adventurers worldwide, based on sales data and customer satisfaction
          </p>

          {/* Popular Action Camera Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularActionCameras.map((camera, index) => (
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

      {/* Photography Tips Section */}
      <section id="guide" className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-white">Action Camera Photography Tips</h2>
          <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Expert advice to help you get the most out of your action camera
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cameraCategories.map((category, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
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
      <section className="py-20 px-4 bg-gradient-to-br from-blue-900 to-black text-white relative overflow-hidden">
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