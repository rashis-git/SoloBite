const features = [
  {
    icon: '📸',
    title: 'Photo Your Fridge',
    description: 'Snap a photo of what you have. Our AI identifies every ingredient and suggests what you can make — no typing required.',
    accent: 'brand',
  },
  {
    icon: '🎯',
    title: 'Single Portions, Balanced Meals',
    description: 'Every recipe is sized for one. Protein, carbs, and fats calculated against your personal nutrition targets. No mental math.',
    accent: 'teal',
  },
  {
    icon: '📅',
    title: 'Plan Your Week',
    description: 'Generate a 7-day meal plan that cross-optimizes ingredients across meals. One grocery list, zero waste.',
    accent: 'brand',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-20">
          <h2 className="text-3xl lg:text-4xl font-bold text-teal-900 font-[family-name:var(--font-display)]">
            Built for cooking solo
          </h2>
          <p className="mt-4 text-lg text-warm-600">
            Recipes are designed for families. Groceries come in bulk. SoloBite fixes both — starting from what you already have.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-10">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative bg-surface-cream rounded-2xl p-7 lg:p-8 border border-warm-200/80 hover:border-warm-300 transition-all hover:shadow-lg hover:shadow-warm-200/40"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 ${
                feature.accent === 'brand'
                  ? 'bg-brand-100 shadow-sm shadow-brand-200/40'
                  : 'bg-teal-100 shadow-sm shadow-teal-200/40'
              }`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-teal-900 mb-2 font-[family-name:var(--font-display)]">
                {feature.title}
              </h3>
              <p className="text-warm-600 leading-relaxed text-[15px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
