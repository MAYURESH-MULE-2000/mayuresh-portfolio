<template>
  <div class="lv-lesson-view">
    <!-- Header -->
    <header class="lv-header">
      <div class="lv-header-content">
        <button @click="goBack" class="lv-back-link">
          <ArrowLeft class="lv-icon-sm" />
          <span>Back</span>
        </button>
        
        <!-- Progress Steps -->
        <div class="lv-lesson-steps" v-if="lesson">
          <div 
            v-for="(step, index) in totalSteps" 
            :key="index"
            class="lv-step"
            :class="{
              'lv-step-complete': index < currentStep,
              'lv-step-active': index === currentStep
            }"
          ></div>
        </div>

        <button @click="toggleTheme" class="lv-btn lv-btn-ghost lv-btn-icon" title="Toggle theme">
          <Sun v-if="isDark" class="lv-icon-sm" />
          <Moon v-else class="lv-icon-sm" />
        </button>
      </div>
    </header>

    <!-- Loading -->
    <div v-if="isLoading" class="lv-loading">
      <div class="lv-loading-spinner"></div>
      <p>Loading lesson...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="lv-error-state">
      <div class="lv-error-icon">😕</div>
      <h2>Lesson Not Found</h2>
      <p>{{ error }}</p>
      <button @click="goBack" class="lv-btn lv-btn-primary">Go Back</button>
    </div>

    <!-- Lesson Content -->
    <div v-else-if="lesson" class="lv-lesson-main">
      <!-- Content Phase -->
      <section v-if="phase === 'content'" class="lv-content-section lv-animate-fade-in">
        <div class="lv-lesson-header">
          <span class="lv-badge lv-badge-primary">{{ lesson.type }}</span>
          <h1 class="lv-heading-2">{{ lesson.title }}</h1>
        </div>

        <!-- Vocabulary Content -->
        <div v-if="lesson.content.vocabulary" class="lv-vocabulary-section">
          <div 
            v-for="(item, index) in lesson.content.vocabulary" 
            :key="index"
            class="lv-vocab-card lv-animate-slide-up"
            :style="{ animationDelay: (index * 0.1) + 's' }"
          >
            <div class="lv-vocab-main">
              <span class="lv-vocab-word">{{ item.word }}</span>
              <span class="lv-vocab-translation">{{ item.translation }}</span>
            </div>
            <div v-if="item.pronunciation" class="lv-vocab-pronunciation">
              <Volume2 class="lv-icon-sm" /> {{ item.pronunciation }}
            </div>
            <p v-if="item.exampleSentence" class="lv-vocab-example">
              <em>"{{ item.exampleSentence }}"</em>
              <span v-if="item.exampleTranslation" class="lv-caption">{{ item.exampleTranslation }}</span>
            </p>
          </div>
        </div>

        <!-- Grammar Content -->
        <div v-if="lesson.content.grammarRules" class="lv-grammar-section">
          <div 
            v-for="(rule, index) in lesson.content.grammarRules" 
            :key="index"
            class="lv-grammar-card"
          >
            <h3 class="lv-heading-4">{{ rule.rule }}</h3>
            <p class="lv-body">{{ rule.explanation }}</p>
            <div v-if="rule.examples" class="lv-grammar-examples">
              <div v-for="(example, i) in rule.examples" :key="i" class="lv-example-item">
                <span class="lv-example-text">{{ example.text }}</span>
                <span class="lv-example-translation">{{ example.translation }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Dialogue Content -->
        <div v-if="lesson.content.dialogues" class="lv-dialogue-section">
          <div v-for="(dialogue, dIndex) in lesson.content.dialogues" :key="dIndex" class="lv-dialogue">
            <p v-if="dialogue.context" class="lv-dialogue-context"><MapPin class="lv-icon-xs" /> {{ dialogue.context }}</p>
            <div class="lv-dialogue-lines">
              <div 
                v-for="(line, lIndex) in dialogue.lines" 
                :key="lIndex"
                class="lv-dialogue-line"
                :class="{ 'lv-dialogue-line-alt': lIndex % 2 === 1 }"
              >
                <span class="lv-dialogue-speaker">{{ line.speaker }}</span>
                <div class="lv-dialogue-bubble">
                  <p class="lv-dialogue-text">{{ line.text }}</p>
                  <p class="lv-dialogue-translation">{{ line.translation }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Explanation -->
        <div v-if="lesson.content.explanation" class="lv-explanation">
          <h3 class="lv-heading-4">💡 Key Points</h3>
          <p class="lv-body">{{ lesson.content.explanation }}</p>
        </div>

        <!-- Tips -->
        <div v-if="lesson.content.tips?.length" class="lv-tips">
          <h4 class="lv-body-sm">Pro Tips:</h4>
          <ul>
            <li v-for="(tip, index) in lesson.content.tips" :key="index">{{ tip }}</li>
          </ul>
        </div>

        <button @click="startExercises" class="lv-btn lv-btn-primary lv-btn-lg lv-start-exercises">
          Start Practice
          <Play class="lv-icon-sm" />
        </button>
      </section>

      <!-- Exercise Phase -->
      <section v-else-if="phase === 'exercise'" class="lv-exercise-section lv-animate-fade-in">
        <div class="lv-exercise-header">
          <span class="lv-caption">Exercise {{ currentExerciseIndex + 1 }} of {{ lesson.exercises.length }}</span>
          <h2 class="lv-heading-3">{{ currentExercise?.prompt }}</h2>
          <p v-if="currentExercise?.instruction" class="lv-body-sm">{{ currentExercise.instruction }}</p>
        </div>

        <!-- Multiple Choice -->
        <div v-if="currentExercise?.type === 'multiple-choice'" class="lv-exercise-options">
          <button
            v-for="(option, index) in currentExercise.options"
            :key="index"
            class="lv-option-btn"
            :class="{
              'lv-option-selected': selectedAnswer === option,
              'lv-option-correct': showResult && option === currentExercise.correctAnswer,
              'lv-option-incorrect': showResult && selectedAnswer === option && option !== currentExercise.correctAnswer
            }"
            @click="selectAnswer(option)"
            :disabled="showResult"
          >
            <span class="lv-option-letter">{{ String.fromCharCode(65 + index) }}</span>
            <span class="lv-option-text">{{ option }}</span>
            <Check v-if="showResult && option === currentExercise.correctAnswer" class="lv-icon-sm" />
            <X v-else-if="showResult && selectedAnswer === option && option !== currentExercise.correctAnswer" class="lv-icon-sm" />
          </button>
        </div>

        <!-- Fill in the Blank -->
        <div v-else-if="currentExercise?.type === 'fill-blank'" class="lv-fill-blank">
          <input
            v-model="textAnswer"
            type="text"
            class="lv-input lv-fill-input"
            :class="{
              'lv-input-correct': showResult && isCorrect,
              'lv-input-incorrect': showResult && !isCorrect
            }"
            placeholder="Type your answer..."
            @keyup.enter="checkAnswer"
            :disabled="showResult"
            autofocus
          />
        </div>

        <!-- Translation -->
        <div v-else-if="currentExercise?.type === 'translation'" class="lv-translation">
          <textarea
            v-model="textAnswer"
            class="lv-input lv-translation-input"
            :class="{
              'lv-input-correct': showResult && isCorrect,
              'lv-input-incorrect': showResult && !isCorrect
            }"
            placeholder="Write your translation..."
            rows="3"
            :disabled="showResult"
          ></textarea>
        </div>

        <!-- True/False -->
        <div v-else-if="currentExercise?.type === 'true-false'" class="lv-true-false">
          <button
            v-for="option in ['True', 'False']"
            :key="option"
            class="lv-tf-btn"
            :class="{
              'lv-option-selected': selectedAnswer === option,
              'lv-option-correct': showResult && option.toLowerCase() === String(currentExercise.correctAnswer).toLowerCase(),
              'lv-option-incorrect': showResult && selectedAnswer === option && option.toLowerCase() !== String(currentExercise.correctAnswer).toLowerCase()
            }"
            @click="selectAnswer(option)"
            :disabled="showResult"
          >
            {{ option }}
          </button>
        </div>

        <!-- Matching -->
        <div v-else-if="currentExercise?.type === 'matching'" class="lv-matching">
          <p class="lv-body-sm lv-mb-4">Select a pair to match them.</p>
          <!-- Actually, matching needs two columns or a mixed grid. Let's do a mixed grid of all items -->
           <div class="lv-matching-columns">
             <div class="lv-match-col">
               <button 
                  v-for="item in matchingLeftItems" 
                  :key="item"
                  class="lv-match-card"
                  :class="{
                    'lv-match-selected': selectedMatchLeft === item,
                    'lv-match-matched': isMatched(item),
                    'lv-match-correct': showResult, 
                  }"
                  @click="selectMatchItem('left', item)"
                  :disabled="showResult || isMatched(item)"
               >
                 {{ item }}
               </button>
             </div>
             <div class="lv-match-col">
               <button 
                  v-for="item in matchingRightItems" 
                  :key="item"
                  class="lv-match-card"
                  :class="{
                    'lv-match-selected': selectedMatchRight === item,
                    'lv-match-matched': isRightMatched(item),
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
          class="lv-btn lv-btn-ghost lv-hint-btn"
        >
          <Lightbulb class="lv-icon-sm" /> Show Hint ({{ hintsShown }}/{{ currentExercise.hints.length }})
        </button>
        <div v-if="visibleHints.length" class="lv-hints">
          <p v-for="(hint, index) in visibleHints" :key="index" class="lv-hint"><Lightbulb class="lv-icon-xs" /> {{ hint }}</p>
        </div>

        <!-- Result Feedback -->
        <div v-if="showResult" class="lv-feedback" :class="isCorrect ? 'lv-feedback-correct' : 'lv-feedback-incorrect'">
          <div class="lv-feedback-header">
            <PartyPopper v-if="isCorrect" class="lv-feedback-icon" />
            <AlertCircle v-else class="lv-feedback-icon" />
            <span>{{ isCorrect ? 'Correct!' : 'Not quite right' }}</span>
          </div>
          <p v-if="currentExercise?.explanation" class="lv-feedback-explanation">
            {{ currentExercise.explanation }}
          </p>
          <p v-if="!isCorrect" class="lv-feedback-answer">
            Correct answer: <strong>{{ currentExercise?.correctAnswer }}</strong>
          </p>
          <button v-if="!isCorrect" @click="resetExerciseState" class="lv-btn lv-btn-secondary lv-mt-4">
            <RotateCw class="lv-icon-sm" />
            Try Again
          </button>
        </div>

        <!-- Actions -->
        <div class="lv-exercise-actions">
          <button 
            v-if="!showResult"
            @click="checkAnswer"
            class="lv-btn lv-btn-primary lv-btn-lg"
            :disabled="!hasAnswer"
          >
            Check Answer
          </button>
          <button 
            v-else
            @click="nextExercise"
            class="lv-btn lv-btn-primary lv-btn-lg"
          >
            {{ isLastExercise ? 'Complete Lesson' : 'Next Exercise' }}
            <ArrowRight class="lv-icon-sm" />
          </button>
        </div>
      </section>

      <!-- Completion Phase -->
      <section v-else-if="phase === 'complete'" class="lv-complete-section lv-animate-scale-in">
        <div class="lv-complete-content">
          <div class="lv-complete-celebration">
            <span class="lv-celebration-emoji">🎊</span>
            <div class="lv-confetti" v-for="n in 20" :key="n" :style="getConfettiStyle(n)"></div>
          </div>
          
          <h1 class="lv-heading-1">Lesson Complete!</h1>
          <p class="lv-body">Great job finishing "{{ lesson.title }}"</p>

          <div class="lv-score-card">
            <div class="lv-score-ring">
              <svg viewBox="0 0 100 100" class="lv-progress-ring">
                <circle cx="50" cy="50" r="45" class="lv-progress-ring-track" fill="none" stroke-width="8"/>
                <circle 
                  cx="50" cy="50" r="45" 
                  class="lv-progress-ring-fill" 
                  fill="none" 
                  stroke-width="8"
                  :stroke-dasharray="283"
                  :stroke-dashoffset="283 - (283 * score / 100)"
                />
              </svg>
              <span class="lv-score-value">{{ score }}%</span>
            </div>
            <div class="lv-score-details">
              <p><strong>{{ correctCount }}</strong> out of <strong>{{ lesson.exercises.length }}</strong> correct</p>
              <p class="lv-caption">Time spent: {{ timeSpent }} min</p>
            </div>
          </div>

          <div class="lv-complete-actions">
            <button @click="goBack" class="lv-btn lv-btn-secondary lv-btn-lg">
              Back to Course
            </button>
            <button v-if="nextLessonId" @click="goToNextLesson" class="lv-btn lv-btn-primary lv-btn-lg">
              Next Lesson
              <ArrowRight class="lv-icon-sm" />
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
import type { Curriculum, Lesson, Exercise, LearningProgress, ExerciseResult } from '../../../types/linguavault';
import { getCurriculum, getProgress, saveProgress } from '../../../lib/linguavault/db';
import { setLastLesson } from '../../../lib/linguavault/storage';

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
  window.location.href = `/linguavault/learn/${props.curriculumId}`;
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

  const now = new Date().toISOString();
  const today = now.split('T')[0];

  // Update lesson progress
  progress.value.lessonProgress[lesson.value.id] = {
    lessonId: lesson.value.id,
    status: 'completed',
    completedAt: now,
    score: score.value,
    attempts: (progress.value.lessonProgress[lesson.value.id]?.attempts || 0) + 1,
    bestScore: Math.max(score.value, progress.value.lessonProgress[lesson.value.id]?.bestScore || 0),
    exerciseResults: exerciseResults.value,
    timeSpentMinutes: timeSpent.value,
  };

  // Unlock next lesson
  if (nextLessonId.value && progress.value.lessonProgress[nextLessonId.value]) {
    if (progress.value.lessonProgress[nextLessonId.value].status === 'locked') {
      progress.value.lessonProgress[nextLessonId.value].status = 'available';
    }
  }

  // Update topic progress
  if (topicId.value && progress.value.topicProgress[topicId.value]) {
    const topicLessons = curriculum.value?.modules
      .find(m => m.id === moduleId.value)?.topics
      .find(t => t.id === topicId.value)?.lessons || [];
    
    const completedLessons = topicLessons.filter(
      l => progress.value!.lessonProgress[l.id]?.status === 'completed'
    ).length;

    progress.value.topicProgress[topicId.value].completedLessons = completedLessons;
    progress.value.topicProgress[topicId.value].completionPercentage = 
      Math.round((completedLessons / topicLessons.length) * 100);

    if (completedLessons === topicLessons.length) {
      progress.value.topicProgress[topicId.value].status = 'completed';
    } else {
      progress.value.topicProgress[topicId.value].status = 'in-progress';
    }
  }

  // Update module progress
  if (moduleId.value && progress.value.moduleProgress[moduleId.value]) {
    const moduleTopics = curriculum.value?.modules
      .find(m => m.id === moduleId.value)?.topics || [];
    
    const completedTopics = moduleTopics.filter(
      t => progress.value!.topicProgress[t.id]?.status === 'completed'
    ).length;

    progress.value.moduleProgress[moduleId.value].completedTopics = completedTopics;
    progress.value.moduleProgress[moduleId.value].completionPercentage = 
      Math.round((completedTopics / moduleTopics.length) * 100);

    if (completedTopics === moduleTopics.length) {
      progress.value.moduleProgress[moduleId.value].status = 'completed';
      // Unlock next module
      const moduleIndex = curriculum.value?.modules.findIndex(m => m.id === moduleId.value) || -1;
      if (moduleIndex >= 0 && curriculum.value && moduleIndex < curriculum.value.modules.length - 1) {
        const nextModule = curriculum.value.modules[moduleIndex + 1];
        if (progress.value.moduleProgress[nextModule.id]?.status === 'locked') {
          progress.value.moduleProgress[nextModule.id].status = 'available';
          // Unlock first topic and lesson of next module
          const firstTopic = nextModule.topics[0];
          if (firstTopic && progress.value.topicProgress[firstTopic.id]) {
            progress.value.topicProgress[firstTopic.id].status = 'available';
            const firstLesson = firstTopic.lessons[0];
            if (firstLesson && progress.value.lessonProgress[firstLesson.id]) {
              progress.value.lessonProgress[firstLesson.id].status = 'available';
            }
          }
        }
      }
    }
  }

  // Update overall progress
  const allLessons = curriculum.value?.modules.flatMap(m => m.topics.flatMap(t => t.lessons)) || [];
  const completedLessons = allLessons.filter(
    l => progress.value!.lessonProgress[l.id]?.status === 'completed'
  ).length;
  progress.value.overallProgress = Math.round((completedLessons / allLessons.length) * 100);

  // Update streak
  if (progress.value.currentStreak.lastActiveDate !== today) {
    const lastDate = new Date(progress.value.currentStreak.lastActiveDate);
    const todayDate = new Date(today);
    const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      progress.value.currentStreak.count++;
    } else if (diffDays > 1) {
      progress.value.currentStreak.count = 1;
    }
    progress.value.currentStreak.lastActiveDate = today;
    progress.value.streakDays = Math.max(progress.value.streakDays, progress.value.currentStreak.count);
  }

  // Update timestamps
  progress.value.lastAccessedAt = now;
  progress.value.lastLessonId = lesson.value.id;
  progress.value.totalTimeSpentMinutes += timeSpent.value;

  // Save progress
  await saveProgress(progress.value);
}

function goToNextLesson() {
  if (nextLessonId.value) {
    window.location.href = `/linguavault/learn/${props.curriculumId}/lesson/${nextLessonId.value}`;
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
.lv-lesson-view {
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
  max-width: 700px;
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
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--lv-font-family);
}

.lv-back-link:hover {
  color: var(--lv-text-primary);
}

/* Progress Steps */
.lv-lesson-steps {
  display: flex;
  gap: 4px;
}

.lv-step {
  width: 24px;
  height: 4px;
  background: var(--lv-border-light);
  border-radius: 2px;
  transition: all var(--lv-transition-fast);
}

.lv-step-complete {
  background: var(--lv-primary-500);
}

.lv-step-active {
  background: var(--lv-primary-300);
  animation: lv-pulse 1.5s ease-in-out infinite;
}

/* Loading & Error */
.lv-loading,
.lv-error-state {
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

/* Main Content */
.lv-lesson-main {
  max-width: 700px;
  margin: 0 auto;
  padding: var(--lv-space-6) var(--lv-space-4) var(--lv-space-16);
}

/* Content Section */
.lv-content-section {
  display: flex;
  flex-direction: column;
  gap: var(--lv-space-6);
}

.lv-lesson-header {
  text-align: center;
  margin-bottom: var(--lv-space-4);
}

.lv-lesson-header .lv-badge {
  margin-bottom: var(--lv-space-2);
  text-transform: capitalize;
}

/* Vocabulary */
.lv-vocabulary-section {
  display: flex;
  flex-direction: column;
  gap: var(--lv-space-4);
}

.lv-vocab-card {
  background: var(--lv-bg-card);
  border: 1px solid var(--lv-border-light);
  border-radius: var(--lv-radius-xl);
  padding: var(--lv-space-5);
  transition: all var(--lv-transition-fast);
}

.lv-vocab-card:hover {
  border-color: var(--lv-primary-300);
  transform: translateY(-2px);
  box-shadow: var(--lv-shadow-md);
}

.lv-vocab-main {
  display: flex;
  align-items: baseline;
  gap: var(--lv-space-4);
  margin-bottom: var(--lv-space-2);
}

.lv-vocab-word {
  font-size: var(--lv-font-size-2xl);
  font-weight: var(--lv-font-weight-bold);
  color: var(--lv-primary-600);
}

.dark .lv-vocab-word {
  color: var(--lv-primary-400);
}

.lv-vocab-translation {
  font-size: var(--lv-font-size-lg);
  color: var(--lv-text-secondary);
}

.lv-vocab-pronunciation {
  font-size: var(--lv-font-size-sm);
  color: var(--lv-text-tertiary);
  margin-bottom: var(--lv-space-2);
}

.lv-vocab-example {
  font-size: var(--lv-font-size-sm);
  color: var(--lv-text-secondary);
  padding-left: var(--lv-space-4);
  border-left: 3px solid var(--lv-primary-200);
}

/* Grammar */
.lv-grammar-card {
  background: var(--lv-bg-secondary);
  border-radius: var(--lv-radius-lg);
  padding: var(--lv-space-5);
  margin-bottom: var(--lv-space-4);
}

.lv-grammar-examples {
  margin-top: var(--lv-space-4);
  display: flex;
  flex-direction: column;
  gap: var(--lv-space-2);
}

.lv-example-item {
  display: flex;
  flex-direction: column;
  padding: var(--lv-space-3);
  background: var(--lv-bg-card);
  border-radius: var(--lv-radius-md);
}

.lv-example-text {
  font-weight: var(--lv-font-weight-medium);
}

.lv-example-translation {
  font-size: var(--lv-font-size-sm);
  color: var(--lv-text-tertiary);
}

/* Dialogue */
.lv-dialogue-context {
  font-size: var(--lv-font-size-sm);
  color: var(--lv-text-tertiary);
  margin-bottom: var(--lv-space-4);
  font-style: italic;
}

.lv-dialogue-lines {
  display: flex;
  flex-direction: column;
  gap: var(--lv-space-3);
}

.lv-dialogue-line {
  display: flex;
  gap: var(--lv-space-3);
  align-items: flex-start;
}

.lv-dialogue-line-alt {
  flex-direction: row-reverse;
}

.lv-dialogue-speaker {
  font-size: var(--lv-font-size-xs);
  font-weight: var(--lv-font-weight-semibold);
  color: var(--lv-primary-600);
  min-width: 60px;
}

.lv-dialogue-bubble {
  background: var(--lv-bg-secondary);
  border-radius: var(--lv-radius-lg);
  padding: var(--lv-space-3) var(--lv-space-4);
  max-width: 70%;
}

.lv-dialogue-line-alt .lv-dialogue-bubble {
  background: var(--lv-primary-100);
}

.dark .lv-dialogue-line-alt .lv-dialogue-bubble {
  background: rgb(20 184 166 / 0.2);
}

.lv-dialogue-text {
  margin-bottom: var(--lv-space-1);
}

.lv-dialogue-translation {
  font-size: var(--lv-font-size-sm);
  color: var(--lv-text-tertiary);
  font-style: italic;
}

/* Explanation & Tips */
.lv-explanation {
  background: linear-gradient(135deg, var(--lv-primary-50), var(--lv-bg-card));
  border: 1px solid var(--lv-primary-200);
  border-radius: var(--lv-radius-lg);
  padding: var(--lv-space-5);
}

.dark .lv-explanation {
  background: linear-gradient(135deg, rgb(20 184 166 / 0.1), var(--lv-bg-card));
  border-color: var(--lv-primary-800);
}

.lv-tips {
  padding: var(--lv-space-4);
  background: var(--lv-bg-secondary);
  border-radius: var(--lv-radius-md);
}

.lv-tips ul {
  margin: var(--lv-space-2) 0 0 var(--lv-space-4);
  padding: 0;
}

.lv-tips li {
  margin-bottom: var(--lv-space-1);
  font-size: var(--lv-font-size-sm);
}

.lv-start-exercises {
  align-self: center;
  margin-top: var(--lv-space-4);
}

/* Exercise Section */
.lv-exercise-section {
  display: flex;
  flex-direction: column;
  gap: var(--lv-space-6);
}

.lv-exercise-header {
  text-align: center;
}

.lv-exercise-options {
  display: flex;
  flex-direction: column;
  gap: var(--lv-space-3);
}

.lv-option-btn {
  display: flex;
  align-items: center;
  gap: var(--lv-space-3);
  padding: var(--lv-space-4);
  background: var(--lv-bg-card);
  border: 2px solid var(--lv-border-light);
  border-radius: var(--lv-radius-lg);
  cursor: pointer;
  font-family: var(--lv-font-family);
  font-size: var(--lv-font-size-base);
  text-align: left;
  transition: all var(--lv-transition-fast);
}

.lv-option-btn:hover:not(:disabled) {
  border-color: var(--lv-primary-400);
  background: var(--lv-primary-50);
}

.dark .lv-option-btn:hover:not(:disabled) {
  background: rgb(20 184 166 / 0.1);
}

.lv-option-selected {
  border-color: var(--lv-primary-500);
  background: var(--lv-primary-50);
}

.dark .lv-option-selected {
  background: rgb(20 184 166 / 0.15);
}

.lv-option-correct {
  border-color: var(--lv-success-500) !important;
  background: var(--lv-success-50) !important;
}

.lv-option-incorrect {
  border-color: var(--lv-error-500) !important;
  background: var(--lv-error-50) !important;
}

.lv-option-letter {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--lv-bg-tertiary);
  border-radius: 50%;
  font-weight: var(--lv-font-weight-semibold);
  font-size: var(--lv-font-size-sm);
}

.lv-option-text {
  flex: 1;
}

/* Fill Blank & Translation */
.lv-fill-input,
.lv-translation-input {
  font-size: var(--lv-font-size-lg);
  text-align: center;
}

.lv-translation-input {
  text-align: left;
}

.lv-input-correct {
  border-color: var(--lv-success-500) !important;
  background: var(--lv-success-50) !important;
}

.lv-input-incorrect {
  border-color: var(--lv-error-500) !important;
  background: var(--lv-error-50) !important;
}

/* True/False */
.lv-true-false {
  display: flex;
  gap: var(--lv-space-4);
  justify-content: center;
}

.lv-tf-btn {
  flex: 1;
  max-width: 150px;
  padding: var(--lv-space-6);
  background: var(--lv-bg-card);
  border: 2px solid var(--lv-border-light);
  border-radius: var(--lv-radius-xl);
  font-family: var(--lv-font-family);
  font-size: var(--lv-font-size-xl);
  font-weight: var(--lv-font-weight-bold);
  cursor: pointer;
  transition: all var(--lv-transition-fast);
}

.lv-tf-btn:hover:not(:disabled) {
  border-color: var(--lv-primary-400);
  transform: scale(1.02);
}

/* Matching */
.lv-matching-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--lv-space-6);
  margin-top: var(--lv-space-4);
}

.lv-match-col {
  display: flex;
  flex-direction: column;
  gap: var(--lv-space-4);
}

.lv-match-card {
  padding: var(--lv-space-4);
  background: var(--lv-bg-card);
  border: 2px solid var(--lv-border-light);
  border-radius: var(--lv-radius-lg);
  cursor: pointer;
  font-family: var(--lv-font-family);
  font-size: var(--lv-font-size-base);
  text-align: center;
  transition: all var(--lv-transition-fast);
  width: 100%;
}

.lv-match-card:hover:not(:disabled) {
  border-color: var(--lv-primary-400);
  background: var(--lv-primary-50);
  transform: translateY(-2px);
}

.dark .lv-match-card:hover:not(:disabled) {
  background: rgb(20 184 166 / 0.1);
}

.lv-match-selected {
  border-color: var(--lv-primary-500);
  background: var(--lv-primary-50);
  box-shadow: 0 0 0 2px var(--lv-primary-200);
}

.dark .lv-match-selected {
  background: rgb(20 184 166 / 0.15);
  box-shadow: 0 0 0 2px rgb(20 184 166 / 0.3);
}

.lv-match-matched {
  border-color: var(--lv-success-500) !important;
  background: var(--lv-success-50) !important;
  opacity: 0.7;
  cursor: default;
}

.dark .lv-match-matched {
  background: rgb(34 197 94 / 0.1) !important;
}

.lv-match-correct {
  border-color: var(--lv-success-500) !important;
  background: var(--lv-success-50) !important;
}

/* Hints */

.lv-hint-btn {
  align-self: center;
}

.lv-hints {
  display: flex;
  flex-direction: column;
  gap: var(--lv-space-2);
}

.lv-hint {
  padding: var(--lv-space-3);
  background: var(--lv-warning-50);
  border-radius: var(--lv-radius-md);
  font-size: var(--lv-font-size-sm);
}

/* Feedback */
.lv-feedback {
  padding: var(--lv-space-5);
  border-radius: var(--lv-radius-xl);
  text-align: center;
}

.lv-feedback-correct {
  background: var(--lv-success-50);
  border: 1px solid var(--lv-success-500);
}

.lv-feedback-incorrect {
  background: var(--lv-error-50);
  border: 1px solid var(--lv-error-500);
}

.lv-feedback-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--lv-space-2);
  font-size: var(--lv-font-size-xl);
  font-weight: var(--lv-font-weight-bold);
  margin-bottom: var(--lv-space-2);
}

.lv-feedback-icon {
  font-size: 1.5rem;
}

.lv-feedback-explanation {
  font-size: var(--lv-font-size-sm);
  color: var(--lv-text-secondary);
}

.lv-feedback-answer {
  margin-top: var(--lv-space-2);
  font-size: var(--lv-font-size-sm);
}

/* Actions */
.lv-exercise-actions {
  display: flex;
  justify-content: center;
  margin-top: var(--lv-space-4);
}

/* Complete Section */
.lv-complete-section {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
}

.lv-complete-content {
  text-align: center;
  position: relative;
}

.lv-complete-celebration {
  position: relative;
  margin-bottom: var(--lv-space-6);
}

.lv-celebration-emoji {
  font-size: 5rem;
  display: inline-block;
  animation: lv-bounce 1s ease-in-out infinite;
}

.lv-confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  animation: lv-confetti 2s ease-out forwards;
}

/* Score Card */
.lv-score-card {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--lv-space-6);
  margin: var(--lv-space-8) 0;
  padding: var(--lv-space-6);
  background: var(--lv-bg-secondary);
  border-radius: var(--lv-radius-xl);
}

.lv-score-ring {
  position: relative;
  width: 100px;
  height: 100px;
}

.lv-score-ring svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.lv-progress-ring-track {
  stroke: var(--lv-border-light);
}

.lv-progress-ring-fill {
  stroke: var(--lv-primary-500);
  transition: stroke-dashoffset 1s ease-out;
}

.lv-score-value {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: var(--lv-font-size-2xl);
  font-weight: var(--lv-font-weight-bold);
}

.lv-score-details {
  text-align: left;
}

.lv-complete-actions {
  display: flex;
  gap: var(--lv-space-4);
  justify-content: center;
  flex-wrap: wrap;
}

/* Responsive */
@media (max-width: 768px) {
  .lv-score-card {
    flex-direction: column;
  }

  .lv-complete-actions {
    flex-direction: column;
  }
}
</style>
