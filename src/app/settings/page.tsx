'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { fetchProfile, upsertProfile, clearLocalProfile } from '@/lib/storage';
import { UserProfile } from '@/lib/types';
import SettingsView from '@/components/SettingsView';

export default function SettingsPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/login');
        return;
      }

      setUserEmail(user.email || '');

      const p = await fetchProfile();
      if (p) setProfile(p);
      setIsLoading(false);
    };
    init();
  }, [router]);

  const handleSave = async (updated: UserProfile) => {
    await upsertProfile(updated);
    setProfile(updated);
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    clearLocalProfile();
    router.push('/login');
  };

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-brand-100 rounded-2xl flex items-center justify-center text-3xl">
            🍳
          </div>
          <div className="spinner mx-auto" />
          <p className="text-stone-400 text-sm">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <SettingsView
      profile={profile}
      email={userEmail}
      onSave={handleSave}
      onLogout={handleLogout}
      onBack={() => router.push('/')}
    />
  );
}
