<script setup>
import { ref } from 'vue'
import { LucideX } from 'lucide-vue-next'

defineProps({
    src: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        default: 'Image'
    },
    className: {
        type: String,
        default: ''
    }
})

const isOpen = ref(false)

const openLightbox = () => {
    isOpen.value = true
    document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
    isOpen.value = false
    document.body.style.overflow = 'auto'
}
</script>

<template>
    <div class="relative group cursor-zoom-in overflow-hidden rounded-3xl border border-gray-100 dark:border-gray-800" @click="openLightbox">
        <img :src="src" :alt="alt" :class="['w-full h-auto block transition-transform duration-500 group-hover:scale-105', className]" />
        
        <!-- Hover Overlay Hint -->
        <div class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div class="bg-white/90 dark:bg-black/90 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                Click to expand
            </div>
        </div>

        <!-- Lightbox -->
        <Teleport to="body">
            <Transition
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="opacity-0 scale-95"
                enter-to-class="opacity-100 scale-100"
                leave-active-class="transition duration-200 ease-in"
                leave-from-class="opacity-100 scale-100"
                leave-to-class="opacity-0 scale-95"
            >
                <div v-if="isOpen" class="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-12 cursor-default" @click="closeLightbox">
                    <!-- Background Backdrop -->
                    <div class="absolute inset-0 bg-black/95 backdrop-blur-sm"></div>
                    
                    <!-- Close Button -->
                    <button 
                        @click.stop="closeLightbox"
                        class="fixed top-8 right-8 z-[10000] p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
                        title="Close"
                    >
                        <LucideX :size="32" />
                    </button>

                    <!-- Fullscreen Image -->
                    <div class="relative z-[10000] w-full h-full flex items-center justify-center p-4" @click.stop="closeLightbox">
                        <img 
                            :src="src" 
                            :alt="alt" 
                            class="max-w-full max-h-full object-contain shadow-2xl rounded-lg animate-in fade-in zoom-in duration-300 pointer-events-none" 
                        />
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<style scoped>
.cursor-zoom-in {
    cursor: zoom-in;
}
</style>
