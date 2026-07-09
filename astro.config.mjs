// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// ⚠️ Cambiar por el dominio real cuando esté (p. ej. https://masides.es).
// De momento el dominio por defecto de Vercel. Se usa para sitemap y canonical.
const SITE = 'https://mas1des.vercel.app';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  integrations: [sitemap()],
  // Prefetch al pasar el ratón sobre los enlaces → navegación instantánea.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
