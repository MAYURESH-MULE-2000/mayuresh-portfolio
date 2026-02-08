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

export const workoutCategories: WorkoutCategory[] = [
    {
        id: 'push',
        name: 'PUSH',
        fullName: 'Chest + Shoulders + Triceps',
        emoji: '💪',
        gradient: 'from-rose-500 to-orange-400',
        exercises: [
            { id: 'push-1', name: 'Flat Barbell Bench Press', videoPath: '/gym/PUSH (Chest + Shoulders + Triceps)/1. Flat Barbell Bench Press.mp4', defaultWeight: 60, defaultReps: 10, defaultSets: 4 },
            { id: 'push-2', name: 'Incline Dumbbell Press', videoPath: '/gym/PUSH (Chest + Shoulders + Triceps)/2. Incline Dumbbell Press.mp4', defaultWeight: 20, defaultReps: 12, defaultSets: 3 },
            { id: 'push-3', name: 'Dumbbell Shoulder Press', videoPath: '/gym/PUSH (Chest + Shoulders + Triceps)/3. Dumbbell Shoulder Press.mp4', defaultWeight: 15, defaultReps: 12, defaultSets: 3 },
            { id: 'push-4', name: 'Lateral Raises', videoPath: '/gym/PUSH (Chest + Shoulders + Triceps)/4. Lateral Raises.mp4', defaultWeight: 8, defaultReps: 15, defaultSets: 3 },
            { id: 'push-5', name: 'Flyes Machine', videoPath: '/gym/PUSH (Chest + Shoulders + Triceps)/5. Flyes Machine.mp4', defaultWeight: 40, defaultReps: 12, defaultSets: 3 },
            { id: 'push-6', name: 'Tricep Rope Pushdowns', videoPath: '/gym/PUSH (Chest + Shoulders + Triceps)/6. Tricep Rope Pushdowns.mp4', defaultWeight: 25, defaultReps: 15, defaultSets: 3 },
            { id: 'push-7', name: 'Overhead Tricep Extension', videoPath: '/gym/PUSH (Chest + Shoulders + Triceps)/7. Overhead Tricep Extension.mp4', defaultWeight: 15, defaultReps: 12, defaultSets: 3 },
            { id: 'push-8', name: 'Crunches', videoPath: '/gym/PUSH (Chest + Shoulders + Triceps)/8. Crunches.mp4', defaultWeight: 0, defaultReps: 20, defaultSets: 3 },
        ],
    },
    {
        id: 'pull',
        name: 'PULL',
        fullName: 'Back + Biceps',
        emoji: '🔥',
        gradient: 'from-blue-500 to-cyan-400',
        exercises: [
            { id: 'pull-1', name: 'Deadlifts', videoPath: '/gym/PULL (Back + Biceps)/1. Deadlifts.mp4', defaultWeight: 80, defaultReps: 8, defaultSets: 4 },
            { id: 'pull-2', name: 'Barbell Bent-Over Rows', videoPath: '/gym/PULL (Back + Biceps)/2. Barbell Bent-Over Rows.mp4', defaultWeight: 50, defaultReps: 10, defaultSets: 4 },
            { id: 'pull-3', name: 'Lat Pulldown', videoPath: '/gym/PULL (Back + Biceps)/3. Lat Pulldown.mp4', defaultWeight: 50, defaultReps: 12, defaultSets: 3 },
            { id: 'pull-4', name: 'Seated Cable Rows', videoPath: '/gym/PULL (Back + Biceps)/4. Seated Cable Rows.mp4', defaultWeight: 45, defaultReps: 12, defaultSets: 3 },
            { id: 'pull-5', name: 'Face Pulls', videoPath: '/gym/PULL (Back + Biceps)/5. Face Pulls.mp4', defaultWeight: 20, defaultReps: 15, defaultSets: 3 },
            { id: 'pull-6', name: 'Barbell Bicep Curls', videoPath: '/gym/PULL (Back + Biceps)/6. Barbell Bicep Curls.mp4', defaultWeight: 25, defaultReps: 12, defaultSets: 3 },
            { id: 'pull-7', name: 'Hammer Curls', videoPath: '/gym/PULL (Back + Biceps)/7. Hammer Curls.mp4', defaultWeight: 12, defaultReps: 12, defaultSets: 3 },
            { id: 'pull-8', name: 'Lying Leg Raises', videoPath: '/gym/PULL (Back + Biceps)/8. Lying Leg Raises.mp4', defaultWeight: 0, defaultReps: 15, defaultSets: 3 },
        ],
    },
    {
        id: 'legs',
        name: 'LEGS',
        fullName: 'Quads + Hamstrings + Glutes + Calves',
        emoji: '🦵',
        gradient: 'from-emerald-500 to-teal-400',
        exercises: [
            { id: 'legs-1', name: 'Barbell Squats', videoPath: '/gym/LEGS (Quads + Hamstrings + Glutes + Calves)/1. Barbell Squats.mp4', defaultWeight: 70, defaultReps: 10, defaultSets: 4 },
            { id: 'legs-2', name: 'Leg Press', videoPath: '/gym/LEGS (Quads + Hamstrings + Glutes + Calves)/2. Leg Press.mp4', defaultWeight: 120, defaultReps: 12, defaultSets: 4 },
            { id: 'legs-3', name: 'Romanian Deadlifts', videoPath: '/gym/LEGS (Quads + Hamstrings + Glutes + Calves)/3. Romanian Deadlifts.mp4', defaultWeight: 50, defaultReps: 10, defaultSets: 3 },
            { id: 'legs-4', name: 'Walking Lunges', videoPath: '/gym/LEGS (Quads + Hamstrings + Glutes + Calves)/4. Walking Lunges.mp4', defaultWeight: 20, defaultReps: 12, defaultSets: 3 },
            { id: 'legs-5', name: 'Leg Curls', videoPath: '/gym/LEGS (Quads + Hamstrings + Glutes + Calves)/5. Leg Curls.mp4', defaultWeight: 35, defaultReps: 12, defaultSets: 3 },
            { id: 'legs-6', name: 'Leg Extensions', videoPath: '/gym/LEGS (Quads + Hamstrings + Glutes + Calves)/6. Leg Extensions.mp4', defaultWeight: 40, defaultReps: 12, defaultSets: 3 },
            { id: 'legs-7', name: 'Calf Raises', videoPath: '/gym/LEGS (Quads + Hamstrings + Glutes + Calves)/7. Calf Raises.mp4', defaultWeight: 60, defaultReps: 15, defaultSets: 4 },
            { id: 'legs-8', name: 'Abs Planks', videoPath: '/gym/LEGS (Quads + Hamstrings + Glutes + Calves)/8. Abs Planks.mp4', defaultWeight: 0, defaultReps: 60, defaultSets: 3 },
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
