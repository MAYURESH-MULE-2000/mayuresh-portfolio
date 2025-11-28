<script setup>
import { Wrench, Sparkles, Code } from 'lucide-vue-next'

const workData = [
    {
        id: 1,
        title: 'Methods',
        icon: 'Wrench',
        color: 'bg-pink-50 dark:bg-pink-900/20',
        items: [
            'Product Discovery',
            'User Research & Insights',
            'Experimentation & Hypothesis Testing',
            'Product Analytics',
            'Roadmapping & Prioritization',
            'Requirement Gathering',
            'Problem Framing',
            'User Journey Mapping',
            'Workflow Optimization',
            'MVP Definition',
            'Data-driven Decision Making',
            'Feature Scoping',
            'Prototyping (Low–High Fidelity)',
            'Design Systems Thinking',
            'Accessible Product Practices',
            'Agile & Sprint Planning',
            'Product KPI Mapping',
        ],
    },
    {
        id: 2,
        title: 'Core Strengths',
        icon: 'Sparkles',
        color: 'bg-teal-50 dark:bg-teal-900/20',
        items: [
            'Stakeholder Management',
            'Cross-functional Collaboration',
            'Strategic Thinking',
            'Decision Making',
            'Leadership in Ambiguous Environments',
            'Communication & Storytelling',
            'Developer Handoff',
            'Workshopping Facilitation',
            'Problem Solving',
            'User Empathy',
            'Conflict Resolution',
            'Presentation Skills',
            'Time & Scope Management',
            'Product Sense',
            'Execution Ownership',
        ],
    },
    {
        id: 3,
        title: 'Tools & Technology',
        icon: 'Code',
        color: 'bg-yellow-50 dark:bg-yellow-900/20',
        items: [
            'Product & Analytics – Mixpanel, Google Analytics, Amplitude (learning)',
            'Design – Figma, Webflow, LottieFiles',
            'PM Tools – JIRA, Confluence, Notion',
            'Prototyping – Figma Interactive, Whimsical',
            'Documentation – PRDs, User Stories, Acceptance Criteria',
            'Frontend (Execution Strength) – Vue.js, Quasar, JavaScript, HTML, CSS',
            'Version Control – Git, GitHub',
            'APIs – REST, Axios/FETCH',
            'AI Tools – GPT, Midjourney (Ideation, Uttard)',
            'CMS / No-code – Webflow',
            'Performance Tools – Lighthouse, Chrome DevTools',
        ],
    },
]

// Map icon names to components
const iconComponents = {
    Wrench,
    Sparkles,
    Code
}
</script>

<template>
    <section class="py-8">
        <div class="max-w-7xl mx-auto">
            <!-- Section Header -->
            <div class="relative mb-4">
                <div class="flex items-center justify-between">
                    <h2 class="text-3xl md:text-4xl font-bold">This is how I work</h2>
                </div>
            </div>

            <!-- Description -->
            <p class="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-12 md:mb-16 max-w-4xl">
                I blend data, user understanding, and product intuition to shape products that solve real problems
                and scale with impact. Here's how I do it —
            </p>

            <!-- 3 Column Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
                <!-- Card -->
                <div v-for="section in workData" :key="section.id"
                    class="rounded-3xl p-6 md:p-8 transition-all duration-300 shadow-xl hover:shadow-2xl"
                    :class="section.color">
                    <!-- Icon + Title -->
                    <div class="flex items-center gap-3 mb-6">
                        <!-- Dynamic Lucide Icon -->
                        <component :is="iconComponents[section.icon]" :size="16"
                            class="text-gray-700 dark:text-gray-300" />
                        <h3 class="text-xl md:text-2xl font-bold">{{ section.title }}</h3>
                    </div>

                    <!-- Items List -->
                    <ul class="space-y-2">
                        <li v-for="(item, index) in section.items" :key="index"
                            class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                            {{ item }}
                        </li>
                    </ul>
                </div>
            </div>

            <!-- CTA Section -->
            <div class="text-center">
                <p class="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-6">
                    Want the full story?
                </p>

                <a href="/resume.pdf" target="_blank"
                    class="inline-block px-8 py-3 bg-primary-black dark:bg-primary-white text-primary-white dark:text-primary-black rounded-md font-medium hover:opacity-80 transition-all duration-300">
                    Resume
                </a>
            </div>
        </div>
    </section>
</template>
