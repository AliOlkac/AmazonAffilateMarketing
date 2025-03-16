'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageview } from '../utils/analytics';

// Bu bileşen, kullanıcının gezindiği tüm sayfaları Google Analytics'e bildirir
export default function AnalyticsPageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Sayfa tamamen yüklendiğinde görüntüleme gönder
    if (pathname) {
      // Tam URL'yi oluştur (örn. /dslr-cameras?brand=canon)
      let url = pathname;
      const queryString = searchParams?.toString();
      if (queryString) url += `?${queryString}`;
      
      // Sayfa görüntüleme olayını gönder
      pageview(url);
    }
  }, [pathname, searchParams]);

  return null; // Bu bileşen hiçbir şey render etmez
} 