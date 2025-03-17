'use client';

// MobileCompatibilityTester bileşeni, geliştirme sırasında farklı cihazlarda görünüm test etmek için kullanılır
// Düşük opacity ile görüntülenir ve üretim ortamında gösterilmez
export default function MobileCompatibilityTester() {
  // Üretim ortamında gösterilmemesi için kontrol
  // const isProduction = process.env.NODE_ENV === 'production';
  // const showInProduction = false;
  
  // Üretim ortamında bileşeni gösterme
  // if (isProduction && !showInProduction) return null;
  
  return null; // GSAP kaldırıldığı için şimdilik devre dışı bıraktık
} 