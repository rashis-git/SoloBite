const steps = [
  {
    number: '01',
    title: 'Tell us what you have',
    description: 'Snap a photo, speak your ingredients aloud, or type them in. Three input modes — whatever feels natural.',
    visual: '📱',
  },
  {
    number: '02',
    title: 'Get a matched recipe',
    description: 'AI generates a single-portion recipe from your ingredients, tuned to your protein, carb, and fat targets.',
    visual: '🍳',
  },
  {
    number: '03',
    title: 'Cook and track',
    description: 'Step-by-step instructions. Nutrition visible on every recipe. See exactly what you are getting per meal.',
    visual: '✅',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-surface-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-20">
          <h2 className="text-3xl lg:text-4xl font-bold text-teal-900 font-[family-name:var(--font-display)]">
            How it works
          </h2>
          <p className="mt-4 text-lg text-warm-600">
            From fridge to plate in under a minute.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, i) => (
            <div key={step.number} className="relative text-center md:text-left">
              {/* Connector line (desktop only) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-warm-200 -z-10" />
              )}

              <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-3xl border border-warm-200 shadow-sm mb-6 text-4xl mx-auto md:mx-0">
                {step.visual}
              </div>

              <div className="flex items-baseline gap-3 justify-center md:justify-start mb-2">
                <span className="text-sm font-bold text-brand-500 font-[family-name:var(--font-display)]">{step.number}</span>
                <h3 className="text-lg font-bold text-teal-900 font-[family-name:var(--font-display)]">
                  {step.title}
                </h3>
              </div>

              <p className="text-warm-600 leading-relaxed text-[15px] max-w-xs mx-auto md:mx-0">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
