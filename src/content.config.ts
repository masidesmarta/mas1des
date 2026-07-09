import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Cada proyecto es una carpeta dentro de src/content/proyectos/<slug>/
// con un index.md y sus imágenes al lado. Esta estructura es la que
// Keystatic podrá editar más adelante sin migrar nada.
const proyectos = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/proyectos' }),
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
      // Imágenes: opcionales para que el build no rompa antes de tener material.
      portada: image().optional(),
      galeria: z.array(image()).default([]),
      // Planos en SVG/PNG (van en la misma carpeta del proyecto).
      planos: z.array(image()).default([]),
    }),
});

export const collections = { proyectos };
