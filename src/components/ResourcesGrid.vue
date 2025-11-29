<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    // [{ id, type, title, label, slug, thumbnail }]
    items: {
        type: Array,
        required: true,
    },
})

const activeFilter = ref('all')

const getRoutePath = (type, slug) => {
    // type: 'case-study' | 'project' | 'blog'
    return `/${type}/${slug}`
}

const filteredResources = computed(() => {
    if (!props.items || props.items.length === 0) return []
    if (activeFilter.value === 'all') return props.items
    return props.items.filter((r) => r.type === activeFilter.value)
})

const setFilter = (filter) => {
    activeFilter.value = filter
}
</script>

<template>
    <section class="py-12 md:py-16">
        <div class="max-w-7xl mx-auto">
            <!-- Header -->
            <div class="mb-12">
                <h1 class="text-4xl md:text-5xl font-bold mb-4">Resources</h1>
                <p class="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
                    We conducted a learnability study with novice users, that simulated real usage frequency.
                    Evaluated designs with experts, novices, and disabled individuals.
                </p>
            </div>

            <!-- Filter Tabs -->
            <div class="flex flex-wrap gap-3 mb-12">
                <button @click="setFilter('all')"
                    class="px-6 py-2 rounded-full transition-all duration-300 text-sm md:text-base" :class="activeFilter === 'all'
                            ? 'bg-gray-200 dark:bg-gray-800 text-primary-black dark:text-primary-white font-medium'
                            : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
                        ">
                    All
                </button>

                <button @click="setFilter('case-study')"
                    class="px-6 py-2 rounded-full transition-all duration-300 text-sm md:text-base" :class="activeFilter === 'case-study'
                            ? 'bg-gray-200 dark:bg-gray-800 text-primary-black dark:text-primary-white font-medium'
                            : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
                        ">
                    Case Study
                </button>

                <button @click="setFilter('project')"
                    class="px-6 py-2 rounded-full transition-all duration-300 text-sm md:text-base" :class="activeFilter === 'project'
                            ? 'bg-gray-200 dark:bg-gray-800 text-primary-black dark:text-primary-white font-medium'
                            : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
                        ">
                    Projects
                </button>

                <button @click="setFilter('blog')"
                    class="px-6 py-2 rounded-full transition-all duration-300 text-sm md:text-base" :class="activeFilter === 'blog'
                            ? 'bg-gray-200 dark:bg-gray-800 text-primary-black dark:text-primary-white font-medium'
                            : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
                        ">
                    Blogs
                </button>
            </div>

            <!-- Resources Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <a v-for="resource in filteredResources" :key="resource.id"
                    :href="getRoutePath(resource.type, resource.slug)" class="group cursor-pointer">
                    <div
                        class="aspect-video bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden mb-4 transition-all duration-300 group-hover:scale-[1.02]">
                        <img v-if="resource.thumbnail" :src="resource.thumbnail" :alt="resource.title"
                            class="w-full h-full object-cover" />
                        <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                            <span class="text-sm">{{ resource.title }}</span>
                        </div>
                    </div>

                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        {{ resource.label }}
                    </p>

                    <h3 class="text-xl font-semibold group-hover:underline transition-all">
                        {{ resource.title }}
                    </h3>
                </a>
            </div>

            <!-- Empty State -->
            <div v-if="filteredResources.length === 0" class="text-center py-20">
                <p class="text-lg text-gray-500 dark:text-gray-400">
                    No {{ activeFilter === 'all' ? 'resources' : activeFilter.replace('-', ' ') }} found.
                </p>
            </div>
        </div>
    </section>
</template>
