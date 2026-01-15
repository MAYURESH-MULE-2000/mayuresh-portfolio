<template>
  <div class="lv-wizard-container">
    <div class="lv-wizard-header">
      <div class="lv-header-stack">
        <button @click="$emit('close')" class="lv-btn lv-btn-ghost lv-back-btn">
          <ArrowLeft class="lv-icon-sm" />
          <span>Back to Dashboard</span>
        </button>
        <h2 class="lv-heading-3">Create New Curriculum</h2>
      </div>
    </div>

    <div class="lv-wizard-content">
      <!-- Steps Indicator -->
      <div class="lv-steps">
        <div class="lv-step" :class="{ 'lv-step-active': step >= 1, 'lv-step-complete': step > 1 }">
          <div class="lv-step-circle">1</div>
          <span>Details</span>
        </div>
        <div class="lv-step-line" :class="{ 'lv-step-line-active': step > 1 }"></div>
        <div class="lv-step" :class="{ 'lv-step-active': step >= 2, 'lv-step-complete': step > 2 }">
          <div class="lv-step-circle">2</div>
          <span>Get Prompt</span>
        </div>
        <div class="lv-step-line" :class="{ 'lv-step-line-active': step > 2 }"></div>
        <div class="lv-step" :class="{ 'lv-step-active': step === 3 }">
          <div class="lv-step-circle">3</div>
          <span>Upload</span>
        </div>
      </div>

      <!-- Step 1: Form with Split Layout -->
      <div v-if="step === 1" class="lv-wizard-step lv-wizard-split lv-animate-fade">
        <!-- Left: Guidance -->
        <div class="lv-wizard-left">
          <div class="lv-wizard-icon-large">
            <Sparkles class="lv-icon-xxl" />
          </div>
          <h3 class="lv-heading-3" style="color: var(--lv-primary-600); margin-bottom: var(--lv-space-4);">AI-Powered Curriculum</h3>
          <p class="lv-body" style="color: var(--lv-text-secondary); line-height: 1.6; margin-bottom: var(--lv-space-8);">
            Tell us about your learning goals and we'll generate a personalized prompt for your AI assistant.
          </p>

          <div class="lv-wizard-features">
            <div class="lv-wizard-feature">
              <div class="lv-feature-icon" style="color: var(--lv-primary-600);">
                <Check class="lv-icon-md" />
              </div>
              <div>
                <strong class="lv-block" style="color: var(--lv-text-primary); font-weight: var(--lv-font-weight-semibold);">Tailored Content</strong>
                <span class="lv-caption" style="color: var(--lv-text-secondary);">Curriculum designed for your level and goals</span>
              </div>
            </div>
            <div class="lv-wizard-feature">
              <div class="lv-feature-icon" style="color: var(--lv-primary-600);">
                <Check class="lv-icon-md" />
              </div>
              <div>
                <strong class="lv-block" style="color: var(--lv-text-primary); font-weight: var(--lv-font-weight-semibold);">Flexible Pacing</strong>
                <span class="lv-caption" style="color: var(--lv-text-secondary);">Matches your time commitment</span>
              </div>
            </div>
            <div class="lv-wizard-feature">
              <div class="lv-feature-icon" style="color: var(--lv-primary-600);">
                <Check class="lv-icon-md" />
              </div>
              <div>
                <strong class="lv-block" style="color: var(--lv-text-primary); font-weight: var(--lv-font-weight-semibold);">Structured Learning</strong>
                <span class="lv-caption" style="color: var(--lv-text-secondary);">Progressive modules and lessons</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Form -->
        <div class="lv-wizard-right">
          <form @submit.prevent="generatePrompt" class="lv-wizard-form">
            <div class="lv-form-group">
              <label>I want to learn</label>
              <input v-model="form.targetLanguage" type="text" placeholder="e.g. German" required class="lv-input">
            </div>

            <div class="lv-form-group">
              <label>My native language is</label>
              <input v-model="form.nativeLanguage" type="text" placeholder="e.g. English" required class="lv-input">
            </div>

            <div class="lv-form-row">
              <div class="lv-form-group">
                <label>Current Level</label>
                <select v-model="form.level" class="lv-select">
                  <option value="beginner">Beginner</option>
                  <option value="elementary">Elementary</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div class="lv-form-group">
                <label>Time Commitment</label>
                <select v-model="form.time" class="lv-select">
                  <option value="15 minutes per day">15 min/day</option>
                  <option value="30 minutes per day">30 min/day</option>
                  <option value="1 hour per day">1 hour/day</option>
                  <option value="Unrestricted">Unrestricted</option>
                </select>
              </div>
            </div>

            <div class="lv-form-group">
              <label>Learning Goal</label>
              <select v-model="form.goal" required class="lv-select">
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

            <div class="lv-form-actions">
              <button type="submit" class="lv-btn lv-btn-wizard-primary lv-w-full">
                <Sparkles class="lv-icon-sm" />
                Generate Prompt
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Step 2: Prompt -->
      <div v-if="step === 2" class="lv-wizard-step lv-animate-fade">
        <h3 class="lv-heading-4">Generate your Curriculum</h3>
        <div class="lv-instruction-box">
          <img src="/ai-chat-icon.png" alt="AI" class="lv-ai-icon" v-if="false" /> <!-- Placeholder for illustration -->
          <div class="lv-instruction-text">
            <p><strong>1. Copy</strong> the prompt below.</p>
            <p><strong>2. Paste</strong> it into ChatGPT, Claude, or Gemini.</p>
            <p><strong>3. Save</strong> the response as a <code>.json</code> file.</p>
          </div>
        </div>

        <div class="lv-prompt-container">
          <div class="lv-prompt-header">
            <span class="lv-caption">PROMPT</span>
            <button @click="copyPrompt" class="lv-btn lv-btn-sm" :class="copied ? 'lv-btn-success' : 'lv-btn-secondary'">
              <Check v-if="copied" class="lv-icon-xs" />
              <Copy v-else class="lv-icon-xs" />
              {{ copied ? 'Copied!' : 'Copy Prompt' }}
            </button>
          </div>
          <pre class="lv-code-block">{{ generatedPrompt }}</pre>
        </div>

        <div class="lv-form-actions">
           <button @click="step = 1" class="lv-btn lv-btn-ghost">Edit Details</button>
           <button @click="step = 3" class="lv-btn lv-btn-primary lv-btn-lg">
             I have the JSON file
             <ArrowRight class="lv-icon-sm" />
           </button>
        </div>
      </div>

      <!-- Step 3: Upload -->
      <div v-if="step === 3" class="lv-wizard-step lv-animate-fade">
        <h3 class="lv-heading-4">Upload Curriculum</h3>
        <!-- We use a slot or emit to use the parent's uploader logic to avoid code duplication -->
        <div class="lv-wizard-upload-area">
           <slot name="uploader"></slot>
        </div>

        <div class="lv-task-complete-actions">
          <p class="lv-caption lv-mb-4">Want to generate another one?</p>
          <button @click="resetForm" class="lv-btn lv-btn-secondary">
             <RefreshCw class="lv-icon-sm" />
             Start Over
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { ArrowLeft, Sparkles, Copy, Check, ArrowRight, RefreshCw } from 'lucide-vue-next';

defineEmits(['close']);

// State
const step = ref(1);
const copied = ref(false);
const STORAGE_KEY = 'lv_curriculum_form';

const form = reactive({
  targetLanguage: '',
  nativeLanguage: 'English',
  level: 'beginner',
  time: '15 minutes per day',
  goal: ''
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

const generatedPrompt = computed(() => {
  return `Create a language learning curriculum JSON for LinguaVault with the following structure:

I want to learn: ${form.targetLanguage}
My native language: ${form.nativeLanguage}
Current level: ${form.level}
Learning goal: ${form.goal}
Time commitment: ${form.time}

Generate a JSON file with this structure:
{
  "id": "unique-id-from-title",
  "meta": {
    "targetLanguage": "${form.targetLanguage}",
    "targetLanguageCode": "en", 
    "nativeLanguage": "${form.nativeLanguage}",
    "nativeLanguageCode": "en",
    "proficiencyLevel": "${form.level}",
    "learningGoal": "${form.goal}",
    "estimatedHours": 20,
    "title": "Comprehensive ${form.targetLanguage} Course",
    "description": "A structured course to help you achieve your goal: ${form.goal}"
  },
  "modules": [
    {
      "id": "mod-1",
      "title": "Module Title",
      "description": "Brief description",
      "order": 1,
      "topics": [
        {
          "id": "top-1-1",
          "title": "Topic Title",
          "description": "Topic description",
          "order": 1,
          "lessons": [
            {
              "id": "les-1-1-1",
              "title": "Lesson Title",
              "type": "vocabulary",
              "estimatedMinutes": 10,
              "content": {
                "vocabulary": [
                  { "word": "Example", "translation": "Example", "pronunciation": "..." }
                ],
                "explanation": "Grammar or context note..."
              },
              "exercises": [
                {
                  "id": "ex-1",
                  "type": "multiple-choice",
                  "prompt": "Question text...",
                  "options": ["A", "B", "C", "D"],
                  "correctAnswer": "A",
                  "explanation": "Why this is correct..."
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

IMPORTANT:
1. "targetLanguageCode" must be a 2-letter ISO code (e.g. 'es', 'fr', 'jp').
2. Create 3-5 modules.
3. Include varied lesson types (vocabulary, grammar, conversation) and exercise types (multiple-choice, matching, fill-blank).
4. Return ONLY valid JSON.`;
});

function generatePrompt() {
  step.value = 2;
}

function copyPrompt() {
  navigator.clipboard.writeText(generatedPrompt.value);
  copied.value = true;
  setTimeout(() => copied.value = false, 2000);
}

function resetForm() {
  step.value = 1;
  // Optional: clear form or keep data? User said "do you want form again?", implying keeping data is good.
  // We'll keep the data to make it easy to tweak.
}
</script>

<style scoped>
.lv-wizard-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--lv-space-4) var(--lv-space-2);
  animation: lv-fade-in 0.3s ease-out;
}

.lv-wizard-header {
  margin-bottom: var(--lv-space-4);
}

.lv-header-stack {
  display: flex;
  flex-direction: column;
  gap: var(--lv-space-2);
}

.lv-header-stack h2 {
  margin: 0;
  font-size: var(--lv-font-size-xl);
}

.lv-back-btn {
  display: flex;
  align-items: center;
  gap: var(--lv-space-2);
  color: var(--lv-text-secondary);
}

/* Steps */
.lv-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--lv-space-4);
}

.lv-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--lv-space-2);
  color: var(--lv-text-tertiary);
  font-size: var(--lv-font-size-sm);
  position: relative;
  z-index: 1;
}

.lv-step-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--lv-bg-secondary);
  border: 2px solid var(--lv-border-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  transition: all var(--lv-transition-normal);
}

.lv-step-active {
  color: var(--lv-primary-600);
}

.lv-step-active .lv-step-circle {
  border-color: var(--lv-primary-500);
  background: var(--lv-primary-50);
  color: var(--lv-primary-600);
}

.lv-step-complete .lv-step-circle {
  background: var(--lv-primary-500);
  border-color: var(--lv-primary-500);
  color: white;
}

.lv-step-line {
  height: 2px;
  width: 60px;
  background: var(--lv-border-light);
  margin: 0 var(--lv-space-4);
  transform: translateY(-14px); /* Align with circle center */
}

.lv-step-line-active {
  background: var(--lv-primary-500);
}

/* Form */
.lv-wizard-content {
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0;
  box-shadow: none;
}

/* Split Layout for Step 1 */
.lv-wizard-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--lv-space-8);
  align-items: start;
}

.lv-wizard-left {
  padding: 0;
}

.lv-wizard-icon-large {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, var(--lv-primary-50), var(--lv-primary-100));
  border-radius: var(--lv-radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--lv-space-4);
  color: var(--lv-primary-600);
}

.lv-icon-xxl {
  width: 40px;
  height: 40px;
}

.lv-wizard-features {
  display: flex;
  flex-direction: column;
  gap: var(--lv-space-4);
}

.lv-wizard-feature {
  display: flex;
  align-items: start;
  gap: var(--lv-space-3);
}

.lv-feature-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--lv-primary-50);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.lv-wizard-right {
  background: transparent;
  padding: 0;
  border-radius: 0;
  border: none;
}

@media (max-width: 768px) {
  .lv-wizard-split {
    grid-template-columns: 1fr;
    gap: var(--lv-space-6);
  }
  
  .lv-wizard-left {
    text-align: center;
  }
  
  .lv-wizard-icon-large {
    margin-left: auto;
    margin-right: auto;
  }
}

.lv-form-group {
  margin-bottom: var(--lv-space-4);
}

.lv-form-group label {
  display: block;
  margin-bottom: var(--lv-space-2);
  font-weight: var(--lv-font-weight-medium);
  color: var(--lv-text-secondary);
}

.lv-input, .lv-select {
  width: 100%;
  padding: var(--lv-space-3);
  border: 1px solid var(--lv-border-light);
  border-radius: var(--lv-radius-md);
  background: var(--lv-bg-input);
  color: var(--lv-text-primary);
  transition: border-color 0.2s;
}

.lv-input:focus, .lv-select:focus {
  border-color: var(--lv-primary-500);
  outline: none;
}

.lv-form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--lv-space-6);
}

.lv-w-full {
  width: 100%;
  justify-content: center;
}

.lv-mb-6 { margin-bottom: var(--lv-space-6); }
.lv-mb-4 { margin-bottom: var(--lv-space-4); }

/* Prompt */
.lv-instruction-box {
  background: var(--lv-bg-secondary);
  padding: var(--lv-space-4);
  border-radius: var(--lv-radius-lg);
  margin-bottom: var(--lv-space-6);
}

.lv-prompt-container {
  border: 1px solid var(--lv-border-light);
  border-radius: var(--lv-radius-lg);
  overflow: hidden;
  margin-bottom: var(--lv-space-6);
}

.lv-prompt-header {
  background: var(--lv-bg-secondary);
  padding: var(--lv-space-2) var(--lv-space-4);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--lv-border-light);
}

.lv-code-block {
  padding: var(--lv-space-4);
  margin: 0;
  background: var(--lv-bg-primary);
  overflow-x: auto;
  font-family: monospace;
  font-size: var(--lv-font-size-sm);
  max-height: 300px;
  overflow-y: auto;
}

.lv-form-actions {
  display: flex;
  gap: var(--lv-space-4);
  justify-content: flex-end;
}

.lv-task-complete-actions {
  text-align: center;
  padding: var(--lv-space-8);
}

/* Enhanced Wizard Button */
.lv-btn-wizard-primary {
  padding: var(--lv-space-4) var(--lv-space-6);
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
  gap: var(--lv-space-2);
  border-radius: var(--lv-radius-lg);
  cursor: pointer;
}

.lv-btn-wizard-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(20, 184, 166, 0.6);
  background: linear-gradient(135deg, var(--lv-primary-600), var(--lv-primary-700));
}

@keyframes lv-fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
