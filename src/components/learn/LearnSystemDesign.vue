<template>
  <div class="learn-system-design min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn" class="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4">
        ← Back to Topics
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">📐</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Frontend System Design</h1>
      </div>
      <p class="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        The "Machine Coding" round. How to approach vague problems (e.g., "Design Facebook News Feed") systematically.
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
        <!-- ==================== THE FRAMEWORK ==================== -->
         <template v-if="activeSection === 'framework'">
          <ConceptCard
            id="radio"
            icon="📻"
            title="The RADIO Framework"
            subtitle="Structure your thinking"
            definition="Never jump to code. Use RADIO: Requirements (What?), Architecture (High level diagram), Data Model (State shape), Interface (API contract), Optimizations (Performance)."
            seniorTip="Spend 5-10 minutes on Requirements alone. Ask clarifying questions: 'Is this mobile first?', 'Do we need offline support?', 'Real-time updates?'. This shows seniority."
            defaultOpen
          >
             <div class="space-y-3">
               <div class="p-3 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10">
                 <h4 class="font-bold text-orange-600 mb-1">1. Requirements</h4>
                 <p class="text-sm text-gray-600 dark:text-gray-400">Functional: User can post, scroll, like.<br>Non-functional: < 200ms TTI, 60fps scroll, offline mode.</p>
               </div>
               <div class="p-3 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10">
                 <h4 class="font-bold text-orange-600 mb-1">2. Architecture</h4>
                 <p class="text-sm text-gray-600 dark:text-gray-400">CSR (Single Page App) vs SSR (Next.js)? <br>Client-side routing? Auth strategy?</p>
               </div>
               <div class="p-3 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10">
                 <h4 class="font-bold text-orange-600 mb-1">3. Data Model</h4>
                 <p class="text-sm text-gray-600 dark:text-gray-400">Normalized State? `{ posts: { "1": { ... } } }`. Real-time store?</p>
               </div>
             </div>
          </ConceptCard>
        </template>

        <!-- ==================== CASE STUDY: NEWS FEED ==================== -->
        <template v-if="activeSection === 'casestudy'">
           <ConceptCard
             id="news-feed"
             icon="📰"
             title="Case Study: Infinite Scroll Feed"
             subtitle="Design Facebook/Twitter Feed"
             definition="Key challenges: Pagination strategy (Offset vs Cursor), Virtualization (rendering 10k items), Data Normalization (avoid duplicates)."
             analogy="Offset pagination is saying 'Page 5'. If a new item is added to Page 1, Page 5 shifts (duplicates). Cursor pagination is saying 'Give me 10 items after ID #500'. Stable."
           >
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                 <div class="p-3 border border-red-500/20 bg-red-500/5 rounded">
                    <h5 class="text-xs font-bold text-red-500 mb-1">Offset Pagination (Bad for Feeds)</h5>
                    <code class="text-xs">GET /posts?page=2&limit=10</code>
                    <p class="text-xs text-gray-500 mt-1">❌ Duplicate items if new post added</p>
                    <p class="text-xs text-gray-500">❌ Slow deep paging (SQL OFFSET)</p>
                 </div>
                 <div class="p-3 border border-emerald-500/20 bg-emerald-500/5 rounded">
                    <h5 class="text-xs font-bold text-emerald-500 mb-1">Cursor Pagination (Good)</h5>
                    <code class="text-xs">GET /posts?after_id=1045&limit=10</code>
                    <p class="text-xs text-gray-500 mt-1">✅ Stable list</p>
                    <p class="text-xs text-gray-500">✅ Efficient DB indexing</p>
                 </div>
              </div>
              <CodePlayground title="feed-store.js" :initialCode="codes.feedStore" />
           </ConceptCard>

           <ConceptCard
             id="virtual-list"
             icon="🚅"
             title="Virtualization (Windowing)"
             subtitle="Handling 10,000 items"
             definition="Rendering 10k DOM nodes kills the browser. Virtualization only renders the items currently in the viewport (plus a small buffer)."
             seniorTip="Don't write this from scratch in production (use specialized libs like TanStack Virtual), but understand how it works (absolute positioning, math based on scroll offset) for interviews."
           >
              <CodePlayground title="virtualizer-logic.js" :initialCode="codes.virtualization" />
           </ConceptCard>
        </template>

        <!-- ==================== STATE & COMMS ==================== -->
        <template v-if="activeSection === 'state'">
           <ConceptCard
             id="normalization"
             icon="🗄️"
             title="Data Normalization"
             subtitle="Structure like a Database"
             definition="Don't store arrays of objects. Store a dictionary of IDs (`byId`) and an array of IDs (`allIds`). This makes updates O(1) instead of O(N)."
             analogy="Finding a book in a pile (Array) takes O(N). Finding a book in an indexed library shelf (Map/Object) takes O(1)."
           >
              <CodePlayground title="normalized-state.js" :initialCode="codes.normalization" />
           </ConceptCard>

           <ConceptCard
             id="realtime-patterns"
             icon="📡"
             title="Communication Patterns"
             subtitle="Polling vs Sockets"
             definition="Short Polling (Chatty). Long Polling (Hanging GET). Server-Sent Events (SSE - One way). WebSockets (Two way)."
             seniorTip="For a News Feed? Pull to refresh (Manual) or Short Polling is usually fine. For Chat? WebSockets. For Stock Ticker? SSE."
           >
              <CodePlayground title="comm-patterns.js" :initialCode="codes.comms" />
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
  { id: 'framework', label: 'RADIO Framework', icon: '📻', badge: 'Start' },
  { id: 'casestudy', label: 'News Feed Design', icon: '📰', badge: 'Interview' },
  { id: 'state', label: 'State & Data', icon: '🗄️', badge: 'Core' },
]

const activeSection = ref('framework')

function setSection(id) {
  activeSection.value = id
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const codes = {
  feedStore: `// 📰 News Feed Data Model

// 1. API Response (Cursor Based)
/*
{
  data: [ ...posts ],
  meta: {
    nextCursor: "post_1024_timestamp"
  }
}
*/

// 2. React Query / TanStack Query (Infinite Query)
/*
useInfiniteQuery({
  queryKey: ['feed'],
  queryFn: ({ pageParam }) => fetchFeed(pageParam),
  getNextPageParam: (lastPage) => lastPage.meta.nextCursor
})
*/

// 3. Merging Pages
// Libraries handle this, but essentially:
// const allPosts = data.pages.flatMap(page => page.data)`,

  virtualization: `// 🚅 Virtual List Logic (Simplified)

function VirtualList({ items, rowHeight, containerHeight, scrollTop }) {
  // 1. Calculate range
  const startIndex = Math.floor(scrollTop / rowHeight)
  const endIndex = Math.min(
    items.length - 1,
    Math.floor((scrollTop + containerHeight) / rowHeight)
  )

  // 2. Render only visible + buffer
  const visibleItems = []
  for (let i = startIndex; i <= endIndex; i++) {
    visibleItems.push(
      <div 
        key={i}
        style={{
          position: 'absolute',
          top: i * rowHeight, // Absolute positioning
          height: rowHeight
        }}
      >
        {items[i]}
      </div>
    )
  }

  // 3. Container needs total height to scroll correctly
  return (
    <div style={{ height: items.length * rowHeight, position: 'relative' }}>
      {visibleItems}
    </div>
  )
}`,

  normalization: `// 🗄️ Normalized State Shape

// ❌ Bad: Nested Array
const state = {
  posts: [
    { id: 1, text: 'Hi', author: { id: 9, name: 'Alice' } },
    { id: 2, text: 'Yo', author: { id: 9, name: 'Alice' } } // Alice duplicated!
  ]
}

// Update Alice? Must iterate ALL posts. O(N).

// ✅ Good: Normalized (Like a DB)
const state = {
  posts: {
    "1": { id: 1, text: 'Hi', authorId: 9 },
    "2": { id: 2, text: 'Yo', authorId: 9 }
  },
  users: {
    "9": { id: 9, name: 'Alice' } // Single source of truth
  },
  feed: [1, 2] // Order
}

// Update Alice? state.users["9"].name = "Bob". O(1). Done.`,

  comms: `// 📡 Real-time Strategy Selection

// 1. Chat App (WhatsApp)
// Need: Low latency, Bi-directional (Typing indicators)
// Choice: WebSockets (Socket.io)

// 2. Stock Ticker / Live Score
// Need: Server updates Client frequently. Client rarely updates Server.
// Choice: Server-Sent Events (SSE) - Simpler than WS, HTTP-based.

// 3. Email Inbox / News Feed
// Need: "Freshness" but not ms-perfect real-time.
// Choice: Short Polling (every 30s) or "Pull to Refresh" (User initiated).`
}
</script>
