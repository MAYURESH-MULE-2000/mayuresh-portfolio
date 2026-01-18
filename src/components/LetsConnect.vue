<script setup>
import { ref } from 'vue'
import { Instagram, FileText, Linkedin, Globe, Copy, Check } from 'lucide-vue-next'

const formData = ref({
    name: '',
    email: '',
    contactNumber: '',
    message: '',
})

const isSubmitting = ref(false)
const copied = ref(false)
const emailAddress = 'uxmayuresh@gmail.com'

const handleSubmit = async () => {
    isSubmitting.value = true

    console.log('Form submitted:', formData.value)

    setTimeout(() => {
        alert('Thanks for reaching out! I\'ll get back to you soon.')
        formData.value = {
            name: '',
            email: '',
            contactNumber: '',
            message: '',
        }
        isSubmitting.value = false
    }, 1000)
}

const copyEmail = async () => {
    try {
        await navigator.clipboard.writeText(emailAddress)
        copied.value = true

        setTimeout(() => {
            copied.value = false
        }, 2000)
    } catch (err) {
        console.error('Failed to copy:', err)
    }
}

const avatars = [
    '/images/avatars/avatar-1.png', // Left top (glasses)
    '/images/avatars/avatar-2.png', // Left bottom (headphones)
    '/images/avatars/avatar-3.png', // Right top (lightbulb)
    '/images/avatars/avatar-4.png', // Right middle (profile)
    '/images/avatars/avatar-5.png', // Right bottom (surprised)
]
</script>

<template>
    <section >
        <div class="max-w-7xl mx-auto">
            <!-- Section Header -->
            <div class="mb-4">
                <h2 class="text-3xl md:text-4xl font-bold">Let's Connect</h2>
                <p class="text-gray-600 mt-2 mb-10 dark:text-gray-400 text-lg transition-colors duration-300">
                   Open to discussions around product design, UX engineering, trust systems, and meaningful problem-solving.                
                </p>
            </div>

            <!-- Contact Form + Avatars Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                <!-- Left: Contact Form -->
                <form @submit.prevent="handleSubmit" class="space-y-4 max-w-lg">
                    <input v-model="formData.name" type="text" placeholder="Name" required
                        class="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-primary-black dark:focus:border-primary-white transition-colors text-base" />

                    <input v-model="formData.email" type="email" placeholder="Email" required
                        class="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-primary-black dark:focus:border-primary-white transition-colors text-base" />

                    <input v-model="formData.contactNumber" type="tel" placeholder="Contact Number"
                        class="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-primary-black dark:focus:border-primary-white transition-colors text-base" />

                    <textarea v-model="formData.message" placeholder="Message" rows="4" required
                        class="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-primary-black dark:focus:border-primary-white transition-colors resize-none text-base"></textarea>

                    <!-- Submit button - centered on mobile, left-aligned on desktop -->
                    <div class="flex justify-center md:justify-start">
                        <button type="submit" :disabled="isSubmitting"
                            class="px-10 py-3 bg-primary-black dark:bg-primary-white text-primary-white dark:text-primary-black rounded-md font-medium hover:opacity-80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base">
                            {{ isSubmitting ? 'Sending...' : 'Submit' }}
                        </button>
                    </div>

                    <!-- Mobile Footer - Social Icons & Email (only visible on mobile/tablet) -->
                    <div class="md:hidden mt-8 pt-8 border-t border-gray-300 dark:border-gray-700">
                        <!-- Social Icons -->
                        <div class="flex justify-center gap-4 mb-6">
                            <!-- LinkedIn -->
                            <a href="https://www.linkedin.com/in/mayuresh-mule/" target="_blank" rel="noopener noreferrer"
                                class="w-12 h-12 rounded-full border-2 border-primary-black dark:border-primary-white flex items-center justify-center hover:bg-primary-black hover:dark:bg-primary-white transition-all duration-300 group"
                                aria-label="LinkedIn">
                                <Linkedin :size="20"
                                    class="text-primary-black dark:text-primary-white group-hover:text-primary-white group-hover:dark:text-primary-black transition-colors" />
                            </a>

                            <!-- Resume/CV -->
                            <a href="/ProductMayureshMule.pdf" target="_blank" rel="noopener noreferrer"
                                class="w-12 h-12 rounded-full border-2 border-primary-black dark:border-primary-white flex items-center justify-center hover:bg-primary-black hover:dark:bg-primary-white transition-all duration-300 group"
                                aria-label="Resume">
                                <FileText :size="20"
                                    class="text-primary-black dark:text-primary-white group-hover:text-primary-white group-hover:dark:text-primary-black transition-colors" />
                            </a>

                            <!-- Unicorn Website -->
                            <a href="https://www.unicorncraftstudios.com/" target="_blank" rel="noopener noreferrer"
                                class="w-12 h-12 rounded-full border-2 border-primary-black dark:border-primary-white flex items-center justify-center hover:bg-primary-black hover:dark:bg-primary-white transition-all duration-300 group"
                                aria-label="My Website">
                                <Globe :size="20"
                                    class="text-primary-black dark:text-primary-white group-hover:text-primary-white group-hover:dark:text-primary-black transition-colors" />
                            </a>

                            <!-- Instagram -->
                            <a href="https://www.instagram.com/mayuresh.mule/?igsh=MTJsdWptdzF3dWlvbg%3D%3D#" target="_blank"
                                rel="noopener noreferrer"
                                class="w-12 h-12 rounded-full border-2 border-primary-black dark:border-primary-white flex items-center justify-center hover:bg-primary-black hover:dark:bg-primary-white transition-all duration-300 group"
                                aria-label="Instagram">
                                <Instagram :size="20"
                                    class="text-primary-black dark:text-primary-white group-hover:text-primary-white group-hover:dark:text-primary-black transition-colors" />
                            </a>
                        </div>

                        <!-- Email with Copy Button -->
                        <div class="flex justify-center items-center gap-2">
                            <button @click="copyEmail"
                                class="text-sm tracking-wide hover:text-primary-black dark:hover:text-primary-white transition-colors">
                                {{ emailAddress }}
                            </button>
                            <button @click="copyEmail" class="hover:text-primary-black dark:hover:text-primary-white transition-colors"
                                aria-label="Copy email">
                                <Check v-if="copied" :size="14" class="text-green-500" />
                                <Copy v-else :size="14" class="text-gray-600 dark:text-gray-400" />
                            </button>
                        </div>
                    </div>
                </form>

                <!-- Right: Avatar Illustrations (2 Left + 3 Right) -->
                <div class="hidden lg:flex items-center justify-center relative h-[500px]">
                    <div class="relative w-full max-w-lg h-full">
                        <!-- LEFT COLUMN - 2 Avatars -->

                        <!-- Avatar 1 - Top Left (Glasses) -->
                        <div
                            class="absolute top-8 left-0 w-40 h-40 rounded-full bg-gray-200 dark:bg-gray-800 shadow-xl overflow-hidden transform hover:scale-105 transition-transform">
                            <img :src="avatars[0]" alt="Avatar" class="w-full h-full object-cover" />
                        </div>

                        <!-- Avatar 2 - Bottom Left (Headphones) -->
                        <div
                            class="absolute bottom-8 left-12 w-44 h-44 rounded-full bg-gray-200 dark:bg-gray-800 shadow-xl overflow-hidden transform hover:scale-105 transition-transform z-10">
                            <img :src="avatars[1]" alt="Avatar" class="w-full h-full object-cover" />
                        </div>

                        <!-- RIGHT COLUMN - 3 Avatars -->

                        <!-- Avatar 3 - Top Right (Lightbulb) -->
                        <div
                            class="absolute top-0 right-16 w-44 h-44 rounded-full bg-gray-200 dark:bg-gray-800 shadow-xl overflow-hidden transform hover:scale-105 transition-transform">
                            <img :src="avatars[2]" alt="Avatar" class="w-full h-full object-cover" />
                        </div>

                        <!-- Avatar 4 - Middle Right (Profile) -->
                        <div
                            class="absolute top-32 right-0 w-40 h-40 rounded-full bg-gray-200 dark:bg-gray-800 shadow-xl overflow-hidden transform hover:scale-105 transition-transform">
                            <img :src="avatars[3]" alt="Avatar" class="w-full h-full object-cover" />
                        </div>

                        <!-- Avatar 5 - Bottom Right (Surprised) -->
                        <div
                            class="absolute bottom-4 right-20 w-40 h-40 rounded-full bg-gray-200 dark:bg-gray-800 shadow-xl overflow-hidden transform hover:scale-105 transition-transform">
                            <img :src="avatars[4]" alt="Avatar" class="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
