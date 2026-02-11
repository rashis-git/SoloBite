// Mifflin-St Jeor equation for BMR
export function calculateBMR(
  weight: number,  // kg
  height: number,  // cm
  age: number,
  gender: 'male' | 'female' | 'other'
): number {
  // For 'other', use average of male and female
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else if (gender === 'female') {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  } else {
    const male = 10 * weight + 6.25 * height - 5 * age + 5;
    const female = 10 * weight + 6.25 * height - 5 * age - 161;
    return Math.round((male + female) / 2);
  }
}

// Activity multipliers for TDEE
const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,    // Desk job, minimal exercise
  light: 1.375,      // Light activity (walks, yoga)
  moderate: 1.55,    // Gym 3-4x/week
  active: 1.725,     // Daily intense exercise
};

// Goal adjustments
const GOAL_ADJUSTMENTS = {
  lose: -300,      // 300 calorie deficit
  maintain: 0,
  gain: 300,       // 300 calorie surplus
};

export function calculateTDEE(
  weight: number,
  height: number,
  age: number,
  gender: 'male' | 'female' | 'other',
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active',
  goal: 'lose' | 'maintain' | 'gain'
): {
  dailyCalories: number;
  dailyProtein: number;
  dailyCarbs: number;
  dailyFat: number;
} {
  const bmr = calculateBMR(weight, height, age, gender);
  const tdee = bmr * ACTIVITY_MULTIPLIERS[activityLevel];
  const adjustedCalories = Math.round(tdee + GOAL_ADJUSTMENTS[goal]);

  // Macro split based on goal
  let proteinRatio: number, carbRatio: number, fatRatio: number;

  if (goal === 'lose') {
    // Higher protein for muscle preservation during cut
    proteinRatio = 0.35;
    carbRatio = 0.35;
    fatRatio = 0.30;
  } else if (goal === 'gain') {
    // Higher carbs for energy during bulk
    proteinRatio = 0.30;
    carbRatio = 0.45;
    fatRatio = 0.25;
  } else {
    // Balanced for maintenance
    proteinRatio = 0.30;
    carbRatio = 0.40;
    fatRatio = 0.30;
  }

  return {
    dailyCalories: adjustedCalories,
    dailyProtein: Math.round((adjustedCalories * proteinRatio) / 4), // 4 cal per gram protein
    dailyCarbs: Math.round((adjustedCalories * carbRatio) / 4),     // 4 cal per gram carbs
    dailyFat: Math.round((adjustedCalories * fatRatio) / 9),        // 9 cal per gram fat
  };
}

export function calculatePerMealTargets(
  daily: { dailyCalories: number; dailyProtein: number; dailyCarbs: number; dailyFat: number },
  mealsPerDay: number
) {
  return {
    perMealCalories: Math.round(daily.dailyCalories / mealsPerDay),
    perMealProtein: Math.round(daily.dailyProtein / mealsPerDay),
    perMealCarbs: Math.round(daily.dailyCarbs / mealsPerDay),
    perMealFat: Math.round(daily.dailyFat / mealsPerDay),
  };
}

export function getTimeOfDay(): 'morning' | 'afternoon' | 'evening' | 'night' {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 16) return 'afternoon';
  if (hour >= 16 && hour < 21) return 'evening';
  return 'night';
}

export function getMealTypeFromTime(): string {
  const time = getTimeOfDay();
  switch (time) {
    case 'morning': return 'breakfast';
    case 'afternoon': return 'lunch';
    case 'evening': return 'dinner';
    case 'night': return 'late-night snack or light dinner';
  }
}
