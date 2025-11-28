<script setup>
import { ref, onMounted } from 'vue'
import { Moon, Sun } from 'lucide-vue-next'

const isDark = ref(false)

// Check saved theme preference on mount
onMounted(() => {
    if (typeof window !== 'undefined') {
        // Check localStorage or system preference
        const savedTheme = localStorage.getItem('theme')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

        isDark.value = savedTheme === 'dark' || (!savedTheme && prefersDark)

        // Apply theme
        if (isDark.value) {
            document.documentElement.classList.add('dark')
        }
    }
})

const toggleTheme = () => {
    isDark.value = !isDark.value

    if (isDark.value) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
    } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
    }
}
</script>

<template>
    <button @click="toggleTheme" class="flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
        aria-label="Toggle theme">
        <!-- Text: Hidden on mobile, visible on desktop -->
        <!-- <span class="hidden md:inline text-gray-600 dark:text-gray-400">
            {{ isDark ? 'Click here for light theme!' : 'Click here for dark theme!' }}
        </span> -->

        <!-- Theme icon (always visible) -->
        <div class="w-6 h-6 flex items-center justify-center">
            <Moon v-if="!isDark" :size="20" class="text-primary-black" />
            <Sun v-else :size="20" class="text-primary-white" />
        </div>
    </button>
</template>
