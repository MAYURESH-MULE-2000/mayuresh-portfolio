<script setup>
import { parseRichText } from '../../lib/richText'

defineProps({
    title: { type: String, default: '' },
    caption: { type: String, default: '' },
    items: { type: Array, required: true },
})
</script>

<template>
    <section class="mb-16">
        <h2 v-if="title" class="text-2xl md:text-3xl font-bold mb-6">{{ title }}</h2>
        <p v-if="caption" class="text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mb-8"
            v-html="parseRichText(caption)"></p>

        <ol class="relative pl-8 md:pl-10">
            <!-- Spine -->
            <span
                class="absolute left-[7px] md:left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-gray-300 via-gray-200 to-transparent dark:from-gray-700 dark:via-gray-800"
                aria-hidden="true"
            ></span>

            <li v-for="item in items" :key="item.marker + item.title" class="relative pb-8 last:pb-0 group">
                <!-- Node -->
                <span
                    class="absolute -left-8 md:-left-10 top-1.5 h-4 w-4 rounded-full border-2 transition-all duration-300"
                    :class="item.status === 'next'
                        ? 'bg-transparent border-gray-300 dark:border-gray-600'
                        : 'bg-gray-900 border-gray-900 dark:bg-white dark:border-white group-hover:scale-125'"
                ></span>

                <div class="flex flex-wrap items-center gap-2 mb-1.5">
                    <span class="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                        {{ item.marker }}
                    </span>
                    <span
                        v-if="item.status === 'next'"
                        class="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-gray-100 dark:bg-white/[0.06] text-gray-500 dark:text-gray-400"
                    >
                        Planned
                    </span>
                </div>

                <h3 class="font-bold text-base md:text-lg leading-snug mb-1.5">{{ item.title }}</h3>
                <p v-if="item.description" class="text-sm md:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl"
                    v-html="parseRichText(item.description)"></p>
            </li>
        </ol>
    </section>
</template>
