import { MetadataRoute } from 'next';

// robots.ts dosyası arama motorlarına hangi sayfaların taranabileceğini belirtir
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/'], // Eğer özel veya admin sayfalarınız varsa bunları disallow edebilirsiniz
    },
    sitemap: 'https://bestcamerareview.com/sitemap.xml', // Sitemap URL'iniz
  };
} 