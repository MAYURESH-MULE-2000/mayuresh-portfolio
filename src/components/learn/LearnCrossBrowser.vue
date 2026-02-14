<template>
  <div class="learn-crossbrowser min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn" class="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4">
        ← Back to Topics
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">🌍</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Cross-Browser &amp; HTML5</h1>
      </div>
      <p class="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        Cross-browser compatibility, semantic HTML5, browser quirks, responsive design patterns, web standards, and building markup that works everywhere without frameworks.
      </p>
    </div>

    <!-- Layout -->
    <div class="px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 pb-16">
      <SectionNav
        :sections="sections"
        :activeSection="activeSection"
        activeColor="bg-orange-600"
        @select="setSection"
        class="lg:w-56 flex-shrink-0"
      />

      <div class="flex-1 min-w-0 space-y-5">
        <!-- ==================== SEMANTIC HTML ==================== -->
        <template v-if="activeSection === 'semantic'">
          <ConceptCard
            id="semantic-html"
            icon="📝"
            title="Semantic HTML5 Elements"
            subtitle="Structure that means something"
            definition="Semantic HTML uses elements that describe their content: nav, main, article, section, aside, header, footer, figure, figcaption, time, mark, details/summary. Benefits: accessibility, SEO, readability, and maintainability."
            analogy="Semantic HTML is like labeling boxes when you move house — 'Kitchen Items' is way more useful than 'Box #7'. Screen readers, search engines, and other developers all benefit from clear labels."
            seniorTip="At Media.net, premium properties need excellent SEO. Semantic HTML is free SEO boost. Always use one h1 per page, proper heading hierarchy, nav for navigation, main for primary content. Never use div soup."
            defaultOpen
          >
            <!-- Semantic vs Non-Semantic Comparison -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">📊 Semantic vs Non-Semantic Markup</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="p-3 rounded-lg border border-red-500/20 bg-red-500/5">
                  <p class="text-xs font-bold text-red-400 mb-2">❌ Div Soup</p>
                  <div class="font-mono text-xs text-gray-300 space-y-0.5">
                    <p>&lt;div class="header"&gt;</p>
                    <p>&nbsp;&nbsp;&lt;div class="nav"&gt;...&lt;/div&gt;</p>
                    <p>&lt;/div&gt;</p>
                    <p>&lt;div class="content"&gt;</p>
                    <p>&nbsp;&nbsp;&lt;div class="article"&gt;...&lt;/div&gt;</p>
                    <p>&nbsp;&nbsp;&lt;div class="sidebar"&gt;...&lt;/div&gt;</p>
                    <p>&lt;/div&gt;</p>
                    <p>&lt;div class="footer"&gt;...&lt;/div&gt;</p>
                  </div>
                </div>
                <div class="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
                  <p class="text-xs font-bold text-emerald-400 mb-2">✅ Semantic HTML</p>
                  <div class="font-mono text-xs text-gray-300 space-y-0.5">
                    <p>&lt;<span class="text-emerald-400">header</span>&gt;</p>
                    <p>&nbsp;&nbsp;&lt;<span class="text-emerald-400">nav</span>&gt;...&lt;/nav&gt;</p>
                    <p>&lt;/header&gt;</p>
                    <p>&lt;<span class="text-emerald-400">main</span>&gt;</p>
                    <p>&nbsp;&nbsp;&lt;<span class="text-emerald-400">article</span>&gt;...&lt;/article&gt;</p>
                    <p>&nbsp;&nbsp;&lt;<span class="text-emerald-400">aside</span>&gt;...&lt;/aside&gt;</p>
                    <p>&lt;/main&gt;</p>
                    <p>&lt;<span class="text-emerald-400">footer</span>&gt;...&lt;/footer&gt;</p>
                  </div>
                </div>
              </div>
            </div>

            <CodePlayground
              title="semantic-html.js"
              :initialCode="codes.semanticHtml"
            />
          </ConceptCard>

          <ConceptCard
            id="meta-seo"
            icon="🔍"
            title="Meta Tags & SEO Fundamentals"
            subtitle="What search engines and social platforms see"
            definition="Essential meta tags: title, description, viewport, charset, Open Graph (og:title, og:image), Twitter Cards, canonical URLs, robots. These directly affect search rankings, social sharing previews, and responsive behavior."
            analogy="Meta tags are like the back cover of a book — the title and summary that help people (and Google) decide whether to 'read' (visit) your page."
            seniorTip="At Media.net, informational websites need top-tier SEO. Always include: unique title (50-60 chars), description (150-160 chars), og:image (1200x630px), canonical URL, proper viewport meta. Use structured data (JSON-LD) for rich snippets."
          >
            <CodePlayground
              title="meta-seo.js"
              :initialCode="codes.metaSeo"
            />
          </ConceptCard>
        </template>

        <!-- ==================== CROSS-BROWSER ==================== -->
        <template v-if="activeSection === 'crossbrowser'">
          <ConceptCard
            id="browser-quirks"
            icon="🐛"
            title="Browser Quirks & Compatibility"
            subtitle="Why it looks different in Safari"
            definition="Different browsers render CSS and handle JS differently. Common issues: Safari gap property support, Firefox scrollbar styling, IE flexbox bugs, Chrome vs Firefox font rendering. Solutions: feature detection, progressive enhancement, vendor prefixes, polyfills."
            analogy="Cross-browser compatibility is like cooking for a dinner party — everyone has different dietary needs (browser engines). You prepare the base dish (standards-first), then add modifications (vendor prefixes) for each guest."
            seniorTip="Media.net requires pixel-perfect cross-browser markup from scratch. Use caniuse.com to check support. Prefer @supports for feature detection over user-agent sniffing. Test on real devices, not just DevTools emulation."
            defaultOpen
          >
            <!-- Browser Compatibility Table -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🐛 Common Browser Quirks to Know</p>
              <div class="space-y-2">
                <div v-for="(quirk, i) in browserQuirks" :key="i"
                  class="p-3 rounded-lg bg-white/5 border border-white/5">
                  <div class="flex items-start gap-2 mb-1.5">
                    <span class="text-xs font-mono px-1.5 py-0.5 rounded" :class="quirk.color">{{ quirk.browser }}</span>
                    <p class="text-sm font-medium text-gray-300 flex-1">{{ quirk.issue }}</p>
                  </div>
                  <p class="text-xs text-gray-500 font-mono">{{ quirk.fix }}</p>
                </div>
              </div>
            </div>

            <CodePlayground
              title="feature-detection.js"
              :initialCode="codes.featureDetection"
            />
          </ConceptCard>

          <ConceptCard
            id="progressive-enhancement"
            icon="📶"
            title="Progressive Enhancement & Graceful Degradation"
            subtitle="Build for the lowest common denominator, enhance for modern"
            definition="Progressive Enhancement: start with basic HTML that works everywhere, then layer on CSS and JS for capable browsers. Graceful Degradation: build the full experience first, then add fallbacks for older browsers."
            analogy="Progressive enhancement is like building a house with good bones first — the structure works, then you add paint, then smart home features. Those without the latest tech still have a solid house."
            seniorTip="Always ask: 'Does this work without JavaScript?' For critical content: yes. For interactive features: provide a noscript fallback. Use @supports, loading='lazy', and feature queries (not browser detection)."
          >
            <CodePlayground
              title="progressive-enhancement.js"
              :initialCode="codes.progressiveEnhancement"
            />
          </ConceptCard>

          <ConceptCard
            id="css-reset"
            icon="🧹"
            title="CSS Reset & Normalization"
            subtitle="Start from a consistent baseline"
            definition="Browsers have different default styles (user-agent stylesheet). CSS Reset removes ALL defaults. Normalize.css preserves useful defaults while fixing inconsistencies. Modern approaches: box-sizing: border-box globally, consistent font sizing."
            analogy="A CSS Reset is like clearing a whiteboard before a meeting — everyone starts with a clean slate. Normalize is like tidying up the whiteboard but keeping the helpful reference notes."
            seniorTip="Use a modern CSS reset: *, *::before, *::after { box-sizing: border-box; margin: 0; }. This is the foundation Media.net expects — you implement cross-browser markup FROM SCRATCH, not with Bootstrap."
          >
            <CodePlayground
              title="css-reset.js"
              :initialCode="codes.cssReset"
            />
          </ConceptCard>
        </template>

        <!-- ==================== RESPONSIVE DESIGN ==================== -->
        <template v-if="activeSection === 'responsive'">
          <ConceptCard
            id="responsive-patterns"
            icon="📱"
            title="Responsive Design Patterns"
            subtitle="Desktop → Tablet → Mobile without frameworks"
            definition="Responsive design uses fluid grids, flexible images, and media queries to adapt layouts. Patterns: mobile-first, desktop-first, container queries, clamp() for fluid typography, min()/max() for dynamic sizing."
            analogy="Responsive design is like water — it takes the shape of whatever container (screen) it's poured into. The content stays the same, but its presentation adapts."
            seniorTip="Mobile-first is the standard approach. Use min-width media queries. Set viewport meta tag. Use rem/em units instead of px. Use CSS clamp() for responsive typography without media queries. Test at common breakpoints: 320px, 768px, 1024px, 1440px."
            defaultOpen
          >
            <!-- Breakpoint Visualizer -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">📐 Current Viewport: <span class="text-orange-400 font-bold">{{ viewportWidth }}px</span> — <span class="text-orange-400">{{ currentBreakpoint }}</span></p>
              <div class="flex gap-1 items-end h-20">
                <div v-for="bp in breakpoints" :key="bp.name"
                  class="flex-1 rounded-t-lg flex items-end justify-center transition-all duration-300"
                  :class="bp.name === currentBreakpoint ? 'bg-orange-500/30 border border-orange-500/50' : 'bg-white/5'"
                  :style="{ minHeight: bp.height + '%' }">
                  <div class="text-center p-1">
                    <p class="text-[9px] font-bold" :class="bp.name === currentBreakpoint ? 'text-orange-400' : 'text-gray-500'">{{ bp.name }}</p>
                    <p class="text-[8px] text-gray-600">{{ bp.min }}px</p>
                  </div>
                </div>
              </div>
            </div>

            <CodePlayground
              title="responsive-css.js"
              :initialCode="codes.responsiveCss"
            />
          </ConceptCard>

          <ConceptCard
            id="images-media"
            icon="🖼️"
            title="Responsive Images & Media"
            subtitle="Right image, right size, right format"
            definition="Use srcset and sizes attributes for responsive images. Picture element for art direction. Lazy loading with loading='lazy'. Modern formats: WebP (30% smaller), AVIF (50% smaller). Aspect-ratio CSS property prevents layout shifts."
            analogy="Responsive images are like a waiter who brings the right-sized plate for each table — a small plate for appetizers (mobile) and a large plate for the main course (desktop). No point serving a pizza-sized plate for a canape."
            seniorTip="Use srcset for resolution switching, picture for art direction. Always specify width and height attributes OR use aspect-ratio CSS to prevent CLS. Use loading='lazy' for below-fold images. Media.net's premium properties need fast-loading images."
          >
            <CodePlayground
              title="responsive-images.js"
              :initialCode="codes.responsiveImages"
            />
          </ConceptCard>
        </template>

        <!-- ==================== WEB APIS ==================== -->
        <template v-if="activeSection === 'apis'">
          <ConceptCard
            id="browser-apis"
            icon="⚙️"
            title="Essential Browser APIs"
            subtitle="The platform is more powerful than you think"
            definition="Key browser APIs: IntersectionObserver (lazy loading, viewability), MutationObserver (DOM changes), ResizeObserver (element sizing), Web Workers (off-thread), Service Workers (offline/caching), Fetch API, Performance API, Clipboard API."
            analogy="Browser APIs are like the hidden features of a Swiss Army knife — most people only use the blade (DOM manipulation), but there's a bottle opener (IntersectionObserver), scissors (MutationObserver), and a magnifying glass (Performance API)."
            seniorTip="IntersectionObserver is essential at Media.net for ad viewability tracking. Learn Performance API for measuring real-user experience. Service Workers power offline-first apps. Web Workers offload heavy computation from the main thread."
            defaultOpen
          >
            <CodePlayground
              title="browser-apis.js"
              :initialCode="codes.browserApis"
            />
          </ConceptCard>

          <ConceptCard
            id="web-workers"
            icon="🔄"
            title="Web Workers & Service Workers"
            subtitle="Off the main thread"
            definition="Web Workers: run JS in background thread (heavy computation). Service Workers: proxy between browser and network (caching, offline, push notifications). SharedWorker: shared between multiple tabs. Worklets: lightweight workers (CSS Paint, Audio)."
            analogy="Web Workers are like sous-chefs in the kitchen — the head chef (main thread) delegates heavy tasks (chopping, prep) so they can focus on plating and serving (rendering the UI)."
            seniorTip="Use Web Workers for: parsing large JSON, image processing, complex calculations. Use Service Workers for: runtime caching (cache-first, stale-while-revalidate), offline fallback. At Media.net, use Workers for analytics processing without blocking ad rendering."
          >
            <CodePlayground
              title="workers.js"
              :initialCode="codes.workers"
            />
          </ConceptCard>

          <ConceptCard
            id="performance-apis"
            icon="📊"
            title="Performance API & Core Web Vitals"
            subtitle="Measure what matters"
            definition="Core Web Vitals: LCP (Largest Contentful Paint, <2.5s), FID/INP (Interaction to Next Paint, <200ms), CLS (Cumulative Layout Shift, <0.1). Performance API gives precise timing data. PerformanceObserver monitors metrics in real-time."
            analogy="Core Web Vitals are like a car's dashboard gauges — LCP is the speedometer (how fast you load), INP is the responsiveness gauge (how quickly you react to steering), CLS is the stability meter (how smooth the ride is)."
            seniorTip="Google uses CWV as a ranking factor. Measure with web-vitals library. Track Real User Metrics (RUM), not just lab data. Ad-heavy pages struggle with CLS — set explicit sizes for ad slots. Optimize LCP by preloading hero images."
          >
            <CodePlayground
              title="performance-api.js"
              :initialCode="codes.performanceApi"
            />
          </ConceptCard>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import SectionNav from './SectionNav.vue'
import ConceptCard from './ConceptCard.vue'
import CodePlayground from './CodePlayground.vue'

const sections = [
  { id: 'semantic', label: 'Semantic HTML', icon: '📝', badge: '2' },
  { id: 'crossbrowser', label: 'Cross-Browser', icon: '🐛', badge: '3' },
  { id: 'responsive', label: 'Responsive', icon: '📱', badge: '2' },
  { id: 'apis', label: 'Web APIs', icon: '⚙️', badge: '3' },
]

const activeSection = ref('semantic')

function setSection(id) {
  activeSection.value = id
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// ==================== Browser Quirks ====================
const browserQuirks = [
  { browser: 'Safari', issue: 'gap property in flexbox not supported until Safari 14.1', fix: 'Fix: Use margin instead of gap for older Safari', color: 'bg-blue-500/20 text-blue-400' },
  { browser: 'Safari', issue: '100vh includes the address bar, causing overflow on mobile', fix: 'Fix: Use 100dvh or -webkit-fill-available', color: 'bg-blue-500/20 text-blue-400' },
  { browser: 'Firefox', issue: 'Scrollbar styling uses non-standard scrollbar-width/color', fix: 'Fix: Use scrollbar-width: thin; scrollbar-color: gray transparent;', color: 'bg-orange-500/20 text-orange-400' },
  { browser: 'Chrome', issue: 'Subpixel font rendering differs from other browsers', fix: 'Fix: Use -webkit-font-smoothing: antialiased', color: 'bg-emerald-500/20 text-emerald-400' },
  { browser: 'All', issue: 'date input styling varies wildly across browsers', fix: 'Fix: Use custom date picker component for consistent UX', color: 'bg-purple-500/20 text-purple-400' },
  { browser: 'Safari', issue: 'position: sticky inside overflow: hidden ancestor fails', fix: 'Fix: Remove overflow: hidden from sticky parent chain', color: 'bg-blue-500/20 text-blue-400' },
]

// ==================== Responsive ====================
const viewportWidth = ref(0)
const breakpoints = [
  { name: 'Mobile', min: 0, max: 639, height: 30 },
  { name: 'SM', min: 640, max: 767, height: 45 },
  { name: 'MD', min: 768, max: 1023, height: 60 },
  { name: 'LG', min: 1024, max: 1279, height: 75 },
  { name: 'XL', min: 1280, max: 1535, height: 85 },
  { name: '2XL', min: 1536, max: Infinity, height: 100 },
]

const currentBreakpoint = computed(() => {
  const bp = breakpoints.find(b => viewportWidth.value >= b.min && viewportWidth.value <= b.max)
  return bp ? bp.name : 'Mobile'
})

function updateViewport() {
  if (typeof window !== 'undefined') {
    viewportWidth.value = window.innerWidth
  }
}

onMounted(() => {
  updateViewport()
  window.addEventListener('resize', updateViewport)
})
onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateViewport)
  }
})

// ==================== Code Examples ====================
const codes = {
  semanticHtml: `// Semantic HTML5 Elements Cheat Sheet

console.log("📝 Semantic Elements & When to Use Them:\\n");

console.log("STRUCTURE:");
console.log("  <header>   → Page or section header (logo, nav)");
console.log("  <nav>      → Navigation links");
console.log("  <main>     → Primary content (only one per page!)");
console.log("  <article>  → Self-contained content (blog post, card)");
console.log("  <section>  → Thematic group of content");
console.log("  <aside>    → Sidebar, related content");
console.log("  <footer>   → Page or section footer\\n");

console.log("INLINE SEMANTICS:");
console.log("  <time>     → Date/time (datetime='2024-01-01')");
console.log("  <mark>     → Highlighted/relevant text");
console.log("  <figure>   → Image + caption group");
console.log("  <figcaption> → Caption for figure");
console.log("  <address>  → Contact info for the author");
console.log("  <abbr>     → Abbreviation (title='Full Term')\\n");

console.log("INTERACTIVE:");
console.log("  <details>  → Expandable section");
console.log("  <summary>  → Visible heading for details");
console.log("  <dialog>   → Modal/dialog box (native!)\\n");

console.log("💡 Key Rule: Use the right element for the job.");
console.log("   If it navigates → <nav>. If it's clickable → <button>.");
console.log("   If it's the main content → <main>.");`,

  metaSeo: `// Essential Meta Tags & SEO

console.log("🔍 Must-Have Meta Tags:\\n");

console.log("1️⃣ Basic Meta:");
console.log('  <meta charset="UTF-8">');
console.log('  <meta name="viewport" content="width=device-width, initial-scale=1">');
console.log('  <title>Page Title | Brand (50-60 chars)</title>');
console.log('  <meta name="description" content="... (150-160 chars)">\\n');

console.log("2️⃣ Open Graph (Facebook, LinkedIn):");
console.log('  <meta property="og:title" content="Title">');
console.log('  <meta property="og:description" content="Description">');
console.log('  <meta property="og:image" content="https://... (1200x630px)">');
console.log('  <meta property="og:type" content="website">\\n');

console.log("3️⃣ Twitter Cards:");
console.log('  <meta name="twitter:card" content="summary_large_image">');
console.log('  <meta name="twitter:title" content="Title">\\n');

console.log("4️⃣ Technical SEO:");
console.log('  <link rel="canonical" href="https://canonical-url.com">');
console.log('  <meta name="robots" content="index, follow">');
console.log('  <link rel="alternate" hreflang="en" href="...">\\n');

console.log("5️⃣ Structured Data (JSON-LD):");
console.log('  <' + 'script type="application/ld+json"' + '>');
console.log('  { "@context": "https://schema.org",');
console.log('    "@type": "Article",');
console.log('    "headline": "Title" }');
console.log('  </' + 'script>');`,

  featureDetection: `// Feature Detection — Not Browser Detection

console.log("🐛 Feature Detection Approaches:\\n");

console.log("1️⃣ CSS @supports (preferred):");
console.log("  @supports (display: grid) {");
console.log("    .layout { display: grid; }");
console.log("  }");
console.log("  @supports not (backdrop-filter: blur()) {");
console.log("    .glass { background: rgba(0,0,0,0.8); }");
console.log("  }\\n");

console.log("2️⃣ JavaScript Feature Detection:");
console.log("  if ('IntersectionObserver' in window) {");
console.log("    // Modern approach");
console.log("  } else {");
console.log("    // Fallback: scroll event listener");
console.log("  }\\n");

console.log("3️⃣ Progressive Enhancement in JS:");
console.log("  if ('loading' in HTMLImageElement.prototype) {");
console.log("    img.loading = 'lazy'; // Native lazy loading");
console.log("  } else {");
console.log("    // Use IntersectionObserver polyfill");
console.log("  }\\n");

console.log("❌ AVOID: User-Agent Sniffing");
console.log("  if (navigator.userAgent.includes('Safari')) ← FRAGILE!");
console.log("  → User agents can be spoofed, change over time\\n");

console.log("✅ USE: Feature detection → works forever");
console.log("  Check for the CAPABILITY, not the BROWSER name");`,

  progressiveEnhancement: `// Progressive Enhancement Strategy

console.log("📶 Progressive Enhancement Layers:\\n");

console.log("Layer 1: HTML (Content Layer)");
console.log("  • Content is accessible WITHOUT CSS or JS");
console.log("  • Links work, forms submit, images show");
console.log("  • Use <noscript> for JS-dependent features\\n");

console.log("Layer 2: CSS (Presentation Layer)");
console.log("  • Layout, colors, typography, animations");
console.log("  • Use @supports for advanced features");
console.log("  • Mobile-first: base styles → @media min-width\\n");

console.log("Layer 3: JavaScript (Behavior Layer)");
console.log("  • Interactivity, dynamic content, AJAX");
console.log("  • Your page should NOT break without JS");
console.log("  • Enhance forms: validation, auto-save, UX\\n");

console.log("Example: Navigation Menu");
console.log("  HTML: Visible list of links (always works)");
console.log("  CSS: Styled as horizontal bar, hide on mobile");
console.log("  JS: Hamburger toggle on mobile\\n");

console.log("🔑 Key Principle:");
console.log("  Start basic → test → enhance → test again");
console.log("  Never assume JS is available");
console.log("  Never assume fast internet");
console.log("  Never assume a specific browser");`,

  cssReset: `// CSS Reset & Normalization

console.log("🧹 Modern CSS Reset (Recommended):\\n");

console.log("/* Box-sizing reset */");
console.log("*, *::before, *::after {");
console.log("  box-sizing: border-box;");
console.log("}\\n");

console.log("/* Remove default margins */");
console.log("* { margin: 0; }\\n");

console.log("/* Sensible body defaults */");
console.log("body {");
console.log("  line-height: 1.5;");
console.log("  -webkit-font-smoothing: antialiased;");
console.log("}\\n");

console.log("/* Responsive media */");
console.log("img, picture, video, canvas, svg {");
console.log("  display: block;");
console.log("  max-width: 100%;");
console.log("}\\n");

console.log("/* Form elements inherit fonts */");
console.log("input, button, textarea, select {");
console.log("  font: inherit;");
console.log("}\\n");

console.log("/* Text wrapping */");
console.log("p, h1, h2, h3, h4, h5, h6 {");
console.log("  overflow-wrap: break-word;");
console.log("}\\n");

console.log("💡 Why not Bootstrap?");
console.log("  Media.net requires markup FROM SCRATCH.");
console.log("  This reset ensures consistent cross-browser baseline.");
console.log("  You control every pixel — no framework opinions.");`,

  responsiveCss: `// Responsive Design — CSS Techniques

console.log("📱 Responsive Design Without Frameworks:\\n");

console.log("1️⃣ Fluid Typography (clamp):");
console.log("  font-size: clamp(1rem, 2.5vw, 2rem);");
console.log("  → Min 16px, scales with viewport, max 32px\\n");

console.log("2️⃣ Mobile-First Media Queries:");
console.log("  /* Base: mobile styles */");
console.log("  .grid { display: flex; flex-direction: column; }");
console.log("  ");
console.log("  @media (min-width: 768px) {");
console.log("    .grid { flex-direction: row; flex-wrap: wrap; }");
console.log("  }");
console.log("  ");
console.log("  @media (min-width: 1024px) {");
console.log("    .grid { gap: 2rem; }");
console.log("  }\\n");

console.log("3️⃣ Container Queries (modern):");
console.log("  .card-container { container-type: inline-size; }");
console.log("  @container (min-width: 400px) {");
console.log("    .card { flex-direction: row; }");
console.log("  }\\n");

console.log("4️⃣ Dynamic Sizing:");
console.log("  width: min(90%, 1200px);   → responsive max-width");
console.log("  padding: max(1rem, 3vw);    → responsive padding");
console.log("  gap: clamp(1rem, 3vw, 3rem); → fluid spacing\\n");

console.log("5️⃣ Common Breakpoints:");
console.log("  640px (sm), 768px (md), 1024px (lg), 1280px (xl)");`,

  responsiveImages: `// Responsive Images — Techniques

console.log("🖼️ Responsive Image Techniques:\\n");

console.log("1️⃣ srcset — Resolution Switching:");
console.log('  <img');
console.log('    srcset="img-320w.jpg 320w,');
console.log('            img-768w.jpg 768w,');
console.log('            img-1200w.jpg 1200w"');
console.log('    sizes="(max-width: 768px) 100vw, 50vw"');
console.log('    src="img-768w.jpg"');
console.log('    alt="Descriptive text"');
console.log('    width="1200" height="800"');
console.log('    loading="lazy"');
console.log('  >\\n');

console.log("2️⃣ <picture> — Art Direction:");
console.log('  <picture>');
console.log('    <source media="(min-width: 1024px)" srcset="hero-wide.webp">');
console.log('    <source media="(min-width: 640px)" srcset="hero-medium.webp">');
console.log('    <img src="hero-mobile.jpg" alt="Hero">');
console.log('  </picture>\\n');

console.log("3️⃣ Prevent Layout Shift (CLS):");
console.log("  /* Set aspect ratio to reserve space */");
console.log("  img { aspect-ratio: 16 / 9; width: 100%; }\\n");

console.log("4️⃣ Modern Image Formats:");
console.log("  JPEG → WebP (30% smaller, 96% browser support)");
console.log("  PNG → WebP or AVIF (50% smaller, growing support)");
console.log("  Use <picture> with WebP source + JPEG fallback");`,

  browserApis: `// Essential Browser APIs

console.log("⚙️ Browser APIs Every Senior Dev Must Know:\\n");

console.log("1️⃣ IntersectionObserver — Visibility Detection:");
console.log("  new IntersectionObserver((entries) => {");
console.log("    entries.forEach(e => {");
console.log("      if (e.isIntersecting) lazyLoad(e.target)");
console.log("    })");
console.log("  }, { threshold: 0.5 })\\n");

console.log("2️⃣ MutationObserver — DOM Change Detection:");
console.log("  new MutationObserver((mutations) => {");
console.log("    mutations.forEach(m => trackDOMChange(m))");
console.log("  }).observe(element, {");
console.log("    childList: true, subtree: true");
console.log("  })\\n");

console.log("3️⃣ ResizeObserver — Element Size Changes:");
console.log("  new ResizeObserver((entries) => {");
console.log("    entries.forEach(e => {");
console.log("      adjustLayout(e.contentRect.width)");
console.log("    })");
console.log("  }).observe(element)\\n");

console.log("4️⃣ Clipboard API:");
console.log("  navigator.clipboard.writeText('copied!')");
console.log("  navigator.clipboard.readText()\\n");

console.log("5️⃣ Page Visibility API:");
console.log("  document.addEventListener('visibilitychange', () => {");
console.log("    if (document.hidden) pauseVideo()");
console.log("    else resumeVideo()");
console.log("  })");`,

  workers: `// Web Workers & Service Workers

console.log("🔄 Workers — Off the Main Thread:\\n");

console.log("1️⃣ Web Worker (Dedicated):");
console.log("  // main.js");
console.log("  const worker = new Worker('worker.js')");
console.log("  worker.postMessage({ data: largeArray })");
console.log("  worker.onmessage = (e) => updateUI(e.data)\\n");
console.log("  // worker.js");
console.log("  self.onmessage = (e) => {");
console.log("    const result = heavyComputation(e.data)");
console.log("    self.postMessage(result)  // send back");
console.log("  }\\n");

console.log("2️⃣ Service Worker (Network Proxy):");
console.log("  // Register");
console.log("  navigator.serviceWorker.register('/sw.js')\\n");
console.log("  // sw.js — Cache-first strategy");
console.log("  self.addEventListener('fetch', (e) => {");
console.log("    e.respondWith(");
console.log("      caches.match(e.request)");
console.log("        .then(cached => cached || fetch(e.request))");
console.log("    )");
console.log("  })\\n");

console.log("3️⃣ When to Use What:");
console.log("  Web Worker → Heavy computation (parsing, sorting)");
console.log("  Service Worker → Caching, offline, push notifications");
console.log("  SharedWorker → Shared state between tabs");`,

  performanceApi: `// Core Web Vitals & Performance API

console.log("📊 Core Web Vitals (Google's UX Metrics):\\n");

console.log("1️⃣ LCP — Largest Contentful Paint");
console.log("  Good: < 2.5s | Poor: > 4.0s");
console.log("  Measures: how fast main content loads\\n");

console.log("2️⃣ INP — Interaction to Next Paint");
console.log("  Good: < 200ms | Poor: > 500ms");
console.log("  Measures: how responsive to user input\\n");

console.log("3️⃣ CLS — Cumulative Layout Shift");
console.log("  Good: < 0.1 | Poor: > 0.25");
console.log("  Measures: visual stability (content jumping)\\n");

console.log("Measuring with Performance API:");
console.log("  // Navigation timing");
console.log("  const nav = performance.getEntriesByType('navigation')[0]");
console.log("  console.log('DOM loaded:', nav.domContentLoadedEventEnd)");
console.log("  console.log('Full load:', nav.loadEventEnd)\\n");

console.log("  // Resource timing");
console.log("  performance.getEntriesByType('resource').forEach(r => {");
console.log("    console.log(r.name, r.duration + 'ms')");
console.log("  })\\n");

console.log("  // Custom marks");
console.log("  performance.mark('render-start')");
console.log("  // ... render work ...");
console.log("  performance.mark('render-end')");
console.log("  performance.measure('render', 'render-start', 'render-end')");`,
}
</script>
