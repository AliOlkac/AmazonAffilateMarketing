"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";

// Modern, animated navbar component with dark translucent design
export default function Navbar() {
  // State for mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Use Next.js pathname hook instead of window.location
  const pathname = usePathname();
  
  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Camera categories based on the plan
  const cameraCategories = [
    { name: "DSLR Cameras", path: "/dslr-cameras" },
    { name: "Mirrorless Cameras", path: "/mirrorless-cameras" },
    { name: "Action Cameras", path: "/action-cameras" },
    { name: "Vlog Cameras", path: "/vlog-cameras" },
    { name: "Compact Cameras", path: "/compact-cameras" },
  ];

  // Handle scroll effect - only in client side
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add event listener
    window.addEventListener("scroll", handleScroll);
    
    // Initial scroll check
    handleScroll();
    
    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md
        ${isScrolled 
          ? "py-2 bg-black/10 shadow-lg shadow-black/30" 
          : "py-4 bg-black/10"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative w-10 h-10 overflow-hidden transition-transform duration-300 group-hover:scale-110">
                <Image 
                  src="/images/logo_beyaz.png" 
                  alt="BestCameraReview Logo" 
                  width={40} 
                  height={40} 
                  className="object-contain"
                />
              </div>
              <span className={`font-bold transition-all duration-300 ${isScrolled ? "text-base" : "text-lg"} text-white group-hover:text-blue-400`}>
                BestCameraReview
              </span>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {cameraCategories.map((category) => (
                <Link 
                  href={category.path} 
                  key={category.path}
                  className={`relative px-4 py-2 font-medium transition-all duration-200 rounded-md 
                    hover:bg-white/10 hover:text-blue-400
                    ${pathname === category.path ? "text-blue-400" : "text-gray-200"}`}
                >
                  {category.name}
                  {pathname === category.path && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400"></span>
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                className="p-2 rounded-md text-gray-200 hover:bg-white/10 hover:text-blue-400 transition duration-150"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <FaTimes className="text-lg text-blue-400" />
                ) : (
                  <FaBars className="text-lg" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div 
            className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out
              ${isMenuOpen ? "max-h-96 py-3 opacity-100" : "max-h-0 py-0 opacity-0"}`}
          >
            <div className="flex flex-col space-y-3 border-t border-gray-700 pt-3">
              {cameraCategories.map((category) => (
                <Link 
                  href={category.path} 
                  key={category.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-gray-300 hover:text-blue-400 hover:bg-white/10 font-medium px-2 py-2 rounded-md transition duration-150
                    ${pathname === category.path ? "text-blue-400 bg-white/5" : ""}`}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
      
      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className={`${isScrolled ? "h-16" : "h-20"} transition-all duration-300`}></div>
    </>
  );
} 