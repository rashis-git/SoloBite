'use client';

import { useState, useMemo } from 'react';
import { UserProfile, CUISINE_OPTIONS } from '@/lib/types';
import { calculateTDEE, calculatePerMealTargets } from '@/lib/nutrition';
import { PANTRY_DEFAULTS, COMMON_ALLERGIES, COMMON_DISLIKES, COOKING_EQUIPMENT } from '@/lib/pantry-defaults';

interface SettingsViewProps {
  profile: UserProfile;
  email: string;
  onSave: (profile: UserProfile) => Promise<void>;
  onLogout: () => void;
  onBack: () => void;
}

export default function SettingsView({ profile, email, onSave, onLogout, onBack }: SettingsViewProps) {
  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState(profile.age);
  const [height, setHeight] = useState(profile.height);
  const [weight, setWeight] = useState(profile.weight);
  const [gender, setGender] = useState(profile.gender);
  const [activityLevel, setActivityLevel] = useState(profile.activityLevel);
  const [goal, setGoal] = useState(profile.goal);
  const [dietaryPreference, setDietaryPreference] = useState(profile.dietaryPreference);
  const [allergies, setAllergies] = useState(profile.allergies);
  const [customAllergy, setCustomAllergy] = useState('');
  const [dislikes, setDislikes] = useState(profile.dislikes);
  const [customDislike, setCustomDislike] = useState('');
  const [mealsPerDay, setMealsPerDay] = useState(profile.mealsPerDay);
  const [foodPalette, setFoodPalette] = useState<string[]>(profile.foodPalette);
  const [cookingEquipment, setCookingEquipment] = useState(profile.cookingEquipment);
  const [pantryAlways, setPantryAlways] = useState(profile.pantryAlways);
  const [pantryUsually, setPantryUsually] = useState(profile.pantryUsually);
  const [customPantryItem, setCustomPantryItem] = useState('');
  const [addToTier, setAddToTier] = useState<'always' | 'usually'>('always');
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Live-recalculate nutrition targets
  const targets = useMemo(
    () => calculateTDEE(weight, height, age, gender, activityLevel, goal),
    [weight, height, age, gender, activityLevel, goal]
  );
  const perMeal = useMemo(
    () => calculatePerMealTargets(targets, mealsPerDay),
    [targets, mealsPerDay]
  );

  const hasChanges = useMemo(() => {
    return (
      name !== profile.name ||
      age !== profile.age ||
      height !== profile.height ||
      weight !== profile.weight ||
      gender !== profile.gender ||
      activityLevel !== profile.activityLevel ||
      goal !== profile.goal ||
      dietaryPreference !== profile.dietaryPreference ||
      mealsPerDay !== profile.mealsPerDay ||
      JSON.stringify(allergies) !== JSON.stringify(profile.allergies) ||
      JSON.stringify(dislikes) !== JSON.stringify(profile.dislikes) ||
      JSON.stringify(foodPalette) !== JSON.stringify(profile.foodPalette) ||
      JSON.stringify(cookingEquipment) !== JSON.stringify(profile.cookingEquipment) ||
      JSON.stringify(pantryAlways) !== JSON.stringify(profile.pantryAlways) ||
      JSON.stringify(pantryUsually) !== JSON.stringify(profile.pantryUsually)
    );
  }, [name, age, height, weight, gender, activityLevel, goal, dietaryPreference, mealsPerDay,
      allergies, dislikes, foodPalette, cookingEquipment, pantryAlways, pantryUsually, profile]);

  const handleSave = async () => {
    setIsSaving(true);
    const updated: UserProfile = {
      name, age, height, weight, gender, activityLevel, goal,
      dietaryPreference, allergies, dislikes, mealsPerDay,
      cookingEquipment, foodPalette, pantryAlways, pantryUsually,
      ...targets, ...perMeal,
      onboardingComplete: true,
    };
    await onSave(updated);
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleItem = (list: string[], setList: (l: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const SectionCard = ({ id, title, icon, children }: { id: string; title: string; icon?: string; children: React.ReactNode }) => (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
      <button
        onClick={() => toggleSection(id)}
        className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-stone-50 transition-all"
      >
        <span className="text-sm font-semibold text-stone-800">{icon && `${icon} `}{title}</span>
        <span className="text-stone-400 text-xs">{expandedSection === id ? '▲' : '▼'}</span>
      </button>
      {expandedSection === id && (
        <div className="px-4 pb-4 space-y-4 border-t border-stone-100 pt-3">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="px-5 py-6 space-y-4 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="inline-flex items-center gap-1 text-sm text-brand-600 font-medium py-2 px-1 -ml-1 min-h-[44px]">
          &larr; Back
        </button>
        <h1 className="text-xl font-bold text-stone-900">Settings</h1>
      </div>

      {/* Profile header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-xl">
            {name ? name[0].toUpperCase() : '?'}
          </div>
          <div>
            <p className="font-semibold text-stone-800">{name || 'User'}</p>
            <p className="text-xs text-stone-400">{email}</p>
          </div>
        </div>
      </div>

      {/* Body Stats */}
      <SectionCard id="body" title="Body Stats" icon="📊">
        <div>
          <label className="block text-xs font-medium text-stone-500 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none text-sm"
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-stone-500 mb-1">Age</label>
            <input type="number" value={age} onChange={e => setAge(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:border-brand-500 outline-none text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-stone-500 mb-1">Height (cm)</label>
            <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:border-brand-500 outline-none text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-stone-500 mb-1">Weight (kg)</label>
            <input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:border-brand-500 outline-none text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-stone-500 mb-1">Gender</label>
          <div className="flex gap-1">
            {(['female', 'male', 'other'] as const).map(g => (
              <button key={g} onClick={() => setGender(g)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                  gender === g ? 'bg-brand-500 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}>
                {g === 'female' ? 'Female' : g === 'male' ? 'Male' : 'Other'}
              </button>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* Activity & Goal */}
      <SectionCard id="activity" title="Activity & Goal" icon="🏃">
        <div>
          <label className="block text-xs font-medium text-stone-500 mb-2">Activity level</label>
          <div className="space-y-1.5">
            {[
              { value: 'sedentary' as const, label: 'Desk job, minimal exercise' },
              { value: 'light' as const, label: 'Light activity (walks, yoga)' },
              { value: 'moderate' as const, label: 'Moderate (gym 3-4x/week)' },
              { value: 'active' as const, label: 'Very active (daily intense)' },
            ].map(opt => (
              <button key={opt.value} onClick={() => setActivityLevel(opt.value)}
                className={`w-full text-left px-3 py-2.5 rounded-xl border text-sm transition-all ${
                  activityLevel === opt.value
                    ? 'border-brand-500 bg-brand-50 text-brand-800'
                    : 'border-stone-200 hover:border-stone-300'
                }`}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-stone-500 mb-2">Goal</label>
          <div className="flex gap-2">
            {[
              { value: 'lose' as const, label: 'Lose weight' },
              { value: 'maintain' as const, label: 'Maintain' },
              { value: 'gain' as const, label: 'Gain muscle' },
            ].map(opt => (
              <button key={opt.value} onClick={() => setGoal(opt.value)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  goal === opt.value ? 'bg-brand-500 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* Food Preferences */}
      <SectionCard id="diet" title="Food Preferences" icon="🥗">
        <div>
          <label className="block text-xs font-medium text-stone-500 mb-2">Diet type</label>
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'veg' as const, label: 'Veg' },
              { value: 'nonveg' as const, label: 'Non-veg' },
              { value: 'egg' as const, label: 'Eggetarian' },
              { value: 'vegan' as const, label: 'Vegan' },
            ].map(opt => (
              <button key={opt.value} onClick={() => setDietaryPreference(opt.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  dietaryPreference === opt.value ? 'bg-brand-500 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-stone-500 mb-2">Allergies</label>
          <div className="flex flex-wrap gap-1.5">
            {COMMON_ALLERGIES.map(a => (
              <button key={a} onClick={() => toggleItem(allergies, setAllergies, a)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                  allergies.includes(a) ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-stone-100 text-stone-600'
                }`}>
                {a}
              </button>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <input type="text" value={customAllergy} onChange={e => setCustomAllergy(e.target.value)}
              placeholder="Other allergy..." className="flex-1 px-3 py-1.5 rounded-lg border border-stone-200 text-sm outline-none focus:border-brand-500"
              onKeyDown={e => { if (e.key === 'Enter' && customAllergy.trim()) { setAllergies([...allergies, customAllergy.trim()]); setCustomAllergy(''); } }} />
            <button onClick={() => { if (customAllergy.trim()) { setAllergies([...allergies, customAllergy.trim()]); setCustomAllergy(''); } }}
              className="px-3 py-1.5 bg-stone-100 rounded-lg text-sm hover:bg-stone-200">Add</button>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-stone-500 mb-2">Dislikes</label>
          <div className="flex flex-wrap gap-1.5">
            {COMMON_DISLIKES.map(d => (
              <button key={d} onClick={() => toggleItem(dislikes, setDislikes, d)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                  dislikes.includes(d) ? 'bg-warm-100 text-warm-600 border border-warm-500' : 'bg-stone-100 text-stone-600'
                }`}>
                {d}
              </button>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <input type="text" value={customDislike} onChange={e => setCustomDislike(e.target.value)}
              placeholder="Other dislike..." className="flex-1 px-3 py-1.5 rounded-lg border border-stone-200 text-sm outline-none focus:border-brand-500"
              onKeyDown={e => { if (e.key === 'Enter' && customDislike.trim()) { setDislikes([...dislikes, customDislike.trim()]); setCustomDislike(''); } }} />
            <button onClick={() => { if (customDislike.trim()) { setDislikes([...dislikes, customDislike.trim()]); setCustomDislike(''); } }}
              className="px-3 py-1.5 bg-stone-100 rounded-lg text-sm hover:bg-stone-200">Add</button>
          </div>
        </div>
      </SectionCard>

      {/* Kitchen Setup */}
      <SectionCard id="kitchen" title="Kitchen Setup" icon="🍳">
        <div>
          <label className="block text-xs font-medium text-stone-500 mb-2">Cuisines</label>
          <div className="grid grid-cols-2 gap-2">
            {CUISINE_OPTIONS.map(opt => (
              <button key={opt.value}
                onClick={() => setFoodPalette(prev => prev.includes(opt.value) ? prev.filter(v => v !== opt.value) : [...prev, opt.value])}
                className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  foodPalette.includes(opt.value) ? 'bg-brand-500 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}>
                {foodPalette.includes(opt.value) && '\u2713 '}{opt.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-stone-500 mb-2">Cooking equipment</label>
          <div className="flex flex-wrap gap-1.5">
            {COOKING_EQUIPMENT.map(eq => (
              <button key={eq.id} onClick={() => toggleItem(cookingEquipment, setCookingEquipment, eq.label)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                  cookingEquipment.includes(eq.label) ? 'bg-brand-100 text-brand-700 border border-brand-300' : 'bg-stone-100 text-stone-600'
                }`}>
                {eq.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-stone-500 mb-2">Meals per day</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map(n => (
              <button key={n} onClick={() => setMealsPerDay(n)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  mealsPerDay === n ? 'bg-brand-500 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}>
                {n}
              </button>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* Pantry Staples */}
      <SectionCard id="pantry" title="Pantry Staples" icon="🏪">
        <div className="rounded-xl p-2 bg-stone-50">
          <label className="block text-xs font-medium text-stone-600 mb-1.5">Always in my kitchen</label>
          <div className="flex flex-wrap gap-1">
            {pantryAlways.map(item => (
              <span key={item} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-brand-100 text-brand-700">
                {item}
                <button onClick={() => setPantryAlways(pantryAlways.filter(i => i !== item))} className="text-brand-500 hover:text-red-600">&times;</button>
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-xl p-2 bg-stone-50">
          <label className="block text-xs font-medium text-stone-600 mb-1.5">Usually have</label>
          <div className="flex flex-wrap gap-1">
            {pantryUsually.map(item => (
              <span key={item} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-warm-100 text-warm-600">
                {item}
                <button onClick={() => setPantryUsually(pantryUsually.filter(i => i !== item))} className="text-warm-500 hover:text-red-600">&times;</button>
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <input type="text" value={customPantryItem} onChange={e => setCustomPantryItem(e.target.value)}
            placeholder="Add item..." className="flex-1 px-3 py-1.5 rounded-lg border border-stone-200 text-sm outline-none focus:border-brand-500"
            onKeyDown={e => {
              if (e.key === 'Enter' && customPantryItem.trim()) {
                if (addToTier === 'always') setPantryAlways([...pantryAlways, customPantryItem.trim()]);
                else setPantryUsually([...pantryUsually, customPantryItem.trim()]);
                setCustomPantryItem('');
              }
            }} />
          <select value={addToTier} onChange={e => setAddToTier(e.target.value as 'always' | 'usually')}
            className="px-2 py-1.5 rounded-lg border border-stone-200 text-xs outline-none bg-white">
            <option value="always">Always</option>
            <option value="usually">Usually</option>
          </select>
          <button onClick={() => {
            if (customPantryItem.trim()) {
              if (addToTier === 'always') setPantryAlways([...pantryAlways, customPantryItem.trim()]);
              else setPantryUsually([...pantryUsually, customPantryItem.trim()]);
              setCustomPantryItem('');
            }
          }} className="px-3 py-1.5 bg-brand-500 text-white rounded-lg text-sm hover:bg-brand-600">Add</button>
        </div>
      </SectionCard>

      {/* Nutrition Targets (read-only, auto-calculated) */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 space-y-3">
        <p className="text-sm font-semibold text-stone-800">Nutrition Targets</p>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-brand-50 rounded-xl p-2">
            <div className="text-base font-bold text-brand-700">{targets.dailyCalories}</div>
            <div className="text-[10px] text-stone-500">cal/day</div>
          </div>
          <div className="bg-blue-50 rounded-xl p-2">
            <div className="text-base font-bold text-blue-700">{targets.dailyProtein}g</div>
            <div className="text-[10px] text-stone-500">protein</div>
          </div>
          <div className="bg-amber-50 rounded-xl p-2">
            <div className="text-base font-bold text-amber-700">{targets.dailyCarbs}g</div>
            <div className="text-[10px] text-stone-500">carbs</div>
          </div>
          <div className="bg-rose-50 rounded-xl p-2">
            <div className="text-base font-bold text-rose-700">{targets.dailyFat}g</div>
            <div className="text-[10px] text-stone-500">fat</div>
          </div>
        </div>
        <p className="text-xs text-stone-400">
          Per meal ({mealsPerDay}/day): ~{perMeal.perMealCalories} cal &middot; {perMeal.perMealProtein}g protein &middot; {perMeal.perMealCarbs}g carbs &middot; {perMeal.perMealFat}g fat
        </p>
        <p className="text-[10px] text-stone-400">Calculated using the Mifflin-St Jeor equation</p>
      </div>

      {/* Logout */}
      <button
        onClick={() => setShowLogoutConfirm(true)}
        className="w-full py-3 bg-red-50 text-red-600 font-medium rounded-xl hover:bg-red-100 transition-all text-sm"
      >
        Log out
      </button>

      {/* Logout confirmation dialog */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-5 backdrop-overlay animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xs p-6 space-y-4">
            <h3 className="text-lg font-bold text-stone-900">Log out?</h3>
            <p className="text-sm text-stone-500">Your settings and preferences are saved. You can log back in anytime.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-3 bg-stone-100 text-stone-700 font-medium rounded-xl hover:bg-stone-200 transition-all text-sm"
              >
                Cancel
              </button>
              <button
                onClick={onLogout}
                className="flex-1 py-3 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 transition-all text-sm"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky save bar */}
      {hasChanges && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 mx-auto max-w-md bg-[#fafaf9]/90 backdrop-blur-sm border-t border-stone-100">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full py-3.5 bg-brand-500 text-white font-semibold rounded-xl hover:bg-brand-600 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <>
                <span className="spinner spinner-sm spinner-white" />
                Saving...
              </>
            ) : saved ? (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Saved!
              </>
            ) : 'Save Changes'}
          </button>
        </div>
      )}
    </div>
  );
}
