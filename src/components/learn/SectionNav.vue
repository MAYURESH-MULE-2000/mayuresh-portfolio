<template>
  <nav class="section-nav">
    <!-- Mobile: horizontal scrolling tabs -->
    <div class="lg:hidden sticky top-0 z-30 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 -mx-4 px-4">
      <div class="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
        <button
          v-for="section in sections"
          :key="section.id"
          @click="$emit('select', section.id)"
          class="flex-shrink-0 px-3 py-2 text-sm rounded-lg font-medium transition-all duration-200 whitespace-nowrap"
          :class="activeSection === section.id
            ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'"
        >
          <span class="mr-1.5">{{ section.icon }}</span>
          {{ section.label }}
        </button>
      </div>
    </div>

    <!-- Desktop: sticky sidebar -->
    <div class="hidden lg:block sticky top-8 self-start">
      <div class="p-4 rounded-2xl bg-white/60 dark:bg-gray-900/40 border border-gray-200 dark:border-white/5 backdrop-blur-sm">
        <h4 class="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3 px-3">Sections</h4>
        <div class="space-y-0.5">
          <button
            v-for="section in sections"
            :key="section.id"
            @click="$emit('select', section.id)"
            class="w-full flex items-center gap-2 px-3 py-2.5 text-sm rounded-xl font-medium transition-all duration-200 text-left"
            :class="activeSection === section.id
              ? `${activeColor} text-white shadow-lg`
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'"
          >
            <span class="text-base">{{ section.icon }}</span>
            <span>{{ section.label }}</span>
            <span
              v-if="section.badge"
              class="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-white/20"
            >{{ section.badge }}</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  sections: {
    type: Array,
    required: true,
    // Each item: { id: string, label: string, icon: string, badge?: string }
  },
  activeSection: { type: String, default: '' },
  activeColor: { type: String, default: 'bg-gray-900 dark:bg-white dark:text-gray-900' }
})

defineEmits(['select'])
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
