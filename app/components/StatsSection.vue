<script setup lang="ts">
import type { Stat } from '~/data/portfolio'

defineProps<{ eyebrow: string; items: Stat[] }>()
</script>

<template>
  <section class="section section--dark stats" data-section="Numbers">
    <div class="shell">
      <p class="eyebrow">{{ eyebrow }}</p>
      <div class="stats__grid">
        <div
          v-for="(stat, i) in items"
          :key="stat.value"
          :data-reveal="i + 1"
          :data-accent="stat.accent"
        >
          <div class="stat__value">{{ stat.value }}</div>
          <p class="stat__text">{{ stat.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
