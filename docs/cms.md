# CMS — Keystatic (preparado, sin activar)

## Decisión: Keystatic (no Sanity)

Para este portfolio el CMS recomendado es **[Keystatic](https://keystatic.com)**, no Sanity.

| | Keystatic | Sanity |
|---|---|---|
| Dónde vive el contenido | En el **repo** (los mismos `.md` que ya usa el sitio) | Servicio **hosteado** aparte |
| Coste / cuenta | Gratis, sin cuenta que gestionar | Cuenta + proyecto + plan |
| Variables de entorno | **0** en modo local | projectId + dataset (+ token) |
| Publicar | Edita → commit a git → Vercel redeploy | API + webhooks |
| Encaje | 1 sitio estático → ideal | Varias apps compartiendo contenido |

En ebecerra-web usamos Sanity porque **varias apps comparten el mismo contenido**; aquí es **un solo sitio estático**, así que Sanity sería sobredimensionado y añadiría dependencia hosteada + env vars. Keystatic edita directamente el markdown del repo.

**Sobre las cuentas:** con Keystatic **no hay cuenta de CMS que traspasar**. En modo local edita quien tenga el proyecto. Para que **Marta edite online** se usa el modo GitHub (una GitHub App conectada a *su* repo; ella lo autoriza con su GitHub). No hay que crear/traspasar cuentas de Sanity.

## Estado actual

- `keystatic.config.ts` está en la raíz con el esquema de `proyectos` mapeado, pero **la integración NO está cableada** en `astro.config.mjs`.
- Resultado: el sitio **compila, despliega y se ve en GitHub igual que ahora**, con **cero env vars**. El config es inerte hasta activarlo.

## Cómo activarlo (cuando toque)

### Paso 1 — Edición en LOCAL (0 env vars)
```bash
npm i @keystatic/astro @astrojs/react react react-dom
```
En `astro.config.mjs` añadir el adaptador y las integraciones:
```js
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

export default defineConfig({
  // ...
  output: 'hybrid',          // Keystatic necesita rutas server para /keystatic
  adapter: vercel(),
  integrations: [sitemap(), react(), keystatic()],
});
```
`npm run dev` → editar en **http://localhost:4321/keystatic**. Los cambios se guardan en los ficheros del repo; se commitean a mano.

> ⚠️ **Gotcha del cuerpo de texto:** Keystatic guarda la *Descripción* como Markdoc (`index.mdoc`), no `.md`. Dos opciones al activarlo:
> - **(A)** Pasar el content collection a Markdoc: `npm i @astrojs/markdoc`, añadir la integración, y que `src/content.config.ts` lea `**/index.mdoc`. Migrar los 9 `index.md` → `index.mdoc` (el frontmatter no cambia; el cuerpo es Markdoc, casi idéntico para prosa simple).
> - **(B)** Más simple para Marta: quitar el cuerpo markdown y usar el campo `resumen`/un nuevo campo de texto largo como descripción (todo pasa a ser datos YAML, sin `.mdoc`). Ajustar la ficha para renderizar ese texto en vez de `<Content />`.
> Recomendado: **(B)** si las descripciones son prosa corta; **(A)** si se quiere formato rico.

### Paso 2 — Edición ONLINE para Marta (modo GitHub)
Cambiar en `keystatic.config.ts`:
```ts
storage: {
  kind: 'github',
  repo: 'masidesmarta/mas1des',
},
```
Esto crea una **GitHub App** (Keystatic guía el proceso). Ahí aparecen 2 secretos → seguir el **proceso de env vars** de abajo. Marta entra en `su-web.vercel.app/keystatic`, se loguea con GitHub y edita; cada cambio abre un commit/PR en su repo → Vercel redeploya.

Alternativa sin env vars propias: **Keystatic Cloud** (plan gratuito) hostea el auth; se conecta el repo desde su panel.

## Proceso de variables de entorno (regla del proyecto)

Mientras se pueda, **cero env vars**. Cuando una feature las necesite (p. ej. el modo GitHub de Keystatic), el orden es:

1. **Hardcodeado** en el código (para poder probarlo sin depender de Vercel).
2. **Env var + hardcodeado** como fallback (`import.meta.env.X ?? 'valor'`).
3. **Pasar las env vars a Marta** para que las añada en Vercel.
4. Cuando ya estén creadas en Vercel, **quitar el hardcode** del código (por seguridad no deben quedar secretos en el repo).

> Los secretos de la GitHub App (client secret) **no** deben quedar hardcodeados en un repo público ni de forma temporal — para esos, saltar directo al paso 3 o usar Keystatic Cloud. El hardcode temporal es solo para valores no sensibles (IDs públicos, dominios, projectId…).
