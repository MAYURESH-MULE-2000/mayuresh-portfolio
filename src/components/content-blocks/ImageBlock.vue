<script setup>
import ImageWithLightbox from '../ImageWithLightbox.vue'

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
        <ImageWithLightbox :src="image" :alt="alt" />
        <p v-if="caption" class="text-xs font-medium text-gray-400 dark:text-gray-500 mt-4 text-center italic">
            // {{ caption }}
        </p>
    </section>
</template>
