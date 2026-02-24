import Link from 'next/link';

export default function Hero() {
  return (
    <section className="pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Left — copy */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-50 rounded-full mb-6">
              <span className="w-2 h-2 bg-teal-500 rounded-full" />
              <span className="text-xs font-medium text-teal-700">AI-powered meal companion</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-teal-900 leading-[1.1] tracking-tight font-[family-name:var(--font-display)]">
              Your fridge,{' '}
              <span className="text-brand-500">one plate,</span>{' '}
              fully fueled.
            </h1>

            <p className="mt-6 text-lg lg:text-xl text-warm-600 leading-relaxed max-w-lg">
              SoloBite turns whatever is in your fridge into a single-portion, nutritionally complete meal. No waste. No leftovers sitting for three days.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-brand-500 text-white font-semibold rounded-xl hover:bg-brand-600 transition-colors shadow-md shadow-brand-500/20 text-base"
              >
                Start Cooking
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center px-7 py-3.5 border-2 border-teal-600 text-teal-700 font-semibold rounded-xl hover:bg-teal-50 transition-colors text-base"
              >
                See How It Works
              </a>
            </div>

            <p className="mt-5 text-sm text-warm-500">
              Free to use. No credit card needed.
            </p>
          </div>

          {/* Right — app mockup */}
          <div className="mt-12 lg:mt-0 relative">
            <div className="relative mx-auto max-w-sm lg:max-w-md">
              {/* Decorative blob */}
              <div className="absolute -top-8 -right-8 w-64 h-64 bg-brand-200/40 rounded-full blur-3xl" />
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-teal-200/30 rounded-full blur-3xl" />

              {/* Phone frame */}
              <div className="relative bg-teal-900 rounded-[2.5rem] p-3 shadow-2xl shadow-teal-900/20">
                <div className="bg-surface-cream rounded-[2rem] overflow-hidden">
                  {/* Status bar */}
                  <div className="bg-teal-900 px-6 py-3 flex justify-between items-center">
                    <span className="text-white/60 text-xs font-medium">9:41</span>
                    <div className="flex gap-1">
                      <div className="w-4 h-2 bg-white/60 rounded-sm" />
                      <div className="w-2 h-2 bg-white/60 rounded-full" />
                    </div>
                  </div>

                  {/* App content mockup */}
                  <div className="px-5 py-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm font-bold text-teal-900">SoloBite</div>
                        <div className="text-xs text-warm-500">Good morning, Priya!</div>
                      </div>
                      <div className="w-8 h-8 bg-warm-200 rounded-full" />
                    </div>

                    <div className="bg-white rounded-2xl border border-warm-200 p-3 space-y-2">
                      <div className="h-3 bg-warm-200 rounded w-3/4" />
                      <div className="h-3 bg-warm-100 rounded w-1/2" />
                    </div>

                    <div className="flex gap-2">
                      <div className="flex-1 bg-white rounded-xl border border-warm-200 p-2.5 text-center">
                        <div className="text-lg">📷</div>
                        <div className="text-[10px] text-warm-500 mt-0.5">Upload</div>
                      </div>
                      <div className="flex-1 bg-white rounded-xl border border-warm-200 p-2.5 text-center">
                        <div className="text-lg">🎤</div>
                        <div className="text-[10px] text-warm-500 mt-0.5">Speak</div>
                      </div>
                    </div>

                    <div className="flex gap-1.5 flex-wrap">
                      <span className="px-2.5 py-1 bg-brand-50 border border-brand-200 rounded-full text-[10px] font-medium text-brand-700">🌶 Spicy</span>
                      <span className="px-2.5 py-1 bg-teal-50 border border-teal-200 rounded-full text-[10px] font-medium text-teal-700">⚡ Quick</span>
                      <span className="px-2.5 py-1 bg-warm-100 border border-warm-200 rounded-full text-[10px] font-medium text-warm-700">🥗 Healthy</span>
                    </div>

                    {/* Nutrition rings mockup */}
                    <div className="flex justify-around py-2">
                      {[
                        { label: 'Cal', color: 'brand-500', value: '420' },
                        { label: 'Protein', color: 'teal-600', value: '28g' },
                        { label: 'Carbs', color: 'brand-300', value: '45g' },
                      ].map(ring => (
                        <div key={ring.label} className="flex flex-col items-center">
                          <div className={`w-11 h-11 rounded-full border-[3px] border-${ring.color} flex items-center justify-center`}>
                            <span className="text-[9px] font-bold text-teal-900">{ring.value}</span>
                          </div>
                          <span className="text-[9px] text-warm-500 mt-1">{ring.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating food elements */}
              <div className="absolute -top-4 -left-6 text-3xl animate-gentle-pulse" style={{ animationDelay: '0s' }}>🥬</div>
              <div className="absolute top-1/4 -right-8 text-2xl animate-gentle-pulse" style={{ animationDelay: '0.5s' }}>🍅</div>
              <div className="absolute -bottom-4 -left-4 text-2xl animate-gentle-pulse" style={{ animationDelay: '1s' }}>🥚</div>
              <div className="absolute bottom-1/4 -right-6 text-3xl animate-gentle-pulse" style={{ animationDelay: '1.5s' }}>🌶️</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
