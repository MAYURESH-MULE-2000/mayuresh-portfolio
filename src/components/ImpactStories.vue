<script setup>
import { computed } from 'vue'
import {
    Presentation as LucidePresentation,
    Rocket as LucideRocket,
    PenTool as LucidePenTool
} from 'lucide-vue-next'

const props = defineProps({
    items: {
        type: Array,
        required: false,
        default: () => [],
    },
})

const featuredContent = computed(() => {
    const list = props.items ?? []
    return list.slice(0, 6)
})

// Get icon based on resource type
const getIcon = (type) => {
    const icons = {
        'case-study': LucidePresentation,
        'project': LucideRocket,
        'blog': LucidePenTool,
    }
    return icons[type] || LucidePresentation
}

// Get card accent color based on type
const getCardAccent = (type) => {
    const accents = {
        'case-study': {
            bg: 'bg-rose-50 dark:bg-rose-900/10',
            tag: 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300',
            label: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
        },
        'project': {
            bg: 'bg-blue-50 dark:bg-blue-900/10',
            tag: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
            label: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
        },
        'blog': {
            bg: 'bg-amber-50 dark:bg-amber-900/10',
            tag: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
            label: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
        },
    }
    return accents[type] || accents['case-study']
}

// Get the primary outcome metric for a card
const getOutcomeMetric = (item) => {
    // Check if item has insights and return the first one as an outcome
    if (item.insights && item.insights.length > 0) {
        return item.insights[0]
    }
    return null
}
</script>

<template>
    <section id="impact-stories" class="py-20">
        <div class="max-w-7xl mx-auto">
            <!-- Section Header -->
            <div class="mb-12 md:mb-16">
                <h2 class="text-3xl md:text-4xl font-bold mb-3">Impact Stories</h2>
                <p class="text-gray-600 dark:text-gray-400 text-lg transition-colors duration-300 max-w-2xl">
                    Real product problems solved through research, strategy, and execution.
                </p>
            </div>

            <!-- Card Grid: 2 columns on desktop, 1 on mobile -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <a
                    v-for="(item, index) in featuredContent"
                    :key="item.id"
                    :href="`/${item.type}/${item.slug}`"
                    class="group block border border-gray-200/60 dark:border-gray-700/50 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                >
                    <!-- Card Content -->
                    <div class="p-6 md:p-8" :class="getCardAccent(item.type).bg">
                        <!-- Top Row: Company/Type Tag -->
                        <div class="flex items-center justify-between mb-4">
                            <span
                                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                                :class="getCardAccent(item.type).label"
                            >
                                <component :is="getIcon(item.type)" :size="12" />
                                {{ item.label }}
                            </span>

                            <!-- Outcome Metric Pill -->
                            <span
                                v-if="getOutcomeMetric(item)"
                                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-accent/15 text-accent-dark dark:text-accent"
                            >
                                {{ getOutcomeMetric(item) }}
                            </span>
                        </div>

                        <!-- Title -->
                        <h3 class="text-lg md:text-xl font-bold mb-4 leading-snug group-hover:text-accent-dark dark:group-hover:text-accent transition-colors duration-300">
                            {{ item.title }}
                        </h3>

                        <!-- Skill Tags -->
                        <div v-if="item.insights && item.insights.length > 1" class="flex flex-wrap gap-2">
                            <span
                                v-for="insight in item.insights.slice(1, 4)"
                                :key="insight"
                                class="px-3 py-1 text-xs font-medium rounded-full"
                                :class="getCardAccent(item.type).tag"
                            >
                                {{ insight }}
                            </span>
                        </div>

                        <!-- Arrow indicator -->
                        <div class="mt-5 flex items-center gap-2 text-xs font-semibold text-gray-400 dark:text-gray-500 group-hover:text-accent-dark dark:group-hover:text-accent transition-colors duration-300 uppercase tracking-wider">
                            <span>View Story</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </div>
                </a>
            </div>

            <!-- CTA -->
            <div class="flex justify-center">
                <a href="/resources"
                    class="px-8 py-3 bg-primary-black dark:bg-primary-white text-primary-white dark:text-primary-black rounded-xl font-medium hover:opacity-80 transition-all duration-300">
                    View all stories
                </a>
            </div>
        </div>
    </section>
</template>
