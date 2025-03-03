"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FaCamera, FaBars, FaTimes, FaSearch } from "react-icons/fa";

// Modern, animated navbar component for the camera review website
export default function Navbar() {
  // State for mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle search bar
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    // Focus on search input when opened
    if (!isSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  };

  // Camera categories based on the plan
  const cameraCategories = [
    { name: "DSLR Cameras", path: "/dslr-cameras" },
    { name: "Mirrorless Cameras", path: "/mirrorless-cameras" },
    { name: "Action Cameras", path: "/action-cameras" },
    { name: "Vlog Cameras", path: "/vlog-cameras" },
    { name: "Compact Cameras", path: "/compact-cameras" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    // Set active link based on current path
    const path = window.location.pathname;
    setActiveLink(path);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "py-2 bg-white shadow-lg" : "py-4 bg-white/95"}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo and site name - will be replaced with actual logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative overflow-hidden">
                <FaCamera className={`text-blue-600 text-3xl transition-transform duration-300 ${isScrolled ? "scale-90" : "scale-100"} group-hover:scale-110`} />
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </div>
              <span className={`font-bold transition-all duration-300 ${isScrolled ? "text-lg" : "text-xl"} text-gray-800 group-hover:text-blue-600`}>BestCameraReview</span>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {cameraCategories.map((category) => (
                <Link 
                  href={category.path} 
                  key={category.path}
                  className={`relative px-4 py-2 font-medium transition-all duration-200 rounded-md hover:bg-blue-50 
                    ${activeLink === category.path ? "text-blue-600" : "text-gray-700"}`}
                >
                  {category.name}
                  {activeLink === category.path && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400"></span>
                  )}
                </Link>
              ))}
              
              {/* Search button */}
              <button 
                onClick={toggleSearch}
                className="p-2 rounded-full text-gray-600 hover:bg-blue-50 transition duration-150 ml-2"
                aria-label="Search"
              >
                <FaSearch className="text-lg" />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                className="p-2 rounded-md text-gray-600 hover:bg-blue-50 transition duration-150"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-96 py-3 opacity-100" : "max-h-0 py-0 opacity-0"}`}>
            <div className="flex flex-col space-y-3 border-t border-gray-200 pt-3">
              {cameraCategories.map((category) => (
                <Link 
                  href={category.path} 
                  key={category.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-gray-600 hover:text-blue-600 hover:bg-blue-50 font-medium px-2 py-2 rounded-md transition duration-150
                    ${activeLink === category.path ? "text-blue-600 bg-blue-50" : ""}`}
                >
                  {category.name}
                </Link>
              ))}
              
              {/* Mobile search */}
              <div className="pt-2 pb-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search cameras..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <FaSearch className="absolute right-3 top-3 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Search overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isSearchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleSearch}
      >
        <div 
          className={`absolute top-0 left-0 w-full transition-transform duration-300 ${isSearchOpen ? 'translate-y-0' : '-translate-y-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white p-4 shadow-lg">
            <div className="container mx-auto relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search for cameras, brands, or features..."
                className="w-full px-4 py-3 border-2 border-blue-500 rounded-md focus:outline-none"
              />
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600"
                onClick={toggleSearch}
                aria-label="Close search"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className={`${isScrolled ? "h-16" : "h-20"} transition-all duration-300`}></div>
    </>
  );
} 