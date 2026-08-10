/**
 * Single source of truth for every piece of copy on the page.
 * Add/remove entries here — the components render whatever they are given.
 */

export type Accent = 'amber' | 'coral' | 'blue' | 'green' | 'purple' | 'pink'

/** First day on the job. Everything year-related counts from here. */
export const CAREER_START = new Date('2016-02-01T00:00:00Z')

/** Years of experience, rounded to the nearest year. Evaluated at build time. */
export function yearsOfExperience(now: Date = new Date()): number {
  const years = (now.getTime() - CAREER_START.getTime()) / (365.2425 * 24 * 60 * 60 * 1000)
  return Math.max(1, Math.round(years))
}

export const years = yearsOfExperience()

export interface Profile {
  name: string
  nickname: string
  role: string
  location: string
  email: string
  phone: string
  phoneHref: string
  cvUrl: string
  availability: string
  availabilityNote: string
}

export interface Stat {
  value: string
  accent: Accent
  text: string
}

export interface Job {
  period: string
  location?: string
  title: string
  company: string
  accent: Accent
  bullets: string[]
}

export interface Project {
  title: string
  role: string
  period: string
  company: string
  accent: Accent
  summary: string
  /** Rendered as HTML so a single word can carry the accent colour. */
  outcome: string
}

export interface Skill {
  label: string
  accent: Accent | 'cream'
}

export interface Language {
  label: string
  level: string
  score: number
  max: number
}

export interface Interest {
  label: string
  accent: Accent
  shape: 'square' | 'circle' | 'tilted'
}

export interface SocialLink {
  label: string
  href: string
  hoverAccent: Accent | 'ink'
}

export const profile: Profile = {
  name: 'Abdelrahman Salah',
  nickname: 'Budi',
  role: 'Software Engineer',
  location: 'Cairo, Egypt',
  email: 'a.salah.career@gmail.com',
  phone: '+20 100 153 3688',
  phoneHref: '+201001533688',
  cvUrl: '/Abdelrahman-Salah-CV.pdf',
  availability: 'Open to senior backend & platform roles',
  availabilityNote: 'Cairo, Egypt — remote friendly',
}

export const hero = {
  eyebrow: 'Abdelrahman Salah — Budi',
  /** `<b>` picks up the accent colour set by its own data-accent. */
  headlineHtml:
    'Software Engineer.<br>' +
    `<b data-accent="amber">${years} years.</b><br>` +
    'Golang, events, and <b data-accent="blue">very few bottlenecks.</b>',
  intro:
    "I build the quiet machinery — microservices, event streams, change-data-capture — that makes other people's products feel fast. Occasionally I sneak back to the front-end for fun.",
  primaryCta: { label: 'Download the CV', hint: 'PDF' },
  secondaryCta: { label: 'Say hello', href: '#contact' },
  quickLinks: ['a.salah.career@gmail.com', '+20 100 153 3688', 'linkedin.com/in/budisalah'],
}

export const stats: Stat[] = [
  {
    value: '97%',
    accent: 'amber',
    text: 'faster data processing after I built a CDC service in Golang + gRPC — 180 minutes down to 5.',
  },
  {
    value: '60%',
    accent: 'coral',
    text: 'quicker load times leading an Andalusia refactor onto Nuxt, inside three months.',
  },
  {
    value: '50%',
    accent: 'blue',
    text: 'less retrieval time with Redis caching and MongoDB projections off the event store.',
  },
  {
    value: `${years}+`,
    accent: 'green',
    text: 'years shipping, from WordPress themes in Alexandria to event-sourced systems in Cairo.',
  },
]

export const about = {
  eyebrow: 'Receipts, not adjectives',
  title: "Hi — I'm the person your latency graph is afraid of.",
  paragraphs: [
    `${years} years ago I was converting PSDs into WordPress themes. Today I write Golang services that move financial data between SQL Server, Apache Pulsar, Kafka and MongoDB without anyone noticing they moved at all — which, honestly, is the whole point.`,
    "The front-end years weren't wasted either. Having shipped design systems, SSR apps and admin dashboards means I know exactly who is on the other end of my API, and roughly how annoyed they'll be if it's slow.",
    'Event sourcing, CQRS, DDD, OpenTelemetry, a healthy fear of untraced systems. Docker, Kubernetes, GitHub Actions. And lately, wiring AI tooling through Model Context Protocol because the future looked like it needed a hand.',
  ],
  current: {
    label: 'Currently',
    title: 'Software Engineer @ Awaed',
    meta: '01/2023 — present · Cairo',
    tags: [
      { label: 'Golang', accent: 'amber' as Accent },
      { label: 'gRPC', accent: 'coral' as Accent },
      { label: 'Pulsar', accent: 'blue' as Accent },
      { label: 'Kafka', accent: 'green' as Accent },
      { label: 'Event Store', accent: 'purple' as Accent },
    ],
    note: 'Investment-fund platform: CDC pipelines, SSO, orchestration, and the dashboards that read from them.',
  },
}

export const stack: string[] = [
  'Golang',
  'NestJS',
  'gRPC',
  'CQRS',
  'Event Sourcing',
  'Pulsar',
  'Kafka',
  'MongoDB',
  'Redis',
  'SQL Server',
  'OpenTelemetry',
  'Grafana',
  'Kubernetes',
  'Nuxt',
  'TypeScript',
  'Laravel',
]

export const experience: Job[] = [
  {
    period: '01/2023 — present',
    location: 'Cairo, Egypt',
    title: 'Software Engineer',
    company: 'Awaed',
    accent: 'amber',
    bullets: [
      'Engineered a Change Data Capture service with Golang and gRPC — response time down 97% in six months.',
      'Built Golang microservices on Apache Pulsar, Kafka and CQRS, with OpenTelemetry and Grafana for observability.',
      'Implemented event sourcing in Golang, cutting data-retrieval time by more than 90%.',
      'Applied Redis caching and MongoDB projections from the event store — 50% faster retrieval.',
      'Shipped a scalable NestJS API in three months, +20% overall application performance.',
    ],
  },
  {
    period: '',
    location: 'Cairo, Egypt',
    title: 'Senior Front-End Engineer',
    company: 'Awaed',
    accent: 'blue',
    bullets: [
      'Constructed scalable web applications with Nuxt, TypeScript and PHP Laravel.',
      'Built an admin dashboard on shared components via Git Submodules — 30% less duplication.',
      'Ran thorough code reviews; delivery speed up 25% in four months.',
    ],
  },
  {
    period: '12/2020 — 12/2022',
    location: 'Cairo, Egypt',
    title: 'Senior Front-End Developer',
    company: 'Andalusia Group for Medical Services',
    accent: 'green',
    bullets: [
      'Led a team refactoring web applications onto Nuxt — load times 60% better in three months.',
      'Enforced SEO best practices in HTML, lifting organic traffic 22%.',
      'Expanded responsive apps with Tailwind CSS, halving duplicated code.',
      'Grew a Vue.js and Node.js application, +75% user engagement.',
    ],
  },
  {
    period: '07/2018 — 11/2020',
    location: 'Alexandria, Egypt · On-site',
    title: 'Front-End Developer',
    company: 'Scripty Team',
    accent: 'pink',
    bullets: [
      'Developed custom WordPress themes with HTML, CSS and Bootstrap — over $20,000 in revenue.',
      'Designed dynamic React and Angular applications, sharpening both the experience and how much of it people actually used.',
      'Lifted user retention 30% in twelve months, mostly by making the interface explain itself.',
    ],
  },
  {
    period: '07/2016 — 06/2018',
    location: 'Remote',
    title: 'Front-End Developer, Freelance',
    company: 'Upwork',
    accent: 'purple',
    bullets: [
      'Redesigned client applications mobile-first — responsiveness stopped being an afterthought and satisfaction followed.',
      'Built responsive pages from PSD designs with Bootstrap, tightening the hand-off between design and delivery.',
      'Worked directly with cross-functional teams across two years of contracts, which is where shipping on someone else’s deadline became normal.',
    ],
  },
  {
    period: '02/2016 — 06/2016',
    location: 'Alexandria, Egypt · On-site',
    title: 'Intern, then Junior Front-End Developer',
    company: 'i2i Vision → Excerpt For Web Development',
    accent: 'coral',
    bullets: [
      'Where it started: converting PSD and Sketch files into static pages by hand, in plain HTML and CSS, then making them responsive with Bootstrap.',
      'Paired with senior developers to extend web applications in JavaScript and jQuery.',
      'Debugged proactively and sat in on code reviews — error rates down 5% in two months.',
      'Turned static pages into custom WordPress themes, in a startup where the next task was always slightly beyond what I knew.',
    ],
  },
]

export const projects: Project[] = [
  {
    title: 'Zagtrader Integration',
    role: 'Software Engineer',
    period: '09/2023 — present',
    company: 'Awaed',
    accent: 'amber',
    summary:
      'Two core services keeping SQL Server and Apache Pulsar in sync through Change Data Capture, with Insight Workers appending updates to MongoDB for full traceability.',
    outcome: 'Latency: 180 min → 5 min. <em>97% faster.</em>',
  },
  {
    title: 'SSO Services',
    role: 'Software Engineer',
    period: '01/2023 — present',
    company: 'Awaed',
    accent: 'blue',
    summary:
      'Centralised authentication on PHP Laravel and Apache Kafka: real-time session management, cross-application single sign-on, token auth and role-based access.',
    outcome: 'Auth errors down <em>60%+</em> across services.',
  },
  {
    title: 'CMA Service',
    role: 'Software Engineer',
    period: '09/2025 — 11/2025',
    company: 'Awaed',
    accent: 'green',
    summary:
      'High-performance Golang backend on the AWS S3 SDK for secure storage and retrieval — REST APIs, Jaeger and Grafana monitoring, concurrency tuned for heavy workloads.',
    outcome: 'Higher throughput, <em>lower storage latency.</em>',
  },
  {
    title: 'Orchestrator Service',
    role: 'Software Engineer',
    period: '06/2023 — 08/2023',
    company: 'Awaed',
    accent: 'purple',
    summary:
      'Scalable Node.js and NestJS service with MongoDB and MySQL persistence, plus Redis and Bullboard for queue monitoring and performance tuning.',
    outcome: 'Steadier reliability, <em>smoother deploys.</em>',
  },
  {
    title: 'Admin Portal & IPO Dashboards',
    role: 'Senior Frontend Engineer',
    period: '01/2023 — 04/2023',
    company: 'Awaed',
    accent: 'coral',
    summary:
      'Admin and analytics dashboards across Vue, Nuxt, React and Next with Laravel behind them — responsive components, tuned API calls, real-time IPO visualisation.',
    outcome: 'Dashboards load <em>40% faster.</em>',
  },
]

export const skills: Skill[] = [
  { label: 'Golang', accent: 'amber' },
  { label: 'NestJS', accent: 'cream' },
  { label: 'TypeScript', accent: 'coral' },
  { label: 'Laravel', accent: 'blue' },
  { label: 'Microservices', accent: 'green' },
  { label: 'Event Sourcing', accent: 'cream' },
  { label: 'gRPC', accent: 'purple' },
  { label: 'CQRS', accent: 'amber' },
  { label: 'SQL Server', accent: 'cream' },
  { label: 'MySQL', accent: 'coral' },
  { label: 'MongoDB', accent: 'green' },
  { label: 'Redis', accent: 'blue' },
  { label: 'OpenTelemetry', accent: 'cream' },
  { label: 'Grafana', accent: 'amber' },
  { label: 'Pulsar', accent: 'purple' },
  { label: 'Kafka', accent: 'coral' },
  { label: 'CI/CD', accent: 'cream' },
  { label: 'GitHub Actions', accent: 'green' },
  { label: 'Jenkins', accent: 'blue' },
  { label: 'Vue.js', accent: 'amber' },
  { label: 'Nuxt', accent: 'cream' },
  { label: 'Docker', accent: 'purple' },
  { label: 'Kubernetes', accent: 'coral' },
  { label: 'MCP / AI tooling', accent: 'green' },
]

export const languages: Language[] = [
  { label: 'Arabic', level: 'Native', score: 5, max: 5 },
  { label: 'English', level: 'Advanced', score: 4, max: 5 },
]

export const interests: Interest[] = [
  { label: 'Technology', accent: 'amber', shape: 'tilted' },
  { label: 'Filmmaking', accent: 'coral', shape: 'circle' },
  { label: 'Football', accent: 'green', shape: 'square' },
]

export const education = {
  degree: "Bachelor's in Business Administration & Management",
  school: 'Alexandria University · 2009 — 2015',
}

export const contact = {
  eyebrow: 'Say hello',
  title: 'Got a system that needs to go faster?',
  text:
    'Backend roles, platform work, or a stubborn pipeline that refuses to behave — I read everything.',
  formNote: 'Opens your mail client — no forms harvested here.',
}

export const socials: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/budisalah', hoverAccent: 'blue' },
  { label: 'GitHub', href: 'https://www.github.com/BudiSalah', hoverAccent: 'ink' },
  { label: 'Behance', href: 'https://www.behance.net/budisalah', hoverAccent: 'purple' },
  { label: 'Email', href: 'mailto:a.salah.career@gmail.com', hoverAccent: 'coral' },
]

export const loader = {
  message: 'warming up the goroutines',
}

export const easterEgg = {
  keyword: 'golang',
  word: 'go',
  line: 'goroutines released. the lattice is now unsupervised.',
  hint: '(click anywhere to contain them)',
}
