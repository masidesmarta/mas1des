/**
 * ─────────────────────────────────────────────────────────────────────────
 *  CONFIG DE KEYSTATIC (PREPARADO, NO CABLEADO)
 * ─────────────────────────────────────────────────────────────────────────
 *  Este archivo mapea el contenido para el CMS Keystatic, pero la integración
 *  NO está activada en astro.config.mjs. Por tanto:
 *    · El sitio compila, despliega y se ve en GitHub EXACTAMENTE igual que ahora.
 *    · No añade variables de entorno.
 *    · Es inerte hasta que se siga la guía docs/cms.md para activarlo.
 *
 *  `storage: { kind: 'local' }` = edición en local (`npm run dev` → /keystatic),
 *  sin cuenta ni env vars. Para que Marta edite online se pasa a modo GitHub
 *  (necesita una GitHub App → ahí entran las env vars, ver docs/cms.md).
 *
 *  OJO (documentado en docs/cms.md): Keystatic guarda el cuerpo como Markdoc
 *  (`.mdoc`), no `.md`. Al activarlo hay que alinear el content collection
 *  (usar @astrojs/markdoc) o mover la descripción a un campo de texto.
 * ─────────────────────────────────────────────────────────────────────────
 */
import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },
  ui: {
    brand: { name: 'Marta Masides' },
  },
  collections: {
    proyectos: collection({
      label: 'Proyectos',
      // El nombre de la carpeta es el slug (URL). El título va en el frontmatter.
      slugField: 'titulo',
      path: 'src/content/proyectos/*/',
      format: { contentField: 'body' },
      entryLayout: 'content',
      columns: ['titulo'],
      schema: {
        titulo: fields.slug({
          name: { label: 'Título', validation: { isRequired: true } },
          // El slug (carpeta) se edita aparte; por defecto se genera del título.
          slug: { label: 'Carpeta / URL' },
        }),
        orden: fields.integer({
          label: 'Orden',
          description: 'Menor = aparece antes. Los destacados van arriba.',
          defaultValue: 100,
        }),
        destacado: fields.checkbox({
          label: 'Destacado',
          description: 'Aparece en la selección de la home y como pieza grande.',
          defaultValue: false,
        }),
        ano: fields.integer({ label: 'Año' }),
        ubicacion: fields.text({ label: 'Ubicación' }),
        tipo: fields.text({ label: 'Tipo (vivienda, concurso, visualización…)' }),
        rol: fields.text({ label: 'Rol' }),
        resumen: fields.text({
          label: 'Resumen',
          description: 'Una frase para el listado.',
          multiline: true,
        }),
        provisional: fields.checkbox({
          label: 'Imágenes provisionales',
          description: 'Actívalo mientras las imágenes sean recortes provisionales.',
          defaultValue: false,
        }),
        portada: fields.image({
          label: 'Portada',
          directory: 'src/content/proyectos',
          publicPath: './',
        }),
        galeria: fields.array(
          fields.image({
            label: 'Imagen',
            directory: 'src/content/proyectos',
            publicPath: './',
          }),
          { label: 'Galería', itemLabel: (p) => p.value?.filename ?? 'Imagen' },
        ),
        planos: fields.array(
          fields.image({
            label: 'Plano',
            directory: 'src/content/proyectos',
            publicPath: './',
          }),
          { label: 'Planos', itemLabel: (p) => p.value?.filename ?? 'Plano' },
        ),
        body: fields.markdoc({ label: 'Descripción' }),
      },
    }),
  },
});
