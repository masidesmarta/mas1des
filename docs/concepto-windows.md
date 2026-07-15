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

## Referencias (reunidas con Marta)

**El más cercano a lo que buscamos: Ejemplo 5** (concepto + vintage), pero con
mejor organización (carpetas por categoría).

- **[estudiopachel.com/windows](https://windows.estudiopachel.com/)** — Win95 muy
  vintage, no tan completo. **NORTE en concepto y estética.**
- **[vovacodes.ca](https://www.vovacodes.ca/)** — Win11; sus "documentos que abren
  un formato web" ES nuestro **modo lectura** (icono Portfolio/CV → ventana con la
  web normal dentro). Clave conceptual. (Carga algo lenta → evitar eso.)
- **[donchia.tech](https://www.donchia.tech/)** + repo
  **[github.com/dhs17y2adonchia/win95](https://github.com/dhs17y2adonchia/win95)**
  — Win95 open-source muy completo. No queremos tanto, pero **mina de patrones de
  implementación**.
- **[mitchivin.com](https://mitchivin.com/)** y
  **[pauljaguin.com](https://pauljaguin.com/)** — XP completísimos (boot, login,
  Paint…). Nivel de ambición que NO buscamos; inspiran detalles.
- **[amorciegocupido.com](https://www.amorciegocupido.com/)** — estilo Mac; lo dio
  Marta como referencia aunque quiere **Windows retro** (no Mac).
- Contexto: en el Reddit del Ejemplo 1 le critican la **accesibilidad** → es
  justo **nuestra ventaja** con el modo lectura + SSR (ver abajo).

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
- **Organización por carpetas usando `tipo`** (ya en el CMS): el escritorio tiene
  unas pocas carpetas de categoría — "Académicos", "Concursos", "Visualización",
  "Performance", "Publicaciones" — y al abrir una están los proyectos dentro
  "ordenaditos". Encaja con lo que pidió Marta ("dividir en carpetas").

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

## Preguntas para Marta antes de arrancar

1. 2-3 **referencias** de webs/estética "OS" que le molen (para fijar la era y el tono).
2. ¿**Fondo**: el clásico de Windows o una imagen suya? (si es suya, cuál).
3. ¿Le importa que esto **sustituya** la versión actual (hero rojo, etc.)?
