<template>
  <div class="learn-testing min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn" class="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4">
        ← Back to Topics
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">🧪</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Testing & Quality</h1>
      </div>
      <p class="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        Seniors write reliable code. Master the testing pyramid, mocking, Integration testing with React Testing Library, and E2E with Playwright.
      </p>
    </div>

    <!-- Layout -->
    <div class="px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 pb-16">
      <SectionNav
        :sections="sections"
        :activeSection="activeSection"
        activeColor="bg-cyan-600"
        @select="setSection"
        class="lg:w-56 flex-shrink-0"
      />

      <div class="flex-1 min-w-0 space-y-5">
        <!-- ==================== STRATEGY ==================== -->
         <template v-if="activeSection === 'strategy'">
          <ConceptCard
            id="pyramid"
            icon="🔺"
            title="The Testing Pyramid"
            subtitle="Unit vs Integration vs E2E"
            definition="Unit (70%): Fast, isolated tests for functions. Integration (20%): Test components working together. E2E (10%): Test full user flows in a real browser."
            analogy="Unit = inspecting a brick. Integration = checking if the wall holds up. E2E = living in the house to see if the roof leaks."
            seniorTip="Don't invert the pyramid (Ice Cream Cone anti-pattern). E2E tests are slow and flaky. Rely on them only for critical flows (Login, Checkout). Push most logic to Unit tests."
            defaultOpen
          >
             <!-- Pyramid Visual -->
             <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5 flex flex-col items-center gap-1">
                <div class="w-24 py-2 bg-red-500/20 text-center border-t-2 border-red-500 text-xs font-bold text-red-500">E2E (10%)</div>
                <div class="w-40 py-2 bg-amber-500/20 text-center border-t-2 border-amber-500 text-xs font-bold text-amber-500">Integration (20%)</div>
                <div class="w-56 py-2 bg-emerald-500/20 text-center border-t-2 border-emerald-500 text-xs font-bold text-emerald-500">Unit (70%)</div>
             </div>
             <CodePlayground title="strategy.js" :initialCode="codes.pyramid" />
          </ConceptCard>

          <ConceptCard
            id="what-to-test"
            icon="🤔"
            title="What to Test (and Not)"
            subtitle="Testing philosophy"
            definition="TEST: User interactions, Edge cases, Accessibility, Business Logic. DON'T TEST: Implementation details (internal state name), Third-party library internals, Static constants."
            seniorTip="Test behavior, not implementation. If refactoring code breaks your test (but the feature still works), you wrote a brittle test."
          >
             <CodePlayground title="what-to-test.js" :initialCode="codes.whatToTest" />
          </ConceptCard>
         </template>

        <!-- ==================== UNIT & MOCKING ==================== -->
        <template v-if="activeSection === 'unit'">
          <ConceptCard
            id="unit-basics"
            icon="⚡"
            title="Unit Testing with Vitest/Jest"
            subtitle="Testing logic in isolation"
            definition="Unit tests verify that small, isolated pieces of code (functions, hooks) work as expected. They run instantly and should mock all external dependencies."
            defaultOpen
          >
             <CodePlayground title="math.test.js" :initialCode="codes.unitTest" />
          </ConceptCard>

          <ConceptCard
            id="mocking"
            icon="🎭"
            title="Mocking Dependencies"
            subtitle="Faking the world"
            definition="Simulate complex dependencies (API calls, timers, random numbers) to test code deterministically. Use `vi.fn()` or `jest.fn()` to spy on calls and return canned responses."
            analogy="Mocking is like a stunt double. The director (test) doesn't put the real expensive actor (API) in danger; they use a double who looks the same but does exactly what's told."
            seniorTip="Don't mock everything! Over-mocking leads to 'tests pass, app fails'. Mock at the boundaries (network requests, dates). Prefer strict mocks that throw if called unexpectedly."
          >
             <CodePlayground title="mock-api.test.js" :initialCode="codes.mocking" />
          </ConceptCard>
        </template>

        <!-- ==================== INTEGRATION ==================== -->
         <template v-if="activeSection === 'integration'">
          <ConceptCard
            id="rtl"
            icon="🐙"
            title="React Testing Library (RTL)"
            subtitle="Testing components from user perspective"
            definition="RTL encourages testing how users use your app. Query by text/role, not by ID or class. Fire user events (click, type) and assert on visible DOM changes."
            seniorTip="Query Priority: 1. `getByRole` (Accessible) 2. `getByLabelText` (Form) 3. `getByText` (Visual). Avoid `getByTestId` unless necessary."
            defaultOpen
          >
             <CodePlayground title="Component.test.jsx" :initialCode="codes.integration" />
          </ConceptCard>
         </template>

        <!-- ==================== E2E ==================== -->
         <template v-if="activeSection === 'e2e'">
          <ConceptCard
            id="playwright"
            icon="🎭"
            title="E2E with Playwright"
            subtitle="Real browser automation"
            definition="Playwright (or Cypress) automates a real chromium/webkit/firefox browser. It visits URLs, clicks elements, and checks screenshots. Useful for verifying critical paths (Login -> Dashboard -> Logout)."
            seniorTip="Use `locators` (resilient selectors). Handle network flakes with `await expect()`. Don't use E2E for checking if a function returns true/false (use Unit)."
            defaultOpen
          >
             <CodePlayground title="e2e.spec.ts" :initialCode="codes.e2e" />
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
  { id: 'strategy', label: 'Strategy', icon: '🧠', badge: 'Core' },
  { id: 'unit', label: 'Unit & Mocking', icon: '⚡', badge: '70%' },
  { id: 'integration', label: 'Integration (RTL)', icon: '🐙', badge: '20%' },
  { id: 'e2e', label: 'E2E (Playwright)', icon: '🎭', badge: '10%' },
]

const activeSection = ref('strategy')

function setSection(id) {
  activeSection.value = id
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const codes = {
  pyramid: `// 🔺 The Testing Pyramid Strategy

// 1. UNIT TESTS (Fast, Cheap)
// describe('utils/math', () => { ... })
// Runs in ms. Covers all edge cases.

// 2. INTEGRATION TESTS (Medium)
// render(<UserForm />)
// Checks if Form validates and calls API prop.

// 3. E2E TESTS (Slow, Expensive)
// page.goto('https://myapp.com')
// Checks if a real user can sign up.`,

  whatToTest: `// 🤔 User-Centric Testing
  
// ❌ Implementation Detail (Brittle)
test('sets isLoading to true', () => {
  const wrapper = mount(Button)
  wrapper.vm.handleClick()
  expect(wrapper.vm.isLoading).toBe(true) 
  // If you rename isLoading -> processing, test fails!
})

// ✅ Behavioral Test (Robust)
test('shows loading spinner on click', async () => {
  render(<Button />)
  await userEvent.click(screen.getByRole('button'))
  expect(screen.getByTestId('spinner')).toBeVisible()
  // Works regardless of internal state name
})`,

  unitTest: `// ⚡ Unit Test Example (Vitest)
import { describe, it, expect } from 'vitest'
import { getDiscount } from './pricing'

describe('getDiscount', () => {
  it('returns 0 for non-members', () => {
    expect(getDiscount({ isMember: false })).toBe(0)
  })

  it('returns 0.1 for members', () => {
    expect(getDiscount({ isMember: true })).toBe(0.1)
  })
})`,

  mocking: `// 🎭 Mocking Dependencies
import { fetchUser } from './api'

// Mock the module
vi.mock('./api', () => ({
  fetchUser: vi.fn() // Spy function
}))

test('displays user name', async () => {
  // Setup the mock response
  fetchUser.mockResolvedValue({ name: 'Alice' })

  const user = await loadUserProfile()
  expect(user.name).toBe('Alice')
  expect(fetchUser).toHaveBeenCalledTimes(1)
})`,

  integration: `// 🐙 React Testing Library Integration
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from './LoginForm'

test('allows user to login', async () => {
  render(<LoginForm />)

  // 1. Find elements by accessible roles
  const emailInput = screen.getByRole('textbox', { name: /email/i })
  const submitBtn = screen.getByRole('button', { name: /login/i })

  // 2. Interact like a user
  await userEvent.type(emailInput, 'bob@test.com')
  await userEvent.click(submitBtn)

  // 3. Assert UI change
  expect(screen.getByText('Welcome back!')).toBeVisible()
})`,

  e2e: `// 🎭 Playwright E2E Test
import { test, expect } from '@playwright/test'

test('complete checkout flow', async ({ page }) => {
  // 1. Visit
  await page.goto('/shop')

  // 2. Add to cart
  await page.click('text=Add to Cart')

  // 3. Checkout
  await page.click('#cart-icon')
  await page.click('button:has-text("Checkout")')

  // 4. Assert Success
  await expect(page.locator('.success-msg')).toContainText('Thank you')
})`
}
</script>
