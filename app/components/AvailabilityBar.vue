<script setup lang="ts">
defineProps<{ status: string; note?: string }>()
</script>

<template>
  <div class="availability">
    <span class="availability__item">
      <span class="availability__dot" />
      {{ status }}
    </span>
    <span v-if="note" class="availability__note">{{ note }}</span>
  </div>
</template>
