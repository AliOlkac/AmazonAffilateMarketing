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
- **Next.js** (React tabanlı, SEO dostu)
- **TailwindCSS** (Hızlı ve modern stilizasyon)
- **GSAP (GreenSock Animation Platform)** (Animasyonlar için)
- **ShadCN/UI** (UI bileşenleri için)

**Backend:**
- **Firebase Firestore** veya **JSON dosyaları** (İlk aşamada verileri yönetmek için)
- **MongoDB veya Prisma (Opsiyonel, genişleme için)**

**Diğer:**
- **Vercel** (Deployment için)
- **Amazon Product Advertising API veya Scraper API** (Ürün verileri için)
- **Google Analytics & Search Console** (SEO ve analiz)

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
📂 amazon-affiliate-camera
│── 📂 public             # Statik dosyalar (favicon, görseller vb.)
│── 📂 src
│   │── 📂 components     # UI bileşenleri (Navbar, Footer, Card vb.)
│   │── 📂 layouts        # Sayfa şablonları
│   │── 📂 pages          # Next.js sayfaları
│   │   │── index.tsx     # Ana sayfa
│   │   │── categories    # Kategoriler sayfası
│   │   │── products      # Ürün detay sayfası
│   │   │── blog          # Blog ve içerik sayfası
│   │   │── search.tsx    # Arama sayfası
│   │── 📂 utils          # Yardımcı fonksiyonlar (SEO, formatlama vb.)
│   │── 📂 hooks          # API çağrıları için özel Hook'lar
│   │── 📂 lib            # Veritabanı veya API bağlantıları
│   │── 📂 styles         # Tailwind ve özel CSS dosyaları
│── 📂 data               # JSON veri deposu (Geçici ürün bilgileri)
│── .env.local            # API anahtarları
│── next.config.js        # Next.js yapılandırması
│── tailwind.config.js    # Tailwind yapılandırması
│── tsconfig.json         # TypeScript yapılandırması
│── package.json          # Bağımlılıklar ve script'ler
│── README.md             # Proje dokümantasyonu
```

## **6. Sayfa Yapısı ve İçerik Planı**

### **Ana Sayfa (`/index.tsx`)**
- Hero bölümü (Büyük ve etkileyici bir fotoğraf, "En iyi kameraları keşfet" CTA butonu)
- Öne çıkan ürünler (Amazon Affiliate linkleri)
- En çok okunan blog yazıları
- Kategoriler (DSLR, Mirrorless, Aksiyon Kameraları, Lensler vb.)

### **Kategori Sayfaları (`/categories/[category].tsx`)**
- Belirli bir kamera türüne özel listeleme
- Filtreleme (Fiyat, Marka, Özellikler)
- SEO odaklı uzun içerikler

### **Ürün Detay Sayfaları (`/products/[slug].tsx`)**
- Ürün özellikleri (Teknik detaylar, avantajlar/dezavantajlar)
- Kullanıcı yorumları (Amazon’dan veya manuel olarak eklenen yorumlar)
- YouTube incelemeleri embed
- Satın alma CTA (Amazon Affiliate Link)

### **Blog ve İçerik Sayfaları (`/blog/[slug].tsx`)**
- SEO odaklı yazılar
- "En iyi 10 kamera", "Fotoğrafçılık ipuçları" gibi konular
- Uzun kuyruklu (long-tail) anahtar kelimeler ile trafik çekme

### **Arama Sayfası (`/search.tsx`)**
- Kullanıcıların doğrudan istedikleri kameraları arayabilmesi
- Otomatik tamamlama özelliği

## **7. Kullanıcı Deneyimi ve Animasyonlar (GSAP ile)**
- Sayfa geçişlerinde **yumuşak fade-in efektleri**
- Ürün listelerinde **scroll reveal animasyonları**
- CTA butonlarına **hover efektleri (scale-up, shadow)**
- Hero bölümünde **parallax veya hareketli arka plan animasyonu**

## **8. Trafik Çekme Stratejisi (SEO + Sosyal Medya)**
✅ **SEO Odaklı İçerik Üretimi**
- Google’da üst sıralara çıkmak için **detaylı ürün incelemeleri** ve **karşılaştırmalar** yazılacak.
- **Schema Markup** (Zengin snippet desteği)

✅ **YouTube ve Pinterest Entegrasyonu**
- YouTube’da video incelemeler paylaşılacak, siteye gömülecek.
- Pinterest’te fotoğrafçılıkla ilgili içerikler paylaşılacak.

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

