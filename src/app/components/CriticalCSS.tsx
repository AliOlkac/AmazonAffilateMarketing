'use client';

import { useEffect } from 'react';
import { loadCSS } from '../utils/performance';

interface CriticalCSSProps {
  stylesheets?: string[];
}

// Kritik CSS'leri önbelleğe alan bileşen
export default function CriticalCSS({ stylesheets = [] }: CriticalCSSProps) {
  useEffect(() => {
    // Sayfanın ilk yüklemesi tamamlandıktan sonra
    // stil dosyalarını asenkron olarak yükle
    const nonCritical = setTimeout(() => {
      stylesheets.forEach(href => {
        loadCSS(href);
      });
    }, 100);

    // Kritik CSS'leri önbelleğe almak için preload uygula
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    links.forEach(link => {
      if (link.getAttribute('media') !== 'print') {
        link.setAttribute('media', 'all');
      }
    });

    return () => {
      clearTimeout(nonCritical);
    };
  }, [stylesheets]);

  return null;
} 