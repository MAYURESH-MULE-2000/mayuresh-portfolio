<template>
  <div class="al-wizard-container">
    <div class="al-wizard-header">
      <div class="al-header-stack">
        <button @click="$emit('close')" class="al-btn al-btn-ghost al-back-btn" :disabled="isGenerating">
          <ArrowLeft class="al-icon-sm" />
          <span>Back to Dashboard</span>
        </button>
        <h2 class="al-heading-3">Create New Curriculum</h2>
      </div>
    </div>

    <div class="al-wizard-content">
      <!-- Step 1: Form with Split Layout -->
      <div v-if="step === 1" class="al-wizard-step al-wizard-split al-animate-fade">
        <!-- Left: Guidance -->
        <div class="al-wizard-left">
          <div class="al-wizard-icon-large">
            <Sparkles class="al-icon-xxl" />
          </div>
          <h3 class="al-heading-3" style="color: var(--al-primary-600); margin-bottom: var(--al-space-4);">AI-Powered Path</h3>
          <p class="al-body" style="color: var(--al-text-secondary); line-height: 1.6; margin-bottom: var(--al-space-8);">
            Tell us about your learning goals and AstraLearn will instantly generate a 100% personalized curriculum right in your browser.
          </p>

          <div class="al-wizard-features">
            <div class="al-wizard-feature">
              <div class="al-feature-icon" style="color: var(--al-primary-600);">
                <Check class="al-icon-md" />
              </div>
              <div>
                <strong class="al-block" style="color: var(--al-text-primary); font-weight: var(--al-font-weight-semibold);">Tailored Content</strong>
                <span class="al-caption" style="color: var(--al-text-secondary);">Curriculum designed for your level and goals</span>
              </div>
            </div>
            <div class="al-wizard-feature">
              <div class="al-feature-icon" style="color: var(--al-primary-600);">
                <Check class="al-icon-md" />
              </div>
              <div>
                <strong class="al-block" style="color: var(--al-text-primary); font-weight: var(--al-font-weight-semibold);">Automated Exercises</strong>
                <span class="al-caption" style="color: var(--al-text-secondary);">Instant practice tests to validate your knowledge</span>
              </div>
            </div>
            <div class="al-wizard-feature">
              <div class="al-feature-icon" style="color: var(--al-primary-600);">
                <Check class="al-icon-md" />
              </div>
              <div>
                <strong class="al-block" style="color: var(--al-text-primary); font-weight: var(--al-font-weight-semibold);">Offline Ready</strong>
                <span class="al-caption" style="color: var(--al-text-secondary);">Your generated course is saved to your browser</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Form -->
        <div class="al-wizard-right">
          <form @submit.prevent="generatePath" class="al-wizard-form">
            <div class="al-form-group">
              <label>I want to learn</label>
              <input v-model="form.targetLanguage" type="text" placeholder="e.g. German" required class="al-input">
            </div>

            <div class="al-form-group">
              <label>My native language is</label>
              <input v-model="form.nativeLanguage" type="text" placeholder="e.g. English" required class="al-input">
            </div>

            <div class="al-form-row">
              <div class="al-form-group">
                <label>Current Level</label>
                <select v-model="form.level" class="al-select" required>
                  <option value="beginner">Beginner</option>
                  <option value="elementary">Elementary</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div class="al-form-group">
                <label>Time Commitment</label>
                <select v-model="form.time" class="al-select" required>
                  <option value="15 minutes per day">15 min/day</option>
                  <option value="30 minutes per day">30 min/day</option>
                  <option value="1 hour per day">1 hour/day</option>
                  <option value="Unrestricted">Unrestricted</option>
                </select>
              </div>
            </div>

            <div class="al-form-group">
              <label>Learning Goal</label>
              <select v-model="form.goal" required class="al-select">
                <option value="">Select your goal...</option>
                <option value="Travel">Travel</option>
                <option value="Business communication">Business communication</option>
                <option value="Academic studies">Academic studies</option>
                <option value="Read literature">Read literature</option>
                <option value="Watch movies/TV">Watch movies/TV</option>
                <option value="Career advancement">Career advancement</option>
                <option value="Personal enrichment">Personal enrichment</option>
              </select>
            </div>
            
            <div class="al-form-group">
              <label>Additional Context (Optional)</label>
              <textarea v-model="form.additionalContext" placeholder="e.g. Focus heavy on grammar, I love sci-fi contexts, etc." class="al-input" rows="2"></textarea>
            </div>

            <div v-if="errorMessage" class="al-alert al-alert-error al-mb-4">
               {{ errorMessage }}
            </div>

            <div class="al-form-actions">
              <button type="submit" class="al-btn al-btn-wizard-primary al-w-full" :disabled="isGenerating">
                <Sparkles class="al-icon-sm" />
                Generate Path
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Step 2: Generating State -->
      <div v-if="step === 2" class="al-wizard-step al-animate-fade">
        <div class="al-generating-container">
           <div class="al-generating-animation">
             <div class="al-pulse-circle"></div>
             <Sparkles class="al-generating-icon al-icon-xxl" />
           </div>
           <h3 class="al-heading-3 al-text-center al-mt-8">Consulting the Oracle...</h3>
           <p class="al-body al-text-center" style="color: var(--al-text-secondary); max-width: 400px; margin: 0 auto; margin-top: var(--al-space-4);">
             AstraLearn's AI is constructing your highly personalized curriculum modules, notes, and exercises. This usually takes about 10-15 seconds.
           </p>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue';
import { ArrowLeft, Sparkles, Check, ArrowRight, RefreshCw } from 'lucide-vue-next';
import { generateCurriculum } from '../../lib/astralearn/gemini';
import { saveCurriculum, initializeProgress } from '../../lib/astralearn/db';

const emit = defineEmits(['close', 'created']);

// State
const step = ref(1);
const isGenerating = ref(false);
const errorMessage = ref('');
const STORAGE_KEY = 'al_curriculum_form';

const form = reactive({
  targetLanguage: '',
  nativeLanguage: 'English',
  level: 'beginner',
  time: '15 minutes per day',
  goal: '',
  additionalContext: ''
});

// Load from storage
onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const parsed = JSON.parse(saved);
    Object.assign(form, parsed);
  }
});

// Save to storage
watch(form, (newVal) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal));
}, { deep: true });

async function generatePath() {
  step.value = 2;
  isGenerating.value = true;
  errorMessage.value = '';

  try {
    const { curriculum, error } = await generateCurriculum(form);
    
    if (error || !curriculum) {
      throw new Error(error || "Unknown error generating curriculum");
    }

    // Attempt to save to IndexedDB
    await saveCurriculum(curriculum);
    await initializeProgress(curriculum);

    // Provide the newly created ID back to parent
    emit('created', curriculum.id);
    emit('close');
  } catch (err: any) {
    console.error("Generator Error:", err);
    errorMessage.value = err.message || "An error occurred while generating. Please try again or check your API key.";
    step.value = 1; // Go back to form
  } finally {
    isGenerating.value = false;
  }
}
</script>

<style scoped>
.al-wizard-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--al-space-4) var(--al-space-2);
  animation: al-fade-in 0.3s ease-out;
}

.al-wizard-header {
  margin-bottom: var(--al-space-4);
}

.al-header-stack {
  display: flex;
  flex-direction: column;
  gap: var(--al-space-2);
}

.al-header-stack h2 {
  margin: 0;
  font-size: var(--al-font-size-xl);
}

.al-back-btn {
  display: flex;
  align-items: center;
  gap: var(--al-space-2);
  color: var(--al-text-secondary);
}

/* Form */
.al-wizard-content {
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0;
  box-shadow: none;
}

/* Split Layout for Step 1 */
.al-wizard-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--al-space-8);
  align-items: start;
}

.al-wizard-left {
  padding: 0;
}

.al-wizard-icon-large {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, var(--al-primary-50), var(--al-primary-100));
  border-radius: var(--al-radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--al-space-4);
  color: var(--al-primary-600);
}

.al-icon-xxl {
  width: 40px;
  height: 40px;
}

.al-wizard-features {
  display: flex;
  flex-direction: column;
  gap: var(--al-space-4);
}

.al-wizard-feature {
  display: flex;
  align-items: start;
  gap: var(--al-space-3);
}

.al-feature-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--al-primary-50);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.al-wizard-right {
  background: transparent;
  padding: var(--al-space-6);
  border-radius: var(--al-radius-xl);
  border: 1px solid var(--al-border-light);
  background: var(--al-bg-card);
  box-shadow: var(--al-shadow-lg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

@media (max-width: 768px) {
  .al-wizard-split {
    grid-template-columns: 1fr;
    gap: var(--al-space-6);
  }
  
  .al-wizard-left {
    text-align: center;
  }
  
  .al-wizard-icon-large {
    margin-left: auto;
    margin-right: auto;
  }
}

.al-form-group {
  margin-bottom: var(--al-space-4);
}

.al-form-group label {
  display: block;
  margin-bottom: var(--al-space-2);
  font-weight: var(--al-font-weight-medium);
  color: var(--al-text-secondary);
}

.al-input, .al-select {
  width: 100%;
  padding: var(--al-space-3);
  border: 1px solid var(--al-border-light);
  border-radius: var(--al-radius-md);
  background: var(--al-bg-input);
  color: var(--al-text-primary);
  transition: border-color 0.2s;
  font-family: var(--al-font-family);
  font-size: var(--al-font-size-base);
}

textarea.al-input {
  resize: vertical;
}

.al-input:focus, .al-select:focus {
  border-color: var(--al-primary-500);
  outline: none;
}

.al-form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--al-space-6);
}

.al-w-full {
  width: 100%;
  justify-content: center;
}

.al-mb-6 { margin-bottom: var(--al-space-6); }
.al-mb-4 { margin-bottom: var(--al-space-4); }
.al-mt-8 { margin-top: var(--al-space-8); }
.al-text-center { text-align: center; }

.al-form-actions {
  display: flex;
  gap: var(--al-space-4);
  justify-content: flex-end;
  margin-top: var(--al-space-6);
}

/* Enhanced Wizard Button */
.al-btn-wizard-primary {
  padding: var(--al-space-4) var(--al-space-6);
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
  gap: var(--al-space-2);
  border-radius: var(--al-radius-lg);
  cursor: pointer;
}

.al-btn-wizard-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(20, 184, 166, 0.6);
  background: linear-gradient(135deg, var(--al-primary-600), var(--al-primary-700));
}

.al-btn-wizard-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.al-alert {
  padding: var(--al-space-3) var(--al-space-4);
  border-radius: var(--al-radius-md);
  font-size: var(--al-font-size-sm);
}

.al-alert-error {
  background: var(--al-error-50);
  color: var(--al-error-600);
  border: 1px solid var(--al-error-100);
}

/* Generating Animation */
.al-generating-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--al-space-16) 0;
}

.al-generating-animation {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.al-pulse-circle {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--al-primary-100);
  animation: al-pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
}

.al-generating-icon {
  position: relative;
  z-index: 2;
  color: var(--al-primary-600);
  animation: al-float 3s ease-in-out infinite;
}

@keyframes al-fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes al-pulse-ring {
  0% { transform: scale(0.8); opacity: 0.8; }
  80%, 100% { transform: scale(1.5); opacity: 0; }
}

@keyframes al-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>
