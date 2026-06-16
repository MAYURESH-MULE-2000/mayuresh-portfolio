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
    title: 'AI Engineering Roadmap',
    slug: '/learn/ai-engineer',
    icon: '🤖',
    description: 'Complete beginner-to-advanced AI Engineering curriculum - Python, Math, ML, Deep Learning, LLMs, and Production MLOps across 24 interactive modules.',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 30%, #a855f7 60%, #ec4899 100%)',
    tags: ['AI', 'ML', 'Deep Learning', 'LLMs', 'Python'],
    ready: true,
  },
  {
    title: 'JavaScript Core + Advanced',
    slug: '/learn/js',
    icon: '⚡',
    description: 'Closures, event loop, prototypes, async patterns, array methods - with runnable code for every concept.',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)',
    tags: ['Fundamentals', 'Async', 'DOM', 'ES6+'],
    ready: true,
  },
  {
    title: 'Frontend System Design',
    slug: '/learn/system-design',
    icon: '📐',
    description: 'The "Machine Coding" round. RADIO framework, Infinite Scroll Feeds, Chat Apps, Normalization, and Architecture interviews.',
    gradient: 'linear-gradient(135deg, #ea580c 0%, #c2410c 50%, #9a3412 100%)',
    tags: ['Architecture', 'Interview', 'Systems', 'Scalability'],
    ready: true,
  },
  {
    title: 'Web Performance',
    slug: '/learn/web-performance',
    icon: '🚀',
    description: 'Core Web Vitals, LCP/CLS/FID, Lighthouse, Code splitting, Tree shaking, Caching, CDN, Rendering pipeline.',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
    tags: ['Rendering', 'Optimization', 'Vitals'],
    ready: true,
  },
  {
    title: 'Testing Strategy',
    slug: '/learn/testing',
    icon: '🧪',
    description: 'Unit, Integration, E2E, React Testing Library, Mocking, and the Testing Pyramid.',
    gradient: 'linear-gradient(135deg, #0891b2 0%, #0e7490 50%, #155e75 100%)',
    tags: ['Unit', 'E2E', 'Integration', 'Vitest'],
    ready: true,
  },
  {
    title: 'Backend Awareness',
    slug: '/learn/backend',
    icon: '🔙',
    description: 'REST vs GraphQL, Auth (JWT/Cookies), CORS, Websockets, and API Design patterns.',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #4338ca 100%)',
    tags: ['Backend', 'API', 'Auth', 'REST'],
    ready: true,
  },
  {
    title: 'DevOps & Tooling',
    slug: '/learn/devops',
    icon: '⚙️',
    description: 'Git (Rebase/Merge), CI/CD Pipelines, Docker containers, and Environment management.',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #0e7490 100%)',
    tags: ['DevOps', 'Git', 'Docker', 'CI/CD'],
    ready: true,
  },
  {
    title: 'Accessibility (A11y)',
    slug: '/learn/a11y',
    icon: '♿',
    description: 'Semantic HTML, ARIA roles, Keyboard navigation, and Color contrast.',
    gradient: 'linear-gradient(135deg, #ca8a04 0%, #a16207 50%, #854d0e 100%)',
    tags: ['A11y', 'Semantics', 'ARIA'],
    ready: true,
  },
  {
    title: 'Soft Skills & Leadership',
    slug: '/learn/soft-skills',
    icon: '🤝',
    description: 'Mentoring, Estimation, Communication, Saying "No", and Code Review etiquette.',
    gradient: 'linear-gradient(135deg, #db2777 0%, #be185d 50%, #9d174d 100%)',
    tags: ['Leadership', 'Mentoring', 'Process'],
    ready: true,
  },
  {
    title: 'Advanced Skills',
    slug: '/learn/advanced',
    icon: '🚀',
    description: 'Web Security (XSS/CSRF), PWA, Internationalization (i18n), Animations, and Technical SEO.',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)',
    tags: ['Security', 'PWA', 'i18n', 'SEO'],
    ready: true,
  },
  {
    title: 'CSS Mastery',
    slug: '/learn/css',
    icon: '🎨',
    description: 'Flexbox, Grid, specificity, stacking contexts, BEM - interactive layout builders.',
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
    title: 'React Advanced',
    slug: '/learn/react',
    icon: '⚛️',
    description: 'Fiber architecture, concurrent rendering, suspense, custom hooks patterns, and performance deep dives.',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)',
    tags: ['React', 'Fiber', 'Hooks', 'Concurrent'],
    ready: true,
  },
  {
    title: 'Architecture & Scaling',
    slug: '/learn/architecture',
    icon: '🏗️',
    description: 'Monorepos, micro-frontends, feature-based structure, design systems, error boundaries, and large-scale patterns.',
    gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)',
    tags: ['Architecture', 'Scalability', 'Monorepo', 'Systems'],
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
    title: 'TypeScript Advanced',
    slug: '/learn/typescript',
    icon: '📘',
    description: 'Generics, Utility Types, Mapped Types, Conditional Types, Narrowing - type safety mastery.',
    gradient: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #1e40af 100%)',
    tags: ['Generics', 'Advanced Types', 'Utility Types'],
    ready: true,
  },
  {
    title: 'Cross-Browser & HTML5',
    slug: '/learn/cross-browser',
    icon: '🌍',
    description: 'Semantic HTML, browser quirks, responsive design from scratch, Web APIs, progressive enhancement - no frameworks.',
    gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%)',
    tags: ['HTML5', 'Cross-Browser', 'Responsive', 'Web APIs'],
    ready: true,
  },
  {
    title: 'Build Tools & CI/CD',
    slug: '/learn/tools-testing',
    icon: '🛠️',
    description: 'Webpack vs Vite, bundling, CI/CD, ESLint, TypeScript, and performance budgets.',
    gradient: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 50%, #0f766e 100%)',
    tags: ['Build Tools', 'CI/CD'],
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
  {
    title: 'Product Management Fundamentals',
    slug: '/learn/pm',
    icon: '🎯',
    description: 'PDLC (Discovery/Delivery), 7-Step Framework, Product Sense, and Active Recall strategies for PM mastery.',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)',
    tags: ['Strategy', 'Roadmap', 'Frameworks'],
    ready: true,
  },
  {
    title: 'Prompt Engineering',
    slug: '/learn/prompt-engineering',
    icon: '🤖',
    description: 'Tokens, transformers, RTF/CREATE frameworks, prompt anatomy, and enterprise-scale system design - with interactive labs and quizzes.',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
    tags: ['AI', 'Prompts', 'Frameworks'],
    ready: true,
  },
  {
    title: 'Go-To-Market Strategy',
    slug: '/learn/gtm',
    icon: '🚀',
    description: 'Master brand positioning, Minimum Viable Segment, inbound pipelines, AI agents, and value-based pricing.',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #4338ca 100%)',
    tags: ['GTM', 'Sales', 'Strategy', 'Marketing', 'AI'],
    ready: true,
  },
  {
    title: 'PM 100 - Product Sense',
    slug: '/pm-cases',
    icon: '🎯',
    description: '100 mini case studies covering real product problems - user segmentation, pain prioritisation, MVP scoping, and metric definition using an 8-section framework.',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #4c1d95 100%)',
    tags: ['Product', 'Strategy', 'Frameworks', 'PM'],
    ready: true,
  },
]

const allTags = ['All', 'Fundamentals', 'Async', 'Rendering', 'Layout', 'Vue', 'React', 'Architecture', 'Monorepo', 'Systems', 'Vitals', 'Testing', 'E2E', 'Unit', 'Algorithms', 'HTML5', 'Cross-Browser', 'Build Tools', 'Backend', 'DevOps', 'A11y', 'Security', 'Leadership', 'AI', 'ML', 'Deep Learning', 'LLMs', 'Prompts', 'Product', 'PM']
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
