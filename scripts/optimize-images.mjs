import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = 'C:/Users/n.almsouti/Documents/portfolio/golden/public';

const jobs = [
  // station photos: heavy PNGs with no transparency -> webp
  ...['sheikh-najjar', 'tartus1', 'tartus2', 'marota', 'mobile'].map((n) => ({
    in: `${ROOT}/img/stations/${n}.png`,
    out: `${ROOT}/img/stations/${n}.webp`,
    width: 1280,
    format: 'webp',
    quality: 80,
    removeIn: true,
  })),
  // hero / fleet photography
  ...['hero-station', 'hero-fleet', 'fleet-1', 'fleet-2', 'fleet-3', 'card'].map((n) => ({
    in: `${ROOT}/img/${n}.jpg`,
    out: `${ROOT}/img/${n}.jpg`,
    width: 1920,
    format: 'jpeg',
    quality: 78,
  })),
  // logo mark keeps its alpha channel
  { in: `${ROOT}/brand/mark.png`, out: `${ROOT}/brand/mark.png`, width: 512, format: 'png' },
  { in: `${ROOT}/brand/logo-full-dark.png`, out: `${ROOT}/brand/logo-full-dark.png`, width: 900, format: 'png' },
  { in: `${ROOT}/brand/logo-full-light.png`, out: `${ROOT}/brand/logo-full-light.png`, width: 900, format: 'png' },
];

const kb = (n) => `${(n / 1024).toFixed(0)}KB`;
let before = 0;
let after = 0;

for (const job of jobs) {
  try {
    const src = await fs.readFile(job.in);
    before += src.length;

    let pipe = sharp(src).resize({ width: job.width, withoutEnlargement: true });
    if (job.format === 'webp') pipe = pipe.webp({ quality: job.quality });
    else if (job.format === 'jpeg') pipe = pipe.jpeg({ quality: job.quality, mozjpeg: true });
    else pipe = pipe.png({ compressionLevel: 9, palette: true });

    const buf = await pipe.toBuffer();
    await fs.writeFile(job.out, buf);
    after += buf.length;

    if (job.removeIn && path.resolve(job.in) !== path.resolve(job.out)) await fs.unlink(job.in);
    console.log(`${path.basename(job.in)} ${kb(src.length)} -> ${path.basename(job.out)} ${kb(buf.length)}`);
  } catch (e) {
    console.log(`SKIP ${job.in}: ${e.message}`);
  }
}

// unused source image
try {
  await fs.unlink(`${ROOT}/img/network-wide.png`);
  console.log('removed unused network-wide.png');
} catch {}

console.log(`\nTOTAL ${kb(before)} -> ${kb(after)}`);
