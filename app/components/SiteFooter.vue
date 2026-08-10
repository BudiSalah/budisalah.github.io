<script setup lang="ts">
import type { SocialLink } from '~/data/portfolio'

defineProps<{ name: string; meta: string; links: SocialLink[] }>()
</script>

<template>
  <footer class="footer">
    <div class="shell footer__inner">
      <div>
        <div class="footer__name">{{ name }}</div>
        <div class="footer__meta">{{ meta }}</div>
      </div>
      <nav class="footer__links">
        <a
          v-for="link in links"
          :key="link.label"
          class="social"
          :data-accent="link.hoverAccent"
          :href="link.href"
          :target="link.href.startsWith('http') ? '_blank' : undefined"
          :rel="link.href.startsWith('http') ? 'noopener' : undefined"
          >{{ link.label }}</a
        >
      </nav>
    </div>
  </footer>
</template>
