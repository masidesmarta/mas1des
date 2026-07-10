// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// ⚠️ Cambiar por el dominio real cuando esté (p. ej. https://masides.es).
// De momento el dominio por defecto de Vercel. Se usa para sitemap y canonical.
const SITE = 'https://mas1des.vercel.app';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  // Español en la raíz, inglés en /en/ (sin prefijo para el idioma por defecto).
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-ES', en: 'en' },
      },
    }),
  ],
  // Prefetch al pasar el ratón sobre los enlaces → navegación instantánea.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
