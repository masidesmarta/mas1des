# CMS — Keystatic (activado en Keystatic Cloud)

## Decisión: Keystatic (no Sanity)

Para este portfolio el CMS es **[Keystatic](https://keystatic.com)**, no Sanity.

| | Keystatic | Sanity |
|---|---|---|
| Dónde vive el contenido | En el **repo** (los ficheros que ya usa el sitio) | Servicio **hosteado** aparte |
| Coste / cuenta | Gratis, sin cuenta que gestionar | Cuenta + proyecto + plan |
| Variables de entorno | **0** en modo local | projectId + dataset (+ token) |
| Publicar | Edita → commit a git → Vercel redeploy | API + webhooks |
| Encaje | 1 sitio estático → ideal | Varias apps compartiendo contenido |

En ebecerra-web usamos Sanity porque varias apps comparten contenido; aquí es un
solo sitio estático, así que Keystatic edita directamente los ficheros del repo.

## Modelo de contenido (IMPORTANTE)

Cada proyecto es **una ficha bilingüe** en la carpeta `src/content/proyectos/<slug>/`:

- **`index.yaml`** — todos los datos. Los campos de texto van emparejados ES/EN
  (`tituloEs`/`tituloEn`, `resumenEs`/`resumenEn`, `descripcionEs`/`descripcionEn`,
  `ubicacionEs`/`ubicacionEn`, `tipo`, `rol`…) + los compartidos (`orden`,
  `destacado`, `ano`, `provisional`, `portada`, `galeria`, `planos`, `video`).
- **Las imágenes** (`portada.webp`, `gal-*.webp`…) viven **al lado**, en la misma
  carpeta. Keystatic las guarda ahí por nombre.
- **Descripción**: campo de texto. Admite **negrita** (`**así**`) y *cursiva*
  (`*así*`); los párrafos se separan con una línea en blanco. Se renderiza con el
  helper `richText()` de `src/i18n/utils.ts` (no usa Markdown/Markdoc completo, a
  propósito, para que sea simple de editar).

`src/content.config.ts` lee `**/index.yaml` (id = slug, imágenes vía `image()` de
astro:assets → siguen optimizándose como webp responsive). `projectsFor()` en
`utils.ts` resuelve los campos `Es`/`En` al idioma y devuelve la misma forma que
antes, así que los componentes no cambian.

> Migración histórica: el contenido venía como `es.md` + `en.md` por carpeta. Se
> fusionó en `index.yaml` (script one-off, ya ejecutado y retirado).

## Estado actual — Keystatic Cloud ACTIVADO (jul 2026)

- **`storage: { kind: 'cloud' }` + `cloud: { project: 'mas1des/mas1des' }`** en
  `keystatic.config.ts`. El auth lo hostea [Keystatic Cloud](https://keystatic.cloud)
  (plan gratuito): **cero env vars**, ni en el repo ni en Vercel.
- `astro.config.mjs` tiene el adaptador de Vercel + las integraciones `react()` y
  `keystatic()`. El sitio **sigue siendo estático**; solo `/keystatic` y su API se
  renderizan on-demand (funciones serverless en Vercel).
- **Marta edita online**: `su-web/keystatic` → login (Keystatic Cloud) → editar →
  Save. Cada guardado commitea al repo → Vercel redeploya solo. Guía para ella en
  `docs/editar-la-web.md`.
- También funciona en local: `npm run dev` → http://localhost:4321/keystatic
  (mismo login; escribe en el repo vía Cloud).
- Los **dominios permitidos** (localhost + el dominio de Vercel, y el dominio
  real cuando exista) se gestionan en el panel del proyecto en keystatic.cloud.

> Histórico: estuvo en modo `local` hasta jul 2026 (edición solo en local +
> commit manual). El modo GitHub App (env vars propias en Vercel) se descartó en
> favor de Cloud, que no necesita ninguna.

## Regla de variables de entorno

Cero mientras se pueda. Cuando una feature las necesite: hardcode (valores no
sensibles) → env + fallback → pasar a Marta (Vercel) → quitar hardcode. Los
**secretos** (client secret, KEYSTATIC_SECRET) van **directos a Vercel**, nunca al
repo.
