'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserProfile } from '@/lib/types';
import { createClient } from '@/lib/supabase/client';
import { fetchProfile, getLocalProfile } from '@/lib/storage';
import OnboardingWizard from '@/components/OnboardingWizard';
import HomeScreen from '@/components/HomeScreen';

export default function AppHome() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const isDemo = localStorage.getItem('solobite_demo') === 'true';

      if (!isDemo) {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          router.push('/login');
          return;
        }
      }

      // Try localStorage cache first for instant load
      const cached = getLocalProfile();
      if (cached?.onboardingComplete) {
        setProfile(cached);
        setIsLoading(false);
      }

      if (!isDemo) {
        // Fetch from Supabase (source of truth) for authenticated users
        const dbProfile = await fetchProfile();
        if (dbProfile?.onboardingComplete) {
          setProfile(dbProfile);
          setShowOnboarding(false);
        } else if (!cached?.onboardingComplete) {
          setShowOnboarding(true);
        }
      } else if (!cached?.onboardingComplete) {
        // Demo mode — go straight to onboarding if no cached profile
        setShowOnboarding(true);
      }

      setIsLoading(false);
    };
    init();
  }, [router]);

  const handleOnboardingComplete = (newProfile: UserProfile) => {
    setProfile(newProfile);
    setShowOnboarding(false);
  };

  const handleEditProfile = () => {
    router.push('/app/settings');
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-brand-100 rounded-2xl flex items-center justify-center text-3xl">
            🍳
          </div>
          <div className="spinner mx-auto" />
          <p className="text-warm-400 text-sm">Loading SoloBite...</p>
        </div>
      </div>
    );
  }

  if (showOnboarding || !profile) {
    return <OnboardingWizard onComplete={handleOnboardingComplete} />;
  }

  return <HomeScreen profile={profile} onEditProfile={handleEditProfile} />;
}
