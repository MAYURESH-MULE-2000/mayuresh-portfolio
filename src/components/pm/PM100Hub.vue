<template>
  <div class="pm100-hub">
    <!-- Header -->
    <div class="mb-10">
      <a href="/" class="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-6">
        ← Back to Portfolio
      </a>

      <div class="flex items-center gap-3 mb-3">
        <span class="px-3 py-1 text-xs font-bold rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 uppercase tracking-widest">
          PM 100
        </span>
        <span class="text-xs text-gray-400">{{ cases.length }} / 100 published</span>
      </div>

      <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        🎯 Product Sense Case Studies
      </h1>
      <p class="text-gray-500 dark:text-gray-400 text-base md:text-lg max-w-2xl">
        100 mini case studies covering real product problems — from user segmentation and pain prioritisation
        to MVP scoping and metric definition. Each case is structured with a standard 8-section framework.
      </p>
    </div>

    <!-- Filter row -->
    <div class="flex flex-wrap gap-2 mb-8">
      <button
        v-for="tag in filterTags"
        :key="tag"
        @click="activeFilter = activeFilter === tag ? 'All' : tag"
        class="px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 border"
        :class="activeFilter === tag
          ? 'bg-violet-600 text-white border-transparent'
          : 'border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-white/30'"
      >
        {{ tag }}
      </button>
    </div>

    <!-- Cases grid -->
    <div v-if="filteredCases.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <a
        v-for="c in filteredCases"
        :key="c.slug"
        :href="`/pm-cases/${c.slug}`"
        class="group relative rounded-2xl overflow-hidden border border-gray-200 dark:border-white/5 transition-all duration-300 hover:border-transparent hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/30 hover:-translate-y-1"
      >
        <!-- Gradient hover background -->
        <div
          class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br"
          :class="c.cardGradient || 'from-violet-500 to-purple-700'"
        ></div>

        <div class="relative p-6 bg-white/90 dark:bg-gray-900/70 group-hover:bg-white/30 dark:group-hover:bg-gray-900/20 backdrop-blur-sm transition-all duration-300">

          <!-- Top row: series badge + question number -->
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-bold uppercase tracking-widest text-violet-500 dark:text-violet-400 group-hover:text-white/80 transition-colors">
                {{ c.series }}
              </span>
              <span class="text-[10px] text-gray-300 dark:text-gray-600 group-hover:text-white/40">/</span>
              <span class="text-[10px] font-bold text-gray-400 group-hover:text-white/80 transition-colors">
                {{ c.questionNumber }}
              </span>
            </div>
            <span v-if="c.type"
              class="px-2 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wider transition-colors bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 group-hover:bg-white/20 group-hover:text-white"
            >
              {{ c.type }}
            </span>
          </div>

          <!-- Company -->
          <p class="text-xs font-semibold text-gray-400 dark:text-gray-500 group-hover:text-white/70 transition-colors mb-1.5">
            {{ c.company }}
          </p>

          <!-- Title -->
          <h2 class="text-base font-bold text-gray-900 dark:text-white group-hover:text-white transition-colors mb-4 leading-snug line-clamp-2">
            {{ c.title }}
          </h2>

          <!-- Tags -->
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="tag in (c.insights || []).slice(0, 4)"
              :key="tag"
              class="px-2 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wider transition-colors bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 group-hover:bg-white/20 group-hover:text-white/90"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Arrow -->
          <div class="absolute top-5 right-5 text-gray-300 dark:text-gray-600 group-hover:text-white transition-all duration-300 group-hover:translate-x-1">
            →
          </div>
        </div>
      </a>

      <!-- Placeholder cards for upcoming questions -->
      <div
        v-for="n in placeholderCount"
        :key="`placeholder-${n}`"
        class="rounded-2xl border border-dashed border-gray-200 dark:border-white/5 p-6 flex flex-col items-center justify-center text-center min-h-[180px] opacity-40"
      >
        <p class="text-2xl mb-2">🔒</p>
        <p class="text-xs text-gray-400 dark:text-gray-600 font-medium">Coming Soon</p>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="text-center py-20 text-gray-400">
      <p class="text-4xl mb-3">🔍</p>
      <p class="font-medium">No cases match this filter</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  cases: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const filterTags = computed(() => {
  const tags = new Set(['All'])
  props.cases.forEach(c => {
    if (c.type) tags.add(c.type)
    if (c.company) tags.add(c.company)
  })
  return Array.from(tags)
})

const activeFilter = ref('All')

const filteredCases = computed(() => {
  if (activeFilter.value === 'All') return props.cases
  return props.cases.filter(c =>
    c.type === activeFilter.value || c.company === activeFilter.value
  )
})

// Show placeholder cards to fill the visual grid (up to 6 total slots visible)
const placeholderCount = computed(() => {
  const visible = filteredCases.value.length
  if (activeFilter.value !== 'All') return 0
  const target = Math.max(3, Math.ceil(visible / 3) * 3)
  return Math.min(target - visible, 3)
})
</script>
