import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const extra = (Constants.expoConfig?.extra || {}) as { apiUrl?: string };
const OVERRIDE_KEY = 'glt_api_url_override';

let cachedOverride: string | null | undefined;

export async function loadApiOverride() {
  cachedOverride = await AsyncStorage.getItem(OVERRIDE_KEY);
  return cachedOverride;
}

export async function setApiOverride(url: string | null) {
  const cleaned = url?.trim().replace(/\/$/, '') || null;
  cachedOverride = cleaned;
  if (cleaned) await AsyncStorage.setItem(OVERRIDE_KEY, cleaned);
  else await AsyncStorage.removeItem(OVERRIDE_KEY);
}

export function bundlerOrigin(): string | null {
  const hostUri =
    Constants.expoConfig?.hostUri ||
    (Constants as any).manifest2?.extra?.expoGo?.debuggerHost ||
    (Constants as any).manifest?.debuggerHost ||
    null;
  if (!hostUri) return null;

  const host = String(hostUri).replace(/\/$/, '');
  if (host.includes('exp.direct')) {
    return `https://${host.replace(/:\d+$/, '')}`;
  }
  if (host.startsWith('http://') || host.startsWith('https://')) {
    return host.replace(/\/$/, '');
  }
  return `http://${host}`;
}

export function getApiUrl() {
  if (cachedOverride) return cachedOverride.replace(/\/$/, '');

  const configured = (process.env.EXPO_PUBLIC_API_URL || extra.apiUrl || '').trim();

  if (!configured || configured.toLowerCase() === 'metro') {
    return (bundlerOrigin() || 'http://127.0.0.1:8081').replace(/\/$/, '');
  }

  return configured.replace(/\/$/, '');
}

export function isTunnelApi(): boolean {
  return getApiUrl().includes('exp.direct');
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status = 0) {
    super(message);
    this.status = status;
  }
}

export async function api<T = any>(
  path: string,
  {
    method = 'GET',
    token,
    body,
  }: { method?: string; token?: string | null; body?: unknown } = {},
): Promise<T> {
  const url = `${getApiUrl()}${path}`;
  let response: Response;
  try {
    response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        'X-GLT-Client': 'mobile',
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(
      `Can't reach the ship at ${getApiUrl()}. Keep npm start running; for Expo Go use EXPO_PUBLIC_API_URL=metro (Metro proxies /api).`,
      0,
    );
  }

  if (response.status === 204) return undefined as T;
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const msg =
      data.error ||
      (response.status === 503
        ? `Ship unreachable via Metro proxy (503). Keep npm start running on :4173.`
        : `Request failed (${response.status})`);
    throw new ApiError(msg, response.status);
  }
  return data as T;
}

export async function pingShip(token?: string | null) {
  return api('/api/session', { token });
}

// Warm override cache early
loadApiOverride().catch(() => {});
