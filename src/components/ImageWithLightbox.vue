<script setup>
const props = defineProps({
    src: { type: String, required: true },
    alt: { type: String, default: 'Image' },
    className: { type: String, default: '' }
})

console.log('ImageWithLightbox v3 loaded')

const openLightbox = () => {
    // Basic DOM manipulation to avoid any Vue/Teleport insertion errors
    if (typeof document === 'undefined') return

    // Create container
    const div = document.createElement('div')
    div.id = 'lightbox-overlay'
    div.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 99999;
        background-color: rgba(0,0,0,0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        cursor: zoom-out;
    `

    // Create close button
    const btn = document.createElement('button')
    btn.innerHTML = '×'
    btn.style.cssText = `
        position: absolute;
        top: 1rem;
        right: 1rem;
        color: white;
        font-size: 2.5rem;
        font-weight: 300;
        background: transparent;
        border: none;
        cursor: pointer;
        width: 3rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
    `
    // Hover effect for button
    btn.onmouseenter = () => { btn.style.background = 'rgba(255,255,255,0.1)' }
    btn.onmouseleave = () => { btn.style.background = 'transparent' }

    // Create image
    const img = document.createElement('img')
    img.src = props.src
    img.alt = props.alt
    img.style.cssText = `
        max-width: 100%;
        max-height: 90vh;
        object-fit: contain;
        user-select: none;
        cursor: zoom-out;
    `

    // Append elements
    div.appendChild(btn)
    div.appendChild(img)
    document.body.appendChild(div)
    document.body.style.overflow = 'hidden'

    // Cleanup function
    const close = () => {
        if (div.parentNode) {
            div.parentNode.removeChild(div)
            document.body.style.overflow = ''
            document.removeEventListener('keydown', handleKeydown)
        }
    }

    // Event listeners
    const handleKeydown = (e) => {
        if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', handleKeydown)
    div.onclick = close
    btn.onclick = (e) => {
        e.stopPropagation()
        close()
    }
}
</script>

<template>
    <div class="relative group cursor-zoom-in overflow-hidden rounded-3xl border border-gray-100 dark:border-gray-800" @click="openLightbox">
        <img 
            :src="src" 
            :alt="alt" 
            class="w-full h-auto block transition-transform duration-500 group-hover:scale-105" 
            :class="className"
            loading="lazy" 
        />
        
        <div class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div class="bg-white/90 dark:bg-black/90 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                Click to expand
            </div>
        </div>
    </div>
</template>
