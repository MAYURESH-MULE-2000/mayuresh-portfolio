<template>
  <div class="learn-perf min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn" class="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4">
        ← Back to Topics
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">🚀</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Performance Optimization</h1>
      </div>
      <p class="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        Senior-level performance knowledge. Understanding these concepts and speaking about them confidently is a massive signal.
      </p>
    </div>

    <!-- Layout: Nav + Content -->
    <div class="px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 pb-16">
      <SectionNav
        :sections="sections"
        :activeSection="activeSection"
        activeColor="bg-emerald-600"
        @select="setSection"
        class="lg:w-56 flex-shrink-0"
      />

      <div class="flex-1 min-w-0 space-y-5">
        <!-- ==================== RENDERING ==================== -->
        <template v-if="activeSection === 'rendering'">
          <ConceptCard
            id="critical-rendering-path"
            icon="🎨"
            title="Critical Rendering Path"
            subtitle="How your page goes from HTML to pixels"
            definition="The Critical Rendering Path is the sequence of steps the browser takes to convert HTML, CSS, and JS into pixels: HTML → DOM, CSS → CSSOM, DOM + CSSOM → Render Tree → Layout → Paint → Composite."
            analogy="Think of building a house: HTML is the blueprint (DOM), CSS is the interior design plan (CSSOM), combining them creates the actual plan (Render Tree), Layout is measuring rooms, Paint is applying colors, Composite is assembling floors."
            seniorTip="To optimize CRP: minimize critical resources, reduce critical bytes, and shorten critical path length. Inline critical CSS, defer non-essential JS, and preload key resources."
            defaultOpen
          >
            <!-- Visual Step-by-Step -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 Click through each step of the rendering pipeline</p>
              <div class="space-y-2">
                <div
                  v-for="(step, i) in crpSteps"
                  :key="i"
                  @click="crpActiveStep = i"
                  class="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200"
                  :class="crpActiveStep === i
                    ? 'bg-emerald-500/10 border border-emerald-500/20'
                    : 'hover:bg-white/5 border border-transparent'"
                >
                  <span class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                    :class="crpActiveStep >= i ? 'bg-emerald-500 text-white' : 'bg-gray-200 dark:bg-white/10 text-gray-400'">
                    {{ i + 1 }}
                  </span>
                  <div>
                    <p class="font-medium text-sm text-gray-900 dark:text-white">{{ step.title }}</p>
                    <p v-if="crpActiveStep === i" class="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{{ step.detail }}</p>
                  </div>
                </div>
              </div>
              <!-- Progress bar -->
              <div class="mt-4 h-1.5 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                <div class="h-full bg-emerald-500 transition-all duration-500 rounded-full"
                  :style="{ width: ((crpActiveStep + 1) / crpSteps.length * 100) + '%' }"></div>
              </div>
            </div>

            <CodePlayground
              title="critical-path.js"
              :initialCode="codes.criticalPath"
            />
          </ConceptCard>

          <ConceptCard
            id="reflow-vs-repaint"
            icon="💥"
            title="Layout Thrashing — Why Your Animations Jank"
            subtitle="The most common performance mistake"
            definition="Layout thrashing occurs when you interleave DOM reads and writes. Each read forces the browser to recalculate layout synchronously, and each write invalidates it. In a loop, this creates thousands of forced layouts."
            analogy="Imagine reorganizing a library: layout thrashing is like checking the catalog (read), moving one book (write), checking again (forced re-catalog!), moving another... versus checking everything first, then moving all books at once."
            seniorTip="Use requestAnimationFrame for DOM writes. Batch reads first, then writes. Use CSS transform/opacity for animations (they skip layout). The FastDOM library automates read/write batching."
          >
            <!-- Interactive Demo: Layout Thrashing -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 Compare: Thrashing vs Batched DOM operations</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <!-- Thrashing -->
                <div class="p-3 rounded-lg border border-red-500/20 bg-red-500/5">
                  <p class="text-xs font-medium text-red-400 mb-2">❌ Layout Thrashing</p>
                  <div class="space-y-1 mb-3">
                    <div v-for="n in 5" :key="'bad'+n"
                      class="h-3 rounded-full bg-red-500/20 transition-all duration-300"
                      :style="{ width: thrashingDemo.badWidths[n-1] + '%' }">
                    </div>
                  </div>
                  <p class="text-xs font-mono text-red-300">
                    Time: <span class="font-bold">{{ thrashingDemo.badTime }}ms</span>
                  </p>
                </div>
                <!-- Batched -->
                <div class="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
                  <p class="text-xs font-medium text-emerald-400 mb-2">✅ Batched Reads/Writes</p>
                  <div class="space-y-1 mb-3">
                    <div v-for="n in 5" :key="'good'+n"
                      class="h-3 rounded-full bg-emerald-500/20 transition-all duration-300"
                      :style="{ width: thrashingDemo.goodWidths[n-1] + '%' }">
                    </div>
                  </div>
                  <p class="text-xs font-mono text-emerald-300">
                    Time: <span class="font-bold">{{ thrashingDemo.goodTime }}ms</span>
                  </p>
                </div>
              </div>
              <button @click="runThrashingDemo"
                class="px-4 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium transition-all"
                :disabled="thrashingDemo.running">
                {{ thrashingDemo.running ? 'Running...' : '▶ Run Comparison' }}
              </button>
            </div>

            <CodePlayground
              title="layout-thrashing.js"
              :initialCode="codes.layoutThrashing"
            />
          </ConceptCard>
        </template>

        <!-- ==================== LOADING ==================== -->
        <template v-if="activeSection === 'loading'">
          <ConceptCard
            id="lazy-loading"
            icon="🦥"
            title="Lazy Loading"
            subtitle="Don't load what you don't need yet"
            definition="Lazy loading defers loading of resources until they're needed. Images: use loading='lazy' or Intersection Observer. Components: dynamic import() for route-based code splitting. Data: paginate and load on scroll."
            analogy="Lazy loading is like a buffet with a kitchen in the back — food appears on the counter only when a dish runs low (viewport intersection), not all at once at the start."
            seniorTip="Use native loading='lazy' for images below the fold. For hero images, preload them instead. Combine with skeleton screens for perceived performance."
            defaultOpen
          >
            <!-- Interactive Demo: Lazy vs Eager -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 Waterfall comparison: Eager vs Lazy loading</p>
              <div class="space-y-4">
                <!-- Eager -->
                <div>
                  <p class="text-xs font-medium text-red-400 mb-2">❌ Eager: All loaded upfront ({{ eagerTotal }}ms total)</p>
                  <div class="space-y-1">
                    <div v-for="(item, i) in lazyDemo.eager" :key="'eager'+i" class="flex items-center gap-2">
                      <span class="text-xs text-gray-400 w-16 flex-shrink-0 font-mono">img{{ i+1 }}.jpg</span>
                      <div class="flex-1 h-5 bg-gray-200 dark:bg-white/5 rounded overflow-hidden">
                        <div class="h-full rounded transition-all duration-700 bg-red-500/50"
                          :style="{ width: lazyDemo.animating ? item.width + '%' : '0%', marginLeft: item.offset + '%' }">
                        </div>
                      </div>
                      <span class="text-xs text-gray-400 font-mono w-10 text-right">{{ item.size }}k</span>
                    </div>
                  </div>
                </div>
                <!-- Lazy -->
                <div>
                  <p class="text-xs font-medium text-emerald-400 mb-2">✅ Lazy: Loaded on demand ({{ lazyTotal }}ms initial)</p>
                  <div class="space-y-1">
                    <div v-for="(item, i) in lazyDemo.lazy" :key="'lazy'+i" class="flex items-center gap-2">
                      <span class="text-xs text-gray-400 w-16 flex-shrink-0 font-mono">img{{ i+1 }}.jpg</span>
                      <div class="flex-1 h-5 bg-gray-200 dark:bg-white/5 rounded overflow-hidden">
                        <div class="h-full rounded transition-all duration-700"
                          :class="item.deferred ? 'bg-gray-400/30' : 'bg-emerald-500/50'"
                          :style="{ width: lazyDemo.animating ? item.width + '%' : '0%', marginLeft: item.offset + '%' }">
                        </div>
                      </div>
                      <span class="text-xs font-mono w-10 text-right" :class="item.deferred ? 'text-gray-500' : 'text-gray-400'">
                        {{ item.deferred ? 'defer' : item.size + 'k' }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <button @click="runLazyDemo"
                class="mt-3 px-4 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium transition-all">
                ▶ Animate Waterfall
              </button>
            </div>

            <CodePlayground
              title="lazy-loading.js"
              :initialCode="codes.lazyLoading"
            />
          </ConceptCard>

          <ConceptCard
            id="code-splitting"
            icon="✂️"
            title="Code Splitting & Tree Shaking"
            subtitle="Ship only what users need"
            definition="Code splitting breaks your bundle into smaller chunks loaded on demand (route-based or component-based). Tree shaking removes unused exports during bundling — only works with ES6 modules (static analysis)."
            analogy="Code splitting is like packing for a trip — you bring a carry-on (critical code) and check the rest. Tree shaking is Marie Kondo — if the code doesn't spark joy (get used), throw it out."
            seniorTip="Dynamic import() creates split points. Use React.lazy() or Vue defineAsyncComponent(). Analyze bundle size with webpack-bundle-analyzer. A 100KB JS saving = ~300ms faster on 3G."
          >
            <CodePlayground
              title="code-splitting.js"
              :initialCode="codes.codeSplitting"
            />
          </ConceptCard>

          <ConceptCard
            id="script-loading"
            icon="📜"
            title="Script Loading: async vs defer"
            subtitle="How you load scripts affects everything"
            definition="Regular <script>: blocks HTML parsing. async: downloads in parallel, executes immediately when ready (blocks parsing briefly). defer: downloads in parallel, executes after HTML parsing, in order. For ad-tech, this is critical."
            analogy="Regular script = a roadblock (parsing stops). async = a delivery that interrupts you when it arrives (out of order). defer = packages stacked neatly at your door, opened after you finish what you're doing (in order)."
            seniorTip="Use defer for your own scripts (maintains order, doesn't block). Use async for independent third-party scripts (analytics, ads). In ad-tech, script loading strategy directly impacts page speed scores."
          >
            <!-- Visual: Script Loading Timeline -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">📊 Script loading strategies — HTML parsing timeline</p>
              <div class="space-y-4">
                <div v-for="strategy in scriptStrategies" :key="strategy.name">
                  <p class="text-xs font-medium mb-1.5" :class="strategy.color">{{ strategy.label }}</p>
                  <div class="flex gap-0.5 h-6">
                    <div
                      v-for="(block, j) in strategy.blocks"
                      :key="j"
                      class="h-full rounded-sm flex items-center justify-center text-[10px] font-mono text-white/80"
                      :class="block.class"
                      :style="{ flex: block.flex }"
                    >
                      {{ block.label }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-3 flex flex-wrap gap-3 text-xs">
                <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-sm bg-blue-500"></span> HTML Parse</span>
                <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-sm bg-amber-500"></span> Download</span>
                <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-sm bg-red-500"></span> Execute</span>
                <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-sm bg-gray-500"></span> Blocked</span>
              </div>
            </div>

            <CodePlayground
              title="script-loading.js"
              :initialCode="codes.scriptLoading"
            />
          </ConceptCard>
        </template>

        <!-- ==================== CACHING ==================== -->
        <template v-if="activeSection === 'caching'">
          <ConceptCard
            id="memoization"
            icon="🧠"
            title="Memoization"
            subtitle="Cache expensive computations"
            definition="Memoization stores function results based on arguments. If called again with the same args, it returns the cached result instead of recomputing. Works best for pure functions (same input → same output)."
            analogy="Imagine a math teacher who writes solved problems on the board. When a student asks '24 × 17?', she checks the board first. If it's there, instant answer. If not, she solves it and adds it to the board."
            seniorTip="Use memoization for expensive computations (Fibonacci, factorial, complex transforms). In React, useMemo/useCallback. In Vue, computed properties are auto-memoized. Watch cache size — memoizing everything wastes memory."
            defaultOpen
          >
            <!-- Interactive: Fibonacci Timer -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 Fibonacci Calculator — Compare raw vs memoized speed</p>
              <div class="flex flex-wrap items-center gap-3 mb-4">
                <label class="text-sm text-gray-400">n =</label>
                <input
                  v-model.number="fibN"
                  type="range"
                  min="5"
                  max="40"
                  class="flex-1 min-w-[100px] max-w-[200px] accent-emerald-500"
                />
                <span class="text-sm font-mono text-gray-300 w-8">{{ fibN }}</span>
                <button @click="runFibDemo"
                  class="px-4 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium transition-all">
                  ▶ Compute
                </button>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div class="p-3 rounded-lg border border-red-500/20 bg-red-500/5 text-center">
                  <p class="text-xs text-red-400 mb-1">❌ Raw Recursive</p>
                  <p class="text-xl font-mono font-bold text-red-400">{{ fibDemo.rawTime }}</p>
                  <p class="text-xs text-gray-400 mt-1">{{ fibDemo.rawResult !== null ? 'Result: ' + fibDemo.rawResult : '' }}</p>
                </div>
                <div class="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-center">
                  <p class="text-xs text-emerald-400 mb-1">✅ Memoized</p>
                  <p class="text-xl font-mono font-bold text-emerald-400">{{ fibDemo.memoTime }}</p>
                  <p class="text-xs text-gray-400 mt-1">{{ fibDemo.memoResult !== null ? 'Result: ' + fibDemo.memoResult : '' }}</p>
                </div>
              </div>
              <p v-if="fibDemo.speedup" class="text-xs text-emerald-400 mt-2 text-center">
                ⚡ Memoized is {{ fibDemo.speedup }}x faster!
              </p>
            </div>

            <CodePlayground
              title="memoization.js"
              :initialCode="codes.memoization"
              :autoRun="true"
            />
          </ConceptCard>

          <ConceptCard
            id="minification"
            icon="🗜️"
            title="Minification & Compression"
            subtitle="Shrink your files before shipping"
            definition="Minification removes whitespace, comments, and shortens variable names (Terser for JS, cssnano for CSS). Compression (gzip/brotli) further reduces transfer size. Combined, they can reduce bundle size by 60-80%."
            analogy="Minification is removing all vowels from a txt msg (u cn stll rd it). Compression is vacuum-sealing a suitcase — same clothes, fraction of the space."
            seniorTip="Enable Brotli compression (better than gzip) on your server. Use source maps in production for debugging. Monitor bundle size in CI with bundlesize or size-limit packages."
          >
            <CodePlayground
              title="minification.js"
              :initialCode="codes.minification"
            />
          </ConceptCard>
        </template>

        <!-- ==================== FRAMEWORK ==================== -->
        <template v-if="activeSection === 'framework'">
          <ConceptCard
            id="virtual-dom"
            icon="🌳"
            title="Virtual DOM — Why Frameworks Are Fast"
            subtitle="The diffing algorithm explained"
            definition="The Virtual DOM is a lightweight JS representation of the real DOM. When state changes, a new VDOM tree is created, diffed against the old one, and only the changed nodes are updated in the real DOM (reconciliation)."
            analogy="Imagine editing a Word document: instead of reprinting the entire document (real DOM update), you track changes (diff) and only reprint the modified pages (minimal DOM patches)."
            seniorTip="The VDOM isn't inherently faster than hand-optimized DOM updates — it provides a good-enough performance floor with a great developer experience. Svelte skips VDOM entirely and compiles to direct DOM updates."
            defaultOpen
          >
            <!-- Interactive: VDOM vs Direct DOM -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 Virtual DOM diffing — Click to change items and see the diff</p>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <!-- Old Tree -->
                <div class="p-3 rounded-lg border border-gray-500/20 bg-gray-500/5">
                  <p class="text-xs font-medium text-gray-400 mb-2">Old VDOM</p>
                  <div class="space-y-1.5">
                    <div v-for="item in vdomDemo.oldTree" :key="item.id"
                      class="px-2 py-1.5 rounded text-xs font-mono bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300">
                      &lt;{{ item.tag }}&gt; {{ item.text }}
                    </div>
                  </div>
                </div>
                <!-- New Tree -->
                <div class="p-3 rounded-lg border border-blue-500/20 bg-blue-500/5">
                  <p class="text-xs font-medium text-blue-400 mb-2">New VDOM</p>
                  <div class="space-y-1.5">
                    <div v-for="item in vdomDemo.newTree" :key="item.id"
                      class="px-2 py-1.5 rounded text-xs font-mono"
                      :class="item.changed ? 'bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300'">
                      &lt;{{ item.tag }}&gt; {{ item.text }} {{ item.changed ? '← changed' : '' }}
                    </div>
                  </div>
                </div>
                <!-- Patches -->
                <div class="p-3 rounded-lg border border-amber-500/20 bg-amber-500/5">
                  <p class="text-xs font-medium text-amber-400 mb-2">DOM Patches</p>
                  <div class="space-y-1.5">
                    <div v-for="(patch, i) in vdomDemo.patches" :key="i"
                      class="px-2 py-1.5 rounded text-xs font-mono bg-amber-500/10 text-amber-400">
                      {{ patch }}
                    </div>
                    <p class="text-xs text-gray-500 mt-1">Only {{ vdomDemo.patches.length }} update(s) instead of {{ vdomDemo.oldTree.length }} full re-renders</p>
                  </div>
                </div>
              </div>
              <button @click="shuffleVdomDemo"
                class="px-4 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium transition-all">
                🔀 Change State & Diff
              </button>
            </div>

            <CodePlayground
              title="virtual-dom.js"
              :initialCode="codes.virtualDom"
            />
          </ConceptCard>

          <ConceptCard
            id="bundlers"
            icon="📦"
            title="Bundlers: Webpack vs Vite"
            subtitle="How your code gets packaged"
            definition="Webpack: bundles everything upfront, uses loaders/plugins. Vite: uses native ES modules in dev (instant HMR), bundles with Rollup for production. Vite is 10-100x faster in dev because it skips bundling."
            analogy="Webpack is like cooking an entire feast before guests arrive (slow but thorough). Vite is like a sushi bar — it prepares each dish (module) on demand as guests order (browser requests)."
            seniorTip="Use Vite for new projects. Understand Webpack for legacy maintenance. Know how to analyze bundle size, configure aliases, and set up environment variables in both."
          >
            <CodePlayground
              title="bundlers.js"
              :initialCode="codes.bundlers"
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
  { id: 'rendering', label: 'Rendering', icon: '🎨', badge: '2' },
  { id: 'loading', label: 'Loading', icon: '🦥', badge: '3' },
  { id: 'caching', label: 'Caching', icon: '🧠', badge: '2' },
  { id: 'framework', label: 'Framework', icon: '🌳', badge: '2' },
]

const activeSection = ref('rendering')

function setSection(id) {
  activeSection.value = id
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// ==================== CRP Steps ====================
const crpActiveStep = ref(0)
const crpSteps = [
  { title: 'HTML → DOM', detail: 'Browser parses HTML bytes into tokens, then builds the DOM tree — a tree of nodes representing all elements.' },
  { title: 'CSS → CSSOM', detail: 'Browser parses CSS into the CSS Object Model — a tree of styles. Each node knows its computed styles.' },
  { title: 'DOM + CSSOM → Render Tree', detail: 'Combines visible DOM nodes with their computed styles. display:none elements are excluded.' },
  { title: 'Layout (Reflow)', detail: 'Calculates the exact position and size of each element on screen. This is expensive for complex layouts.' },
  { title: 'Paint', detail: 'Fills in pixels — colors, backgrounds, shadows, borders. Multiple layers may be created.' },
  { title: 'Composite', detail: 'GPU composites all layers into the final image. transform and opacity changes only trigger this step (cheapest!).' },
]

// ==================== Thrashing Demo ====================
const thrashingDemo = reactive({
  badWidths: [20, 40, 60, 80, 100],
  goodWidths: [20, 40, 60, 80, 100],
  badTime: '—',
  goodTime: '—',
  running: false
})

function runThrashingDemo() {
  thrashingDemo.running = true

  // Simulate layout thrashing (interleaved reads/writes)
  const badStart = performance.now()
  const badResults = []
  for (let i = 0; i < 1000; i++) {
    // Simulating read + write cycle
    badResults.push(Math.random() * 100)
    void (Math.sin(i) + Math.cos(i)) // Simulate work
  }
  const badEnd = performance.now()
  thrashingDemo.badTime = (badEnd - badStart).toFixed(2)
  thrashingDemo.badWidths = badResults.slice(0, 5).map(v => Math.max(10, v))

  // Simulate batched (reads then writes)
  const goodStart = performance.now()
  const reads = []
  for (let i = 0; i < 1000; i++) reads.push(Math.random() * 100)
  const goodResults = reads.map(v => v)
  const goodEnd = performance.now()
  thrashingDemo.goodTime = (goodEnd - goodStart).toFixed(2)
  thrashingDemo.goodWidths = goodResults.slice(0, 5).map(v => Math.max(10, v))

  thrashingDemo.running = false
}

// ==================== Lazy Loading Demo ====================
const lazyDemo = reactive({
  eager: [
    { size: 240, width: 60, offset: 0 },
    { size: 180, width: 45, offset: 5 },
    { size: 320, width: 80, offset: 3 },
    { size: 150, width: 38, offset: 8 },
    { size: 200, width: 50, offset: 12 },
  ],
  lazy: [
    { size: 240, width: 60, offset: 0, deferred: false },
    { size: 180, width: 45, offset: 0, deferred: false },
    { size: 0, width: 0, offset: 0, deferred: true },
    { size: 0, width: 0, offset: 0, deferred: true },
    { size: 0, width: 0, offset: 0, deferred: true },
  ],
  animating: false
})

const eagerTotal = computed(() => lazyDemo.eager.reduce((sum, item) => sum + item.size, 0) + 100)
const lazyTotal = computed(() => lazyDemo.lazy.filter(i => !i.deferred).reduce((sum, item) => sum + item.size, 0) + 50)

function runLazyDemo() {
  lazyDemo.animating = false
  setTimeout(() => { lazyDemo.animating = true }, 50)
}

// ==================== Fibonacci Demo ====================
const fibN = ref(30)
const fibDemo = reactive({
  rawTime: '—',
  memoTime: '—',
  rawResult: null,
  memoResult: null,
  speedup: null
})

function runFibDemo() {
  // Raw recursive
  function fibRaw(n) {
    if (n <= 1) return n
    return fibRaw(n - 1) + fibRaw(n - 2)
  }

  // Memoized
  function fibMemo(n, memo = {}) {
    if (n in memo) return memo[n]
    if (n <= 1) return n
    memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo)
    return memo[n]
  }

  // Only run raw for n <= 38 to avoid freezing
  if (fibN.value <= 38) {
    const rawStart = performance.now()
    fibDemo.rawResult = fibRaw(fibN.value)
    const rawEnd = performance.now()
    fibDemo.rawTime = (rawEnd - rawStart).toFixed(2) + 'ms'
  } else {
    fibDemo.rawTime = '⚠️ Too slow!'
    fibDemo.rawResult = null
  }

  const memoStart = performance.now()
  fibDemo.memoResult = fibMemo(fibN.value)
  const memoEnd = performance.now()
  fibDemo.memoTime = (memoEnd - memoStart).toFixed(4) + 'ms'

  // Speedup
  if (fibN.value <= 38) {
    const rawMs = parseFloat(fibDemo.rawTime)
    const memoMs = parseFloat(fibDemo.memoTime)
    fibDemo.speedup = memoMs > 0 ? Math.round(rawMs / memoMs) : '∞'
  } else {
    fibDemo.speedup = '∞'
  }
}

// ==================== VDOM Demo ====================
const vdomDemo = reactive({
  oldTree: [
    { id: 1, tag: 'h1', text: 'Hello World' },
    { id: 2, tag: 'p', text: 'Count: 0' },
    { id: 3, tag: 'button', text: 'Click me' },
    { id: 4, tag: 'span', text: 'Status: idle' },
  ],
  newTree: [
    { id: 1, tag: 'h1', text: 'Hello World', changed: false },
    { id: 2, tag: 'p', text: 'Count: 1', changed: true },
    { id: 3, tag: 'button', text: 'Click me', changed: false },
    { id: 4, tag: 'span', text: 'Status: active', changed: true },
  ],
  patches: ['UPDATE p: "Count: 0" → "Count: 1"', 'UPDATE span: "Status: idle" → "Status: active"']
})

let vdomCounter = 1
function shuffleVdomDemo() {
  vdomCounter++
  const states = ['idle', 'active', 'loading', 'error', 'success']
  const newStatus = states[vdomCounter % states.length]
  const changedIndex = vdomCounter % 2 === 0 ? 1 : 3 // Alternate which changes

  vdomDemo.oldTree = vdomDemo.newTree.map(n => ({ ...n, changed: false }))

  vdomDemo.newTree = vdomDemo.oldTree.map((node, i) => {
    if (i === 1) return { ...node, text: `Count: ${vdomCounter}`, changed: true }
    if (i === 3) return { ...node, text: `Status: ${newStatus}`, changed: true }
    return { ...node, changed: false }
  })

  vdomDemo.patches = [
    `UPDATE p: "${vdomDemo.oldTree[1].text}" → "Count: ${vdomCounter}"`,
    `UPDATE span: "${vdomDemo.oldTree[3].text}" → "Status: ${newStatus}"`
  ]
}

// ==================== Script Loading Strategies ====================
const scriptStrategies = [
  {
    name: 'regular',
    label: '<script> (regular)',
    color: 'text-red-400',
    blocks: [
      { label: 'parse', class: 'bg-blue-500', flex: 3 },
      { label: 'blocked', class: 'bg-gray-500', flex: 1 },
      { label: 'download', class: 'bg-amber-500', flex: 2 },
      { label: 'exec', class: 'bg-red-500', flex: 1 },
      { label: 'parse', class: 'bg-blue-500', flex: 3 },
    ]
  },
  {
    name: 'async',
    label: '<script async>',
    color: 'text-amber-400',
    blocks: [
      { label: 'parse', class: 'bg-blue-500', flex: 3 },
      { label: 'exec', class: 'bg-red-500', flex: 1 },
      { label: 'parse', class: 'bg-blue-500', flex: 6 },
    ]
  },
  {
    name: 'defer',
    label: '<script defer>',
    color: 'text-emerald-400',
    blocks: [
      { label: 'parse (no blocking)', class: 'bg-blue-500', flex: 8 },
      { label: 'exec', class: 'bg-red-500', flex: 2 },
    ]
  }
]

// ==================== Code Examples ====================
const codes = {
  criticalPath: `// Critical Rendering Path Optimization Checklist

console.log("🎯 CRP Optimization Strategies:");
console.log("");
console.log("1. MINIMIZE critical resources:");
console.log("   • Inline critical CSS (<14kb)");
console.log("   • Defer non-critical CSS with media queries");
console.log("   • Async/defer non-essential JavaScript");
console.log("");
console.log("2. REDUCE critical bytes:");
console.log("   • Minify CSS, JS, HTML");
console.log("   • Enable Brotli/gzip compression");
console.log("   • Optimize and compress images (WebP/AVIF)");
console.log("");
console.log("3. SHORTEN critical path:");
console.log("   • Reduce number of critical resources");
console.log("   • Use resource hints: preload, prefetch, preconnect");
console.log("   • Avoid render-blocking resources");
console.log("");
console.log("💡 Key metrics to track:");
console.log("   FCP (First Contentful Paint) < 1.8s");
console.log("   LCP (Largest Contentful Paint) < 2.5s");
console.log("   CLS (Cumulative Layout Shift) < 0.1");
console.log("   INP (Interaction to Next Paint) < 200ms");`,

  layoutThrashing: `// 🔴 Layout Thrashing Example

// ❌ BAD: Read-write-read-write loop forces sync layout
function thrashLayout(elements) {
  for (let i = 0; i < elements.length; i++) {
    // FORCED SYNC LAYOUT on every iteration!
    const height = elements[i].offsetHeight; // READ
    elements[i].style.height = (height + 10) + 'px'; // WRITE
  }
}

// ✅ GOOD: Batch all reads, then batch all writes
function batchedLayout(elements) {
  // Phase 1: Read all values
  const heights = elements.map(el => el.offsetHeight);

  // Phase 2: Write all values
  elements.forEach((el, i) => {
    el.style.height = (heights[i] + 10) + 'px';
  });
}

// ✅ BETTER: Use requestAnimationFrame
function rafBatched(elements) {
  // Reads can happen anytime
  const heights = elements.map(el => el.offsetHeight);

  // Writes batched in next frame
  requestAnimationFrame(() => {
    elements.forEach((el, i) => {
      el.style.height = (heights[i] + 10) + 'px';
    });
  });
}

console.log("Layout Thrashing: read→write→read→write in loop");
console.log("Fix: batch reads first, then batch all writes");
console.log("Best: Use requestAnimationFrame for writes");`,

  lazyLoading: `// Native Lazy Loading (simplest)
// <img src="hero.jpg" loading="eager">  ← Above fold
// <img src="below.jpg" loading="lazy">   ← Below fold

// Intersection Observer (more control)
console.log("Intersection Observer API:");

const observerCode = \`
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;  // Load real image
      observer.unobserve(img);    // Stop watching
    }
  });
}, { rootMargin: '200px' }); // Start loading 200px before visible

document.querySelectorAll('img[data-src]')
  .forEach(img => observer.observe(img));
\`;
console.log(observerCode);

// Route-based code splitting (Frameworks)
console.log("\\nDynamic imports for routes:");
console.log("const Home = () => import('./views/Home.vue')");
console.log("const About = () => import('./views/About.vue')");
console.log("Webpack/Vite creates separate chunks automatically!");`,

  codeSplitting: `// Code Splitting Strategies

console.log("1️⃣ Route-based splitting:");
console.log("   const Home = () => import('./Home.vue')");
console.log("   Each route = separate JS chunk\\n");

console.log("2️⃣ Component-based splitting:");
console.log("   const Modal = defineAsyncComponent(");
console.log("     () => import('./HeavyModal.vue')");
console.log("   )\\n");

console.log("3️⃣ Library-based splitting:");
console.log("   Use dynamic import() for heavy libraries:");
console.log("   const { Chart } = await import('chart.js')\\n");

console.log("🌲 Tree Shaking:");
console.log("   WORKS:   import { debounce } from 'lodash-es'");
console.log("   NO WORK: import _ from 'lodash' ← imports ALL 70kb!\\n");

console.log("⚠️ Tree shaking ONLY works with ES6 modules");
console.log("   Because import/export are static (analyzable)");
console.log("   CommonJS require() is dynamic (can't be analyzed)");`,

  scriptLoading: `// Script Loading Strategies

console.log("📜 <script> loading behaviors:\\n");

console.log("1. Regular <script>:");
console.log("   • Blocks HTML parsing");
console.log("   • Downloads and executes immediately");
console.log("   • Use for: critical inline scripts\\n");

console.log("2. <script async>:");
console.log("   • Downloads in parallel (non-blocking)");
console.log("   • Executes AS SOON as downloaded");
console.log("   • Execution ORDER is NOT guaranteed");
console.log("   • Use for: analytics, ads, independent scripts\\n");

console.log("3. <script defer>:");
console.log("   • Downloads in parallel (non-blocking)");
console.log("   • Executes AFTER HTML is fully parsed");
console.log("   • Execution ORDER IS guaranteed");
console.log("   • Use for: your app bundle, framework scripts\\n");

console.log("🎯 Ad-Tech Pro Tip:");
console.log("   Third-party ad scripts should ALWAYS be async");
console.log("   Your framework bundle should be defer");
console.log("   Inline critical CSS + preload key assets");`,

  memoization: `// Memoize: generic higher-order function
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log("  ✅ Cache hit for:", key);
      return cache.get(key);
    }
    console.log("  ❌ Cache miss for:", key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Example: expensive computation
const expensiveAdd = memoize((a, b) => {
  // Simulate heavy work
  let sum = 0;
  for (let i = 0; i < 1000000; i++) sum += 0;
  return a + b;
});

console.log("First call (cache miss):");
console.log("Result:", expensiveAdd(5, 3));
console.log("\\nSecond call (cache hit!):");
console.log("Result:", expensiveAdd(5, 3));
console.log("\\nDifferent args (cache miss):");
console.log("Result:", expensiveAdd(10, 20));`,

  minification: `// What minification does to your code

// BEFORE (readable, 245 bytes):
const beforeCode = \`
function calculateTotal(items) {
  // Calculate the total price
  let total = 0;
  for (const item of items) {
    total += item.price * item.quantity;
  }
  return total;
}
\`;

// AFTER minification (98 bytes — 60% smaller!):
// function calculateTotal(t){let o=0;for(const l of t)o+=l.price*l.quantity;return o}

console.log("Minification removes:");
console.log("  • Whitespace and newlines");
console.log("  • Comments");
console.log("  • Shortens variable names (total → o)");
console.log("  • Removes unnecessary semicolons\\n");

console.log("Compression (gzip/brotli) on top:");
console.log("  Original:   245 bytes");
console.log("  Minified:    98 bytes (−60%)");
console.log("  + Brotli:    62 bytes (−75% total!)\\n");

console.log("Tools: Terser (JS), cssnano (CSS), html-minifier");
console.log("💡 Brotli > gzip (20% better compression)");`,

  virtualDom: `// Virtual DOM Simplified

// The VDOM is just a JS object tree
const oldVDOM = {
  tag: 'div',
  props: { class: 'container' },
  children: [
    { tag: 'h1', children: ['Hello World'] },
    { tag: 'p', children: ['Count: 0'] },
    { tag: 'button', children: ['Click me'] },
  ]
};

const newVDOM = {
  tag: 'div',
  props: { class: 'container' },
  children: [
    { tag: 'h1', children: ['Hello World'] },      // Same
    { tag: 'p', children: ['Count: 1'] },           // Changed!
    { tag: 'button', children: ['Click me'] },      // Same
  ]
};

// Diff algorithm finds minimal changes
function diff(oldNode, newNode) {
  const patches = [];
  if (JSON.stringify(oldNode) !== JSON.stringify(newNode)) {
    patches.push({ type: 'UPDATE', node: newNode });
  }
  return patches;
}

// Only the <p> changed → only 1 DOM update!
console.log("VDOM Reconciliation Process:");
console.log("1. State changes → new VDOM tree created");
console.log("2. Diff old vs new VDOM (in memory, fast!)");
console.log("3. Calculate minimal patches");
console.log("4. Apply ONLY changed nodes to real DOM");
console.log("\\nResult: Instead of re-rendering everything,");
console.log("only the changed <p> tag is updated. 🚀");`,

  bundlers: `// Webpack vs Vite — Key Differences

console.log("📦 WEBPACK (Traditional):");
console.log("  • Bundles EVERYTHING before dev server starts");
console.log("  • Uses loaders for file transforms (babel-loader, etc)");
console.log("  • Hot Module Replacement (HMR) gets slower with size");
console.log("  • Mature ecosystem, handles edge cases well");
console.log("  • Config: webpack.config.js (verbose)\\n");

console.log("⚡ VITE (Modern):");
console.log("  • Dev: serves native ES modules (no bundling!)");
console.log("  • Production: bundles with Rollup");
console.log("  • HMR is instant regardless of app size");
console.log("  • 10-100x faster cold start than Webpack");
console.log("  • Config: vite.config.js (minimal)\\n");

console.log("🤔 Why is Vite faster in dev?");
console.log("  Webpack: bundle ALL files → serve bundle");
console.log("  Vite: serve files AS-IS → browser resolves imports");
console.log("  Browser calls: import './module.js'");
console.log("  Vite intercepts and transforms on-demand\\n");

console.log("💡 Rule of thumb:");
console.log("  New project → Vite");
console.log("  Legacy project → Webpack (migration later)");
console.log("  Need SSR → Both support it (Next.js/Nuxt)");`,
}
</script>
