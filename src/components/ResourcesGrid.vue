<script setup>
import { ref, computed } from 'vue'
import { 
    LayoutGrid as LucideLayoutGrid, 
    Presentation as LucidePresentation, 
    Rocket as LucideRocket, 
    PenTool as LucidePenTool 
} from 'lucide-vue-next'

const props = defineProps({
    items: {
        type: Array,
        required: true,
    },
})

const activeFilter = ref('all')

const filters = [
    { id: 'all', label: 'All', icon: LucideLayoutGrid },
    { id: 'case-study', label: 'Case Study', icon: LucidePresentation },
    { id: 'project', label: 'Projects', icon: LucideRocket },
    { id: 'blog', label: 'Blogs', icon: LucidePenTool }
]

const getRoutePath = (type, slug) => `/${type}/${slug}`

const filteredResources = computed(() => {
    if (!props.items || props.items.length === 0) return []
    const itemsWithIndex = props.items.map((item, index) => ({
        ...item,
        originalIndex: index
    }))
    if (activeFilter.value === 'all') return itemsWithIndex
    return itemsWithIndex.filter((r) => r.type === activeFilter.value)
})

const setFilter = (filter) => {
    activeFilter.value = filter
}

// 3D Effect State
const hoveredCard = ref(null)
const cardTransforms = ref({})

const getCardGradient = (item, index, isHover) => {
    if (isHover && item.cardHoverGradient) return `bg-gradient-to-br ${item.cardHoverGradient}`
    if (item.cardGradient) return `bg-gradient-to-br ${item.cardGradient}`
    
    const gradients = {
        'case-study': ['from-teal-500 to-emerald-600', 'from-purple-500 to-pink-600', 'from-orange-500 to-amber-600', 'from-blue-500 to-indigo-600'],
        'project': ['from-red-500 to-rose-600', 'from-cyan-500 to-blue-600', 'from-violet-500 to-purple-600', 'from-amber-500 to-orange-600'],
        'blog': ['from-pink-500 to-rose-600', 'from-yellow-500 to-orange-600', 'from-green-500 to-teal-600', 'from-indigo-500 to-blue-600'],
    }
    const typeGradients = gradients[item.type] || gradients['case-study']
    return `bg-gradient-to-br ${typeGradients[index % typeGradients.length]}`
}

const getIcon = (type) => {
    const icons = {
        'case-study': LucidePresentation,
        'project': LucideRocket,
        'blog': LucidePenTool,
    }
    return icons[type] || LucidePresentation
}

const handleMouseMove = (event, cardId) => {
    const card = event.currentTarget
    const rect = card.getBoundingClientRect()
    const rotateX = ((event.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -20
    const rotateY = ((event.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 20
    cardTransforms.value[cardId] = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`
}

const handleMouseEnter = (cardId) => { hoveredCard.value = cardId }
const handleMouseLeave = (cardId) => {
    hoveredCard.value = null
    cardTransforms.value[cardId] = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
}
const getCardTransform = (cardId) => cardTransforms.value[cardId] || 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
</script>

<template>
    <section class="py-12 md:py-16">
        <div class="max-w-7xl mx-auto">
            <!-- Header -->
            <div class="mb-12">
                <h1 class="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Resources</h1>
                <p class="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
                    A curated collection of my research, projects, and deep dives into UX engineering and product strategy.
                </p>
            </div>

            <!-- Filter Tabs -->
            <div class="flex flex-wrap gap-3 md:gap-4 mb-16">
                <button v-for="filter in filters" :key="filter.id"
                    @click="setFilter(filter.id)"
                    class="group flex items-center gap-2.5 px-6 py-3 rounded-2xl transition-all duration-300 text-sm font-bold border"
                    :class="activeFilter === filter.id
                            ? 'bg-gray-900 border-gray-900 text-white dark:bg-white dark:border-white dark:text-black shadow-xl shadow-gray-200 dark:shadow-none scale-105'
                            : 'bg-white/50 dark:bg-gray-900/50 border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:border-gray-200 dark:hover:border-gray-700 hover:text-gray-900 dark:hover:text-white'
                        ">
                    <component :is="filter.icon" :size="18" :class="activeFilter === filter.id ? 'opacity-100' : 'opacity-40 group-hover:opacity-100 transition-opacity'" />
                    <span class="tracking-wide">{{ filter.label }}</span>
                </button>
            </div>

            <!-- Resources Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div v-for="(resource, index) in filteredResources" :key="resource.id" 
                    class="relative"
                    :class="hoveredCard === resource.id ? 'z-50' : 'z-0'">
                    <a :href="getRoutePath(resource.type, resource.slug)" 
                        class="group cursor-pointer block"
                        @mouseenter="handleMouseEnter(resource.id)"
                        @mouseleave="handleMouseLeave(resource.id)"
                        @mousemove="(e) => handleMouseMove(e, resource.id)">
                        
                        <!-- Default State Container (2:1 - slightly taller for better mobile/tag support) -->
                        <div
                            :class="['relative aspect-[2/1] rounded-2xl overflow-hidden transition-all duration-500 ease-out', hoveredCard === resource.id ? 'opacity-0' : 'opacity-100']"
                            :style="{ transform: hoveredCard === resource.id ? 'scale(0.95)' : 'scale(1)' }">
                            <div :class="['relative h-full w-full rounded-2xl flex flex-col items-center justify-center p-4 text-white', getCardGradient(resource, index, false)]">
                                <!-- Icon and Logo Row -->
                                <div class="flex items-center gap-3 mb-2">
                                    <!-- Icon -->
                                    <div class="opacity-90">
                                        <component :is="getIcon(resource.type)" :size="20" />
                                    </div>
                                    
                                    <!-- Logo (if available) -->
                                    <div v-if="resource.logo" class="w-10 h-10 flex items-center justify-center">
                                        <img :src="resource.logo" :alt="`${resource.title} logo`" class="w-full h-full object-contain" />
                                    </div>
                                </div>
                                
                                <!-- Title and Insights -->
                                <div class="flex flex-col items-center gap-2">
                                    <h3 class="text-[10px] md:text-sm font-bold text-center leading-tight line-clamp-2 max-w-[90%]">
                                        {{ resource.title }}
                                    </h3>
                                    
                                    <!-- Insights Tags -->
                                    <div v-if="resource.insights && resource.insights.length" class="flex flex-wrap justify-center gap-1 mt-1">
                                        <span v-for="insight in resource.insights" :key="insight" 
                                            class="px-1.5 py-0.5 text-[8px] font-bold bg-white/30 backdrop-blur-md rounded uppercase tracking-wider">
                                            {{ insight }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Hover State Container (4:3) - Absolutely positioned -->
                        <div
                            :class="['absolute top-0 left-0 w-full aspect-[4/3] rounded-2xl overflow-hidden transition-all duration-500 ease-out pointer-events-none', hoveredCard === resource.id ? 'opacity-100' : 'opacity-0']"
                            :style="{ transform: getCardTransform(resource.id) }">
                            <div :class="['absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-6 text-white', getCardGradient(resource, resource.originalIndex, true)]">
                                <!-- Background overlay -->
                                <div class="absolute inset-0 bg-black/40"></div>
                                
                                <!-- Content -->
                                <div class="relative z-10 flex flex-col items-center justify-center h-full w-full">
                                    <!-- Logo or Icon -->
                                    <div v-if="resource.logo" class="mb-3 w-16 h-16 flex items-center justify-center">
                                        <img :src="resource.logo" :alt="`${resource.title} logo`" class="w-full h-full object-contain" />
                                    </div>
                                    <div v-else class="mb-3 opacity-90 transform scale-75">
                                        <component :is="getIcon(resource.type)" :size="24" />
                                    </div>
                                    
                                    <!-- Category Tag -->
                                    <span class="inline-block px-3 py-1 text-[10px] font-bold bg-white/20 backdrop-blur-sm rounded-full mb-3 uppercase tracking-widest text-white/90">
                                        {{ resource.label }}
                                    </span>
                                    
                                    <!-- Title -->
                                    <h3 class="text-base md:text-lg font-bold text-center mb-3 leading-tight">
                                        {{ resource.title }}
                                    </h3>

                                    <!-- Insights Tags (Hover) -->
                                    <div v-if="resource.insights && resource.insights.length" class="flex flex-wrap justify-center gap-2 mb-4">
                                        <span v-for="insight in resource.insights" :key="insight" 
                                            class="px-2.5 py-1 text-[10px] font-bold bg-white text-black rounded-lg uppercase tracking-wider shadow-lg">
                                            {{ insight }}
                                        </span>
                                    </div>

                                    <!-- Action Hint -->
                                    <div class="mt-auto pt-2 flex items-center gap-2 text-xs font-semibold opacity-80 uppercase tracking-widest">
                                        <span>View Details</span>
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

            <!-- Empty State -->
            <div v-if="filteredResources.length === 0" class="text-center py-20">
                <p class="text-lg text-gray-500 dark:text-gray-400">
                    No {{ activeFilter === 'all' ? 'resources' : activeFilter.replace('-', ' ') }} found.
                </p>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* Smooth 3D transform transitions */
a {
    transform-style: preserve-3d;
}
</style>
