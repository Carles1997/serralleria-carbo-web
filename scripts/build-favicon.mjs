// Genera les icones de la web (favicon.ico i apple-touch-icon.png) a partir del logotip aportat pel
// director de projecte: src/assets/branding/carbo-logo.png (indicació del 28/09/2026). No és una
// marca nova: s'aïlla la primera lletra del logotip («c»), tal com és, i es posa en blanc sobre el
// bordeus de la marca (#7c2a30) perquè es llegeixi a 16 i 32 px en pestanyes clares i fosques.
// Fa servir sharp, la dependència d'imatges d'Astro (sense dependències noves).
// Ús: node scripts/build-favicon.mjs
import { writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const sharp = require('sharp');

const LOGO = 'src/assets/branding/carbo-logo.png';
// Lletra «c» del logotip (columnes i files amb tinta, mesurades sobre el PNG de 1983 × 793).
const GLYPH = { left: 21, top: 184, width: 393 - 21 + 1, height: 561 - 184 + 1 };
const BRAND = { r: 0x7c, g: 0x2a, b: 0x30 };

/** Icona quadrada de «size» px: fons bordeus (cantonades arrodonides opcionals) i la «c» en blanc. */
async function icon(size, { rounded = true, scale = 0.64 } = {}) {
  const glyphBox = Math.round(size * scale);
  // Màscara de la lletra (canal alfa del logotip) convertida en blanc. Es redimensiona en RGBA amb
  // marge transparent i se n'extreu l'alfa després: sobre un sol canal, el marge de «contain» sortia
  // opac i dibuixava dues línies verticals als costats de la lletra.
  const mask = await sharp(LOGO)
    .ensureAlpha()
    .extract(GLYPH)
    .resize(glyphBox, glyphBox, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extractChannel('alpha')
    .toBuffer();
  const white = await sharp({ create: { width: glyphBox, height: glyphBox, channels: 3, background: '#ffffff' } }).joinChannel(mask).png().toBuffer();
  const radius = rounded ? Math.round(size * 0.2) : 0;
  const background = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="rgb(${BRAND.r},${BRAND.g},${BRAND.b})"/></svg>`,
  );
  const offset = Math.round((size - glyphBox) / 2);
  return sharp(background).composite([{ input: white, left: offset, top: offset }]).png().toBuffer();
}

/** Fitxer ICO amb entrades PNG (format admès per tots els navegadors actuals). */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const entries = [];
  let offset = 6 + 16 * images.length;
  for (const { size, data } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    entries.push(entry);
  }
  return Buffer.concat([header, ...entries, ...images.map(({ data }) => data)]);
}

const sizes = [16, 32, 48];
const images = [];
for (const size of sizes) images.push({ size, data: await icon(size, { scale: size <= 16 ? 0.7 : 0.64 }) });
writeFileSync('public/favicon.ico', ico(images));
// iOS aplica la seva pròpia màscara: fons ple, sense cantonades.
writeFileSync('public/apple-touch-icon.png', await icon(180, { rounded: false, scale: 0.6 }));
// Mostra ampliada opcional per revisar-la fora de public/ (no es publica): --preview=ruta.png
const preview = process.argv.find((arg) => arg.startsWith('--preview='))?.slice('--preview='.length);
if (preview) writeFileSync(preview, await icon(512));
console.log('Icones generades: public/favicon.ico (16, 32, 48 px) i public/apple-touch-icon.png (180 px).');
