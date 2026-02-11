import { NextRequest, NextResponse } from 'next/server';
import { generateText } from '@/lib/ai-client';
import { buildRecipePrompt } from '@/lib/prompts';
import { UserProfile } from '@/lib/types';
import { getDemoRecipe } from '@/lib/demo-data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      profile,
      userInput,
      detectedIngredients = [],
      leftovers = [],
      servingCount = 1,
    } = body as {
      profile: UserProfile;
      userInput: string;
      detectedIngredients: string[];
      leftovers: string[];
      servingCount: number;
    };

    if (!profile) {
      return NextResponse.json({ error: 'Profile required' }, { status: 400 });
    }

    // Try AI first
    try {
      const prompt = buildRecipePrompt(profile, userInput, detectedIngredients, leftovers, servingCount);
      const text = await generateText(prompt);

      let jsonStr = text.trim();
      if (jsonStr.startsWith('```')) {
        jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
      }

      const recipe = JSON.parse(jsonStr);
      return NextResponse.json({ recipe, source: 'ai' });
    } catch (aiError) {
      console.warn('AI failed, using demo:', (aiError as Error).message?.substring(0, 100));
    }

    // Demo fallback
    const searchInput = [userInput, ...detectedIngredients, ...leftovers].join(' ');
    const recipe = getDemoRecipe(searchInput);
    if (servingCount > 1) {
      recipe.servings = servingCount;
      recipe.calories = Math.round(recipe.calories * servingCount);
      recipe.protein = Math.round(recipe.protein * servingCount);
      recipe.carbs = Math.round(recipe.carbs * servingCount);
      recipe.fat = Math.round(recipe.fat * servingCount);
    }
    return NextResponse.json({ recipe, source: 'demo' });
  } catch (error) {
    console.error('Recipe generation error:', error);
    return NextResponse.json({ error: 'Failed to generate recipe' }, { status: 500 });
  }
}
