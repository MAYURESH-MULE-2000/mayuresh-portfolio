<script setup>
defineProps({
    sections: {
        type: Array,
        required: true,
        // Format: [{ title, content }]
    },
    sidebar: {
        type: Object,
        required: true,
        // Format: { role: [], team: [], duration }
    }
})
</script>

<template>
    <section class="mb-16">
        <h2 class="text-2xl md:text-3xl font-bold mb-8">Overview</h2>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <!-- Left: Content Sections -->
            <div class="lg:col-span-2 space-y-8">
                <div v-for="(section, index) in sections" :key="index">
                    <h3 class="text-xl font-bold mb-3">{{ section.title }}</h3>
                    <p class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                        {{ section.content }}
                    </p>
                </div>
            </div>

            <!-- Right: Sidebar Info -->
            <div class="space-y-8">
                <!-- Role -->
                <div v-if="sidebar.role">
                    <h4 class="text-lg font-bold mb-2">Role</h4>
                    <ul class="space-y-1">
                        <li v-for="(item, index) in sidebar.role" :key="index"
                            class="text-sm text-gray-700 dark:text-gray-300">
                            • {{ item }}
                        </li>
                    </ul>
                </div>

                <!-- Team -->
                <div v-if="sidebar.team">
                    <h4 class="text-lg font-bold mb-2">Team</h4>
                    <ul class="space-y-1">
                        <li v-for="(member, index) in sidebar.team" :key="index"
                            class="text-sm text-gray-700 dark:text-gray-300">
                            • {{ member }}
                        </li>
                    </ul>
                </div>

                <!-- Duration -->
                <div v-if="sidebar.duration">
                    <h4 class="text-lg font-bold mb-2">Duration</h4>
                    <p class="text-sm text-gray-700 dark:text-gray-300">{{ sidebar.duration }}</p>
                </div>
            </div>
        </div>
    </section>
</template>
