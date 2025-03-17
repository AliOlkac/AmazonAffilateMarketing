/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization settings
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images-na.ssl-images-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'bestcamerareview.com',
      }
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60, // Resimlerin önbelleğe alınma süresi (60 saniye)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048], // Responsive görsel boyutları
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Görsel boyutları
  },

  // Enable React strict mode
  reactStrictMode: true,

  // Performance optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Generate sitemap during build
  generateSitemap: true,

  // Caching and performance
  onDemandEntries: {
    // Sayfa önbelleğe alma süresi (dev modunda)
    maxInactiveAge: 25 * 1000,
    // Dev modunda aynı anda önbellekte tutulacak sayfa sayısı
    pagesBufferLength: 2,
  },

  // Statik optimizasyon
  output: 'standalone',
}

module.exports = nextConfig 