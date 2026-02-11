import { NextRequest, NextResponse } from 'next/server';
import { generateText } from '@/lib/ai-client';
import { buildWeeklyPlanPrompt } from '@/lib/prompts';
import { UserProfile } from '@/lib/types';
import { DEMO_WEEKLY_PLAN } from '@/lib/demo-data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      profile,
      preferences = '',
      existingIngredients = [],
      weeklyBudget,
    } = body as {
      profile: UserProfile;
      preferences: string;
      existingIngredients: string[];
      weeklyBudget?: number;
    };

    if (!profile) {
      return NextResponse.json({ error: 'Profile required' }, { status: 400 });
    }

    // Try AI first
    try {
      const prompt = buildWeeklyPlanPrompt(profile, preferences, existingIngredients, weeklyBudget);
      const text = await generateText(prompt, 16000);

      let jsonStr = text.trim();
      if (jsonStr.startsWith('```')) {
        jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
      }

      const plan = JSON.parse(jsonStr);
      return NextResponse.json({ plan, source: 'ai' });
    } catch (aiError) {
      console.warn('AI failed, using demo:', (aiError as Error).message?.substring(0, 100));
    }

    // Demo fallback
    return NextResponse.json({ plan: DEMO_WEEKLY_PLAN, source: 'demo' });
  } catch (error) {
    console.error('Weekly plan error:', error);
    return NextResponse.json({ error: 'Failed to generate weekly plan' }, { status: 500 });
  }
}
