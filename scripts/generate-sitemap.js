import fs from 'fs';
import path from 'path';

// Kamera kategorileri
const cameraCategories = [
  'dslr-cameras',
  'mirrorless-cameras',
  'compact-cameras',
  'action-cameras',
  'vlog-cameras'
];

const baseUrl = 'https://bestcamerareview.com';

// Ana sitemap oluştur
function generateSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Ana Sayfa -->
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Kamera Kategorileri -->
  ${cameraCategories.map(category => `
  <url>
    <loc>${baseUrl}/${category}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}

  <!-- Diğer Sayfalar -->
  <url>
    <loc>${baseUrl}/cameras</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/buying-guide</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;

  // public klasörüne kaydet
  const publicPath = path.join(process.cwd(), 'public');
  
  // public klasörü yoksa oluştur
  if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath, { recursive: true });
  }

  fs.writeFileSync(path.join(publicPath, 'sitemap.xml'), sitemap);
  console.log('Sitemap.xml başarıyla oluşturuldu!');
}

// Scripti çalıştır
generateSitemap(); 