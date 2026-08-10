<script setup lang="ts">
import type { Accent } from '~/data/portfolio'

defineProps<{ message: string }>()

const dots: Accent[] = ['amber', 'coral', 'blue', 'green']
</script>

<template>
  <!-- Removed by the motion script once the page settles. -->
  <div id="loader" class="loader">
    <div class="loader__dots">
      <span
        v-for="(accent, i) in dots"
        :key="accent"
        class="loader__dot"
        :data-accent="accent"
        :style="{ animationDelay: `${i * 0.15}s` }"
      />
    </div>
    <p class="loader__label">{{ message }}</p>
  </div>
</template>
