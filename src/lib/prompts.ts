import { UserProfile } from './types';
import { getMealTypeFromTime, getTimeOfDay } from './nutrition';

export function buildRecipePrompt(
  profile: UserProfile,
  userInput: string,
  detectedIngredients: string[],
  leftovers: string[],
  servingCount: number = 1
): string {
  const mealType = getMealTypeFromTime();
  const timeOfDay = getTimeOfDay();

  return `You are SoloBite, an AI meal companion for solo diners in India. Generate a recipe based on the following context.

USER PROFILE:
- Name: ${profile.name}
- Per-meal nutrition targets: ~${profile.perMealCalories} cal, ${profile.perMealProtein}g protein, ${profile.perMealCarbs}g carbs, ${profile.perMealFat}g fat
- Dietary preference: ${profile.dietaryPreference}
- Allergies (NEVER include these): ${profile.allergies.length > 0 ? profile.allergies.join(', ') : 'None'}
- Dislikes (avoid if possible): ${profile.dislikes.length > 0 ? profile.dislikes.join(', ') : 'None'}
- Cooking equipment available: ${profile.cookingEquipment.join(', ')}
- Servings needed: ${servingCount}

PANTRY STAPLES (always available, don't need to list as "to buy"):
${profile.pantryAlways.join(', ')}

USUALLY AVAILABLE (likely has, mention if used):
${profile.pantryUsually.join(', ')}

CURRENT CONTEXT:
- Time of day: ${timeOfDay} (suggest appropriate ${mealType})
- User's input: "${userInput}"
${detectedIngredients.length > 0 ? `- Specific ingredients available today: ${detectedIngredients.join(', ')}` : ''}
${leftovers.length > 0 ? `- Leftovers to repurpose (already cooked): ${leftovers.join(', ')}` : ''}

INSTRUCTIONS:
1. Generate exactly ONE recipe for ${servingCount} serving(s).
2. Use the specific ingredients + pantry staples. Only suggest buying items if absolutely necessary.
3. If the user mentioned leftovers, suggest a recipe that TRANSFORMS them (not the original dish).
4. If the user typed a dish name or craving, generate that dish and list what they need.
5. If the user gave mood/constraint ("something quick", "high protein"), optimize for that.
6. Keep instructions in plain, simple language. No chef jargon (no "julienne", "deglaze", "blanch" — say "cut thin", "add liquid and stir", "boil briefly").
7. Only use recipes possible with the user's cooking equipment.

RESPOND IN THIS EXACT JSON FORMAT:
{
  "name": "Recipe Name",
  "prepTime": 10,
  "cookTime": 15,
  "difficulty": "beginner",
  "servings": ${servingCount},
  "calories": 450,
  "protein": 35,
  "carbs": 40,
  "fat": 15,
  "ingredients": [
    {"name": "Ingredient", "quantity": "2 medium", "available": true, "estimatedCost": null},
    {"name": "Missing item", "quantity": "100g", "available": false, "estimatedCost": 30}
  ],
  "steps": [
    "Step 1 description (2 min)",
    "Step 2 description (5 min)"
  ],
  "deltaUpgrades": [
    {
      "itemsNeeded": ["bread", "cheese"],
      "estimatedCost": 80,
      "recipeName": "Upgraded Recipe Name",
      "calories": 520,
      "protein": 42,
      "description": "Add bread and cheese to make a sandwich version"
    }
  ],
  "tags": ["high-protein", "quick", "beginner"]
}

IMPORTANT: Return ONLY valid JSON. No markdown, no explanation, no code blocks. Just the JSON object.`;
}

export function buildWeeklyPlanPrompt(
  profile: UserProfile,
  preferences: string,
  existingIngredients: string[],
  weeklyBudget?: number
): string {
  const mealTypes = [];
  if (profile.mealsPerDay >= 1) mealTypes.push('breakfast');
  if (profile.mealsPerDay >= 2) mealTypes.push('lunch');
  if (profile.mealsPerDay >= 3) mealTypes.push('dinner');
  if (profile.mealsPerDay >= 4) mealTypes.push('snack');

  return `You are SoloBite, an AI meal companion for solo diners. Generate a 7-day meal plan.

USER PROFILE:
- Name: ${profile.name}
- Daily nutrition targets: ${profile.dailyCalories} cal, ${profile.dailyProtein}g protein, ${profile.dailyCarbs}g carbs, ${profile.dailyFat}g fat
- Per-meal targets: ~${profile.perMealCalories} cal, ${profile.perMealProtein}g protein
- Dietary preference: ${profile.dietaryPreference}
- Allergies (NEVER include): ${profile.allergies.length > 0 ? profile.allergies.join(', ') : 'None'}
- Dislikes (avoid): ${profile.dislikes.length > 0 ? profile.dislikes.join(', ') : 'None'}
- Cooking equipment: ${profile.cookingEquipment.join(', ')}
- Meals per day: ${profile.mealsPerDay} (${mealTypes.join(', ')})

PANTRY STAPLES (always available):
${profile.pantryAlways.join(', ')}

USUALLY AVAILABLE:
${profile.pantryUsually.join(', ')}

${existingIngredients.length > 0 ? `INGREDIENTS ALREADY AVAILABLE:\n${existingIngredients.join(', ')}` : ''}

${preferences ? `USER PREFERENCES FOR THIS WEEK: ${preferences}` : ''}
${weeklyBudget ? `WEEKLY GROCERY BUDGET: Rs ${weeklyBudget}` : ''}

CRITICAL RULES:
1. Generate meals for 7 days (Monday to Sunday), ${profile.mealsPerDay} meals per day.
2. Each meal must be for 1 person.
3. CROSS-OPTIMIZE INGREDIENTS: If a recipe uses half an avocado on Monday, use the other half on Tuesday. Buy 500g chicken and use across 2-3 meals. Perishable items must be used within their shelf life.
4. Each meal should aim for the per-meal nutrition targets.
5. VARIETY: Don't repeat the same recipe. Vary cooking styles, flavors, and ingredients across the week.
6. Keep recipes simple (under 30 min most days, one complex recipe on weekend is OK).
7. The grocery list should be EXACT quantities for 1 person for the week. Don't overbuy.
8. Estimate costs in INR based on average Indian urban market prices.

RESPOND IN THIS EXACT JSON FORMAT:
{
  "days": [
    {
      "day": "Monday",
      "meals": [
        {
          "type": "breakfast",
          "recipe": {
            "name": "Recipe Name",
            "prepTime": 5,
            "cookTime": 10,
            "difficulty": "beginner",
            "servings": 1,
            "calories": 400,
            "protein": 25,
            "carbs": 45,
            "fat": 12,
            "ingredients": [
              {"name": "Ingredient", "quantity": "100g", "available": true, "estimatedCost": null}
            ],
            "steps": ["Step 1", "Step 2"],
            "deltaUpgrades": [],
            "tags": ["quick"]
          }
        }
      ]
    }
  ],
  "groceryList": [
    {
      "name": "Chicken breast",
      "quantity": "500g",
      "category": "protein",
      "estimatedCost": 200,
      "usedInMeals": ["Mon dinner", "Wed lunch", "Fri dinner"]
    }
  ],
  "totalEstimatedCost": 1500,
  "ingredientThreads": [
    {
      "ingredient": "Chicken breast (500g)",
      "usedIn": ["Monday Dinner: Chicken Curry", "Wednesday Lunch: Chicken Sandwich", "Friday Dinner: Chicken Stir-fry"]
    }
  ]
}

IMPORTANT: Return ONLY valid JSON. No markdown, no explanation, no code blocks.`;
}

export function buildIngredientDetectionPrompt(): string {
  return `Analyze this image of food items/refrigerator contents. Identify all visible food ingredients.

Return ONLY a JSON array of ingredient names. Be specific:
- Say "paneer" not "cheese-like item"
- Say "tomatoes (3)" not just "vegetables"
- Say "leftover dal" if it looks like a cooked dish
- Include quantities where visible (e.g., "eggs (4)", "1 onion")
- Include brand names if visible for packaged items

Example: ["eggs (4)", "tomatoes (2)", "spinach (1 bunch)", "paneer (200g block)", "milk (500ml)", "onion (1)", "green chillies"]

Return ONLY the JSON array. No explanation.`;
}
