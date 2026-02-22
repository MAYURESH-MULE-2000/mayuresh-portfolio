<template>
  <div class="al-dashboard">
    <!-- Header -->
    <header class="al-header">
      <div class="al-header-content">
        <a href="/" class="al-back-link">
          <ArrowLeft class="al-icon-sm" />
          <span>Portfolio</span>
        </a>
        
        <div class="al-logo" style="color: var(--al-primary-600)">
          <BookOpen class="al-logo-icon" />
          <span class="al-logo-text">AstraLearn</span>
        </div>


        <button @click="toggleTheme" class="al-btn al-btn-ghost al-btn-icon" title="Toggle theme">
          <Sun v-if="isDark" class="al-icon-sm" />
          <Moon v-else class="al-icon-sm" />
        </button>
      </div>
    </header>

    <!-- Loading State -->
    <div v-if="isLoading" class="al-loading">
      <div class="al-loading-spinner"></div>
      <p>Loading your learning data...</p>
    </div>

    <!-- Main Content -->
    <div v-else class="al-main">
      <!-- Welcome Section (No Curriculums) -->
      <section v-if="curriculums.length === 0" class="al-welcome">
        
        <!-- Wizard View -->
        <ALCurriculumWizard 
            v-if="showWizard" 
            @close="showWizard = false"
        >
            <template #uploader>
            <div 
                class="al-upload-zone"
                :class="{ 'al-upload-zone-active': isDragging }"
                @dragover.prevent="isDragging = true"
                @dragleave="isDragging = false"
                @drop.prevent="handleFileDrop"
                >
                <input 
                    type="file" 
                    accept=".json" 
                    @change="handleFileSelect"
                    id="wizard-curriculum-file"
                    class="al-file-input"
                >
                <label for="wizard-curriculum-file" class="al-upload-label">
                    <CloudUpload class="al-icon-xl" />
                    <span class="al-upload-text">Drop your curriculum JSON here</span>
                    <span class="al-upload-hint">or click to browse</span>
                </label>
            </div>
            </template>
        </ALCurriculumWizard>

        <!-- Split Layout Zero State -->
        <div v-else class="al-welcome-split">
          <!-- Left: Value Prop -->
          <div class="al-welcome-left">
            <div class="al-logo-large">
              <BookOpen class="al-icon-xl" />
            </div>
            <h1 class="al-heading-2" style="color: var(--al-text-primary); font-weight: var(--al-font-weight-bold);">Welcome to AstraLearn</h1>
            <p class="al-body al-mb-6" style="color: var(--al-text-secondary); line-height: 1.6;">
              Your personal, offline-first language learning companion.<br>
              No accounts. No tracking. Just learning.
            </p>


            <div class="al-welcome-features-list">
              <div class="al-feature-row">
                <Shield class="al-icon-md" style="color: var(--al-primary-600);" />
                <div>
                  <strong class="al-block" style="color: var(--al-text-primary); font-weight: var(--al-font-weight-semibold);">Privacy First</strong>
                  <span class="al-caption" style="color: var(--al-text-secondary);">All data stays on your device</span>
                </div>

              </div>
              <div class="al-feature-row">
                <WifiOff class="al-icon-md" style="color: var(--al-primary-600);" />
                <div>
                   <strong class="al-block" style="color: var(--al-text-primary); font-weight: var(--al-font-weight-semibold);">Works Offline</strong>
                   <span class="al-caption" style="color: var(--al-text-secondary);">Learn anywhere, anytime</span>
                </div>

              </div>
              <div class="al-feature-row">
                <Target class="al-icon-md" style="color: var(--al-primary-600);" />
                <div>
                   <strong class="al-block" style="color: var(--al-text-primary); font-weight: var(--al-font-weight-semibold);">Structured Learning</strong>
                   <span class="al-caption" style="color: var(--al-text-secondary);">Follow curated curricula</span>
                </div>

              </div>
            </div>
          </div>

          <!-- Right: Actions -->
          <div class="al-welcome-right">
             <div class="al-action-box">
               <h3 class="al-heading-3">Start your journey</h3>
               <button @click="showUploader = true" class="al-btn al-btn-xl al-w-full">
                 <Upload class="al-icon-md" />
                 Upload Curriculum
               </button>
               
               <div class="al-divider-text">or</div>
               
               <button @click="showWizard = true" class="al-cta-link">
                 Need a curriculum? Learn how to create one <ArrowRight class="al-icon-xs" />
               </button>
             </div>
          </div>
        </div>
      </section>

      <!-- Dashboard (Has Curriculums) -->
      <section v-else class="al-dashboard-content">
        


        <!-- Dashboard Header: Welcome + Actions -->
        <div class="al-dashboard-header">
           <div class="al-welcome-header">
             <h1 class="al-heading-2">Welcome back! 👋</h1>
             <div class="al-welcome-subtitle">
               <span>Ready to master </span>
               <div class="al-inline-dropdown">
                 <button 
                  @click="showLanguageDropdown = !showLanguageDropdown" 
                  class="al-dropdown-trigger"
                >
                   {{ activeCurriculum ? activeCurriculum.meta.targetLanguage : 'a new language' }}
                   <ChevronDown class="al-icon-xs" />
                 </button>
                 
                 <!-- Language Dropdown Menu -->
                 <div v-if="showLanguageDropdown" class="al-dropdown-menu">
                   <div v-if="curriculums.length > 0" class="al-dropdown-section">
                     <button 
                      v-for="curr in curriculums" 
                      :key="curr.id"
                      @click="switchLanguage(curr.id)"
                      class="al-dropdown-item"
                      :class="{ 'al-dropdown-item-active': curr.id === activeCurriculumId }"
                     >
                       <span class="al-flag-sm">{{ getLanguageFlag(curr.meta.targetLanguageCode) }}</span>
                       <span class="al-fs-sm">{{ curr.meta.targetLanguage }}</span>
                       <Check v-if="curr.id === activeCurriculumId" class="al-icon-xs al-text-primary" />
                     </button>
                   </div>
                   <div class="al-dropdown-divider"></div>
                   <button @click="showUploader = true; showLanguageDropdown = false" class="al-dropdown-item al-dropdown-action">
                     <Plus class="al-icon-sm" />
                     <span>Add New Language</span>
                   </button>
                 </div>
               </div>
               <span> today?</span>
             </div>
           </div>

            <!-- Quick Actions -->
            <div class="al-quick-actions-bar">
              <button @click="exportData" class="al-quick-action" title="Save all data locally">
                <div class="al-quick-action-icon al-text-blue">
                  <Download class="al-icon-md" />
                </div>
                <span>Save All</span>
              </button>
              <a href="/astralearn/settings" class="al-quick-action" title="Settings">
                <div class="al-quick-action-icon al-text-slate">
                  <Settings class="al-icon-md" />
                </div>
                <span>Settings</span>
              </a>
            </div>
        </div>

        <!-- Hero Section (Active Course) -->
        <div v-if="activeCurriculum" class="al-hero-section">
          <div class="al-hero-content">
            <div class="al-hero-header">
              <span class="al-hero-label">Current Focus</span>
              <span class="al-hero-flag">{{ getLanguageFlag(activeCurriculum.meta.targetLanguageCode) }}</span>
            </div>
            
            <h2 class="al-heading-1 al-hero-title">{{ activeCurriculum.meta.title }}</h2>
            <p class="al-body al-hero-desc">{{ activeCurriculum.meta.description }}</p>
            
            <div class="al-hero-progress">
              <div class="al-progress-info">
                 <span class="al-caption">{{ activeCurriculum.meta.proficiencyLevel }}</span>
                 <span class="al-caption">{{ getProgress(activeCurriculum.id) }}% Complete</span>
              </div>
              <div class="al-progress-bar">
                <div class="al-progress-fill" :style="{ width: getProgress(activeCurriculum.id) + '%' }"></div>
              </div>
            </div>

            <div class="al-hero-footer">
               <a :href="`/astralearn/learn/${activeCurriculum.id}`" class="al-btn al-btn-primary al-btn-lg al-hero-btn">
                <span>Continue Learning</span>
                <ArrowRight class="al-icon-md" />
              </a>

              <!-- Compact Stats -->
              <div class="al-hero-stats-row">
                <div class="al-stat-compact" title="Lessons Completed">
                   <BookOpen class="al-icon-sm al-text-teal" />
                   <span class="al-stat-value-sm">{{ totalLessonsCompleted }}</span>
                </div>
                <div class="al-stat-compact" title="Day Streak">
                   <Flame class="al-icon-sm al-text-orange" />
                   <span class="al-stat-value-sm">{{ currentStreak }}</span>
                </div>
                <div class="al-stat-compact" title="Minutes Spent">
                   <Clock class="al-icon-sm al-text-blue" />
                   <span class="al-stat-value-sm">{{ totalTimeSpent }}m</span>
                </div>
               </div>
            </div>
          </div>
          <!-- Removed old side stats div -->
        </div>
          




      </section>
    </div>

    <!-- Upload Modal -->
    <div v-if="showUploader" class="al-modal-backdrop" @click.self="showUploader = false">
      <div class="al-modal al-animate-scale-in">
        <div class="al-modal-header">
          <h2 class="al-heading-3">Upload Curriculum</h2>
          <button @click="showUploader = false" class="al-btn al-btn-ghost al-btn-icon">
            <X class="al-icon-sm" />
          </button>
        </div>
        
        <div class="al-modal-body">
          <div 
            class="al-upload-zone"
            :class="{ 'al-upload-zone-active': isDragging }"
            @dragover.prevent="isDragging = true"
            @dragleave="isDragging = false"
            @drop.prevent="handleFileDrop"
          >
            <input 
              type="file" 
              accept=".json" 
              @change="handleFileSelect"
              id="curriculum-file"
              class="al-file-input"
            >
            <label for="curriculum-file" class="al-upload-label">
              <CloudUpload class="al-icon-xl" />
              <span class="al-upload-text">Drop your curriculum JSON here</span>
              <span class="al-upload-hint">or click to browse</span>
            </label>
          </div>

          <!-- Validation Results -->
          <div v-if="validationResult" class="al-validation-result" :class="validationResult.valid ? 'al-validation-success' : 'al-validation-error'">
            <div class="al-validation-header">
              <span v-if="validationResult.valid">✓ Valid Curriculum</span>
              <span v-else>✗ Invalid Curriculum</span>
            </div>
            
            <div v-if="duplicateWarning" class="al-validation-warning-box">
               <AlertTriangle class="al-icon-sm" />
               <span>This curriculum already exists. Uploading will update it.</span>
            </div>

            <div v-if="validationResult.errors.length > 0" class="al-validation-errors">
              <p v-for="error in validationResult.errors.slice(0, 5)" :key="error.path" class="al-error-item">
                <strong>{{ error.path }}:</strong> {{ error.message }}
              </p>
              <p v-if="validationResult.errors.length > 5" class="al-caption">
                ...and {{ validationResult.errors.length - 5 }} more errors
              </p>
            </div>

            <div v-if="validationResult.warnings.length > 0" class="al-validation-warnings">
              <p v-for="warning in validationResult.warnings.slice(0, 3)" :key="warning.path" class="al-warning-item">
                ⚠️ {{ warning.message }}
              </p>
            </div>
          </div>

          <!-- Preview -->
          <div v-if="pendingCurriculum" class="al-curriculum-preview">
            <h4 class="al-heading-4">{{ pendingCurriculum.meta.title }}</h4>
            <p class="al-body-sm">{{ pendingCurriculum.meta.description }}</p>
            <div class="al-preview-meta">
              <span>{{ pendingCurriculum.meta.targetLanguage }}</span>
              <span>•</span>
              <span>{{ pendingCurriculum.modules.length }} modules</span>
              <span>•</span>
              <span>{{ pendingCurriculum.meta.estimatedHours || '?' }} hours</span>
            </div>
          </div>
        </div>

        <div class="al-modal-footer">
          <button @click="showUploader = false" class="al-btn al-btn-secondary">Cancel</button>
          <button @click="showUploader = false" class="al-btn al-btn-secondary">Cancel</button>
          <button 
            @click="confirmUpload" 
            class="al-btn al-btn-primary"
            :disabled="!pendingCurriculum || !validationResult?.valid"
          >
            {{ duplicateWarning ? 'Update Existing' : 'Upload & Start Learning' }}
          </button>
        </div>
      </div>
    </div>

    <!-- How To Modal -->
    <div v-if="showHowTo" class="al-modal-backdrop" @click.self="showHowTo = false">
      <div class="al-modal al-modal-lg al-animate-scale-in">
        <div class="al-modal-header">
          <h2 class="al-heading-3">How to Create a Curriculum</h2>
          <button @click="showHowTo = false" class="al-btn al-btn-ghost al-btn-icon">
            <X class="al-icon-sm" />
          </button>
        </div>
        
        <div class="al-modal-body al-how-to">
          <div class="al-how-to-step">
            <span class="al-step-number">1</span>
            <div>
              <h4>Use an AI Assistant</h4>
              <p>Copy the prompt below and paste it into ChatGPT, Claude, or any AI assistant.</p>
            </div>
          </div>

          <div class="al-how-to-step">
            <span class="al-step-number">2</span>
            <div>
              <h4>Customize Your Learning</h4>
              <p>Tell the AI what language you want to learn, your current level, and your goals.</p>
            </div>
          </div>

          <div class="al-how-to-step">
            <span class="al-step-number">3</span>
            <div>
              <h4>Download & Upload</h4>
              <p>Save the generated JSON file and upload it here to start learning!</p>
            </div>
          </div>

          <div class="al-prompt-box">
            <div class="al-prompt-header">
              <span>📋 Curriculum Generation Prompt</span>
              <button @click="copyPrompt" class="al-btn al-btn-sm al-btn-secondary">
                {{ promptCopied ? '✓ Copied!' : 'Copy' }}
              </button>
            </div>
            <pre class="al-prompt-text">{{ curriculumPrompt }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, toRaw } from 'vue';
import { 
  ArrowLeft, BookOpen, Sun, Moon, Library, Shield, WifiOff, Target, 
  Upload, Download, Save, Settings, Flame, Clock, ArrowRight, Plus, 
  X, FileJson, Check, AlertTriangle, CloudUpload, ChevronDown
} from 'lucide-vue-next';
import type { Curriculum, LearningProgress, ValidationResult } from '../../types/astralearn';
import { initDB, getAllCurriculums, getAllProgress, saveCurriculum, initializeProgress, exportAllData } from '../../lib/astralearn/db';
import { parseAndValidateCurriculum } from '../../lib/astralearn/validator';
import { getActiveCurriculumId, setActiveCurriculumId } from '../../lib/astralearn/storage';

import ALCurriculumWizard from './ALCurriculumWizard.vue';

// State
const isLoading = ref(true);
const isDark = ref(false);
const curriculums = ref<Curriculum[]>([]);
const progressMap = ref<Record<string, LearningProgress>>({});
const activeCurriculumId = ref<string | null>(null);
const showWizard = ref(false);

// Modal states
const showUploader = ref(false);
const showImporter = ref(false);
const showHowTo = ref(false);

// Upload state
const isDragging = ref(false);
const pendingCurriculum = ref<Curriculum | null>(null);
const validationResult = ref<ValidationResult | null>(null);
const promptCopied = ref(false);
const duplicateWarning = ref(false);
const showLanguageDropdown = ref(false);

// Computed
// Computed
const activeCurriculum = computed(() => {
  if (!activeCurriculumId.value) return curriculums.value[0] || null;
  return curriculums.value.find(c => c.id === activeCurriculumId.value) || curriculums.value[0] || null;
});

const otherCurriculums = computed(() => {
  if (!activeCurriculum.value) return [];
  return curriculums.value.filter(c => c.id !== activeCurriculum.value?.id);
});

const totalLessonsCompleted = computed(() => {
  let total = 0;
  Object.values(progressMap.value).forEach(progress => {
    Object.values(progress.lessonProgress).forEach(lesson => {
      if (lesson.status === 'completed') total++;
    });
  });
  return total;
});

const currentStreak = computed(() => {
  const progress = Object.values(progressMap.value)[0];
  return progress?.currentStreak?.count || 0;
});

const totalTimeSpent = computed(() => {
  let total = 0;
  Object.values(progressMap.value).forEach(progress => {
    total += progress.totalTimeSpentMinutes || 0;
  });
  return total;
});

// Language flag mapping
const languageFlags: Record<string, string> = {
  en: '🇬🇧', es: '🇪🇸', fr: '🇫🇷', de: '🇩🇪', it: '🇮🇹',
  pt: '🇵🇹', ja: '🇯🇵', ko: '🇰🇷', zh: '🇨🇳', ru: '🇷🇺',
  ar: '🇸🇦', hi: '🇮🇳', nl: '🇳🇱', sv: '🇸🇪', no: '🇳🇴',
  da: '🇩🇰', fi: '🇫🇮', pl: '🇵🇱', tr: '🇹🇷', th: '🇹🇭',
};

// Curriculum generation prompt
const curriculumPrompt = `Create a language learning curriculum JSON for AstraLearn with the following structure:

I want to learn: [TARGET LANGUAGE]
My native language: [YOUR LANGUAGE]  
Current level: [beginner/elementary/intermediate/advanced]
Learning goal: [travel/work/conversation/academic]
Time commitment: [X minutes per day]

Generate a JSON file with this structure:
{
  "id": "unique-id",
  "meta": {
    "targetLanguage": "...",
    "targetLanguageCode": "...",
    "nativeLanguage": "...",
    "nativeLanguageCode": "...",
    "proficiencyLevel": "beginner",
    "learningGoal": "...",
    "estimatedHours": 20,
    "title": "...",
    "description": "..."
  },
  "modules": [
    {
      "id": "mod-1",
      "title": "Module Title",
      "description": "...",
      "order": 1,
      "topics": [
        {
          "id": "top-1-1",
          "title": "Topic Title",
          "description": "...",
          "order": 1,
          "lessons": [
            {
              "id": "les-1-1-1",
              "title": "Lesson Title",
              "type": "vocabulary",
              "estimatedMinutes": 5,
              "content": {
                "vocabulary": [
                  { "word": "...", "translation": "...", "pronunciation": "..." }
                ],
                "explanation": "..."
              },
              "exercises": [
                {
                  "id": "ex-1",
                  "type": "multiple-choice",
                  "prompt": "...",
                  "options": ["A", "B", "C", "D"],
                  "correctAnswer": "A",
                  "explanation": "..."
                }
              ]
            }
          ]
        }
      ],
      "unlockCriteria": { "type": "none" }
    }
  ],
  "version": "1.0.0",
  "createdAt": "${new Date().toISOString()}"
}

Create 3-5 modules with 2-3 topics each, and 3-5 lessons per topic. Include variety in lesson types (vocabulary, grammar, conversation) and exercise types (multiple-choice, fill-blank, matching, translation).`;

const welcomeSubtitle = computed(() => {
  if (activeCurriculum.value) {
    return `Ready to master ${activeCurriculum.value.meta.targetLanguage} today?`;
  }
  return 'Ready to master a new language today?';
});

// Methods
function toggleTheme() {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark', isDark.value);
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
}

function getLanguageFlag(code: string): string {
  return languageFlags[code?.toLowerCase()] || '🌐';
}

function isActiveCurriculum(id: string): boolean {
  return activeCurriculumId.value === id;
}

function getProgress(curriculumId: string): number {
  const progress = progressMap.value[curriculumId];
  return progress?.overallProgress || 0;
}

function openCurriculum(id: string) {
  setActiveCurriculumId(id);
  window.location.href = `/astralearn/learn/${id}`;
}

async function handleFileSelect(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file) {
    await processFile(file);
  }
}

async function handleFileDrop(event: DragEvent) {
  isDragging.value = false;
  const file = event.dataTransfer?.files?.[0];
  if (file && file.name.endsWith('.json')) {
    await processFile(file);
  }
}

async function processFile(file: File) {
  const text = await file.text();
  const result = parseAndValidateCurriculum(text);
  
  validationResult.value = result.validation;
  pendingCurriculum.value = result.curriculum;
  
  if (result.curriculum) {
      duplicateWarning.value = curriculums.value.some(c => c.id === result.curriculum!.id);
  }
}


function switchLanguage(id: string) {
  openCurriculum(id);
  showLanguageDropdown.value = false;
}

async function confirmUpload() {
  if (!pendingCurriculum.value) return;

  try {
    // Unwrap the proxy to avoid DataCloneError in IndexedDB
    const rawCurriculum = toRaw(pendingCurriculum.value);
    await saveCurriculum(rawCurriculum);
    await initializeProgress(rawCurriculum);
    
    // Refresh data
    curriculums.value = await getAllCurriculums();
    const allProgress = await getAllProgress();
    progressMap.value = {};
    allProgress.forEach(p => {
      progressMap.value[p.curriculumId] = p;
    });

    // Set as active if first curriculum
    if (curriculums.value.length === 1) {
      setActiveCurriculumId(pendingCurriculum.value.id);
      activeCurriculumId.value = pendingCurriculum.value.id;
    }

    // Reset and close modal
    pendingCurriculum.value = null;
    validationResult.value = null;
    showUploader.value = false;
  } catch (error) {
    console.error('Failed to save curriculum:', error);
  }
}

async function exportData() {
  try {
    const data = await exportAllData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `astralearn-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to export data:', error);
  }
}

function copyPrompt() {
  navigator.clipboard.writeText(curriculumPrompt);
  promptCopied.value = true;
  setTimeout(() => {
    promptCopied.value = false;
  }, 2000);
}

// Lifecycle
onMounted(async () => {
  // Check theme
  isDark.value = document.documentElement.classList.contains('dark');

  try {
    // Initialize database
    await initDB();

    // Load data
    curriculums.value = await getAllCurriculums();
    const allProgress = await getAllProgress();
    allProgress.forEach(p => {
      progressMap.value[p.curriculumId] = p;
    });

    activeCurriculumId.value = getActiveCurriculumId();
  } catch (error) {
    console.error('Failed to initialize AstraLearn:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.al-dashboard {
  min-height: 100vh;
}

/* Header */
.al-header {
  position: sticky;
  top: 0;
  z-index: var(--al-z-sticky);
  background: var(--al-bg-primary);
  border-bottom: 1px solid var(--al-border-light);
  backdrop-filter: blur(10px);
}

.al-header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--al-space-4);
}

.al-back-link {
  display: flex;
  align-items: center;
  gap: var(--al-space-2);
  color: var(--al-text-secondary);
  text-decoration: none;
  font-size: var(--al-font-size-sm);
  transition: color var(--al-transition-fast);
}

.al-back-link:hover {
  color: var(--al-text-primary);
}

.al-logo {
  display: flex;
  align-items: center;
  gap: var(--al-space-2);
}

.al-logo-icon {
  font-size: 1.5rem;
}

.al-logo-text {
  font-size: var(--al-font-size-xl);
  font-weight: var(--al-font-weight-bold);
  background: linear-gradient(135deg, var(--al-primary-500), var(--al-primary-700));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Loading */
.al-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: var(--al-space-4);
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

/* Main Content */
.al-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--al-space-8) var(--al-space-4);
}

/* Welcome Section */
.al-welcome {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.al-welcome-content {
  text-align: center;
  max-width: 600px;
}

.al-welcome-icon {
  font-size: 4rem;
  margin-bottom: var(--al-space-6);
  animation: al-bounce 2s ease-in-out infinite;
}

.al-welcome-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--al-space-4);
  margin: var(--al-space-8) 0;
}

.al-feature {
  display: flex;
  align-items: flex-start;
  gap: var(--al-space-3);
  text-align: left;
  padding: var(--al-space-4);
  background: var(--al-bg-secondary);
  border-radius: var(--al-radius-lg);
}

.al-feature-icon {
  font-size: 1.5rem;
}

.al-feature h4 {
  font-size: var(--al-font-size-sm);
  font-weight: var(--al-font-weight-semibold);
  margin-bottom: var(--al-space-1);
}

.al-feature p {
  font-size: var(--al-font-size-xs);
  color: var(--al-text-tertiary);
}

.al-welcome-actions {
  display: flex;
  gap: var(--al-space-4);
  justify-content: center;
  flex-wrap: wrap;
}

.al-welcome-hint {
  margin-top: var(--al-space-6);
  font-size: var(--al-font-size-sm);
  color: var(--al-text-tertiary);
}

.al-welcome-hint a {
  color: var(--al-primary-500);
  text-decoration: none;
}

.al-welcome-hint a:hover {
  text-decoration: underline;
}

/* Hero Section */
.al-hero-section {
  background: var(--al-bg-glass);
  border: 1px solid var(--al-border-glass);
  border-radius: var(--al-radius-2xl);
  overflow: hidden;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  margin-bottom: var(--al-space-12);
  box-shadow: var(--al-shadow-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  position: relative;
}

.dark .al-hero-section {
  background: linear-gradient(135deg, var(--al-bg-glass), rgba(20, 184, 166, 0.05));
  border-color: var(--al-border-glass);
}

.al-hero-content {
  padding: var(--al-space-8);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.al-hero-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--al-space-4);
}

.al-hero-label {
  font-size: var(--al-font-size-sm);
  font-weight: var(--al-font-weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--al-primary-600);
}

.dark .al-hero-label {
  color: var(--al-primary-400);
}

.al-hero-flag {
  font-size: 2rem;
}

.al-hero-title {
  margin-bottom: var(--al-space-2);
  background: linear-gradient(135deg, var(--al-text-primary), var(--al-text-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.al-hero-desc {
  margin-bottom: var(--al-space-6);
  max-width: 90%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.al-hero-progress {
  margin-bottom: var(--al-space-8);
}

.al-progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--al-space-2);
  align-items: center;
}

.al-hero-btn {
  align-self: flex-start;
  box-shadow: 0 4px 14px 0 rgba(20, 184, 166, 0.39);
}

.al-hero-btn:hover {
  box-shadow: 0 6px 20px rgba(20, 184, 166, 0.23);
  transform: translateY(-2px);
}

/* Hero Stats */
.al-hero-stats {
  background: var(--al-bg-secondary);
  padding: var(--al-space-8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--al-space-4);
  border-left: 1px solid var(--al-border-light);
}

.dark .al-hero-stats {
  background: rgba(0, 0, 0, 0.2);
  border-left-color: var(--al-border-medium);
}

.al-stat-card {
  background: var(--al-bg-card);
  padding: var(--al-space-4);
  border-radius: var(--al-radius-xl);
  display: flex;
  align-items: center;
  gap: var(--al-space-4);
  border: 1px solid var(--al-border-light);
  transition: transform var(--al-transition-normal);
}

.al-stat-card:hover {
  transform: translateX(4px);
  border-color: var(--al-primary-200);
}

.dark .al-stat-card:hover {
  border-color: var(--al-primary-800);
}

.al-stat-icon {
  font-size: 1.5rem;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--al-bg-tertiary);
  border-radius: var(--al-radius-lg);
}

.al-stat-info {
  display: flex;
  flex-direction: column;
}

.al-stat-value {
  font-size: var(--al-font-size-xl);
  font-weight: var(--al-font-weight-bold);
  line-height: 1.2;
}

.al-stat-label {
  font-size: var(--al-font-size-xs);
  color: var(--al-text-tertiary);
}

/* Curriculum Grid & Cards */
.al-curriculum-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--al-space-6);
}

.al-curriculum-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--al-bg-glass);
  border: 1px solid var(--al-border-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: var(--al-shadow-glass);
  border-radius: var(--al-radius-xl);
  transition: all var(--al-transition-normal);
}

.al-curriculum-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--al-shadow-glow);
  border-color: var(--al-primary-300);
}

.al-curriculum-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--al-space-4);
}

.al-curriculum-flag {
  font-size: 2.5rem;
  line-height: 1;
}

.al-curriculum-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: var(--al-space-4);
}

.al-empty-state {
  text-align: center;
  padding: var(--al-space-8);
  background: var(--al-bg-secondary);
  border-radius: var(--al-radius-lg);
  border: 1px dashed var(--al-border-medium);
  color: var(--al-text-tertiary);
}

/* Quick Actions Bar */
.al-quick-actions-bar {
  display: flex;
  gap: var(--al-space-4);
  margin-bottom: var(--al-space-8);
  overflow-x: auto;
  padding-bottom: var(--al-space-2);
}

.al-quick-action {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--al-space-2);
  background: none;
  border: none;
  cursor: pointer;
  min-width: 64px;
  text-decoration: none;
  color: var(--al-text-secondary);
  font-size: var(--al-font-size-xs);
  transition: all var(--al-transition-fast);
}

.al-quick-action:hover {
  color: var(--al-text-primary);
  transform: translateY(-2px);
}

.al-quick-action-icon {
  width: 48px;
  height: 48px;
  background: var(--al-bg-card);
  border: 1px solid var(--al-border-light);
  border-radius: var(--al-radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: all var(--al-transition-fast);
  color: var(--al-text-primary);
}

.al-quick-action:hover .al-quick-action-icon {
  border-color: var(--al-primary-300);
  background: var(--al-bg-secondary);
  box-shadow: var(--al-shadow-md);
}

/* Icons */
.al-icon-sm { width: 20px; height: 20px; }
.al-icon-md { width: 24px; height: 24px; }
.al-icon-lg { width: 32px; height: 32px; }
.al-icon-xl { width: 48px; height: 48px; }

/* Responsive */
@media (max-width: 900px) {
  .al-hero-section {
    grid-template-columns: 1fr;
  }

  .al-hero-stats {
    border-left: none;
    border-top: 1px solid var(--al-border-light);
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .dark .al-hero-stats {
    border-top-color: var(--al-border-medium);
  }
  
  .al-stat-card {
    flex: 1;
    min-width: 200px;
  }
}

@media (max-width: 600px) {
  .al-hero-stats {
    flex-direction: column;
  }
  
  .al-stat-card {
    width: 100%;
  }
  
  .al-curriculum-flag {
    font-size: 2rem;
  }
}


/* Modal */
.al-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--al-z-modal-backdrop);
  padding: var(--al-space-4);
}

.al-modal {
  background: var(--al-bg-primary);
  border-radius: var(--al-radius-xl);
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--al-shadow-xl);
}

.al-modal-lg {
  max-width: 700px;
}

.al-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--al-space-6);
  border-bottom: 1px solid var(--al-border-light);
}

.al-modal-body {
  padding: var(--al-space-6);
}

.al-modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--al-space-3);
  padding: var(--al-space-6);
  border-top: 1px solid var(--al-border-light);
}

/* Upload Zone */
.al-upload-zone {
  border: 2px dashed var(--al-border-medium);
  border-radius: var(--al-radius-lg);
  padding: var(--al-space-8);
  text-align: center;
  transition: all var(--al-transition-fast);
}

.al-upload-zone-active,
.al-upload-zone:hover {
  border-color: var(--al-primary-500);
  background: var(--al-primary-50);
}

.dark .al-upload-zone-active,
.dark .al-upload-zone:hover {
  background: rgb(20 184 166 / 0.1);
}

.al-file-input {
  display: none;
}

.al-upload-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--al-space-2);
  cursor: pointer;
  color: var(--al-text-tertiary);
}

.al-upload-text {
  font-weight: var(--al-font-weight-medium);
  color: var(--al-text-primary);
}

.al-upload-hint {
  font-size: var(--al-font-size-sm);
}

/* Validation Result */
.al-validation-result {
  margin-top: var(--al-space-4);
  padding: var(--al-space-4);
  border-radius: var(--al-radius-lg);
}

.al-validation-success {
  background: var(--al-success-50);
  border: 1px solid var(--al-success-500);
}

.al-validation-error {
  background: var(--al-error-50);
  border: 1px solid var(--al-error-500);
}

.al-validation-header {
  font-weight: var(--al-font-weight-semibold);
  margin-bottom: var(--al-space-2);
}

.al-error-item,
.al-warning-item {
  font-size: var(--al-font-size-sm);
  margin-bottom: var(--al-space-1);
}

/* Curriculum Preview */
.al-curriculum-preview {
  margin-top: var(--al-space-4);
  padding: var(--al-space-4);
  background: var(--al-bg-secondary);
  border-radius: var(--al-radius-lg);
}

.al-preview-meta {
  display: flex;
  gap: var(--al-space-2);
  margin-top: var(--al-space-2);
  font-size: var(--al-font-size-sm);
  color: var(--al-text-tertiary);
}

/* How To */
.al-how-to {
  max-height: 60vh;
  overflow-y: auto;
}

.al-how-to-step {
  display: flex;
  gap: var(--al-space-4);
  margin-bottom: var(--al-space-4);
}

.al-step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--al-primary-500);
  color: white;
  border-radius: 50%;
  font-weight: var(--al-font-weight-bold);
  flex-shrink: 0;
}

.al-how-to-step h4 {
  font-weight: var(--al-font-weight-semibold);
  margin-bottom: var(--al-space-1);
}

.al-how-to-step p {
  font-size: var(--al-font-size-sm);
  color: var(--al-text-secondary);
}

.al-prompt-box {
  margin-top: var(--al-space-4);
  border: 1px solid var(--al-border-light);
  border-radius: var(--al-radius-lg);
  overflow: hidden;
}

.al-prompt-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--al-space-3) var(--al-space-4);
  background: var(--al-bg-secondary);
  font-size: var(--al-font-size-sm);
  font-weight: var(--al-font-weight-medium);
}

.al-prompt-text {
  padding: var(--al-space-4);
  margin: 0;
  font-size: var(--al-font-size-xs);
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
  background: var(--al-bg-tertiary);
  max-height: 200px;
  overflow-y: auto;
}

/* Responsive */
@media (max-width: 768px) {
  .al-stats-bar {
    flex-direction: column;
    gap: var(--al-space-4);
  }

  .al-welcome-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .al-curriculum-grid {
    grid-template-columns: 1fr;
  }
}

/* Text Colors */
.al-text-teal { color: #14b8a6 !important; }
.al-text-orange { color: #f97316 !important; }
.al-text-blue { color: #3b82f6 !important; }
.al-text-purple { color: #a855f7 !important; }
.al-text-red { color: #ef4444 !important; }
.al-text-slate { color: #64748b !important; }
.al-text-tertiary { color: var(--al-text-tertiary); }

.dark .al-text-slate { color: #94a3b8 !important; }

/* Welcome Header */
.al-welcome-header {
  margin-bottom: var(--al-space-6);
  padding: 0 var(--al-space-2);
}

.al-welcome-header h1 {
  margin-bottom: var(--al-space-1);
}

/* Hero Section Updates */
.al-hero-section {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  background: var(--al-bg-glass);
  border: 1px solid var(--al-border-glass);
  border-radius: var(--al-radius-2xl);
  overflow: hidden;
  box-shadow: var(--al-shadow-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  margin-bottom: var(--al-space-8);
  position: relative;
}

/* Add a subtle top border gradient for pop - REMOVED per user request */
/* .al-hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(to right, var(--al-primary-400), var(--al-accent-400));
} */

.al-hero-content {
  padding: var(--al-space-8);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.al-hero-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--al-space-2);
  margin-top: var(--al-space-4);
  padding: var(--al-space-3) var(--al-space-6);
  background: var(--al-primary-gradient, linear-gradient(135deg, var(--al-primary-500), var(--al-primary-600)));
  color: white;
  font-weight: var(--al-font-weight-bold);
  border-radius: var(--al-radius-lg);
  box-shadow: 0 4px 6px -1px rgba(20, 184, 166, 0.2), 0 2px 4px -1px rgba(20, 184, 166, 0.1);
  transition: all var(--al-transition-normal);
  text-decoration: none;
}

.al-hero-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(20, 184, 166, 0.3), 0 4px 6px -2px rgba(20, 184, 166, 0.15);
  filter: brightness(110%);
}

/* Refined Header Layout */
.al-dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--al-space-6);
  flex-wrap: wrap;
  gap: var(--al-space-4);
}

.al-welcome-header {
  margin-bottom: 0;
  padding: 0;
}

.al-quick-actions-bar {
  margin-bottom: 0;
  gap: var(--al-space-4); /* Consistent spacing */
}

/* Hero Updates with Compact Stats */
.al-hero-section {
  display: flex; /* Changed from grid to flex for single panel */
  flex-direction: column;
  background: var(--al-bg-glass);
  border: 1px solid var(--al-border-glass);
  border-radius: var(--al-radius-2xl);
  overflow: hidden;
  box-shadow: var(--al-shadow-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  margin-bottom: var(--al-space-8);
  position: relative;
}

.al-hero-content {
  padding: var(--al-space-8);
  width: 100%;
}

.al-hero-footer {
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-top: var(--al-space-6);
   flex-wrap: wrap;
   gap: var(--al-space-4);
}

.al-hero-stats-row {
  display: flex;
  gap: var(--al-space-6);
  padding: var(--al-space-2) var(--al-space-4);
  background: var(--al-bg-secondary);
  border-radius: var(--al-radius-lg);
  border: 1px solid var(--al-border-light);
}

.al-stat-compact {
  display: flex;
  align-items: center;
  gap: var(--al-space-2);
}

.al-stat-value-sm {
  font-weight: var(--al-font-weight-bold);
  font-size: var(--al-font-size-sm);
  color: var(--al-text-secondary);
}

/* Ensure no dangling margin override from previous rules */
.al-hero-btn { margin-top: 0; }

@media (max-width: 768px) {
  .al-dashboard-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .al-quick-actions-bar {
    width: 100%;
    justify-content: space-around;
  }
  
  .al-hero-footer {
    flex-direction: column;
    align-items: stretch;
  }
  
  .al-hero-stats-row {
    justify-content: space-around;
  }
}

/* Inline Dropdown Styles */
.al-welcome-subtitle {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--al-space-1);
  color: var(--al-text-tertiary);
  font-size: var(--al-font-size-sm);
}

.al-inline-dropdown {
  position: relative;
  display: inline-flex;
}

.al-dropdown-trigger {
  background: none;
  border: none;
  padding: 0 var(--al-space-1);
  color: var(--al-primary-500);
  font-weight: var(--al-font-weight-bold);
  font-size: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 2px;
  border-radius: var(--al-radius-sm);
  transition: all var(--al-transition-fast);
}

.al-dropdown-trigger:hover {
  background: var(--al-primary-50);
  color: var(--al-primary-600);
}

.dark .al-dropdown-trigger:hover {
  background: rgba(20, 184, 166, 0.1);
}

.al-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: var(--al-space-2);
  background: var(--al-bg-card);
  border: 1px solid var(--al-border-light);
  border-radius: var(--al-radius-lg);
  box-shadow: var(--al-shadow-lg);
  min-width: 220px;
  max-width: 300px;
  z-index: 100;
  padding: var(--al-space-2);
  animation: al-scale-in 0.2s ease-out;
}

.al-dropdown-section {
  max-height: 240px;
  overflow-y: auto;
}

.al-dropdown-item {
  display: flex;
  align-items: center;
  gap: var(--al-space-3);
  width: 100%;
  padding: var(--al-space-2) var(--al-space-3);
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: var(--al-radius-md);
  color: var(--al-text-primary);
  transition: background var(--al-transition-fast);
}

.al-dropdown-item:hover {
  background: var(--al-bg-secondary);
}

.al-dropdown-item-active {
  background: var(--al-primary-50);
  color: var(--al-primary-600);
  font-weight: var(--al-font-weight-medium);
}

.dark .al-dropdown-item-active {
  background: rgba(20, 184, 166, 0.1);
}

.al-dropdown-divider {
  height: 1px;
  background: var(--al-border-light);
  margin: var(--al-space-2) 0;
}

.al-dropdown-action {
  color: var(--al-primary-600);
  font-weight: var(--al-font-weight-medium);
}

.al-flag-sm {
  font-size: 1.2rem;
  line-height: 1;
}

.al-fs-sm {
  font-size: var(--al-font-size-sm);
}

@keyframes al-scale-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

/* Zero State Split Layout */
.al-welcome {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--al-space-8);
}

.al-welcome-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--al-space-12);
  width: 100%;
  max-width: 1000px;
  align-items: center;
}

.al-welcome-left {
  text-align: left;
}


.al-logo-large {
  color: var(--al-primary-600);
  margin-bottom: var(--al-space-6);
  filter: drop-shadow(0 4px 6px rgba(20, 184, 166, 0.3));
}

.al-welcome-features-list {

  display: flex;
  flex-direction: column;
  gap: var(--al-space-6);
  margin-top: var(--al-space-8);
}

.al-feature-row {
  display: flex;
  align-items: center;
  gap: var(--al-space-4);
}


.al-block { display: block; }

.al-welcome-right {
  display: flex;
  justify-content: center;
}

.al-action-box {
  background: var(--al-bg-card);
  padding: var(--al-space-8);
  border-radius: var(--al-radius-2xl);
  border: 1px solid var(--al-border-light);
  box-shadow: var(--al-shadow-xl);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.al-action-box h3 {
  margin-bottom: var(--al-space-6);
}

.al-divider-text {
  display: flex;
  align-items: center;
  color: var(--al-text-tertiary);
  font-size: var(--al-font-size-sm);
  margin: var(--al-space-4) 0;
}

.al-divider-text::before,
.al-divider-text::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--al-border-light);
}

.al-divider-text::before { margin-right: var(--al-space-4); }
.al-divider-text::after { margin-left: var(--al-space-4); }

.al-cta-link {
  background: none;
  border: none;
  color: var(--al-primary-600);
  font-weight: var(--al-font-weight-medium);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: var(--al-space-1);
  font-size: var(--al-font-size-sm);
}

.al-cta-link:hover {
  text-decoration: underline;
}

.al-mb-6 { margin-bottom: var(--al-space-6); }
.al-text-secondary { color: var(--al-text-secondary); }
.al-btn-xl {
  padding: var(--al-space-5) var(--al-space-8);
  font-size: var(--al-font-size-lg);
  font-weight: var(--al-font-weight-bold);
  background: linear-gradient(135deg, var(--al-primary-500), var(--al-primary-600));
  color: white;
  border: none;
  box-shadow: 0 4px 14px 0 rgba(20, 184, 166, 0.4);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--al-space-3);
  border-radius: var(--al-radius-lg);
}

.al-btn-xl:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(20, 184, 166, 0.6);
  background: linear-gradient(135deg, var(--al-primary-600), var(--al-primary-700));
}

.al-w-full { width: 100%; }

@media (max-width: 768px) {
  .al-welcome-split {
    grid-template-columns: 1fr;
    gap: var(--al-space-8);
    text-align: center;
  }
  
  .al-welcome-left {
    text-align: center;
  }

  .al-feature-row {
    justify-content: center;
    text-align: left;
  }
}

/* Enforce Header Centering & Blue Theme */
.al-header-content {
  position: relative;
  justify-content: space-between;
}

.al-logo {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: var(--al-primary-600);
  display: flex;
  align-items: center;
  gap: var(--al-space-2);
}

.al-logo-text {
  font-weight: var(--al-font-weight-bold);
  font-size: var(--al-font-size-lg);
}
</style>

