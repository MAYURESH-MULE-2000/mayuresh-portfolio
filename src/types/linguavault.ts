// ============================================================
// LinguaVault - Type Definitions
// Offline-first language learning platform
// ============================================================

// ============================================================
// CURRICULUM TYPES - The learning content structure
// ============================================================

/**
 * Main curriculum structure - represents a complete learning path
 */
export interface Curriculum {
    id: string;
    meta: CurriculumMeta;
    modules: Module[];
    version: string;
    createdAt: string;
}

/**
 * Metadata about the curriculum
 */
export interface CurriculumMeta {
    targetLanguage: string;
    targetLanguageCode: string;
    nativeLanguage: string;
    nativeLanguageCode: string;
    proficiencyLevel: ProficiencyLevel;
    learningGoal: string;
    estimatedHours: number;
    title: string;
    description: string;
}

export type ProficiencyLevel = 'beginner' | 'elementary' | 'intermediate' | 'upper-intermediate' | 'advanced' | 'fluent';

/**
 * A module is a major section of the curriculum
 */
export interface Module {
    id: string;
    title: string;
    description: string;
    order: number;
    topics: Topic[];
    unlockCriteria: UnlockCriteria;
}

/**
 * A topic is a sub-section within a module
 */
export interface Topic {
    id: string;
    title: string;
    description: string;
    order: number;
    lessons: Lesson[];
}

/**
 * A lesson is a single learning unit
 */
export interface Lesson {
    id: string;
    title: string;
    type: LessonType;
    content: LessonContent;
    exercises: Exercise[];
    estimatedMinutes: number;
}

export type LessonType = 'vocabulary' | 'grammar' | 'conversation' | 'culture' | 'practice' | 'review';

/**
 * Content structure for different lesson types
 */
export interface LessonContent {
    // Vocabulary lessons
    vocabulary?: VocabularyItem[];
    // Grammar lessons
    grammarRules?: GrammarRule[];
    // Conversation lessons
    dialogues?: Dialogue[];
    // Cultural lessons
    culturalNotes?: string[];
    // Common to all
    explanation?: string;
    examples?: Example[];
    tips?: string[];
}

export interface VocabularyItem {
    word: string;
    translation: string;
    pronunciation?: string;
    audioUrl?: string;
    imageUrl?: string;
    partOfSpeech?: string;
    exampleSentence?: string;
    exampleTranslation?: string;
}

export interface GrammarRule {
    rule: string;
    explanation: string;
    examples: Example[];
}

export interface Dialogue {
    speakers: string[];
    lines: DialogueLine[];
    context?: string;
}

export interface DialogueLine {
    speaker: string;
    text: string;
    translation: string;
    audioUrl?: string;
}

export interface Example {
    text: string;
    translation: string;
    breakdown?: string[];
}

// ============================================================
// EXERCISE TYPES
// ============================================================

export interface Exercise {
    id: string;
    type: ExerciseType;
    prompt: string;
    instruction?: string;
    options?: string[];
    correctAnswer: string | string[] | Record<string, string>;
    explanation?: string;
    hints?: string[];
    difficulty?: 'easy' | 'medium' | 'hard';
}

export type ExerciseType =
    | 'multiple-choice'
    | 'fill-blank'
    | 'matching'
    | 'translation'
    | 'listening'
    | 'speaking'
    | 'reorder'
    | 'true-false';

// ============================================================
// UNLOCK CRITERIA
// ============================================================

export interface UnlockCriteria {
    type: 'none' | 'complete-previous' | 'score-threshold' | 'custom' | 'completion';
    threshold?: number; // For score-threshold type (0-100)
    requiredIds?: string[]; // Specific lesson/module IDs that must be completed
    moduleId?: string; // For completion type (single dependency)
}

// ============================================================
// PROGRESS TRACKING TYPES
// ============================================================

/**
 * Overall progress for a curriculum
 */
export interface LearningProgress {
    curriculumId: string;
    lessonProgress: Record<string, LessonProgress>;
    moduleProgress: Record<string, ModuleProgress>;
    topicProgress: Record<string, TopicProgress>;
    overallProgress: number; // 0-100
    streakDays: number;
    currentStreak: StreakInfo;
    lastAccessedAt: string;
    lastLessonId?: string;
    totalTimeSpentMinutes: number;
    startedAt: string;
}

export interface StreakInfo {
    count: number;
    lastActiveDate: string; // YYYY-MM-DD format
}

export interface LessonProgress {
    lessonId: string;
    status: LessonStatus;
    startedAt?: string;
    completedAt?: string;
    score?: number; // 0-100
    attempts: number;
    bestScore?: number;
    exerciseResults: Record<string, ExerciseResult>;
    timeSpentMinutes: number;
}

export type LessonStatus = 'locked' | 'available' | 'in-progress' | 'completed';

export interface ModuleProgress {
    moduleId: string;
    status: 'locked' | 'available' | 'in-progress' | 'completed';
    completedTopics: number;
    totalTopics: number;
    completionPercentage: number;
}

export interface TopicProgress {
    topicId: string;
    status: 'locked' | 'available' | 'in-progress' | 'completed';
    completedLessons: number;
    totalLessons: number;
    completionPercentage: number;
}

export interface ExerciseResult {
    exerciseId: string;
    correct: boolean;
    userAnswer: string | string[];
    attemptedAt: string;
    timeSpentSeconds: number;
    hintsUsed: number;
}

// ============================================================
// USER PREFERENCES & SETTINGS
// ============================================================

export interface LinguaVaultSettings {
    activeCurriculumId?: string;
    fontSize: 'small' | 'medium' | 'large';
    audioSpeed: number; // 0.5 - 2.0
    autoPlayAudio: boolean;
    showPronunciation: boolean;
    dailyGoalMinutes: number;
    notificationsEnabled: boolean;
    preferredExerciseTypes?: ExerciseType[];
}

export const DEFAULT_SETTINGS: LinguaVaultSettings = {
    fontSize: 'medium',
    audioSpeed: 1.0,
    autoPlayAudio: true,
    showPronunciation: true,
    dailyGoalMinutes: 15,
    notificationsEnabled: false,
};

// ============================================================
// DATA EXPORT/IMPORT TYPES
// ============================================================

export interface LinguaVaultExport {
    version: string;
    exportedAt: string;
    curriculums: Curriculum[];
    progress: LearningProgress[];
    settings: LinguaVaultSettings;
}

// ============================================================
// UI STATE TYPES
// ============================================================

export interface OnboardingState {
    step: number;
    targetLanguage?: string;
    nativeLanguage?: string;
    proficiencyLevel?: ProficiencyLevel;
    learningGoal?: string;
    dailyMinutes?: number;
}

export interface LessonViewState {
    currentExerciseIndex: number;
    showingContent: boolean;
    exerciseAnswers: Record<string, string | string[]>;
    exerciseResults: Record<string, boolean>;
    isComplete: boolean;
}

// ============================================================
// VALIDATION TYPES
// ============================================================

export interface ValidationResult {
    valid: boolean;
    errors: ValidationError[];
    warnings: ValidationWarning[];
}

export interface ValidationError {
    path: string;
    message: string;
    code: string;
}

export interface ValidationWarning {
    path: string;
    message: string;
    suggestion?: string;
}

// ============================================================
// STATISTICS TYPES
// ============================================================

export interface LearningStats {
    totalLessonsCompleted: number;
    totalExercisesCompleted: number;
    averageScore: number;
    totalTimeSpentMinutes: number;
    longestStreak: number;
    currentStreak: number;
    wordsLearned: number;
    accuracyByExerciseType: Record<ExerciseType, number>;
    progressByDay: DailyProgress[];
}

export interface DailyProgress {
    date: string; // YYYY-MM-DD
    lessonsCompleted: number;
    exercisesCompleted: number;
    timeSpentMinutes: number;
    averageScore: number;
}
