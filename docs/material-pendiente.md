# Material original — estado por proyecto

Seguimiento de qué imágenes son **originales** (de Marta) y cuáles siguen siendo
**recortes provisionales del PDF**, para pedirle a Marta lo que falte.

> Marta envió por Drive (email 10/07): láminas SVG del PFM Riotinto + páginas del
> portfolio en JPG + 3 fotos de WhatsApp.
> Segundo envío (email 16/07): carpetas por proyecto en alta calidad (West Glow,
> Costa Rica, Piso Arcas, Touro, Performance) + **2 proyectos nuevos** (TFG
> «Madrid me mata» y Paisaje de Alto de Carabanchel). Se sustituyeron todas las
> imágenes de esos apartados salvo Performance, donde se mantuvieron las
> anteriores y los escaneados nuevos se **añadieron** a la galería.

## Estado

| Proyecto | Portada | Galería | Fuente usada | Falta / pedir a Marta |
|---|---|---|---|---|
| pfm-riotinto | ✅ original | ✅ original | Láminas SVG rasterizadas a webp | — |
| concurso-aranzazu | ✅ | ✅ | Páginas portfolio (jpg24 recortada + 25-27) | Láminas en alta si las tiene |
| residencial-taller-touro | ✅ | ✅ | Zip 16/07 (portada + 3 imágenes en alta) | — |
| intervencion-vista-alegre | ✅ | ✅ | Páginas portfolio (jpg11-13) | Láminas en alta si las tiene |
| modelado-bim-seul | ✅ | ✅ | Zip 16/07 «West Glow» (10 renders/planos) | — |
| tfg-madrid-me-mata | ✅ | ✅ | Zip 16/07 «TFG» (6 láminas) | — |
| paisaje-alto-carabanchel | ✅ | ✅ | Zip 16/07 «Alto de Carabanchel» (4 imágenes) | — |
| publicaciones | ✅ | ✅ | 3 axonométricas WhatsApp | Dibujos en alta si los tiene |
| visualizacion-costa-rica | ✅ | ✅ | Zip 16/07 «Costa Rica» (4 renders originales) | — |
| visualizacion-vivienda-patio | ✅ | ✅ | Zip 16/07 «Piso Arcas» (3 renders originales) | — |
| visualizacion-retail | ⏳ provisional | ⏳ provisional | Recorte del PDF | **Faltan los renders originales** |
| performance | ✅ | ✅ | Fotos previas + 5 escaneados analógicos (zip 16/07) | — |

Al sustituir cada uno: quitar `.provisional`, `provisional: false`, `npm run check:provisionales`.

## Pendiente de pedir a Marta (bloqueante para quitar el aviso "provisional")

Solo queda el **Evento de retail**: no venía en ningún envío — sigue siendo un
recorte del PDF. Pedirle los renders originales (Enscape) cuando surja.

Opcional (mejora de calidad, no bloqueante): la **portada de Vista Alegre**
sigue saliendo de una página del portfolio a baja resolución (~509 px, se ve
algo blanda en pantallas grandes). Si Marta conserva la lámina original en
alta, sustituirla. Lo mismo (menos urgente) para Aranzazu y publicaciones.

## Pendiente de decidir
- **Panel 14 como portada del hero** (en vez de la muñeca): explorar con delicadeza
  (es muy rojo/llamativo) y testear con subagentes antes de decidir. Alternativas:
  hero con la lámina + mantener la muñeca en otro sitio, o dejar la muñeca.
