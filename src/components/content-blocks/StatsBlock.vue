<script setup>
defineProps({
    stats: {
        type: Array,
        required: true
        // Format: [{ value, label }]
    }
})
</script>

<template>
    <section class="mb-16">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div v-for="(stat, index) in stats" :key="index" class="text-center md:text-left">
                <div class="text-4xl md:text-5xl font-bold mb-2">{{ stat.value }}</div>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ stat.label }}</p>
            </div>
        </div>
    </section>
</template>
