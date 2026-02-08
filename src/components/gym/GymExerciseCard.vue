<template>
  <div 
    class="gym-exercise-card rounded-2xl overflow-hidden transition-all duration-300"
    :class="[
      isCompleted ? 'bg-emerald-500/10 dark:bg-emerald-500/20 ring-2 ring-emerald-500' : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm',
    ]"
  >
    <!-- Video Section -->
    <div class="relative aspect-video bg-gray-900 rounded-t-2xl overflow-hidden">
      <video
        ref="videoRef"
        :src="exercise.videoPath"
        class="w-full h-full object-cover"
        loop
        muted
        playsinline
        @click="toggleVideo"
      />
      
      <!-- Play/Pause Overlay -->
      <div 
        class="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity"
        :class="isPlaying ? 'opacity-0' : 'opacity-100'"
        @click="toggleVideo"
      >
        <div class="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
          <svg class="w-8 h-8 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>

      <!-- Exercise Number Badge -->
      <div class="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-sm font-bold">
        {{ exerciseNumber }}
      </div>

      <!-- Fullscreen Button -->
      <button
        @click.stop="openFullscreen"
        class="absolute top-3 right-3 p-2.5 rounded-full bg-black/60 backdrop-blur-sm text-white hover:bg-black/80 transition-colors"
        aria-label="Fullscreen"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
        </svg>
      </button>
    </div>

    <!-- Fullscreen Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div 
          v-if="isFullscreen" 
          class="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
          @click="closeFullscreen"
        >
          <!-- Close Button -->
          <button
            @click.stop="closeFullscreen"
            class="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
            aria-label="Close fullscreen"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <!-- Exercise Name -->
          <div class="absolute top-4 left-4 z-10 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white font-bold">
            {{ exerciseNumber }}. {{ exercise.name }}
          </div>

          <!-- Fullscreen Video -->
          <video
            ref="fullscreenVideoRef"
            :src="exercise.videoPath"
            class="max-w-full max-h-full object-contain"
            loop
            autoplay
            playsinline
            @click.stop
          />

          <!-- Tap to play/pause hint -->
          <div class="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-sm">
            Tap video to play/pause • Tap outside to close
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Content Section -->
    <div class="p-4 space-y-4">
      <!-- Exercise Name -->
      <h3 class="text-lg font-bold text-gray-900 dark:text-white">
        {{ exercise.name }}
      </h3>

      <!-- Sets Info -->
      <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </svg>
        <span>{{ exercise.defaultSets }} sets</span>
      </div>

      <!-- Weight & Reps Inputs -->
      <div class="grid grid-cols-2 gap-3">
        <!-- Weight Input -->
        <div class="relative">
          <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
            Weight (kg)
          </label>
          <div class="relative">
            <input
              type="number"
              v-model.number="localWeight"
              class="w-full px-3 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-center font-bold text-lg border-2 border-transparent focus:border-teal-500 focus:outline-none transition-colors"
              min="0"
              step="2.5"
              @change="emitUpdate"
            />
            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">kg</span>
          </div>
        </div>

        <!-- Reps Input -->
        <div class="relative">
          <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
            Reps
          </label>
          <input
            type="number"
            v-model.number="localReps"
            class="w-full px-3 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-center font-bold text-lg border-2 border-transparent focus:border-teal-500 focus:outline-none transition-colors"
            min="1"
            @change="emitUpdate"
          />
        </div>
      </div>

      <!-- Completion Checkbox -->
      <button
        @click="toggleComplete"
        class="w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2"
        :class="[
          isCompleted 
            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' 
            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        ]"
      >
        <svg v-if="isCompleted" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        <span>{{ isCompleted ? 'Completed!' : 'Mark Complete' }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import type { Exercise } from '../../data/gymData';

interface Props {
  exercise: Exercise;
  exerciseNumber: number;
  savedState?: {
    weight: number;
    reps: number;
    completed: boolean;
  };
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update', state: { exerciseId: string; weight: number; reps: number; completed: boolean }): void;
}>();

const videoRef = ref<HTMLVideoElement | null>(null);
const fullscreenVideoRef = ref<HTMLVideoElement | null>(null);
const isPlaying = ref(false);
const isFullscreen = ref(false);
const localWeight = ref(props.savedState?.weight ?? props.exercise.defaultWeight);
const localReps = ref(props.savedState?.reps ?? props.exercise.defaultReps);
const isCompleted = ref(props.savedState?.completed ?? false);

// Watch for savedState changes
watch(() => props.savedState, (newState) => {
  if (newState) {
    localWeight.value = newState.weight;
    localReps.value = newState.reps;
    isCompleted.value = newState.completed;
  }
}, { deep: true });

function toggleVideo() {
  if (!videoRef.value) return;
  if (isPlaying.value) {
    videoRef.value.pause();
  } else {
    videoRef.value.play();
  }
  isPlaying.value = !isPlaying.value;
}

function openFullscreen() {
  isFullscreen.value = true;
  document.body.style.overflow = 'hidden';
}

function closeFullscreen() {
  isFullscreen.value = false;
  document.body.style.overflow = '';
}

function toggleComplete() {
  isCompleted.value = !isCompleted.value;
  emitUpdate();
}

function emitUpdate() {
  emit('update', {
    exerciseId: props.exercise.id,
    weight: localWeight.value,
    reps: localReps.value,
    completed: isCompleted.value,
  });
}

// Intersection Observer for autoplay on scroll
onMounted(() => {
  if (!videoRef.value) return;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && videoRef.value) {
          videoRef.value.play();
          isPlaying.value = true;
        } else if (videoRef.value) {
          videoRef.value.pause();
          isPlaying.value = false;
        }
      });
    },
    { threshold: 0.6 }
  );
  
  observer.observe(videoRef.value);
});
</script>

<style scoped>
.gym-exercise-card {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

/* Fullscreen fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
