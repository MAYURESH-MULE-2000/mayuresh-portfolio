<script setup>
import ImageWithLightbox from '../ImageWithLightbox.vue'

defineProps({
    images: {
        type: Array,
        required: true
        // Format: [{ src, alt }]
    },
    columns: {
        type: Number,
        default: 2
    }
})
</script>

<template>
    <section class="mb-16">
        <div class="grid gap-6" :class="{
            'grid-cols-1 md:grid-cols-2': columns === 2,
            'grid-cols-1 md:grid-cols-3': columns === 3,
            'grid-cols-1 md:grid-cols-4': columns === 4
        }">
            <div v-for="(image, index) in images" :key="index">
                <ImageWithLightbox :src="image.src" :alt="image.alt || 'Image'" className="aspect-square object-cover" />
            </div>
        </div>
    </section>
</template>
