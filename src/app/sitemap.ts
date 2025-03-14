import { MetadataRoute } from 'next';

// sitemap.ts dosyası arama motorlarına sitenizin yapısını ve önemli sayfalarını bildirir
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bestcamerareview.com';
  
  // Ana sayfalar
  const routes = [
    '',
    '/dslr-cameras',
    '/mirrorless-cameras',
    '/compact-cameras',
    '/action-cameras',
    '/vlog-cameras',
    '/cameras',
    '/buying-guide',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Diğer dinamik sayfalar buraya eklenebilir
  // Örneğin, veritabanından veya JSON dosyasından çekilen kamera detay sayfaları

  return routes;
} 