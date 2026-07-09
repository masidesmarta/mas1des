/**
 * Avisa de las imágenes provisionales (recortes del PDF) que siguen en el sitio.
 * Uso:  npm run check:provisionales
 * Sale con código 1 si queda alguna → sirve para bloquear un deploy final.
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'src/content/proyectos';
const pendientes = [];

for (const slug of readdirSync(DIR)) {
  const md = join(DIR, slug, 'index.md');
  if (!existsSync(md)) continue;
  const raw = readFileSync(md, 'utf8');
  const fm = raw.split(/^---$/m)[1] ?? '';
  const esProvisional = /^\s*provisional:\s*true\s*$/m.test(fm);
  const usaArchivoProvisional = /provisional\.(jpg|jpeg|png|webp)/i.test(raw);
  if (esProvisional || usaArchivoProvisional) {
    pendientes.push(slug);
  }
}

if (pendientes.length === 0) {
  console.log('✓ No quedan imágenes provisionales. Todo listo para publicar.');
  process.exit(0);
}

console.log(`\n⚠  ${pendientes.length} proyecto(s) con imágenes PROVISIONALES por sustituir:\n`);
for (const p of pendientes) console.log(`   · ${p}`);
console.log(
  '\nSustituye portada.provisional.jpg por el original definitivo y pon "provisional: false"\n' +
    'en el index.md de cada uno. Luego vuelve a ejecutar: npm run check:provisionales\n',
);
process.exit(1);
