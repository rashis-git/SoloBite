'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface-cream/80 backdrop-blur-md border-b border-warm-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-brand-500 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-sm shadow-brand-500/20">
              S
            </div>
            <span className="text-xl font-bold text-teal-900 font-[family-name:var(--font-display)]">SoloBite</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-warm-600 hover:text-teal-700 transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-warm-600 hover:text-teal-700 transition-colors">How It Works</a>
            <a href="#about" className="text-sm font-medium text-warm-600 hover:text-teal-700 transition-colors">About</a>
            <Link
              href="/login"
              className="px-5 py-2.5 bg-brand-500 text-white text-sm font-semibold rounded-xl hover:bg-brand-600 transition-colors shadow-sm shadow-brand-500/20"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-warm-100 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-warm-700 rounded-full transition-transform ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-warm-700 rounded-full transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-warm-700 rounded-full transition-transform ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-fade-in">
            <a href="#features" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-warm-700 rounded-lg hover:bg-warm-100">Features</a>
            <a href="#how-it-works" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-warm-700 rounded-lg hover:bg-warm-100">How It Works</a>
            <a href="#about" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-warm-700 rounded-lg hover:bg-warm-100">About</a>
            <Link href="/login" className="block px-3 py-2.5 text-sm font-semibold text-brand-600">Get Started</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
