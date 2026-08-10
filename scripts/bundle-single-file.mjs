/**
 * Turns the prerendered Nuxt output into ONE self-contained index.html in dist/.
 *
 *  - inlines every stylesheet Nuxt emitted
 *  - inlines app/assets/js/motion.js as the page's only script
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

/* ---------- 3. inline the behaviour script ---------- */
const motion = await readFile(motionPath, 'utf8')
if (motion.includes('</script')) throw new Error('motion.js contains a script terminator')
html = html.replace('</body>', `<script>\n${motion}\n</script>\n</body>`)

/* ---------- 4. guard: no local asset references left ---------- */
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

const { size } = await stat(join(out, 'index.html'))
console.log(
  `single-file build ok → dist/index.html (${(size / 1024).toFixed(1)} KB, ` +
    `${inlinedCss} stylesheet${inlinedCss === 1 ? '' : 's'} inlined)`,
)
