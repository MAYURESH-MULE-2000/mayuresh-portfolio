<script setup>
import * as LucideIcons from 'lucide-vue-next'
import { parseRichText } from '../../lib/richText'

defineProps({
    title: { type: String, default: '' },
    caption: { type: String, default: '' },
    items: { type: Array, required: true },
})

const getIcon = (name) => LucideIcons[name] || LucideIcons.Compass
</script>

<template>
    <section class="mb-16">
        <h2 v-if="title" class="text-2xl md:text-3xl font-bold mb-6">{{ title }}</h2>
        <p v-if="caption" class="text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mb-8"
            v-html="parseRichText(caption)"></p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <article
                v-for="(item, index) in items"
                :key="item.title"
                class="group relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.02] p-6 md:p-7 overflow-hidden transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-700 hover:-translate-y-0.5"
            >
                <span
                    class="absolute -top-4 -right-2 text-[80px] font-black leading-none text-gray-100 dark:text-white/[0.04] select-none pointer-events-none"
                    aria-hidden="true"
                >
                    {{ index + 1 }}
                </span>

                <div class="relative z-10">
                    <div class="mb-4 p-2.5 w-fit rounded-xl bg-gray-100 dark:bg-white/[0.06] text-gray-500 dark:text-gray-300 group-hover:text-accent-dark dark:group-hover:text-accent transition-colors duration-300">
                        <component :is="getIcon(item.icon)" :size="20" />
                    </div>
                    <h3 class="font-bold text-base md:text-lg leading-snug mb-2">{{ item.title }}</h3>
                    <p class="text-sm md:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed"
                        v-html="parseRichText(item.content)"></p>
                </div>
            </article>
        </div>
    </section>
</template>
