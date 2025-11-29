<script setup>
import { computed } from 'vue'

const props = defineProps({
    items: {
        type: Array,
        required: false,
        default: () => [],
    },
})

const featuredContent = computed(() => {
    const list = props.items ?? []
    return list.slice(0, 4)
})
</script>

<template>
    <section class="py-16 md:py-24">
        <div class="max-w-7xl mx-auto">
            <div class="relative mb-12 md:mb-16">
                <div class="flex items-center justify-between">
                    <h2 class="text-3xl md:text-4xl font-bold">Impact Stories</h2>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
                <a v-for="item in featuredContent" :key="item.id" :href="`/${item.type}/${item.slug}`"
                    class="group cursor-pointer">
                    <div
                        class="aspect-video bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden mb-4 transition-all duration-300 group-hover:scale-[1.02]">
                        <img v-if="item.thumbnail" :src="item.thumbnail" :alt="item.title"
                            class="w-full h-full object-cover" />
                        <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                            <span class="text-sm">{{ item.title }}</span>
                        </div>
                    </div>

                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        {{ item.label }}
                    </p>

                    <h3 class="text-xl font-semibold group-hover:underline transition-all">
                        {{ item.title }}
                    </h3>
                </a>
            </div>

            <div class="flex justify-center">
                <a href="/resources"
                    class="px-8 py-3 bg-primary-black dark:bg-primary-white text-primary-white dark:text-primary-black rounded-md font-medium hover:opacity-80 transition-all duration-300">
                    View all stories
                </a>
            </div>
        </div>
    </section>
</template>
