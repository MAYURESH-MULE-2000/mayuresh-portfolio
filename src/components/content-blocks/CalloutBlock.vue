<script setup>
import { Lightbulb, AlertTriangle, Info } from 'lucide-vue-next'
import { parseRichText } from '../../lib/richText'

const props = defineProps({
    variant: { type: String, default: 'insight' },
    title: { type: String, default: '' },
    content: { type: String, required: true },
})

const variants = {
    insight: {
        icon: Lightbulb,
        wrap: 'border-indigo-200 dark:border-indigo-800/60 bg-indigo-50/70 dark:bg-indigo-900/10',
        badge: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-300',
    },
    warning: {
        icon: AlertTriangle,
        wrap: 'border-amber-200 dark:border-amber-800/60 bg-amber-50/70 dark:bg-amber-900/10',
        badge: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
    },
    note: {
        icon: Info,
        wrap: 'border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-white/[0.02]',
        badge: 'bg-gray-500/15 text-gray-600 dark:text-gray-300',
    },
}

const style = variants[props.variant] || variants.insight
</script>

<template>
    <section class="mb-16">
        <div class="rounded-2xl border p-6 md:p-8 flex gap-4 md:gap-5" :class="style.wrap">
            <div class="shrink-0 h-10 w-10 rounded-xl flex items-center justify-center" :class="style.badge">
                <component :is="style.icon" :size="20" />
            </div>
            <div class="min-w-0">
                <h3 v-if="title" class="font-bold text-base md:text-lg leading-snug mb-2">{{ title }}</h3>
                <p class="text-sm md:text-[15px] text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line"
                    v-html="parseRichText(content)"></p>
            </div>
        </div>
    </section>
</template>
