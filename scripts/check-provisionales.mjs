/**
 * Avisa de las imágenes provisionales (recortes del PDF) que siguen en el sitio.
 * Uso:  npm run check:provisionales
 * Sale con código 1 si queda alguna → sirve para bloquear un deploy final.
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'src/content/proyectos';
const pendientes = [];

for (const slug of readdirSync(DIR)) {
  const carpeta = join(DIR, slug);
  if (!statSync(carpeta).isDirectory()) continue;

  // Ficha bilingüe única por proyecto (modelo Keystatic).
  const yaml = join(carpeta, 'index.yaml');
  let flagged = false;
  if (existsSync(yaml)) {
    const raw = readFileSync(yaml, 'utf8');
    const esProvisional = /^\s*provisional:\s*true\s*$/m.test(raw);
    const usaArchivoProvisional = /provisional\.(jpg|jpeg|png|webp)/i.test(raw);
    if (esProvisional || usaArchivoProvisional) flagged = true;
  }
  // Red extra: archivos *.provisional.* sueltos en la carpeta.
  if (!flagged && readdirSync(carpeta).some((f) => /\.provisional\./i.test(f))) flagged = true;

  if (flagged) pendientes.push(slug);
}

if (pendientes.length === 0) {
  console.log('✓ No quedan imágenes provisionales. Todo listo para publicar.');
  process.exit(0);
}

console.log(`\n⚠  ${pendientes.length} proyecto(s) con imágenes PROVISIONALES por sustituir:\n`);
for (const p of pendientes) console.log(`   · ${p}`);
console.log(
  '\nSustituye los *.provisional.jpg por los originales definitivos y pon "provisional: false"\n' +
    'en el index.yaml de cada uno. Luego vuelve a ejecutar: npm run check:provisionales\n',
);
process.exit(1);
