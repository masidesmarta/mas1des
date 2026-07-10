import { defaultLang, type Lang } from './ui';

/** URL con prefijo de idioma (es = raíz, en = /en/...). */
export function localeUrl(lang: Lang, path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === defaultLang) return clean;
  return clean === '/' ? `/${lang}` : `/${lang}${clean}`;
}

/** Quita el prefijo /en de una ruta. */
export function stripLocale(path: string): string {
  const s = path.replace(/^\/en(?=\/|$)/, '');
  return s === '' ? '/' : s;
}

/** Detecta el idioma a partir de la ruta. */
export function getLangFromPath(path: string): Lang {
  return /^\/en(\/|$)/.test(path) ? 'en' : 'es';
}

/** Misma página en el otro idioma. */
export function switchLocalePath(path: string, toLang: Lang): string {
  return localeUrl(toLang, stripLocale(path));
}

type Entry = { id: string; data: { orden: number } };

/** Proyectos de un idioma, ordenados, con su slug (carpeta) resuelto. */
export function projectsFor<T extends Entry>(entries: T[], lang: Lang) {
  const suffix = `/${lang}`;
  return entries
    .filter((e) => e.id.endsWith(suffix))
    .map((entry) => ({ entry, slug: entry.id.slice(0, -suffix.length) }))
    .sort((a, b) => a.entry.data.orden - b.entry.data.orden);
}

/** Un proyecto por slug+idioma, con fallback a español. */
export function getProject<T extends Entry>(entries: T[], slug: string, lang: Lang) {
  return (
    entries.find((e) => e.id === `${slug}/${lang}`) ??
    entries.find((e) => e.id === `${slug}/es`)
  );
}
