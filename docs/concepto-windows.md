# Concepto "Escritorio Windows" — brief de rediseño

Idea de Marta (la tenía en mente hace mucho): que la web **no parezca una web, sino
un escritorio de ordenador vintage**. Este doc recoge su visión (sacada de sus
propios mensajes) y el plan, para arrancar el rediseño con contexto.

## La visión de Marta (sus palabras)

- La web **es una pantalla de ordenador**. Los proyectos son **carpetas típicas 📂**
  que "salen un poco"; al clicar, se abren y están "ordenaditos" dentro.
- **Fondo**: el típico de Windows ("el tipiquísimo") **o** una imagen de un proyecto
  suyo que le guste. → ofrecer ambas.
- **Muy vintage**, con **puntero de flecha** retro (cursor personalizado).
- Carpetas con nombres tipo **"WIP"** cuando algo no está terminado (es su flujo de
  trabajo real → autenticidad).
- **Divertido**. Posible **sonido** al abrir/cerrar ventanas o al clic (opcional,
  "vamos viendo").
- Es **flexible**: si el escritorio completo es mucho, le vale algo más simple
  ("colocar las carpetas distinto, nada sofisticado").

> Nota: sus referencias de tipografía anteriores (UNIK2, SciFly, "tech-futurista")
> encajan con esta estética retro-ordenador — probablemente era el norte real.

## Referencias (numeradas como las pasó Enrique)

**La más cercana a lo que buscamos: la nº 5** (concepto + vintage), con mejor
organización (carpetas por categoría).

1. **[donchia.tech](https://www.donchia.tech/)** + repo
   **[github.com/dhs17y2adonchia/win95](https://github.com/dhs17y2adonchia/win95)**
   — Win95 open-source muy completo. No queremos tanto, pero **mina de patrones de
   implementación**. (En su hilo de Reddit le critican la **accesibilidad** → es
   justo nuestra ventaja con el modo lectura + SSR.)
2. **[mitchivin.com](https://mitchivin.com/)** — XP completísimo (boot, login,
   IE, Paint…). Demasiado; inspira detalles.
3. **[pauljaguin.com](https://pauljaguin.com/)** — otro XP completísimo. Ídem.
4. **[vovacodes.ca](https://www.vovacodes.ca/)** — Win11; sus "documentos que abren
   un formato web" ES nuestro **modo lectura** (icono → ventana con la web normal
   dentro). **Clave conceptual.** (Carga algo lenta → evitar eso.)
5. **[windows.estudiopachel.com](https://windows.estudiopachel.com/)** — Win95 muy
   vintage, no tan completo. **← NORTE en concepto y estética** (con mejor
   organización por carpetas).
6. **[amorciegocupido.com](https://www.amorciegocupido.com/)** — estilo Mac; lo dio
   Marta como referencia, pero quiere **Windows retro** (no Mac).

## Decisiones de diseño

- **Responsive temático (clave):** desktop = escritorio con ventanas; **móvil =
  pantalla de inicio de móvil** (rejilla de iconos → tocar abre a pantalla
  completa). No intentar "Windows encogido".
- **Alcance realista:** NO hace falta un gestor de ventanas completo
  (arrastrar/redimensionar/taskbar/menú inicio). Empezar por: fondo + iconos de
  carpeta con relieve/hover + abrir ventana al clic con animación retro + cursor de
  flecha + etiquetas "WIP". Arrastrar/sonido = extra si sobra tiempo.
- **Ventanas:** chrome retro con **minimizar / maximizar / cerrar**; clic en una
  ventana la trae al frente (z-index simple). Al abrir un proyecto, la ventana va
  **casi maximizada por defecto** (se quiere ver la obra grande), tipo lector de PDF;
  "restaurar" vuelve al escritorio.
- **Arrastrar: SÍ en desktop, versión sencilla.** (Revisado: todas las referencias
  del género arrastran; hecho simple no es caro ni lento.) Mover con `transform`
  desde la barra de título, con pointer events, clamp al viewport, **sin persistir
  posiciones** (reset al recargar). En **móvil desactivado** → ventanas a pantalla
  completa. No montar un window-manager completo; solo el drag básico. Se puede
  shippear v1 sin arrastre si aprieta el tiempo, pero está en el plan.
- **Era decidida: Windows 95 / 2000, en clave "retro moderno".** Marta (nacida
  ~2000) no vivió el 95 → busca el retro como **estética**, no nostalgia fiel. Eso
  da **licencia para pulir**: chrome 95 pero nítido, buena tipografía, animaciones
  suaves, "vistoso". Retro premium, no pixel-mush de museo. Fuente retro libre para
  el chrome (p. ej. W95FA u otra system-font).
- **SEO/a11y (guardarraíl):** el contenido real va **SSR y semántico debajo** del
  chrome del OS. Cursor y sonidos respetando `prefers-reduced-motion` + opción de
  silenciar. Foco de teclado navegable.

## Opción fuerte: "Modo lectura" (toggle)

La web arranca en **modo escritorio Windows** (lo de Marta, protagonista), y el
"modo lectura" (web estándar) se accede como **una app del escritorio: un icono de
Internet Explorer** ("e") → abre una **ventana de navegador** (con marco falso: barra
de direcciones `www.mas1des.es`, atrás/adelante/recargar) y dentro **el portfolio en
formato web** (la versión editorial que ya tenemos). Patrón del Ejemplo 4 (vovacodes).

- **In-world, no un toggle pegado:** en un escritorio, "ver la web normal" = abrir el
  navegador. Natural.
- **Render NATIVO, no iframe.** La ventana renderiza las mismas rutas/componentes
  editoriales; nada de `<iframe>` (rompe SEO/scroll/estilos).
- **Se apoya en rutas SSR reales** → Google indexa esas páginas y los humanos tienen
  el escritorio encima. A11y + SEO resueltos por diseño (donde las webs-OS fallan).
- **Móvil:** tender a abrir directamente esa vista editorial / el "navegador" a
  pantalla completa.

- **Ventajón:** el modo lectura **ya está construido** — es la versión editorial
  actual (hero, listado, fichas). No se tira; se recicla como vista estándar.
- Desactiva el riesgo de "gimmick" (cliente serio → un clic y ve el trabajo directo).
- Es la **red de seguridad SEO/a11y**: el modo lectura es la versión semántica e
  indexable (encaja con "contenido SSR debajo del chrome").
- En móvil se puede tender al modo lectura / pantalla-de-inicio; el escritorio con
  ventanas se reserva para desktop.
- **Reglas:** el escritorio es el modo **por defecto y protagonista**; el modo
  lectura es la **app de Internet Explorer** (aditiva, in-world). Ambos leen el
  **mismo contenido/CMS**.
- **Secuencia:** construir el modo OS (lo nuevo) → dejar el editorial actual como
  modo lectura → cablear el toggle. No perfeccionar los dos a la vez.
- **Validar con Marta** como algo aditivo antes de comprometerlo.

## Qué se REAPROVECHA (no se tira nada de contenido)

- `src/content/proyectos/*/index.yaml` (fichas bilingües) + imágenes optimizadas.
- i18n (next-intl → aquí es el sistema propio en `src/i18n/`).
- El **CMS Keystatic** entero (modelo, config).
- Mapeos naturales: `provisional` → carpeta/etiqueta **"WIP"** · `destacado` →
  carpeta destacada/fija · `orden` → colocación · `ubicacion`/`ano` → "propiedades"
  del archivo.
- **Organización por carpetas con el campo `categoria`** (ya en el CMS: enum
  `academicos` / `concursos` / `visualizacion` / `performance` / `publicaciones`):
  el escritorio tiene esas carpetas y al abrir una están los proyectos dentro
  "ordenaditos". (`tipo` sigue siendo el texto libre de las "propiedades" de la
  ficha.) Encaja con lo que pidió Marta ("dividir en carpetas").

Se reemplaza solo la **piel/UX** (hero rojo, layout editorial actual → escritorio).

## Estado del CMS (para no perderlo en el rediseño)

- Keystatic activado, modelo de ficha bilingüe `index.yaml`, imágenes co-locadas.
- `keystatic.config.ts` está en `storage: { kind: 'local' }` **de momento**.
- Para que Marta edite online (sin env vars): **Keystatic Cloud**. Marta está
  creando/conectando el proyecto en keystatic.cloud (team `mas1des`). Cuando dé el
  identificador `team/proyecto` (p. ej. `mas1des/web`), cambiar el config a
  `storage: { kind: 'cloud' }` + `cloud: { project: 'mas1des/web' }` y push. Añadir
  los dominios (localhost + Vercel) en el proyecto de keystatic.cloud. Ver
  `docs/cms.md`. **Este paso es independiente del rediseño**: se puede rematar en
  cualquier momento.

## Entrantes de contenido que mencionó Marta

- **Concurso de un ayuntamiento**: "solo un panel, lo dividiré con imágenes" → cabe
  como proyecto nuevo (galería) en el CMS.
- **Renders de su trabajo**: puede subirlos **mencionando a su jefe** (colaboración)
  → añadir una línea de **crédito** en la ficha del proyecto de visualización.

## Decisiones tomadas (julio 2026, con Enrique)

1. **Era: Windows 2000.** Titlebar con degradado azul (`#0a246a → #a6caf0`), gris
   cálido `#d4d0c8`, bevels de 1px, Tahoma como fuente del chrome (system stack,
   auténtica de Win2000 y cero bytes). Licencias "retro premium": sombras suaves
   bajo las ventanas, animación cuidada.
2. **Fondo: imagen de un proyecto de Marta** (de partida, el render del mercado
   textil de Riotinto — el hero actual — con tratamiento para que los iconos se
   lean; fácil de cambiar si Marta prefiere otra).
3. **Sustituye a la versión actual**, PERO el hero rojo **no desaparece**: pasa
   también al modo lectura. La home editorial completa (hero + destacados) se
   muda a `/portfolio` y es la página de inicio de la ventana de Internet
   Explorer. La home (`/`) pasa a ser el escritorio.

### Arquitectura acordada

- MPA sobre rutas reales (SSR, indexable): `/` escritorio · `/carpeta/[categoria]`
  ventana Explorador · `/proyectos/[slug]` ventana visor casi maximizada ·
  `/portfolio`, `/proyectos`, `/estudio`, `/contacto` dentro de la ventana IE
  (modo lectura). Fichas con **una sola URL** (siempre abren como visor, como un
  PDF desde el navegador — in-world y sin URLs duplicadas).
- Campo **`categoria`** nuevo en el CMS (select: academicos / concursos /
  visualizacion / performance / publicaciones) para las carpetas del escritorio;
  `tipo` sigue como texto libre de las "propiedades".
- Móvil = pantalla de inicio (rejilla de iconos + status bar); todo fullscreen,
  sin drag. Desktop = ventanas flotantes + taskbar + drag sencillo.
- Chrome del OS en `src/styles/os.css`; el contenido dentro de las ventanas
  mantiene la voz editorial (Inter, papel, tinto).
