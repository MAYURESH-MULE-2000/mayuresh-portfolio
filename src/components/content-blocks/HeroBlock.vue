<script setup>
import { LucideArrowLeft } from 'lucide-vue-next'
defineProps({
    backLink: {
        type: String,
        default: '/resources'
    },
    backText: {
        type: String,
        default: 'Back to all resources'
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'Case Study'
    },
    image: {
        type: String,
        default: ''
    }
})
</script>

<template>
    <div class="mb-12">
        <!-- Breadcrumb -->
        <a :href="backLink" class="text-sm text-gray-600 dark:text-gray-400 hover:underline mb-2 flex items-center gap-2">
            <LucideArrowLeft /> {{ backText }} 
        </a>
        <h1 class="text-2xl font-bold mb-6">{{ title }}</h1>

        <!-- Hero Image -->
        <div class="aspect-video bg-gray-200 dark:bg-gray-800 rounded-3xl overflow-hidden mb-4">
            <img v-if="image" :src="image" :alt="title" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                <span class="text-sm">{{ category }}</span>
            </div>
        </div>
    </div>
</template>
