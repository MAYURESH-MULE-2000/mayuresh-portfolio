<script setup>
defineProps({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

const parseContent = (text) => {
    if (!text) return ''
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
}
</script>

<template>
    <section class="mb-16">
        <h2 class="text-2xl md:text-3xl font-bold mb-6">{{ title }}</h2>
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl whitespace-pre-line"
            v-html="parseContent(content)">
        </p>
    </section>
</template>
