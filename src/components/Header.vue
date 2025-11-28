<script setup>
import ThemeToggle from './ThemeToggle.vue'
</script>

<template>
    <!-- Remove border-b class -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-light dark:bg-dark transition-colors duration-300">
        <div class="max-w-7xl mx-auto px-16 md:px-32 py-6 flex items-center justify-between">
            <!-- Left: Name/Logo -->
            <a href="/" class="text-2xl font-bold hover:opacity-70 transition-opacity">
                Mayuresh Mule.
            </a>

            <!-- Right: Theme Toggle -->
            <ThemeToggle />
        </div>
    </header>
</template>
