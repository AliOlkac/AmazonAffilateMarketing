import { GA_MEASUREMENT_ID } from '../components/GoogleAnalytics';

// Sayfa görüntülemelerini izleme
export const pageview = (url: string) => {
  if (process.env.NODE_ENV === 'development' || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    console.log('Pageview event triggered in dev mode:', url);
    return;
  }
  
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Özel olayları izleme
interface EventProps {
  action: string;
  category: string;
  label?: string;
  value?: number;
  [key: string]: any; // Diğer özel parametreler
}

export const event = ({ action, category, label, value, ...otherProps }: EventProps) => {
  if (process.env.NODE_ENV === 'development' || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    console.log('Event triggered in dev mode:', { action, category, label, value, otherProps });
    return;
  }
  
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...otherProps,
    });
  }
};

// Kullanım örnekleri:
// Affiliate bağlantısı tıklandığında:
// event({
//   action: 'click',
//   category: 'affiliate_link',
//   label: 'Canon EOS 90D - Amazon',
//   product_id: 'canon-eos-90d',
//   value: 1199 // ürün fiyatı
// });

// İçerik etkileşimi:
// event({
//   action: 'view',
//   category: 'content',
//   label: 'DSLR vs Mirrorless comparison',
//   content_type: 'article',
//   time_on_page: 120 // saniye cinsinden
// });

// Kampanya izleme:
// event({
//   action: 'view',
//   category: 'promotion',
//   label: 'Summer Sale 2025',
//   campaign_id: 'summer-2025',
//   source: 'homepage_banner'
// }); 