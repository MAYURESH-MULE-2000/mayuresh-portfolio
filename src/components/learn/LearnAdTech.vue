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
        <!-- ==================== AD ECOSYSTEM ==================== -->
        <template v-if="activeSection === 'ecosystem'">
          <ConceptCard
            id="ecosystem-overview"
            icon="🌐"
            title="The Ad-Tech Ecosystem - Who's Who"
            subtitle="SSP, DSP, DMP, Ad Exchange, Ad Server"
            definition="The ad-tech ecosystem connects advertisers to publishers through automated platforms. Publishers (website owners) use SSPs (Supply-Side Platforms) to sell ad space. Advertisers use DSPs (Demand-Side Platforms) to buy impressions. Ad Exchanges are the marketplace. DMPs (Data Management Platforms) provide audience data. Ad Servers store and deliver the creative assets."
            analogy="Think of a farmers market: Publishers are farmers (supply), Advertisers are restaurants (demand), the SSP is the farmer's market stall, the DSP is the restaurant's purchasing agent, the Ad Exchange is the market floor where trades happen, and the DMP is the market researcher who knows what each restaurant wants to buy."
            seniorTip="At Media.net (contextual advertising), the key differentiator is CONTEXTUAL targeting - analyzing page content to match relevant ads, rather than tracking users. Understand where Media.net sits: they are the SSP + Ad Exchange layer, connecting publishers to demand."
            defaultOpen
          >
            <!-- Ecosystem Flow Visual -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🗺️ Click each player to learn their role</p>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
                <div v-for="(player, i) in ecosystemPlayers" :key="i"
                  @click="activePlayer = activePlayer === i ? -1 : i"
                  class="p-3 rounded-lg cursor-pointer transition-all"
                  :class="activePlayer === i ? 'bg-pink-500/10 border border-pink-500/30 ring-1 ring-pink-500/20' : 'bg-white/5 border border-white/5 hover:border-white/10'">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-lg">{{ player.icon }}</span>
                    <span class="text-xs font-bold" :class="activePlayer === i ? 'text-pink-400' : 'text-gray-300'">{{ player.name }}</span>
                  </div>
                  <p class="text-[10px] text-gray-500">{{ player.short }}</p>
                  <div v-if="activePlayer === i" class="mt-2 pt-2 border-t border-white/10">
                    <p class="text-xs text-gray-400">{{ player.detail }}</p>
                    <p class="text-[10px] text-pink-400/70 mt-1">Examples: {{ player.examples }}</p>
                  </div>
                </div>
              </div>
            </div>

            <CodePlayground
              title="ecosystem.js"
              :initialCode="codes.ecosystem"
            />
          </ConceptCard>

          <ConceptCard
            id="rtb-flow"
            icon="⚡"
            title="Real-Time Bidding (RTB) - Complete Journey"
            subtitle="From page load to ad render in ~200ms"
            definition="RTB is an auction that happens for every ad impression. When a user loads a page: 1) Ad slot detected, 2) Bid request sent to SSP, 3) SSP broadcasts to multiple DSPs, 4) DSPs evaluate and bid, 5) Auction runs (highest bid wins), 6) Winning creative is served, 7) Impression & viewability tracked. This entire process takes 100-200ms."
            analogy="RTB is like a lightning-fast stock exchange - every ad impression is a 'share' being auctioned off in real-time. Thousands of buyers (DSPs) evaluate and bid within milliseconds, the highest bidder wins, and the 'stock' (ad space) is immediately 'delivered' (rendered)."
            seniorTip="Know the difference between first-price and second-price auctions. First-price: you pay what you bid. Second-price: you pay $0.01 more than the second-highest bid. Google moved to first-price in 2019. Header bidding added client-side auctions BEFORE the ad server."
          >
            <!-- RTB Step-by-Step -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">⚡ RTB Flow - click through each step (entire flow takes ~200ms)</p>
              <div class="space-y-2">
                <div v-for="(step, i) in rtbSteps" :key="i"
                  @click="activeRtbStep = i"
                  class="flex items-start gap-3 p-2.5 rounded-lg cursor-pointer transition-all"
                  :class="activeRtbStep === i ? 'bg-pink-500/10 border border-pink-500/20' : 'hover:bg-white/5'">
                  <span class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    :class="activeRtbStep === i ? 'bg-pink-500 text-white' : i < activeRtbStep ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-gray-500'">
                    {{ i < activeRtbStep ? '✓' : i + 1 }}
                  </span>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 flex-wrap">
                      <p class="text-sm font-medium" :class="activeRtbStep === i ? 'text-pink-400' : 'text-gray-300'">{{ step.title }}</p>
                      <span v-if="step.time" class="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400">{{ step.time }}</span>
                    </div>
                    <p v-if="activeRtbStep === i" class="text-xs text-gray-400 mt-1">{{ step.detail }}</p>
                    <p v-if="activeRtbStep === i && step.who" class="text-[10px] text-pink-400/70 mt-0.5">🏢 {{ step.who }}</p>
                  </div>
                </div>
              </div>
            </div>
          </ConceptCard>

          <ConceptCard
            id="ad-serving"
            icon="🗃️"
            title="Ad Serving & Creative Storage"
            subtitle="Where ads live and how they're delivered"
            definition="Ad creatives (images, HTML5, video) are stored on Ad Servers (Google Ad Manager, proprietary servers) and CDNs. When an auction is won, the ad server returns a creative URL or HTML snippet. Creatives are rendered inside sandboxed iframes. VAST/VPAID standards handle video ad serving."
            analogy="An ad server is like a giant vending machine - it stores thousands of different products (creatives), and when someone puts in a coin (wins an auction), it delivers the exact right product to the exact right slot."
            seniorTip="Creatives should be served from CDNs close to the user for speed. HTML5 ads have strict size limits (150KB typically). VAST = XML for video ad metadata. VPAID = interactive video ads. Know that ad creatives run in isolation (iframe) - they can't access the publisher's DOM."
          >
            <CodePlayground
              title="ad-serving.js"
              :initialCode="codes.adServing"
            />
          </ConceptCard>
        </template>

        <!-- ==================== AD TYPES ==================== -->
        <template v-if="activeSection === 'adtypes'">
          <ConceptCard
            id="ad-formats"
            icon="🎨"
            title="Types of Digital Ads"
            subtitle="Display, Native, Video, Rich Media, Programmatic"
            definition="Display ads: banner images/HTML5 in standard IAB sizes (300x250, 728x90, 160x600). Native ads: blend into page content (in-feed, recommendation widgets). Video ads: pre-roll, mid-roll, outstream. Rich media: interactive HTML5 ads with animations. Programmatic: automated buying/selling via RTB."
            analogy="Ad types are like types of advertising in a newspaper - Display = traditional rectangular ad boxes. Native = sponsored articles that look like editorial content. Video = TV commercial-style. Rich media = interactive pull-out inserts with games or samples."
            seniorTip="At Media.net, you'll work primarily with display and native ads. Know IAB standard sizes. Native ads need careful styling to match publisher content while maintaining FTC disclosure ('Sponsored' label). Contextual ads match page CONTENT, not user data."
            defaultOpen
          >
            <!-- Ad Format Gallery -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">📐 Common IAB Ad Sizes & Types</p>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
                <div v-for="(fmt, i) in adFormats" :key="i"
                  class="p-3 rounded-lg bg-white/5 border border-white/5">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-sm">{{ fmt.icon }}</span>
                    <span class="text-xs font-bold text-gray-300">{{ fmt.name }}</span>
                  </div>
                  <p class="text-[10px] text-gray-500 mb-1">{{ fmt.size }}</p>
                  <p class="text-[10px] text-gray-400">{{ fmt.desc }}</p>
                </div>
              </div>
            </div>

            <CodePlayground
              title="ad-types.js"
              :initialCode="codes.adTypes"
            />
          </ConceptCard>

          <ConceptCard
            id="contextual-vs-behavioral"
            icon="🆚"
            title="Contextual vs Behavioral Advertising"
            subtitle="Media.net's core differentiator"
            definition="Contextual: analyze PAGE CONTENT to serve relevant ads (article about cooking → kitchen ads). Behavioral: track USER HISTORY across sites via cookies (user visited shoe sites → shoe ads everywhere). Contextual is privacy-friendly and doesn't need third-party cookies."
            analogy="Contextual is like a bookstore employee who recommends books based on the section you're browsing in (cooking section → cookbook). Behavioral is like a store that follows you around the mall and recommends based on every store you've visited."
            seniorTip="Media.net is a CONTEXTUAL advertising company - this is their biggest selling point. With third-party cookies dying, contextual is making a comeback. Understand NLP/keyword extraction from page content, semantic analysis, and how to classify content for ad matching."
          >
            <!-- Contextual vs Behavioral Comparison -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🆚 Side-by-Side Comparison</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
                  <p class="text-xs font-bold text-emerald-400 mb-2">✅ Contextual (Media.net)</p>
                  <div class="space-y-1 text-xs text-gray-400">
                    <p>• Analyzes <span class="text-emerald-400">page content</span></p>
                    <p>• No cookies needed ✅</p>
                    <p>• Privacy-compliant (GDPR/CCPA)</p>
                    <p>• Works on first visit</p>
                    <p>• Can't retarget users</p>
                    <p>• Relies on NLP & keyword extraction</p>
                  </div>
                </div>
                <div class="p-3 rounded-lg border border-amber-500/20 bg-amber-500/5">
                  <p class="text-xs font-bold text-amber-400 mb-2">⚠️ Behavioral (Traditional)</p>
                  <div class="space-y-1 text-xs text-gray-400">
                    <p>• Tracks <span class="text-amber-400">user history</span> across sites</p>
                    <p>• Needs third-party cookies ❌</p>
                    <p>• Privacy concerns (GDPR issues)</p>
                    <p>• Requires user profile building</p>
                    <p>• Powerful retargeting</p>
                    <p>• Being phased out by browsers</p>
                  </div>
                </div>
              </div>
            </div>
          </ConceptCard>
        </template>

        <!-- ==================== TARGETING ==================== -->
        <template v-if="activeSection === 'targeting'">
          <ConceptCard
            id="targeting-types"
            icon="🎯"
            title="Ad Targeting Methods - Complete Guide"
            subtitle="How ads find the right audience"
            definition="Targeting strategies: 1) Contextual - match ads to page content. 2) Behavioral - track user activity. 3) Demographic - age, gender, location. 4) Geo-targeting - location-based. 5) Retargeting - users who already visited. 6) Lookalike - find similar users. 7) Device/Browser - target by device type."
            analogy="Targeting methods are like fishing techniques - Contextual is fishing where the fish ARE (right content). Behavioral is tracking a specific fish's pattern. Retargeting is going back to where you saw a fish earlier. Geo is fishing in a specific lake."
            seniorTip="As a frontend dev, you implement targeting by: passing contextual signals (page title, keywords, URL) in bid requests, reading cookies/localStorage for user segments, detecting device/viewport for responsive ad sizes, and managing consent with CMP (Consent Management Platform)."
            defaultOpen
          >
            <!-- Targeting Types Interactive -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎯 Click each targeting method to see frontend implementation</p>
              <div class="space-y-2">
                <div v-for="(target, i) in targetingMethods" :key="i"
                  @click="activeTargeting = activeTargeting === i ? -1 : i"
                  class="rounded-lg border transition-all cursor-pointer"
                  :class="activeTargeting === i ? 'border-pink-500/30 bg-pink-500/5' : 'border-white/5 hover:border-white/10'">
                  <div class="flex items-center gap-3 p-3">
                    <span class="text-lg">{{ target.icon }}</span>
                    <div class="flex-1">
                      <p class="text-sm font-medium" :class="activeTargeting === i ? 'text-pink-400' : 'text-gray-300'">{{ target.name }}</p>
                      <p class="text-[10px] text-gray-500 mt-0.5">{{ target.short }}</p>
                    </div>
                    <span class="text-xs text-gray-500">{{ activeTargeting === i ? '▲' : '▼' }}</span>
                  </div>
                  <div v-if="activeTargeting === i" class="px-3 pb-3 border-t border-white/5 pt-2">
                    <p class="text-xs text-gray-400 mb-1">{{ target.detail }}</p>
                    <p class="text-[10px] font-mono text-pink-400/80">{{ target.code }}</p>
                  </div>
                </div>
              </div>
            </div>
          </ConceptCard>

          <ConceptCard
            id="privacy-cookieless"
            icon="🔒"
            title="Privacy & the Cookie-less Future"
            subtitle="Topics API, Protected Audiences, Attribution Reporting"
            definition="Third-party cookies are being deprecated. Google's Privacy Sandbox replaces them with: Topics API (interest-based targeting without tracking), Protected Audiences (formerly FLEDGE, on-device ad auctions), Attribution Reporting (conversion measurement without cross-site tracking). Apple's ATT already blocks tracking on iOS."
            analogy="The cookie-less future is like moving from spy cameras (third-party cookies) to a suggestion box (Topics API) - users still get relevant ads, but nobody's following them around taking notes."
            seniorTip="Contextual advertising (Media.net's strength) becomes MORE valuable as cookies disappear. Frontend devs need to implement: consent management (CMP), Privacy Sandbox APIs, first-party data collection, and contextual signal extraction from page content."
          >
            <CodePlayground
              title="privacy.js"
              :initialCode="codes.privacy"
            />
          </ConceptCard>
        </template>

        <!-- ==================== FRONTEND INTEGRATION ==================== -->
        <template v-if="activeSection === 'frontend'">
          <ConceptCard
            id="ad-tags"
            icon="🏷️"
            title="Ad Tags & Google Publisher Tags (GPT)"
            subtitle="How ads get onto the page"
            definition="Ad tags are code snippets that tell the browser where to fetch and render ads. Google Publisher Tags (GPT) is the most common library. It defines ad slots with sizes, loads the GPT library async, and calls googletag.display() to render. Each slot has a div with a unique ID and can have key-value targeting."
            analogy="GPT ad tags are like reserved parking spots - you define the spot (div), specify the car size allowed (ad dimensions), put up a sign (targeting), and then the parking attendant (GPT) brings the right car (ad creative) to the right spot."
            seniorTip="Key GPT concepts: defineSlot() creates slots, addService() connects to the ad exchange, enableServices() starts the library, display() renders ads. Use enableSingleRequest() for SRA (Single Request Architecture) - one HTTP call for all ad slots. Lazy-load below-fold ads."
            defaultOpen
          >
            <CodePlayground
              title="gpt.js"
              :initialCode="codes.gpt"
            />
          </ConceptCard>

          <ConceptCard
            id="header-bidding"
            icon="🔨"
            title="Header Bidding (Prebid.js)"
            subtitle="Client-side auction before the ad server"
            definition="Header bidding lets multiple demand sources bid simultaneously BEFORE calling the ad server (Google Ad Manager). Prebid.js: open-source header bidding wrapper. Flow: 1) Prebid calls all demand partners simultaneously, 2) collects bids within timeout (~1s), 3) sends highest bid to ad server, 4) ad server decides final winner (prebid bid vs direct deals)."
            analogy="Header bidding is like getting quotes from multiple contractors BEFORE going to your preferred builder. If a contractor offers a better price, you can present that offer to your builder and say 'can you beat this?' - resulting in higher revenue."
            seniorTip="Header bidding increased publisher revenue by 20-50%. Know the flow: Prebid.js calls bidders → waits for timeout → sets targeting on GPT → GPT calls ad server → ad renders. Key configs: bidder adapters, price granularity, timeout settings, and bid caching."
          >
            <CodePlayground
              title="header-bidding.js"
              :initialCode="codes.headerBidding"
            />
          </ConceptCard>

          <ConceptCard
            id="ad-perf"
            icon="📈"
            title="Ad Performance & Frontend Impact"
            subtitle="Metrics, optimization, and keeping your site fast"
            definition="Key ad metrics: CPM (cost per 1000 impressions), CPC (cost per click), CTR (click-through rate), Fill Rate (% of requests that return an ad), Viewability (% of ads actually seen), Revenue = Impressions × CPM / 1000. Frontend impact: ads add network requests, main thread blocking, layout shifts."
            analogy="Ad performance optimization is like a restaurant balancing customer satisfaction (user experience) with revenue (ad revenue). Too many waiters pushing desserts (ads) drives customers away, but too few means missed revenue."
            seniorTip="Minimize ad impact: use async loading, define ad slot sizes upfront (prevents CLS), lazy-load below-fold ads with IntersectionObserver, use requestIdleCallback for non-critical ad code. Monitor: ad load time, time-to-interactive impact, CLS from ads."
          >
            <!-- Ad Metrics Reference -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">📊 Key Ad Metrics Cheat Sheet</p>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
                <div v-for="metric in adMetrics" :key="metric.name"
                  class="p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <p class="text-xs font-bold text-pink-400">{{ metric.name }}</p>
                  <p class="text-[10px] text-gray-500 mb-1">{{ metric.full }}</p>
                  <p class="text-[10px] text-gray-400">{{ metric.desc }}</p>
                </div>
              </div>
            </div>

            <CodePlayground
              title="ad-perf.js"
              :initialCode="codes.adPerformance"
            />
          </ConceptCard>
        </template>

        <!-- ==================== IFRAMES & EMBEDDING ==================== -->
        <template v-if="activeSection === 'iframes'">
          <ConceptCard
            id="iframes"
            icon="🖼️"
            title="Iframes Deep Dive"
            subtitle="Sandboxed worlds within your page"
            definition="An iframe embeds a separate browsing context (its own document, DOM, and JS execution). Communication between parent and iframe uses postMessage. Security: same-origin policy, sandbox attribute, allow attribute for permissions."
            analogy="An iframe is like a TV inside your living room - it shows content from somewhere else, you can control the volume (sandbox), and shout at it (postMessage), but you can't reach inside the TV screen to rearrange the furniture."
            seniorTip="In ad-tech, ads run inside cross-origin iframes for security isolation. Use sandbox='allow-scripts allow-same-origin' carefully - both together re-enable full access. Use postMessage for parent↔iframe communication with origin checks."
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
            analogy="sandbox is like a playpen for a toddler (iframe) - by default they can't do anything dangerous. You add specific toys (permissions) one at a time based on what they need."
            seniorTip="⚠️ NEVER use sandbox='allow-scripts allow-same-origin' together on a cross-origin iframe - it lets the iframe remove its own sandbox! For ads, use allow-scripts only. Use CSP frame-ancestors to prevent clickjacking."
          >
            <!-- Sandbox Permission Toggle -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 Toggle sandbox permissions - see the generated attribute</p>
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
            title="CORS - Cross-Origin Resource Sharing"
            subtitle="Why your API call is blocked"
            definition="CORS is a security mechanism that blocks cross-origin HTTP requests from browsers. The server must include Access-Control-Allow-Origin headers to permit cross-domain requests. Preflight OPTIONS requests check permissions for non-simple requests."
            analogy="CORS is like a bouncer at a club (server). When you (browser) arrive from a different venue (origin), the bouncer checks the guest list (CORS headers). If you're not on it, you're denied entry - even if you have a valid ticket (API key)."
            seniorTip="CORS is a BROWSER security feature, not a server one. cURL ignores CORS entirely. For development, use a proxy. For production, configure the server to send correct Access-Control headers. Understand preflight (OPTIONS) requests."
            defaultOpen
          >
            <!-- CORS Flow Diagram -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🔄 CORS Request Flow - click to step through</p>
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
            analogy="CSP is like airport security - it has a list of approved airlines (sources). Anything not on the approved list gets confiscated (blocked), even if it looks legitimate."
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
            seniorTip="Set SameSite=Strict for auth cookies (prevents CSRF). SameSite=None; Secure for cross-site needs (still works in iframes). Know about Topics API, Attribution Reporting, and FLEDGE - Chrome's replacements for third-party cookies."
          >
            <!-- Cookie Attribute Builder -->
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🎮 Build a cookie - toggle attributes</p>
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
            title="Ad Lifecycle - How Ads Actually Work"
            subtitle="From bid to render in milliseconds"
            definition="Real-time bidding (RTB): publisher sends ad request → SSP sends bid request to DSPs → DSPs bid within ~100ms → highest bid wins → ad creative is served → tracking pixels fire on viewability events. This happens every pageview."
            analogy="RTB is like an incredibly fast auction house - the auctioneer (SSP) calls out the item (ad slot), buyers (DSPs) shout bids simultaneously, the fastest highest bidder wins, and the painting (ad) is hung on the wall (rendered) - all in under 200ms."
            seniorTip="As a frontend engineer in ad-tech, you manage the ad slots (placements), handle the render timing (don't block main content), monitor viewability (IntersectionObserver), and ensure ads don't degrade page performance."
            defaultOpen
          >
            <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">🔄 Ad Request Lifecycle - click through each step</p>
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
            definition="Viewability = ad was ≥50% visible in viewport for ≥1 second (IAB standard). Tracked using IntersectionObserver API. Critical for billing - advertisers only pay for viewable impressions (vCPM). Frontend engineers implement viewability tracking."
            analogy="Viewability is like proof of delivery - the advertiser doesn't pay for a billboard that's hidden behind a tree. IntersectionObserver is the camera that proves the billboard was actually visible to drivers."
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
            analogy="Third-party scripts are like houseguests - a few are helpful, but too many hog the WiFi (bandwidth), eat all the food (CPU), and make a mess (DOM mutations). Be selective about who you invite."
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
  { id: 'ecosystem', label: 'Ad Ecosystem', icon: '🌐', badge: '3' },
  { id: 'adtypes', label: 'Ad Types', icon: '🎯', badge: '2' },
  { id: 'targeting', label: 'Targeting', icon: '👤', badge: '2' },
  { id: 'frontend', label: 'Frontend Integration', icon: '💻', badge: '3' },
  { id: 'iframes', label: 'Iframes', icon: '🖼️', badge: '2' },
  { id: 'cors', label: 'CORS & Security', icon: '🌐', badge: '2' },
  { id: 'storage', label: 'Storage', icon: '💾', badge: '2' },
  { id: 'adtech', label: 'Metrics & Revenue', icon: '📺', badge: '3' },
]

const activeSection = ref('ecosystem')

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
  { title: '1. Browser sends request', detail: 'fetch("https://api.other-domain.com/data") - browser detects cross-origin.' },
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

// ==================== Ad Ecosystem ====================
const activePlayer = ref(-1)
const ecosystemPlayers = [
  { icon: '📰', name: 'Publisher', short: 'Website owner (supply side)', detail: 'Owns the website/app with ad slots. Wants to maximize revenue from their traffic. Partners with SSPs to sell inventory.', examples: 'Forbes, CNN, Reddit, any website with ads' },
  { icon: '🏪', name: 'SSP', short: 'Supply-Side Platform', detail: 'Helps publishers sell their ad inventory programmatically. Connects to multiple ad exchanges and DSPs to find the highest bidder. Manages floor prices, ad quality, and yield optimization.', examples: 'Media.net, Google Ad Manager, Amazon Publisher Services' },
  { icon: '🛒', name: 'DSP', short: 'Demand-Side Platform', detail: 'Helps advertisers buy ad impressions across many publishers. Uses targeting data to bid on the right impressions for their campaigns. Controls budgets, bidding strategies, and frequency capping.', examples: 'Google DV360, The Trade Desk, Amazon DSP' },
  { icon: '🏛️', name: 'Ad Exchange', short: 'The marketplace', detail: 'A digital marketplace where SSPs and DSPs trade ad impressions in real-time. Runs the auction (RTB). Connects supply (publishers) with demand (advertisers). Some SSPs also act as exchanges.', examples: 'Google AdX, OpenX, Index Exchange' },
  { icon: '📊', name: 'DMP', short: 'Data Management Platform', detail: 'Collects, organizes, and provides audience data for targeting. Segments users by demographics, interests, behavior. Feeds data to DSPs for better targeting decisions.', examples: 'BlueKai (Oracle), Lotame, Adobe Audience Manager' },
  { icon: '🖥️', name: 'Ad Server', short: 'Stores & delivers creatives', detail: 'Hosts the actual ad creative files (images, HTML5, video). Decides which creative to show based on targeting rules. Tracks impressions, clicks, and conversions. Both publishers and advertisers have ad servers.', examples: 'Google Ad Manager (publisher), Google Campaign Manager (advertiser)' },
]

// ==================== RTB Flow ====================
const activeRtbStep = ref(0)
const rtbSteps = [
  { title: 'User loads the page', time: '0ms', detail: 'User navigates to a webpage. The browser starts rendering HTML and loading assets.', who: 'Publisher\'s website' },
  { title: 'Ad tag script initializes', time: '~10ms', detail: 'GPT (Google Publisher Tags) or custom ad library detects ad slot divs on the page and prepares bid requests.', who: 'Frontend JS (GPT/Prebid.js)' },
  { title: 'Header bidding starts (optional)', time: '~20ms', detail: 'Prebid.js calls multiple demand partners (DSPs) simultaneously. Each adapter sends a bid request with slot info, sizes, and targeting.', who: 'Prebid.js → Multiple SSPs/DSPs' },
  { title: 'Bid request sent to SSP/Exchange', time: '~30ms', detail: 'SSP receives: ad slot sizes, page URL, user signals (if consented), device info, geo data. SSP sends bid request to connected DSPs.', who: 'Media.net SSP → DSPs' },
  { title: 'DSPs evaluate and bid', time: '50-100ms', detail: 'Each DSP checks: Does this impression match our campaign targeting? What\'s it worth? They calculate bid price based on advertiser budgets, campaign goals, and user value.', who: 'DSPs (DV360, Trade Desk, etc.)' },
  { title: 'Auction runs - winner selected', time: '~110ms', detail: 'SSP/Exchange runs the auction. First-price: highest bid wins, pays what they bid. Second-price: highest bid wins, pays $0.01 more than the second bid. Winning creative URL returned.', who: 'Ad Exchange' },
  { title: 'Creative rendered in iframe', time: '~150ms', detail: 'The winning ad creative (image/HTML5/video) is loaded from the ad server CDN and injected into a sandboxed iframe inside the ad slot div.', who: 'Browser rendering engine' },
  { title: 'Tracking pixels fire', time: '150ms-1200ms+', detail: 'Impression pixel fires on render. Viewability tracking starts via IntersectionObserver (50% visible for 1s). Click tracking attached. Revenue recorded.', who: 'Ad server tracking + third-party verification' },
]

// ==================== Ad Formats ====================
const adFormats = [
  { icon: '🖼️', name: 'Medium Rectangle', size: '300×250', desc: 'Most popular size. Fits in-content and sidebars.' },
  { icon: '📏', name: 'Leaderboard', size: '728×90', desc: 'Top of page banner. High visibility.' },
  { icon: '📐', name: 'Skyscraper', size: '160×600', desc: 'Tall sidebar ad. Good for content pages.' },
  { icon: '📱', name: 'Mobile Banner', size: '320×50', desc: 'Standard mobile ad. Bottom of screen.' },
  { icon: '📰', name: 'Native In-Feed', size: 'Fluid', desc: 'Matches page content style. Highest engagement.' },
  { icon: '🎬', name: 'Video (VAST)', size: '640×480', desc: 'Pre/mid/post-roll or outstream autoplay.' },
]

// ==================== Targeting Methods ====================
const activeTargeting = ref(-1)
const targetingMethods = [
  { icon: '📖', name: 'Contextual Targeting', short: 'Match ads to page content (Media.net specialty)', detail: 'Analyze page text, keywords, URL, title, and metadata. Use NLP to classify content. Match ads by topic category.', code: 'googletag.pubads().setTargeting("topic", extractKeywords(document.title))' },
  { icon: '👣', name: 'Behavioral Targeting', short: 'Track user browsing history across sites', detail: 'Uses third-party cookies to track sites visited. Build user profile over time. Serve ads based on past browsing behavior.', code: 'const segments = getCookieSegments(); dsp.bid({ segments })' },
  { icon: '🔄', name: 'Retargeting', short: 'Re-engage users who visited your site', detail: 'Drop a cookie when user visits advertiser site. When user is on publisher site, recognize cookie and bid higher. Classic "that product followed me" experience.', code: 'if (hasRetargetingCookie("brand_x")) bidMultiplier = 2.0' },
  { icon: '📍', name: 'Geo-Targeting', short: 'Location-based ads (country, city, zip)', detail: 'Use IP geolocation or GPS (with consent). Region-specific ads. Local business advertising. Compliance with regional regulations (GDPR area → different consent rules).', code: 'navigator.geolocation.getCurrentPosition(pos => setGeo(pos))' },
  { icon: '📱', name: 'Device Targeting', short: 'Serve different ads for mobile vs desktop', detail: 'Detect device type, screen size, OS, browser. Serve appropriate ad sizes. Mobile-first ad layouts. Separate mobile and desktop campaigns with different creatives.', code: 'const isMobile = window.innerWidth < 768; loadAdSizes(isMobile ? mobile : desktop)' },
  { icon: '⏰', name: 'Dayparting', short: 'Show ads at specific times of day', detail: 'Bid higher during peak hours (lunchtime, evening). Reduce spend during off-hours. Time-zone aware targeting. Match ad content to time context.', code: 'const hour = new Date().getHours(); bidPrice *= peakHours.includes(hour) ? 1.5 : 1.0' },
  { icon: '🔍', name: 'Search Intent', short: 'Ads based on search queries', detail: 'Sponsored search results (Google Ads). Display ads triggered by search history. Intent signals indicate purchase readiness. Higher conversion rate.', code: 'const query = new URL(document.referrer).searchParams.get("q")' },
]

// ==================== Ad Metrics ====================
const adMetrics = [
  { name: 'CPM', full: 'Cost Per Mille', desc: 'Price per 1000 impressions. Publisher revenue metric.' },
  { name: 'CPC', full: 'Cost Per Click', desc: 'Price per click. Advertiser pays only for clicks.' },
  { name: 'CTR', full: 'Click-Through Rate', desc: 'Clicks ÷ Impressions × 100. Avg: 0.1-0.5%' },
  { name: 'Fill Rate', full: 'Fill Rate', desc: 'Ads served ÷ Requests × 100. Target: >80%' },
  { name: 'vCPM', full: 'Viewable CPM', desc: 'CPM for viewable impressions only (IAB standard).' },
  { name: 'eCPM', full: 'Effective CPM', desc: 'Total revenue ÷ impressions × 1000. True revenue metric.' },
]

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

  cors: `// CORS - Understanding the Mechanism

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

console.log("🔐 CSP - Prevent XSS & Injection:\\n");

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
console.log("        // Start timer - ad is 50%+ visible");
console.log("        startViewTimer(entry.target)");
console.log("      } else {");
console.log("        // Stop timer - ad left viewport");
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

  ecosystem: `// The Ad-Tech Ecosystem - Complete Data Flow

console.log("🌐 AD-TECH ECOSYSTEM - END TO END:\\n");

console.log("THE PLAYERS:");
console.log("  📰 Publisher → Owns the website (e.g., Forbes)");
console.log("  🏪 SSP → Sells publisher's ad space (e.g., Media.net)");
console.log("  🏛️ Ad Exchange → Marketplace for real-time auctions");
console.log("  🛒 DSP → Buys impressions for advertisers (e.g., DV360)");
console.log("  📊 DMP → Provides audience data for targeting");
console.log("  🖥️ Ad Server → Stores & delivers creative assets");
console.log("  💰 Advertiser → Pays for ad exposure (e.g., Nike)\\n");

console.log("THE FLOW (every page load):");
console.log("  1. User visits Forbes.com");
console.log("  2. GPT script detects ad slots on the page");
console.log("  3. Bid request → Media.net SSP");
console.log("     { sizes: [[300,250]], url: 'forbes.com/tech',");
console.log("       keywords: ['AI', 'startups'], geo: 'US' }");
console.log("  4. SSP broadcasts to 50+ DSPs simultaneously");
console.log("  5. DSPs check: 'Does Nike want to show ads");
console.log("     on tech articles to US users?'");
console.log("  6. DSPs bid: DV360=$3.50, TradeDesk=$4.20, Amazon=$3.80");
console.log("  7. Auction: TradeDesk wins at $4.20 (first-price)");
console.log("  8. Nike's creative loaded from CDN → rendered in iframe");
console.log("  9. Impression tracked, viewability monitored\\n");

console.log("💡 This happens for EVERY ad slot, EVERY page load");
console.log("   Billions of auctions per day, each in ~200ms");`,

  adServing: `// Ad Serving - Where Ads Are Stored & Delivered

console.log("🗃️ AD SERVING ARCHITECTURE:\\n");

console.log("1️⃣ Where Ads Are STORED:");
console.log("  • Ad Server (Google Ad Manager, proprietary)");
console.log("    → Stores creative assets: images, HTML5, video");
console.log("    → Manages targeting rules & campaign flights");
console.log("    → Handles frequency capping (don't show same ad 50x)\\n");

console.log("  • CDN (Content Delivery Network)");
console.log("    → Distributes creative files globally");
console.log("    → Caches at edge servers near users");
console.log("    → Reduces latency: 200ms → 20ms\\n");

console.log("2️⃣ Creative FORMATS:");
console.log("  • Image: JPEG/PNG/WebP - simplest, fastest");
console.log("  • HTML5: Rich interactive ads (animations, forms)");
console.log("    → Runs in sandboxed iframe, max 150KB");
console.log("  • VAST (Video): XML that tells player what to show");
console.log("    → Pre-roll, mid-roll, post-roll");
console.log("  • VPAID: Interactive video (clickable overlays)");
console.log("  • Native: JSON data → publisher styles it to match\\n");

console.log("3️⃣ Delivery FLOW:");
console.log("  Auction won → Ad server returns markup →");
console.log("  Browser creates iframe → Loads creative from CDN →");
console.log("  Renders inside sandbox → Fires impression pixel\\n");

console.log("💡 Key insight for frontend devs:");
console.log("  You build the SLOTS and CONTAINERS.");
console.log("  You never touch the creative content directly.");
console.log("  Everything is isolated in cross-origin iframes.");`,

  adTypes: `// Types of Digital Advertising

console.log("🎨 AD TYPES - COMPLETE GUIDE:\\n");

console.log("1️⃣ DISPLAY ADS (Banner Ads):");
console.log("  • Standard IAB sizes: 300x250, 728x90, 160x600");
console.log("  • Image or HTML5 creative");
console.log("  • Served in iframes on publisher sites");
console.log("  • Low CTR (~0.1%) but massive scale");
console.log("  • Revenue model: CPM (per 1000 impressions)\\n");

console.log("2️⃣ NATIVE ADS (Media.net specialty):");
console.log("  • Blend into the page's look and feel");
console.log("  • In-feed ads (within article lists)");
console.log("  • Recommendation widgets ('You might also like')");
console.log("  • Content ads (styled like editorial)");
console.log("  • Higher engagement: 20-60% more than display");
console.log("  • MUST have 'Sponsored' disclosure (FTC)\\n");

console.log("3️⃣ VIDEO ADS:");
console.log("  • Pre-roll: before video content (forced)");
console.log("  • Mid-roll: during video (like TV commercials)");
console.log("  • Outstream: auto-play in article text");
console.log("  • Standards: VAST (metadata) + VPAID (interactive)");
console.log("  • Highest CPM: $15-50+ vs display $1-5\\n");

console.log("4️⃣ PROGRAMMATIC vs DIRECT:");
console.log("  Programmatic: automated RTB auction (80% of market)");
console.log("  Direct/Guaranteed: publisher sells directly to brand");
console.log("  Private Marketplace: invite-only auction (premium)");`,

  privacy: `// Privacy & Cookie-less Future

console.log("🔒 THE COOKIE-LESS FUTURE:\\n");

console.log("WHY cookies are dying:");
console.log("  • Safari: blocked 3P cookies since 2020 (ITP)");
console.log("  • Firefox: blocked 3P cookies since 2019 (ETP)");
console.log("  • Chrome: Privacy Sandbox replacing 3P cookies");
console.log("  • GDPR/CCPA: fines for tracking without consent\\n");

console.log("GOOGLE PRIVACY SANDBOX (Chrome):");
console.log("  📌 Topics API:");
console.log("    → Browser assigns interest topics locally (sports, tech)");
console.log("    → Top 5 topics shared with ad-tech, not browsing history");
console.log("    → No cross-site tracking\\n");

console.log("  📌 Protected Audiences (FLEDGE):");
console.log("    → On-device ad auctions, no server-side tracking");
console.log("    → Interest groups stored locally in browser");
console.log("    → Retargeting without cookies\\n");

console.log("  📌 Attribution Reporting:");
console.log("    → Measure ad conversions without cross-site tracking");
console.log("    → Aggregated reports, not individual tracking\\n");

console.log("WHY THIS MATTERS FOR MEDIA.NET:");
console.log("  ✅ Contextual advertising GAINS value");
console.log("  → No cookies needed - analyze page content instead");
console.log("  → Privacy-compliant by design");
console.log("  → Works everywhere (Safari, Firefox, Chrome)");
console.log("  → Media.net's NLP reads the page, not the user");`,

  gpt: `// Google Publisher Tags (GPT) - Frontend Integration

console.log("🏷️ GPT - How Ads Get On The Page:\\n");

console.log("STEP 1: Load GPT library (async, non-blocking):");
console.log("  // In document head");
console.log("  window.googletag = window.googletag || { cmd: [] }\\n");

console.log("STEP 2: Define ad slots:");
console.log("  googletag.cmd.push(function() {");
console.log("    // Define a 300x250 ad slot");
console.log("    googletag.defineSlot(");
console.log("      '/12345/homepage_sidebar',  // Ad unit path");
console.log("      [[300, 250], [300, 600]],    // Accepted sizes");
console.log("      'div-ad-sidebar'              // Container div ID");
console.log("    ).addService(googletag.pubads())\\n");
console.log("    // Add key-value targeting");
console.log("    googletag.pubads().setTargeting('topic', 'technology')");
console.log("    googletag.pubads().setTargeting('geo', 'us')\\n");

console.log("    // SRA: fetch all ads in one request (faster!)");
console.log("    googletag.pubads().enableSingleRequest()");
console.log("    googletag.enableServices()");
console.log("  })\\n");

console.log("STEP 3: Display ads (when slot visible):");
console.log("  googletag.cmd.push(function() {");
console.log("    googletag.display('div-ad-sidebar')");
console.log("  })\\n");

console.log("STEP 4: Lazy-load below-fold ads:");
console.log("  const observer = new IntersectionObserver((entries) => {");
console.log("    entries.forEach(e => {");
console.log("      if (e.isIntersecting) {");
console.log("        googletag.display(e.target.id)");
console.log("        observer.unobserve(e.target)");
console.log("      }");
console.log("    })");
console.log("  }, { rootMargin: '200px' }) // Load 200px before visible");`,

  headerBidding: `// Header Bidding with Prebid.js

console.log("🔨 HEADER BIDDING - Complete Flow:\\n");

console.log("WHY Header Bidding exists:");
console.log("  Before: Publisher relies only on Google AdX (one buyer)");
console.log("  After: 10+ demand sources compete simultaneously");
console.log("  Result: Publisher revenue increases 20-50%\\n");

console.log("THE FLOW:");
console.log("  1. Page loads → Prebid.js initializes");
console.log("  2. Prebid calls ALL demand partners at once:");
console.log("     → Media.net, AppNexus, Rubicon, OpenX, etc.");
console.log("  3. Each partner returns a bid within 1-2s timeout");
console.log("  4. Prebid selects the highest bid");
console.log("  5. Sends ALL bids as key-values to GPT:");
console.log("     → googletag.pubads().setTargeting('hb_pb', '4.20')");
console.log("  6. GPT sends to ad server (Google Ad Manager)");
console.log("  7. Ad server compares: prebid $4.20 vs direct deals");
console.log("  8. Winner renders\\n");

console.log("PREBID SETUP:");
console.log("  var adUnits = [{");
console.log("    code: 'div-ad-sidebar',");
console.log("    mediaTypes: { banner: { sizes: [[300,250]] } },");
console.log("    bids: [");
console.log("      { bidder: 'medianet', params: { cid: '8CU...' } },");
console.log("      { bidder: 'appnexus', params: { placementId: 123 } },");
console.log("    ]");
console.log("  }]\\n");

console.log("  pbjs.requestBids({");
console.log("    timeout: 1500, // ms to wait for bids");
console.log("    adUnits: adUnits,");
console.log("    bidsBackHandler: sendToAdServer");
console.log("  })");`,

  adPerformance: `// Ad Performance Impact on Frontend

console.log("📈 AD REVENUE MATH:\\n");

console.log("  Revenue = (Impressions × CPM) / 1000");
console.log("  Example: 1,000,000 impressions × $5 CPM = $5,000\\n");

console.log("OPTIMIZING AD REVENUE:");
console.log("  Fill Rate: aim > 80% (ads served / requests)");
console.log("  Viewability: aim > 70% (ads actually seen)");
console.log("  CTR: track by format (native > display)");
console.log("  eCPM: true revenue per 1000 impressions\\n");

console.log("FRONTEND PERFORMANCE IMPACT:");
console.log("  ❌ Bad: Ads blocking page render");
console.log("  ❌ Bad: Ad causing layout shift (CLS)");
console.log("  ❌ Bad: 20+ ad network scripts in head\\n");

console.log("  ✅ Good: Async ad loading");
console.log("  ✅ Good: Reserved ad slot dimensions");
console.log("  ✅ Good: Lazy-load below-fold ads");
console.log("  ✅ Good: Use requestIdleCallback for analytics\\n");

console.log("PREVENTING CLS FROM ADS:");
console.log("  // Reserve space with min-height");
console.log("  .ad-slot { min-height: 250px; }\\n");

console.log("  // Load below-fold ads on scroll");
console.log("  const observer = new IntersectionObserver(cb,");
console.log("    { rootMargin: '200px' })");
console.log("  observer.observe(adSlot)\\n");

console.log("💡 Senior frontend devs own the BALANCE:");
console.log("  More ads = more revenue BUT worse UX & SEO");
console.log("  Fewer ads = better UX BUT less revenue");`,
}
</script>

