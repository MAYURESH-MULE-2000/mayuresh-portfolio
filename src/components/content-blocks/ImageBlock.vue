<script setup>
defineProps({
    image: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        default: 'Project image'
    },
    caption: {
        type: String,
        default: ''
    }
})
</script>

<template>
    <section class="mb-16">
        <div class="aspect-video bg-gray-200 dark:bg-gray-800 rounded-3xl overflow-hidden">
            <img :src="image" :alt="alt" class="w-full h-full object-cover" />
        </div>
        <p v-if="caption" class="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
            {{ caption }}
        </p>
    </section>
</template>
