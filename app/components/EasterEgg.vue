<script setup lang="ts">
defineProps<{ word: string; line: string; hint: string; keyword: string }>()
</script>

<template>
  <!-- Revealed by the inline script when the keyword is typed. -->
  <div id="egg" class="egg" hidden :data-keyword="keyword">
    <div class="egg__word">{{ word }}</div>
    <div class="egg__line">{{ line }}</div>
    <div class="egg__hint">{{ hint }}</div>
  </div>
</template>
