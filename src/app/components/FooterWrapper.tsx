"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

// Client component to handle Footer re-rendering between pages
export default function FooterWrapper() {
  const pathname = usePathname();
  return <Footer key={pathname} />;
} 