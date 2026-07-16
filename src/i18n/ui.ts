export const languages = { es: 'ES', en: 'EN' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'es';

// Textos de interfaz (no de contenido, que vive en las collections).
export const ui = {
  es: {
    'meta.homeDesc':
      'Portfolio de Marta Masides, arquitecta por la ETSAM. Proyectos académicos y profesionales de arquitectura, interiorismo y visualización.',
    'meta.arquitecta': 'Marta Masides — Arquitecta',
    'meta.portfolioDesc':
      'Portfolio editorial de Marta Masides: selección de proyectos destacados de arquitectura, interiorismo y visualización.',
    'meta.proyectosDesc':
      'Todos los proyectos de Marta Masides: académicos, concursos, visualización arquitectónica, performance y publicaciones.',

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
    'hero.tagline': 'Pensar el espacio de otra manera.',
    'hero.cta': 'Ver proyectos',
    'hero.imageAlt':
      'Render de un mercado cubierto por una estructura textil roja — Proyecto Fin de Máster, Riotinto',
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

    'os.barra': 'Barra del sistema',
    'os.inicio': 'Inicio',
    'os.volverEscritorio': 'Volver al escritorio',
    'os.idioma': 'Idioma',
    'os.escritorio': 'Escritorio',
    'os.internet': 'Internet',
    'os.sobremi': 'Sobre mí.txt',
    'os.watermarkRole': 'Arquitecta · ETSAM · Madrid',
    'os.minimizar': 'Minimizar',
    'os.maximizar': 'Maximizar',
    'os.restaurar': 'Restaurar',
    'os.cerrar': 'Cerrar',
    'os.atras': 'Atrás',
    'os.direccion': 'Dirección',
    'os.elementos': 'elementos',
    'os.elemento': 'elemento',
    'os.blocnotas': 'Bloc de notas',
    'os.visor': 'Visor de imágenes',
    'os.zoomIn': 'Acercar',
    'os.zoomOut': 'Alejar',
    'os.zoomFit': 'Ajustar a la ventana',
    'os.anterior': 'Anterior',
    'os.siguiente': 'Siguiente',
  },
  en: {
    'meta.homeDesc':
      "Portfolio of Marta Masides, architect from ETSAM. Academic and professional projects in architecture, interior design and visualization.",
    'meta.arquitecta': 'Marta Masides — Architect',
    'meta.portfolioDesc':
      'Editorial portfolio of Marta Masides: a selection of featured works in architecture, interior design and visualization.',
    'meta.proyectosDesc':
      'All projects by Marta Masides: academic work, competitions, architectural visualization, performance and publications.',

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
    'hero.tagline': 'Thinking space differently.',
    'hero.cta': 'View projects',
    'hero.imageAlt':
      'Render of a market covered by a red textile structure — Master’s Final Project, Riotinto',
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

    'os.barra': 'System bar',
    'os.inicio': 'Start',
    'os.volverEscritorio': 'Back to desktop',
    'os.idioma': 'Language',
    'os.escritorio': 'Desktop',
    'os.internet': 'Internet',
    'os.sobremi': 'About me.txt',
    'os.watermarkRole': 'Architect · ETSAM · Madrid',
    'os.minimizar': 'Minimize',
    'os.maximizar': 'Maximize',
    'os.restaurar': 'Restore',
    'os.cerrar': 'Close',
    'os.atras': 'Back',
    'os.direccion': 'Address',
    'os.elementos': 'items',
    'os.elemento': 'item',
    'os.blocnotas': 'Notepad',
    'os.visor': 'Image viewer',
    'os.zoomIn': 'Zoom in',
    'os.zoomOut': 'Zoom out',
    'os.zoomFit': 'Fit to window',
    'os.anterior': 'Previous',
    'os.siguiente': 'Next',
  },
} as const;

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)['es']): string {
    return (ui[lang] as Record<string, string>)[key] ?? (ui.es as Record<string, string>)[key];
  };
}
