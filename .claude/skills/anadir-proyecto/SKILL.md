---
name: anadir-proyecto
description: Añadir o editar un proyecto del portfolio (nueva obra, cambiar datos, reordenar, destacar). Úsalo al crear un proyecto nuevo o modificar el contenido de uno existente.
---

# Añadir / editar un proyecto

Los proyectos son **Content Collections** de Astro. Cada uno es una carpeta.

## Crear un proyecto nuevo

1. Crea `src/content/proyectos/<slug>/` (el `<slug>` es la URL: minúsculas,
   guiones, sin acentos — p. ej. `casa-en-madrid`).
2. Dentro, un `index.md`:
```md
---
titulo: "Casa entre patios"
orden: 3            # menor = antes. Los destacados suben en la home.
destacado: false    # true → aparece en la selección de la home
ano: 2025
ubicacion: "Madrid"
tipo: "Vivienda"
rol: "Autora"
resumen: "Una frase para el listado."
provisional: false  # true mientras las imágenes sean provisionales
portada: ./portada.jpg
galeria:
  - ./01.jpg
  - ./02.jpg
planos:
  - ./planta.svg
---

Descripción del proyecto (markdown). Uno o varios párrafos.
```
3. Coloca las imágenes en esa misma carpeta.
4. `npm run build` para verificar.

## Campos (schema en `src/content.config.ts`)

Todos opcionales salvo `titulo`. `orden` (default 100) y `destacado` (default
false) controlan dónde aparece. `portada`/`galeria`/`planos` son imágenes
(rutas relativas `./`). El cuerpo markdown es la descripción larga.

## Dónde se muestra cada cosa

- **Home**: los `destacado: true` (máx 5) como índice de texto. El total sale en
  "Destacados · N proyectos" y "N de M".
- **/proyectos**: TODOS, como galería (el 1º por `orden` va a lo ancho).
- **Ficha** `/proyectos/<slug>`: portada full-bleed + spec-sheet (año/ubicación/
  tipo/rol) + descripción + galería (apertura + mosaico) + "siguiente proyecto".

## Reglas
- Contenido **solo en español** (el sitio no es bilingüe).
- Datos **reales** — verificar con Marta lo que se infiera (años, ubicaciones).
- Si las imágenes son provisionales, seguир `/imagenes-provisionales`.
