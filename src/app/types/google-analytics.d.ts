// Google Analytics için TypeScript tiplerini tanımlama
interface Window {
  gtag: (
    command: string,
    action: string | Date,
    config?: {
      [key: string]: string | number | boolean | null | undefined;
    }
  ) => void;
  dataLayer: Array<Record<string, unknown>>;
}

// Event tracking için tip tanımı
interface GTagEvent {
  action: string;
  category: string;
  label: string;
  value?: number;
  [key: string]: string | number | boolean | undefined;
} 