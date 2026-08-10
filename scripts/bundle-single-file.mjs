/**
 * Turns the prerendered Nuxt output into ONE self-contained index.html in dist/.
 *
 *  - inlines every stylesheet Nuxt emitted
 *  - verifies app/assets/js/motion.js came through inline (nuxt.config injects
 *    it, so `nuxt dev` and the built file behave identically)
 *  - drops preload/prefetch/modulepreload hints (nothing left to preload)
 *  - copies public/ assets (the CV PDF) alongside it
 *
 * Fails loudly if the resulting HTML still points at a local asset it needs
 * to render, so "single file" stays true rather than aspirational.
 */
import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const src = join(root, '.output/public')
const out = join(root, 'dist')
const motionPath = join(root, 'app/assets/js/motion.js')

const html0 = await readFile(join(src, 'index.html'), 'utf8')

/* ---------- 1. inline stylesheets ---------- */
const cssHrefs = [...html0.matchAll(/<link[^>]+rel="stylesheet"[^>]*>/g)]
let html = html0
let inlinedCss = 0

for (const [tag] of cssHrefs) {
  const href = tag.match(/href="([^"]+)"/)?.[1]
  if (!href || /^https?:|^\/\//.test(href)) continue // keep the Google Fonts link
  const file = join(src, href.replace(/^\//, ''))
  if (!existsSync(file)) continue
  const css = await readFile(file, 'utf8')
  html = html.replace(tag, `<style>${css}</style>`)
  inlinedCss++
}

/* ---------- 2. strip resource hints ---------- */
html = html.replace(/<link[^>]*rel="(?:modulepreload|preload|prefetch)"[^>]*>/g, '')

/* ---------- 3. guards ---------- */
// motion.js is inlined by nuxt.config (so dev matches prod) — check it landed.
const motion = await readFile(motionPath, 'utf8')
const marker = motion.split('\n').find((l) => l.includes('var CONFIG'))?.trim()
if (!marker || !html.includes(marker)) {
  throw new Error('index.html is missing the inlined motion script')
}

// No external <script src> and nothing left pointing at build assets.
const externalScripts = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1])
if (externalScripts.length) {
  throw new Error(`index.html loads external scripts:\n  ${externalScripts.join('\n  ')}`)
}
const localRefs = [...html.matchAll(/(?:src|href)="(\/_nuxt\/[^"]+)"/g)].map((m) => m[1])
if (localRefs.length) {
  throw new Error(`index.html still references build assets:\n  ${localRefs.join('\n  ')}`)
}

/* ---------- 5. write dist/ ---------- */
await rm(out, { recursive: true, force: true })
await mkdir(out, { recursive: true })
await writeFile(join(out, 'index.html'), html)

// Copy everything the prerender emitted except the build assets and the
// stock Nuxt error pages — unknown paths should land on the portfolio itself.
for (const entry of await readdir(src)) {
  if (['_nuxt', 'index.html', '200.html', '404.html'].includes(entry)) continue
  if (entry === '.DS_Store') continue
  await cp(join(src, entry), join(out, entry), { recursive: true })
}
await writeFile(join(out, '404.html'), html)

// GitHub Pages: don't run the output through Jekyll.
await writeFile(join(out, '.nojekyll'), '')

// One-page sitemap, stamped with the build date.
const lastmod = new Date().toISOString().slice(0, 10)
await writeFile(
  join(out, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://budisalah.github.io/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`,
)

const { size } = await stat(join(out, 'index.html'))
console.log(
  `single-file build ok → dist/index.html (${(size / 1024).toFixed(1)} KB, ` +
    `${inlinedCss} stylesheet${inlinedCss === 1 ? '' : 's'} inlined)`,
)
