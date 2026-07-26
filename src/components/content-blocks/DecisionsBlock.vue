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

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <article
                v-for="item in items"
                :key="item.decision"
                class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.02] p-6 md:p-7 transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-700 hover:-translate-y-0.5"
            >
                <h3 class="font-bold text-[15px] md:text-base leading-snug mb-5" v-html="parseRichText(item.decision)"></h3>

                <div class="space-y-4">
                    <div class="flex gap-3">
                        <span class="mt-0.5 text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 w-20 shrink-0">
                            Trade-off
                        </span>
                        <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1"
                            v-html="parseRichText(item.tradeoff)"></p>
                    </div>
                    <div class="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                        <span class="mt-0.5 text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 w-20 shrink-0">
                            Why
                        </span>
                        <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-1"
                            v-html="parseRichText(item.why)"></p>
                    </div>
                </div>
            </article>
        </div>
    </section>
</template>
