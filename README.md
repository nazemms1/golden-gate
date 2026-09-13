# Golden Gate — البوابة الذهبية للنقل والخدمات النفطية

Corporate site for Golden Gate for Transport & Oil Services (Damascus, Syria).
Bilingual Arabic / English with full RTL support.

## Stack

| | |
|---|---|
| Build | Vite 6 + TypeScript |
| UI | React 18 |
| Styling | Tailwind CSS v4 (`@theme` tokens, no config file) |
| Motion | `motion` (Framer Motion v12) + Lenis smooth scroll |

## Running it

```bash
npm install
npm run dev      # http://localhost:5180
npm run build    # → dist/
npm run preview
```

## Layout

```
public/
  brand/      logo lockups + the crescent mark
  fonts/      ITF Qomra Arabic (brand face) + AA QIMA
  img/        photography, station photos
src/
  components/ one file per page section, ui/ holds the primitives
  data/
    content.ts    every user-facing string, both languages
    stations.ts   the 8 Golden Gate sites + 13 partner sites
    syria-map.ts  generated country outline and projected pin positions
  lib/        language context, smooth scroll, section observer
scripts/
  optimize-images.mjs   re-compresses everything in public/
```

### Content changes

All copy lives in `src/data/content.ts`, keyed `ar` / `en`. The `Dict` type
forces both languages to stay in sync — a missing translation is a build error.

### The stations map

`src/data/syria-map.ts` is generated, not hand-drawn. The country outline comes
from public-domain geometry (mledoze/countries, SYR) run through an
equirectangular projection corrected at 35°N and normalised to a 1000-unit
viewBox. Each station's real GPS coordinates go through that same projection, so
the pins land where the stations actually are. To add a station, add it to
`stations.ts` and add its projected point to `STATION_POINTS`.

### Images

`npm run optimize:images` re-runs the compression pass (station photos to WebP,
photography capped at 1920px). It rewrites files in place — the untouched
originals are kept out of git in `_source_assets/`.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes `dist/` to GitHub Pages. Enable it once under
**Settings → Pages → Source → GitHub Actions**.

`base` is `'./'` in `vite.config.ts`, so the same build works from a subdirectory
(GitHub Pages) and from a domain root (goldengate.sy) with no changes.

### Before going live on goldengate.sy

- `LINKS.apk` in `src/data/content.ts` points at the APK on the current live
  site. Once the APK is deployed next to this build, change it to
  `'./assets/app-release.apk'`.
- The contact form has no backend; it opens the visitor's mail client
  pre-addressed to `info@goldengate.sy`. Wire it to a form endpoint if you want
  submissions stored server-side.
