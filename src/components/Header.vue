<script setup>
import ThemeToggle from './ThemeToggle.vue'
import AudioPlayer from './AudioPlayer.vue'

const props = defineProps({
  audioFile: {
    type: String,
    default: null,
  },
})
</script>

<template>
    <!-- Remove border-b class -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-light dark:bg-dark transition-colors duration-300">
        <div class="max-w-7xl mx-auto px-16 md:px-32 py-4 md:py-6">
            <!-- Desktop/Tablet Layout -->
            <div class="hidden md:flex items-center justify-between gap-4">
                <!-- Left: Name/Logo -->
                <a href="/" class="text-2xl font-bold hover:opacity-70 transition-opacity flex-shrink-0">
                    Mayuresh Mule.
                </a>

                <!-- Right: Audio Player + Theme Toggle -->
                <div class="flex items-center gap-4">
                    <!-- Audio Player (if audio file provided) -->
                    <AudioPlayer v-if="audioFile" :audioSrc="audioFile" />

                    <!-- Theme Toggle -->
                    <ThemeToggle class="flex-shrink-0" />
                </div>
            </div>

            <!-- Mobile Layout -->
            <div class="md:hidden">
                <!-- Top Row: Logo and Theme Toggle -->
                <div class="flex items-center justify-between mb-2">
                    <a href="/" class="text-xl font-bold hover:opacity-70 transition-opacity">
                        Mayuresh Mule.
                    </a>
                    <ThemeToggle />
                </div>

                <!-- Bottom Row: Audio Player (if audio file provided) -->
                <AudioPlayer v-if="audioFile" :audioSrc="audioFile" />
            </div>
        </div>
    </header>
</template>
