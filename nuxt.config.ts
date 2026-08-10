// https://nuxt.com/docs/api/configuration/nuxt-config
import { years } from './app/data/portfolio'

export const SITE = 'https://budisalah.github.io'
const TITLE = 'Abdelrahman Salah — Software Engineer'
const DESCRIPTION =
  `Abdelrahman Salah (Budi) — Software Engineer, ${years} years. Golang, event-driven ` +
  'microservices, CQRS, change-data-capture pipelines, and very few bottlenecks. Cairo, Egypt.'
const SHORT_DESCRIPTION = `Golang, events, and very few bottlenecks. ${years} years of shipping.`
const OG_ALT = `${TITLE} — Golang, events, and very few bottlenecks.`
const FAVICON = encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">' +
    '<rect width="32" height="32" rx="8" fill="#17140F"/>' +
    '<text x="16" y="23" font-family="Verdana,sans-serif" font-size="18" font-weight="bold" ' +
    'text-anchor="middle" fill="#F5B21A">B</text></svg>',
)

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',

  // Prerendered, zero-hydration output: the page is plain HTML + one inline
  // script. Keeps the final artifact a single self-contained file.
  ssr: true,
  features: {
    inlineStyles: true,
    // No Vue runtime, no hydration. The page's only script is inlined by
    // server/plugins/inline-motion.ts.
    noScripts: 'all',
  },

  css: ['~/assets/css/main.css'],

  nitro: {
    preset: 'static',
    prerender: {
      routes: ['/'],
      failOnError: true,
    },
  },

  app: {
    baseURL: '/',
    head: {
      htmlAttrs: { lang: 'en' },
      title: TITLE,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: DESCRIPTION },
        { name: 'author', content: 'Abdelrahman Salah' },
        { name: 'theme-color', content: '#FDFBF4' },
        // Let search engines show the large share image.
        { name: 'robots', content: 'index, follow, max-image-preview:large' },

        { property: 'og:site_name', content: 'Abdelrahman Salah' },
        { property: 'og:title', content: TITLE },
        { property: 'og:type', content: 'profile' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:url', content: `${SITE}/` },
        { property: 'og:description', content: SHORT_DESCRIPTION },
        { property: 'og:image', content: `${SITE}/og.png` },
        { property: 'og:image:type', content: 'image/png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: OG_ALT },
        { property: 'profile:first_name', content: 'Abdelrahman' },
        { property: 'profile:last_name', content: 'Salah' },

        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: TITLE },
        { name: 'twitter:description', content: SHORT_DESCRIPTION },
        { name: 'twitter:image', content: `${SITE}/og.png` },
        { name: 'twitter:image:alt', content: OG_ALT },
      ],
      link: [
        { rel: 'canonical', href: `${SITE}/` },
        // Inline SVG favicon: an amber token square, no extra request.
        { rel: 'icon', href: `data:image/svg+xml,${FAVICON}` },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Nunito:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap',
        },
      ],
    },
  },

  vue: {
    // <lattice-hero> is a plain custom element defined by the inline script,
    // not a Vue component.
    compilerOptions: {
      isCustomElement: (tag: string) => tag === 'lattice-hero',
    },
  },

  experimental: {
    payloadExtraction: false,
  },

  devtools: { enabled: false },
})
