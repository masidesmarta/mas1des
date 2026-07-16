import { defaultLang, type Lang } from './ui';

/**
 * URL con prefijo de idioma (es = raíz, en = /en/...).
 * Siempre con barra final: los canonicals y el sitemap la llevan, y así
 * los enlaces internos no pasan por el redirect 308 de Vercel.
 */
export function localeUrl(lang: Lang, path = '/'): string {
  let clean = path.startsWith('/') ? path : `/${path}`;
  if (!clean.endsWith('/')) clean += '/';
  if (lang === defaultLang) return clean;
  return `/${lang}${clean === '/' ? '/' : clean}`;
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

type Raw = { id: string; data: Record<string, any> };

/** Resuelve los campos ES/EN de una ficha bilingüe a nombres planos del idioma. */
function localize(data: Record<string, any>, lang: Lang) {
  const suf = lang === 'en' ? 'En' : 'Es';
  // Los campos de texto caen a español si el inglés está vacío.
  const pick = (base: string) => {
    const v = data[base + suf];
    return v != null && v !== '' ? v : data[base + 'Es'];
  };
  return {
    titulo: pick('titulo'),
    resumen: pick('resumen'),
    ubicacion: pick('ubicacion'),
    tipo: pick('tipo'),
    rol: pick('rol'),
    colaboracion: pick('colaboracion'),
    descripcion: pick('descripcion'),
    orden: data.orden,
    destacado: data.destacado,
    categoria: data.categoria,
    ano: data.ano,
    provisional: data.provisional,
    portada: data.portada,
    galeria: data.galeria ?? [],
    planos: data.planos ?? [],
    video: data.video || undefined,
  };
}

/**
 * Proyectos de un idioma, ordenados, con su slug (carpeta).
 * Devuelve `{ entry, slug }` donde `entry.data` ya está localizado al idioma,
 * para que los componentes lo consuman igual que antes.
 */
export function projectsFor<T extends Raw>(entries: T[], lang: Lang) {
  return entries
    .map((e) => ({ entry: { id: e.id, data: localize(e.data, lang) }, slug: e.id }))
    .sort((a, b) => a.entry.data.orden - b.entry.data.orden);
}

/** Un proyecto por slug+idioma (datos ya localizados). */
export function getProject<T extends Raw>(entries: T[], slug: string, lang: Lang) {
  const e = entries.find((x) => x.id === slug);
  return e ? { entry: { id: e.id, data: localize(e.data, lang) }, slug: e.id } : undefined;
}

/**
 * Elige el campo del idioma en un objeto con pares `xxxEs`/`xxxEn`
 * (mismo criterio que las fichas: el inglés vacío cae al español).
 */
export function pickLang(data: Record<string, any> | undefined, base: string, lang: Lang): string {
  if (!data) return '';
  const v = data[base + (lang === 'en' ? 'En' : 'Es')];
  return v != null && v !== '' ? v : (data[base + 'Es'] ?? '');
}

/**
 * Texto largo → HTML seguro con formato ligero: **negrita**, *cursiva*,
 * [enlaces](https://…), párrafos (línea en blanco) y saltos de línea simples.
 * Para las descripciones que Marta edita en el CMS como texto plano.
 */
export function richText(text?: string): string {
  if (!text) return '';
  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return text
    .split(/\r?\n\s*\r?\n/)
    .map((para) => {
      let h = esc(para.trim());
      h = h.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      h = h.replace(/(^|[^*])\*(?!\*)([^*]+?)\*(?!\*)/g, '$1<em>$2</em>');
      h = h.replace(
        /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener">$1</a>',
      );
      h = h.replace(/\r?\n/g, '<br />');
      return `<p>${h}</p>`;
    })
    .filter(Boolean)
    .join('\n');
}
