<script setup>
import { ref } from 'vue'
import { Linkedin } from 'lucide-vue-next'

defineProps({
    sections: {
        type: Array,
        required: true,
        // Format: [{ title, content }]
    },
    sidebar: {
        type: Object,
        required: true,
        // Format: { role: [], team: [], duration, teamMembers: [{ name, role, image, linkedIn }] }
    }
})

const parseContent = (text) => {
    if (!text) return ''
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
}

const hoveredMember = ref(null)
let hoverTimeout = null

const handleMouseEnter = (index) => {
    if (hoverTimeout) {
        clearTimeout(hoverTimeout)
        hoverTimeout = null
    }
    hoveredMember.value = index
}

const handleMouseLeave = () => {
    hoverTimeout = setTimeout(() => {
        hoveredMember.value = null
    }, 300)
}
</script>

<template>
    <section class="mb-16">
        <h2 class="text-2xl md:text-3xl font-bold mb-8">Overview</h2>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <!-- Left: Content Sections -->
            <div class="lg:col-span-2 space-y-8">
                <div v-for="(section, index) in sections" :key="index">
                    <h3 class="text-xl font-bold mb-3">{{ section.title }}</h3>
                    <p class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line"
                        v-html="parseContent(section.content)">
                    </p>
                </div>
            </div>

            <!-- Right: Sidebar Info -->
            <div class="space-y-8">
                <!-- Role -->
                <div v-if="sidebar.role">
                    <h4 class="text-lg font-bold mb-2">Role</h4>
                    <ul class="space-y-1">
                        <li v-for="(item, index) in sidebar.role" :key="index"
                            class="text-sm text-gray-700 dark:text-gray-300">
                            • {{ item }}
                        </li>
                    </ul>
                </div>

                <!-- Team -->
                <div v-if="sidebar.team">
                    <h4 class="text-lg font-bold mb-2">Team</h4>
                    <ul class="space-y-1">
                        <li v-for="(member, index) in sidebar.team" :key="index"
                            class="text-sm text-gray-700 dark:text-gray-300">
                            • {{ member }}
                        </li>
                    </ul>
                </div>

                <!-- Duration -->
                <div v-if="sidebar.duration">
                    <h4 class="text-lg font-bold mb-2">Duration</h4>
                    <p class="text-sm text-gray-700 dark:text-gray-300">{{ sidebar.duration }}</p>
                </div>

                <!-- Team Members -->
                <div v-if="sidebar.teamMembers && sidebar.teamMembers.length > 0">
                    <h4 class="text-lg font-bold mb-3">Team Members</h4>
                    <div class="flex flex-wrap gap-3">
                        <div v-for="(member, index) in sidebar.teamMembers" :key="index"
                            class="relative group">
                            
                            <!-- Member Tag -->
                            <div 
                                class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-primary-black hover:border-primary-black dark:hover:border-primary-white transition-all duration-300 cursor-pointer"
                                @mouseenter="handleMouseEnter(index)"
                                @mouseleave="handleMouseLeave"
                            >
                                <Linkedin 
                                    :size="16" 
                                    class="text-primary-black dark:text-primary-white transition-colors" 
                                />
                                <span class="text-sm font-medium text-primary-black dark:text-primary-white">
                                    {{ member.name }}
                                </span>
                            </div>

                            <!-- Hover Card -->
                            <Transition
                                enter-active-class="transition-all duration-300 ease-out"
                                leave-active-class="transition-all duration-200 ease-in"
                                enter-from-class="opacity-0 translate-y-2 scale-95"
                                enter-to-class="opacity-100 translate-y-0 scale-100"
                                leave-from-class="opacity-100 translate-y-0 scale-100"
                                leave-to-class="opacity-0 translate-y-2 scale-95"
                            >
                                <a 
                                    v-if="hoveredMember === index"
                                    :href="member.linkedIn"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="absolute right-0 top-full mt-3 z-50 w-80 bg-white dark:bg-[#111] rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 p-4 flex gap-4 hover:border-primary-black dark:hover:border-gray-600 transition-colors"
                                    @mouseenter="handleMouseEnter(index)"
                                    @mouseleave="handleMouseLeave"
                                >
                                    <!-- Member Image/Avatar -->
                                    <div class="flex-shrink-0">
                                        <img 
                                            v-if="member.image"
                                            :src="member.image" 
                                            :alt="member.name"
                                            class="w-14 h-14 rounded-full object-cover border border-gray-100 dark:border-gray-800"
                                        />
                                        <div 
                                            v-else
                                            class="w-14 h-14 rounded-full bg-primary-black dark:bg-primary-white flex items-center justify-center"
                                        >
                                            <span class="text-primary-white dark:text-primary-black text-lg font-bold">
                                                {{ member.name.charAt(0) }}
                                            </span>
                                        </div>
                                    </div>

                                    <!-- Member Info -->
                                    <div class="flex-1 min-w-0 flex flex-col justify-center">
                                        <div class="flex flex-col">
                                            <h5 class="font-bold text-gray-900 dark:text-white truncate text-base">
                                                {{ member.name }}
                                            </h5>
                                            <p class="text-xs text-gray-500 dark:text-gray-400 mb-1 truncate">
                                                {{ member.role }}
                                            </p>
                                            <div class="flex items-center gap-1 group/link">
                                                <span class="text-xs font-medium text-primary-black dark:text-primary-white group-hover/link:underline">
                                                    View on LinkedIn
                                                </span>
                                                <svg class="w-3 h-3 text-primary-black dark:text-primary-white transform group-hover/link:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </Transition>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
