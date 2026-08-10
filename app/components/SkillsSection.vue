<script setup lang="ts">
import type { Interest, Language, Skill } from '~/data/portfolio'

defineProps<{
  eyebrow: string
  title: string
  skills: Skill[]
  languages: Language[]
  interests: Interest[]
  education: { degree: string; school: string }
}>()

// Deterministic wobble so the pills look hand-placed but never re-shuffle.
const TILTS = [-3, 2, -1.5, 3, -2, 1, -3, 2.5, -1, 3, -2.5, 1.5]
const tilt = (i: number) => `${TILTS[i % TILTS.length]}deg`
</script>

<template>
  <section class="section section--dark skills" data-section="Skills">
    <div class="shell">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h2 class="section-title">{{ title }}</h2>

      <div class="skills__pills">
        <span
          v-for="(skill, i) in skills"
          :key="skill.label"
          class="pill"
          :data-accent="skill.accent"
          :style="{ '--tilt': tilt(i) }"
          >{{ skill.label }}</span
        >
      </div>

      <div class="skills__extras">
        <div data-accent="coral">
          <p class="eyebrow">Languages</p>
          <div v-for="lang in languages" :key="lang.label" class="language">
            <div>
              <div class="language__label">{{ lang.label }}</div>
              <div class="language__level">{{ lang.level }}</div>
            </div>
            <div class="language__score" :aria-label="`${lang.score} of ${lang.max}`">
              <span
                v-for="pip in lang.max"
                :key="pip"
                class="language__pip"
                :class="pip <= lang.score && 'language__pip--on'"
              />
            </div>
          </div>
        </div>

        <div data-accent="blue">
          <p class="eyebrow">Off the clock</p>
          <div class="interests">
            <div
              v-for="interest in interests"
              :key="interest.label"
              class="interest"
              :data-accent="interest.accent"
            >
              <span class="interest__mark" :class="`interest__mark--${interest.shape}`" />
              <span class="interest__label">{{ interest.label }}</span>
            </div>
          </div>
        </div>

        <div data-accent="green">
          <p class="eyebrow">Education</p>
          <div class="education__degree">{{ education.degree }}</div>
          <div class="education__school">{{ education.school }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
