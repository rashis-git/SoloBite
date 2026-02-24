const stats = [
  { value: '3', label: 'Input modes', detail: 'Photo, Voice, Manual' },
  { value: '🇮🇳', label: 'India-aware', detail: 'Paneer, dal, millets' },
  { value: '1', label: 'Serving default', detail: 'No divide-by-4 math' },
  { value: '4', label: 'Nutrition metrics', detail: 'On every recipe' },
];

export default function Stats() {
  return (
    <section className="py-16 bg-teal-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl lg:text-4xl font-extrabold text-brand-400 font-[family-name:var(--font-display)]">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-white mt-1">
                {stat.label}
              </div>
              <div className="text-xs text-teal-300 mt-0.5">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
