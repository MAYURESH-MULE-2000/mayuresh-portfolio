<template>
  <section class="py-16 md:py-24">
    <div class="max-w-7xl mx-auto">

      <!-- Section header -->
      <div class="mb-12 md:mb-16">
        <div class="flex items-center gap-3 mb-3">
          <span class="px-3 py-1 text-xs font-bold rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 uppercase tracking-widest">
            PM 100
          </span>
        </div>
        <h2 class="text-3xl md:text-4xl font-bold">Product Sense Cases</h2>
        <p class="text-gray-600 dark:text-gray-400 text-lg mt-2 transition-colors duration-300">
          100 mini case studies - each structured with goals, market sizing, user segments, pain prioritisation, and metrics.
        </p>
      </div>

      <!-- Cards grid (3D tilt matching ImpactStories) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12">
        <div
          v-for="(c, index) in featuredCases"
          :key="c.slug"
          class="relative"
          :class="hoveredCard === c.slug ? 'z-50' : 'z-0'"
        >
          <a
            :href="`/pm-cases/${c.slug}`"
            class="group cursor-pointer block"
            @mouseenter="handleMouseEnter(c.slug)"
            @mouseleave="handleMouseLeave(c.slug)"
            @mousemove="(e) => handleMouseMove(e, c.slug)"
          >
            <!-- Default state -->
            <div
              :class="['relative aspect-[3/2] rounded-2xl overflow-hidden transition-all duration-500 ease-out', hoveredCard === c.slug ? 'opacity-0' : 'opacity-100']"
              :style="{ transform: hoveredCard === c.slug ? 'scale(0.95)' : 'scale(1)' }"
            >
              <div :class="['relative h-full w-full rounded-2xl flex flex-col items-center justify-center p-4 text-white bg-gradient-to-br', getGradient(c, index)]">
                <Target class="w-6 h-6 opacity-90 mb-2" />
                <div class="flex flex-col items-center gap-2">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-[9px] font-bold uppercase tracking-widest opacity-70">{{ c.series }}</span>
                    <span class="text-[9px] opacity-40">/</span>
                    <span class="text-[9px] font-bold uppercase tracking-widest opacity-70">{{ c.questionNumber }}</span>
                  </div>
                  <h3 class="text-[10px] md:text-sm font-bold text-center leading-tight line-clamp-2 max-w-[90%]">
                    {{ c.title }}
                  </h3>
                  <div v-if="c.insights && c.insights.length" class="flex flex-wrap justify-center gap-1 mt-1">
                    <span
                      v-for="tag in c.insights.slice(0, 3)"
                      :key="tag"
                      class="px-1.5 py-0.5 text-[8px] font-bold bg-white/30 backdrop-blur-md rounded uppercase tracking-wider"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Hover state (3D tilt, 1:1) -->
            <div
              :class="['absolute top-0 left-0 w-full aspect-[1/1] rounded-2xl overflow-hidden transition-all duration-500 ease-out pointer-events-none', hoveredCard === c.slug ? 'opacity-100' : 'opacity-0']"
              :style="{ transform: getCardTransform(c.slug) }"
            >
              <div :class="['absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-6 text-white bg-gradient-to-br', getGradient(c, index)]">
                <div class="absolute inset-0 bg-black/40"></div>
                <div class="relative z-10 flex flex-col items-center justify-center h-full w-full">
                  <Target class="w-8 h-8 mb-3" />
                  <span class="inline-block px-3 py-1 text-[10px] font-bold bg-white/20 backdrop-blur-sm rounded-full mb-2 uppercase tracking-widest text-white/90">
                    {{ c.company }}
                  </span>
                  <span class="inline-block px-2 py-0.5 text-[9px] font-bold bg-white/10 rounded-full mb-3 uppercase tracking-widest text-white/70">
                    {{ c.series }} · {{ c.questionNumber }}
                  </span>
                  <h3 class="text-base md:text-lg font-bold text-center mb-3 leading-tight">
                    {{ c.title }}
                  </h3>
                  <div v-if="c.insights && c.insights.length" class="flex flex-wrap justify-center gap-2 mb-4">
                    <span
                      v-for="tag in c.insights.slice(0, 4)"
                      :key="tag"
                      class="px-2.5 py-1 text-[10px] font-bold bg-white text-black rounded-lg uppercase tracking-wider shadow-lg"
                    >
                      {{ tag }}
                    </span>
                  </div>
                  <div class="mt-auto pt-2 flex items-center gap-2 text-xs font-semibold opacity-80 uppercase tracking-widest">
                    <span>Read Case Study</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>

      <!-- CTA -->
      <div class="flex justify-center mt-12">
        <a
          href="/pm-cases"
          class="px-8 py-3 bg-primary-black dark:bg-primary-white text-primary-white dark:text-primary-black rounded-md font-medium hover:opacity-80 transition-all duration-300"
        >
          View all PM 100 cases
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Target } from 'lucide-vue-next'

const props = defineProps({
  cases: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const featuredCases = computed(() => props.cases.slice(0, 3))

const hoveredCard = ref(null)
const cardTransforms = ref({})

const defaultGradients = [
  'from-violet-500 to-purple-700',
  'from-indigo-500 to-violet-600',
  'from-purple-500 to-pink-600',
]

function getGradient(c, index) {
  if (c.cardGradient) return c.cardGradient
  return defaultGradients[index % defaultGradients.length]
}

function handleMouseMove(event, cardId) {
  const card = event.currentTarget
  const rect = card.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const rotateX = ((y - centerY) / centerY) * -20
  const rotateY = ((x - centerX) / centerX) * 20
  cardTransforms.value[cardId] = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`
}

function handleMouseEnter(cardId) {
  hoveredCard.value = cardId
}

function handleMouseLeave(cardId) {
  hoveredCard.value = null
  cardTransforms.value[cardId] = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
}

function getCardTransform(cardId) {
  return cardTransforms.value[cardId] || 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
}
</script>

<style scoped>
a {
  transform-style: preserve-3d;
}
</style>
