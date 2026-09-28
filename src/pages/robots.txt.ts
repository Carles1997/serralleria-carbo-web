// robots.txt de publicació. Permet el rastreig: les pàgines no aprovades ja porten
// <meta name="robots" content="noindex"> (FASE5-indexacio.md), i bloquejar-les aquí impediria que
// Google llegís aquest noindex. Indica el sitemap generat amb la mateixa regla d'indexació.
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('/sitemap.xml', site ?? 'https://www.serralleriacarbo.com').href;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
