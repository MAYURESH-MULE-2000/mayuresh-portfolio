<script setup>
defineProps({
    size: {
        type: Number,
        default: 20
    }
})
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <!-- Horn (geometric triangle spike) -->
        <path d="M12 2 L13.5 6.5 L12 7.5 L10.5 6.5 Z" />

        <!-- Head profile (rounded geometric shape) -->
        <path d="M8 8 L15.5 8 L16 9 L16 15 Q16 17.5 14 18 L10 18 Q8 17.5 8 15 Z" />

        <!-- Ear (small triangle) -->
        <path d="M9 8 L8 5.5 L10 7" />

        <!-- Eye -->
        <circle cx="11.5" cy="12" r="1" fill="currentColor" />

        <!-- Nostril -->
        <circle cx="10.5" cy="15" r="0.5" fill="currentColor" />

        <!-- Mouth/smile -->
        <path d="M11.5 15.5 Q12.5 16.5 13.5 15.5" />

        <!-- Mane curves (flowing lines) -->
        <path d="M15 9 Q17 10 16.5 12" opacity="0.7" />
        <path d="M15.5 11 Q17 12 16.5 13.5" opacity="0.7" />
        <path d="M15.5 13 Q16.5 13.5 16 15" opacity="0.6" />
    </svg>
</template>
