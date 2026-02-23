import { UserProfile } from './types';
import { createClient } from './supabase/client';
import { rowToProfile, profileToRow, ProfileRow } from './supabase/profile-mapper';

const PROFILE_KEY = 'solobite_profile';

// === localStorage functions (cache for offline PWA use) ===

export function getLocalProfile(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(PROFILE_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data) as UserProfile;
  } catch {
    return null;
  }
}

export function saveLocalProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function clearLocalProfile(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(PROFILE_KEY);
}

// === Supabase functions (source of truth) ===

export async function fetchProfile(): Promise<UserProfile | null> {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error || !data) return null;

    const profile = rowToProfile(data as ProfileRow);
    // Cache locally for offline PWA use
    saveLocalProfile(profile);
    return profile;
  } catch {
    // Supabase call failed — fall back to local cache
    return getLocalProfile();
  }
}

export async function upsertProfile(profile: UserProfile): Promise<void> {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const row = profileToRow(profile);
    await supabase.from('profiles').upsert({ id: user.id, ...row });
  } catch (err) {
    console.warn('Failed to save profile to Supabase:', err);
  }
  // Always cache locally regardless of Supabase success
  saveLocalProfile(profile);
}

// Legacy aliases for backward compatibility
export const getProfile = getLocalProfile;
export const saveProfile = saveLocalProfile;
export const clearProfile = clearLocalProfile;

export function isOnboardingComplete(): boolean {
  const profile = getLocalProfile();
  return profile?.onboardingComplete ?? false;
}
