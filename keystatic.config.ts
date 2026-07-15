/**
 * ─────────────────────────────────────────────────────────────────────────
 *  CONFIG DE KEYSTATIC — CMS para que Marta edite el contenido
 * ─────────────────────────────────────────────────────────────────────────
 *  Modelo: UNA ficha bilingüe por proyecto. Cada proyecto es una carpeta
 *  `src/content/proyectos/<slug>/` con un `index.yaml` (datos) y sus imágenes
 *  al lado. Los campos de texto van emparejados ES/EN dentro de la misma ficha.
 *
 *  `storage: { kind: 'local' }` = edición en local (`npm run dev` → /keystatic).
 *  Para que Marta edite online se pasa a modo GitHub (ver docs/cms.md).
 * ─────────────────────────────────────────────────────────────────────────
 */
import { config, fields, collection } from '@keystatic/core';

export default config({
  // Modo LOCAL de momento: se edita en local (`npm run dev` → /keystatic) y se
  // commitea a git. Para que Marta edite ONLINE sin env vars pasaremos a Keystatic
  // Cloud: `storage: { kind: 'cloud' }` + `cloud: { project: 'equipo/proyecto' }`
  // (cuando el proyecto de keystatic.cloud esté creado y el repo conectado).
  // Ver docs/cms.md.
  storage: { kind: 'local' },
  ui: {
    brand: { name: 'Marta Masides' },
  },
  collections: {
    proyectos: collection({
      label: 'Proyectos',
      // El nombre de la carpeta es el slug (URL). Se genera del título en español.
      slugField: 'tituloEs',
      path: 'src/content/proyectos/*/',
      format: { data: 'yaml' },
      columns: ['tituloEs', 'orden'],
      schema: {
        tituloEs: fields.slug({
          name: { label: 'Título (ES)', validation: { isRequired: true } },
          slug: { label: 'Carpeta / URL' },
        }),
        tituloEn: fields.text({ label: 'Título (EN)' }),
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
        categoria: fields.select({
          label: 'Carpeta',
          description: 'Carpeta del escritorio en la que aparece el proyecto.',
          options: [
            { label: 'Académicos', value: 'academicos' },
            { label: 'Concursos', value: 'concursos' },
            { label: 'Visualización', value: 'visualizacion' },
            { label: 'Performance', value: 'performance' },
            { label: 'Publicaciones', value: 'publicaciones' },
          ],
          defaultValue: 'academicos',
        }),
        ano: fields.integer({ label: 'Año' }),
        ubicacionEs: fields.text({ label: 'Ubicación (ES)' }),
        ubicacionEn: fields.text({ label: 'Ubicación (EN)' }),
        tipoEs: fields.text({ label: 'Tipo (ES)' }),
        tipoEn: fields.text({ label: 'Tipo (EN)' }),
        rolEs: fields.text({ label: 'Rol (ES)' }),
        rolEn: fields.text({ label: 'Rol (EN)' }),
        resumenEs: fields.text({
          label: 'Resumen (ES)',
          description: 'Una frase para el listado.',
          multiline: true,
        }),
        resumenEn: fields.text({ label: 'Resumen (EN)', multiline: true }),
        descripcionEs: fields.text({
          label: 'Descripción (ES)',
          description:
            'Texto largo. Puedes usar **negrita** y *cursiva*. Deja una línea en blanco entre párrafos.',
          multiline: true,
        }),
        descripcionEn: fields.text({ label: 'Descripción (EN)', multiline: true }),
        provisional: fields.checkbox({
          label: 'Imágenes provisionales',
          description: 'Actívalo mientras las imágenes sean recortes provisionales.',
          defaultValue: false,
        }),
        portada: fields.image({
          label: 'Portada',
          description: 'Imagen principal (relación 16:9 aprox).',
        }),
        galeria: fields.array(fields.image({ label: 'Imagen' }), {
          label: 'Galería',
          itemLabel: (p) => p.value?.filename ?? 'Imagen',
        }),
        planos: fields.array(fields.image({ label: 'Plano' }), {
          label: 'Planos',
          itemLabel: (p) => p.value?.filename ?? 'Plano',
        }),
        video: fields.text({
          label: 'Vídeo (opcional)',
          description: 'Ruta a un vídeo en /public, p. ej. /videos/performance.mp4',
        }),
      },
    }),
  },
});
