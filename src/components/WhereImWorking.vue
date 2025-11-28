<script setup>
const currentRole = {
    company: 'PMaps',
    position: 'UX Engineer',
    period: 'Jul 2023 – Present',
    description: {
        intro: 'PMaps builds',
        highlight1: 'AI-driven psychometric tools',
        middle: 'to help recruiters make',
        highlight2: 'smarter hiring decisions',
        outro: '. I work here as a',
        role: 'UX Engineer',
        details: ', combining frontend engineering with design thinking to build powerful,',
        highlight3: 'user-focused tools across web platforms',
    }
}
</script>

<template>
    <section class="py-16 md:py-24">
        <div class="max-w-7xl mx-auto">
            <!-- Section Header with Dashed Line + Asterisk -->
            <div class="relative mb-12 md:mb-16">
                <div class="flex items-center justify-between">
                    <!-- Left: Title -->
                    <h2 class="text-3xl md:text-4xl font-bold">Where I'm Working.</h2>
                </div>
            </div>

            <!-- Job Card -->
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-3xl p-8 md:p-12 max-w-5xl shadow-xl hover:shadow-2xl">
                <!-- Company + Role + Period -->
                <h3 class="text-xl md:text-2xl font-bold mb-6">
                    {{ currentRole.company }} – {{ currentRole.position }} | {{ currentRole.period }}
                </h3>

                <!-- Description with Bold Highlights -->
                <p class="text-base md:text-lg leading-relaxed text-gray-800 dark:text-gray-200">
                    {{ currentRole.description.intro }}
                    <strong class="font-bold">{{ currentRole.description.highlight1 }}</strong>
                    {{ currentRole.description.middle }}
                    <strong class="font-bold">{{ currentRole.description.highlight2 }}</strong>{{
                    currentRole.description.outro }}
                    <strong class="font-bold">{{ currentRole.description.role }}</strong>{{
                    currentRole.description.details }}
                    <strong class="font-bold">{{ currentRole.description.highlight3 }}</strong>.
                </p>
            </div>
        </div>
    </section>
</template>
