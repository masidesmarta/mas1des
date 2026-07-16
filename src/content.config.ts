import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Cada proyecto es una carpeta src/content/proyectos/<slug>/ con un `index.yaml`
// (editable desde el CMS Keystatic) y sus imágenes al lado. Los campos de texto
// van emparejados ES/EN dentro de la misma ficha bilingüe. El id = <slug>.
const proyectos = defineCollection({
  loader: glob({
    pattern: '**/index.yaml',
    base: './src/content/proyectos',
    generateId: ({ entry }) => entry.replace(/\/index\.ya?ml$/i, ''),
  }),
  schema: ({ image }) =>
    z.object({
      tituloEs: z.string(),
      tituloEn: z.string().default(''),
      // Orden en el listado (menor = primero). Los destacados van arriba.
      orden: z.number().default(100),
      destacado: z.boolean().default(false),
      // Carpeta del escritorio en la que vive el proyecto (modo OS).
      // `tipo` sigue siendo el texto libre de las "propiedades" de la ficha.
      categoria: z
        .enum(['academicos', 'concursos', 'visualizacion', 'performance', 'publicaciones'])
        .default('academicos'),
      ano: z.number().optional(),
      ubicacionEs: z.string().optional(),
      ubicacionEn: z.string().optional(),
      tipoEs: z.string().optional(),
      tipoEn: z.string().optional(),
      rolEs: z.string().optional(),
      rolEn: z.string().optional(),
      // Estudio o coautoría a mencionar (sin enlace). Vacío en la mayoría
      // de fichas: solo se muestra (junto al rol) si se rellena.
      colaboracionEs: z.string().optional(),
      colaboracionEn: z.string().optional(),
      resumenEs: z.string().optional(),
      resumenEn: z.string().optional(),
      descripcionEs: z.string().optional(),
      descripcionEn: z.string().optional(),
      // true mientras la portada/galería sean recortes provisionales.
      provisional: z.boolean().default(false),
      // Imágenes: opcionales para que el build no rompa antes de tener material.
      portada: image().optional(),
      galeria: z.array(image()).default([]),
      planos: z.array(image()).default([]),
      // Vídeo opcional (ruta a un archivo en public/, p. ej. /videos/x.mp4).
      video: z.string().optional(),
    }),
});

// Textos de las secciones fijas (singletons de Keystatic): inicio (hero),
// estudio (bio/CV) y contacto. Un yaml por sección en src/content/sitio/.
// Schema laxo (superset con todo opcional): cada componente coge lo suyo
// y cae a sus textos por defecto si falta algo.
const sitio = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/sitio' }),
  schema: z
    .object({
      // inicio
      kickerEs: z.string(),
      kickerEn: z.string(),
      taglineEs: z.string(),
      taglineEn: z.string(),
      // estudio + contacto
      leadEs: z.string(),
      leadEn: z.string(),
      bioEs: z.string(),
      bioEn: z.string(),
      experiencia: z.array(
        z
          .object({
            puestoEs: z.string(),
            puestoEn: z.string(),
            lugarEs: z.string(),
            lugarEn: z.string(),
            fechasEs: z.string(),
            fechasEn: z.string(),
          })
          .partial(),
      ),
      formacion: z.array(
        z
          .object({
            tituloEs: z.string(),
            tituloEn: z.string(),
            lugarEs: z.string(),
            lugarEn: z.string(),
            fechasEs: z.string(),
            fechasEn: z.string(),
          })
          .partial(),
      ),
      herramientas: z.array(
        z
          .object({
            grupoEs: z.string(),
            grupoEn: z.string(),
            items: z.array(z.string()).default([]),
          })
          .partial(),
      ),
      email: z.string(),
      instagram: z.string(),
    })
    .partial(),
});

export const collections = { proyectos, sitio };
