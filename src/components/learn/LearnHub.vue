<template>
  <div class="learn-hub px-4 md:px-8 py-8 max-w-6xl mx-auto">
    <!-- Header -->
    <div class="mb-10">
      <a href="/" class="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-6">
        ← Back to Portfolio
      </a>
      <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        🧠 Interactive Learning Lab
      </h1>
      <p class="text-gray-500 dark:text-gray-400 text-base md:text-lg max-w-2xl">
        Master frontend concepts through interactive code playgrounds, visual demos, and memorable analogies.
        Click any topic to dive in.
      </p>
    </div>

    <!-- Filter -->
    <div class="mb-8">
      <div class="flex flex-wrap gap-2">
        <button
          v-for="tag in allTags"
          :key="tag"
          @click="toggleTag(tag)"
          class="px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 border"
          :class="activeTag === tag
            ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-transparent'
            : 'border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-white/30'"
        >
          {{ tag }}
        </button>
      </div>
    </div>

    <!-- Topic Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <a
        v-for="topic in filteredTopics"
        :key="topic.slug"
        :href="topic.slug"
        class="group relative rounded-2xl overflow-hidden border border-gray-200 dark:border-white/5 transition-all duration-300 hover:border-transparent hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/30 hover:-translate-y-1"
      >
        <!-- Gradient Background -->
        <div
          class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          :style="{ background: topic.gradient }"
        ></div>

        <div class="relative p-6 bg-white/80 dark:bg-gray-900/60 group-hover:bg-white/40 dark:group-hover:bg-gray-900/30 backdrop-blur-sm transition-all duration-300">
          <!-- Icon -->
          <div class="text-4xl mb-4">{{ topic.icon }}</div>

          <!-- Status Badge -->
          <div class="flex items-center gap-2 mb-3">
            <span
              class="inline-block w-2 h-2 rounded-full"
              :class="topic.ready ? 'bg-emerald-500' : 'bg-gray-400'"
            ></span>
            <span class="text-xs font-medium" :class="topic.ready ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'">
              {{ topic.ready ? 'Available' : 'Coming Soon' }}
            </span>
          </div>

          <!-- Title -->
          <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-white dark:group-hover:text-white transition-colors">
            {{ topic.title }}
          </h2>

          <!-- Description -->
          <p class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-white/80 dark:group-hover:text-white/80 transition-colors leading-relaxed mb-4">
            {{ topic.description }}
          </p>

          <!-- Tags -->
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="tag in topic.tags"
              :key="tag"
              class="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 group-hover:bg-white/20 group-hover:text-white/90 transition-colors"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Arrow -->
          <div class="absolute top-6 right-6 text-gray-300 dark:text-gray-600 group-hover:text-white transition-all duration-300 group-hover:translate-x-1">
            →
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const topics = [
  {
    title: 'JavaScript Core + Advanced',
    slug: '/learn/js',
    icon: '⚡',
    description: 'Closures, event loop, prototypes, async patterns, array methods — with runnable code for every concept.',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)',
    tags: ['Fundamentals', 'Async', 'DOM', 'ES6+'],
    ready: true,
  },
  {
    title: 'Performance Optimization',
    slug: '/learn/performance-optimization',
    icon: '🚀',
    description: 'Critical rendering path, lazy loading, memoization, virtual DOM — with live timing comparisons.',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
    tags: ['Rendering', 'Caching', 'Bundling'],
    ready: true,
  },
  {
    title: 'CSS Mastery',
    slug: '/learn/css',
    icon: '🎨',
    description: 'Flexbox, Grid, specificity, stacking contexts, BEM — interactive layout builders.',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)',
    tags: ['Layout', 'Responsive', 'Architecture'],
    ready: true,
  },
  {
    title: 'Framework Concepts',
    slug: '/learn/frameworks',
    icon: '🔮',
    description: 'Lifecycle hooks, state management, reactivity, computed vs watch, re-render triggers.',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)',
    tags: ['Vue', 'React', 'State', 'Lifecycle'],
    ready: true,
  },
  {
    title: 'Architecture & Scaling',
    slug: '/learn/architecture',
    icon: '🏗️',
    description: 'Component design, API patterns, error boundaries, large form handling, accessibility.',
    gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)',
    tags: ['Design Patterns', 'Scalability', 'A11y'],
    ready: true,
  },
  {
    title: 'Ad-Tech & Browser',
    slug: '/learn/ad-tech',
    icon: '📡',
    description: 'Iframes, CORS, third-party scripts, async/defer, ad performance impact.',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%)',
    tags: ['iframes', 'CORS', 'Script Loading'],
    ready: true,
  },
  {
    title: 'Logical Challenges',
    slug: '/learn/logical',
    icon: '🧩',
    description: 'String reversal, deep clone, debounce/throttle implementation, custom sorting.',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #0e7490 100%)',
    tags: ['Algorithms', 'Polyfills', 'Problem Solving'],
    ready: true,
  },
  {
    title: 'Cross-Browser & HTML5',
    slug: '/learn/cross-browser',
    icon: '🌍',
    description: 'Semantic HTML, browser quirks, responsive design from scratch, Web APIs, progressive enhancement — no frameworks.',
    gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%)',
    tags: ['HTML5', 'Cross-Browser', 'Responsive', 'Web APIs'],
    ready: true,
  },
  {
    title: 'Build Tools & Testing',
    slug: '/learn/tools-testing',
    icon: '🛠️',
    description: 'Webpack vs Vite, tree shaking, testing pyramid, CI/CD, ESLint, TypeScript, and performance budgets.',
    gradient: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 50%, #0f766e 100%)',
    tags: ['Build Tools', 'Testing', 'CI/CD'],
    ready: true,
  },
  {
    title: 'LAMP Stack & Backend',
    slug: '/learn/lamp',
    icon: '🐧',
    description: 'Linux basics, Apache config (.htaccess), MySQL optimization, and PHP integration for frontend devs.',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)',
    tags: ['Linux', 'Apache', 'MySQL', 'PHP'],
    ready: true,
  },
]

const allTags = ['All', 'Fundamentals', 'Async', 'Rendering', 'Layout', 'Vue', 'Algorithms', 'HTML5', 'Cross-Browser', 'Testing', 'Build Tools']
const activeTag = ref('All')

function toggleTag(tag) {
  activeTag.value = activeTag.value === tag ? 'All' : tag
}

const filteredTopics = computed(() => {
  if (activeTag.value === 'All') return topics
  return topics.filter(t => t.tags.some(tag =>
    tag.toLowerCase().includes(activeTag.value.toLowerCase())
  ))
})
</script>
