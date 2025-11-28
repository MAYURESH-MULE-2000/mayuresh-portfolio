<script setup>
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
                <h2 class="text-2xl md:text-3xl font-bold mb-6">{{ title }}</h2>
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {{ content }}
                </p>
            </div>

            <!-- Right: Image -->
            <div class="aspect-video bg-gray-200 dark:bg-gray-800 rounded-3xl overflow-hidden">
                <img :src="image" alt="" class="w-full h-full object-cover" />
            </div>
        </div>
    </section>
</template>
