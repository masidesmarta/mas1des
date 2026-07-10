import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Cada proyecto es una carpeta src/content/proyectos/<slug>/ con un archivo
// por idioma (es.md, en.md) y sus imágenes al lado (compartidas entre idiomas).
// El id queda como "<slug>/<lang>" (p. ej. "pfm-riotinto/en").
const proyectos = defineCollection({
  loader: glob({ pattern: '**/{es,en}.md', base: './src/content/proyectos' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      // Orden en el listado (menor = primero). Los destacados van arriba.
      orden: z.number().default(100),
      destacado: z.boolean().default(false),
      ano: z.number().optional(),
      ubicacion: z.string().optional(),
      tipo: z.string().optional(), // vivienda, reforma, local, interiorismo…
      rol: z.string().optional(),
      resumen: z.string().optional(), // una frase para el listado
      // true mientras la portada/galería sean recortes provisionales del PDF.
      // El script `npm run check:provisionales` avisa de las que falten sustituir.
      provisional: z.boolean().default(false),
      // Imágenes: opcionales para que el build no rompa antes de tener material.
      portada: image().optional(),
      galeria: z.array(image()).default([]),
      // Planos en SVG/PNG (van en la misma carpeta del proyecto).
      planos: z.array(image()).default([]),
    }),
});

export const collections = { proyectos };
