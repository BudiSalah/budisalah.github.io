import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

/**
 * `features.noScripts: 'all'` strips every script Nuxt would emit — including
 * anything added through `useHead`. So the page's one script is appended here,
 * at render time, which covers `nuxt dev` and the prerender identically.
 */
const source = readFileSync(resolve(process.cwd(), 'app/assets/js/motion.js'), 'utf8')

if (source.includes('</script')) {
  throw new Error('motion.js contains a script terminator and cannot be inlined')
}

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('render:html', (html) => {
    html.bodyAppend.push(`<script>\n${source}\n</script>`)
  })
})
