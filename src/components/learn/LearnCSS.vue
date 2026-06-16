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
            analogy="Flexbox is like a clothesline - items hang in a row (main axis), and you decide if they should spread out, bunch up, or wrap to a new line."
            seniorTip="Use gap instead of margins between flex items. flex: 1 is shorthand for flex-grow:1 flex-shrink:1 flex-basis:0%. Know the difference between align-items (single line) and align-content (multi-line)."
            defaultOpen
          >
            <!-- Interactive Flexbox Playground -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 Flexbox Playground - Change properties and see the result live</p>

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
            analogy="Grid is like a spreadsheet - you define rows and columns, then place items into specific cells. Unlike Flexbox (clothesline), Grid controls BOTH axes simultaneously."
            seniorTip="Use Grid for page layouts and Flexbox for component-level alignment. grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)) creates responsive grids without media queries."
          >
            <!-- Interactive Grid Playground -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 Grid Playground - Adjust columns and gap</p>

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
            title="Centering - The Interview Classic"
            subtitle="'Why is this div not centering?'"
            definition="There are multiple ways to center in CSS. The modern approach: display:grid; place-items:center (both axes in one line). Also: display:flex; justify-content:center; align-items:center. Or position:absolute with transform."
            analogy="Centering in CSS is like parking in a lot - there are many valid spots (methods), but some are easier than others. place-items:center is the VIP spot right by the entrance."
            seniorTip="Grid place-items:center is the cleanest one-liner for centering. For text, use text-align:center + line-height. For absolute positioning, use inset:0 + margin:auto. Know multiple methods because interviewers love this question."
          >
            <!-- Centering Methods Showcase -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 Pick a centering method - see it applied</p>
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
            seniorTip="Keep specificity flat - use classes only (BEM methodology). Avoid IDs in CSS. If you need to override, increase specificity minimally or use :where() (zero specificity). Never use !important in production CSS."
            defaultOpen
          >
            <!-- Interactive Specificity Calculator -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 Specificity Calculator - Enter selectors and compare</p>
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
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 Drag the z-index sliders - see stacking contexts in action</p>
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
            analogy="Responsive design is like water - it takes the shape of its container. Media queries are like valves that change the flow at certain points."
            seniorTip="Use min-width (mobile-first) over max-width. Common breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl). Use clamp() for fluid typography: clamp(1rem, 2.5vw, 2rem). Container queries (@container) are the future."
            defaultOpen
          >
            <!-- Breakpoint Visualizer -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">📊 Common breakpoints - your current viewport is highlighted</p>
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
            analogy="Cross-browser compatibility is like cooking the same recipe in different kitchens - each oven (browser) heats slightly differently, so you need to test and adjust."
            seniorTip="Use `@supports` for progressive enhancement. Test on real devices, not just emulators. Safari is the new IE - always test on WebKit. Use browserslist to configure target browsers for autoprefixer and Babel."
          >
            <CodePlayground
              title="cross-browser.js"
              :initialCode="codes.crossBrowser"
            />
          </ConceptCard>
        </template>

        <!-- ==================== ANIMATIONS ==================== -->
        <template v-if="activeSection === 'animations'">
          <ConceptCard
            id="transitions"
            icon="🔄"
            title="CSS Transitions"
            subtitle="Smooth state changes"
            definition="Transitions animate property changes over time. Shorthand: transition: property duration timing-function delay. Only certain properties are animatable (not display!). Use transform and opacity for best performance (GPU-composited)."
            analogy="A transition is like a dimmer switch - instead of flipping the light on/off instantly, you smoothly adjust the brightness over time."
            seniorTip="Only animate transform and opacity for 60fps - these skip layout and paint. Use will-change sparingly (it consumes GPU memory). transition: all is lazy - always specify the exact property."
            defaultOpen
          >
            <CodePlayground
              title="transitions.js"
              :initialCode="codes.transitions"
            />
          </ConceptCard>

          <ConceptCard
            id="keyframes"
            icon="🎬"
            title="CSS Keyframe Animations"
            subtitle="Multi-step animations"
            definition="@keyframes defines animation steps (0% to 100%). animation shorthand: name duration timing-function delay iteration-count direction fill-mode. Use animation-fill-mode: forwards to keep end state."
            analogy="Keyframes are like a flipbook - you draw key frames (0%, 50%, 100%) and the browser fills in the in-betweens automatically."
            seniorTip="Use animation-play-state for pause/resume. Prefer CSS animations over JS for simple effects - they're GPU-optimized. Use prefers-reduced-motion media query for accessibility."
          >
            <CodePlayground
              title="keyframes.js"
              :initialCode="codes.keyframes"
            />
          </ConceptCard>

          <ConceptCard
            id="transforms"
            icon="🔀"
            title="CSS Transforms & Performance"
            subtitle="Move, rotate, scale without reflow"
            definition="transform: translate(), rotate(), scale(), skew(). Transforms don't trigger layout recalculation - they're composited on the GPU. This is why you should animate transforms instead of top/left/width/height."
            analogy="Transforms are like moving a sticker on glass - the sticker moves but the glass (layout) stays put. Changing width/height is like reshaping the glass itself."
            seniorTip="GPU-composited properties: transform, opacity, filter. Everything else triggers layout. Use translate3d(0,0,0) to force GPU layer creation (but don't overuse - each layer uses memory)."
          >
            <CodePlayground
              title="transforms.js"
              :initialCode="codes.transforms"
            />
          </ConceptCard>
        </template>

        <!-- ==================== BOX MODEL & POSITIONING ==================== -->
        <template v-if="activeSection === 'boxmodel'">
          <ConceptCard
            id="box-model"
            icon="📦"
            title="Box Model: content-box vs border-box"
            subtitle="Why your widths don't add up"
            definition="content-box (default): width = content only. border-box: width = content + padding + border. Always use border-box globally: *, *::before, *::after { box-sizing: border-box }. This prevents width calculation surprises."
            analogy="content-box is like measuring a picture frame by the photo size only. border-box measures the whole frame including the matting and border."
            seniorTip="Every CSS reset (normalize.css, Tailwind) sets border-box globally. If you inherit a project without it, add it immediately. This is a day-1 setup item."
            defaultOpen
          >
            <CodePlayground
              title="box-model.js"
              :initialCode="codes.boxModel"
            />
          </ConceptCard>

          <ConceptCard
            id="positioning"
            icon="📌"
            title="CSS Positioning Deep Dive"
            subtitle="static, relative, absolute, fixed, sticky"
            definition="static: normal flow (default). relative: offset from normal position, still in flow. absolute: removed from flow, positioned relative to nearest positioned ancestor. fixed: relative to viewport. sticky: hybrid - relative until scroll threshold, then fixed."
            analogy="static = sitting in class. relative = leaning in your chair (still in your seat). absolute = floating above the class (removed from seating). fixed = pinned to the whiteboard (stays when you scroll). sticky = a student who sits until the teacher walks by, then follows."
            seniorTip="position:sticky is underused - perfect for sticky headers, table headers, and sidebar navigation. Set top/bottom/left/right for it to activate. Check browser support for sticky inside overflow:hidden parents."
          >
            <CodePlayground
              title="positioning.js"
              :initialCode="codes.positioning"
            />
          </ConceptCard>

          <ConceptCard
            id="css-variables"
            icon="🎨"
            title="CSS Custom Properties (Variables)"
            subtitle="Dynamic theming without preprocessors"
            definition="CSS variables (--name: value) cascade and inherit. Use var(--name, fallback) to access. Unlike Sass variables, CSS variables are live - they can be changed with JS and respond to media queries."
            analogy="CSS variables are like colored markers in a shared drawer. Everyone uses the same marker name ('primary'). If you swap the marker for a different color, everyone's drawings change instantly."
            seniorTip="Use CSS variables for theming (dark mode toggle), component-level customization, and responsive values. They're runtime-dynamic - change them with JS for interactive themes. Use :root for globals."
          >
            <CodePlayground
              title="css-variables.js"
              :initialCode="codes.cssVariables"
            />
          </ConceptCard>
        </template>

        <!-- ==================== ACCESSIBILITY ==================== -->
        <template v-if="activeSection === 'a11y'">
          <ConceptCard
            id="semantic-html"
            icon="🏷️"
            title="Semantic HTML & Landmarks"
            subtitle="The foundation of accessibility"
            definition="Semantic HTML uses elements that convey meaning (nav, main, article, button) rather than generic divs. Screen readers use these to navigate. Landmarks (header, footer, aside) create a map of your page."
            analogy="Semantic HTML is like a labeled map. A screen reader user can jump straight to 'Main Content' or 'Navigation' instead of wandering through a sea of 'divs' (unmarked buildings)."
            seniorTip="Use <button> for actions, <a> for links. Never use <div onClick> without role='button' and tabindex='0'. Landmarks are free if you use correct tags (<main>, <nav>)."
            defaultOpen
          >
            <CodePlayground
              title="semantic.html"
              :initialCode="codes.semanticHtml"
              codeLanguage="html"
            />
          </ConceptCard>

          <ConceptCard
            id="aria"
            icon="🔊"
            title="ARIA (Accessible Rich Internet Applications)"
            subtitle="Bridging the gap when HTML isn't enough"
            definition="ARIA attributes (aria-label, aria-expanded, role) provide extra information to assistive technology. Use ONLY when native HTML elements can't do the job (e.g., a custom dropdown)."
            analogy="ARIA is like a sticky note on a custom-made tool explaining what it does. If you use a standard hammer (button), you don't need a note. But if you build a weird contraption that hits nails (div), you need a note saying 'This is a hammer'."
            seniorTip="First rule of ARIA: Don't use ARIA (use native HTML). If you must, ensure you handle keyboard interaction (Enter/Space) and focus states manually."
          >
            <CodePlayground
              title="aria.html"
              :initialCode="codes.aria"
              codeLanguage="html"
            />
          </ConceptCard>

          <ConceptCard
            id="visually-hidden"
            icon="👻"
            title="Visually Hidden & Focus Management"
            subtitle="Hiding things from eyes, but not ears"
            definition="display:none removes element from accessibility tree (screen readers ignore it). To hide visually but keep accessible (e.g., 'Skip to content' link), use a .visually-hidden class (clip pattern)."
            analogy="display:none is vanishing into thin air. .visually-hidden is wearing an invisibility cloak - you're still there and can be heard, just not seen."
            seniorTip="Use the standard .sr-only / .visually-hidden utility class. Never use width:0/height:0 as some screen readers ignore it."
          >
            <CodePlayground
              title="visually-hidden.css"
              :initialCode="codes.visuallyHidden"
              codeLanguage="css"
            />
          </ConceptCard>
        </template>

        <!-- ==================== ADVANCED CSS ==================== -->
        <template v-if="activeSection === 'advanced'">
          <ConceptCard
            id="containment"
            icon="📦"
            title="CSS Containment & content-visibility"
            subtitle="Browser performance hints"
            definition="contain: content/paint/layout tells the browser 'this subtree is independent', allowing optimizations (skip rendering off-screen). content-visibility: auto skips rendering entirely for off-screen content (like virtualization)."
            analogy="Containment is like closing the door to a room. If you paint the hallway, you don't need to worry about messing up the room inside. The browser knows it doesn't need to check inside unless the door opens."
            seniorTip="Use content-visibility: auto on long lists or heavy sections for massive rendering performance wins. It's like lazy-loading for the rendering engine."
            defaultOpen
          >
            <CodePlayground
              title="containment.css"
              :initialCode="codes.containment"
              codeLanguage="css"
            />
          </ConceptCard>

          <ConceptCard
            id="logical-properties"
            icon="🌍"
            title="Logical Properties"
            subtitle="Future-proof layout (RTL support)"
            definition="Instead of left/right/top/bottom, use start/end/block/inline. margin-left becomes margin-inline-start. This automatically adapts to RTL languages (Arabic, Hebrew) and vertical writing modes."
            analogy="Physical properties (left) are like saying 'Turn toward the window'. Logical properties (start) are like saying 'Turn toward the beginning of the line'. It works no matter how the room is oriented."
            seniorTip="Start using logical properties now. margin-inline, padding-block, inset-inline. It makes internationalization (i18n) free later on."
          >
            <CodePlayground
              title="logical.css"
              :initialCode="codes.logical"
              codeLanguage="css"
            />
          </ConceptCard>
        </template>

        <!-- ==================== CSS EXERCISES ==================== -->
        <template v-if="activeSection === 'exercises'">
          <div class="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20 mb-2">
            <p class="text-sm text-purple-400 font-medium">💪 CSS Practice Mode</p>
            <p class="text-xs text-gray-400 mt-1">Each challenge tests your CSS knowledge through JavaScript. Analyze the scenarios, predict the outputs, and verify your understanding!</p>
          </div>

          <ConceptCard
            id="ex-specificity"
            icon="💪"
            title="Exercise 1: Specificity Battle"
            subtitle="Which selector wins?"
            definition="Given multiple CSS selectors targeting the same element, determine which style will be applied. Calculate specificity scores and predict the final appearance."
            seniorTip="Remember: inline > ID > class > element. When equal, last rule wins. !important overrides everything (but avoid it)."
            defaultOpen
          >
            <CodePlayground
              title="exercise-specificity.js"
              :initialCode="codes.exSpecificity"
              :autoRun="false"
            />
          </ConceptCard>

          <ConceptCard
            id="ex-centering"
            icon="💪"
            title="Exercise 2: Center Everything"
            subtitle="Name all centering methods"
            definition="How many ways can you center a div both horizontally and vertically? Write CSS for each method. The goal is to know at least 4 different approaches."
            seniorTip="The interviewer wants to see you know multiple approaches and understand the tradeoffs of each."
          >
            <CodePlayground
              title="exercise-centering.js"
              :initialCode="codes.exCentering"
              :autoRun="false"
            />
          </ConceptCard>

          <ConceptCard
            id="ex-layout"
            icon="💪"
            title="Exercise 3: Holy Grail Layout"
            subtitle="Classic CSS interview layout"
            definition="Describe the CSS for a layout with: fixed header, fixed footer, 3 columns (left sidebar, main content, right sidebar), main content fills remaining height. Use CSS Grid."
            seniorTip="This is the #1 CSS layout interview question. Grid makes it trivial with grid-template-areas."
          >
            <CodePlayground
              title="exercise-layout.js"
              :initialCode="codes.exLayout"
              :autoRun="false"
            />
          </ConceptCard>

          <ConceptCard
            id="ex-responsive"
            icon="💪"
            title="Exercise 4: Responsive Card Grid"
            subtitle="No media queries allowed!"
            definition="Create a responsive grid of cards that goes from 1 column on mobile to 3+ columns on desktop, WITHOUT using any media queries. Use CSS Grid's intrinsic sizing."
            seniorTip="The key is repeat(auto-fill, minmax(min, 1fr)). This single line replaces dozens of media queries."
          >
            <CodePlayground
              title="exercise-responsive.js"
              :initialCode="codes.exResponsive"
              :autoRun="false"
            />
          </ConceptCard>

          <ConceptCard
            id="ex-animation"
            icon="💪"
            title="Exercise 5: Performance Audit"
            subtitle="Find the performance killers"
            definition="Review CSS animations and identify which ones trigger expensive reflows. Fix them to use GPU-composited properties only."
            seniorTip="Know which properties trigger layout (width, height, top, left) vs which are composited (transform, opacity). This is critical for 60fps animations."
          >
            <CodePlayground
              title="exercise-animation.js"
              :initialCode="codes.exAnimation"
              :autoRun="false"
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
  { id: 'animations', label: 'Animations', icon: '✨', badge: '3' },
  { id: 'boxmodel', label: 'Box Model', icon: '📦', badge: '3' },
  { id: 'a11y', label: 'Accessibility', icon: '♿', badge: '3' },
  { id: 'advanced', label: 'Advanced', icon: '🚀', badge: '2' },
  { id: 'exercises', label: 'Exercises', icon: '💪', badge: '5' },
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
  return 'Equal specificity - last rule wins (' + score1 + ')'
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

  // ==================== Animations ====================
  transitions: `// CSS Transitions - Smooth State Changes

console.log("🔄 CSS TRANSITIONS:\\n");

console.log("SYNTAX:");
console.log("  transition: property duration timing-function delay\\n");

console.log("EXAMPLE:");
console.log("  .button {");
console.log("    background: #3b82f6;");
console.log("    transform: scale(1);");
console.log("    transition: transform 0.2s ease, background 0.3s;");
console.log("  }");
console.log("  .button:hover {");
console.log("    background: #2563eb;");
console.log("    transform: scale(1.05);");
console.log("  }\\n");

console.log("TIMING FUNCTIONS:");
console.log("  ease      → slow start, fast middle, slow end (default)");
console.log("  linear    → constant speed");
console.log("  ease-in   → slow start");
console.log("  ease-out  → slow end");
console.log("  ease-in-out → slow start and end");
console.log("  cubic-bezier(0.25, 0.1, 0.25, 1) → custom curve\\n");

console.log("⚠️ CAN'T transition:");
console.log("  display (none/block) - use opacity + visibility instead");
console.log("  height: auto - use max-height hack instead\\n");

console.log("✅ PERFORMANT transitions (GPU-composited):");
console.log("  transform, opacity, filter");
console.log("❌ EXPENSIVE transitions (trigger layout):");
console.log("  width, height, top, left, margin, padding");`,

  keyframes: `// CSS @keyframes - Multi-Step Animations

console.log("🎬 CSS KEYFRAME ANIMATIONS:\\n");

console.log("DEFINING:");
console.log("  @keyframes slideIn {");
console.log("    0%   { transform: translateX(-100%); opacity: 0; }");
console.log("    60%  { transform: translateX(10%); }");
console.log("    100% { transform: translateX(0); opacity: 1; }");
console.log("  }\\n");

console.log("APPLYING:");
console.log("  .element {");
console.log("    animation: slideIn 0.5s ease-out forwards;");
console.log("  }\\n");

console.log("ANIMATION SHORTHAND:");
console.log("  animation: name duration timing delay count direction fill\\n");
console.log("  name:       slideIn");
console.log("  duration:   0.5s");
console.log("  timing:     ease-out");
console.log("  delay:      0s");
console.log("  count:      1 (or infinite)");
console.log("  direction:  normal | reverse | alternate");
console.log("  fill-mode:  forwards (keep end state)\\n");

console.log("🔑 USEFUL PROPERTIES:");
console.log("  animation-play-state: paused | running");
console.log("  animation-fill-mode: forwards (stay at 100%)");
console.log("  animation-iteration-count: infinite\\n");

console.log("♿ ACCESSIBILITY:");
console.log("  @media (prefers-reduced-motion: reduce) {");
console.log("    * { animation: none !important; }");
console.log("  }");`,

  transforms: `// CSS Transforms - Move Without Reflow

console.log("🔀 CSS TRANSFORMS:\\n");

console.log("FUNCTIONS:");
console.log("  translate(x, y) - move element");
console.log("  rotate(deg)     - rotate element");
console.log("  scale(x, y)     - resize element");
console.log("  skew(x, y)      - slant element\\n");

console.log("EXAMPLES:");
console.log("  transform: translate(100px, 50px);");
console.log("  transform: rotate(45deg);");
console.log("  transform: scale(1.5);");
console.log("  transform: translate(-50%, -50%) rotate(10deg);\\n");

console.log("PERFORMANCE COMPARISON:");
const props = [
  { prop: "transform: translate()", triggers: "Composite", perf: "🟢 Best" },
  { prop: "opacity", triggers: "Composite", perf: "🟢 Best" },
  { prop: "filter", triggers: "Paint + Composite", perf: "🟡 Good" },
  { prop: "background-color", triggers: "Paint", perf: "🟡 OK" },
  { prop: "width/height", triggers: "Layout + Paint", perf: "🔴 Expensive" },
  { prop: "top/left", triggers: "Layout + Paint", perf: "🔴 Expensive" },
  { prop: "margin/padding", triggers: "Layout + Paint", perf: "🔴 Expensive" },
];

props.forEach(p => {
  console.log("  " + p.perf + " " + p.prop);
  console.log("      Triggers: " + p.triggers);
});

console.log("\\n💡 KEY RULE:");
console.log("  Instead of: top: 100px → use transform: translateY(100px)");
console.log("  Instead of: width: 200px → use transform: scaleX(2)");
console.log("  Result: 60fps smooth animations");`,

  // ==================== Box Model & Positioning ====================
  boxModel: `// Box Model: content-box vs border-box

console.log("📦 CSS BOX MODEL:\\n");

console.log("content-box (DEFAULT):");
console.log("  width = content ONLY");
console.log("  Total width = width + padding + border");
console.log("  Example: width:200px + padding:20px + border:2px = 244px total!\\n");

console.log("border-box (USE THIS):");
console.log("  width = content + padding + border");
console.log("  Total width = exactly what you set");
console.log("  Example: width:200px → always 200px total\\n");

console.log("GLOBAL RESET (add to every project):");
console.log("  *, *::before, *::after {");
console.log("    box-sizing: border-box;");
console.log("  }\\n");

console.log("WHY IT MATTERS:");
console.log("  With content-box:");
console.log("    .col-50 { width: 50%; padding: 20px; }");
console.log("    → Actually 50% + 40px → OVERFLOWS its container!\\n");
console.log("  With border-box:");
console.log("    .col-50 { width: 50%; padding: 20px; }");
console.log("    → Exactly 50% → padding fits INSIDE\\n");

console.log("MARGIN COLLAPSE:");
console.log("  Vertical margins COLLAPSE (take the larger, not sum)");
console.log("  .box1 { margin-bottom: 20px; }");
console.log("  .box2 { margin-top: 30px; }");
console.log("  → Gap = 30px (not 50px!)");
console.log("  Fix: use padding, or flexbox/grid (no collapse)");`,

  positioning: `// CSS Positioning - Complete Guide

console.log("📌 CSS POSITION VALUES:\\n");

const positions = [
  { name: "static", flow: "Yes", rel: "N/A", use: "Default (no positioning)" },
  { name: "relative", flow: "Yes", rel: "Itself (original pos)", use: "Offset from normal + create container" },
  { name: "absolute", flow: "No", rel: "Nearest positioned ancestor", use: "Tooltips, dropdowns, overlays" },
  { name: "fixed", flow: "No", rel: "Viewport", use: "Sticky navbars, floating buttons" },
  { name: "sticky", flow: "Yes→No", rel: "Scroll container", use: "Sticky headers, table headers" },
];

positions.forEach(p => {
  console.log("  " + p.name.toUpperCase());
  console.log("    In flow: " + p.flow);
  console.log("    Positioned relative to: " + p.rel);
  console.log("    Use case: " + p.use + "\\n");
});

console.log("🔑 KEY RULES:");
console.log("  1. absolute positions relative to nearest");
console.log("     ancestor with position != static");
console.log("  2. If no positioned ancestor → uses viewport");
console.log("  3. sticky needs a top/bottom value to activate");
console.log("  4. sticky doesn't work inside overflow:hidden\\n");

console.log("CENTERING with absolute:");
console.log("  .child {");
console.log("    position: absolute;");
console.log("    top: 50%; left: 50%;");
console.log("    transform: translate(-50%, -50%);");
console.log("  }");`,

  cssVariables: `// CSS Custom Properties (Variables)

console.log("🎨 CSS CUSTOM PROPERTIES:\\n");

console.log("DEFINING (in :root for global):");
console.log("  :root {");
console.log("    --primary: #3b82f6;");
console.log("    --spacing-md: 16px;");
console.log("    --font-body: 'Inter', sans-serif;");
console.log("    --shadow: 0 4px 6px rgba(0,0,0,0.1);");
console.log("  }\\n");

console.log("USING:");
console.log("  .card {");
console.log("    color: var(--primary);");
console.log("    padding: var(--spacing-md);");
console.log("    font-family: var(--font-body);");
console.log("  }\\n");

console.log("FALLBACK VALUES:");
console.log("  color: var(--accent, #ef4444);");
console.log("  → Uses #ef4444 if --accent isn't defined\\n");

console.log("DARK MODE TOGGLE (the power of CSS vars!):");
console.log("  :root {");
console.log("    --bg: #ffffff;");
console.log("    --text: #111827;");
console.log("  }");
console.log("  [data-theme='dark'] {");
console.log("    --bg: #0f172a;");
console.log("    --text: #f1f5f9;");
console.log("  }\\n");

console.log("CHANGE WITH JS:");
console.log("  document.documentElement.style");
console.log("    .setProperty('--primary', '#ef4444');\\n");

console.log("CSS VARS vs SASS VARS:");
console.log("  Sass: compiled away, static, no runtime changes");
console.log("  CSS:  live in browser, dynamic, JS-changeable");
console.log("  → Use CSS vars for theming, Sass for build-time logic");`,

  // ==================== CSS Exercises ====================
  exSpecificity: `// 💪 EXERCISE: Specificity Battle
//
// Calculate the specificity of each selector.
// Predict which color the element will be!
// Fill in your answers, then Run to check.

// Scoring: IDs(100), Classes(10), Elements(1)

// Scenario 1: What color is the paragraph?
// <div id="main">
//   <p class="text highlight">Hello</p>
// </div>

const rules1 = [
  { selector: "#main p", color: "red" },
  { selector: ".text.highlight", color: "blue" },
  { selector: "div p.text", color: "green" },
];

// YOUR ANSWER: What color wins?
const answer1 = ""; // Fill in: "red", "blue", or "green"

// Scenario 2: What color is the link?
// <nav id="nav">
//   <ul class="menu">
//     <li><a class="link active" href="#">Click</a></li>
//   </ul>
// </nav>

const rules2 = [
  { selector: "#nav .link", color: "purple" },
  { selector: "nav ul li a.active", color: "orange" },
  { selector: ".menu .link.active", color: "teal" },
];

const answer2 = ""; // Fill in: "purple", "orange", or "teal"

// ===== CHECK ANSWERS =====
function calcSpec(sel) {
  const ids = (sel.match(/#[a-zA-Z]/g) || []).length;
  const cls = (sel.match(/\\.[a-zA-Z]/g) || []).length;
  const els = (sel.match(/(^|[\\s>+~])([a-z])/g) || []).length;
  return { ids, cls, els, score: ids*100 + cls*10 + els };
}

console.log("SCENARIO 1:");
rules1.forEach(r => {
  const s = calcSpec(r.selector);
  console.log("  "+r.selector+" → ("+s.ids+","+s.cls+","+s.els+") = "+s.score+" → "+r.color);
});
const winner1 = rules1.reduce((a, b) => 
  calcSpec(a.selector).score >= calcSpec(b.selector).score ? a : b);
console.log("  Winner: " + winner1.color + " (" + winner1.selector + ")");
console.log("  Your answer: " + (answer1 || "(empty)") + " " + (answer1 === winner1.color ? "✅" : "❌") + "\\n");

console.log("SCENARIO 2:");
rules2.forEach(r => {
  const s = calcSpec(r.selector);
  console.log("  "+r.selector+" → ("+s.ids+","+s.cls+","+s.els+") = "+s.score+" → "+r.color);
});
const winner2 = rules2.reduce((a, b) => 
  calcSpec(a.selector).score >= calcSpec(b.selector).score ? a : b);
console.log("  Winner: " + winner2.color + " (" + winner2.selector + ")");
console.log("  Your answer: " + (answer2 || "(empty)") + " " + (answer2 === winner2.color ? "✅" : "❌"));`,

  exCentering: `// 💪 EXERCISE: Name ALL Centering Methods
//
// List as many ways as possible to center a
// child div (200x200) inside a parent div (400x400),
// both horizontally and vertically.
//
// Fill in the CSS for each method below!

const methods = [
  {
    name: "Method 1: Grid",
    parent: "", // YOUR CSS for parent
    child: "",  // YOUR CSS for child (if needed)
  },
  {
    name: "Method 2: Flexbox",
    parent: "",
    child: "",
  },
  {
    name: "Method 3: Absolute + Transform",
    parent: "",
    child: "",
  },
  {
    name: "Method 4: Absolute + Margin Auto",
    parent: "",
    child: "",
  },
];

// ===== SOLUTIONS (scroll down after trying) =====




// Reveal solutions by uncommenting below:
// const solutions = [
//   { name: "Grid", parent: "display:grid; place-items:center;", child: "" },
//   { name: "Flexbox", parent: "display:flex; justify-content:center; align-items:center;", child: "" },
//   { name: "Absolute + Transform", parent: "position:relative;", child: "position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);" },
//   { name: "Absolute + Margin", parent: "position:relative;", child: "position:absolute; inset:0; margin:auto;" },
//   { name: "Absolute + Calc", parent: "position:relative;", child: "position:absolute; top:calc(50% - 100px); left:calc(50% - 100px);" },
// ];
// solutions.forEach(s => console.log(s.name + ": " + s.parent + " | " + s.child));

console.log("Fill in the CSS strings above, then run!");
console.log("Your methods:");
methods.forEach((m, i) => {
  const filled = m.parent || m.child;
  console.log((i+1) + ". " + m.name + ": " + (filled ? "✅ filled" : "⬜ empty"));
  if (m.parent) console.log("   Parent: " + m.parent);
  if (m.child) console.log("   Child:  " + m.child);
});
console.log("\\nGoal: fill in at least 4 methods!");
console.log("Uncomment the solutions section to check answers.");`,

  exLayout: `// 💪 EXERCISE: Holy Grail Layout with CSS Grid
//
// Write the CSS for a layout with:
// - Fixed header (60px height)
// - Fixed footer (40px height)
// - Left sidebar (200px)
// - Right sidebar (150px)
// - Main content (fills remaining space)
// - Full viewport height
//
// Fill in the grid properties below!

const layout = {
  container: {
    display: "",            // What display type?
    gridTemplateRows: "",   // Row sizes (header, main, footer)
    gridTemplateColumns: "",// Column sizes (sidebar, main, sidebar)
    gridTemplateAreas: "",  // Area labels
    height: "",             // Full viewport
  },
  areas: {
    header: "",   // grid-area value
    sidebar: "",  // grid-area value
    main: "",     // grid-area value
    aside: "",    // grid-area value
    footer: "",   // grid-area value
  },
};

// ===== CHECK =====
console.log("Your layout CSS:\\n");
console.log(".container {");
Object.entries(layout.container).forEach(([k, v]) => {
  if (v) console.log("  " + k + ": " + v + ";");
  else console.log("  " + k + ": ⬜ (fill me in!)");
});
console.log("}\\n");

Object.entries(layout.areas).forEach(([name, area]) => {
  console.log("." + name + " { grid-area: " + (area || "⬜") + "; }");
});

// Uncomment for solution:
// console.log("\\n===== SOLUTION =====");
// console.log(".container {");
// console.log("  display: grid;");
// console.log("  grid-template-rows: 60px 1fr 40px;");
// console.log("  grid-template-columns: 200px 1fr 150px;");
// console.log('  grid-template-areas:');
// console.log('    "header header header"');
// console.log('    "sidebar main aside"');
// console.log('    "footer footer footer";');
// console.log("  height: 100vh;");
// console.log("}");`,

  exResponsive: `// 💪 EXERCISE: Responsive Grid WITHOUT Media Queries
//
// Create a grid that:
// - Shows 1 column on mobile (~320px)
// - Shows 2 columns on tablet (~768px)
// - Shows 3+ columns on desktop (~1200px)
// - Uses ZERO media queries
// - Cards have a minimum width of 280px
//
// Fill in the ONE magic CSS line!

const cardGrid = {
  display: "grid",
  gap: "24px",
  gridTemplateColumns: "", // THE ONE LINE - fill this in!
};

// ===== CHECK =====
console.log("Your grid CSS:\\n");
console.log(".card-grid {");
console.log("  display: " + cardGrid.display + ";");
console.log("  gap: " + cardGrid.gap + ";");
if (cardGrid.gridTemplateColumns) {
  console.log("  grid-template-columns: " + cardGrid.gridTemplateColumns + ";");
} else {
  console.log("  grid-template-columns: ⬜ (fill me in!)");
}
console.log("}\\n");

// Simulate viewport widths
if (cardGrid.gridTemplateColumns) {
  console.log("Testing at different viewports:");
  [320, 600, 768, 1024, 1200].forEach(w => {
    const minW = 280;
    const cols = Math.floor(w / minW) || 1;
    console.log("  " + w + "px viewport → ~" + cols + " columns");
  });
}

console.log("\\n💡 Hint: You need repeat(), auto-fill, and minmax()");
console.log("   The card minimum width is 280px");
// Uncomment for solution:
// console.log("\\nSOLUTION: repeat(auto-fill, minmax(280px, 1fr))");`,

  exAnimation: `// 💪 EXERCISE: Performance Audit
//
// Review these animation CSS rules.
// Mark each as GOOD ✅ or BAD ❌
// For BAD ones, write the fix!

const animations = [
  {
    name: "Slide menu open",
    css: "left: 0 → left: 250px",
    transition: "left 0.3s ease",
    yourVerdict: "",  // "good" or "bad"
    yourFix: "",      // if bad, what CSS to use instead?
  },
  {
    name: "Fade in modal",
    css: "opacity: 0 → opacity: 1",
    transition: "opacity 0.3s ease",
    yourVerdict: "",
    yourFix: "",
  },
  {
    name: "Expand accordion",
    css: "height: 0 → height: auto",
    transition: "height 0.3s ease",
    yourVerdict: "",
    yourFix: "",
  },
  {
    name: "Button hover grow",
    css: "width: 100px → width: 120px",
    transition: "width 0.2s ease",
    yourVerdict: "",
    yourFix: "",
  },
  {
    name: "Card lift on hover",
    css: "transform: translateY(0) → translateY(-8px)",
    transition: "transform 0.2s ease",
    yourVerdict: "",
    yourFix: "",
  },
];

// ===== CHECK =====
const solutions = [
  { verdict: "bad", fix: "Use transform: translateX(250px)" },
  { verdict: "good", fix: "" },
  { verdict: "bad", fix: "Use max-height or transform: scaleY()" },
  { verdict: "bad", fix: "Use transform: scale(1.2)" },
  { verdict: "good", fix: "" },
];

animations.forEach((a, i) => {
  console.log((i+1) + ". " + a.name);
  console.log("   CSS: " + a.css);
  console.log("   transition: " + a.transition);
  
  if (a.yourVerdict) {
    const correct = a.yourVerdict.toLowerCase() === solutions[i].verdict;
    console.log("   Your verdict: " + a.yourVerdict + " " + (correct ? "✅" : "❌"));
    if (!correct) console.log("   Correct: " + solutions[i].verdict);
    if (solutions[i].fix) console.log("   Fix: " + solutions[i].fix);
  } else {
    console.log("   Your verdict: ⬜ (fill in 'good' or 'bad')");
  }
  console.log("");
});

console.log("Fill in yourVerdict for each animation, then Run!");`,
}
</script>

