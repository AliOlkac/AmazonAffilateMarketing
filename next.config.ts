import { type NextConfig } from "next";

// Harici görsel kaynaklarına izin veriyoruz
// Görsel optimizasyonu için Images konfigürasyonu genişletildi
const nextConfig: NextConfig = {
  images: {
    domains: [
      'm.media-amazon.com',
      'www.bhphotovideo.com',
      'images.bestcamerareview.com',
      'bestcamerareview.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'www.bhphotovideo.com',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'bestcamerareview.com',
        pathname: '/images/**',
      },
    ],
    // Görsel kalitesi - 75 değeri, iyi bir performans/kalite dengeleme sağlar
    quality: 75,
    // Varsayılan biçim olarak WebP kullanımını etkinleştirir (daha verimli)
    formats: ['image/webp'],
  },
  // Sayfaların önbellekleme davranışı
  staticPageGenerationTimeout: 120,
  // Content Security Policy
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
