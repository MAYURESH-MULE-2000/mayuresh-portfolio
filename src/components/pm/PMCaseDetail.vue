<template>
  <div class="pm-case-detail max-w-7xl mx-auto">

    <!-- Header -->
    <div class="mb-10">
      <a href="/pm-cases" class="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-6">
        ← Back to PM 100
      </a>

      <div class="flex flex-wrap items-center gap-3 mb-4">
        <span class="px-3 py-1 text-xs font-bold rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 uppercase tracking-widest">
          {{ case_.series }}
        </span>
        <span class="px-3 py-1 text-xs font-bold rounded-full border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 uppercase tracking-widest">
          {{ case_.questionNumber }}
        </span>
        <span
          class="px-3 py-1 text-xs font-bold rounded-full uppercase tracking-widest"
          :class="{
            'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300': case_.difficulty === 'easy',
            'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300': case_.difficulty === 'mid',
            'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300': case_.difficulty === 'hard',
          }"
        >
          {{ case_.difficulty }}
        </span>
        <span class="text-xs text-gray-400 dark:text-gray-500">{{ case_.date }}</span>
      </div>

      <h1 class="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
        {{ case_.title }}
      </h1>
      <p class="text-gray-500 dark:text-gray-400 text-base">
        Company: <span class="font-semibold text-gray-700 dark:text-gray-300">{{ case_.company }}</span>
      </p>
    </div>

    <!-- Body: sidebar + scrollable content -->
    <div ref="bodyRef" class="flex flex-col lg:flex-row gap-8">

      <!-- Mobile: horizontal scrolling tabs -->
      <div class="lg:hidden overflow-x-auto pb-2 mb-2 sticky top-20 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md -mx-4 px-4 pt-2">
        <div class="flex gap-2 min-w-max">
          <button
            v-for="s in sections"
            :key="s.id"
            @click="scrollTo(s.id)"
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200"
            :class="activeSection === s.id
              ? 'bg-violet-600 text-white'
              : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400'"
          >
            <component :is="s.icon" class="w-3.5 h-3.5 shrink-0" />
            <span>{{ s.label }}</span>
          </button>
        </div>
      </div>

      <!-- Desktop: sticky sidebar -->
      <aside class="hidden lg:block lg:w-52 shrink-0">
        <nav class="sticky top-24">
          <p class="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3 px-3">Sections</p>

          <!-- Progress track -->
          <div class="relative">
            <!-- Vertical line (left-[17px] = px-3 12px + half dot 5px = dot center) -->
            <div class="absolute left-[17px] top-3 bottom-3 w-px bg-gray-100 dark:bg-white/5"></div>
            <!-- Active fill -->
            <div
              class="absolute left-[17px] top-3 w-px bg-violet-500 transition-all duration-300 origin-top"
              :style="{ height: progressHeight }"
            ></div>

            <ul class="space-y-1 relative">
              <li v-for="(s, i) in sections" :key="s.id">
                <button
                  @click="scrollTo(s.id)"
                  class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-left transition-all duration-200 group"
                  :class="activeSection === s.id
                    ? 'text-violet-600 dark:text-violet-400'
                    : 'text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white'"
                >
                  <!-- Dot indicator -->
                  <span
                    class="relative z-10 w-2.5 h-2.5 rounded-full border-2 shrink-0 transition-all duration-200"
                    :class="activeSection === s.id
                      ? 'border-violet-600 bg-violet-600 scale-125'
                      : isPassed(i)
                        ? 'border-violet-400 bg-violet-400'
                        : 'border-gray-300 dark:border-white/20 bg-white dark:bg-gray-900'"
                  ></span>
                  <span class="transition-all duration-200" :class="activeSection === s.id ? 'font-semibold' : ''">
                    {{ s.label }}
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      <!-- Scrollable main content — all sections stacked -->
      <div ref="contentRef" class="flex-1 min-w-0 space-y-16">

        <!-- 01 · GOAL -->
        <section :id="sections[0].id" class="scroll-mt-28">
          <SectionHeading icon="🎯" number="01" label="Goal" />
          <div class="space-y-4">
            <div class="p-5 rounded-2xl bg-violet-50 dark:bg-violet-900/20 border border-violet-100 dark:border-violet-800/30">
              <p class="text-xs font-bold uppercase tracking-widest text-violet-500 dark:text-violet-400 mb-2">Objective</p>
              <p class="text-gray-900 dark:text-white font-semibold text-lg leading-snug">{{ case_.goal.objective }}</p>
            </div>
            <div class="grid sm:grid-cols-2 gap-4">
              <div class="p-5 rounded-2xl border border-gray-100 dark:border-white/5 bg-white dark:bg-white/[0.02]">
                <p class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Measured By</p>
                <ul class="space-y-2">
                  <li v-for="(m, i) in case_.goal.measures" :key="i" class="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span class="mt-0.5 w-4 h-4 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 flex items-center justify-center text-[9px] font-bold shrink-0">{{ i + 1 }}</span>
                    {{ m }}
                  </li>
                </ul>
              </div>
              <div class="p-5 rounded-2xl border border-gray-100 dark:border-white/5 bg-white dark:bg-white/[0.02]">
                <p class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Why {{ case_.company }} Cares</p>
                <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{{ case_.goal.whyItMatters }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 02 · MARKET -->
        <section :id="sections[1].id" class="scroll-mt-28">
          <SectionHeading icon="📊" number="02" label="Market" />
          <p v-if="case_.market.context" class="text-sm text-gray-500 dark:text-gray-400 mb-5">{{ case_.market.context }}</p>
          <div class="space-y-2 mb-6">
            <div v-for="(step, i) in case_.market.funnel" :key="i"
              class="flex items-center gap-3 p-4 rounded-xl border border-gray-100 dark:border-white/5 bg-white dark:bg-white/[0.02]">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 text-white"
                :style="{ background: funnelColor(i) }">{{ i + 1 }}</div>
              <div class="flex-1 min-w-0">
                <p class="text-sm text-gray-600 dark:text-gray-400 truncate">{{ step.label }}</p>
              </div>
              <p class="text-sm font-bold text-gray-900 dark:text-white shrink-0">{{ step.value }}</p>
            </div>
          </div>
          <div v-if="case_.market.insight" class="p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30">
            <p class="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-1"><Lightbulb class="w-3.5 h-3.5 shrink-0" /> Insight</p>
            <p class="text-sm text-gray-700 dark:text-gray-300">{{ case_.market.insight }}</p>
          </div>
        </section>

        <!-- 03 · USERS -->
        <section :id="sections[2].id" class="scroll-mt-28">
          <SectionHeading icon="👥" number="03" label="Users" />
          <div class="space-y-3 mb-6">
            <div v-for="(seg, i) in case_.users.segments" :key="i"
              class="p-5 rounded-2xl border border-gray-100 dark:border-white/5 bg-white dark:bg-white/[0.02]">
              <div class="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white">{{ seg.name }}</p>
                  <p class="text-xs text-gray-400 mt-0.5">{{ seg.who }}</p>
                </div>
                <span class="px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider shrink-0"
                  :class="{
                    'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400': seg.wtp === 'High',
                    'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400': seg.wtp === 'Medium',
                    'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400': seg.wtp === 'Low',
                  }">WTP: {{ seg.wtp }}</span>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                <span class="font-medium text-gray-700 dark:text-gray-300">Core Need:</span> {{ seg.coreNeed }}
              </p>
            </div>
          </div>
          <div class="p-4 rounded-2xl bg-violet-50 dark:bg-violet-900/20 border border-violet-100 dark:border-violet-800/30">
            <p class="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-violet-500 dark:text-violet-400 mb-1"><Target class="w-3.5 h-3.5 shrink-0" /> Focus Segment</p>
            <p class="text-sm text-gray-700 dark:text-gray-300">{{ case_.users.focus }}</p>
          </div>
        </section>

        <!-- 04 · PAIN POINTS -->
        <section :id="sections[3].id" class="scroll-mt-28">
          <SectionHeading icon="😤" number="04" label="Pain Points" />
          <div class="space-y-3">
            <div v-for="(pain, i) in case_.pains" :key="i"
              class="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 dark:border-white/5 bg-white dark:bg-white/[0.02]">
              <span class="px-2.5 py-1 text-[10px] font-black rounded-lg uppercase tracking-wider shrink-0 mt-0.5"
                :class="{
                  'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400': pain.priority === 'P0',
                  'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400': pain.priority === 'P1',
                  'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400': pain.priority === 'P2',
                }">{{ pain.priority }}</span>
              <div class="flex-1 min-w-0">
                <p class="font-semibold text-gray-900 dark:text-white text-sm mb-2">{{ pain.title }}</p>
                <div class="flex gap-4 text-xs text-gray-400">
                  <span>Frequency: <span class="font-medium text-gray-600 dark:text-gray-300">{{ pain.frequency }}</span></span>
                  <span>Severity: <span class="font-medium text-gray-600 dark:text-gray-300">{{ pain.severity }}</span></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 05 · PRIORITY -->
        <section :id="sections[4].id" class="scroll-mt-28">
          <SectionHeading icon="⚖️" number="05" label="Priority" />
          <p class="text-xs text-gray-400 mb-4">RICE framework: (Reach × Impact × Confidence) / Effort</p>
          <div class="overflow-x-auto rounded-2xl border border-gray-100 dark:border-white/5 mb-6">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-100 dark:border-white/5">
                  <th class="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">Feature</th>
                  <th class="text-center px-3 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">R</th>
                  <th class="text-center px-3 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">I</th>
                  <th class="text-center px-3 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">C</th>
                  <th class="text-center px-3 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">E</th>
                  <th class="text-right px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">Score</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(f, i) in sortedFeatures" :key="i"
                  class="border-b border-gray-50 dark:border-white/[0.03] last:border-0 hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                  :class="i === 0 ? 'bg-violet-50/50 dark:bg-violet-900/10' : ''">
                  <td class="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">
                    <Star v-if="i === 0" class="inline w-3.5 h-3.5 text-violet-500 mr-1.5 -mt-0.5" />{{ f.name }}
                  </td>
                  <td class="px-3 py-3 text-center text-gray-500 dark:text-gray-400">{{ f.reach }}</td>
                  <td class="px-3 py-3 text-center text-gray-500 dark:text-gray-400">{{ f.impact }}x</td>
                  <td class="px-3 py-3 text-center text-gray-500 dark:text-gray-400">{{ Math.round(f.confidence * 100) }}%</td>
                  <td class="px-3 py-3 text-center text-gray-500 dark:text-gray-400">{{ f.effort }}m</td>
                  <td class="px-4 py-3 text-right font-bold" :class="i === 0 ? 'text-violet-600 dark:text-violet-400' : 'text-gray-700 dark:text-gray-300'">
                    {{ f.score }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="p-4 rounded-2xl bg-violet-50 dark:bg-violet-900/20 border border-violet-100 dark:border-violet-800/30">
            <p class="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-violet-500 dark:text-violet-400 mb-1"><Rocket class="w-3.5 h-3.5 shrink-0" /> MVP Decision</p>
            <p class="text-sm text-gray-700 dark:text-gray-300">{{ case_.features.mvpDecision }}</p>
          </div>
        </section>

        <!-- 06 · SOLUTION -->
        <section :id="sections[5].id" class="scroll-mt-28">
          <SectionHeading icon="🛠️" number="06" label="Solution" />
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-bold mb-6">
<span>{{ case_.solution.name }}</span>
          </div>
          <div class="space-y-4">
            <div v-for="(feat, i) in case_.solution.features" :key="i"
              class="p-5 rounded-2xl border border-gray-100 dark:border-white/5 bg-white dark:bg-white/[0.02]">
              <div class="flex items-start gap-3">
                <div class="w-7 h-7 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {{ i + 1 }}
                </div>
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white mb-1.5">{{ feat.title }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{{ feat.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 07 · METRICS -->
        <section :id="sections[6].id" class="scroll-mt-28">
          <SectionHeading icon="📈" number="07" label="Metrics" />
          <div class="p-5 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 text-white mb-6">
            <p class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest opacity-80 mb-2"><Star class="w-3 h-3 shrink-0" /> North Star Metric</p>
            <p class="font-semibold text-base leading-snug">{{ case_.metrics.northStar }}</p>
          </div>
          <div class="overflow-x-auto rounded-2xl border border-gray-100 dark:border-white/5 mb-6">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-100 dark:border-white/5">
                  <th class="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">Type</th>
                  <th class="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">Metric</th>
                  <th class="text-right px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">Target</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(t, i) in case_.metrics.targets" :key="i"
                  class="border-b border-gray-50 dark:border-white/[0.03] last:border-0 hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                  <td class="px-4 py-3">
                    <span class="px-2 py-0.5 text-[10px] font-bold rounded bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 uppercase tracking-wide">{{ t.type }}</span>
                  </td>
                  <td class="px-4 py-3 text-gray-600 dark:text-gray-400">{{ t.metric }}</td>
                  <td class="px-4 py-3 text-right font-bold text-emerald-600 dark:text-emerald-400">{{ t.target }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="p-5 rounded-2xl border border-red-100 dark:border-red-800/30 bg-red-50 dark:bg-red-900/10">
            <p class="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-red-500 dark:text-red-400 mb-3"><OctagonX class="w-3.5 h-3.5 shrink-0" /> Guardrails — stop shipping if:</p>
            <ul class="space-y-2">
              <li v-for="(g, i) in case_.metrics.guardrails" :key="i" class="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <X class="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />{{ g }}
              </li>
            </ul>
          </div>
        </section>

        <!-- 08 · RISKS -->
        <section :id="sections[7].id" class="scroll-mt-28">
          <SectionHeading icon="⚠️" number="08" label="Risks" />
          <div class="space-y-3">
            <div v-for="(r, i) in case_.risks" :key="i"
              class="p-5 rounded-2xl border border-gray-100 dark:border-white/5 bg-white dark:bg-white/[0.02]">
              <div class="flex items-start justify-between gap-4 mb-2">
                <p class="font-semibold text-gray-900 dark:text-white text-sm">{{ r.risk }}</p>
                <span class="px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider shrink-0"
                  :class="{
                    'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400': r.likelihood === 'High',
                    'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400': r.likelihood === 'Medium',
                    'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400': r.likelihood === 'Low',
                  }">{{ r.likelihood }}</span>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 flex items-start gap-1.5">
                <Check class="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />{{ r.mitigation }}
              </p>
            </div>
          </div>
        </section>

        <!-- Summary -->
        <div v-if="case_.summary" class="pb-8">
          <div class="p-6 rounded-2xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5">
            <p class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Summary</p>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed italic">{{ case_.summary }}</p>
          </div>
        </div>

        <!-- Sentinel: when this enters viewport the PM case is "done" → restore sidebars -->
        <div ref="endSentinel" class="h-px w-full"></div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, h } from 'vue'
import {
  Target, BarChart2, Users, AlertCircle, Scale, Wrench, TrendingUp, AlertTriangle,
  Lightbulb, Rocket, Star, OctagonX, X, Check
} from 'lucide-vue-next'

// ── Inline sub-component to avoid repetition ─────────────────────────────────
const SectionHeading = (props) =>
  h('div', { class: 'flex items-center gap-3 mb-6' }, [
    h(props.icon, { class: 'w-5 h-5 text-violet-500 dark:text-violet-400 shrink-0' }),
    h('p', { class: 'text-[10px] font-bold uppercase tracking-widest text-violet-500 dark:text-violet-400' },
      `${props.number} · ${props.label}`)
  ])

// ── Props ────────────────────────────────────────────────────────────────────
const props = defineProps({
  case_: { type: Object, required: true },
})

// ── Section definitions ───────────────────────────────────────────────────────
const sections = [
  { id: 'goal',     icon: Target,        label: 'Goal'        },
  { id: 'market',   icon: BarChart2,     label: 'Market'      },
  { id: 'users',    icon: Users,         label: 'Users'       },
  { id: 'pains',    icon: AlertCircle,   label: 'Pain Points' },
  { id: 'priority', icon: Scale,         label: 'Priority'    },
  { id: 'solution', icon: Wrench,        label: 'Solution'    },
  { id: 'metrics',  icon: TrendingUp,    label: 'Metrics'     },
  { id: 'risks',    icon: AlertTriangle, label: 'Risks'       },
]

// ── Active section (driven by scroll) ────────────────────────────────────────
const activeSection = ref(sections[0].id)
const activeIndex = computed(() => sections.findIndex(s => s.id === activeSection.value))

// Progress line height for the sidebar track
const progressHeight = computed(() => {
  const idx = activeIndex.value
  if (idx <= 0) return '0px'
  // Each item is ~40px tall (py-2 + gap-1 ≈ 40px), offset from top dot
  return `${idx * 40}px`
})

function isPassed(index) {
  return index < activeIndex.value
}

// ── Scroll to section ─────────────────────────────────────────────────────────
function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// ── Dispatch pmcase-reading event so sidebars can slide out/in ───────────────
function dispatchReading(active) {
  window.dispatchEvent(new CustomEvent('pmcase-reading', { detail: { active } }))
}

const endSentinel = ref(null)
const bodyRef = ref(null)
let endSentinelVisible = false
let bodyVisible = false
let endObserver = null
let bodyObserver = null

function updateReadingState() {
  // Hide sidebars only when the body content area is visible AND end sentinel not reached
  dispatchReading(bodyVisible && !endSentinelVisible)
}

// ── IntersectionObserver — highlight sidebar as sections enter view ───────────
let observer = null

onMounted(() => {
  // Body observer: hide sidebars when the PM case body content enters the viewport
  bodyObserver = new IntersectionObserver(
    (entries) => {
      bodyVisible = entries[0].isIntersecting
      updateReadingState()
    },
    { threshold: 0 }
  )
  if (bodyRef.value) bodyObserver.observe(bodyRef.value)

  // End sentinel: when it enters the viewport the PM case is over → restore sidebars
  endObserver = new IntersectionObserver(
    (entries) => {
      endSentinelVisible = entries[0].isIntersecting
      updateReadingState()
    },
    { threshold: 0 }
  )
  if (endSentinel.value) endObserver.observe(endSentinel.value)

  observer = new IntersectionObserver(
    (entries) => {
      // Pick the entry that is most visible (largest intersection ratio)
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

      if (visible.length > 0) {
        activeSection.value = visible[0].target.id
      }
    },
    {
      // Fire when each section is ~20% into view, using top 60% of viewport
      rootMargin: '-80px 0px -40% 0px',
      threshold: [0, 0.1, 0.25, 0.5],
    }
  )

  sections.forEach(s => {
    const el = document.getElementById(s.id)
    if (el) observer.observe(el)
  })
})

onUnmounted(() => {
  observer?.disconnect()
  endObserver?.disconnect()
  bodyObserver?.disconnect()
  dispatchReading(false) // always restore sidebars on unmount
})

// ── Utilities ─────────────────────────────────────────────────────────────────
const sortedFeatures = computed(() =>
  [...(props.case_?.features?.items ?? [])].sort((a, b) => b.score - a.score)
)

function funnelColor(index) {
  const colors = ['#7c3aed', '#8b5cf6', '#a78bfa', '#c4b5fd']
  return colors[Math.min(index, colors.length - 1)]
}
</script>
