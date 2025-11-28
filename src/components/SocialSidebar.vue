<script setup>
import { Instagram, FileText, Linkedin , Globe } from 'lucide-vue-next'
// import UnicornIcon from './icons/UnicornIcon.vue'
</script>

<template>
    <aside class="fixed left-0 bottom-0 z-40 hidden md:block px-8">
        <div class="flex flex-col items-center gap-4">
            <!-- Instagram -->
            <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer"
                class="w-12 h-12 rounded-full border-2 border-primary-black dark:border-primary-white flex items-center justify-center hover:bg-primary-black hover:dark:bg-primary-white transition-all duration-300 group"
                aria-label="Instagram">
                <Instagram :size="20"
                    class="text-primary-black dark:text-primary-white group-hover:text-primary-white group-hover:dark:text-primary-black transition-colors" />
            </a>

            <!-- Resume/CV -->
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
                class="w-12 h-12 rounded-full border-2 border-primary-black dark:border-primary-white flex items-center justify-center hover:bg-primary-black hover:dark:bg-primary-white transition-all duration-300 group"
                aria-label="Resume">
                <FileText :size="20"
                    class="text-primary-black dark:text-primary-white group-hover:text-primary-white group-hover:dark:text-primary-black transition-colors" />
            </a>

            <!-- Unicorn Website -->
            <a href="https://yourwebsite.com" target="_blank" rel="noopener noreferrer"
                class="w-12 h-12 rounded-full border-2 border-primary-black dark:border-primary-white flex items-center justify-center hover:bg-primary-black hover:dark:bg-primary-white transition-all duration-300 group"
                aria-label="My Website">
                <Globe :size="20"
                    class="text-primary-black dark:text-primary-white group-hover:text-primary-white group-hover:dark:text-primary-black transition-colors" />
            </a>

            <!-- LinkedIn -->
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer"
                class="w-12 h-12 rounded-full border-2 border-primary-black dark:border-primary-white flex items-center justify-center hover:bg-primary-black hover:dark:bg-primary-white transition-all duration-300 group"
                aria-label="LinkedIn">
                <Linkedin :size="20"
                    class="text-primary-black dark:text-primary-white group-hover:text-primary-white group-hover:dark:text-primary-black transition-colors" />
            </a>

            <!-- Vertical line -->
            <div class="w-px h-16 bg-primary-black dark:bg-gray-600"></div>
        </div>
    </aside>
</template>
