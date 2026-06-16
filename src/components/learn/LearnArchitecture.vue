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
        Master architectural patterns regarding Monorepos, Micro-frontends, Design Systems, Component Patterns, and large-scale A11y/Error strategies.
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
        <!-- ==================== STRUCTURE & SCALE ==================== -->
        <template v-if="activeSection === 'structure'">
          <ConceptCard
            id="folder-structure"
            icon="📂"
            title="Folder Structure Strategy"
            subtitle="Feature-based vs Type-based"
            definition="Junior: Group by type (components/, views/, hooks/). Senior: Group by feature (features/auth/, features/cart/). Feature-based architecture keeps related code together (colocation), making it easier to delete, refactor, or extract features."
            analogy="Type-based is like organizing a kitchen by 'Metal Things' and 'Wood Things'. Feature-based is organizing by 'Baking' (flour, pans, mixer) and 'Cleaning' (soap, sponge, towel). You want to find tools for a task, not a material."
            seniorTip="Use a 'features' folder for domain logic. Inside each feature: components, hooks, api, types. Use 'common' or 'shared' only for truly generic utilities (Button, formatDate). If a feature grows too big, it's ready to be extracted into a package."
            defaultOpen
          >
            <CodePlayground
              title="structure.tree"
              :initialCode="codes.folderStructure"
            />
          </ConceptCard>

          <ConceptCard
            id="monorepo"
            icon="📦"
            title="Monorepos & Workspaces"
            subtitle="One Repo, Many Packages"
            definition="A monorepo holds multiple projects (apps, packages) in a single repository. Tools like Nx, Turborepo, or pnpm workspaces manage dependencies and task orchestration (build, test) efficiently across them."
            analogy="Instead of having 5 separate houses (repos) where you have to drive between them to share sugar (code), you live in a large estate (monorepo) with multiple buildings. Sharing sugar is just walking across the lawn."
            seniorTip="Don't reach into other packages' source code directly! Usage must be explicit via package.json dependencies. Use 'internal' packages for shared UI libraries, configs (eslint-config), and utilities."
          >
             <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5 text-sm font-mono text-gray-400">
                <p class="text-emerald-400 font-bold mb-2">root/</p>
                <div class="pl-4 border-l border-gray-700 space-y-1">
                   <p>├── <span class="text-blue-400">apps/</span></p>
                   <p>│   ├── <span class="text-blue-300">web-store</span> (Next.js)</p>
                   <p>│   ├── <span class="text-blue-300">admin-panel</span> (Vite)</p>
                   <p>│   └── <span class="text-blue-300">docs</span> (Astro)</p>
                   <p>├── <span class="text-yellow-400">packages/</span></p>
                   <p>│   ├── <span class="text-yellow-300">ui-lib</span> (Buttons, Inputs)</p>
                   <p>│   ├── <span class="text-yellow-300">eslint-config</span> (Shared linting)</p>
                   <p>│   └── <span class="text-yellow-300">utils</span> (Date, Currency)</p>
                   <p>├── package.json</p>
                   <p>└── turbo.json</p>
                </div>
             </div>
          </ConceptCard>

          <ConceptCard
            id="deps"
            icon="🔗"
            title="Dependency Management"
            subtitle="Peer vs Dev vs Prod"
            definition="Understanding package.json is vital. 'dependencies': required at runtime. 'devDependencies': build tools/types. 'peerDependencies': expected to be provided by the host app (crucial for libraries to avoid duplicate React instances)."
            seniorTip="When building a component library, React MUST be a peerDependency. If it's a regular dep, the consumer app might bundle two versions of React, causing the 'Hooks can only be called inside the body of a function component' error."
          >
            <CodePlayground
              title="package.json"
              :initialCode="codes.dependencies"
            />
          </ConceptCard>
        </template>

        <!-- ==================== SYSTEMS & MICROS ==================== -->
         <template v-if="activeSection === 'systems'">
          <ConceptCard
            id="design-system"
            icon="🎨"
            title="Design Systems & Tokens"
            subtitle="Systematizing UI"
            definition="A Design System is more than a component library. It's a set of standards (tokens) for color, spacing, typography, combined with reusable components and documentation (Storybook)."
            analogy="Tokens are the atoms (colors, spacing). Components are the molecules (buttons). Patterns are the organisms (forms). Pages are the templates. This is Atomic Design."
            seniorTip="Start with Design Tokens (JSON files for colors/spacing). Use tools like Style Dictionary to transform them for Web (CSS vars), iOS, and Android. This ensures brand consistency across ALL platforms."
            defaultOpen
          >
            <CodePlayground
              title="tokens.json"
              :initialCode="codes.designSystem"
            />
          </ConceptCard>

          <ConceptCard
            id="micro-frontends"
            icon="🧩"
            title="Micro-Frontends"
            subtitle="Vertical Slicing at Scale"
            definition="Breaking a monolithic frontend into smaller, independent deployable apps that appear as one to the user. Techniques: Module Federation (Webpack/Vite), IFrames (legacy), or Server-Side Composition."
            analogy="Like a food court. The customer sees one large dining area, but the Pizza Station and Sushi Station are run by completely different teams, with their own kitchens and staff, yet they share the same seating area."
            seniorTip="Don't use Micro-frontends just because they are trendy. They introduce massive complexity (deployment coordination, version mismatch, performance overhead). Use them only when you have separate TEAMS that need to deploy independently."
          >
             <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
               <div class="flex flex-col md:flex-row gap-4 items-stretch h-32">
                  <!-- Shell -->
                  <div class="flex-1 bg-gray-800 rounded-lg p-2 border border-gray-600 relative flex flex-col">
                     <div class="text-xs text-gray-400 mb-1 text-center">Shell App (Container)</div>
                     <div class="flex-1 bg-gray-900 rounded border border-dashed border-gray-700 relative p-1">
                        <!-- Remote 1 -->
                        <div class="absolute top-1 left-1 w-1/3 h-20 bg-blue-500/20 border border-blue-500 rounded flex items-center justify-center text-blue-300 text-xs">
                           Remote: Nav
                        </div>
                        <!-- Remote 2 -->
                        <div class="absolute top-1 right-1 w-2/3 h-20 bg-emerald-500/20 border border-emerald-500 rounded flex items-center justify-center text-emerald-300 text-xs">
                           Remote: Dashboard
                        </div>
                     </div>
                  </div>
               </div>
               <p class="text-xs text-center text-gray-500 mt-2">Shell loads Nav and Dashboard from different URLs at runtime</p>
             </div>
          </ConceptCard>
        </template>

        <!-- ==================== COMPONENT DESIGN ==================== -->
        <template v-if="activeSection === 'components'">
          <ConceptCard
            id="composition"
            icon="🧱"
            title="Composition vs Inheritance"
            subtitle="Prefer composition - always"
            definition="Composition: build complex components by combining simple ones (slots, render props, hooks). Inheritance: extend a parent class. In modern frontend, composition wins because it's more flexible, testable, and avoids the fragile base class problem."
            analogy="Inheritance is like a rigid family tree - change grandpa's recipe and it breaks for everyone. Composition is like LEGO - snap pieces together, swap any block without breaking the rest."
            seniorTip="React and Vue both moved AWAY from mixins/inheritance toward hooks/composables. In interviews, say: 'I prefer composition because it makes dependencies explicit and components easier to test in isolation.'"
            defaultOpen
          >
             <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">📊 Pattern Comparison</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="p-3 rounded-lg border border-red-500/20 bg-red-500/5">
                  <p class="text-xs font-bold text-red-400 mb-2">❌ Inheritance (Avoid)</p>
                  <div class="font-mono text-xs text-gray-300 space-y-1">
                    <p>class <span class="text-red-400">BaseInput</span> {'{}'}</p>
                    <p>&nbsp;&nbsp;↳ class <span class="text-red-400">TextInput</span> extends BaseInput</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↳ class <span class="text-red-400">EmailInput</span> extends TextInput</p>
                  </div>
                  <p class="text-xs text-red-400/70 mt-2">⚠️ Fragile chain, hard to modify</p>
                </div>
                <div class="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
                  <p class="text-xs font-bold text-emerald-400 mb-2">✅ Composition (Prefer)</p>
                  <div class="font-mono text-xs text-gray-300 space-y-1">
                    <p>&lt;Input&gt;</p>
                    <p>&nbsp;&nbsp;+ <span class="text-emerald-400">useValidation()</span></p>
                    <p>&nbsp;&nbsp;+ <span class="text-emerald-400">useFormatting()</span></p>
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
            definition="S: Single Responsibility. O: Open-Closed. L: Liskov Substitution. I: Interface Segregation. D: Dependency Inversion."
             seniorTip="For frontend: S = keep components small. O = use slots/render props. I = don't pass 20 props. D = inject services, don't import implementation."
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
            definition="Compound Components: parent + children share implicit state. Render Props: pass function as child. HOC: wrap component. Hooks: extract reusable logic. Provider Pattern: dependency injection."
            analogy="Cooking techniques: sautéing (hooks) is versatile. Deep-frying (HOC) is heavy."
             seniorTip="Preference: Composables/Hooks → Compound Components → Render Props. Avoid HOCs in modern React/Vue."
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
            definition="Error boundaries catch JS errors in the component tree and display a fallback UI. Always have boundaries around critical sections (routes, widgets)."
            seniorTip="Log errors to Sentry. Always show a helpful fallback."
            defaultOpen
          >
            <!-- Error Boundary Simulator -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 Error Boundary Simulator</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <!-- Without -->
                <div class="rounded-lg border border-red-500/20">
                  <div class="px-3 py-2 bg-red-500/10 text-xs font-medium text-red-400">❌ Without Boundary</div>
                  <div class="p-3">
                    <div v-if="errorDemo.crashedAll" class="text-center py-6">
                      <p class="text-2xl mb-2">💥</p>
                      <p class="text-xs text-red-400">App Crashed!</p>
                    </div>
                    <button v-else @click="errorDemo.crashedAll = true" class="w-full p-2 bg-red-500/10 text-xs text-red-400">⚠️ Click to crash</button>
                  </div>
                </div>
                <!-- With -->
                <div class="rounded-lg border border-emerald-500/20">
                  <div class="px-3 py-2 bg-emerald-500/10 text-xs font-medium text-emerald-400">✅ With Boundary</div>
                  <div class="p-3">
                    <div v-if="errorDemo.crashedWidget" class="p-2 bg-amber-500/10 text-xs text-amber-400">⚠️ Widget failed. <button @click="errorDemo.crashedWidget=false" class="underline">Retry</button></div>
                     <button v-else @click="errorDemo.crashedWidget = true" class="w-full p-2 bg-emerald-500/10 text-xs text-emerald-400">⚠️ Click to crash</button>
                  </div>
                </div>
              </div>
               <button @click="errorDemo.crashedAll = false; errorDemo.crashedWidget = false" class="mt-3 text-xs text-gray-400">↺ Reset</button>
            </div>

            <CodePlayground
              title="error-boundary.js"
              :initialCode="codes.errorBoundary"
            />
          </ConceptCard>

          <ConceptCard
            id="global-error"
            icon="📡"
            title="Global Error Handling"
             subtitle="Catch, log, notify"
             definition="Layers: 1) Try/catch. 2) Boundaries. 3) Global handlers (window.onerror). 4) API interceptors. 5) Monitoring (Sentry)."
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
             id="a11y-basics"
             icon="♿"
             title="Accessibility (a11y) Essentials"
             subtitle="Build for everyone"
             definition="Semantic HTML, ARIA, Keyboard Nav, Color Contrast. WCAG 2.1 AA is the target."
             seniorTip="Use semantic HTML (button not div). Test with keyboard only."
             defaultOpen
           >
             <!-- A11y Audit -->
             <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
                <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">📊 Common A11y Issues</p>
                <div class="space-y-2">
                   <div v-for="(item, i) in a11yChecklist" :key="i" class="flex gap-2 p-2 rounded border" :class="item.good ? 'border-emerald-500/20' : 'border-red-500/20'">
                      <span>{{ item.good ? '✅' : '❌' }}</span>
                      <code class="text-xs text-gray-300">{{ item.code }}</code>
                   </div>
                </div>
             </div>
             <CodePlayground title="a11y.js" :initialCode="codes.a11y" />
           </ConceptCard>
         </template>

        <!-- ==================== API & DATA ==================== -->
        <template v-if="activeSection === 'api'">
          <ConceptCard
             id="api-patterns"
             icon="🔌"
             title="API Layer Architecture"
             subtitle="Abstraction, interceptors, caching"
             definition="Abstract API calls into services. Use interceptors for auth/logging. Use TanStack Query/SWR for caching."
             seniorTip="Never call fetch/axios in components directly."
             defaultOpen
          >
             <CodePlayground title="api-layer.js" :initialCode="codes.apiLayer" />
          </ConceptCard>

           <ConceptCard
            id="form-handling"
            icon="📋"
            title="Large Form Architecture"
            subtitle="Multi-step, validation, state management"
            definition="Use schema validation (Zod). Normalize state. Use libraries for complex forms."
          >
             <CodePlayground title="form-handling.js" :initialCode="codes.formHandling" />
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
  { id: 'structure', label: 'Structure & Scale', icon: '📂', badge: 'New' },
  { id: 'systems', label: 'Systems & Micros', icon: '🏗️', badge: 'New' },
  { id: 'components', label: 'Components', icon: '🧱', badge: 'Core' },
  { id: 'errors', label: 'Error Handling', icon: '🛡️', badge: 'Safe' },
  { id: 'a11y', label: 'Accessibility', icon: '♿', badge: 'A11y' },
  { id: 'api', label: 'Data & Forms', icon: '🔌', badge: 'API' },
]

const activeSection = ref('structure')

function setSection(id) {
  activeSection.value = id
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// ==================== STATE & UTILS ====================
const activeSolid = ref(-1)
const solidPrinciples = [
  { letter: 'S', name: 'Single Responsibility', example: '// ❌ UserProfile handles display + API calls\n// ✅ UserAvatar (display) + useUserAPI (fetch)\n// One reason to change' },
  { letter: 'O', name: 'Open-Closed', example: '// ❌ if (type === "primary") ...\n// ✅ <Button :variant="variant" />\n// Extend via props/slots' },
  { letter: 'L', name: 'Liskov Substitution', example: '// ✅ SpecialButton must work anywhere Button works' },
  { letter: 'I', name: 'Interface Segregation', example: '// ✅ Pass specific props (:name, :url) not big objects' },
  { letter: 'D', name: 'Dependency Inversion', example: '// ✅ inject("api") not import api' },
]

const errorDemo = reactive({ crashedAll: false, crashedWidget: false })

const a11yChecklist = [
  { good: false, code: '<div onclick="submit()">', reason: 'Not focusable' },
  { good: true, code: '<button>Submit</button>', reason: 'Semantic' },
  { good: false, code: '<img src="x.jpg" />', reason: 'No alt' },
  { good: true, code: '<img alt="Desc" />', reason: 'Alt text' },
]

// ==================== CODES ====================
const codes = {
  folderStructure: `// 📂 PROJECT STRUCTURE STRATEGY

// ❌ JUNIOR: Type-Based (Hard to scale)
src/
  components/
    UserAuth.js
    UserProfile.js
  hooks/
    useUser.js
    
// ✅ SENIOR: Feature-Based (Co-located, scalable)
src/
  features/
    auth/
      components/LoginForm.js
      hooks/useAuth.js
      api/authAPI.js
    user/
      components/UserProfile.js
      utils/format.js
      index.js // Public API (Barrier)
  
  // Shared Kernel
  components/ (UI Lib)
  lib/ (axios, queryClient)`,

  dependencies: `// 📦 package.json Strategy

{
  "name": "@company/ui-lib",
  
  // 1. dependencies: Runtime requirements
  "dependencies": {
    "clsx": "^2.0.0" 
  },

  // 2. devDependencies: Build/Test only
  "devDependencies": {
    "typescript": "^5.0.0",
    "vite": "^5.0.0"
  },

  // 3. peerDependencies: Host must provide
  // CRITICAL for React libs to avoid duplicate instances
  "peerDependencies": {
    "react": ">=18.0.0"
  }
}`,

  designSystem: `// 🎨 Design Tokens (The Source of Truth)

// tokens.json
{
  "color": {
    "primary": { "value": "#2563EB" },
    "error": { "value": "#DC2626" }
  },
  "spacing": {
    "md": { "value": "1rem" }
  }
}

// ➡️ Transformed to CSS Variables:
// :root {
//   --color-primary: #2563EB;
//   --spacing-md: 1rem;
// }

// ➡️ Transformed to TS Theme:
// export const theme = {
//   colors: { primary: '#2563EB' }
// }`,

  composition: `// Composition Pattern (Vue Composables)
function useCounter(initial = 0) {
  const count = ref(initial)
  const increment = () => count.value++
  return { count, increment }
}

// Usage
const { count, increment } = useCounter(10)`,

  designPatterns: `// Design Patterns
// 1. Compound Components
<Select>
  <Option value="1">One</Option>
  <Option value="2">Two</Option>
</Select>

// 2. Render Props (Slot)
<List>
  <template #item="{ data }">
    <Card :info="data" />
  </template>
</List>`,

  errorBoundary: `// Error Boundary (Vue)
onErrorCaptured((err) => {
  logToSentry(err)
  showFallback.value = true
  return false // Stop bubbling
})`,

  globalError: `// Global Handling Layers
// 1. Try/Catch (Local)
// 2. Error Boundary (Render)
// 3. API Interceptor (Network)
axios.interceptors.response.use(
  r => r,
  err => {
    if(err.status === 401) logout()
    return Promise.reject(err)
  }
)
// 4. Window Event (Uncaught)
window.onerror = (msg) => log(msg)`,

  a11y: `// A11y Essentials
// 1. Semantics
<button>Save</button> // ✅
<div onClick={save}>Save</div> // ❌

// 2. ARIA (Only when needed)
<div role="dialog" aria-modal="true">
  <button aria-label="Close">X</button>
</div>

// 3. Keyboard
// Ensure :focus-visible styles exist!`,

  apiLayer: `// Service Layer Pattern
// userAPI.js
export const userAPI = {
  getAll: () => api.get('/users'),
  create: (data) => api.post('/users', data)
}

// Component
// ❌ axios.get('/users')
// ✅ userAPI.getAll()`,

  formHandling: `// Zod Schema Validation
const schema = z.object({
  email: z.string().email(),
  age: z.number().min(18)
})

// State normalization
const form = reactive({
  values: {},
  errors: {},
  touched: {}
})`,
}
</script>
