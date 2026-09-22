<script setup>
const company = {
  name: 'PMaps',
  summary: 'AI-powered assessment SaaS platform, Mumbai',
  bg: 'bg-blue-50 dark:bg-blue-900/20',
  roles: [
    {
      position: 'Software Engineer',
      period: 'Jul 2024 – Present',
      points: [
        'Architected the Candidate Assessment Platform frontend from the ground up in Quasar (Vue), leading a team of 3 interns (2 developers, 1 designer). It has delivered 25,000+ assessments, with roughly two-thirds of traffic on mobile.',
        'Managed application state with Pinia and Vuex, and used IndexedDB, localStorage, and sessionStorage to persist assessment paper data in the browser.',
        'Built Test Creator, a self-serve module that lets clients create and configure their own assessments.',
        "Owned the company's Webflow business website, lifting engagement by 25%.",
        'Developed analytics dashboard features in React alongside the core Vue.js codebase.',
      ],
    },
    {
      position: 'Junior UX/UI Developer',
      period: 'Jul 2023 – Jul 2024',
      points: [
        'Built client-facing Vue.js modules end to end: Onboarding Journey, Test Library, and Test Report.',
        'Developed the self-serve signup and subscription flow that drives recurring revenue, with plan-based feature access per tier.',
        'Made recruiters roughly 30% faster at core tasks through UI improvements.',
      ],
    },
    {
      position: 'Web Developer Intern',
      period: 'Dec 2022 – Jul 2023',
      points: [
        'Built REST APIs for test duration and cooling-period rules, automating assessment access control.',
      ],
    },
  ],
}

const independent = {
  company: 'ShellScholars',
  position: 'Software Engineer',
  period: 'Ongoing',
  description:
    'A portfolio registry platform focused on professional proof-of-work and digital identity. I am the sole product, design, and engineering owner - built on Nuxt and Supabase.',
  bg: 'bg-emerald-50 dark:bg-emerald-900/20',
  link: {
    label: 'shellscholars.com ↗',
    href: 'https://shellscholars.com',
  },
}
</script>

<template>
  <section id="where-im-working" class="py-20">
    <div class="max-w-7xl mx-auto">
      <!-- Section Header -->
      <div class="mb-12 md:mb-16">
        <h2 class="text-3xl md:text-4xl font-bold">Where I'm Working.</h2>
      </div>

      <div class="grid grid-cols-1 gap-6">
        <!-- PMaps: one company, three roles -->
        <div
          :class="company.bg"
          class="border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-8 md:p-10"
        >
          <h3 class="text-xl md:text-2xl font-bold mb-1">
            {{ company.name }}
          </h3>
          <p class="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-8">
            {{ company.summary }}
          </p>

          <div class="space-y-8">
            <div v-for="role in company.roles" :key="role.position">
              <h4 class="text-lg md:text-xl font-bold mb-4">
                {{ role.position }} | {{ role.period }}
              </h4>
              <ul class="space-y-3">
                <li
                  v-for="point in role.points"
                  :key="point"
                  class="flex gap-3 text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300"
                >
                  <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400 dark:bg-gray-500"></span>
                  <span>{{ point }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Independent work -->
        <div
          :class="independent.bg"
          class="border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-8 md:p-10"
        >
          <h3 class="text-xl md:text-2xl font-bold mb-4">
            {{ independent.company }} - {{ independent.position }} | {{ independent.period }}
          </h3>

          <p class="text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            {{ independent.description }}
          </p>

          <a
            v-if="independent.link"
            :href="independent.link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="text-accent hover:text-accent-dark font-medium inline-flex items-center gap-1 mt-4"
          >
            {{ independent.link.label }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
