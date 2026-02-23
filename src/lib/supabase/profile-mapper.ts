import { UserProfile } from '@/lib/types';

export interface ProfileRow {
  id: string;
  name: string;
  age: number;
  height: number;
  weight: number;
  gender: string;
  activity_level: string;
  goal: string;
  dietary_preference: string;
  allergies: string[];
  dislikes: string[];
  meals_per_day: number;
  cooking_equipment: string[];
  food_palette: string[];
  pantry_always: string[];
  pantry_usually: string[];
  daily_calories: number;
  daily_protein: number;
  daily_carbs: number;
  daily_fat: number;
  per_meal_calories: number;
  per_meal_protein: number;
  per_meal_carbs: number;
  per_meal_fat: number;
  onboarding_complete: boolean;
}

export function rowToProfile(row: ProfileRow): UserProfile {
  return {
    name: row.name,
    age: row.age,
    height: row.height,
    weight: row.weight,
    gender: row.gender as UserProfile['gender'],
    activityLevel: row.activity_level as UserProfile['activityLevel'],
    goal: row.goal as UserProfile['goal'],
    dietaryPreference: row.dietary_preference as UserProfile['dietaryPreference'],
    allergies: row.allergies || [],
    dislikes: row.dislikes || [],
    mealsPerDay: row.meals_per_day,
    cookingEquipment: row.cooking_equipment || [],
    foodPalette: row.food_palette || ['indian'],
    pantryAlways: row.pantry_always || [],
    pantryUsually: row.pantry_usually || [],
    dailyCalories: row.daily_calories,
    dailyProtein: row.daily_protein,
    dailyCarbs: row.daily_carbs,
    dailyFat: row.daily_fat,
    perMealCalories: row.per_meal_calories,
    perMealProtein: row.per_meal_protein,
    perMealCarbs: row.per_meal_carbs,
    perMealFat: row.per_meal_fat,
    onboardingComplete: row.onboarding_complete,
  };
}

export function profileToRow(profile: UserProfile): Omit<ProfileRow, 'id'> {
  return {
    name: profile.name,
    age: profile.age,
    height: profile.height,
    weight: profile.weight,
    gender: profile.gender,
    activity_level: profile.activityLevel,
    goal: profile.goal,
    dietary_preference: profile.dietaryPreference,
    allergies: profile.allergies,
    dislikes: profile.dislikes,
    meals_per_day: profile.mealsPerDay,
    cooking_equipment: profile.cookingEquipment,
    food_palette: profile.foodPalette,
    pantry_always: profile.pantryAlways,
    pantry_usually: profile.pantryUsually,
    daily_calories: profile.dailyCalories,
    daily_protein: profile.dailyProtein,
    daily_carbs: profile.dailyCarbs,
    daily_fat: profile.dailyFat,
    per_meal_calories: profile.perMealCalories,
    per_meal_protein: profile.perMealProtein,
    per_meal_carbs: profile.perMealCarbs,
    per_meal_fat: profile.perMealFat,
    onboarding_complete: profile.onboardingComplete,
  };
}
