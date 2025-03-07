'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";
import gsap from "gsap";

// Modern, animated navbar component with dark translucent design
export default function Navbar() {
  // State for mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Use Next.js pathname hook instead of window.location
  const pathname = usePathname();
  
  // Refs for GSAP animations
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const mobileButtonRef = useRef(null);
  const mobileMenuRef = useRef(null);
  
  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Camera categories based on the plan
  const cameraCategories = [
    { name: "All Cameras", path: "/cameras" },
    { name: "DSLR Cameras", path: "/dslr-cameras" },
    { name: "Mirrorless Cameras", path: "/mirrorless-cameras" },
    { name: "Action Cameras", path: "/action-cameras" },
    { name: "Vlog Cameras", path: "/vlog-cameras" },
    { name: "Compact Cameras", path: "/compact-cameras" },
  ];

  // Handle scroll effect - only in client side
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
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

  // Initial animation on component mount
  useEffect(() => {
    // Navbar entrance animation
    gsap.from(navbarRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });

    // Logo animation
    gsap.from(logoRef.current, {
      opacity: 0,
      x: -20,
      duration: 0.6,
      delay: 0.2,
      ease: "back.out(1.7)"
    });

    // Links animation - staggered
    gsap.from(".nav-link", {
      opacity: 0,
      y: -10,
      stagger: 0.1,
      duration: 0.5,
      delay: 0.4,
      ease: "power1.out"
    });

    // Mobile button animation
    gsap.from(mobileButtonRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      delay: 0.6,
      ease: "elastic.out(1, 0.5)"
    });
  }, []);

  // Animation for mobile menu toggle
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMenuOpen) {
        // Open animation
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
        );
        
        // Staggered links animation
        gsap.fromTo(
          ".mobile-nav-link",
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, stagger: 0.1, duration: 0.3, delay: 0.1 }
        );
      } else {
        // Only run close animation if the menu was previously open
        const element = mobileMenuRef.current as HTMLElement;
        if (element && element.style.opacity !== "0") {
          gsap.to(mobileMenuRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.2,
            ease: "power2.in"
          });
        }
      }
    }
  }, [isMenuOpen]);

  // Animation for scroll effect
  useEffect(() => {
    if (isScrolled) {
      gsap.to(navbarRef.current, {
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(navbarRef.current, {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        boxShadow: "none",
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [isScrolled]);

  return (
    <>
      <nav 
        ref={navbarRef}
        className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md bg-black
        ${isScrolled ? "py-2 bg-black/10 shadow-lg shadow-black/30" : "py-4 bg-black/10"}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group" ref={logoRef}>
              <div className="relative w-10 h-10 overflow-hidden transition-transform duration-300 group-hover:scale-110">
                <Image 
                  src="/images/logo_beyaz.png" 
                  alt="BestCameraReview Logo" 
                  width={40} 
                  height={40}
                  style={{ width: 'auto', height: 'auto' }}
                  className="object-contain"
                />
              </div>
              <span className={`font-bold transition-all duration-300 ${isScrolled ? "text-base" : "text-lg"} text-white group-hover:text-orange-400`}>
                BestCameraReview
              </span>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-1" ref={linksRef}>
              {cameraCategories.map((category) => (
                <Link 
                  href={category.path} 
                  key={category.path}
                  className={`relative px-4 py-2 font-medium transition-all duration-200 rounded-md 
                    hover:bg-black/10 hover:text-blue-400
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
                ref={mobileButtonRef}
                className="p-2 rounded-md text-gray-200 hover:bg-white/10 hover:text-blue-400 transition duration-150"
                onClick={toggleMenu}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
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
            ref={mobileMenuRef}
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