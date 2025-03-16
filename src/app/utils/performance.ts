// Görsel lazy loading için Intersection Observer yardımcı fonksiyonu
export const setupIntersectionObserver = (elementSelector: string, callback: (entries: IntersectionObserverEntry[]) => void) => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return;
  }

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver(callback, options);
  const elements = document.querySelectorAll(elementSelector);
  elements.forEach(element => observer.observe(element));

  return () => {
    elements.forEach(element => observer.unobserve(element));
  };
};

// Performans ölçümü için yardımcı fonksiyon
export const measurePerformance = (label: string) => {
  if (process.env.NODE_ENV !== 'production') {
    console.time(label);
    return () => {
      console.timeEnd(label);
    };
  }
  return () => {};
};

// JavaScript kodunu geciktirme için yardımcı fonksiyon
export const loadScriptLazily = (src: string, id: string, defer = true, async = true): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Skript zaten yüklenmişse, işlemin başarılı olduğunu bildir
    if (document.getElementById(id)) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.id = id;
    script.defer = defer;
    script.async = async;

    script.onload = () => resolve();
    script.onerror = (error) => reject(error);

    document.body.appendChild(script);
  });
};

// Sayfa görüntülendikten sonra kritik olmayan işlemleri geciktirme
export const deferNonCriticalTasks = (tasks: Array<() => void>, timeout = 1000) => {
  if (typeof window !== 'undefined') {
    // Tarayıcı boşta olduğunda veya belirtilen süre sonra
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        tasks.forEach(task => task());
      });
    } else {
      setTimeout(() => {
        tasks.forEach(task => task());
      }, timeout);
    }
  }
};

// CSS stillerini optimize etme
export const loadCSS = (href: string, media = 'all') => {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.media = 'print';
  
  document.head.appendChild(link);
  
  link.onload = () => {
    link.media = media;
  };
}; 