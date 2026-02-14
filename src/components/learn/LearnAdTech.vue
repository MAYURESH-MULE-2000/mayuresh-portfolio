<template>
  <div class="learn-adtech min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn" class="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4">
        ← Back to Topics
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">📡</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Ad-Tech & Browser</h1>
      </div>
      <p class="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        Iframes, CORS, third-party script management, cookie mechanics, browser storage, and the hidden world of ad-tech that powers the internet.
      </p>
    </div>

    <!-- Layout -->
    <div class="px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 pb-16">
      <SectionNav
        :sections="sections"
        :activeSection="activeSection"
        activeColor="bg-pink-600"
        @select="setSection"
        class="lg:w-56 flex-shrink-0"
      />

      <div class="flex-1 min-w-0 space-y-5">
        <!-- ==================== IFRAMES & EMBEDDING ==================== -->
        <template v-if="activeSection === 'iframes'">
          <ConceptCard
            id="iframes"
            icon="🖼️"
            title="Iframes Deep Dive"
            subtitle="Sandboxed worlds within your page"
            definition="An iframe embeds a separate browsing context (its own document, DOM, and JS execution). Communication between parent and iframe uses postMessage. Security: same-origin policy, sandbox attribute, allow attribute for permissions."
            analogy="An iframe is like a TV inside your living room — it shows content from somewhere else, you can control the volume (sandbox), and shout at it (postMessage), but you can't reach inside the TV screen to rearrange the furniture."
            seniorTip="In ad-tech, ads run inside cross-origin iframes for security isolation. Use sandbox='allow-scripts allow-same-origin' carefully — both together re-enable full access. Use postMessage for parent↔iframe communication with origin checks."
            defaultOpen
          >
            <!-- iframe Communication Demo -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 postMessage Communication Flow</p>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <!-- Parent -->
                <div class="p-3 rounded-lg border border-pink-500/20 bg-pink-500/5">
                  <p class="text-xs font-bold text-pink-400 mb-2">📦 Parent Window</p>
                  <input v-model="iframeDemo.parentMsg"
                    class="w-full bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white text-xs font-mono rounded px-2 py-1.5 border-0 outline-none mb-2"
                    placeholder="Message to send..." />
                  <button @click="sendToIframe"
                    class="w-full px-3 py-1.5 text-xs rounded bg-pink-500/20 text-pink-400 hover:bg-pink-500/30 transition-all">
                    postMessage → iframe
                  </button>
                  <div v-if="iframeDemo.receivedFromIframe" class="mt-2 p-2 rounded bg-emerald-500/10 text-xs text-emerald-400 font-mono">
                    Received: "{{ iframeDemo.receivedFromIframe }}"
                  </div>
                </div>

                <!-- Iframe -->
                <div class="p-3 rounded-lg border-2 border-dashed border-blue-500/20 bg-blue-500/5">
                  <p class="text-xs font-bold text-blue-400 mb-2">🖼️ Iframe (sandboxed)</p>
                  <div v-if="iframeDemo.receivedFromParent" class="p-2 rounded bg-emerald-500/10 text-xs text-emerald-400 font-mono mb-2">
                    Received: "{{ iframeDemo.receivedFromParent }}"
                  </div>
                  <p v-else class="text-xs text-gray-500 mb-2 italic">Waiting for messages...</p>
                  <button @click="sendToParent"
                    class="w-full px-3 py-1.5 text-xs rounded bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all">
                    postMessage → parent
                  </button>
                </div>
              </div>
            </div>

            <CodePlayground
              title="iframe-communication.js"
              :initialCode="codes.iframe"
            />
          </ConceptCard>

          <ConceptCard
            id="sandbox"
            icon="🔒"
            title="iframe Sandbox & Permissions"
            subtitle="Control what iframes can do"
            definition="The sandbox attribute restricts iframe capabilities by default (no scripts, no forms, no same-origin). You opt-in to specific permissions: allow-scripts, allow-same-origin, allow-popups, allow-forms. The allow attribute controls feature policies (camera, microphone, geolocation)."
            analogy="sandbox is like a playpen for a toddler (iframe) — by default they can't do anything dangerous. You add specific toys (permissions) one at a time based on what they need."
            seniorTip="⚠️ NEVER use sandbox='allow-scripts allow-same-origin' together on a cross-origin iframe — it lets the iframe remove its own sandbox! For ads, use allow-scripts only. Use CSP frame-ancestors to prevent clickjacking."
          >
            <!-- Sandbox Permission Toggle -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 Toggle sandbox permissions — see the generated attribute</p>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                <button v-for="perm in sandboxPerms" :key="perm.name"
                  @click="perm.enabled = !perm.enabled"
                  class="px-3 py-2 text-xs rounded-lg font-mono transition-all text-left"
                  :class="perm.enabled ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30' : 'bg-white/5 text-gray-500 border border-white/5'">
                  {{ perm.enabled ? '✓' : '○' }} {{ perm.name }}
                </button>
              </div>
              <div class="p-3 rounded-lg bg-gray-900 font-mono text-xs text-gray-300 break-all">
                &lt;iframe sandbox="<span class="text-pink-400">{{ activeSandboxAttrs }}</span>"&gt;
              </div>
              <div v-if="sandboxWarning" class="mt-2 p-2 rounded bg-red-500/10 border border-red-500/20 text-xs text-red-400">
                ⚠️ {{ sandboxWarning }}
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== CORS & SECURITY ==================== -->
        <template v-if="activeSection === 'cors'">
          <ConceptCard
            id="cors"
            icon="🌐"
            title="CORS — Cross-Origin Resource Sharing"
            subtitle="Why your API call is blocked"
            definition="CORS is a security mechanism that blocks cross-origin HTTP requests from browsers. The server must include Access-Control-Allow-Origin headers to permit cross-domain requests. Preflight OPTIONS requests check permissions for non-simple requests."
            analogy="CORS is like a bouncer at a club (server). When you (browser) arrive from a different venue (origin), the bouncer checks the guest list (CORS headers). If you're not on it, you're denied entry — even if you have a valid ticket (API key)."
            seniorTip="CORS is a BROWSER security feature, not a server one. cURL ignores CORS entirely. For development, use a proxy. For production, configure the server to send correct Access-Control headers. Understand preflight (OPTIONS) requests."
            defaultOpen
          >
            <!-- CORS Flow Diagram -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🔄 CORS Request Flow — click to step through</p>
              <div class="space-y-2">
                <div v-for="(step, i) in corsSteps" :key="i"
                  @click="activeCorsStep = i"
                  class="flex items-start gap-3 p-2.5 rounded-lg cursor-pointer transition-all"
                  :class="activeCorsStep === i ? 'bg-pink-500/10 border border-pink-500/20' : 'hover:bg-white/5'">
                  <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    :class="activeCorsStep === i ? 'bg-pink-500 text-white' : i < activeCorsStep ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-gray-500'">
                    {{ i < activeCorsStep ? '✓' : i + 1 }}
                  </span>
                  <div>
                    <p class="text-sm font-medium" :class="activeCorsStep === i ? 'text-pink-400' : 'text-gray-300'">{{ step.title }}</p>
                    <p v-if="activeCorsStep === i" class="text-xs text-gray-400 mt-1">{{ step.detail }}</p>
                  </div>
                </div>
              </div>
            </div>

            <CodePlayground
              title="cors.js"
              :initialCode="codes.cors"
            />
          </ConceptCard>

          <ConceptCard
            id="csp"
            icon="🔐"
            title="Content Security Policy (CSP)"
            subtitle="Prevent XSS and injection attacks"
            definition="CSP is a security header that tells the browser which sources of content are allowed. It prevents XSS by blocking inline scripts, eval(), and resources from untrusted domains. Set via HTTP header or meta tag."
            analogy="CSP is like airport security — it has a list of approved airlines (sources). Anything not on the approved list gets confiscated (blocked), even if it looks legitimate."
            seniorTip="Start with a strict CSP: default-src 'self'. Gradually whitelist what you need. Use nonce-based CSP for inline scripts. Report violations with report-uri. In ad-tech, CSP is tricky because ad scripts need multiple external sources."
          >
            <CodePlayground
              title="csp.js"
              :initialCode="codes.csp"
            />
          </ConceptCard>
        </template>

        <!-- ==================== STORAGE & COOKIES ==================== -->
        <template v-if="activeSection === 'storage'">
          <ConceptCard
            id="storage"
            icon="💾"
            title="Browser Storage Comparison"
            subtitle="Cookies vs localStorage vs sessionStorage vs IndexedDB"
            definition="Cookies: sent with every HTTP request, 4KB limit, supports expiry and path. localStorage: 5-10MB, persists forever, same-origin. sessionStorage: same as localStorage but clears on tab close. IndexedDB: structured storage, no size limit, async."
            analogy="Cookies = sticky notes you hand to the waiter every visit. localStorage = your personal locker at the gym. sessionStorage = a temporary locker that empties when you leave. IndexedDB = a filing cabinet with unlimited drawers."
            seniorTip="Use cookies for auth tokens (HttpOnly, Secure, SameSite). Use localStorage for user preferences. Use sessionStorage for temporary wizard state. Use IndexedDB for offline-first apps with large datasets."
            defaultOpen
          >
            <!-- Storage Comparison Table -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">📊 Storage Comparison</p>
              <div class="overflow-x-auto">
                <table class="w-full text-xs">
                  <thead>
                    <tr class="border-b border-white/10">
                      <th class="text-left py-2 px-2 text-gray-400">Feature</th>
                      <th class="text-center py-2 px-2 text-amber-400">Cookies</th>
                      <th class="text-center py-2 px-2 text-blue-400">localStorage</th>
                      <th class="text-center py-2 px-2 text-emerald-400">sessionStorage</th>
                      <th class="text-center py-2 px-2 text-purple-400">IndexedDB</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in storageComparison" :key="row.feature" class="border-b border-white/5">
                      <td class="py-2 px-2 text-gray-300 font-medium">{{ row.feature }}</td>
                      <td class="py-2 px-2 text-center text-gray-400">{{ row.cookies }}</td>
                      <td class="py-2 px-2 text-center text-gray-400">{{ row.local }}</td>
                      <td class="py-2 px-2 text-center text-gray-400">{{ row.session }}</td>
                      <td class="py-2 px-2 text-center text-gray-400">{{ row.indexedDB }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <CodePlayground
              title="storage.js"
              :initialCode="codes.storage"
            />
          </ConceptCard>

          <ConceptCard
            id="cookies"
            icon="🍪"
            title="Cookie Mechanics & Third-Party Cookies"
            subtitle="The foundation of ad tracking (and its demise)"
            definition="First-party cookies: set by the domain you visit. Third-party cookies: set by other domains (ads, analytics). Third-party cookies are being phased out (Chrome's Privacy Sandbox). SameSite attribute controls cross-site cookie sending."
            analogy="First-party cookies = your loyalty card at a specific store. Third-party cookies = a tracking device that multiple stores share to know everywhere you shop. Browsers are removing the tracking device."
            seniorTip="Set SameSite=Strict for auth cookies (prevents CSRF). SameSite=None; Secure for cross-site needs (still works in iframes). Know about Topics API, Attribution Reporting, and FLEDGE — Chrome's replacements for third-party cookies."
          >
            <!-- Cookie Attribute Builder -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 Build a cookie — toggle attributes</p>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                <div v-for="attr in cookieAttrs" :key="attr.name">
                  <button
                    @click="attr.enabled = !attr.enabled"
                    class="w-full px-3 py-2 text-xs rounded-lg font-mono transition-all text-left"
                    :class="attr.enabled ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30' : 'bg-white/5 text-gray-500 border border-white/5'">
                    {{ attr.enabled ? '✓' : '○' }} {{ attr.name }}
                  </button>
                  <p class="text-[10px] text-gray-500 mt-1 px-1">{{ attr.desc }}</p>
                </div>
              </div>
              <div class="p-3 rounded-lg bg-gray-900 font-mono text-xs text-gray-300 break-all">
                Set-Cookie: session=abc123<span class="text-pink-400">{{ cookieString }}</span>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== AD-TECH CONCEPTS ==================== -->
        <template v-if="activeSection === 'adtech'">
          <ConceptCard
            id="ad-lifecycle"
            icon="📺"
            title="Ad Lifecycle — How Ads Actually Work"
            subtitle="From bid to render in milliseconds"
            definition="Real-time bidding (RTB): publisher sends ad request → SSP sends bid request to DSPs → DSPs bid within ~100ms → highest bid wins → ad creative is served → tracking pixels fire on viewability events. This happens every pageview."
            analogy="RTB is like an incredibly fast auction house — the auctioneer (SSP) calls out the item (ad slot), buyers (DSPs) shout bids simultaneously, the fastest highest bidder wins, and the painting (ad) is hung on the wall (rendered) — all in under 200ms."
            seniorTip="As a frontend engineer in ad-tech, you manage the ad slots (placements), handle the render timing (don't block main content), monitor viewability (IntersectionObserver), and ensure ads don't degrade page performance."
            defaultOpen
          >
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🔄 Ad Request Lifecycle — click through each step</p>
              <div class="space-y-2">
                <div v-for="(step, i) in adLifecycleSteps" :key="i"
                  @click="activeAdStep = i"
                  class="flex items-start gap-3 p-2.5 rounded-lg cursor-pointer transition-all"
                  :class="activeAdStep === i ? 'bg-pink-500/10 border border-pink-500/20' : 'hover:bg-white/5'">
                  <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    :class="activeAdStep === i ? 'bg-pink-500 text-white' : 'bg-white/10 text-gray-500'">
                    {{ i + 1 }}
                  </span>
                  <div>
                    <p class="text-sm font-medium" :class="activeAdStep === i ? 'text-pink-400' : 'text-gray-300'">{{ step.title }}</p>
                    <p v-if="activeAdStep === i" class="text-xs text-gray-400 mt-1">{{ step.detail }}</p>
                    <p v-if="activeAdStep === i && step.time" class="text-xs text-pink-400/70 mt-0.5">⏱️ {{ step.time }}</p>
                  </div>
                </div>
              </div>
            </div>
          </ConceptCard>

          <ConceptCard
            id="viewability"
            icon="👁️"
            title="Ad Viewability & IntersectionObserver"
            subtitle="Was your ad actually seen?"
            definition="Viewability = ad was ≥50% visible in viewport for ≥1 second (IAB standard). Tracked using IntersectionObserver API. Critical for billing — advertisers only pay for viewable impressions (vCPM). Frontend engineers implement viewability tracking."
            analogy="Viewability is like proof of delivery — the advertiser doesn't pay for a billboard that's hidden behind a tree. IntersectionObserver is the camera that proves the billboard was actually visible to drivers."
            seniorTip="Use IntersectionObserver with threshold: [0, 0.5, 1.0]. Track time-in-view with a timer started on 50% visibility. Fire viewability pixel after 1s of continuous visibility. Handle tab visibility changes (document.hidden)."
          >
            <CodePlayground
              title="viewability.js"
              :initialCode="codes.viewability"
            />
          </ConceptCard>

          <ConceptCard
            id="third-party-scripts"
            icon="📜"
            title="Third-Party Scripts & Performance"
            subtitle="The hidden cost of external code"
            definition="Third-party scripts (analytics, ads, A/B testing, chat widgets) can degrade performance: blocking main thread, adding network requests, increasing bundle size. Strategies: async/defer loading, lazy initialization, resource hints (preconnect), Web Workers."
            analogy="Third-party scripts are like houseguests — a few are helpful, but too many hog the WiFi (bandwidth), eat all the food (CPU), and make a mess (DOM mutations). Be selective about who you invite."
            seniorTip="Audit third-party scripts quarterly. Use async/defer for non-critical scripts. Lazy-load until user interaction (chat widgets). Use PerformanceObserver to monitor third-party impact. Consider a tag manager for centralized control."
          >
            <CodePlayground
              title="third-party.js"
              :initialCode="codes.thirdParty"
            />
          </ConceptCard>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import SectionNav from './SectionNav.vue'
import ConceptCard from './ConceptCard.vue'
import CodePlayground from './CodePlayground.vue'

const sections = [
  { id: 'iframes', label: 'Iframes', icon: '🖼️', badge: '2' },
  { id: 'cors', label: 'CORS & Security', icon: '🌐', badge: '2' },
  { id: 'storage', label: 'Storage', icon: '💾', badge: '2' },
  { id: 'adtech', label: 'Ad-Tech', icon: '📺', badge: '3' },
]

const activeSection = ref('iframes')

function setSection(id) {
  activeSection.value = id
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// ==================== iframe Demo ====================
const iframeDemo = reactive({
  parentMsg: 'Hello iframe!',
  receivedFromParent: '',
  receivedFromIframe: '',
})

function sendToIframe() {
  iframeDemo.receivedFromParent = iframeDemo.parentMsg
}

function sendToParent() {
  iframeDemo.receivedFromIframe = 'Reply from iframe at ' + new Date().toLocaleTimeString()
}

// ==================== Sandbox Permissions ====================
const sandboxPerms = reactive([
  { name: 'allow-scripts', enabled: true },
  { name: 'allow-same-origin', enabled: false },
  { name: 'allow-popups', enabled: false },
  { name: 'allow-forms', enabled: true },
  { name: 'allow-top-navigation', enabled: false },
  { name: 'allow-modals', enabled: false },
])

const activeSandboxAttrs = computed(() => {
  return sandboxPerms.filter(p => p.enabled).map(p => p.name).join(' ') || '(empty = maximum restriction)'
})

const sandboxWarning = computed(() => {
  const scripts = sandboxPerms.find(p => p.name === 'allow-scripts')
  const origin = sandboxPerms.find(p => p.name === 'allow-same-origin')
  if (scripts?.enabled && origin?.enabled) {
    return 'DANGER: allow-scripts + allow-same-origin together lets the iframe remove its own sandbox!'
  }
  return ''
})

// ==================== CORS Flow ====================
const activeCorsStep = ref(0)
const corsSteps = [
  { title: '1. Browser sends request', detail: 'fetch("https://api.other-domain.com/data") — browser detects cross-origin.' },
  { title: '2. Preflight check (OPTIONS)', detail: 'For non-simple requests (PUT, custom headers), browser sends an OPTIONS request first to check permissions.' },
  { title: '3. Server responds to preflight', detail: 'Server includes: Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers.' },
  { title: '4. Actual request sent', detail: 'If preflight passes, browser sends the actual request with credentials/headers.' },
  { title: '5. Response received', detail: 'Browser checks CORS headers on response. If missing or wrong origin → request blocked, error in console.' },
]

// ==================== Storage Comparison ====================
const storageComparison = [
  { feature: 'Size limit', cookies: '4 KB', local: '5-10 MB', session: '5-10 MB', indexedDB: 'Unlimited' },
  { feature: 'Sent with HTTP', cookies: '✅ Always', local: '❌', session: '❌', indexedDB: '❌' },
  { feature: 'Persistence', cookies: 'Expiry date', local: 'Forever', session: 'Tab close', indexedDB: 'Forever' },
  { feature: 'API type', cookies: 'String', local: 'Sync', session: 'Sync', indexedDB: 'Async' },
  { feature: 'Access', cookies: 'Server+Client', local: 'Client only', session: 'Client only', indexedDB: 'Client only' },
  { feature: 'Use case', cookies: 'Auth tokens', local: 'Preferences', session: 'Temp state', indexedDB: 'Offline data' },
]

// ==================== Cookie Builder ====================
const cookieAttrs = reactive([
  { name: 'HttpOnly', enabled: true, desc: 'JS can\'t access' },
  { name: 'Secure', enabled: true, desc: 'HTTPS only' },
  { name: 'SameSite=Strict', enabled: false, desc: 'No cross-site' },
  { name: 'SameSite=Lax', enabled: true, desc: 'Safe default' },
  { name: 'Path=/', enabled: true, desc: 'All paths' },
  { name: 'Max-Age=3600', enabled: false, desc: 'Expires in 1hr' },
])

const cookieString = computed(() => {
  return cookieAttrs
    .filter(a => a.enabled)
    .map(a => '; ' + a.name)
    .join('')
})

// ==================== Ad Lifecycle ====================
const activeAdStep = ref(0)
const adLifecycleSteps = [
  { title: 'Page loads → Ad slot detected', detail: 'Ad container DIV is on the page. Ad script initializes and detects available slots.', time: '0ms' },
  { title: 'Ad request sent to SSP', detail: 'Supply-Side Platform receives slot info: size, page context, user data (if consented).', time: '5ms' },
  { title: 'SSP broadcasts to DSPs', detail: 'Demand-Side Platforms receive bid requests with targeting info. They decide whether to bid.', time: '10ms' },
  { title: 'DSPs submit bids', detail: 'Each DSP evaluates the impression value and submits a bid price. Must respond within timeout.', time: '50-100ms' },
  { title: 'Auction completes', detail: 'SSP runs the auction (first-price or second-price). Winning creative URL is returned.', time: '110ms' },
  { title: 'Creative rendered', detail: 'Winning ad HTML/image/video is injected into the iframe in the ad slot.', time: '150ms' },
  { title: 'Viewability tracked', detail: 'IntersectionObserver monitors if ≥50% of ad is visible for ≥1 second. Fires tracking pixel.', time: '1150ms+' },
]

// ==================== Code Examples ====================
const codes = {
  iframe: `// iframe Communication with postMessage

console.log("🖼️ Parent ↔ Iframe Communication:\\n");

console.log("Parent → Iframe:");
console.log("  iframe.contentWindow.postMessage(");
console.log("    { type: 'RESIZE', height: 300 },");
console.log("    'https://trusted-domain.com'  // target origin!");
console.log("  )\\n");

console.log("Iframe → Parent:");
console.log("  window.parent.postMessage(");
console.log("    { type: 'AD_LOADED', adId: 'abc' },");
console.log("    'https://publisher.com'");
console.log("  )\\n");

console.log("Receiving messages (ALWAYS verify origin!):");
console.log("  window.addEventListener('message', (event) => {");
console.log("    // ⚠️ CRITICAL: Check origin!");
console.log("    if (event.origin !== 'https://trusted.com') return;");
console.log("    console.log(event.data);");
console.log("  })\\n");

console.log("🔑 Security Rules:");
console.log("  ✅ Always specify target origin (not '*')");
console.log("  ✅ Always check event.origin on receive");
console.log("  ❌ Never use '*' as target in production");
console.log("  ❌ Never trust event.data without validation");`,

  cors: `// CORS — Understanding the Mechanism

console.log("🌐 CORS Explained:\\n");

console.log("Same-Origin = same protocol + domain + port");
console.log("  https://a.com  → https://a.com/api  ✅ Same origin");
console.log("  https://a.com  → https://b.com/api  ❌ Cross-origin");
console.log("  https://a.com  → http://a.com/api   ❌ Different protocol");
console.log("  https://a.com  → https://a.com:3001  ❌ Different port\\n");

console.log("Simple Requests (no preflight):");
console.log("  GET, POST, HEAD");
console.log("  Standard headers only (Content-Type: text/plain)\\n");

console.log("Preflighted Requests (OPTIONS first):");
console.log("  PUT, DELETE, PATCH");
console.log("  Custom headers (Authorization, X-Custom)");
console.log("  Content-Type: application/json\\n");

console.log("Server CORS Headers:");
console.log("  Access-Control-Allow-Origin: https://myapp.com");
console.log("  Access-Control-Allow-Methods: GET, POST, PUT");
console.log("  Access-Control-Allow-Headers: Authorization");
console.log("  Access-Control-Max-Age: 86400 (cache preflight)\\n");

console.log("💡 CORS is browser-only. Server-to-server has no CORS.");`,

  csp: `// Content Security Policy (CSP)

console.log("🔐 CSP — Prevent XSS & Injection:\\n");

console.log("Setting CSP via HTTP Header:");
console.log("  Content-Security-Policy: default-src 'self'\\n");

console.log("Common Directives:");
console.log("  default-src 'self'          → only same-origin");
console.log("  script-src 'self' cdn.com   → scripts from self + CDN");
console.log("  style-src 'self' 'unsafe-inline' → allow inline styles");
console.log("  img-src * data:             → images from anywhere");
console.log("  connect-src api.example.com → fetch/XHR targets");
console.log("  frame-src trusted.com       → iframe sources\\n");

console.log("Nonce-based CSP (most secure):");
console.log('  Header: script-src \'nonce-abc123\'');
console.log('  HTML: <' + 'script nonce="abc123">' + 'safe code</' + 'script>');
console.log("  → Only scripts with matching nonce execute\\n");

console.log("Report violations:");
console.log("  Content-Security-Policy-Report-Only:");
console.log("    default-src 'self'; report-uri /csp-report");
console.log("  → Logs violations without blocking (testing mode)\\n");

console.log("⚠️ Ad-tech CSP challenge:");
console.log("  Ads need many external domains whitelisted.");
console.log("  Use report-only mode to discover needed sources.");`,

  storage: `// Browser Storage APIs

console.log("💾 Storage APIs Comparison:\\n");

console.log("1️⃣ localStorage:");
console.log("  localStorage.setItem('theme', 'dark')");
console.log("  localStorage.getItem('theme')  // 'dark'");
console.log("  localStorage.removeItem('theme')");
console.log("  // ⚠️ Stores strings only! Use JSON.stringify\\n");

console.log("2️⃣ sessionStorage:");
console.log("  sessionStorage.setItem('step', '3')");
console.log("  // Same API as localStorage");
console.log("  // Cleared when tab/window closes\\n");

console.log("3️⃣ Cookies:");
console.log('  document.cookie = "token=abc; HttpOnly; Secure"');
console.log("  // ⚠️ HttpOnly cookies NOT accessible from JS");
console.log("  // They're set/read by the server only\\n");

console.log("4️⃣ IndexedDB:");
console.log("  const db = await openDB('mydb', 1, {");
console.log("    upgrade(db) {");
console.log("      db.createObjectStore('users', { keyPath: 'id' })");
console.log("    }");
console.log("  })");
console.log("  await db.put('users', { id: 1, name: 'Alice' })\\n");

console.log("💡 Decision Guide:");
console.log("  Auth → HttpOnly Cookie (server sets it)");
console.log("  Preferences → localStorage");
console.log("  Wizard state → sessionStorage");
console.log("  Offline data → IndexedDB");`,

  viewability: `// Ad Viewability with IntersectionObserver

console.log("👁️ IAB Viewability Standard:");
console.log("  Display: ≥50% visible for ≥1 second");
console.log("  Video: ≥50% visible for ≥2 seconds\\n");

console.log("Implementation with IntersectionObserver:\\n");

console.log("const observer = new IntersectionObserver(");
console.log("  (entries) => {");
console.log("    entries.forEach(entry => {");
console.log("      if (entry.intersectionRatio >= 0.5) {");
console.log("        // Start timer — ad is 50%+ visible");
console.log("        startViewTimer(entry.target)");
console.log("      } else {");
console.log("        // Stop timer — ad left viewport");
console.log("        clearViewTimer(entry.target)");
console.log("      }");
console.log("    })");
console.log("  },");
console.log("  { threshold: [0, 0.5, 1.0] }");
console.log(")\\n");

console.log("observer.observe(adElement)\\n");

console.log("function startViewTimer(el) {");
console.log("  el._viewTimer = setTimeout(() => {");
console.log("    fireViewabilityPixel(el) // 🎯 Counted as viewable!");
console.log("    observer.unobserve(el)");
console.log("  }, 1000)  // 1 second threshold");
console.log("}\\n");

console.log("💡 Also handle: document.hidden (tab switch),");
console.log("   window blur, and scroll-jacking.");`,

  thirdParty: `// Third-Party Script Management

console.log("📜 Loading Third-Party Scripts Safely:\\n");

console.log("1️⃣ Async Loading (non-blocking):");
console.log('  <' + 'script src="analytics.js" async></' + 'script>');
console.log("  → Downloads in parallel, executes ASAP");
console.log("  → Good for: analytics, tracking\\n");

console.log("2️⃣ Defer Loading (execute in order):");
console.log('  <' + 'script src="widget.js" defer></' + 'script>');
console.log("  → Downloads in parallel, executes after HTML parse");
console.log("  → Good for: UI widgets, non-critical features\\n");

console.log("3️⃣ Lazy Loading (on interaction):");
console.log("  button.addEventListener('click', () => {");
console.log("    import('./chat-widget.js').then(m => m.init())");
console.log("  })");
console.log("  → Good for: chat widgets, video players\\n");

console.log("4️⃣ Web Worker (off main thread):");
console.log("  const worker = new Worker('heavy-analytics.js')");
console.log("  → Good for: data processing, analytics\\n");

console.log("5️⃣ Resource Hints:");
console.log('  <' + 'link rel="preconnect" href="https://cdn.example.com">');
console.log("  → Establish connection early, save ~100ms\\n");

console.log("📊 Audit checklist:");
console.log("  • How much main thread time does it take?");
console.log("  • Does it block rendering?");
console.log("  • Is it still needed?");
console.log("  • Can it be loaded later?");`,
}
</script>
