'use client';

import { useState, useEffect } from 'react';
import { UserProfile } from '@/lib/types';
import { getProfile, clearProfile } from '@/lib/storage';
import OnboardingWizard from '@/components/OnboardingWizard';
import HomeScreen from '@/components/HomeScreen';

export default function Home() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const saved = getProfile();
    if (saved?.onboardingComplete) {
      setProfile(saved);
    } else {
      setShowOnboarding(true);
    }
    setIsLoading(false);
  }, []);

  const handleOnboardingComplete = (newProfile: UserProfile) => {
    setProfile(newProfile);
    setShowOnboarding(false);
  };

  const handleEditProfile = () => {
    clearProfile();
    setShowOnboarding(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="text-4xl">🍳</div>
          <p className="text-stone-500 text-sm">Loading SoloBite...</p>
        </div>
      </div>
    );
  }

  if (showOnboarding || !profile) {
    return <OnboardingWizard onComplete={handleOnboardingComplete} />;
  }

  return <HomeScreen profile={profile} onEditProfile={handleEditProfile} />;
}
