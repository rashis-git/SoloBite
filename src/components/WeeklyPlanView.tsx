'use client';

import { useState } from 'react';
import { WeeklyPlan, UserProfile, Recipe } from '@/lib/types';

interface WeeklyPlanViewProps {
  plan: WeeklyPlan;
  profile: UserProfile;
}

export default function WeeklyPlanView({ plan, profile }: WeeklyPlanViewProps) {
  const [activeTab, setActiveTab] = useState<'meals' | 'grocery' | 'threads'>('meals');
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null);

  const toggleMeal = (key: string) => {
    setExpandedMeal(expandedMeal === key ? null : key);
  };

  return (
    <div className="space-y-4 animate-slide-up">
      <div>
        <h2 className="text-xl font-bold text-stone-900">Your Weekly Plan</h2>
        <p className="text-sm text-stone-500">
          {profile.mealsPerDay * 7} meals &middot; Est. Rs {plan.totalEstimatedCost}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex bg-stone-100 rounded-xl p-1">
        {[
          { id: 'meals' as const, label: 'Meals' },
          { id: 'grocery' as const, label: 'Grocery List' },
          { id: 'threads' as const, label: 'Ingredients' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Meals tab */}
      {activeTab === 'meals' && (
        <div className="space-y-3">
          {plan.days.map(day => (
            <div key={day.day} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
              <div className="px-4 py-3 bg-stone-50 border-b border-stone-100">
                <h3 className="font-semibold text-stone-800">{day.day}</h3>
              </div>
              <div className="divide-y divide-stone-100">
                {day.meals.map((meal, mealIndex) => {
                  const key = `${day.day}-${mealIndex}`;
                  const isExpanded = expandedMeal === key;
                  const recipe: Recipe = meal.recipe;

                  return (
                    <div key={key}>
                      <button
                        onClick={() => toggleMeal(key)}
                        className="w-full px-4 py-3 flex items-center justify-between hover:bg-stone-50 transition-all"
                      >
                        <div className="text-left">
                          <span className="text-xs text-stone-400 uppercase">{meal.type}</span>
                          <p className="text-sm font-medium text-stone-700">{recipe.name}</p>
                        </div>
                        <div className="text-right flex items-center gap-3">
                          <div className="text-xs text-stone-400">
                            {recipe.calories} cal &middot; {recipe.protein}g protein
                          </div>
                          <span className="text-stone-300">{isExpanded ? '▲' : '▼'}</span>
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="px-4 pb-4 space-y-3">
                          <div className="flex gap-3 text-xs text-stone-500">
                            <span>{recipe.prepTime + recipe.cookTime} min</span>
                            <span className="capitalize">{recipe.difficulty}</span>
                          </div>

                          {/* Compact nutrition */}
                          <div className="flex gap-2">
                            <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs">{recipe.calories} cal</span>
                            <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">{recipe.protein}g protein</span>
                            <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded text-xs">{recipe.carbs}g carbs</span>
                            <span className="px-2 py-1 bg-rose-50 text-rose-700 rounded text-xs">{recipe.fat}g fat</span>
                          </div>

                          {/* Ingredients */}
                          <div>
                            <p className="text-xs font-medium text-stone-600 mb-1">Ingredients</p>
                            <ul className="space-y-1">
                              {recipe.ingredients.map((ing, i) => (
                                <li key={i} className="text-xs text-stone-600">
                                  {ing.quantity} {ing.name}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Steps */}
                          <div>
                            <p className="text-xs font-medium text-stone-600 mb-1">Steps</p>
                            <ol className="space-y-1.5">
                              {recipe.steps.map((step, i) => (
                                <li key={i} className="flex gap-2 text-xs text-stone-600">
                                  <span className="text-brand-600 font-bold">{i + 1}.</span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Grocery list tab */}
      {activeTab === 'grocery' && (
        <div className="space-y-3">
          <div className="bg-brand-50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-brand-700">Rs {plan.totalEstimatedCost}</p>
            <p className="text-xs text-brand-600">Estimated total for the week</p>
          </div>

          {/* Group by category */}
          {['vegetables', 'fruits', 'protein', 'dairy', 'grains', 'pantry', 'other'].map(category => {
            const items = plan.groceryList.filter(item => item.category === category);
            if (items.length === 0) return null;

            return (
              <div key={category} className="bg-white rounded-xl border border-stone-200 overflow-hidden">
                <div className="px-4 py-2 bg-stone-50 border-b border-stone-100">
                  <h4 className="text-sm font-semibold text-stone-700 capitalize">{category}</h4>
                </div>
                <ul className="divide-y divide-stone-50">
                  {items.map((item, i) => (
                    <li key={i} className="px-4 py-2.5 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-stone-700">{item.name}</p>
                        <p className="text-xs text-stone-400">{item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-stone-700">Rs {item.estimatedCost}</p>
                        <p className="text-xs text-stone-400">{item.usedInMeals.length} meals</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}

      {/* Ingredient threads tab */}
      {activeTab === 'threads' && (
        <div className="space-y-2">
          <p className="text-xs text-stone-400">See how each ingredient is used across the week</p>
          {plan.ingredientThreads.map((thread, i) => (
            <div key={i} className="bg-white rounded-xl border border-stone-200 p-3">
              <p className="text-sm font-medium text-stone-700">{thread.ingredient}</p>
              <ul className="mt-1 space-y-0.5">
                {thread.usedIn.map((use, j) => (
                  <li key={j} className="text-xs text-stone-500 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-brand-400 rounded-full flex-shrink-0" />
                    {use}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
