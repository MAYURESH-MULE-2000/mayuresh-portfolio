/* empty css                                        */
import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate } from '../../../chunks/astro/server_BMOK3aS7.mjs';
import 'piccolore';
import { c as getLastLesson, g as getCurriculum, a as getProgress, s as setLastLesson, $ as $$LinguaVaultLayout } from '../../../chunks/storage_CSUZg2_w.mjs';
import { defineComponent, useSSRContext, ref, computed, onMounted, mergeProps } from 'vue';
import { ArrowRight, MessageCircle, Pilcrow, Type, ChevronDown, Lock, Check, Play, Moon, Sun, ArrowLeft } from 'lucide-vue-next';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
/* empty css                                       */
import { _ as _export_sfc } from '../../../chunks/_plugin-vue_export-helper_pcqpp-6-.mjs';
export { renderers } from '../../../renderers.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LVCurriculumView",
  props: {
    curriculumId: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const isLoading = ref(true);
    const isDark = ref(false);
    const error = ref(null);
    const curriculum = ref(null);
    const progress = ref(null);
    const expandedModules = ref([]);
    const languageFlags = {
      en: "\u{1F1EC}\u{1F1E7}",
      es: "\u{1F1EA}\u{1F1F8}",
      fr: "\u{1F1EB}\u{1F1F7}",
      de: "\u{1F1E9}\u{1F1EA}",
      it: "\u{1F1EE}\u{1F1F9}",
      pt: "\u{1F1F5}\u{1F1F9}",
      ja: "\u{1F1EF}\u{1F1F5}",
      ko: "\u{1F1F0}\u{1F1F7}",
      zh: "\u{1F1E8}\u{1F1F3}",
      ru: "\u{1F1F7}\u{1F1FA}",
      ar: "\u{1F1F8}\u{1F1E6}",
      hi: "\u{1F1EE}\u{1F1F3}",
      nl: "\u{1F1F3}\u{1F1F1}",
      sv: "\u{1F1F8}\u{1F1EA}",
      no: "\u{1F1F3}\u{1F1F4}"
    };
    const totalLessons = computed(() => {
      if (!curriculum.value) return 0;
      let count = 0;
      curriculum.value.modules.forEach((mod) => {
        mod.topics.forEach((topic) => {
          count += topic.lessons.length;
        });
      });
      return count;
    });
    const lastLesson = computed(() => {
      const lastPointer = getLastLesson();
      if (!lastPointer || lastPointer.curriculumId !== props.curriculumId) return null;
      if (!curriculum.value) return null;
      for (const mod of curriculum.value.modules) {
        for (const topic of mod.topics) {
          const lesson = topic.lessons.find((l) => l.id === lastPointer.lessonId);
          if (lesson) return lesson;
        }
      }
      return null;
    });
    function getLanguageFlag(code) {
      return languageFlags[code?.toLowerCase()] || "\u{1F310}";
    }
    function toggleTheme() {
      isDark.value = !isDark.value;
      document.documentElement.classList.toggle("dark", isDark.value);
      localStorage.setItem("theme", isDark.value ? "dark" : "light");
    }
    function toggleModule(moduleId) {
      const index = expandedModules.value.indexOf(moduleId);
      if (index >= 0) {
        expandedModules.value.splice(index, 1);
      } else {
        expandedModules.value.push(moduleId);
      }
    }
    function isModuleLocked(moduleId) {
      if (!progress.value) return true;
      const modProgress = progress.value.moduleProgress[moduleId];
      return modProgress?.status === "locked";
    }
    function isModuleCompleted(moduleId) {
      if (!progress.value) return false;
      const modProgress = progress.value.moduleProgress[moduleId];
      return modProgress?.status === "completed";
    }
    function getModuleProgressText(moduleId) {
      if (!progress.value) return "";
      const modProgress = progress.value.moduleProgress[moduleId];
      if (!modProgress) return "";
      return `${modProgress.completedTopics}/${modProgress.totalTopics} topics`;
    }
    function getTopicProgressText(topicId) {
      if (!progress.value) return "";
      const topProgress = progress.value.topicProgress[topicId];
      if (!topProgress) return "";
      return `${topProgress.completedLessons}/${topProgress.totalLessons} lessons`;
    }
    function isLessonLocked(lessonId) {
      if (!progress.value) return true;
      const lessonProgress = progress.value.lessonProgress[lessonId];
      return lessonProgress?.status === "locked";
    }
    function isLessonAvailable(lessonId) {
      if (!progress.value) return false;
      const lessonProgress = progress.value.lessonProgress[lessonId];
      return lessonProgress?.status === "available" || lessonProgress?.status === "in-progress";
    }
    function isLessonCompleted(lessonId) {
      if (!progress.value) return false;
      const lessonProgress = progress.value.lessonProgress[lessonId];
      return lessonProgress?.status === "completed";
    }
    function openLesson(lessonId) {
      if (!curriculum.value) return;
      for (const mod of curriculum.value.modules) {
        for (const topic of mod.topics) {
          const lesson = topic.lessons.find((l) => l.id === lessonId);
          if (lesson) {
            setLastLesson({
              curriculumId: props.curriculumId,
              moduleId: mod.id,
              topicId: topic.id,
              lessonId: lesson.id
            });
            window.location.href = `/linguavault/learn/${props.curriculumId}/lesson/${lessonId}`;
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
    onMounted(async () => {
      isDark.value = document.documentElement.classList.contains("dark");
      try {
        const curriculumData = await getCurriculum(props.curriculumId);
        if (!curriculumData) {
          error.value = "Could not find this curriculum. It may have been deleted.";
          return;
        }
        curriculum.value = curriculumData;
        const progressData = await getProgress(props.curriculumId);
        progress.value = progressData || null;
        if (curriculum.value && progress.value) {
          for (const mod of curriculum.value.modules) {
            if (!isModuleLocked(mod.id) && !isModuleCompleted(mod.id)) {
              expandedModules.value.push(mod.id);
              break;
            }
          }
          if (expandedModules.value.length === 0 && curriculum.value.modules.length > 0) {
            expandedModules.value.push(curriculum.value.modules[0].id);
          }
        }
      } catch (err) {
        error.value = "Failed to load curriculum data.";
        console.error(err);
      } finally {
        isLoading.value = false;
      }
    });
    const __returned__ = { props, isLoading, isDark, error, curriculum, progress, expandedModules, languageFlags, totalLessons, lastLesson, getLanguageFlag, toggleTheme, toggleModule, isModuleLocked, isModuleCompleted, getModuleProgressText, getTopicProgressText, isLessonLocked, isLessonAvailable, isLessonCompleted, openLesson, resumeLastLesson, get ArrowLeft() {
      return ArrowLeft;
    }, get Sun() {
      return Sun;
    }, get Moon() {
      return Moon;
    }, get Play() {
      return Play;
    }, get Check() {
      return Check;
    }, get Lock() {
      return Lock;
    }, get ChevronDown() {
      return ChevronDown;
    }, get Type() {
      return Type;
    }, get Pilcrow() {
      return Pilcrow;
    }, get MessageCircle() {
      return MessageCircle;
    }, get ArrowRight() {
      return ArrowRight;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "lv-curriculum-view" }, _attrs))} data-v-88fadf3a><nav class="lv-nav" data-v-88fadf3a><div class="lv-nav-content" data-v-88fadf3a><a href="/linguavault" class="lv-back-link" data-v-88fadf3a>`);
  _push(ssrRenderComponent($setup["ArrowLeft"], { class: "lv-icon-sm" }, null, _parent));
  _push(`<span data-v-88fadf3a>Dashboard</span></a><div class="lv-nav-actions" data-v-88fadf3a><button class="lv-btn lv-btn-ghost lv-btn-icon" title="Toggle theme" data-v-88fadf3a>`);
  if ($setup.isDark) {
    _push(ssrRenderComponent($setup["Sun"], { class: "lv-icon-sm" }, null, _parent));
  } else {
    _push(ssrRenderComponent($setup["Moon"], { class: "lv-icon-sm" }, null, _parent));
  }
  _push(`</button></div></div></nav>`);
  if ($setup.isLoading) {
    _push(`<div class="lv-loading" data-v-88fadf3a><div class="lv-loading-spinner" data-v-88fadf3a></div><p data-v-88fadf3a>Loading curriculum...</p></div>`);
  } else if ($setup.error) {
    _push(`<div class="lv-error-state" data-v-88fadf3a><div class="lv-error-icon" data-v-88fadf3a>\u{1F615}</div><h2 data-v-88fadf3a>Curriculum Not Found</h2><p data-v-88fadf3a>${ssrInterpolate($setup.error)}</p><a href="/linguavault" class="lv-btn lv-btn-primary" data-v-88fadf3a>Back to Dashboard</a></div>`);
  } else if ($setup.curriculum) {
    _push(`<div class="lv-main" data-v-88fadf3a><section class="lv-hero" data-v-88fadf3a><div class="lv-hero-content" data-v-88fadf3a><div class="lv-hero-top" data-v-88fadf3a><span class="lv-hero-flag" data-v-88fadf3a>${ssrInterpolate($setup.getLanguageFlag($setup.curriculum.meta.targetLanguageCode))}</span><div class="lv-hero-badges" data-v-88fadf3a><span class="lv-badge lv-badge-primary" data-v-88fadf3a>${ssrInterpolate($setup.curriculum.meta.proficiencyLevel)}</span><span class="lv-badge lv-badge-secondary" data-v-88fadf3a>${ssrInterpolate($setup.curriculum.modules.length)} Modules</span></div></div><h1 class="lv-heading-1 lv-hero-title" data-v-88fadf3a>${ssrInterpolate($setup.curriculum.meta.title)}</h1><p class="lv-body lv-hero-desc" data-v-88fadf3a>${ssrInterpolate($setup.curriculum.meta.description)}</p><div class="lv-hero-footer" data-v-88fadf3a>`);
    if ($setup.progress) {
      _push(`<div class="lv-hero-progress-wrapper" data-v-88fadf3a><div class="lv-progress-bar" data-v-88fadf3a><div class="lv-progress-fill" style="${ssrRenderStyle({ width: $setup.progress.overallProgress + "%" })}" data-v-88fadf3a></div></div><span class="lv-caption" data-v-88fadf3a>${ssrInterpolate($setup.progress.overallProgress)}% Complete</span></div>`);
    } else {
      _push(`<!---->`);
    }
    if ($setup.lastLesson) {
      _push(`<button class="lv-btn lv-btn-primary lv-btn-lg lv-resume-btn" data-v-88fadf3a><span data-v-88fadf3a>Resume Learning</span>`);
      _push(ssrRenderComponent($setup["Play"], {
        class: "lv-icon-sm",
        fill: "currentColor"
      }, null, _parent));
      _push(`</button>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div></div></section><section class="lv-modules" data-v-88fadf3a><!--[-->`);
    ssrRenderList($setup.curriculum.modules, (module) => {
      _push(`<div class="${ssrRenderClass([{ "lv-module-locked": $setup.isModuleLocked(module.id), "lv-module-expanded": $setup.expandedModules.includes(module.id) }, "lv-module"])}" data-v-88fadf3a><button class="lv-module-header"${ssrIncludeBooleanAttr($setup.isModuleLocked(module.id)) ? " disabled" : ""} data-v-88fadf3a><div class="lv-module-status-icon" data-v-88fadf3a>`);
      if ($setup.isModuleCompleted(module.id)) {
        _push(ssrRenderComponent($setup["Check"], { class: "lv-icon-completed" }, null, _parent));
      } else if ($setup.isModuleLocked(module.id)) {
        _push(ssrRenderComponent($setup["Lock"], { class: "lv-icon-locked" }, null, _parent));
      } else {
        _push(`<span class="lv-icon-number" data-v-88fadf3a>${ssrInterpolate(module.order)}</span>`);
      }
      _push(`</div><div class="lv-module-info" data-v-88fadf3a><h3 class="lv-heading-4" data-v-88fadf3a>${ssrInterpolate(module.title)}</h3><p class="lv-caption" data-v-88fadf3a>${ssrInterpolate(module.description)}</p></div><div class="lv-module-end" data-v-88fadf3a><span class="lv-caption lv-hide-mobile" data-v-88fadf3a>${ssrInterpolate($setup.getModuleProgressText(module.id))}</span>`);
      _push(ssrRenderComponent($setup["ChevronDown"], {
        class: ["lv-chevron", { "lv-chevron-open": $setup.expandedModules.includes(module.id) }]
      }, null, _parent));
      _push(`</div></button>`);
      if ($setup.expandedModules.includes(module.id)) {
        _push(`<div class="lv-module-content lv-animate-fade-in" data-v-88fadf3a><!--[-->`);
        ssrRenderList(module.topics, (topic) => {
          _push(`<div class="lv-topic" data-v-88fadf3a><div class="lv-topic-header" data-v-88fadf3a><h4 class="lv-topic-title" data-v-88fadf3a>${ssrInterpolate(topic.title)}</h4></div><div class="lv-lessons-grid" data-v-88fadf3a><!--[-->`);
          ssrRenderList(topic.lessons, (lesson) => {
            _push(`<button class="${ssrRenderClass([{
              "lv-lesson-completed": $setup.isLessonCompleted(lesson.id),
              "lv-lesson-locked": $setup.isLessonLocked(lesson.id),
              "lv-lesson-active": $setup.isLessonAvailable(lesson.id) && !$setup.isLessonCompleted(lesson.id)
            }, "lv-lesson-card"])}"${ssrIncludeBooleanAttr($setup.isLessonLocked(lesson.id)) ? " disabled" : ""} data-v-88fadf3a><div class="lv-lesson-icon" data-v-88fadf3a>`);
            if ($setup.isLessonCompleted(lesson.id)) {
              _push(ssrRenderComponent($setup["Check"], { class: "lv-icon-sm" }, null, _parent));
            } else if (lesson.type === "vocabulary") {
              _push(ssrRenderComponent($setup["Type"], { class: "lv-icon-sm" }, null, _parent));
            } else if (lesson.type === "grammar") {
              _push(ssrRenderComponent($setup["Pilcrow"], { class: "lv-icon-sm" }, null, _parent));
            } else {
              _push(ssrRenderComponent($setup["MessageCircle"], { class: "lv-icon-sm" }, null, _parent));
            }
            _push(`</div><div class="lv-lesson-details" data-v-88fadf3a><span class="lv-lesson-title" data-v-88fadf3a>${ssrInterpolate(lesson.title)}</span><span class="lv-lesson-meta" data-v-88fadf3a>${ssrInterpolate(lesson.estimatedMinutes)} min \u2022 ${ssrInterpolate(lesson.type)}</span></div>`);
            if (!$setup.isLessonLocked(lesson.id)) {
              _push(ssrRenderComponent($setup["ArrowRight"], { class: "lv-lesson-arrow" }, null, _parent));
            } else {
              _push(`<!---->`);
            }
            _push(`</button>`);
          });
          _push(`<!--]--></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    });
    _push(`<!--]--></section></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/linguavault/learning/LVCurriculumView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const LVCurriculumView = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-88fadf3a"]]);

const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { curriculumId } = Astro2.params;
  return renderTemplate`${renderComponent($$result, "LinguaVaultLayout", $$LinguaVaultLayout, { "title": "Learning - LinguaVault", "description": "Continue your language learning journey" }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "LVCurriculumView", LVCurriculumView, { "curriculumId": curriculumId ?? "", "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/ptriv/Projects/mayuresh-portfolio/src/components/linguavault/learning/LVCurriculumView.vue", "client:component-export": "default" })} ` })}`;
}, "C:/Users/ptriv/Projects/mayuresh-portfolio/src/pages/linguavault/learn/[curriculumId]/index.astro", void 0);

const $$file = "C:/Users/ptriv/Projects/mayuresh-portfolio/src/pages/linguavault/learn/[curriculumId]/index.astro";
const $$url = "/linguavault/learn/[curriculumId]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
