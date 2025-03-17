import fs from 'fs';
import { globby } from 'globby';

const SITE_URL = 'https://bestcamerareview.com';

function addPage(page: string) {
  const path = page
    .replace('src/app/pages', '')
    .replace('.tsx', '')
    .replace('.ts', '')
    .replace('/page', '');
  const route = path === '/index' ? '' : path;

  return `
    <url>
        <loc>${SITE_URL}${route}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>${route === '' ? '1.0' : '0.8'}</priority>
    </url>`;
}

async function generateSitemap() {
  // Get all .tsx and .ts pages except Next.js specific files
  const pages = await globby([
    'src/app/pages/**/*.tsx',
    'src/app/pages/**/*.ts',
    '!src/app/pages/_*.tsx',
    '!src/app/pages/_*.ts',
    '!src/app/pages/api',
  ]);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages.map(addPage).join('\n')}
    </urlset>`;

  fs.writeFileSync('public/', sitemap);
  console.log('Sitemap generated successfully!');
}

export default generateSitemap; 