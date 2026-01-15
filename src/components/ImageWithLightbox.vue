<script setup>
import { inject } from 'vue'

const props = defineProps({
    src: { type: String, required: true },
    alt: { type: String, default: 'Image' },
    className: { type: String, default: '' }
})

const lightbox = inject('lightbox')

function openLightbox() {
    lightbox.currentSrc = props.src
    lightbox.currentAlt = props.alt
    lightbox.isOpen = true
}
</script>

<template>
    <div class="relative group cursor-zoom-in overflow-hidden rounded-3xl border border-gray-100 dark:border-gray-800" @click="openLightbox">
        <img 
            :src="src" 
            :alt="alt" 
            class="w-full h-auto block transition-transform duration-500 group-hover:scale-105" 
            :class="className"
            loading="lazy" 
        />
        
        <div class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div class="bg-white/90 dark:bg-black/90 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                Click to expand
            </div>
        </div>
    </div>
</template>
