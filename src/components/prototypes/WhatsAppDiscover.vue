<script setup>
/**
 * Interactive Android prototype for the WhatsApp "Discover" case study.
 * Everything is local state - no network, no real WhatsApp assets.
 */
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import {
    Compass, IndianRupee, Camera, MoreVertical, Search, ArrowLeft, MapPin, Check,
    Plus, MessageCircle, Phone, Users, Radio, Store, Rocket, Eye, ShieldCheck,
    ChevronRight, Send, Archive, Lock, Sparkles, Maximize2, X,
} from 'lucide-vue-next'

const screens = [
    { id: 'chats', label: 'Chats' },
    { id: 'discover', label: 'Discover' },
    { id: 'channel', label: 'Merchant channel' },
    { id: 'chat', label: 'Customer chat' },
    { id: 'updates', label: 'Updates' },
    { id: 'merchant', label: 'Business side' },
]

const merchants = [
    { id: 'daily', name: 'Daily Fresh Kirana', category: 'Grocery', distance: '400 m', emoji: '🛒', tint: 'bg-emerald-500/25', followers: '312', boosted: false, time: '11:04 AM', post: 'Fresh stock in - Alphonso mangoes ₹240/dozen, today only.' },
    { id: 'crown', name: 'Crown Salon & Spa', category: 'Salon', distance: '650 m', emoji: '💈', tint: 'bg-violet-500/25', followers: '1.2K', boosted: true, time: '10:52 AM', post: 'Weekday offer: haircut + beard styling at ₹399 till Friday.' },
    { id: 'bakers', name: 'Sunrise Bakers', category: 'Bakery', distance: '900 m', emoji: '🥐', tint: 'bg-amber-500/25', followers: '840', boosted: false, time: '9:18 AM', post: 'Fresh croissants out of the oven at 7am and 5pm daily.' },
    { id: 'medico', name: 'Medico Pharmacy', category: 'Pharmacy', distance: '1.1 km', emoji: '💊', tint: 'bg-sky-500/25', followers: '506', boosted: false, time: 'Yesterday', post: 'Now open till 11pm. Free home delivery within 2 km.' },
    { id: 'stitch', name: 'Perfect Fit Tailors', category: 'Tailor', distance: '1.4 km', emoji: '🧵', tint: 'bg-rose-500/25', followers: '198', boosted: false, time: 'Yesterday', post: 'Wedding season slots open - 3 day turnaround on blouses.' },
]

const categories = ['Following', 'All', 'Grocery', 'Salon', 'Bakery', 'Pharmacy', 'Tailor']
const updatesFilters = ['All', 'Channels', 'Groups', 'Status']

const groupUpdates = [
    { id: 'g1', name: 'Portfolio Builders 2.0', emoji: '🧩', tint: 'bg-indigo-500/25', text: 'General Chat 2.0 · 3 new messages in UI/UX Community V.2', time: '11:12 AM' },
    { id: 'g2', name: 'Cohort 51 - HelloPM', emoji: '📚', tint: 'bg-amber-500/25', text: '~Deepak: Office hours session started', time: '9:00 PM' },
]

const statusUpdates = [
    { id: 's1', name: 'Saurabh', emoji: '🏔️', tint: 'bg-teal-500/25', text: '2 new updates', time: '22m ago' },
]

const screen = ref('chats')
const consentGranted = ref(false)
const showConsent = ref(false)
const radius = ref(2)
const activeCategory = ref('All')
const discoverQuery = ref('')
const updatesQuery = ref('')
const updatesFilter = ref('All')
const loading = ref(false)
const following = ref([])
const activeMerchantId = ref('crown')
const toast = ref('')
const discoverable = ref(true)
const boosted = ref(false)
const showBoostSheet = ref(false)
const boostRadius = ref(3)
const chatMessages = ref([])
const typing = ref(false)

let toastTimer = null
let typingTimer = null
let loadTimer = null

const activeMerchant = computed(
    () => merchants.find((m) => m.id === activeMerchantId.value) || merchants[0]
)

const matches = (query, ...fields) => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return fields.join(' ').toLowerCase().includes(q)
}

const isFollowingTab = computed(() => activeCategory.value === 'Following')

const visibleMerchants = computed(() => {
    const withinRadius = merchants.filter((m) => {
        const km = m.distance.includes('km') ? parseFloat(m.distance) : parseFloat(m.distance) / 1000
        return km <= radius.value
    })
    const searched = withinRadius.filter((m) => matches(discoverQuery.value, m.name, m.category))
    const filtered =
        activeCategory.value === 'All'
            ? searched
            : searched.filter((m) => m.category === activeCategory.value)
    // Boosted merchants rank first - that is the entire paid product.
    return [...filtered].sort((a, b) => Number(b.boosted) - Number(a.boosted))
})

const followedMerchants = computed(() => merchants.filter((m) => following.value.includes(m.id)))

// The Following tab reads as a chat list - these are conversations now, not listings.
const followingChats = computed(() =>
    followedMerchants.value.filter((m) => matches(discoverQuery.value, m.name, m.category, m.post))
)

const updateItems = computed(() => {
    const channels = followedMerchants.value.map((m) => ({
        kind: 'Channels', id: m.id, name: m.name, emoji: m.emoji, tint: m.tint,
        text: m.post, time: m.time, merchant: m,
    }))
    const groups = groupUpdates.map((g) => ({ ...g, kind: 'Groups', merchant: null }))
    const statuses = statusUpdates.map((s) => ({ ...s, kind: 'Status', merchant: null }))

    return [...channels, ...groups, ...statuses]
        .filter((item) => updatesFilter.value === 'All' || item.kind === updatesFilter.value)
        .filter((item) => matches(updatesQuery.value, item.name, item.text))
})

const isFollowing = (id) => following.value.includes(id)

function flash(message) {
    toast.value = message
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => (toast.value = ''), 2600)
}

function runSearch() {
    loading.value = true
    clearTimeout(loadTimer)
    loadTimer = setTimeout(() => (loading.value = false), 700)
}

function openDiscover() {
    if (!consentGranted.value) {
        showConsent.value = true
        return
    }
    screen.value = 'discover'
    runSearch()
}

function allowLocation() {
    consentGranted.value = true
    showConsent.value = false
    screen.value = 'discover'
    runSearch()
    flash('Location used for this session only')
}

function setRadius(value) {
    radius.value = value
    runSearch()
}

function toggleFollow(merchant) {
    if (isFollowing(merchant.id)) {
        following.value = following.value.filter((id) => id !== merchant.id)
        flash(`Unfollowed ${merchant.name}`)
        return
    }
    following.value = [...following.value, merchant.id]
    flash(`Following ${merchant.name} - they still can't see you`)
}

function openChannel(merchant) {
    activeMerchantId.value = merchant.id
    screen.value = 'channel'
}

function messageShop() {
    screen.value = 'chat'
    chatMessages.value = [
        { from: 'me', text: `Hi! Do you have slots free this evening?`, time: '11:32' },
    ]
    typing.value = true
    clearTimeout(typingTimer)
    typingTimer = setTimeout(() => {
        typing.value = false
        chatMessages.value = [
            ...chatMessages.value,
            { from: 'them', text: 'Yes - 6pm and 7:30pm are open. Shall I hold one for you?', time: '11:32' },
        ]
    }, 1800)
}

function confirmBoost() {
    showBoostSheet.value = false
    boosted.value = true
    flash(`Boost live for ${boostRadius.value} km`)
}

function goTo(id) {
    if (id === 'discover') {
        openDiscover()
        return
    }
    screen.value = id
}

function resetPrototype() {
    screen.value = 'chats'
    consentGranted.value = false
    showConsent.value = false
    following.value = []
    radius.value = 2
    activeCategory.value = 'All'
    discoverQuery.value = ''
    updatesQuery.value = ''
    updatesFilter.value = 'All'
    boosted.value = false
    discoverable.value = true
    chatMessages.value = []
    flash('Prototype reset')
}

watch(activeCategory, runSearch)

/* ── Fullscreen (the only way to really test this on a phone) ─────── */
const fullscreen = ref(false)

function onKeydown(event) {
    if (event.key === 'Escape') fullscreen.value = false
}

watch(fullscreen, (isOpen) => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = isOpen ? 'hidden' : ''
    if (isOpen) document.addEventListener('keydown', onKeydown)
    else document.removeEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = ''
    document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
    <div class="wa-proto">
        <!-- Screen switcher -->
        <div class="flex flex-wrap items-center gap-2 mb-6">
            <button
                v-for="s in screens"
                :key="s.id"
                type="button"
                class="px-3.5 py-2 rounded-full text-xs font-bold transition-all duration-200 border active:scale-95"
                :class="screen === s.id
                    ? 'bg-gray-900 border-gray-900 text-white dark:bg-white dark:border-white dark:text-gray-900'
                    : 'bg-white dark:bg-white/[0.03] border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'"
                @click="goTo(s.id)"
            >
                {{ s.label }}
            </button>
            <button
                type="button"
                class="px-3.5 py-2 rounded-full text-xs font-bold border border-dashed border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors active:scale-95"
                @click="resetPrototype"
            >
                Reset
            </button>
            <button
                type="button"
                class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold border border-accent-dark/40 dark:border-accent/40 text-accent-dark dark:text-accent hover:bg-accent/10 transition-colors active:scale-95"
                @click="fullscreen = true"
            >
                <Maximize2 :size="13" /> Fullscreen
            </button>
        </div>

        <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            <!-- Phone (inline, or lifted into a fullscreen overlay) -->
            <div
                :class="fullscreen
                    ? 'fixed inset-0 z-[9998] bg-[#05070A] flex flex-col'
                    : 'mx-auto lg:mx-0 shrink-0 w-full max-w-[320px]'"
            >
                <!-- Prototype chrome, so the exit control never sits on top of the app UI -->
                <div v-if="fullscreen" class="h-12 shrink-0 flex items-center justify-between px-4 text-white/60">
                    <span class="text-[10px] font-bold uppercase tracking-widest">Prototype · WhatsApp Discover</span>
                    <button
                        type="button"
                        class="h-9 w-9 -mr-1 rounded-full bg-white/10 text-white flex items-center justify-center active:scale-90 transition-transform"
                        aria-label="Close fullscreen prototype"
                        @click="fullscreen = false"
                    >
                        <X :size="18" />
                    </button>
                </div>

                <div :class="fullscreen ? 'flex-1 min-h-0 flex items-center justify-center sm:p-6' : ''">
                <div
                    class="relative bg-[#0B0F0D] shadow-2xl overflow-hidden select-none"
                    :class="fullscreen
                        ? 'w-full h-full sm:w-[360px] sm:h-[740px] sm:max-h-full rounded-none sm:rounded-[2.4rem] border-0 sm:border-[6px] border-[#1d1f1e]'
                        : 'w-full h-[620px] sm:h-[660px] rounded-[2.4rem] border-[6px] border-[#1d1f1e]'"
                >
                    <!-- Status bar -->
                    <div class="absolute top-0 inset-x-0 h-8 px-5 flex items-center justify-between text-[11px] text-white/80 font-medium z-30">
                        <span>11:31</span>
                        <span class="absolute left-1/2 -translate-x-1/2 top-2 h-3 w-3 rounded-full bg-black/80"></span>
                        <span class="flex items-center gap-1.5">
                            <span class="tracking-tight">4G</span>
                            <span class="inline-block h-2.5 w-4 rounded-[2px] border border-white/60"></span>
                        </span>
                    </div>

                    <!-- Screens -->
                    <Transition name="wa-screen" mode="out-in">
                        <!-- ══ CHATS ══ -->
                        <div v-if="screen === 'chats'" key="chats" class="absolute inset-0 pt-8 pb-14 bg-[#0B141A] text-white overflow-y-auto wa-scroll">
                            <header class="flex items-center justify-between px-4 py-3">
                                <h3 class="text-[22px] font-bold tracking-tight">WhatsApp</h3>
                                <div class="flex items-center gap-1.5">
                                    <!-- NEW: Discover, immediately left of Pay -->
                                    <button
                                        type="button"
                                        class="relative h-9 w-9 rounded-full flex items-center justify-center text-[#25D366] active:scale-90 transition-transform"
                                        aria-label="Discover businesses nearby"
                                        @click="openDiscover"
                                    >
                                        <span class="absolute inset-0 rounded-full bg-[#25D366]/15"></span>
                                        <span class="absolute inset-0 rounded-full border border-[#25D366]/60 wa-pulse"></span>
                                        <Compass :size="19" class="relative" />
                                    </button>
                                    <button type="button" class="h-9 w-9 rounded-full flex items-center justify-center text-white/85 active:scale-90 transition-transform">
                                        <IndianRupee :size="17" class="rounded-full ring-1 ring-white/70 p-[1px] box-content" />
                                    </button>
                                    <button type="button" class="h-9 w-9 rounded-full flex items-center justify-center text-white/85 active:scale-90 transition-transform">
                                        <Camera :size="18" />
                                    </button>
                                    <button type="button" class="h-9 w-9 rounded-full flex items-center justify-center text-white/85 active:scale-90 transition-transform">
                                        <MoreVertical :size="18" />
                                    </button>
                                </div>
                            </header>

                            <div class="px-4 pb-3">
                                <div class="flex items-center gap-3 h-11 rounded-full bg-white/[0.07] px-4 text-white/45 text-[13px]">
                                    <Search :size="16" />
                                    <span>Ask Meta AI or Search</span>
                                </div>
                            </div>

                            <div class="flex items-center gap-4 px-4 py-3 border-b border-white/5 text-white/60">
                                <Archive :size="17" />
                                <span class="text-[13px] flex-1">Archived</span>
                                <span class="text-[11px] text-[#25D366] font-semibold">1,181</span>
                            </div>

                            <p class="text-center text-[10px] text-white/35 py-3 flex items-center justify-center gap-1.5">
                                <Lock :size="10" /> Your personal messages are
                                <span class="text-[#25D366]">end-to-end encrypted</span>
                            </p>

                            <ul>
                                <li
                                    v-for="(m, i) in followedMerchants"
                                    :key="m.id"
                                    class="wa-stagger flex items-center gap-3 px-4 py-3 active:bg-white/5"
                                    :style="{ animationDelay: `${i * 60}ms` }"
                                    @click="openChannel(m)"
                                >
                                    <div class="h-11 w-11 rounded-full flex items-center justify-center text-lg" :class="m.tint">{{ m.emoji }}</div>
                                    <div class="min-w-0 flex-1">
                                        <p class="text-[14px] font-semibold truncate">{{ m.name }}</p>
                                        <p class="text-[12px] text-white/45 truncate">Channel · {{ m.post }}</p>
                                    </div>
                                    <ChevronRight :size="15" class="text-white/25" />
                                </li>
                                <li
                                    v-for="(chat, i) in [
                                        { name: 'Next trip kab?', preview: 'You: Kal lonavala ?', time: '10:36 PM', emoji: '🏔️' },
                                        { name: 'Cohort 51 - HelloPM', preview: 'Office hours session started', time: '9:00 PM', emoji: '📚' },
                                        { name: 'Paully Dass', preview: 'Photo', time: '11:26 PM', emoji: '👤' },
                                    ]"
                                    :key="chat.name"
                                    class="wa-stagger flex items-center gap-3 px-4 py-3 active:bg-white/5"
                                    :style="{ animationDelay: `${(followedMerchants.length + i) * 60}ms` }"
                                >
                                    <div class="h-11 w-11 rounded-full bg-white/10 flex items-center justify-center text-lg">{{ chat.emoji }}</div>
                                    <div class="min-w-0 flex-1">
                                        <p class="text-[14px] font-semibold truncate">{{ chat.name }}</p>
                                        <p class="text-[12px] text-white/45 truncate">{{ chat.preview }}</p>
                                    </div>
                                    <span class="text-[10px] text-white/35">{{ chat.time }}</span>
                                </li>
                            </ul>

                            <button
                                type="button"
                                class="absolute bottom-20 right-4 h-13 w-13 flex items-center justify-center p-4 rounded-2xl bg-[#25D366] text-[#04150F] shadow-lg active:scale-90 transition-transform"
                            >
                                <Plus :size="20" />
                            </button>
                        </div>

                        <!-- ══ DISCOVER ══ -->
                        <div v-else-if="screen === 'discover'" key="discover" class="absolute inset-0 pt-8 pb-14 bg-[#0B141A] text-white overflow-y-auto wa-scroll">
                            <header class="flex items-center gap-3 px-4 py-3.5 sticky top-0 bg-[#0B141A] z-10">
                                <button type="button" class="active:scale-90 transition-transform" @click="screen = 'chats'">
                                    <ArrowLeft :size="19" />
                                </button>
                                <h3 class="text-[17px] font-bold flex-1">Discover</h3>
                                <button
                                    type="button"
                                    class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#25D366]/15 text-[#86EFAC] text-[11px] font-bold active:scale-95 transition-transform"
                                    @click="setRadius(radius === 1 ? 2 : radius === 2 ? 5 : 1)"
                                >
                                    <MapPin :size="12" /> {{ radius }} KM
                                </button>
                            </header>

                            <!-- Search -->
                            <div class="px-4 pb-3">
                                <div class="flex items-center gap-2.5 h-10 rounded-full bg-white/[0.07] px-3.5">
                                    <Search :size="14" class="text-white/40 shrink-0" />
                                    <input
                                        v-model="discoverQuery"
                                        type="text"
                                        placeholder="Search nearby businesses"
                                        class="flex-1 min-w-0 bg-transparent text-[12.5px] text-white placeholder:text-white/40 outline-none"
                                    />
                                    <button
                                        v-if="discoverQuery"
                                        type="button"
                                        class="shrink-0 text-white/40 active:scale-90 transition-transform"
                                        aria-label="Clear search"
                                        @click="discoverQuery = ''"
                                    >
                                        <X :size="14" />
                                    </button>
                                </div>
                            </div>

                            <!-- Filter group -->
                            <div class="flex gap-2 px-4 pb-3 overflow-x-auto wa-scroll">
                                <button
                                    v-for="c in categories"
                                    :key="c"
                                    type="button"
                                    class="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-colors active:scale-95"
                                    :class="activeCategory === c
                                        ? 'bg-[#25D366] border-[#25D366] text-[#04150F]'
                                        : 'border-white/15 text-white/60'"
                                    @click="activeCategory = c"
                                >
                                    {{ c }}
                                    <span
                                        v-if="c === 'Following' && following.length"
                                        class="px-1.5 rounded-full text-[9px] font-black"
                                        :class="activeCategory === c ? 'bg-black/20' : 'bg-white/15 text-white/80'"
                                    >
                                        {{ following.length }}
                                    </span>
                                </button>
                            </div>

                            <!-- FOLLOWING: the channels you follow, as a chat list -->
                            <ul v-if="isFollowingTab" class="px-2">
                                <li
                                    v-for="(m, i) in followingChats"
                                    :key="m.id"
                                    class="wa-stagger flex items-center gap-3 px-2 py-3 rounded-2xl active:bg-white/[0.06]"
                                    :style="{ animationDelay: `${i * 60}ms` }"
                                    @click="openChannel(m)"
                                >
                                    <div class="h-11 w-11 rounded-full flex items-center justify-center text-lg shrink-0" :class="m.tint">
                                        {{ m.emoji }}
                                    </div>
                                    <div class="min-w-0 flex-1">
                                        <div class="flex items-center gap-2">
                                            <p class="text-[13.5px] font-semibold truncate flex-1">{{ m.name }}</p>
                                            <span class="text-[10px] text-white/35 shrink-0">{{ m.time }}</span>
                                        </div>
                                        <div class="flex items-center gap-2 mt-0.5">
                                            <p class="text-[11.5px] text-white/45 truncate flex-1">{{ m.post }}</p>
                                            <span class="h-4 min-w-4 px-1 rounded-full bg-[#25D366] text-[9px] font-black text-[#04150F] flex items-center justify-center shrink-0">1</span>
                                        </div>
                                    </div>
                                </li>
                                <li v-if="!followingChats.length" class="py-14 px-8 text-center">
                                    <Radio :size="24" class="mx-auto text-white/25 mb-3" />
                                    <p class="text-[12px] text-white/45 leading-relaxed">
                                        {{ discoverQuery
                                            ? 'No followed channel matches that search.'
                                            : 'Follow a business and its channel shows up here as a chat.' }}
                                    </p>
                                </li>
                            </ul>

                            <!-- Loading skeletons -->
                            <ul v-else-if="loading" class="px-4 space-y-3">
                                <li v-for="n in 3" :key="n" class="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.05]">
                                    <div class="h-11 w-11 rounded-full wa-shimmer"></div>
                                    <div class="flex-1 space-y-2">
                                        <div class="h-3 w-2/3 rounded wa-shimmer"></div>
                                        <div class="h-2.5 w-1/3 rounded wa-shimmer"></div>
                                    </div>
                                </li>
                            </ul>

                            <ul v-else class="px-4 space-y-3">
                                <li
                                    v-for="(m, i) in visibleMerchants"
                                    :key="m.id"
                                    class="wa-stagger p-3 rounded-2xl bg-white/[0.06] active:bg-white/[0.1]"
                                    :style="{ animationDelay: `${i * 70}ms` }"
                                >
                                    <div class="flex items-center gap-3">
                                        <div class="h-11 w-11 rounded-full flex items-center justify-center text-lg shrink-0" :class="m.tint" @click="openChannel(m)">
                                            {{ m.emoji }}
                                        </div>
                                        <div class="min-w-0 flex-1" @click="openChannel(m)">
                                            <p class="text-[13.5px] font-semibold truncate">{{ m.name }}</p>
                                            <p class="text-[11px] text-white/45 truncate">{{ m.category }} · {{ m.distance }} away</p>
                                        </div>
                                        <button
                                            type="button"
                                            class="shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all duration-300 active:scale-90"
                                            :class="isFollowing(m.id)
                                                ? 'bg-white/10 text-[#86EFAC]'
                                                : 'bg-[#25D366] text-[#04150F]'"
                                            @click="toggleFollow(m)"
                                        >
                                            <span v-if="isFollowing(m.id)" class="flex items-center gap-1"><Check :size="12" /> Following</span>
                                            <span v-else>Follow</span>
                                        </button>
                                    </div>
                                    <span
                                        v-if="m.boosted"
                                        class="inline-block mt-2 ml-14 px-2 py-0.5 rounded-full text-[9px] font-black tracking-widest bg-[#25D366]/20 text-[#86EFAC]"
                                    >
                                        BOOSTED
                                    </span>
                                </li>
                                <li v-if="!visibleMerchants.length" class="py-10 text-center text-white/40 text-[12px] leading-relaxed px-8">
                                    {{ discoverQuery
                                        ? `Nothing matching "${discoverQuery}" within ${radius} km.`
                                        : `No opted-in businesses within ${radius} km yet.` }}
                                </li>
                            </ul>

                            <p class="flex items-center justify-center gap-1.5 text-[10px] text-white/35 px-6 py-5 text-center">
                                <Lock :size="10" /> Merchants never see who follows them
                            </p>
                        </div>

                        <!-- ══ MERCHANT CHANNEL ══ -->
                        <div v-else-if="screen === 'channel'" key="channel" class="absolute inset-0 pt-8 pb-14 bg-[#0B141A] text-white overflow-y-auto wa-scroll">
                            <header class="flex items-center gap-3 px-4 py-3.5">
                                <button type="button" class="active:scale-90 transition-transform" @click="screen = 'discover'">
                                    <ArrowLeft :size="19" />
                                </button>
                                <h3 class="text-[15px] font-bold flex-1 truncate">{{ activeMerchant.name }}</h3>
                            </header>

                            <div class="px-4 pb-4 flex flex-col items-center text-center">
                                <div class="h-16 w-16 rounded-full flex items-center justify-center text-2xl mb-3" :class="activeMerchant.tint">
                                    {{ activeMerchant.emoji }}
                                </div>
                                <p class="text-[15px] font-bold">{{ activeMerchant.name }}</p>
                                <p class="text-[11px] text-white/45 mt-0.5">
                                    Channel · {{ activeMerchant.followers }} followers · {{ activeMerchant.distance }}
                                </p>
                                <button
                                    type="button"
                                    class="mt-4 px-6 py-2 rounded-full text-[12px] font-bold transition-all duration-300 active:scale-95"
                                    :class="isFollowing(activeMerchant.id) ? 'bg-white/10 text-[#86EFAC]' : 'bg-[#25D366] text-[#04150F]'"
                                    @click="toggleFollow(activeMerchant)"
                                >
                                    <span v-if="isFollowing(activeMerchant.id)" class="flex items-center gap-1.5"><Check :size="13" /> Following</span>
                                    <span v-else>Follow</span>
                                </button>
                            </div>

                            <div class="px-4 space-y-3">
                                <article
                                    v-for="(post, i) in [activeMerchant.post, 'Catalogue updated - 12 new items with prices.', 'Open today 9am - 9pm.']"
                                    :key="i"
                                    class="wa-stagger rounded-2xl bg-[#1F2C33] p-3.5"
                                    :style="{ animationDelay: `${i * 80}ms` }"
                                >
                                    <p class="text-[12.5px] leading-relaxed text-white/85">{{ post }}</p>
                                    <p class="text-[10px] text-white/35 mt-2">11:0{{ i + 2 }} AM</p>
                                </article>
                            </div>

                            <div class="px-4 py-5">
                                <button
                                    type="button"
                                    class="w-full py-3 rounded-2xl bg-white/[0.07] text-[12px] font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
                                    @click="messageShop"
                                >
                                    <MessageCircle :size="14" /> Message this shop
                                </button>
                                <p class="text-[10px] text-white/35 text-center mt-3 leading-relaxed">
                                    Your number reaches the merchant only when <em>you</em> send the first message.
                                </p>
                            </div>
                        </div>

                        <!-- ══ CUSTOMER-INITIATED CHAT ══ -->
                        <div v-else-if="screen === 'chat'" key="chat" class="absolute inset-0 pt-8 pb-14 bg-[#0B141A] text-white flex flex-col">
                            <header class="flex items-center gap-3 px-4 py-3 bg-[#1F2C33]">
                                <button type="button" class="active:scale-90 transition-transform" @click="screen = 'channel'">
                                    <ArrowLeft :size="19" />
                                </button>
                                <div class="h-9 w-9 rounded-full flex items-center justify-center" :class="activeMerchant.tint">
                                    {{ activeMerchant.emoji }}
                                </div>
                                <div class="min-w-0 flex-1">
                                    <p class="text-[13.5px] font-semibold truncate">{{ activeMerchant.name }}</p>
                                    <p class="text-[10px] text-white/45">business account</p>
                                </div>
                                <Phone :size="16" class="text-white/70" />
                            </header>

                            <div class="flex-1 overflow-y-auto wa-scroll px-3 py-4 space-y-2">
                                <p class="text-center text-[9.5px] text-white/40 bg-white/[0.04] rounded-lg py-2 px-3 mx-6 leading-relaxed">
                                    You started this chat from a Discover channel. The business now has your number.
                                </p>
                                <div
                                    v-for="(msg, i) in chatMessages"
                                    :key="i"
                                    class="wa-bubble flex"
                                    :class="msg.from === 'me' ? 'justify-end' : 'justify-start'"
                                >
                                    <div
                                        class="max-w-[75%] px-3 py-2 rounded-2xl text-[12.5px] leading-relaxed"
                                        :class="msg.from === 'me' ? 'bg-[#005C4B] rounded-br-md' : 'bg-[#1F2C33] rounded-bl-md'"
                                    >
                                        {{ msg.text }}
                                        <span class="block text-[9px] text-white/40 text-right mt-1">{{ msg.time }}</span>
                                    </div>
                                </div>
                                <div v-if="typing" class="flex justify-start">
                                    <div class="bg-[#1F2C33] px-4 py-3 rounded-2xl rounded-bl-md flex gap-1">
                                        <span class="wa-dot"></span><span class="wa-dot"></span><span class="wa-dot"></span>
                                    </div>
                                </div>
                            </div>

                            <div class="px-3 pb-3 flex items-center gap-2">
                                <div class="flex-1 h-11 rounded-full bg-[#1F2C33] px-4 flex items-center text-[12px] text-white/35">Message</div>
                                <button type="button" class="h-11 w-11 rounded-full bg-[#25D366] text-[#04150F] flex items-center justify-center active:scale-90 transition-transform">
                                    <Send :size="17" />
                                </button>
                            </div>
                        </div>

                        <!-- ══ UPDATES ══ -->
                        <div v-else-if="screen === 'updates'" key="updates" class="absolute inset-0 pt-8 pb-14 bg-[#0B141A] text-white overflow-y-auto wa-scroll">
                            <header class="px-4 py-3.5">
                                <h3 class="text-[22px] font-bold tracking-tight">Updates</h3>
                            </header>

                            <!-- Search -->
                            <div class="px-4 pb-3">
                                <div class="flex items-center gap-2.5 h-10 rounded-full bg-white/[0.07] px-3.5">
                                    <Search :size="14" class="text-white/40 shrink-0" />
                                    <input
                                        v-model="updatesQuery"
                                        type="text"
                                        placeholder="Search updates"
                                        class="flex-1 min-w-0 bg-transparent text-[12.5px] text-white placeholder:text-white/40 outline-none"
                                    />
                                    <button
                                        v-if="updatesQuery"
                                        type="button"
                                        class="shrink-0 text-white/40 active:scale-90 transition-transform"
                                        aria-label="Clear search"
                                        @click="updatesQuery = ''"
                                    >
                                        <X :size="14" />
                                    </button>
                                </div>
                            </div>

                            <!-- Filter group -->
                            <div class="flex gap-2 px-4 pb-3 overflow-x-auto wa-scroll">
                                <button
                                    v-for="f in updatesFilters"
                                    :key="f"
                                    type="button"
                                    class="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-colors active:scale-95"
                                    :class="updatesFilter === f
                                        ? 'bg-[#25D366] border-[#25D366] text-[#04150F]'
                                        : 'border-white/15 text-white/60'"
                                    @click="updatesFilter = f"
                                >
                                    {{ f }}
                                    <span
                                        v-if="f === 'Channels' && following.length"
                                        class="px-1.5 rounded-full text-[9px] font-black"
                                        :class="updatesFilter === f ? 'bg-black/20' : 'bg-white/15 text-white/80'"
                                    >
                                        {{ following.length }}
                                    </span>
                                    <span
                                        v-if="f === 'Groups'"
                                        class="px-1.5 rounded-full text-[9px] font-black"
                                        :class="updatesFilter === f ? 'bg-black/20' : 'bg-white/15 text-white/80'"
                                    >
                                        {{ groupUpdates.length }}
                                    </span>
                                </button>
                            </div>

                            <div v-if="updateItems.length" class="px-4 space-y-3">
                                <article
                                    v-for="(item, i) in updateItems"
                                    :key="item.kind + item.id"
                                    class="wa-stagger rounded-2xl bg-white/[0.05] p-3.5 active:bg-white/[0.09]"
                                    :style="{ animationDelay: `${i * 70}ms` }"
                                    @click="item.merchant && openChannel(item.merchant)"
                                >
                                    <div class="flex items-center gap-2.5 mb-2">
                                        <div class="h-8 w-8 rounded-full flex items-center justify-center text-sm shrink-0" :class="item.tint">
                                            {{ item.emoji }}
                                        </div>
                                        <p class="text-[12.5px] font-semibold flex-1 truncate">{{ item.name }}</p>
                                        <span class="text-[10px] text-white/35 shrink-0">{{ item.time }}</span>
                                    </div>
                                    <p class="text-[12px] text-white/70 leading-relaxed">
                                        <span
                                            class="inline-block align-middle mr-1.5 px-1.5 py-0.5 rounded text-[8.5px] font-black uppercase tracking-widest bg-white/10 text-white/50"
                                        >
                                            {{ item.kind }}
                                        </span>
                                        {{ item.text }}
                                    </p>
                                </article>
                            </div>

                            <div v-else class="px-8 py-16 text-center">
                                <Radio :size="26" class="mx-auto text-white/25 mb-4" />
                                <p class="text-[12.5px] text-white/50 leading-relaxed mb-5">
                                    {{ updatesQuery
                                        ? `Nothing matching "${updatesQuery}" in ${updatesFilter === 'All' ? 'your updates' : updatesFilter}.`
                                        : 'No local channels yet. Open Discover to find businesses near you.' }}
                                </p>
                                <button
                                    v-if="!updatesQuery"
                                    type="button"
                                    class="px-5 py-2.5 rounded-full bg-[#25D366] text-[#04150F] text-[12px] font-bold active:scale-95 transition-transform"
                                    @click="openDiscover"
                                >
                                    Open Discover
                                </button>
                            </div>
                        </div>

                        <!-- ══ BUSINESS SIDE ══ -->
                        <div v-else key="merchant" class="absolute inset-0 pt-8 pb-14 bg-[#0B141A] text-white overflow-y-auto wa-scroll">
                            <header class="flex items-center gap-3 px-4 py-3.5">
                                <button type="button" class="active:scale-90 transition-transform" @click="screen = 'chats'">
                                    <ArrowLeft :size="19" />
                                </button>
                                <h3 class="text-[15px] font-bold flex-1">Discoverability</h3>
                                <Store :size="17" class="text-white/60" />
                            </header>

                            <div class="px-4 space-y-3">
                                <div class="rounded-2xl bg-white/[0.06] p-4 flex items-center gap-3">
                                    <div class="min-w-0 flex-1">
                                        <p class="text-[13px] font-semibold">Show my business in Discover</p>
                                        <p class="text-[11px] text-white/45 mt-0.5 leading-relaxed">Free. Nearby customers can find and follow your channel.</p>
                                    </div>
                                    <button
                                        type="button"
                                        class="shrink-0 h-7 w-12 rounded-full transition-colors duration-300 relative"
                                        :class="discoverable ? 'bg-[#25D366]' : 'bg-white/15'"
                                        role="switch"
                                        :aria-checked="discoverable"
                                        @click="discoverable = !discoverable"
                                    >
                                        <span
                                            class="absolute top-1 h-5 w-5 rounded-full bg-white transition-all duration-300"
                                            :class="discoverable ? 'left-6' : 'left-1'"
                                        ></span>
                                    </button>
                                </div>

                                <div class="rounded-2xl bg-white/[0.06] p-4">
                                    <p class="text-[13px] font-semibold mb-3">Discovery radius</p>
                                    <div class="flex gap-2">
                                        <button
                                            v-for="r in [1, 3, 5]"
                                            :key="r"
                                            type="button"
                                            class="flex-1 py-2 rounded-xl text-[12px] font-bold transition-all active:scale-95"
                                            :class="boostRadius === r ? 'bg-[#25D366] text-[#04150F]' : 'bg-white/[0.07] text-white/60'"
                                            @click="boostRadius = r"
                                        >
                                            {{ r }} km
                                        </button>
                                    </div>
                                </div>

                                <div class="grid grid-cols-2 gap-3">
                                    <div class="rounded-2xl bg-white/[0.06] p-4">
                                        <Eye :size="15" class="text-[#86EFAC] mb-2" />
                                        <p class="text-[20px] font-black leading-none">128</p>
                                        <p class="text-[10px] text-white/45 mt-1.5">Channel views</p>
                                    </div>
                                    <div class="rounded-2xl bg-white/[0.06] p-4">
                                        <Users :size="15" class="text-[#86EFAC] mb-2" />
                                        <p class="text-[20px] font-black leading-none">24</p>
                                        <p class="text-[10px] text-white/45 mt-1.5">New followers</p>
                                    </div>
                                </div>

                                <div class="rounded-2xl bg-white/[0.04] p-3.5 flex gap-2.5 items-start">
                                    <ShieldCheck :size="14" class="text-[#86EFAC] mt-0.5 shrink-0" />
                                    <p class="text-[10.5px] text-white/50 leading-relaxed">
                                        Aggregate counts only. You never receive follower names or numbers.
                                    </p>
                                </div>

                                <div
                                    class="rounded-2xl p-4 border transition-colors duration-300"
                                    :class="boosted ? 'bg-[#25D366]/12 border-[#25D366]/40' : 'bg-white/[0.06] border-transparent'"
                                >
                                    <div class="flex items-center gap-2 mb-1.5">
                                        <Rocket :size="15" :class="boosted ? 'text-[#86EFAC]' : 'text-white/70'" />
                                        <p class="text-[13px] font-semibold flex-1">{{ boosted ? 'Boost is live' : 'Boost visibility' }}</p>
                                        <Sparkles v-if="boosted" :size="13" class="text-[#86EFAC]" />
                                    </div>
                                    <p class="text-[11px] text-white/45 leading-relaxed mb-3">
                                        {{ boosted
                                            ? `Ranking higher within ${boostRadius} km for the next 7 days.`
                                            : 'Rank higher in Discover for a wider radius. Pay only after you have seen organic results.' }}
                                    </p>
                                    <button
                                        v-if="!boosted"
                                        type="button"
                                        class="w-full py-2.5 rounded-xl bg-[#25D366] text-[#04150F] text-[12px] font-bold active:scale-95 transition-transform"
                                        @click="showBoostSheet = true"
                                    >
                                        Boost this channel
                                    </button>
                                    <button
                                        v-else
                                        type="button"
                                        class="w-full py-2.5 rounded-xl bg-white/[0.08] text-[12px] font-bold active:scale-95 transition-transform"
                                        @click="boosted = false"
                                    >
                                        Stop boost
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Transition>

                    <!-- Consent bottom sheet -->
                    <Transition name="wa-sheet">
                        <div v-if="showConsent" class="absolute inset-0 z-40 flex items-end" @click.self="showConsent = false">
                            <div class="absolute inset-0 bg-black/60"></div>
                            <div class="relative w-full rounded-t-3xl bg-[#1F2C33] text-white p-6 pb-8">
                                <span class="block h-1 w-10 rounded-full bg-white/20 mx-auto mb-5"></span>
                                <div class="h-11 w-11 rounded-2xl bg-[#25D366]/15 text-[#86EFAC] flex items-center justify-center mb-4">
                                    <MapPin :size="19" />
                                </div>
                                <h4 class="text-[16px] font-bold mb-2">Find businesses near you?</h4>
                                <ul class="space-y-2 mb-6">
                                    <li v-for="line in [
                                        'Location is used for this session only - never in the background.',
                                        'Only businesses that opted in are shown.',
                                        'Merchants never see who viewed or followed them.',
                                    ]" :key="line" class="flex gap-2 text-[11.5px] text-white/60 leading-relaxed">
                                        <Check :size="12" class="text-[#86EFAC] mt-0.5 shrink-0" /> {{ line }}
                                    </li>
                                </ul>
                                <div class="flex gap-3">
                                    <button type="button" class="flex-1 py-3 rounded-xl bg-white/[0.08] text-[12px] font-bold active:scale-95 transition-transform" @click="showConsent = false">
                                        Not now
                                    </button>
                                    <button type="button" class="flex-1 py-3 rounded-xl bg-[#25D366] text-[#04150F] text-[12px] font-bold active:scale-95 transition-transform" @click="allowLocation">
                                        Allow once
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Transition>

                    <!-- Boost sheet -->
                    <Transition name="wa-sheet">
                        <div v-if="showBoostSheet" class="absolute inset-0 z-40 flex items-end" @click.self="showBoostSheet = false">
                            <div class="absolute inset-0 bg-black/60"></div>
                            <div class="relative w-full rounded-t-3xl bg-[#1F2C33] text-white p-6 pb-8">
                                <span class="block h-1 w-10 rounded-full bg-white/20 mx-auto mb-5"></span>
                                <h4 class="text-[16px] font-bold mb-1">Boost in Discover</h4>
                                <p class="text-[11.5px] text-white/50 mb-5">Higher ranking inside your radius for 7 days.</p>
                                <div class="flex gap-2 mb-5">
                                    <button
                                        v-for="r in [1, 3, 5]"
                                        :key="r"
                                        type="button"
                                        class="flex-1 py-2.5 rounded-xl text-[12px] font-bold transition-all active:scale-95"
                                        :class="boostRadius === r ? 'bg-[#25D366] text-[#04150F]' : 'bg-white/[0.07] text-white/60'"
                                        @click="boostRadius = r"
                                    >
                                        {{ r }} km
                                    </button>
                                </div>
                                <div class="flex items-center justify-between mb-5">
                                    <span class="text-[12px] text-white/60">Estimated reach</span>
                                    <span class="text-[13px] font-bold">{{ boostRadius * 1400 }} people</span>
                                </div>
                                <button type="button" class="w-full py-3 rounded-xl bg-[#25D366] text-[#04150F] text-[12.5px] font-bold active:scale-95 transition-transform" @click="confirmBoost">
                                    Start boost · ₹{{ boostRadius * 149 }}
                                </button>
                            </div>
                        </div>
                    </Transition>

                    <!-- Toast -->
                    <Transition name="wa-toast">
                        <div v-if="toast" class="absolute bottom-20 inset-x-4 z-50">
                            <div class="rounded-xl bg-black/85 backdrop-blur px-4 py-3 text-[11.5px] text-white/90 text-center leading-relaxed">
                                {{ toast }}
                            </div>
                        </div>
                    </Transition>

                    <!-- Bottom nav -->
                    <nav class="absolute bottom-0 inset-x-0 h-14 bg-[#0B141A]/95 backdrop-blur border-t border-white/5 flex items-center justify-around text-[9.5px] z-20">
                        <button
                            v-for="tab in [
                                { id: 'chats', label: 'Chats', icon: MessageCircle },
                                { id: 'updates', label: 'Updates', icon: Radio },
                                { id: 'discover', label: 'Discover', icon: Compass },
                                { id: 'merchant', label: 'Business', icon: Store },
                            ]"
                            :key="tab.id"
                            type="button"
                            class="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors active:scale-90"
                            :class="screen === tab.id ? 'text-[#25D366]' : 'text-white/45'"
                            @click="goTo(tab.id)"
                        >
                            <component :is="tab.icon" :size="17" />
                            {{ tab.label }}
                        </button>
                    </nav>
                </div>
                </div>
            </div>

            <!-- Annotations -->
            <div class="flex-1 space-y-4 min-w-0">
                <div class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.02] p-6">
                    <h3 class="font-bold text-base mb-3">What to try</h3>
                    <ol class="space-y-2.5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed list-decimal pl-4">
                        <li>Tap the <strong class="text-gray-900 dark:text-gray-100">compass</strong> in the header - it sits immediately left of Pay - and allow location once.</li>
                        <li>Search nearby businesses, or filter by category; change the radius chip and watch the list re-query. The boosted salon always ranks first.</li>
                        <li>Follow a shop, then open the <strong class="text-gray-900 dark:text-gray-100">Following</strong> tab - followed channels turn into a chat list with unread counts.</li>
                        <li>In <strong class="text-gray-900 dark:text-gray-100">Updates</strong>, filter across Channels, Groups and Status, or search every update at once.</li>
                        <li>Open a channel and hit <strong class="text-gray-900 dark:text-gray-100">Message this shop</strong>: identity only moves customer → merchant.</li>
                        <li>Switch to <strong class="text-gray-900 dark:text-gray-100">Business side</strong> to toggle discoverability and buy a boost.</li>
                    </ol>
                </div>

                <div class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.02] p-6">
                    <h3 class="font-bold text-base mb-3">Micro-interactions in the build</h3>
                    <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        <li>· Pulsing ring on the Discover entry point - the only new affordance in a familiar header.</li>
                        <li>· Consent sheet slides up before any location read; "Allow once" is the primary action, not "Always".</li>
                        <li>· Skeleton shimmer on every radius or category change, so the query feels local and cheap.</li>
                        <li>· Search filters as you type, with a clear button and an empty state that quotes the query back.</li>
                        <li>· The Following tab reframes a listing as a conversation - same rows, unread badge, no new mental model.</li>
                        <li>· Follow morphs in place to "Following ✓" and fires a toast that restates the privacy rule.</li>
                        <li>· Staggered list entry, typing dots in chat, and a spring on every tap target.</li>
                    </ul>
                </div>

                <p class="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                    Prototype only - an independent concept study, not affiliated with or endorsed by WhatsApp or Meta.
                    Android shell, brand colours approximated.
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.wa-scroll::-webkit-scrollbar { display: none; }
.wa-scroll { scrollbar-width: none; }

/* Screen transition */
.wa-screen-enter-active,
.wa-screen-leave-active { transition: opacity 220ms ease, transform 220ms ease; }
.wa-screen-enter-from { opacity: 0; transform: translateX(14px); }
.wa-screen-leave-to { opacity: 0; transform: translateX(-14px); }

/* Bottom sheets */
.wa-sheet-enter-active,
.wa-sheet-leave-active { transition: opacity 240ms ease; }
.wa-sheet-enter-active > div:last-child,
.wa-sheet-leave-active > div:last-child { transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1); }
.wa-sheet-enter-from,
.wa-sheet-leave-to { opacity: 0; }
.wa-sheet-enter-from > div:last-child,
.wa-sheet-leave-to > div:last-child { transform: translateY(100%); }

/* Toast */
.wa-toast-enter-active,
.wa-toast-leave-active { transition: opacity 220ms ease, transform 220ms ease; }
.wa-toast-enter-from,
.wa-toast-leave-to { opacity: 0; transform: translateY(8px); }

/* Discover pulse */
.wa-pulse { animation: wa-pulse 2.4s ease-out infinite; }
@keyframes wa-pulse {
  0% { transform: scale(1); opacity: 0.9; }
  70% { transform: scale(1.5); opacity: 0; }
  100% { transform: scale(1.5); opacity: 0; }
}

/* List entry */
.wa-stagger { animation: wa-rise 320ms cubic-bezier(0.22, 1, 0.36, 1) both; }
@keyframes wa-rise {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Chat bubble */
.wa-bubble { animation: wa-pop 260ms cubic-bezier(0.22, 1, 0.36, 1) both; }
@keyframes wa-pop {
  from { opacity: 0; transform: translateY(6px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* Skeleton */
.wa-shimmer {
  background: linear-gradient(90deg, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.14) 37%, rgba(255,255,255,0.06) 63%);
  background-size: 400% 100%;
  animation: wa-shimmer 1.3s ease infinite;
}
@keyframes wa-shimmer {
  0% { background-position: 100% 50%; }
  100% { background-position: 0 50%; }
}

/* Typing dots */
.wa-dot {
  height: 6px; width: 6px; border-radius: 9999px; background: rgba(255,255,255,0.55);
  animation: wa-blink 1.2s infinite ease-in-out;
}
.wa-dot:nth-child(2) { animation-delay: 0.18s; }
.wa-dot:nth-child(3) { animation-delay: 0.36s; }
@keyframes wa-blink {
  0%, 80%, 100% { opacity: 0.3; transform: translateY(0); }
  40% { opacity: 1; transform: translateY(-2px); }
}

@media (prefers-reduced-motion: reduce) {
  .wa-pulse, .wa-stagger, .wa-bubble, .wa-shimmer, .wa-dot { animation: none; }
}
</style>
