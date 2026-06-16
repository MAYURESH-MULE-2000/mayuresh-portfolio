<script setup>
import { Users, ListChecks, Search, PenTool, Code2, Rocket } from 'lucide-vue-next'

const steps = [
  {
    id: 1,
    label: 'Stakeholders',
    desc: 'Business goals & vision',
    icon: Users,
    color: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-600/30 dark:border-purple-400/30',
    bg: 'bg-purple-600/5 dark:bg-purple-400/5',
  },
  {
    id: 2,
    label: 'Requirements',
    desc: 'Scope & specifications',
    icon: ListChecks,
    color: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-600/30 dark:border-blue-400/30',
    bg: 'bg-blue-600/5 dark:bg-blue-400/5',
  },
  {
    id: 3,
    label: 'Discovery',
    desc: 'Research & problem framing',
    icon: Search,
    color: 'text-sky-500 dark:text-sky-400',
    border: 'border-sky-500/30 dark:border-sky-400/30',
    bg: 'bg-sky-500/5 dark:bg-sky-400/5',
  },
  {
    id: 4,
    label: 'Design',
    desc: 'Prototyping & UX/UI',
    icon: PenTool,
    color: 'text-amber-500 dark:text-amber-400',
    border: 'border-amber-500/30 dark:border-amber-400/30',
    bg: 'bg-amber-500/5 dark:bg-amber-400/5',
  },
  {
    id: 5,
    label: 'Engineering',
    desc: 'Architecture & build',
    icon: Code2,
    color: 'text-purple-500 dark:text-purple-400',
    border: 'border-purple-500/30 dark:border-purple-400/30',
    bg: 'bg-purple-500/5 dark:bg-purple-400/5',
  },
  {
    id: 6,
    label: 'Outcome',
    desc: 'Shipped value & metrics',
    icon: Rocket,
    color: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-600/30 dark:border-emerald-400/30',
    bg: 'bg-emerald-600/5 dark:bg-emerald-400/5',
  }
]
</script>

<template>
  <div class="w-full max-w-2xl mx-auto lg:ml-auto relative">
    
    <div class="flex flex-col">
      <!-- Row 1: 1 -> 2 -->
      <div class="flex items-center">
        <!-- Step 1 -->
        <div class="flex-1 flex items-center gap-3.5 p-2.5 pr-6 rounded-full border-2 transition-colors duration-300" :class="[steps[0].border, steps[0].bg]">
          <div class="w-12 h-12 shrink-0 rounded-full flex items-center justify-center bg-white dark:bg-primary-black shadow-sm" :class="[steps[0].color]">
            <component :is="steps[0].icon" :size="20" />
          </div>
          <div class="flex flex-col text-left">
            <span class="font-bold text-[14px] md:text-[15px] text-primary-black dark:text-primary-white leading-tight mb-0.5">{{ steps[0].label }}</span>
            <span class="text-[12px] md:text-[13px] text-gray-500 dark:text-gray-400 leading-snug">{{ steps[0].desc }}</span>
          </div>
        </div>

        <!-- Arrow 1 (Right) -->
        <div class="w-16 md:w-20 shrink-0 flex justify-center text-gray-400 dark:text-gray-600">
          <svg width="64" height="24" viewBox="0 0 64 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="arrow-svg arrow-1 w-full max-w-[64px]">
            <path d="M2 12H54" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="6 8"/>
            <path d="M48 5L57 12L48 19" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <!-- Step 2 -->
        <div class="flex-1 flex items-center gap-3.5 p-2.5 pr-6 rounded-full border-2 transition-colors duration-300" :class="[steps[1].border, steps[1].bg]">
          <div class="w-12 h-12 shrink-0 rounded-full flex items-center justify-center bg-white dark:bg-primary-black shadow-sm" :class="[steps[1].color]">
            <component :is="steps[1].icon" :size="20" />
          </div>
          <div class="flex flex-col text-left">
            <span class="font-bold text-[14px] md:text-[15px] text-primary-black dark:text-primary-white leading-tight mb-0.5">{{ steps[1].label }}</span>
            <span class="text-[12px] md:text-[13px] text-gray-500 dark:text-gray-400 leading-snug">{{ steps[1].desc }}</span>
          </div>
        </div>
      </div>

      <!-- Arrow 2 (Down from 2 to 3) -->
      <div class="flex items-center py-2">
        <div class="flex-1"></div>
        <div class="w-16 md:w-20 shrink-0"></div>
        <div class="flex-1 flex justify-center text-gray-400 dark:text-gray-600">
          <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="arrow-svg arrow-2 h-10">
            <path d="M12 2V30" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="6 8"/>
            <path d="M5 24L12 33L19 24" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>

      <!-- Row 2: 4 <- 3 (S-curve reversed) -->
      <div class="flex items-center">
        <!-- Step 4 (Left side now) -->
        <div class="flex-1 flex items-center gap-3.5 p-2.5 pr-6 rounded-full border-2 transition-colors duration-300" :class="[steps[3].border, steps[3].bg]">
          <div class="w-12 h-12 shrink-0 rounded-full flex items-center justify-center bg-white dark:bg-primary-black shadow-sm" :class="[steps[3].color]">
            <component :is="steps[3].icon" :size="20" />
          </div>
          <div class="flex flex-col text-left">
            <span class="font-bold text-[14px] md:text-[15px] text-primary-black dark:text-primary-white leading-tight mb-0.5">{{ steps[3].label }}</span>
            <span class="text-[12px] md:text-[13px] text-gray-500 dark:text-gray-400 leading-snug">{{ steps[3].desc }}</span>
          </div>
        </div>

        <!-- Arrow 3 (Left) -->
        <div class="w-16 md:w-20 shrink-0 flex justify-center text-gray-400 dark:text-gray-600">
          <svg width="64" height="24" viewBox="0 0 64 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="arrow-svg arrow-3 w-full max-w-[64px]">
            <path d="M62 12H10" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="6 8"/>
            <path d="M16 5L7 12L16 19" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <!-- Step 3 (Right side now) -->
        <div class="flex-1 flex items-center gap-3.5 p-2.5 pr-6 rounded-full border-2 transition-colors duration-300" :class="[steps[2].border, steps[2].bg]">
          <div class="w-12 h-12 shrink-0 rounded-full flex items-center justify-center bg-white dark:bg-primary-black shadow-sm" :class="[steps[2].color]">
            <component :is="steps[2].icon" :size="20" />
          </div>
          <div class="flex flex-col text-left">
            <span class="font-bold text-[14px] md:text-[15px] text-primary-black dark:text-primary-white leading-tight mb-0.5">{{ steps[2].label }}</span>
            <span class="text-[12px] md:text-[13px] text-gray-500 dark:text-gray-400 leading-snug">{{ steps[2].desc }}</span>
          </div>
        </div>
      </div>

      <!-- Arrow 4 (Down from 4 to 5) -->
      <div class="flex items-center py-2">
        <div class="flex-1 flex justify-center text-gray-400 dark:text-gray-600">
          <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="arrow-svg arrow-4 h-10">
            <path d="M12 2V30" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="6 8"/>
            <path d="M5 24L12 33L19 24" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="w-16 md:w-20 shrink-0"></div>
        <div class="flex-1"></div>
      </div>

      <!-- Row 3: 5 -> 6 -->
      <div class="flex items-center">
        <!-- Step 5 -->
        <div class="flex-1 flex items-center gap-3.5 p-2.5 pr-6 rounded-full border-2 transition-colors duration-300" :class="[steps[4].border, steps[4].bg]">
          <div class="w-12 h-12 shrink-0 rounded-full flex items-center justify-center bg-white dark:bg-primary-black shadow-sm" :class="[steps[4].color]">
            <component :is="steps[4].icon" :size="20" />
          </div>
          <div class="flex flex-col text-left">
            <span class="font-bold text-[14px] md:text-[15px] text-primary-black dark:text-primary-white leading-tight mb-0.5">{{ steps[4].label }}</span>
            <span class="text-[12px] md:text-[13px] text-gray-500 dark:text-gray-400 leading-snug">{{ steps[4].desc }}</span>
          </div>
        </div>

        <!-- Arrow 5 (Right) -->
        <div class="w-16 md:w-20 shrink-0 flex justify-center text-gray-400 dark:text-gray-600">
          <svg width="64" height="24" viewBox="0 0 64 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="arrow-svg arrow-5 w-full max-w-[64px]">
            <path d="M2 12H54" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="6 8"/>
            <path d="M48 5L57 12L48 19" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <!-- Step 6 -->
        <div class="flex-1 flex items-center gap-3.5 p-2.5 pr-6 rounded-full border-2 transition-colors duration-300" :class="[steps[5].border, steps[5].bg]">
          <div class="w-12 h-12 shrink-0 rounded-full flex items-center justify-center bg-white dark:bg-primary-black shadow-sm" :class="[steps[5].color]">
            <component :is="steps[5].icon" :size="20" />
          </div>
          <div class="flex flex-col text-left">
            <span class="font-bold text-[14px] md:text-[15px] text-primary-black dark:text-primary-white leading-tight mb-0.5">{{ steps[5].label }}</span>
            <span class="text-[12px] md:text-[13px] text-gray-500 dark:text-gray-400 leading-snug">{{ steps[5].desc }}</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.arrow-svg {
  animation: glow-sequence 5s infinite;
  transition: color 0.3s ease;
  --glow-color: #1C1B1B;
  --glow-shadow: rgba(28, 27, 27, 0.4);
}

/* Dark mode fallback check */
:global(.dark) .arrow-svg {
  --glow-color: #FFFFFF;
  --glow-shadow: rgba(255, 255, 255, 0.5);
}

@keyframes glow-sequence {
  0%, 20%, 100% {
    color: inherit;
    filter: drop-shadow(0 0 0 rgba(0,0,0,0));
    transform: scale(1);
  }
  10% {
    color: var(--glow-color);
    filter: drop-shadow(0 0 8px var(--glow-shadow));
    transform: scale(1.1);
  }
}

/* Delay for each arrow sequentially */
.arrow-1 { animation-delay: 0s; }
.arrow-2 { animation-delay: 1s; }
.arrow-3 { animation-delay: 2s; }
.arrow-4 { animation-delay: 3s; }
.arrow-5 { animation-delay: 4s; }
</style>
