// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { defaultLocale, locales } from './src/i18n/config.ts';
import netlifyFiles from './src/integrations/netlify-files.mjs';
import { siteUrl } from './src/config/site-url.mjs';
import { earlyFlagsHash } from './src/config/csp-hashes.mjs';

// URL canòniques del sitemap de Fase 1: català sense prefix i barra final.
export default defineConfig({
  site: siteUrl,
  trailingSlash: 'always',
  i18n: {
    locales: [...locales],
    defaultLocale,
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [netlifyFiles()],
  // Content-Security-Policy (Fase 8, tasca 8.9; 16/10/2026). Astro afegeix a cada pàgina un <meta> amb
  // script-src i style-src basats en les empremtes dels scripts i estils que hi insereix, més la del script
  // inicial de BaseLayout (earlyFlagsHash, src/config/csp-hashes.mjs): no cal 'unsafe-inline' per a cap
  // script. Excepcions justificades:
  // - style-src-attr 'unsafe-inline': atributs style de les plantilles (--i de les entrades escalonades,
  //   --chars dels titulars ajustats, etc.). Només estils, sense execució de codi.
  // - frame-src: el mapa de Google, que només es carrega si el visitant ho demana (place-map.ts).
  // frame-ancestors no té efecte en un <meta>: va a public/_headers, amb X-Frame-Options.
  // Cap contingut no té blocs de codi: sense Shiki, que fa servir estils en línia incompatibles amb la CSP.
  markdown: { syntaxHighlight: false },
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self'",
        "font-src 'self'",
        "connect-src 'self'",
        "media-src 'none'",
        "object-src 'none'",
        "frame-src https://www.google.com https://maps.google.com",
        "form-action 'self'",
        "base-uri 'self'",
        "manifest-src 'self'",
        'upgrade-insecure-requests',
      ],
      scriptDirective: { hashes: [earlyFlagsHash] },
      styleDirective: {
        resources: ["'self'", { resource: "'unsafe-inline'", kind: 'attribute' }],
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
