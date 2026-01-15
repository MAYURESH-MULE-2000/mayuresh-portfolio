// ============================================================
// LinguaVault - Curriculum JSON Validator
// Validates uploaded curriculum files against expected schema
// ============================================================

import type {
    Curriculum,
    CurriculumMeta,
    Module,
    Topic,
    Lesson,
    Exercise,
    ValidationResult,
    ValidationError,
    ValidationWarning,
    ProficiencyLevel,
    LessonType,
    ExerciseType,
} from '../../types/linguavault';

// Valid enum values
const VALID_PROFICIENCY_LEVELS: ProficiencyLevel[] = [
    'beginner', 'elementary', 'intermediate', 'upper-intermediate', 'advanced', 'fluent'
];

const VALID_LESSON_TYPES: LessonType[] = [
    'vocabulary', 'grammar', 'conversation', 'culture', 'practice', 'review'
];

const VALID_EXERCISE_TYPES: ExerciseType[] = [
    'multiple-choice', 'fill-blank', 'matching', 'translation', 'listening', 'speaking', 'reorder', 'true-false'
];

// ============================================================
// MAIN VALIDATOR
// ============================================================

/**
 * Validate a curriculum JSON object
 */
export function validateCurriculum(data: unknown): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Check if data is an object
    if (!data || typeof data !== 'object') {
        errors.push({
            path: 'root',
            message: 'Curriculum must be a valid JSON object',
            code: 'INVALID_ROOT',
        });
        return { valid: false, errors, warnings };
    }

    const curriculum = data as Record<string, unknown>;

    // Validate required root fields
    validateRequiredString(curriculum, 'id', 'root', errors);
    validateRequiredString(curriculum, 'version', 'root', errors);
    validateRequiredString(curriculum, 'createdAt', 'root', errors);

    // Validate meta
    if (!curriculum.meta || typeof curriculum.meta !== 'object') {
        errors.push({
            path: 'meta',
            message: 'Curriculum must have a meta object',
            code: 'MISSING_META',
        });
    } else {
        validateMeta(curriculum.meta as Record<string, unknown>, errors, warnings);
    }

    // Validate modules
    if (!Array.isArray(curriculum.modules)) {
        errors.push({
            path: 'modules',
            message: 'Curriculum must have a modules array',
            code: 'MISSING_MODULES',
        });
    } else if (curriculum.modules.length === 0) {
        errors.push({
            path: 'modules',
            message: 'Curriculum must have at least one module',
            code: 'EMPTY_MODULES',
        });
    } else {
        curriculum.modules.forEach((module, index) => {
            validateModule(module, `modules[${index}]`, errors, warnings);
        });
    }

    // Add warning for large curriculums
    if (Array.isArray(curriculum.modules) && curriculum.modules.length > 20) {
        warnings.push({
            path: 'modules',
            message: `Large curriculum with ${curriculum.modules.length} modules. Consider splitting into smaller courses.`,
            suggestion: 'Break down into focused mini-courses for better learning experience',
        });
    }

    return {
        valid: errors.length === 0,
        errors,
        warnings,
    };
}

// ============================================================
// META VALIDATOR
// ============================================================

function validateMeta(
    meta: Record<string, unknown>,
    errors: ValidationError[],
    warnings: ValidationWarning[]
): void {
    const requiredFields = [
        'targetLanguage',
        'targetLanguageCode',
        'nativeLanguage',
        'nativeLanguageCode',
        'proficiencyLevel',
        'learningGoal',
        'title',
        'description',
    ];

    requiredFields.forEach(field => {
        validateRequiredString(meta, field, 'meta', errors);
    });

    // Validate proficiency level
    if (meta.proficiencyLevel && !VALID_PROFICIENCY_LEVELS.includes(meta.proficiencyLevel as ProficiencyLevel)) {
        errors.push({
            path: 'meta.proficiencyLevel',
            message: `Invalid proficiency level. Must be one of: ${VALID_PROFICIENCY_LEVELS.join(', ')}`,
            code: 'INVALID_PROFICIENCY',
        });
    }

    // Validate estimated hours
    if (meta.estimatedHours !== undefined) {
        if (typeof meta.estimatedHours !== 'number' || meta.estimatedHours <= 0) {
            warnings.push({
                path: 'meta.estimatedHours',
                message: 'estimatedHours should be a positive number',
                suggestion: 'Calculate based on total lesson time',
            });
        }
    }

    // Validate language codes (basic check for 2-3 letter codes)
    if (meta.targetLanguageCode && !/^[a-z]{2,3}$/i.test(meta.targetLanguageCode as string)) {
        warnings.push({
            path: 'meta.targetLanguageCode',
            message: 'Language code should be a 2-3 letter ISO code (e.g., "en", "es", "fra")',
        });
    }
}

// ============================================================
// MODULE VALIDATOR
// ============================================================

function validateModule(
    module: unknown,
    path: string,
    errors: ValidationError[],
    warnings: ValidationWarning[]
): void {
    if (!module || typeof module !== 'object') {
        errors.push({
            path,
            message: 'Module must be an object',
            code: 'INVALID_MODULE',
        });
        return;
    }

    const mod = module as Record<string, unknown>;

    validateRequiredString(mod, 'id', path, errors);
    validateRequiredString(mod, 'title', path, errors);
    validateRequiredNumber(mod, 'order', path, errors);

    // Optional description
    if (mod.description === undefined) {
        warnings.push({
            path: `${path}.description`,
            message: 'Module description is recommended for better UX',
        });
    }

    // Validate topics
    if (!Array.isArray(mod.topics)) {
        errors.push({
            path: `${path}.topics`,
            message: 'Module must have a topics array',
            code: 'MISSING_TOPICS',
        });
    } else if (mod.topics.length === 0) {
        errors.push({
            path: `${path}.topics`,
            message: 'Module must have at least one topic',
            code: 'EMPTY_TOPICS',
        });
    } else {
        mod.topics.forEach((topic, index) => {
            validateTopic(topic, `${path}.topics[${index}]`, errors, warnings);
        });
    }

    // Validate unlock criteria if present
    if (mod.unlockCriteria) {
        validateUnlockCriteria(mod.unlockCriteria, `${path}.unlockCriteria`, errors);
    }
}

// ============================================================
// TOPIC VALIDATOR
// ============================================================

function validateTopic(
    topic: unknown,
    path: string,
    errors: ValidationError[],
    warnings: ValidationWarning[]
): void {
    if (!topic || typeof topic !== 'object') {
        errors.push({
            path,
            message: 'Topic must be an object',
            code: 'INVALID_TOPIC',
        });
        return;
    }

    const top = topic as Record<string, unknown>;

    validateRequiredString(top, 'id', path, errors);
    validateRequiredString(top, 'title', path, errors);
    validateRequiredNumber(top, 'order', path, errors);

    // Validate lessons
    if (!Array.isArray(top.lessons)) {
        errors.push({
            path: `${path}.lessons`,
            message: 'Topic must have a lessons array',
            code: 'MISSING_LESSONS',
        });
    } else if (top.lessons.length === 0) {
        errors.push({
            path: `${path}.lessons`,
            message: 'Topic must have at least one lesson',
            code: 'EMPTY_LESSONS',
        });
    } else {
        top.lessons.forEach((lesson, index) => {
            validateLesson(lesson, `${path}.lessons[${index}]`, errors, warnings);
        });
    }
}

// ============================================================
// LESSON VALIDATOR
// ============================================================

function validateLesson(
    lesson: unknown,
    path: string,
    errors: ValidationError[],
    warnings: ValidationWarning[]
): void {
    if (!lesson || typeof lesson !== 'object') {
        errors.push({
            path,
            message: 'Lesson must be an object',
            code: 'INVALID_LESSON',
        });
        return;
    }

    const les = lesson as Record<string, unknown>;

    validateRequiredString(les, 'id', path, errors);
    validateRequiredString(les, 'title', path, errors);

    // Validate lesson type
    if (!les.type) {
        errors.push({
            path: `${path}.type`,
            message: 'Lesson must have a type',
            code: 'MISSING_LESSON_TYPE',
        });
    } else if (!VALID_LESSON_TYPES.includes(les.type as LessonType)) {
        errors.push({
            path: `${path}.type`,
            message: `Invalid lesson type. Must be one of: ${VALID_LESSON_TYPES.join(', ')}`,
            code: 'INVALID_LESSON_TYPE',
        });
    }

    // Validate estimated minutes
    if (les.estimatedMinutes !== undefined) {
        if (typeof les.estimatedMinutes !== 'number' || les.estimatedMinutes <= 0) {
            warnings.push({
                path: `${path}.estimatedMinutes`,
                message: 'estimatedMinutes should be a positive number',
            });
        } else if (les.estimatedMinutes > 30) {
            warnings.push({
                path: `${path}.estimatedMinutes`,
                message: 'Lessons longer than 30 minutes may reduce engagement',
                suggestion: 'Consider breaking into smaller micro-lessons',
            });
        }
    }

    // Validate content
    if (!les.content || typeof les.content !== 'object') {
        warnings.push({
            path: `${path}.content`,
            message: 'Lesson should have content',
        });
    }

    // Validate exercises
    if (!Array.isArray(les.exercises)) {
        warnings.push({
            path: `${path}.exercises`,
            message: 'Lesson should have exercises for practice',
        });
    } else {
        les.exercises.forEach((exercise, index) => {
            validateExercise(exercise, `${path}.exercises[${index}]`, errors, warnings);
        });
    }
}

// ============================================================
// EXERCISE VALIDATOR
// ============================================================

function validateExercise(
    exercise: unknown,
    path: string,
    errors: ValidationError[],
    warnings: ValidationWarning[]
): void {
    if (!exercise || typeof exercise !== 'object') {
        errors.push({
            path,
            message: 'Exercise must be an object',
            code: 'INVALID_EXERCISE',
        });
        return;
    }

    const ex = exercise as Record<string, unknown>;

    validateRequiredString(ex, 'id', path, errors);
    validateRequiredString(ex, 'prompt', path, errors);

    // Validate exercise type
    if (!ex.type) {
        errors.push({
            path: `${path}.type`,
            message: 'Exercise must have a type',
            code: 'MISSING_EXERCISE_TYPE',
        });
    } else if (!VALID_EXERCISE_TYPES.includes(ex.type as ExerciseType)) {
        errors.push({
            path: `${path}.type`,
            message: `Invalid exercise type. Must be one of: ${VALID_EXERCISE_TYPES.join(', ')}`,
            code: 'INVALID_EXERCISE_TYPE',
        });
    }

    // Validate correct answer
    if (ex.correctAnswer === undefined || ex.correctAnswer === null) {
        errors.push({
            path: `${path}.correctAnswer`,
            message: 'Exercise must have a correctAnswer',
            code: 'MISSING_CORRECT_ANSWER',
        });
    }

    // Type-specific validation
    if (ex.type === 'multiple-choice') {
        if (!Array.isArray(ex.options) || ex.options.length < 2) {
            errors.push({
                path: `${path}.options`,
                message: 'Multiple choice exercises must have at least 2 options',
                code: 'INSUFFICIENT_OPTIONS',
            });
        }
    }

    if (ex.type === 'matching') {
        const isArray = Array.isArray(ex.correctAnswer);
        const isObject = typeof ex.correctAnswer === 'object' && ex.correctAnswer !== null && !isArray;

        let pairCount = 0;
        if (isArray) {
            pairCount = (ex.correctAnswer as string[]).length;
        } else if (isObject) {
            pairCount = Object.keys(ex.correctAnswer as Record<string, string>).length;
        }

        if (pairCount < 2) {
            errors.push({
                path: `${path}.correctAnswer`,
                message: 'Matching exercises must have at least 2 pairs',
                code: 'INSUFFICIENT_PAIRS',
            });
        }
    }

    // Recommend explanation
    if (!ex.explanation) {
        warnings.push({
            path: `${path}.explanation`,
            message: 'Adding an explanation helps learners understand mistakes',
        });
    }
}

// ============================================================
// UNLOCK CRITERIA VALIDATOR
// ============================================================

function validateUnlockCriteria(
    criteria: unknown,
    path: string,
    errors: ValidationError[]
): void {
    if (!criteria || typeof criteria !== 'object') {
        return; // Optional field
    }

    const crit = criteria as Record<string, unknown>;
    const validTypes = ['none', 'complete-previous', 'score-threshold', 'custom', 'completion'];

    if (crit.type && !validTypes.includes(crit.type as string)) {
        errors.push({
            path: `${path}.type`,
            message: `Invalid unlock criteria type. Must be one of: ${validTypes.join(', ')}`,
            code: 'INVALID_UNLOCK_TYPE',
        });
    }

    if (crit.type === 'score-threshold') {
        if (typeof crit.threshold !== 'number' || crit.threshold < 0 || crit.threshold > 100) {
            errors.push({
                path: `${path}.threshold`,
                message: 'Score threshold must be a number between 0 and 100',
                code: 'INVALID_THRESHOLD',
            });
        }
    }

    if (crit.type === 'completion') {
        if (!crit.moduleId || typeof crit.moduleId !== 'string') {
            errors.push({
                path: `${path}.moduleId`,
                message: 'Completion criteria requires a moduleId',
                code: 'MISSING_MODULE_ID',
            });
        }
    }
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function validateRequiredString(
    obj: Record<string, unknown>,
    field: string,
    parentPath: string,
    errors: ValidationError[]
): void {
    if (!obj[field] || typeof obj[field] !== 'string') {
        errors.push({
            path: `${parentPath}.${field}`,
            message: `${field} is required and must be a string`,
            code: `MISSING_${field.toUpperCase()}`,
        });
    }
}

function validateRequiredNumber(
    obj: Record<string, unknown>,
    field: string,
    parentPath: string,
    errors: ValidationError[]
): void {
    if (obj[field] === undefined || typeof obj[field] !== 'number') {
        errors.push({
            path: `${parentPath}.${field}`,
            message: `${field} is required and must be a number`,
            code: `MISSING_${field.toUpperCase()}`,
        });
    }
}

// ============================================================
// PARSE AND VALIDATE
// ============================================================

/**
 * Parse JSON string and validate as curriculum
 */
export function parseAndValidateCurriculum(jsonString: string): {
    curriculum: Curriculum | null;
    validation: ValidationResult;
} {
    let parsed: unknown;

    try {
        parsed = JSON.parse(jsonString);
    } catch (error) {
        return {
            curriculum: null,
            validation: {
                valid: false,
                errors: [{
                    path: 'root',
                    message: `Invalid JSON: ${error instanceof Error ? error.message : 'Parse error'}`,
                    code: 'JSON_PARSE_ERROR',
                }],
                warnings: [],
            },
        };
    }

    const validation = validateCurriculum(parsed);

    return {
        curriculum: validation.valid ? parsed as Curriculum : null,
        validation,
    };
}

/**
 * Get a summary of validation results
 */
export function getValidationSummary(result: ValidationResult): string {
    if (result.valid) {
        const warningText = result.warnings.length > 0
            ? ` with ${result.warnings.length} warning(s)`
            : '';
        return `✓ Valid curriculum${warningText}`;
    }

    return `✗ Invalid: ${result.errors.length} error(s), ${result.warnings.length} warning(s)`;
}
