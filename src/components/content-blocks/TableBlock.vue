<script setup>
import { parseRichText } from '../../lib/richText'

defineProps({
    title: { type: String, default: '' },
    caption: { type: String, default: '' },
    headers: { type: Array, required: true },
    rows: { type: Array, required: true },
})
</script>

<template>
    <section class="mb-16">
        <h2 v-if="title" class="text-2xl md:text-3xl font-bold mb-6">{{ title }}</h2>
        <p v-if="caption" class="text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mb-8"
            v-html="parseRichText(caption)"></p>

        <div class="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">
            <table class="w-full min-w-[560px] text-left border-collapse">
                <thead>
                    <tr class="bg-gray-50 dark:bg-white/[0.03]">
                        <th
                            v-for="header in headers"
                            :key="header"
                            class="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 whitespace-nowrap"
                        >
                            {{ header }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(row, index) in rows"
                        :key="index"
                        class="border-t border-gray-100 dark:border-gray-800 transition-colors duration-200"
                        :class="row.highlight
                            ? 'bg-emerald-50/70 dark:bg-emerald-900/10'
                            : 'hover:bg-gray-50 dark:hover:bg-white/[0.02]'"
                    >
                        <td
                            v-for="(cell, cellIndex) in row.cells"
                            :key="cellIndex"
                            class="px-5 py-4 text-sm leading-relaxed align-top"
                            :class="cellIndex === 0
                                ? 'font-semibold text-gray-900 dark:text-gray-100'
                                : 'text-gray-600 dark:text-gray-400'"
                            v-html="parseRichText(cell)"
                        ></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>
