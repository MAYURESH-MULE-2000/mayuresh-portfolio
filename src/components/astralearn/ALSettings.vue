<template>
  <div class="al-settings">
    <!-- Header -->
    <header class="al-header">
      <div class="al-header-content">
        <a href="/astralearn" class="al-back-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>Dashboard</span>
        </a>
        
        <h1 class="al-heading-4">Settings</h1>

        <button @click="toggleTheme" class="al-btn al-btn-ghost al-btn-icon" title="Toggle theme">
          <svg v-if="isDark" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <div class="al-main">
      <!-- Storage Info -->
      <section class="al-section">
        <h2 class="al-heading-3">Storage Information</h2>
        <div class="al-storage-card">
          <div class="al-storage-stats">
            <div class="al-stat-item">
              <span class="al-stat-label">Curriculums</span>
              <span class="al-stat-value">{{ curriculumCount }}</span>
            </div>
            <div class="al-stat-item">
              <span class="al-stat-label">Storage Used</span>
              <span class="al-stat-value">{{ formatBytes(storageUsed) }}</span>
            </div>
            <div class="al-stat-item">
              <span class="al-stat-label">Available</span>
              <span class="al-stat-value">{{ formatBytes(storageAvailable) }}</span>
            </div>
          </div>
          <div class="al-storage-bar">
            <div class="al-storage-fill" :style="{ width: storagePercentage + '%' }"></div>
          </div>
          <span class="al-caption">{{ storagePercentage }}% used</span>
        </div>
      </section>

      <!-- API Configuration -->
      <section class="al-section">
        <h2 class="al-heading-3">API Configuration</h2>
        <div class="al-card">
          <h3 class="al-heading-4" style="margin-bottom: var(--al-space-2);">Google Gemini API Key</h3>
          <p class="al-body-sm" style="margin-bottom: var(--al-space-4); color: var(--al-text-secondary);">
            AstraLearn uses Google's Gemini AI to generate personalized language curriculums. You can get a free API key from <a href="https://aistudio.google.com/app/apikey" target="_blank" class="al-link">Google AI Studio</a>.
          </p>
          <div class="al-form-group" style="margin-bottom: var(--al-space-4);">
            <input 
              v-model="geminiApiKey" 
              type="password" 
              class="al-input" 
              placeholder="AIzaSy..." 
            />
          </div>
          <div style="display: flex; align-items: center; gap: var(--al-space-3);">
            <button @click="saveApiKey" class="al-btn al-btn-primary">
              Save API Key
            </button>
            <span v-if="apiKeySaved" style="color: var(--al-success-600); font-weight: var(--al-font-weight-medium);">Saved!</span>
          </div>
        </div>
      </section>

      <!-- Data Management -->
      <section class="al-section">
        <h2 class="al-heading-3">Data Management</h2>
        
        <div class="al-data-actions">
          <!-- Export Data -->
          <div class="al-card al-action-card">
            <div class="al-action-icon">💾</div>
            <div class="al-action-content">
              <h3 class="al-heading-4">Export All Data</h3>
              <p class="al-body-sm">Download a backup of all your curriculums and progress. Keep this file safe to restore your learning data later.</p>
              <button @click="exportData" class="al-btn al-btn-primary" :disabled="isExporting">
                <svg v-if="!isExporting" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                <span v-if="isExporting" class="al-spinner-sm"></span>
                {{ isExporting ? 'Exporting...' : 'Export Backup' }}
              </button>
            </div>
          </div>

          <!-- Import Data -->
          <div class="al-card al-action-card">
            <div class="al-action-icon">📥</div>
            <div class="al-action-content">
              <h3 class="al-heading-4">Import Data</h3>
              <p class="al-body-sm">Restore your learning data from a backup file. This will merge with existing data by default.</p>
              <input 
                type="file" 
                accept=".json" 
                @change="handleImportFile"
                id="import-file"
                class="al-file-input"
              >
              <label for="import-file" class="al-btn al-btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                Choose Backup File
              </label>
            </div>
          </div>

          <!-- Clear All Data -->
          <div class="al-card al-action-card al-danger-card">
            <div class="al-action-icon">🗑️</div>
            <div class="al-action-content">
              <h3 class="al-heading-4">Clear All Data</h3>
              <p class="al-body-sm">Permanently delete all curriculums, progress, and settings. This action cannot be undone!</p>
              <button @click="showClearConfirm = true" class="al-btn al-btn-secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
                Clear Everything
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Curriculum Management -->
      <section class="al-section" v-if="curriculums.length > 0">
        <h2 class="al-heading-3">Manage Curriculums</h2>
        <div class="al-curriculum-list">
          <div 
            v-for="curriculum in curriculums" 
            :key="curriculum.id"
            class="al-card al-curriculum-item"
          >
            <div class="al-curriculum-info">
              <span class="al-curriculum-flag">{{ getLanguageFlag(curriculum.meta.targetLanguageCode) }}</span>
              <div>
                <h4 class="al-body">{{ curriculum.meta.title }}</h4>
                <span class="al-caption">{{ curriculum.modules.length }} modules</span>
              </div>
            </div>
            <button 
              @click="confirmDelete(curriculum.id, curriculum.meta.title)" 
              class="al-btn al-btn-ghost al-btn-sm al-delete-btn"
              title="Delete curriculum"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      <!-- About -->
      <section class="al-section">
        <h2 class="al-heading-3">About AstraLearn</h2>
        <div class="al-card al-about-card">
          <p class="al-body">
            AstraLearn is a free, offline-first language learning platform. All your data is stored locally in your browser using IndexedDB. No server, no tracking, no accounts required.
          </p>
          <div class="al-about-features">
            <div class="al-about-feature">
              <span class="al-feature-icon">🔒</span>
              <span>Privacy First - Your data never leaves your device</span>
            </div>
            <div class="al-about-feature">
              <span class="al-feature-icon">📴</span>
              <span>Offline Support - Learn without internet</span>
            </div>
            <div class="al-about-feature">
              <span class="al-feature-icon">🎯</span>
              <span>Self-Paced - Learn at your own speed</span>
            </div>
            <div class="al-about-feature">
              <span class="al-feature-icon">💾</span>
              <span>Portable - Export and import your data anytime</span>
            </div>
          </div>
          <p class="al-caption" style="margin-top: var(--al-space-4);">
            Version 1.0.0 | Built by <a href="/" class="al-link">Mayuresh Mule</a>
          </p>
        </div>
      </section>
    </div>

    <!-- Import Confirmation Modal -->
    <div v-if="showImportConfirm" class="al-modal-backdrop" @click.self="cancelImport">
      <div class="al-modal al-animate-scale-in">
        <div class="al-modal-header">
          <h2 class="al-heading-3">Import Data</h2>
          <button @click="cancelImport" class="al-btn al-btn-ghost al-btn-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        
        <div class="al-modal-body">
          <p class="al-body">Found {{ importContent?.curriculums.length || 0 }} curriculum(s) in the backup file.</p>
          
          <div class="al-import-options">
            <label class="al-radio-label">
              <input type="radio" v-model="importMode" value="merge" name="import-mode">
              <span>
                <strong>Merge</strong>
                <span class="al-caption">Keep existing data and add new items (recommended)</span>
              </span>
            </label>
            <label class="al-radio-label">
              <input type="radio" v-model="importMode" value="overwrite" name="import-mode">
              <span>
                <strong>Overwrite</strong>
                <span class="al-caption">Replace conflicting items with imported data</span>
              </span>
            </label>
          </div>

          <div v-if="importResult" class="al-import-result">
            <p><strong>✓ Import Complete</strong></p>
            <p class="al-caption">Imported: {{ importResult.imported }} | Skipped: {{ importResult.skipped }}</p>
            <div v-if="importResult.errors.length > 0" class="al-import-errors">
              <p class="al-caption al-text-error">Errors:</p>
              <p v-for="(error, i) in importResult.errors" :key="i" class="al-caption">{{ error }}</p>
            </div>
          </div>
        </div>

        <div class="al-modal-footer">
          <button @click="cancelImport" class="al-btn al-btn-secondary">Cancel</button>
          <button 
            @click="confirmImport" 
            class="al-btn al-btn-primary"
            :disabled="isImporting || !!importResult"
          >
            <span v-if="isImporting" class="al-spinner-sm"></span>
            {{ isImporting ? 'Importing...' : importResult ? 'Done' : 'Import' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="deleteTarget" class="al-modal-backdrop" @click.self="deleteTarget = null">
      <div class="al-modal al-animate-scale-in">
        <div class="al-modal-header">
          <h2 class="al-heading-3">Delete Curriculum</h2>
          <button @click="deleteTarget = null" class="al-btn al-btn-ghost al-btn-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        
        <div class="al-modal-body">
          <p class="al-body">Are you sure you want to delete <strong>{{ deleteTarget.name }}</strong>?</p>
          <p class="al-body-sm al-text-error">This will permanently delete the curriculum and all your progress. This action cannot be undone.</p>
        </div>

        <div class="al-modal-footer">
          <button @click="deleteTarget = null" class="al-btn al-btn-secondary">Cancel</button>
          <button @click="confirmDeleteCurriculum" class="al-btn al-btn-primary">Delete</button>
        </div>
      </div>
    </div>

    <!-- Clear All Confirmation Modal -->
    <div v-if="showClearConfirm" class="al-modal-backdrop" @click.self="showClearConfirm = false">
      <div class="al-modal al-animate-scale-in">
        <div class="al-modal-header">
          <h2 class="al-heading-3">Clear All Data</h2>
          <button @click="showClearConfirm = false" class="al-btn al-btn-ghost al-btn-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        
        <div class="al-modal-body">
          <div class="al-warning-box">
            <span class="al-warning-icon">⚠️</span>
            <p class="al-body"><strong>Warning:</strong> This will permanently delete ALL curriculums, progress, and settings.</p>
          </div>
          <p class="al-body-sm">Type <strong>DELETE</strong> to confirm:</p>
          <input 
            v-model="clearConfirmText" 
            type="text" 
            class="al-input"
            placeholder="Type DELETE"
            @keyup.enter="confirmClearAll"
          >
        </div>

        <div class="al-modal-footer">
          <button @click="showClearConfirm = false" class="al-btn al-btn-secondary">Cancel</button>
          <button 
            @click="confirmClearAll" 
            class="al-btn al-btn-primary"
            :disabled="clearConfirmText !== 'DELETE'"
          >
            Clear Everything
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { Curriculum, AstraLearnExport } from '../../types/astralearn';
import { 
  getAllCurriculums, 
  deleteCurriculum, 
  exportAllData, 
  importData,
  clearAllData,
  getStorageEstimate 
} from '../../lib/astralearn/db';
import { clearAllLocalStorage } from '../../lib/astralearn/storage';

// State
const isDark = ref(false);
const curriculums = ref<Curriculum[]>([]);
const storageUsed = ref(0);
const storageAvailable = ref(0);

// API Key State
const geminiApiKey = ref('');
const apiKeySaved = ref(false);

// Export/Import state
const isExporting = ref(false);
const isImporting = ref(false);
const showImportConfirm = ref(false);
const importContent = ref<AstraLearnExport | null>(null);
const importMode = ref<'merge' | 'overwrite'>('merge');
const importResult = ref<{ imported: number; skipped: number; errors: string[] } | null>(null);

// Delete state
const deleteTarget = ref<{ id: string; name: string } | null>(null);

// Clear state
const showClearConfirm = ref(false);
const clearConfirmText = ref('');

// Language flags
const languageFlags: Record<string, string> = {
  en: '🇬🇧', es: '🇪🇸', fr: '🇫🇷', de: '🇩🇪', it: '🇮🇹',
  pt: '🇵🇹', ja: '🇯🇵', ko: '🇰🇷', zh: '🇨🇳', ru: '🇷🇺',
  ar: '🇸🇦', hi: '🇮🇳', nl: '🇳🇱', sv: '🇸🇪', no: '🇳🇴',
};

// Computed
const curriculumCount = computed(() => curriculums.value.length);

const storagePercentage = computed(() => {
  if (storageAvailable.value === 0) return 0;
  return Math.round((storageUsed.value / storageAvailable.value) * 100);
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

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function saveApiKey() {
  localStorage.setItem('astralearn_gemini_key', geminiApiKey.value);
  apiKeySaved.value = true;
  setTimeout(() => apiKeySaved.value = false, 2000);
}

async function exportData() {
  isExporting.value = true;
  try {
    const data = await exportAllData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `astralearn-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to export data:', error);
    alert('Failed to export data. Please try again.');
  } finally {
    isExporting.value = false;
  }
}

async function handleImportFile(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  try {
    const text = await file.text();
    const data = JSON.parse(text);
    
    // Basic validation
    if (!data.curriculums || !Array.isArray(data.curriculums)) {
      alert('Invalid backup file format.');
      return;
    }

    importContent.value = data;
    showImportConfirm.value = true;
  } catch (error) {
    console.error('Failed to read import file:', error);
    alert('Failed to read backup file. Make sure it\'s a valid JSON file.');
  }
  
  // Reset input
  input.value = '';
}

async function confirmImport() {
  if (!importContent.value) return;

  isImporting.value = true;
  try {
    const result = await importData({
      ...importContent.value,
      version: importContent.value.version || '1.0.0',
      exportedAt: importContent.value.exportedAt || new Date().toISOString()
    }, {
      merge: importMode.value === 'merge',
      overwrite: importMode.value === 'overwrite'
    });
    
    importResult.value = result;
    
    // Reload curriculums
    curriculums.value = await getAllCurriculums();
  } catch (error) {
    console.error('Failed to import data:', error);
    alert('Failed to import data. Please try again.');
  } finally {
    isImporting.value = false;
  }
}

function cancelImport() {
  showImportConfirm.value = false;
  importContent.value = null;
  importResult.value = null;
  importMode.value = 'merge';
}

function confirmDelete(id: string, name: string) {
  deleteTarget.value = { id, name };
}

async function confirmDeleteCurriculum() {
  if (!deleteTarget.value) return;

  try {
    await deleteCurriculum(deleteTarget.value.id);
    curriculums.value = await getAllCurriculums();
    deleteTarget.value = null;
  } catch (error) {
    console.error('Failed to delete curriculum:', error);
    alert('Failed to delete curriculum. Please try again.');
  }
}

async function confirmClearAll() {
  if (clearConfirmText.value !== 'DELETE') return;

  try {
    await clearAllData();
    clearAllLocalStorage();
    window.location.href = '/astralearn';
  } catch (error) {
    console.error('Failed to clear data:', error);
    alert('Failed to clear data. Please try again.');
  }
}

async function loadStorageInfo() {
  const estimate = await getStorageEstimate();
  storageUsed.value = estimate.used;
  storageAvailable.value = estimate.available;
}

// Lifecycle
onMounted(async () => {
  isDark.value = document.documentElement.classList.contains('dark');
  geminiApiKey.value = localStorage.getItem('astralearn_gemini_key') || '';

  try {
    curriculums.value = await getAllCurriculums();
    await loadStorageInfo();
  } catch (error) {
    console.error('Failed to load settings:', error);
  }
});
</script>

<style scoped>
.al-settings {
  min-height: 100vh;
}

/* Header */
.al-header {
  position: sticky;
  top: 0;
  z-index: var(--al-z-sticky);
  background: var(--al-bg-primary);
  border-bottom: 1px solid var(--al-border-light);
}

.al-header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 900px;
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

/* Main */
.al-main {
  max-width: 900px;
  margin: 0 auto;
  padding: var(--al-space-6) var(--al-space-4);
}

.al-section {
  margin-bottom: var(--al-space-8);
}

/* Storage Card */
.al-storage-card {
  background: var(--al-bg-card);
  border: 1px solid var(--al-border-light);
  border-radius: var(--al-radius-xl);
  padding: var(--al-space-6);
}

.al-storage-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: var(--al-space-4);
  margin-bottom: var(--al-space-4);
}

.al-stat-item {
  text-align: center;
}

.al-stat-label {
  display: block;
  font-size: var(--al-font-size-sm);
  color: var(--al-text-tertiary);
  margin-bottom: var(--al-space-1);
}

.al-stat-value {
  display: block;
  font-size: var(--al-font-size-2xl);
  font-weight: var(--al-font-weight-bold);
  color: var(--al-text-primary);
}

.al-storage-bar {
  height: 8px;
  background: var(--al-bg-tertiary);
  border-radius: var(--al-radius-full);
  overflow: hidden;
  margin-bottom: var(--al-space-2);
}

.al-storage-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--al-primary-400), var(--al-primary-500));
  transition: width var(--al-transition-slow);
}

/* Data Actions */
.al-data-actions {
  display: flex;
  flex-direction: column;
  gap: var(--al-space-4);
}

.al-action-card {
  display: flex;
  gap: var(--al-space-4);
  align-items: flex-start;
}

.al-action-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.al-action-content {
  flex: 1;
}

.al-action-content h3 {
  margin-bottom: var(--al-space-2);
}

.al-action-content p {
  margin-bottom: var(--al-space-3);
}

.al-danger-card {
  border-color: var(--al-error-200);
  background: var(--al-error-50);
}

.dark .al-danger-card {
  background: rgb(239 68 68 / 0.05);
  border-color: rgb(239 68 68 / 0.2);
}

.al-file-input {
  display: none;
}

.al-spinner-sm {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Curriculum List */
.al-curriculum-list {
  display: flex;
  flex-direction: column;
  gap: var(--al-space-3);
}

.al-curriculum-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--al-space-4);
}

.al-curriculum-info {
  display: flex;
  align-items: center;
  gap: var(--al-space-3);
}

.al-curriculum-flag {
  font-size: 1.5rem;
}

.al-delete-btn {
  color: var(--al-error-500);
}

.al-delete-btn:hover {
  background: var(--al-error-50);
}

/* About Card */
.al-about-card {
  background: linear-gradient(135deg, var(--al-primary-50), var(--al-bg-card));
  border-color: var(--al-primary-200);
}

.dark .al-about-card {
  background: linear-gradient(135deg, rgb(20 184 166 / 0.1), var(--al-bg-card));
  border-color: var(--al-primary-800);
}

.al-about-features {
  display: grid;
  gap: var(--al-space-3);
  margin: var(--al-space-4) 0;
}

.al-about-feature {
  display: flex;
  align-items: center;
  gap: var(--al-space-2);
  font-size: var(--al-font-size-sm);
}

.al-link {
  color: var(--al-primary-600);
  text-decoration: none;
}

.al-link:hover {
  text-decoration: underline;
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

/* Import Options */
.al-import-options {
  display: flex;
  flex-direction: column;
  gap: var(--al-space-3);
  margin: var(--al-space-4) 0;
}

.al-radio-label {
  display: flex;
  gap: var(--al-space-3);
  padding: var(--al-space-3);
  border: 1px solid var(--al-border-light);
  border-radius: var(--al-radius-md);
  cursor: pointer;
  transition: all var(--al-transition-fast);
}

.al-radio-label:hover {
  border-color: var(--al-primary-300);
}

.al-radio-label input[type="radio"] {
  margin-top: 2px;
}

.al-radio-label span {
  display: flex;
  flex-direction: column;
  gap: var(--al-space-1);
}

.al-import-result {
  margin-top: var(--al-space-4);
  padding: var(--al-space-4);
  background: var(--al-success-50);
  border-radius: var(--al-radius-md);
}

.al-import-errors {
  margin-top: var(--al-space-2);
  padding: var(--al-space-3);
  background: var(--al-error-50);
  border-radius: var(--al-radius-sm);
}

/* Warning Box */
.al-warning-box {
  display: flex;
  gap: var(--al-space-3);
  padding: var(--al-space-4);
  background: var(--al-warning-50);
  border: 1px solid var(--al-warning-500);
  border-radius: var(--al-radius-md);
  margin-bottom: var(--al-space-4);
}

.al-warning-icon {
  font-size: 1.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .al-storage-stats {
    grid-template-columns: 1fr;
  }

  .al-action-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>
