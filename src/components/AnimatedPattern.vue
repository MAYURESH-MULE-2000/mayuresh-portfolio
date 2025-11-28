<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Grid configuration
const rows = 4
const cols = 20

// Generate grid items
const gridItems = ref([])
let interval = null

// Initialize grid
const initializeGrid = () => {
    gridItems.value = Array.from({ length: rows * cols }, () => ({
        type: 'circle',
        isActive: false,
    }))
}

// Smoothly transition items
const animatePattern = () => {
    const totalItems = gridItems.value.length
    const indices = Array.from({ length: totalItems }, (_, i) => i)

    // Shuffle array
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]]
    }

    // First, fade OUT current pattern (back to gray)
    gridItems.value.forEach(item => item.isActive = false)

    // Wait for fade out to complete, then show new pattern
    setTimeout(() => {
        // Select 6 for filled circles
        indices.slice(0, 6).forEach(i => {
            gridItems.value[i].type = 'filled'
            gridItems.value[i].isActive = true
        })

        // Select 6 for asterisks
        indices.slice(6, 12).forEach(i => {
            gridItems.value[i].type = 'asterisk'
            gridItems.value[i].isActive = true
        })
    }, 2500) // Wait 2.5 seconds for complete fade to gray
}

onMounted(() => {
    initializeGrid()

    // Show first pattern after brief delay
    setTimeout(() => {
        animatePattern()
    }, 500)

    // Repeat cycle:
    // 2.5s fade out → 2.5s fade in → 3s visible → repeat
    // Total: 8 seconds per cycle
    interval = setInterval(() => {
        animatePattern()
    }, 8000)
})

onUnmounted(() => {
    if (interval) clearInterval(interval)
})
</script>

<template>
    <div class="w-full overflow-hidden py-12">
        <!-- Grid container -->
        <div class="grid gap-4 md:gap-6 lg:gap-8 justify-center"
            :style="`grid-template-columns: repeat(${cols}, minmax(0, 1fr));`">

            <!-- Grid items -->
            <div v-for="(item, index) in gridItems" :key="index" class="flex items-center justify-center relative">
                <!-- Gray circle (always present, shows when inactive) -->
                <div class="w-2 h-2 md:w-2 md:h-2 rounded-full bg-gray-300 dark:bg-gray-700 absolute transition-all duration-[2500ms] ease-in-out"
                    :class="{
                        'opacity-100 scale-100': !item.isActive,
                        'opacity-0 scale-75': item.isActive
                    }" />

                <!-- Black filled circle (fades in when active) -->
                <div v-if="item.type === 'filled'"
                    class="w-2 h-2 md:w-2 md:h-2 rounded-full bg-primary-black dark:bg-primary-white absolute transition-all duration-[2500ms] ease-in-out"
                    :class="{
                        'opacity-100 scale-100': item.isActive,
                        'opacity-0 scale-75': !item.isActive
                    }" />

                <!-- Asterisk (fades in when active) -->
                <div v-if="item.type === 'asterisk'"
                    class="flex items-center justify-center w-2 h-2 md:w-3 md:h-3 text-primary-black dark:text-primary-white absolute transition-all duration-[2500ms] ease-in-out"
                    :class="{
                        'opacity-100 scale-100': item.isActive,
                        'opacity-0 scale-75': !item.isActive
                    }">
                    <span class="text-base md:text-2xl font-bold leading-none">*</span>
                </div>
            </div>
        </div>
    </div>
</template>
