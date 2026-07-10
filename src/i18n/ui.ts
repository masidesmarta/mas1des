export const languages = { es: 'ES', en: 'EN' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'es';

// Textos de interfaz (no de contenido, que vive en las collections).
export const ui = {
  es: {
    'meta.homeDesc':
      'Portfolio de Marta Masides, arquitecta por la ETSAM. Proyectos académicos y profesionales de arquitectura, interiorismo y visualización.',
    'meta.arquitecta': 'Marta Masides — Arquitecta',

    'nav.proyectos': 'Proyectos',
    'nav.estudio': 'Estudio',
    'nav.contacto': 'Contacto',
    'nav.inicio': 'Inicio — Marta Masides',
    'nav.abrir': 'Abrir menú',
    'nav.principal': 'Principal',
    'nav.footContacto': 'Contacto',

    'foot.rol': 'Arquitectura · Interiorismo',
    'foot.rights': 'Todos los derechos reservados.',
    'foot.credit': 'Diseño y desarrollo',

    'hero.kicker': 'Arquitecta · Madrid',
    'hero.tagline':
      'Arquitectura atenta a la luz, la materia y el uso real de cada lugar.',
    'hero.cta': 'Ver proyectos',
    'hero.mascotaAlt':
      'Ilustración de Marta asomando tras un libro abierto que dice «Portfolio»',

    'home.kicker': 'Destacados',
    'home.proyectos': 'Proyectos',
    'home.de': 'de',
    'home.vertodos': 'Ver todos los proyectos',

    'proyectos.kicker': 'Trabajo',
    'proyectos.titulo': 'Proyectos',
    'proyectos.count': 'proyectos',
    'proyectos.empty':
      'Todavía no hay proyectos publicados. En cuanto tengamos el material de cada obra, irán apareciendo aquí.',

    'detail.back': 'Proyectos',
    'detail.year': 'Año',
    'detail.location': 'Ubicación',
    'detail.type': 'Tipo',
    'detail.role': 'Rol',
    'detail.plans': 'Planos',
    'detail.next': 'Siguiente proyecto',
    'detail.imageAlt': 'imagen',
    'detail.planAlt': 'plano',
    'detail.video': 'vídeo',

    'estudio.kicker': 'Estudio',
    'estudio.lead':
      'Arquitecta por la Escuela Técnica Superior de Arquitectura de Madrid (ETSAM). Diseño espacios atenta a la luz, la materia y el uso real de cada lugar.',
    'estudio.experiencia': 'Experiencia',
    'estudio.formacion': 'Formación',
    'estudio.herramientas': 'Herramientas',
    'estudio.g.edicion': 'Edición',
    'estudio.g.planos': 'Elaboración de planos',
    'estudio.g.render': 'Renderización',
    'estudio.cta': 'Trabajemos juntos',

    'contacto.kicker': 'Contacto',
    'contacto.titulo': 'Hablemos de tu proyecto',
    'contacto.lead':
      'Con base en Madrid y posibilidad de trabajo en remoto. Cuéntame qué tienes en mente.',

    'prov.label': 'Provisional',
    'prov.title': 'Imagen provisional — pendiente de sustituir por el original',
  },
  en: {
    'meta.homeDesc':
      "Portfolio of Marta Masides, architect from ETSAM. Academic and professional projects in architecture, interior design and visualization.",
    'meta.arquitecta': 'Marta Masides — Architect',

    'nav.proyectos': 'Projects',
    'nav.estudio': 'Studio',
    'nav.contacto': 'Contact',
    'nav.inicio': 'Home — Marta Masides',
    'nav.abrir': 'Open menu',
    'nav.principal': 'Main',
    'nav.footContacto': 'Contact',

    'foot.rol': 'Architecture · Interior design',
    'foot.rights': 'All rights reserved.',
    'foot.credit': 'Design & development',

    'hero.kicker': 'Architect · Madrid',
    'hero.tagline':
      'Architecture attentive to light, materials and the real use of each place.',
    'hero.cta': 'View projects',
    'hero.mascotaAlt':
      'Illustration of Marta peeking out from behind an open book reading “Portfolio”',

    'home.kicker': 'Featured',
    'home.proyectos': 'Projects',
    'home.de': 'of',
    'home.vertodos': 'View all projects',

    'proyectos.kicker': 'Work',
    'proyectos.titulo': 'Projects',
    'proyectos.count': 'projects',
    'proyectos.empty':
      'No projects published yet. As soon as the material for each work is ready, it will appear here.',

    'detail.back': 'Projects',
    'detail.year': 'Year',
    'detail.location': 'Location',
    'detail.type': 'Type',
    'detail.role': 'Role',
    'detail.plans': 'Plans',
    'detail.next': 'Next project',
    'detail.imageAlt': 'image',
    'detail.planAlt': 'plan',
    'detail.video': 'video',

    'estudio.kicker': 'Studio',
    'estudio.lead':
      'Architect from the Technical School of Architecture of Madrid (ETSAM). I design spaces attentive to light, materials and the real use of each place.',
    'estudio.experiencia': 'Experience',
    'estudio.formacion': 'Education',
    'estudio.herramientas': 'Tools',
    'estudio.g.edicion': 'Editing',
    'estudio.g.planos': 'Drafting',
    'estudio.g.render': 'Rendering',
    'estudio.cta': "Let's work together",

    'contacto.kicker': 'Contact',
    'contacto.titulo': "Let's talk about your project",
    'contacto.lead':
      'Based in Madrid, open to remote work. Tell me what you have in mind.',

    'prov.label': 'Provisional',
    'prov.title': 'Placeholder image — to be replaced by the final one',
  },
} as const;

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)['es']): string {
    return (ui[lang] as Record<string, string>)[key] ?? (ui.es as Record<string, string>)[key];
  };
}
