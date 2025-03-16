// Google Analytics için TypeScript tiplerini tanımlama
interface Window {
  gtag: (
    command: string,
    action: string | Date,
    config?: {
      [key: string]: any;
    }
  ) => void;
  dataLayer: any[];
}

// Event tracking için tip tanımı
interface GTagEvent {
  action: string;
  category: string;
  label: string;
  value?: number;
  [key: string]: any;
} 