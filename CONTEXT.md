# Amazon Affiliate Kamera İnceleme Web Sitesi - Context Dosyasi

## Proje Adı: **LensReviewHub** (Öneri, değiştirilebilir)

## **1. Proje Amacı**
Amazon Affiliate üzerinden gelir elde etmek amacıyla, **fotoğrafçılara** yönelik kapsamlı kamera inceleme ve öneri platformu oluşturulacaktır.

## **2. Hedef Kitle**
- Profesyonel fotoğrafçılar
- Yeni başlayan fotoğrafçılar
- Kamera meraklıları ve teknoloji severler
- Video içerik üreticileri

## **3. Kullanılacak Teknolojiler**
**Frontend:**
- **Next.js 15** (App Router, React Server Components)
- **TailwindCSS** (Hızlı ve modern stilizasyon)
- **ShadCN UI** (Modern ve özelleştirilebilir UI bileşenleri)
- **Lucide Icons** (Modern ikonlar)
- **Next.js Metadata API** (SEO optimizasyonu)
- **Next.js Image Optimization** (Görsel optimizasyonu)
- **React Suspense & Streaming** (Yükleme durumları)

**Backend & Veri:**
- **JSON dosyaları** (Başlangıç aşaması için)
- **Vercel KV** (Hızlı veri depolama ve önbellek)
- **Amazon Product Advertising API** (Ürün verileri)

**Performans & SEO:**
- **Next.js Route Groups** (Sayfa organizasyonu)
- **Dynamic OG Images** (Sosyal medya önizlemeleri)
- **Schema.org Markup** (Zengin sonuçlar)
- **Core Web Vitals** optimizasyonları

**Deployment & Analiz:**
- **Vercel Analytics** (Performans analizi)
- **Google Analytics 4** (Kullanıcı davranışları)
- **Search Console** (SEO takibi)

## **4. Renk Paleti ve Stil Rehberi**

**Ana Renkler:**
- **#1F2937** – Koyu Mavi/Gri (Arka plan ve başlıklar için)
- **#F59E0B** – Altın Sarısı (Öne çıkan butonlar ve CTA için)
- **#E5E7EB** – Açık Gri (Arka plan tonları için)
- **#6B7280** – Orta Gri (İkincil metinler için)
- **#D1D5DB** – Hafif Gri (Kutu ve buton gölgeleri için)

**Font:**
- **Birincil:** Poppins (Modern ve profesyonel)
- **İkincil:** Roboto (Kolay okunabilirlik için)

## **5. Klasör Yapısı**
```
📂 src
│── 📂 app
│   │── 📂 (auth)
│   │   └── [...nextauth]
│   │── 📂 (marketing)
│   │   ├── page.tsx
│   │   └── layout.tsx
│   │── 📂 products
│   │   ├── [slug]
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx
│   │   │   └── error.tsx
│   │   └── layout.tsx
│   └── 📂 blog
│── 📂 components
│   │── 📂 ui (shadcn)
│   │── 📂 custom
│   └── 📂 sections
│── 📂 lib
│   │── 📂 utils
│   └── 📂 config
└── 📂 types
```

## **6. Sayfa Yapısı ve İçerik Planı**

### **Ana Sayfa (`app/page.tsx`)**
```typescript
// Metadata tanımı
export const metadata = {
  title: 'LensReviewHub - Kamera İncelemeleri',
  description: 'Profesyonel kamera incelemeleri ve karşılaştırmaları',
  openGraph: {
    // ... OpenGraph meta verileri
  }
}

// Sayfa bileşenleri
- HeroSection (@/components/sections/hero)
- FeaturedProducts (@/components/sections/featured)
- BlogPreview (@/components/sections/blog-preview)
- CategoryGrid (@/components/sections/categories)
```

### **Ürün Sayfaları (`app/products/[slug]/page.tsx`)**
```typescript
// Dinamik metadata
export async function generateMetadata({ params }) {
  // Ürün bilgilerine göre dinamik meta veriler
}

// Sayfa bileşenleri
- ProductDetails
- PriceComparison
- RelatedProducts
- CustomerReviewSection (@/components/sections/customer-reviews)
```

### **Müşteri Yorumları ve Fotoğraf Galerisi**
```typescript
// Müşteri Yorumları Bileşeni
interface CustomerReview {
  rating: number;
  comment: string;
  photos?: {
    url: string;
    caption: string;
  }[];
  verifiedPurchase: boolean;
  helpful: number;
  date: string;
}

// Galeri Grid Bileşeni
- Masonry layout ile fotoğraf galerisi
- Lightbox özelliği
- EXIF bilgileri gösterimi (varsa)
- Fotoğrafçı bilgileri ve sosyal medya linkleri
```

#### **Müşteri İçeriği Kullanımı**
- Amazon'dan seçilmiş en iyi müşteri yorumları
- Öne çıkan müşteri fotoğrafları galerisi
- Her fotoğraf için teknik detaylar:
  - Kullanılan lens bilgisi
  - Çekim ayarları (ISO, Enstantane, Diyafram)
  - Çekim koşulları (gün ışığı, stüdyo vb.)
- Başarılı fotoğrafların çekim hikayeleri

#### **İçerik Organizasyonu**
1. **Profesyonel İnceleme**
   - Teknik özellikler
   - Uzman görüşü
   - Test sonuçları

2. **Kullanıcı Deneyimleri**
   - Seçilmiş müşteri yorumları
   - Örnek fotoğraflar galerisi
   - Kullanım ipuçları

3. **Fotoğraf Galerisi**
   - Kategorilere ayrılmış müşteri fotoğrafları
   - Her fotoğraf için detaylı bilgi kartı
   - Fotoğrafçı profili ve iletişim bilgileri

#### **Yasal Uyarılar**
- Amazon müşteri yorumlarının kullanım izinleri
- Fotoğraf hakları ve kullanım şartları
- Telif hakkı bildirimleri

## **7. Kullanıcı Deneyimi ve Performans**
- **React Suspense** ile yükleme durumları
- **Streaming** ile sayfa parçalı yükleme
- **Route Groups** ile optimize edilmiş navigasyon
- **Image Optimization** ile otomatik görsel optimizasyonu
- **Dynamic OG Images** ile sosyal medya önizlemeleri

## **8. Trafik Çekme Stratejisi (SEO + Sosyal Medya)**
✅ **SEO Odaklı İçerik Üretimi**
- Google'da üst sıralara çıkmak için **detaylı ürün incelemeleri** ve **karşılaştırmalar** yazılacak.
- **Schema Markup** (Zengin snippet desteği)

✅ **YouTube ve Pinterest Entegrasyonu**
- YouTube'da video incelemeler paylaşılacak, siteye gömülecek.
- Pinterest'te fotoğrafçılıkla ilgili içerikler paylaşılacak.

✅ **Google Ads ve Sosyal Medya Reklamları**
- Ücretli Google Ads ve Facebook Ads kullanılarak ilk trafik çekilecek.
- Reddit ve fotoğrafçılık forumlarında paylaşımlar yapılacak.

## **9. Gelir Modeli**
1. **Amazon Affiliate** (%3 - %6 komisyon)
2. **Google Adsense & Alternatif Reklamlar**
3. **Markalarla Sponsorluk ve İnceleme Anlaşmaları**
4. **Dijital Ürünler (Fotoğrafçılık rehberleri, presetler, e-kitaplar)**

---

# **Sonuç ve Yol Haritası**
🚀 **1. Aşama – Next.js Projesini Kur ve Temel Sayfaları Hazırla** ✅
🚀 **2. Aşama – JSON ile İlk Ürünleri Manuel Ekleyerek Test Et** ✅
🚀 **3. Aşama – SEO ve Trafik Çekme Stratejisini Devreye Al** 🔜
🚀 **4. Aşama – Amazon API veya Scraper API Kullanarak Dinamik Veri Çek** 🔜
🚀 **5. Aşama – Sosyal Medya & YouTube Entegrasyonlarını Ekle** 🔜

Bu proje **hızlı, SEO odaklı ve gelir getirebilecek** şekilde optimize edilmiştir. 🎯

## Yeni Yol Haritası

### Hafta 1: Temel Yapı
- Next.js 15 projesi kurulumu
- ShadCN UI entegrasyonu ve tema
- Temel sayfa şablonları
- Responsive tasarım
- TypeScript tip tanımlamaları

### Hafta 2: Veri ve İçerik
- JSON veri yapısı oluşturma
- İlk 5 ürün detaylı içeriği
- SEO optimizasyonları
- Şema işaretlemeleri
- Metadata API implementasyonu

### Hafta 3: Özellikler
- Ürün karşılaştırma sistemi
- Gelişmiş arama fonksiyonu
- Filtreleme sistemi
- Performans optimizasyonları
- Error boundary'ler

### Hafta 4: Entegrasyonlar
- Amazon API entegrasyonu
- Vercel Analytics kurulumu
- Sosyal medya paylaşım sistemi
- A/B test senaryoları
- Son performans optimizasyonları

