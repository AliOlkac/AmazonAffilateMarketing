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
    formats: ['image/webp'],
  },

  // Enable React strict mode
  reactStrictMode: true,
}

module.exports = nextConfig 