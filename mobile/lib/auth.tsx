import * as SecureStore from 'expo-secure-store';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { api } from './api';

type User = { id: string; username: string; displayName?: string };

type AuthState = {
  ready: boolean;
  token: string | null;
  user: User | null;
  appUrl: string | null;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);
const TOKEN_KEY = 'glt_token';
const USER_KEY = 'glt_user';
const APP_URL_KEY = 'glt_app_url';

async function saveAuth(token: string, user: User, appUrl: string) {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
  await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
  await SecureStore.setItemAsync(APP_URL_KEY, appUrl);
}

async function clearAuth() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
  await SecureStore.deleteItemAsync(USER_KEY);
  await SecureStore.deleteItemAsync(APP_URL_KEY);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [appUrl, setAppUrl] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
    if (!storedToken) {
      setToken(null);
      setUser(null);
      setAppUrl(null);
      return;
    }
    const session = await api<{ authenticated: boolean; user: User; appUrl?: string }>('/api/session', {
      token: storedToken,
    });
    if (!session.authenticated) {
      await clearAuth();
      setToken(null);
      setUser(null);
      setAppUrl(null);
      return;
    }
    setToken(storedToken);
    setUser(session.user);
    setAppUrl(session.appUrl || null);
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(session.user));
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await refresh();
      } catch {
        await clearAuth();
        setToken(null);
        setUser(null);
      } finally {
        setReady(true);
      }
    })();
  }, [refresh]);

  const signIn = useCallback(async (username: string, password: string) => {
    const data = await api<{ token: string; user: User; appUrl?: string }>('/api/auth/login', {
      method: 'POST',
      body: { username, password, client: 'mobile' },
    });
    if (!data.token) throw new Error('No API token returned');
    await saveAuth(data.token, data.user, data.appUrl || '');
    setToken(data.token);
    setUser(data.user);
    setAppUrl(data.appUrl || null);
  }, []);

  const signOut = useCallback(async () => {
    try {
      if (token) {
        await api('/api/auth/extension/logout', { method: 'POST', token, body: {} });
      }
    } catch {
      /* ignore */
    }
    await clearAuth();
    setToken(null);
    setUser(null);
    setAppUrl(null);
  }, [token]);

  const value = useMemo(
    () => ({ ready, token, user, appUrl, signIn, signOut, refresh }),
    [ready, token, user, appUrl, signIn, signOut, refresh],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
