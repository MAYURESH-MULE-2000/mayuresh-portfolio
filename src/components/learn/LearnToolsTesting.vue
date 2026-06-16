<template>
  <div class="learn-tools min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn" class="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4">
        ← Back to Topics
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">🛠️</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Build Tools &amp; Testing</h1>
      </div>
      <p class="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        Webpack vs Vite, bundling, tree-shaking, testing strategies, CI/CD, and the tools that make large-scale frontend development reliable.
      </p>
    </div>

    <!-- Layout -->
    <div class="px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 pb-16">
      <SectionNav
        :sections="sections"
        :activeSection="activeSection"
        activeColor="bg-teal-600"
        @select="setSection"
        class="lg:w-56 flex-shrink-0"
      />

      <div class="flex-1 min-w-0 space-y-5">
        <!-- ==================== BUILD TOOLS ==================== -->
        <template v-if="activeSection === 'bundlers'">
          <ConceptCard
            id="webpack-vite"
            icon="📦"
            title="Webpack vs Vite"
            subtitle="The build tool landscape"
            definition="Webpack: mature, configurable, uses bundle-based dev server (slow HMR). Vite: modern, uses native ESM dev server (instant HMR), Rollup for production. Key difference: Webpack bundles EVERYTHING first, Vite serves files on-demand."
            analogy="Webpack is like a traditional restaurant - prepares everything in the kitchen before serving (bundling). Vite is like a sushi conveyor belt - serves each piece as it's ready, no waiting for the full meal."
            seniorTip="Most new projects should use Vite. Webpack still dominates in legacy projects and complex configs. Know how to configure both: entry points, loaders/plugins (Webpack), plugins and resolve (Vite). Understand tree-shaking in both."
            defaultOpen
          >
            <!-- Build Tool Comparison -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">📊 Build Tool Comparison</p>
              <div class="overflow-x-auto">
                <table class="w-full text-xs">
                  <thead>
                    <tr class="border-b border-white/10">
                      <th class="text-left py-2 px-2 text-gray-400">Feature</th>
                      <th class="text-center py-2 px-2 text-blue-400">Webpack</th>
                      <th class="text-center py-2 px-2 text-purple-400">Vite</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in buildComparison" :key="row.feature" class="border-b border-white/5">
                      <td class="py-2 px-2 text-gray-300 font-medium">{{ row.feature }}</td>
                      <td class="py-2 px-2 text-center text-gray-400">{{ row.webpack }}</td>
                      <td class="py-2 px-2 text-center text-gray-400">{{ row.vite }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <CodePlayground
              title="build-tools.js"
              :initialCode="codes.buildTools"
            />
          </ConceptCard>

          <ConceptCard
            id="tree-shaking"
            icon="🌳"
            title="Tree Shaking & Code Splitting"
            subtitle="Ship only what you use"
            definition="Tree shaking: remove unused exports from bundles (requires ES modules). Code splitting: break bundle into smaller chunks loaded on-demand (dynamic import). Both reduce initial load size. Webpack and Rollup/Vite both support tree-shaking."
            analogy="Tree shaking is like packing for a trip - you shake the tree of all your clothes and only pack what falls into the suitcase (used code). Code splitting is like shipping luggage separately - you carry a small bag (critical code) and the rest arrives later."
            seniorTip="Ensure ES modules (import/export) for tree-shaking - CommonJS (require) can't be tree-shaken. Use dynamic import() for code splitting. Analyze bundle with webpack-bundle-analyzer or vite-plugin-visualizer. Target: initial JS < 200KB gzipped."
          >
            <CodePlayground
              title="tree-shaking.js"
              :initialCode="codes.treeShaking"
            />
          </ConceptCard>
        </template>

        <!-- ==================== TESTING ==================== -->
        <template v-if="activeSection === 'testing'">
          <ConceptCard
            id="testing-pyramid"
            icon="🧪"
            title="The Testing Pyramid"
            subtitle="Unit → Integration → E2E"
            definition="Unit tests: test individual functions/components in isolation (fast, many). Integration tests: test multiple units working together (medium). E2E tests: test complete user flows in a real browser (slow, few). The pyramid suggests: many unit, some integration, few E2E."
            analogy="The testing pyramid is like quality control in a car factory - lots of quick material tests (unit), fewer assembly checks (integration), and a final test drive (E2E). You don't test-drive every bolt."
            seniorTip="Follow the 70/20/10 rule: 70% unit, 20% integration, 10% E2E. Use Vitest/Jest for unit, Testing Library for integration, Playwright/Cypress for E2E. Write tests that test BEHAVIOR, not implementation. Test what users see, not internal state."
            defaultOpen
          >
            <!-- Testing Pyramid Visual -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🔺 The Testing Pyramid</p>
              <div class="flex flex-col items-center gap-1">
                <div class="w-24 py-2 rounded-t-lg bg-red-500/20 border border-red-500/30 text-center">
                  <p class="text-[10px] font-bold text-red-400">E2E</p>
                  <p class="text-[9px] text-gray-500">Slow, Expensive</p>
                  <p class="text-[9px] text-gray-500">~10%</p>
                </div>
                <div class="w-40 py-2 bg-amber-500/20 border border-amber-500/30 text-center">
                  <p class="text-[10px] font-bold text-amber-400">Integration</p>
                  <p class="text-[9px] text-gray-500">Medium Speed</p>
                  <p class="text-[9px] text-gray-500">~20%</p>
                </div>
                <div class="w-56 py-2 rounded-b-lg bg-emerald-500/20 border border-emerald-500/30 text-center">
                  <p class="text-[10px] font-bold text-emerald-400">Unit Tests</p>
                  <p class="text-[9px] text-gray-500">Fast, Cheap, Many</p>
                  <p class="text-[9px] text-gray-500">~70%</p>
                </div>
              </div>
            </div>

            <CodePlayground
              title="testing.js"
              :initialCode="codes.testingPyramid"
            />
          </ConceptCard>

          <ConceptCard
            id="component-testing"
            icon="🧩"
            title="Component Testing with Testing Library"
            subtitle="Test components like a user would"
            definition="Testing Library (for React, Vue, Angular) renders components and lets you query by text, role, label - the way users find elements. Avoid testing internal state or implementation details. Query priority: getByRole → getByLabelText → getByText → getByTestId."
            analogy="Testing Library is like a mystery shopper - they don't care about the restaurant's kitchen setup (implementation), they test the experience: 'Can I find the menu? Can I order? Does the food arrive?'"
            seniorTip="Prefer getByRole over getByTestId - it forces accessible markup. Test user interactions: click, type, submit. Test what's VISIBLE, not what's in state. Mock API calls, not internal functions. Use userEvent over fireEvent for realistic interactions."
          >
            <CodePlayground
              title="component-testing.js"
              :initialCode="codes.componentTesting"
            />
          </ConceptCard>
        </template>

        <!-- ==================== GIT & WORKFLOW ==================== -->
        <template v-if="activeSection === 'workflow'">
          <ConceptCard
            id="git-workflow"
            icon="🔀"
            title="Git Workflow & Branching Strategy"
            subtitle="Trunk-based, GitFlow, and feature branches"
            definition="Trunk-based: short-lived feature branches merged to main frequently. GitFlow: develop, feature, release, hotfix branches. Feature branches: branch per feature, PR review, merge to main. Most modern teams prefer trunk-based with feature flags."
            analogy="Trunk-based is like a highway with short on-ramps - you merge quickly and keep traffic flowing. GitFlow is like a complex interchange with many lanes - powerful but can cause traffic jams (merge conflicts)."
            seniorTip="Use trunk-based development with feature flags for senior-level projects. Keep PRs small (< 400 lines). Write meaningful commit messages (conventional commits). Squash merge to keep history clean. Use pre-commit hooks for linting."
            defaultOpen
          >
            <CodePlayground
              title="git-workflow.js"
              :initialCode="codes.gitWorkflow"
            />
          </ConceptCard>

          <ConceptCard
            id="cicd"
            icon="🚀"
            title="CI/CD Pipeline for Frontend"
            subtitle="Automate everything from commit to deploy"
            definition="CI (Continuous Integration): auto-run lint, tests, build on every push. CD (Continuous Deployment): auto-deploy on merge to main. Pipeline stages: install → lint → test → build → deploy. Tools: GitHub Actions, GitLab CI, CircleCI, Vercel."
            analogy="CI/CD is like an assembly line in a factory - each station (stage) checks one thing. If any station fails, the whole line stops and catches the defect before it reaches the customer (production)."
            seniorTip="Minimum CI pipeline: lint → type-check → unit tests → build → deploy preview. Add: bundle size check, Lighthouse CI, visual regression tests. Cache node_modules between runs. Use branch previews for PR review."
          >
            <CodePlayground
              title="cicd.js"
              :initialCode="codes.cicd"
            />
          </ConceptCard>
        </template>

        <!-- ==================== CODE QUALITY ==================== -->
        <template v-if="activeSection === 'quality'">
          <ConceptCard
            id="linting"
            icon="✨"
            title="ESLint, Prettier & Code Standards"
            subtitle="Consistent code without arguments"
            definition="ESLint: catches code errors and enforces rules (no-unused-vars, no-console). Prettier: auto-formats code (spacing, semicolons, quotes). Stylelint: CSS linting. Husky + lint-staged: run linters on git commit. EditorConfig: consistent editor settings across team."
            analogy="ESLint is like a grammar checker that catches mistakes. Prettier is like an auto-formatter that makes everything look consistent. Together, they're like a copy editor and a layout designer for your code."
            seniorTip="Configure ESLint + Prettier together (eslint-config-prettier prevents conflicts). Use lint-staged + husky for pre-commit hooks. Set up auto-fix on save in VS Code. This is non-negotiable for large teams at Media.net."
            defaultOpen
          >
            <CodePlayground
              title="code-quality.js"
              :initialCode="codes.codeQuality"
            />
          </ConceptCard>

          <ConceptCard
            id="typescript-basics"
            icon="📘"
            title="TypeScript Essentials for UI Developers"
            subtitle="Type safety without the overhead"
            definition="TypeScript adds static typing to JavaScript: interfaces, types, generics, enums, type guards. Benefits: catch errors at build time, better IDE support, self-documenting code. Key: utility types (Partial, Pick, Omit, Record), type narrowing, discriminated unions."
            analogy="TypeScript is like labeling all cables behind your TV - it takes time upfront, but when something breaks, you know exactly which cable (type) goes where, instead of unplugging everything randomly."
            seniorTip="Use TypeScript for all new projects. Start with strict mode. Define API response types. Use Zod for runtime validation + type inference. Avoid 'any' like the plague. Key utility types: Partial, Required, Pick, Omit, Record, Exclude."
          >
            <CodePlayground
              title="typescript.js"
              :initialCode="codes.typescript"
            />
          </ConceptCard>

          <ConceptCard
            id="performance-budgets"
            icon="📏"
            title="Performance Budgets & Monitoring"
            subtitle="Set limits, enforce them"
            definition="Performance budget: a threshold for metrics like bundle size (< 200KB gzipped), LCP (< 2.5s), or number of requests (< 50). Enforce via CI (bundlesize, Lighthouse CI). Monitor via RUM (Real User Monitoring) and synthetic testing."
            analogy="A performance budget is like a calorie budget for your website - you decide the daily limit upfront, and every new feature (ingredient) must fit within that limit, or you cut something else."
            seniorTip="Set budgets: JS < 200KB, CSS < 50KB, images < 500KB per page. Use Lighthouse CI in your pipeline. Track real-user performance with web-vitals. At Media.net, ad-heavy pages need strict budgets to maintain good UX."
          >
            <CodePlayground
              title="perf-budgets.js"
              :initialCode="codes.perfBudgets"
            />
          </ConceptCard>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SectionNav from './SectionNav.vue'
import ConceptCard from './ConceptCard.vue'
import CodePlayground from './CodePlayground.vue'

const sections = [
  { id: 'bundlers', label: 'Build Tools', icon: '📦', badge: '2' },
  { id: 'testing', label: 'Testing', icon: '🧪', badge: '2' },
  { id: 'workflow', label: 'Git & CI/CD', icon: '🔀', badge: '2' },
  { id: 'quality', label: 'Code Quality', icon: '✨', badge: '3' },
]

const activeSection = ref('bundlers')

function setSection(id) {
  activeSection.value = id
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// ==================== Build Tool Comparison ====================
const buildComparison = [
  { feature: 'Dev Server', webpack: 'Bundle-based (slow)', vite: 'Native ESM (instant)' },
  { feature: 'HMR Speed', webpack: 'Seconds', vite: 'Milliseconds' },
  { feature: 'Config', webpack: 'Complex', vite: 'Minimal' },
  { feature: 'Production', webpack: 'Webpack', vite: 'Rollup' },
  { feature: 'Code Split', webpack: 'Manual + auto', vite: 'Auto via import()' },
  { feature: 'Ecosystem', webpack: 'Massive', vite: 'Growing fast' },
  { feature: 'Best for', webpack: 'Legacy, complex', vite: 'New projects' },
]

// ==================== Code Examples ====================
const codes = {
  buildTools: `// Webpack vs Vite - Key Differences

console.log("📦 Build Tool Architecture:\\n");

console.log("WEBPACK (Bundle-Based):");
console.log("  1. Read all files from entry point");
console.log("  2. Build dependency graph");
console.log("  3. Run loaders (babel, css-loader, etc.)");
console.log("  4. Bundle everything into chunks");
console.log("  5. Serve bundled files to browser");
console.log("  ⏱️ Cold start: 10-60 seconds\\n");

console.log("VITE (ESM-Based):");
console.log("  1. Pre-bundle dependencies (esbuild - FAST)");
console.log("  2. Serve source files as native ES modules");
console.log("  3. Browser requests files → Vite transforms on-demand");
console.log("  4. Only processes what's actually imported");
console.log("  5. For production: Rollup bundles everything");
console.log("  ⏱️ Cold start: < 1 second\\n");

console.log("💡 Key Insight:");
console.log("  Webpack: Bundles FIRST, then serves (slow startup)");
console.log("  Vite: Serves FIRST, transforms on-demand (fast startup)\\n");

console.log("When to use Webpack:");
console.log("  • Legacy projects already configured");
console.log("  • Complex custom loaders/plugins needed");
console.log("When to use Vite:");
console.log("  • New projects (especially Vue, React)");
console.log("  • When DX (Developer Experience) matters");`,

  treeShaking: `// Tree Shaking & Code Splitting

console.log("🌳 Tree Shaking - Remove Dead Code:\\n");

console.log("Works with ES modules (import/export):");
console.log("  // utils.js");
console.log("  export function add(a, b) { return a + b }");
console.log("  export function subtract(a, b) { return a - b }\\n");
console.log("  // app.js");
console.log("  import { add } from './utils'  // subtract is REMOVED\\n");

console.log("❌ Does NOT work with CommonJS:");
console.log("  const utils = require('./utils')  // ALL code included\\n");

console.log("✂️ Code Splitting - On-Demand Loading:\\n");

console.log("  // Route-level splitting (most common)");
console.log("  const About = () => import('./pages/About.vue')\\n");

console.log("  // Component-level splitting");
console.log("  const Modal = defineAsyncComponent(() =>");
console.log("    import('./components/HeavyModal.vue')");
console.log("  )\\n");

console.log("  // Library splitting");
console.log("  button.addEventListener('click', async () => {");
console.log("    const { Chart } = await import('chart.js')");
console.log("    new Chart(canvas, config)");
console.log("  })\\n");

console.log("📏 Bundle Size Targets:");
console.log("  Initial JS: < 200KB gzipped");
console.log("  Per-route chunk: < 50KB gzipped");`,

  testingPyramid: `// Testing Strategy - The Pyramid

console.log("🧪 Frontend Testing Strategy:\\n");

console.log("1️⃣ UNIT TESTS (70%) - Fast, Isolated");
console.log("  • Pure functions, utilities, composables");
console.log("  • Tools: Vitest, Jest");
console.log("  • Speed: < 10ms per test\\n");

console.log("  describe('formatCurrency', () => {");
console.log("    test('formats USD', () => {");
console.log("      expect(formatCurrency(1234, 'USD'))");
console.log("        .toBe('$1,234.00')");
console.log("    })");
console.log("  })\\n");

console.log("2️⃣ INTEGRATION TESTS (20%) - Component Behavior");
console.log("  • Render component, simulate user actions");
console.log("  • Tools: Testing Library + Vitest");
console.log("  • Speed: < 100ms per test\\n");

console.log("  test('submits form with valid data', async () => {");
console.log("    render(LoginForm)");
console.log("    await userEvent.type(getByRole('textbox'), 'user@test.com')");
console.log("    await userEvent.click(getByRole('button', { name: 'Login' }))");
console.log("    expect(getByText('Welcome!')).toBeVisible()");
console.log("  })\\n");

console.log("3️⃣ E2E TESTS (10%) - Full User Flows");
console.log("  • Real browser, real API (or mocked)");
console.log("  • Tools: Playwright, Cypress");
console.log("  • Speed: 1-30 seconds per test\\n");

console.log("  test('user can login and see dashboard', async ({ page }) => {");
console.log("    await page.goto('/login')");
console.log("    await page.fill('#email', 'user@test.com')");
console.log("    await page.click('button:has-text(\"Login\")')");
console.log("    await expect(page.locator('h1')).toHaveText('Dashboard')");
console.log("  })");`,

  componentTesting: `// Component Testing with Testing Library

console.log("🧩 Testing Library Best Practices:\\n");

console.log("Query Priority (most → least preferred):");
console.log("  1. getByRole('button', { name: 'Submit' })  ← BEST");
console.log("  2. getByLabelText('Email')");
console.log("  3. getByPlaceholderText('Enter email')");
console.log("  4. getByText('Welcome')");
console.log("  5. getByTestId('submit-btn')  ← LAST RESORT\\n");

console.log("Write tests like a USER, not like a developer:");
console.log("  ❌ expect(wrapper.vm.isLoading).toBe(true)");
console.log("  ✅ expect(getByText('Loading...')).toBeVisible()\\n");

console.log("  ❌ wrapper.setData({ count: 5 })");
console.log("  ✅ await userEvent.click(getByRole('button', { name: '+' }))\\n");

console.log("Testing Async Operations:");
console.log("  test('loads and displays users', async () => {");
console.log("    // Mock the API");
console.log("    server.use(");
console.log("      rest.get('/api/users', (req, res, ctx) =>");
console.log("        res(ctx.json([{ name: 'Alice' }]))");
console.log("      )");
console.log("    )\\n");
console.log("    render(UserList)\\n");
console.log("    // Wait for async content");
console.log("    await waitFor(() => {");
console.log("      expect(getByText('Alice')).toBeVisible()");
console.log("    })");
console.log("  })");`,

  gitWorkflow: `// Git Workflow for Frontend Teams

console.log("🔀 Modern Git Workflow:\\n");

console.log("1️⃣ Trunk-Based Development (Recommended):");
console.log("  main (always deployable)");
console.log("    ↳ feature/add-search (< 1-2 days)");
console.log("    ↳ feature/fix-nav (< 1 day)");
console.log("  → Merge via squash PR → deploy\\n");

console.log("2️⃣ Conventional Commits:");
console.log("  feat: add search bar to header");
console.log("  fix: resolve nav dropdown positioning");
console.log("  refactor: extract useAuth composable");
console.log("  chore: update dependencies");
console.log("  docs: add API documentation\\n");

console.log("3️⃣ Pre-commit Hooks (Husky + lint-staged):");
console.log("  // package.json");
console.log('  "lint-staged": {');
console.log('    "*.{js,vue}": ["eslint --fix", "prettier --write"],');
console.log('    "*.css": ["stylelint --fix"]');
console.log("  }\\n");

console.log("4️⃣ PR Best Practices:");
console.log("  • < 400 lines of changes");
console.log("  • Clear description + screenshots for UI");
console.log("  • Link to ticket/issue");
console.log("  • Self-review before requesting review");
console.log("  • Address all comments before merge");`,

  cicd: `// CI/CD Pipeline for Frontend

console.log("🚀 GitHub Actions CI Pipeline:\\n");

console.log("name: Frontend CI");
console.log("on: [push, pull_request]\\n");

console.log("jobs:");
console.log("  quality:");
console.log("    runs-on: ubuntu-latest");
console.log("    steps:");
console.log("      - uses: actions/checkout@v4");
console.log("      - uses: actions/setup-node@v4");
console.log("      - run: npm ci              # install");
console.log("      - run: npm run lint         # lint check");
console.log("      - run: npm run type-check   # TypeScript");
console.log("      - run: npm run test         # unit tests");
console.log("      - run: npm run build        # production build\\n");

console.log("  e2e:");
console.log("    needs: quality");
console.log("    runs-on: ubuntu-latest");
console.log("    steps:");
console.log("      - run: npx playwright test  # E2E\\n");

console.log("  deploy:");
console.log("    needs: [quality, e2e]");
console.log("    if: github.ref == 'refs/heads/main'");
console.log("    steps:");
console.log("      - run: npm run deploy       # to staging/prod\\n");

console.log("💡 Pipeline should catch errors BEFORE they reach main.");
console.log("   If CI passes → safe to merge.");`,

  codeQuality: `// ESLint + Prettier + Husky Setup

console.log("✨ Code Quality Toolchain:\\n");

console.log("1️⃣ ESLint - Catches Code Issues:");
console.log("  npm install -D eslint @eslint/js\\n");
console.log("  // eslint.config.js");
console.log("  export default [");
console.log("    { rules: {");
console.log("        'no-unused-vars': 'error',");
console.log("        'no-console': 'warn',");
console.log("        'prefer-const': 'error',");
console.log("    }}");
console.log("  ]\\n");

console.log("2️⃣ Prettier - Auto-Formats Code:");
console.log("  npm install -D prettier\\n");
console.log("  // .prettierrc");
console.log("  { semi: false,");
console.log("    singleQuote: true,");
console.log("    trailingComma: 'es5',");
console.log("    printWidth: 100 }\\n");

console.log("3️⃣ Husky - Git Hooks:");
console.log("  npm install -D husky lint-staged");
console.log("  npx husky init\\n");

console.log("4️⃣ VS Code Settings:");
console.log("  // .vscode/settings.json");
console.log('  { "editor.formatOnSave": true,');
console.log('    "editor.defaultFormatter": "esbenp.prettier-vscode",');
console.log('    "editor.codeActionsOnSave": {');
console.log('      "source.fixAll.eslint": true');
console.log("    }}");`,

  typescript: `// TypeScript Essentials for Frontend

console.log("📘 TypeScript - Key Concepts:\\n");

console.log("1️⃣ Interfaces vs Types:");
console.log("  interface User { name: string; age: number }");
console.log("  type Status = 'active' | 'inactive' | 'banned'\\n");
console.log("  → Interfaces for objects, types for unions/primitives\\n");

console.log("2️⃣ Utility Types:");
console.log("  Partial<User>     → all fields optional");
console.log("  Required<User>    → all fields required");
console.log("  Pick<User, 'name'> → only name field");
console.log("  Omit<User, 'age'>  → all except age");
console.log("  Record<string, User> → string keys, User values\\n");

console.log("3️⃣ Generics:");
console.log("  function useFetch<T>(url: string): Promise<T> {");
console.log("    return fetch(url).then(r => r.json())");
console.log("  }");
console.log("  const users = await useFetch<User[]>('/api/users')\\n");

console.log("4️⃣ Type Guards:");
console.log("  function isUser(obj: any): obj is User {");
console.log("    return 'name' in obj && 'age' in obj");
console.log("  }\\n");

console.log("5️⃣ Vue + TypeScript:");
console.log("  defineProps<{ title: string; count?: number }>()");
console.log("  defineEmits<{ (e: 'update', value: string): void }>()");
console.log("  const data = ref<User | null>(null)");`,

  perfBudgets: `// Performance Budgets

console.log("📏 Setting & Enforcing Performance Budgets:\\n");

console.log("Recommended Budgets:");
console.log("  JavaScript: < 200KB gzipped (total)");
console.log("  CSS: < 50KB gzipped (total)");
console.log("  Images: < 500KB per page");
console.log("  Fonts: 2 weights max, WOFF2 only");
console.log("  HTTP requests: < 50 per page");
console.log("  LCP: < 2.5 seconds");
console.log("  TTI: < 3.5 seconds\\n");

console.log("Enforcing in CI:");
console.log("  // bundlesize config (package.json)");
console.log('  "bundlesize": [{');
console.log('    "path": "./dist/assets/*.js",');
console.log('    "maxSize": "200 kB"');
console.log("  }]\\n");

console.log("  // Lighthouse CI");
console.log("  assert: {");
console.log("    'categories:performance': ['error', { minScore: 0.9 }],");
console.log("    'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],");
console.log("  }\\n");

console.log("Monitoring in Production:");
console.log("  import { onLCP, onCLS, onINP } from 'web-vitals'");
console.log("  onLCP(metric => sendToAnalytics(metric))");
console.log("  onCLS(metric => sendToAnalytics(metric))");
console.log("  onINP(metric => sendToAnalytics(metric))");`,
}
</script>
