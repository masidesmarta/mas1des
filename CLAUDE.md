# CLAUDE.md — mas1des (portfolio de Marta Masides)

Portfolio web de **Marta Masides**, arquitecta por la ETSAM (Madrid). Proyecto
independiente (lo desarrolla Enrique Becerra). Sitio estático, imagen-first,
minimalista/editorial.

Repo: `github.com/masidesmarta/mas1des` (de Marta). Deploy en **Vercel** (cuenta
de Marta). Web hecha gratis; lleva un crédito discreto a `ebecerra.es` en el footer.

---

## Stack

- **Astro 7** + **Content Collections** (contenido en `src/content/proyectos/`).
- **CSS vanilla** con tokens en `src/styles/global.css` + estilos *scoped* por
  componente/página (`<style>` de Astro). **No** Tailwind, **no** CSS-in-JS.
- Tipografía **Inter** (self-hosted vía `@fontsource-variable/inter`).
- **Lenis** (smooth-scroll) + reveal-on-scroll + parallax leve (todo con guard
  de `prefers-reduced-motion`).
- SEO: `@astrojs/sitemap`, canonical, Open Graph (`public/og.png`), JSON-LD.
- CMS **Keystatic** preparado pero **NO cableado** (ver `docs/cms.md`).

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Dev en http://localhost:4321 |
| `npm run build` | Build de producción a `dist/` |
| `npm run preview` | Sirve el build |
| `npm run check:provisionales` | Lista los proyectos con imágenes provisionales |

## Identidad visual

- Paleta: papel cálido `#f5f3ef` + tinta `#171612`, acento **granate/tinto**
  `#8a2b34` **muy puntual** (punto de firma en títulos de sección, nav activo,
  números/flechas al hover). Grises accesibles (`--muted #6e6b62`, pasa AA).
- **Mascota**: ilustración de la portada del PDF (chica leyendo "PORTFOLIO"),
  en `src/assets/mascota.png`. Es la firma de la marca — se usa en el hero y en
  Contacto. El **favicon** es un recorte de su cabeza. NO repetir la misma
  mascota dos veces en la misma página.
- Home = índice de texto editorial (numerado, miniatura al hover). /proyectos =
  galería visual. Ficha = portada full-bleed + spec-sheet + galería + "siguiente
  proyecto".

## Idiomas (i18n)

Sitio **bilingüe ES + EN**. Español en la raíz (`/proyectos`), inglés en `/en/`
(`/en/proyectos`). Config en `astro.config.mjs` (`i18n`, `prefixDefaultLocale: false`).
- **UI**: diccionario en `src/i18n/ui.ts` + helper `useTranslations(lang)`. Helpers
  de rutas en `src/i18n/utils.ts` (`localeUrl`, `switchLocalePath`, `projectsFor`).
- **Páginas**: la lógica vive en componentes (`src/components/pages/*.astro`) que
  reciben `lang`; las rutas (`src/pages/*` y `src/pages/en/*`) solo delegan.
- **Selector ES/EN** en el header (siempre visible). `hreflang` + `og:locale` en el Layout.

## Contenido (Content Collections)

Cada proyecto es una carpeta `src/content/proyectos/<slug>/` con **un archivo por
idioma**: `es.md` y `en.md` (id de la collection = `<slug>/<lang>`). Frontmatter
(`titulo`, `orden`, `destacado`, `ano`, `ubicacion`, `tipo`, `rol`, `resumen`,
`provisional`, `portada`, `galeria[]`, `planos[]`) + cuerpo markdown (descripción).
Las **imágenes se comparten** entre idiomas (van en la carpeta, referenciadas con
`./archivo`). Los campos de imagen/orden se replican igual en `es.md` y `en.md`;
solo cambian los textos. Schema en `src/content.config.ts`.

## ⚠️ Imágenes provisionales

Todas las imágenes actuales son **recortes de baja calidad del PDF** de Marta,
pendientes de sustituir por sus originales (JPG máx. resolución + planos en SVG).
Marcadas por triplicado: badge HTML (`provisional: true` → `ProvisionalBadge`),
nombre de archivo `*.provisional.jpg`, y `npm run check:provisionales` (error si
queda alguna). Al recibir un original: sustituir el archivo, quitar el sufijo
`.provisional`, actualizar la ruta en `index.md` y poner `provisional: false`.
Ver skill `/imagenes-provisionales`.

## Git y deploy

- Commits **en español, imperativo**, con el trailer
  `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`.
- **El push está bloqueado (403)** hasta que Marta añada como colaboradora a la
  cuenta **`ebecerra-developer`** (Settings → Collaborators → Add people). Hay
  commits en local listos; al aceptar: `git push -u origin main` → deploy Vercel.

## Variables de entorno

**Objetivo: cero.** Ahora no hay ninguna. Cuando algo las necesite, el orden es:
(1) hardcodeado → (2) env var + hardcode fallback → (3) pasar las env vars a
Marta para Vercel → (4) quitar el hardcode. Secretos sensibles: saltar directo
al paso 3 (nunca en el repo público). Detalle en `docs/cms.md`.

## Gotchas aprendidos

- **`backdrop-filter` crea un containing block** que atrapa a `position:fixed`:
  el blur del header va en `::before`, no en el header, para no atrapar el drawer.
- CSS scoped de Astro: cuidado con **nombres de clase repetidos** entre secciones
  (colisionó `.tag` del hero con una etiqueta nueva). Usar nombres específicos.
- Imágenes: usar `<Image>` de `astro:assets` (webp responsive), no `<img src>`.
- El error de tipo `provisional does not exist` en el IDE es **stale** (tipos sin
  regenerar); `npm run build` / `npx astro sync` lo resuelve.
- El `site` en `astro.config.mjs` es un placeholder (`mas1des.vercel.app`) →
  cambiar al dominio real cuando exista (afecta sitemap y canonical).

## Skills

En `.claude/skills/`. Invocar con `/nombre`: `/imagenes-provisionales`,
`/anadir-proyecto`, `/keystatic-cms`, `/git-deploy`.

## Astro (referencia rápida)

Docs: https://docs.astro.build — Content Collections, componentes `.astro`,
`astro:assets` (Image), estilos scoped. i18n no se usa (sitio solo en español).
