# mas1des — Portfolio de Marta Masides

Portfolio de arquitectura construido con [Astro](https://astro.build). Sitio
estático, imagen-first, desplegado en Vercel.

## Stack

- **Astro** — genera HTML estático, 0 JS por defecto, optimización de imágenes integrada.
- **Content Collections** — cada proyecto es una carpeta en `src/content/proyectos/`.
- CSS vanilla con tokens en `src/styles/global.css` + estilos scopeados por componente.
- Deploy en **Vercel** (conectado al repo).

## Comandos

| Comando           | Acción                                   |
| ----------------- | ---------------------------------------- |
| `npm install`     | Instala dependencias                     |
| `npm run dev`     | Servidor de desarrollo en localhost:4321 |
| `npm run build`   | Build de producción en `./dist/`         |
| `npm run preview` | Previsualiza el build en local           |

## Añadir un proyecto

1. Crea una carpeta en `src/content/proyectos/<slug>/`.
2. Dentro, un `index.md` con los datos (ver `casa-ejemplo/` como plantilla).
3. Mete las imágenes en esa misma carpeta y referéncialas con rutas relativas
   (`portada: ./portada.jpg`).

**Formatos de imagen:**

- **Fotos y renders** → JPG originales a máxima resolución (Astro los optimiza).
- **Planos** → SVG (ideal, vectorial) o PNG grande. Exportados desde Illustrator.

## Edición para no-técnicos (futuro)

La estructura de contenido está pensada para añadir
[Keystatic](https://keystatic.com) más adelante: un editor visual sobre los
mismos ficheros markdown, para que Marta pueda editar desde el navegador sin
tocar código. No requiere migrar contenido.

## Idiomas

Solo español por ahora. Astro tiene i18n nativo por rutas si en el futuro se
quiere añadir inglés.
