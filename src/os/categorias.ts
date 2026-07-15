import type { Lang } from '../i18n/ui';

/**
 * Carpetas del escritorio (modo OS). Cada proyecto declara su carpeta en el
 * campo `categoria` del CMS. El slug es estable (mismo en ES y EN, solo cambia
 * la etiqueta visible) y es el que se usa en la ruta `/carpeta/<slug>`.
 */
export const CATEGORIAS = [
  { slug: 'academicos', es: 'Académicos', en: 'Academic' },
  { slug: 'concursos', es: 'Concursos', en: 'Competitions' },
  { slug: 'visualizacion', es: 'Visualización', en: 'Visualization' },
  { slug: 'performance', es: 'Performance', en: 'Performance' },
  { slug: 'publicaciones', es: 'Publicaciones', en: 'Publications' },
] as const;

export type CategoriaSlug = (typeof CATEGORIAS)[number]['slug'];

export function categoriaLabel(slug: string, lang: Lang): string {
  const c = CATEGORIAS.find((c) => c.slug === slug);
  return c ? c[lang] : slug;
}
