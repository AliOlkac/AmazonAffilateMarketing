'use client';

import Link from "next/link";
import { FaCamera, FaInfoCircle, FaCheckCircle, FaSearch, FaMoneyBillWave, FaQuestionCircle } from "react-icons/fa";
import { MdCompare, MdPhotoCamera, MdCameraAlt, MdVideocam, MdSettings } from "react-icons/md";
import { useRef } from "react";
import Image from "next/image";

// Step 1: Understanding Camera Types - Content Data
const cameraTypes = [
  {
    id: "dslr",
    name: "DSLR Cameras",
    image: "/images/cameras/categories/dslr.webp",
    description: "DSLR (Digital Single-Lens Reflex) cameras are professional cameras that provide real-time viewing using an optical viewfinder and mirror mechanism.",
    pros: [
      "Superior image quality",
      "Wide lens ecosystem",
      "Long battery life",
      "Durable body construction",
      "Optical viewfinder advantage"
    ],
    cons: [
      "Large and heavy body",
      "Complex menu system",
      "Fewer video features compared to mirrorless",
      "Slower autofocus (in live view mode)"
    ],
    idealFor: "Professional photography, sports, wildlife, and portrait photography",
    link: "/dslr-cameras"
  },
  {
    id: "mirrorless",
    name: "Mirrorless Cameras",
    image: "/images/cameras/categories/mirrorless.webp",
    description: "Mirrorless cameras are modern cameras that offer similar image quality to DSLRs while being more compact and using an electronic viewfinder.",
    pros: [
      "Compact and lightweight body",
      "Superior video features",
      "Silent shooting capability",
      "Advanced autofocus",
      "WYSIWYG (What You See Is What You Get) electronic viewfinder"
    ],
    cons: [
      "Shorter battery life",
      "More limited lens selection (improving)",
      "Overheating issues in some models",
      "High price for professional models"
    ],
    idealFor: "Travel photography, video content creation, street photography",
    link: "/mirrorless-cameras"
  },
  {
    id: "compact",
    name: "Compact Cameras",
    image: "/images/cameras/categories/compact.webp",
    description: "Compact cameras are pocket-sized cameras with fixed lenses and easy-to-use interfaces.",
    pros: [
      "Ultra-portable size",
      "Ease of use",
      "Better image quality than smartphones",
      "Zoom capability",
      "Good performance in automatic modes"
    ],
    cons: [
      "Limited manual control",
      "Non-interchangeable lens",
      "Limited low-light performance",
      "Small sensor size"
    ],
    idealFor: "Daily use, travel, family events, beginner photography",
    link: "/compact-cameras"
  },
  {
    id: "action",
    name: "Action Cameras",
    image: "/images/cameras/categories/action.webp",
    description: "Action cameras are ultra-durable and compact video cameras designed for use in challenging conditions.",
    pros: [
      "Very durable construction",
      "Waterproof feature",
      "Wide-angle lens",
      "Stabilization technology",
      "Compact size"
    ],
    cons: [
      "Limited low-light performance",
      "Short battery life",
      "Low audio quality",
      "Limited zoom capability"
    ],
    idealFor: "Adventure sports, underwater shooting, POV (point of view) videos, extreme conditions",
    link: "/action-cameras"
  },
  {
    id: "vlog",
    name: "Vlog Cameras",
    image: "/images/cameras/categories/vlog.webp",
    description: "Vlog cameras are designed for content creators with advanced self-shooting features.",
    pros: [
      "Flip screen",
      "Advanced autofocus",
      "Good microphone quality",
      "Compact size",
      "Social media connectivity features"
    ],
    cons: [
      "Usually fixed lens",
      "Smaller sensor than DSLR/mirrorless",
      "Limited manual control",
      "Overheating in some models"
    ],
    idealFor: "YouTube content creators, social media influencers, video bloggers",
    link: "/vlog-cameras"
  }
];

// Satın alma faktörleri ve diğer veriler sonraki adımlarda eklenecek

export default function BuyingGuide() {
  // Animasyon referansları
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroButtonsRef = useRef(null);
  const introTitleRef = useRef(null);
  const introTextRef = useRef(null);
  const camerasWrapperRef = useRef(null);
  const cameraCardsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const factorsSectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaSectionRef = useRef(null);
  const faqRef = useRef(null);
  const tableRef = useRef(null);
  const parallaxBgRef = useRef(null);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden flex items-center justify-center">
        {/* Background and Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-700/60 to-indigo-700/80 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/images/cameras/categories/buying-guide.webp)` }}
          ref={parallaxBgRef}
        ></div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-20 text-center">
          <h1 ref={heroTitleRef} className="text-4xl md:text-6xl font-bold text-white mb-6">Camera Buying Guide</h1>
          <p ref={heroSubtitleRef} className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Your comprehensive guide to choosing the perfect camera for your photography level and needs
          </p>
          
          {/* Hero Buttons */}
          <div ref={heroButtonsRef} className="flex flex-wrap gap-4 justify-center">
            <a href="#camera-types" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2">
              <FaCamera /> Explore Camera Types
            </a>
            <a href="#buying-factors" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-all flex items-center gap-2">
              <FaInfoCircle /> Buying Factors
            </a>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 px-4 container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 ref={introTitleRef} className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Comprehensive Guide to Choosing the Right Camera</h2>
          <div ref={introTextRef} className="space-y-6">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Choosing the right camera should match both your budget and your photography or video shooting needs. With so many camera options available in the market, determining which type of camera is best for you can be a complex process.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              In this guide, we&apos;ll help you make the right choice by examining the features, advantages, and disadvantages of different camera types. We&apos;ll also evaluate the factors to consider during purchase and the best options for your budget.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              By the end of this guide, you&apos;ll have identified the camera type that best suits your needs and be able to make an informed decision in your purchase process.
            </p>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section id="table-of-contents" className="py-12 px-4 bg-gray-100 dark:bg-gray-800 rounded-3xl mx-4 md:mx-8 lg:mx-16 mb-16">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white text-center">What&apos;s in This Guide?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="#camera-types" className="flex gap-4 items-center p-4 bg-white dark:bg-gray-700 rounded-xl hover:shadow-lg transition-all group">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 flex-shrink-0 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-all">
                <MdCameraAlt className="text-blue-500 dark:text-blue-300 text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white text-lg">Camera Types</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Comparison of DSLR, mirrorless, compact, and other camera types</p>
              </div>
            </a>
            
            <a href="#buying-factors" className="flex gap-4 items-center p-4 bg-white dark:bg-gray-700 rounded-xl hover:shadow-lg transition-all group">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 flex-shrink-0 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-all">
                <MdSettings className="text-blue-500 dark:text-blue-300 text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white text-lg">Buying Factors</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Technical features to consider when choosing a camera</p>
              </div>
            </a>
            
            <a href="#comparison" className="flex gap-4 items-center p-4 bg-white dark:bg-gray-700 rounded-xl hover:shadow-lg transition-all group">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 flex-shrink-0 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-all">
                <MdCompare className="text-blue-500 dark:text-blue-300 text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white text-lg">Comparison Table</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Compare different camera types side by side</p>
              </div>
            </a>
            
            <a href="#decision-guide" className="flex gap-4 items-center p-4 bg-white dark:bg-gray-700 rounded-xl hover:shadow-lg transition-all group">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 flex-shrink-0 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-all">
                <FaSearch className="text-blue-500 dark:text-blue-300 text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white text-lg">Decision Guide</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Find the best camera for your needs</p>
              </div>
            </a>
            
            <a href="#faq" className="flex gap-4 items-center p-4 bg-white dark:bg-gray-700 rounded-xl hover:shadow-lg transition-all group">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 flex-shrink-0 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-all">
                <FaQuestionCircle className="text-blue-500 dark:text-blue-300 text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white text-lg">Frequently Asked Questions</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Most common questions about camera purchase</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Step 2: Camera Types Section */}
      <section id="camera-types" className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white text-center">Camera Types</h2>
          <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Understand the features, advantages, and disadvantages of different camera types to choose the one that best suits your needs
          </p>
          
          <div className="space-y-16" ref={camerasWrapperRef}>
            {cameraTypes.map((camera, index) => (
              <div 
                key={camera.id}
                ref={(el) => {
                  if (cameraCardsRefs.current) {
                    cameraCardsRefs.current[index] = el;
                  }
                }}
                className="flex flex-col md:flex-row gap-8 bg-gray-50 dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg p-6"
              >
                <div className="md:w-1/3 relative aspect-video md:aspect-square overflow-hidden rounded-xl">
                  <Image 
                    src={camera.image}
                    alt={`${camera.name} example`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {camera.id.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{camera.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{camera.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white flex items-center gap-2">
                        <FaCheckCircle className="text-green-500" /> Advantages
                      </h4>
                      <ul className="space-y-2">
                        {camera.pros.map((pro, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                            <span className="text-green-500 mt-1">✓</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white flex items-center gap-2">
                        <span className="text-red-500 font-bold">✕</span> Disadvantages
                      </h4>
                      <ul className="space-y-2">
                        {camera.cons.map((con, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                            <span className="text-red-500 mt-1">✕</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Ideal Use Cases:</h4>
                    <p className="text-gray-700 dark:text-gray-300">{camera.idealFor}</p>
                  </div>
                  
                  <Link 
                    href={camera.link}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all"
                  >
                    <FaCamera /> Explore {camera.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buying Factors Section */}
      <section id="buying-factors" className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white text-center">Important Factors to Consider When Choosing a Camera</h2>
          <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Key technical features and factors to keep in mind when making the right camera selection
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Sensor Size and Resolution",
                content: "Sensor size (Full-Frame, APS-C, Micro 4/3, etc.) affects image quality, depth of field, and low-light performance. Resolution (megapixels) determines the level of detail, but higher doesn't always mean better.",
                icon: <MdPhotoCamera className="text-2xl" />
              },
              {
                title: "Lens Ecosystem",
                content: "The variety of lenses available for your camera body is important. Having a wide range of lens options for different types of shooting enhances your photography experience. Also consider your future lens investments.",
                icon: <MdCameraAlt className="text-2xl" />
              },
              {
                title: "Autofocus Performance",
                content: "Fast and accurate autofocus system is critically important, especially when shooting moving subjects. Features like eye tracking, face recognition, and subject tracking also provide significant advantages.",
                icon: <MdSettings className="text-2xl" />
              },
              {
                title: "Video Features",
                content: "If you plan to shoot video, the resolution (4K, 1080p), frame rate, codec, and bit rate offered by the camera are important. Features like microphone input and HDMI output also facilitate your video workflow.",
                icon: <MdVideocam className="text-2xl" />
              },
              {
                title: "Image Stabilization",
                content: "In-body (IBIS) or in-lens stabilization reduces shake when shooting at low shutter speeds or when recording video, resulting in sharper results.",
                icon: <MdSettings className="text-2xl" />
              },
              {
                title: "Battery Life and Ergonomics",
                content: "Good battery life is important for long shooting days. Also, the camera's grip ergonomics, control layout, and overall ease of use are very important factors in the long run.",
                icon: <FaCheckCircle className="text-2xl" />
              },
              {
                title: "Connectivity Features",
                content: "Connectivity features such as Wi-Fi, Bluetooth, and NFC enable transferring photos to mobile devices and remote control capabilities. These features are important for social media sharing.",
                icon: <MdCompare className="text-2xl" />
              },
              {
                title: "Budget and Value",
                content: "The most expensive camera may not always be the best option for you. It's important to choose a camera that offers the features most suitable for your needs and intended use, giving you value for your money.",
                icon: <FaMoneyBillWave className="text-2xl" />
              }
            ].map((factor, index) => (
              <div 
                key={index}
                ref={(el) => {
                  if (factorsSectionRefs.current) {
                    factorsSectionRefs.current[index] = el;
                  }
                }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 flex-shrink-0">
                    <span className="text-blue-600 dark:text-blue-300">
                      {factor.icon}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{factor.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{factor.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Camera Types Comparison */}
      <section id="comparison" className="py-16 px-4 bg-white dark:bg-gray-800" ref={tableRef}>
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white text-center">Camera Types Comparison</h2>
          <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Compare different camera types side by side to find the best option that meets your needs
          </p>

          <div className="overflow-x-auto pb-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-50 dark:bg-blue-900/30">
                  <th className="p-4 border-b-2 border-blue-200 dark:border-blue-800 text-left">Feature</th>
                  <th className="p-4 border-b-2 border-blue-200 dark:border-blue-800 text-left">DSLR</th>
                  <th className="p-4 border-b-2 border-blue-200 dark:border-blue-800 text-left">Mirrorless</th>
                  <th className="p-4 border-b-2 border-blue-200 dark:border-blue-800 text-left">Compact</th>
                  <th className="p-4 border-b-2 border-blue-200 dark:border-blue-800 text-left">Action</th>
                  <th className="p-4 border-b-2 border-blue-200 dark:border-blue-800 text-left">Vlog</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-4 font-medium">Size and Weight</td>
                  <td className="p-4">Large and Heavy</td>
                  <td className="p-4">Medium</td>
                  <td className="p-4">Small and Light</td>
                  <td className="p-4">Very Small</td>
                  <td className="p-4">Small-Medium</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <td className="p-4 font-medium">Image Quality</td>
                  <td className="p-4">Excellent</td>
                  <td className="p-4">Excellent</td>
                  <td className="p-4">Good</td>
                  <td className="p-4">Medium</td>
                  <td className="p-4">Good-Very Good</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-4 font-medium">Lens Interchangeability</td>
                  <td className="p-4">Yes</td>
                  <td className="p-4">Yes</td>
                  <td className="p-4">No</td>
                  <td className="p-4">Limited</td>
                  <td className="p-4">Model Dependent</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <td className="p-4 font-medium">Autofocus</td>
                  <td className="p-4">Good-Very Good</td>
                  <td className="p-4">Excellent</td>
                  <td className="p-4">Good</td>
                  <td className="p-4">Basic</td>
                  <td className="p-4">Very Good</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-4 font-medium">Video Capabilities</td>
                  <td className="p-4">Good</td>
                  <td className="p-4">Excellent</td>
                  <td className="p-4">Good</td>
                  <td className="p-4">Very Good</td>
                  <td className="p-4">Excellent</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <td className="p-4 font-medium">Battery Life</td>
                  <td className="p-4">Excellent</td>
                  <td className="p-4">Good</td>
                  <td className="p-4">Good</td>
                  <td className="p-4">Poor</td>
                  <td className="p-4">Medium</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-4 font-medium">Durability</td>
                  <td className="p-4">Very Good</td>
                  <td className="p-4">Good-Very Good</td>
                  <td className="p-4">Medium</td>
                  <td className="p-4">Excellent</td>
                  <td className="p-4">Good</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <td className="p-4 font-medium">Price Range</td>
                  <td className="p-4">Medium-High</td>
                  <td className="p-4">Medium-Very High</td>
                  <td className="p-4">Low-Medium</td>
                  <td className="p-4">Low-Medium</td>
                  <td className="p-4">Medium</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-4 font-medium">Learning Curve</td>
                  <td className="p-4">Steep</td>
                  <td className="p-4">Medium-Steep</td>
                  <td className="p-4">Low</td>
                  <td className="p-4">Low</td>
                  <td className="p-4">Low-Medium</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="p-4 font-medium">Ideal User</td>
                  <td className="p-4">Professionals, Serious Amateurs</td>
                  <td className="p-4">Professionals, Content Creators</td>
                  <td className="p-4">Travelers, Daily Users</td>
                  <td className="p-4">Adventure Enthusiasts, Athletes</td>
                  <td className="p-4">Content Creators, Vloggers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Decision Guide */}
      <section id="decision-guide" className="py-16 px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white text-center">Which Camera is Right for You?</h2>
          <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Determine the most suitable camera type based on your answers to the following questions
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="space-y-10">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">1. What will you use the camera for?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="font-medium text-gray-700 dark:text-gray-300">Professional Photography</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">DSLR or Mirrorless cameras are ideal.</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="font-medium text-gray-700 dark:text-gray-300">Video Content Creation</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Mirrorless or Vlog cameras are more suitable.</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="font-medium text-gray-700 dark:text-gray-300">Travel and Daily Use</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Compact cameras are the ideal choice.</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="font-medium text-gray-700 dark:text-gray-300">Adventure and Sports Activities</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Action cameras are the most suitable option.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">2. What&apos;s your budget?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="font-medium text-gray-700 dark:text-gray-300">Low (Under $500)</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Compact, Action, or entry-level Vlog cameras</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="font-medium text-gray-700 dark:text-gray-300">Medium ($500-$1500)</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Entry/mid-level DSLR, Mirrorless, or premium Vlog cameras</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="font-medium text-gray-700 dark:text-gray-300">High ($1500+)</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Professional DSLR or Mirrorless cameras</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">3. How important is portability?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="font-medium text-gray-700 dark:text-gray-300">Very Important</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Compact, Action, or Vlog cameras</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="font-medium text-gray-700 dark:text-gray-300">Moderately Important</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Mirrorless cameras (with lighter lenses)</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="font-medium text-gray-700 dark:text-gray-300">Not Important</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">DSLR cameras (for better grip and battery life)</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">4. What&apos;s your photography experience level?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="font-medium text-gray-700 dark:text-gray-300">Beginner</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Compact or entry-level DSLR/Mirrorless</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="font-medium text-gray-700 dark:text-gray-300">Intermediate</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Mid-level DSLR or Mirrorless cameras</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="font-medium text-gray-700 dark:text-gray-300">Advanced/Professional</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Professional DSLR or Mirrorless cameras</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border-l-4 border-yellow-500">
                <h4 className="font-bold text-yellow-700 dark:text-yellow-400 mb-2">Having trouble deciding?</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Each camera type has its own advantages and disadvantages. We recommend trying different models in a camera store if possible. Also, visit our detailed pages for each camera category for more information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 bg-white dark:bg-gray-800" ref={faqRef}>
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white text-center">Frequently Asked Questions</h2>
          <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Answers to the most common questions about camera selection and purchase
          </p>

          <div className="space-y-6">
            {[
              {
                question: "What is the main difference between DSLR and mirrorless cameras?",
                answer: "DSLR cameras use a mirror mechanism to reflect the image to an optical viewfinder, while mirrorless cameras use an electronic viewfinder. Mirrorless cameras are more compact and lighter, generally offer better video features, and can shoot silently. DSLRs offer longer battery life, a wider selection of lenses, and typically better ergonomics."
              },
              {
                question: "Which type of camera is best for beginners?",
                answer: "For beginners, entry-level DSLR or mirrorless cameras are often recommended. These cameras offer room for growth in your photography journey while providing automatic modes for immediate good results. Alternatively, if portability is important and you want a simpler experience, a good compact camera might be ideal."
              },
              {
                question: "How important is the megapixel count when choosing a camera?",
                answer: "Megapixel count affects resolution and thus the level of detail in photos. However, more megapixels don't always mean better image quality. Sensor size, lens quality, and image processing capabilities are often more important than megapixel count. Most modern cameras offer sufficient megapixels (16MP and above) for normal prints and digital use."
              },
              {
                question: "Is it safe to buy a used camera?",
                answer: "Buying a used camera can be safe if purchased from the right source. It's safer to buy from reputable sellers or specialized camera stores, or platforms that offer product warranty or return policies. It's important to physically inspect the camera, check the shutter count, and test all functions before purchasing."
              },
              {
                question: "Which is more important: camera body or lens?",
                answer: "Generally, the lens is more important in determining image quality than the camera body. A good lens can produce excellent results with a mid-range body, while a poor lens will limit results even with the best body. Therefore, investing in quality lenses is often a better investment. You can start with a kit lens and expand your lens collection over time."
              },
              {
                question: "What are the most important camera features for video shooting?",
                answer: "Important features for video shooting include: 4K resolution, high frame rate options (60fps or higher), effective image stabilization, good autofocus, microphone input, long recording times, and good battery life. Mirrorless cameras and dedicated vlog cameras typically excel in video performance."
              },
              {
                question: "When should I consider getting a full-frame camera?",
                answer: "Full-frame cameras offer advantages in low-light performance, wider dynamic range, and better depth-of-field control. Consider a full-frame camera if you're doing professional portrait, landscape, architectural, or wedding photography, frequently shoot in low-light conditions, or need to create large prints. However, these cameras are typically more expensive and heavier."
              },
              {
                question: "What are the essential camera accessories?",
                answer: "Essential camera accessories include: spare batteries, memory cards, cleaning kit, UV filter (lens protection), tripod or monopod, camera bag, and for more advanced use, external flash or microphone. Depending on your use case, you might also consider remote control, ND filters, or a gimbal."
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
              >
                <button 
                  className="w-full text-left p-6 font-bold text-gray-800 dark:text-white text-lg flex justify-between items-center focus:outline-none"
                  onClick={() => {
                    const content = document.getElementById(`faq-content-${index}`);
                    if (content) {
                      content.classList.toggle('hidden');
                    }
                  }}
                >
                  {item.question}
                  <FaQuestionCircle className="text-blue-500 ml-3 flex-shrink-0" />
                </button>
                <div id={`faq-content-${index}`} className="hidden p-6 pt-0 text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-600">
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-900 to-indigo-900 text-white relative overflow-hidden" ref={ctaSectionRef}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-purple-400 rounded-full filter blur-2xl"></div>
        </div>

        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Have You Chosen Your Camera Type?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Now that you know which camera type suits you best with our guide, discover the top cameras in each category!
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <Link href="/dslr-cameras" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-6 rounded-xl flex flex-col items-center transition-all">
              <FaCamera className="text-3xl mb-4" />
              <span className="font-medium">DSLR Cameras</span>
            </Link>
            <Link href="/mirrorless-cameras" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-6 rounded-xl flex flex-col items-center transition-all">
              <MdCameraAlt className="text-3xl mb-4" />
              <span className="font-medium">Mirrorless Cameras</span>
            </Link>
            <Link href="/compact-cameras" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-6 rounded-xl flex flex-col items-center transition-all">
              <MdPhotoCamera className="text-3xl mb-4" />
              <span className="font-medium">Compact Cameras</span>
            </Link>
            <Link href="/action-cameras" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-6 rounded-xl flex flex-col items-center transition-all">
              <MdVideocam className="text-3xl mb-4" />
              <span className="font-medium">Action Cameras</span>
            </Link>
            <Link href="/vlog-cameras" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-6 rounded-xl flex flex-col items-center transition-all">
              <FaCamera className="text-3xl mb-4" />
              <span className="font-medium">Vlog Cameras</span>
            </Link>
          </div>
          
          <div className="mt-12 bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10 shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Still Undecided?</h3>
            <p className="mb-6">
              Need expert advice on camera selection? Let us know your needs and budget, and we&apos;ll recommend the best models for you.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-blue-900 px-8 py-3 rounded-full font-medium hover:bg-blue-50 transition-all">
              <FaInfoCircle /> Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 