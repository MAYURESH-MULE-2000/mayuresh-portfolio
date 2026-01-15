<script setup>
import * as LucideIcons from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps({
    stats: {
        type: Array,
        required: true
    }
})

const getIcon = (name) => {
    return LucideIcons[name] || LucideIcons.BarChart3
}
</script>

<template>
    <section class="mb-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div v-for="(stat, index) in stats" :key="index" 
                class="group relative p-6 md:p-8 rounded-[2rem] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden h-full flex flex-col">
                <!-- Subtle Vertical Accent -->
                <div class="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary-teal to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div class="relative z-10 flex flex-col h-full">
                    <!-- Icon -->
                    <div class="mb-8 p-3 w-fit rounded-2xl bg-gray-50 dark:bg-gray-800 text-gray-400 group-hover:text-primary-teal group-hover:bg-primary-teal/10 transition-all duration-500">
                        <component :is="getIcon(stat.icon)" :size="20" />
                    </div>

                    <div class="mb-1">
                        <div class="text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-br from-gray-900 via-gray-700 to-gray-500 dark:from-white dark:via-gray-200 dark:to-gray-400 tracking-tighter uppercase leading-none">
                            {{ stat.value }}
                        </div>
                    </div>
                    
                    <p class="text-[9px] font-extrabold uppercase tracking-[0.25em] text-gray-400 dark:text-gray-500 mb-6">
                        {{ stat.label }}
                    </p>
                    
                    <p v-if="stat.description" class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mt-auto font-medium">
                        {{ stat.description }}
                    </p>
                </div>

                <!-- Hover Backdrop Glow -->
                <div class="absolute -right-8 -bottom-8 w-32 h-32 bg-primary-teal/5 dark:bg-primary-teal/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
        </div>
    </section>
</template>
