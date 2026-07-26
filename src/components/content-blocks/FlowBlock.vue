<script setup>
import { parseRichText } from '../../lib/richText'

const props = defineProps({
    title: { type: String, default: '' },
    caption: { type: String, default: '' },
    orientation: { type: String, default: 'horizontal' },
    steps: { type: Array, required: true },
})

const isVertical = props.orientation === 'vertical'
</script>

<template>
    <section class="mb-16">
        <h2 v-if="title" class="text-2xl md:text-3xl font-bold mb-6">{{ title }}</h2>
        <p v-if="caption" class="text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mb-8"
            v-html="parseRichText(caption)"></p>

        <ol class="flex flex-wrap -m-1.5">
            <li
                v-for="(step, index) in steps"
                :key="step.label"
                class="p-1.5 flex items-stretch"
                :class="isVertical
                    ? 'basis-full flex-col'
                    : 'basis-full sm:basis-1/2 lg:basis-1/3 flex-col sm:flex-row'"
            >
                <div
                    class="flex-1 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.02] p-5 md:p-6 transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-700 hover:-translate-y-0.5"
                >
                    <span
                        class="inline-flex items-center justify-center h-7 w-7 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-black mb-3"
                    >
                        {{ index + 1 }}
                    </span>
                    <p class="font-bold text-[15px] md:text-base leading-snug mb-1.5">{{ step.label }}</p>
                    <p v-if="step.detail" class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                        v-html="parseRichText(step.detail)"></p>
                    <span
                        v-if="step.note"
                        class="inline-block mt-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest whitespace-nowrap bg-gray-100 dark:bg-white/[0.06] text-gray-500 dark:text-gray-400"
                    >
                        {{ step.note }}
                    </span>
                </div>

                <!-- Connector -->
                <div
                    v-if="index < steps.length - 1"
                    class="flex items-center justify-center text-gray-300 dark:text-gray-700 shrink-0"
                    :class="isVertical ? 'h-6' : 'h-6 sm:h-auto sm:w-8'"
                    aria-hidden="true"
                >
                    <svg
                        class="h-4 w-4"
                        :class="isVertical ? 'rotate-90' : 'rotate-90 sm:rotate-0'"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </li>
        </ol>
    </section>
</template>
