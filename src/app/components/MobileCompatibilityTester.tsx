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
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  
  // Sadece geliştirme ortamında veya showInProduction=true olduğunda göster
  const shouldShow = process.env.NODE_ENV !== 'production' || showInProduction;
  
  // Yaygın mobil cihaz boyutları
  const devices: Device[] = [
    { name: 'iPhone SE', width: 375, height: 667 },
    { name: 'iPhone X/11/12/13', width: 390, height: 844 },
    { name: 'Samsung Galaxy S20', width: 360, height: 800 },
    { name: 'iPad', width: 768, height: 1024 },
    { name: 'iPad Pro', width: 1024, height: 1366 },
  ];

  useEffect(() => {
    // Sadece geliştirme modunda veya kullanıcı tarafından açıkça talep edildiğinde göster
    if (!shouldShow) return;
    
    // Ctrl+Shift+M tuş kombinasyonuyla aracı aç/kapat
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'M') {
        setIsVisible(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shouldShow]);

  // Cihaz seçildiğinde tarayıcı boyutlarını değiştir
  const handleDeviceSelect = (device: Device | null) => {
    if (device) {
      setSelectedDevice(device.name);
      window.resizeTo(device.width, device.height);
    } else {
      setSelectedDevice(null);
    }
  };

  if (!shouldShow || !isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-w-xs">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-gray-800 dark:text-white">Mobil Uyumluluk Testi</h3>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-2">
        <p className="text-xs text-gray-600 dark:text-gray-300">Cihaz boyutunu seçin:</p>
        
        <div className="grid grid-cols-2 gap-2">
          {devices.map(device => (
            <button
              key={device.name}
              onClick={() => handleDeviceSelect(device)}
              className={`text-xs p-2 rounded ${
                selectedDevice === device.name 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
            >
              {device.name}
              <span className="block text-[10px]">{device.width}x{device.height}</span>
            </button>
          ))}
          
          <button
            onClick={() => handleDeviceSelect(null)}
            className="text-xs p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 col-span-2"
          >
            Sıfırla
          </button>
        </div>
        
        <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-2">
          Not: Bu araç sadece geliştirme aşamasında kullanılmak üzere tasarlanmıştır. Ctrl+Shift+M tuş kombinasyonuyla açıp kapatabilirsiniz.
        </p>
      </div>
    </div>
  );
} 