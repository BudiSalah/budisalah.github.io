/**
 * Renders scripts/og-card.html to public/og.png (1200×630) with headless Chrome.
 *
 * Run it via `make og` after changing the card or the design tokens. The PNG is
 * committed, so a normal build never needs Chrome.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

const CHROME_CANDIDATES = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
]

const chrome = process.env.CHROME_PATH || CHROME_CANDIDATES.find((p) => existsSync(p))
if (!chrome) {
  console.error(
    'No Chrome/Chromium found. Set CHROME_PATH=/path/to/chrome and re-run `make og`.',
  )
  process.exit(1)
}

const root = resolve(import.meta.dirname, '..')
const card = join(root, 'scripts/og-card.html')
const outFile = join(root, 'public/og.png')

execFileSync(
  chrome,
  [
    '--headless=old',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--window-size=1200,630',
    `--user-data-dir=${mkdtempSync(join(tmpdir(), 'og-chrome-'))}`,
    // Fonts come from Google Fonts, so give the page a moment to load them.
    '--virtual-time-budget=6000',
    `--screenshot=${outFile}`,
    `file://${card}`,
  ],
  { stdio: 'inherit' },
)

console.log(`share card written → public/og.png`)
