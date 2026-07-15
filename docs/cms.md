# CMS — Keystatic (activado en local)

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

## Estado actual

- **Activado en modo LOCAL** (`storage: { kind: 'local' }` en `keystatic.config.ts`).
- `astro.config.mjs` tiene el adaptador de Vercel + las integraciones `react()` y
  `keystatic()`. El sitio **sigue siendo estático**; solo `/keystatic` y su API se
  renderizan on-demand (funciones serverless en Vercel).
- Edición en local: `npm run dev` → **http://localhost:4321/keystatic**. Los
  cambios se guardan en los ficheros del repo; se commitean a git.
- **Cero env vars** en este modo.

## Activar edición ONLINE para Marta (modo GitHub) — PENDIENTE

Para que Marta edite desde el navegador sin tocar código, hay que pasar a modo
GitHub. Requiere una **GitHub App** (acciones en la cuenta de GitHub de Marta):

1. En `keystatic.config.ts`, cambiar el `storage`:
   ```ts
   storage: { kind: 'github', repo: 'masidesmarta/mas1des' },
   ```
2. Arrancar el sitio e ir a `/keystatic`: Keystatic **guía la creación de la GitHub
   App** conectada al repo. Al terminar da tres valores:
   - `KEYSTATIC_GITHUB_CLIENT_ID`
   - `KEYSTATIC_GITHUB_CLIENT_SECRET`  ← **secreto**
   - `KEYSTATIC_SECRET`               ← **secreto**
3. Añadir esos tres en **Vercel** (proyecto de Marta) → Settings → Environment
   Variables. **NO** se hardcodean en el repo (son secretos y el repo es público).
4. Redeploy. Marta entra en `su-web/keystatic`, se loguea con GitHub y edita; cada
   cambio abre un commit/PR en el repo → Vercel redeploya solo.

**Alternativa sin gestionar env vars propias:** [Keystatic Cloud](https://keystatic.cloud)
(plan gratuito) hostea el auth. Se crea un proyecto en su panel, se conecta el
repo, y el `storage` pasa a `{ kind: 'cloud', project: 'team/proyecto' }`. Menos
piezas que la GitHub App; puede ser la opción más cómoda.

> Mientras no se active el modo online, `/keystatic` en producción existe pero
> solo funciona en local (no puede guardar en un servidor de solo-lectura). No es
> peligroso —el repo ya es público— pero no sirve para que Marta edite hasta el
> paso GitHub/Cloud.

## Regla de variables de entorno

Cero mientras se pueda. Cuando una feature las necesite: hardcode (valores no
sensibles) → env + fallback → pasar a Marta (Vercel) → quitar hardcode. Los
**secretos** (client secret, KEYSTATIC_SECRET) van **directos a Vercel**, nunca al
repo.
