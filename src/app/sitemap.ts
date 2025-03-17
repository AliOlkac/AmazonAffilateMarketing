import { MetadataRoute } from 'next';

// Kamera kategorileri
const cameraCategories = [
  { path: 'dslr-cameras', priority: 0.8 },
  { path: 'mirrorless-cameras', priority: 0.8 },
  { path: 'compact-cameras', priority: 0.8 },
  { path: 'action-cameras', priority: 0.8 },
  { path: 'vlog-cameras', priority: 0.8 }
];

// Kamera markaları - bu kategorilerin alt sayfaları olacak
const cameraBrands = [
  { name: 'canon', priority: 0.7 },
  { name: 'nikon', priority: 0.7 },
  { name: 'sony', priority: 0.7 },
  { name: 'fujifilm', priority: 0.7 },
  { name: 'panasonic', priority: 0.7 },
  { name: 'olympus', priority: 0.7 },
  { name: 'gopro', priority: 0.7 },
  { name: 'dji', priority: 0.7 },
];

// Mevcut sayfalar
const existingPages = [
  { path: 'cameras', priority: 0.8 },
  { path: 'buying-guide', priority: 0.9 },
];

// URL'lerin geçerli olduğunu kontrol eden yardımcı fonksiyon
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    console.error(`Geçersiz URL: ${url}`);
    return false;
  }
}

// sitemap.ts dosyası arama motorlarına sitenizin yapısını ve önemli sayfalarını bildirir
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://bestcamerareview.com';
  const currentDate = new Date();
  const lastMonth = new Date(currentDate);
  lastMonth.setMonth(currentDate.getMonth() - 1);
  
  const sitemapEntries: MetadataRoute.Sitemap = [];
  
  try {
    // Ana sayfa - En yüksek önceliğe sahip
    sitemapEntries.push({
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    });
    
    // Kamera kategorileri
    for (const category of cameraCategories) {
      const categoryUrl = `${baseUrl}/${category.path}`;
      if (isValidUrl(categoryUrl)) {
        sitemapEntries.push({
          url: categoryUrl,
          lastModified: currentDate,
          changeFrequency: 'weekly',
          priority: category.priority,
        });
        
        // Her kategori için marka sayfaları
        for (const brand of cameraBrands) {
          // Eğer marka ilgili kategori ile uyumluysa
          if (
            !(category.path === 'action-cameras' && !['gopro', 'dji', 'insta360'].includes(brand.name)) &&
            !(category.path === 'vlog-cameras' && ['olympus'].includes(brand.name))
          ) {
            const brandUrl = `${categoryUrl}/${brand.name}`;
            if (isValidUrl(brandUrl)) {
              sitemapEntries.push({
                url: brandUrl,
                lastModified: lastMonth,
                changeFrequency: 'monthly',
                priority: brand.priority,
              });
            }
          }
        }
      }
    }
    
    // Mevcut sayfalar
    for (const page of existingPages) {
      const pageUrl = `${baseUrl}/${page.path}`;
      if (isValidUrl(pageUrl)) {
        sitemapEntries.push({
          url: pageUrl,
          lastModified: currentDate,
          changeFrequency: 'weekly',
          priority: page.priority,
        });
      }
    }
    
    console.log(`Sitemap başarıyla oluşturuldu. Toplam URL sayısı: ${sitemapEntries.length}`);
    return sitemapEntries;
    
  } catch (error) {
    console.error('Sitemap oluşturulurken hata oluştu:', error);
    // Hata durumunda en azından ana sayfayı içeren minimal bir sitemap döndür
    return [{
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    }];
  }
}