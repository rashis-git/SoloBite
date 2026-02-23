'use client';

import { useState } from 'react';
import { UserProfile, OnboardingStep, CUISINE_OPTIONS } from '@/lib/types';
import { calculateTDEE, calculatePerMealTargets } from '@/lib/nutrition';
import { PANTRY_DEFAULTS, COMMON_ALLERGIES, COMMON_DISLIKES, COOKING_EQUIPMENT } from '@/lib/pantry-defaults';
import { upsertProfile } from '@/lib/storage';

interface OnboardingWizardProps {
  onComplete: (profile: UserProfile) => void;
}

const STEPS: OnboardingStep[] = [
  'welcome',
  'body-stats',
  'activity-goal',
  'diet-allergies',
  'kitchen-setup',
  'pantry-review',
  'targets-review',
];

export default function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState('');
  const [age, setAge] = useState(27);
  const [height, setHeight] = useState(165);
  const [weight, setWeight] = useState(65);
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('female');
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'light' | 'moderate' | 'active'>('moderate');
  const [goal, setGoal] = useState<'lose' | 'maintain' | 'gain'>('maintain');
  const [dietaryPreference, setDietaryPreference] = useState<'veg' | 'nonveg' | 'egg' | 'vegan'>('veg');
  const [allergies, setAllergies] = useState<string[]>([]);
  const [customAllergy, setCustomAllergy] = useState('');
  const [dislikes, setDislikes] = useState<string[]>([]);
  const [customDislike, setCustomDislike] = useState('');
  const [mealsPerDay, setMealsPerDay] = useState(3);
  const [foodPalette, setFoodPalette] = useState<string[]>(['indian']);
  const [cookingEquipment, setCookingEquipment] = useState<string[]>(
    COOKING_EQUIPMENT.filter(e => e.default).map(e => e.label)
  );
  const [pantryAlways, setPantryAlways] = useState<string[]>([]);
  const [pantryUsually, setPantryUsually] = useState<string[]>([]);
  const [customPantryItem, setCustomPantryItem] = useState('');
  const [addToTier, setAddToTier] = useState<'always' | 'usually'>('always');
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragSource, setDragSource] = useState<'always' | 'usually' | null>(null);
  const [dropTarget, setDropTarget] = useState<'always' | 'usually' | null>(null);

  // Calculated targets
  const targets = calculateTDEE(weight, height, age, gender, activityLevel, goal);
  const perMeal = calculatePerMealTargets(targets, mealsPerDay);

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const handleNext = () => {
    if (currentStep === 4) {
      // After kitchen setup, merge pantry defaults from all selected cuisines
      const allAlways = new Set<string>();
      const allUsually = new Set<string>();
      foodPalette.forEach(cuisine => {
        const defaults = PANTRY_DEFAULTS[cuisine];
        if (defaults) {
          defaults.always.forEach(item => allAlways.add(item));
          defaults.usually.forEach(item => allUsually.add(item));
        }
      });
      setPantryAlways(Array.from(allAlways));
      setPantryUsually(Array.from(allUsually));
    }
    setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const [isSaving, setIsSaving] = useState(false);

  const handleFinish = async () => {
    setIsSaving(true);
    const profile: UserProfile = {
      name,
      age,
      height,
      weight,
      gender,
      activityLevel,
      goal,
      dietaryPreference,
      allergies,
      dislikes,
      mealsPerDay,
      cookingEquipment,
      foodPalette,
      pantryAlways,
      pantryUsually,
      ...targets,
      ...perMeal,
      onboardingComplete: true,
    };
    await upsertProfile(profile);
    setIsSaving(false);
    onComplete(profile);
  };

  const toggleItem = (list: string[], setList: (l: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const renderStep = () => {
    switch (STEPS[currentStep]) {
      case 'welcome':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="text-5xl">🍳</div>
              <h1 className="text-2xl font-bold text-stone-900">Welcome to SoloBite</h1>
              <p className="text-stone-500">Your fridge, one plate, fully fueled.</p>
              <p className="text-sm text-stone-400">Quick setup — takes under a minute</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                What should we call you?
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none text-lg"
                autoFocus
              />
            </div>
          </div>
        );

      case 'body-stats':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-stone-900">Quick body stats</h2>
              <p className="text-sm text-stone-500">For calculating your daily nutrition targets</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-1">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={e => setAge(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-1">Gender</label>
                <div className="flex gap-1">
                  {(['female', 'male', 'other'] as const).map(g => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        gender === g
                          ? 'bg-brand-500 text-white'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {g === 'female' ? 'F' : g === 'male' ? 'M' : 'O'}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={e => setHeight(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={e => setWeight(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none"
                />
              </div>
            </div>
          </div>
        );

      case 'activity-goal':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-stone-900">Activity & Goal</h2>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-600 mb-2">How active are you?</label>
              <div className="space-y-2">
                {[
                  { value: 'sedentary' as const, label: 'Desk job, minimal exercise' },
                  { value: 'light' as const, label: 'Light activity (walks, yoga)' },
                  { value: 'moderate' as const, label: 'Moderate (gym 3-4x/week)' },
                  { value: 'active' as const, label: 'Very active (daily intense)' },
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setActivityLevel(opt.value)}
                    className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                      activityLevel === opt.value
                        ? 'border-brand-500 bg-brand-50 text-brand-800'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <span className="text-sm">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-600 mb-2">What&apos;s your goal?</label>
              <div className="flex gap-2">
                {[
                  { value: 'lose' as const, label: 'Lose weight' },
                  { value: 'maintain' as const, label: 'Maintain' },
                  { value: 'gain' as const, label: 'Gain muscle' },
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setGoal(opt.value)}
                    className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                      goal === opt.value
                        ? 'bg-brand-500 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'diet-allergies':
        return (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-stone-900">Food preferences</h2>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-600 mb-2">Diet type</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'veg' as const, label: 'Veg' },
                  { value: 'nonveg' as const, label: 'Non-veg' },
                  { value: 'egg' as const, label: 'Eggetarian' },
                  { value: 'vegan' as const, label: 'Vegan' },
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setDietaryPreference(opt.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      dietaryPreference === opt.value
                        ? 'bg-brand-500 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-600 mb-2">
                Allergies? <span className="text-stone-400">(tap all that apply)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {COMMON_ALLERGIES.map(a => (
                  <button
                    key={a}
                    onClick={() => toggleItem(allergies, setAllergies, a)}
                    className={`px-3 py-2 rounded-full text-xs font-medium transition-all ${
                      allergies.includes(a)
                        ? 'bg-red-100 text-red-700 border border-red-300'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={customAllergy}
                  onChange={e => setCustomAllergy(e.target.value)}
                  placeholder="Other allergy..."
                  className="flex-1 px-3 py-1.5 rounded-lg border border-stone-200 text-sm outline-none focus:border-brand-500"
                  onKeyDown={e => {
                    if (e.key === 'Enter' && customAllergy.trim()) {
                      setAllergies([...allergies, customAllergy.trim()]);
                      setCustomAllergy('');
                    }
                  }}
                />
                <button
                  onClick={() => {
                    if (customAllergy.trim()) {
                      setAllergies([...allergies, customAllergy.trim()]);
                      setCustomAllergy('');
                    }
                  }}
                  className="px-3 py-1.5 bg-stone-100 rounded-lg text-sm hover:bg-stone-200"
                >
                  Add
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-600 mb-2">
                Anything you don&apos;t like? <span className="text-stone-400">(optional)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {COMMON_DISLIKES.map(d => (
                  <button
                    key={d}
                    onClick={() => toggleItem(dislikes, setDislikes, d)}
                    className={`px-3 py-2 rounded-full text-xs font-medium transition-all ${
                      dislikes.includes(d)
                        ? 'bg-warm-100 text-warm-600 border border-warm-500'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={customDislike}
                  onChange={e => setCustomDislike(e.target.value)}
                  placeholder="Other dislike..."
                  className="flex-1 px-3 py-1.5 rounded-lg border border-stone-200 text-sm outline-none focus:border-brand-500"
                  onKeyDown={e => {
                    if (e.key === 'Enter' && customDislike.trim()) {
                      setDislikes([...dislikes, customDislike.trim()]);
                      setCustomDislike('');
                    }
                  }}
                />
                <button
                  onClick={() => {
                    if (customDislike.trim()) {
                      setDislikes([...dislikes, customDislike.trim()]);
                      setCustomDislike('');
                    }
                  }}
                  className="px-3 py-1.5 bg-stone-100 rounded-lg text-sm hover:bg-stone-200"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        );

      case 'kitchen-setup':
        return (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-stone-900">Your kitchen</h2>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-600 mb-2">Cuisines you enjoy</label>
              <p className="text-xs text-stone-400 mb-2">Select all that apply — we&apos;ll set pantry staples from your choices</p>
              <div className="grid grid-cols-2 gap-2">
                {CUISINE_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setFoodPalette(prev =>
                        prev.includes(opt.value)
                          ? prev.filter(v => v !== opt.value)
                          : [...prev, opt.value]
                      );
                    }}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      foodPalette.includes(opt.value)
                        ? 'bg-brand-500 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {foodPalette.includes(opt.value) && '\u2713 '}{opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-600 mb-2">Cooking equipment</label>
              <div className="flex flex-wrap gap-2">
                {COOKING_EQUIPMENT.map(eq => (
                  <button
                    key={eq.id}
                    onClick={() => toggleItem(cookingEquipment, setCookingEquipment, eq.label)}
                    className={`px-3 py-2 rounded-full text-xs font-medium transition-all ${
                      cookingEquipment.includes(eq.label)
                        ? 'bg-brand-100 text-brand-700 border border-brand-300'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {eq.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-600 mb-2">Meals you cook per day</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map(n => (
                  <button
                    key={n}
                    onClick={() => setMealsPerDay(n)}
                    className={`flex-1 py-3 rounded-xl text-lg font-bold transition-all ${
                      mealsPerDay === n
                        ? 'bg-brand-500 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'pantry-review':
        // Merge defaults from all selected cuisines as fallback
        const mergedAlways = new Set<string>();
        const mergedUsually = new Set<string>();
        foodPalette.forEach(c => {
          const d = PANTRY_DEFAULTS[c];
          if (d) { d.always.forEach(i => mergedAlways.add(i)); d.usually.forEach(i => mergedUsually.add(i)); }
        });
        const currentAlways = pantryAlways.length > 0 ? pantryAlways : Array.from(mergedAlways);
        const currentUsually = pantryUsually.length > 0 ? pantryUsually : Array.from(mergedUsually);

        const moveToUsually = (item: string) => {
          setPantryAlways(currentAlways.filter(i => i !== item));
          setPantryUsually([...currentUsually, item]);
        };

        const moveToAlways = (item: string) => {
          setPantryUsually(currentUsually.filter(i => i !== item));
          setPantryAlways([...currentAlways, item]);
        };

        const handleDragStart = (item: string, source: 'always' | 'usually') => {
          setDraggedItem(item);
          setDragSource(source);
        };

        const handleDragOver = (e: React.DragEvent, target: 'always' | 'usually') => {
          e.preventDefault();
          if (dragSource !== target) {
            setDropTarget(target);
          }
        };

        const handleDragLeave = () => {
          setDropTarget(null);
        };

        const handleDrop = (e: React.DragEvent, target: 'always' | 'usually') => {
          e.preventDefault();
          if (draggedItem && dragSource && dragSource !== target) {
            if (target === 'always') {
              moveToAlways(draggedItem);
            } else {
              moveToUsually(draggedItem);
            }
          }
          setDraggedItem(null);
          setDragSource(null);
          setDropTarget(null);
        };

        const handleDragEnd = () => {
          setDraggedItem(null);
          setDragSource(null);
          setDropTarget(null);
        };

        const addCustomItem = () => {
          const item = customPantryItem.trim();
          if (!item) return;
          if (currentAlways.includes(item) || currentUsually.includes(item)) return;
          if (addToTier === 'always') {
            setPantryAlways([...currentAlways, item]);
          } else {
            setPantryUsually([...currentUsually, item]);
          }
          setCustomPantryItem('');
        };

        return (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-stone-900">Your pantry staples</h2>
              <p className="text-xs text-stone-400">Drag items between tiers, tap arrows to move, or &times; to remove.</p>
            </div>

            {/* Always tier */}
            <div
              onDragOver={e => handleDragOver(e, 'always')}
              onDragLeave={handleDragLeave}
              onDrop={e => handleDrop(e, 'always')}
              className={`rounded-xl p-3 transition-all border-2 ${
                dropTarget === 'always'
                  ? 'border-brand-400 bg-brand-50'
                  : 'border-transparent bg-stone-50'
              }`}
            >
              <label className="block text-sm font-medium text-stone-600 mb-2">
                Always in my kitchen <span className="text-stone-400">(6+ month shelf life)</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {currentAlways.map(item => (
                  <div
                    key={item}
                    draggable
                    onDragStart={() => handleDragStart(item, 'always')}
                    onDragEnd={handleDragEnd}
                    className={`group inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs cursor-grab active:cursor-grabbing transition-all ${
                      draggedItem === item
                        ? 'opacity-40 bg-brand-100 text-brand-700'
                        : 'bg-brand-100 text-brand-700'
                    }`}
                  >
                    <span>{item}</span>
                    <button
                      onClick={() => moveToUsually(item)}
                      className="w-6 h-6 inline-flex items-center justify-center text-brand-500 hover:text-amber-600 hover:bg-brand-50 rounded-full transition-colors"
                      title="Move to Usually"
                      aria-label={`Move ${item} to Usually`}
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => setPantryAlways(currentAlways.filter(i => i !== item))}
                      className="w-6 h-6 inline-flex items-center justify-center text-brand-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      title="Remove"
                      aria-label={`Remove ${item}`}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Usually tier */}
            <div
              onDragOver={e => handleDragOver(e, 'usually')}
              onDragLeave={handleDragLeave}
              onDrop={e => handleDrop(e, 'usually')}
              className={`rounded-xl p-3 transition-all border-2 ${
                dropTarget === 'usually'
                  ? 'border-warm-400 bg-warm-50'
                  : 'border-transparent bg-stone-50'
              }`}
            >
              <label className="block text-sm font-medium text-stone-600 mb-2">
                Usually have <span className="text-stone-400">(2-4 week shelf life)</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {currentUsually.map(item => (
                  <div
                    key={item}
                    draggable
                    onDragStart={() => handleDragStart(item, 'usually')}
                    onDragEnd={handleDragEnd}
                    className={`group inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs cursor-grab active:cursor-grabbing transition-all ${
                      draggedItem === item
                        ? 'opacity-40 bg-warm-100 text-warm-600'
                        : 'bg-warm-100 text-warm-600'
                    }`}
                  >
                    <span>{item}</span>
                    <button
                      onClick={() => moveToAlways(item)}
                      className="w-6 h-6 inline-flex items-center justify-center text-warm-500 hover:text-brand-600 hover:bg-warm-50 rounded-full transition-colors"
                      title="Move to Always"
                      aria-label={`Move ${item} to Always`}
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => setPantryUsually(currentUsually.filter(i => i !== item))}
                      className="w-6 h-6 inline-flex items-center justify-center text-warm-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      title="Remove"
                      aria-label={`Remove ${item}`}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Add custom item */}
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={customPantryItem}
                onChange={e => setCustomPantryItem(e.target.value)}
                placeholder="Add item..."
                className="flex-1 px-3 py-1.5 rounded-lg border border-stone-200 text-sm outline-none focus:border-brand-500"
                onKeyDown={e => {
                  if (e.key === 'Enter') addCustomItem();
                }}
              />
              <select
                value={addToTier}
                onChange={e => setAddToTier(e.target.value as 'always' | 'usually')}
                className="px-2 py-1.5 rounded-lg border border-stone-200 text-xs outline-none focus:border-brand-500 bg-white"
              >
                <option value="always">Always</option>
                <option value="usually">Usually</option>
              </select>
              <button
                onClick={addCustomItem}
                className="px-3 py-1.5 bg-brand-500 text-white rounded-lg text-sm hover:bg-brand-600"
              >
                Add
              </button>
            </div>

            <p className="text-xs text-stone-400">
              Items not in these lists won&apos;t be assumed — we&apos;ll suggest them as additions with cost.
            </p>
          </div>
        );

      case 'targets-review':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-4xl mb-2">&#10003;</div>
              <h2 className="text-xl font-bold text-stone-900">You&apos;re all set, {name || 'there'}!</h2>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-stone-200 space-y-4">
              <div>
                <p className="text-sm font-medium text-stone-600 mb-1">Your daily targets</p>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-brand-50 rounded-xl p-2">
                    <div className="text-lg font-bold text-brand-700">{targets.dailyCalories}</div>
                    <div className="text-xs text-stone-500">cal</div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-2">
                    <div className="text-lg font-bold text-blue-700">{targets.dailyProtein}g</div>
                    <div className="text-xs text-stone-500">protein</div>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-2">
                    <div className="text-lg font-bold text-amber-700">{targets.dailyCarbs}g</div>
                    <div className="text-xs text-stone-500">carbs</div>
                  </div>
                  <div className="bg-rose-50 rounded-xl p-2">
                    <div className="text-lg font-bold text-rose-700">{targets.dailyFat}g</div>
                    <div className="text-xs text-stone-500">fat</div>
                  </div>
                </div>
              </div>
              <div className="border-t border-stone-100 pt-3">
                <p className="text-sm font-medium text-stone-600 mb-1">Per meal ({mealsPerDay} meals/day)</p>
                <p className="text-stone-800">
                  ~{perMeal.perMealCalories} cal &middot; {perMeal.perMealProtein}g protein &middot; {perMeal.perMealCarbs}g carbs &middot; {perMeal.perMealFat}g fat
                </p>
              </div>
            </div>
            <p className="text-xs text-stone-400 text-center">
              Calculated using the Mifflin-St Jeor equation. You can adjust these anytime from settings.
            </p>
          </div>
        );
    }
  };

  const canProceed = () => {
    switch (STEPS[currentStep]) {
      case 'welcome': return name.trim().length > 0;
      case 'kitchen-setup': return foodPalette.length > 0;
      default: return true;
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-5 py-6">
      {/* Progress bar */}
      <div className="mb-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-stone-400">Step {currentStep + 1} of {STEPS.length}</span>
          {currentStep > 0 && (
            <button onClick={handleBack} className="text-xs text-brand-600 font-medium">
              Back
            </button>
          )}
        </div>
        <div className="w-full bg-stone-200 rounded-full h-1.5">
          <div
            className="bg-brand-500 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 py-4">
        {renderStep()}
      </div>

      {/* Footer button */}
      <div className="pb-4">
        {STEPS[currentStep] === 'targets-review' ? (
          <button
            onClick={handleFinish}
            disabled={isSaving}
            className="w-full py-3.5 bg-brand-500 text-white font-semibold rounded-xl hover:bg-brand-600 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isSaving ? (
              <span className="flex items-center justify-center gap-2">
                <span className="spinner spinner-sm spinner-white" />
                Saving...
              </span>
            ) : 'Start Cooking'}
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="w-full py-3.5 bg-brand-500 text-white font-semibold rounded-xl hover:bg-brand-600 transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
