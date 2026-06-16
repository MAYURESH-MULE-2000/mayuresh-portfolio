<script setup>
import { 
  Puzzle, 
  Eye, 
  Lightbulb, 
  Hammer, 
  UserCircle, 
  BookOpen 
} from 'lucide-vue-next'

const roles = [
  'Product Discovery', 'User Research', 'Requirement Gathering', 
  'UX Design', 'Frontend Development', 'Database Design', 
  'Product Strategy', 'MVP Definition'
]

const learnings = [
  'Product prioritization', 'Scope management', 'User validation', 
  'System design', 'Product execution', 'Trade-off decisions'
]

const features = [
  'Workspace generation', 'Custom URLs', 'Portfolio registry',
  'Proof-of-work management', 'Profile management', 'Case study publishing',
  'Professional identity system'
]
</script>

<template>
  <section id="what-im-building" class="py-20 md:py-28">
    <div class="max-w-7xl mx-auto">
      
      <!-- Entire Section Wrapped in a Card -->
      <div class="bg-white dark:bg-primary-black border border-gray-200/80 dark:border-gray-800 rounded-[2.5rem] p-8 md:p-16 lg:p-20 shadow-sm relative overflow-hidden">
        
        <!-- Header -->
        <div class="mb-16 md:mb-20 flex flex-col md:flex-row md:items-start justify-between gap-8">
          <div>
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 text-primary-black dark:text-primary-white">What I'm Building</h2>
            <p class="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed flex flex-wrap items-center gap-1.5">
              Building 
              <img src="/images/primary-shellscholars.png" alt="ShellScholars" class="h-10 object-contain inline-block dark:hidden -mt-1 mx-1" />
              <img src="/images/secondary-shellscholars.png" alt="ShellScholars" class="h-10 object-contain hidden dark:inline-block -mt-1 mx-1" />
              in public - from identifying a fragmented ecosystem to engineering a unified professional identity.
            </p>
          </div>
          
          <a
            href="https://shellscholars.com"
            target="_blank"
            rel="noopener noreferrer"
            class="group inline-flex items-center gap-2 px-6 py-3 bg-gray-50 hover:bg-gray-100 dark:bg-white/[0.03] dark:hover:bg-white/[0.08] border border-gray-200 hover:border-gray-300 dark:border-white/5 dark:hover:border-white/20 rounded-full font-semibold text-sm transition-all duration-300 text-primary-black dark:text-primary-white shrink-0 mt-2 md:mt-4"
          >
            View Live Site
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transform group-hover:scale-125 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>

        <div class="space-y-16 md:space-y-24">
          <!-- 1. Problem & 2. Observation -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <div class="space-y-5">
              <div class="flex items-center gap-2.5 text-primary-black dark:text-primary-white">
                <div class="p-2.5 bg-rose-50 dark:bg-rose-900/20 rounded-xl text-rose-500">
                  <Puzzle :size="22" />
                </div>
                <h3 class="text-xl md:text-2xl font-bold">The Problem</h3>
              </div>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed text-[17px]">
                Today, professional proof-of-work is deeply fragmented. Resumes, LinkedIn profiles, personal portfolios, GitHub repositories, case studies, and certificates live in separate silos. This scattering forces professionals to maintain multiple disjointed identities, diluting the actual impact of their work and making it harder for others to holistically evaluate their capabilities.
              </p>
            </div>
            <div class="space-y-5">
              <div class="flex items-center gap-2.5 text-primary-black dark:text-primary-white">
                <div class="p-2.5 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-amber-500">
                  <Eye :size="22" />
                </div>
                <h3 class="text-xl md:text-2xl font-bold">The Observation</h3>
              </div>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed text-[17px]">
                While reviewing profiles and building products, I noticed a consistent pattern: existing platforms optimize for networking (like LinkedIn) or visual design (like Dribbble), but fail to represent a person's actual systematic work. People are solving incredible problems, but the platforms they use reduce their complex problem-solving into buzzwords or static screenshots.
              </p>
            </div>
          </div>

          <!-- 3. Vision -->
          <div class="bg-gray-50/80 dark:bg-white/[0.02] p-8 md:p-12 rounded-3xl border border-gray-200/50 dark:border-white/5 relative overflow-hidden">
            <div class="absolute -top-10 -right-10 p-8 opacity-[0.03] text-primary-black dark:text-primary-white pointer-events-none">
              <Lightbulb :size="250" />
            </div>
            <div class="space-y-6 max-w-3xl relative z-10">
              <div class="flex items-center gap-2.5 text-primary-black dark:text-primary-white">
                <div class="p-2.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-indigo-500">
                  <Lightbulb :size="22" />
                </div>
                <h3 class="text-xl md:text-2xl font-bold">The Vision</h3>
              </div>
              <p class="text-[17px] md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                ShellScholars aims to become the definitive registry for professional identity. The goal is to give professionals a unified platform where proof-of-work becomes inherently structured, discoverable, and trustworthy. By centralizing achievements and deep-dive case studies into a single verifiable space, we shift the narrative from <span class="italic">"what I claim to be"</span> to <span class="font-medium text-primary-black dark:text-primary-white">"what I have verifiably built and solved."</span>
              </p>
            </div>
          </div>

          <!-- 4. What I'm Building -->
          <div class="bg-gray-50/80 dark:bg-white/[0.02] p-8 md:p-12 rounded-3xl border border-gray-200/50 dark:border-white/5 relative overflow-hidden">
            <div class="absolute -top-10 -right-10 p-8 opacity-[0.03] text-primary-black dark:text-primary-white pointer-events-none">
              <Hammer :size="250" />
            </div>
            <div class="space-y-6 relative z-10">
              <div class="flex items-center gap-2.5 text-primary-black dark:text-primary-white">
                <div class="p-2.5 bg-teal-50 dark:bg-teal-900/20 rounded-xl text-teal-500">
                  <Hammer :size="22" />
                </div>
                <h3 class="text-xl md:text-2xl font-bold">What I'm Actively Building</h3>
              </div>
              <div class="flex flex-wrap gap-3">
                <span v-for="feature in features" :key="feature" class="px-4 py-2.5 bg-white dark:bg-white/[0.05] border border-gray-200 dark:border-white/5 rounded-xl text-sm font-medium text-gray-800 dark:text-gray-200 shadow-sm hover:border-gray-300 dark:hover:border-white/20 transition-colors cursor-default">
                  {{ feature }}
                </span>
              </div>
            </div>
          </div>

          <!-- 5 & 6. Role & Learning -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 pt-8 border-t border-gray-100 dark:border-gray-800">
            <div class="space-y-6">
              <div class="flex items-center gap-2.5 text-primary-black dark:text-primary-white">
                <div class="p-2.5 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-500">
                  <UserCircle :size="22" />
                </div>
                <h3 class="text-xl md:text-2xl font-bold">My Role</h3>
              </div>
              <div class="flex flex-wrap gap-2.5">
                <span v-for="role in roles" :key="role" class="px-3.5 py-1.5 bg-gray-100 dark:bg-white/[0.05] border border-transparent dark:border-white/5 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium">
                  {{ role }}
                </span>
              </div>
            </div>
            
            <div class="space-y-6">
              <div class="flex items-center gap-2.5 text-primary-black dark:text-primary-white">
                <div class="p-2.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-emerald-500">
                  <BookOpen :size="22" />
                </div>
                <h3 class="text-xl md:text-2xl font-bold">What I'm Learning</h3>
              </div>
              <div class="flex flex-wrap gap-2.5">
                <span v-for="learning in learnings" :key="learning" class="px-3.5 py-1.5 bg-gray-100 dark:bg-white/[0.05] border border-transparent dark:border-white/5 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium">
                  {{ learning }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
