<template>
  <div class="learn-advanced min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn" class="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4">
        ← Back to Topics
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">🚀</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Advanced & Specialized Skills</h1>
      </div>
      <p class="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        The top 1% differentiators: Web Security, PWA, Animations, Internationalization, and SEO.
      </p>
    </div>

    <!-- Layout -->
    <div class="px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 pb-16">
      <SectionNav
        :sections="sections"
        :activeSection="activeSection"
        activeColor="bg-purple-600"
        @select="setSection"
        class="lg:w-56 flex-shrink-0"
      />

      <div class="flex-1 min-w-0 space-y-5">
        <!-- ==================== SECURITY ==================== -->
         <template v-if="activeSection === 'security'">
          <ConceptCard
            id="xss-csrf"
            icon="🛡️"
            title="Web Security: XSS & CSRF"
            subtitle="Protect your users"
            definition="XSS (Cross-Site Scripting): Injecting malicious scripts (via inputs/URL) that run in other users' browsers. CSRF (Cross-Site Request Forgery): Tricking a logged-in user into performing an action without their consent."
            seniorTip="Never trust user input. Use CSP (Content Security Policy) headers. Use frameworks (Vue/React) that auto-escape by default (avoid v-html/dangerouslySetInnerHTML). Use SameSite cookies."
            defaultOpen
          >
             <CodePlayground title="security-headers.js" :initialCode="codes.security" />
          </ConceptCard>
        </template>

        <!-- ==================== PWA ==================== -->
        <template v-if="activeSection === 'pwa'">
           <ConceptCard
             id="service-workers"
             icon="📱"
             title="PWA & Service Workers"
             subtitle="Offline-first experiences"
             definition="Service Workers act as a proxy between your app and the network. They enable offline support, push notifications, and background sync. A PWA (Progressive Web App) is installable."
           >
              <CodePlayground title="sw.js" :initialCode="codes.pwa" />
           </ConceptCard>
        </template>
        
        <!-- ==================== I18N ==================== -->
        <template v-if="activeSection === 'i18n'">
           <ConceptCard
             id="internationalization"
             icon="🌍"
             title="Internationalization (i18n)"
             subtitle="Beyond translation"
             definition="i18n is adapting code to handle different languages. l10n (Localization) is the actual translation content. Considerations: RTL (Right-to-Left) layouts, Date/Number formatting, Pluralization rules."
           >
              <CodePlayground title="en.json" :initialCode="codes.i18n" />
           </ConceptCard>
        </template>

        <!-- ==================== ANIMATIONS ==================== -->
        <template v-if="activeSection === 'animation'">
           <ConceptCard
             id="framer-motion"
             icon="✨"
             title="Advanced Animations"
             subtitle="Framer Motion & FLIP"
             definition="Declarative animations (Framer Motion) handle complex layout transitions (FLIP technique) that CSS alone cannot easily do. Shared layout animations are key for app-like feel."
           >
              <CodePlayground title="motion.jsx" :initialCode="codes.motion" />
           </ConceptCard>
        </template>

        <!-- ==================== SEO ==================== -->
        <template v-if="activeSection === 'seo'">
           <ConceptCard
             id="technical-seo"
             icon="🔍"
             title="Technical SEO"
             subtitle="Ranking factors"
             definition="Crawlability (can Google read it?), Indexability (should Google list it?), Performance (Core Web Vitals), Semantic Structure (H1, H2), and Structured Data (JSON-LD schemas)."
           >
              <CodePlayground title="schema.json" :initialCode="codes.seo" />
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
  { id: 'security', label: 'Web Security', icon: '🛡️', badge: 'Critical' },
  { id: 'pwa', label: 'PWA / Offline', icon: '📱', badge: 'App' },
  { id: 'i18n', label: 'i18n & l10n', icon: '🌍', badge: 'Global' },
  { id: 'animation', label: 'Animations', icon: '✨', badge: 'UX' },
  { id: 'seo', label: 'SEO', icon: '🔍', badge: 'Growth' },
]

const activeSection = ref('security')

function setSection(id) {
  activeSection.value = id
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const codes = {
  security: `// 🛡️ Security Best Practices

// 1. Content Security Policy (CSP) Header
// Only allow scripts from own domain and trusted analytics
Content-Security-Policy: default-src 'self'; script-src 'self' https://analytics.google.com

// 2. Prevent XSS in React/Vue
// ❌ Dangerous
// <div dangerouslySetInnerHTML={{ __html: userInput }} />
// <div v-html="userInput"></div>

// ✅ Safe (Auto-escaped)
// <div>{userInput}</div>
// <div>{{ userInput }}</div>

// 3. Sanitization (if HTML needed)
import DOMPurify from 'dompurify'
const clean = DOMPurify.sanitize(dirtyHTML)`,

  pwa: `// 📱 Service Worker for Offline Caching

// sw.js (Simplified)
const CACHE_NAME = 'v1-app-cache'

// Install: Cache critical assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(['/', '/index.html', '/main.js', '/styles.css'])
    })
  )
})

// Fetch: Serve from cache, fallback to network
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request)
    })
  )
})`,

  i18n: `// 🌍 i18n JSON Structure (e.g., vue-i18n, react-i18next)

// en.json
{
  "welcome": "Welcome back, {name}",
  "cart": "You have {count} item | You have {count} items",
  "date_format": "{date, date, long}"
}

// Usage
t('welcome', { name: 'Alice' }) // "Welcome back, Alice"
tc('cart', 1) // "You have 1 item"
tc('cart', 5) // "You have 5 items"

// DateTimeFormat (Built-in JS)
new Intl.DateTimeFormat('fr-FR').format(date) // "19/02/2026"`,

  motion: `// ✨ Framer Motion Example (React)

import { motion } from 'framer-motion'

const list = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const item = {
  hidden: { x: -20, opacity: 0 },
  show: { x: 0, opacity: 1 }
}

function List({ items }) {
  return (
    <motion.ul variants={list} initial="hidden" animate="show">
      {items.map(i => (
        <motion.li key={i} variants={item}>{i}</motion.li>
      ))}
    </motion.ul>
  )
}`,

  seo: `// 🔍 JSON-LD Structured Data (for Google Rich Snippets)

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Super Widget",
  "image": "https://example.com/widget.jpg",
  "description": "The best widget ever made.",
  "brand": {
    "@type": "Brand",
    "name": "WidgetCo"
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "price": "29.99",
    "availability": "https://schema.org/InStock"
  }
}
<\/script>`
}
</script>
