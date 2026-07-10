# Material original — estado por proyecto

Seguimiento de qué imágenes son **originales** (de Marta) y cuáles siguen siendo
**recortes provisionales del PDF**, para pedirle a Marta lo que falte.

> Marta envió por Drive (email 10/07): láminas SVG del PFM Riotinto (pesan ~130 MB
> cada una, hay que rasterizarlas a tamaño web) + las páginas del portfolio en JPG
> (`portfolio jpg 4–27`) + 3 fotos de WhatsApp. Nota suya: *"el panel 14 igual de
> primera imagen"* → candidata a portada de Riotinto (y a valorar como hero).

## Estado

| Proyecto | Portada | Galería | Fuente usada | Falta / pedir a Marta |
|---|---|---|---|---|
| pfm-riotinto | ✅ original | ✅ original | Láminas SVG rasterizadas a webp | — |
| concurso-aranzazu | ✅ | ✅ | Páginas portfolio (jpg24 recortada + 25-27) | Láminas en alta si las tiene |
| residencial-taller-touro | ✅ | ✅ | Páginas portfolio (jpg5-9) | Láminas en alta si las tiene |
| intervencion-vista-alegre | ✅ | ✅ | Páginas portfolio (jpg11-13) | Láminas en alta si las tiene |
| modelado-bim-seul | ✅ | ✅ | Páginas portfolio (jpg15-23) | Renders originales (Lumion/Enscape) si mejor calidad |
| publicaciones | ✅ | ✅ | 3 axonométricas WhatsApp | Dibujos en alta si los tiene |
| visualizacion-costa-rica | ⏳ provisional | ⏳ provisional | Recorte del PDF | **Faltan los renders originales** |
| visualizacion-vivienda-patio | ⏳ provisional | ⏳ provisional | Recorte del PDF | **Faltan los renders originales** |
| visualizacion-retail | ⏳ provisional | ⏳ provisional | Recorte del PDF | **Faltan los renders originales** |

Al sustituir cada uno: quitar `.provisional`, `provisional: false`, `npm run check:provisionales`.

## Pendiente de pedir a Marta (bloqueante para quitar el aviso "provisional")

Los tres proyectos de **visualización arquitectónica** (Costa Rica, vivienda con
patio, evento de retail) no venían en el material del Drive — solo existen como
recorte del PDF. Hay que pedirle los **renders originales** (los que hizo en
Lumion / Enscape) para poder sustituirlos. Hasta entonces se quedan con el aviso
de imagen provisional en la web.

Opcional (mejora de calidad, no bloqueante): las páginas del portfolio que
usamos como fuente son de **baja resolución (1191×842 px, A4 a ~150 dpi)**. Al
recortar el margen blanco, algunos dibujos quedan pequeños. El caso más visible
es la **portada de Vista Alegre** (la axonometría ocupa poca página → ~509 px →
se ve algo blanda en pantallas grandes). Si Marta conserva las **láminas
originales en alta** de Aranzazu, Touro, Vista Alegre, BIM y los dibujos de
publicaciones, sustituirían con más nitidez. Prioridad: Vista Alegre.

## Pendiente de decidir
- **Panel 14 como portada del hero** (en vez de la muñeca): explorar con delicadeza
  (es muy rojo/llamativo) y testear con subagentes antes de decidir. Alternativas:
  hero con la lámina + mantener la muñeca en otro sitio, o dejar la muñeca.
