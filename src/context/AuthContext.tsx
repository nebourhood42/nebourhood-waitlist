'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

// -----------------------------------------------
// TYPES
// -----------------------------------------------

// What the backend returns from /profile/:id
export interface UserProfile {
  userId: string;
  email: string;
  fullName: string;
  profileImage: string | null;
  referral_code: string;
  referredBy: string | null;
  referral_count: number;
  createdAt: string;
  updatedAt: string;
}

// What the backend returns from /auth/google/signup and /auth/google/signin
// Note: the auth response uses "userID" (capital ID) — different from profile's "userId"
interface AuthUser {
  userID: string;
  email: string;
  sub: string;
  expires_at: number;
}

// What we persist to localStorage after login
// We save the userId so we can fetch the full profile later
interface StoredSession {
  token: string;
  userId: string;
}

interface AuthContextType {
  user: UserProfile | null;     // Full profile from /profile/:id
  token: string | null;
  isLoading: boolean;
  signupWithGoogle: (idToken: string, referralCode?: string | null) => Promise<boolean>;
  signinWithGoogle: (idToken: string) => Promise<boolean>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

// -----------------------------------------------
// HELPERS
// Read and write session from localStorage
// -----------------------------------------------

function getStoredSession(): StoredSession | null {
  try {
    const raw = localStorage.getItem('auth_session');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveSession(token: string, userId: string) {
  localStorage.setItem('auth_session', JSON.stringify({ token, userId }));
}

function clearSession() {
  localStorage.removeItem('auth_session');
}

// -----------------------------------------------
// CONTEXT
// -----------------------------------------------

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {

  // Read token and userId from localStorage on first render
  // (lazy initializer — runs once before mount, no useEffect needed)
  const [session, setSession] = useState<StoredSession | null>(
    () => getStoredSession()
  );

  const queryClient = useQueryClient();

  const token = session?.token ?? null;
  const userId = session?.userId ?? null;


  // LOGOUT
  const logout = useCallback(() => {
    clearSession();
    setSession(null);
    queryClient.clear();
  }, [queryClient]);


  // FETCH FULL PROFILE
  // Only runs when we have a userId saved from a previous login.
  // Hits GET /profile/:id — no auth header required per the API docs.
  const {
    data: user = null,
    isLoading: isProfileLoading,
    refetch,
  } = useQuery<UserProfile | null>({
    queryKey: ['user-profile', userId],
    queryFn: async () => {
      if (!userId) return null;
      try {
        const response = await api.get(`/profile/${userId}`);
        return response.data;
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        // If the user no longer exists on the backend, clear the session
        logout();
        throw err;
      }
    },
    enabled: !!userId,    // Only fetch if we have a userId
    retry: false,
    staleTime: 1000 * 60 * 5,
  });


  // HANDLE AUTH RESPONSE
  // Both signup and signin return the same shape.
  // We save the token + userId, then store the basic user info in cache.
  function handleAuthSuccess(accessToken: string, authUser: AuthUser) {
    saveSession(accessToken, authUser.userID);
    setSession({ token: accessToken, userId: authUser.userID });

    // Pre-fill the cache with what we already know from the auth response.
    // The full profile (fullName, referral_code, etc.) will load separately.
    queryClient.setQueryData(['user-profile', authUser.userID], {
      userId: authUser.userID,
      email: authUser.email,
      fullName: '',
      profileImage: null,
      referral_code: '',
      referredBy: null,
      referral_count: 0,
      createdAt: '',
      updatedAt: '',
    } as UserProfile);
  }


  // SIGN UP WITH GOOGLE
  const signupWithGoogle = async (
    idToken: string,
    referralCode?: string | null
  ): Promise<boolean> => {
    try {
      const response = await api.post('/auth/google/signup', {
        token: idToken,
        referral_code: referralCode ?? undefined,
      });

      const { success, access_token, user: authUser } = response.data;

      if (success && access_token && authUser) {
        handleAuthSuccess(access_token, authUser);
        return true;
      }

      return false;
    } catch (err) {
      console.error('Signup failed:', err);
      throw err;
    }
  };


  // SIGN IN WITH GOOGLE
  const signinWithGoogle = async (idToken: string): Promise<boolean> => {
    try {
      const response = await api.post('/auth/google/signin', {
        token: idToken,
      });

      const { success, access_token, user: authUser } = response.data;

      if (success && access_token && authUser) {
        handleAuthSuccess(access_token, authUser);
        return true;
      }

      return false;
    } catch (err) {
      console.error('Signin failed:', err);
      throw err;
    }
  };


  // REFRESH PROFILE
  // Manually re-fetch the profile from /profile/:id
  const refreshProfile = async () => {
    await refetch();
  };


  const isLoading = !!userId && isProfileLoading;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        signupWithGoogle,
        signinWithGoogle,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// -----------------------------------------------
// useAuth HOOK
// Usage in any component:
//   const { user, token, logout } = useAuth();
// -----------------------------------------------

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return context;
}