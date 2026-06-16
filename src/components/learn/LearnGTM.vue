<template>
  <div class="learn-gtm min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn" class="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4">
        ← Back to Topics
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">🚀</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Go-To-Market (GTM) Strategy</h1>
      </div>
      <p class="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        The difference between startup success and failure is rarely product alone - it's disciplined focus, systematic measurement, and executing GTM like an engineering problem.
      </p>
    </div>

    <!-- Layout: Nav + Content -->
    <div class="px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 pb-16">
      <SectionNav
        :sections="sections"
        :activeSection="activeSection"
        activeColor="bg-fuchsia-500"
        @select="setSection"
        class="lg:w-64 flex-shrink-0"
      />

      <div class="flex-1 min-w-0 space-y-8">
        
        <!-- ==================== 1. BRAND & POSITIONING ==================== -->
        <template v-if="activeSection === 'brand'">
          <div class="bg-gradient-to-br from-indigo-900 to-fuchsia-900 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden group mb-8">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-500"></div>
            <div class="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-500">✨</div>
            <h2 class="text-3xl md:text-4xl font-bold mb-4 tracking-tight">The Founders ARE the Brand</h2>
            <p class="text-indigo-200 mb-10 max-w-xl mx-auto leading-relaxed">
              Startups must build credibility from scratch. Your brand is initially judged by the founders' values, style, and character. Start how you mean to end.
            </p>
            
            <div class="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto text-left">
              <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <div class="text-sm font-bold tracking-wider text-pink-400 uppercase mb-2">The Vision</div>
                <div class="text-sm text-indigo-100">What change you are trying to make in the world.</div>
              </div>
              <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <div class="text-sm font-bold tracking-wider text-fuchsia-400 uppercase mb-2">The Promise</div>
                <div class="text-sm text-indigo-100">What you will reliably deliver to customers at the most fundamental level.</div>
              </div>
              <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <div class="text-sm font-bold tracking-wider text-purple-400 uppercase mb-2">The Attributes</div>
                <div class="text-sm text-indigo-100">The emotional and personality dimensions that make you distinct.</div>
              </div>
            </div>
          </div>

          <!-- Defensible Differentiation -->
          <div class="space-y-6">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Defensible Differentiation & The Positioning Challenge</h3>
            <p class="text-gray-500 dark:text-gray-400">
              Technology innovation is insufficient on its own. The challenge is to find a <strong>white space 2x2 quadrant</strong> where your product sits in a place the competition genuinely cannot follow. The axes must represent barriers, not just features. If 10 companies solve the same problem, you are competing on price.
            </p>
            
            <div class="grid md:grid-cols-3 gap-4">
               <div class="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-xl border border-blue-100 dark:border-blue-800/30">
                  <h4 class="font-bold text-blue-900 dark:text-blue-100 mb-2">Segment Focus</h4>
                  <p class="text-sm text-blue-700 dark:text-blue-400 leading-relaxed">Target an underserved vertical. First mover owns the reference architecture and word-of-mouth network.</p>
               </div>
               <div class="bg-emerald-50 dark:bg-emerald-900/10 p-5 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                  <h4 class="font-bold text-emerald-900 dark:text-emerald-100 mb-2">Business Model</h4>
                  <p class="text-sm text-emerald-700 dark:text-emerald-400 leading-relaxed">SaaS vs on-premise, Premium vs Licensed. Incumbents cannot match disruptive models without destroying margins.</p>
               </div>
               <div class="bg-amber-50 dark:bg-amber-900/10 p-5 rounded-xl border border-amber-100 dark:border-amber-800/30">
                  <h4 class="font-bold text-amber-900 dark:text-amber-100 mb-2">Data & Network</h4>
                  <p class="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">Proprietary data that grows in value with usage creates a moat no patent can replicate.</p>
               </div>
            </div>

            <!-- Case Study: Emotional Branding -->
            <div class="bg-white dark:bg-gray-900 border-l-4 border-pink-500 p-6 rounded shadow-sm my-8">
              <h4 class="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
                <span class="text-xl">📖</span> Case Study: Enterprise Software Emotional Branding
              </h4>
              <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                A B2B e-commerce platform rebranded around the concept of <strong>'potential'</strong>. While competitors argued over technical specs, they positioned themselves as the canvas for ambitious brands.
                <br><br>
                <strong>Insight:</strong> People buy on emotion but justify with fact. The emotional hook - <em>"Does this brand make me feel like a winner?"</em> - drives the human decision-making layer.
              </p>
            </div>

            <!-- Positioning Builder -->
            <div class="mt-10 bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
               <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Interactive: The Positioning Statement</h3>
               <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Test: Substitute a competitor's name. If it still makes sense, you are not differentiated enough.</p>
               
               <div class="bg-indigo-50 dark:bg-indigo-900/20 p-4 border border-indigo-100 dark:border-indigo-800/30 rounded-lg mb-6 text-sm">
                 <strong class="text-indigo-800 dark:text-indigo-300">💡 Spotfire Example:</strong> Repositioning from scientific analytics to Enterprise BI. They couldn't win on features against incumbents. Winning repositioning: <em>Focus on the value of decisions made, not the data visualized. They competed on cognitive outcomes.</em>
               </div>
               
               <div class="space-y-4">
                 <div>
                   <label class="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Target Audience & Dissatisfaction</label>
                   <input v-model="posAudience" class="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 text-sm" placeholder="e.g. For data scientists tired of slow querying...">
                 </div>
                 <div class="flex gap-4">
                   <div class="flex-1">
                     <label class="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Our Product Category</label>
                     <input v-model="posCategory" class="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 text-sm" placeholder="e.g. DataWarehouse X is an analytics engine...">
                   </div>
                   <div class="flex-1">
                     <label class="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Differentiation Claim</label>
                     <input v-model="posClaim" class="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 text-sm" placeholder="e.g. that computes in memory instantly.">
                   </div>
                 </div>
                 <div>
                   <label class="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Reason to Believe</label>
                   <input v-model="posReason" class="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 text-sm" placeholder="e.g. Unlike [Competitor], we use columnar storage...">
                 </div>
                 
                 <div class="mt-6 p-5 bg-fuchsia-50 dark:bg-fuchsia-900/10 border border-fuchsia-200 dark:border-fuchsia-800/30 rounded-xl">
                   <h5 class="text-xs font-bold text-fuchsia-600 dark:text-fuchsia-400 uppercase tracking-wider mb-2">Generated Statement:</h5>
                   <p class="text-gray-900 dark:text-white leading-relaxed">
                     <span v-if="posAudience">{{posAudience}}, </span>
                     <span v-else class="text-gray-400 italic">[Audience & Pain], </span>
                     
                     <span v-if="posCategory">{{posCategory}} </span>
                     <span v-else class="text-gray-400 italic">[Product] </span>
                     
                     <span v-if="posClaim">{{posClaim}}. </span>
                     <span v-else class="text-gray-400 italic">[Key Differentiation]. </span>
                     
                     <span v-if="posReason">{{posReason}}</span>
                     <span v-else class="text-gray-400 italic">[Because/Unlike... Reason to Believe]</span>
                   </p>
                 </div>
               </div>
            </div>
          </div>
        </template>

        <!-- ==================== 2. TARGETING & MVS ==================== -->
        <template v-if="activeSection === 'targeting'">
           <div class="space-y-6">
              <div class="border-l-4 border-emerald-500 pl-6 mb-8">
                <h3 class="text-3xl font-bold text-gray-900 dark:text-white">Minimum Viable Segment (MVS)</h3>
                <p class="text-gray-500 dark:text-gray-400 mt-2 text-lg">An MVP without an MVS is a solution in search of a buyer.</p>
                <div class="mt-4 inline-flex px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 text-sm font-medium rounded-full">
                  ⚠️ #1 Failure Pattern: Starting too broad.
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <h4 class="font-bold text-gray-900 dark:text-white mb-3">Validation of a Segment</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    A segment is validated when two unconnected customers can reference each other's experience and say: <strong class="text-emerald-600 dark:text-emerald-400">"Yes, we had exactly the same problem, and this solved it."</strong>
                  </p>
                  <p class="text-sm text-gray-600 dark:text-gray-300">
                    This referenceability is the foundation of the beachhead market.
                  </p>
                </div>
                <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <h4 class="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <span class="text-emerald-500">↔️</span> Horizontal vs. Vertical Tension
                  </h4>
                  <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-3 list-disc pl-4">
                    <li><strong class="text-gray-900 dark:text-gray-100">The Trap:</strong> Wide TAM looks attractive to investors but dilutes positioning. Your message resonates with no one specifically.</li>
                    <li><strong class="text-emerald-500 text-base">The Vertical Advantage:</strong> By narrowing to a specific use case:
                      <ul class="mt-2 space-y-1 text-gray-500 dark:text-gray-400 circle pl-4">
                        <li>Value parameters become crystal clear (quantify ROI with hard numbers).</li>
                        <li>Sales cycles compress (discovery is faster).</li>
                        <li>Win rates increase and you can charge 2-3x more.</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              
              <!-- ICP vs Demographics -->
              <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-xl mt-6">
                <h4 class="font-bold text-gray-900 dark:text-white mb-2">ICP vs. Demographic Segmentation</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Demographics (size, industry, geo) are filters, not a strategy. Two companies exactly alike demographically can have completely different buying profiles. 
                  <br><br>
                  The Ideal Customer Profile (ICP) must be built on <strong>jobs-to-be-done and shared pain</strong>.
                  <br>
                  <em>Note: ICP definition should happen AFTER Product-Market Fit. Pre-PMF data is too thin. Revenue analysis usually reveals 70%+ of value comes from 2-3 archetypes.</em>
                </p>
              </div>

              <!-- Beachhead Evaluation -->
              <div class="mt-8 bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800/30">
                <h4 class="font-bold text-emerald-900 dark:text-emerald-100 mb-4 text-lg">Beachhead Segment Readiness Evaluator</h4>
                <p class="text-sm text-emerald-700 dark:text-emerald-400 mb-6">Concentrate force on one segment first (80% resources), win it, then expand. Evaluate your target segment:</p>
                
                <div class="space-y-3">
                  <label v-for="(criterion, index) in beachheadCriteria" :key="index" class="flex items-start gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-emerald-100 dark:border-emerald-800/50 cursor-pointer hover:border-emerald-400 transition-colors">
                    <input type="checkbox" v-model="criterion.checked" class="mt-1 w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500">
                    <div>
                      <div class="font-bold text-gray-900 dark:text-white">{{ criterion.title }}</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ criterion.desc }}</div>
                    </div>
                  </label>
                </div>

                <div v-if="beachheadCriteria.every(c => c.checked)" class="mt-6 p-4 bg-emerald-600 text-white rounded-xl text-center font-bold animate-pulse">
                  ✅ Segment is viable for a Beachhead Entry!
                </div>
              </div>
           </div>
        </template>

        <!-- ==================== 3. SALES CYCLE ==================== -->
        <template v-if="activeSection === 'sales'">
           <div class="space-y-6">
              <h3 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">The Buying Cycle Framework</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
                The most common mistake is treating sales as a funnel you push customers through. In reality, customers control the vehicle. The startup's role is to make gear shifts easy.
              </p>

              <div class="grid md:grid-cols-3 gap-6">
                <!-- Accelerator -->
                <div class="relative group">
                  <div class="absolute inset-0 bg-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                  <div class="relative bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 h-full">
                    <div class="text-4xl mb-4">🚀</div>
                    <h4 class="font-bold text-lg mb-2">Accelerator</h4>
                    <p class="text-sm text-gray-500">Motivates transition between stages (e.g., clear next step, trigger event, compelling demo).</p>
                  </div>
                </div>

                <!-- Brake -->
                <div class="relative group">
                  <div class="absolute inset-0 bg-red-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                  <div class="relative bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 h-full">
                    <div class="text-4xl mb-4">🛑</div>
                    <h4 class="font-bold text-lg mb-2">Brake</h4>
                    <p class="text-sm text-gray-500">Barriers to progression (complexity, integration fear, pricing ambiguity). <em>Price is rarely the real brake.</em></p>
                  </div>
                </div>

                <!-- Clutch -->
                <div class="relative group">
                  <div class="absolute inset-0 bg-gray-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                  <div class="relative bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 h-full">
                    <div class="text-4xl mb-4">⚙️</div>
                    <h4 class="font-bold text-lg mb-2">Clutch</h4>
                    <p class="text-sm text-gray-500">Inertia / Status Quo. Gain/pain ratio must be at least 10x to overcome organizational inertia.</p>
                  </div>
                </div>
              </div>

              <!-- DMU & ROME -->
              <div class="grid md:grid-cols-2 gap-6 mt-8">
                <div class="space-y-6">
                  <!-- DMU -->
                  <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                    <h4 class="font-bold text-gray-900 dark:text-white mb-4">Decision Making Unit (DMU)</h4>
                    <p class="text-xs text-gray-500 mb-3">The collective group whose consensus enables purchase.</p>
                    <ul class="space-y-3 text-sm">
                      <li class="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2"><span class="font-medium text-purple-500">Visionary</span><span class="text-gray-500 text-right">Seeks competitive advantage</span></li>
                      <li class="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2"><span class="font-medium text-blue-500">Technocrat</span><span class="text-gray-500 text-right">Evaluates fit & operability</span></li>
                      <li class="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2"><span class="font-medium text-amber-500">Influencer</span><span class="text-gray-500 text-right">Holds political capital</span></li>
                      <li class="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2"><span class="font-medium text-emerald-500">Economic Buyer</span><span class="text-gray-500 text-right">Controls the budget</span></li>
                      <li class="flex justify-between"><span class="font-medium text-red-500">Decision Maker</span><span class="text-gray-500 text-right">Ultimately approves</span></li>
                    </ul>
                    <p class="mt-4 text-xs font-bold text-red-400">🚨 Failure Pattern: Wasting 6 months on a deal where the Economic Buyer was never engaged.</p>
                  </div>
                  
                  <!-- Qualification & Play Card -->
                  <div class="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h4 class="font-bold text-gray-900 dark:text-white mb-2">Continuous Qualification</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Use frameworks like BANT (Budget, Authority, Need, Timeline) or MANA. Most importantly: <strong>Ask why prospects did NOT buy.</strong> Those conversations reveal messaging mismatches far clearer than win analyses.
                    </p>
                    <div class="border-t border-gray-100 dark:border-gray-800 pt-4 mt-2">
                       <h5 class="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">The Play Card Model</h5>
                       <p class="text-sm text-gray-600 dark:text-gray-400">A 1-page GTM execution summary per segment forcing alignment on: Target, Pain, Differentiating Message, and Tactical Levers.</p>
                    </div>
                  </div>
                </div>

                <div class="bg-indigo-50 dark:bg-indigo-900/10 p-6 rounded-2xl border border-indigo-200 dark:border-indigo-800/30">
                  <h4 class="font-bold text-indigo-900 dark:text-indigo-100 mb-4">R.O.M.E Framework</h4>
                  <p class="text-sm text-indigo-800 dark:text-indigo-300 font-medium mb-3">Results-Oriented Measured Execution</p>
                  <ul class="text-sm text-indigo-700 dark:text-indigo-400 space-y-2 list-disc pl-4">
                    <li>Conversion rate at each stage</li>
                    <li>Time and resources consumed per stage</li>
                    <li>Customer Acquisition Cost (CAC) by channel</li>
                    <li>Cost per Qualified Lead</li>
                  </ul>
                  <div class="mt-4 p-3 bg-white/50 dark:bg-gray-900/50 rounded-lg text-xs text-indigo-900 dark:text-indigo-200">
                    <strong>Reverse Engineering:</strong> Know conversion rates → Work backwards from revenue target to exactly how many leads/trials/demos are needed.
                  </div>
                </div>
              </div>
           </div>
        </template>

        <!-- ==================== 4. INBOUND ==================== -->
        <template v-if="activeSection === 'inbound'">
           <div class="space-y-6">
              <div class="bg-cyan-50 dark:bg-cyan-900/10 p-8 rounded-2xl border border-cyan-200 dark:border-cyan-800/30 mb-8">
                <div class="flex items-center gap-4 mb-4">
                  <div class="text-4xl">🏰</div>
                  <h3 class="text-2xl font-bold text-cyan-900 dark:text-cyan-100">The Inbound Moat</h3>
                </div>
                <p class="text-cyan-800 dark:text-cyan-300 leading-relaxed max-w-2xl mb-6">
                  Traditional outbound "rents" attention (ads, lists). It was built for a world where customers had limited info access. Today, people block interruptions.
                  <br><br>
                  Inbound "owns" attention by creating valuable compounding assets. A competitor might copy your product in 6 months, but they cannot replicate your 500,000-keyword ranking profile or 100,000 links easily.
                </p>
                <h4 class="font-bold text-cyan-900 border-b border-cyan-200 dark:border-cyan-800 pb-2 mb-4">The Marketing Balance Sheet</h4>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div class="bg-white dark:bg-cyan-950 rounded-xl p-4 shadow-sm border border-cyan-100 dark:border-cyan-800">
                    <div class="font-bold text-cyan-600 text-lg">Web Links</div>
                  </div>
                  <div class="bg-white dark:bg-cyan-950 rounded-xl p-4 shadow-sm border border-cyan-100 dark:border-cyan-800">
                    <div class="font-bold text-cyan-600 text-lg">Keywords</div>
                  </div>
                  <div class="bg-white dark:bg-cyan-950 rounded-xl p-4 shadow-sm border border-cyan-100 dark:border-cyan-800">
                    <div class="font-bold text-cyan-600 text-lg">Social</div>
                  </div>
                  <div class="bg-white dark:bg-cyan-950 rounded-xl p-4 shadow-sm border border-cyan-100 dark:border-cyan-800">
                    <div class="font-bold text-cyan-600 text-lg">Email List</div>
                  </div>
                </div>
              </div>

              <!-- Tools as Content & Funnel Micro-steps -->
              <div class="grid md:grid-cols-2 gap-6 mt-8">
                <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
                  <div>
                    <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-2 text-blue-500">Engineering as Marketing</h4>
                    <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      Tools, calculators, benchmarks, and audits build enormous credibility by demonstrating expertise without claiming it. (e.g. HubSpot's free Website Grader).
                    </p>
                    <ul class="space-y-2 text-sm text-gray-500">
                      <li class="flex items-center gap-2"><span>✅</span> Removes friction (it's free)</li>
                      <li class="flex items-center gap-2"><span>✅</span> Immediate personalized value</li>
                      <li class="flex items-center gap-2"><span>✅</span> Creates a trigger/self-improvement instinct</li>
                    </ul>
                  </div>
                </div>

                <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-2 text-rose-500">The JBoss Friction Case Study</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    JBoss gave away documentation that was previously sold for $27,000/year. Result? It triggered <strong>10,000 inbound leads per month</strong>. The massive value of the asset overcame the friction of handing over an email address.
                  </p>
                  <div class="bg-white dark:bg-gray-900 p-4 border border-gray-100 dark:border-gray-700 rounded-xl">
                    <h5 class="font-bold text-sm text-gray-900 dark:text-white mb-1">The Micro-Step Principle</h5>
                    <p class="text-xs text-gray-500 leading-relaxed">Map the funnel at the individual click level. Solve for what the user fears at each exact micro-step to deliver 'wow' moments.</p>
                  </div>
                </div>
              </div>

              <!-- Funnel Mechanics Interactive -->
              <div class="mt-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                <h4 class="font-bold text-gray-900 dark:text-white mb-2">Solving Funnel Friction</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">Every step has Friction (effort) and Concern (risk). Motivation must outweigh both to progress.</p>
                
                <div class="flex flex-col md:flex-row gap-6 items-center bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800">
                    <div class="flex-1 space-y-4 w-full">
                       <div>
                         <label class="text-xs font-bold text-gray-500 uppercase">Motivation (Value)</label>
                         <input type="range" v-model="motivation" min="0" max="100" class="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer mt-2">
                       </div>
                       <div>
                         <label class="text-xs font-bold text-gray-500 uppercase">Friction (Effort Required)</label>
                         <input type="range" v-model="friction" min="0" max="100" class="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer mt-2">
                       </div>
                       <div>
                         <label class="text-xs font-bold text-gray-500 uppercase">Concern (Perceived Risk)</label>
                         <input type="range" v-model="concern" min="0" max="100" class="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer mt-2">
                       </div>
                    </div>
                    
                    <div class="flex-shrink-0 w-48 h-48 rounded-full flex items-center justify-center border-8 transition-colors duration-500"
                        :class="motivation > (Number(friction) + Number(concern)) / 1.5 ? 'border-emerald-500 bg-emerald-50 shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'border-red-500 bg-red-50'">
                        <div class="text-center">
                          <div class="text-3xl font-bold" :class="motivation > (Number(friction) + Number(concern)) / 1.5 ? 'text-emerald-600' : 'text-red-600'">
                             {{ motivation > (Number(friction) + Number(concern)) / 1.5 ? 'CONVERTS' : 'BOUNCES' }}
                          </div>
                          <div class="text-xs text-gray-500 mt-2 font-medium">Add in-app guidance to lower friction.</div>
                        </div>
                    </div>
                </div>
              </div>
           </div>
        </template>

        <!-- ==================== 5. AI & GTM ENGINEER ==================== -->
        <template v-if="activeSection === 'ai'">
          <div class="space-y-6">
            <div class="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-2xl p-8 text-white relative overflow-hidden">
               <div class="absolute right-0 top-0 opacity-10 text-9xl">🤖</div>
               <h3 class="text-3xl font-bold mb-4">Rise of the GTM Engineer</h3>
               <p class="text-purple-200 mb-6 max-w-2xl leading-relaxed">
                 AI is fundamentally redefining GTM cost structure. Technical GTM expertise is the new competitive advantage. Instead of hiring 10 SDRs, hire a GTM Engineer to build an agent system.
               </p>
               
               <div class="bg-black/20 rounded-xl p-5 border border-white/10">
                 <h4 class="font-bold text-purple-300 mb-2 border-b border-white/10 pb-2">The Agent Workflow: "Shadow, then Encode"</h4>
                 <ol class="list-decimal pl-5 space-y-2 text-sm text-purple-100">
                   <li><strong>Shadow highest performer:</strong> Document tabs, queries, judgment calls.</li>
                   <li><strong>Encode workflow:</strong> Combine deterministic steps with AI logic.</li>
                   <li><strong>Human-in-the-loop:</strong> Agent drafts, human reviews/approves.</li>
                   <li><strong>Track KPIs:</strong> Hold agent to human metrics.</li>
                   <li><strong>Automate:</strong> Autonomous execution upon confidence.</li>
                 </ol>
               </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
               <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <h4 class="font-bold text-gray-900 dark:text-white mb-2">Scale Impact Example</h4>
                  <div class="flex items-end gap-4 mb-4">
                    <div class="text-5xl font-black text-purple-500">90%</div>
                    <div class="text-sm font-bold text-gray-500 uppercase pb-1">Cost Reduction</div>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    A team reduced inbound SDRs from 10 people to 1 managing an AI agent. Kept same lead-to-opportunity rate, agent cost ~$1k/year to run.
                  </p>
                  <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h5 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Speed of Deployment</h5>
                    <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• <strong>Production Lead Qual Agent:</strong> Built in 6 weeks</li>
                      <li>• <strong>"Lostbot" (Loss analysis):</strong> Built in 2 days</li>
                    </ul>
                  </div>
               </div>
               
               <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <h4 class="font-bold text-gray-900 dark:text-white mb-2">Deal Intelligence</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Running agents across transcripts (Gong), Slack, and email to find real reasons deals were lost.
                  </p>
                  <div class="bg-white dark:bg-gray-900 border border-red-200 dark:border-red-900/30 p-3 rounded-lg text-xs mt-4 relative">
                    <span class="absolute -top-2 left-2 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 px-2 py-0.5 rounded text-[10px] font-bold">HUMAN NOTE</span>
                    "Lost on price."
                  </div>
                  <div class="bg-white dark:bg-gray-900 border border-purple-200 dark:border-purple-900/30 p-3 rounded-lg text-xs mt-2 relative">
                    <span class="absolute -top-2 left-2 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded text-[10px] font-bold">AI ANALYSIS</span>
                    "Lost because Economic Buyer never engaged and ROI wasn't quantified."
                  </div>
               </div>
            </div>
            
            <div class="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-200 dark:border-blue-800/30">
               <h4 class="font-bold text-blue-900 dark:text-blue-100 mb-2 text-lg">GTM as a Product</h4>
               <p class="text-sm text-blue-800 dark:text-blue-300 mb-2">
                 Treat GTM like an engineering product. Map the journey. Identify 'bugs' (where sales process breaks), prioritize impact, and run 1-week sprints to resolve them.
               </p>
               <p class="text-sm text-blue-800 dark:text-blue-300 font-medium">
                 The experience of being sold to is a key differentiator. Make every touchpoint feel valuable, human, and consultative.
               </p>
            </div>
          </div>
        </template>

        <!-- ==================== 6. OUTBOUND & METRICS ==================== -->
        <template v-if="activeSection === 'outbound'">
           <div class="space-y-6">
             <div class="mb-6">
                <h3 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Outbound Optimization</h3>
                <p class="text-gray-500">Think like an engineer: locate the constraint, fix the leak, then scale.</p>
             </div>

             <div class="bg-orange-50 dark:bg-orange-900/10 p-6 rounded-2xl border border-orange-200 dark:border-orange-800/30 mb-8">
               <h4 class="font-bold text-orange-900 dark:text-orange-100 mb-4 tracking-wide uppercase text-sm">Validating Health</h4>
               <ol class="space-y-4">
                 <li class="flex gap-3 text-sm">
                   <span class="flex-shrink-0 w-6 h-6 rounded-full bg-orange-200 dark:bg-orange-800 text-orange-900 dark:text-orange-100 flex items-center justify-center font-bold">1</span>
                   <span class="text-orange-800 dark:text-orange-300"><b>Stop bleeding:</b> Find biggest funnel leak. Don't change scripts if emails are hitting spam.</span>
                 </li>
                 <li class="flex gap-3 text-sm">
                   <span class="flex-shrink-0 w-6 h-6 rounded-full bg-orange-200 dark:bg-orange-800 text-orange-900 dark:text-orange-100 flex items-center justify-center font-bold">2</span>
                   <span class="text-orange-800 dark:text-orange-300"><b>Systematize:</b> Document the fix as a process.</span>
                 </li>
                 <li class="flex gap-3 text-sm">
                   <span class="flex-shrink-0 w-6 h-6 rounded-full bg-orange-200 dark:bg-orange-800 text-orange-900 dark:text-orange-100 flex items-center justify-center font-bold">3</span>
                   <span class="text-orange-800 dark:text-orange-300"><b>Optimize:</b> Test one variable at a time (A/B testing).</span>
                 </li>
                 <li class="flex gap-3 text-sm">
                   <span class="flex-shrink-0 w-6 h-6 rounded-full bg-orange-200 dark:bg-orange-800 text-orange-900 dark:text-orange-100 flex items-center justify-center font-bold">4</span>
                   <span class="text-orange-800 dark:text-orange-300"><b>Scale:</b> Add volume (AI tools, team) ONLY after consistent converting process exists.</span>
                 </li>
               </ol>
             </div>

             <div class="grid md:grid-cols-2 gap-6">
               <!-- Email Benchmarks -->
               <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h4 class="font-bold text-gray-900 dark:text-white mb-4 border-b pb-2 dark:border-gray-700 border-gray-200">Email Benchmarks</h4>
                  <ul class="space-y-4 text-sm">
                    <li>
                      <div class="flex justify-between font-bold dark:text-gray-200 text-gray-700"><span class="text-blue-500">Reply Rate</span> <span>3–5%</span></div>
                      <div class="text-xs text-gray-500 mt-1">&lt;1% = Deliverability failure. Fix DNS/Spam.</div>
                    </li>
                    <li>
                      <div class="flex justify-between font-bold dark:text-gray-200 text-gray-700"><span class="text-blue-500">Positive Reply</span> <span>10% of total</span></div>
                      <div class="text-xs text-gray-500 mt-1">&lt;8% = ICP mismatch or bad value prop.</div>
                    </li>
                    <li>
                      <div class="flex justify-between font-bold dark:text-gray-200 text-gray-700"><span class="text-blue-500">Meeting Book</span> <span>20–50% of pos.</span></div>
                      <div class="text-xs text-gray-500 mt-1">Low = Speed-to-lead is too slow.</div>
                    </li>
                  </ul>
               </div>

               <!-- Calling Benchmarks & Target Math -->
               <div class="space-y-6">
                 <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h4 class="font-bold text-gray-900 dark:text-white mb-4 border-b pb-2 dark:border-gray-700 border-gray-200">Cold Call Benchmarks</h4>
                    <p class="text-xs text-gray-500 mb-4 italic">Expect 800-1,200 dials to close 1 deal.</p>
                    <ul class="space-y-4 text-sm">
                      <li>
                        <div class="flex justify-between font-bold dark:text-gray-200 text-gray-700"><span class="text-green-500">Connect Rate</span> <span>10%+</span></div>
                        <div class="text-xs text-gray-500 mt-1">&lt;10% = Bad phone lists / wrong data.</div>
                      </li>
                      <li>
                        <div class="flex justify-between font-bold dark:text-gray-200 text-gray-700"><span class="text-green-500">Pitch to Interest</span> <span>25–35%</span></div>
                        <div class="text-xs text-gray-500 mt-1">Of connected calls showing interest.</div>
                      </li>
                      <li>
                        <div class="flex justify-between font-bold dark:text-gray-200 text-gray-700"><span class="text-green-500">Meeting Book</span> <span>20–30%</span></div>
                        <div class="text-xs text-gray-500 mt-1">From interested to concrete meeting.</div>
                      </li>
                    </ul>
                 </div>
                 
                 <!-- Target Math Highlight -->
                 <div class="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl border border-blue-100 dark:border-blue-800/30">
                    <h4 class="font-bold text-blue-900 dark:text-blue-100 text-sm uppercase tracking-wide mb-3">Email Target Math</h4>
                    <div class="flex items-center justify-between text-sm mb-2">
                       <span class="text-gray-700 dark:text-gray-300">Sends</span>
                       <span class="font-mono font-bold text-blue-600 dark:text-blue-400">1,000</span>
                    </div>
                    <div class="flex justify-center text-gray-400 my-1">↓</div>
                    <div class="flex items-center justify-between text-sm mb-2">
                       <span class="text-gray-700 dark:text-gray-300">Total Replies</span>
                       <span class="font-mono font-bold text-blue-600 dark:text-blue-400">15–25</span>
                    </div>
                    <div class="flex justify-center text-gray-400 my-1">↓</div>
                    <div class="flex items-center justify-between text-sm mb-2">
                       <span class="text-gray-700 dark:text-gray-300">Positive Replies</span>
                       <span class="font-mono font-bold text-blue-600 dark:text-blue-400">2–3</span>
                    </div>
                    <div class="flex justify-center text-gray-400 my-1">↓</div>
                    <div class="flex items-center justify-between text-sm bg-blue-100 dark:bg-blue-900/50 p-2 rounded">
                       <span class="font-bold text-blue-900 dark:text-blue-100">Booked Meeting</span>
                       <span class="font-mono font-bold text-orange-500">1</span>
                    </div>
                 </div>
               </div>
             </div>
           </div>
        </template>

        <!-- ==================== 7. PRICING & EXPANSION ==================== -->
        <template v-if="activeSection === 'pricing'">
           <div class="space-y-6">
              
              <div class="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                <div class="text-4xl mb-4">💰</div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Paradox of Underpricing</h3>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  Pricing too low can signal you aren't capable of enterprise deployment. 
                  <strong class="text-emerald-500 block mt-2">Example:</strong> A company lost an enterprise deal not because their price was too high, but because at <strong>$75K</strong>, the buyer doubted they could support the deployment compared to the <strong>$300K-$400K</strong> competing quotes.
                </p>
                <div class="bg-white dark:bg-gray-900 border-l-4 border-emerald-500 p-5 rounded mt-4">
                  <h4 class="font-bold text-gray-900 dark:text-white">Value-Based Pricing Formula</h4>
                  <p class="text-sm font-mono mt-2 text-emerald-600 dark:text-emerald-400">Identify Business Metric × Impact of Improvement = Total Value</p>
                  <p class="text-sm text-gray-500 mt-2">Price as a fraction of that Total Value. (e.g. 0.5% improvement in a $200M claims portfolio = $1M value creation. A $100K contract is now an obvious bargain.)</p>
                </div>
              </div>

              <div class="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 mt-6">
                 <div class="text-4xl mb-4">🌍</div>
                 <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Geographic Expansion Playbook</h3>
                 <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
                   Follow the beachhead principle: concentrate force.
                 </p>
                  <ul class="space-y-4">
                   <li class="flex items-start gap-3 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                     <span class="mt-1 text-blue-500 text-lg">1</span>
                     <div>
                       <strong class="text-gray-900 dark:text-white block">Win existing market.</strong> 
                       <span class="text-sm text-gray-600 dark:text-gray-400">Build massive referenceability first to start the referenceability flywheel.</span>
                     </div>
                   </li>
                   <li class="flex items-start gap-3 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                     <span class="mt-1 text-blue-500 text-lg">2</span>
                     <div>
                       <strong class="text-gray-900 dark:text-white block">Adapt & Hire localized.</strong> 
                       <span class="text-sm text-gray-600 dark:text-gray-400">Translate collateral and hire local boots on ground.</span>
                     </div>
                   </li>
                   <li class="flex items-start gap-3 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                     <span class="mt-1 text-blue-500 text-lg">3</span>
                     <div>
                       <strong class="text-gray-900 dark:text-white block">Customer-led partner channel.</strong> 
                       <span class="text-sm text-gray-600 dark:text-gray-400">Win the customer, ask who they buy from, approach partner with guaranteed demand.</span>
                     </div>
                   </li>
                 </ul>
              </div>

           </div>
        </template>

        <!-- ==================== 8. KEY TAKEAWAYS ==================== -->
        <template v-if="activeSection === 'takeaways'">
          <div class="space-y-6 max-w-4xl mx-auto">
            <h3 class="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">Top 10 Executive Insights</h3>
            <p class="text-gray-500 text-center mb-10">The consolidated wisdom representing the most consistently cited factors in GTM success.</p>
            
            <div class="grid gap-4">
              <div v-for="(takeaway, i) in takeaways" :key="i" class="flex gap-4 p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-fuchsia-300 transition-colors shadow-sm group">
                <div class="flex-shrink-0 w-10 h-10 bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-600 dark:text-fuchsia-400 font-black rounded-lg flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                  {{ i + 1 }}
                </div>
                <div class="text-gray-700 dark:text-gray-300 text-sm md:text-base self-center leading-relaxed">
                  <span v-html="takeaway"></span>
                </div>
              </div>
            </div>
          </div>
        </template>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import SectionNav from './SectionNav.vue'

// ==================== Section Navigation ====================
const sections = [
  { id: 'brand', label: 'Brand & Positioning', icon: '✨', badge: '1' },
  { id: 'targeting', label: 'Targeting & MVS', icon: '🎯', badge: '2' },
  { id: 'sales', label: 'Sales Cycle (ROME)', icon: '⚙️', badge: '3' },
  { id: 'inbound', label: 'Inbound Moat', icon: '🏰', badge: '4' },
  { id: 'ai', label: 'AI & GTM Engineers', icon: '🤖', badge: '5' },
  { id: 'outbound', label: 'Outbound Benchmarks', icon: '📈', badge: '6' },
  { id: 'pricing', label: 'Pricing & Expansion', icon: '💰', badge: '7' },
  { id: 'takeaways', label: 'Key Takeaways', icon: '📋', badge: '10' }
]

const activeSection = ref('brand')

function setSection(id) {
  activeSection.value = id
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// ==================== Interactive State ====================

// 1. Positioning Builder State
const posAudience = ref('')
const posCategory = ref('')
const posClaim = ref('')
const posReason = ref('')

// 2. Beachhead Evaluator State
const beachheadCriteria = reactive([
  { title: 'Burning Pain', desc: 'Is problem urgent? Will they act now, not next quarter?', checked: false },
  { title: 'Strategic Value', desc: 'Will early customers generate strong references/case studies?', checked: false },
  { title: 'Market Health', desc: 'Does the segment have growth potential?', checked: false },
  { title: 'Proximity', desc: 'Does the team have connections or specific credibility here?', checked: false }
])

// 4. Funnel Friction State
const motivation = ref(50)
const friction = ref(50)
const concern = ref(50)

// 8. Key Takeaways Data
const takeaways = [
  "<strong>FOCUS</strong> is the single most important word. Expanding on success is achievable. Contracting on failure is catastrophic.",
  "Your brand starts with your founders. Execute consistently on one clear promise.",
  "Find your <strong>Minimum Viable Segment</strong> before scaling. A product for everyone is a product for no one.",
  "Qualify early and often. Ask why people didn't buy - it teaches more than win analyses.",
  "Inbound marketing compounds; outbound scales. Build owned assets for long-term leverage.",
  "The customer controls the accelerator, brake, and clutch. Design the funnel to make the next step obvious and motivated.",
  "Measure everything (ROME). Marketing with measurement is an investment, not an expense.",
  "AI is the present. GTM engineers building agents deliver 10x productivity gains today.",
  "The experience of being sold to is a differentiator. Design your buying journey like a product.",
  "Fix the biggest leak first. One 50% improvement at a bottleneck doubles downstream output."
]
</script>
