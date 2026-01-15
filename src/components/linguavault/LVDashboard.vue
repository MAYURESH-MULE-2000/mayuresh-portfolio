<template>
  <div class="lv-dashboard">
    <!-- Header -->
    <header class="lv-header">
      <div class="lv-header-content">
        <a href="/" class="lv-back-link">
          <ArrowLeft class="lv-icon-sm" />
          <span>Portfolio</span>
        </a>
        
        <div class="lv-logo" style="color: var(--lv-primary-600)">
          <BookOpen class="lv-logo-icon" />
          <span class="lv-logo-text">LinguaVault</span>
        </div>


        <button @click="toggleTheme" class="lv-btn lv-btn-ghost lv-btn-icon" title="Toggle theme">
          <Sun v-if="isDark" class="lv-icon-sm" />
          <Moon v-else class="lv-icon-sm" />
        </button>
      </div>
    </header>

    <!-- Loading State -->
    <div v-if="isLoading" class="lv-loading">
      <div class="lv-loading-spinner"></div>
      <p>Loading your learning data...</p>
    </div>

    <!-- Main Content -->
    <div v-else class="lv-main">
      <!-- Welcome Section (No Curriculums) -->
      <section v-if="curriculums.length === 0" class="lv-welcome">
        
        <!-- Wizard View -->
        <LVCurriculumWizard 
            v-if="showWizard" 
            @close="showWizard = false"
        >
            <template #uploader>
            <div 
                class="lv-upload-zone"
                :class="{ 'lv-upload-zone-active': isDragging }"
                @dragover.prevent="isDragging = true"
                @dragleave="isDragging = false"
                @drop.prevent="handleFileDrop"
                >
                <input 
                    type="file" 
                    accept=".json" 
                    @change="handleFileSelect"
                    id="wizard-curriculum-file"
                    class="lv-file-input"
                >
                <label for="wizard-curriculum-file" class="lv-upload-label">
                    <CloudUpload class="lv-icon-xl" />
                    <span class="lv-upload-text">Drop your curriculum JSON here</span>
                    <span class="lv-upload-hint">or click to browse</span>
                </label>
            </div>
            </template>
        </LVCurriculumWizard>

        <!-- Split Layout Zero State -->
        <div v-else class="lv-welcome-split">
          <!-- Left: Value Prop -->
          <div class="lv-welcome-left">
            <div class="lv-logo-large">
              <BookOpen class="lv-icon-xl" />
            </div>
            <h1 class="lv-heading-2" style="color: var(--lv-text-primary); font-weight: var(--lv-font-weight-bold);">Welcome to LinguaVault</h1>
            <p class="lv-body lv-mb-6" style="color: var(--lv-text-secondary); line-height: 1.6;">
              Your personal, offline-first language learning companion.<br>
              No accounts. No tracking. Just learning.
            </p>


            <div class="lv-welcome-features-list">
              <div class="lv-feature-row">
                <Shield class="lv-icon-md" style="color: var(--lv-primary-600);" />
                <div>
                  <strong class="lv-block" style="color: var(--lv-text-primary); font-weight: var(--lv-font-weight-semibold);">Privacy First</strong>
                  <span class="lv-caption" style="color: var(--lv-text-secondary);">All data stays on your device</span>
                </div>

              </div>
              <div class="lv-feature-row">
                <WifiOff class="lv-icon-md" style="color: var(--lv-primary-600);" />
                <div>
                   <strong class="lv-block" style="color: var(--lv-text-primary); font-weight: var(--lv-font-weight-semibold);">Works Offline</strong>
                   <span class="lv-caption" style="color: var(--lv-text-secondary);">Learn anywhere, anytime</span>
                </div>

              </div>
              <div class="lv-feature-row">
                <Target class="lv-icon-md" style="color: var(--lv-primary-600);" />
                <div>
                   <strong class="lv-block" style="color: var(--lv-text-primary); font-weight: var(--lv-font-weight-semibold);">Structured Learning</strong>
                   <span class="lv-caption" style="color: var(--lv-text-secondary);">Follow curated curricula</span>
                </div>

              </div>
            </div>
          </div>

          <!-- Right: Actions -->
          <div class="lv-welcome-right">
             <div class="lv-action-box">
               <h3 class="lv-heading-3">Start your journey</h3>
               <button @click="showUploader = true" class="lv-btn lv-btn-xl lv-w-full">
                 <Upload class="lv-icon-md" />
                 Upload Curriculum
               </button>
               
               <div class="lv-divider-text">or</div>
               
               <button @click="showWizard = true" class="lv-cta-link">
                 Need a curriculum? Learn how to create one <ArrowRight class="lv-icon-xs" />
               </button>
             </div>
          </div>
        </div>
      </section>

      <!-- Dashboard (Has Curriculums) -->
      <section v-else class="lv-dashboard-content">
        


        <!-- Dashboard Header: Welcome + Actions -->
        <div class="lv-dashboard-header">
           <div class="lv-welcome-header">
             <h1 class="lv-heading-2">Welcome back! 👋</h1>
             <div class="lv-welcome-subtitle">
               <span>Ready to master </span>
               <div class="lv-inline-dropdown">
                 <button 
                  @click="showLanguageDropdown = !showLanguageDropdown" 
                  class="lv-dropdown-trigger"
                >
                   {{ activeCurriculum ? activeCurriculum.meta.targetLanguage : 'a new language' }}
                   <ChevronDown class="lv-icon-xs" />
                 </button>
                 
                 <!-- Language Dropdown Menu -->
                 <div v-if="showLanguageDropdown" class="lv-dropdown-menu">
                   <div v-if="curriculums.length > 0" class="lv-dropdown-section">
                     <button 
                      v-for="curr in curriculums" 
                      :key="curr.id"
                      @click="switchLanguage(curr.id)"
                      class="lv-dropdown-item"
                      :class="{ 'lv-dropdown-item-active': curr.id === activeCurriculumId }"
                     >
                       <span class="lv-flag-sm">{{ getLanguageFlag(curr.meta.targetLanguageCode) }}</span>
                       <span class="lv-fs-sm">{{ curr.meta.targetLanguage }}</span>
                       <Check v-if="curr.id === activeCurriculumId" class="lv-icon-xs lv-text-primary" />
                     </button>
                   </div>
                   <div class="lv-dropdown-divider"></div>
                   <button @click="showUploader = true; showLanguageDropdown = false" class="lv-dropdown-item lv-dropdown-action">
                     <Plus class="lv-icon-sm" />
                     <span>Add New Language</span>
                   </button>
                 </div>
               </div>
               <span> today?</span>
             </div>
           </div>

            <!-- Quick Actions -->
            <div class="lv-quick-actions-bar">
              <button @click="exportData" class="lv-quick-action" title="Save all data locally">
                <div class="lv-quick-action-icon lv-text-blue">
                  <Download class="lv-icon-md" />
                </div>
                <span>Save All</span>
              </button>
              <a href="/linguavault/settings" class="lv-quick-action" title="Settings">
                <div class="lv-quick-action-icon lv-text-slate">
                  <Settings class="lv-icon-md" />
                </div>
                <span>Settings</span>
              </a>
            </div>
        </div>

        <!-- Hero Section (Active Course) -->
        <div v-if="activeCurriculum" class="lv-hero-section">
          <div class="lv-hero-content">
            <div class="lv-hero-header">
              <span class="lv-hero-label">Current Focus</span>
              <span class="lv-hero-flag">{{ getLanguageFlag(activeCurriculum.meta.targetLanguageCode) }}</span>
            </div>
            
            <h2 class="lv-heading-1 lv-hero-title">{{ activeCurriculum.meta.title }}</h2>
            <p class="lv-body lv-hero-desc">{{ activeCurriculum.meta.description }}</p>
            
            <div class="lv-hero-progress">
              <div class="lv-progress-info">
                 <span class="lv-caption">{{ activeCurriculum.meta.proficiencyLevel }}</span>
                 <span class="lv-caption">{{ getProgress(activeCurriculum.id) }}% Complete</span>
              </div>
              <div class="lv-progress-bar">
                <div class="lv-progress-fill" :style="{ width: getProgress(activeCurriculum.id) + '%' }"></div>
              </div>
            </div>

            <div class="lv-hero-footer">
               <a :href="`/linguavault/learn/${activeCurriculum.id}`" class="lv-btn lv-btn-primary lv-btn-lg lv-hero-btn">
                <span>Continue Learning</span>
                <ArrowRight class="lv-icon-md" />
              </a>

              <!-- Compact Stats -->
              <div class="lv-hero-stats-row">
                <div class="lv-stat-compact" title="Lessons Completed">
                   <BookOpen class="lv-icon-sm lv-text-teal" />
                   <span class="lv-stat-value-sm">{{ totalLessonsCompleted }}</span>
                </div>
                <div class="lv-stat-compact" title="Day Streak">
                   <Flame class="lv-icon-sm lv-text-orange" />
                   <span class="lv-stat-value-sm">{{ currentStreak }}</span>
                </div>
                <div class="lv-stat-compact" title="Minutes Spent">
                   <Clock class="lv-icon-sm lv-text-blue" />
                   <span class="lv-stat-value-sm">{{ totalTimeSpent }}m</span>
                </div>
               </div>
            </div>
          </div>
          <!-- Removed old side stats div -->
        </div>
          




      </section>
    </div>

    <!-- Upload Modal -->
    <div v-if="showUploader" class="lv-modal-backdrop" @click.self="showUploader = false">
      <div class="lv-modal lv-animate-scale-in">
        <div class="lv-modal-header">
          <h2 class="lv-heading-3">Upload Curriculum</h2>
          <button @click="showUploader = false" class="lv-btn lv-btn-ghost lv-btn-icon">
            <X class="lv-icon-sm" />
          </button>
        </div>
        
        <div class="lv-modal-body">
          <div 
            class="lv-upload-zone"
            :class="{ 'lv-upload-zone-active': isDragging }"
            @dragover.prevent="isDragging = true"
            @dragleave="isDragging = false"
            @drop.prevent="handleFileDrop"
          >
            <input 
              type="file" 
              accept=".json" 
              @change="handleFileSelect"
              id="curriculum-file"
              class="lv-file-input"
            >
            <label for="curriculum-file" class="lv-upload-label">
              <CloudUpload class="lv-icon-xl" />
              <span class="lv-upload-text">Drop your curriculum JSON here</span>
              <span class="lv-upload-hint">or click to browse</span>
            </label>
          </div>

          <!-- Validation Results -->
          <div v-if="validationResult" class="lv-validation-result" :class="validationResult.valid ? 'lv-validation-success' : 'lv-validation-error'">
            <div class="lv-validation-header">
              <span v-if="validationResult.valid">✓ Valid Curriculum</span>
              <span v-else>✗ Invalid Curriculum</span>
            </div>
            
            <div v-if="duplicateWarning" class="lv-validation-warning-box">
               <AlertTriangle class="lv-icon-sm" />
               <span>This curriculum already exists. Uploading will update it.</span>
            </div>

            <div v-if="validationResult.errors.length > 0" class="lv-validation-errors">
              <p v-for="error in validationResult.errors.slice(0, 5)" :key="error.path" class="lv-error-item">
                <strong>{{ error.path }}:</strong> {{ error.message }}
              </p>
              <p v-if="validationResult.errors.length > 5" class="lv-caption">
                ...and {{ validationResult.errors.length - 5 }} more errors
              </p>
            </div>

            <div v-if="validationResult.warnings.length > 0" class="lv-validation-warnings">
              <p v-for="warning in validationResult.warnings.slice(0, 3)" :key="warning.path" class="lv-warning-item">
                ⚠️ {{ warning.message }}
              </p>
            </div>
          </div>

          <!-- Preview -->
          <div v-if="pendingCurriculum" class="lv-curriculum-preview">
            <h4 class="lv-heading-4">{{ pendingCurriculum.meta.title }}</h4>
            <p class="lv-body-sm">{{ pendingCurriculum.meta.description }}</p>
            <div class="lv-preview-meta">
              <span>{{ pendingCurriculum.meta.targetLanguage }}</span>
              <span>•</span>
              <span>{{ pendingCurriculum.modules.length }} modules</span>
              <span>•</span>
              <span>{{ pendingCurriculum.meta.estimatedHours || '?' }} hours</span>
            </div>
          </div>
        </div>

        <div class="lv-modal-footer">
          <button @click="showUploader = false" class="lv-btn lv-btn-secondary">Cancel</button>
          <button @click="showUploader = false" class="lv-btn lv-btn-secondary">Cancel</button>
          <button 
            @click="confirmUpload" 
            class="lv-btn lv-btn-primary"
            :disabled="!pendingCurriculum || !validationResult?.valid"
          >
            {{ duplicateWarning ? 'Update Existing' : 'Upload & Start Learning' }}
          </button>
        </div>
      </div>
    </div>

    <!-- How To Modal -->
    <div v-if="showHowTo" class="lv-modal-backdrop" @click.self="showHowTo = false">
      <div class="lv-modal lv-modal-lg lv-animate-scale-in">
        <div class="lv-modal-header">
          <h2 class="lv-heading-3">How to Create a Curriculum</h2>
          <button @click="showHowTo = false" class="lv-btn lv-btn-ghost lv-btn-icon">
            <X class="lv-icon-sm" />
          </button>
        </div>
        
        <div class="lv-modal-body lv-how-to">
          <div class="lv-how-to-step">
            <span class="lv-step-number">1</span>
            <div>
              <h4>Use an AI Assistant</h4>
              <p>Copy the prompt below and paste it into ChatGPT, Claude, or any AI assistant.</p>
            </div>
          </div>

          <div class="lv-how-to-step">
            <span class="lv-step-number">2</span>
            <div>
              <h4>Customize Your Learning</h4>
              <p>Tell the AI what language you want to learn, your current level, and your goals.</p>
            </div>
          </div>

          <div class="lv-how-to-step">
            <span class="lv-step-number">3</span>
            <div>
              <h4>Download & Upload</h4>
              <p>Save the generated JSON file and upload it here to start learning!</p>
            </div>
          </div>

          <div class="lv-prompt-box">
            <div class="lv-prompt-header">
              <span>📋 Curriculum Generation Prompt</span>
              <button @click="copyPrompt" class="lv-btn lv-btn-sm lv-btn-secondary">
                {{ promptCopied ? '✓ Copied!' : 'Copy' }}
              </button>
            </div>
            <pre class="lv-prompt-text">{{ curriculumPrompt }}</pre>
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
import type { Curriculum, LearningProgress, ValidationResult } from '../../types/linguavault';
import { initDB, getAllCurriculums, getAllProgress, saveCurriculum, initializeProgress, exportAllData } from '../../lib/linguavault/db';
import { parseAndValidateCurriculum } from '../../lib/linguavault/validator';
import { getActiveCurriculumId, setActiveCurriculumId } from '../../lib/linguavault/storage';

import LVCurriculumWizard from './LVCurriculumWizard.vue';

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
const curriculumPrompt = `Create a language learning curriculum JSON for LinguaVault with the following structure:

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
  window.location.href = `/linguavault/learn/${id}`;
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
    a.download = `linguavault-backup-${new Date().toISOString().split('T')[0]}.json`;
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
    console.error('Failed to initialize LinguaVault:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.lv-dashboard {
  min-height: 100vh;
}

/* Header */
.lv-header {
  position: sticky;
  top: 0;
  z-index: var(--lv-z-sticky);
  background: var(--lv-bg-primary);
  border-bottom: 1px solid var(--lv-border-light);
  backdrop-filter: blur(10px);
}

.lv-header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--lv-space-4);
}

.lv-back-link {
  display: flex;
  align-items: center;
  gap: var(--lv-space-2);
  color: var(--lv-text-secondary);
  text-decoration: none;
  font-size: var(--lv-font-size-sm);
  transition: color var(--lv-transition-fast);
}

.lv-back-link:hover {
  color: var(--lv-text-primary);
}

.lv-logo {
  display: flex;
  align-items: center;
  gap: var(--lv-space-2);
}

.lv-logo-icon {
  font-size: 1.5rem;
}

.lv-logo-text {
  font-size: var(--lv-font-size-xl);
  font-weight: var(--lv-font-weight-bold);
  background: linear-gradient(135deg, var(--lv-primary-500), var(--lv-primary-700));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Loading */
.lv-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: var(--lv-space-4);
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

/* Main Content */
.lv-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--lv-space-8) var(--lv-space-4);
}

/* Welcome Section */
.lv-welcome {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lv-welcome-content {
  text-align: center;
  max-width: 600px;
}

.lv-welcome-icon {
  font-size: 4rem;
  margin-bottom: var(--lv-space-6);
  animation: lv-bounce 2s ease-in-out infinite;
}

.lv-welcome-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--lv-space-4);
  margin: var(--lv-space-8) 0;
}

.lv-feature {
  display: flex;
  align-items: flex-start;
  gap: var(--lv-space-3);
  text-align: left;
  padding: var(--lv-space-4);
  background: var(--lv-bg-secondary);
  border-radius: var(--lv-radius-lg);
}

.lv-feature-icon {
  font-size: 1.5rem;
}

.lv-feature h4 {
  font-size: var(--lv-font-size-sm);
  font-weight: var(--lv-font-weight-semibold);
  margin-bottom: var(--lv-space-1);
}

.lv-feature p {
  font-size: var(--lv-font-size-xs);
  color: var(--lv-text-tertiary);
}

.lv-welcome-actions {
  display: flex;
  gap: var(--lv-space-4);
  justify-content: center;
  flex-wrap: wrap;
}

.lv-welcome-hint {
  margin-top: var(--lv-space-6);
  font-size: var(--lv-font-size-sm);
  color: var(--lv-text-tertiary);
}

.lv-welcome-hint a {
  color: var(--lv-primary-500);
  text-decoration: none;
}

.lv-welcome-hint a:hover {
  text-decoration: underline;
}

/* Hero Section */
.lv-hero-section {
  background: var(--lv-bg-card);
  border: 1px solid var(--lv-border-light);
  border-radius: var(--lv-radius-2xl);
  overflow: hidden;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  margin-bottom: var(--lv-space-12);
  box-shadow: var(--lv-shadow-lg);
  position: relative;
}

.dark .lv-hero-section {
  background: linear-gradient(135deg, var(--lv-bg-card), rgba(20, 184, 166, 0.05));
  border-color: var(--lv-border-medium);
}

.lv-hero-content {
  padding: var(--lv-space-8);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.lv-hero-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--lv-space-4);
}

.lv-hero-label {
  font-size: var(--lv-font-size-sm);
  font-weight: var(--lv-font-weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--lv-primary-600);
}

.dark .lv-hero-label {
  color: var(--lv-primary-400);
}

.lv-hero-flag {
  font-size: 2rem;
}

.lv-hero-title {
  margin-bottom: var(--lv-space-2);
  background: linear-gradient(135deg, var(--lv-text-primary), var(--lv-text-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.lv-hero-desc {
  margin-bottom: var(--lv-space-6);
  max-width: 90%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.lv-hero-progress {
  margin-bottom: var(--lv-space-8);
}

.lv-progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--lv-space-2);
  align-items: center;
}

.lv-hero-btn {
  align-self: flex-start;
  box-shadow: 0 4px 14px 0 rgba(20, 184, 166, 0.39);
}

.lv-hero-btn:hover {
  box-shadow: 0 6px 20px rgba(20, 184, 166, 0.23);
  transform: translateY(-2px);
}

/* Hero Stats */
.lv-hero-stats {
  background: var(--lv-bg-secondary);
  padding: var(--lv-space-8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--lv-space-4);
  border-left: 1px solid var(--lv-border-light);
}

.dark .lv-hero-stats {
  background: rgba(0, 0, 0, 0.2);
  border-left-color: var(--lv-border-medium);
}

.lv-stat-card {
  background: var(--lv-bg-card);
  padding: var(--lv-space-4);
  border-radius: var(--lv-radius-xl);
  display: flex;
  align-items: center;
  gap: var(--lv-space-4);
  border: 1px solid var(--lv-border-light);
  transition: transform var(--lv-transition-normal);
}

.lv-stat-card:hover {
  transform: translateX(4px);
  border-color: var(--lv-primary-200);
}

.dark .lv-stat-card:hover {
  border-color: var(--lv-primary-800);
}

.lv-stat-icon {
  font-size: 1.5rem;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--lv-bg-tertiary);
  border-radius: var(--lv-radius-lg);
}

.lv-stat-info {
  display: flex;
  flex-direction: column;
}

.lv-stat-value {
  font-size: var(--lv-font-size-xl);
  font-weight: var(--lv-font-weight-bold);
  line-height: 1.2;
}

.lv-stat-label {
  font-size: var(--lv-font-size-xs);
  color: var(--lv-text-tertiary);
}

/* Curriculum Grid & Cards */
.lv-curriculum-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--lv-space-6);
}

.lv-curriculum-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--lv-bg-card);
  border: 1px solid var(--lv-border-light);
  transition: all var(--lv-transition-normal);
}

.lv-curriculum-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--lv-shadow-lg);
  border-color: var(--lv-primary-300);
}

.lv-curriculum-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--lv-space-4);
}

.lv-curriculum-flag {
  font-size: 2.5rem;
  line-height: 1;
}

.lv-curriculum-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: var(--lv-space-4);
}

.lv-empty-state {
  text-align: center;
  padding: var(--lv-space-8);
  background: var(--lv-bg-secondary);
  border-radius: var(--lv-radius-lg);
  border: 1px dashed var(--lv-border-medium);
  color: var(--lv-text-tertiary);
}

/* Quick Actions Bar */
.lv-quick-actions-bar {
  display: flex;
  gap: var(--lv-space-4);
  margin-bottom: var(--lv-space-8);
  overflow-x: auto;
  padding-bottom: var(--lv-space-2);
}

.lv-quick-action {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--lv-space-2);
  background: none;
  border: none;
  cursor: pointer;
  min-width: 64px;
  text-decoration: none;
  color: var(--lv-text-secondary);
  font-size: var(--lv-font-size-xs);
  transition: all var(--lv-transition-fast);
}

.lv-quick-action:hover {
  color: var(--lv-text-primary);
  transform: translateY(-2px);
}

.lv-quick-action-icon {
  width: 48px;
  height: 48px;
  background: var(--lv-bg-card);
  border: 1px solid var(--lv-border-light);
  border-radius: var(--lv-radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: all var(--lv-transition-fast);
  color: var(--lv-text-primary);
}

.lv-quick-action:hover .lv-quick-action-icon {
  border-color: var(--lv-primary-300);
  background: var(--lv-bg-secondary);
  box-shadow: var(--lv-shadow-md);
}

/* Icons */
.lv-icon-sm { width: 20px; height: 20px; }
.lv-icon-md { width: 24px; height: 24px; }
.lv-icon-lg { width: 32px; height: 32px; }
.lv-icon-xl { width: 48px; height: 48px; }

/* Responsive */
@media (max-width: 900px) {
  .lv-hero-section {
    grid-template-columns: 1fr;
  }

  .lv-hero-stats {
    border-left: none;
    border-top: 1px solid var(--lv-border-light);
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .dark .lv-hero-stats {
    border-top-color: var(--lv-border-medium);
  }
  
  .lv-stat-card {
    flex: 1;
    min-width: 200px;
  }
}

@media (max-width: 600px) {
  .lv-hero-stats {
    flex-direction: column;
  }
  
  .lv-stat-card {
    width: 100%;
  }
  
  .lv-curriculum-flag {
    font-size: 2rem;
  }
}


/* Modal */
.lv-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--lv-z-modal-backdrop);
  padding: var(--lv-space-4);
}

.lv-modal {
  background: var(--lv-bg-primary);
  border-radius: var(--lv-radius-xl);
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--lv-shadow-xl);
}

.lv-modal-lg {
  max-width: 700px;
}

.lv-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--lv-space-6);
  border-bottom: 1px solid var(--lv-border-light);
}

.lv-modal-body {
  padding: var(--lv-space-6);
}

.lv-modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--lv-space-3);
  padding: var(--lv-space-6);
  border-top: 1px solid var(--lv-border-light);
}

/* Upload Zone */
.lv-upload-zone {
  border: 2px dashed var(--lv-border-medium);
  border-radius: var(--lv-radius-lg);
  padding: var(--lv-space-8);
  text-align: center;
  transition: all var(--lv-transition-fast);
}

.lv-upload-zone-active,
.lv-upload-zone:hover {
  border-color: var(--lv-primary-500);
  background: var(--lv-primary-50);
}

.dark .lv-upload-zone-active,
.dark .lv-upload-zone:hover {
  background: rgb(20 184 166 / 0.1);
}

.lv-file-input {
  display: none;
}

.lv-upload-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--lv-space-2);
  cursor: pointer;
  color: var(--lv-text-tertiary);
}

.lv-upload-text {
  font-weight: var(--lv-font-weight-medium);
  color: var(--lv-text-primary);
}

.lv-upload-hint {
  font-size: var(--lv-font-size-sm);
}

/* Validation Result */
.lv-validation-result {
  margin-top: var(--lv-space-4);
  padding: var(--lv-space-4);
  border-radius: var(--lv-radius-lg);
}

.lv-validation-success {
  background: var(--lv-success-50);
  border: 1px solid var(--lv-success-500);
}

.lv-validation-error {
  background: var(--lv-error-50);
  border: 1px solid var(--lv-error-500);
}

.lv-validation-header {
  font-weight: var(--lv-font-weight-semibold);
  margin-bottom: var(--lv-space-2);
}

.lv-error-item,
.lv-warning-item {
  font-size: var(--lv-font-size-sm);
  margin-bottom: var(--lv-space-1);
}

/* Curriculum Preview */
.lv-curriculum-preview {
  margin-top: var(--lv-space-4);
  padding: var(--lv-space-4);
  background: var(--lv-bg-secondary);
  border-radius: var(--lv-radius-lg);
}

.lv-preview-meta {
  display: flex;
  gap: var(--lv-space-2);
  margin-top: var(--lv-space-2);
  font-size: var(--lv-font-size-sm);
  color: var(--lv-text-tertiary);
}

/* How To */
.lv-how-to {
  max-height: 60vh;
  overflow-y: auto;
}

.lv-how-to-step {
  display: flex;
  gap: var(--lv-space-4);
  margin-bottom: var(--lv-space-4);
}

.lv-step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--lv-primary-500);
  color: white;
  border-radius: 50%;
  font-weight: var(--lv-font-weight-bold);
  flex-shrink: 0;
}

.lv-how-to-step h4 {
  font-weight: var(--lv-font-weight-semibold);
  margin-bottom: var(--lv-space-1);
}

.lv-how-to-step p {
  font-size: var(--lv-font-size-sm);
  color: var(--lv-text-secondary);
}

.lv-prompt-box {
  margin-top: var(--lv-space-4);
  border: 1px solid var(--lv-border-light);
  border-radius: var(--lv-radius-lg);
  overflow: hidden;
}

.lv-prompt-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--lv-space-3) var(--lv-space-4);
  background: var(--lv-bg-secondary);
  font-size: var(--lv-font-size-sm);
  font-weight: var(--lv-font-weight-medium);
}

.lv-prompt-text {
  padding: var(--lv-space-4);
  margin: 0;
  font-size: var(--lv-font-size-xs);
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
  background: var(--lv-bg-tertiary);
  max-height: 200px;
  overflow-y: auto;
}

/* Responsive */
@media (max-width: 768px) {
  .lv-stats-bar {
    flex-direction: column;
    gap: var(--lv-space-4);
  }

  .lv-welcome-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .lv-curriculum-grid {
    grid-template-columns: 1fr;
  }
}

/* Text Colors */
.lv-text-teal { color: #14b8a6 !important; }
.lv-text-orange { color: #f97316 !important; }
.lv-text-blue { color: #3b82f6 !important; }
.lv-text-purple { color: #a855f7 !important; }
.lv-text-red { color: #ef4444 !important; }
.lv-text-slate { color: #64748b !important; }
.lv-text-tertiary { color: var(--lv-text-tertiary); }

.dark .lv-text-slate { color: #94a3b8 !important; }

/* Welcome Header */
.lv-welcome-header {
  margin-bottom: var(--lv-space-6);
  padding: 0 var(--lv-space-2);
}

.lv-welcome-header h1 {
  margin-bottom: var(--lv-space-1);
}

/* Hero Section Updates */
.lv-hero-section {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  background: var(--lv-bg-card);
  border: 1px solid var(--lv-border-light);
  border-radius: var(--lv-radius-2xl);
  overflow: hidden;
  box-shadow: var(--lv-shadow-md);
  margin-bottom: var(--lv-space-8);
  position: relative;
}

/* Add a subtle top border gradient for pop - REMOVED per user request */
/* .lv-hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(to right, var(--lv-primary-400), var(--lv-accent-400));
} */

.lv-hero-content {
  padding: var(--lv-space-8);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.lv-hero-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--lv-space-2);
  margin-top: var(--lv-space-4);
  padding: var(--lv-space-3) var(--lv-space-6);
  background: var(--lv-primary-gradient, linear-gradient(135deg, var(--lv-primary-500), var(--lv-primary-600)));
  color: white;
  font-weight: var(--lv-font-weight-bold);
  border-radius: var(--lv-radius-lg);
  box-shadow: 0 4px 6px -1px rgba(20, 184, 166, 0.2), 0 2px 4px -1px rgba(20, 184, 166, 0.1);
  transition: all var(--lv-transition-normal);
  text-decoration: none;
}

.lv-hero-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(20, 184, 166, 0.3), 0 4px 6px -2px rgba(20, 184, 166, 0.15);
  filter: brightness(110%);
}

/* Refined Header Layout */
.lv-dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--lv-space-6);
  flex-wrap: wrap;
  gap: var(--lv-space-4);
}

.lv-welcome-header {
  margin-bottom: 0;
  padding: 0;
}

.lv-quick-actions-bar {
  margin-bottom: 0;
  gap: var(--lv-space-4); /* Consistent spacing */
}

/* Hero Updates with Compact Stats */
.lv-hero-section {
  display: flex; /* Changed from grid to flex for single panel */
  flex-direction: column;
  background: var(--lv-bg-card);
  border: 1px solid var(--lv-border-light);
  border-radius: var(--lv-radius-2xl);
  overflow: hidden;
  box-shadow: var(--lv-shadow-md);
  margin-bottom: var(--lv-space-8);
  position: relative;
}

.lv-hero-content {
  padding: var(--lv-space-8);
  width: 100%;
}

.lv-hero-footer {
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-top: var(--lv-space-6);
   flex-wrap: wrap;
   gap: var(--lv-space-4);
}

.lv-hero-stats-row {
  display: flex;
  gap: var(--lv-space-6);
  padding: var(--lv-space-2) var(--lv-space-4);
  background: var(--lv-bg-secondary);
  border-radius: var(--lv-radius-lg);
  border: 1px solid var(--lv-border-light);
}

.lv-stat-compact {
  display: flex;
  align-items: center;
  gap: var(--lv-space-2);
}

.lv-stat-value-sm {
  font-weight: var(--lv-font-weight-bold);
  font-size: var(--lv-font-size-sm);
  color: var(--lv-text-secondary);
}

/* Ensure no dangling margin override from previous rules */
.lv-hero-btn { margin-top: 0; }

@media (max-width: 768px) {
  .lv-dashboard-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .lv-quick-actions-bar {
    width: 100%;
    justify-content: space-around;
  }
  
  .lv-hero-footer {
    flex-direction: column;
    align-items: stretch;
  }
  
  .lv-hero-stats-row {
    justify-content: space-around;
  }
}

/* Inline Dropdown Styles */
.lv-welcome-subtitle {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--lv-space-1);
  color: var(--lv-text-tertiary);
  font-size: var(--lv-font-size-sm);
}

.lv-inline-dropdown {
  position: relative;
  display: inline-flex;
}

.lv-dropdown-trigger {
  background: none;
  border: none;
  padding: 0 var(--lv-space-1);
  color: var(--lv-primary-500);
  font-weight: var(--lv-font-weight-bold);
  font-size: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 2px;
  border-radius: var(--lv-radius-sm);
  transition: all var(--lv-transition-fast);
}

.lv-dropdown-trigger:hover {
  background: var(--lv-primary-50);
  color: var(--lv-primary-600);
}

.dark .lv-dropdown-trigger:hover {
  background: rgba(20, 184, 166, 0.1);
}

.lv-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: var(--lv-space-2);
  background: var(--lv-bg-card);
  border: 1px solid var(--lv-border-light);
  border-radius: var(--lv-radius-lg);
  box-shadow: var(--lv-shadow-lg);
  min-width: 220px;
  max-width: 300px;
  z-index: 100;
  padding: var(--lv-space-2);
  animation: lv-scale-in 0.2s ease-out;
}

.lv-dropdown-section {
  max-height: 240px;
  overflow-y: auto;
}

.lv-dropdown-item {
  display: flex;
  align-items: center;
  gap: var(--lv-space-3);
  width: 100%;
  padding: var(--lv-space-2) var(--lv-space-3);
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: var(--lv-radius-md);
  color: var(--lv-text-primary);
  transition: background var(--lv-transition-fast);
}

.lv-dropdown-item:hover {
  background: var(--lv-bg-secondary);
}

.lv-dropdown-item-active {
  background: var(--lv-primary-50);
  color: var(--lv-primary-600);
  font-weight: var(--lv-font-weight-medium);
}

.dark .lv-dropdown-item-active {
  background: rgba(20, 184, 166, 0.1);
}

.lv-dropdown-divider {
  height: 1px;
  background: var(--lv-border-light);
  margin: var(--lv-space-2) 0;
}

.lv-dropdown-action {
  color: var(--lv-primary-600);
  font-weight: var(--lv-font-weight-medium);
}

.lv-flag-sm {
  font-size: 1.2rem;
  line-height: 1;
}

.lv-fs-sm {
  font-size: var(--lv-font-size-sm);
}

@keyframes lv-scale-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

/* Zero State Split Layout */
.lv-welcome {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--lv-space-8);
}

.lv-welcome-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--lv-space-12);
  width: 100%;
  max-width: 1000px;
  align-items: center;
}

.lv-welcome-left {
  text-align: left;
}


.lv-logo-large {
  color: var(--lv-primary-600);
  margin-bottom: var(--lv-space-6);
  filter: drop-shadow(0 4px 6px rgba(20, 184, 166, 0.3));
}

.lv-welcome-features-list {

  display: flex;
  flex-direction: column;
  gap: var(--lv-space-6);
  margin-top: var(--lv-space-8);
}

.lv-feature-row {
  display: flex;
  align-items: center;
  gap: var(--lv-space-4);
}


.lv-block { display: block; }

.lv-welcome-right {
  display: flex;
  justify-content: center;
}

.lv-action-box {
  background: var(--lv-bg-card);
  padding: var(--lv-space-8);
  border-radius: var(--lv-radius-2xl);
  border: 1px solid var(--lv-border-light);
  box-shadow: var(--lv-shadow-xl);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.lv-action-box h3 {
  margin-bottom: var(--lv-space-6);
}

.lv-divider-text {
  display: flex;
  align-items: center;
  color: var(--lv-text-tertiary);
  font-size: var(--lv-font-size-sm);
  margin: var(--lv-space-4) 0;
}

.lv-divider-text::before,
.lv-divider-text::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--lv-border-light);
}

.lv-divider-text::before { margin-right: var(--lv-space-4); }
.lv-divider-text::after { margin-left: var(--lv-space-4); }

.lv-cta-link {
  background: none;
  border: none;
  color: var(--lv-primary-600);
  font-weight: var(--lv-font-weight-medium);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: var(--lv-space-1);
  font-size: var(--lv-font-size-sm);
}

.lv-cta-link:hover {
  text-decoration: underline;
}

.lv-mb-6 { margin-bottom: var(--lv-space-6); }
.lv-text-secondary { color: var(--lv-text-secondary); }
.lv-btn-xl {
  padding: var(--lv-space-5) var(--lv-space-8);
  font-size: var(--lv-font-size-lg);
  font-weight: var(--lv-font-weight-bold);
  background: linear-gradient(135deg, var(--lv-primary-500), var(--lv-primary-600));
  color: white;
  border: none;
  box-shadow: 0 4px 14px 0 rgba(20, 184, 166, 0.4);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--lv-space-3);
  border-radius: var(--lv-radius-lg);
}

.lv-btn-xl:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(20, 184, 166, 0.6);
  background: linear-gradient(135deg, var(--lv-primary-600), var(--lv-primary-700));
}

.lv-w-full { width: 100%; }

@media (max-width: 768px) {
  .lv-welcome-split {
    grid-template-columns: 1fr;
    gap: var(--lv-space-8);
    text-align: center;
  }
  
  .lv-welcome-left {
    text-align: center;
  }

  .lv-feature-row {
    justify-content: center;
    text-align: left;
  }
}

/* Enforce Header Centering & Blue Theme */
.lv-header-content {
  position: relative;
  justify-content: space-between;
}

.lv-logo {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: var(--lv-primary-600);
  display: flex;
  align-items: center;
  gap: var(--lv-space-2);
}

.lv-logo-text {
  font-weight: var(--lv-font-weight-bold);
  font-size: var(--lv-font-size-lg);
}
</style>

