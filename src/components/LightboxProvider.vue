<script setup>
import { provide, reactive, watch, ref, onMounted } from 'vue'

// Global lightbox state shared by all images
const lightbox = reactive({
    isOpen: false,
    currentSrc: '',
    currentAlt: ''
})

const isMounted = ref(false)

onMounted(() => {
    isMounted.value = true
})

// Manage body scroll lock
watch(() => lightbox.isOpen, (isOpen) => {
    if (typeof document !== 'undefined') {
        document.body.style.overflow = isOpen ? 'hidden' : ''
    }
})

provide('lightbox', lightbox)
</script>

<template>
    <slot />
    
    <!-- Teleport to body to avoid insertBefore errors in island fragments -->
    <Teleport to="body" v-if="isMounted">
        <div 
            v-if="lightbox.isOpen"
            class="fixed inset-0 z-[99999] bg-black/95 flex items-center justify-center p-4 transition-opacity duration-200"
            @click="lightbox.isOpen = false"
        >
            <button 
                @click.stop="lightbox.isOpen = false"
                class="absolute top-4 right-4 text-white text-4xl font-light hover:bg-white/10 w-12 h-12 rounded-full flex items-center justify-center"
                aria-label="Close"
            >
                ×
            </button>

            <img 
                :src="lightbox.currentSrc" 
                :alt="lightbox.currentAlt" 
                class="max-w-full max-h-[90vh] object-contain select-none"
                @click.stop="lightbox.isOpen = false"
            />
        </div>
    </Teleport>
</template>
