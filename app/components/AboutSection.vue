<script setup lang="ts">
import type { Accent } from '~/data/portfolio'

defineProps<{
  title: string
  paragraphs: string[]
  current: {
    label: string
    title: string
    meta: string
    tags: { label: string; accent: Accent }[]
    note: string
  }
}>()
</script>

<template>
  <section class="section" data-section="About">
    <div
      class="blob"
      style="right: 8%; top: 16%; width: 190px; height: 190px; background: var(--c-amber); border-radius: 50%; opacity: 0.28; animation: bob 7s ease-in-out infinite"
    />
    <div
      class="blob"
      style="right: 22%; top: 44%; width: 88px; height: 88px; border: 3px solid var(--c-blue); transform: rotate(24deg); opacity: 0.6"
    />

    <div class="shell about__grid">
      <div>
        <h2 data-reveal="1" class="about__title">{{ title }}</h2>
        <p v-for="(p, i) in paragraphs" :key="i" :data-reveal="i + 2" class="prose">{{ p }}</p>
      </div>

      <aside data-reveal="5" class="panel">
        <p class="current__label">{{ current.label }}</p>
        <div class="current__body">
          <div>
            <div class="current__title">{{ current.title }}</div>
            <div class="current__meta">{{ current.meta }}</div>
          </div>
          <div class="current__rule" />
          <div class="current__tags">
            <span
              v-for="tag in current.tags"
              :key="tag.label"
              class="tag"
              :data-accent="tag.accent"
              >{{ tag.label }}</span
            >
          </div>
          <p class="current__note">{{ current.note }}</p>
        </div>
      </aside>
    </div>
  </section>
</template>
