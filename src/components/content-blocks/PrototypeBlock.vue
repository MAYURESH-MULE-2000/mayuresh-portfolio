<script setup>
import { computed } from 'vue'
import WhatsAppDiscover from '../prototypes/WhatsAppDiscover.vue'
import { parseRichText } from '../../lib/richText'

const props = defineProps({
    name: { type: String, required: true },
    title: { type: String, default: '' },
    caption: { type: String, default: '' },
})

const registry = {
    'whatsapp-discover': WhatsAppDiscover,
}

const prototype = computed(() => registry[props.name] || null)
</script>

<template>
    <section class="mb-16">
        <div class="flex flex-wrap items-center gap-3 mb-6">
            <h2 v-if="title" class="text-2xl md:text-3xl font-bold">{{ title }}</h2>
            <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-accent/15 text-accent-dark dark:text-accent">
                Interactive
            </span>
        </div>
        <p v-if="caption" class="text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mb-8"
            v-html="parseRichText(caption)"></p>

        <div class="rounded-3xl border border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-white/[0.02] p-6 md:p-10">
            <component :is="prototype" v-if="prototype" />
            <p v-else class="text-sm text-gray-500 dark:text-gray-400">Prototype "{{ name }}" is not registered.</p>
        </div>
    </section>
</template>
