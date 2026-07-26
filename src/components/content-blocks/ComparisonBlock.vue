<script setup>
import { parseRichText } from '../../lib/richText'

defineProps({
    title: { type: String, default: '' },
    caption: { type: String, default: '' },
    columns: { type: Array, required: true },
})

const toneStyles = {
    positive: {
        card: 'border-emerald-300/70 dark:border-emerald-700/60 bg-emerald-50/60 dark:bg-emerald-900/10',
        verdict: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
        dot: 'bg-emerald-500',
    },
    negative: {
        card: 'border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.02] opacity-90',
        verdict: 'bg-rose-500/15 text-rose-600 dark:text-rose-300',
        dot: 'bg-rose-400',
    },
    neutral: {
        card: 'border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.02]',
        verdict: 'bg-gray-100 dark:bg-white/[0.06] text-gray-600 dark:text-gray-300',
        dot: 'bg-gray-400',
    },
}

const styleFor = (tone) => toneStyles[tone] || toneStyles.neutral
</script>

<template>
    <section class="mb-16">
        <h2 v-if="title" class="text-2xl md:text-3xl font-bold mb-6">{{ title }}</h2>
        <p v-if="caption" class="text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mb-8"
            v-html="parseRichText(caption)"></p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 items-start">
            <div
                v-for="column in columns"
                :key="column.label"
                class="rounded-2xl border p-6 md:p-7 h-full transition-all duration-300 hover:-translate-y-0.5"
                :class="styleFor(column.tone).card"
            >
                <div class="flex items-start justify-between gap-3 mb-5">
                    <h3 class="font-bold text-base md:text-lg leading-snug">{{ column.label }}</h3>
                    <span
                        v-if="column.verdict"
                        class="shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
                        :class="styleFor(column.tone).verdict"
                    >
                        {{ column.verdict }}
                    </span>
                </div>

                <ul class="space-y-3">
                    <li v-for="item in column.items" :key="item" class="flex gap-2.5 text-sm leading-relaxed">
                        <span class="mt-2 h-1.5 w-1.5 rounded-full shrink-0" :class="styleFor(column.tone).dot"></span>
                        <span class="text-gray-700 dark:text-gray-300" v-html="parseRichText(item)"></span>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>
