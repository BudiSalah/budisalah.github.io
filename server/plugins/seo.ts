import { profile, years } from '../../app/data/portfolio'

const SITE = 'https://budisalah.github.io'

/**
 * JSON-LD for the person behind the page. It has to be injected at render time
 * because `features.noScripts: 'all'` removes anything added via `useHead`.
 */
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  alternateName: profile.nickname,
  jobTitle: profile.role,
  description: `Software Engineer with ${years} years of experience in Golang, event-driven microservices, CQRS and change-data-capture pipelines.`,
  email: `mailto:${profile.email}`,
  telephone: profile.phoneHref,
  url: `${SITE}/`,
  image: `${SITE}/og.png`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Cairo',
    addressCountry: 'EG',
  },
  worksFor: { '@type': 'Organization', name: 'Awaed' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Alexandria University' },
  knowsLanguage: ['ar', 'en'],
  knowsAbout: [
    'Golang',
    'Event Sourcing',
    'CQRS',
    'gRPC',
    'Apache Kafka',
    'Apache Pulsar',
    'Microservices',
    'Kubernetes',
    'OpenTelemetry',
  ],
  sameAs: [
    'https://www.linkedin.com/in/budisalah',
    'https://www.github.com/BudiSalah',
    'https://www.behance.net/budisalah',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: `${SITE}/`,
  name: `${profile.name} — ${profile.role}`,
  inLanguage: 'en',
  author: { '@type': 'Person', name: profile.name },
}

const json = JSON.stringify([personSchema, websiteSchema]).replace(/</g, '\\u003c')

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('render:html', (html) => {
    html.head.push(`<script type="application/ld+json">${json}</script>`)
  })
})
