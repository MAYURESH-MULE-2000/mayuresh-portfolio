<script setup>
import { computed } from 'vue'
import {
  Presentation as LucidePresentation,
  Rocket as LucideRocket,
  PenTool as LucidePenTool,
} from 'lucide-vue-next'

const props = defineProps({
  items: {
    type: Array,
    required: false,
    default: () => [],
  },
  limit: {
    type: Number,
    default: 3,
  },
})

const workingOn = computed(() => (props.items ?? []).slice(0, props.limit))

const getRoutePath = (item) => `/${item.type}/${item.slug}`

const getIcon = (type) => {
  const icons = {
    'case-study': LucidePresentation,
    project: LucideRocket,
    blog: LucidePenTool,
  }
  return icons[type] || LucidePresentation
}

const getGradient = (item) =>
  `bg-gradient-to-br ${item.cardGradient || 'from-gray-800 to-gray-600'}`
</script>

<template>
  <section id="what-im-working-on" class="py-16 md:py-24">
    <div class="max-w-7xl mx-auto">
      <!-- Section header -->
      <div class="mb-12 md:mb-16">
        <div class="flex items-center gap-3 mb-3">
          <span
            class="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 uppercase tracking-widest"
          >
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            In progress
          </span>
        </div>
        <h2 class="text-3xl md:text-4xl font-bold">What I'm Working On</h2>
        <p class="text-gray-600 dark:text-gray-400 text-lg mt-2 transition-colors duration-300 max-w-2xl">
          The work I'm actively building and writing up right now - open one to read the full case study.
        </p>
      </div>

      <!-- Cards: image left, content right -->
      <div class="space-y-6 md:space-y-8">
        <a
          v-for="item in workingOn"
          :key="item.id"
          :href="getRoutePath(item)"
          class="group grid grid-cols-1 md:grid-cols-2 gap-0 border border-gray-200/70 dark:border-gray-800 rounded-3xl overflow-hidden bg-white dark:bg-primary-black hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-500 hover:-translate-y-1"
        >
          <!-- Left: visual -->
          <div class="relative overflow-hidden aspect-[4/3] md:aspect-auto md:min-h-[320px]">
            <div :class="['absolute inset-0', getGradient(item)]"></div>

            <img
              v-if="item.thumbnail"
              :src="item.thumbnail"
              :alt="item.title"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div v-else class="absolute inset-0 flex items-center justify-center p-10">
              <img
                v-if="item.logo"
                :src="item.logo"
                :alt="`${item.title} logo`"
                class="max-h-16 w-auto object-contain"
              />
              <component v-else :is="getIcon(item.type)" :size="48" class="text-white/80" />
            </div>

          </div>

          <!-- Right: content -->
          <div class="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
            <div class="flex flex-wrap items-center gap-2 mb-5">
              <span
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-gray-100 dark:bg-white/[0.06] text-gray-600 dark:text-gray-300"
              >
                <component :is="getIcon(item.type)" :size="12" />
                {{ item.label }}
              </span>

              <!-- Status pill -->
              <span
                v-if="item.status"
                class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300"
              >
                <span class="relative flex h-1.5 w-1.5">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-500"></span>
                </span>
                {{ item.status }}
              </span>
            </div>

            <h3
              class="text-xl md:text-2xl lg:text-3xl font-bold leading-snug mb-4 group-hover:text-accent-dark dark:group-hover:text-accent transition-colors duration-300"
            >
              {{ item.title }}
            </h3>

            <p
              v-if="item.description"
              class="text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-[17px] mb-6"
            >
              {{ item.description }}
            </p>

            <div v-if="item.insights && item.insights.length" class="flex flex-wrap gap-2 mb-8">
              <span
                v-for="insight in item.insights.slice(0, 4)"
                :key="insight"
                class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-100 dark:bg-white/[0.05] border border-transparent dark:border-white/5 text-gray-700 dark:text-gray-300"
              >
                {{ insight }}
              </span>
            </div>

            <span
              class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 group-hover:text-accent-dark dark:group-hover:text-accent transition-colors duration-300"
            >
              Read the case study
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </a>
      </div>

      <!-- Empty state -->
      <p v-if="workingOn.length === 0" class="text-gray-500 dark:text-gray-400">
        Nothing published here yet - check back soon.
      </p>

      <!-- CTA -->
      <div class="flex justify-center mt-12">
        <a
          href="/resources"
          class="px-8 py-3 bg-primary-black dark:bg-primary-white text-primary-white dark:text-primary-black rounded-md font-medium hover:opacity-80 transition-all duration-300"
        >
          View all resources
        </a>
      </div>
    </div>
  </section>
</template>
