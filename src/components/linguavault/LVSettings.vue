<template>
  <div class="lv-settings">
    <!-- Header -->
    <header class="lv-header">
      <div class="lv-header-content">
        <a href="/linguavault" class="lv-back-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>Dashboard</span>
        </a>
        
        <h1 class="lv-heading-4">Settings</h1>

        <button @click="toggleTheme" class="lv-btn lv-btn-ghost lv-btn-icon" title="Toggle theme">
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
    <div class="lv-main">
      <!-- Storage Info -->
      <section class="lv-section">
        <h2 class="lv-heading-3">Storage Information</h2>
        <div class="lv-storage-card">
          <div class="lv-storage-stats">
            <div class="lv-stat-item">
              <span class="lv-stat-label">Curriculums</span>
              <span class="lv-stat-value">{{ curriculumCount }}</span>
            </div>
            <div class="lv-stat-item">
              <span class="lv-stat-label">Storage Used</span>
              <span class="lv-stat-value">{{ formatBytes(storageUsed) }}</span>
            </div>
            <div class="lv-stat-item">
              <span class="lv-stat-label">Available</span>
              <span class="lv-stat-value">{{ formatBytes(storageAvailable) }}</span>
            </div>
          </div>
          <div class="lv-storage-bar">
            <div class="lv-storage-fill" :style="{ width: storagePercentage + '%' }"></div>
          </div>
          <span class="lv-caption">{{ storagePercentage }}% used</span>
        </div>
      </section>

      <!-- Data Management -->
      <section class="lv-section">
        <h2 class="lv-heading-3">Data Management</h2>
        
        <div class="lv-data-actions">
          <!-- Export Data -->
          <div class="lv-card lv-action-card">
            <div class="lv-action-icon">💾</div>
            <div class="lv-action-content">
              <h3 class="lv-heading-4">Export All Data</h3>
              <p class="lv-body-sm">Download a backup of all your curriculums and progress. Keep this file safe to restore your learning data later.</p>
              <button @click="exportData" class="lv-btn lv-btn-primary" :disabled="isExporting">
                <svg v-if="!isExporting" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                <span v-if="isExporting" class="lv-spinner-sm"></span>
                {{ isExporting ? 'Exporting...' : 'Export Backup' }}
              </button>
            </div>
          </div>

          <!-- Import Data -->
          <div class="lv-card lv-action-card">
            <div class="lv-action-icon">📥</div>
            <div class="lv-action-content">
              <h3 class="lv-heading-4">Import Data</h3>
              <p class="lv-body-sm">Restore your learning data from a backup file. This will merge with existing data by default.</p>
              <input 
                type="file" 
                accept=".json" 
                @change="handleImportFile"
                id="import-file"
                class="lv-file-input"
              >
              <label for="import-file" class="lv-btn lv-btn-primary">
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
          <div class="lv-card lv-action-card lv-danger-card">
            <div class="lv-action-icon">🗑️</div>
            <div class="lv-action-content">
              <h3 class="lv-heading-4">Clear All Data</h3>
              <p class="lv-body-sm">Permanently delete all curriculums, progress, and settings. This action cannot be undone!</p>
              <button @click="showClearConfirm = true" class="lv-btn lv-btn-secondary">
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
      <section class="lv-section" v-if="curriculums.length > 0">
        <h2 class="lv-heading-3">Manage Curriculums</h2>
        <div class="lv-curriculum-list">
          <div 
            v-for="curriculum in curriculums" 
            :key="curriculum.id"
            class="lv-card lv-curriculum-item"
          >
            <div class="lv-curriculum-info">
              <span class="lv-curriculum-flag">{{ getLanguageFlag(curriculum.meta.targetLanguageCode) }}</span>
              <div>
                <h4 class="lv-body">{{ curriculum.meta.title }}</h4>
                <span class="lv-caption">{{ curriculum.modules.length }} modules</span>
              </div>
            </div>
            <button 
              @click="confirmDelete(curriculum.id, curriculum.meta.title)" 
              class="lv-btn lv-btn-ghost lv-btn-sm lv-delete-btn"
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
      <section class="lv-section">
        <h2 class="lv-heading-3">About LinguaVault</h2>
        <div class="lv-card lv-about-card">
          <p class="lv-body">
            LinguaVault is a free, offline-first language learning platform. All your data is stored locally in your browser using IndexedDB. No server, no tracking, no accounts required.
          </p>
          <div class="lv-about-features">
            <div class="lv-about-feature">
              <span class="lv-feature-icon">🔒</span>
              <span>Privacy First - Your data never leaves your device</span>
            </div>
            <div class="lv-about-feature">
              <span class="lv-feature-icon">📴</span>
              <span>Offline Support - Learn without internet</span>
            </div>
            <div class="lv-about-feature">
              <span class="lv-feature-icon">🎯</span>
              <span>Self-Paced - Learn at your own speed</span>
            </div>
            <div class="lv-about-feature">
              <span class="lv-feature-icon">💾</span>
              <span>Portable - Export and import your data anytime</span>
            </div>
          </div>
          <p class="lv-caption" style="margin-top: var(--lv-space-4);">
            Version 1.0.0 | Built by <a href="/" class="lv-link">Mayuresh Mule</a>
          </p>
        </div>
      </section>
    </div>

    <!-- Import Confirmation Modal -->
    <div v-if="showImportConfirm" class="lv-modal-backdrop" @click.self="cancelImport">
      <div class="lv-modal lv-animate-scale-in">
        <div class="lv-modal-header">
          <h2 class="lv-heading-3">Import Data</h2>
          <button @click="cancelImport" class="lv-btn lv-btn-ghost lv-btn-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        
        <div class="lv-modal-body">
          <p class="lv-body">Found {{ importContent?.curriculums.length || 0 }} curriculum(s) in the backup file.</p>
          
          <div class="lv-import-options">
            <label class="lv-radio-label">
              <input type="radio" v-model="importMode" value="merge" name="import-mode">
              <span>
                <strong>Merge</strong>
                <span class="lv-caption">Keep existing data and add new items (recommended)</span>
              </span>
            </label>
            <label class="lv-radio-label">
              <input type="radio" v-model="importMode" value="overwrite" name="import-mode">
              <span>
                <strong>Overwrite</strong>
                <span class="lv-caption">Replace conflicting items with imported data</span>
              </span>
            </label>
          </div>

          <div v-if="importResult" class="lv-import-result">
            <p><strong>✓ Import Complete</strong></p>
            <p class="lv-caption">Imported: {{ importResult.imported }} | Skipped: {{ importResult.skipped }}</p>
            <div v-if="importResult.errors.length > 0" class="lv-import-errors">
              <p class="lv-caption lv-text-error">Errors:</p>
              <p v-for="(error, i) in importResult.errors" :key="i" class="lv-caption">{{ error }}</p>
            </div>
          </div>
        </div>

        <div class="lv-modal-footer">
          <button @click="cancelImport" class="lv-btn lv-btn-secondary">Cancel</button>
          <button 
            @click="confirmImport" 
            class="lv-btn lv-btn-primary"
            :disabled="isImporting || !!importResult"
          >
            <span v-if="isImporting" class="lv-spinner-sm"></span>
            {{ isImporting ? 'Importing...' : importResult ? 'Done' : 'Import' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="deleteTarget" class="lv-modal-backdrop" @click.self="deleteTarget = null">
      <div class="lv-modal lv-animate-scale-in">
        <div class="lv-modal-header">
          <h2 class="lv-heading-3">Delete Curriculum</h2>
          <button @click="deleteTarget = null" class="lv-btn lv-btn-ghost lv-btn-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        
        <div class="lv-modal-body">
          <p class="lv-body">Are you sure you want to delete <strong>{{ deleteTarget.name }}</strong>?</p>
          <p class="lv-body-sm lv-text-error">This will permanently delete the curriculum and all your progress. This action cannot be undone.</p>
        </div>

        <div class="lv-modal-footer">
          <button @click="deleteTarget = null" class="lv-btn lv-btn-secondary">Cancel</button>
          <button @click="confirmDeleteCurriculum" class="lv-btn lv-btn-primary">Delete</button>
        </div>
      </div>
    </div>

    <!-- Clear All Confirmation Modal -->
    <div v-if="showClearConfirm" class="lv-modal-backdrop" @click.self="showClearConfirm = false">
      <div class="lv-modal lv-animate-scale-in">
        <div class="lv-modal-header">
          <h2 class="lv-heading-3">Clear All Data</h2>
          <button @click="showClearConfirm = false" class="lv-btn lv-btn-ghost lv-btn-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        
        <div class="lv-modal-body">
          <div class="lv-warning-box">
            <span class="lv-warning-icon">⚠️</span>
            <p class="lv-body"><strong>Warning:</strong> This will permanently delete ALL curriculums, progress, and settings.</p>
          </div>
          <p class="lv-body-sm">Type <strong>DELETE</strong> to confirm:</p>
          <input 
            v-model="clearConfirmText" 
            type="text" 
            class="lv-input"
            placeholder="Type DELETE"
            @keyup.enter="confirmClearAll"
          >
        </div>

        <div class="lv-modal-footer">
          <button @click="showClearConfirm = false" class="lv-btn lv-btn-secondary">Cancel</button>
          <button 
            @click="confirmClearAll" 
            class="lv-btn lv-btn-primary"
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
import type { Curriculum, LinguaVaultExport } from '../../types/linguavault';
import { 
  getAllCurriculums, 
  deleteCurriculum, 
  exportAllData, 
  importData,
  clearAllData,
  getStorageEstimate 
} from '../../lib/linguavault/db';
import { clearAllLocalStorage } from '../../lib/linguavault/storage';

// State
const isDark = ref(false);
const curriculums = ref<Curriculum[]>([]);
const storageUsed = ref(0);
const storageAvailable = ref(0);

// Export/Import state
const isExporting = ref(false);
const isImporting = ref(false);
const showImportConfirm = ref(false);
const importContent = ref<LinguaVaultExport | null>(null);
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

async function exportData() {
  isExporting.value = true;
  try {
    const data = await exportAllData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `linguavault-backup-${new Date().toISOString().split('T')[0]}.json`;
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
    window.location.href = '/linguavault';
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

  try {
    curriculums.value = await getAllCurriculums();
    await loadStorageInfo();
  } catch (error) {
    console.error('Failed to load settings:', error);
  }
});
</script>

<style scoped>
.lv-settings {
  min-height: 100vh;
}

/* Header */
.lv-header {
  position: sticky;
  top: 0;
  z-index: var(--lv-z-sticky);
  background: var(--lv-bg-primary);
  border-bottom: 1px solid var(--lv-border-light);
}

.lv-header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 900px;
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

/* Main */
.lv-main {
  max-width: 900px;
  margin: 0 auto;
  padding: var(--lv-space-6) var(--lv-space-4);
}

.lv-section {
  margin-bottom: var(--lv-space-8);
}

/* Storage Card */
.lv-storage-card {
  background: var(--lv-bg-card);
  border: 1px solid var(--lv-border-light);
  border-radius: var(--lv-radius-xl);
  padding: var(--lv-space-6);
}

.lv-storage-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: var(--lv-space-4);
  margin-bottom: var(--lv-space-4);
}

.lv-stat-item {
  text-align: center;
}

.lv-stat-label {
  display: block;
  font-size: var(--lv-font-size-sm);
  color: var(--lv-text-tertiary);
  margin-bottom: var(--lv-space-1);
}

.lv-stat-value {
  display: block;
  font-size: var(--lv-font-size-2xl);
  font-weight: var(--lv-font-weight-bold);
  color: var(--lv-text-primary);
}

.lv-storage-bar {
  height: 8px;
  background: var(--lv-bg-tertiary);
  border-radius: var(--lv-radius-full);
  overflow: hidden;
  margin-bottom: var(--lv-space-2);
}

.lv-storage-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--lv-primary-400), var(--lv-primary-500));
  transition: width var(--lv-transition-slow);
}

/* Data Actions */
.lv-data-actions {
  display: flex;
  flex-direction: column;
  gap: var(--lv-space-4);
}

.lv-action-card {
  display: flex;
  gap: var(--lv-space-4);
  align-items: flex-start;
}

.lv-action-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.lv-action-content {
  flex: 1;
}

.lv-action-content h3 {
  margin-bottom: var(--lv-space-2);
}

.lv-action-content p {
  margin-bottom: var(--lv-space-3);
}

.lv-danger-card {
  border-color: var(--lv-error-200);
  background: var(--lv-error-50);
}

.dark .lv-danger-card {
  background: rgb(239 68 68 / 0.05);
  border-color: rgb(239 68 68 / 0.2);
}

.lv-file-input {
  display: none;
}

.lv-spinner-sm {
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
.lv-curriculum-list {
  display: flex;
  flex-direction: column;
  gap: var(--lv-space-3);
}

.lv-curriculum-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--lv-space-4);
}

.lv-curriculum-info {
  display: flex;
  align-items: center;
  gap: var(--lv-space-3);
}

.lv-curriculum-flag {
  font-size: 1.5rem;
}

.lv-delete-btn {
  color: var(--lv-error-500);
}

.lv-delete-btn:hover {
  background: var(--lv-error-50);
}

/* About Card */
.lv-about-card {
  background: linear-gradient(135deg, var(--lv-primary-50), var(--lv-bg-card));
  border-color: var(--lv-primary-200);
}

.dark .lv-about-card {
  background: linear-gradient(135deg, rgb(20 184 166 / 0.1), var(--lv-bg-card));
  border-color: var(--lv-primary-800);
}

.lv-about-features {
  display: grid;
  gap: var(--lv-space-3);
  margin: var(--lv-space-4) 0;
}

.lv-about-feature {
  display: flex;
  align-items: center;
  gap: var(--lv-space-2);
  font-size: var(--lv-font-size-sm);
}

.lv-link {
  color: var(--lv-primary-600);
  text-decoration: none;
}

.lv-link:hover {
  text-decoration: underline;
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

/* Import Options */
.lv-import-options {
  display: flex;
  flex-direction: column;
  gap: var(--lv-space-3);
  margin: var(--lv-space-4) 0;
}

.lv-radio-label {
  display: flex;
  gap: var(--lv-space-3);
  padding: var(--lv-space-3);
  border: 1px solid var(--lv-border-light);
  border-radius: var(--lv-radius-md);
  cursor: pointer;
  transition: all var(--lv-transition-fast);
}

.lv-radio-label:hover {
  border-color: var(--lv-primary-300);
}

.lv-radio-label input[type="radio"] {
  margin-top: 2px;
}

.lv-radio-label span {
  display: flex;
  flex-direction: column;
  gap: var(--lv-space-1);
}

.lv-import-result {
  margin-top: var(--lv-space-4);
  padding: var(--lv-space-4);
  background: var(--lv-success-50);
  border-radius: var(--lv-radius-md);
}

.lv-import-errors {
  margin-top: var(--lv-space-2);
  padding: var(--lv-space-3);
  background: var(--lv-error-50);
  border-radius: var(--lv-radius-sm);
}

/* Warning Box */
.lv-warning-box {
  display: flex;
  gap: var(--lv-space-3);
  padding: var(--lv-space-4);
  background: var(--lv-warning-50);
  border: 1px solid var(--lv-warning-500);
  border-radius: var(--lv-radius-md);
  margin-bottom: var(--lv-space-4);
}

.lv-warning-icon {
  font-size: 1.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .lv-storage-stats {
    grid-template-columns: 1fr;
  }

  .lv-action-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>
