"use client";

import Link from "next/link";
import { FaCamera, FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaEnvelope } from "react-icons/fa";

// Modern footer component for the camera review website
export default function Footer() {
  // Current year for copyright text
  const currentYear = new Date().getFullYear();

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
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Footer top section with logo and navigation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and about text */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <FaCamera className="text-blue-400 text-2xl" />
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
                  className="text-gray-400 hover:text-blue-400 transition duration-300"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.path}
                    className="text-gray-400 hover:text-white transition duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Camera categories */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Camera Categories</h3>
            <ul className="space-y-2">
              {cameraCategories.map((category, index) => (
                <li key={index}>
                  <Link 
                    href={category.path}
                    className="text-gray-400 hover:text-white transition duration-300"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter signup */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest camera reviews and deals.
            </p>
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
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6"></div>

        {/* Footer bottom with copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© {currentYear} BestCameraReview. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Amazon affiliate links help support our content.
          </p>
        </div>
      </div>
    </footer>
  );
} 