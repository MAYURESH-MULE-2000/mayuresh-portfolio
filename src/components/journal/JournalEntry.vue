<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  CalendarDays,
  Check,
  Clock,
  HelpCircle,
  Link2,
  Quote as QuoteIcon,
  Smartphone,
} from 'lucide-vue-next'
import { parseRichText } from '../../lib/richText'
import { observeReveals } from '../../lib/reveal'
import JournalWords from './JournalWords.vue'

const props = defineProps({
  series: { type: Object, required: true },
  entry: { type: Object, required: true },
  prev: { type: Object, default: null },
  next: { type: Object, default: null },
})

const root = ref(null)
const progress = ref(0)
const showTop = ref(false)
const copied = ref(false)

let stopReveals = null
let loopTimer = null

/** Index of the highlighted step in the doom-scroll loop block. */
const loopStep = ref(0)
const hasLoop = computed(() =>
  props.entry.blocks.some((block) => block.type === 'loop'),
)

const rich = (text) => parseRichText(text)

function onScroll() {
  const el = root.value
  if (!el) return
  const start = el.offsetTop
  const total = el.offsetHeight - window.innerHeight
  const scrolled = window.scrollY - start
  progress.value = total > 0 ? Math.min(100, Math.max(0, (scrolled / total) * 100)) : 0
  showTop.value = window.scrollY > 700
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(window.location.href)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    /* clipboard unavailable - nothing useful to do */
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  stopReveals = observeReveals(root.value ?? document)
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  if (hasLoop.value && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    loopTimer = window.setInterval(() => {
      loopStep.value += 1
    }, 1100)
  }
})

onUnmounted(() => {
  if (stopReveals) stopReveals()
  window.removeEventListener('scroll', onScroll)
  if (loopTimer) clearInterval(loopTimer)
})
</script>

<template>
  <div ref="root" class="relative">
    <!-- Reading progress -->
    <div
      class="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent"
      role="progressbar"
      aria-label="Reading progress"
      :aria-valuenow="Math.round(progress)"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div
        class="h-full bg-gradient-to-r from-teal-400 to-teal-600 transition-[width] duration-150 ease-out"
        :style="{ width: `${progress}%` }"
      ></div>
    </div>

    <article class="mx-auto max-w-3xl">
      <!-- ═══════════════ HEADER ═══════════════ -->
      <header class="mb-14 md:mb-16">
        <a
          href="/journal"
          class="group inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary-black dark:hover:text-primary-white transition-colors"
        >
          <ArrowLeft
            :size="15"
            class="transition-transform duration-300 group-hover:-translate-x-1"
          />
          {{ series.title }}
        </a>

        <!-- Day badge -->
        <div class="mt-8 flex items-center gap-4">
          <div
            class="grid h-16 w-16 place-items-center rounded-2xl bg-primary-black dark:bg-primary-white text-primary-white dark:text-primary-black"
          >
            <span class="text-[9px] uppercase tracking-widest opacity-60">Day</span>
            <span class="text-2xl font-bold leading-none tabular-nums">{{ entry.day }}</span>
          </div>
          <div class="flex flex-col gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <span class="inline-flex items-center gap-1.5">
              <CalendarDays :size="13" />
              {{ entry.dateLabel }}
            </span>
            <span class="inline-flex items-center gap-1.5">
              <Clock :size="13" />
              {{ entry.readingMinutes }} min read
            </span>
          </div>
        </div>

        <h1
          class="mt-8 text-3xl md:text-5xl font-bold leading-[1.12] tracking-tight text-primary-black dark:text-primary-white"
        >
          {{ entry.title }}
        </h1>

        <p class="mt-5 text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
          {{ entry.summary }}
        </p>

        <!-- Actions -->
        <div class="mt-8 flex items-center gap-3">
          <button
            type="button"
            class="group inline-flex items-center gap-2 rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:border-primary-black dark:hover:border-primary-white hover:text-primary-black dark:hover:text-primary-white transition-all duration-300"
            @click="copyLink"
          >
            <Check v-if="copied" :size="14" class="text-teal-500" />
            <Link2 v-else :size="14" class="transition-transform duration-300 group-hover:rotate-12" />
            {{ copied ? 'Link copied' : 'Copy link' }}
          </button>
          <span class="text-xs text-gray-400 dark:text-gray-600 italic">
            {{ series.tagline }}
          </span>
        </div>

        <div class="mt-10 h-px w-full bg-gradient-to-r from-gray-300 dark:from-gray-700 to-transparent"></div>
      </header>

      <!-- ═══════════════ BODY ═══════════════ -->
      <div class="space-y-6">
        <template v-for="(block, i) in entry.blocks" :key="i">
          <!-- Lead -->
          <p
            v-if="block.type === 'lead'"
            class="text-xl md:text-2xl leading-relaxed text-primary-black dark:text-primary-white font-medium [&_strong]:font-bold"
            data-reveal
            v-html="rich(block.text)"
          ></p>

          <!-- Paragraph -->
          <p
            v-else-if="block.type === 'p'"
            class="text-base md:text-lg leading-[1.85] text-gray-700 dark:text-gray-300 [&_strong]:text-primary-black dark:[&_strong]:text-primary-white [&_strong]:font-semibold"
            data-reveal
            v-html="rich(block.text)"
          ></p>

          <!-- Heading -->
          <h2
            v-else-if="block.type === 'h2'"
            class="group relative pt-12 pb-1 text-2xl md:text-3xl font-bold tracking-tight text-primary-black dark:text-primary-white"
            data-reveal
          >
            <span
              class="journal-rule absolute left-0 top-0 block h-1 w-12 origin-left rounded-full bg-teal-500"
              aria-hidden="true"
            ></span>
            {{ block.text }}
          </h2>

          <!-- Beat: a short line that gets room to breathe -->
          <p
            v-else-if="block.type === 'beat'"
            class="py-1 text-lg md:text-xl leading-relaxed text-primary-black dark:text-primary-white [&_strong]:font-bold [&_em]:text-gray-500 dark:[&_em]:text-gray-400"
            data-reveal
            v-html="rich(block.text)"
          ></p>

          <!-- Pull quote -->
          <blockquote
            v-else-if="block.type === 'quote'"
            class="relative my-4 rounded-2xl border-l-2 border-teal-500 bg-gray-50 dark:bg-white/[0.03] py-6 pl-8 pr-6 transition-transform duration-500 hover:translate-x-1"
            data-reveal
          >
            <QuoteIcon
              :size="26"
              class="absolute -top-3 left-5 text-teal-500/30 dark:text-teal-400/25"
              aria-hidden="true"
            />
            <p class="text-lg md:text-xl italic leading-relaxed text-gray-600 dark:text-gray-300">
              “{{ block.text }}”
            </p>
          </blockquote>

          <!-- Callout -->
          <div
            v-else-if="block.type === 'callout'"
            class="group my-6 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.02] transition-all duration-500 hover:border-teal-400/60 hover:shadow-lg"
            data-reveal
          >
            <div
              class="h-1 w-full origin-left bg-gradient-to-r from-teal-400 to-teal-600 transition-transform duration-500 scale-x-[0.25] group-hover:scale-x-100"
            ></div>
            <div class="px-7 py-6">
              <span
                v-if="block.label"
                class="text-[10px] font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400"
              >
                {{ block.label }}
              </span>
              <p
                class="mt-2 text-2xl md:text-3xl font-bold leading-snug text-primary-black dark:text-primary-white"
                v-html="rich(block.text)"
              ></p>
            </div>
          </div>

          <!-- Big stat -->
          <div
            v-else-if="block.type === 'stat'"
            class="my-6 flex items-center gap-6 rounded-2xl border border-amber-200/70 dark:border-amber-500/20 bg-amber-50/70 dark:bg-amber-500/[0.06] px-7 py-6 transition-transform duration-500 hover:-translate-y-1"
            data-reveal
          >
            <Smartphone
              :size="30"
              class="flex-shrink-0 text-amber-500 dark:text-amber-400"
              aria-hidden="true"
            />
            <div>
              <div
                class="text-3xl md:text-4xl font-bold tabular-nums text-amber-700 dark:text-amber-300"
              >
                {{ block.value }}
              </div>
              <p class="mt-1 text-sm leading-relaxed text-amber-800/80 dark:text-amber-200/70">
                {{ block.label }}
              </p>
            </div>
          </div>

          <!-- Rapid-fire questions -->
          <ul v-else-if="block.type === 'questions'" class="my-6 space-y-3">
            <li
              v-for="(question, qi) in block.items"
              :key="question"
              class="group flex items-start gap-3.5 rounded-xl border border-gray-200 dark:border-gray-800 px-5 py-4 transition-all duration-300 hover:translate-x-1.5 hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/[0.03]"
              data-reveal
              :data-reveal-delay="qi * 90"
            >
              <HelpCircle
                :size="17"
                class="mt-0.5 flex-shrink-0 text-gray-300 dark:text-gray-600 transition-colors duration-300 group-hover:text-teal-500"
                aria-hidden="true"
              />
              <span class="text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                {{ question }}
              </span>
            </li>
          </ul>

          <!-- The scroll loop -->
          <div
            v-else-if="block.type === 'loop'"
            class="my-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-white/[0.02] px-6 py-7 md:px-8"
            data-reveal
          >
            <ol class="space-y-3">
              <li
                v-for="(step, si) in block.steps"
                :key="step"
                class="flex items-center gap-4 transition-all duration-500"
                :class="loopStep % block.steps.length === si
                  ? 'opacity-100 translate-x-1.5'
                  : 'opacity-40'"
              >
                <span
                  class="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full text-[11px] font-bold tabular-nums transition-colors duration-500"
                  :class="loopStep % block.steps.length === si
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400'"
                >
                  {{ si + 1 }}
                </span>
                <span class="text-base md:text-lg text-gray-700 dark:text-gray-300">
                  {{ step }}
                </span>
              </li>
            </ol>
            <p
              v-if="block.caption"
              class="mt-6 border-t border-dashed border-gray-300 dark:border-gray-700 pt-5 text-lg font-semibold text-primary-black dark:text-primary-white"
            >
              {{ block.caption }}
            </p>
          </div>

          <!-- Divider -->
          <hr
            v-else-if="block.type === 'divider'"
            class="my-10 border-gray-200 dark:border-gray-800"
            data-reveal
          />
        </template>
      </div>

      <!-- ═══════════════ WORDS ═══════════════ -->
      <JournalWords v-if="entry.words?.length" :words="entry.words" :day="entry.day" />

      <!-- ═══════════════ PREV / NEXT ═══════════════ -->
      <nav class="mt-16 grid gap-4 sm:grid-cols-2" data-reveal>
        <a
          v-if="prev"
          :href="`/journal/${prev.slug}`"
          class="group rounded-2xl border border-gray-200 dark:border-gray-800 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700"
        >
          <span
            class="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500"
          >
            <ArrowLeft :size="12" class="transition-transform duration-300 group-hover:-translate-x-1" />
            Day {{ prev.day }}
          </span>
          <p class="mt-2 font-semibold text-primary-black dark:text-primary-white">
            {{ prev.title }}
          </p>
        </a>

        <a
          v-if="next"
          :href="`/journal/${next.slug}`"
          class="group rounded-2xl border border-gray-200 dark:border-gray-800 p-6 text-right transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700 sm:col-start-2"
        >
          <span
            class="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500"
          >
            Day {{ next.day }}
            <ArrowRight :size="12" class="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          <p class="mt-2 font-semibold text-primary-black dark:text-primary-white">
            {{ next.title }}
          </p>
        </a>

        <!-- Nothing after this one yet -->
        <div
          v-else
          class="rounded-2xl border border-dashed border-gray-300 dark:border-gray-800 p-6 text-right sm:col-start-2"
        >
          <span
            class="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600"
          >
            Day {{ entry.day + 1 }}
          </span>
          <p class="mt-2 font-semibold text-gray-400 dark:text-gray-600">Coming tomorrow</p>
        </div>
      </nav>

      <!-- Back to the series -->
      <div class="mt-10 text-center" data-reveal>
        <a
          href="/journal"
          class="group inline-flex items-center gap-2 rounded-xl border border-gray-300 dark:border-gray-700 px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 transition-all duration-300 hover:border-primary-black dark:hover:border-primary-white hover:text-primary-black dark:hover:text-primary-white"
        >
          <ArrowLeft :size="15" class="transition-transform duration-300 group-hover:-translate-x-1" />
          All journal entries
        </a>
      </div>
    </article>

    <!-- Scroll to top -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-3"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-3"
    >
      <button
        v-if="showTop"
        type="button"
        class="fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full bg-primary-black dark:bg-primary-white text-primary-white dark:text-primary-black shadow-lg transition-transform duration-300 hover:-translate-y-1 md:bottom-8 md:right-28"
        aria-label="Back to top"
        @click="scrollToTop"
      >
        <ArrowUp :size="18" />
      </button>
    </Transition>
  </div>
</template>
