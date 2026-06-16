<script setup>
const wins = [
  { icon: '🏆', title: 'Razorpay UX Hack - 1st Prize', date: 'Aug 2024' },
  { icon: '🏆', title: 'PhonePe UX Hack - 1st Prize', date: 'Jul 2024' },
  { icon: '🥈', title: 'Airtel UX Hack - Runner Up', date: 'Aug 2024' },
  { icon: '⭐', title: 'PMaps Excellence in Openness', date: 'Jan 2025' },
]
</script>

<template>
  <div class="-mx-16 md:-mx-32 bg-white dark:bg-primary-black border-y border-gray-100 dark:border-white/5 overflow-hidden relative group transition-colors duration-300">
    <!-- Subtle gradient overlays for fade effect at edges -->
    <div class="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white dark:from-primary-black to-transparent z-10 pointer-events-none transition-colors duration-300"></div>
    <div class="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white dark:from-primary-black to-transparent z-10 pointer-events-none transition-colors duration-300"></div>

    <div class="py-10 flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
      <!-- Render the list twice to ensure seamless infinite scrolling -->
      <div class="flex gap-6 md:gap-8 px-3 md:px-4 shrink-0" v-for="i in 2" :key="i">
        <div
          v-for="(win, index) in wins"
          :key="`${i}-${index}`"
          class="flex items-center gap-4 bg-gray-50/50 hover:bg-gray-100 dark:bg-white/[0.03] dark:hover:bg-white/[0.08] border border-gray-200/60 hover:border-gray-300 dark:border-white/[0.05] dark:hover:border-white/20 text-primary-black dark:text-white/90 rounded-2xl px-6 md:px-8 py-4 transition-all duration-300 cursor-default"
        >
          <span class="text-2xl md:text-3xl leading-none drop-shadow-sm dark:drop-shadow-md" aria-hidden="true">{{ win.icon }}</span>
          <div class="flex flex-col gap-0.5">
            <span class="font-bold text-sm md:text-base tracking-wide">{{ win.title }}</span>
            <span class="text-xs md:text-sm text-gray-500 dark:text-white/40 font-medium transition-colors duration-300">{{ win.date }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-marquee {
  animation: marquee 35s linear infinite;
  width: max-content;
}

@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
