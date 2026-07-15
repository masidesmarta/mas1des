---
name: keystatic-cms
description: Trabajar con el CMS Keystatic (para que Marta edite el contenido). Úsalo al tocar el modelo de contenido de proyectos, el asistente de edición, el paso a modo GitHub/Cloud, o al entender cómo se lee el contenido.
---

# Keystatic (CMS)

CMS **git-based** (frente a Sanity) para este sitio estático. Razonamiento y pasos
completos en **`docs/cms.md`**. Guía de uso para Marta en **`docs/editar-la-web.md`**.

## Estado: ACTIVADO

- `astro.config.mjs` tiene adaptador de Vercel + integraciones `react()` y
  `keystatic()`. El sitio sigue siendo **estático**; solo `/keystatic` y su API van
  server (funciones serverless).
- `keystatic.config.ts` está en **modo GitHub** (`storage: { kind: 'github', repo:
  'masidesmarta/mas1des' }`). La primera vez, `/keystatic` en producción muestra un
  asistente que crea la GitHub App y da 3 env vars para Vercel
  (`KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`).
- **Para editar en LOCAL** sin nada de eso: cambiar temporalmente a
  `storage: { kind: 'local' }` y `npm run dev` → `/keystatic`.
- Alternativa sin env vars: **Keystatic Cloud** (`storage: { kind: 'cloud', … }`).

## Modelo de contenido

Cada proyecto = carpeta `src/content/proyectos/<slug>/` con **`index.yaml`** (ficha
bilingüe: campos `…Es`/`…En` + compartidos) e **imágenes al lado** (por nombre).
`content.config.ts` lee `**/index.yaml` (imágenes vía `image()` de astro:assets).
`projectsFor()` en `i18n/utils.ts` resuelve `Es`/`En` al idioma y mantiene la forma
`{ entry: { id, data }, slug }` para no tocar componentes. La **descripción** es
texto con formato ligero (`**negrita**`, `*cursiva*`, párrafos) vía `richText()`.

> Al añadir un campo nuevo: schema en `keystatic.config.ts` (cómo se edita) +
> `content.config.ts` (cómo se lee, con `Es`/`En` si es bilingüe) + `localize()` en
> `utils.ts` (si es bilingüe) + el componente que lo pinte.

## Regla de variables de entorno

Cero mientras se pueda. Secretos (client secret, KEYSTATIC_SECRET) → directos a
Vercel, nunca al repo (es público). Detalle en `docs/cms.md`.
