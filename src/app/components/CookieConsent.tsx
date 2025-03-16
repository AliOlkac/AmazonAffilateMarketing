'use client';

import { useState, useEffect } from 'react';
import { updateConsent } from './GoogleAnalytics';

interface CookieSettings {
  analytics: boolean;
  ads: boolean;
  // İhtiyaç duyulursa buraya daha fazla çerez kategorisi eklenebilir
}

// GDPR ve çerez yönetmeliklerine uygun çerez onay bileşeni
export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [cookieSettings, setCookieSettings] = useState<CookieSettings>({
    analytics: false,
    ads: false,
  });
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Kullanıcının daha önce bir seçim yapıp yapmadığını kontrol et
    const hasConsented = localStorage.getItem('cookie-consent');
    
    if (!hasConsented) {
      // Kullanıcı daha önce seçim yapmamışsa consent banner'ı göster
      setShowConsent(true);
    } else {
      // Kullanıcının önceki tercihlerini yükle
      try {
        const settings = JSON.parse(hasConsented) as CookieSettings;
        setCookieSettings(settings);
        
        // Google Analytics için consent durumunu güncelle
        updateConsent(settings);
      } catch {
        // JSON ayrıştırma hatası durumunda (localStorage verisi geçersizse)
        localStorage.removeItem('cookie-consent');
        setShowConsent(true);
      }
    }
  }, []);

  // Tüm çerezleri kabul et
  const acceptAll = () => {
    const settings = { analytics: true, ads: true };
    setCookieSettings(settings);
    saveConsent(settings);
    setShowConsent(false);
  };

  // Sadece gerekli çerezleri kabul et
  const acceptEssential = () => {
    const settings = { analytics: false, ads: false };
    setCookieSettings(settings);
    saveConsent(settings);
    setShowConsent(false);
  };

  // Kullanıcının seçimlerini kaydet
  const saveCustomSelection = () => {
    saveConsent(cookieSettings);
    setShowConsent(false);
  };

  // Tercihleri localStorage'a kaydet ve Analytics'i güncelle
  const saveConsent = (settings: CookieSettings) => {
    localStorage.setItem('cookie-consent', JSON.stringify(settings));
    updateConsent(settings);
  };

  // Çerez ayarlarını değiştir
  const handleSettingChange = (setting: keyof CookieSettings) => {
    setCookieSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  // Çerez ayarlarını yönet butonunu gösterdiğimiz bir fonksiyon
  const CookieSettingsButton = () => (
    <button 
      onClick={() => setShowConsent(true)}
      className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 underline"
      aria-label="Çerez Ayarlarını Yönet"
    >
      Çerez Ayarlarını Yönet
    </button>
  );

  if (!showConsent) {
    // Kullanıcı hâlihazırda tercih yaptıysa, sadece küçük bir buton göster
    return <div className="fixed bottom-2 left-2 z-40">
      <CookieSettingsButton />
    </div>;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Çerez Tercihleri</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              Bu sitede, deneyiminizi geliştirmek için çerezler kullanıyoruz. Tercihlerinizi aşağıda ayarlayabilirsiniz.
              <button 
                onClick={() => setExpanded(!expanded)}
                className="ml-1 underline text-blue-600 dark:text-blue-400"
              >
                {expanded ? 'Daha Az Göster' : 'Daha Fazla Bilgi'}
              </button>
            </p>

            {expanded && (
              <div className="mt-4 mb-4">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="analytics"
                        type="checkbox"
                        checked={cookieSettings.analytics}
                        onChange={() => handleSettingChange('analytics')}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <div className="ml-3">
                      <label htmlFor="analytics" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Analitik Çerezler
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Sitemizin nasıl kullanıldığını anlamamıza yardımcı olan çerezler.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="ads"
                        type="checkbox"
                        checked={cookieSettings.ads}
                        onChange={() => handleSettingChange('ads')}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <div className="ml-3">
                      <label htmlFor="ads" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Reklam Çerezleri
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        İlgili reklamlar göstermemiz için kullanılan çerezler.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={acceptEssential}
              className="px-4 py-2 text-sm bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 rounded transition-colors"
            >
              Sadece Gerekli Olanlar
            </button>
            
            {expanded && (
              <button
                onClick={saveCustomSelection}
                className="px-4 py-2 text-sm bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800 rounded transition-colors"
              >
                Seçimlerimi Kaydet
              </button>
            )}
            
            <button
              onClick={acceptAll}
              className="px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 rounded transition-colors"
            >
              Tümünü Kabul Et
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 