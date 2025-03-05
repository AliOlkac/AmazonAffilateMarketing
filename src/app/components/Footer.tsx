"use client";

import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaEnvelope } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Modern footer component for the camera review website
export default function Footer() {
  // Current year for copyright text
  const currentYear = new Date().getFullYear();
  
  // State for newsletter form rendering
  const [isMounted, setIsMounted] = useState(false);

  // Refs for GSAP animations
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const quickLinksRef = useRef(null);
  const categoriesRef = useRef(null);
  const newsletterRef = useRef(null);
  const copyrightRef = useRef(null);

  // Only render form after component has mounted on client
  useEffect(() => {
    setIsMounted(true);
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Footer entrance animation when scrolled into view
    gsap.from(footerRef.current, {
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power2.out"
    });
    
    // Logo animation
    gsap.from(logoRef.current, {
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top bottom-=50",
        toggleActions: "play none none none"
      },
      opacity: 0,
      x: -20,
      duration: 0.6,
      delay: 0.2,
      ease: "back.out(1.7)"
    });
    
    // Quick links animation
    gsap.from(quickLinksRef.current, {
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top bottom-=50",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 30,
      duration: 0.5,
      delay: 0.3,
      ease: "power1.out"
    });
    
    // Categories animation
    gsap.from(categoriesRef.current, {
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top bottom-=50",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 30,
      duration: 0.5,
      delay: 0.4,
      ease: "power1.out"
    });
    
    // Newsletter animation
    gsap.from(newsletterRef.current, {
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top bottom-=50",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 30,
      duration: 0.5,
      delay: 0.5,
      ease: "power1.out"
    });
    
    // Copyright animation
    gsap.from(copyrightRef.current, {
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top bottom-=20",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 20,
      duration: 0.5,
      delay: 0.7,
      ease: "power1.out"
    });
    
    // Social icons staggered animation
    gsap.from(".social-icon", {
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top bottom-=50",
        toggleActions: "play none none none"
      },
      opacity: 0,
      scale: 0.5,
      stagger: 0.1,
      duration: 0.5,
      delay: 0.3,
      ease: "back.out(1.7)"
    });
    
    // Links hover animation setup
    const footerLinks = document.querySelectorAll(".footer-link");
    footerLinks.forEach(link => {
      link.addEventListener("mouseenter", () => {
        gsap.to(link, {
          x: 5,
          duration: 0.2,
          ease: "power1.out"
        });
      });
      
      link.addEventListener("mouseleave", () => {
        gsap.to(link, {
          x: 0,
          duration: 0.2,
          ease: "power1.out"
        });
      });
    });
    
    // Clean up animations on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      const footerLinks = document.querySelectorAll(".footer-link");
      footerLinks.forEach(link => {
        link.removeEventListener("mouseenter", () => {});
        link.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

  // Quick links for the footer
  const quickLinks = [
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms of Use", path: "/terms-of-use" },
  ];

  // Camera categories for the footer
  const cameraCategories = [
    { name: "DSLR Cameras", path: "/dslr-cameras" },
    { name: "Mirrorless Cameras", path: "/mirrorless-cameras" },
    { name: "Action Cameras", path: "/action-cameras" },
    { name: "Vlog Cameras", path: "/vlog-cameras" },
    { name: "Compact Cameras", path: "/compact-cameras" },
  ];

  // Social media links for the footer
  const socialLinks = [
    { name: "Facebook", icon: <FaFacebook />, url: "https://facebook.com" },
    { name: "Twitter", icon: <FaTwitter />, url: "https://twitter.com" },
    { name: "Instagram", icon: <FaInstagram />, url: "https://instagram.com" },
    { name: "YouTube", icon: <FaYoutube />, url: "https://youtube.com" },
  ];

  return (
    <footer ref={footerRef} className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Footer top section with logo and navigation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and about text */}
          <div className="col-span-1" ref={logoRef}>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="relative w-8 h-8 overflow-hidden">
                <Image 
                  src="/images/logo_beyaz.png" 
                  alt="BestCameraReview Logo" 
                  width={32} 
                  height={32} 
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-xl">BestCameraReview</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Expert reviews and buying guides for all types of cameras. Find the perfect camera for your photography needs.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon text-gray-400 hover:text-blue-400 transition duration-300"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="col-span-1" ref={quickLinksRef}>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.path}
                    className="footer-link text-gray-400 hover:text-white transition duration-300 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Camera categories */}
          <div className="col-span-1" ref={categoriesRef}>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Camera Categories</h3>
            <ul className="space-y-2">
              {cameraCategories.map((category, index) => (
                <li key={index}>
                  <Link 
                    href={category.path}
                    className="footer-link text-gray-400 hover:text-white transition duration-300 inline-block"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter signup - Client-side only */}
          <div className="col-span-1" ref={newsletterRef}>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest camera reviews and deals.
            </p>
            {isMounted ? (
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none w-full"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md transition duration-300"
                  aria-label="Subscribe"
                >
                  <FaEnvelope />
                </button>
              </form>
            ) : (
              <div className="h-10 bg-gray-800 rounded-md animate-pulse"></div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6"></div>

        {/* Footer bottom with copyright */}
        <div ref={copyrightRef} className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© {currentYear} BestCameraReview. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Amazon affiliate links help support our content.
          </p>
        </div>
      </div>
    </footer>
  );
} 