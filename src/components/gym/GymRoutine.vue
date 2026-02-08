<template>
  <div class="gym-routine min-h-screen">
    <!-- Hero Section -->
    <div 
      class="relative py-8 px-4 text-center overflow-hidden"
      :class="category ? `bg-gradient-to-br ${category.gradient}` : 'bg-gradient-to-br from-gray-500 to-gray-600'"
    >
      <div class="relative z-10">
        <div class="text-5xl mb-3">{{ category?.emoji || '😴' }}</div>
        <h1 class="text-3xl md:text-4xl font-black text-white mb-2">
          {{ isRestDay ? "Rest Day" : `It's ${category?.name} Day!` }}
        </h1>
        <p class="text-white/80 text-lg mb-4">
          {{ isRestDay ? "Take it easy, your muscles need recovery" : category?.fullName }}
        </p>
        
        <!-- Progress Bar -->
        <div v-if="!isRestDay" class="max-w-xs mx-auto">
          <div class="flex justify-between text-white/70 text-sm mb-2">
            <span>Progress</span>
            <span>{{ completedCount }}/{{ totalExercises }}</span>
          </div>
          <div class="h-2 bg-white/30 rounded-full overflow-hidden">
            <div 
              class="h-full bg-white rounded-full transition-all duration-500"
              :style="{ width: `${progressPercent}%` }"
            />
          </div>
        </div>
      </div>
      
      <!-- Decorative circles -->
      <div class="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
      <div class="absolute -bottom-20 -left-10 w-60 h-60 bg-white/5 rounded-full" />
    </div>

    <!-- Rest Day Message -->
    <div v-if="isRestDay" class="p-8 text-center">
      <div class="max-w-md mx-auto bg-gray-100 dark:bg-gray-800 rounded-3xl p-8">
        <div class="text-6xl mb-4">🛌</div>
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Recovery is Growth
        </h2>
        <p class="text-gray-600 dark:text-gray-400">
          Rest days are essential for muscle recovery and growth. Stay active with some light walking or stretching.
        </p>
        <a 
          href="/gym-list" 
          class="inline-block mt-6 px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          View All Workouts
        </a>
      </div>
    </div>

    <!-- Exercises Grid -->
    <div v-else class="p-4 space-y-4 max-w-lg mx-auto pb-24">
      <GymExerciseCard
        v-for="(exercise, index) in category?.exercises"
        :key="exercise.id"
        :exercise="exercise"
        :exercise-number="index + 1"
        :saved-state="getSavedState(exercise.id)"
        @update="handleExerciseUpdate"
      />
    </div>

    <!-- Floating Reset Button -->
    <div v-if="!isRestDay" class="fixed bottom-6 left-0 right-0 px-4 z-50">
      <div class="max-w-lg mx-auto flex gap-3">
        <button
          @click="resetProgress"
          class="flex-1 py-4 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-transform"
        >
          Reset Today's Progress
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import GymExerciseCard from './GymExerciseCard.vue';
import { getTodayWorkout, getCategoryById, type WorkoutCategory } from '../../data/gymData';

interface ExerciseState {
  weight: number;
  reps: number;
  completed: boolean;
}

type ChecklistData = Record<string, ExerciseState>;

const STORAGE_KEY = 'gym-checklist';
const checklistData = ref<ChecklistData>({});
const urlCategoryId = ref<string | null>(null);

// Determine which category to show
const category = computed<WorkoutCategory | null>(() => {
  if (urlCategoryId.value) {
    return getCategoryById(urlCategoryId.value) || null;
  }
  return getTodayWorkout();
});

const isRestDay = computed(() => !category.value);

const totalExercises = computed(() => category.value?.exercises.length || 0);

const completedCount = computed(() => {
  if (!category.value) return 0;
  return category.value.exercises.filter(
    (ex) => checklistData.value[ex.id]?.completed
  ).length;
});

const progressPercent = computed(() => {
  if (totalExercises.value === 0) return 0;
  return (completedCount.value / totalExercises.value) * 100;
});

function getSavedState(exerciseId: string): ExerciseState | undefined {
  return checklistData.value[exerciseId];
}

function handleExerciseUpdate(update: { exerciseId: string; weight: number; reps: number; completed: boolean }) {
  checklistData.value[update.exerciseId] = {
    weight: update.weight,
    reps: update.reps,
    completed: update.completed,
  };
  saveToLocalStorage();
}

function saveToLocalStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checklistData.value));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

function loadFromLocalStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      checklistData.value = JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load from localStorage:', e);
  }
}

function resetProgress() {
  if (!category.value) return;
  
  // Only reset current category's exercises
  category.value.exercises.forEach((ex) => {
    if (checklistData.value[ex.id]) {
      checklistData.value[ex.id].completed = false;
    }
  });
  saveToLocalStorage();
}

onMounted(() => {
  loadFromLocalStorage();
  
  // Read category from URL if present
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  if (categoryParam) {
    urlCategoryId.value = categoryParam;
  }
});
</script>

<style scoped>
.gym-routine {
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.02));
}
</style>
