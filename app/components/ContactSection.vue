<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  text: string
  email: string
  phone: string
  phoneHref: string
  location: string
  formNote: string
}>()
</script>

<template>
  <section id="contact" class="section" data-section="Contact">
    <div
      class="blob"
      style="left: 6%; top: 22%; width: 150px; height: 150px; border: 3px dashed var(--c-blue); border-radius: 50%; opacity: 0.45; animation: spin 32s linear infinite"
    />
    <div
      class="blob"
      style="right: 10%; bottom: 18%; width: 70px; height: 70px; background: var(--c-green); border-radius: 18px; transform: rotate(-14deg); opacity: 0.5; animation: bob 6s ease-in-out infinite"
    />

    <div class="shell contact__grid">
      <div data-accent="coral">
        <p class="eyebrow">{{ eyebrow }}</p>
        <h2 class="contact__title">{{ title }}</h2>
        <p class="contact__text">{{ text }}</p>
        <div class="contact__lines">
          <a :href="`mailto:${email}`">{{ email }}</a>
          <a :href="`tel:${phoneHref}`">{{ phone }}</a>
          <span class="contact__place">{{ location }}</span>
        </div>
      </div>

      <!-- No backend: the inline script composes a mailto: from these fields. -->
      <form id="contact-form" class="form" :data-mailto="email">
        <label class="field" data-accent="amber">
          <span class="field__label">Your name</span>
          <input name="name" type="text" required placeholder="Ada Lovelace" class="field__input" />
        </label>
        <label class="field" data-accent="blue">
          <span class="field__label">Reply-to email</span>
          <input
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            class="field__input"
          />
        </label>
        <label class="field" data-accent="green">
          <span class="field__label">What's up?</span>
          <textarea
            name="message"
            rows="5"
            required
            placeholder="We have a queue that's three hours behind…"
            class="field__input"
          />
        </label>
        <button type="submit" class="btn btn--solid" style="justify-content: center">Send it</button>
        <span class="form__note">{{ formNote }}</span>
      </form>
    </div>
  </section>
</template>
