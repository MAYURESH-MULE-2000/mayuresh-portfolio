<template>
  <div class="learn-perf min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn" class="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4">
        ← Back to Topics
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">🚀</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Web Performance</h1>
      </div>
      <p class="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        Master Core Web Vitals, Critical Rendering Path, Code Splitting, and Caching. High performance is a non-negotiable for senior roles.
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
        <!-- ==================== METRICS (WEB VITALS) ==================== -->
         <template v-if="activeSection === 'metrics'">
          <ConceptCard
            id="cwv"
            icon="📊"
            title="Core Web Vitals (CWV)"
            subtitle="The 3 metrics Google cares about"
            definition="LCP (Largest Contentful Paint): Loading performance. Target < 2.5s.
INP (Interaction to Next Paint): Responsiveness. Target < 200ms.
CLS (Cumulative Layout Shift): Visual Stability. Target < 0.1."
            analogy="LCP = How fast the main dish arrives. INP = How fast the waiter responds when you wave. CLS = Does the table stop moving while you eat?"
            seniorTip="Don't just measure locally. Use RUM (Real User Monitoring) data. A fast dev machine implies nothing about a low-end Android device on 3G. Optimize LCP by preloading the hero image."
            defaultOpen
          >
            <!-- CWV Visualizer -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
               <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <!-- LCP -->
                  <div class="p-4 rounded-lg bg-white dark:bg-gray-800 border border-emerald-500/20 shadow-sm relative overflow-hidden group">
                     <div class="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 text-6xl">⏱️</div>
                     <h3 class="font-bold text-emerald-500 mb-1">LCP</h3>
                     <div class="text-2xl font-mono font-bold mb-1">2.5s</div>
                     <div class="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div class="bg-emerald-500 h-full w-2/3"></div>
                     </div>
                     <p class="text-xs text-gray-500 mt-2">Largest element rendered</p>
                  </div>
                   <!-- INP -->
                  <div class="p-4 rounded-lg bg-white dark:bg-gray-800 border border-blue-500/20 shadow-sm relative overflow-hidden group">
                     <div class="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 text-6xl">⚡</div>
                     <h3 class="font-bold text-blue-500 mb-1">INP</h3>
                     <div class="text-2xl font-mono font-bold mb-1">200ms</div>
                     <div class="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div class="bg-blue-500 h-full w-1/3"></div>
                     </div>
                     <p class="text-xs text-gray-500 mt-2">Click to paint delay</p>
                  </div>
                   <!-- CLS -->
                  <div class="p-4 rounded-lg bg-white dark:bg-gray-800 border border-amber-500/20 shadow-sm relative overflow-hidden group">
                     <div class="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 text-6xl">📏</div>
                     <h3 class="font-bold text-amber-500 mb-1">CLS</h3>
                     <div class="text-2xl font-mono font-bold mb-1">0.1</div>
                     <div class="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div class="bg-amber-500 h-full w-1/12"></div>
                     </div>
                     <p class="text-xs text-gray-500 mt-2">Layout shift score</p>
                  </div>
               </div>
            </div>
            <CodePlayground
              title="web-vitals.js"
              :initialCode="codes.webVitals"
            />
          </ConceptCard>

          <ConceptCard
            id="lighthouse"
            icon="🚦"
            title="Lighthouse & Auditing"
            subtitle="Lab vs Field Data"
            definition="Lighthouse mimics a mid-tier mobile device on a slow connection (Lab Data). Field Data (CrUX) comes from real Chrome users. Lighthouse scores guide optimization, but Field Data impacts SEO rank."
            analogy="Lighthouse is a wind tunnel test for a car (simulated, controlled). CrUX is the MPG reported by millions of real drivers on real roads (real-world usage)."
            seniorTip="Never run Lighthouse in your regular Chrome window (extensions affect score). Use Incognito or the CLI. Aim for all green (90+), but prioritize CWV metrics over the raw score."
          >
             <CodePlayground
              title="audit-workflow.js"
              :initialCode="codes.auditWorkflow"
            />
          </ConceptCard>
        </template>

        <!-- ==================== RENDERING ==================== -->
        <template v-if="activeSection === 'rendering'">
          <ConceptCard
            id="critical-rendering-path"
            icon="🎨"
            title="Critical Rendering Path"
            subtitle="HTML → Pixels"
            definition="HTML → DOM, CSS → CSSOM. DOM + CSSOM → Render Tree → Layout → Paint → Composite. Optimizing this path ensures the user sees content ASAP (FCP/LCP)."
            analogy="Building a house: DOM is blueprint, CSSOM is interior design. Render Tree is the final plan. Layout is measuring. Paint is painting. Composite is furnishing."
            seniorTip="Inline critical CSS (first 14kb). Defer/Async non-critical JS. Preload fonts. Don't block the main thread with heavy hydration."
            defaultOpen
          >
            <!-- Visual Step-by-Step -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 The Pipeline</p>
              <div class="flex gap-1 overflow-x-auto pb-2">
                 <div v-for="(step, i) in crpSteps" :key="i" class="min-w-[100px] p-2 rounded bg-white/5 border border-white/10 text-center">
                    <div class="text-xs font-bold mb-1" :class="i===crpActiveStep ? 'text-emerald-400' : 'text-gray-400'">{{ step.title }}</div>
                 </div>
              </div>
            </div>
            <CodePlayground title="crp-optimization.js" :initialCode="codes.criticalPath" />
          </ConceptCard>

          <ConceptCard
            id="layout-thrashing"
            icon="💥"
            title="Layout Thrashing"
            subtitle="Forced Synchronous Layout"
            definition="Reading layout properties (offsetHeight) immediately after writing style forces the browser to recalculate layout synchronously. This kills performance in animations/loops."
            analogy="Like checking the library catalog (read) then moving a book (write), then checking again (forced re-catalog), then moving another... vs moving all books then checking once."
            seniorTip="Batch reads. Batch writes. Use requestAnimationFrame. Or stick to transform/opacity which skip layout completely."
          >
             <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
               <button @click="runThrashingDemo" class="px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded text-sm font-bold w-full">
                  {{ thrashingDemo.running ? 'Running...' : '▶ Run Read/Write Benchmark' }}
               </button>
               <div class="grid grid-cols-2 gap-4 mt-4">
                  <div class="text-center p-2 bg-red-500/10 rounded">
                     <div class="text-xs text-red-400">Thrashing</div>
                     <div class="font-mono text-xl">{{ thrashingDemo.badTime }}ms</div>
                  </div>
                  <div class="text-center p-2 bg-emerald-500/10 rounded">
                     <div class="text-xs text-emerald-400">Batched</div>
                     <div class="font-mono text-xl">{{ thrashingDemo.goodTime }}ms</div>
                  </div>
               </div>
             </div>
             <CodePlayground title="layout-thrashing.js" :initialCode="codes.layoutThrashing" />
          </ConceptCard>
        </template>

        <!-- ==================== DELIVERY (CDN/Caching) ==================== -->
        <template v-if="activeSection === 'delivery'">
           <ConceptCard
             id="cdn"
             icon="🌍"
             title="CDNs & Edge Caching"
             subtitle="Closer is Faster"
             definition="A Content Delivery Network (CDN) caches your static assets (JS, CSS, Images) in servers physically close to the user (The Edge). This reduces latency (TTFB) significantly."
             analogy="Ordering pizza from a local branch (CDN) vs ordering from the headquarters in Italy (Origin Server). The pizza is the same, but the delivery time is vastly different."
             seniorTip="Cache static assets immutable (Cache-Control: max-age=31536000, immutable). Use stale-while-revalidate for dynamic content if possible. Invalidate via versioned file names (main.a1b2.js)."
             defaultOpen
           >
             <CodePlayground title="caching-headers.js" :initialCode="codes.caching" />
           </ConceptCard>
        </template>
        
        <!-- ==================== CODE SPLITTING & BUNDLING ==================== -->
         <template v-if="activeSection === 'bundling'">
            <ConceptCard
             id="code-splitting"
             icon="✂️"
             title="Code Splitting & Lazy Loading"
             subtitle="Ship only what you use"
             definition="Split your bundle into smaller chunks. 1. Route-based (load page code only when visited). 2. Component-based (load heavy modals only when opened). 3. Library-based (load heavy libs like Charts only when needed)."
             analogy="Code splitting is like packing your luggage in separate bags. You keep your toothbrush (critical) in your carry-on, but your heavy winter coat (non-critical) goes in checked luggage."
             seniorTip="Use `defineAsyncComponent` in Vue/React. Prefetch chunks when user is likely to visit next (e.g. hover over link). Keep initial bundle < 200KB."
             defaultOpen
            >
              <CodePlayground title="code-splitting.js" :initialCode="codes.codeSplitting" />
            </ConceptCard>

            <ConceptCard
             id="tree-shaking"
             icon="🌳"
             title="Tree Shaking"
             subtitle="Remove dead code"
             definition="Tree shaking eliminates unused exports from your final bundle. It relies on ES Modules (import/export) static analysis. If you import a button from a library but never use it, it shouldn't be in the build."
             seniorTip="Use ES Modules (`import/export`). Avoid CommonJS (`require`). Check your bundle for large libraries that don't tree-shake well (e.g. older lodash without specific imports)."
            >
              <CodePlayground title="tree-shaking.js" :initialCode="codes.treeShaking" />
            </ConceptCard>
            
            <ConceptCard
             id="script-loading"
             icon="📜"
             title="Script Loading Strategies"
             subtitle="async vs defer"
             definition="Regular: Blocks parsing. Async: Parallel download, exec ASAP (disordered). Defer: Parallel download, exec after parse (ordered)."
             seniorTip="Use DEFER for your app bundle. Use ASYNC for independent 3rd party scripts (analytics)."
            >
              <CodePlayground title="script-tags.html" :initialCode="codes.scriptLoading" />
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
  { id: 'metrics', label: 'Metrics & Vitals', icon: '📊', badge: 'Core' },
  { id: 'rendering', label: 'Rendering Path', icon: '🎨', badge: 'Core' },
  { id: 'delivery', label: 'CDN & Caching', icon: '🌍', badge: 'Ops' },
  { id: 'bundling', label: 'Splitting & Bundling', icon: '📦', badge: 'Code' },
]

const activeSection = ref('metrics')

function setSection(id) {
  activeSection.value = id
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// ==================== STATE ====================
const crpActiveStep = ref(0)
const crpSteps = [
  { title: 'HTML → DOM' },
  { title: 'CSS → CSSOM' },
  { title: 'Render Tree' },
  { title: 'Layout' },
  { title: 'Paint' },
  { title: 'Composite' },
]

const thrashingDemo = reactive({
  badTime: '—',
  goodTime: '—',
  running: false
})

function runThrashingDemo() {
  thrashingDemo.running = true
  setTimeout(() => {
     // Mock values for consistency in demo
     thrashingDemo.badTime = (Math.random() * 20 + 80).toFixed(1)
     thrashingDemo.goodTime = (Math.random() * 2 + 1).toFixed(1)
     thrashingDemo.running = false
  }, 500)
}

// ==================== CODES ====================
const codes = {
  webVitals: `// 📊 Monitoring Core Web Vitals
import { onLCP, onINP, onCLS } from 'web-vitals';

// 1. Log to console in development
onLCP(console.log);
onINP(console.log);
onCLS(console.log);

// 2. Send to Analytics (GA4) in production
function sendToAnalytics({ name, value, id }) {
  gtag('event', name, {
    event_category: 'Web Vitals',
    event_label: id,
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    non_interaction: true,
  });
}

onLCP(sendToAnalytics); // Largest Contentful Paint
onINP(sendToAnalytics); // Interaction to Next Paint
onCLS(sendToAnalytics); // Cumulative Layout Shift`,

  auditWorkflow: `// 🚦 Lighthouse Audit Workflow Checklist
console.log("Run audits in Incognito or via CLI:");
console.log("npx lighthouse http://localhost:3000 --view");

// Key Checks:
// 1. Viewport meta tag exists?
// 2. Images have dimensions?
// 3. Fonts are preloaded?
// 4. Contrast ratio > 4.5:1?

// CI Integration (Lighthouse CI):
// .lighthouserc.json
{
  "ci": {
    "collect": { "url": ["http://localhost:3000/"] },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "dom-size": ["error", { "maxNumericValue": 3000 }]
      }
    }
  }
}`,

  criticalPath: `// 🎯 CRP Optimization
// 1. Inline Critical CSS (Top ~14KB)
<style>
  /* Header, Hero, Layout skeleton */
  .header { ... } 
</style>

// 2. Preload Critical Assets
<link rel="preload" href="/font.woff2" as="font" crossorigin>
<link rel="preload" href="/hero.webp" as="image">

// 3. Defer non-critical JS
<script defer src="/app.js"><\/script>

// 4. Lazy everything below fold
<img src="footer.png" loading="lazy">`,

  layoutThrashing: `// 🔴 Layout Thrashing
// BAD: Interleaved Read/Write
function resize(items) {
  for (let item of items) {
     // READ (forces layout)
     const w = item.offsetWidth 
     // WRITE (invalidates layout)
     item.style.width = (w * 2) + 'px'
  }
}

// ✅ GOOD: Batch execution
function resizeBatched(items) {
  // 1. Read all
  const widths = items.map(i => i.offsetWidth)
  
  // 2. Write all
  items.forEach((item, i) => {
    item.style.width = (widths[i] * 2) + 'px'
  })
}

// 🏆 BEST: FastDOM or RAF
requestAnimationFrame(() => { /* Writes */ })`,

  caching: `// 🌍 HTTP Caching Headers Strategy

// 1. Immutable Assets (Hashed filenames: main.a5b2.js)
// Cache FOREVER. Browser never asks server again.
Cache-Control: public, max-age=31536000, immutable

// 2. HTML Files (index.html)
// MUST revalidate to check if JS/CSS file names changed.
Cache-Control: no-cache

// 3. API Responses (Dynamic)
// Cache for 1 min, allow serving stale while fetching new version
Cache-Control: public, max-age=60, stale-while-revalidate=300

// Service Worker (App Shell)
// Use strategies like Stale-While-Revalidate for instant render`,

  codeSplitting: `// ✂️ Code Splitting Strategies
  
console.log("1. Route-Based (Load pages on demand)")
const About = () => import('./pages/About.vue')
const Routes = [{ path: '/about', component: About }]

console.log("2. Component-Based (Load heavy UI on demand)")
import { defineAsyncComponent } from 'vue'
const HeavyChart = defineAsyncComponent(() => 
  import('./components/HeavyChart.vue')
)

console.log("3. Logic/Library-Based (Load utils on demand)")
async function downloadPdf() {
  // Only import jsPDF when user clicks button!
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF()
  doc.save('report.pdf')
}`,

  treeShaking: `// 🌳 Tree Shaking (ES Modules)

// ✅ Good: Named Exports (Shakeable)
// math.js
export const add = (a, b) => a + b
export const subtract = (a, b) => a - b

// app.js
import { add } from './math'
// 'subtract' is REMOVED from the bundle!

// ❌ Bad: CommonJS / Object Exports (Hard to shake)
// utils.js
module.exports = {
  formatDate: (date) => ...,
  parseDate: (str) => ...
}
// app.js
const utils = require('./utils')
// EVERYTHING is included, even if you only use formatDate`,

  scriptLoading: `<!-- Script Strategies -->
<!-- 1. PARSER BLOCKING (Bad) -->
<script src="lib.js"><\/script>

<!-- 2. ASYNC (Downloads parallel, runs when ready) -->
<!-- Use for: Analytics, Ads (Order doesn't matter) -->
<script async src="analytics.js"><\/script>

<!-- 3. DEFER (Downloads parallel, runs after HTML parse) -->
<!-- Use for: App Logic (Order preserved) -->
<script defer src="app.js"><\/script>`,
}
</script>
