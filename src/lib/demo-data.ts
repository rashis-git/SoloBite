import { Recipe, WeeklyPlan } from './types';

export const DEMO_RECIPES: Record<string, Recipe> = {
  quick: {
    name: "Masala Egg Bhurji",
    prepTime: 5,
    cookTime: 10,
    difficulty: "beginner",
    servings: 1,
    calories: 340,
    protein: 22,
    carbs: 12,
    fat: 24,
    ingredients: [
      { name: "Eggs", quantity: "2", available: true },
      { name: "Onion (chopped)", quantity: "1 small", available: true },
      { name: "Tomato (chopped)", quantity: "1 small", available: true },
      { name: "Green chilli (chopped)", quantity: "1", available: true },
      { name: "Turmeric", quantity: "1/4 tsp", available: true },
      { name: "Red chili powder", quantity: "1/4 tsp", available: true },
      { name: "Oil", quantity: "1 tbsp", available: true },
      { name: "Salt", quantity: "to taste", available: true },
      { name: "Coriander leaves", quantity: "for garnish", available: true },
      { name: "Bread slices", quantity: "2", available: false, estimatedCost: 10 },
    ],
    steps: [
      "Heat oil in a non-stick pan on medium heat (1 min)",
      "Add chopped onions and green chilli, cook until onions turn light brown (3 min)",
      "Add chopped tomatoes, turmeric, red chili powder, and salt. Cook until tomatoes soften (2 min)",
      "Crack 2 eggs directly into the pan. Stir quickly to scramble and mix with the masala (2 min)",
      "Cook until eggs are set but still slightly soft. Don't overcook — they'll keep cooking in the hot pan (1 min)",
      "Turn off heat. Garnish with chopped coriander leaves. Serve hot with bread or roti.",
    ],
    deltaUpgrades: [
      {
        itemsNeeded: ["bread", "cheese slice"],
        estimatedCost: 40,
        recipeName: "Masala Egg Cheese Sandwich",
        calories: 480,
        protein: 30,
        description: "Toast bread, add bhurji and cheese for a filling sandwich",
      },
    ],
    tags: ["quick", "high-protein", "beginner"],
  },

  protein: {
    name: "Paneer Tikka Stir-Fry",
    prepTime: 10,
    cookTime: 12,
    difficulty: "beginner",
    servings: 1,
    calories: 420,
    protein: 38,
    carbs: 15,
    fat: 26,
    ingredients: [
      { name: "Paneer", quantity: "150g (cubed)", available: false, estimatedCost: 60 },
      { name: "Capsicum", quantity: "1/2 (sliced)", available: false, estimatedCost: 15 },
      { name: "Onion", quantity: "1 medium (sliced)", available: true },
      { name: "Curd", quantity: "2 tbsp", available: false, estimatedCost: 10 },
      { name: "Tikka masala", quantity: "1 tbsp", available: true },
      { name: "Oil", quantity: "1 tbsp", available: true },
      { name: "Lemon juice", quantity: "1 tsp", available: true },
      { name: "Salt", quantity: "to taste", available: true },
    ],
    steps: [
      "Mix curd, tikka masala, lemon juice, and salt in a bowl. Add paneer cubes and coat well. Let it sit for 5 min while you chop veggies.",
      "Heat oil in a pan or kadhai on high heat (1 min)",
      "Add marinated paneer cubes. Don't move them for 2 min — let them get a nice char on one side.",
      "Flip paneer, add sliced onions and capsicum. Stir-fry on high heat for 3-4 min.",
      "Everything should have slight char marks. Squeeze a little lemon on top.",
      "Serve hot. Great on its own or with a roti.",
    ],
    deltaUpgrades: [
      {
        itemsNeeded: ["rice", "butter"],
        estimatedCost: 20,
        recipeName: "Paneer Tikka Rice Bowl",
        calories: 620,
        protein: 42,
        description: "Serve over hot buttered rice for a complete meal",
      },
    ],
    tags: ["high-protein", "quick"],
  },

  comfort: {
    name: "One-Pot Dal Tadka",
    prepTime: 5,
    cookTime: 20,
    difficulty: "beginner",
    servings: 1,
    calories: 380,
    protein: 18,
    carbs: 52,
    fat: 12,
    ingredients: [
      { name: "Toor dal", quantity: "1/2 cup", available: true },
      { name: "Onion (chopped)", quantity: "1 small", available: true },
      { name: "Tomato (chopped)", quantity: "1", available: true },
      { name: "Garlic (minced)", quantity: "3 cloves", available: true },
      { name: "Ghee", quantity: "1 tbsp", available: true },
      { name: "Cumin seeds", quantity: "1/2 tsp", available: true },
      { name: "Turmeric", quantity: "1/4 tsp", available: true },
      { name: "Red chili powder", quantity: "1/4 tsp", available: true },
      { name: "Salt", quantity: "to taste", available: true },
      { name: "Water", quantity: "1.5 cups", available: true },
      { name: "Coriander leaves", quantity: "for garnish", available: true },
    ],
    steps: [
      "Wash dal and add to pressure cooker with 1.5 cups water, turmeric, and salt. Cook for 3 whistles (about 10 min).",
      "While dal cooks, heat ghee in a small pan. Add cumin seeds — wait for them to crackle (30 sec).",
      "Add minced garlic, cook for 30 seconds until fragrant. Don't let it burn.",
      "Add chopped onions, cook until golden (3 min). Add tomatoes and red chili powder, cook until soft (2 min).",
      "Open the pressure cooker. Mash the dal lightly with a spoon. Pour the tadka (tempering) over the dal.",
      "Mix well. Garnish with coriander. Serve with rice or roti.",
    ],
    deltaUpgrades: [
      {
        itemsNeeded: ["spinach (1 bunch)"],
        estimatedCost: 20,
        recipeName: "Dal Palak",
        calories: 400,
        protein: 22,
        description: "Add chopped spinach for extra iron and protein",
      },
    ],
    tags: ["comfort", "beginner", "zero-waste"],
  },

  light: {
    name: "Cucumber Moong Sprout Salad",
    prepTime: 10,
    cookTime: 0,
    difficulty: "beginner",
    servings: 1,
    calories: 220,
    protein: 14,
    carbs: 28,
    fat: 6,
    ingredients: [
      { name: "Moong sprouts", quantity: "1 cup", available: false, estimatedCost: 25 },
      { name: "Cucumber (diced)", quantity: "1/2", available: false, estimatedCost: 10 },
      { name: "Tomato (diced)", quantity: "1 small", available: true },
      { name: "Onion (finely chopped)", quantity: "1/4", available: true },
      { name: "Lemon juice", quantity: "1 tbsp", available: true },
      { name: "Chaat masala", quantity: "1/2 tsp", available: true },
      { name: "Salt", quantity: "to taste", available: true },
      { name: "Green chilli (chopped)", quantity: "1", available: true },
      { name: "Coriander leaves", quantity: "handful", available: true },
    ],
    steps: [
      "If using raw moong sprouts, boil them in water for 5 min and drain. Skip if using ready-to-eat sprouts.",
      "In a bowl, add sprouts, diced cucumber, diced tomato, and chopped onion.",
      "Add lemon juice, chaat masala, salt, and chopped green chilli.",
      "Toss everything together. Garnish with coriander leaves.",
      "Eat immediately — sprout salads taste best fresh.",
    ],
    deltaUpgrades: [
      {
        itemsNeeded: ["peanuts (roasted)", "pomegranate"],
        estimatedCost: 40,
        recipeName: "Loaded Sprout Chaat Bowl",
        calories: 310,
        protein: 18,
        description: "Add crunch with peanuts and sweetness with pomegranate",
      },
    ],
    tags: ["light", "no-cook", "healthy"],
  },

  surprise: {
    name: "Peanut Butter Banana Overnight Oats",
    prepTime: 5,
    cookTime: 0,
    difficulty: "beginner",
    servings: 1,
    calories: 420,
    protein: 16,
    carbs: 58,
    fat: 16,
    ingredients: [
      { name: "Rolled oats", quantity: "1/2 cup", available: false, estimatedCost: 15 },
      { name: "Milk", quantity: "1/2 cup", available: false, estimatedCost: 15 },
      { name: "Curd", quantity: "2 tbsp", available: false, estimatedCost: 10 },
      { name: "Peanut butter", quantity: "1 tbsp", available: false, estimatedCost: 15 },
      { name: "Banana", quantity: "1 small (sliced)", available: false, estimatedCost: 5 },
      { name: "Honey", quantity: "1 tsp", available: true },
      { name: "Chia seeds", quantity: "1 tsp (optional)", available: false, estimatedCost: 10 },
    ],
    steps: [
      "In a jar or container, add oats, milk, curd, and chia seeds. Stir well.",
      "Add peanut butter and honey. Mix until peanut butter is roughly combined (it's okay if it's chunky).",
      "Add half the banana slices and press them in gently.",
      "Cover and refrigerate overnight (or at least 4 hours).",
      "In the morning, top with remaining banana slices. Eat cold — straight from the fridge.",
    ],
    deltaUpgrades: [
      {
        itemsNeeded: ["cocoa powder", "dark chocolate chips"],
        estimatedCost: 30,
        recipeName: "Chocolate PB Overnight Oats",
        calories: 480,
        protein: 18,
        description: "Add cocoa and chocolate chips for a dessert-like breakfast",
      },
    ],
    tags: ["no-cook", "meal-prep", "breakfast"],
  },

  leftover: {
    name: "Dal Paratha (from leftover dal)",
    prepTime: 10,
    cookTime: 15,
    difficulty: "intermediate",
    servings: 1,
    calories: 380,
    protein: 16,
    carbs: 48,
    fat: 14,
    ingredients: [
      { name: "Leftover dal", quantity: "1/2 cup (thick)", available: true },
      { name: "Atta (wheat flour)", quantity: "1 cup", available: true },
      { name: "Salt", quantity: "to taste", available: true },
      { name: "Oil/Ghee", quantity: "2 tsp", available: true },
      { name: "Green chilli (chopped)", quantity: "1", available: true },
      { name: "Cumin powder", quantity: "1/4 tsp", available: true },
    ],
    steps: [
      "If dal is watery, heat it in a pan until thick (should be paste-like). Let it cool slightly.",
      "Mix atta, salt, and a little oil. Knead into a firm dough using water as needed. Rest for 5 min.",
      "Mix chopped green chilli and cumin powder into the dal.",
      "Take a ball of dough, roll into a small circle. Place a spoon of dal in the center.",
      "Fold the edges to seal, flatten gently, and roll out carefully (don't press too hard or dal will leak).",
      "Cook on a hot tawa with a little ghee on both sides until golden brown spots appear (2-3 min per side).",
      "Serve hot with curd or pickle.",
    ],
    deltaUpgrades: [
      {
        itemsNeeded: ["pickle", "curd"],
        estimatedCost: 20,
        recipeName: "Dal Paratha Thali",
        calories: 440,
        protein: 20,
        description: "Serve with curd and pickle for a complete meal",
      },
    ],
    tags: ["leftover-rescue", "zero-waste", "filling"],
  },
};

export function getDemoRecipe(input: string): Recipe {
  const lower = input.toLowerCase();

  if (lower.includes('quick') || lower.includes('fast') || lower.includes('15 min')) {
    return DEMO_RECIPES.quick;
  }
  if (lower.includes('protein') || lower.includes('gym') || lower.includes('muscle')) {
    return DEMO_RECIPES.protein;
  }
  if (lower.includes('comfort') || lower.includes('warm') || lower.includes('cozy')) {
    return DEMO_RECIPES.comfort;
  }
  if (lower.includes('light') || lower.includes('salad') || lower.includes('fresh')) {
    return DEMO_RECIPES.light;
  }
  if (lower.includes('leftover') || lower.includes('dal') || lower.includes('repurpose')) {
    return DEMO_RECIPES.leftover;
  }
  if (lower.includes('oats') || lower.includes('breakfast') || lower.includes('overnight')) {
    return DEMO_RECIPES.surprise;
  }
  if (lower.includes('egg') || lower.includes('anda')) {
    return DEMO_RECIPES.quick;
  }
  if (lower.includes('paneer')) {
    return DEMO_RECIPES.protein;
  }

  // Default: surprise
  return DEMO_RECIPES.surprise;
}

export const DEMO_WEEKLY_PLAN: WeeklyPlan = {
  days: [
    {
      day: "Monday",
      meals: [
        { type: "breakfast", recipe: { ...DEMO_RECIPES.surprise, name: "Peanut Butter Banana Overnight Oats" } },
        { type: "lunch", recipe: { ...DEMO_RECIPES.comfort, name: "One-Pot Dal Tadka with Rice" } },
        { type: "dinner", recipe: { ...DEMO_RECIPES.quick, name: "Masala Egg Bhurji with Roti" } },
      ],
    },
    {
      day: "Tuesday",
      meals: [
        { type: "breakfast", recipe: { ...DEMO_RECIPES.quick, name: "Vegetable Poha", calories: 280, protein: 8, carbs: 42, fat: 10 } },
        { type: "lunch", recipe: { ...DEMO_RECIPES.protein, name: "Paneer Tikka Wrap", calories: 450, protein: 32, carbs: 35, fat: 20 } },
        { type: "dinner", recipe: { ...DEMO_RECIPES.light, name: "Sprout Salad + Tomato Soup", calories: 300, protein: 16, carbs: 38, fat: 8 } },
      ],
    },
    {
      day: "Wednesday",
      meals: [
        { type: "breakfast", recipe: { ...DEMO_RECIPES.light, name: "Moong Dal Chilla", calories: 250, protein: 14, carbs: 30, fat: 8 } },
        { type: "lunch", recipe: { ...DEMO_RECIPES.comfort, name: "Rajma Rice Bowl", calories: 480, protein: 18, carbs: 68, fat: 12 } },
        { type: "dinner", recipe: { ...DEMO_RECIPES.protein, name: "Paneer Bhurji with Roti", calories: 400, protein: 28, carbs: 30, fat: 20 } },
      ],
    },
    {
      day: "Thursday",
      meals: [
        { type: "breakfast", recipe: { ...DEMO_RECIPES.surprise, name: "Chia Pudding with Mango", calories: 300, protein: 10, carbs: 40, fat: 12 } },
        { type: "lunch", recipe: { ...DEMO_RECIPES.quick, name: "Egg Fried Rice", calories: 420, protein: 18, carbs: 52, fat: 16 } },
        { type: "dinner", recipe: { ...DEMO_RECIPES.comfort, name: "Aloo Gobi with Chapati", calories: 360, protein: 10, carbs: 48, fat: 14 } },
      ],
    },
    {
      day: "Friday",
      meals: [
        { type: "breakfast", recipe: { ...DEMO_RECIPES.quick, name: "Bread Omelette", calories: 320, protein: 20, carbs: 28, fat: 14 } },
        { type: "lunch", recipe: { ...DEMO_RECIPES.comfort, name: "Chole with Jeera Rice", calories: 480, protein: 16, carbs: 62, fat: 18 } },
        { type: "dinner", recipe: { ...DEMO_RECIPES.light, name: "Palak Paneer (Light)", calories: 350, protein: 24, carbs: 18, fat: 22 } },
      ],
    },
    {
      day: "Saturday",
      meals: [
        { type: "breakfast", recipe: { ...DEMO_RECIPES.surprise, name: "Masala Dosa (Instant Batter)", calories: 380, protein: 10, carbs: 52, fat: 16 } },
        { type: "lunch", recipe: { ...DEMO_RECIPES.protein, name: "Soya Chunk Biryani", calories: 500, protein: 30, carbs: 60, fat: 16 } },
        { type: "dinner", recipe: { ...DEMO_RECIPES.quick, name: "Tomato Egg Curry + Rice", calories: 420, protein: 20, carbs: 48, fat: 18 } },
      ],
    },
    {
      day: "Sunday",
      meals: [
        { type: "breakfast", recipe: { ...DEMO_RECIPES.comfort, name: "Aloo Paratha with Curd", calories: 400, protein: 12, carbs: 50, fat: 18 } },
        { type: "lunch", recipe: { ...DEMO_RECIPES.protein, name: "Paneer Butter Masala + Naan", calories: 550, protein: 28, carbs: 45, fat: 28 } },
        { type: "dinner", recipe: { ...DEMO_RECIPES.light, name: "Khichdi with Pickle", calories: 350, protein: 14, carbs: 52, fat: 8 } },
      ],
    },
  ],
  groceryList: [
    { name: "Paneer", quantity: "400g", category: "dairy", estimatedCost: 160, usedInMeals: ["Tue lunch", "Wed dinner", "Fri dinner", "Sun lunch"] },
    { name: "Eggs", quantity: "12", category: "protein", estimatedCost: 84, usedInMeals: ["Mon dinner", "Thu lunch", "Fri breakfast", "Sat dinner"] },
    { name: "Onions", quantity: "1 kg", category: "vegetables", estimatedCost: 40, usedInMeals: ["Daily use"] },
    { name: "Tomatoes", quantity: "1 kg", category: "vegetables", estimatedCost: 40, usedInMeals: ["Daily use"] },
    { name: "Bananas", quantity: "4", category: "fruits", estimatedCost: 20, usedInMeals: ["Mon breakfast", "Thu breakfast"] },
    { name: "Capsicum", quantity: "2", category: "vegetables", estimatedCost: 30, usedInMeals: ["Tue lunch", "Thu dinner"] },
    { name: "Spinach", quantity: "1 bunch", category: "vegetables", estimatedCost: 20, usedInMeals: ["Fri dinner"] },
    { name: "Curd", quantity: "500g", category: "dairy", estimatedCost: 30, usedInMeals: ["Mon breakfast", "Sun breakfast"] },
    { name: "Rolled oats", quantity: "200g", category: "grains", estimatedCost: 40, usedInMeals: ["Mon breakfast"] },
    { name: "Moong sprouts", quantity: "200g", category: "protein", estimatedCost: 30, usedInMeals: ["Tue dinner", "Wed breakfast"] },
    { name: "Bread", quantity: "1 pack", category: "grains", estimatedCost: 40, usedInMeals: ["Mon dinner", "Fri breakfast"] },
    { name: "Rajma (kidney beans)", quantity: "250g", category: "protein", estimatedCost: 45, usedInMeals: ["Wed lunch"] },
    { name: "Chole (chickpeas)", quantity: "250g", category: "protein", estimatedCost: 40, usedInMeals: ["Fri lunch"] },
    { name: "Soya chunks", quantity: "200g", category: "protein", estimatedCost: 35, usedInMeals: ["Sat lunch"] },
    { name: "Potato", quantity: "500g", category: "vegetables", estimatedCost: 20, usedInMeals: ["Thu dinner", "Sun breakfast"] },
    { name: "Cauliflower", quantity: "1 small", category: "vegetables", estimatedCost: 25, usedInMeals: ["Thu dinner"] },
    { name: "Peanut butter", quantity: "1 small jar", category: "pantry", estimatedCost: 80, usedInMeals: ["Mon breakfast"] },
  ],
  totalEstimatedCost: 779,
  ingredientThreads: [
    { ingredient: "Paneer (400g)", usedIn: ["Tuesday Lunch: Paneer Tikka Wrap", "Wednesday Dinner: Paneer Bhurji", "Friday Dinner: Palak Paneer", "Sunday Lunch: Paneer Butter Masala"] },
    { ingredient: "Eggs (12)", usedIn: ["Monday Dinner: Masala Egg Bhurji", "Thursday Lunch: Egg Fried Rice", "Friday Breakfast: Bread Omelette", "Saturday Dinner: Tomato Egg Curry"] },
    { ingredient: "Bananas (4)", usedIn: ["Monday Breakfast: PB Overnight Oats (2)", "Thursday Breakfast: Chia Pudding (2)"] },
    { ingredient: "Curd (500g)", usedIn: ["Monday Breakfast: Overnight Oats", "Tuesday Lunch: Paneer marinade", "Sunday Breakfast: With Paratha"] },
  ],
};
