---
name: git-deploy
description: Flujo de git y deploy de mas1des (commits en español, push bloqueado hasta tener acceso, deploy en Vercel de Marta). Úsalo al commitear, pushear o desplegar.
---

# Git y deploy

## Commits
- **En español, imperativo**, mensaje claro con cuerpo si hace falta.
- Trailer obligatorio:
  `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`
- Commitear con frecuencia; el trabajo se guarda en local aunque no se pueda pushear.

## Push (BLOQUEADO de momento)
El repo `github.com/masidesmarta/mas1des` es de Marta. El push da **403** hasta
que ella añada como colaboradora a la cuenta **`ebecerra-developer`**
(Settings → Collaborators → Add people → `ebecerra-developer` → ella invita, se
acepta la invitación). Después:
```bash
git push -u origin main
```
No existe upstream configurado hasta el primer push con `-u`.

## Deploy
Vercel está conectado al repo de Marta. **Cada push a `main` dispara su deploy**
automáticamente. No hay que tocar nada en Vercel (no tenemos acceso). El `site`
en `astro.config.mjs` es un placeholder → actualizar al dominio real cuando exista.

## Antes de un deploy "definitivo"
- `npm run build` sin errores.
- `npm run check:provisionales` → idealmente 0 (todas las imágenes reales).
- Revisar responsive (5 anchos) y, si aplica, pasar los testers
  (`tester-visual-web`, `tester-dev`) del entorno.
