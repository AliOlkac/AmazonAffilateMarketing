import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Action Cameras of 2025 | Adventure & Sports Camera Reviews",
  description: "Compare the top action cameras of 2025 for adventures, sports, and underwater photography. GoPro, DJI, Insta360 reviews, price comparisons, and expert recommendations.",
  keywords: "best action camera 2025, GoPro Hero 12, DJI Osmo Action, Insta360, 4k action camera, waterproof camera, stabilized action camera, adventure camera, extreme sports camera",
  authors: { name: "BestCameraReview" },
  openGraph: {
    title: "Best Action Cameras of 2025 | Adventure & Sports Camera Reviews",
    description: "Find the perfect action camera for your adventures with our in-depth reviews of GoPro, DJI, Insta360 and more. Waterproof, stabilized, 4K models compared.",
    type: "article",
    url: "https://bestcamerareview.com/action-cameras",
    images: [
      {
        url: "https://bestcamerareview.com/images/cameras/categories/action.webp",
        width: 1200,
        height: 630,
        alt: "Action Cameras Comparison Guide 2025"
      }
    ],
    siteName: "Best Camera Review",
    locale: "en_US",
    publishedTime: new Date().toISOString(),
    modifiedTime: new Date().toISOString(),
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Action Cameras of 2025 | Adventure & Sports Camera Reviews",
    description: "Find the perfect action camera with our comprehensive buying guide. Compare features, durability, and video quality.",
    images: ["https://bestcamerareview.com/images/cameras/categories/action.webp"],
    creator: "@bestcamerareview"
  },
  alternates: {
    canonical: "https://bestcamerareview.com/action-cameras",
  }
}; 