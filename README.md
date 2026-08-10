# budisalah.github.io

Personal portfolio — Nuxt 4 source, built down to a **single self-contained
`index.html`** for GitHub Pages.

```bash
make install
make dev       # http://localhost:3000
make build     # → dist/index.html (one file) + public assets
make preview   # serve dist/ on :4173
make           # list targets
```

## How it stays one file

- `ssr: true` + `features.noScripts: 'all'` — the page is prerendered; no Vue
  runtime or hydration ships.
- Nuxt inlines the compiled CSS into a single `<style>` block.
- `scripts/bundle-single-file.mjs` inlines [`app/assets/js/motion.js`](app/assets/js/motion.js)
  as the page's only `<script>`, strips leftover resource hints, and **fails the
  build** if any `/_nuxt/*` reference survives.

Result: `dist/index.html` (~50 KB) plus the files in `public/`. The only external
requests are Google Fonts and `three.js` (lazy-loaded from esm.sh for the hero
lattice; if it is blocked, the hero just renders flat).

## Structure

| Path | What |
| --- | --- |
| `app/data/portfolio.ts` | All copy and typed content — edit here, not in components |
| `app/components/` | One component per section, plus primitives (`SectionShell`, `ProjectCard`, …) |
| `app/assets/css/tokens.css` | Design tokens; `[data-accent]` drives every palette colour |
| `app/assets/css/main.css` | Component styles, responsive + print rules |
| `app/assets/js/motion.js` | Reveals, card tilt, timeline draw, confetti, mailto form, easter egg, three.js hero |
| `public/` | CV PDF (copied to `dist/` as-is) |
| `scripts/bundle-single-file.mjs` | Single-file bundler + guard |

## Extending

- **New section:** add data to `app/data/portfolio.ts`, a component under
  `app/components/`, and drop it into `app/app.vue`.
- **New accent colour:** add the token and a `[data-accent='…']` block in
  `tokens.css`; any component picks it up via `data-accent`.
- **Motion:** tune the `CONFIG` object at the top of `motion.js`
  (`motionLevel`, `confettiCount`, `easterEggEnabled`).

## Deploy

`.github/workflows/deploy.yml` builds on push to `master` and publishes `dist/`
to Pages. Set **Settings → Pages → Source: GitHub Actions** once.

`.github/dependabot.yml` opens grouped npm updates weekly and Actions updates
monthly; the deploy workflow builds each PR, so a green check means the
single-file build still works.

Type `golang` on the page.
