<template>
  <div class="learn-css min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn" class="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4">
        ← Back to Topics
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">🎨</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">CSS Mastery</h1>
      </div>
      <p class="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        Deep understanding of layout, specificity, and architecture. Interactive builders and visual demos for every concept.
      </p>
    </div>

    <!-- Layout: Nav + Content -->
    <div class="px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 pb-16">
      <SectionNav
        :sections="sections"
        :activeSection="activeSection"
        activeColor="bg-purple-600"
        @select="setSection"
        class="lg:w-56 flex-shrink-0"
      />

      <div class="flex-1 min-w-0 space-y-5">
        <!-- ==================== LAYOUT ==================== -->
        <template v-if="activeSection === 'layout'">
          <ConceptCard
            id="flexbox"
            icon="📐"
            title="Flexbox Deep Dive"
            subtitle="One-dimensional layouts made easy"
            definition="Flexbox is a one-dimensional layout model. Items flow along a main axis (row/column). Key properties: display:flex, justify-content (main axis), align-items (cross axis), flex-grow/shrink/basis, gap, flex-wrap."
            analogy="Flexbox is like a clothesline — items hang in a row (main axis), and you decide if they should spread out, bunch up, or wrap to a new line."
            seniorTip="Use gap instead of margins between flex items. flex: 1 is shorthand for flex-grow:1 flex-shrink:1 flex-basis:0%. Know the difference between align-items (single line) and align-content (multi-line)."
            defaultOpen
          >
            <!-- Interactive Flexbox Playground -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 Flexbox Playground — Change properties and see the result live</p>

              <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div>
                  <label class="block text-xs text-gray-400 mb-1">flex-direction</label>
                  <select v-model="flexDemo.direction" class="w-full bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white text-xs rounded-lg px-2 py-1.5 border-0 outline-none">
                    <option value="row">row</option>
                    <option value="row-reverse">row-reverse</option>
                    <option value="column">column</option>
                    <option value="column-reverse">column-reverse</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs text-gray-400 mb-1">justify-content</label>
                  <select v-model="flexDemo.justify" class="w-full bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white text-xs rounded-lg px-2 py-1.5 border-0 outline-none">
                    <option value="flex-start">flex-start</option>
                    <option value="flex-end">flex-end</option>
                    <option value="center">center</option>
                    <option value="space-between">space-between</option>
                    <option value="space-around">space-around</option>
                    <option value="space-evenly">space-evenly</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs text-gray-400 mb-1">align-items</label>
                  <select v-model="flexDemo.align" class="w-full bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white text-xs rounded-lg px-2 py-1.5 border-0 outline-none">
                    <option value="stretch">stretch</option>
                    <option value="flex-start">flex-start</option>
                    <option value="flex-end">flex-end</option>
                    <option value="center">center</option>
                    <option value="baseline">baseline</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs text-gray-400 mb-1">flex-wrap</label>
                  <select v-model="flexDemo.wrap" class="w-full bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white text-xs rounded-lg px-2 py-1.5 border-0 outline-none">
                    <option value="nowrap">nowrap</option>
                    <option value="wrap">wrap</option>
                    <option value="wrap-reverse">wrap-reverse</option>
                  </select>
                </div>
              </div>

              <!-- Flex Container Preview -->
              <div
                class="min-h-[150px] rounded-xl border-2 border-dashed border-purple-500/30 bg-purple-500/5 p-3 transition-all"
                :style="{
                  display: 'flex',
                  flexDirection: flexDemo.direction,
                  justifyContent: flexDemo.justify,
                  alignItems: flexDemo.align,
                  flexWrap: flexDemo.wrap,
                  gap: '8px'
                }"
              >
                <div
                  v-for="(item, i) in flexItems"
                  :key="i"
                  class="px-4 py-3 rounded-lg font-mono text-xs font-bold text-white shadow-sm flex-shrink-0"
                  :class="item.color"
                  :style="{ flexGrow: item.grow, minWidth: item.minW + 'px', minHeight: item.minH + 'px' }"
                >
                  {{ item.label }}<br>
                  <span class="font-normal opacity-70">grow:{{ item.grow }}</span>
                </div>
              </div>

              <!-- Generated CSS -->
              <div class="mt-3 p-3 rounded-lg bg-gray-900 font-mono text-xs text-gray-300">
                <span class="text-purple-400">.container</span> {<br>
                &nbsp;&nbsp;display: <span class="text-emerald-400">flex</span>;<br>
                &nbsp;&nbsp;flex-direction: <span class="text-emerald-400">{{ flexDemo.direction }}</span>;<br>
                &nbsp;&nbsp;justify-content: <span class="text-emerald-400">{{ flexDemo.justify }}</span>;<br>
                &nbsp;&nbsp;align-items: <span class="text-emerald-400">{{ flexDemo.align }}</span>;<br>
                &nbsp;&nbsp;flex-wrap: <span class="text-emerald-400">{{ flexDemo.wrap }}</span>;<br>
                }
              </div>
            </div>
          </ConceptCard>

          <ConceptCard
            id="grid"
            icon="🔲"
            title="CSS Grid"
            subtitle="Two-dimensional layout powerhouse"
            definition="CSS Grid is a two-dimensional layout system. Define rows and columns with grid-template-rows/columns, place items with grid-row/column. Use fr units for flexible sizing, minmax() for responsive ranges."
            analogy="Grid is like a spreadsheet — you define rows and columns, then place items into specific cells. Unlike Flexbox (clothesline), Grid controls BOTH axes simultaneously."
            seniorTip="Use Grid for page layouts and Flexbox for component-level alignment. grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)) creates responsive grids without media queries."
          >
            <!-- Interactive Grid Playground -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 Grid Playground — Adjust columns and gap</p>

              <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                <div>
                  <label class="block text-xs text-gray-400 mb-1">Columns</label>
                  <select v-model="gridDemo.cols" class="w-full bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white text-xs rounded-lg px-2 py-1.5 border-0 outline-none">
                    <option value="1fr">1fr (1 col)</option>
                    <option value="1fr 1fr">1fr 1fr (2 cols)</option>
                    <option value="1fr 1fr 1fr">1fr 1fr 1fr (3 cols)</option>
                    <option value="1fr 2fr 1fr">1fr 2fr 1fr (wide center)</option>
                    <option value="repeat(auto-fill, minmax(80px, 1fr))">auto-fill responsive</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs text-gray-400 mb-1">Gap</label>
                  <select v-model="gridDemo.gap" class="w-full bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white text-xs rounded-lg px-2 py-1.5 border-0 outline-none">
                    <option value="4px">4px</option>
                    <option value="8px">8px</option>
                    <option value="12px">12px</option>
                    <option value="16px">16px</option>
                    <option value="24px">24px</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs text-gray-400 mb-1">Items</label>
                  <select v-model.number="gridDemo.items" class="w-full bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white text-xs rounded-lg px-2 py-1.5 border-0 outline-none">
                    <option :value="4">4</option>
                    <option :value="6">6</option>
                    <option :value="9">9</option>
                    <option :value="12">12</option>
                  </select>
                </div>
              </div>

              <div
                class="rounded-xl border-2 border-dashed border-purple-500/30 bg-purple-500/5 p-3"
                :style="{
                  display: 'grid',
                  gridTemplateColumns: gridDemo.cols,
                  gap: gridDemo.gap,
                }"
              >
                <div
                  v-for="n in gridDemo.items"
                  :key="n"
                  class="p-3 rounded-lg font-mono text-xs font-bold text-white text-center"
                  :class="gridColors[(n - 1) % gridColors.length]"
                >
                  {{ n }}
                </div>
              </div>

              <div class="mt-3 p-3 rounded-lg bg-gray-900 font-mono text-xs text-gray-300">
                <span class="text-purple-400">.grid</span> {<br>
                &nbsp;&nbsp;display: <span class="text-emerald-400">grid</span>;<br>
                &nbsp;&nbsp;grid-template-columns: <span class="text-emerald-400">{{ gridDemo.cols }}</span>;<br>
                &nbsp;&nbsp;gap: <span class="text-emerald-400">{{ gridDemo.gap }}</span>;<br>
                }
              </div>
            </div>
          </ConceptCard>

          <ConceptCard
            id="centering"
            icon="⭕"
            title="Centering — The Interview Classic"
            subtitle="'Why is this div not centering?'"
            definition="There are multiple ways to center in CSS. The modern approach: display:grid; place-items:center (both axes in one line). Also: display:flex; justify-content:center; align-items:center. Or position:absolute with transform."
            analogy="Centering in CSS is like parking in a lot — there are many valid spots (methods), but some are easier than others. place-items:center is the VIP spot right by the entrance."
            seniorTip="Grid place-items:center is the cleanest one-liner for centering. For text, use text-align:center + line-height. For absolute positioning, use inset:0 + margin:auto. Know multiple methods because interviewers love this question."
          >
            <!-- Centering Methods Showcase -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 Pick a centering method — see it applied</p>
              <div class="flex flex-wrap gap-2 mb-4">
                <button
                  v-for="method in centerMethods"
                  :key="method.name"
                  @click="activeCenterMethod = method.name"
                  class="px-3 py-1.5 text-xs rounded-lg font-medium transition-all"
                  :class="activeCenterMethod === method.name
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-gray-400 hover:bg-purple-500/20'"
                >
                  {{ method.name }}
                </button>
              </div>

              <div class="h-40 rounded-xl border-2 border-dashed border-purple-500/30 bg-purple-500/5 relative"
                :style="currentCenterStyle">
                <div class="w-16 h-16 rounded-lg bg-purple-500 text-white text-xs font-bold flex items-center justify-center"
                  :style="currentCenterChildStyle">
                  Div
                </div>
              </div>

              <div class="mt-3 p-3 rounded-lg bg-gray-900 font-mono text-xs text-gray-300 whitespace-pre-wrap break-words">{{ currentCenterCSS }}</div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== SPECIFICITY ==================== -->
        <template v-if="activeSection === 'specificity'">
          <ConceptCard
            id="specificity"
            icon="⚖️"
            title="CSS Specificity"
            subtitle="Which style wins?"
            definition="Specificity is a scoring system: inline styles (1000) > IDs (100) > classes/attributes/pseudo-classes (10) > elements/pseudo-elements (1). !important overrides all (but avoid it). When equal specificity, the LAST rule wins."
            analogy="Specificity is like a military rank: a General (ID) outranks a Captain (class), who outranks a Private (element). No matter how many Privates you have, one General overrides them all."
            seniorTip="Keep specificity flat — use classes only (BEM methodology). Avoid IDs in CSS. If you need to override, increase specificity minimally or use :where() (zero specificity). Never use !important in production CSS."
            defaultOpen
          >
            <!-- Interactive Specificity Calculator -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 Specificity Calculator — Enter selectors and compare</p>
              <div class="space-y-3">
                <div v-for="(sel, i) in specificitySelectors" :key="i" class="flex items-center gap-3">
                  <input
                    v-model="sel.text"
                    :placeholder="sel.placeholder"
                    class="flex-1 bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white text-sm font-mono rounded-lg px-3 py-2 border-0 outline-none"
                  />
                  <div class="flex gap-1 flex-shrink-0">
                    <span class="px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs font-mono" title="IDs">{{ calcSpecificity(sel.text).ids }}</span>
                    <span class="px-2 py-1 rounded bg-amber-500/20 text-amber-400 text-xs font-mono" title="Classes">{{ calcSpecificity(sel.text).classes }}</span>
                    <span class="px-2 py-1 rounded bg-blue-500/20 text-blue-400 text-xs font-mono" title="Elements">{{ calcSpecificity(sel.text).elements }}</span>
                  </div>
                </div>
              </div>
              <div class="mt-3 flex items-center gap-2 text-xs text-gray-400">
                <span class="px-2 py-1 rounded bg-red-500/10">IDs</span>
                <span class="px-2 py-1 rounded bg-amber-500/10">Classes</span>
                <span class="px-2 py-1 rounded bg-blue-500/10">Elements</span>
                <span class="ml-auto">{{ specificityWinner }}</span>
              </div>
            </div>
          </ConceptCard>

          <ConceptCard
            id="stacking-context"
            icon="🗂️"
            title="Stacking Context & z-index"
            subtitle="Why your z-index:9999 doesn't work"
            definition="A stacking context is a 3D layer. z-index only works within the SAME stacking context. A new stacking context is created by: position + z-index, opacity < 1, transform, filter, will-change, isolation:isolate."
            analogy="Stacking contexts are like sealed envelopes. You can reorder papers (z-index) WITHIN an envelope, but all papers in envelope A are either above or below ALL papers in envelope B. You can't interleave them."
            seniorTip="Use isolation:isolate to create a new stacking context without side effects. When z-index 'doesn't work', trace up the DOM to find which parent creates a stacking context. Chrome DevTools' Layers panel helps debug this."
          >
            <!-- z-index Stacking Demo -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 Drag the z-index sliders — see stacking contexts in action</p>
              <div class="relative h-48 rounded-xl bg-gray-200 dark:bg-white/5 overflow-hidden">
                <div
                  v-for="(box, i) in stackingBoxes"
                  :key="i"
                  class="absolute rounded-lg w-24 h-24 flex flex-col items-center justify-center text-xs font-bold text-white shadow-lg"
                  :class="box.color"
                  :style="{ left: box.x + 'px', top: box.y + 'px', zIndex: box.z }"
                >
                  <span>z: {{ box.z }}</span>
                  <span class="font-normal opacity-70">{{ box.label }}</span>
                </div>
              </div>
              <div class="mt-3 grid grid-cols-3 gap-3">
                <div v-for="(box, i) in stackingBoxes" :key="'slider'+i" class="flex flex-col items-center gap-1">
                  <label class="text-xs font-mono" :class="box.textColor">{{ box.label }}</label>
                  <input type="range" v-model.number="box.z" min="-1" max="10" class="w-full accent-purple-500" />
                  <span class="text-xs font-mono text-gray-400">z-index: {{ box.z }}</span>
                </div>
              </div>
            </div>

            <CodePlayground
              title="stacking-context.js"
              :initialCode="codes.stackingContext"
            />
          </ConceptCard>
        </template>

        <!-- ==================== RESPONSIVE ==================== -->
        <template v-if="activeSection === 'responsive'">
          <ConceptCard
            id="media-queries"
            icon="📱"
            title="Responsive Design & Media Queries"
            subtitle="One codebase, every screen"
            definition="Responsive design adapts layout to viewport size using media queries, fluid typography (clamp()), and flexible units (%, vw, vh, rem). Mobile-first approach: start with mobile styles, add @media (min-width) for larger screens."
            analogy="Responsive design is like water — it takes the shape of its container. Media queries are like valves that change the flow at certain points."
            seniorTip="Use min-width (mobile-first) over max-width. Common breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl). Use clamp() for fluid typography: clamp(1rem, 2.5vw, 2rem). Container queries (@container) are the future."
            defaultOpen
          >
            <!-- Breakpoint Visualizer -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">📊 Common breakpoints — your current viewport is highlighted</p>
              <div class="space-y-2">
                <div v-for="bp in breakpoints" :key="bp.name"
                  class="flex items-center gap-3 p-2 rounded-lg transition-all"
                  :class="isActiveBreakpoint(bp) ? 'bg-purple-500/10 border border-purple-500/20' : ''">
                  <span class="w-12 text-xs font-mono font-bold" :class="isActiveBreakpoint(bp) ? 'text-purple-400' : 'text-gray-400'">{{ bp.name }}</span>
                  <div class="flex-1 h-4 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                    <div class="h-full rounded-full transition-all"
                      :class="isActiveBreakpoint(bp) ? 'bg-purple-500' : 'bg-gray-300 dark:bg-white/10'"
                      :style="{ width: Math.min(100, bp.min / 14) + '%' }">
                    </div>
                  </div>
                  <span class="text-xs text-gray-400 font-mono w-16 text-right">≥{{ bp.min }}px</span>
                </div>
              </div>
              <p class="mt-3 text-xs text-gray-400">Your viewport: <span class="text-purple-400 font-mono font-bold">{{ viewportWidth }}px</span></p>
            </div>

            <CodePlayground
              title="responsive.js"
              :initialCode="codes.responsive"
            />
          </ConceptCard>

          <ConceptCard
            id="bem"
            icon="🏷️"
            title="BEM Methodology & CSS Architecture"
            subtitle="Scalable naming conventions"
            definition="BEM = Block__Element--Modifier. Block: standalone component (card). Element: part of block (card__title). Modifier: variation (card--highlighted). It creates flat specificity and self-documenting class names."
            analogy="BEM is like addressing mail: Block = building (card), Element = apartment (card__header), Modifier = special note (card__header--large). Each class tells you exactly where it belongs."
            seniorTip="BEM keeps CSS flat (single class selectors = lowest specificity). Combine with utility classes (Tailwind) or CSS Modules for scoping. In component frameworks, scoped styles replace BEM's namespace benefits."
          >
            <CodePlayground
              title="bem.js"
              :initialCode="codes.bem"
            />
          </ConceptCard>

          <ConceptCard
            id="cross-browser"
            icon="🌐"
            title="Cross-Browser Issues & Fixes"
            subtitle="Why it looks different in Safari"
            definition="Browsers render CSS differently. Common issues: Safari flexbox gap support, Firefox scrollbar styling, webkit-prefixes, different default styles. Use CSS resets (normalize.css), autoprefixer, and caniuse.com."
            analogy="Cross-browser compatibility is like cooking the same recipe in different kitchens — each oven (browser) heats slightly differently, so you need to test and adjust."
            seniorTip="Use `@supports` for progressive enhancement. Test on real devices, not just emulators. Safari is the new IE — always test on WebKit. Use browserslist to configure target browsers for autoprefixer and Babel."
          >
            <CodePlayground
              title="cross-browser.js"
              :initialCode="codes.crossBrowser"
            />
          </ConceptCard>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import SectionNav from './SectionNav.vue'
import ConceptCard from './ConceptCard.vue'
import CodePlayground from './CodePlayground.vue'

// Section Nav
const sections = [
  { id: 'layout', label: 'Layout', icon: '📐', badge: '3' },
  { id: 'specificity', label: 'Specificity', icon: '⚖️', badge: '2' },
  { id: 'responsive', label: 'Responsive', icon: '📱', badge: '3' },
]

const activeSection = ref('layout')

function setSection(id) {
  activeSection.value = id
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// ==================== Flexbox Demo ====================
const flexDemo = reactive({
  direction: 'row',
  justify: 'flex-start',
  align: 'stretch',
  wrap: 'nowrap',
})

const flexItems = [
  { label: 'A', grow: 0, minW: 60, minH: 40, color: 'bg-purple-500' },
  { label: 'B', grow: 1, minW: 60, minH: 60, color: 'bg-blue-500' },
  { label: 'C', grow: 0, minW: 80, minH: 50, color: 'bg-emerald-500' },
  { label: 'D', grow: 2, minW: 60, minH: 45, color: 'bg-amber-500' },
]

// ==================== Grid Demo ====================
const gridDemo = reactive({
  cols: '1fr 1fr 1fr',
  gap: '8px',
  items: 9,
})

const gridColors = ['bg-purple-500', 'bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-cyan-500', 'bg-indigo-500', 'bg-orange-500', 'bg-teal-500', 'bg-pink-500', 'bg-lime-500', 'bg-violet-500']

// ==================== Centering Demo ====================
const activeCenterMethod = ref('Grid')

const centerMethods = [
  {
    name: 'Grid',
    parent: { display: 'grid', placeItems: 'center' },
    child: {},
    css: `.parent {\n  display: grid;\n  place-items: center;\n}`
  },
  {
    name: 'Flexbox',
    parent: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
    child: {},
    css: `.parent {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}`
  },
  {
    name: 'Absolute',
    parent: { position: 'relative' },
    child: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
    css: `.parent { position: relative; }\n.child {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}`
  },
  {
    name: 'Margin Auto',
    parent: { display: 'flex' },
    child: { margin: 'auto' },
    css: `.parent { display: flex; }\n.child { margin: auto; }`
  },
]

const currentCenterStyle = computed(() => {
  const m = centerMethods.find(m => m.name === activeCenterMethod.value)
  return m ? m.parent : {}
})

const currentCenterChildStyle = computed(() => {
  const m = centerMethods.find(m => m.name === activeCenterMethod.value)
  return m ? m.child : {}
})

const currentCenterCSS = computed(() => {
  const m = centerMethods.find(m => m.name === activeCenterMethod.value)
  return m ? m.css : ''
})

// ==================== Specificity Calculator ====================
const specificitySelectors = reactive([
  { text: '#header .nav a', placeholder: '#header .nav a' },
  { text: '.nav-link.active', placeholder: '.nav-link.active' },
])

function calcSpecificity(selector) {
  if (!selector) return { ids: 0, classes: 0, elements: 0 }
  const ids = (selector.match(/#[a-zA-Z][\w-]*/g) || []).length
  const classes = (selector.match(/\.[a-zA-Z][\w-]*/g) || []).length +
    (selector.match(/\[/g) || []).length +
    (selector.match(/:(hover|focus|active|first-child|last-child|nth-child|not|visited|checked|disabled|enabled|required|valid|invalid|placeholder-shown)/g) || []).length
  const elements = (selector.match(/(^|[\s>+~])([a-zA-Z][a-zA-Z0-9]*)/g) || []).length +
    (selector.match(/::(before|after|first-line|first-letter|placeholder|selection)/g) || []).length
  return { ids, classes, elements }
}

const specificityWinner = computed(() => {
  const s1 = calcSpecificity(specificitySelectors[0].text)
  const s2 = calcSpecificity(specificitySelectors[1].text)
  const score1 = s1.ids * 100 + s1.classes * 10 + s1.elements
  const score2 = s2.ids * 100 + s2.classes * 10 + s2.elements
  if (score1 > score2) return '← First selector wins (' + score1 + ' vs ' + score2 + ')'
  if (score2 > score1) return 'Second selector wins → (' + score2 + ' vs ' + score1 + ')'
  return 'Equal specificity — last rule wins (' + score1 + ')'
})

// ==================== Stacking Context Demo ====================
const stackingBoxes = reactive([
  { label: 'Red', color: 'bg-red-500', textColor: 'text-red-400', x: 20, y: 20, z: 3 },
  { label: 'Blue', color: 'bg-blue-500', textColor: 'text-blue-400', x: 60, y: 50, z: 2 },
  { label: 'Green', color: 'bg-emerald-500', textColor: 'text-emerald-400', x: 100, y: 80, z: 1 },
])

// ==================== Responsive Demo ====================
const viewportWidth = ref(0)

const breakpoints = [
  { name: 'xs', min: 0 },
  { name: 'sm', min: 640 },
  { name: 'md', min: 768 },
  { name: 'lg', min: 1024 },
  { name: 'xl', min: 1280 },
  { name: '2xl', min: 1536 },
]

function isActiveBreakpoint(bp) {
  const idx = breakpoints.indexOf(bp)
  const next = breakpoints[idx + 1]
  return viewportWidth.value >= bp.min && (!next || viewportWidth.value < next.min)
}

function updateViewportWidth() {
  viewportWidth.value = window.innerWidth
}

onMounted(() => {
  updateViewportWidth()
  window.addEventListener('resize', updateViewportWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateViewportWidth)
})

// ==================== Code Examples ====================
const codes = {
  stackingContext: `// What creates a new stacking context?

console.log("🗂️ Stacking Context Triggers:");
console.log("");
console.log("1. position: relative/absolute/fixed + z-index");
console.log("2. opacity < 1");
console.log("3. transform (any value)");
console.log("4. filter (blur, grayscale, etc.)");
console.log("5. will-change (transform, opacity, etc.)");
console.log("6. isolation: isolate ← cleanest way!");
console.log("7. contain: layout/paint");
console.log("8. mix-blend-mode (not normal)");
console.log("");
console.log("🔑 Key Rule:");
console.log("z-index only competes within the SAME context!");
console.log("");
console.log("Why z-index:9999 doesn't work?");
console.log("→ Parent has opacity:0.99 → new stacking context");
console.log("→ Your element is trapped INSIDE that context");
console.log("→ Fix: check parents for context-creating props");`,

  responsive: `// Responsive Design Best Practices

console.log("📱 Mobile-First Approach:");
console.log("  Start with mobile styles (default)");
console.log("  Add @media (min-width: 768px) for tablets");
console.log("  Add @media (min-width: 1024px) for desktop\\n");

console.log("📏 Fluid Typography with clamp():");
console.log("  h1 { font-size: clamp(1.5rem, 3vw, 3rem); }");
console.log("  → Min: 1.5rem, Max: 3rem, Fluid between\\n");

console.log("🔲 Responsive Grid without Media Queries:");
console.log("  grid-template-columns:");
console.log("    repeat(auto-fill, minmax(250px, 1fr));");
console.log("  → Auto-adjusts columns based on space\\n");

console.log("📦 Container Queries (Modern CSS):");
console.log("  .card { container-type: inline-size; }");
console.log("  @container (min-width: 400px) {");
console.log("    .card-content { flex-direction: row; }");
console.log("  }");
console.log("  → Component responds to ITS container, not viewport!");`,

  bem: `// BEM: Block__Element--Modifier

console.log("🏷️ BEM Naming Convention:\\n");

console.log("Block = standalone component:");
console.log("  .card { }\\n");

console.log("Element = part of block (double underscore):");
console.log("  .card__header { }");
console.log("  .card__body { }");
console.log("  .card__footer { }\\n");

console.log("Modifier = variation (double dash):");
console.log("  .card--featured { }");
console.log("  .card__header--large { }\\n");

console.log("❌ DON'T nest deeper than Block__Element:");
console.log('  .card__header__title { } // BAD!');
console.log('  .card__title { }         // GOOD!\\n');

console.log("✅ Why BEM?");
console.log("  • Flat specificity (all single classes)");
console.log("  • Self-documenting (class = component address)");
console.log("  • No cascade conflicts");
console.log("  • Works great with preprocessors (SCSS)");`,

  crossBrowser: `// Cross-Browser Gotchas & Fixes

console.log("🌐 Common Cross-Browser Issues:\\n");

console.log("1️⃣ Safari Flexbox Gap:");
console.log("  gap works in Grid since Safari 12");
console.log("  gap in Flexbox since Safari 14.1");
console.log("  Fallback: use margins + negative margin on parent\\n");

console.log("2️⃣ Scrollbar Styling:");
console.log("  Chrome/Safari: ::-webkit-scrollbar");
console.log("  Firefox: scrollbar-width + scrollbar-color");
console.log("  Standard: scrollbar-gutter for spacing\\n");

console.log("3️⃣ @supports for Progressive Enhancement:");
console.log("  @supports (display: grid) {");
console.log("    .layout { display: grid; }");
console.log("  }\\n");

console.log("4️⃣ CSS Custom Properties Fallbacks:");
console.log("  color: var(--primary, #3b82f6);");
console.log("  → Fallback value if variable isn't defined\\n");

console.log("💡 Tools:");
console.log("  caniuse.com → check browser support");
console.log("  autoprefixer → auto-add vendor prefixes");
console.log("  browserslist → configure target browsers");`,
}
</script>
