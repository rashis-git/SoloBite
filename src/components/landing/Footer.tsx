import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="about" className="py-12 bg-surface-cream border-t border-warm-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                S
              </div>
              <span className="text-lg font-bold text-teal-900 font-[family-name:var(--font-display)]">SoloBite</span>
            </div>
            <p className="text-sm text-warm-500 max-w-xs">
              AI-powered meal companion for solo diners. Your fridge, one plate, fully fueled.
            </p>
          </div>

          <div className="flex gap-6 text-sm text-warm-500">
            <Link href="/login" className="hover:text-teal-700 transition-colors">Get Started</Link>
            <a href="#features" className="hover:text-teal-700 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-teal-700 transition-colors">How It Works</a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-warm-200 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-warm-400">
          <p>Built by Rashi Gupta</p>
          <p>Free to use. Your data stays private.</p>
        </div>
      </div>
    </footer>
  );
}
