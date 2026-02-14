<template>
  <div class="learn-architecture min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn" class="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4">
        ← Back to Topics
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">🏗️</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Architecture & Scaling</h1>
      </div>
      <p class="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        Component design patterns, error handling, accessibility, API architecture, and building maintainable large-scale frontend apps.
      </p>
    </div>

    <!-- Layout -->
    <div class="px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 pb-16">
      <SectionNav
        :sections="sections"
        :activeSection="activeSection"
        activeColor="bg-red-600"
        @select="setSection"
        class="lg:w-56 flex-shrink-0"
      />

      <div class="flex-1 min-w-0 space-y-5">
        <!-- ==================== COMPONENT DESIGN ==================== -->
        <template v-if="activeSection === 'components'">
          <ConceptCard
            id="composition"
            icon="🧱"
            title="Composition vs Inheritance"
            subtitle="Prefer composition — always"
            definition="Composition: build complex components by combining simple ones (slots, render props, hooks). Inheritance: extend a parent class. In modern frontend, composition wins because it's more flexible, testable, and avoids the fragile base class problem."
            analogy="Inheritance is like a rigid family tree — change grandpa's recipe and it breaks for everyone. Composition is like LEGO — snap pieces together, swap any block without breaking the rest."
            seniorTip="React and Vue both moved AWAY from mixins/inheritance toward hooks/composables. In interviews, say: 'I prefer composition because it makes dependencies explicit and components easier to test in isolation.'"
            defaultOpen
          >
            <!-- Composition vs Inheritance Visual -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">📊 Pattern Comparison</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="p-3 rounded-lg border border-red-500/20 bg-red-500/5">
                  <p class="text-xs font-bold text-red-400 mb-2">❌ Inheritance (Avoid)</p>
                  <div class="font-mono text-xs text-gray-300 space-y-1">
                    <p>class <span class="text-red-400">BaseInput</span> {'{}'}</p>
                    <p>&nbsp;&nbsp;↳ class <span class="text-red-400">TextInput</span> extends BaseInput</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↳ class <span class="text-red-400">EmailInput</span> extends TextInput</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↳ class <span class="text-red-400">ValidatedEmail</span> extends ...</p>
                  </div>
                  <p class="text-xs text-red-400/70 mt-2">⚠️ Fragile chain, hard to modify</p>
                </div>
                <div class="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
                  <p class="text-xs font-bold text-emerald-400 mb-2">✅ Composition (Prefer)</p>
                  <div class="font-mono text-xs text-gray-300 space-y-1">
                    <p>&lt;Input&gt;</p>
                    <p>&nbsp;&nbsp;+ <span class="text-emerald-400">useValidation()</span></p>
                    <p>&nbsp;&nbsp;+ <span class="text-emerald-400">useFormatting()</span></p>
                    <p>&nbsp;&nbsp;+ <span class="text-emerald-400">useErrorDisplay()</span></p>
                  </div>
                  <p class="text-xs text-emerald-400/70 mt-2">✅ Mix & match, easy to test</p>
                </div>
              </div>
            </div>

            <CodePlayground
              title="composition.js"
              :initialCode="codes.composition"
            />
          </ConceptCard>

          <ConceptCard
            id="solid"
            icon="💎"
            title="SOLID Principles for Frontend"
            subtitle="Not just for backend!"
            definition="S: Single Responsibility (one component = one job). O: Open-Closed (extend via props/slots, don't modify). L: Liskov Substitution (interchangeable components). I: Interface Segregation (small, focused props). D: Dependency Inversion (inject dependencies)."
            analogy="SOLID is like building a house with standardized parts — each room has one purpose (S), you add furniture without rebuilding walls (O), any chair fits at the table (L), you don't install a kitchen sink in the bedroom (I), and plumbing connects to standard pipes (D)."
            seniorTip="Don't memorize SOLID as theory. For frontend: S = keep components under 200 lines. O = use slots/render props. I = don't pass 20 props when 3 will do. D = inject services, don't import them directly."
          >
            <!-- SOLID Interactive Checklist -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 Click each principle to see a frontend example</p>
              <div class="space-y-2">
                <div v-for="(principle, i) in solidPrinciples" :key="i"
                  @click="activeSolid = activeSolid === i ? -1 : i"
                  class="rounded-lg border transition-all cursor-pointer"
                  :class="activeSolid === i ? 'border-red-500/30 bg-red-500/5' : 'border-white/5 hover:border-white/10'">
                  <div class="flex items-center gap-3 p-3">
                    <span class="text-lg font-bold" :class="activeSolid === i ? 'text-red-400' : 'text-gray-500'">{{ principle.letter }}</span>
                    <div class="flex-1">
                      <p class="text-sm font-medium" :class="activeSolid === i ? 'text-red-400' : 'text-gray-300'">{{ principle.name }}</p>
                    </div>
                    <span class="text-xs text-gray-500">{{ activeSolid === i ? '▲' : '▼' }}</span>
                  </div>
                  <div v-if="activeSolid === i" class="px-3 pb-3 text-xs text-gray-400 border-t border-white/5 pt-2 font-mono whitespace-pre-wrap">{{ principle.example }}</div>
                </div>
              </div>
            </div>
          </ConceptCard>

          <ConceptCard
            id="design-patterns"
            icon="🔧"
            title="Frontend Design Patterns"
            subtitle="Compound, render props, HOC, hooks"
            definition="Compound Components: parent + children share implicit state (Tab + TabPanel). Render Props: pass function as child for flexibility. HOC: wrap component to add behavior. Hooks/Composables: extract reusable logic. Provider Pattern: context-based dependency injection."
            analogy="Design patterns are like cooking techniques — sautéing (hooks) is versatile and modern, while deep-frying (HOC) works but is heavy. Know multiple techniques so you pick the right one for each dish."
            seniorTip="Modern order of preference: Composables/Hooks → Compound Components → Render Props → HOC. HOCs are legacy React; prefer hooks. In Vue, composables replaced mixins entirely."
          >
            <CodePlayground
              title="design-patterns.js"
              :initialCode="codes.designPatterns"
            />
          </ConceptCard>
        </template>

        <!-- ==================== ERROR HANDLING ==================== -->
        <template v-if="activeSection === 'errors'">
          <ConceptCard
            id="error-boundaries"
            icon="🛡️"
            title="Error Boundaries & Graceful Degradation"
            subtitle="Don't let one bug crash the whole app"
            definition="Error boundaries catch JavaScript errors in the component tree and display a fallback UI. In React: class components with componentDidCatch. In Vue: onErrorCaptured hook or errorCaptured option. Always have error boundaries around critical sections."
            analogy="Error boundaries are like circuit breakers in a house — when one circuit (component) shorts out, the breaker trips and only that room goes dark, not the whole house."
            seniorTip="Place error boundaries around route-level components, third-party integrations, and user-generated content renders. Log errors to a monitoring service (Sentry, Datadog). Always show a helpful fallback, not a blank screen."
            defaultOpen
          >
            <!-- Error Boundary Simulator -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 Error Boundary Simulator — click to trigger errors</p>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <!-- Without Error Boundary -->
                <div class="rounded-lg border border-red-500/20 overflow-hidden">
                  <div class="px-3 py-2 bg-red-500/10 text-xs font-medium text-red-400">❌ Without Error Boundary</div>
                  <div class="p-3">
                    <div v-if="errorDemo.crashedAll" class="text-center py-6">
                      <p class="text-2xl mb-2">💥</p>
                      <p class="text-xs text-red-400 font-medium">Entire App Crashed!</p>
                      <p class="text-xs text-gray-500 mt-1">White screen of death</p>
                    </div>
                    <div v-else class="space-y-2">
                      <div class="p-2 rounded bg-white/5 text-xs text-gray-300">Header ✅</div>
                      <div class="p-2 rounded bg-white/5 text-xs text-gray-300">Sidebar ✅</div>
                      <button @click="errorDemo.crashedAll = true"
                        class="w-full p-2 rounded bg-red-500/10 text-xs text-red-400 hover:bg-red-500/20 transition-all">
                        ⚠️ Widget (click to crash)
                      </button>
                    </div>
                  </div>
                </div>

                <!-- With Error Boundary -->
                <div class="rounded-lg border border-emerald-500/20 overflow-hidden">
                  <div class="px-3 py-2 bg-emerald-500/10 text-xs font-medium text-emerald-400">✅ With Error Boundary</div>
                  <div class="p-3 space-y-2">
                    <div class="p-2 rounded bg-white/5 text-xs text-gray-300">Header ✅</div>
                    <div class="p-2 rounded bg-white/5 text-xs text-gray-300">Sidebar ✅</div>
                    <div v-if="errorDemo.crashedWidget" class="p-2 rounded bg-amber-500/10 text-xs text-amber-400 border border-amber-500/20">
                      ⚠️ Widget failed to load. <button @click="errorDemo.crashedWidget = false" class="underline ml-1">Retry</button>
                    </div>
                    <button v-else @click="errorDemo.crashedWidget = true"
                      class="w-full p-2 rounded bg-emerald-500/10 text-xs text-emerald-400 hover:bg-emerald-500/20 transition-all">
                      ⚠️ Widget (click to crash)
                    </button>
                  </div>
                </div>
              </div>

              <button @click="errorDemo.crashedAll = false; errorDemo.crashedWidget = false"
                class="mt-3 px-3 py-1.5 text-xs text-gray-400 hover:text-white transition-all">↺ Reset Demo</button>
            </div>

            <CodePlayground
              title="error-boundary.js"
              :initialCode="codes.errorBoundary"
            />
          </ConceptCard>

          <ConceptCard
            id="global-error"
            icon="📡"
            title="Global Error Handling Strategy"
            subtitle="Catch, log, notify, recover"
            definition="Layers: 1) Component-level try/catch. 2) Error boundaries for render errors. 3) Global handlers (window.onerror, unhandledrejection). 4) API error interceptors (axios interceptors). 5) Error monitoring (Sentry). Each layer catches what the previous missed."
            analogy="Error handling is like a safety net system at a circus — the trapeze artist has their own grip (try/catch), a safety platform (error boundary), a net below (global handler), and an ambulance on standby (monitoring service)."
            seniorTip="Always handle errors at the right level. Don't catch everything globally — handle expected errors locally (form validation) and let unexpected errors bubble up to boundaries and monitoring."
          >
            <CodePlayground
              title="global-errors.js"
              :initialCode="codes.globalError"
            />
          </ConceptCard>
        </template>

        <!-- ==================== ACCESSIBILITY ==================== -->
        <template v-if="activeSection === 'a11y'">
          <ConceptCard
            id="a11y"
            icon="♿"
            title="Accessibility (a11y) Essentials"
            subtitle="Build for everyone"
            definition="Web accessibility (a11y) ensures people with disabilities can use your app. Key areas: semantic HTML, ARIA attributes, keyboard navigation, color contrast, screen reader support, focus management. WCAG 2.1 AA is the target standard."
            analogy="Accessibility is like building a ramp alongside stairs — the stairs still work, but now the ramp makes the building usable by everyone, including people in wheelchairs, parents with strollers, and delivery workers with heavy loads."
            seniorTip="Use semantic HTML first (button, not div). Test with keyboard only (Tab, Enter, Escape). Run Lighthouse and axe audits. Most a11y issues are simple fixes: missing alt text, poor contrast, no focus indicators."
            defaultOpen
          >
            <!-- Interactive A11y Checker -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">📊 A11y Quick Audit — common issues and fixes</p>
              <div class="space-y-2">
                <div v-for="(item, i) in a11yChecklist" :key="i"
                  class="flex items-start gap-3 p-2.5 rounded-lg border transition-all"
                  :class="item.good ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-red-500/20 bg-red-500/5'">
                  <span class="text-sm mt-0.5">{{ item.good ? '✅' : '❌' }}</span>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="text-xs font-mono px-1.5 py-0.5 rounded" :class="item.good ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'">{{ item.good ? 'Good' : 'Bad' }}</span>
                      <code class="text-xs text-gray-300 break-all">{{ item.code }}</code>
                    </div>
                    <p class="text-xs text-gray-400 mt-1">{{ item.reason }}</p>
                  </div>
                </div>
              </div>
            </div>

            <CodePlayground
              title="accessibility.js"
              :initialCode="codes.a11y"
            />
          </ConceptCard>

          <ConceptCard
            id="keyboard-nav"
            icon="⌨️"
            title="Keyboard Navigation & Focus"
            subtitle="Tab, Escape, Arrow keys"
            definition="All interactive elements must be keyboard-accessible. Tab navigates between focusable elements. Enter/Space activates buttons. Escape closes modals. Arrow keys navigate within widgets. Focus trapping keeps focus inside modals/dialogs."
            analogy="Keyboard navigation is like braille on elevator buttons — sighted users might not notice it, but it's essential for some users, and it makes the experience better for power users too (keyboard shortcuts)."
            seniorTip="Test every feature with keyboard only. Add visible focus indicators (:focus-visible). Implement focus trapping in modals. Use tabindex='0' for custom interactive elements, tabindex='-1' for programmatic focus."
          >
            <!-- Keyboard Nav Demo -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">⌨️ Try navigating these elements with Tab and Enter</p>
              <div class="flex flex-wrap gap-2">
                <button class="px-4 py-2 text-sm rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 focus:ring-2 focus:ring-red-500/50 focus:outline-none transition-all">
                  Button 1
                </button>
                <button class="px-4 py-2 text-sm rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition-all">
                  Button 2
                </button>
                <a href="#" class="px-4 py-2 text-sm rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 focus:ring-2 focus:ring-emerald-500/50 focus:outline-none transition-all" @click.prevent>
                  Link
                </a>
                <input type="text" placeholder="Input field" class="px-4 py-2 text-sm rounded-lg bg-white/10 text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none border-0 transition-all" />
              </div>
              <p class="mt-3 text-xs text-gray-500">
                Notice the <span class="text-purple-400">focus ring</span> as you Tab through — this is :focus-visible styling
              </p>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== API & DATA ==================== -->
        <template v-if="activeSection === 'api'">
          <ConceptCard
            id="api-patterns"
            icon="🔌"
            title="API Layer Architecture"
            subtitle="Abstraction, interceptors, caching"
            definition="Best practice: abstract API calls into a service layer. Use interceptors for auth tokens, error transformations, and retry logic. Implement request deduplication, caching (SWR/TanStack Query), and optimistic updates for better UX."
            analogy="An API layer is like a receptionist at a hotel — guests (components) don't call each department (API) directly. The receptionist handles routing, authentication, and error messages professionally."
            seniorTip="Never call fetch/axios directly in components. Create an API service layer. Use TanStack Query / SWR for caching + deduplication. Implement retry with exponential backoff. Handle loading/error/success states with a custom hook."
            defaultOpen
          >
            <CodePlayground
              title="api-layer.js"
              :initialCode="codes.apiLayer"
            />
          </ConceptCard>

          <ConceptCard
            id="form-handling"
            icon="📋"
            title="Large Form Architecture"
            subtitle="Multi-step, validation, state management"
            definition="Large forms need: field-level validation, cross-field validation, dirty tracking, multi-step navigation, autosave, and proper error display. Use form libraries (VeeValidate, React Hook Form) for complex forms. Normalize form state."
            analogy="A large form is like a multi-page government application — each page validates independently, you can save progress, go back to fix errors, and only submit when ALL pages are complete."
            seniorTip="For large forms: use a schema-based approach (Zod/Yup). Validate on blur, not on every keystroke. Implement autosave with debounce. Show inline errors, not alerts. Keep form state in a composable, not the component."
          >
            <!-- Form Pattern Visualizer -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 Multi-step form flow</p>
              <div class="flex items-center gap-2 mb-4 overflow-x-auto">
                <div v-for="(step, i) in formSteps" :key="i"
                  @click="activeFormStep = i"
                  class="flex items-center gap-2 flex-shrink-0 cursor-pointer">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                    :class="i < activeFormStep ? 'bg-emerald-500 text-white' : i === activeFormStep ? 'bg-red-500 text-white' : 'bg-white/10 text-gray-500'">
                    {{ i < activeFormStep ? '✓' : i + 1 }}
                  </div>
                  <span class="text-xs" :class="i === activeFormStep ? 'text-red-400 font-medium' : 'text-gray-500'">{{ step }}</span>
                  <span v-if="i < formSteps.length - 1" class="text-gray-600 mx-1">→</span>
                </div>
              </div>
              <div class="p-3 rounded-lg bg-white/5 border border-white/5">
                <p class="text-xs text-gray-400 mb-2">Step {{ activeFormStep + 1 }}: <span class="text-red-400 font-medium">{{ formSteps[activeFormStep] }}</span></p>
                <div class="flex gap-2">
                  <button @click="activeFormStep = Math.max(0, activeFormStep - 1)"
                    class="px-3 py-1.5 text-xs rounded bg-white/10 text-gray-400 hover:text-white transition-all"
                    :disabled="activeFormStep === 0">← Back</button>
                  <button @click="activeFormStep = Math.min(formSteps.length - 1, activeFormStep + 1)"
                    class="px-3 py-1.5 text-xs rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
                    :disabled="activeFormStep === formSteps.length - 1">Next →</button>
                </div>
              </div>
            </div>

            <CodePlayground
              title="form-handling.js"
              :initialCode="codes.formHandling"
            />
          </ConceptCard>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import SectionNav from './SectionNav.vue'
import ConceptCard from './ConceptCard.vue'
import CodePlayground from './CodePlayground.vue'

const sections = [
  { id: 'components', label: 'Components', icon: '🧱', badge: '3' },
  { id: 'errors', label: 'Error Handling', icon: '🛡️', badge: '2' },
  { id: 'a11y', label: 'Accessibility', icon: '♿', badge: '2' },
  { id: 'api', label: 'API & Data', icon: '🔌', badge: '2' },
]

const activeSection = ref('components')

function setSection(id) {
  activeSection.value = id
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// ==================== SOLID Principles ====================
const activeSolid = ref(-1)

const solidPrinciples = [
  { letter: 'S', name: 'Single Responsibility', example: '// ❌ UserProfile handles display + API calls + validation\n// ✅ UserAvatar (display) + useUserAPI (fetch) + useValidation (rules)\n// Each piece has ONE reason to change' },
  { letter: 'O', name: 'Open-Closed', example: '// ❌ if (type === "primary") ... else if (type === "danger") ...\n// ✅ <Button :variant="variant" /> with dynamic classes\n// Extend via new variants, don\'t modify Button internals' },
  { letter: 'L', name: 'Liskov Substitution', example: '// ❌ <SpecialButton> breaks when used where <Button> was\n// ✅ <SpecialButton> accepts all Button props + some extras\n// Any Button replacement should work without breaking the parent' },
  { letter: 'I', name: 'Interface Segregation', example: '// ❌ <UserCard :user="fullUserObject" />  (100 fields)\n// ✅ <UserCard :name="name" :avatar="avatar" />\n// Only pass what the component actually needs' },
  { letter: 'D', name: 'Dependency Inversion', example: '// ❌ import apiClient from "./api"  (hard dependency)\n// ✅ provide("apiClient", client) → inject("apiClient")\n// Components depend on abstractions, not implementations' },
]

// ==================== Error Demo ====================
const errorDemo = reactive({
  crashedAll: false,
  crashedWidget: false,
})

// ==================== A11y Checklist ====================
const a11yChecklist = [
  { good: false, code: '<div onclick="submit()">Submit</div>', reason: 'div is not focusable/accessible. Use <button> instead.' },
  { good: true, code: '<button type="submit">Submit</button>', reason: 'Semantic HTML — focusable, announces as button to screen readers.' },
  { good: false, code: '<img src="photo.jpg" />', reason: 'Missing alt text. Screen readers can\'t describe the image.' },
  { good: true, code: '<img src="photo.jpg" alt="Team photo" />', reason: 'Descriptive alt text helps screen readers and SEO.' },
  { good: false, code: '<input type="text" />', reason: 'No associated label. Screen readers don\'t know what this field is for.' },
  { good: true, code: '<label for="email">Email</label><input id="email" />', reason: 'Label + for connects the label to input for accessibility.' },
  { good: false, code: 'color: #aaa on #fff background', reason: 'Low contrast ratio (2.8:1). WCAG AA requires 4.5:1.' },
  { good: true, code: 'color: #555 on #fff background', reason: 'Good contrast ratio (7:1). Passes WCAG AA + AAA.' },
]

// ==================== Form Step Demo ====================
const formSteps = ['Personal Info', 'Address', 'Payment', 'Review']
const activeFormStep = ref(0)

// ==================== Code Examples ====================
const codes = {
  composition: `// Composition Pattern — Composables in Vue 3

console.log("🧱 Composables: Reusable Logic Extraction\\n");

console.log("// useCounter.js — reusable composable");
console.log("function useCounter(initial = 0) {");
console.log("  const count = ref(initial)");
console.log("  const increment = () => count.value++");
console.log("  const decrement = () => count.value--");
console.log("  const reset = () => count.value = initial");
console.log("  return { count, increment, decrement, reset }");
console.log("}\\n");

console.log("// Used in ANY component:");
console.log("const { count, increment } = useCounter(10)\\n");

console.log("💡 Why composition wins:");
console.log("  ✅ Logic is explicit — you see what's imported");
console.log("  ✅ Testable — test useCounter in isolation");
console.log("  ✅ Type-safe — TypeScript loves it");
console.log("  ✅ No naming conflicts — destructure only what you need");
console.log("  ✅ Tree-shakable — unused composables are removed\\n");

console.log("❌ Old patterns to avoid:");
console.log("  • Mixins (implicit, naming conflicts)");
console.log("  • Inheritance (fragile base class)");
console.log("  • Renderless components (overly complex)");`,

  designPatterns: `// Frontend Design Patterns

console.log("🔧 Common Frontend Patterns:\\n");

console.log("1️⃣ Compound Components:");
console.log("  <Tabs>                    ← manages state");
console.log("    <Tab label='Info' />    ← reads from parent");
console.log("    <Tab label='Settings'/> ");
console.log("    <TabPanel>Content</TabPanel>");
console.log("  </Tabs>");
console.log("  → Children implicitly share parent state\\n");

console.log("2️⃣ Render Props / Scoped Slots:");
console.log("  <DataFetcher url='/api/users'>");
console.log("    <template #default='{ data, loading }'>");
console.log("      <UserList :users='data' v-if='!loading'/>");
console.log("    </template>");
console.log("  </DataFetcher>");
console.log("  → Parent provides data, child decides rendering\\n");

console.log("3️⃣ Provider Pattern:");
console.log("  provide('theme', reactive({ dark: true }))");
console.log("  // Any descendant:");
console.log("  const theme = inject('theme')");
console.log("  → Skip prop drilling through intermediate layers\\n");

console.log("4️⃣ Composable / Custom Hook:");
console.log("  const { data, error, loading } = useFetch('/api')");
console.log("  → Extract reusable stateful logic");`,

  errorBoundary: `// Error Boundary Implementation

console.log("🛡️ Error Boundaries — Catch Render Errors\\n");

console.log("Vue 3 — onErrorCaptured hook:");
console.log("  setup() {");
console.log("    const error = ref(null)");
console.log("    onErrorCaptured((err, instance, info) => {");
console.log("      error.value = err");
console.log("      logToSentry(err, info)");
console.log("      return false  // stop propagation");
console.log("    })");
console.log("    return { error }");
console.log("  }\\n");

console.log("React — Class Component:");
console.log("  class ErrorBoundary extends React.Component {");
console.log("    static getDerivedStateFromError(err) {");
console.log("      return { hasError: true }");
console.log("    }");
console.log("    componentDidCatch(err, info) {");
console.log("      logToSentry(err, info)");
console.log("    }");
console.log("  }\\n");

console.log("📍 Where to place boundaries:");
console.log("  ✅ Around each route/page");
console.log("  ✅ Around third-party widgets");
console.log("  ✅ Around user-generated content");
console.log("  ❌ NOT around every component (too granular)");`,

  globalError: `// Global Error Handling Strategy

console.log("📡 Multi-Layer Error Handling:\\n");

console.log("Layer 1: Component-level try/catch");
console.log("  try { await api.saveUser(data) }");
console.log("  catch(e) { showToast('Save failed') }\\n");

console.log("Layer 2: Error Boundaries (render errors)");
console.log("  → Catches errors during component rendering\\n");

console.log("Layer 3: API Interceptors");
console.log("  axios.interceptors.response.use(");
console.log("    res => res,");
console.log("    err => {");
console.log("      if (err.status === 401) router.push('/login')");
console.log("      if (err.status === 500) showToast('Server error')");
console.log("      return Promise.reject(err)");
console.log("    }");
console.log("  )\\n");

console.log("Layer 4: Global Handlers");
console.log("  window.addEventListener('error', (e) => {");
console.log("    logToMonitoring(e.error)");
console.log("  })");
console.log("  window.addEventListener('unhandledrejection', (e) => {");
console.log("    logToMonitoring(e.reason)");
console.log("  })\\n");

console.log("Layer 5: Monitoring Service (Sentry/Datadog)");
console.log("  → Aggregates, alerts, and helps debug production errors");`,

  a11y: `// Accessibility Best Practices

console.log("♿ A11y Essentials Checklist:\\n");

console.log("1️⃣ Semantic HTML:");
console.log("   <button> not <div onClick>");
console.log("   <nav>, <main>, <article>, <aside>");
console.log("   <h1>-<h6> in proper hierarchy\\n");

console.log("2️⃣ ARIA Attributes (when HTML isn't enough):");
console.log("   role='dialog' on modals");
console.log("   aria-label='Close' on icon buttons");
console.log("   aria-expanded='true/false' on dropdowns");
console.log("   aria-live='polite' for dynamic content\\n");

console.log("3️⃣ Keyboard Navigation:");
console.log("   Tab → next focusable element");
console.log("   Shift+Tab → previous element");
console.log("   Enter/Space → activate buttons");
console.log("   Escape → close modals/dropdowns");
console.log("   Arrow keys → navigate within widgets\\n");

console.log("4️⃣ Color & Contrast:");
console.log("   WCAG AA: 4.5:1 for normal text");
console.log("   WCAG AA: 3:1 for large text (18px+)");
console.log("   Never rely on color alone for information\\n");

console.log("5️⃣ Testing Tools:");
console.log("   Lighthouse → automated audit");
console.log("   axe DevTools → detailed violations");
console.log("   Screen reader → VoiceOver (Mac) / NVDA (Win)");`,

  apiLayer: `// API Layer Architecture

console.log("🔌 Clean API Service Layer:\\n");

console.log("// api/client.js — base setup");
console.log("const api = axios.create({");
console.log("  baseURL: '/api/v1',");
console.log("  timeout: 10000,");
console.log("})\\n");

console.log("// Request interceptor — add auth token");
console.log("api.interceptors.request.use(config => {");
console.log("  config.headers.Authorization = getToken()");
console.log("  return config");
console.log("})\\n");

console.log("// Response interceptor — handle errors");
console.log("api.interceptors.response.use(");
console.log("  response => response.data,");
console.log("  error => {");
console.log("    if (error.response.status === 401) {");
console.log("      refreshToken().catch(() => logout())");
console.log("    }");
console.log("    return Promise.reject(error)");
console.log("  }");
console.log(")\\n");

console.log("// api/users.js — domain service");
console.log("export const userAPI = {");
console.log("  getAll: () => api.get('/users'),");
console.log("  getById: (id) => api.get('/users/' + id),");
console.log("  create: (data) => api.post('/users', data),");
console.log("  update: (id, data) => api.put('/users/' + id, data),");
console.log("}\\n");

console.log("// In component: useUserAPI composable");
console.log("// Never call axios.get() directly in components!");`,

  formHandling: `// Large Form Architecture

console.log("📋 Multi-Step Form Best Practices:\\n");

console.log("1️⃣ Schema-based Validation (Zod):");
console.log("  const schema = z.object({");
console.log("    email: z.string().email(),");
console.log("    age: z.number().min(18),");
console.log("    password: z.string().min(8),");
console.log("  })\\n");

console.log("2️⃣ Field-level Validation:");
console.log("  Validate on blur (not on every keystroke)");
console.log("  Show inline errors next to the field");
console.log("  Clear error when user starts fixing\\n");

console.log("3️⃣ Multi-step Navigation:");
console.log("  Validate current step before allowing 'Next'");
console.log("  Allow going back without losing data");
console.log("  Show progress indicator\\n");

console.log("4️⃣ Autosave with Debounce:");
console.log("  watch(formData, debounce(saveDraft, 2000))");
console.log("  Save to localStorage or server\\n");

console.log("5️⃣ Dirty Tracking:");
console.log("  const isDirty = computed(() => {");
console.log("    return JSON.stringify(form) !== JSON.stringify(original)");
console.log("  })");
console.log("  → Warn on navigation: 'Unsaved changes!'\\n");

console.log("6️⃣ State Structure:");
console.log("  { values, errors, touched, isSubmitting, isDirty }");`,
}
</script>
