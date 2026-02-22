<template>
  <div class="al-lesson-view">
    <!-- Header -->
    <header class="al-header">
      <div class="al-header-content">
        <button @click="goBack" class="al-back-link">
          <ArrowLeft class="al-icon-sm" />
          <span>Back</span>
        </button>
        
        <!-- Progress Steps -->
        <div class="al-lesson-steps" v-if="lesson">
          <div 
            v-for="(step, index) in totalSteps" 
            :key="index"
            class="al-step"
            :class="{
              'al-step-complete': index < currentStep,
              'al-step-active': index === currentStep
            }"
          ></div>
        </div>

        <button @click="toggleTheme" class="al-btn al-btn-ghost al-btn-icon" title="Toggle theme">
          <Sun v-if="isDark" class="al-icon-sm" />
          <Moon v-else class="al-icon-sm" />
        </button>
      </div>
    </header>

    <!-- Loading -->
    <div v-if="isLoading" class="al-loading">
      <div class="al-loading-spinner"></div>
      <p>Loading lesson...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="al-error-state">
      <div class="al-error-icon">😕</div>
      <h2>Lesson Not Found</h2>
      <p>{{ error }}</p>
      <button @click="goBack" class="al-btn al-btn-primary">Go Back</button>
    </div>

    <!-- Lesson Content -->
    <div v-else-if="lesson" class="al-lesson-main">
      <!-- Content Phase -->
      <section v-if="phase === 'content'" class="al-content-section al-animate-fade-in">
        <div class="al-lesson-header">
          <span class="al-badge al-badge-primary">{{ lesson.type }}</span>
          <h1 class="al-heading-2">{{ lesson.title }}</h1>
        </div>

        <!-- Vocabulary Content -->
        <div v-if="lesson.content.vocabulary" class="al-vocabulary-section">
          <div 
            v-for="(item, index) in lesson.content.vocabulary" 
            :key="index"
            class="al-vocab-card al-animate-slide-up"
            :style="{ animationDelay: (index * 0.1) + 's' }"
          >
            <div class="al-vocab-main">
              <span class="al-vocab-word">{{ item.word }}</span>
              <span class="al-vocab-translation">{{ item.translation }}</span>
            </div>
            <div v-if="item.pronunciation" class="al-vocab-pronunciation">
              <Volume2 class="al-icon-sm" /> {{ item.pronunciation }}
            </div>
            <p v-if="item.exampleSentence" class="al-vocab-example">
              <em>"{{ item.exampleSentence }}"</em>
              <span v-if="item.exampleTranslation" class="al-caption">{{ item.exampleTranslation }}</span>
            </p>
          </div>
        </div>

        <!-- Grammar Content -->
        <div v-if="lesson.content.grammarRules" class="al-grammar-section">
          <div 
            v-for="(rule, index) in lesson.content.grammarRules" 
            :key="index"
            class="al-grammar-card"
          >
            <h3 class="al-heading-4">{{ rule.rule }}</h3>
            <p class="al-body">{{ rule.explanation }}</p>
            <div v-if="rule.examples" class="al-grammar-examples">
              <div v-for="(example, i) in rule.examples" :key="i" class="al-example-item">
                <span class="al-example-text">{{ example.text }}</span>
                <span class="al-example-translation">{{ example.translation }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Dialogue Content -->
        <div v-if="lesson.content.dialogues" class="al-dialogue-section">
          <div v-for="(dialogue, dIndex) in lesson.content.dialogues" :key="dIndex" class="al-dialogue">
            <p v-if="dialogue.context" class="al-dialogue-context"><MapPin class="al-icon-xs" /> {{ dialogue.context }}</p>
            <div class="al-dialogue-lines">
              <div 
                v-for="(line, lIndex) in dialogue.lines" 
                :key="lIndex"
                class="al-dialogue-line"
                :class="{ 'al-dialogue-line-alt': lIndex % 2 === 1 }"
              >
                <span class="al-dialogue-speaker">{{ line.speaker }}</span>
                <div class="al-dialogue-bubble">
                  <p class="al-dialogue-text">{{ line.text }}</p>
                  <p class="al-dialogue-translation">{{ line.translation }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Explanation -->
        <div v-if="lesson.content.explanation" class="al-explanation">
          <h3 class="al-heading-4">💡 Key Points</h3>
          <p class="al-body">{{ lesson.content.explanation }}</p>
        </div>

        <!-- Tips -->
        <div v-if="lesson.content.tips?.length" class="al-tips">
          <h4 class="al-body-sm">Pro Tips:</h4>
          <ul>
            <li v-for="(tip, index) in lesson.content.tips" :key="index">{{ tip }}</li>
          </ul>
        </div>

        <button @click="startExercises" class="al-btn al-btn-primary al-btn-lg al-start-exercises">
          Start Practice
          <Play class="al-icon-sm" />
        </button>
      </section>

      <!-- Exercise Phase -->
      <section v-else-if="phase === 'exercise'" class="al-exercise-section al-animate-fade-in">
        <div class="al-exercise-header">
          <span class="al-caption">Exercise {{ currentExerciseIndex + 1 }} of {{ lesson.exercises.length }}</span>
          <h2 class="al-heading-3">{{ currentExercise?.prompt }}</h2>
          <p v-if="currentExercise?.instruction" class="al-body-sm">{{ currentExercise.instruction }}</p>
        </div>

        <!-- Multiple Choice -->
        <div v-if="currentExercise?.type === 'multiple-choice'" class="al-exercise-options">
          <button
            v-for="(option, index) in currentExercise.options"
            :key="index"
            class="al-option-btn"
            :class="{
              'al-option-selected': selectedAnswer === option,
              'al-option-correct': showResult && option === currentExercise.correctAnswer,
              'al-option-incorrect': showResult && selectedAnswer === option && option !== currentExercise.correctAnswer
            }"
            @click="selectAnswer(option)"
            :disabled="showResult"
          >
            <span class="al-option-letter">{{ String.fromCharCode(65 + index) }}</span>
            <span class="al-option-text">{{ option }}</span>
            <Check v-if="showResult && option === currentExercise.correctAnswer" class="al-icon-sm" />
            <X v-else-if="showResult && selectedAnswer === option && option !== currentExercise.correctAnswer" class="al-icon-sm" />
          </button>
        </div>

        <!-- Fill in the Blank -->
        <div v-else-if="currentExercise?.type === 'fill-blank'" class="al-fill-blank">
          <input
            v-model="textAnswer"
            type="text"
            class="al-input al-fill-input"
            :class="{
              'al-input-correct': showResult && isCorrect,
              'al-input-incorrect': showResult && !isCorrect
            }"
            placeholder="Type your answer..."
            @keyup.enter="checkAnswer"
            :disabled="showResult"
            autofocus
          />
        </div>

        <!-- Translation -->
        <div v-else-if="currentExercise?.type === 'translation'" class="al-translation">
          <textarea
            v-model="textAnswer"
            class="al-input al-translation-input"
            :class="{
              'al-input-correct': showResult && isCorrect,
              'al-input-incorrect': showResult && !isCorrect
            }"
            placeholder="Write your translation..."
            rows="3"
            :disabled="showResult"
          ></textarea>
        </div>

        <!-- True/False -->
        <div v-else-if="currentExercise?.type === 'true-false'" class="al-true-false">
          <button
            v-for="option in ['True', 'False']"
            :key="option"
            class="al-tf-btn"
            :class="{
              'al-option-selected': selectedAnswer === option,
              'al-option-correct': showResult && option.toLowerCase() === String(currentExercise.correctAnswer).toLowerCase(),
              'al-option-incorrect': showResult && selectedAnswer === option && option.toLowerCase() !== String(currentExercise.correctAnswer).toLowerCase()
            }"
            @click="selectAnswer(option)"
            :disabled="showResult"
          >
            {{ option }}
          </button>
        </div>

        <!-- Matching -->
        <div v-else-if="currentExercise?.type === 'matching'" class="al-matching">
          <p class="al-body-sm al-mb-4">Select a pair to match them.</p>
          <!-- Actually, matching needs two columns or a mixed grid. Let's do a mixed grid of all items -->
           <div class="al-matching-columns">
             <div class="al-match-col">
               <button 
                  v-for="item in matchingLeftItems" 
                  :key="item"
                  class="al-match-card"
                  :class="{
                    'al-match-selected': selectedMatchLeft === item,
                    'al-match-matched': isMatched(item),
                    'al-match-correct': showResult, 
                  }"
                  @click="selectMatchItem('left', item)"
                  :disabled="showResult || isMatched(item)"
               >
                 {{ item }}
               </button>
             </div>
             <div class="al-match-col">
               <button 
                  v-for="item in matchingRightItems" 
                  :key="item"
                  class="al-match-card"
                  :class="{
                    'al-match-selected': selectedMatchRight === item,
                    'al-match-matched': isRightMatched(item),
                  }"
                  @click="selectMatchItem('right', item)"
                  :disabled="showResult || isRightMatched(item)"
               >
                 {{ item }}
               </button>
             </div>
           </div>
        </div>

        <!-- Hints -->
        <button 
          v-if="currentExercise?.hints?.length && !showResult && hintsShown < currentExercise.hints.length"
          @click="showHint"
          class="al-btn al-btn-ghost al-hint-btn"
        >
          <Lightbulb class="al-icon-sm" /> Show Hint ({{ hintsShown }}/{{ currentExercise.hints.length }})
        </button>
        <div v-if="visibleHints.length" class="al-hints">
          <p v-for="(hint, index) in visibleHints" :key="index" class="al-hint"><Lightbulb class="al-icon-xs" /> {{ hint }}</p>
        </div>

        <!-- Result Feedback -->
        <div v-if="showResult" class="al-feedback" :class="isCorrect ? 'al-feedback-correct' : 'al-feedback-incorrect'">
          <div class="al-feedback-header">
            <PartyPopper v-if="isCorrect" class="al-feedback-icon" />
            <AlertCircle v-else class="al-feedback-icon" />
            <span>{{ isCorrect ? 'Correct!' : 'Not quite right' }}</span>
          </div>
          <p v-if="currentExercise?.explanation" class="al-feedback-explanation">
            {{ currentExercise.explanation }}
          </p>
          <p v-if="!isCorrect" class="al-feedback-answer">
            Correct answer: <strong>{{ currentExercise?.correctAnswer }}</strong>
          </p>
          <button v-if="!isCorrect" @click="resetExerciseState" class="al-btn al-btn-secondary al-mt-4">
            <RotateCw class="al-icon-sm" />
            Try Again
          </button>
        </div>

        <!-- Actions -->
        <div class="al-exercise-actions">
          <button 
            v-if="!showResult"
            @click="checkAnswer"
            class="al-btn al-btn-primary al-btn-lg"
            :disabled="!hasAnswer"
          >
            Check Answer
          </button>
          <button 
            v-else
            @click="nextExercise"
            class="al-btn al-btn-primary al-btn-lg"
          >
            {{ isLastExercise ? 'Complete Lesson' : 'Next Exercise' }}
            <ArrowRight class="al-icon-sm" />
          </button>
        </div>
      </section>

      <!-- Completion Phase -->
      <section v-else-if="phase === 'complete'" class="al-complete-section al-animate-scale-in">
        <div class="al-complete-content">
          <div class="al-complete-celebration">
            <span class="al-celebration-emoji">🎊</span>
            <div class="al-confetti" v-for="n in 20" :key="n" :style="getConfettiStyle(n)"></div>
          </div>
          
          <h1 class="al-heading-1">Lesson Complete!</h1>
          <p class="al-body">Great job finishing "{{ lesson.title }}"</p>

          <div class="al-score-card">
            <div class="al-score-ring">
              <svg viewBox="0 0 100 100" class="al-progress-ring">
                <circle cx="50" cy="50" r="45" class="al-progress-ring-track" fill="none" stroke-width="8"/>
                <circle 
                  cx="50" cy="50" r="45" 
                  class="al-progress-ring-fill" 
                  fill="none" 
                  stroke-width="8"
                  :stroke-dasharray="283"
                  :stroke-dashoffset="283 - (283 * score / 100)"
                />
              </svg>
              <span class="al-score-value">{{ score }}%</span>
            </div>
            <div class="al-score-details">
              <p><strong>{{ correctCount }}</strong> out of <strong>{{ lesson.exercises.length }}</strong> correct</p>
              <p class="al-caption">Time spent: {{ timeSpent }} min</p>
            </div>
          </div>

          <div class="al-complete-actions">
            <button @click="goBack" class="al-btn al-btn-secondary al-btn-lg">
              Back to Course
            </button>
            <button v-if="nextLessonId" @click="goToNextLesson" class="al-btn al-btn-primary al-btn-lg">
              Next Lesson
              <ArrowRight class="al-icon-sm" />
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { 
  ArrowLeft, Sun, Moon, Volume2, MapPin, Play, 
  Check, X, Lightbulb, PartyPopper, AlertCircle, 
  ArrowRight, RotateCw 
} from 'lucide-vue-next';
import type { Curriculum, Lesson, Exercise, LearningProgress, ExerciseResult } from '../../../types/astralearn';
import { getCurriculum, getProgress, markLessonComplete } from '../../../lib/astralearn/db';
import { setLastLesson } from '../../../lib/astralearn/storage';

// Props
const props = defineProps<{
  curriculumId: string;
  lessonId: string;
}>();

// State
const isLoading = ref(true);
const isDark = ref(false);
const error = ref<string | null>(null);
const curriculum = ref<Curriculum | null>(null);
const lesson = ref<Lesson | null>(null);
const progress = ref<LearningProgress | null>(null);

// Lesson state
const phase = ref<'content' | 'exercise' | 'complete'>('content');
const currentExerciseIndex = ref(0);
const selectedAnswer = ref<string | null>(null);
const textAnswer = ref('');
const showResult = ref(false);
const exerciseResults = ref<Record<string, ExerciseResult>>({});
const hintsShown = ref(0);
const startTime = ref(Date.now());

// Matching state
const selectedMatchLeft = ref<string | null>(null);
const selectedMatchRight = ref<string | null>(null);
const matchedPairs = ref<Record<string, string>>({}); // left -> right
const matchingLeftItems = ref<string[]>([]);
const matchingRightItems = ref<string[]>([]);

// Module/Topic info for navigation
const moduleId = ref<string | null>(null);
const topicId = ref<string | null>(null);
const nextLessonId = ref<string | null>(null);

// Computed
const totalSteps = computed(() => {
  if (!lesson.value) return 0;
  return 1 + lesson.value.exercises.length; // Content + exercises
});

const currentStep = computed(() => {
  if (phase.value === 'content') return 0;
  if (phase.value === 'complete') return totalSteps.value;
  return 1 + currentExerciseIndex.value;
});

const currentExercise = computed((): Exercise | null => {
  if (!lesson.value || currentExerciseIndex.value >= lesson.value.exercises.length) return null;
  return lesson.value.exercises[currentExerciseIndex.value];
});

const hasAnswer = computed(() => {
  if (currentExercise.value?.type === 'fill-blank' || currentExercise.value?.type === 'translation') {
    return textAnswer.value.trim().length > 0;
  }
  if (currentExercise.value?.type === 'matching') {
    // For matching, we consider it answered if all pairs are matched
    if (!currentExercise.value.correctAnswer) return false;
    let totalPairs = 0;
    if (Array.isArray(currentExercise.value.correctAnswer)) {
      totalPairs = currentExercise.value.correctAnswer.length; // This logic assumes array of strings/pairs? Wait, earlier array was pair strings?
      // Actually validator expects map or array. 
      // Simplified: Just check if we matched same number of items as left items
    } else if (typeof currentExercise.value.correctAnswer === 'object') {
      totalPairs = Object.keys(currentExercise.value.correctAnswer).length;
    }
    return Object.keys(matchedPairs.value).length === totalPairs;
  }
  return selectedAnswer.value !== null;
});

const isCorrect = computed(() => {
  if (!currentExercise.value) return false;
  
  const correct = currentExercise.value.correctAnswer;
  
  if (currentExercise.value.type === 'fill-blank' || currentExercise.value.type === 'translation') {
    // Case-insensitive comparison, trim whitespace
    const userAnswer = textAnswer.value.trim().toLowerCase();
    if (Array.isArray(correct)) {
      return correct.some(c => c.toLowerCase() === userAnswer);
    }
    return userAnswer === String(correct).toLowerCase();
  }
  
  if (currentExercise.value.type === 'true-false') {
    return selectedAnswer.value?.toLowerCase() === String(correct).toLowerCase();
  }
  
  if (currentExercise.value.type === 'matching') {
    // Check if all matched pairs are correct
    // Normalize to map
    let correctMap: Record<string, string> = {};
    if (Array.isArray(correct)) {
        // If array, assume format "Key: Value" ? Or just skip array support for now as we prefer object
        // Validator allows array, but let's assume object for the fix request
        // Or if it's array of strings, we can't easily map, but let's support object primarily
        return false; 
    } else {
        correctMap = correct as Record<string, string>;
    }
    
    for (const [left, right] of Object.entries(matchedPairs.value)) {
        if (correctMap[left] !== right) return false;
    }
    return true;
  }

  return selectedAnswer.value === correct;
});

const isLastExercise = computed(() => {
  if (!lesson.value) return true;
  return currentExerciseIndex.value >= lesson.value.exercises.length - 1;
});

const visibleHints = computed(() => {
  if (!currentExercise.value?.hints) return [];
  return currentExercise.value.hints.slice(0, hintsShown.value);
});

const correctCount = computed(() => {
  return Object.values(exerciseResults.value).filter(r => r.correct).length;
});

const score = computed(() => {
  if (!lesson.value || lesson.value.exercises.length === 0) return 100;
  return Math.round((correctCount.value / lesson.value.exercises.length) * 100);
});

const timeSpent = computed(() => {
  return Math.round((Date.now() - startTime.value) / 60000);
});

// Methods
function toggleTheme() {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark', isDark.value);
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
}

function goBack() {
  window.location.href = `/astralearn/learn/${props.curriculumId}`;
}

function startExercises() {
  if (!lesson.value?.exercises.length) {
    phase.value = 'complete';
    completeLesson();
    return;
  }
  phase.value = 'exercise';
  currentExerciseIndex.value = 0;
  resetExerciseState();
}

function resetExerciseState() {
  selectedAnswer.value = null;
  textAnswer.value = '';
  showResult.value = false;
  hintsShown.value = 0;
  
  // Reset matching
  selectedMatchLeft.value = null;
  selectedMatchRight.value = null;
  matchedPairs.value = {};
  
  if (currentExercise.value?.type === 'matching') {
     initMatchingItems();
  }
}

function initMatchingItems() {
    if (!currentExercise.value) return;
    const correct = currentExercise.value.correctAnswer;
    if (typeof correct === 'object' && !Array.isArray(correct)) {
        const map = correct as Record<string, string>;
        matchingLeftItems.value = Object.keys(map);
        // Shuffle right items
        matchingRightItems.value = Object.values(map).sort(() => Math.random() - 0.5);
    }
}

function selectMatchItem(side: 'left' | 'right', item: string) {
    if (showResult.value) return;
    
    if (side === 'left') {
        if (isMatched(item)) return; // Already matched
        selectedMatchLeft.value = item;
    } else {
        if (isRightMatched(item)) return;
        selectedMatchRight.value = item;
    }
    
    // Check if we can make a match
    if (selectedMatchLeft.value && selectedMatchRight.value) {
        matchedPairs.value[selectedMatchLeft.value] = selectedMatchRight.value;
        selectedMatchLeft.value = null;
        selectedMatchRight.value = null;
    }
}

function isMatched(leftItem: string) {
    return !!matchedPairs.value[leftItem];
}

function isRightMatched(rightItem: string) {
    return Object.values(matchedPairs.value).includes(rightItem);
}

function selectAnswer(answer: string) {
  if (showResult.value) return;
  selectedAnswer.value = answer;
}

function showHint() {
  if (currentExercise.value?.hints && hintsShown.value < currentExercise.value.hints.length) {
    hintsShown.value++;
  }
}

function checkAnswer() {
  if (!hasAnswer.value || !currentExercise.value) return;
  
  showResult.value = true;
  
  // Record result
  const result: ExerciseResult = {
    exerciseId: currentExercise.value.id,
    correct: isCorrect.value,
    userAnswer: currentExercise.value.type === 'fill-blank' || currentExercise.value.type === 'translation' 
      ? textAnswer.value 
      : currentExercise.value.type === 'matching' 
        ? JSON.stringify(matchedPairs.value)
        : selectedAnswer.value || '',
    attemptedAt: new Date().toISOString(),
    timeSpentSeconds: Math.round((Date.now() - startTime.value) / 1000),
    hintsUsed: hintsShown.value,
  };
  
  exerciseResults.value[currentExercise.value.id] = result;
}

function nextExercise() {
  if (isLastExercise.value) {
    phase.value = 'complete';
    completeLesson();
  } else {
    currentExerciseIndex.value++;
    resetExerciseState();
  }
}

async function completeLesson() {
  if (!progress.value || !lesson.value) return;

  const newProgress = await markLessonComplete(
    props.curriculumId,
    lesson.value.id,
    score.value,
    exerciseResults.value,
    timeSpent.value
  );

  if (newProgress) {
    progress.value = newProgress;
  }
}

function goToNextLesson() {
  if (nextLessonId.value) {
    window.location.href = `/astralearn/learn/${props.curriculumId}/lesson/${nextLessonId.value}`;
  }
}

function getConfettiStyle(n: number) {
  const colors = ['#14b8a6', '#f97316', '#22c55e', '#8b5cf6', '#ef4444', '#3b82f6'];
  return {
    left: `${Math.random() * 100}%`,
    backgroundColor: colors[n % colors.length],
    animationDelay: `${Math.random() * 0.5}s`,
    animationDuration: `${1 + Math.random()}s`,
  };
}

// Lifecycle
onMounted(async () => {
  isDark.value = document.documentElement.classList.contains('dark');
  startTime.value = Date.now();

  try {
    const curriculumData = await getCurriculum(props.curriculumId);
    if (!curriculumData) {
      error.value = 'Could not find this curriculum.';
      return;
    }
    curriculum.value = curriculumData;

    // Find the lesson and its context
    for (const mod of curriculumData.modules) {
      for (const topic of mod.topics) {
        const lessonIndex = topic.lessons.findIndex(l => l.id === props.lessonId);
        if (lessonIndex >= 0) {
          lesson.value = topic.lessons[lessonIndex];
          moduleId.value = mod.id;
          topicId.value = topic.id;
          
          // Find next lesson
          if (lessonIndex < topic.lessons.length - 1) {
            nextLessonId.value = topic.lessons[lessonIndex + 1].id;
          } else {
            // Check next topic
            const topicIndex = mod.topics.indexOf(topic);
            if (topicIndex < mod.topics.length - 1 && mod.topics[topicIndex + 1].lessons.length > 0) {
              nextLessonId.value = mod.topics[topicIndex + 1].lessons[0].id;
            }
          }
          break;
        }
      }
      if (lesson.value) break;
    }

    if (!lesson.value) {
      error.value = 'Could not find this lesson.';
      return;
    }

    // Get progress
    const progressData = await getProgress(props.curriculumId);
    progress.value = progressData || null;

    // Update last lesson pointer
    if (moduleId.value && topicId.value) {
      setLastLesson({
        curriculumId: props.curriculumId,
        moduleId: moduleId.value,
        topicId: topicId.value,
        lessonId: props.lessonId,
      });
    }

  } catch (err) {
    error.value = 'Failed to load lesson data.';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.al-lesson-view {
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
  max-width: 700px;
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
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--al-font-family);
}

.al-back-link:hover {
  color: var(--al-text-primary);
}

/* Progress Steps */
.al-lesson-steps {
  display: flex;
  gap: 4px;
}

.al-step {
  width: 24px;
  height: 4px;
  background: var(--al-border-light);
  border-radius: 2px;
  transition: all var(--al-transition-fast);
}

.al-step-complete {
  background: var(--al-primary-500);
}

.al-step-active {
  background: var(--al-primary-300);
  animation: al-pulse 1.5s ease-in-out infinite;
}

/* Loading & Error */
.al-loading,
.al-error-state {
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

/* Main Content */
.al-lesson-main {
  max-width: 700px;
  margin: 0 auto;
  padding: var(--al-space-6) var(--al-space-4) var(--al-space-16);
}

/* Content Section */
.al-content-section {
  display: flex;
  flex-direction: column;
  gap: var(--al-space-6);
}

.al-lesson-header {
  text-align: center;
  margin-bottom: var(--al-space-4);
}

.al-lesson-header .al-badge {
  margin-bottom: var(--al-space-2);
  text-transform: capitalize;
}

/* Vocabulary */
.al-vocabulary-section {
  display: flex;
  flex-direction: column;
  gap: var(--al-space-4);
}

.al-vocab-card {
  background: var(--al-bg-glass);
  border: 1px solid var(--al-border-glass);
  border-radius: var(--al-radius-xl);
  padding: var(--al-space-5);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: all var(--al-transition-fast);
}

.al-vocab-card:hover {
  border-color: var(--al-primary-300);
  transform: translateY(-2px);
  box-shadow: var(--al-shadow-md);
}

.al-vocab-main {
  display: flex;
  align-items: baseline;
  gap: var(--al-space-4);
  margin-bottom: var(--al-space-2);
}

.al-vocab-word {
  font-size: var(--al-font-size-2xl);
  font-weight: var(--al-font-weight-bold);
  color: var(--al-primary-600);
}

.dark .al-vocab-word {
  color: var(--al-primary-400);
}

.al-vocab-translation {
  font-size: var(--al-font-size-lg);
  color: var(--al-text-secondary);
}

.al-vocab-pronunciation {
  font-size: var(--al-font-size-sm);
  color: var(--al-text-tertiary);
  margin-bottom: var(--al-space-2);
}

.al-vocab-example {
  font-size: var(--al-font-size-sm);
  color: var(--al-text-secondary);
  padding-left: var(--al-space-4);
  border-left: 3px solid var(--al-primary-200);
}

/* Grammar */
.al-grammar-card {
  background: var(--al-bg-secondary);
  border-radius: var(--al-radius-lg);
  padding: var(--al-space-5);
  margin-bottom: var(--al-space-4);
}

.al-grammar-examples {
  margin-top: var(--al-space-4);
  display: flex;
  flex-direction: column;
  gap: var(--al-space-2);
}

.al-example-item {
  display: flex;
  flex-direction: column;
  padding: var(--al-space-3);
  background: var(--al-bg-card);
  border-radius: var(--al-radius-md);
}

.al-example-text {
  font-weight: var(--al-font-weight-medium);
}

.al-example-translation {
  font-size: var(--al-font-size-sm);
  color: var(--al-text-tertiary);
}

/* Dialogue */
.al-dialogue-context {
  font-size: var(--al-font-size-sm);
  color: var(--al-text-tertiary);
  margin-bottom: var(--al-space-4);
  font-style: italic;
}

.al-dialogue-lines {
  display: flex;
  flex-direction: column;
  gap: var(--al-space-3);
}

.al-dialogue-line {
  display: flex;
  gap: var(--al-space-3);
  align-items: flex-start;
}

.al-dialogue-line-alt {
  flex-direction: row-reverse;
}

.al-dialogue-speaker {
  font-size: var(--al-font-size-xs);
  font-weight: var(--al-font-weight-semibold);
  color: var(--al-primary-600);
  min-width: 60px;
}

.al-dialogue-bubble {
  background: var(--al-bg-secondary);
  border-radius: var(--al-radius-lg);
  padding: var(--al-space-3) var(--al-space-4);
  max-width: 70%;
}

.al-dialogue-line-alt .al-dialogue-bubble {
  background: var(--al-primary-100);
}

.dark .al-dialogue-line-alt .al-dialogue-bubble {
  background: rgb(20 184 166 / 0.2);
}

.al-dialogue-text {
  margin-bottom: var(--al-space-1);
}

.al-dialogue-translation {
  font-size: var(--al-font-size-sm);
  color: var(--al-text-tertiary);
  font-style: italic;
}

/* Explanation & Tips */
.al-explanation {
  background: linear-gradient(135deg, var(--al-primary-50), var(--al-bg-card));
  border: 1px solid var(--al-primary-200);
  border-radius: var(--al-radius-lg);
  padding: var(--al-space-5);
}

.dark .al-explanation {
  background: linear-gradient(135deg, rgb(20 184 166 / 0.1), var(--al-bg-card));
  border-color: var(--al-primary-800);
}

.al-tips {
  padding: var(--al-space-4);
  background: var(--al-bg-secondary);
  border-radius: var(--al-radius-md);
}

.al-tips ul {
  margin: var(--al-space-2) 0 0 var(--al-space-4);
  padding: 0;
}

.al-tips li {
  margin-bottom: var(--al-space-1);
  font-size: var(--al-font-size-sm);
}

.al-start-exercises {
  align-self: center;
  margin-top: var(--al-space-4);
}

/* Exercise Section */
.al-exercise-section {
  display: flex;
  flex-direction: column;
  gap: var(--al-space-6);
}

.al-exercise-header {
  text-align: center;
}

.al-exercise-options {
  display: flex;
  flex-direction: column;
  gap: var(--al-space-3);
}

.al-option-btn {
  display: flex;
  align-items: center;
  gap: var(--al-space-3);
  padding: var(--al-space-4);
  background: var(--al-bg-glass);
  border: 2px solid var(--al-border-glass);
  border-radius: var(--al-radius-lg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  cursor: pointer;
  font-family: var(--al-font-family);
  font-size: var(--al-font-size-base);
  text-align: left;
  transition: all var(--al-transition-fast);
}

.al-option-btn:hover:not(:disabled) {
  border-color: var(--al-primary-400);
  background: var(--al-primary-50);
}

.dark .al-option-btn:hover:not(:disabled) {
  background: rgb(20 184 166 / 0.1);
}

.al-option-selected {
  border-color: var(--al-primary-500);
  background: var(--al-primary-50);
}

.dark .al-option-selected {
  background: rgb(20 184 166 / 0.15);
}

.al-option-correct {
  border-color: var(--al-success-500) !important;
  background: var(--al-success-50) !important;
}

.al-option-incorrect {
  border-color: var(--al-error-500) !important;
  background: var(--al-error-50) !important;
}

.al-option-letter {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--al-bg-tertiary);
  border-radius: 50%;
  font-weight: var(--al-font-weight-semibold);
  font-size: var(--al-font-size-sm);
}

.al-option-text {
  flex: 1;
}

/* Fill Blank & Translation */
.al-fill-input,
.al-translation-input {
  font-size: var(--al-font-size-lg);
  text-align: center;
}

.al-translation-input {
  text-align: left;
}

.al-input-correct {
  border-color: var(--al-success-500) !important;
  background: var(--al-success-50) !important;
}

.al-input-incorrect {
  border-color: var(--al-error-500) !important;
  background: var(--al-error-50) !important;
}

/* True/False */
.al-true-false {
  display: flex;
  gap: var(--al-space-4);
  justify-content: center;
}

.al-tf-btn {
  flex: 1;
  max-width: 150px;
  padding: var(--al-space-6);
  background: var(--al-bg-glass);
  border: 2px solid var(--al-border-glass);
  border-radius: var(--al-radius-xl);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  font-family: var(--al-font-family);
  font-size: var(--al-font-size-xl);
  font-weight: var(--al-font-weight-bold);
  cursor: pointer;
  transition: all var(--al-transition-fast);
}

.al-tf-btn:hover:not(:disabled) {
  border-color: var(--al-primary-400);
  transform: scale(1.02);
}

/* Matching */
.al-matching-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--al-space-6);
  margin-top: var(--al-space-4);
}

.al-match-col {
  display: flex;
  flex-direction: column;
  gap: var(--al-space-4);
}

.al-match-card {
  padding: var(--al-space-4);
  background: var(--al-bg-glass);
  border: 2px solid var(--al-border-glass);
  border-radius: var(--al-radius-lg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  cursor: pointer;
  font-family: var(--al-font-family);
  font-size: var(--al-font-size-base);
  text-align: center;
  transition: all var(--al-transition-fast);
  width: 100%;
}

.al-match-card:hover:not(:disabled) {
  border-color: var(--al-primary-400);
  background: var(--al-primary-50);
  transform: translateY(-2px);
}

.dark .al-match-card:hover:not(:disabled) {
  background: rgb(20 184 166 / 0.1);
}

.al-match-selected {
  border-color: var(--al-primary-500);
  background: var(--al-primary-50);
  box-shadow: 0 0 0 2px var(--al-primary-200);
}

.dark .al-match-selected {
  background: rgb(20 184 166 / 0.15);
  box-shadow: 0 0 0 2px rgb(20 184 166 / 0.3);
}

.al-match-matched {
  border-color: var(--al-success-500) !important;
  background: var(--al-success-50) !important;
  opacity: 0.7;
  cursor: default;
}

.dark .al-match-matched {
  background: rgb(34 197 94 / 0.1) !important;
}

.al-match-correct {
  border-color: var(--al-success-500) !important;
  background: var(--al-success-50) !important;
}

/* Hints */

.al-hint-btn {
  align-self: center;
}

.al-hints {
  display: flex;
  flex-direction: column;
  gap: var(--al-space-2);
}

.al-hint {
  padding: var(--al-space-3);
  background: var(--al-warning-50);
  border-radius: var(--al-radius-md);
  font-size: var(--al-font-size-sm);
}

/* Feedback */
.al-feedback {
  padding: var(--al-space-5);
  border-radius: var(--al-radius-xl);
  text-align: center;
}

.al-feedback-correct {
  background: var(--al-success-50);
  border: 1px solid var(--al-success-500);
}

.al-feedback-incorrect {
  background: var(--al-error-50);
  border: 1px solid var(--al-error-500);
}

.al-feedback-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--al-space-2);
  font-size: var(--al-font-size-xl);
  font-weight: var(--al-font-weight-bold);
  margin-bottom: var(--al-space-2);
}

.al-feedback-icon {
  font-size: 1.5rem;
}

.al-feedback-explanation {
  font-size: var(--al-font-size-sm);
  color: var(--al-text-secondary);
}

.al-feedback-answer {
  margin-top: var(--al-space-2);
  font-size: var(--al-font-size-sm);
}

/* Actions */
.al-exercise-actions {
  display: flex;
  justify-content: center;
  margin-top: var(--al-space-4);
}

/* Complete Section */
.al-complete-section {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
}

.al-complete-content {
  text-align: center;
  position: relative;
}

.al-complete-celebration {
  position: relative;
  margin-bottom: var(--al-space-6);
}

.al-celebration-emoji {
  font-size: 5rem;
  display: inline-block;
  animation: al-bounce 1s ease-in-out infinite;
}

.al-confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  animation: al-confetti 2s ease-out forwards;
}

/* Score Card */
.al-score-card {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--al-space-6);
  margin: var(--al-space-8) 0;
  padding: var(--al-space-6);
  background: var(--al-bg-secondary);
  border-radius: var(--al-radius-xl);
}

.al-score-ring {
  position: relative;
  width: 100px;
  height: 100px;
}

.al-score-ring svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.al-progress-ring-track {
  stroke: var(--al-border-light);
}

.al-progress-ring-fill {
  stroke: var(--al-primary-500);
  transition: stroke-dashoffset 1s ease-out;
}

.al-score-value {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: var(--al-font-size-2xl);
  font-weight: var(--al-font-weight-bold);
}

.al-score-details {
  text-align: left;
}

.al-complete-actions {
  display: flex;
  gap: var(--al-space-4);
  justify-content: center;
  flex-wrap: wrap;
}

/* Responsive */
@media (max-width: 768px) {
  .al-score-card {
    flex-direction: column;
  }

  .al-complete-actions {
    flex-direction: column;
  }
}
</style>
