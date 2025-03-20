import { MetadataRoute } from 'next';

// robots.ts dosyası arama motorlarına hangi sayfaların taranabileceğini belirtir
export default function robots(): MetadataRoute.Robots {
  // Web sitesinin ana URL'i
  const baseUrl = 'https://bestcamerareview.com';

  return {
    rules: [
      {
        userAgent: '*', // Tüm arama motoru botları için geçerli
        allow: '/',     // Tüm sayfaların taranmasına izin ver
        disallow: [
          '/private/',       // Özel sayfalar
          '/admin/',         // Admin sayfaları
          '/api/',           // API rotaları
          '/_next/',         // Next.js iç dosyaları
          '/server-sitemap/', // Sunucu tarafında oluşturulan site haritaları
          '/*.json$',        // JSON dosyaları
          '/*.xml$',         // XML dosyaları (sitemap.xml hariç)
          '/*.pdf$',         // PDF dosyaları
          '/search',         // Arama sonuçları sayfaları
          '/login',          // Giriş sayfası
          '/register',       // Kayıt sayfası
          '/checkout',       // Ödeme sayfası (eğer varsa)
          '/cart',           // Sepet sayfası (eğer varsa)
          '/draft/',         // Taslak sayfalar
          '/tmp/',           // Geçici dosyalar
        ],
      },
      {
        userAgent: 'Googlebot', // Google'a özgü kurallar
        allow: '/',
        disallow: [
          '/private/',
          '/admin/',
        ],
      },
      {
        userAgent: 'Bingbot', // Bing'e özgü kurallar
        allow: '/',
        disallow: [
          '/private/',
          '/admin/',
        ],
      },
      {
        userAgent: 'Slurp', // Yahoo'ya özgü kurallar
        allow: '/',
        disallow: [
          '/private/',
          '/admin/',
        ],
      },
      {
        userAgent: 'DuckDuckBot', // DuckDuckGo'ya özgü kurallar
        allow: '/',
        disallow: [
          '/private/',
          '/admin/',
        ],
      },
      {
        userAgent: 'Baiduspider', // Baidu'ya özgü kurallar (Çin'de popüler arama motoru)
        allow: '/',
        disallow: [
          '/private/',
          '/admin/',
        ],
      },
      {
        userAgent: 'YandexBot', // Yandex'e özgü kurallar (Rusya'da popüler arama motoru)
        allow: '/',
        disallow: [
          '/private/',
          '/admin/',
        ],
      },
    ],
    // Sitemap URL'ini ekleyin - Sadece var olan sitemap dosyasını belirtiyoruz
    sitemap: `${baseUrl}/sitemap.xml`,
  };
} 