<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    size: { type: Number, default: 120 },
})

const containerRef = ref(null)
const showLens = ref(false)
const lensX = ref(0)
const lensY = ref(0)

const onMove = (e) => {
    if (!containerRef.value) return
    const rect = containerRef.value.getBoundingClientRect()
    lensX.value = e.clientX - rect.left
    lensY.value = e.clientY - rect.top
    showLens.value = true
}

const lensStyle = computed(() => {
    const size = props.size
    return {
        width: `${size}px`,
        height: `${size}px`,
        left: `${lensX.value - size / 2 + 10}px`,
        top: `${lensY.value - size / 2 - 10}px`,
    }
})
</script>

<template>
    <span ref="containerRef" class="relative inline-block cursor-none" @mousemove="onMove"
        @mouseleave="showLens = false">
        <slot />

        <div v-if="showLens"
            class="magnify-lens pointer-events-none absolute rounded-full border-2 border-white/40 overflow-hidden z-50"
            :style="lensStyle" style="
        backdrop-filter: blur(0px);
        box-shadow: 
          0 10px 40px rgba(0, 0, 0, 0.3),
          0 5px 15px rgba(0, 0, 0, 0.2),
          0 2px 8px rgba(0, 0, 0, 0.15);
      ">
            <div class="w-full h-full bg-blue-950/20 dark:bg-black/20 backdrop-blur-[0.5px] 
             ring-1 ring-inset ring-white/20"></div>
        </div>
    </span>
</template>

<style scoped>
.magnify-lens {
    animation: lensGrow 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    transform-origin: center;
}

@keyframes lensGrow {
    0% {
        transform: scale(0);
        opacity: 0;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}
</style>
