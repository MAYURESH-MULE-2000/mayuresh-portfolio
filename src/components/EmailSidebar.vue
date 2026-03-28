<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Copy, Check } from 'lucide-vue-next'

const email = 'uxmayuresh@gmail.com'
const copied = ref(false)
const isReading = ref(false)
let handler = null

const copyEmail = async () => {
    try {
        await navigator.clipboard.writeText(email)
        copied.value = true
        setTimeout(() => { copied.value = false }, 2000)
    } catch (err) {
        console.error('Failed to copy:', err)
    }
}

onMounted(() => {
  handler = (e) => { isReading.value = e.detail.active }
  window.addEventListener('pmcase-reading', handler)
})

onUnmounted(() => {
  if (handler) window.removeEventListener('pmcase-reading', handler)
})
</script>

<template>
    <aside
      class="fixed right-0 bottom-0 z-40 hidden md:block px-8 transition-transform duration-500 ease-in-out"
      :class="isReading ? 'translate-x-full' : 'translate-x-0'"
    >
        <div class="flex flex-col items-center gap-4">
            <!-- Email text (vertical, clickable to copy) -->
            <button @click="copyEmail"
                class="text-sm tracking-wide hover:text-primary-black dark:hover:text-primary-white transition-colors cursor-pointer"
                style="writing-mode: vertical-rl; text-orientation: mixed;">
                {{ email }}
            </button>

            <!-- Copy icon (small, same size as text) -->
            <button @click="copyEmail" class="hover:text-primary-black dark:hover:text-primary-white transition-colors"
                aria-label="Copy email">
                <Check v-if="copied" :size="14" class="text-green-500" />
                <Copy v-else :size="14" class="text-gray-600 dark:text-gray-400" />
            </button>

            <!-- Vertical line -->
            <div class="w-px h-16 bg-primary-black dark:bg-gray-600"></div>
        </div>
    </aside>
</template>
