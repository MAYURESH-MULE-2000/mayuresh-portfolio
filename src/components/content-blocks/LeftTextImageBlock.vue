<script setup>
import ImageWithLightbox from '../ImageWithLightbox.vue'

defineProps({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})
</script>

<template>
    <section class="mb-16">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <!-- Left: Text -->
            <div>
                <h2 class="text-2xl md:text-3xl font-bold mb-6 tracking-tight">{{ title }}</h2>
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {{ content }}
                </p>
            </div>

            <!-- Right: Image -->
            <ImageWithLightbox :src="image" :alt="title" />
        </div>
    </section>
</template>
