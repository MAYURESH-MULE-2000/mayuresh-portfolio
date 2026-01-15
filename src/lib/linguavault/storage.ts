// ============================================================
// LinguaVault - LocalStorage Utilities
// Handles lightweight, quick-access data
// ============================================================

import type { LinguaVaultSettings, OnboardingState } from '../../types/linguavault';

const STORAGE_KEYS = {
    ACTIVE_CURRICULUM: 'lv_active_curriculum',
    LAST_LESSON: 'lv_last_lesson',
    ONBOARDING_STATE: 'lv_onboarding_state',
    UI_PREFERENCES: 'lv_ui_preferences',
    FIRST_VISIT: 'lv_first_visit',
} as const;

// ============================================================
// ACTIVE CURRICULUM
// ============================================================

/**
 * Get the currently active curriculum ID
 */
export function getActiveCurriculumId(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_CURRICULUM);
}

/**
 * Set the active curriculum ID
 */
export function setActiveCurriculumId(curriculumId: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.ACTIVE_CURRICULUM, curriculumId);
}

/**
 * Clear the active curriculum
 */
export function clearActiveCurriculum(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_CURRICULUM);
}

// ============================================================
// LAST LESSON POINTER
// ============================================================

interface LastLessonPointer {
    curriculumId: string;
    moduleId: string;
    topicId: string;
    lessonId: string;
    timestamp: string;
}

/**
 * Get the last accessed lesson for quick resume
 */
export function getLastLesson(): LastLessonPointer | null {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(STORAGE_KEYS.LAST_LESSON);
    if (!stored) return null;

    try {
        return JSON.parse(stored);
    } catch {
        return null;
    }
}

/**
 * Save the last accessed lesson pointer
 */
export function setLastLesson(pointer: Omit<LastLessonPointer, 'timestamp'>): void {
    if (typeof window === 'undefined') return;
    const data: LastLessonPointer = {
        ...pointer,
        timestamp: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.LAST_LESSON, JSON.stringify(data));
}

/**
 * Clear the last lesson pointer
 */
export function clearLastLesson(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.LAST_LESSON);
}

// ============================================================
// ONBOARDING STATE
// ============================================================

/**
 * Get saved onboarding state (for resuming incomplete onboarding)
 */
export function getOnboardingState(): OnboardingState | null {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(STORAGE_KEYS.ONBOARDING_STATE);
    if (!stored) return null;

    try {
        return JSON.parse(stored);
    } catch {
        return null;
    }
}

/**
 * Save onboarding progress
 */
export function setOnboardingState(state: OnboardingState): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.ONBOARDING_STATE, JSON.stringify(state));
}

/**
 * Clear onboarding state (after completion)
 */
export function clearOnboardingState(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.ONBOARDING_STATE);
}

// ============================================================
// UI PREFERENCES
// ============================================================

interface UIPreferences {
    sidebarCollapsed?: boolean;
    showProgressBar?: boolean;
    lessonFontSize?: 'small' | 'medium' | 'large';
    audioSpeed?: number;
}

/**
 * Get UI preferences
 */
export function getUIPreferences(): UIPreferences {
    if (typeof window === 'undefined') return {};
    const stored = localStorage.getItem(STORAGE_KEYS.UI_PREFERENCES);
    if (!stored) return {};

    try {
        return JSON.parse(stored);
    } catch {
        return {};
    }
}

/**
 * Update UI preferences (merges with existing)
 */
export function updateUIPreferences(updates: Partial<UIPreferences>): void {
    if (typeof window === 'undefined') return;
    const current = getUIPreferences();
    const merged = { ...current, ...updates };
    localStorage.setItem(STORAGE_KEYS.UI_PREFERENCES, JSON.stringify(merged));
}

// ============================================================
// FIRST VISIT TRACKING
// ============================================================

/**
 * Check if this is the user's first visit
 */
export function isFirstVisit(): boolean {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem(STORAGE_KEYS.FIRST_VISIT) !== 'false';
}

/**
 * Mark that the user has visited before
 */
export function markVisited(): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.FIRST_VISIT, 'false');
}

// ============================================================
// CLEAR ALL LOCAL STORAGE
// ============================================================

/**
 * Clear all LinguaVault localStorage data
 */
export function clearAllLocalStorage(): void {
    if (typeof window === 'undefined') return;
    Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
    });
}

// ============================================================
// STORAGE AVAILABILITY CHECK
// ============================================================

/**
 * Check if localStorage is available
 */
export function isLocalStorageAvailable(): boolean {
    if (typeof window === 'undefined') return false;

    try {
        const testKey = '__lv_test__';
        localStorage.setItem(testKey, 'test');
        localStorage.removeItem(testKey);
        return true;
    } catch {
        return false;
    }
}
