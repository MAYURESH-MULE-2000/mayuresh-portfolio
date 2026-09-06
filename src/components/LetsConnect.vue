<script setup>
import { ref } from 'vue'
import { Linkedin, Instagram, FileText, BookOpen, CheckCircle, XCircle, X } from 'lucide-vue-next'

const formData = ref({
    name: '',
    email: '',
    message: '',
})

const isSubmitting = ref(false)

// Toast
const toast = ref({ visible: false, type: 'success', title: '', body: '' })
let toastTimer = null

function showToast(type, title, body) {
    clearTimeout(toastTimer)
    toast.value = { visible: true, type, title, body }
    toastTimer = setTimeout(() => { toast.value.visible = false }, 5000)
}

const handleSubmit = async (event) => {
    isSubmitting.value = true

    const form = event.target
    const data = new FormData(form)
    data.append('page_url', window.location.href)

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: data,
        })
        const result = await response.json()

        if (response.ok) {
            showToast('success', 'Message sent!', 'Thanks for reaching out, I\'ll get back to you soon.')
            formData.value = { name: '', email: '', message: '' }
            form.reset()
        } else {
            showToast('error', 'Submission failed', result.message || 'Something went wrong.')
        }
    } catch (error) {
        showToast('error', 'Network error', 'Could not reach the server. Please try again.')
    } finally {
        isSubmitting.value = false
    }
}

const socialLinks = [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/mayuresh-mule/', icon: 'linkedin', external: true },
    { name: 'Resume', href: '/Mayuresh_Mule_26_7_26.pdf', icon: 'file-text', external: true },
    { name: 'Journal', href: '/journal', icon: 'book', external: false },
    { name: 'Instagram', href: 'https://www.instagram.com/mayuresh.mule/?igsh=MTJsdWptdzF3dWlvbg%3D%3D#', icon: 'instagram', external: true },
]
</script>

<template>
    <!-- Toast notification -->
    <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="translate-y-4 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-4 opacity-0"
    >
        <div
            v-if="toast.visible"
            class="fixed bottom-6 right-6 z-50 flex items-start gap-3 px-4 py-3.5 rounded-2xl shadow-xl border max-w-sm w-full"
            :class="toast.type === 'success'
                ? 'bg-white dark:bg-gray-900 border-emerald-200 dark:border-emerald-800/40'
                : 'bg-white dark:bg-gray-900 border-red-200 dark:border-red-800/40'"
        >
            <CheckCircle v-if="toast.type === 'success'" class="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <XCircle v-else class="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ toast.title }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{{ toast.body }}</p>
            </div>
            <button @click="toast.visible = false" class="text-gray-300 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400 transition-colors shrink-0">
                <X class="w-4 h-4" />
            </button>
        </div>
    </Transition>

    <section class="py-20">
        <div class="max-w-2xl mx-auto">
            <!-- Section Header -->
            <div class="mb-10">
                <h2 class="text-3xl md:text-4xl font-bold text-primary-black dark:text-primary-white transition-colors duration-300">Let's Connect</h2>
                <p class="text-gray-600 dark:text-gray-400 text-lg mt-3 transition-colors duration-300">
                    Open to discussions around product design, UX engineering, trust systems, and meaningful problem-solving.
                </p>
            </div>

            <!-- Contact Form -->
            <form @submit.prevent="handleSubmit" class="space-y-5">
                <input type="hidden" name="access_key" value="577b3979-b134-4af9-b0bf-158a5e2f6688" />

                <input
                    v-model="formData.name"
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    class="w-full px-5 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-primary-black dark:focus:border-primary-white transition-colors text-base"
                />

                <input
                    v-model="formData.email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    class="w-full px-5 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-primary-black dark:focus:border-primary-white transition-colors text-base"
                />

                <textarea
                    v-model="formData.message"
                    name="message"
                    placeholder="Message"
                    rows="5"
                    required
                    class="w-full px-5 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-primary-black dark:focus:border-primary-white transition-colors resize-none text-base"
                ></textarea>

                <button
                    type="submit"
                    :disabled="isSubmitting"
                    class="w-full py-3 bg-primary-black dark:bg-primary-white text-primary-white dark:text-primary-black rounded-xl font-medium hover:opacity-80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base"
                >
                    {{ isSubmitting ? 'Sending...' : 'Submit' }}
                </button>
            </form>

            <!-- Social Icons Row (Mobile Only, mirrors Left Sidebar) -->
            <div class="flex md:hidden items-center justify-center gap-4 mt-10">
                <template v-for="link in socialLinks" :key="link.name">
                    <a
                        :href="link.href"
                        :target="link.external ? '_blank' : undefined"
                        :rel="link.external ? 'noopener noreferrer' : undefined"
                        class="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:bg-primary-black dark:hover:bg-primary-white transition-all duration-300 hover:-translate-y-0.5 group"
                        :aria-label="link.name"
                    >
                        <!-- LinkedIn -->
                        <Linkedin
                            v-if="link.icon === 'linkedin'"
                            :size="18"
                            class="text-primary-black dark:text-primary-white group-hover:text-primary-white dark:group-hover:text-primary-black transition-colors"
                        />

                        <!-- Resume -->
                        <FileText
                            v-else-if="link.icon === 'file-text'"
                            :size="18"
                            class="text-primary-black dark:text-primary-white group-hover:text-primary-white dark:group-hover:text-primary-black transition-colors"
                        />

                        <!-- Journal -->
                        <BookOpen
                            v-else-if="link.icon === 'book'"
                            :size="18"
                            class="text-primary-black dark:text-primary-white group-hover:text-primary-white dark:group-hover:text-primary-black transition-all duration-300 group-hover:rotate-[-8deg]"
                        />

                        <!-- Instagram -->
                        <Instagram
                            v-else-if="link.icon === 'instagram'"
                            :size="18"
                            class="text-primary-black dark:text-primary-white group-hover:text-primary-white dark:group-hover:text-primary-black transition-colors"
                        />
                    </a>
                </template>
            </div>
        </div>
    </section>
</template>
