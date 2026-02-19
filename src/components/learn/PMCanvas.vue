<template>
  <div class="pm-canvas bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm transition-all hover:shadow-md">
    <!-- Header -->
    <div class="header bg-gray-50 dark:bg-gray-800/50 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
          <slot name="icon">📝</slot>
        </div>
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-tight">{{ title }}</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400">{{ subtitle }}</p>
        </div>
      </div>
      <div class="flex gap-2">
        <button 
          @click="reset" 
          class="text-xs font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="Clear all fields"
        >
          Reset
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="content p-4 space-y-4">
      <div v-for="(field, i) in modelValue" :key="i" class="field group">
        <div class="flex justify-between mb-1">
          <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide group-focus-within:text-purple-500 transition-colors">
            {{ field.label }}
          </label>
        </div>
        <textarea
          v-model="field.value"
          :placeholder="field.placeholder"
          class="w-full bg-gray-50 dark:bg-gray-800 border border-transparent dark:border-gray-700 rounded-lg p-3 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white dark:focus:bg-gray-900 transition-all resize-y"
          :rows="field.rows || 3"
          spellcheck="false"
        ></textarea>
        <p v-if="field.tip" class="mt-1 text-xs text-gray-400 italic">💡 {{ field.tip }}</p>
      </div>
    </div>

    <!-- Footer -->
    <div class="bg-gray-50 dark:bg-gray-800/30 px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center text-xs text-gray-400">
      <span>{{ filledCount }} of {{ modelValue.length }} fields filled</span>
      <span v-if="filledCount === modelValue.length" class="text-emerald-500 font-medium flex items-center gap-1">
        ✅ Complete!
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: 'Fill in the structured framework' },
  modelValue: { type: Array, required: true } // Array of { label, value, placeholder, rows?, tip? }
})

const emit = defineEmits(['update:modelValue'])

const filledCount = computed(() => {
  return props.modelValue.filter(f => f.value && f.value.trim().length > 0).length
})

function reset() {
  const resetFields = props.modelValue.map(f => ({ ...f, value: '' }))
  emit('update:modelValue', resetFields)
}
</script>
