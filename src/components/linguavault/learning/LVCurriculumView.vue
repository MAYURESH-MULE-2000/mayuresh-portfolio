<template>
  <div class="lv-curriculum-view">
    <!-- Sticky Nav -->
    <nav class="lv-nav">
      <div class="lv-nav-content">
        <a href="/linguavault" class="lv-back-link">
          <ArrowLeft class="lv-icon-sm" />
          <span>Dashboard</span>
        </a>
        
        <div class="lv-nav-actions">
           <button @click="toggleTheme" class="lv-btn lv-btn-ghost lv-btn-icon" title="Toggle theme">
            <Sun v-if="isDark" class="lv-icon-sm" />
            <Moon v-else class="lv-icon-sm" />
          </button>
        </div>
      </div>
    </nav>

    <!-- Loading -->
    <div v-if="isLoading" class="lv-loading">
      <div class="lv-loading-spinner"></div>
      <p>Loading curriculum...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="lv-error-state">
      <div class="lv-error-icon">😕</div>
      <h2>Curriculum Not Found</h2>
      <p>{{ error }}</p>
      <a href="/linguavault" class="lv-btn lv-btn-primary">Back to Dashboard</a>
    </div>

    <!-- Content -->
    <div v-else-if="curriculum" class="lv-main">
      
      <!-- Hero Header -->
      <section class="lv-hero">
        <div class="lv-hero-content">
          <div class="lv-hero-top">
            <span class="lv-hero-flag">{{ getLanguageFlag(curriculum.meta.targetLanguageCode) }}</span>
            <div class="lv-hero-badges">
              <span class="lv-badge lv-badge-primary">{{ curriculum.meta.proficiencyLevel }}</span>
              <span class="lv-badge lv-badge-secondary">{{ curriculum.modules.length }} Modules</span>
            </div>
          </div>
          
          <h1 class="lv-heading-1 lv-hero-title">{{ curriculum.meta.title }}</h1>
          <p class="lv-body lv-hero-desc">{{ curriculum.meta.description }}</p>
          
          <!-- Progress & Resume -->
          <div class="lv-hero-footer">
            <div class="lv-hero-progress-wrapper" v-if="progress">
              <div class="lv-progress-bar">
                <div class="lv-progress-fill" :style="{ width: progress.overallProgress + '%' }"></div>
              </div>
              <span class="lv-caption">{{ progress.overallProgress }}% Complete</span>
            </div>

            <button v-if="lastLesson" @click="resumeLastLesson" class="lv-btn lv-btn-primary lv-btn-lg lv-resume-btn">
              <span>Resume Learning</span>
              <Play class="lv-icon-sm" fill="currentColor" />
            </button>
          </div>
        </div>
      </section>

      <!-- Modules List -->
      <section class="lv-modules">
        <div 
          v-for="module in curriculum.modules" 
          :key="module.id"
          class="lv-module"
          :class="{ 'lv-module-locked': isModuleLocked(module.id), 'lv-module-expanded': expandedModules.includes(module.id) }"
        >
          <button 
            class="lv-module-header"
            @click="toggleModule(module.id)"
            :disabled="isModuleLocked(module.id)"
          >
            <div class="lv-module-status-icon">
               <Check v-if="isModuleCompleted(module.id)" class="lv-icon-completed" />
               <Lock v-else-if="isModuleLocked(module.id)" class="lv-icon-locked" />
               <span v-else class="lv-icon-number">{{ module.order }}</span>
            </div>
            
            <div class="lv-module-info">
              <h3 class="lv-heading-4">{{ module.title }}</h3>
              <p class="lv-caption">{{ module.description }}</p>
            </div>
            
            <div class="lv-module-end">
              <span class="lv-caption lv-hide-mobile">{{ getModuleProgressText(module.id) }}</span>
              <ChevronDown 
                class="lv-chevron"
                :class="{ 'lv-chevron-open': expandedModules.includes(module.id) }"
              />
            </div>
          </button>

          <!-- Module Content -->
          <div 
            v-if="expandedModules.includes(module.id)" 
            class="lv-module-content lv-animate-fade-in"
          >
            <div v-for="topic in module.topics" :key="topic.id" class="lv-topic">
              <div class="lv-topic-header">
                <h4 class="lv-topic-title">{{ topic.title }}</h4>
              </div>

              <div class="lv-lessons-grid">
                <button
                  v-for="lesson in topic.lessons"
                  :key="lesson.id"
                  class="lv-lesson-card"
                  :class="{
                    'lv-lesson-completed': isLessonCompleted(lesson.id),
                    'lv-lesson-locked': isLessonLocked(lesson.id),
                    'lv-lesson-active': isLessonAvailable(lesson.id) && !isLessonCompleted(lesson.id)
                  }"
                  @click="openLesson(lesson.id)"
                  :disabled="isLessonLocked(lesson.id)"
                >
                  <div class="lv-lesson-icon">
                    <Check v-if="isLessonCompleted(lesson.id)" class="lv-icon-sm" />
                    <Type v-else-if="lesson.type === 'vocabulary'" class="lv-icon-sm" />
                    <Pilcrow v-else-if="lesson.type === 'grammar'" class="lv-icon-sm" />
                    <MessageCircle v-else class="lv-icon-sm" />
                  </div>
                  
                  <div class="lv-lesson-details">
                    <span class="lv-lesson-title">{{ lesson.title }}</span>
                    <span class="lv-lesson-meta">{{ lesson.estimatedMinutes }} min • {{ lesson.type }}</span>
                  </div>

                  <ArrowRight v-if="!isLessonLocked(lesson.id)" class="lv-lesson-arrow" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { 
  ArrowLeft, Sun, Moon, Play, Check, Lock, ChevronDown, 
  Type, Pilcrow, MessageCircle, ArrowRight 
} from 'lucide-vue-next';
import type { Curriculum, LearningProgress, Lesson } from '../../../types/linguavault';
import { getCurriculum, getProgress } from '../../../lib/linguavault/db';
import { setLastLesson, getLastLesson } from '../../../lib/linguavault/storage';

// Props
const props = defineProps<{
  curriculumId: string;
}>();

// State
const isLoading = ref(true);
const isDark = ref(false);
const error = ref<string | null>(null);
const curriculum = ref<Curriculum | null>(null);
const progress = ref<LearningProgress | null>(null);
const expandedModules = ref<string[]>([]);

// Language flags
const languageFlags: Record<string, string> = {
  en: '🇬🇧', es: '🇪🇸', fr: '🇫🇷', de: '🇩🇪', it: '🇮🇹',
  pt: '🇵🇹', ja: '🇯🇵', ko: '🇰🇷', zh: '🇨🇳', ru: '🇷🇺',
  ar: '🇸🇦', hi: '🇮🇳', nl: '🇳🇱', sv: '🇸🇪', no: '🇳🇴',
};

// Computed
const totalLessons = computed(() => {
  if (!curriculum.value) return 0;
  let count = 0;
  curriculum.value.modules.forEach(mod => {
    mod.topics.forEach(topic => {
      count += topic.lessons.length;
    });
  });
  return count;
});

const lastLesson = computed(() => {
  const lastPointer = getLastLesson();
  if (!lastPointer || lastPointer.curriculumId !== props.curriculumId) return null;
  
  // Find the lesson
  if (!curriculum.value) return null;
  for (const mod of curriculum.value.modules) {
    for (const topic of mod.topics) {
      const lesson = topic.lessons.find(l => l.id === lastPointer.lessonId);
      if (lesson) return lesson;
    }
  }
  return null;
});

// Methods
function getLanguageFlag(code: string): string {
  return languageFlags[code?.toLowerCase()] || '🌐';
}

function toggleTheme() {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark', isDark.value);
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
}

function toggleModule(moduleId: string) {
  const index = expandedModules.value.indexOf(moduleId);
  if (index >= 0) {
    expandedModules.value.splice(index, 1);
  } else {
    expandedModules.value.push(moduleId);
  }
}

function isModuleLocked(moduleId: string): boolean {
  if (!progress.value) return true;
  const modProgress = progress.value.moduleProgress[moduleId];
  return modProgress?.status === 'locked';
}

function isModuleCompleted(moduleId: string): boolean {
  if (!progress.value) return false;
  const modProgress = progress.value.moduleProgress[moduleId];
  return modProgress?.status === 'completed';
}

function getModuleProgressText(moduleId: string): string {
  if (!progress.value) return '';
  const modProgress = progress.value.moduleProgress[moduleId];
  if (!modProgress) return '';
  return `${modProgress.completedTopics}/${modProgress.totalTopics} topics`;
}

function getTopicProgressText(topicId: string): string {
  if (!progress.value) return '';
  const topProgress = progress.value.topicProgress[topicId];
  if (!topProgress) return '';
  return `${topProgress.completedLessons}/${topProgress.totalLessons} lessons`;
}

function isLessonLocked(lessonId: string): boolean {
  if (!progress.value) return true;
  const lessonProgress = progress.value.lessonProgress[lessonId];
  return lessonProgress?.status === 'locked';
}

function isLessonAvailable(lessonId: string): boolean {
  if (!progress.value) return false;
  const lessonProgress = progress.value.lessonProgress[lessonId];
  return lessonProgress?.status === 'available' || lessonProgress?.status === 'in-progress';
}

function isLessonCompleted(lessonId: string): boolean {
  if (!progress.value) return false;
  const lessonProgress = progress.value.lessonProgress[lessonId];
  return lessonProgress?.status === 'completed';
}

function openLesson(lessonId: string) {
  if (!curriculum.value) return;
  
  // Find module and topic for this lesson
  for (const mod of curriculum.value.modules) {
    for (const topic of mod.topics) {
      const lesson = topic.lessons.find(l => l.id === lessonId);
      if (lesson) {
        setLastLesson({
          curriculumId: props.curriculumId,
          moduleId: mod.id,
          topicId: topic.id,
          lessonId: lesson.id
        });
        window.location.href = `/linguavault/learn/${props.curriculumId}/lesson/${lessonId}`;
        return;
      }
    }
  }
}

function resumeLastLesson() {
  if (lastLesson.value) {
    openLesson(lastLesson.value.id);
  }
}

// Lifecycle
onMounted(async () => {
  isDark.value = document.documentElement.classList.contains('dark');

  try {
    const curriculumData = await getCurriculum(props.curriculumId);
    if (!curriculumData) {
      error.value = 'Could not find this curriculum. It may have been deleted.';
      return;
    }
    curriculum.value = curriculumData;

    const progressData = await getProgress(props.curriculumId);
    progress.value = progressData || null;

    // Auto-expand first available module
    if (curriculum.value && progress.value) {
      for (const mod of curriculum.value.modules) {
        if (!isModuleLocked(mod.id) && !isModuleCompleted(mod.id)) {
          expandedModules.value.push(mod.id);
          break;
        }
      }
      // If all completed or none in progress, expand first
      if (expandedModules.value.length === 0 && curriculum.value.modules.length > 0) {
        expandedModules.value.push(curriculum.value.modules[0].id);
      }
    }
  } catch (err) {
    error.value = 'Failed to load curriculum data.';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.lv-curriculum-view {
  min-height: 100vh;
  padding-bottom: var(--lv-space-16);
}

/* Nav */
.lv-nav {
  position: sticky;
  top: 0;
  z-index: var(--lv-z-sticky);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--lv-border-light);
}

.dark .lv-nav {
  background: rgba(24, 24, 27, 0.8);
}

.lv-nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 900px;
  margin: 0 auto;
  padding: var(--lv-space-3) var(--lv-space-4);
}

.lv-back-link {
  display: flex;
  align-items: center;
  gap: var(--lv-space-2);
  color: var(--lv-text-secondary);
  text-decoration: none;
  font-size: var(--lv-font-size-sm);
  font-weight: var(--lv-font-weight-medium);
  transition: color var(--lv-transition-fast);
}

.lv-back-link:hover {
  color: var(--lv-text-primary);
}

/* Hero */
.lv-hero {
  background: var(--lv-bg-card);
  border-bottom: 1px solid var(--lv-border-light);
  padding: var(--lv-space-10) 0;
  margin-bottom: var(--lv-space-8);
}

.dark .lv-hero {
  background: linear-gradient(to bottom, var(--lv-bg-secondary), var(--lv-bg-card));
}

.lv-hero-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 var(--lv-space-4);
}

.lv-hero-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--lv-space-4);
}

.lv-hero-flag {
  font-size: 3rem;
  line-height: 1;
}

.lv-hero-badges {
  display: flex;
  gap: var(--lv-space-2);
}

.lv-hero-title {
  margin-bottom: var(--lv-space-2);
  background: linear-gradient(135deg, var(--lv-text-primary), var(--lv-text-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.lv-hero-desc {
  color: var(--lv-text-secondary);
  max-width: 600px;
  margin-bottom: var(--lv-space-8);
  font-size: var(--lv-font-size-lg);
}

.lv-hero-footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--lv-space-8);
}

.lv-hero-progress-wrapper {
  flex: 1;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: var(--lv-space-2);
}

.lv-resume-btn {
  box-shadow: 0 4px 14px 0 rgba(20, 184, 166, 0.39);
  padding: var(--lv-space-3) var(--lv-space-6);
}

.lv-resume-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(20, 184, 166, 0.23);
}

/* Modules */
.lv-modules {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 var(--lv-space-4);
  display: flex;
  flex-direction: column;
  gap: var(--lv-space-4);
}

.lv-module {
  background: var(--lv-bg-card);
  border: 1px solid var(--lv-border-light);
  border-radius: var(--lv-radius-xl);
  overflow: hidden;
  transition: all var(--lv-transition-normal);
}

.lv-module-expanded {
  border-color: var(--lv-primary-300);
  box-shadow: var(--lv-shadow-md);
}

.lv-module-header {
  display: flex;
  align-items: center;
  width: 100%;
  padding: var(--lv-space-5);
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  gap: var(--lv-space-4);
}

.lv-module-status-icon {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--lv-bg-tertiary);
  font-weight: var(--lv-font-weight-bold);
  color: var(--lv-text-tertiary);
}

.lv-module-completed .lv-module-status-icon {
  background: var(--lv-success-50);
  color: var(--lv-success-600);
}

.lv-icon-completed {
  color: var(--lv-success-500);
  font-size: 1.2rem;
}

.lv-icon-locked {
  font-size: 1rem;
}

.lv-module-info {
  flex: 1;
}

.lv-module-info h3 {
  margin-bottom: var(--lv-space-1);
}

.lv-module-end {
  display: flex;
  align-items: center;
  gap: var(--lv-space-4);
  color: var(--lv-text-tertiary);
}

.lv-chevron {
  transition: transform var(--lv-transition-normal);
}

.lv-chevron-open {
  transform: rotate(180deg);
}

/* Module Content */
.lv-module-content {
  border-top: 1px solid var(--lv-border-light);
  background: var(--lv-bg-secondary);
  padding: var(--lv-space-6);
}

.dark .lv-module-content {
  background: rgba(0, 0, 0, 0.2);
}

.lv-topic {
  margin-bottom: var(--lv-space-6);
}

.lv-topic:last-child {
  margin-bottom: 0;
}

.lv-topic-header {
  margin-bottom: var(--lv-space-3);
  padding-left: var(--lv-space-1);
  border-left: 3px solid var(--lv-primary-500);
}

.lv-topic-title {
  font-size: var(--lv-font-size-sm);
  font-weight: var(--lv-font-weight-bold);
  color: var(--lv-text-secondary);
  margin-left: var(--lv-space-3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Lessons Grid */
.lv-lessons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--lv-space-3);
}

.lv-lesson-card {
  display: flex;
  align-items: center;
  gap: var(--lv-space-4);
  padding: var(--lv-space-4);
  background: var(--lv-bg-card);
  border: 1px solid var(--lv-border-light);
  border-radius: var(--lv-radius-lg);
  cursor: pointer;
  transition: all var(--lv-transition-fast);
  text-align: left;
}

.lv-lesson-card:hover:not(:disabled) {
  transform: translateY(-2px);
  border-color: var(--lv-primary-300);
  box-shadow: var(--lv-shadow-sm);
}

.lv-lesson-active {
  border-color: var(--lv-primary-200);
  background: linear-gradient(to right, var(--lv-bg-card), var(--lv-primary-50));
}

.dark .lv-lesson-active {
  background: linear-gradient(to right, var(--lv-bg-card), rgba(20, 184, 166, 0.05));
  border-color: var(--lv-primary-800);
}

.lv-lesson-completed {
  opacity: 0.8;
  background: var(--lv-bg-tertiary);
}

.lv-lesson-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--lv-bg-secondary);
  border-radius: var(--lv-radius-md);
  font-size: 1.25rem;
}

.lv-lesson-active .lv-lesson-icon {
  background: var(--lv-primary-100);
  color: var(--lv-primary-700);
}

.dark .lv-lesson-active .lv-lesson-icon {
  background: rgba(20, 184, 166, 0.2);
  color: var(--lv-primary-300);
}

.lv-lesson-completed .lv-lesson-icon {
  background: var(--lv-success-50);
  color: var(--lv-success-600);
}

.lv-lesson-details {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.lv-lesson-title {
  font-weight: var(--lv-font-weight-medium);
  color: var(--lv-text-primary);
  margin-bottom: 2px;
}

.lv-lesson-meta {
  font-size: var(--lv-font-size-xs);
  color: var(--lv-text-tertiary);
}

.lv-lesson-arrow {
  opacity: 0;
  transform: translateX(-4px);
  transition: all var(--lv-transition-fast);
  color: var(--lv-primary-500);
}

.lv-lesson-card:hover .lv-lesson-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* Animations */
.lv-animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Loading & Error */
.lv-loading, .lv-error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: var(--lv-space-4);
  text-align: center;
}

.lv-loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--lv-border-light);
  border-top-color: var(--lv-primary-500);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.lv-error-icon {
  font-size: 4rem;
}

/* Responsive */
@media (max-width: 600px) {
  .lv-hero-footer {
    flex-direction: column;
    align-items: stretch;
    gap: var(--lv-space-6);
  }

  .lv-resume-btn {
    width: 100%;
    justify-content: center;
  }

  .lv-hide-mobile {
    display: none;
  }

  .lv-lessons-grid {
    grid-template-columns: 1fr;
  }
}
</style>
