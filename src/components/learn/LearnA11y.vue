<template>
  <div class="learn-a11y min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn" class="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4">
        ← Back to Topics
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">♿</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Web Accessibility (A11y)</h1>
      </div>
      <p class="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        Accessibility is not a feature; it's a requirement. Build inclusively for screen readers, keyboard users, and low vision.
      </p>
    </div>

    <!-- Layout -->
    <div class="px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 pb-16">
      <SectionNav
        :sections="sections"
        :activeSection="activeSection"
        activeColor="bg-yellow-600"
        @select="setSection"
        class="lg:w-56 flex-shrink-0"
      />

      <div class="flex-1 min-w-0 space-y-5">
        <!-- ==================== SEMANTICS ==================== -->
         <template v-if="activeSection === 'semantics'">
          <ConceptCard
            id="semantic-html"
            icon="🏗️"
            title="Semantic HTML"
            subtitle="The foundation of A11y"
            definition="Use the right HTML tag for the job. <button> for actions, <a> for links, <nav> for navigation, <main> for content. This gives screen readers free context and keyboard support out of the box."
            analogy="Semantic HTML is like using the right tool. You could hammer a nail with a wrench (<div> with click handler), but using a hammer (<button>) is easier, safer, and works as expected."
            seniorTip="Never use <div onClick> for a button. You lose focus states, enter key support, and screen reader announcements. If you MUST, you need role='button' and tabindex='0' and onKeyDown handlers. Just use <button>."
            defaultOpen
          >
             <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div class="p-4 border border-red-200 bg-red-50 rounded-lg">
                 <h4 class="font-bold text-red-600 mb-2">❌ Bad (Div Soup)</h4>
                 <code class="text-xs block whitespace-pre overflow-x-auto">
&lt;div class="btn" onClick={...}&gt;
  Login
&lt;/div&gt;
                 </code>
                 <p class="text-xs text-red-500 mt-2">No keyboard focus. No Enter key. Screen reader says "text".</p>
               </div>
               <div class="p-4 border border-emerald-200 bg-emerald-50 rounded-lg">
                 <h4 class="font-bold text-emerald-600 mb-2">✅ Good (Semantic)</h4>
                 <code class="text-xs block whitespace-pre overflow-x-auto">
&lt;button type="button" onClick={...}&gt;
  Login
&lt;/button&gt;
                 </code>
                 <p class="text-xs text-emerald-500 mt-2">Free: Focus, Enter/Space activation, "Button" role.</p>
               </div>
             </div>
             <CodePlayground title="semantics.html" :initialCode="codes.semantics" />
          </ConceptCard>
        </template>

        <!-- ==================== ARIA ==================== -->
        <template v-if="activeSection === 'aria'">
           <ConceptCard
             id="aria-roles"
             icon="🏷️"
             title="ARIA Roles & Attributes"
             subtitle="Bridge the gap"
             definition="ARIA (Accessible Rich Internet Applications) attributes (aria-label, aria-expanded, role) provide extra information to screen readers when HTML semantics aren't enough (e.g. custom dropdowns)."
             seniorTip="First rule of ARIA: Don't use ARIA if a native element exists. Use it to enhance, not replace. E.g. aria-label='Close' on an icon-only button."
           >
              <CodePlayground title="aria-example.html" :initialCode="codes.aria" />
           </ConceptCard>
        </template>

        <!-- ==================== VISUAL ==================== -->
        <template v-if="activeSection === 'visual'">
           <ConceptCard
             id="contrast-focus"
             icon="👁️"
             title="Visual Accessibility"
             subtitle="Contrast & Focus States"
             definition="Contrast: Text must have 4.5:1 ratio against background. Focus: Never remove outlines (outline: none) without replacing them. Users need to see where they are tabbing."
           >
              <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5 space-y-4">
                 <div class="flex gap-4 items-center">
                    <button class="bg-gray-200 text-gray-400 px-4 py-2 rounded text-sm font-bold cursor-not-allowed">
                       Low Contrast (Bad)
                    </button>
                    <span class="text-xs text-red-500">Ratio 1.8:1 (Fail)</span>
                 </div>
                 <div class="flex gap-4 items-center">
                    <button class="bg-indigo-600 text-white px-4 py-2 rounded text-sm font-bold shadow-lg focus:ring-4 ring-indigo-300 outline-none">
                       High Contrast (Good)
                    </button>
                    <span class="text-xs text-emerald-500">Ratio 8.5:1 (Pass)</span>
                 </div>
              </div>
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
  { id: 'semantics', label: 'Semantic HTML', icon: '🏗️', badge: 'Must' },
  { id: 'aria', label: 'ARIA', icon: '🏷️', badge: 'Adv' },
  { id: 'visual', label: 'Visual A11y', icon: '👁️', badge: 'Design' },
]

const activeSection = ref('semantics')

function setSection(id) {
  activeSection.value = id
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const codes = {
  semantics: `<!-- 🏗️ Semantic Structure -->

<!-- ❌ BAD -->
<div class="nav">
  <span onclick="goHome()">Home</span>
</div>
<div class="main">
  <div class="article">...</div>
</div>

<!-- ✅ GOOD -->
<nav>
  <a href="/home">Home</a>
</nav>
<main>
  <article>
    <h1>The Article Title</h1> <!-- Only one H1 -->
    <p>...</p>
  </article>
</main>`,

  aria: `<!-- 🏷️ ARIA Best Practices -->

<!-- 1. Labeling Icon Buttons -->
<button aria-label="Close Menu">
  <svg>...</svg>
</button>

<!-- 2. Accordions / Dropdowns -->
<button
  aria-expanded="true"
  aria-controls="menu-1"
>
  Settings
</button>
<ul id="menu-1" hidden={false}>
  <li>Profile</li>
</ul>

<!-- 3. Form Errors -->
<input
  type="email"
  aria-invalid="true"
  aria-describedby="email-error"
/>
<span id="email-error">Invalid email address</span>`
}
</script>
