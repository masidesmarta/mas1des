---
name: keystatic-cms
description: Activar o trabajar con el CMS Keystatic (para que Marta edite el contenido). Úsalo al querer habilitar la edición visual, pasar al modo GitHub, o entender por qué el CMS no afecta al build actual.
---

# Keystatic (CMS)

Se eligió **Keystatic** (git-based) frente a Sanity para este sitio estático:
0 cuentas, 0 env vars en local, 0 lock-in (el contenido son los ficheros del repo).
Razonamiento completo y pasos detallados en **`docs/cms.md`**.

## Estado actual
- `keystatic.config.ts` existe (mapea la colección `proyectos`) pero la
  integración **NO** está cableada en `astro.config.mjs`.
- Por eso el sitio **compila, despliega y se ve en GitHub igual**, con **0 env vars**.
  El config es inerte hasta activarlo.

## Activar edición en LOCAL (0 env vars)
```bash
npm i @keystatic/astro @astrojs/react react react-dom @astrojs/vercel
```
En `astro.config.mjs`: `output: 'hybrid'`, `adapter: vercel()`, integraciones
`react()` y `keystatic()`. `npm run dev` → editar en `/keystatic`.

> ⚠️ Keystatic guarda el cuerpo como Markdoc (`.mdoc`), no `.md`. Al activar hay
> que alinear el content collection (opción A: `@astrojs/markdoc` + leer
> `index.mdoc`; opción B, más simple: mover la descripción a un campo de texto y
> renderizarlo en la ficha en vez de `<Content />`). Ver `docs/cms.md`.

## Activar edición ONLINE para Marta (modo GitHub)
Cambiar `storage` a `{ kind: 'github', repo: 'masidesmarta/mas1des' }`. Crea una
GitHub App → ahí entran env vars → seguir el **proceso de env vars** (paso 3-4 de
`docs/cms.md`; los secretos no van hardcodeados en repo público). Alternativa sin
env propias: **Keystatic Cloud** (gratis).

## Regla de variables de entorno
Cero mientras se pueda. Orden: hardcode → env+fallback → pasar a Marta (Vercel) →
quitar hardcode. Secreto sensible → directo al paso "pasar a Marta".
