<script setup>
const roles = [
  {
    company: 'PMaps',
    position: 'UX Engineer',
    period: 'Jul 2023 – Present',
    description:
      'PMaps builds AI-driven psychometric and assessment tools for recruiters. I design and build user-focused web interfaces - combining frontend engineering with design thinking to improve clarity and decision-making across hiring workflows.',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    company: 'ShellScholars',
    position: 'Independent Product Builder',
    period: 'Ongoing',
    description:
      'A portfolio registry platform focused on professional proof-of-work and digital identity. I am the sole product, design, and engineering owner - built on Nuxt and Supabase.',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    link: {
      label: 'shellscholars.com ↗',
      href: 'https://shellscholars.com',
    },
  },
]
</script>

<template>
  <section class="py-20">
    <div class="max-w-7xl mx-auto">
      <!-- Section Header -->
      <div class="mb-12 md:mb-16">
        <h2 class="text-3xl md:text-4xl font-bold">Where I'm Working.</h2>
      </div>

      <!-- Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="role in roles"
          :key="role.company"
          :class="role.bg"
          class="border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-8 md:p-10"
        >
          <!-- Header -->
          <h3 class="text-xl md:text-2xl font-bold mb-4">
            {{ role.company }} - {{ role.position }} | {{ role.period }}
          </h3>

          <!-- Body -->
          <p class="text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            {{ role.description }}
          </p>

          <!-- Link -->
          <a
            v-if="role.link"
            :href="role.link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="text-accent hover:text-accent-dark font-medium inline-flex items-center gap-1 mt-4"
          >
            {{ role.link.label }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
