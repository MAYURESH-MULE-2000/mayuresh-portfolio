<script setup>
import { ref } from 'vue'
import { BookMarked, Check, Copy } from 'lucide-vue-next'

defineProps({
  words: { type: Array, required: true },
  day: { type: Number, required: true },
})

/** Cards flip to their usage sentence on hover, or on tap/keyboard. */
const flipped = ref(null)
const copiedWord = ref(null)

function toggle(word) {
  flipped.value = flipped.value === word ? null : word
}

async function copyWord(word) {
  try {
    await navigator.clipboard.writeText(`${word.word}: ${word.meaning}`)
    copiedWord.value = word.word
    setTimeout(() => {
      copiedWord.value = null
    }, 1800)
  } catch {
    /* clipboard unavailable - nothing useful to do */
  }
}
</script>

<template>
  <section class="mt-20 md:mt-24" data-reveal>
    <div class="h-px w-full bg-gradient-to-r from-gray-300 dark:from-gray-700 to-transparent"></div>

    <div class="mt-10 flex items-center gap-3">
      <BookMarked :size="20" class="text-teal-500" />
      <h2 class="text-xl md:text-2xl font-bold text-primary-black dark:text-primary-white">
        Today's 3 words
      </h2>
    </div>
    <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
      Three new English words from Day {{ day }}. Tap a card to see one used in a sentence.
    </p>

    <div class="mt-8 grid gap-4 sm:grid-cols-3">
      <div
        v-for="(word, i) in words"
        :key="word.word"
        class="group relative h-[210px] cursor-pointer [perspective:1200px]"
        role="button"
        tabindex="0"
        :aria-label="`${word.word}: ${word.meaning}`"
        data-reveal
        :data-reveal-delay="i * 110"
        @click="toggle(word.word)"
        @keydown.enter.prevent="toggle(word.word)"
        @keydown.space.prevent="toggle(word.word)"
      >
        <div
          class="relative h-full w-full transition-transform duration-[650ms] [transform-style:preserve-3d]"
          :class="flipped === word.word
            ? '[transform:rotateY(180deg)]'
            : 'group-hover:[transform:rotateY(180deg)]'"
        >
          <!-- Front: the word + meaning -->
          <div
            class="absolute inset-0 flex flex-col justify-between rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.02] p-6 [backface-visibility:hidden]"
          >
            <div>
              <span
                class="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500"
              >
                Word {{ i + 1 }}
              </span>
              <h3
                class="mt-2 text-xl font-bold text-primary-black dark:text-primary-white"
              >
                {{ word.word }}
              </h3>
              <p class="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {{ word.meaning }}
              </p>
            </div>
            <span class="text-[11px] font-medium text-teal-600 dark:text-teal-400">
              See it in a sentence →
            </span>
          </div>

          <!-- Back: the usage -->
          <div
            class="absolute inset-0 flex flex-col justify-between rounded-2xl bg-primary-black dark:bg-primary-white p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]"
          >
            <div>
              <span
                class="text-[10px] font-bold uppercase tracking-widest text-primary-white/50 dark:text-primary-black/50"
              >
                In a sentence
              </span>
              <p
                class="mt-3 text-base italic leading-relaxed text-primary-white dark:text-primary-black"
              >
                “{{ word.usage }}”
              </p>
            </div>
            <button
              type="button"
              class="inline-flex items-center gap-1.5 self-start rounded-lg border border-primary-white/25 dark:border-primary-black/25 px-2.5 py-1.5 text-[11px] font-semibold text-primary-white dark:text-primary-black transition-colors hover:bg-primary-white/10 dark:hover:bg-primary-black/10"
              :aria-label="`Copy the definition of ${word.word}`"
              @click.stop="copyWord(word)"
            >
              <Check v-if="copiedWord === word.word" :size="12" />
              <Copy v-else :size="12" />
              {{ copiedWord === word.word ? 'Copied' : 'Copy' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
