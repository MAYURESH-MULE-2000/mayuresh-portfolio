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
                :key="item.name"
                class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.02] p-6 md:p-7 transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-700 hover:-translate-y-0.5"
            >
                <div class="flex items-center gap-3 mb-5">
                    <div
                        class="h-11 w-11 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center font-black text-sm shrink-0"
                    >
                        {{ item.name.charAt(0) }}
                    </div>
                    <div class="min-w-0">
                        <h3 class="font-bold text-base leading-tight truncate">{{ item.name }}</h3>
                        <span v-if="item.tag" class="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                            {{ item.tag }}
                        </span>
                    </div>
                </div>

                <dl class="space-y-3.5">
                    <div>
                        <dt class="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Who</dt>
                        <dd class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed" v-html="parseRichText(item.who)"></dd>
                    </div>
                    <div>
                        <dt class="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Core need</dt>
                        <dd class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed" v-html="parseRichText(item.need)"></dd>
                    </div>
                    <div v-if="item.control">
                        <dt class="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Control they keep</dt>
                        <dd class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed" v-html="parseRichText(item.control)"></dd>
                    </div>
                </dl>
            </article>
        </div>
    </section>
</template>
