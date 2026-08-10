// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',

  // Prerendered, zero-hydration output: the page is plain HTML + one inline
  // script. Keeps the final artifact a single self-contained file.
  ssr: true,
  features: {
    inlineStyles: true,
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
      title: 'Abdelrahman Salah — Software Engineer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Abdelrahman Salah (Budi) — Software Engineer, 9 years. Golang, event-driven microservices, CDC pipelines, and very few bottlenecks.',
        },
        { name: 'theme-color', content: '#FDFBF4' },
        { property: 'og:title', content: 'Abdelrahman Salah — Software Engineer' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://budisalah.github.io/' },
        {
          property: 'og:description',
          content: 'Golang, events, and very few bottlenecks. 9 years of shipping.',
        },
      ],
      link: [
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
