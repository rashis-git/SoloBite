import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-brand-500 rounded-3xl px-8 py-14 lg:px-16 lg:py-20 overflow-hidden text-center">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-brand-400/50 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-brand-600/30 rounded-full blur-3xl" />

          <div className="relative">
            <h2 className="text-3xl lg:text-4xl font-bold text-white font-[family-name:var(--font-display)]">
              Ready to cook smarter?
            </h2>
            <p className="mt-4 text-lg text-white/80 max-w-md mx-auto">
              Stop throwing away groceries. Start eating meals that actually fuel you.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center mt-8 px-8 py-4 bg-white text-brand-700 font-bold rounded-xl hover:bg-warm-50 transition-colors text-base shadow-lg shadow-brand-700/10"
            >
              Start Cooking — It&apos;s Free
            </Link>
            <p className="mt-4 text-sm text-white/60">
              No sign-up fees. Your data stays private.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
