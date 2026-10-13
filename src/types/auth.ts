import { Profile } from './database';

export interface UserSession {
  id: string;
  email: string;
  profile?: Profile | null;
}

export type AuthMode = 'supabase' | 'demo';

export interface AuthState {
  user: UserSession | null;
  loading: boolean;
  authMode: AuthMode;
  error: string | null;
}
