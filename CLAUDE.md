# CLAUDE.md — mas1des (portfolio de Marta Masides)

Portfolio web de **Marta Masides**, arquitecta por la ETSAM (Madrid). Proyecto
independiente (lo desarrolla Enrique Becerra). Sitio estático, imagen-first.
**Concepto: la web es un escritorio de Windows 2000 retro** (idea de Marta);
la versión editorial anterior vive dentro como "modo lectura".

Repo: `github.com/masidesmarta/mas1des` (de Marta). Deploy en **Vercel** (cuenta
de Marta). Web hecha gratis; lleva un crédito discreto a `ebecerra.es` en el footer.

---

## Stack

- **Astro 7** + **Content Collections** (contenido en `src/content/proyectos/`).
- **CSS vanilla**: tokens editoriales en `src/styles/global.css` + tokens del
  chrome Win2000 en `src/styles/os.css` + estilos *scoped* por componente.
  **No** Tailwind, **no** CSS-in-JS.
- Tipografías: **Inter** (contenido, self-hosted vía `@fontsource-variable/inter`),
  **SciFly Sans** (display del hero/wordmark, `public/fonts/`), **Tahoma** system
  stack para el chrome del OS (la fuente real de Win2000, cero bytes).
- **View Transitions** (`ClientRouter` en OSLayout) para abrir/cerrar ventanas
  sin recarga dura. Reveal-on-scroll con IO. Guard de `prefers-reduced-motion`.
- SEO: `@astrojs/sitemap`, canonical, Open Graph (`public/og.png`), JSON-LD.
- CMS **Keystatic** en modo **Cloud** (`mas1des/mas1des`): Marta edita online en
  `/keystatic`, cero env vars; dominios permitidos en keystatic.cloud (ver `docs/cms.md`).

## Arquitectura "escritorio Windows" (rediseño 2026)

Brief completo y decisiones en `docs/concepto-windows.md`. Resumen:

- **MPA sobre rutas reales** (todo SSR e indexable); el chrome del OS es
  presentación encima de HTML semántico. Sin estado global de ventanas.

| Ruta (ES / +`/en`) | Qué es |
|---|---|
| `/` | Escritorio: carpetas por categoría + apps (Internet, Sobre mí.txt, Contacto) |
| `/carpeta/[categoria]` | Ventana **Explorador** con los proyectos (miniatura + WIP) |
| `/proyectos/[slug]` | Ventana **visor casi maximizada** con la ficha editorial |
| `/portfolio` | Home editorial (hero rojo) dentro de la ventana **Internet Explorer** |
| `/proyectos` | Índice editorial, también dentro del IE (modo lectura) |
| `/estudio` | Ventana "Sobre mí.txt — Bloc de notas" |
| `/contacto` | Ventana de correo (Para/Asunto + canales) |

- **Responsive temático**: desktop = ventanas flotantes + taskbar abajo;
  móvil (<768px) = pantalla de inicio de teléfono (status bar arriba) y ventanas
  a pantalla completa. Nunca "Windows encogido".
- **Piezas**: `src/layouts/OSLayout.astro` (wallpaper + taskbar + ClientRouter),
  `src/layouts/Layout.astro` (= ventana IE del modo lectura, envuelve Header/Footer
  editoriales), `src/components/os/` (Window, Taskbar, OSIcon, DesktopIcon),
  `src/os/` (categorias.ts, types.ts).
- **Window manager** (script en `Window.astro`, solo desktop, progressive
  enhancement): drag desde titlebar (transform + clamp, sin persistir),
  min/max/restore; cerrar es un `<a>` real. Los botones min/max nacen `hidden`
  y los habilita el JS. Con ClientRouter, todo init va en `astro:page-load`
  con guard `data-*-init`.
- **Iconos**: SVG a mano en `OSIcon.astro` (carpeta Win2000, "e" de IE
  geométrica, bandera de Windows para Inicio, notepad, correo…).
- **A11y/SEO como punto fuerte** (donde las webs-OS fallan): iconos = `<a>` con
  texto visible, un `h1` por página (en el escritorio es la firma de esquina
  tipo "Windows 2000 Professional"), skip-link, focus visible, contenido 100%
  SSR. El "modo lectura" es la red de seguridad de legibilidad.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Dev en http://localhost:4321 (¡ejecutar desde la RAÍZ del repo!) |
| `npm run build` | Build de producción (`dist/` + `.vercel/output/`) |
| `npm run check:provisionales` | Lista los proyectos con imágenes provisionales |

> `npm run preview` NO funciona (el adaptador de Vercel no lo soporta); para
> testear visual, usar el dev server.

## Identidad visual

- **Contenido editorial** (dentro de las ventanas): papel cálido `#f5f3ef` +
  tinta `#171612`, acento **rojo de marca** `#c8342b` (hero, punto de firma,
  activos). Grises accesibles (`--muted #6e6b62`, pasa AA).
- **Chrome del OS** (os.css): gris Win2000 `#d4d0c8`, titlebar degradado
  `#0a246a → #a6caf0`, bevels 1px, Tahoma. "Retro premium": chrome fiel pero
  nítido, sombras suaves bajo las ventanas, animación cuidada. El rojo de marca
  aparece puntual (etiquetas WIP).
- **Wallpaper**: render del mercado textil de Riotinto (hero) con velado azul
  tinta. Marta puede pedir otra imagen — se cambia en `OSLayout.astro`.
- **Mascota** (`src/assets/mascota.png`): firma de marca — está en la ventana de
  Contacto. NO repetirla dos veces en la misma página.
- **Favicon**: ventana Win2000 en miniatura con un recorte de la portada de
  Riotinto dentro (titlebar azul + ✕). Elegido por Enrique entre 3 candidatos
  (mascota-en-ventana y carpeta+punto quedaron descartados). Set completo en
  `public/` (16/32/192/512, apple-touch, .ico multi-tamaño).

## Idiomas (i18n)

Sitio **bilingüe ES + EN**. Español en la raíz, inglés en `/en/`. Config en
`astro.config.mjs` (`i18n`, `prefixDefaultLocale: false`).
- **UI**: diccionario en `src/i18n/ui.ts` (claves `os.*` para el chrome del OS)
  con `useTranslations(lang)`. Helpers de rutas en `src/i18n/utils.ts`.
- **Páginas**: la lógica vive en componentes (`src/components/pages/*.astro`) que
  reciben `lang`; las rutas (`src/pages/*` y `src/pages/en/*`) solo delegan.
- **Selector ES/EN**: en la taskbar/status bar del OS y en el header editorial.
  `hreflang` + `og:locale` en `BaseHead.astro` (compartido por ambos layouts).

## Contenido (Content Collections + Keystatic)

Cada proyecto es **una ficha bilingüe**: `src/content/proyectos/<slug>/index.yaml`
con los textos emparejados ES/EN (`tituloEs`/`tituloEn`, `resumenEs`/`resumenEn`…)
y los campos compartidos (`orden`, `destacado`, **`categoria`**, `ano`,
`provisional`, `portada`, `galeria[]`, `planos[]`, `video`). Las imágenes viven
en la misma carpeta. Schema en `src/content.config.ts`; Keystatic lo edita
(`keystatic.config.ts`). `projectsFor()` resuelve los campos al idioma.

- **`categoria`** (select) = carpeta del escritorio: `academicos | concursos |
  visualizacion | performance | publicaciones`. Etiquetas bilingües en
  `src/os/categorias.ts`. `tipo` sigue siendo texto libre (propiedades ficha).
- `provisional: true` → etiqueta **WIP** en el icono del proyecto (y en la
  carpeta si TODO su contenido es provisional) + `ProvisionalBadge` en la ficha.

## ⚠️ Imágenes provisionales

Las de visualización siguen siendo **recortes del PDF** de Marta, pendientes de
originales. Marcadas por triplicado: `provisional: true`, sufijo
`*.provisional.jpg` y `npm run check:provisionales`. Al recibir un original:
sustituir archivo, quitar sufijo, actualizar `index.yaml`, `provisional: false`.
Ver skill `/imagenes-provisionales`.

## Git y deploy

- Commits **en español, imperativo**, con el trailer
  `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`.
- **Build verde antes de cualquier push** (no tumbar la web al desplegar).
  El hook `astro:build:done` de Vercel falla a veces en Windows a la primera
  (lock de archivos); reintentar el build antes de asumir rotura.
- Push a `origin main` → **deploy automático en Vercel** (cuenta de Marta).
  El acceso de `ebecerra-developer` como colaboradora ya está activo.

## Variables de entorno

**Objetivo: cero.** Ahora no hay ninguna. Cuando algo las necesite, el orden es:
(1) hardcodeado → (2) env var + hardcode fallback → (3) pasar las env vars a
Marta para Vercel → (4) quitar el hardcode. Secretos sensibles: saltar directo
al paso 3 (nunca en el repo público). Detalle en `docs/cms.md`.

## Gotchas aprendidos

- **`backdrop-filter` crea un containing block** que atrapa a `position:fixed`:
  el blur del header va en `::before`, no en el header.
- CSS scoped de Astro: cuidado con **nombres de clase repetidos** entre secciones.
- Imágenes: usar `<Image>` de `astro:assets` (webp responsive), no `<img src>`.
- Los errores de tipos del IDE en `.astro` suelen ser **stale**; `npm run build`
  / `npx astro sync` es la verdad.
- El `site` en `astro.config.mjs` es un placeholder (`mas1des.vercel.app`) →
  cambiar al dominio real cuando exista (afecta sitemap y canonical). La barra
  de direcciones del IE muestra `www.mas1des.es` (ficción in-world, hardcoded
  en `Layout.astro`).
- `npx astro dev` arranca un daemon en background (Astro 7): pararlo con
  `npx astro dev stop`. Si arranca desde un cwd equivocado se queda un server
  zombi en `[::1]:4321` sirviendo 404 — matar el proceso viejo.
- Con **ClientRouter**, los `<script>` de componentes se ejecutan una vez: todo
  init debe correr también en `astro:page-load` y ser idempotente (guards
  `data-*-init`); los querySelector deben hacerse en cada init, no cachearse.
- El scroll del modo lectura es el **interno de la ventana** (`.window-body`),
  no `window`: listeners de scroll van al contenedor. Lenis quedó fuera.

## Skills

En `.claude/skills/`. Invocar con `/nombre`: `/imagenes-provisionales`,
`/anadir-proyecto`, `/keystatic-cms`, `/git-deploy`.

## Astro (referencia rápida)

Docs: https://docs.astro.build — Content Collections, componentes `.astro`,
`astro:assets` (Image), estilos scoped, View Transitions (`ClientRouter`),
i18n routing.
