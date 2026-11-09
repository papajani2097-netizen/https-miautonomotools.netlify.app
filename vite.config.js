import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const pages = JSON.parse(readFileSync(new URL('./src/data/seo-pages.json', import.meta.url), 'utf8'));
const siteName = 'MiAutónomoTools';

const publicRoutes = Object.keys(pages);

function seoFilesPlugin(siteUrl) {
  return {
    name: 'seo-files',
    apply: 'build',
    generateBundle() {
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${publicRoutes
        .map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`)
        .join('\n')}\n</urlset>\n`;
      const robots = `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`;
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap });
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots });
    },

    closeBundle() {
      const distDir = new URL('./dist/', import.meta.url);
      const indexPath = new URL('index.html', distDir);
      const baseHtml = readFileSync(indexPath, 'utf8');
      const escapeAttribute = (value) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
      const htmlForPage = (route, page) => {
        const title = `${page.title} | ${siteName}`;
        const canonical = `${siteUrl}${route}`;
        const description = escapeAttribute(page.description);
        const metadata = [
          `<link rel="canonical" href="${canonical}">`,
          '<meta property="og:type" content="website">',
          '<meta property="og:locale" content="es_ES">',
          `<meta property="og:site_name" content="${siteName}">`,
          `<meta property="og:title" content="${escapeAttribute(title)}">`,
          `<meta property="og:description" content="${description}">`,
          `<meta property="og:url" content="${canonical}">`
        ].join('\n    ');
        return baseHtml
          .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
          .replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${description}" />`)
          .replace('</head>', `    ${metadata}\n  </head>`);
      };

      writeFileSync(indexPath, htmlForPage('/', pages['/']));
      for (const route of publicRoutes) {
        if (route === '/') continue;
        const routeIndex = new URL(`${route.slice(1)}index.html`, distDir);
        mkdirSync(dirname(fileURLToPath(routeIndex)), { recursive: true });
        writeFileSync(routeIndex, htmlForPage(route, pages[route]));
      }

      const notFoundHtml = baseHtml
        .replace(/<title>[\s\S]*?<\/title>/, `<title>Página no encontrada | ${siteName}</title>`)
        .replace(/<meta name="description" content="[^"]*"\s*\/?>/, '<meta name="description" content="No hemos encontrado la página que buscas." />')
        .replace('</head>', `    <meta name="robots" content="noindex,follow">\n  </head>`);
      writeFileSync(new URL('404.html', distDir), notFoundHtml);
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = (env.VITE_SITE_URL || 'https://miautonomotools.es').replace(/\/+$/, '');
  return {
    plugins: [react(), seoFilesPlugin(siteUrl)]
  };
});
