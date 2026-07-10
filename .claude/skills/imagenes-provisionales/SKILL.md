---
name: imagenes-provisionales
description: Sustituir las imágenes provisionales (recortes del PDF) por los originales de Marta y marcar el proyecto como definitivo. Úsalo cuando lleguen fotos/planos originales o al preguntar por el estado de las provisionales.
---

# Sustituir imágenes provisionales

Todas las imágenes de proyecto son **recortes de baja calidad del PDF** de Marta,
pendientes de sustituir por originales. Están marcadas por triplicado.

## Ver qué queda pendiente
```bash
npm run check:provisionales
```
Lista los proyectos con `provisional: true` o archivos `*.provisional.*`.
Devuelve código 1 si queda alguno (sirve para bloquear un deploy final).

## Sustituir las imágenes de un proyecto

Para `src/content/proyectos/<slug>/`:

1. **Coloca los originales** en la carpeta del proyecto:
   - Fotos/renders → JPG a máxima resolución (Astro los optimiza a webp solo).
   - Planos → **SVG** (ideal, vectorial) o PNG grande.
   - Nómbralos limpio: `portada.jpg`, `01.jpg`, `02.jpg`, `planta.svg`…
2. **Borra** los `*.provisional.jpg` de esa carpeta.
3. **Edita `es.md` Y `en.md`** de ese proyecto (los campos de imagen se replican
   igual en ambos idiomas):
   - `portada: ./portada.jpg`
   - `galeria:` → lista de los nuevos archivos.
   - `planos:` → si hay.
   - `provisional: false`
4. `npm run build` para verificar (los tipos se regeneran solos).
5. Repite hasta que `npm run check:provisionales` diga que no queda ninguna.

## Notas
- El badge "provisional" del HTML desaparece solo al poner `provisional: false`.
- No dejes archivos `*.provisional.*` sueltos: el check también los detecta por nombre.
- La galería de la ficha usa la 1ª imagen como apertura a lo ancho y el resto en
  mosaico 4/3 — ordena la `galeria` pensando en eso (la más potente primero).
