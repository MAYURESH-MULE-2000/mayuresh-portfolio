<script setup>
defineProps({
    prevLink: {
        type: String,
        default: ''
    },
    prevTitle: {
        type: String,
        default: ''
    },
    nextLink: {
        type: String,
        default: ''
    },
    nextTitle: {
        type: String,
        default: ''
    }
})
</script>

<template>
    <section class="mb-16">
        <div class="flex justify-between items-center border-t border-gray-200 dark:border-gray-800 pt-8">
            <!-- Previous -->
            <a v-if="prevLink" :href="prevLink" class="group flex flex-col">
                <span class="text-sm text-gray-500 dark:text-gray-400 mb-1">Prev</span>
                <span class="font-medium group-hover:underline">{{ prevTitle }}</span>
            </a>
            <div v-else></div>

            <!-- Next -->
            <a v-if="nextLink" :href="nextLink" class="group flex flex-col text-right">
                <span class="text-sm text-gray-500 dark:text-gray-400 mb-1">Next</span>
                <span class="font-medium group-hover:underline">{{ nextTitle }}</span>
            </a>
            <div v-else></div>
        </div>
    </section>
</template>
