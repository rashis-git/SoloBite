'use client';

import { useState, useEffect } from 'react';
import { Recipe, YouTubeVideo } from '@/lib/types';
import { UserProfile } from '@/lib/types';
import NutritionRing from './NutritionRing';

interface RecipeCardProps {
  recipe: Recipe;
  profile: UserProfile;
  onTryAnother: () => void;
  isLoading?: boolean;
}

export default function RecipeCard({ recipe, profile, onTryAnother, isLoading }: RecipeCardProps) {
  const [showSteps, setShowSteps] = useState(false);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(false);

  useEffect(() => {
    if (recipe.name) {
      setLoadingVideos(true);
      fetch('/api/search-videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipeName: recipe.name }),
      })
        .then(res => res.json())
        .then(data => setVideos(data.videos || []))
        .catch(() => setVideos([]))
        .finally(() => setLoadingVideos(false));
    }
  }, [recipe.name]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-stone-200 animate-gentle-pulse">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-stone-100 rounded-full" />
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-stone-100 rounded w-3/4" />
            <div className="h-3 bg-stone-100 rounded w-1/2" />
          </div>
        </div>
        <div className="flex justify-around mb-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="w-16 h-16 bg-stone-100 rounded-full" />
          ))}
        </div>
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-3 bg-stone-100 rounded" />
          ))}
        </div>
        <p className="text-center text-sm text-stone-400 mt-4">Cooking up something good...</p>
      </div>
    );
  }

  const itemsToBuy = recipe.ingredients.filter(i => !i.available);
  const totalBuyCost = itemsToBuy.reduce((sum, i) => sum + (i.estimatedCost || 0), 0);

  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden animate-slide-up">
      {/* Header */}
      <div className="p-5 pb-3">
        <h3 className="text-lg font-bold text-stone-900">{recipe.name}</h3>
        <div className="flex gap-3 mt-1 text-sm text-stone-500">
          <span>{recipe.prepTime + recipe.cookTime} min</span>
          <span>&middot;</span>
          <span className="capitalize">{recipe.difficulty}</span>
          <span>&middot;</span>
          <span>{recipe.servings} serving{recipe.servings > 1 ? 's' : ''}</span>
        </div>
        {recipe.tags.length > 0 && (
          <div className="flex gap-1.5 mt-2">
            {recipe.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-brand-50 text-brand-700 text-xs rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Nutrition rings */}
      <div className="px-5 py-3 flex justify-around border-y border-stone-100 bg-stone-50/50">
        <NutritionRing label="Calories" value={recipe.calories} target={profile.perMealCalories} unit="cal" color="green" />
        <NutritionRing label="Protein" value={recipe.protein} target={profile.perMealProtein} unit="g" color="blue" />
        <NutritionRing label="Carbs" value={recipe.carbs} target={profile.perMealCarbs} unit="g" color="amber" />
        <NutritionRing label="Fat" value={recipe.fat} target={profile.perMealFat} unit="g" color="rose" />
      </div>

      {/* Ingredients */}
      <div className="p-5 pb-3">
        <h4 className="text-sm font-semibold text-stone-700 mb-2">Ingredients</h4>
        <ul className="space-y-1.5">
          {recipe.ingredients.map((ing, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="mt-0.5">{ing.available ? '✅' : '🛒'}</span>
              <span className={ing.available ? 'text-stone-700' : 'text-stone-500'}>
                {ing.quantity} {ing.name}
                {!ing.available && ing.estimatedCost && (
                  <span className="text-stone-400 ml-1">(~Rs {ing.estimatedCost})</span>
                )}
              </span>
            </li>
          ))}
        </ul>
        {itemsToBuy.length > 0 && (
          <p className="text-xs text-stone-400 mt-2">
            Items to buy: {itemsToBuy.length} &middot; Est. cost: Rs {totalBuyCost}
          </p>
        )}
      </div>

      {/* Steps toggle */}
      <div className="px-5 pb-3">
        <button
          onClick={() => setShowSteps(!showSteps)}
          className="w-full py-2.5 text-sm font-medium text-brand-600 bg-brand-50 rounded-xl hover:bg-brand-100 transition-all"
        >
          {showSteps ? 'Hide Steps' : `Show Steps (${recipe.steps.length} steps)`}
        </button>
        {showSteps && (
          <ol className="mt-3 space-y-3">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="flex-shrink-0 w-6 h-6 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                <span className="text-stone-700 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* Delta upgrades */}
      {recipe.deltaUpgrades && recipe.deltaUpgrades.length > 0 && (
        <div className="px-5 pb-3">
          <div className="bg-warm-50 rounded-xl p-3 border border-warm-100">
            <p className="text-xs font-semibold text-warm-600 mb-2">Want something different?</p>
            {recipe.deltaUpgrades.map((upgrade, i) => (
              <div key={i} className="text-sm text-stone-700">
                <p>
                  Add <strong>{upgrade.itemsNeeded.join(' + ')}</strong>
                  <span className="text-stone-400"> (~Rs {upgrade.estimatedCost})</span>
                </p>
                <p className="text-xs text-stone-500">
                  &rarr; {upgrade.recipeName} &middot; {upgrade.protein}g protein &middot; {upgrade.calories} cal
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* YouTube videos */}
      {!loadingVideos && videos.length > 0 && (
        <div className="px-5 pb-3">
          <h4 className="text-sm font-semibold text-stone-700 mb-2">Watch how to make this</h4>
          <div className="space-y-2">
            {videos.slice(0, 2).map((video, i) => (
              <a
                key={i}
                href={video.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2 rounded-xl bg-stone-50 hover:bg-stone-100 transition-all"
              >
                {video.thumbnailUrl ? (
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-20 h-14 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-20 h-14 bg-stone-200 rounded-lg flex items-center justify-center text-2xl">
                    ▶
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-stone-700 line-clamp-2">{video.title}</p>
                  <p className="text-xs text-stone-400">{video.channelName}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="p-5 pt-2 flex gap-2">
        <button
          onClick={onTryAnother}
          className="flex-1 py-3 bg-stone-100 text-stone-700 font-medium rounded-xl hover:bg-stone-200 transition-all text-sm"
        >
          Try Another
        </button>
      </div>
    </div>
  );
}
