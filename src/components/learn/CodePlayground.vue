<template>
  <div class="code-playground rounded-2xl overflow-hidden border border-white/10 bg-gray-900/80 backdrop-blur-sm max-w-full">
    <!-- Header -->
    <div class="flex items-center justify-between px-4 py-2.5 bg-gray-800/80 border-b border-white/10">
      <div class="flex items-center gap-2">
        <div class="flex gap-1.5">
          <span class="w-3 h-3 rounded-full bg-red-500/80"></span>
          <span class="w-3 h-3 rounded-full bg-yellow-500/80"></span>
          <span class="w-3 h-3 rounded-full bg-green-500/80"></span>
        </div>
        <span class="text-xs text-gray-400 ml-2 font-mono">{{ title }}</span>
      </div>
      <div class="flex items-center gap-2">
        <button
          v-if="allowReset"
          @click="resetCode"
          class="px-2.5 py-1 text-xs text-gray-400 hover:text-white rounded-md hover:bg-white/5 transition-all"
          title="Reset code"
        >
          ↺ Reset
        </button>
        <button
          @click="runCode"
          class="px-3 py-1 text-xs font-medium rounded-md transition-all duration-200"
          :class="isRunning
            ? 'bg-amber-500/20 text-amber-400'
            : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'"
        >
          {{ isRunning ? '● Running...' : '▶ Run' }}
        </button>
      </div>
    </div>

    <!-- Code Editor -->
    <div class="relative overflow-x-auto">
      <div class="absolute left-0 top-0 bottom-0 w-10 bg-gray-800/40 flex flex-col items-center pt-3 text-gray-600 text-xs font-mono select-none z-[1]">
        <span v-for="n in lineCount" :key="n" class="leading-[1.625rem]">{{ n }}</span>
      </div>
      <textarea
        ref="editorRef"
        v-model="code"
        :readonly="readonly"
        @input="adjustHeight"
        @keydown.tab.prevent="insertTab"
        spellcheck="false"
        class="w-full pl-12 pr-4 py-3 bg-transparent text-gray-100 font-mono text-sm leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-emerald-500/30 rounded-none whitespace-pre overflow-x-auto"
        :style="{ minHeight: minEditorHeight + 'px' }"
      ></textarea>
    </div>

    <!-- Output Panel -->
    <div v-if="output.length > 0 || hasError" class="border-t border-white/10">
      <div class="px-4 py-2 bg-gray-800/40 flex items-center gap-2">
        <span class="text-xs font-mono" :class="hasError ? 'text-red-400' : 'text-gray-400'">
          {{ hasError ? '✕ Error' : '⟩ Console Output' }}
        </span>
      </div>
      <div class="px-4 py-3 max-h-48 overflow-y-auto overflow-x-auto">
        <div
          v-for="(line, i) in output"
          :key="i"
          class="font-mono text-sm leading-relaxed break-all"
          :class="{
            'text-red-400': line.type === 'error',
            'text-amber-400': line.type === 'warn',
            'text-emerald-400': line.type === 'log',
            'text-cyan-400': line.type === 'info',
          }"
        >
          <span class="text-gray-600 mr-2 select-none text-xs">{{ line.type === 'error' ? '✕' : '›' }}</span>
          <span class="whitespace-pre-wrap break-words">{{ line.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'

const props = defineProps({
  title: { type: String, default: 'script.js' },
  initialCode: { type: String, default: '// Write your code here\nconsole.log("Hello!")' },
  readonly: { type: Boolean, default: false },
  allowReset: { type: Boolean, default: true },
  autoRun: { type: Boolean, default: false },
  minEditorHeight: { type: Number, default: 80 }
})

const emit = defineEmits(['run', 'output'])

const code = ref(props.initialCode)
const output = ref([])
const isRunning = ref(false)
const hasError = ref(false)
const editorRef = ref(null)

const lineCount = computed(() => code.value.split('\n').length)

function resetCode() {
  code.value = props.initialCode
  output.value = []
  hasError.value = false
}

function insertTab(e) {
  const textarea = e.target
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  code.value = code.value.substring(0, start) + '  ' + code.value.substring(end)
  nextTick(() => {
    textarea.selectionStart = textarea.selectionEnd = start + 2
  })
}

function adjustHeight() {
  if (editorRef.value) {
    editorRef.value.style.height = 'auto'
    editorRef.value.style.height = editorRef.value.scrollHeight + 'px'
  }
}

function runCode() {
  output.value = []
  hasError.value = false
  isRunning.value = true

  const logs = []

  // Create sandboxed console
  const fakeConsole = {
    log: (...args) => logs.push({ type: 'log', text: args.map(formatValue).join(' ') }),
    warn: (...args) => logs.push({ type: 'warn', text: args.map(formatValue).join(' ') }),
    error: (...args) => logs.push({ type: 'error', text: args.map(formatValue).join(' ') }),
    info: (...args) => logs.push({ type: 'info', text: args.map(formatValue).join(' ') }),
  }

  try {
    const fn = new Function('console', code.value)
    fn(fakeConsole)
  } catch (err) {
    logs.push({ type: 'error', text: err.message })
    hasError.value = true
  }

  output.value = logs
  isRunning.value = false
  emit('output', logs)
  emit('run', code.value)
}

function formatValue(val) {
  if (val === null) return 'null'
  if (val === undefined) return 'undefined'
  if (typeof val === 'object') {
    try { return JSON.stringify(val, null, 2) } catch { return String(val) }
  }
  return String(val)
}

onMounted(() => {
  adjustHeight()
  if (props.autoRun) {
    nextTick(() => runCode())
  }
})
</script>
