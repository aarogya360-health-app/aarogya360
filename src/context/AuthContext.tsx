import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Profile } from '@/types/database';
import { UserSession, AuthMode } from '@/types/auth';

interface AuthContextType {
  user: UserSession | null;
  loading: boolean;
  authMode: AuthMode;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, displayName: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  enableDemoSession: (customName?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER_STORAGE_KEY = 'aarogya360_demo_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authMode, setAuthMode] = useState<AuthMode>(isSupabaseConfigured ? 'supabase' : 'demo');

  // Initialize auth
  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      try {
        const client = supabase;
        if (isSupabaseConfigured && client) {
          const { data: { session }, error } = await client.auth.getSession();
          if (error) {
            console.warn('Supabase auth session fetch warning:', error.message);
          }

          if (session?.user && mounted) {
            // Fetch profile
            const { data: profile } = await client
              .from('profiles')
              .select('*')
              .eq('user_id', session.user.id)
              .maybeSingle();

            setUser({
              id: session.user.id,
              email: session.user.email || '',
              profile: profile || {
                user_id: session.user.id,
                display_name: session.user.user_metadata?.display_name || 'Member',
                preferred_language: 'en',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              },
            });
            setAuthMode('supabase');
          } else {
            // Check if demo user saved
            checkDemoStorage();
          }

          // Listen for auth state changes
          const { data: authListener } = client.auth.onAuthStateChange(async (event, session) => {
            if (!mounted) return;
            if (session?.user) {
              const { data: profile } = await client
                .from('profiles')
                .select('*')
                .eq('user_id', session.user.id)
                .maybeSingle();

              setUser({
                id: session.user.id,
                email: session.user.email || '',
                profile: profile || {
                  user_id: session.user.id,
                  display_name: session.user.user_metadata?.display_name || 'Member',
                  preferred_language: 'en',
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                },
              });
              setAuthMode('supabase');
            } else {
              checkDemoStorage();
            }
          });

          return () => {
            authListener?.subscription.unsubscribe();
          };
        } else {
          // Supabase not configured: fallback to demo mode storage
          checkDemoStorage();
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        checkDemoStorage();
      } finally {
        if (mounted) setLoading(false);
      }
    }

    function checkDemoStorage() {
      try {
        const saved = localStorage.getItem(DEMO_USER_STORAGE_KEY);
        if (saved) {
          setUser(JSON.parse(saved));
          setAuthMode('demo');
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    }

    initAuth();

    return () => {
      mounted = false;
    };
  }, []);

  const enableDemoSession = (customName: string = 'Prardhana Rao') => {
    const demoUser: UserSession = {
      id: 'demo-user-aarogya-001',
      email: 'member@aarogya360.health',
      profile: {
        user_id: 'demo-user-aarogya-001',
        display_name: customName,
        date_of_birth: '1992-06-15',
        preferred_language: 'en',
        blood_group: 'O+',
        emergency_contact: {
          name: 'Sunil Rao',
          phone: '+91 98765 43210',
          relationship: 'Spouse',
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    };
    setUser(demoUser);
    setAuthMode('demo');
    try {
      localStorage.setItem(DEMO_USER_STORAGE_KEY, JSON.stringify(demoUser));
    } catch {}
  };

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return { success: false, error: error.message };
        if (data.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', data.user.id)
            .maybeSingle();

          setUser({
            id: data.user.id,
            email: data.user.email || email,
            profile: profile || null,
          });
          setAuthMode('supabase');
          return { success: true };
        }
      } catch (err: any) {
        return { success: false, error: err.message || 'Authentication failed' };
      }
    }

    // Demo Mode sign in
    enableDemoSession(email.split('@')[0] || 'Aarogya Member');
    return { success: true };
  };

  const signUp = async (email: string, password: string, displayName: string): Promise<{ success: boolean; error?: string }> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: displayName },
          },
        });
        if (error) return { success: false, error: error.message };

        if (data.user) {
          // Insert profile record
          await supabase.from('profiles').insert({
            user_id: data.user.id,
            display_name: displayName,
            preferred_language: 'en',
          });

          setUser({
            id: data.user.id,
            email: data.user.email || email,
            profile: {
              user_id: data.user.id,
              display_name: displayName,
              preferred_language: 'en',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          });
          setAuthMode('supabase');
          return { success: true };
        }
      } catch (err: any) {
        return { success: false, error: err.message || 'Sign up failed' };
      }
    }

    // Demo mode fallback
    enableDemoSession(displayName);
    return { success: true };
  };

  const signOut = async (): Promise<void> => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Sign out warning:', err);
      }
    }
    try {
      localStorage.removeItem(DEMO_USER_STORAGE_KEY);
    } catch {}
    setUser(null);
  };

  const updateProfile = async (updates: Partial<Profile>): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'User is not signed in' };

    const updatedProfile: Profile = {
      ...user.profile,
      ...updates,
      user_id: user.id,
      updated_at: new Date().toISOString(),
      display_name: updates.display_name || user.profile?.display_name || 'Member',
      preferred_language: updates.preferred_language || user.profile?.preferred_language || 'en',
      created_at: user.profile?.created_at || new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase && authMode === 'supabase') {
      try {
        const { error } = await supabase
          .from('profiles')
          .upsert({
            ...updatedProfile,
            user_id: user.id,
          });

        if (error) return { success: false, error: error.message };
      } catch (err: any) {
        return { success: false, error: err.message || 'Failed to update profile' };
      }
    } else {
      // Demo mode local persist
      try {
        const updatedUser = { ...user, profile: updatedProfile };
        localStorage.setItem(DEMO_USER_STORAGE_KEY, JSON.stringify(updatedUser));
      } catch {}
    }

    setUser(prev => prev ? { ...prev, profile: updatedProfile } : null);
    return { success: true };
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) return { success: false, error: error.message };
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err.message || 'Password reset request failed' };
      }
    }
    // Demo mode
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authMode,
        isConfigured: isSupabaseConfigured,
        signIn,
        signUp,
        signOut,
        updateProfile,
        resetPassword,
        enableDemoSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
