<script setup lang="ts">
import type { Job } from '~/data/portfolio'

defineProps<{ eyebrow: string; title: string; jobs: Job[] }>()

const SPINE = 'M20 0 C 4 160, 36 320, 20 500 C 6 680, 34 840, 20 1000'
</script>

<template>
  <section class="section experience" data-section="Experience">
    <div class="shell">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h2 class="section-title">{{ title }}</h2>

      <div id="timeline" class="timeline">
        <svg
          class="timeline__spine"
          viewBox="0 0 40 1000"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path :d="SPINE" fill="none" stroke="var(--c-line)" stroke-width="5" />
          <!-- Drawn in on scroll by the motion script. -->
          <path
            id="timeline-progress"
            :d="SPINE"
            fill="none"
            stroke="var(--c-coral)"
            stroke-width="5"
            stroke-linecap="round"
          />
        </svg>

        <article
          v-for="(job, i) in jobs"
          :key="job.title + job.company"
          class="timeline__entry"
          :data-reveal="i + 1"
          :data-accent="job.accent"
        >
          <span class="timeline__dot" />
          <p class="meta">{{ [job.period, job.location].filter(Boolean).join(' · ') }}</p>
          <h3 class="timeline__role">{{ job.title }}</h3>
          <div class="timeline__company">{{ job.company }}</div>
          <ul class="timeline__bullets">
            <li v-for="bullet in job.bullets" :key="bullet">{{ bullet }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
