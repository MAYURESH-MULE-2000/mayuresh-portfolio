<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    // [{ id, type, title, label, slug, thumbnail }]
    items: {
        type: Array,
        required: true,
    },
})

const activeFilter = ref('all')

const getRoutePath = (type, slug) => {
    // type: 'case-study' | 'project' | 'blog'
    return `/${type}/${slug}`
}

const filteredResources = computed(() => {
    if (!props.items || props.items.length === 0) return []
    
    // Add original index to each item to preserve gradient colors
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

// Track hover state and mouse position for 3D effect
const hoveredCard = ref(null)
const cardTransforms = ref({})

// Vibrant gradient colors for different resource types
const getCardGradient = (type, index, customGradient) => {
    // If custom gradient is provided, use it
    if (customGradient) {
        return `bg-gradient-to-br ${customGradient}`
    }
    
    // Otherwise use default gradients
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
        'case-study': `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
        </svg>`,
        'project': `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>`,
        'blog': `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>`,
    }
    return icons[type] || icons['case-study']
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
    <section class="py-12 md:py-16">
        <div class="max-w-7xl mx-auto">
            <!-- Header -->
            <div class="mb-12">
                <h1 class="text-4xl md:text-5xl font-bold mb-4">Resources</h1>
                <p class="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
                    We conducted a learnability study with novice users, that simulated real usage frequency.
                    Evaluated designs with experts, novices, and disabled individuals.
                </p>
            </div>

            <!-- Filter Tabs -->
            <div class="flex flex-wrap gap-3 mb-12">
                <button @click="setFilter('all')"
                    class="px-6 py-2 rounded-full transition-all duration-300 text-sm md:text-base" :class="activeFilter === 'all'
                            ? 'bg-gray-200 dark:bg-gray-800 text-primary-black dark:text-primary-white font-medium'
                            : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
                        ">
                    All
                </button>

                <button @click="setFilter('case-study')"
                    class="px-6 py-2 rounded-full transition-all duration-300 text-sm md:text-base" :class="activeFilter === 'case-study'
                            ? 'bg-gray-200 dark:bg-gray-800 text-primary-black dark:text-primary-white font-medium'
                            : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
                        ">
                    Case Study
                </button>

                <button @click="setFilter('project')"
                    class="px-6 py-2 rounded-full transition-all duration-300 text-sm md:text-base" :class="activeFilter === 'project'
                            ? 'bg-gray-200 dark:bg-gray-800 text-primary-black dark:text-primary-white font-medium'
                            : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
                        ">
                    Projects
                </button>

                <button @click="setFilter('blog')"
                    class="px-6 py-2 rounded-full transition-all duration-300 text-sm md:text-base" :class="activeFilter === 'blog'
                            ? 'bg-gray-200 dark:bg-gray-800 text-primary-black dark:text-primary-white font-medium'
                            : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
                        ">
                    Blogs
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
                        
                        <!-- Default State Container (5:2 - compact but readable) -->
                        <div
                            :class="['relative aspect-[5/2] rounded-2xl overflow-visible transition-all duration-500 ease-out', hoveredCard === resource.id ? 'opacity-0' : 'opacity-100']"
                            :style="{ transform: hoveredCard === resource.id ? 'scale(0.95)' : 'scale(1)' }">
                            <div :class="['absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-6 text-white', getCardGradient(resource.type, index, resource.cardGradient)]">
                                <!-- Icon and Logo Row -->
                                <div class="flex items-center gap-3">
                                    <!-- Icon -->
                                    <div class="opacity-90 [&>svg]:w-6 [&>svg]:h-6" v-html="getIcon(resource.type)"></div>
                                    
                                    <!-- Logo (if available) -->
                                    <div v-if="resource.logo" class="w-14 h-14 flex items-center justify-center">
                                        <img :src="resource.logo" :alt="`${resource.title} logo`" class="w-full h-full object-contain" />
                                    </div>
                                </div>
                                
                                <!-- Title (smaller text) -->
                                <h3 class="text-sm md:text-base font-bold text-center leading-tight">
                                    {{ resource.title }}
                                </h3>
                            </div>
                        </div>

                        <!-- Hover State Container (4:3) - Absolutely positioned -->
                        <div
                            :class="['absolute top-0 left-0 w-full aspect-[4/3] rounded-2xl overflow-hidden transition-all duration-500 ease-out pointer-events-none', hoveredCard === resource.id ? 'opacity-100' : 'opacity-0']"
                            :style="{ transform: getCardTransform(resource.id) }">
                            <div :class="['absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-6 text-white', getCardGradient(resource.type, resource.originalIndex, resource.cardGradient)]">                                <!-- Background overlay for better text readability -->
                                <div class="absolute inset-0 bg-black/30"></div>
                                
                                <!-- Content -->
                                <div class="relative z-10 flex flex-col items-center justify-center h-full">
                                    <!-- Logo or Icon -->
                                    <div v-if="resource.logo" class="mb-3 w-20 h-20 flex items-center justify-center">
                                        <img :src="resource.logo" :alt="`${resource.title} logo`" class="w-full h-full object-contain" />
                                    </div>
                                    <div v-else class="mb-3 opacity-90 transform scale-75 transition-transform duration-300" v-html="getIcon(resource.type)"></div>
                                    
                                    <!-- Category Tag -->
                                    <span class="inline-block px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full mb-2 uppercase tracking-wide">
                                        {{ resource.label }}
                                    </span>
                                    
                                    <!-- Title -->
                                    <h3 class="text-sm md:text-base font-bold text-center mb-2">
                                        {{ resource.title }}
                                    </h3>
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
