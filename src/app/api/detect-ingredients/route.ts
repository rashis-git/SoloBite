import { NextRequest, NextResponse } from 'next/server';
import { generateFromImage } from '@/lib/ai-client';
import { buildIngredientDetectionPrompt } from '@/lib/prompts';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString('base64');

    const text = await generateFromImage(base64, file.type, buildIngredientDetectionPrompt());

    let jsonStr = text.trim();
    if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
    }

    const ingredients = JSON.parse(jsonStr);
    return NextResponse.json({ ingredients });
  } catch (error) {
    console.error('Ingredient detection error:', error);
    return NextResponse.json({ error: 'Failed to detect ingredients' }, { status: 500 });
  }
}
