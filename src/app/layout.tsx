import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import FooterWrapper from "./components/FooterWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <FooterWrapper />
      </body>
    </html>
  );
}
