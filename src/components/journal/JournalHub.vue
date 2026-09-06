<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock,
  Feather,
  Sparkles,
} from 'lucide-vue-next'
import { observeReveals } from '../../lib/reveal'

const props = defineProps({
  series: { type: Object, required: true },
  entries: { type: Array, default: () => [] },
})

const root = ref(null)
let stopReveals = null

/** Title words animate in one by one on mount. */
const titleWords = computed(() => props.series.title.split(' '))
const titleReady = ref(false)

const daysWritten = computed(() => props.entries.length)
const goalDays = computed(() => props.series.goalDays)

/** Day 0 is the intro, so the 21-day run is days 1..21. */
const trackerDays = computed(() => {
  const published = new Set(props.entries.map((entry) => entry.day))
  return Array.from({ length: goalDays.value }, (_, i) => {
    const day = i + 1
    const entry = props.entries.find((e) => e.day === day)
    return { day, done: published.has(day), slug: entry?.slug ?? null }
  })
})

const daysDone = computed(() => trackerDays.value.filter((d) => d.done).length)
const percent = computed(() => Math.round((daysDone.value / goalDays.value) * 100))

const wordCount = computed(() =>
  props.entries.reduce((total, entry) => total + (entry.words?.length ?? 0), 0),
)

const allWords = computed(() =>
  props.entries.flatMap((entry) => entry.words ?? []).slice(0, 12),
)

const latest = computed(() => props.entries[0] ?? null)

/** Counts a number up once the hub mounts - small bit of life on the stats. */
const counters = ref({ days: 0, goal: 0, words: 0 })

function countTo(key, target, duration = 900) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced || target === 0) {
    counters.value[key] = target
    return
  }
  const start = performance.now()
  const step = (now) => {
    const t = Math.min(1, (now - start) / duration)
    const eased = 1 - Math.pow(1 - t, 3)
    counters.value[key] = Math.round(target * eased)
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

const hoveredDay = ref(null)

onMounted(() => {
  stopReveals = observeReveals(root.value ?? document)
  requestAnimationFrame(() => {
    titleReady.value = true
  })
  countTo('days', daysWritten.value)
  countTo('goal', goalDays.value)
  countTo('words', wordCount.value)
})

onUnmounted(() => {
  if (stopReveals) stopReveals()
})
</script>

<template>
  <div ref="root" class="relative">
    <!-- Ambient blobs -->
    <div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div
        class="journal-drift absolute -top-24 -left-16 h-72 w-72 rounded-full bg-teal-400/10 dark:bg-teal-400/[0.07] blur-3xl"
      ></div>
      <div
        class="journal-drift absolute top-40 -right-20 h-80 w-80 rounded-full bg-amber-400/10 dark:bg-amber-300/[0.06] blur-3xl"
        style="animation-delay: -5s"
      ></div>
    </div>

    <!-- ═══════════════ HERO ═══════════════ -->
    <section class="pt-4 pb-16 md:pb-20">
      <!-- Eyebrow -->
      <div class="flex items-center gap-3 mb-6">
        <span
          class="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-bold rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 uppercase tracking-widest"
        >
          <span class="relative flex h-2 w-2">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"
            ></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
          </span>
          Day {{ latest ? latest.day : 0 }} is live
        </span>
        <span class="text-xs text-gray-400 dark:text-gray-500 tracking-wide">The journal</span>
      </div>

      <!-- Series title, word by word -->
      <h1
        class="text-4xl md:text-6xl font-bold leading-[1.08] tracking-tight max-w-4xl text-primary-black dark:text-primary-white"
      >
        <span
          v-for="(word, i) in titleWords"
          :key="`${word}-${i}`"
          class="inline-block mr-[0.28em] transition-all duration-700 ease-out"
          :class="titleReady ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-4 blur-[6px]'"
          :style="{ transitionDelay: `${i * 70}ms` }"
        >{{ word }}</span>
        <span
          class="journal-cursor inline-block w-[3px] h-[0.85em] align-[-0.08em] bg-teal-500 rounded-full"
          aria-hidden="true"
        ></span>
      </h1>

      <!-- Tagline -->
      <p
        class="mt-6 text-lg md:text-2xl italic text-gray-500 dark:text-gray-400 max-w-2xl transition-all duration-700 ease-out"
        :class="titleReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'"
        :style="{ transitionDelay: `${titleWords.length * 70 + 120}ms` }"
      >
        {{ series.tagline }}
      </p>

      <p
        class="mt-6 text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed"
        data-reveal
        data-reveal-delay="120"
      >
        {{ series.description }}
      </p>

      <!-- CTA -->
      <div class="mt-9 flex flex-wrap items-center gap-4" data-reveal data-reveal-delay="200">
        <a
          v-if="latest"
          :href="`/journal/${latest.slug}`"
          class="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-primary-black dark:bg-primary-white text-primary-white dark:text-primary-black font-semibold text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-white/10"
        >
          <BookOpen :size="18" class="transition-transform duration-500 group-hover:rotate-[-8deg]" />
          Start reading: Day {{ latest.day }}
          <ArrowRight
            :size="18"
            class="transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
        <a
          href="#days"
          class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-base hover:border-primary-black dark:hover:border-primary-white hover:text-primary-black dark:hover:text-primary-white transition-all duration-300"
        >
          All entries
        </a>
      </div>
    </section>

    <!-- ═══════════════ TRACKER ═══════════════ -->
    <section
      class="rounded-3xl border border-gray-200/80 dark:border-gray-800 bg-white/70 dark:bg-white/[0.02] backdrop-blur-sm p-7 md:p-10"
      data-reveal
    >
      <div class="flex flex-wrap items-end justify-between gap-6 mb-8">
        <div>
          <h2 class="text-xl md:text-2xl font-bold text-primary-black dark:text-primary-white">
            The 21-day run
          </h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1.5">
            Day 0 is the intro. The streak starts at Day 1.
          </p>
        </div>

        <!-- Stats -->
        <div class="flex items-center gap-7 md:gap-9">
          <div>
            <div class="text-3xl md:text-4xl font-bold tabular-nums text-primary-black dark:text-primary-white">
              {{ counters.days }}
            </div>
            <div class="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mt-1">
              Entries
            </div>
          </div>
          <div class="w-px h-10 bg-gray-200 dark:bg-gray-800"></div>
          <div>
            <div class="text-3xl md:text-4xl font-bold tabular-nums text-primary-black dark:text-primary-white">
              {{ counters.goal }}
            </div>
            <div class="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mt-1">
              Day goal
            </div>
          </div>
          <div class="w-px h-10 bg-gray-200 dark:bg-gray-800"></div>
          <div>
            <div class="text-3xl md:text-4xl font-bold tabular-nums text-primary-black dark:text-primary-white">
              {{ counters.words }}
            </div>
            <div class="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mt-1">
              Words learned
            </div>
          </div>
        </div>
      </div>

      <!-- Day dots -->
      <div class="relative">
        <div class="flex flex-wrap gap-2.5">
          <component
            v-for="(item, i) in trackerDays"
            :is="item.slug ? 'a' : 'div'"
            :key="item.day"
            :href="item.slug ? `/journal/${item.slug}` : undefined"
            class="relative grid place-items-center h-10 w-10 rounded-xl text-xs font-bold tabular-nums transition-all duration-300"
            :class="item.done
              ? 'bg-primary-black dark:bg-primary-white text-primary-white dark:text-primary-black hover:-translate-y-1 hover:shadow-lg'
              : 'border border-dashed border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-600 hover:border-gray-400 dark:hover:border-gray-600 hover:text-gray-500 dark:hover:text-gray-500'"
            :style="{ transitionDelay: `${i * 12}ms` }"
            @mouseenter="hoveredDay = item.day"
            @mouseleave="hoveredDay = null"
            @focus="hoveredDay = item.day"
            @blur="hoveredDay = null"
          >
            {{ item.day }}
            <span
              v-if="hoveredDay === item.day"
              class="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-primary-black dark:bg-primary-white px-2.5 py-1 text-[10px] font-semibold text-primary-white dark:text-primary-black shadow-lg"
            >
              {{ item.done ? 'Written' : 'Not yet' }}
            </span>
          </component>
        </div>

        <!-- Progress bar -->
        <div class="mt-7 flex items-center gap-4">
          <div class="h-1.5 flex-1 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
            <div
              class="h-full rounded-full bg-gradient-to-r from-teal-400 to-teal-600 transition-[width] duration-1000 ease-out"
              :style="{ width: `${Math.max(percent, 1.5)}%` }"
            ></div>
          </div>
          <span class="text-xs font-semibold tabular-nums text-gray-500 dark:text-gray-400">
            {{ daysDone }}/{{ goalDays }}
          </span>
        </div>
      </div>
    </section>

    <!-- ═══════════════ ENTRIES ═══════════════ -->
    <section id="days" class="pt-20 md:pt-24 scroll-mt-28">
      <div class="mb-10 md:mb-12" data-reveal>
        <h2 class="text-3xl md:text-4xl font-bold text-primary-black dark:text-primary-white">
          Every entry
        </h2>
        <p class="text-gray-600 dark:text-gray-400 text-lg mt-2 max-w-2xl">
          Newest first. Some days are progress, some days are a mess. Both get written down.
        </p>
      </div>

      <div class="space-y-5">
        <a
          v-for="(entry, i) in entries"
          :key="entry.slug"
          :href="`/journal/${entry.slug}`"
          class="group relative block overflow-hidden rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-primary-black p-7 md:p-9 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-700"
          data-reveal
          :data-reveal-delay="i * 90"
        >
          <!-- Hover wash -->
          <span
            class="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-teal-500/[0.05] to-transparent"
            aria-hidden="true"
          ></span>

          <div class="relative flex flex-col md:flex-row md:items-center gap-6 md:gap-9">
            <!-- Day number -->
            <div class="flex-shrink-0">
              <div
                class="grid h-20 w-20 place-items-center rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-white/[0.03] transition-all duration-500 group-hover:border-teal-400/60 group-hover:bg-teal-50 dark:group-hover:bg-teal-500/10"
              >
                <span class="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  Day
                </span>
                <span
                  class="text-3xl font-bold leading-none tabular-nums text-primary-black dark:text-primary-white"
                >
                  {{ entry.day }}
                </span>
              </div>
            </div>

            <!-- Copy -->
            <div class="flex-1 min-w-0">
              <div class="flex flex-wrap items-center gap-2 mb-3">
                <span
                  v-if="entry.mood"
                  class="inline-flex items-center gap-1.5 rounded-full bg-gray-100 dark:bg-white/[0.06] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-600 dark:text-gray-300"
                >
                  <Feather :size="11" />
                  {{ entry.mood }}
                </span>
                <span
                  class="inline-flex items-center gap-1.5 text-[11px] text-gray-400 dark:text-gray-500"
                >
                  <CalendarDays :size="12" />
                  {{ entry.dateLabel }}
                </span>
                <span
                  class="inline-flex items-center gap-1.5 text-[11px] text-gray-400 dark:text-gray-500"
                >
                  <Clock :size="12" />
                  {{ entry.readingMinutes }} min read
                </span>
              </div>

              <h3
                class="text-xl md:text-2xl font-bold text-primary-black dark:text-primary-white leading-snug"
              >
                {{ entry.title }}
              </h3>
              <p class="mt-2.5 text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
                {{ entry.summary }}
              </p>

              <!-- Words picked up that day -->
              <div v-if="entry.words?.length" class="mt-5 flex flex-wrap gap-2">
                <span
                  v-for="word in entry.words"
                  :key="word.word"
                  class="rounded-lg border border-gray-200 dark:border-gray-800 px-2.5 py-1 text-[11px] font-medium text-gray-500 dark:text-gray-400 transition-colors duration-300 group-hover:border-gray-300 dark:group-hover:border-gray-700"
                >
                  {{ word.word }}
                </span>
              </div>
            </div>

            <!-- Arrow -->
            <div
              class="flex-shrink-0 grid h-11 w-11 place-items-center rounded-full border border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-500 transition-all duration-300 group-hover:bg-primary-black dark:group-hover:bg-primary-white group-hover:text-primary-white dark:group-hover:text-primary-black group-hover:border-transparent group-hover:translate-x-1"
            >
              <ArrowRight :size="18" />
            </div>
          </div>
        </a>

        <!-- Upcoming placeholder -->
        <div
          class="rounded-3xl border border-dashed border-gray-300 dark:border-gray-800 p-7 md:p-9"
          data-reveal
          :data-reveal-delay="entries.length * 90"
        >
          <div class="flex items-center gap-6 md:gap-9">
            <div
              class="grid h-20 w-20 flex-shrink-0 place-items-center rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 text-gray-300 dark:text-gray-700"
            >
              <Sparkles :size="24" />
            </div>
            <div>
              <h3 class="text-lg font-bold text-gray-400 dark:text-gray-500">
                Day {{ (latest ? latest.day : 0) + 1 }}, writing tonight
              </h3>
              <p class="mt-1.5 text-sm text-gray-400 dark:text-gray-600 flex items-center gap-1.5">
                Let's see how long my brain actually brains
                <span class="inline-flex gap-1">
                  <span class="h-1 w-1 rounded-full bg-current animate-bounce" style="animation-delay: 0ms"></span>
                  <span class="h-1 w-1 rounded-full bg-current animate-bounce" style="animation-delay: 150ms"></span>
                  <span class="h-1 w-1 rounded-full bg-current animate-bounce" style="animation-delay: 300ms"></span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════ VOCAB ═══════════════ -->
    <section v-if="allWords.length" class="pt-20 md:pt-24" data-reveal>
      <h2 class="text-2xl md:text-3xl font-bold text-primary-black dark:text-primary-white">
        Words collected so far
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mt-2">
        Three new English words every day. Hover one to see what it means.
      </p>

      <div class="mt-8 flex flex-wrap gap-3">
        <div
          v-for="word in allWords"
          :key="word.word"
          class="group relative cursor-default rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.02] px-5 py-3 transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/70 hover:shadow-lg"
          tabindex="0"
        >
          <span class="font-semibold text-primary-black dark:text-primary-white">
            {{ word.word }}
          </span>
          <span
            class="pointer-events-none absolute left-1/2 bottom-full z-10 mb-2 w-56 -translate-x-1/2 translate-y-1 rounded-xl bg-primary-black dark:bg-primary-white px-3.5 py-2.5 text-xs leading-relaxed text-primary-white dark:text-primary-black opacity-0 shadow-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100"
          >
            {{ word.meaning }}
          </span>
        </div>
      </div>
    </section>
  </div>
</template>
