/* empty css                                              */
import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate } from '../../../../../chunks/astro/server_BMOK3aS7.mjs';
import 'piccolore';
import { g as getCurriculum, a as getProgress, s as setLastLesson, b as saveProgress, $ as $$LinguaVaultLayout } from '../../../../../chunks/storage_CSUZg2_w.mjs';
import { defineComponent, useSSRContext, ref, computed, onMounted, mergeProps } from 'vue';
import { RotateCw, ArrowRight, AlertCircle, PartyPopper, Lightbulb, X, Check, Play, MapPin, Volume2, Moon, Sun, ArrowLeft } from 'lucide-vue-next';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrIncludeBooleanAttr, ssrRenderAttr } from 'vue/server-renderer';
/* empty css                                                  */
import { _ as _export_sfc } from '../../../../../chunks/_plugin-vue_export-helper_pcqpp-6-.mjs';
export { renderers } from '../../../../../renderers.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LVLessonView",
  props: {
    curriculumId: {},
    lessonId: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const isLoading = ref(true);
    const isDark = ref(false);
    const error = ref(null);
    const curriculum = ref(null);
    const lesson = ref(null);
    const progress = ref(null);
    const phase = ref("content");
    const currentExerciseIndex = ref(0);
    const selectedAnswer = ref(null);
    const textAnswer = ref("");
    const showResult = ref(false);
    const exerciseResults = ref({});
    const hintsShown = ref(0);
    const startTime = ref(Date.now());
    const selectedMatchLeft = ref(null);
    const selectedMatchRight = ref(null);
    const matchedPairs = ref({});
    const matchingLeftItems = ref([]);
    const matchingRightItems = ref([]);
    const moduleId = ref(null);
    const topicId = ref(null);
    const nextLessonId = ref(null);
    const totalSteps = computed(() => {
      if (!lesson.value) return 0;
      return 1 + lesson.value.exercises.length;
    });
    const currentStep = computed(() => {
      if (phase.value === "content") return 0;
      if (phase.value === "complete") return totalSteps.value;
      return 1 + currentExerciseIndex.value;
    });
    const currentExercise = computed(() => {
      if (!lesson.value || currentExerciseIndex.value >= lesson.value.exercises.length) return null;
      return lesson.value.exercises[currentExerciseIndex.value];
    });
    const hasAnswer = computed(() => {
      if (currentExercise.value?.type === "fill-blank" || currentExercise.value?.type === "translation") {
        return textAnswer.value.trim().length > 0;
      }
      if (currentExercise.value?.type === "matching") {
        if (!currentExercise.value.correctAnswer) return false;
        let totalPairs = 0;
        if (Array.isArray(currentExercise.value.correctAnswer)) {
          totalPairs = currentExercise.value.correctAnswer.length;
        } else if (typeof currentExercise.value.correctAnswer === "object") {
          totalPairs = Object.keys(currentExercise.value.correctAnswer).length;
        }
        return Object.keys(matchedPairs.value).length === totalPairs;
      }
      return selectedAnswer.value !== null;
    });
    const isCorrect = computed(() => {
      if (!currentExercise.value) return false;
      const correct = currentExercise.value.correctAnswer;
      if (currentExercise.value.type === "fill-blank" || currentExercise.value.type === "translation") {
        const userAnswer = textAnswer.value.trim().toLowerCase();
        if (Array.isArray(correct)) {
          return correct.some((c) => c.toLowerCase() === userAnswer);
        }
        return userAnswer === String(correct).toLowerCase();
      }
      if (currentExercise.value.type === "true-false") {
        return selectedAnswer.value?.toLowerCase() === String(correct).toLowerCase();
      }
      if (currentExercise.value.type === "matching") {
        let correctMap = {};
        if (Array.isArray(correct)) {
          return false;
        } else {
          correctMap = correct;
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
      return Object.values(exerciseResults.value).filter((r) => r.correct).length;
    });
    const score = computed(() => {
      if (!lesson.value || lesson.value.exercises.length === 0) return 100;
      return Math.round(correctCount.value / lesson.value.exercises.length * 100);
    });
    const timeSpent = computed(() => {
      return Math.round((Date.now() - startTime.value) / 6e4);
    });
    function toggleTheme() {
      isDark.value = !isDark.value;
      document.documentElement.classList.toggle("dark", isDark.value);
      localStorage.setItem("theme", isDark.value ? "dark" : "light");
    }
    function goBack() {
      window.location.href = `/linguavault/learn/${props.curriculumId}`;
    }
    function startExercises() {
      if (!lesson.value?.exercises.length) {
        phase.value = "complete";
        completeLesson();
        return;
      }
      phase.value = "exercise";
      currentExerciseIndex.value = 0;
      resetExerciseState();
    }
    function resetExerciseState() {
      selectedAnswer.value = null;
      textAnswer.value = "";
      showResult.value = false;
      hintsShown.value = 0;
      selectedMatchLeft.value = null;
      selectedMatchRight.value = null;
      matchedPairs.value = {};
      if (currentExercise.value?.type === "matching") {
        initMatchingItems();
      }
    }
    function initMatchingItems() {
      if (!currentExercise.value) return;
      const correct = currentExercise.value.correctAnswer;
      if (typeof correct === "object" && !Array.isArray(correct)) {
        const map = correct;
        matchingLeftItems.value = Object.keys(map);
        matchingRightItems.value = Object.values(map).sort(() => Math.random() - 0.5);
      }
    }
    function selectMatchItem(side, item) {
      if (showResult.value) return;
      if (side === "left") {
        if (isMatched(item)) return;
        selectedMatchLeft.value = item;
      } else {
        if (isRightMatched(item)) return;
        selectedMatchRight.value = item;
      }
      if (selectedMatchLeft.value && selectedMatchRight.value) {
        matchedPairs.value[selectedMatchLeft.value] = selectedMatchRight.value;
        selectedMatchLeft.value = null;
        selectedMatchRight.value = null;
      }
    }
    function isMatched(leftItem) {
      return !!matchedPairs.value[leftItem];
    }
    function isRightMatched(rightItem) {
      return Object.values(matchedPairs.value).includes(rightItem);
    }
    function selectAnswer(answer) {
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
      const result = {
        exerciseId: currentExercise.value.id,
        correct: isCorrect.value,
        userAnswer: currentExercise.value.type === "fill-blank" || currentExercise.value.type === "translation" ? textAnswer.value : currentExercise.value.type === "matching" ? JSON.stringify(matchedPairs.value) : selectedAnswer.value || "",
        attemptedAt: (/* @__PURE__ */ new Date()).toISOString(),
        timeSpentSeconds: Math.round((Date.now() - startTime.value) / 1e3),
        hintsUsed: hintsShown.value
      };
      exerciseResults.value[currentExercise.value.id] = result;
    }
    function nextExercise() {
      if (isLastExercise.value) {
        phase.value = "complete";
        completeLesson();
      } else {
        currentExerciseIndex.value++;
        resetExerciseState();
      }
    }
    async function completeLesson() {
      if (!progress.value || !lesson.value) return;
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const today = now.split("T")[0];
      progress.value.lessonProgress[lesson.value.id] = {
        lessonId: lesson.value.id,
        status: "completed",
        completedAt: now,
        score: score.value,
        attempts: (progress.value.lessonProgress[lesson.value.id]?.attempts || 0) + 1,
        bestScore: Math.max(score.value, progress.value.lessonProgress[lesson.value.id]?.bestScore || 0),
        exerciseResults: exerciseResults.value,
        timeSpentMinutes: timeSpent.value
      };
      if (nextLessonId.value && progress.value.lessonProgress[nextLessonId.value]) {
        if (progress.value.lessonProgress[nextLessonId.value].status === "locked") {
          progress.value.lessonProgress[nextLessonId.value].status = "available";
        }
      }
      if (topicId.value && progress.value.topicProgress[topicId.value]) {
        const topicLessons = curriculum.value?.modules.find((m) => m.id === moduleId.value)?.topics.find((t) => t.id === topicId.value)?.lessons || [];
        const completedLessons2 = topicLessons.filter(
          (l) => progress.value.lessonProgress[l.id]?.status === "completed"
        ).length;
        progress.value.topicProgress[topicId.value].completedLessons = completedLessons2;
        progress.value.topicProgress[topicId.value].completionPercentage = Math.round(completedLessons2 / topicLessons.length * 100);
        if (completedLessons2 === topicLessons.length) {
          progress.value.topicProgress[topicId.value].status = "completed";
        } else {
          progress.value.topicProgress[topicId.value].status = "in-progress";
        }
      }
      if (moduleId.value && progress.value.moduleProgress[moduleId.value]) {
        const moduleTopics = curriculum.value?.modules.find((m) => m.id === moduleId.value)?.topics || [];
        const completedTopics = moduleTopics.filter(
          (t) => progress.value.topicProgress[t.id]?.status === "completed"
        ).length;
        progress.value.moduleProgress[moduleId.value].completedTopics = completedTopics;
        progress.value.moduleProgress[moduleId.value].completionPercentage = Math.round(completedTopics / moduleTopics.length * 100);
        if (completedTopics === moduleTopics.length) {
          progress.value.moduleProgress[moduleId.value].status = "completed";
          const moduleIndex = curriculum.value?.modules.findIndex((m) => m.id === moduleId.value) || -1;
          if (moduleIndex >= 0 && curriculum.value && moduleIndex < curriculum.value.modules.length - 1) {
            const nextModule = curriculum.value.modules[moduleIndex + 1];
            if (progress.value.moduleProgress[nextModule.id]?.status === "locked") {
              progress.value.moduleProgress[nextModule.id].status = "available";
              const firstTopic = nextModule.topics[0];
              if (firstTopic && progress.value.topicProgress[firstTopic.id]) {
                progress.value.topicProgress[firstTopic.id].status = "available";
                const firstLesson = firstTopic.lessons[0];
                if (firstLesson && progress.value.lessonProgress[firstLesson.id]) {
                  progress.value.lessonProgress[firstLesson.id].status = "available";
                }
              }
            }
          }
        }
      }
      const allLessons = curriculum.value?.modules.flatMap((m) => m.topics.flatMap((t) => t.lessons)) || [];
      const completedLessons = allLessons.filter(
        (l) => progress.value.lessonProgress[l.id]?.status === "completed"
      ).length;
      progress.value.overallProgress = Math.round(completedLessons / allLessons.length * 100);
      if (progress.value.currentStreak.lastActiveDate !== today) {
        const lastDate = new Date(progress.value.currentStreak.lastActiveDate);
        const todayDate = new Date(today);
        const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1e3 * 60 * 60 * 24));
        if (diffDays === 1) {
          progress.value.currentStreak.count++;
        } else if (diffDays > 1) {
          progress.value.currentStreak.count = 1;
        }
        progress.value.currentStreak.lastActiveDate = today;
        progress.value.streakDays = Math.max(progress.value.streakDays, progress.value.currentStreak.count);
      }
      progress.value.lastAccessedAt = now;
      progress.value.lastLessonId = lesson.value.id;
      progress.value.totalTimeSpentMinutes += timeSpent.value;
      await saveProgress(progress.value);
    }
    function goToNextLesson() {
      if (nextLessonId.value) {
        window.location.href = `/linguavault/learn/${props.curriculumId}/lesson/${nextLessonId.value}`;
      }
    }
    function getConfettiStyle(n) {
      const colors = ["#14b8a6", "#f97316", "#22c55e", "#8b5cf6", "#ef4444", "#3b82f6"];
      return {
        left: `${Math.random() * 100}%`,
        backgroundColor: colors[n % colors.length],
        animationDelay: `${Math.random() * 0.5}s`,
        animationDuration: `${1 + Math.random()}s`
      };
    }
    onMounted(async () => {
      isDark.value = document.documentElement.classList.contains("dark");
      startTime.value = Date.now();
      try {
        const curriculumData = await getCurriculum(props.curriculumId);
        if (!curriculumData) {
          error.value = "Could not find this curriculum.";
          return;
        }
        curriculum.value = curriculumData;
        for (const mod of curriculumData.modules) {
          for (const topic of mod.topics) {
            const lessonIndex = topic.lessons.findIndex((l) => l.id === props.lessonId);
            if (lessonIndex >= 0) {
              lesson.value = topic.lessons[lessonIndex];
              moduleId.value = mod.id;
              topicId.value = topic.id;
              if (lessonIndex < topic.lessons.length - 1) {
                nextLessonId.value = topic.lessons[lessonIndex + 1].id;
              } else {
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
          error.value = "Could not find this lesson.";
          return;
        }
        const progressData = await getProgress(props.curriculumId);
        progress.value = progressData || null;
        if (moduleId.value && topicId.value) {
          setLastLesson({
            curriculumId: props.curriculumId,
            moduleId: moduleId.value,
            topicId: topicId.value,
            lessonId: props.lessonId
          });
        }
      } catch (err) {
        error.value = "Failed to load lesson data.";
        console.error(err);
      } finally {
        isLoading.value = false;
      }
    });
    const __returned__ = { props, isLoading, isDark, error, curriculum, lesson, progress, phase, currentExerciseIndex, selectedAnswer, textAnswer, showResult, exerciseResults, hintsShown, startTime, selectedMatchLeft, selectedMatchRight, matchedPairs, matchingLeftItems, matchingRightItems, moduleId, topicId, nextLessonId, totalSteps, currentStep, currentExercise, hasAnswer, isCorrect, isLastExercise, visibleHints, correctCount, score, timeSpent, toggleTheme, goBack, startExercises, resetExerciseState, initMatchingItems, selectMatchItem, isMatched, isRightMatched, selectAnswer, showHint, checkAnswer, nextExercise, completeLesson, goToNextLesson, getConfettiStyle, get ArrowLeft() {
      return ArrowLeft;
    }, get Sun() {
      return Sun;
    }, get Moon() {
      return Moon;
    }, get Volume2() {
      return Volume2;
    }, get MapPin() {
      return MapPin;
    }, get Play() {
      return Play;
    }, get Check() {
      return Check;
    }, get X() {
      return X;
    }, get Lightbulb() {
      return Lightbulb;
    }, get PartyPopper() {
      return PartyPopper;
    }, get AlertCircle() {
      return AlertCircle;
    }, get ArrowRight() {
      return ArrowRight;
    }, get RotateCw() {
      return RotateCw;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "lv-lesson-view" }, _attrs))} data-v-6bc24495><header class="lv-header" data-v-6bc24495><div class="lv-header-content" data-v-6bc24495><button class="lv-back-link" data-v-6bc24495>`);
  _push(ssrRenderComponent($setup["ArrowLeft"], { class: "lv-icon-sm" }, null, _parent));
  _push(`<span data-v-6bc24495>Back</span></button>`);
  if ($setup.lesson) {
    _push(`<div class="lv-lesson-steps" data-v-6bc24495><!--[-->`);
    ssrRenderList($setup.totalSteps, (step, index) => {
      _push(`<div class="${ssrRenderClass([{
        "lv-step-complete": index < $setup.currentStep,
        "lv-step-active": index === $setup.currentStep
      }, "lv-step"])}" data-v-6bc24495></div>`);
    });
    _push(`<!--]--></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<button class="lv-btn lv-btn-ghost lv-btn-icon" title="Toggle theme" data-v-6bc24495>`);
  if ($setup.isDark) {
    _push(ssrRenderComponent($setup["Sun"], { class: "lv-icon-sm" }, null, _parent));
  } else {
    _push(ssrRenderComponent($setup["Moon"], { class: "lv-icon-sm" }, null, _parent));
  }
  _push(`</button></div></header>`);
  if ($setup.isLoading) {
    _push(`<div class="lv-loading" data-v-6bc24495><div class="lv-loading-spinner" data-v-6bc24495></div><p data-v-6bc24495>Loading lesson...</p></div>`);
  } else if ($setup.error) {
    _push(`<div class="lv-error-state" data-v-6bc24495><div class="lv-error-icon" data-v-6bc24495>\u{1F615}</div><h2 data-v-6bc24495>Lesson Not Found</h2><p data-v-6bc24495>${ssrInterpolate($setup.error)}</p><button class="lv-btn lv-btn-primary" data-v-6bc24495>Go Back</button></div>`);
  } else if ($setup.lesson) {
    _push(`<div class="lv-lesson-main" data-v-6bc24495>`);
    if ($setup.phase === "content") {
      _push(`<section class="lv-content-section lv-animate-fade-in" data-v-6bc24495><div class="lv-lesson-header" data-v-6bc24495><span class="lv-badge lv-badge-primary" data-v-6bc24495>${ssrInterpolate($setup.lesson.type)}</span><h1 class="lv-heading-2" data-v-6bc24495>${ssrInterpolate($setup.lesson.title)}</h1></div>`);
      if ($setup.lesson.content.vocabulary) {
        _push(`<div class="lv-vocabulary-section" data-v-6bc24495><!--[-->`);
        ssrRenderList($setup.lesson.content.vocabulary, (item, index) => {
          _push(`<div class="lv-vocab-card lv-animate-slide-up" style="${ssrRenderStyle({ animationDelay: index * 0.1 + "s" })}" data-v-6bc24495><div class="lv-vocab-main" data-v-6bc24495><span class="lv-vocab-word" data-v-6bc24495>${ssrInterpolate(item.word)}</span><span class="lv-vocab-translation" data-v-6bc24495>${ssrInterpolate(item.translation)}</span></div>`);
          if (item.pronunciation) {
            _push(`<div class="lv-vocab-pronunciation" data-v-6bc24495>`);
            _push(ssrRenderComponent($setup["Volume2"], { class: "lv-icon-sm" }, null, _parent));
            _push(` ${ssrInterpolate(item.pronunciation)}</div>`);
          } else {
            _push(`<!---->`);
          }
          if (item.exampleSentence) {
            _push(`<p class="lv-vocab-example" data-v-6bc24495><em data-v-6bc24495>&quot;${ssrInterpolate(item.exampleSentence)}&quot;</em>`);
            if (item.exampleTranslation) {
              _push(`<span class="lv-caption" data-v-6bc24495>${ssrInterpolate(item.exampleTranslation)}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if ($setup.lesson.content.grammarRules) {
        _push(`<div class="lv-grammar-section" data-v-6bc24495><!--[-->`);
        ssrRenderList($setup.lesson.content.grammarRules, (rule, index) => {
          _push(`<div class="lv-grammar-card" data-v-6bc24495><h3 class="lv-heading-4" data-v-6bc24495>${ssrInterpolate(rule.rule)}</h3><p class="lv-body" data-v-6bc24495>${ssrInterpolate(rule.explanation)}</p>`);
          if (rule.examples) {
            _push(`<div class="lv-grammar-examples" data-v-6bc24495><!--[-->`);
            ssrRenderList(rule.examples, (example, i) => {
              _push(`<div class="lv-example-item" data-v-6bc24495><span class="lv-example-text" data-v-6bc24495>${ssrInterpolate(example.text)}</span><span class="lv-example-translation" data-v-6bc24495>${ssrInterpolate(example.translation)}</span></div>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if ($setup.lesson.content.dialogues) {
        _push(`<div class="lv-dialogue-section" data-v-6bc24495><!--[-->`);
        ssrRenderList($setup.lesson.content.dialogues, (dialogue, dIndex) => {
          _push(`<div class="lv-dialogue" data-v-6bc24495>`);
          if (dialogue.context) {
            _push(`<p class="lv-dialogue-context" data-v-6bc24495>`);
            _push(ssrRenderComponent($setup["MapPin"], { class: "lv-icon-xs" }, null, _parent));
            _push(` ${ssrInterpolate(dialogue.context)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="lv-dialogue-lines" data-v-6bc24495><!--[-->`);
          ssrRenderList(dialogue.lines, (line, lIndex) => {
            _push(`<div class="${ssrRenderClass([{ "lv-dialogue-line-alt": lIndex % 2 === 1 }, "lv-dialogue-line"])}" data-v-6bc24495><span class="lv-dialogue-speaker" data-v-6bc24495>${ssrInterpolate(line.speaker)}</span><div class="lv-dialogue-bubble" data-v-6bc24495><p class="lv-dialogue-text" data-v-6bc24495>${ssrInterpolate(line.text)}</p><p class="lv-dialogue-translation" data-v-6bc24495>${ssrInterpolate(line.translation)}</p></div></div>`);
          });
          _push(`<!--]--></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if ($setup.lesson.content.explanation) {
        _push(`<div class="lv-explanation" data-v-6bc24495><h3 class="lv-heading-4" data-v-6bc24495>\u{1F4A1} Key Points</h3><p class="lv-body" data-v-6bc24495>${ssrInterpolate($setup.lesson.content.explanation)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if ($setup.lesson.content.tips?.length) {
        _push(`<div class="lv-tips" data-v-6bc24495><h4 class="lv-body-sm" data-v-6bc24495>Pro Tips:</h4><ul data-v-6bc24495><!--[-->`);
        ssrRenderList($setup.lesson.content.tips, (tip, index) => {
          _push(`<li data-v-6bc24495>${ssrInterpolate(tip)}</li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="lv-btn lv-btn-primary lv-btn-lg lv-start-exercises" data-v-6bc24495> Start Practice `);
      _push(ssrRenderComponent($setup["Play"], { class: "lv-icon-sm" }, null, _parent));
      _push(`</button></section>`);
    } else if ($setup.phase === "exercise") {
      _push(`<section class="lv-exercise-section lv-animate-fade-in" data-v-6bc24495><div class="lv-exercise-header" data-v-6bc24495><span class="lv-caption" data-v-6bc24495>Exercise ${ssrInterpolate($setup.currentExerciseIndex + 1)} of ${ssrInterpolate($setup.lesson.exercises.length)}</span><h2 class="lv-heading-3" data-v-6bc24495>${ssrInterpolate($setup.currentExercise?.prompt)}</h2>`);
      if ($setup.currentExercise?.instruction) {
        _push(`<p class="lv-body-sm" data-v-6bc24495>${ssrInterpolate($setup.currentExercise.instruction)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if ($setup.currentExercise?.type === "multiple-choice") {
        _push(`<div class="lv-exercise-options" data-v-6bc24495><!--[-->`);
        ssrRenderList($setup.currentExercise.options, (option, index) => {
          _push(`<button class="${ssrRenderClass([{
            "lv-option-selected": $setup.selectedAnswer === option,
            "lv-option-correct": $setup.showResult && option === $setup.currentExercise.correctAnswer,
            "lv-option-incorrect": $setup.showResult && $setup.selectedAnswer === option && option !== $setup.currentExercise.correctAnswer
          }, "lv-option-btn"])}"${ssrIncludeBooleanAttr($setup.showResult) ? " disabled" : ""} data-v-6bc24495><span class="lv-option-letter" data-v-6bc24495>${ssrInterpolate(String.fromCharCode(65 + index))}</span><span class="lv-option-text" data-v-6bc24495>${ssrInterpolate(option)}</span>`);
          if ($setup.showResult && option === $setup.currentExercise.correctAnswer) {
            _push(ssrRenderComponent($setup["Check"], { class: "lv-icon-sm" }, null, _parent));
          } else if ($setup.showResult && $setup.selectedAnswer === option && option !== $setup.currentExercise.correctAnswer) {
            _push(ssrRenderComponent($setup["X"], { class: "lv-icon-sm" }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</button>`);
        });
        _push(`<!--]--></div>`);
      } else if ($setup.currentExercise?.type === "fill-blank") {
        _push(`<div class="lv-fill-blank" data-v-6bc24495><input${ssrRenderAttr("value", $setup.textAnswer)} type="text" class="${ssrRenderClass([{
          "lv-input-correct": $setup.showResult && $setup.isCorrect,
          "lv-input-incorrect": $setup.showResult && !$setup.isCorrect
        }, "lv-input lv-fill-input"])}" placeholder="Type your answer..."${ssrIncludeBooleanAttr($setup.showResult) ? " disabled" : ""} autofocus data-v-6bc24495></div>`);
      } else if ($setup.currentExercise?.type === "translation") {
        _push(`<div class="lv-translation" data-v-6bc24495><textarea class="${ssrRenderClass([{
          "lv-input-correct": $setup.showResult && $setup.isCorrect,
          "lv-input-incorrect": $setup.showResult && !$setup.isCorrect
        }, "lv-input lv-translation-input"])}" placeholder="Write your translation..." rows="3"${ssrIncludeBooleanAttr($setup.showResult) ? " disabled" : ""} data-v-6bc24495>${ssrInterpolate($setup.textAnswer)}</textarea></div>`);
      } else if ($setup.currentExercise?.type === "true-false") {
        _push(`<div class="lv-true-false" data-v-6bc24495><!--[-->`);
        ssrRenderList(["True", "False"], (option) => {
          _push(`<button class="${ssrRenderClass([{
            "lv-option-selected": $setup.selectedAnswer === option,
            "lv-option-correct": $setup.showResult && option.toLowerCase() === String($setup.currentExercise.correctAnswer).toLowerCase(),
            "lv-option-incorrect": $setup.showResult && $setup.selectedAnswer === option && option.toLowerCase() !== String($setup.currentExercise.correctAnswer).toLowerCase()
          }, "lv-tf-btn"])}"${ssrIncludeBooleanAttr($setup.showResult) ? " disabled" : ""} data-v-6bc24495>${ssrInterpolate(option)}</button>`);
        });
        _push(`<!--]--></div>`);
      } else if ($setup.currentExercise?.type === "matching") {
        _push(`<div class="lv-matching" data-v-6bc24495><p class="lv-body-sm lv-mb-4" data-v-6bc24495>Select a pair to match them.</p><div class="lv-matching-columns" data-v-6bc24495><div class="lv-match-col" data-v-6bc24495><!--[-->`);
        ssrRenderList($setup.matchingLeftItems, (item) => {
          _push(`<button class="${ssrRenderClass([{
            "lv-match-selected": $setup.selectedMatchLeft === item,
            "lv-match-matched": $setup.isMatched(item),
            "lv-match-correct": $setup.showResult
          }, "lv-match-card"])}"${ssrIncludeBooleanAttr($setup.showResult || $setup.isMatched(item)) ? " disabled" : ""} data-v-6bc24495>${ssrInterpolate(item)}</button>`);
        });
        _push(`<!--]--></div><div class="lv-match-col" data-v-6bc24495><!--[-->`);
        ssrRenderList($setup.matchingRightItems, (item) => {
          _push(`<button class="${ssrRenderClass([{
            "lv-match-selected": $setup.selectedMatchRight === item,
            "lv-match-matched": $setup.isRightMatched(item)
          }, "lv-match-card"])}"${ssrIncludeBooleanAttr($setup.showResult || $setup.isRightMatched(item)) ? " disabled" : ""} data-v-6bc24495>${ssrInterpolate(item)}</button>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if ($setup.currentExercise?.hints?.length && !$setup.showResult && $setup.hintsShown < $setup.currentExercise.hints.length) {
        _push(`<button class="lv-btn lv-btn-ghost lv-hint-btn" data-v-6bc24495>`);
        _push(ssrRenderComponent($setup["Lightbulb"], { class: "lv-icon-sm" }, null, _parent));
        _push(` Show Hint (${ssrInterpolate($setup.hintsShown)}/${ssrInterpolate($setup.currentExercise.hints.length)}) </button>`);
      } else {
        _push(`<!---->`);
      }
      if ($setup.visibleHints.length) {
        _push(`<div class="lv-hints" data-v-6bc24495><!--[-->`);
        ssrRenderList($setup.visibleHints, (hint, index) => {
          _push(`<p class="lv-hint" data-v-6bc24495>`);
          _push(ssrRenderComponent($setup["Lightbulb"], { class: "lv-icon-xs" }, null, _parent));
          _push(` ${ssrInterpolate(hint)}</p>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if ($setup.showResult) {
        _push(`<div class="${ssrRenderClass([$setup.isCorrect ? "lv-feedback-correct" : "lv-feedback-incorrect", "lv-feedback"])}" data-v-6bc24495><div class="lv-feedback-header" data-v-6bc24495>`);
        if ($setup.isCorrect) {
          _push(ssrRenderComponent($setup["PartyPopper"], { class: "lv-feedback-icon" }, null, _parent));
        } else {
          _push(ssrRenderComponent($setup["AlertCircle"], { class: "lv-feedback-icon" }, null, _parent));
        }
        _push(`<span data-v-6bc24495>${ssrInterpolate($setup.isCorrect ? "Correct!" : "Not quite right")}</span></div>`);
        if ($setup.currentExercise?.explanation) {
          _push(`<p class="lv-feedback-explanation" data-v-6bc24495>${ssrInterpolate($setup.currentExercise.explanation)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (!$setup.isCorrect) {
          _push(`<p class="lv-feedback-answer" data-v-6bc24495> Correct answer: <strong data-v-6bc24495>${ssrInterpolate($setup.currentExercise?.correctAnswer)}</strong></p>`);
        } else {
          _push(`<!---->`);
        }
        if (!$setup.isCorrect) {
          _push(`<button class="lv-btn lv-btn-secondary lv-mt-4" data-v-6bc24495>`);
          _push(ssrRenderComponent($setup["RotateCw"], { class: "lv-icon-sm" }, null, _parent));
          _push(` Try Again </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="lv-exercise-actions" data-v-6bc24495>`);
      if (!$setup.showResult) {
        _push(`<button class="lv-btn lv-btn-primary lv-btn-lg"${ssrIncludeBooleanAttr(!$setup.hasAnswer) ? " disabled" : ""} data-v-6bc24495> Check Answer </button>`);
      } else {
        _push(`<button class="lv-btn lv-btn-primary lv-btn-lg" data-v-6bc24495>${ssrInterpolate($setup.isLastExercise ? "Complete Lesson" : "Next Exercise")} `);
        _push(ssrRenderComponent($setup["ArrowRight"], { class: "lv-icon-sm" }, null, _parent));
        _push(`</button>`);
      }
      _push(`</div></section>`);
    } else if ($setup.phase === "complete") {
      _push(`<section class="lv-complete-section lv-animate-scale-in" data-v-6bc24495><div class="lv-complete-content" data-v-6bc24495><div class="lv-complete-celebration" data-v-6bc24495><span class="lv-celebration-emoji" data-v-6bc24495>\u{1F38A}</span><!--[-->`);
      ssrRenderList(20, (n) => {
        _push(`<div class="lv-confetti" style="${ssrRenderStyle($setup.getConfettiStyle(n))}" data-v-6bc24495></div>`);
      });
      _push(`<!--]--></div><h1 class="lv-heading-1" data-v-6bc24495>Lesson Complete!</h1><p class="lv-body" data-v-6bc24495>Great job finishing &quot;${ssrInterpolate($setup.lesson.title)}&quot;</p><div class="lv-score-card" data-v-6bc24495><div class="lv-score-ring" data-v-6bc24495><svg viewBox="0 0 100 100" class="lv-progress-ring" data-v-6bc24495><circle cx="50" cy="50" r="45" class="lv-progress-ring-track" fill="none" stroke-width="8" data-v-6bc24495></circle><circle cx="50" cy="50" r="45" class="lv-progress-ring-fill" fill="none" stroke-width="8"${ssrRenderAttr("stroke-dasharray", 283)}${ssrRenderAttr("stroke-dashoffset", 283 - 283 * $setup.score / 100)} data-v-6bc24495></circle></svg><span class="lv-score-value" data-v-6bc24495>${ssrInterpolate($setup.score)}%</span></div><div class="lv-score-details" data-v-6bc24495><p data-v-6bc24495><strong data-v-6bc24495>${ssrInterpolate($setup.correctCount)}</strong> out of <strong data-v-6bc24495>${ssrInterpolate($setup.lesson.exercises.length)}</strong> correct</p><p class="lv-caption" data-v-6bc24495>Time spent: ${ssrInterpolate($setup.timeSpent)} min</p></div></div><div class="lv-complete-actions" data-v-6bc24495><button class="lv-btn lv-btn-secondary lv-btn-lg" data-v-6bc24495> Back to Course </button>`);
      if ($setup.nextLessonId) {
        _push(`<button class="lv-btn lv-btn-primary lv-btn-lg" data-v-6bc24495> Next Lesson `);
        _push(ssrRenderComponent($setup["ArrowRight"], { class: "lv-icon-sm" }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></section>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/linguavault/learning/LVLessonView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const LVLessonView = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-6bc24495"]]);

const $$Astro = createAstro();
const prerender = false;
const $$lessonId = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$lessonId;
  const { curriculumId, lessonId } = Astro2.params;
  return renderTemplate`${renderComponent($$result, "LinguaVaultLayout", $$LinguaVaultLayout, { "title": "Lesson - LinguaVault", "description": "Language Lesson" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "LVLessonView", LVLessonView, { "curriculumId": curriculumId ?? "", "lessonId": lessonId ?? "", "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/ptriv/Projects/mayuresh-portfolio/src/components/linguavault/learning/LVLessonView.vue", "client:component-export": "default" })} ` })}`;
}, "C:/Users/ptriv/Projects/mayuresh-portfolio/src/pages/linguavault/learn/[curriculumId]/lesson/[lessonId].astro", void 0);

const $$file = "C:/Users/ptriv/Projects/mayuresh-portfolio/src/pages/linguavault/learn/[curriculumId]/lesson/[lessonId].astro";
const $$url = "/linguavault/learn/[curriculumId]/lesson/[lessonId]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$lessonId,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
