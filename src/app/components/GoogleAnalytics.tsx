'use client';

import { useEffect } from 'react';
import Script from 'next/script';

// Google Analytics ölçüm kimliği
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'; // Gerçek ID'nizi buraya ekleyin

// Google Analytics izleme kodunu sayfaya ekleyen bileşen
// Kullanıcı çerez onayını verdikten sonra aktifleşir
export default function GoogleAnalytics() {
  useEffect(() => {
    // Sayfa görüntülemelerini izlemek için pageview olayını tetikle
    const handleRouteChange = (url: string) => {
      if (window.gtag) {
        window.gtag('config', GA_MEASUREMENT_ID, {
          page_path: url,
          cookie_flags: 'SameSite=None;Secure'
        });
      }
    };

    // Next.js App Router ile route değişimlerini dinle
    // (burada geçici bir çözüm, tam Router olayları App Router'da henüz resmi olarak desteklenmiyor)
    const handleUrlChange = () => {
      handleRouteChange(window.location.pathname + window.location.search);
    };

    // MutationObserver kullanarak DOM değişikliklerini dinle
    const observer = new MutationObserver(handleUrlChange);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);
  
  // Bu bileşeni kullanmak ve consent'i güncellemek için:
  // 1. Bu bileşeni layout.tsx içinde import edin
  // 2. Cookie consent bileşeninizden bu modülden export edilen updateConsent fonksiyonunu çağırın
  
  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              cookie_flags: 'SameSite=None;Secure',
              anonymize_ip: true, // GDPR için IP anonimleştirme
            });
          `,
        }}
      />
    </>
  );
}

// Dışa aktarılan fonksiyonlar
export const updateConsent = (consent: { analytics: boolean, ads: boolean }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      'analytics_storage': consent.analytics ? 'granted' : 'denied',
      'ad_storage': consent.ads ? 'granted' : 'denied'
    });
  }
}; 