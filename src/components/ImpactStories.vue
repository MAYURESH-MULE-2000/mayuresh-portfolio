<script setup>
import { ref, onMounted } from 'vue'

const featuredContent = ref([])

onMounted(async () => {
    try {
        const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337'

        const [caseStudies, projects, blogs] = await Promise.all([
            fetch(`${STRAPI_URL}/api/case-studies?populate=heroImage`).then(r => r.json()),
            fetch(`${STRAPI_URL}/api/projects?populate=heroImage`).then(r => r.json()),
            fetch(`${STRAPI_URL}/api/blogs?populate=heroImage`).then(r => r.json()),
        ])

        const allContent = [
            ...caseStudies.data.map(item => ({ ...item.attributes, route: 'case-study' })),
            ...projects.data.map(item => ({ ...item.attributes, route: 'project' })),
            ...blogs.data.map(item => ({ ...item.attributes, route: 'blog' }))
        ]

        // Get first 4
        featuredContent.value = allContent.slice(0, 4).map(item => ({
            id: item.slug,
            title: item.title,
            label: item.category,
            slug: item.slug,
            thumbnail: item.heroImage?.data?.attributes?.url
                ? `${STRAPI_URL}${item.heroImage.data.attributes.url}`
                : '',
            route: item.route
        }))
    } catch (error) {
        console.error('Error fetching featured content:', error)
    }
})
</script>


<template>
    <section class="py-16 md:py-24">
        <div class="max-w-7xl mx-auto">
            <!-- Section Header with Dashed Line + Asterisk -->
            <div class="relative mb-12 md:mb-16">
                <div class="flex items-center justify-between">
                    <!-- Left: Impact Stories Title -->
                    <h2 class="text-3xl md:text-4xl font-bold">Impact Stories</h2>
                </div>
            </div>

            <!-- Content Grid (2x2) - Mixed: Case Studies, Projects, Blogs -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
                <a v-for="item in featuredContent" :key="item.id" :href="`/${item.route}/${item.slug}`"
                    class="group cursor-pointer">
                    <!-- Thumbnail -->
                    <div
                        class="aspect-video bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden mb-4 transition-all duration-300 group-hover:scale-[1.02]">
                        <img v-if="item.thumbnail" :src="item.thumbnail" :alt="item.title"
                            class="w-full h-full object-cover" />
                        <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                            <span class="text-sm">{{ item.title }}</span>
                        </div>
                    </div>

                    <!-- Label -->
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        {{ item.label }}
                    </p>

                    <!-- Title -->
                    <h3 class="text-xl font-semibold group-hover:underline transition-all">
                        {{ item.title }}
                    </h3>
                </a>
            </div>

            <!-- View All Button -->
            <div class="flex justify-center">
                <a href="/resources"
                    class="px-8 py-3 bg-primary-black dark:bg-primary-white text-primary-white dark:text-primary-black rounded-md font-medium hover:opacity-80 transition-all duration-300">
                    View all stories
                </a>
            </div>
        </div>
    </section>
</template>
