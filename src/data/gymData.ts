// Gym Data Configuration
// Schedule: Mon/Thu = PUSH, Tue/Fri = PULL, Wed/Sat = LEGS

export interface Exercise {
    id: string;
    name: string;
    videoPath: string;
    defaultWeight: number;
    defaultReps: number;
    defaultSets: number;
}

export interface WorkoutCategory {
    id: string;
    name: string;
    fullName: string;
    emoji: string;
    gradient: string;
    exercises: Exercise[];
}

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday

export const dayToCategory: Record<DayOfWeek, string | null> = {
    0: null, // Sunday - Rest
    1: 'push', // Monday
    2: 'pull', // Tuesday
    3: 'legs', // Wednesday
    4: 'push', // Thursday
    5: 'pull', // Friday
    6: 'legs', // Saturday
};

// URL-encoded paths for Vercel compatibility
const PUSH_DIR = '/gym/PUSH%20(Chest%20%2B%20Shoulders%20%2B%20Triceps)';
const PULL_DIR = '/gym/PULL%20(Back%20%2B%20Biceps)';
const LEGS_DIR = '/gym/LEGS%20(Quads%20%2B%20Hamstrings%20%2B%20Glutes%20%2B%20Calves)';

export const workoutCategories: WorkoutCategory[] = [
    {
        id: 'push',
        name: 'PUSH',
        fullName: 'Chest + Shoulders + Triceps',
        emoji: '💪',
        gradient: 'from-rose-500 to-orange-400',
        exercises: [
            { id: 'push-1', name: 'Flat Barbell Bench Press', videoPath: `${PUSH_DIR}/1.%20Flat%20Barbell%20Bench%20Press.mp4`, defaultWeight: 60, defaultReps: 10, defaultSets: 4 },
            { id: 'push-2', name: 'Incline Dumbbell Press', videoPath: `${PUSH_DIR}/2.%20Incline%20Dumbbell%20Press.mp4`, defaultWeight: 20, defaultReps: 12, defaultSets: 3 },
            { id: 'push-3', name: 'Dumbbell Shoulder Press', videoPath: `${PUSH_DIR}/3.%20Dumbbell%20Shoulder%20Press.mp4`, defaultWeight: 15, defaultReps: 12, defaultSets: 3 },
            { id: 'push-4', name: 'Lateral Raises', videoPath: `${PUSH_DIR}/4.%20Lateral%20Raises.mp4`, defaultWeight: 8, defaultReps: 15, defaultSets: 3 },
            { id: 'push-5', name: 'Flyes Machine', videoPath: `${PUSH_DIR}/5.%20Flyes%20Machine.mp4`, defaultWeight: 40, defaultReps: 12, defaultSets: 3 },
            { id: 'push-6', name: 'Tricep Rope Pushdowns', videoPath: `${PUSH_DIR}/6.%20Tricep%20Rope%20Pushdowns.mp4`, defaultWeight: 25, defaultReps: 15, defaultSets: 3 },
            { id: 'push-7', name: 'Overhead Tricep Extension', videoPath: `${PUSH_DIR}/7.%20Overhead%20Tricep%20Extension.mp4`, defaultWeight: 15, defaultReps: 12, defaultSets: 3 },
            { id: 'push-8', name: 'Crunches', videoPath: `${PUSH_DIR}/8.%20Crunches.mp4`, defaultWeight: 0, defaultReps: 20, defaultSets: 3 },
        ],
    },
    {
        id: 'pull',
        name: 'PULL',
        fullName: 'Back + Biceps',
        emoji: '🔥',
        gradient: 'from-blue-500 to-cyan-400',
        exercises: [
            { id: 'pull-1', name: 'Deadlifts', videoPath: `${PULL_DIR}/1.%20Deadlifts.mp4`, defaultWeight: 80, defaultReps: 8, defaultSets: 4 },
            { id: 'pull-2', name: 'Barbell Bent-Over Rows', videoPath: `${PULL_DIR}/2.%20Barbell%20Bent-Over%20Rows.mp4`, defaultWeight: 50, defaultReps: 10, defaultSets: 4 },
            { id: 'pull-3', name: 'Lat Pulldown', videoPath: `${PULL_DIR}/3.%20Lat%20Pulldown.mp4`, defaultWeight: 50, defaultReps: 12, defaultSets: 3 },
            { id: 'pull-4', name: 'Seated Cable Rows', videoPath: `${PULL_DIR}/4.%20Seated%20Cable%20Rows.mp4`, defaultWeight: 45, defaultReps: 12, defaultSets: 3 },
            { id: 'pull-5', name: 'Face Pulls', videoPath: `${PULL_DIR}/5.%20Face%20Pulls.mp4`, defaultWeight: 20, defaultReps: 15, defaultSets: 3 },
            { id: 'pull-6', name: 'Barbell Bicep Curls', videoPath: `${PULL_DIR}/6.%20Barbell%20Bicep%20Curls.mp4`, defaultWeight: 25, defaultReps: 12, defaultSets: 3 },
            { id: 'pull-7', name: 'Hammer Curls', videoPath: `${PULL_DIR}/7.%20Hammer%20Curls.mp4`, defaultWeight: 12, defaultReps: 12, defaultSets: 3 },
            { id: 'pull-8', name: 'Lying Leg Raises', videoPath: `${PULL_DIR}/8.%20Lying%20Leg%20Raises.mp4`, defaultWeight: 0, defaultReps: 15, defaultSets: 3 },
        ],
    },
    {
        id: 'legs',
        name: 'LEGS',
        fullName: 'Quads + Hamstrings + Glutes + Calves',
        emoji: '🦵',
        gradient: 'from-emerald-500 to-teal-400',
        exercises: [
            { id: 'legs-1', name: 'Barbell Squats', videoPath: `${LEGS_DIR}/1.%20Barbell%20Squats.mp4`, defaultWeight: 70, defaultReps: 10, defaultSets: 4 },
            { id: 'legs-2', name: 'Leg Press', videoPath: `${LEGS_DIR}/2.%20Leg%20Press.mp4`, defaultWeight: 120, defaultReps: 12, defaultSets: 4 },
            { id: 'legs-3', name: 'Romanian Deadlifts', videoPath: `${LEGS_DIR}/3.%20Romanian%20Deadlifts.mp4`, defaultWeight: 50, defaultReps: 10, defaultSets: 3 },
            { id: 'legs-4', name: 'Walking Lunges', videoPath: `${LEGS_DIR}/4.%20Walking%20Lunges.mp4`, defaultWeight: 20, defaultReps: 12, defaultSets: 3 },
            { id: 'legs-5', name: 'Leg Curls', videoPath: `${LEGS_DIR}/5.%20Leg%20Curls.mp4`, defaultWeight: 35, defaultReps: 12, defaultSets: 3 },
            { id: 'legs-6', name: 'Leg Extensions', videoPath: `${LEGS_DIR}/6.%20Leg%20Extensions.mp4`, defaultWeight: 40, defaultReps: 12, defaultSets: 3 },
            { id: 'legs-7', name: 'Calf Raises', videoPath: `${LEGS_DIR}/7.%20Calf%20Raises.mp4`, defaultWeight: 60, defaultReps: 15, defaultSets: 4 },
            { id: 'legs-8', name: 'Abs Planks', videoPath: `${LEGS_DIR}/8.%20Abs%20Planks.mp4`, defaultWeight: 0, defaultReps: 60, defaultSets: 3 },
        ],
    },
];

export function getTodayWorkout(): WorkoutCategory | null {
    const today = new Date().getDay() as DayOfWeek;
    const categoryId = dayToCategory[today];
    if (!categoryId) return null;
    return workoutCategories.find((cat) => cat.id === categoryId) || null;
}

export function getCategoryById(id: string): WorkoutCategory | undefined {
    return workoutCategories.find((cat) => cat.id === id);
}

export function getDayName(dayIndex: DayOfWeek): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayIndex];
}
