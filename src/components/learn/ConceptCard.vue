<template>
  <div
    :id="id"
    class="concept-card group rounded-2xl border transition-all duration-300"
    :class="[
      isOpen
        ? 'border-white/20 bg-gray-900/60 dark:bg-gray-900/60 bg-white/60 shadow-lg shadow-black/5 dark:shadow-black/20'
        : 'border-white/5 dark:border-white/5 border-gray-200 bg-white/40 dark:bg-gray-900/30 hover:border-white/15 dark:hover:border-white/15 hover:border-gray-300'
    ]"
  >
    <!-- Header (always visible) -->
    <button
      @click="toggle"
      class="w-full flex items-center gap-4 p-5 text-left transition-colors"
    >
      <span class="text-2xl flex-shrink-0">{{ icon }}</span>
      <div class="flex-1 min-w-0">
        <h3 class="font-semibold text-gray-900 dark:text-white text-base md:text-lg leading-snug">
          {{ title }}
        </h3>
        <p v-if="subtitle" class="text-sm text-gray-500 dark:text-gray-400 mt-0.5 truncate">{{ subtitle }}</p>
      </div>
      <span
        class="text-gray-400 transition-transform duration-300 text-sm flex-shrink-0"
        :class="{ 'rotate-180': isOpen }"
      >▼</span>
    </button>

    <!-- Content (expandable) -->
    <div
      v-show="isOpen"
      class="border-t border-white/5 dark:border-white/5 transition-all duration-300"
    >
      <div class="p-5 space-y-4">
        <!-- Definition -->
        <div v-if="definition" class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
          <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            <span class="text-gray-400 dark:text-gray-500 font-medium mr-1.5">💡</span>
            {{ definition }}
          </p>
        </div>

        <!-- Analogy -->
        <div v-if="analogy" class="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-500/5 border border-amber-200/50 dark:border-amber-500/10">
          <p class="text-sm leading-relaxed text-amber-800 dark:text-amber-300/80">
            <span class="mr-1.5">🧠</span>
            <strong class="font-medium">Remember it as:</strong> {{ analogy }}
          </p>
        </div>

        <!-- Slot for interactive content -->
        <slot></slot>

        <!-- Senior Tip -->
        <div v-if="seniorTip" class="p-4 rounded-xl bg-emerald-50/80 dark:bg-emerald-500/5 border border-emerald-200/50 dark:border-emerald-500/10">
          <p class="text-sm leading-relaxed text-emerald-800 dark:text-emerald-300/80">
            <span class="mr-1.5">🎯</span>
            <strong class="font-medium">Senior Tip:</strong> {{ seniorTip }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from 'vue'

const props = defineProps({
  id: { type: String, default: '' },
  icon: { type: String, default: '📦' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  definition: { type: String, default: '' },
  analogy: { type: String, default: '' },
  seniorTip: { type: String, default: '' },
  defaultOpen: { type: Boolean, default: false }
})

const isOpen = ref(props.defaultOpen)

function toggle() {
  isOpen.value = !isOpen.value
}

// Expose toggle for parent access
defineExpose({ toggle, isOpen })
</script>
