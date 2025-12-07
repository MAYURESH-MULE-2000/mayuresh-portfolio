<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  audioSrc: {
    type: String,
    required: true,
  },
})

const audio = ref(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(0.7)

// Format time as MM:SS
const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const currentTimeFormatted = computed(() => formatTime(currentTime.value))
const durationFormatted = computed(() => formatTime(duration.value))
const progress = computed(() => {
  if (!duration.value) return 0
  return (currentTime.value / duration.value) * 100
})

// Play/Pause toggle
const togglePlay = () => {
  if (!audio.value) return
  
  if (isPlaying.value) {
    audio.value.pause()
  } else {
    audio.value.play()
  }
}

// Seek to position
const seek = (event) => {
  if (!audio.value || !duration.value) return
  
  const rect = event.currentTarget.getBoundingClientRect()
  const x = event.clientX - rect.left
  const percentage = x / rect.width
  audio.value.currentTime = percentage * duration.value
}

// Audio event handlers
const handleLoadedMetadata = () => {
  if (audio.value) {
    duration.value = audio.value.duration
    console.log('Audio loaded, duration:', duration.value)
  }
}

const handleTimeUpdate = () => {
  if (audio.value) {
    currentTime.value = audio.value.currentTime
  }
}

const handlePlay = () => {
  isPlaying.value = true
}

const handlePause = () => {
  isPlaying.value = false
}

const handleEnded = () => {
  isPlaying.value = false
  currentTime.value = 0
}

const handleCanPlay = () => {
  if (audio.value && !duration.value) {
    duration.value = audio.value.duration
    console.log('Can play, duration:', duration.value)
  }
}

// Setup audio element
onMounted(() => {
  if (audio.value) {
    audio.value.volume = volume.value
    audio.value.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.value.addEventListener('canplay', handleCanPlay)
    audio.value.addEventListener('timeupdate', handleTimeUpdate)
    audio.value.addEventListener('play', handlePlay)
    audio.value.addEventListener('pause', handlePause)
    audio.value.addEventListener('ended', handleEnded)
    
    // Force load
    audio.value.load()
  }
})

onBeforeUnmount(() => {
  if (audio.value) {
    audio.value.removeEventListener('loadedmetadata', handleLoadedMetadata)
    audio.value.removeEventListener('canplay', handleCanPlay)
    audio.value.removeEventListener('timeupdate', handleTimeUpdate)
    audio.value.removeEventListener('play', handlePlay)
    audio.value.removeEventListener('pause', handlePause)
    audio.value.removeEventListener('ended', handleEnded)
  }
})
</script>

<template>
  <div class="audio-player flex items-center justify-center gap-2 px-2 md:px-3 py-1.5 md:py-2 rounded-full bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
    <!-- Hidden audio element -->
    <audio ref="audio" :src="audioSrc" preload="metadata"></audio>
    
    <!-- Play/Pause Button -->
    <button
      @click="togglePlay"
      class="flex-shrink-0 w-6 h-6 md:w-7 md:h-7 flex items-center justify-center rounded-full bg-primary-black dark:bg-primary-white text-primary-white dark:text-primary-black hover:opacity-80 transition-opacity duration-200"
      :aria-label="isPlaying ? 'Pause' : 'Play'"
    >
      <!-- Play Icon -->
      <svg v-if="!isPlaying" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-2.5 h-2.5 md:w-3 md:h-3">
        <path d="M8 5v14l11-7z"/>
      </svg>
      <!-- Pause Icon -->
      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-2.5 h-2.5 md:w-3 md:h-3">
        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
      </svg>
    </button>

    <!-- Progress Bar and Time -->
    <div class="flex-1 flex flex-col items-center gap-0.5 md:gap-1">
      <!-- Progress Bar -->
      <div
        @click="seek"
        class="w-full h-1 bg-gray-300 dark:bg-gray-700 rounded-full cursor-pointer relative overflow-hidden"
      >
        <div
          class="absolute top-0 left-0 h-full bg-primary-black dark:bg-primary-white rounded-full transition-all duration-100"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>
      
      <!-- Time Display -->
      <div class="flex items-center justify-between w-full">
        <span class="text-[9px] md:text-[10px] text-gray-600 dark:text-gray-400 font-mono">{{ currentTimeFormatted }}</span>
        <span class="text-[9px] md:text-[10px] text-gray-600 dark:text-gray-400 font-mono">{{ durationFormatted }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.audio-player {
  min-width: 180px;
  max-width: 250px;
}

@media (max-width: 768px) {
  .audio-player {
    min-width: 100%;
    max-width: 100%;
  }
}
</style>
