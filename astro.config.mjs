// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { defaultLocale, locales } from './src/i18n/config.ts';
import netlifyFiles from './src/integrations/netlify-files.mjs';

// URL canòniques del sitemap de Fase 1: català sense prefix i barra final.
export default defineConfig({
  site: 'https://www.serralleriacarbo.com',
  trailingSlash: 'always',
  i18n: {
    locales: [...locales],
    defaultLocale,
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [netlifyFiles()],
  vite: {
    plugins: [tailwindcss()],
  },
});
