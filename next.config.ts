import { type NextConfig } from "next";

// Harici görsel kaynaklarına izin veriyoruz
// Amazon görsellerini kullanabilmek için Images konfigürasyonu eklendi
const nextConfig: NextConfig = {
  images: {
    domains: ['m.media-amazon.com'], // Amazon görsellerine izin ver
  },
};

export default nextConfig;
