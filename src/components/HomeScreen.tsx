'use client';

import { useState, useRef, useCallback } from 'react';
import { UserProfile, Recipe } from '@/lib/types';
import { QUICK_PICKS, COMMON_LEFTOVERS } from '@/lib/pantry-defaults';
import RecipeCard from './RecipeCard';
import WeeklyPlanView from './WeeklyPlanView';
import PWAInstallBanner from './PWAInstallBanner';

interface HomeScreenProps {
  profile: UserProfile;
  onEditProfile: () => void;
}

type ViewMode = 'home' | 'recipe' | 'weekly-input' | 'weekly-plan';

export default function HomeScreen({ profile, onEditProfile }: HomeScreenProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  const [inputText, setInputText] = useState('');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showLeftovers, setShowLeftovers] = useState(false);
  const [leftovers, setLeftovers] = useState<string[]>([]);
  const [servingCount, setServingCount] = useState(1);
  const [isListening, setIsListening] = useState(false);
  const [detectedIngredients, setDetectedIngredients] = useState<string[]>([]);
  const [weeklyPlan, setWeeklyPlan] = useState(null);
  const [weeklyPreferences, setWeeklyPreferences] = useState('');
  const [weeklyBudget, setWeeklyBudget] = useState('');
  const [isGeneratingWeekly, setIsGeneratingWeekly] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateRecipe = useCallback(async (userInput: string, ingredients: string[] = [], leftoverItems: string[] = []) => {
    setIsGenerating(true);
    setError('');
    setViewMode('recipe');

    try {
      const res = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile,
          userInput,
          detectedIngredients: ingredients,
          leftovers: leftoverItems,
          servingCount,
        }),
      });

      if (!res.ok) throw new Error('Failed to generate recipe');

      const data = await res.json();
      setRecipe(data.recipe);
    } catch {
      setError('Something went wrong. Please try again.');
      setViewMode('home');
    } finally {
      setIsGenerating(false);
    }
  }, [profile, servingCount]);

  const handleSubmit = () => {
    if (inputText.trim() || detectedIngredients.length > 0) {
      generateRecipe(inputText, detectedIngredients, leftovers);
    }
  };

  const handleQuickPick = (prompt: string) => {
    setError('');
    generateRecipe(prompt, [], leftovers);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsGenerating(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch('/api/detect-ingredients', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to detect ingredients');

      const data = await res.json();
      const ingredients = data.ingredients as string[];
      setDetectedIngredients(ingredients);
      setInputText(ingredients.join(', '));
      setIsGenerating(false);
    } catch {
      setError('Could not detect ingredients from the image. Try typing them instead.');
      setIsGenerating(false);
    }
  };

  const handleVoiceInput = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    const SpeechRecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      setError('Voice input not supported in this browser. Try Chrome.');
      return;
    }

    const recognition = new SpeechRecognitionClass();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setInputText((prev: string) => prev ? `${prev}, ${text}` : text);
    };
    recognition.onerror = () => {
      setIsListening(false);
      setError('Voice input failed. Please try again.');
    };

    recognition.start();
  };

  const toggleLeftover = (item: string) => {
    if (leftovers.includes(item)) {
      setLeftovers(leftovers.filter(l => l !== item));
    } else {
      setLeftovers([...leftovers, item]);
    }
  };

  const handleGenerateWeeklyPlan = async () => {
    setIsGeneratingWeekly(true);
    setError('');
    setViewMode('weekly-plan');

    try {
      const res = await fetch('/api/plan-week', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile,
          preferences: weeklyPreferences,
          existingIngredients: detectedIngredients,
          weeklyBudget: weeklyBudget ? Number(weeklyBudget) : undefined,
        }),
      });

      if (!res.ok) throw new Error('Failed to generate plan');

      const data = await res.json();
      setWeeklyPlan(data.plan);
    } catch {
      setError('Failed to generate weekly plan. Please try again.');
      setViewMode('home');
    } finally {
      setIsGeneratingWeekly(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Home screen
  if (viewMode === 'home') {
    return (
      <div className="px-5 py-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-stone-900">SoloBite</h1>
            <p className="text-sm text-stone-500">{getGreeting()}, {profile.name}!</p>
          </div>
          <button
            onClick={onEditProfile}
            className="w-11 h-11 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-stone-200 text-base transition-colors"
            title="Settings"
            aria-label="Settings"
          >
            &#9881;
          </button>
        </div>

        {/* Smart input */}
        <div className="space-y-3">
          <div className="relative">
            <textarea
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder='eggs, tomato, onion... or just "something quick"'
              className="w-full px-4 py-3 rounded-2xl border border-stone-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none text-sm resize-none min-h-[80px] bg-white"
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
          </div>

          <div className="flex gap-2">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isGenerating}
              className="flex-1 flex items-center justify-center gap-2 py-3 min-h-[44px] bg-white border border-stone-200 rounded-xl text-sm text-stone-600 hover:bg-stone-50 transition-all disabled:opacity-50"
            >
              <span>📷</span> Upload Photo
            </button>
            <button
              onClick={handleVoiceInput}
              disabled={isGenerating || isListening}
              className={`flex-1 flex items-center justify-center gap-2 py-3 min-h-[44px] border rounded-xl text-sm transition-all disabled:opacity-50 ${
                isListening
                  ? 'bg-red-50 border-red-300 text-red-600'
                  : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              <span>{isListening ? '🔴' : '🎤'}</span> {isListening ? 'Listening...' : 'Speak'}
            </button>
          </div>

          {inputText.trim() && (
            <button
              onClick={handleSubmit}
              disabled={isGenerating}
              className="w-full py-3.5 bg-brand-500 text-white font-semibold rounded-xl hover:bg-brand-600 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {isGenerating ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="spinner spinner-sm spinner-white" />
                  Generating...
                </span>
              ) : 'Generate Recipe'}
            </button>
          )}
        </div>

        {/* Serving count */}
        {inputText.trim() && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-stone-500">Cooking for:</span>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map(n => (
                <button
                  key={n}
                  onClick={() => setServingCount(n)}
                  className={`w-11 h-11 rounded-full text-sm font-medium transition-all ${
                    servingCount === n
                      ? 'bg-brand-500 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quick picks */}
        <div>
          <p className="text-xs text-stone-400 mb-2">Quick picks</p>
          <div className="flex flex-wrap gap-2">
            {QUICK_PICKS.map(pick => (
              <button
                key={pick.id}
                onClick={() => handleQuickPick(pick.prompt)}
                disabled={isGenerating}
                className="px-4 py-2.5 min-h-[44px] bg-white border border-stone-200 rounded-full text-sm text-stone-600 hover:bg-brand-50 hover:border-brand-200 hover:text-brand-700 transition-all disabled:opacity-50"
              >
                {pick.icon} {pick.label}
              </button>
            ))}
          </div>
        </div>

        {/* Leftovers section */}
        <div className="bg-warm-50 rounded-2xl p-4 border border-warm-100">
          <button
            onClick={() => setShowLeftovers(!showLeftovers)}
            className="flex items-center justify-between w-full"
          >
            <div>
              <p className="text-sm font-medium text-warm-600">🍲 Got leftovers?</p>
              <p className="text-xs text-stone-400">Turn yesterday&apos;s food into today&apos;s meal</p>
            </div>
            <span className="text-stone-400">{showLeftovers ? '▲' : '▼'}</span>
          </button>

          {showLeftovers && (
            <div className="mt-3 space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {COMMON_LEFTOVERS.map(item => (
                  <button
                    key={item}
                    onClick={() => toggleLeftover(item)}
                    className={`px-3 py-2 rounded-full text-xs font-medium transition-all ${
                      leftovers.includes(item)
                        ? 'bg-warm-500 text-white'
                        : 'bg-white text-stone-600 border border-stone-200'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              {leftovers.length > 0 && (
                <button
                  onClick={() => generateRecipe(`repurpose these leftovers: ${leftovers.join(', ')}`, [], leftovers)}
                  className="w-full py-3 bg-warm-500 text-white text-sm font-medium rounded-xl hover:bg-warm-600 transition-all min-h-[44px]"
                >
                  Find recipes for leftovers
                </button>
              )}
            </div>
          )}
        </div>

        {/* Plan My Week */}
        <button
          onClick={() => setViewMode('weekly-input')}
          className="w-full py-4 bg-white border-2 border-dashed border-brand-300 rounded-2xl text-brand-600 font-medium hover:bg-brand-50 transition-all flex items-center justify-center gap-2"
        >
          📅 Plan My Week
        </button>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl">
            {error}
          </div>
        )}

        <PWAInstallBanner />
      </div>
    );
  }

  // Recipe view
  if (viewMode === 'recipe') {
    return (
      <div className="px-5 py-6 space-y-4">
        <button
          onClick={() => {
            setViewMode('home');
            setRecipe(null);
            setError('');
          }}
          className="inline-flex items-center gap-1 text-sm text-brand-600 font-medium py-2 px-1 -ml-1 min-h-[44px]"
        >
          &larr; Back
        </button>
        {isGenerating ? (
          <RecipeCard
            recipe={{} as Recipe}
            profile={profile}
            onTryAnother={() => {}}
            isLoading={true}
          />
        ) : recipe ? (
          <RecipeCard
            recipe={recipe}
            profile={profile}
            onTryAnother={() => generateRecipe(inputText, detectedIngredients, leftovers)}
          />
        ) : error ? (
          <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl">
            {error}
            <button
              onClick={() => setViewMode('home')}
              className="block mt-2 text-red-700 font-medium"
            >
              Go back
            </button>
          </div>
        ) : null}
      </div>
    );
  }

  // Weekly plan input
  if (viewMode === 'weekly-input') {
    return (
      <div className="px-5 py-6 space-y-5">
        <button
          onClick={() => setViewMode('home')}
          className="inline-flex items-center gap-1 text-sm text-brand-600 font-medium py-2 px-1 -ml-1 min-h-[44px]"
        >
          &larr; Back
        </button>
        <div>
          <h2 className="text-xl font-bold text-stone-900">Plan My Week</h2>
          <p className="text-sm text-stone-500">We&apos;ll create a 7-day plan with a smart grocery list</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1">
              Any preferences for this week? <span className="text-stone-400">(optional)</span>
            </label>
            <textarea
              value={weeklyPreferences}
              onChange={e => setWeeklyPreferences(e.target.value)}
              placeholder='e.g., "more protein-heavy", "include some South Indian breakfasts", "I want to try new things"'
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none text-sm resize-none min-h-[60px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1">
              Weekly grocery budget <span className="text-stone-400">(optional, in Rs)</span>
            </label>
            <input
              type="number"
              value={weeklyBudget}
              onChange={e => setWeeklyBudget(e.target.value)}
              placeholder="e.g., 1500"
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none text-sm"
            />
          </div>

          <div className="bg-stone-50 rounded-xl p-3">
            <p className="text-xs text-stone-500">
              Your plan: <strong>{profile.mealsPerDay} meals/day</strong> &middot; 7 days &middot;{' '}
              <strong>{profile.mealsPerDay * 7} total meals</strong>
            </p>
            <p className="text-xs text-stone-400 mt-1">
              Ingredients will be cross-optimized to minimize waste.
            </p>
          </div>

          <button
            onClick={handleGenerateWeeklyPlan}
            disabled={isGeneratingWeekly}
            className="w-full py-3.5 bg-brand-500 text-white font-semibold rounded-xl hover:bg-brand-600 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isGeneratingWeekly ? (
              <span className="flex items-center justify-center gap-2">
                <span className="spinner spinner-sm spinner-white" />
                Generating your week...
              </span>
            ) : 'Generate Weekly Plan'}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl">{error}</div>
        )}
      </div>
    );
  }

  // Weekly plan view
  if (viewMode === 'weekly-plan') {
    return (
      <div className="px-5 py-6 space-y-4">
        <button
          onClick={() => {
            setViewMode('home');
            setWeeklyPlan(null);
          }}
          className="inline-flex items-center gap-1 text-sm text-brand-600 font-medium py-2 px-1 -ml-1 min-h-[44px]"
        >
          &larr; Back
        </button>
        {isGeneratingWeekly ? (
          <div className="text-center py-12 space-y-4">
            <div className="text-4xl animate-gentle-pulse">📅</div>
            <div className="spinner mx-auto" />
            <p className="text-stone-600 font-medium">Planning your week...</p>
            <p className="text-sm text-stone-400">Cross-optimizing ingredients across {profile.mealsPerDay * 7} meals</p>
          </div>
        ) : weeklyPlan ? (
          <WeeklyPlanView plan={weeklyPlan} profile={profile} />
        ) : null}
      </div>
    );
  }

  return null;
}
