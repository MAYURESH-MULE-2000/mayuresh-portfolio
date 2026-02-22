<template>
  <div class="al-curriculum-view">
    <!-- Sticky Nav -->
    <nav class="al-nav">
      <div class="al-nav-content">
        <a href="/astralearn" class="al-back-link">
          <ArrowLeft class="al-icon-sm" />
          <span>Dashboard</span>
        </a>
        
        <div class="al-nav-actions">
           <button @click="toggleTheme" class="al-btn al-btn-ghost al-btn-icon" title="Toggle theme">
            <Sun v-if="isDark" class="al-icon-sm" />
            <Moon v-else class="al-icon-sm" />
          </button>
        </div>
      </div>
    </nav>

    <!-- Loading -->
    <div v-if="isLoading" class="al-loading">
      <div class="al-loading-spinner"></div>
      <p>Loading curriculum...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="al-error-state">
      <div class="al-error-icon">😕</div>
      <h2>Curriculum Not Found</h2>
      <p>{{ error }}</p>
      <a href="/astralearn" class="al-btn al-btn-primary">Back to Dashboard</a>
    </div>

    <!-- Content -->
    <div v-else-if="curriculum" class="al-main">
      
      <!-- Hero Header -->
      <section class="al-hero">
        <div class="al-hero-content">
          <div class="al-hero-top">
            <span class="al-hero-flag">{{ getLanguageFlag(curriculum.meta.targetLanguageCode) }}</span>
            <div class="al-hero-badges">
              <span class="al-badge al-badge-primary">{{ curriculum.meta.proficiencyLevel }}</span>
              <span class="al-badge al-badge-secondary">{{ curriculum.modules.length }} Modules</span>
            </div>
          </div>
          
          <h1 class="al-heading-1 al-hero-title">{{ curriculum.meta.title }}</h1>
          <p class="al-body al-hero-desc">{{ curriculum.meta.description }}</p>
          
          <!-- Progress & Resume -->
          <div class="al-hero-footer">
            <div class="al-hero-progress-wrapper" v-if="progress">
              <div class="al-progress-bar">
                <div class="al-progress-fill" :style="{ width: progress.overallProgress + '%' }"></div>
              </div>
              <span class="al-caption">{{ progress.overallProgress }}% Complete</span>
            </div>

            <button v-if="lastLesson" @click="resumeLastLesson" class="al-btn al-btn-primary al-btn-lg al-resume-btn">
              <span>Resume Learning</span>
              <Play class="al-icon-sm" fill="currentColor" />
            </button>
          </div>
        </div>
      </section>

      <!-- Modules List -->
      <section class="al-modules">
        <div 
          v-for="module in curriculum.modules" 
          :key="module.id"
          class="al-module"
          :class="{ 'al-module-locked': isModuleLocked(module.id), 'al-module-expanded': expandedModules.includes(module.id) }"
        >
          <button 
            class="al-module-header"
            @click="toggleModule(module.id)"
            :disabled="isModuleLocked(module.id)"
          >
            <div class="al-module-status-icon">
               <Check v-if="isModuleCompleted(module.id)" class="al-icon-completed" />
               <Lock v-else-if="isModuleLocked(module.id)" class="al-icon-locked" />
               <span v-else class="al-icon-number">{{ module.order }}</span>
            </div>
            
            <div class="al-module-info">
              <h3 class="al-heading-4">{{ module.title }}</h3>
              <p class="al-caption">{{ module.description }}</p>
            </div>
            
            <div class="al-module-end">
              <span class="al-caption al-hide-mobile">{{ getModuleProgressText(module.id) }}</span>
              <ChevronDown 
                class="al-chevron"
                :class="{ 'al-chevron-open': expandedModules.includes(module.id) }"
              />
            </div>
          </button>

          <!-- Module Content -->
          <div 
            v-if="expandedModules.includes(module.id)" 
            class="al-module-content al-animate-fade-in"
          >
            <!-- Module Actions (Notes & Exercises) -->
            <div class="al-module-actions">
              <button @click.stop="openViewer('Notes', module)" class="al-btn al-btn-secondary al-btn-sm">
                <FileText class="al-icon-xs" /> View Notes
              </button>
              <button 
                @click.stop="openViewer('Exercises', module)" 
                class="al-btn al-btn-secondary al-btn-sm"
                :disabled="!isModuleCompleted(module.id)"
                :title="!isModuleCompleted(module.id) ? 'Complete all lessons to unlock exercises' : ''"
              >
                <PenTool class="al-icon-xs" /> View Exercises
                <Lock v-if="!isModuleCompleted(module.id)" class="al-icon-xs" />
              </button>
            </div>

            <div v-for="topic in module.topics" :key="topic.id" class="al-topic">
              <div class="al-topic-header">
                <h4 class="al-topic-title">{{ topic.title }}</h4>
              </div>

              <div class="al-lessons-grid">
                <button
                  v-for="lesson in topic.lessons"
                  :key="lesson.id"
                  class="al-lesson-card"
                  :class="{
                    'al-lesson-completed': isLessonCompleted(lesson.id),
                    'al-lesson-locked': isLessonLocked(lesson.id),
                    'al-lesson-active': isLessonAvailable(lesson.id) && !isLessonCompleted(lesson.id)
                  }"
                  @click="openLesson(lesson.id)"
                  :disabled="isLessonLocked(lesson.id)"
                >
                  <div class="al-lesson-icon">
                    <Check v-if="isLessonCompleted(lesson.id)" class="al-icon-sm" />
                    <Type v-else-if="lesson.type === 'vocabulary'" class="al-icon-sm" />
                    <Pilcrow v-else-if="lesson.type === 'grammar'" class="al-icon-sm" />
                    <MessageCircle v-else class="al-icon-sm" />
                  </div>
                  
                  <div class="al-lesson-details">
                    <span class="al-lesson-title">{{ lesson.title }}</span>
                    <span class="al-lesson-meta">{{ lesson.estimatedMinutes }} min • {{ lesson.type }}</span>
                  </div>

                  <ArrowRight v-if="!isLessonLocked(lesson.id)" class="al-lesson-arrow" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Magazine Viewer Modal -->
    <ALMagazineViewer 
      v-if="showViewer && curriculum && currentViewerModule"
      :show="showViewer"
      :title="`${currentViewerModule.title} - ${viewerType}`"
      :curriculum-name="curriculum.meta.title"
      :module-name="currentViewerModule.title"
      :content-type="viewerType"
      :items="viewerType === 'Notes' ? (currentViewerModule.notes || []) : (currentViewerModule.moduleExercises || [])"
      @close="showViewer = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { 
  ArrowLeft, Sun, Moon, Play, Check, Lock, ChevronDown, 
  Type, Pilcrow, MessageCircle, ArrowRight, FileText, PenTool
} from 'lucide-vue-next';
import type { Curriculum, LearningProgress, Lesson, Module } from '../../../types/astralearn';
import { getCurriculum, getProgress } from '../../../lib/astralearn/db';
import { setLastLesson, getLastLesson } from '../../../lib/astralearn/storage';
import ALMagazineViewer from '../ALMagazineViewer.vue';

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

// Viewer state
const showViewer = ref(false);
const viewerType = ref<'Notes' | 'Exercises'>('Notes');
const currentViewerModule = ref<Module | null>(null);

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

function openViewer(type: 'Notes' | 'Exercises', module: Module) {
  if (type === 'Exercises' && !isModuleCompleted(module.id)) return;
  viewerType.value = type;
  currentViewerModule.value = module;
  showViewer.value = true;
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
        window.location.href = `/astralearn/learn/${props.curriculumId}/lesson/${lessonId}`;
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
.al-curriculum-view {
  min-height: 100vh;
  padding-bottom: var(--al-space-16);
}

/* Nav */
.al-nav {
  position: sticky;
  top: 0;
  z-index: var(--al-z-sticky);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--al-border-light);
}

.dark .al-nav {
  background: rgba(24, 24, 27, 0.8);
}

.al-nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 900px;
  margin: 0 auto;
  padding: var(--al-space-3) var(--al-space-4);
}

.al-back-link {
  display: flex;
  align-items: center;
  gap: var(--al-space-2);
  color: var(--al-text-secondary);
  text-decoration: none;
  font-size: var(--al-font-size-sm);
  font-weight: var(--al-font-weight-medium);
  transition: color var(--al-transition-fast);
}

.al-back-link:hover {
  color: var(--al-text-primary);
}

/* Hero */
.al-hero {
  background: var(--al-bg-glass);
  border-bottom: 1px solid var(--al-border-glass);
  padding: var(--al-space-10) 0;
  margin-bottom: var(--al-space-8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.dark .al-hero {
  background: linear-gradient(to bottom, rgba(15, 23, 42, 0.4), var(--al-bg-glass));
}

.al-hero-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 var(--al-space-4);
}

.al-hero-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--al-space-4);
}

.al-hero-flag {
  font-size: 3rem;
  line-height: 1;
}

.al-hero-badges {
  display: flex;
  gap: var(--al-space-2);
}

.al-hero-title {
  margin-bottom: var(--al-space-2);
  background: linear-gradient(135deg, var(--al-text-primary), var(--al-text-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.al-hero-desc {
  color: var(--al-text-secondary);
  max-width: 600px;
  margin-bottom: var(--al-space-8);
  font-size: var(--al-font-size-lg);
}

.al-hero-footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--al-space-8);
}

.al-hero-progress-wrapper {
  flex: 1;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: var(--al-space-2);
}

.al-resume-btn {
  box-shadow: 0 4px 14px 0 rgba(20, 184, 166, 0.39);
  padding: var(--al-space-3) var(--al-space-6);
}

.al-resume-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(20, 184, 166, 0.23);
}

/* Modules */
.al-modules {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 var(--al-space-4);
  display: flex;
  flex-direction: column;
  gap: var(--al-space-4);
}

.al-module {
  background: var(--al-bg-glass);
  border: 1px solid var(--al-border-glass);
  border-radius: var(--al-radius-xl);
  overflow: hidden;
  transition: all var(--al-transition-normal);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: var(--al-shadow-sm);
}

.al-module-expanded {
  border-color: var(--al-primary-300);
  box-shadow: var(--al-shadow-glass);
}

.al-module-header {
  display: flex;
  align-items: center;
  width: 100%;
  padding: var(--al-space-5);
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  gap: var(--al-space-4);
}

.al-module-status-icon {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--al-bg-tertiary);
  font-weight: var(--al-font-weight-bold);
  color: var(--al-text-tertiary);
}

.al-module-completed .al-module-status-icon {
  background: var(--al-success-50);
  color: var(--al-success-600);
}

.al-icon-completed {
  color: var(--al-success-500);
  font-size: 1.2rem;
}

.al-icon-locked {
  font-size: 1rem;
}

.al-module-info {
  flex: 1;
}

.al-module-info h3 {
  margin-bottom: var(--al-space-1);
}

.al-module-end {
  display: flex;
  align-items: center;
  gap: var(--al-space-4);
  color: var(--al-text-tertiary);
}

.al-chevron {
  transition: transform var(--al-transition-normal);
}

.al-chevron-open {
  transform: rotate(180deg);
}

/* Module Content */
.al-module-content {
  border-top: 1px solid var(--al-border-glass);
  background: rgba(255, 255, 255, 0.3);
  padding: var(--al-space-6);
}

.dark .al-module-content {
  background: rgba(0, 0, 0, 0.2);
}

.al-module-actions {
  display: flex;
  gap: var(--al-space-3);
  margin-bottom: var(--al-space-6);
}

.al-topic {
  margin-bottom: var(--al-space-6);
}

.al-topic:last-child {
  margin-bottom: 0;
}

.al-topic-header {
  margin-bottom: var(--al-space-3);
  padding-left: var(--al-space-1);
  border-left: 3px solid var(--al-primary-500);
}

.al-topic-title {
  font-size: var(--al-font-size-sm);
  font-weight: var(--al-font-weight-bold);
  color: var(--al-text-secondary);
  margin-left: var(--al-space-3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Lessons Grid */
.al-lessons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--al-space-3);
}

.al-lesson-card {
  display: flex;
  align-items: center;
  gap: var(--al-space-4);
  padding: var(--al-space-4);
  background: var(--al-bg-glass);
  border: 1px solid var(--al-border-glass);
  border-radius: var(--al-radius-lg);
  cursor: pointer;
  transition: all var(--al-transition-fast);
  text-align: left;
}

.al-lesson-card:hover:not(:disabled) {
  transform: translateY(-2px);
  border-color: var(--al-primary-300);
  box-shadow: var(--al-shadow-sm);
}

.al-lesson-active {
  border-color: var(--al-primary-200);
  background: linear-gradient(to right, var(--al-bg-glass), var(--al-primary-50));
}

.dark .al-lesson-active {
  background: linear-gradient(to right, var(--al-bg-glass), rgba(20, 184, 166, 0.05));
  border-color: var(--al-primary-800);
}

.al-lesson-completed {
  opacity: 0.8;
  background: var(--al-bg-tertiary);
}

.al-lesson-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--al-bg-secondary);
  border-radius: var(--al-radius-md);
  font-size: 1.25rem;
}

.al-lesson-active .al-lesson-icon {
  background: var(--al-primary-100);
  color: var(--al-primary-700);
}

.dark .al-lesson-active .al-lesson-icon {
  background: rgba(20, 184, 166, 0.2);
  color: var(--al-primary-300);
}

.al-lesson-completed .al-lesson-icon {
  background: var(--al-success-50);
  color: var(--al-success-600);
}

.al-lesson-details {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.al-lesson-title {
  font-weight: var(--al-font-weight-medium);
  color: var(--al-text-primary);
  margin-bottom: 2px;
}

.al-lesson-meta {
  font-size: var(--al-font-size-xs);
  color: var(--al-text-tertiary);
}

.al-lesson-arrow {
  opacity: 0;
  transform: translateX(-4px);
  transition: all var(--al-transition-fast);
  color: var(--al-primary-500);
}

.al-lesson-card:hover .al-lesson-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* Animations */
.al-animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Loading & Error */
.al-loading, .al-error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: var(--al-space-4);
  text-align: center;
}

.al-loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--al-border-light);
  border-top-color: var(--al-primary-500);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.al-error-icon {
  font-size: 4rem;
}

/* Responsive */
@media (max-width: 600px) {
  .al-hero-footer {
    flex-direction: column;
    align-items: stretch;
    gap: var(--al-space-6);
  }

  .al-resume-btn {
    width: 100%;
    justify-content: center;
  }

  .al-hide-mobile {
    display: none;
  }

  .al-lessons-grid {
    grid-template-columns: 1fr;
  }
}
</style>
