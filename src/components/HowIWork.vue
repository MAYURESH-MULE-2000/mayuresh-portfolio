<script setup>
import { Map, PenTool, Terminal, Users } from 'lucide-vue-next'

const cards = [
  {
    title: 'Discovery & Strategy',
    icon: Map,
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    tags: [
      'User Research',
      'Journey Mapping',
      'Problem Framing',
      'Roadmapping',
      'Hypothesis Testing',
      'KPI Mapping',
    ],
  },
  {
    title: 'Design & Prototyping',
    icon: PenTool,
    bg: 'bg-teal-50 dark:bg-teal-900/20',
    tags: [
      'Figma',
      'Wireframing (Lo–Hi)',
      'Design Systems',
      'Webflow',
      'Accessible Practices',
      'LottieFiles',
    ],
  },
  {
    title: 'Build & Ship',
    icon: Terminal,
    bg: 'bg-red-50 dark:bg-red-900/20',
    tags: [
      'Vue.js',
      'Quasar',
      'Nuxt',
      'REST APIs',
      'SQL',
      'Git',
      'Performance (Lighthouse)',
    ],
  },
  {
    title: 'Collaborate & Align',
    icon: Users,
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    tags: [
      'Stakeholder Management',
      'PRDs',
      'User Stories',
      'Jira',
      'Confluence',
      'Developer Handoff',
      'Sprint Planning',
    ],
  },
]
</script>

<template>
  <section class="py-20">
    <div class="max-w-7xl mx-auto">
      <!-- Section Header -->
      <div class="mb-4">
        <h2 class="text-3xl md:text-4xl font-bold text-primary-black dark:text-primary-white">
          This is how I work
        </h2>
      </div>

      <!-- Subtitle -->
      <p class="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-12 md:mb-16 max-w-4xl">
        I work across the full product loop - from messy problem to shipped feature.
      </p>

      <!-- 2×2 Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="card in cards"
          :key="card.title"
          class="border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-6 md:p-8 transition-all duration-300"
          :class="card.bg"
        >
          <!-- Icon + Title -->
          <div class="flex items-center gap-3 mb-5">
            <component
              :is="card.icon"
              :size="20"
              class="text-gray-700 dark:text-gray-300 shrink-0"
            />
            <h3 class="text-lg md:text-xl font-bold text-primary-black dark:text-primary-white">
              {{ card.title }}
            </h3>
          </div>

          <!-- Tag Pills -->
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in card.tags"
              :key="tag"
              class="bg-white/70 dark:bg-white/10 text-gray-700 dark:text-gray-300 text-xs px-3 py-1.5 rounded-full font-medium"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
