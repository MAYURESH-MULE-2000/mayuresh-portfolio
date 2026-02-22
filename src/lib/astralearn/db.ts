// ============================================================
// AstraLearn - IndexedDB Service Layer
// Handles all persistent storage operations
// ============================================================

import type {
    Curriculum,
    LearningProgress,
    AstraLearnExport,
    AstraLearnSettings,
    DEFAULT_SETTINGS,
} from '../../types/astralearn';

const DB_NAME = 'AstraLearnDB';
const DB_VERSION = 1;

// Object store names
const STORES = {
    CURRICULUMS: 'curriculums',
    PROGRESS: 'progress',
    SETTINGS: 'settings',
} as const;

let dbInstance: IDBDatabase | null = null;

// ============================================================
// DATABASE INITIALIZATION
// ============================================================

/**
 * Initialize the IndexedDB database
 */
export async function initDB(): Promise<IDBDatabase> {
    if (dbInstance) {
        return dbInstance;
    }

    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => {
            console.error('Failed to open AstraLearn database:', request.error);
            reject(request.error);
        };

        request.onsuccess = () => {
            dbInstance = request.result;
            resolve(dbInstance);
        };

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;

            // Create object stores if they don't exist
            if (!db.objectStoreNames.contains(STORES.CURRICULUMS)) {
                const curriculumStore = db.createObjectStore(STORES.CURRICULUMS, { keyPath: 'id' });
                curriculumStore.createIndex('targetLanguage', 'meta.targetLanguageCode', { unique: false });
                curriculumStore.createIndex('createdAt', 'createdAt', { unique: false });
            }

            if (!db.objectStoreNames.contains(STORES.PROGRESS)) {
                const progressStore = db.createObjectStore(STORES.PROGRESS, { keyPath: 'curriculumId' });
                progressStore.createIndex('lastAccessedAt', 'lastAccessedAt', { unique: false });
            }

            if (!db.objectStoreNames.contains(STORES.SETTINGS)) {
                db.createObjectStore(STORES.SETTINGS, { keyPath: 'id' });
            }
        };
    });
}

/**
 * Get the database instance, initializing if needed
 */
async function getDB(): Promise<IDBDatabase> {
    if (!dbInstance) {
        return initDB();
    }
    return dbInstance;
}

// ============================================================
// CURRICULUM OPERATIONS
// ============================================================

/**
 * Save a curriculum to the database
 */
export async function saveCurriculum(curriculum: Curriculum): Promise<void> {
    const db = await getDB();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORES.CURRICULUMS, 'readwrite');
        const store = transaction.objectStore(STORES.CURRICULUMS);
        const request = store.put(curriculum);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

/**
 * Get a curriculum by ID
 */
export async function getCurriculum(id: string): Promise<Curriculum | undefined> {
    const db = await getDB();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORES.CURRICULUMS, 'readonly');
        const store = transaction.objectStore(STORES.CURRICULUMS);
        const request = store.get(id);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

/**
 * Get all stored curriculums
 */
export async function getAllCurriculums(): Promise<Curriculum[]> {
    const db = await getDB();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORES.CURRICULUMS, 'readonly');
        const store = transaction.objectStore(STORES.CURRICULUMS);
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
    });
}

/**
 * Delete a curriculum by ID
 */
export async function deleteCurriculum(id: string): Promise<void> {
    const db = await getDB();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORES.CURRICULUMS, STORES.PROGRESS], 'readwrite');

        // Delete curriculum
        const curriculumStore = transaction.objectStore(STORES.CURRICULUMS);
        curriculumStore.delete(id);

        // Also delete associated progress
        const progressStore = transaction.objectStore(STORES.PROGRESS);
        progressStore.delete(id);

        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
    });
}

/**
 * Check if a curriculum exists
 */
export async function curriculumExists(id: string): Promise<boolean> {
    const curriculum = await getCurriculum(id);
    return curriculum !== undefined;
}

// ============================================================
// PROGRESS OPERATIONS
// ============================================================

/**
 * Save or update learning progress
 */
export async function saveProgress(progress: LearningProgress): Promise<void> {
    const db = await getDB();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORES.PROGRESS, 'readwrite');
        const store = transaction.objectStore(STORES.PROGRESS);
        const request = store.put(progress);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

/**
 * Get progress for a specific curriculum
 */
export async function getProgress(curriculumId: string): Promise<LearningProgress | undefined> {
    const db = await getDB();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORES.PROGRESS, 'readonly');
        const store = transaction.objectStore(STORES.PROGRESS);
        const request = store.get(curriculumId);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

/**
 * Get all progress records
 */
export async function getAllProgress(): Promise<LearningProgress[]> {
    const db = await getDB();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORES.PROGRESS, 'readonly');
        const store = transaction.objectStore(STORES.PROGRESS);
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
    });
}

/**
 * Initialize progress for a new curriculum
 */
export async function initializeProgress(curriculum: Curriculum): Promise<LearningProgress> {
    const now = new Date().toISOString();
    const today = now.split('T')[0];

    const progress: LearningProgress = {
        curriculumId: curriculum.id,
        lessonProgress: {},
        moduleProgress: {},
        topicProgress: {},
        overallProgress: 0,
        streakDays: 0,
        currentStreak: {
            count: 0,
            lastActiveDate: today,
        },
        lastAccessedAt: now,
        totalTimeSpentMinutes: 0,
        startedAt: now,
    };

    // Initialize module progress
    curriculum.modules.forEach((module, moduleIndex) => {
        progress.moduleProgress[module.id] = {
            moduleId: module.id,
            status: moduleIndex === 0 ? 'available' : 'locked',
            completedTopics: 0,
            totalTopics: module.topics.length,
            completionPercentage: 0,
        };

        // Initialize topic progress
        module.topics.forEach((topic, topicIndex) => {
            const isFirstTopicInFirstModule = moduleIndex === 0 && topicIndex === 0;
            progress.topicProgress[topic.id] = {
                topicId: topic.id,
                status: isFirstTopicInFirstModule ? 'available' : 'locked',
                completedLessons: 0,
                totalLessons: topic.lessons.length,
                completionPercentage: 0,
            };

            // Initialize lesson progress
            topic.lessons.forEach((lesson, lessonIndex) => {
                const isFirstLessonAvailable = isFirstTopicInFirstModule && lessonIndex === 0;
                progress.lessonProgress[lesson.id] = {
                    lessonId: lesson.id,
                    status: isFirstLessonAvailable ? 'available' : 'locked',
                    attempts: 0,
                    exerciseResults: {},
                    timeSpentMinutes: 0,
                };
            });
        });
    });

    await saveProgress(progress);
    return progress;
}

/**
 * Mark a lesson as completed, calculate all downstream progress accurately, 
 * and unlock succeeding items.
 */
export async function markLessonComplete(
    curriculumId: string,
    lessonId: string,
    score: number,
    exerciseResults: Record<string, any>,
    timeSpentMinutes: number
): Promise<LearningProgress | null> {
    const curriculum = await getCurriculum(curriculumId);
    let progress = await getProgress(curriculumId);

    if (!curriculum || !progress) return null;

    const now = new Date().toISOString();
    const today = now.split('T')[0];

    // Find module and topic context
    let moduleId: string | null = null;
    let topicId: string | null = null;
    let nextLessonId: string | null = null;

    for (let m = 0; m < curriculum.modules.length; m++) {
        const mod = curriculum.modules[m];
        for (let t = 0; t < mod.topics.length; t++) {
            const topic = mod.topics[t];
            const lessonIndex = topic.lessons.findIndex(l => l.id === lessonId);
            if (lessonIndex >= 0) {
                moduleId = mod.id;
                topicId = topic.id;

                if (lessonIndex < topic.lessons.length - 1) {
                    nextLessonId = topic.lessons[lessonIndex + 1].id;
                } else if (t < mod.topics.length - 1 && mod.topics[t + 1].lessons.length > 0) {
                    nextLessonId = mod.topics[t + 1].lessons[0].id;
                }
                break;
            }
        }
        if (moduleId) break;
    }

    if (!moduleId || !topicId) return progress;

    // Update lesson
    progress.lessonProgress[lessonId] = {
        lessonId,
        status: 'completed',
        completedAt: now,
        score,
        attempts: (progress.lessonProgress[lessonId]?.attempts || 0) + 1,
        bestScore: Math.max(score, progress.lessonProgress[lessonId]?.bestScore || 0),
        exerciseResults,
        timeSpentMinutes: (progress.lessonProgress[lessonId]?.timeSpentMinutes || 0) + timeSpentMinutes,
    };

    // Unlock next lesson
    if (nextLessonId && progress.lessonProgress[nextLessonId]) {
        if (progress.lessonProgress[nextLessonId].status === 'locked') {
            progress.lessonProgress[nextLessonId].status = 'available';
        }
    }

    // Update topic
    const topicLessons = curriculum.modules
        .find(m => m.id === moduleId)?.topics
        .find(t => t.id === topicId)?.lessons || [];

    const completedTopicLessons = topicLessons.filter(
        l => progress!.lessonProgress[l.id]?.status === 'completed'
    ).length;

    progress.topicProgress[topicId].completedLessons = completedTopicLessons;
    progress.topicProgress[topicId].completionPercentage =
        Math.round((completedTopicLessons / topicLessons.length) * 100);

    if (completedTopicLessons === topicLessons.length) {
        progress.topicProgress[topicId].status = 'completed';
    } else {
        progress.topicProgress[topicId].status = 'in-progress';
    }

    // Update module
    const moduleTopics = curriculum.modules
        .find(m => m.id === moduleId)?.topics || [];

    const completedTopics = moduleTopics.filter(
        t => progress!.topicProgress[t.id]?.status === 'completed'
    ).length;

    progress.moduleProgress[moduleId].completedTopics = completedTopics;
    progress.moduleProgress[moduleId].completionPercentage =
        Math.round((completedTopics / moduleTopics.length) * 100);

    if (completedTopics === moduleTopics.length) {
        progress.moduleProgress[moduleId].status = 'completed';
        // Unlock next module
        const moduleIndex = curriculum.modules.findIndex(m => m.id === moduleId);
        if (moduleIndex >= 0 && moduleIndex < curriculum.modules.length - 1) {
            const nextModule = curriculum.modules[moduleIndex + 1];
            if (progress.moduleProgress[nextModule.id]?.status === 'locked') {
                progress.moduleProgress[nextModule.id].status = 'available';
                const firstTopic = nextModule.topics[0];
                if (firstTopic && progress.topicProgress[firstTopic.id]) {
                    progress.topicProgress[firstTopic.id].status = 'available';
                    const firstLesson = firstTopic.lessons[0];
                    if (firstLesson && progress.lessonProgress[firstLesson.id]) {
                        progress.lessonProgress[firstLesson.id].status = 'available';
                    }
                }
            }
        }
    }

    // Update overall
    const allLessons = curriculum.modules.flatMap(m => m.topics.flatMap(t => t.lessons));
    const totalCompletedLessons = allLessons.filter(
        l => progress!.lessonProgress[l.id]?.status === 'completed'
    ).length;
    progress.overallProgress = Math.round((totalCompletedLessons / allLessons.length) * 100);

    // Update streak tracking properly
    if (progress.currentStreak.lastActiveDate !== today) {
        const lastDate = new Date(progress.currentStreak.lastActiveDate);
        const todayDate = new Date(today);

        // Reset time component for accurate day comparison
        lastDate.setHours(0, 0, 0, 0);
        todayDate.setHours(0, 0, 0, 0);

        const diffDays = Math.round((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            progress.currentStreak.count++;
        } else if (diffDays > 1) {
            progress.currentStreak.count = 1;
        }
        progress.currentStreak.lastActiveDate = today;
        progress.streakDays = Math.max(progress.streakDays, progress.currentStreak.count);
    }

    progress.lastAccessedAt = now;
    progress.lastLessonId = lessonId;
    progress.totalTimeSpentMinutes += timeSpentMinutes;

    await saveProgress(progress);
    return progress;
}

// ============================================================
// SETTINGS OPERATIONS
// ============================================================

const SETTINGS_KEY = 'user-settings';

/**
 * Get user settings
 */
export async function getSettings(): Promise<AstraLearnSettings> {
    const db = await getDB();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORES.SETTINGS, 'readonly');
        const store = transaction.objectStore(STORES.SETTINGS);
        const request = store.get(SETTINGS_KEY);

        request.onsuccess = () => {
            if (request.result) {
                resolve(request.result.settings);
            } else {
                // Return default settings
                resolve({
                    fontSize: 'medium',
                    audioSpeed: 1.0,
                    autoPlayAudio: true,
                    showPronunciation: true,
                    dailyGoalMinutes: 15,
                    notificationsEnabled: false,
                });
            }
        };
        request.onerror = () => reject(request.error);
    });
}

/**
 * Save user settings
 */
export async function saveSettings(settings: AstraLearnSettings): Promise<void> {
    const db = await getDB();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORES.SETTINGS, 'readwrite');
        const store = transaction.objectStore(STORES.SETTINGS);
        const request = store.put({ id: SETTINGS_KEY, settings });

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

// ============================================================
// EXPORT / IMPORT OPERATIONS
// ============================================================

/**
 * Export all AstraLearn data as a JSON object
 */
export async function exportAllData(): Promise<AstraLearnExport> {
    const [curriculums, progress, settings] = await Promise.all([
        getAllCurriculums(),
        getAllProgress(),
        getSettings(),
    ]);

    return {
        version: '1.0.0',
        exportedAt: new Date().toISOString(),
        curriculums,
        progress,
        settings,
    };
}

/**
 * Import data from a backup, optionally merging with existing data
 */
export async function importData(
    data: AstraLearnExport,
    options: { merge?: boolean; overwrite?: boolean } = { merge: true }
): Promise<{ imported: number; skipped: number; errors: string[] }> {
    const result = { imported: 0, skipped: 0, errors: [] as string[] };

    // Import curriculums
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

    // Import progress
    for (const progress of data.progress) {
        try {
            const existingProgress = await getProgress(progress.curriculumId);

            if (existingProgress && options.merge) {
                // Merge: keep the more advanced progress
                const merged = mergeProgress(existingProgress, progress);
                await saveProgress(merged);
            } else {
                await saveProgress(progress);
            }
        } catch (error) {
            result.errors.push(`Failed to import progress for ${progress.curriculumId}: ${error}`);
        }
    }

    // Import settings (always overwrite)
    if (data.settings) {
        await saveSettings(data.settings);
    }

    return result;
}

/**
 * Merge two progress records, keeping the more advanced state
 */
function mergeProgress(existing: LearningProgress, incoming: LearningProgress): LearningProgress {
    const merged = { ...existing };

    // Keep higher overall progress
    if (incoming.overallProgress > existing.overallProgress) {
        merged.overallProgress = incoming.overallProgress;
    }

    // Keep longer streak
    if (incoming.streakDays > existing.streakDays) {
        merged.streakDays = incoming.streakDays;
    }

    // Merge lesson progress (keep completed status over others)
    for (const [lessonId, lessonProgress] of Object.entries(incoming.lessonProgress)) {
        const existingLesson = existing.lessonProgress[lessonId];

        if (!existingLesson || lessonProgress.status === 'completed') {
            merged.lessonProgress[lessonId] = lessonProgress;
        } else if (lessonProgress.bestScore && (!existingLesson.bestScore || lessonProgress.bestScore > existingLesson.bestScore)) {
            merged.lessonProgress[lessonId] = {
                ...existingLesson,
                bestScore: lessonProgress.bestScore,
            };
        }
    }

    return merged;
}

// ============================================================
// UTILITY OPERATIONS
// ============================================================

/**
 * Clear all AstraLearn data
 */
export async function clearAllData(): Promise<void> {
    const db = await getDB();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(
            [STORES.CURRICULUMS, STORES.PROGRESS, STORES.SETTINGS],
            'readwrite'
        );

        transaction.objectStore(STORES.CURRICULUMS).clear();
        transaction.objectStore(STORES.PROGRESS).clear();
        transaction.objectStore(STORES.SETTINGS).clear();

        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
    });
}

/**
 * Get database storage estimate
 */
export async function getStorageEstimate(): Promise<{ used: number; available: number }> {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
        const estimate = await navigator.storage.estimate();
        return {
            used: estimate.usage || 0,
            available: estimate.quota || 0,
        };
    }
    return { used: 0, available: 0 };
}
