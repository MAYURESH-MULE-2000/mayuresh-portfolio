<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  className: {
    type: String,
    default: ''
  },
  quantity: {
    type: Number,
    default: 100
  },
  staticity: {
    type: Number,
    default: 50
  },
  ease: {
    type: Number,
    default: 50
  },
  size: {
    type: Number,
    default: 0.4
  },
  refresh: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: '#ffffff'
  },
  vx: {
    type: Number,
    default: 0
  },
  vy: {
    type: Number,
    default: 0
  }
})

const canvasRef = ref(null)
const canvasContainerRef = ref(null)
const context = ref(null)
const circles = ref([])
const mousePosition = ref({ x: 0, y: 0 })
const mouse = ref({ x: 0, y: 0 })
const canvasSize = ref({ w: 0, h: 0 })
const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1
let animationFrameId = null

// Convert hex color to RGB array
function hexToRgb(hex) {
  hex = hex.replace('#', '')
  
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('')
  }
  
  const hexInt = parseInt(hex, 16)
  const red = (hexInt >> 16) & 255
  const green = (hexInt >> 8) & 255
  const blue = hexInt & 255
  return [red, green, blue]
}

// Handle mouse move
const handleMouseMove = (event) => {
  mousePosition.value = { x: event.clientX, y: event.clientY }
}

// Update mouse position relative to canvas
const onMouseMove = () => {
  if (canvasRef.value) {
    const rect = canvasRef.value.getBoundingClientRect()
    const { w, h } = canvasSize.value
    const x = mousePosition.value.x - rect.left - w / 2
    const y = mousePosition.value.y - rect.top - h / 2
    const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2
    if (inside) {
      mouse.value.x = x
      mouse.value.y = y
    }
  }
}

// Resize canvas
const resizeCanvas = () => {
  if (canvasContainerRef.value && canvasRef.value && context.value) {
    circles.value = []
    canvasSize.value.w = canvasContainerRef.value.offsetWidth
    canvasSize.value.h = canvasContainerRef.value.offsetHeight
    canvasRef.value.width = canvasSize.value.w * dpr
    canvasRef.value.height = canvasSize.value.h * dpr
    canvasRef.value.style.width = `${canvasSize.value.w}px`
    canvasRef.value.style.height = `${canvasSize.value.h}px`
    context.value.scale(dpr, dpr)
  }
}

// Create circle parameters
const circleParams = () => {
  const x = Math.floor(Math.random() * canvasSize.value.w)
  const y = Math.floor(Math.random() * canvasSize.value.h)
  const translateX = 0
  const translateY = 0
  const pSize = Math.floor(Math.random() * 2) + props.size
  const alpha = 0
  const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1))
  const dx = (Math.random() - 0.5) * 0.1
  const dy = (Math.random() - 0.5) * 0.1
  const magnetism = 0.1 + Math.random() * 4
  return {
    x,
    y,
    translateX,
    translateY,
    size: pSize,
    alpha,
    targetAlpha,
    dx,
    dy,
    magnetism
  }
}

// Draw a circle
const drawCircle = (circle, update = false) => {
  if (context.value) {
    const { x, y, translateX, translateY, size, alpha } = circle
    const rgb = hexToRgb(props.color)
    context.value.translate(translateX, translateY)
    context.value.beginPath()
    context.value.arc(x, y, size, 0, 2 * Math.PI)
    context.value.fillStyle = `rgba(${rgb.join(', ')}, ${alpha})`
    context.value.fill()
    context.value.setTransform(dpr, 0, 0, dpr, 0, 0)
    
    if (!update) {
      circles.value.push(circle)
    }
  }
}

// Clear canvas
const clearContext = () => {
  if (context.value) {
    context.value.clearRect(0, 0, canvasSize.value.w, canvasSize.value.h)
  }
}

// Draw all particles
const drawParticles = () => {
  clearContext()
  const particleCount = props.quantity
  for (let i = 0; i < particleCount; i++) {
    const circle = circleParams()
    drawCircle(circle)
  }
}

// Remap value from one range to another
const remapValue = (value, start1, end1, start2, end2) => {
  const remapped = ((value - start1) * (end2 - start2)) / (end1 - start1) + start2
  return remapped > 0 ? remapped : 0
}

// Animation loop
const animate = () => {
  clearContext()
  circles.value.forEach((circle, i) => {
    // Handle the alpha value
    const edge = [
      circle.x + circle.translateX - circle.size,
      canvasSize.value.w - circle.x - circle.translateX - circle.size,
      circle.y + circle.translateY - circle.size,
      canvasSize.value.h - circle.y - circle.translateY - circle.size
    ]
    const closestEdge = edge.reduce((a, b) => Math.min(a, b))
    const remapClosestEdge = parseFloat(remapValue(closestEdge, 0, 20, 0, 1).toFixed(2))
    
    if (remapClosestEdge > 1) {
      circle.alpha += 0.02
      if (circle.alpha > circle.targetAlpha) {
        circle.alpha = circle.targetAlpha
      }
    } else {
      circle.alpha = circle.targetAlpha * remapClosestEdge
    }
    
    circle.x += circle.dx + props.vx
    circle.y += circle.dy + props.vy
    circle.translateX += (mouse.value.x / (props.staticity / circle.magnetism) - circle.translateX) / props.ease
    circle.translateY += (mouse.value.y / (props.staticity / circle.magnetism) - circle.translateY) / props.ease
    
    drawCircle(circle, true)
    
    // Circle gets out of the canvas
    if (
      circle.x < -circle.size ||
      circle.x > canvasSize.value.w + circle.size ||
      circle.y < -circle.size ||
      circle.y > canvasSize.value.h + circle.size
    ) {
      circles.value.splice(i, 1)
      const newCircle = circleParams()
      drawCircle(newCircle)
    }
  })
  animationFrameId = window.requestAnimationFrame(animate)
}

// Initialize canvas
const initCanvas = () => {
  resizeCanvas()
  drawParticles()
}

// Watch for mouse position changes
watch(mousePosition, () => {
  onMouseMove()
})

// Watch for color changes
watch(() => props.color, () => {
  initCanvas()
})

// Watch for refresh prop
watch(() => props.refresh, () => {
  initCanvas()
})

onMounted(() => {
  if (canvasRef.value) {
    context.value = canvasRef.value.getContext('2d')
  }
  initCanvas()
  animate()
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('resize', initCanvas)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('resize', initCanvas)
  if (animationFrameId) {
    window.cancelAnimationFrame(animationFrameId)
  }
})
</script>

<template>
  <div
    ref="canvasContainerRef"
    :class="['pointer-events-none', className]"
    aria-hidden="true"
  >
    <canvas ref="canvasRef" class="size-full" />
  </div>
</template>
