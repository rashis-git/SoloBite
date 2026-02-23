'use client';

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Already dismissed
    if (localStorage.getItem('solobite_pwa_dismissed')) return;

    // Already installed (standalone mode)
    if (window.matchMedia('(display-mode: standalone)').matches) return;
    // iOS standalone check
    if ((navigator as { standalone?: boolean }).standalone) return;

    // Detect iOS
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    setIsIOS(ios);

    if (ios) {
      // Check if running in Safari (not in-app browser)
      const isSafari = /safari/i.test(navigator.userAgent) && !/crios|fxios/i.test(navigator.userAgent);
      if (isSafari) {
        setShowBanner(true);
      }
    } else {
      // Android/Desktop: listen for beforeinstallprompt
      const handler = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e as BeforeInstallPromptEvent);
        setShowBanner(true);
      };
      window.addEventListener('beforeinstallprompt', handler);
      return () => window.removeEventListener('beforeinstallprompt', handler);
    }
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowBanner(false);
        localStorage.setItem('solobite_pwa_dismissed', 'true');
      }
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem('solobite_pwa_dismissed', 'true');
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 mx-auto max-w-md">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-lg p-4 animate-slide-up">
        <div className="flex items-start gap-3">
          <div className="text-2xl flex-shrink-0">🍳</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-stone-800">Add SoloBite to Home Screen</p>
            {isIOS ? (
              <div className="text-xs text-stone-500 mt-2 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-stone-100 rounded flex items-center justify-center text-[10px] font-bold text-stone-600 flex-shrink-0">1</span>
                  <span>Tap the <strong>Share</strong> button at the bottom of Safari</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-stone-100 rounded flex items-center justify-center text-[10px] font-bold text-stone-600 flex-shrink-0">2</span>
                  <span>Scroll down and tap <strong>Add to Home Screen</strong></span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-stone-500 mt-1">
                Install the app for quick access and offline recipe viewing
              </p>
            )}
          </div>
          <button
            onClick={handleDismiss}
            className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-full text-lg leading-none flex-shrink-0 transition-colors"
            aria-label="Dismiss install banner"
          >
            &times;
          </button>
        </div>
        {!isIOS && deferredPrompt && (
          <button
            onClick={handleInstall}
            className="w-full mt-3 py-3 bg-brand-500 text-white text-sm font-medium rounded-xl hover:bg-brand-600 transition-all min-h-[44px]"
          >
            Install App
          </button>
        )}
      </div>
    </div>
  );
}
