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
    },
    video: {
        type: String,
        default: ''
    },
    liveUrl: {
        type: String,
        default: ''
    },
    liveLabel: {
        type: String,
        default: ''
    }
})

const hostOf = (url) => {
    try {
        return new URL(url).host.replace(/^www\./, '')
    } catch {
        return url
    }
}
</script>

<template>
    <div class="mb-12">
        <!-- Breadcrumb -->
        <a :href="backLink" class="text-sm text-gray-600 dark:text-gray-400 hover:underline mb-2 flex items-center gap-2">
            <LucideArrowLeft /> {{ backText }} 
        </a>
        <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h1 class="text-2xl font-bold">{{ title }}</h1>

            <a
                v-if="liveUrl"
                :href="liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 dark:border-gray-700 text-sm font-semibold hover:border-primary-black dark:hover:border-primary-white transition-all duration-300 shrink-0"
            >
                {{ liveLabel || hostOf(liveUrl) }}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transform group-hover:scale-125 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
            </a>
        </div>

        <!-- Hero Image/Video -->
        <div class="aspect-video bg-gray-200 dark:bg-gray-800 rounded-3xl overflow-hidden mb-4 relative">
            <video v-if="video" :src="video" autoplay loop muted playsinline class="w-full h-full object-cover"></video>
            <img v-else-if="image" :src="image" :alt="title" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                <span class="text-sm">{{ category }}</span>
            </div>
        </div>
    </div>
</template>
