<script setup lang="ts">
import {
  about,
  contact,
  easterEgg,
  education,
  experience,
  hero,
  interests,
  languages,
  loader,
  profile,
  projects,
  skills,
  socials,
  stack,
  stats,
} from '~/data/portfolio'
</script>

<template>
  <div class="page">
    <LoaderOverlay :message="loader.message" />

    <AvailabilityBar :status="profile.availability" :note="profile.availabilityNote" />

    <HeroSection
      :eyebrow="hero.eyebrow"
      :headline-html="hero.headlineHtml"
      :intro="hero.intro"
      :cv-url="profile.cvUrl"
      :primary-cta="hero.primaryCta"
      :secondary-cta="hero.secondaryCta"
      :quick-links="hero.quickLinks"
    />

    <StatsSection :eyebrow="about.eyebrow" :items="stats" />

    <AboutSection :title="about.title" :paragraphs="about.paragraphs" :current="about.current" />

    <StackMarquee :items="stack" />

    <ExperienceSection eyebrow="Where I've been" title="Experience, in order" :jobs="experience" />

    <ProjectsSection
      eyebrow="Selected work"
      title="Five things I'm proud of"
      :items="projects"
    />

    <SkillsSection
      eyebrow="The toolbox"
      title="Stickers I've earned"
      :skills="skills"
      :languages="languages"
      :interests="interests"
      :education="education"
    />

    <ContactSection
      :eyebrow="contact.eyebrow"
      :title="contact.title"
      :text="contact.text"
      :email="profile.email"
      :phone="profile.phone"
      :phone-href="profile.phoneHref"
      :location="profile.location"
      :form-note="contact.formNote"
    />

    <SiteFooter
      :name="profile.name"
      :meta="`${profile.role} · ${profile.location}`"
      :links="socials"
    />

    <EasterEgg
      :word="easterEgg.word"
      :line="easterEgg.line"
      :hint="easterEgg.hint"
      :keyword="easterEgg.keyword"
    />

    <div id="confetti" class="confetti" aria-hidden="true" />
  </div>
</template>
