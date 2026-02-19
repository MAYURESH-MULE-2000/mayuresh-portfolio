<template>
  <div class="learn-devops min-h-screen">
    <!-- Header -->
    <div class="px-4 md:px-8 py-8 pb-4 max-w-6xl mx-auto">
      <a href="/learn" class="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4">
        ← Back to Topics
      </a>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">⚙️</span>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">DevOps & Tooling</h1>
      </div>
      <p class="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl">
        Often ignored but critical. Build pipelines, CI/CD, Containerization, and Git mastery distinguish seniors from juniors.
      </p>
    </div>

    <!-- Layout -->
    <div class="px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 pb-16">
      <SectionNav
        :sections="sections"
        :activeSection="activeSection"
        activeColor="bg-cyan-600"
        @select="setSection"
        class="lg:w-56 flex-shrink-0"
      />

      <div class="flex-1 min-w-0 space-y-5">
        <!-- ==================== GIT ==================== -->
         <template v-if="activeSection === 'git'">
          <ConceptCard
            id="rebase-merge"
            icon="🔀"
            title="Git: Rebase vs Merge"
            subtitle="Keep history clean"
            definition="Merge: Creates a new commit, preserving branch history (messy graph). Rebase: Moves your changes to the tip of main (linear history). Squash Merge: Combines all PR commits into one clean commit on main."
            analogy="Merge is like gluing two books together side-by-side. Rebase is tearing pages from your notebook and pasting them neatly at the end of the main book."
            seniorTip="Use Squash Merge for PRs to keep main clean. Use Rebase locally to update your branch with main before pushing. Never rebase shared/public branches (force push breaks history for others)."
            defaultOpen
          >
             <CodePlayground title="git-commands.sh" :initialCode="codes.git" />
          </ConceptCard>

          <ConceptCard
            id="code-review"
            icon="👀"
            title="Code Review Etiquette"
            subtitle="Giving & Receiving Feedback"
            definition="Focus on logic/correctness, not style (let linters do that). Ask questions ('Why use map here?'), suggest alternatives ('Consider reduce for perf'). Be kind. Approve quickly if trivial."
            seniorTip="Don't use 'looks good'. Verify it runs locally if complex. Check for tests. Check for edge cases. Check for security. A senior review catches architectural flaws, not just typos."
          >
             <div class="p-4 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/5 space-y-3">
               <div class="flex items-start gap-2">
                 <span class="text-red-500 text-lg">❌</span>
                 <div>
                   <p class="font-bold text-sm">Bad Review</p>
                   <p class="text-xs text-gray-500">"This is wrong. Change it." (Vague, rude)</p>
                 </div>
               </div>
               <div class="flex items-start gap-2">
                 <span class="text-emerald-500 text-lg">✅</span>
                 <div>
                   <p class="font-bold text-sm">Good Review</p>
                   <p class="text-xs text-gray-500">"This loop might cause a performance issue with large arrays. Could we use a Set for O(1) lookups instead?" (Specific, reason provided, polite)</p>
                 </div>
               </div>
             </div>
          </ConceptCard>
        </template>

        <!-- ==================== CI/CD & PIPELINES ==================== -->
        <template v-if="activeSection === 'cicd'">
          <ConceptCard
            id="pipelines"
            icon="🚀"
            title="Build Pipelines & CI/CD"
            subtitle="Automating stability"
            definition="Pipeline: A series of automated steps (Install -> Lint -> Test -> Build -> Deploy). CI (Continuous Integration): Merging frequently, automatic testing. CD (Continuous Deployment): Automatic release to production."
            analogy="A pipeline is an assembly line. Raw code enters, quality checks happen at every station. If a bolt is loose (test fails), the line stops. Only perfect products reach the end (production)."
            seniorTip="Cache node_modules. Parallelize jobs (Lint & Test at same time). Fail fast. Use ephemeral preview environments for every PR."
          >
            <CodePlayground title="github-actions.yml" :initialCode="codes.pipeline" />
          </ConceptCard>
        </template>

        <!-- ==================== DOCKER & ENV ==================== -->
        <template v-if="activeSection === 'ops'">
           <ConceptCard
             id="docker"
             icon="🐳"
             title="Docker & Containerization"
             subtitle="It works on my machine... and yours"
             definition="Docker packages code + OS + dependencies into a lightweight container. Solves 'it works on my machine' problem. Images are blueprints. Containers are running instances."
             analogy="Docker is a shipping container. It doesn't matter if the ship is Maersk or Evergreen, the crane handles standard containers exactly the same way. Your app runs the same on Mac, Windows, or Linux servers."
           >
              <CodePlayground title="Dockerfile" :initialCode="codes.docker" />
           </ConceptCard>

           <ConceptCard
             id="env-vars"
             icon="🔐"
             title="Environment Configs"
             subtitle=".env management"
             definition="Secrets (API Keys) and Configs (Base URL) change per environment (Dev, Staging, Prod). Use .env files locally (gitignore them!) and Secrets Manager in CI/CD."
             seniorTip="NEVER check .env into git. Use .env.example with dummy values. Validate env vars at app startup (crash if crucial API key missing)."
           >
              <CodePlayground title="env-config.js" :initialCode="codes.env" />
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
  { id: 'git', label: 'Git & Reviews', icon: '🔀', badge: 'Daily' },
  { id: 'cicd', label: 'CI/CD Pipelines', icon: '🚀', badge: 'Ops' },
  { id: 'ops', label: 'Docker & Config', icon: '🐳', badge: 'Dev' },
]

const activeSection = ref('git')

function setSection(id) {
  activeSection.value = id
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const codes = {
  git: `// 🔀 Git Rebase Workflow (Interactive)

# 1. Update local main
git checkout main
git pull origin main

# 2. Rebase feature branch
git checkout feature/login
git rebase main
# (Resolve conflicts if any)

# 3. Handling conflicts
# - Edit files
# - git add .
# - git rebase --continue

# 4. Push (Force needed if history rewritten)
git push origin feature/login --force-with-lease

# Why Rebase?
# Result: Linear history. No "Merge branch 'main' into..." commits.`,

  pipeline: `# 🚀 Efficient CI Pipeline Strategy

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      # CACHE dependencies (Critical for speed)
      - uses: actions/cache@v3
        with:
          path: ~/.npm
          key: \${{ runner.os }}-node-\${{ hashFiles('**/package-lock.json') }}
      
      - run: npm ci
      
      # Parallel execution for speed
      - run: npm run lint &
      - run: npm run test &
      - wait

  build:
    needs: validate
    if: github.ref == 'refs/heads/main'
    run: npm run build`,

  docker: `# 🐳 Dockerfile Best Practices

# 1. Use small base image (Alpine)
FROM node:18-alpine AS builder

# 2. Set working directory
WORKDIR /app

# 3. Copy package files first (Layer Caching!)
COPY package*.json ./
RUN npm ci

# 4. Copy source code
COPY . .
RUN npm run build

# 5. Production Stage (Multi-stage build)
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`,

  env: `// 🔐 Safe Environment Config

import { z } from 'zod'

// Define schema for required vars
const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_AUTH0_DOMAIN: z.string(),
  // Defaults for non-critical
  VITE_ENABLE_ANALYTICS: z.boolean().default(false)
})

// Validate at startup
const env = envSchema.safeParse(import.meta.env)

if (!env.success) {
  console.error("❌ Invalid Environment Variables:", env.error.format())
  // Crash app if critical config missing
  throw new Error("Fix .env configuration!")
}

export const config = env.data`
}
</script>
