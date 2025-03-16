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

// Altsayfalar - yardımcı ve bilgilendirici içerikler
const subPages = [
  { path: 'cameras', priority: 0.8 },
  { path: 'buying-guide', priority: 0.9 },
  { path: 'comparison', priority: 0.7 },
  { path: 'accessories', priority: 0.6 },
  { path: 'blog', priority: 0.7 },
  { path: 'about', priority: 0.5 },
  { path: 'contact', priority: 0.5 },
  { path: 'privacy-policy', priority: 0.3 },
  { path: 'terms-of-service', priority: 0.3 },
];

// sitemap.ts dosyası arama motorlarına sitenizin yapısını ve önemli sayfalarını bildirir
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bestcamerareview.com';
  const currentDate = new Date();
  const lastMonth = new Date(currentDate);
  lastMonth.setMonth(currentDate.getMonth() - 1);
  
  let sitemapEntries = [];
  
  // Ana sayfa - En yüksek önceliğe sahip
  sitemapEntries.push({
    url: baseUrl,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 1.0,
  });
  
  // Kamera kategorileri
  cameraCategories.forEach(category => {
    sitemapEntries.push({
      url: `${baseUrl}/${category.path}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: category.priority,
    });
    
    // Her kategori için marka sayfaları
    cameraBrands.forEach(brand => {
      // Eğer marka ilgili kategori ile uyumluysa (örn. GoPro sadece action-cameras ile ilişkili)
      if (
        !(category.path === 'action-cameras' && !['gopro', 'dji', 'insta360'].includes(brand.name)) &&
        !(category.path === 'vlog-cameras' && ['olympus'].includes(brand.name))
      ) {
        sitemapEntries.push({
          url: `${baseUrl}/${category.path}/${brand.name}`,
          lastModified: lastMonth,
          changeFrequency: 'monthly',
          priority: brand.priority,
        });
      }
    });
  });
  
  // Alt sayfalar
  subPages.forEach(page => {
    sitemapEntries.push({
      url: `${baseUrl}/${page.path}`,
      lastModified: page.path.includes('policy') || page.path.includes('terms') ? 
        new Date(currentDate.getFullYear(), 0, 1) : // Politika sayfaları yılda bir güncellenir
        currentDate,
      changeFrequency: page.path.includes('blog') ? 'weekly' : 'monthly',
      priority: page.priority,
    });
  });
  
  // Popüler ürün sayfaları 
  // Not: Gerçek uygulamada bunlar veritabanından veya JSON dosyasından çekilebilir
  const popularProducts = [
    { path: 'dslr-cameras/canon-eos-90d', priority: 0.7 },
    { path: 'mirrorless-cameras/sony-a7-iv', priority: 0.7 },
    { path: 'action-cameras/gopro-hero11-black', priority: 0.7 },
    { path: 'vlog-cameras/sony-zv-1-ii', priority: 0.7 },
    { path: 'compact-cameras/sony-rx100-vii', priority: 0.7 },
  ];
  
  popularProducts.forEach(product => {
    sitemapEntries.push({
      url: `${baseUrl}/${product.path}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: product.priority,
    });
  });
  
  return sitemapEntries;
} 