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

export const collections = { proyectos };
