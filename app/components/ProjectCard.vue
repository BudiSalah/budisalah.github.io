<script setup lang="ts">
import type { Project } from '~/data/portfolio'

const props = defineProps<{ project: Project }>()
</script>

<template>
  <article class="project" data-tilt :data-accent="project.accent">
    <div class="project__top">
      <span class="project__chip" />
      <span class="project__when">{{ project.period }}<br />{{ project.company }}</span>
    </div>
    <h3 class="project__title">{{ project.title }}</h3>
    <div class="project__role">{{ project.role }}</div>
    <p class="project__summary">{{ project.summary }}</p>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="project__outcome" v-html="props.project.outcome" />
  </article>
</template>
