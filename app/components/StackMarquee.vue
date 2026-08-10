<script setup lang="ts">
defineProps<{ items: string[] }>()
</script>

<template>
  <section class="marquee" data-section="Stack" aria-label="Technology stack">
    <div class="marquee__track">
      <!-- Two identical rows: the -50% translate loops seamlessly. -->
      <div v-for="row in 2" :key="row" class="marquee__row" :aria-hidden="row === 2">
        <span v-for="item in items" :key="item">{{ item }}</span>
      </div>
    </div>
  </section>
</template>
