<template>
  <div class="learn-pm min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn" class="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4">
        ← Back to Topics
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">🎯</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Product Management Fundamentals</h1>
      </div>
      <p class="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        Master the core truth of PM: Solve Customer Problems & Achieve Business Outcomes. Learn the PDLC, Product Sense, and Active Recall strategies.
      </p>
    </div>

    <!-- Layout: Nav + Content -->
    <div class="px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 pb-16">
      <SectionNav
        :sections="sections"
        :activeSection="activeSection"
        activeColor="bg-purple-500"
        @select="setSection"
        class="lg:w-56 flex-shrink-0"
      />

      <div class="flex-1 min-w-0 space-y-8">
        
        <!-- ==================== CORE FUNDAMENTALS ==================== -->
        <template v-if="activeSection === 'core'">
          <div class="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden group">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>
            
            <div class="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">⭐</div>
            
            <h2 class="text-3xl md:text-4xl font-bold mb-4 tracking-tight">The Job of a Product Manager</h2>
            <p class="text-indigo-200 mb-10 max-w-lg mx-auto">If you ever feel overwhelmed or confused, return to this truth.</p>
            
            <div class="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/20 transition-all transform hover:-translate-y-1">
                <div class="text-sm font-bold tracking-wider text-pink-400 uppercase mb-2">Primary Goal</div>
                <div class="text-2xl font-bold">Solve Customer Problems</div>
                <div class="text-sm text-indigo-200 mt-2">The "Why"</div>
              </div>
              
              <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/20 transition-all transform hover:-translate-y-1">
                 <div class="text-sm font-bold tracking-wider text-emerald-400 uppercase mb-2">Secondary Goal</div>
                 <div class="text-2xl font-bold">Achieve Business Outcomes</div>
                 <div class="text-sm text-indigo-200 mt-2">The "Value"</div>
              </div>
            </div>
            
            <div class="mt-10 text-indigo-300 text-sm">
              <p>Everything else - roadmaps, tickets, meetings - is just a <span class="text-white font-bold decoration-dotted underline cursor-help" title="Don't confuse activity with productivity">method</span>.</p>
            </div>
          </div>
        </template>

        <!-- ==================== PDLC ==================== -->
        <template v-if="activeSection === 'pdlc'">
          <!-- Phase A: Discovery -->
          <div class="space-y-6">
            <div class="border-l-4 border-amber-500 pl-6">
              <span class="text-xs font-bold text-amber-500 uppercase tracking-widest">Phase A</span>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-1">Product Discovery</h3>
              <p class="text-gray-500">The "What" and "Why" - Narrowing solutions into a roadmap.</p>
            </div>

            <div class="grid md:grid-cols-3 gap-4">
               <div class="bg-amber-50 dark:bg-amber-900/10 p-5 rounded-xl border border-amber-100 dark:border-amber-800/30">
                  <div class="text-2xl mb-2">💡</div>
                  <h4 class="font-bold text-amber-900 dark:text-amber-100">Idea Bucket</h4>
                  <p class="text-sm text-amber-700 dark:text-amber-400 mt-1 leading-relaxed">Collect inputs from Market, Users, and Stakeholders. Cast a wide net.</p>
               </div>
               
               <div class="bg-amber-50 dark:bg-amber-900/10 p-5 rounded-xl border border-amber-100 dark:border-amber-800/30 relative overflow-hidden">
                  <div class="text-2xl mb-2">🚦</div>
                  <h4 class="font-bold text-amber-900 dark:text-amber-100">Validation</h4>
                  <p class="text-sm text-amber-700 dark:text-amber-400 mt-1 leading-relaxed">Filter by Value, Usability, Feasibility, Viability.</p>
               </div>
               
               <div class="bg-amber-50 dark:bg-amber-900/10 p-5 rounded-xl border border-amber-100 dark:border-amber-800/30">
                  <div class="text-2xl mb-2">🗺️</div>
                  <h4 class="font-bold text-amber-900 dark:text-amber-100">Roadmap</h4>
                  <p class="text-sm text-amber-700 dark:text-amber-400 mt-1 leading-relaxed">The high-level alignment tool. The Output of Discovery.</p>
               </div>
            </div>

            <!-- Validation Checklist -->
            <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
               <h4 class="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                 <span class="w-2 h-6 bg-amber-500 rounded-full"></span>
                 Risk Validation Checklist
               </h4>
               <div class="grid sm:grid-cols-2 gap-3">
                  <label v-for="(checked, key) in risks" :key="key" 
                    class="flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all"
                    :class="checked ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-amber-300'"
                  >
                    <input type="checkbox" v-model="risks[key]" class="mt-1 w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500">
                    <div>
                       <span class="block font-medium text-sm capitalize" :class="checked ? 'text-emerald-900 dark:text-emerald-100' : 'text-gray-700 dark:text-gray-300'">{{key}} Risk</span>
                       <span class="text-xs text-gray-500 dark:text-gray-400" v-if="key === 'value'">Do users want it?</span>
                       <span class="text-xs text-gray-500 dark:text-gray-400" v-if="key === 'usability'">Can they use it?</span>
                       <span class="text-xs text-gray-500 dark:text-gray-400" v-if="key === 'feasibility'">Can we build it?</span>
                       <span class="text-xs text-gray-500 dark:text-gray-400" v-if="key === 'viability'">Business sense?</span>
                    </div>
                  </label>
               </div>
               <div v-if="Object.values(risks).every(Boolean)" class="mt-4 p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 text-sm font-medium rounded-lg text-center animate-pulse">
                  🚀 Green Light! This idea is ready for the roadmap.
               </div>
            </div>

            <!-- Phase B: Delivery -->
            <div class="mt-12 border-l-4 border-blue-500 pl-6">
               <span class="text-xs font-bold text-blue-500 uppercase tracking-widest">Phase B</span>
               <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-1">Product Delivery</h3>
               <p class="text-gray-500">The "How" - Converting roadmap into software.</p>
            </div>
            
            <div class="relative pl-4 space-y-8 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200 dark:before:bg-gray-700">
               <div class="relative">
                  <span class="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-white dark:ring-gray-900"></span>
                  <h4 class="font-bold text-gray-900 dark:text-white">PRD (Spec)</h4>
                  <p class="text-sm text-gray-500">Explains the feature in detail. The "Blueprint".</p>
               </div>
               <div class="relative">
                  <span class="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-white dark:ring-gray-900"></span>
                  <h4 class="font-bold text-gray-900 dark:text-white">Backlog</h4>
                  <p class="text-sm text-gray-500">Prioritized list of Epics, Stories, and Tasks.</p>
               </div>
               <div class="relative">
                  <span class="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-white dark:ring-gray-900"></span>
                  <h4 class="font-bold text-gray-900 dark:text-white">Execution (Sprints)</h4>
                  <p class="text-sm text-gray-500">2-4 week cycles. Standups. Testing (Alpha/Beta).</p>
               </div>
            </div>
          </div>
        </template>

        <!-- ==================== PRODUCT SENSE ==================== -->
        <template v-if="activeSection === 'sense'">
          <div class="mb-8">
             <div class="bg-indigo-50 dark:bg-indigo-900/10 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800/30 mb-8">
                <h3 class="text-xl font-bold text-indigo-900 dark:text-indigo-100 mb-2">What is Product Sense?</h3>
                <p class="text-indigo-800 dark:text-indigo-300 leading-relaxed">It's accurately predicting what users and the market will value. It requires moving from the <span class="font-bold border-b-2 border-indigo-400">Problem Space</span> to the <span class="font-bold border-b-2 border-indigo-400">Solution Space</span>.</p>
                <div class="mt-4 text-sm font-medium text-pink-500">
                   ⚠️ Pro-Tip: Never jump straight to solutions. Spend 80% of your time understanding the problem.
                </div>
             </div>
             
             <PMCanvas 
               title="7-Step Framework Builder"
               subtitle="Systematically break down ambiguity. Fill this out for any interview question or feature idea."
               v-model:modelValue="frameworkFields"
             />
          </div>
        </template>

        <!-- ==================== ACTIVE RECALL ==================== -->
        <template v-if="activeSection === 'recall'">
           <div class="space-y-6">
              <div class="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                 <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">The 10-Minute Rule</h3>
                 <p class="text-gray-500 mb-4">To make learning stick, you must retrieve it from your brain. Do this after every session.</p>
                 <div class="flex gap-2 mb-6">
                    <span class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs font-medium">1. Write 5 Ideas</span>
                    <span class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs font-medium">2. Rebuild Framework</span>
                    <span class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs font-medium">3. Self-Test</span>
                 </div>
                 
                 <PMCanvas 
                   title="Brain Dump"
                   subtitle="Close your notes. List 5 key ideas you learned today."
                   v-model:modelValue="recallFields"
                 />
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
import PMCanvas from './PMCanvas.vue'

// ==================== Section Navigation ====================
const sections = [
  { id: 'core', label: 'Core Truth', icon: '⭐', badge: '1' },
  { id: 'pdlc', label: 'PDLC', icon: '🔄', badge: '3' },
  { id: 'sense', label: 'Product Sense', icon: '🧠', badge: '1' },
  { id: 'recall', label: 'Active Recall', icon: '📝', badge: '1' },
]

const activeSection = ref('core')

function setSection(id) {
  activeSection.value = id
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// ==================== Interactive State ====================

// Risk Validation Checklist
const risks = reactive({
  value: false,
  usability: false,
  feasibility: false,
  viability: false
})

// 7-Step Framework
const frameworkFields = ref([
  { label: '1. Context & Goals', placeholder: 'What is the business trying to achieve? (e.g., Retention vs Revenue)', value: '', rows: 2 },
  { label: '2. Identify Users', placeholder: 'Who are we solving for? (Create personas)', value: '', rows: 2 },
  { label: '3. Find Problems', placeholder: 'What are their pains and desires?', value: '', rows: 2 },
  { label: '4. Prioritize Problems', placeholder: 'Which gap has the highest leverage/impact?', value: '', rows: 2 },
  { label: '5. Explore Solutions', placeholder: 'Brainstorm creative ways to solve it.', value: '', rows: 2 },
  { label: '6. Prioritize Solutions', placeholder: 'Which solution offers best Impact vs Effort?', value: '', rows: 2 },
  { label: '7. Define Metrics', placeholder: 'How will we measure success?', value: '', rows: 2 }
])

// Active Recall
const recallFields = ref([
  { label: 'Key Idea 1', placeholder: 'Recall from memory...', value: '', rows: 2 },
  { label: 'Key Idea 2', placeholder: 'Recall from memory...', value: '', rows: 2 },
  { label: 'Key Idea 3', placeholder: 'Recall from memory...', value: '', rows: 2 },
  { label: 'Key Idea 4', placeholder: 'Recall from memory...', value: '', rows: 2 },
  { label: 'Key Idea 5', placeholder: 'Recall from memory...', value: '', rows: 2 }
])
</script>
