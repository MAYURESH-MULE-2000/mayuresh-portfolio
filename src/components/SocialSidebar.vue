<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Instagram, FileText, Linkedin, BookOpen } from 'lucide-vue-next'

const isReading = ref(false)
let handler = null

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
      class="fixed left-0 bottom-0 z-40 hidden md:block px-8 transition-transform duration-500 ease-in-out"
      :class="isReading ? '-translate-x-full' : 'translate-x-0'"
    >
        <div class="flex flex-col items-center gap-4">

            <!-- LinkedIn -->
            <a href="https://www.linkedin.com/in/mayuresh-mule/" target="_blank" rel="noopener noreferrer"
                class="w-12 h-12 rounded-full border-2 border-primary-black dark:border-primary-white flex items-center justify-center hover:bg-primary-black hover:dark:bg-primary-white transition-all duration-300 group"
                aria-label="LinkedIn">
                <Linkedin :size="20"
                    class="text-primary-black dark:text-primary-white group-hover:text-primary-white group-hover:dark:text-primary-black transition-colors" />
            </a>

            <!-- Resume/CV -->
            <a href="/Mayuresh_Mule_26_7_26.pdf" target="_blank" rel="noopener noreferrer"
                class="w-12 h-12 rounded-full border-2 border-primary-black dark:border-primary-white flex items-center justify-center hover:bg-primary-black hover:dark:bg-primary-white transition-all duration-300 group"
                aria-label="Resume">
                <FileText :size="20"
                    class="text-primary-black dark:text-primary-white group-hover:text-primary-white group-hover:dark:text-primary-black transition-colors" />
            </a>

            <!-- Journal -->
            <a href="/journal"
                class="relative w-12 h-12 rounded-full border-2 border-primary-black dark:border-primary-white flex items-center justify-center hover:bg-primary-black hover:dark:bg-primary-white transition-all duration-300 hover:-translate-y-0.5 group"
                aria-label="Read my journal">
                <BookOpen :size="20"
                    class="text-primary-black dark:text-primary-white group-hover:text-primary-white group-hover:dark:text-primary-black transition-all duration-300 group-hover:rotate-[-8deg]" />
                <!-- New-series dot -->
                <span class="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5" aria-hidden="true">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                    <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal-500"></span>
                </span>
                <!-- Label on hover -->
                <span
                    class="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-lg bg-primary-black dark:bg-primary-white px-2.5 py-1 text-[11px] font-semibold text-primary-white dark:text-primary-black opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    Journal
                </span>
            </a>

            <!-- Instagram -->
            <a href="https://www.instagram.com/mayuresh.mule/?igsh=MTJsdWptdzF3dWlvbg%3D%3D#" target="_blank"
                rel="noopener noreferrer"
                class="w-12 h-12 rounded-full border-2 border-primary-black dark:border-primary-white flex items-center justify-center hover:bg-primary-black hover:dark:bg-primary-white transition-all duration-300 group"
                aria-label="Instagram">
                <Instagram :size="20"
                    class="text-primary-black dark:text-primary-white group-hover:text-primary-white group-hover:dark:text-primary-black transition-colors" />
            </a>

            <!-- Vertical line -->
            <div class="w-px h-16 bg-primary-black dark:bg-gray-600"></div>
        </div>
    </aside>
</template>
