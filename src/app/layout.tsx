import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import Navbar from "./components/Navbar";
import FooterWrapper from "./components/FooterWrapper";
import JsonLd from "./components/JsonLd";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bestcamerareview.com'),
  title: "Best Camera Reviews - Expert Camera Buying Guide 2024",
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
    title: 'Best Camera Reviews - Expert Camera Buying Guide 2024',
    description: 'Expert camera reviews, buying guides, and comparisons for DSLR, mirrorless, action, vlog, and compact cameras.',
    images: ['/images/logo.png'],
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
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased min-h-screen flex flex-col`}
      >
        <JsonLd data={websiteJsonLd} />
        <JsonLd data={organizationJsonLd} />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <FooterWrapper />
      </body>
    </html>
  );
}
