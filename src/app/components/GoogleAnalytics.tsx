'use client';

import { useEffect } from 'react';
import Script from 'next/script';

// Google Analytics ölçüm kimliği
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'; // Gerçek ID'nizi buraya ekleyin

export default function GoogleAnalytics() {
  useEffect(() => {
    // Eğer geliştirme modundaysa veya kimlik varsayılan değerse Analytics'i yükleme
    if (process.env.NODE_ENV === 'development' || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
      console.log('Google Analytics geliştirme modunda yüklenmedi veya ölçüm kimliği ayarlanmadı.');
      return;
    }
    
    // Google Analytics tarafından veri toplamaya izin verilen cookieler
    // Bu örnek, GDPR uyumluluğu için cookie kabul sürecini beklemeden
    // minimal düzeyde çalışmayı gösterir
    window.gtag('consent', 'default', {
      'analytics_storage': 'denied', // Analitik depolama başlangıçta reddedildi
      'ad_storage': 'denied', // Reklam depolama başlangıçta reddedildi
      'wait_for_update': 500 // 500ms içinde güncelleme bekle
    });
  }, []);
  
  // Kullanıcı gizlilik tercihlerini güncelledikten sonra çağrılacak fonksiyon
  // (kullanıcı cookie kabul formu ile etkileşime girdiğinde)
  const updateConsent = (consent: { analytics: boolean, ads: boolean }) => {
    window.gtag('consent', 'update', {
      'analytics_storage': consent.analytics ? 'granted' : 'denied',
      'ad_storage': consent.ads ? 'granted' : 'denied'
    });
  };
  
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
export { GA_MEASUREMENT_ID };
export const updateConsent = (consent: { analytics: boolean, ads: boolean }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      'analytics_storage': consent.analytics ? 'granted' : 'denied',
      'ad_storage': consent.ads ? 'granted' : 'denied'
    });
  }
}; 