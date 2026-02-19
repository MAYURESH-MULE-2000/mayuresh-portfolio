<template>
  <div class="learn-soft min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn" class="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4">
        ← Back to Topics
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">🤝</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Soft Skills for Seniors</h1>
      </div>
      <p class="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        Coding is only 50% of the job. Mentoring, estimation, communication, and saying "No" is what gets you promoted.
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
        <!-- ==================== MENTORING ==================== -->
         <template v-if="activeSection === 'lead'">
          <ConceptCard
            id="mentorship"
            icon="🌱"
            title="Mentoring & Growth"
            subtitle="Scaling yourself"
            definition="Senior engineers multiply their impact by mentoring juniors. It's not about doing everything yourself; it's about unblocking others and teaching them how to fish."
            seniorTip="Don't just give answers. Ask guiding questions: 'What happens if the network is slow here?' or 'How would we test this edge case?'. Let them arrive at the solution."
            defaultOpen
          >
             <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
                 <h4 class="font-bold text-red-600 mb-2">❌ Micro-manager</h4>
                 <ul class="text-xs space-y-1 text-gray-600">
                    <li>"Move that div there."</li>
                    <li>"Just paste this code."</li>
                    <li>"Let me do it, it's faster."</li>
                 </ul>
               </div>
               <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                 <h4 class="font-bold text-emerald-600 mb-2">✅ Mentor</h4>
                 <ul class="text-xs space-y-1 text-gray-600">
                    <li>"Why did you choose Flexbox?"</li>
                    <li>"Have you considered accessibility?"</li>
                    <li>"Let's pair program on the hard part."</li>
                 </ul>
               </div>
             </div>
          </ConceptCard>

          <ConceptCard
            id="saying-no"
            icon="🛑"
            title="The Art of Saying No"
            subtitle="Protecting the team"
            definition="You must push back on unrealistic deadlines or feature creep. 'No' is not negative; it's a constraint that forces prioritization."
          >
             <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5 space-y-2 text-sm italic">
                <p>"We can do X, but it will delay Y by 2 days. Which is higher priority?"</p>
                <p>"If we skip testing to ship Friday, we risk a bug in production over the weekend. I recommend shipping Monday."</p>
             </div>
          </ConceptCard>
        </template>

        <!-- ==================== ESTIMATION ==================== -->
        <template v-if="activeSection === 'process'">
          <ConceptCard
            id="estimation"
            icon="⏱️"
            title="Estimation & Breakdown"
            subtitle="Under-promise, Over-deliver"
            definition="Break tasks down into &lt; 1 day chunks. Add buffers for: Code Review, QA, Deployment, Context Switching. A '2 day task' is usually 4 days in reality."
            analogy="Building a lego set: If you look at the box, it looks fast. If you count the 1000 pieces and the finding time, it takes all Sunday."
            seniorTip="Use T-Shirt sizing (S, M, L) initially. Only commit to precise hours when the task is fully specced. If you discover complexity mid-sprint, communicate IMMEDIATELY."
          >
             <CodePlayground title="breakdown.md" :initialCode="codes.breakdown" />
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
  { id: 'lead', label: 'Leadership', icon: '🌱', badge: 'Core' },
  { id: 'process', label: 'Process', icon: '⏱️', badge: 'Agile' },
]

const activeSection = ref('lead')

function setSection(id) {
  activeSection.value = id
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const codes = {
  breakdown: `<!-- ⏱️ Task Estimation Example -->

Feature: "Add Dark Mode Logic"

❌ JUNIOR ESTIMATE: 
- "Add CSS toggle": 2 hours
Total: 2 hours

✅ SENIOR BREAKDOWN:
1. Research/Plan (Context API choice): 2h
2. Create/Update Theme Context: 4h
3. Update Tailwind Config: 1h
4. Fix obscure hardcoded colors (Legacy): 4h
5. Add Toggle Component + Unit Test: 3h
6. QA / Check contrast ratios: 2h
7. PR Review buffer: 2h

Total Estimate: ~2.5 Days`
}
</script>
