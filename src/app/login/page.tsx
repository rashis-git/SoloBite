'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError('Failed to sign in. Please try again.');
        setIsLoading(false);
      }
    } catch {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Desktop: Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-teal-900 flex-col items-center justify-center px-12 text-center">
        <div className="w-20 h-20 bg-brand-500 rounded-3xl flex items-center justify-center text-4xl shadow-lg mb-8">
          🍳
        </div>
        <h1 className="text-4xl font-bold text-white font-[family-name:var(--font-display)]">SoloBite</h1>
        <p className="text-teal-300 text-lg mt-3 max-w-sm">Your fridge, one plate, fully fueled.</p>
        <div className="flex flex-col gap-4 text-left mt-10 text-teal-200">
          <div className="flex items-center gap-4">
            <span className="text-2xl">📸</span>
            <span>Snap your fridge, get a recipe</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-2xl">🎯</span>
            <span>Nutrition targets matched to you</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-2xl">🇮🇳</span>
            <span>Indian meals, single portions</span>
          </div>
        </div>
      </div>

      {/* Right login panel (full-screen on mobile) */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 bg-surface-cream">
        {/* Mobile-only branding */}
        <div className="lg:hidden text-center space-y-4 mb-10">
          <div className="w-20 h-20 mx-auto bg-brand-100 rounded-3xl flex items-center justify-center text-4xl shadow-sm">
            🍳
          </div>
          <div>
            <h1 className="text-3xl font-bold text-warm-900">SoloBite</h1>
            <p className="text-warm-500 text-sm mt-1">Your fridge, one plate, fully fueled.</p>
          </div>
          <div className="flex flex-col gap-2.5 text-left bg-warm-50 rounded-2xl p-4 text-sm text-warm-600">
            <div className="flex items-center gap-3">
              <span className="text-lg">📸</span>
              <span>Snap your fridge, get a recipe</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg">🎯</span>
              <span>Nutrition targets matched to you</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg">🇮🇳</span>
              <span>Indian meals, single portions</span>
            </div>
          </div>
        </div>

        <div className="w-full max-w-xs space-y-4">
          {/* Desktop-only heading */}
          <div className="hidden lg:block text-center mb-6">
            <h2 className="text-2xl font-bold text-warm-900">Welcome back</h2>
            <p className="text-warm-500 text-sm mt-1">Sign in to continue cooking</p>
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white border border-warm-300 rounded-xl text-warm-700 font-medium hover:bg-warm-50 transition-all disabled:opacity-50 shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="spinner spinner-sm" style={{ borderColor: '#E4DCCA', borderTopColor: '#6B6354' }} />
                Signing in...
              </span>
            ) : 'Continue with Google'}
          </button>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl text-center">
              {error}
            </div>
          )}
        </div>

        <p className="text-xs text-warm-400 mt-8 text-center max-w-xs">
          Free to use. Your data stays private.
        </p>
      </div>
    </div>
  );
}
