<script setup>
import { ref } from 'vue'

const props = defineProps({
    src: { type: String, required: true },
    alt: { type: String, default: 'Image' },
    className: { type: String, default: '' }
})

const showLightbox = ref(false)

function open() {
    showLightbox.value = true
    document.body.style.overflow = 'hidden'
}

function close() {
    showLightbox.value = false
    document.body.style.overflow = ''
}
</script>

<template>
    <!-- Thumbnail -->
    <div class="relative group cursor-zoom-in overflow-hidden rounded-3xl border border-gray-100 dark:border-gray-800" @click="open">
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

    <!-- Lightbox Modal (inline, no teleport) -->
    <div 
        v-if="showLightbox"
        class="fixed inset-0 z-[99999] bg-black/95 flex items-center justify-center p-4"
        @click="close"
        @keydown.esc="close"
        tabindex="0"
    >
        <button 
            @click.stop="close"
            class="absolute top-4 right-4 text-white text-4xl font-light hover:bg-white/10 w-12 h-12 rounded-full flex items-center justify-center"
            aria-label="Close"
        >
            ×
        </button>

        <img 
            :src="src" 
            :alt="alt" 
            class="max-w-full max-h-[90vh] object-contain"
            @click.stop="close"
        />
    </div>
</template>
