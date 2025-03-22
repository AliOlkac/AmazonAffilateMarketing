import type { Metadata, Viewport } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import Navbar from "./components/Navbar";
import FooterWrapper from "./components/FooterWrapper";
import JsonLd from "./components/JsonLd";
import CriticalCSS from "./components/CriticalCSS";
import MobileCompatibilityTester from "./components/MobileCompatibilityTester";

// Font optimizasyonu - display: swap seçeneği ile fontun yüklenmesi gecikse bile metin görünür
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,  // Kritik fontları önceden yükle
  fallback: ['system-ui', 'Arial', 'sans-serif'], // Yedek font ailesi
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://bestcamerareview.com'),
  title: "Best Camera Reviews - Expert Camera Buying Guide 2025",
  description: "Expert camera reviews, buying guides, and comparisons for DSLR, mirrorless, action, vlog, and compact cameras. Find the best cameras for your needs.",
  icons: {
    icon: [
      {
        url: '/images/logo.png',
        href: '/images/logo.png',
      },
    ],
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    title: 'Best Camera Reviews - Expert Camera Buying Guide 2025',
    description: 'Expert camera reviews, buying guides, and comparisons for DSLR, mirrorless, action, vlog, and compact cameras. Find the best cameras for your needs.',
    url: 'https://bestcamerareview.com',
    siteName: 'Best Camera Review',
    images: [
      {
        url: '/images/logo.png',
        width: 800,
        height: 600,
        alt: 'Best Camera Review Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Camera Reviews - Expert Camera Buying Guide 2025',
    description: 'Expert camera reviews, buying guides, and comparisons for DSLR, mirrorless, action, vlog, and compact cameras.',
    images: ['/images/logo.png'],
  },
  // Ana sayfa için canonical URL
  alternates: {
    canonical: 'https://bestcamerareview.com',
  },
  // Tarayıcı önbelleğe alma direktifleri
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black',
    'format-detection': 'telephone=no',
    'msapplication-TileColor': '#0F4C81',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#0F4C81',
  },
};

// Web sitesi için JSON-LD yapılandırılmış veri
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Best Camera Review',
  url: 'https://bestcamerareview.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://bestcamerareview.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string'
  },
  description: 'Expert camera reviews, buying guides, and comparisons for DSLR, mirrorless, action, vlog, and compact cameras.',
};

// Organizasyon için JSON-LD yapılandırılmış veri
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Best Camera Review',
  url: 'https://bestcamerareview.com',
  logo: 'https://bestcamerareview.com/images/logo.png',
  sameAs: [
    'https://twitter.com/bestcamerareview',
    'https://facebook.com/bestcamerareview',
    'https://instagram.com/bestcamerareview'
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Kritik olmayan CSS dosyaları
  const nonCriticalStylesheets: string[] = [
    // Bu dosyalar bulunamadığı için kaldırıldı
  ];

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* DNS Prefetching - bağlanacağımız harici kaynaklar */}
        <link rel="dns-prefetch" href="https://images-na.ssl-images-amazon.com" />
        
        {/* Preconnect - önemli kaynaklar için erken bağlantı */}
        <link rel="preconnect" href="https://images-na.ssl-images-amazon.com" crossOrigin="anonymous" />
        
        {/* Preload - kritik kaynaklar */}
        <link rel="preload" href="/images/logo.png" as="image" />
        <link rel="canonical" href="https://bestcamerareview.com/current-path" />
      </head>
      <body
        className={`${inter.className} antialiased min-h-screen flex flex-col`}
      >
        {/* Analytics ve çerez ilgili tüm bileşenler kaldırıldı */}
        
        {/* Yapılandırılmış veriler */}
        <JsonLd data={websiteJsonLd} />
        <JsonLd data={organizationJsonLd} />
        
        {/* Kritik CSS önbelleğe alma */}
        <CriticalCSS stylesheets={nonCriticalStylesheets} />
        
        {/* Mobil uyumluluk test aracı - sadece geliştirme ortamında görünür */}
        <MobileCompatibilityTester />
        
        <Navbar />
        <main className="flex-grow">{children}</main>
        <FooterWrapper />
      </body>
    </html>
  );
}
