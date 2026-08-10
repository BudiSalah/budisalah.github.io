<script setup lang="ts">
import type { Project } from '~/data/portfolio'

defineProps<{
  eyebrow: string
  title: string
  items: Project[]
  cta?: { title: string; text: string; link: { label: string; href: string } }
}>()
</script>

<template>
  <section class="section projects" data-section="Projects">
    <div class="shell">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h2 class="section-title">{{ title }}</h2>

      <div class="projects__grid">
        <ProjectCard
          v-for="(project, i) in items"
          :key="project.title"
          :project="project"
          :data-reveal="i + 1"
        />

        <aside v-if="cta" class="project-cta" :data-reveal="items.length + 1">
          <h3 class="project-cta__title">{{ cta.title }}</h3>
          <p class="project-cta__text">{{ cta.text }}</p>
          <a :href="cta.link.href" class="project-cta__link">{{ cta.link.label }}</a>
        </aside>
      </div>
    </div>
  </section>
</template>
