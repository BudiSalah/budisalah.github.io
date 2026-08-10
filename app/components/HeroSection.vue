<script setup lang="ts">
const props = defineProps<{
  eyebrow: string
  headlineHtml: string
  intro: string
  cvUrl: string
  primaryCta: { label: string; hint?: string }
  secondaryCta: { label: string; href: string }
  quickLinks: string[]
}>()
</script>

<template>
  <section class="hero" data-section="Hero">
    <!-- Three.js lattice mounts here; absent JS just leaves empty space. -->
    <div class="hero__canvas"><lattice-hero /></div>

    <div
      class="blob"
      style="right: 6%; top: 18%; width: 120px; height: 120px; border: 3px dashed var(--c-coral); border-radius: 50%; opacity: 0.5; animation: spin 26s linear infinite"
    />
    <div
      class="blob"
      style="left: 4%; bottom: 14%; width: 54px; height: 54px; background: var(--c-amber); border-radius: 14px; transform: rotate(18deg); animation: bob 5.5s ease-in-out infinite"
    />
    <div
      class="blob"
      style="left: 52%; top: 10%; width: 26px; height: 26px; background: var(--c-purple); border-radius: 50%; animation: bob 4s ease-in-out infinite"
    />

    <div class="hero__inner shell">
      <p data-reveal="1" class="hero__eyebrow">{{ eyebrow }}</p>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <h1 data-reveal="2" class="hero__title" v-html="props.headlineHtml" />
      <p data-reveal="3" class="hero__intro">{{ intro }}</p>

      <div data-reveal="4" class="hero__actions">
        <a :href="cvUrl" download class="btn btn--solid" data-confetti>
          {{ primaryCta.label }}
          <span v-if="primaryCta.hint" class="btn__hint">{{ primaryCta.hint }}</span>
        </a>
        <a :href="secondaryCta.href" class="btn btn--outline">{{ secondaryCta.label }}</a>
      </div>

      <div data-reveal="5" class="hero__links">
        <span v-for="link in quickLinks" :key="link">{{ link }}</span>
      </div>
    </div>
  </section>
</template>
