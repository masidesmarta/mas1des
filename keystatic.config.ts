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
import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  // Keystatic CLOUD: Marta edita online en /keystatic (auth hosteado por
  // keystatic.cloud, cero env vars). El proyecto está conectado al repo en
  // el panel de keystatic.cloud; los dominios permitidos (localhost + Vercel)
  // se gestionan allí. Ver docs/cms.md.
  storage: { kind: 'cloud' },
  cloud: { project: 'mas1des/mas1des' },
  ui: {
    brand: { name: 'Marta Masides' },
  },
  // Textos de las secciones fijas de la web (fuera de los proyectos).
  singletons: {
    inicio: singleton({
      label: 'Inicio (hero)',
      path: 'src/content/sitio/inicio',
      format: { data: 'yaml' },
      schema: {
        kickerEs: fields.text({ label: 'Etiqueta superior (ES)', description: 'P. ej. "Arquitecta · Madrid"' }),
        kickerEn: fields.text({ label: 'Etiqueta superior (EN)' }),
        taglineEs: fields.text({ label: 'Frase del hero (ES)', multiline: true }),
        taglineEn: fields.text({ label: 'Frase del hero (EN)', multiline: true }),
      },
    }),
    estudio: singleton({
      label: 'Sobre mí / Estudio',
      path: 'src/content/sitio/estudio',
      format: { data: 'yaml' },
      schema: {
        leadEs: fields.text({ label: 'Entradilla (ES)', multiline: true }),
        leadEn: fields.text({ label: 'Entradilla (EN)', multiline: true }),
        bioEs: fields.text({
          label: 'Bio (ES)',
          multiline: true,
          description: 'Párrafos separados por una línea en blanco. Admite **negrita** y *cursiva*.',
        }),
        bioEn: fields.text({ label: 'Bio (EN)', multiline: true }),
        experiencia: fields.array(
          fields.object({
            puestoEs: fields.text({ label: 'Puesto (ES)' }),
            puestoEn: fields.text({ label: 'Puesto (EN)' }),
            lugarEs: fields.text({ label: 'Lugar / estudio (ES)' }),
            lugarEn: fields.text({ label: 'Lugar / estudio (EN)' }),
            fechasEs: fields.text({ label: 'Fechas (ES)' }),
            fechasEn: fields.text({ label: 'Fechas (EN)' }),
          }),
          {
            label: 'Experiencia',
            itemLabel: (p) => p.fields.puestoEs.value || 'Puesto',
          },
        ),
        formacion: fields.array(
          fields.object({
            tituloEs: fields.text({ label: 'Título (ES)' }),
            tituloEn: fields.text({ label: 'Título (EN)' }),
            lugarEs: fields.text({ label: 'Centro (ES)' }),
            lugarEn: fields.text({ label: 'Centro (EN)' }),
            fechasEs: fields.text({ label: 'Fechas (ES)' }),
            fechasEn: fields.text({ label: 'Fechas (EN)' }),
          }),
          {
            label: 'Formación',
            itemLabel: (p) => p.fields.tituloEs.value || 'Título',
          },
        ),
        herramientas: fields.array(
          fields.object({
            grupoEs: fields.text({ label: 'Grupo (ES)', description: 'P. ej. "Edición"' }),
            grupoEn: fields.text({ label: 'Grupo (EN)' }),
            items: fields.array(fields.text({ label: 'Herramienta' }), {
              label: 'Herramientas',
              itemLabel: (p) => p.value || 'Herramienta',
            }),
          }),
          {
            label: 'Herramientas',
            itemLabel: (p) => p.fields.grupoEs.value || 'Grupo',
          },
        ),
      },
    }),
    contacto: singleton({
      label: 'Contacto',
      path: 'src/content/sitio/contacto',
      format: { data: 'yaml' },
      schema: {
        leadEs: fields.text({ label: 'Texto (ES)', multiline: true }),
        leadEn: fields.text({ label: 'Texto (EN)', multiline: true }),
        email: fields.text({ label: 'Email' }),
        instagram: fields.text({ label: 'Instagram (usuario, sin @)' }),
      },
    }),
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
