<script setup>
import { computed, ref } from 'vue'
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

// Track hover state and mouse position for 3D effect
const hoveredCard = ref(null)
const cardTransforms = ref({})

// Vibrant gradient colors for different resource types
// Get gradient based on type and index, or use custom gradient if provided
const getCardGradient = (item, index, isHover) => {
    // If hover gradient is provided and we are hovering, use it
    if (isHover && item.cardHoverGradient) {
        return `bg-gradient-to-br ${item.cardHoverGradient}`
    }

    // If custom gradient is provided, use it
    if (item.cardGradient) {
        return `bg-gradient-to-br ${item.cardGradient}`
    }
    
    const type = item.type
    // Otherwise use default gradients based on type
    const gradients = {
        'case-study': [
            'from-teal-500 to-emerald-600',
            'from-purple-500 to-pink-600',
            'from-orange-500 to-amber-600',
            'from-blue-500 to-indigo-600',
        ],
        'project': [
            'from-red-500 to-rose-600',
            'from-cyan-500 to-blue-600',
            'from-violet-500 to-purple-600',
            'from-amber-500 to-orange-600',
        ],
        'blog': [
            'from-pink-500 to-rose-600',
            'from-yellow-500 to-orange-600',
            'from-green-500 to-teal-600',
            'from-indigo-500 to-blue-600',
        ],
    }
    
    const typeGradients = gradients[type] || gradients['case-study']
    return `bg-gradient-to-br ${typeGradients[index % typeGradients.length]}`
}

// Get icon based on resource type
const getIcon = (type) => {
    const icons = {
        'case-study': LucidePresentation,
        'project': LucideRocket,
        'blog': LucidePenTool,
    }
    return icons[type] || LucidePresentation
}

// Handle mouse move for 3D tilt effect
const handleMouseMove = (event, cardId) => {
    const card = event.currentTarget
    const rect = card.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    // Increased tilt for more dramatic 3D effect (±20deg instead of ±10deg)
    const rotateX = ((y - centerY) / centerY) * -20
    const rotateY = ((x - centerX) / centerX) * 20
    
    cardTransforms.value[cardId] = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`
}

const handleMouseEnter = (cardId) => {
    hoveredCard.value = cardId
}

const handleMouseLeave = (cardId) => {
    hoveredCard.value = null
    cardTransforms.value[cardId] = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
}

const getCardTransform = (cardId) => {
    return cardTransforms.value[cardId] || 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
}
</script>

<template>
    <section class="py-16 md:py-24">
        <div class="max-w-7xl mx-auto">
            <div class="relative mb-12 md:mb-16">
                <div class="flex items-center justify-between">
                    <h2 class="text-3xl md:text-4xl font-bold">Impact Stories</h2>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12">
                <div v-for="(item, index) in featuredContent" :key="item.id" 
                    class="relative"
                    :class="hoveredCard === item.id ? 'z-50' : 'z-0'">
                    <a :href="`/${item.type}/${item.slug}`"
                        class="group cursor-pointer block"
                        @mouseenter="handleMouseEnter(item.id)"
                        @mouseleave="handleMouseLeave(item.id)"
                        @mousemove="(e) => handleMouseMove(e, item.id)">
                        
                        <!-- Default State Container (2:1 - slightly taller for better mobile/tag support) -->
                        <div
                            :class="['relative aspect-[2/1] rounded-2xl overflow-hidden transition-all duration-500 ease-out', hoveredCard === item.id ? 'opacity-0' : 'opacity-100']"
                            :style="{ transform: hoveredCard === item.id ? 'scale(0.95)' : 'scale(1)' }">
                            <div :class="['relative h-full w-full rounded-2xl flex flex-col items-center justify-center p-4 text-white', getCardGradient(item, index, false)]">
                                <!-- Icon and Logo Row -->
                                <div class="flex items-center gap-3 mb-2">
                                    <!-- Icon -->
                                    <div class="opacity-90">
                                        <component :is="getIcon(item.type)" :size="20" />
                                    </div>
                                    
                                    <!-- Logo (if available) -->
                                    <div v-if="item.logo" class="w-10 h-10 flex items-center justify-center">
                                        <img :src="item.logo" :alt="`${item.title} logo`" class="w-full h-full object-contain" />
                                    </div>
                                </div>
                                
                                <!-- Title and Insights -->
                                <div class="flex flex-col items-center gap-2">
                                    <h3 class="text-[10px] md:text-sm font-bold text-center leading-tight line-clamp-2 max-w-[90%]">
                                        {{ item.title }}
                                    </h3>
                                    
                                    <!-- Insights Tags -->
                                    <div v-if="item.insights && item.insights.length" class="flex flex-wrap justify-center gap-1 mt-1">
                                        <span v-for="insight in item.insights" :key="insight" 
                                            class="px-1.5 py-0.5 text-[8px] font-bold bg-white/30 backdrop-blur-md rounded uppercase tracking-wider">
                                            {{ insight }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Hover State Container (4:3) - Absolutely positioned -->
                        <div
                            :class="['absolute top-0 left-0 w-full aspect-[4/3] rounded-2xl overflow-hidden transition-all duration-500 ease-out pointer-events-none', hoveredCard === item.id ? 'opacity-100' : 'opacity-0']"
                            :style="{ transform: getCardTransform(item.id) }">
                            <div :class="['absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-6 text-white', getCardGradient(item, index, true)]">
                                <!-- Background overlay for better text readability -->
                                <div class="absolute inset-0 bg-black/40"></div>
                                
                                <!-- Content -->
                                <div class="relative z-10 flex flex-col items-center justify-center h-full w-full">
                                    <!-- Logo or Icon -->
                                    <div v-if="item.logo" class="mb-3 w-16 h-16 flex items-center justify-center">
                                        <img :src="item.logo" :alt="`${item.title} logo`" class="w-full h-full object-contain" />
                                    </div>
                                    <div v-else class="mb-3 opacity-90 transform scale-75">
                                        <component :is="getIcon(item.type)" :size="24" />
                                    </div>
                                    
                                    <!-- Category Tag -->
                                    <span class="inline-block px-3 py-1 text-[10px] font-bold bg-white/20 backdrop-blur-sm rounded-full mb-3 uppercase tracking-widest text-white/90">
                                        {{ item.label }}
                                    </span>
                                    
                                    <!-- Title -->
                                    <h3 class="text-base md:text-lg font-bold text-center mb-3 leading-tight">
                                        {{ item.title }}
                                    </h3>

                                    <!-- Insights Tags (Hover) -->
                                    <div v-if="item.insights && item.insights.length" class="flex flex-wrap justify-center gap-2 mb-4">
                                        <span v-for="insight in item.insights" :key="insight" 
                                            class="px-2.5 py-1 text-[10px] font-bold bg-white text-black rounded-lg uppercase tracking-wider shadow-lg">
                                            {{ insight }}
                                        </span>
                                    </div>

                                    <!-- Action Hint -->
                                    <div class="mt-auto pt-2 flex items-center gap-2 text-xs font-semibold opacity-80 uppercase tracking-widest">
                                        <span>View Case Study</span>
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

            <div class="flex justify-center mt-12">
                <a href="/resources"
                    class="px-8 py-3 bg-primary-black dark:bg-primary-white text-primary-white dark:text-primary-black rounded-md font-medium hover:opacity-80 transition-all duration-300">
                    View all stories
                </a>
            </div>
        </div>
    </section>
</template>

<style scoped>
a {
    transform-style: preserve-3d;
}
</style>
