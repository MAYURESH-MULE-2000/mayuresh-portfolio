import { c as createComponent, a as createAstro, b as renderTemplate, d as renderSlot, e as renderHead, f as addAttribute } from './astro/server_BMOK3aS7.mjs';
import 'piccolore';
import 'clsx';
/* empty css                         */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$LinguaVaultLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$LinguaVaultLayout;
  const {
    title = "LinguaVault - Learn Languages Offline",
    description = "A free, offline-first language learning platform. Learn at your own pace with structured curricula, no accounts required."
  } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="en" class="no-transition" data-astro-cid-pe2uwsme> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"', '><link rel="icon" type="image/svg+xml" href="/favicon.svg"><!-- SEO --><title>', '</title><meta name="robots" content="index, follow"><meta name="author" content="Mayuresh Mule"><!-- Open Graph --><meta property="og:title"', '><meta property="og:description"', '><meta property="og:type" content="website"><!-- Plus Jakarta Sans Font --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"><!-- LinguaVault Styles --><!-- Theme Script (prevent FOUC) --><script>\n            const theme = localStorage.getItem("theme");\n            const prefersDark = window.matchMedia(\n                "(prefers-color-scheme: dark)",\n            ).matches;\n\n            if (theme === "dark" || (!theme && prefersDark)) {\n                document.documentElement.classList.add("dark");\n            }\n\n            window.addEventListener("load", () => {\n                document.documentElement.classList.remove("no-transition");\n            });\n        <\/script>', '</head> <body class="lv-page" data-astro-cid-pe2uwsme> <!-- Main Content --> <main data-astro-cid-pe2uwsme> ', ` </main> <!-- Offline Indicator (injected via JS) --> <div id="offline-indicator" class="lv-offline-banner" style="display: none;" data-astro-cid-pe2uwsme> <span data-astro-cid-pe2uwsme>\u{1F4F4} You're offline - Don't worry, LinguaVault works offline!</span> </div>  <!-- Offline Detection Script --> <script>
            const offlineIndicator =
                document.getElementById("offline-indicator");

            function updateOnlineStatus() {
                if (offlineIndicator) {
                    offlineIndicator.style.display = navigator.onLine
                        ? "none"
                        : "block";
                }
            }

            window.addEventListener("online", updateOnlineStatus);
            window.addEventListener("offline", updateOnlineStatus);
            updateOnlineStatus();
        <\/script> </body> </html>`])), addAttribute(description, "content"), title, addAttribute(title, "content"), addAttribute(description, "content"), renderHead(), renderSlot($$result, $$slots["default"]));
}, "C:/Users/ptriv/Projects/mayuresh-portfolio/src/layouts/LinguaVaultLayout.astro", void 0);

const DB_NAME = "LinguaVaultDB";
const DB_VERSION = 1;
const STORES = {
  CURRICULUMS: "curriculums",
  PROGRESS: "progress",
  SETTINGS: "settings"
};
let dbInstance = null;
async function initDB() {
  if (dbInstance) {
    return dbInstance;
  }
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => {
      console.error("Failed to open LinguaVault database:", request.error);
      reject(request.error);
    };
    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(dbInstance);
    };
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORES.CURRICULUMS)) {
        const curriculumStore = db.createObjectStore(STORES.CURRICULUMS, { keyPath: "id" });
        curriculumStore.createIndex("targetLanguage", "meta.targetLanguageCode", { unique: false });
        curriculumStore.createIndex("createdAt", "createdAt", { unique: false });
      }
      if (!db.objectStoreNames.contains(STORES.PROGRESS)) {
        const progressStore = db.createObjectStore(STORES.PROGRESS, { keyPath: "curriculumId" });
        progressStore.createIndex("lastAccessedAt", "lastAccessedAt", { unique: false });
      }
      if (!db.objectStoreNames.contains(STORES.SETTINGS)) {
        db.createObjectStore(STORES.SETTINGS, { keyPath: "id" });
      }
    };
  });
}
async function getDB() {
  if (!dbInstance) {
    return initDB();
  }
  return dbInstance;
}
async function saveCurriculum(curriculum) {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORES.CURRICULUMS, "readwrite");
    const store = transaction.objectStore(STORES.CURRICULUMS);
    const request = store.put(curriculum);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}
async function getCurriculum(id) {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORES.CURRICULUMS, "readonly");
    const store = transaction.objectStore(STORES.CURRICULUMS);
    const request = store.get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
async function getAllCurriculums() {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORES.CURRICULUMS, "readonly");
    const store = transaction.objectStore(STORES.CURRICULUMS);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}
async function deleteCurriculum(id) {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.CURRICULUMS, STORES.PROGRESS], "readwrite");
    const curriculumStore = transaction.objectStore(STORES.CURRICULUMS);
    curriculumStore.delete(id);
    const progressStore = transaction.objectStore(STORES.PROGRESS);
    progressStore.delete(id);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}
async function curriculumExists(id) {
  const curriculum = await getCurriculum(id);
  return curriculum !== void 0;
}
async function saveProgress(progress) {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORES.PROGRESS, "readwrite");
    const store = transaction.objectStore(STORES.PROGRESS);
    const request = store.put(progress);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}
async function getProgress(curriculumId) {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORES.PROGRESS, "readonly");
    const store = transaction.objectStore(STORES.PROGRESS);
    const request = store.get(curriculumId);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
async function getAllProgress() {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORES.PROGRESS, "readonly");
    const store = transaction.objectStore(STORES.PROGRESS);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}
async function initializeProgress(curriculum) {
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const today = now.split("T")[0];
  const progress = {
    curriculumId: curriculum.id,
    lessonProgress: {},
    moduleProgress: {},
    topicProgress: {},
    overallProgress: 0,
    streakDays: 0,
    currentStreak: {
      count: 0,
      lastActiveDate: today
    },
    lastAccessedAt: now,
    totalTimeSpentMinutes: 0,
    startedAt: now
  };
  curriculum.modules.forEach((module, moduleIndex) => {
    progress.moduleProgress[module.id] = {
      moduleId: module.id,
      status: moduleIndex === 0 ? "available" : "locked",
      completedTopics: 0,
      totalTopics: module.topics.length,
      completionPercentage: 0
    };
    module.topics.forEach((topic, topicIndex) => {
      const isFirstTopicInFirstModule = moduleIndex === 0 && topicIndex === 0;
      progress.topicProgress[topic.id] = {
        topicId: topic.id,
        status: isFirstTopicInFirstModule ? "available" : "locked",
        completedLessons: 0,
        totalLessons: topic.lessons.length,
        completionPercentage: 0
      };
      topic.lessons.forEach((lesson, lessonIndex) => {
        const isFirstLessonAvailable = isFirstTopicInFirstModule && lessonIndex === 0;
        progress.lessonProgress[lesson.id] = {
          lessonId: lesson.id,
          status: isFirstLessonAvailable ? "available" : "locked",
          attempts: 0,
          exerciseResults: {},
          timeSpentMinutes: 0
        };
      });
    });
  });
  await saveProgress(progress);
  return progress;
}
const SETTINGS_KEY = "user-settings";
async function getSettings() {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORES.SETTINGS, "readonly");
    const store = transaction.objectStore(STORES.SETTINGS);
    const request = store.get(SETTINGS_KEY);
    request.onsuccess = () => {
      if (request.result) {
        resolve(request.result.settings);
      } else {
        resolve({
          fontSize: "medium",
          audioSpeed: 1,
          autoPlayAudio: true,
          showPronunciation: true,
          dailyGoalMinutes: 15,
          notificationsEnabled: false
        });
      }
    };
    request.onerror = () => reject(request.error);
  });
}
async function saveSettings(settings) {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORES.SETTINGS, "readwrite");
    const store = transaction.objectStore(STORES.SETTINGS);
    const request = store.put({ id: SETTINGS_KEY, settings });
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}
async function exportAllData() {
  const [curriculums, progress, settings] = await Promise.all([
    getAllCurriculums(),
    getAllProgress(),
    getSettings()
  ]);
  return {
    version: "1.0.0",
    exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
    curriculums,
    progress,
    settings
  };
}
async function importData(data, options = { merge: true }) {
  const result = { imported: 0, skipped: 0, errors: [] };
  for (const curriculum of data.curriculums) {
    try {
      const exists = await curriculumExists(curriculum.id);
      if (exists && !options.overwrite && !options.merge) {
        result.skipped++;
        continue;
      }
      await saveCurriculum(curriculum);
      result.imported++;
    } catch (error) {
      result.errors.push(`Failed to import curriculum ${curriculum.id}: ${error}`);
    }
  }
  for (const progress of data.progress) {
    try {
      const existingProgress = await getProgress(progress.curriculumId);
      if (existingProgress && options.merge) {
        const merged = mergeProgress(existingProgress, progress);
        await saveProgress(merged);
      } else {
        await saveProgress(progress);
      }
    } catch (error) {
      result.errors.push(`Failed to import progress for ${progress.curriculumId}: ${error}`);
    }
  }
  if (data.settings) {
    await saveSettings(data.settings);
  }
  return result;
}
function mergeProgress(existing, incoming) {
  const merged = { ...existing };
  if (incoming.overallProgress > existing.overallProgress) {
    merged.overallProgress = incoming.overallProgress;
  }
  if (incoming.streakDays > existing.streakDays) {
    merged.streakDays = incoming.streakDays;
  }
  for (const [lessonId, lessonProgress] of Object.entries(incoming.lessonProgress)) {
    const existingLesson = existing.lessonProgress[lessonId];
    if (!existingLesson || lessonProgress.status === "completed") {
      merged.lessonProgress[lessonId] = lessonProgress;
    } else if (lessonProgress.bestScore && (!existingLesson.bestScore || lessonProgress.bestScore > existingLesson.bestScore)) {
      merged.lessonProgress[lessonId] = {
        ...existingLesson,
        bestScore: lessonProgress.bestScore
      };
    }
  }
  return merged;
}
async function clearAllData() {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      [STORES.CURRICULUMS, STORES.PROGRESS, STORES.SETTINGS],
      "readwrite"
    );
    transaction.objectStore(STORES.CURRICULUMS).clear();
    transaction.objectStore(STORES.PROGRESS).clear();
    transaction.objectStore(STORES.SETTINGS).clear();
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}
async function getStorageEstimate() {
  if ("storage" in navigator && "estimate" in navigator.storage) {
    const estimate = await navigator.storage.estimate();
    return {
      used: estimate.usage || 0,
      available: estimate.quota || 0
    };
  }
  return { used: 0, available: 0 };
}

const STORAGE_KEYS = {
  ACTIVE_CURRICULUM: "lv_active_curriculum",
  LAST_LESSON: "lv_last_lesson",
  ONBOARDING_STATE: "lv_onboarding_state",
  UI_PREFERENCES: "lv_ui_preferences",
  FIRST_VISIT: "lv_first_visit"
};
function getActiveCurriculumId() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEYS.ACTIVE_CURRICULUM);
}
function setActiveCurriculumId(curriculumId) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.ACTIVE_CURRICULUM, curriculumId);
}
function getLastLesson() {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEYS.LAST_LESSON);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}
function setLastLesson(pointer) {
  if (typeof window === "undefined") return;
  const data = {
    ...pointer,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
  localStorage.setItem(STORAGE_KEYS.LAST_LESSON, JSON.stringify(data));
}
function clearAllLocalStorage() {
  if (typeof window === "undefined") return;
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
}

export { $$LinguaVaultLayout as $, getProgress as a, saveProgress as b, getLastLesson as c, getAllCurriculums as d, getStorageEstimate as e, clearAllData as f, getCurriculum as g, clearAllLocalStorage as h, deleteCurriculum as i, importData as j, exportAllData as k, initDB as l, getAllProgress as m, getActiveCurriculumId as n, saveCurriculum as o, initializeProgress as p, setActiveCurriculumId as q, setLastLesson as s };
