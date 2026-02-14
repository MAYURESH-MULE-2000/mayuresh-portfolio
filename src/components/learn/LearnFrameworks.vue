<template>
  <div class="learn-frameworks min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn" class="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4">
        ← Back to Topics
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">🔮</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Framework Concepts</h1>
      </div>
      <p class="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        Lifecycle hooks, reactivity, state management, and re-render triggers. The concepts that make frameworks tick — applicable to Vue, React, and beyond.
      </p>
    </div>

    <!-- Layout: Nav + Content -->
    <div class="px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 pb-16">
      <SectionNav
        :sections="sections"
        :activeSection="activeSection"
        activeColor="bg-blue-600"
        @select="setSection"
        class="lg:w-56 flex-shrink-0"
      />

      <div class="flex-1 min-w-0 space-y-5">
        <!-- ==================== LIFECYCLE ==================== -->
        <template v-if="activeSection === 'lifecycle'">
          <ConceptCard
            id="lifecycle-hooks"
            icon="🔄"
            title="Lifecycle Hooks"
            subtitle="When does your code run?"
            definition="Every component goes through creation → mounting → updating → unmounting. Hooks let you run code at specific moments: onMounted (DOM ready), onUpdated (after re-render), onUnmounted (cleanup)."
            analogy="Lifecycle hooks are like event handlers for a component's life. onMounted = baby's first breath (DOM is ready). onUpdated = component got a wardrobe change (re-rendered). onUnmounted = retirement party (clean up)."
            seniorTip="Always clean up in onUnmounted (or useEffect return): remove event listeners, clear timers, abort fetch requests. Memory leaks from missing cleanup are the #1 production bug in SPA apps."
            defaultOpen
          >
            <!-- Interactive Lifecycle Visualizer -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 Component Lifecycle — Click buttons to trigger lifecycle events</p>
              <div class="flex flex-wrap gap-2 mb-4">
                <button @click="lifecycleDemo.mounted = true; addLifecycleLog('🟢 onMounted')"
                  class="px-3 py-1.5 text-xs rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all"
                  :disabled="lifecycleDemo.mounted">
                  Mount Component
                </button>
                <button @click="lifecycleDemo.count++; addLifecycleLog('🔵 onUpdated (count: ' + lifecycleDemo.count + ')')"
                  class="px-3 py-1.5 text-xs rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all"
                  :disabled="!lifecycleDemo.mounted">
                  Trigger Update (count++)
                </button>
                <button @click="lifecycleDemo.mounted = false; addLifecycleLog('🔴 onUnmounted (cleanup!)')"
                  class="px-3 py-1.5 text-xs rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                  :disabled="!lifecycleDemo.mounted">
                  Unmount Component
                </button>
                <button @click="lifecycleDemo.logs = []; lifecycleDemo.count = 0; lifecycleDemo.mounted = false"
                  class="px-3 py-1.5 text-xs rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                  Reset
                </button>
              </div>

              <!-- Simulated Component -->
              <div v-if="lifecycleDemo.mounted" class="p-3 rounded-lg border border-blue-500/20 bg-blue-500/5 mb-3 transition-all">
                <p class="text-xs text-blue-400 font-mono">{'<MyComponent />'}</p>
                <p class="text-sm text-gray-300 mt-1">Count: <span class="font-bold text-blue-400">{{ lifecycleDemo.count }}</span></p>
              </div>
              <div v-else class="p-3 rounded-lg border border-gray-500/20 bg-gray-500/5 mb-3">
                <p class="text-xs text-gray-500 italic">Component not mounted</p>
              </div>

              <!-- Lifecycle Log -->
              <div class="max-h-32 overflow-y-auto space-y-1">
                <div v-for="(log, i) in lifecycleDemo.logs" :key="i"
                  class="text-xs font-mono px-2 py-1 rounded bg-gray-200 dark:bg-white/5 text-gray-600 dark:text-gray-300">
                  {{ log }}
                </div>
                <p v-if="!lifecycleDemo.logs.length" class="text-xs text-gray-500 italic">No lifecycle events yet</p>
              </div>
            </div>

            <CodePlayground
              title="lifecycle.js"
              :initialCode="codes.lifecycle"
            />
          </ConceptCard>

          <ConceptCard
            id="hooks-comparison"
            icon="🔀"
            title="Vue vs React Lifecycle Comparison"
            subtitle="Same concepts, different API"
            definition="Vue uses onMounted/onUpdated/onUnmounted (Composition API) or created/mounted/updated/beforeUnmount (Options API). React uses useEffect with dependency arrays. The mental model is the same — only syntax changes."
            analogy="Vue and React lifecycle are like driving automatic vs manual: the car (component) works the same way, you just shift gears (call hooks) differently."
            seniorTip="In interviews, show you understand BOTH patterns. Say: 'In Vue I'd use onMounted, in React the equivalent is useEffect with an empty dependency array.' This shows framework-agnostic thinking."
          >
            <!-- Side-by-side Comparison -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                  <p class="text-xs font-bold text-emerald-400 mb-2">Vue 3 (Composition API)</p>
                  <div class="space-y-1.5 text-xs font-mono text-gray-300">
                    <p><span class="text-emerald-400">onMounted</span>(() => { })</p>
                    <p><span class="text-emerald-400">onUpdated</span>(() => { })</p>
                    <p><span class="text-emerald-400">onUnmounted</span>(() => { })</p>
                    <p><span class="text-emerald-400">watch</span>(ref, (newVal) => { })</p>
                    <p><span class="text-emerald-400">computed</span>(() => derived)</p>
                  </div>
                </div>
                <div class="p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                  <p class="text-xs font-bold text-blue-400 mb-2">React (Hooks)</p>
                  <div class="space-y-1.5 text-xs font-mono text-gray-300">
                    <p><span class="text-blue-400">useEffect</span>(() => { }, <span class="text-amber-400">[]</span>)</p>
                    <p><span class="text-blue-400">useEffect</span>(() => { }) <span class="text-gray-500">// no deps</span></p>
                    <p><span class="text-blue-400">useEffect</span>(() => <span class="text-red-400">cleanup</span>, [])</p>
                    <p><span class="text-blue-400">useEffect</span>(() => { }, <span class="text-amber-400">[dep]</span>)</p>
                    <p><span class="text-blue-400">useMemo</span>(() => derived, <span class="text-amber-400">[deps]</span>)</p>
                  </div>
                </div>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== STATE ==================== -->
        <template v-if="activeSection === 'state'">
          <ConceptCard
            id="props-vs-state"
            icon="📬"
            title="Props vs State"
            subtitle="Data flow in components"
            definition="Props = data passed DOWN from parent (read-only). State = data managed WITHIN the component (mutable). One-way data flow: parent → child via props. Child communicates up via events/callbacks."
            analogy="Props are like a letter from your boss — you read it but can't modify it. State is your own notebook — you control it entirely. To tell the boss something, you send a reply (emit event)."
            seniorTip="Keep state as close to where it's needed as possible. Lift state up only when siblings need to share it. In production, I'd use a state management library (Pinia/Zustand) only for truly global state like auth/theme."
            defaultOpen
          >
            <!-- Interactive Props vs State Demo -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 See props flow down, events flow up</p>

              <!-- Parent -->
              <div class="p-3 rounded-lg border border-purple-500/20 bg-purple-500/5 mb-3">
                <p class="text-xs font-medium text-purple-400 mb-2">📦 Parent Component</p>
                <p class="text-xs text-gray-300 font-mono mb-2">state: message = "{{ stateDemo.parentMessage }}"</p>
                <input v-model="stateDemo.parentMessage"
                  class="bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white text-xs font-mono rounded px-2 py-1 w-full border-0 outline-none"
                  placeholder="Type here — prop flows down ↓" />

                <div class="mt-2 flex items-center gap-2 text-xs text-gray-400">
                  <span class="text-purple-400">↓ prop</span>
                  <span>message="{{ stateDemo.parentMessage }}"</span>
                </div>
              </div>

              <!-- Child -->
              <div class="p-3 rounded-lg border border-blue-500/20 bg-blue-500/5 ml-6">
                <p class="text-xs font-medium text-blue-400 mb-2">📦 Child Component</p>
                <p class="text-xs text-gray-300 font-mono">props.message = "{{ stateDemo.parentMessage }}" <span class="text-gray-500">(read-only)</span></p>
                <p class="text-xs text-gray-300 font-mono mt-1">local state: clicks = <span class="text-blue-400 font-bold">{{ stateDemo.childClicks }}</span></p>

                <div class="flex gap-2 mt-2">
                  <button @click="stateDemo.childClicks++"
                    class="px-3 py-1 text-xs rounded bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all">
                    Click me (local state)
                  </button>
                  <button @click="stateDemo.parentMessage = 'Updated from child!'"
                    class="px-3 py-1 text-xs rounded bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-all">
                    Emit to Parent ↑
                  </button>
                </div>
              </div>
            </div>
          </ConceptCard>

          <ConceptCard
            id="state-management"
            icon="🏪"
            title="State Management Patterns"
            subtitle="When to use local vs global state"
            definition="Local state: useState/ref for component-specific data. Prop drilling: passing props through many layers. Context/Provide-Inject: skip intermediate components. Store (Pinia/Zustand/Redux): global state with devtools."
            analogy="Local state = your wallet (personal). Prop drilling = passing a note through a chain of people (fragile). Provide/Inject = a loudspeaker (anyone can hear). Store = a shared bank account (everyone has access)."
            seniorTip="Don't reach for a store by default. Start with local state → lift up → provide/inject → store (last resort). Over-using global state creates 'god objects' that are hard to test and debug."
          >
            <CodePlayground
              title="state-management.js"
              :initialCode="codes.stateManagement"
            />
          </ConceptCard>
        </template>

        <!-- ==================== REACTIVITY ==================== -->
        <template v-if="activeSection === 'reactivity'">
          <ConceptCard
            id="reactivity"
            icon="⚡"
            title="Reactivity System"
            subtitle="How frameworks know what changed"
            definition="Vue uses Proxies to intercept get/set operations on reactive objects. React compares state references (immutability). When state changes, the framework re-renders only affected components."
            analogy="Reactivity is like a spreadsheet: change cell A1, and every formula referencing A1 auto-updates. Vue tracks dependencies like Excel tracks cell references."
            seniorTip="Vue's reactivity is fine-grained (tracks individual properties). React's is coarse-grained (re-renders entire component on any state change). This is why React needs useMemo/useCallback for optimization."
            defaultOpen
          >
            <!-- Reactivity Demo -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 Reactivity in action — change the value and watch dependents update</p>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div class="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
                  <p class="text-xs text-emerald-400 font-medium mb-2">Reactive Source</p>
                  <label class="text-xs text-gray-400">price</label>
                  <input v-model.number="reactivityDemo.price" type="number"
                    class="w-full bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white text-sm font-mono rounded px-2 py-1 mt-1 border-0 outline-none" />
                  <label class="text-xs text-gray-400 mt-2 block">quantity</label>
                  <input v-model.number="reactivityDemo.quantity" type="number"
                    class="w-full bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white text-sm font-mono rounded px-2 py-1 mt-1 border-0 outline-none" />
                </div>
                <div class="p-3 rounded-lg border border-blue-500/20 bg-blue-500/5">
                  <p class="text-xs text-blue-400 font-medium mb-2">Computed (auto-updates)</p>
                  <p class="text-xs font-mono text-gray-300">subtotal = price × quantity</p>
                  <p class="text-lg font-mono font-bold text-blue-400 mt-1">${{ reactivitySubtotal }}</p>
                  <p class="text-xs font-mono text-gray-300 mt-2">tax (10%)</p>
                  <p class="text-lg font-mono font-bold text-blue-400">${{ reactivityTax }}</p>
                </div>
                <div class="p-3 rounded-lg border border-amber-500/20 bg-amber-500/5">
                  <p class="text-xs text-amber-400 font-medium mb-2">Total (derived)</p>
                  <p class="text-2xl font-mono font-bold text-amber-400">${{ reactivityTotal }}</p>
                  <p class="text-xs text-gray-400 mt-1">Updates reactively when any source changes</p>
                </div>
              </div>
            </div>

            <CodePlayground
              title="reactivity.js"
              :initialCode="codes.reactivity"
            />
          </ConceptCard>

          <ConceptCard
            id="rerender"
            icon="🔁"
            title="Re-render Triggers — Why Did It Re-render?"
            subtitle="The most important debugging skill"
            definition="Vue re-renders when reactive data used in the template changes (fine-grained). React re-renders when setState is called OR parent re-renders (cascading). Unnecessary re-renders waste performance."
            analogy="Vue is like a smart TV — it only refreshes the pixels that changed (fine-grained). React is like a CRT TV — it redraws the entire screen each frame (but uses Virtual DOM to make it efficient)."
            seniorTip="Use Vue DevTools to track which components re-render. In React, use React.memo + useCallback + useMemo for optimization. Know WHY re-renders happen — not just how to fix them."
          >
            <!-- Re-render Trigger Comparison -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">📊 What triggers a re-render?</p>
              <div class="overflow-x-auto">
                <table class="w-full text-xs">
                  <thead>
                    <tr class="border-b border-white/10">
                      <th class="text-left py-2 px-2 text-gray-400">Trigger</th>
                      <th class="text-center py-2 px-2 text-emerald-400">Vue</th>
                      <th class="text-center py-2 px-2 text-blue-400">React</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="trigger in rerenderTriggers" :key="trigger.name" class="border-b border-white/5">
                      <td class="py-2 px-2 text-gray-300 font-medium">{{ trigger.name }}</td>
                      <td class="py-2 px-2 text-center">
                        <span :class="trigger.vue ? 'text-emerald-400' : 'text-gray-500'">{{ trigger.vue ? '✅ Yes' : '❌ No' }}</span>
                      </td>
                      <td class="py-2 px-2 text-center">
                        <span :class="trigger.react ? 'text-blue-400' : 'text-gray-500'">{{ trigger.react ? '✅ Yes' : '❌ No' }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </ConceptCard>

          <ConceptCard
            id="computed-watch"
            icon="👁️"
            title="Computed vs Watch (Vue) / useMemo vs useEffect (React)"
            subtitle="Derived values vs side effects"
            definition="Computed/useMemo: derives a value from other reactive data (cached, lazy). Watch/useEffect: runs side effects when dependencies change (fetch data, update DOM, log). Use computed for transforming data, watch for reacting to data."
            analogy="Computed is like a dashboard gauge — it shows derived information (speed from RPM). Watch is like an alarm — it triggers an ACTION when something changes (alert when temperature too high)."
            seniorTip="Default to computed. Use watch only for side effects (API calls, localStorage, analytics). In React, useEffect is overused — many effects should be useMemo or event handlers instead."
          >
            <CodePlayground
              title="computed-watch.js"
              :initialCode="codes.computedWatch"
            />
          </ConceptCard>
        </template>

        <!-- ==================== PERFORMANCE ==================== -->
        <template v-if="activeSection === 'perf'">
          <ConceptCard
            id="framework-perf"
            icon="🏎️"
            title="Framework Performance Optimization"
            subtitle="Making components fast"
            definition="Key techniques: lazy-load routes, memoize expensive components, use virtual scrolling for long lists, avoid anonymous functions in templates, use v-once/React.memo for static content, implement proper key props in lists."
            analogy="Framework optimization is like tuning a race car — the engine (framework) is already good, but you need to reduce wind resistance (unnecessary re-renders), lighten the load (code splitting), and use better fuel (memoization)."
            seniorTip="Profile before optimizing! Use Vue DevTools Performance tab or React Profiler. The biggest wins are usually: route-based code splitting, virtualizing long lists, and fixing waterfall data fetching."
            defaultOpen
          >
            <!-- Performance Checklist -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">✅ Performance Optimization Checklist</p>
              <div class="space-y-2">
                <div v-for="item in perfChecklist" :key="item.label"
                  @click="item.checked = !item.checked"
                  class="flex items-start gap-2 p-2 rounded-lg cursor-pointer hover:bg-white/5 transition-all">
                  <span class="text-sm mt-0.5" :class="item.checked ? 'opacity-100' : 'opacity-40'">
                    {{ item.checked ? '✅' : '⬜' }}
                  </span>
                  <div>
                    <p class="text-sm font-medium" :class="item.checked ? 'text-emerald-400 line-through opacity-60' : 'text-gray-300'">{{ item.label }}</p>
                    <p class="text-xs text-gray-500">{{ item.detail }}</p>
                  </div>
                </div>
              </div>
            </div>

            <CodePlayground
              title="framework-perf.js"
              :initialCode="codes.frameworkPerf"
            />
          </ConceptCard>

          <ConceptCard
            id="keys-in-lists"
            icon="🔑"
            title="Keys in Lists — Why They Matter"
            subtitle="The most misunderstood prop"
            definition="Keys help the framework identify which items changed/added/removed in a list. Without keys (or with index keys), the framework can't efficiently diff and may re-render incorrectly. Use unique, stable IDs."
            analogy="Keys are like student IDs in a classroom. If you only use seat numbers (index), and a student leaves, everyone after them shifts — the teacher thinks they're all new students. With IDs, she knows exactly who left."
            seniorTip="NEVER use array index as key if the list can reorder/filter. Use database IDs or stable identifiers. Bad keys cause: wrong re-renders, lost component state, input value mixups, and animation glitches."
          >
            <CodePlayground
              title="keys.js"
              :initialCode="codes.keysInLists"
            />
          </ConceptCard>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import SectionNav from './SectionNav.vue'
import ConceptCard from './ConceptCard.vue'
import CodePlayground from './CodePlayground.vue'

// Section Nav
const sections = [
  { id: 'lifecycle', label: 'Lifecycle', icon: '🔄', badge: '2' },
  { id: 'state', label: 'State', icon: '📬', badge: '2' },
  { id: 'reactivity', label: 'Reactivity', icon: '⚡', badge: '3' },
  { id: 'perf', label: 'Performance', icon: '🏎️', badge: '2' },
]

const activeSection = ref('lifecycle')

function setSection(id) {
  activeSection.value = id
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// ==================== Lifecycle Demo ====================
const lifecycleDemo = reactive({
  mounted: false,
  count: 0,
  logs: []
})

function addLifecycleLog(msg) {
  lifecycleDemo.logs.unshift(`[${new Date().toLocaleTimeString()}] ${msg}`)
}

// ==================== State Demo ====================
const stateDemo = reactive({
  parentMessage: 'Hello from parent!',
  childClicks: 0,
})

// ==================== Reactivity Demo ====================
const reactivityDemo = reactive({
  price: 29,
  quantity: 3,
})

const reactivitySubtotal = computed(() => (reactivityDemo.price * reactivityDemo.quantity).toFixed(2))
const reactivityTax = computed(() => (reactivityDemo.price * reactivityDemo.quantity * 0.1).toFixed(2))
const reactivityTotal = computed(() => (reactivityDemo.price * reactivityDemo.quantity * 1.1).toFixed(2))

// ==================== Re-render Triggers ====================
const rerenderTriggers = [
  { name: 'Reactive/state data changes', vue: true, react: true },
  { name: 'Parent re-renders', vue: false, react: true },
  { name: 'Props change', vue: true, react: true },
  { name: 'Context/Provide value changes', vue: true, react: true },
  { name: 'Force update called', vue: true, react: true },
  { name: 'Sibling re-renders', vue: false, react: false },
  { name: 'Unused state changes', vue: false, react: true },
]

// ==================== Performance Checklist ====================
const perfChecklist = reactive([
  { label: 'Lazy-load routes', detail: 'Dynamic import() for each route', checked: false },
  { label: 'Use unique keys in lists', detail: 'Not index — stable IDs', checked: false },
  { label: 'Memoize expensive computations', detail: 'computed (Vue) / useMemo (React)', checked: false },
  { label: 'Avoid inline functions in templates', detail: 'Define handlers outside template', checked: false },
  { label: 'Virtual scrolling for long lists', detail: 'vue-virtual-scroller / react-window', checked: false },
  { label: 'Code-split heavy components', detail: 'defineAsyncComponent / React.lazy', checked: false },
  { label: 'Profile before optimizing', detail: 'DevTools Performance tab', checked: false },
])

// ==================== Code Examples ====================
const codes = {
  lifecycle: `// Vue 3 Composition API Lifecycle
// import { onMounted, onUpdated, onUnmounted } from 'vue'

console.log("🔄 Vue 3 Lifecycle Hooks:\\n");

console.log("Setup Phase (runs first):");
console.log("  • setup() or <script setup>");
console.log("  • Initial reactive state created");
console.log("  • Computed properties defined\\n");

console.log("Mounting:");
console.log("  • onBeforeMount → DOM not ready yet");
console.log("  • onMounted → DOM is ready! ✅");
console.log("    → Fetch data, add listeners, access refs\\n");

console.log("Updating (on reactive data change):");
console.log("  • onBeforeUpdate → about to re-render");
console.log("  • onUpdated → DOM has been updated\\n");

console.log("Unmounting:");
console.log("  • onBeforeUnmount → component about to die");
console.log("  • onUnmounted → component is gone");
console.log("    → Remove listeners, clear timers, abort fetches\\n");

console.log("💡 Key Rule: ALWAYS clean up in onUnmounted!");`,

  stateManagement: `// State Management Decision Tree

console.log("📊 When to use what:\\n");

console.log("1️⃣ Local State (ref/useState):");
console.log("   Form inputs, toggles, counters");
console.log("   Used by only this component\\n");

console.log("2️⃣ Lifted State:");
console.log("   Two siblings need the same data");
console.log("   Move state to their parent\\n");

console.log("3️⃣ Provide/Inject (Vue) or Context (React):");
console.log("   Deep nesting (avoid prop drilling)");
console.log("   Theme, locale, auth status\\n");

console.log("4️⃣ Store (Pinia/Zustand/Redux):");
console.log("   Truly global state");
console.log("   Shared across unrelated components");
console.log("   Needs devtools, persistence, plugins\\n");

console.log("⚠️ Anti-patterns:");
console.log("   • Everything in global store");
console.log("   • Prop drilling through 5+ components");
console.log("   • Mutating props directly");
console.log("   • Storing derived data (use computed!)");`,

  reactivity: `// Reactivity Under the Hood

console.log("⚡ How Reactivity Works:\\n");

console.log("Vue 3 (Proxy-based):");
console.log("  const state = reactive({ count: 0 })");
console.log("  // Vue wraps in Proxy, tracks get/set");
console.log("  // When you READ: dependency tracked");
console.log("  // When you WRITE: watchers notified\\n");

console.log("React (Immutable state):");
console.log("  const [count, setCount] = useState(0)");
console.log("  // Must call setCount to trigger re-render");
console.log("  // React compares OLD vs NEW reference");
console.log("  // Same reference = no re-render\\n");

console.log("Why Vue feels 'automatic':");
console.log("  state.count++ → auto re-renders! ✅\\n");

console.log("Why React needs explicit updates:");
console.log("  count++ → ❌ won't re-render!");
console.log("  setCount(c => c + 1) → ✅ triggers re-render\\n");

console.log("Key insight: Vue tracks individual properties,");
console.log("React compares entire state snapshots.");`,

  computedWatch: `// Computed vs Watch — Know When to Use Which

console.log("📊 Computed (useMemo):\\n");
console.log("  USE FOR: Deriving values from state");
console.log("  • Cached — only recalculates when deps change");
console.log("  • Synchronous — returns a value");
console.log("  • Example: fullName = first + ' ' + last\\n");

console.log("  Vue:  const full = computed(() => a + b)");
console.log("  React: const full = useMemo(() => a + b, [a, b])\\n");

console.log("👁️ Watch (useEffect):\\n");
console.log("  USE FOR: Side effects when data changes");
console.log("  • Runs async operations");
console.log("  • Doesn't return a derived value");
console.log("  • Example: fetch data when search query changes\\n");

console.log("  Vue:  watch(query, async (val) => {");
console.log("          results.value = await fetchSearch(val)");
console.log("        })");
console.log("  React: useEffect(() => {");
console.log("           fetchSearch(query).then(setResults)");
console.log("         }, [query])\\n");

console.log("💡 Rule: If you can derive it → computed");
console.log("         If you need to DO something → watch");`,

  frameworkPerf: `// Framework Performance Optimization

console.log("🏎️ Performance Techniques:\\n");

console.log("1️⃣ Route-based Code Splitting:");
console.log("   Vue:");
console.log("   const routes = [{");
console.log("     path: '/dashboard',");
console.log("     component: () => import('./Dashboard.vue')");
console.log("   }]\\n");

console.log("2️⃣ Component Memoization:");
console.log("   Vue: Component already optimized (reactive)");
console.log("   React: export default React.memo(MyComponent)\\n");

console.log("3️⃣ Virtual Scrolling (1000+ items):");
console.log("   Only render visible items in viewport");
console.log("   vue-virtual-scroller / react-window\\n");

console.log("4️⃣ Avoid Template Gotchas:");
console.log("   ❌ @click='() => handle(item)'  (new fn each render)");
console.log("   ✅ @click='handle(item)'  (Vue auto-wraps)\\n");

console.log("5️⃣ Use v-once / React.memo for static content:");
console.log("   <div v-once>This never re-renders</div>\\n");

console.log("6️⃣ Profile First! Don't optimize blindly.");
console.log("   Vue DevTools → Performance tab");
console.log("   React DevTools → Profiler");`,

  keysInLists: `// Why Keys Matter in Lists

console.log("🔑 Keys Identify Items Across Re-renders\\n");

console.log("❌ BAD: Using index as key");
console.log("  items.map((item, i) => <Item key={i} />)");
console.log("  • Reorder/delete → wrong items re-render");
console.log("  • Input state gets mixed up");
console.log("  • Animations break\\n");

console.log("✅ GOOD: Using unique stable ID");
console.log("  items.map(item => <Item key={item.id} />)");
console.log("  • Framework knows exactly which item changed");
console.log("  • Efficient minimal DOM updates");
console.log("  • State preserved correctly\\n");

console.log("Example of the bug:");
console.log("  List: [A, B, C] with index keys [0, 1, 2]");
console.log("  Delete B → [A, C]");
console.log("  New keys: [0, 1]");
console.log("  Framework thinks: item 0 stayed, item 1 changed,");
console.log("  item 2 removed. But actually B was removed!");
console.log("  → C gets B's old state! 🐛\\n");

console.log("💡 vue: :key='item.id'");
console.log("   react: key={item.id}");`,
}
</script>
