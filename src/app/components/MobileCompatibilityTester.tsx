'use client';

import { useState, useEffect } from 'react';

interface MobileCompatibilityProps {
  showInProduction?: boolean;
}

type Device = {
  name: string;
  width: number;
  height: number;
};

// Mobil uyumluluk testlerini kolaylaştıran geliştirici aracı
export default function MobileCompatibilityTester({ showInProduction = false }: MobileCompatibilityProps) {
  // Şimdilik devre dışı bırakıldı - Navbar görünürlük sorunları nedeniyle
  return null;
} 