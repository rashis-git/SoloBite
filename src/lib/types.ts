export interface UserProfile {
  name: string;
  age: number;
  height: number; // cm
  weight: number; // kg
  gender: 'male' | 'female' | 'other';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active';
  goal: 'lose' | 'maintain' | 'gain';
  dietaryPreference: 'veg' | 'nonveg' | 'egg' | 'vegan';
  allergies: string[];
  dislikes: string[];
  mealsPerDay: number;
  cookingEquipment: string[];
  foodPalette: string[];
  pantryAlways: string[];   // Always available (6+ month shelf life)
  pantryUsually: string[];  // Usually available (2-4 week shelf life)
  dailyCalories: number;
  dailyProtein: number;
  dailyCarbs: number;
  dailyFat: number;
  perMealCalories: number;
  perMealProtein: number;
  perMealCarbs: number;
  perMealFat: number;
  onboardingComplete: boolean;
}

export interface Recipe {
  name: string;
  prepTime: number;     // minutes
  cookTime: number;     // minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: RecipeIngredient[];
  steps: string[];
  deltaUpgrades: DeltaUpgrade[];
  tags: string[];       // e.g., "high-protein", "quick", "comfort"
}

export interface RecipeIngredient {
  name: string;
  quantity: string;
  available: boolean;   // true = user has it, false = needs to buy
  estimatedCost?: number; // INR, only if not available
}

export interface DeltaUpgrade {
  itemsNeeded: string[];
  estimatedCost: number;
  recipeName: string;
  calories: number;
  protein: number;
  description: string;
}

export interface YouTubeVideo {
  title: string;
  channelName: string;
  thumbnailUrl: string;
  videoUrl: string;
  viewCount?: string;
  duration?: string;
}

export interface WeeklyPlan {
  days: DayPlan[];
  groceryList: GroceryItem[];
  totalEstimatedCost: number;
  ingredientThreads: IngredientThread[];
}

export interface DayPlan {
  day: string; // Monday, Tuesday, etc.
  meals: MealSlot[];
}

export interface MealSlot {
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  recipe: Recipe;
}

export interface GroceryItem {
  name: string;
  quantity: string;
  category: 'vegetables' | 'fruits' | 'protein' | 'dairy' | 'grains' | 'pantry' | 'other';
  estimatedCost: number;
  usedInMeals: string[]; // e.g., ["Mon breakfast", "Wed dinner"]
}

export interface IngredientThread {
  ingredient: string;
  usedIn: string[]; // e.g., ["Monday Breakfast: Avocado Toast", "Tuesday Lunch: Guacamole Bowl"]
}

export type OnboardingStep =
  | 'welcome'
  | 'body-stats'
  | 'activity-goal'
  | 'diet-allergies'
  | 'kitchen-setup'
  | 'pantry-review'
  | 'targets-review';

export type CuisineOption = 'indian' | 'south-indian' | 'continental' | 'mixed';

export const CUISINE_OPTIONS: { value: CuisineOption; label: string }[] = [
  { value: 'indian', label: 'Indian' },
  { value: 'south-indian', label: 'South Indian' },
  { value: 'continental', label: 'Continental' },
  { value: 'mixed', label: 'Mixed / Global' },
];
