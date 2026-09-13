import { Alert, Platform, Vibration } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PERMISSION_KEY = 'glt_signal_notify_asked';

export type SignalLike = {
  id: string;
  title: string;
  kind?: string;
  note?: string;
  dueAt: string;
  status?: string;
  enabled?: boolean;
  sound?: boolean;
  snoozeMinutes?: number;
  repeat?: string;
};

type NotificationsModule = typeof import('expo-notifications');

let Notifications: NotificationsModule | null = null;
let loadAttempted = false;

/** Expo Go on Android throws if expo-notifications is imported (SDK 53+). */
export function isExpoGoAndroid(): boolean {
  if (Platform.OS !== 'android') return false;
  const ownership = Constants.appOwnership;
  const env = String((Constants as any).executionEnvironment || '');
  return ownership === 'expo' || env === 'storeClient' || env === 'StoreClient';
}

export function nativeNotificationsSupported(): boolean {
  // Never touch the native module on Android Expo Go — even probing it can throw.
  return !isExpoGoAndroid();
}

function loadNotifications(): NotificationsModule | null {
  if (!nativeNotificationsSupported()) return null;
  if (loadAttempted) return Notifications;
  loadAttempted = true;
  try {
    // Lazy require so Expo Go Android never evaluates the broken push module.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mod = require('expo-notifications') as NotificationsModule;
    mod.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
    Notifications = mod;
    return Notifications;
  } catch {
    Notifications = null;
    return null;
  }
}

export function parseLocalDateTime(value: string): Date {
  const match = String(value || '').match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (match) {
    return new Date(
      Number(match[1]),
      Number(match[2]) - 1,
      Number(match[3]),
      Number(match[4]),
      Number(match[5]),
      0,
      0,
    );
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

function notifId(signalId: string) {
  return `glt-signal-${signalId}`;
}

export async function getNotificationPermission(): Promise<string> {
  const mod = loadNotifications();
  if (!mod) return isExpoGoAndroid() ? 'expo-go-limited' : 'unavailable';
  try {
    const current = await mod.getPermissionsAsync();
    return current.status;
  } catch {
    return 'unavailable';
  }
}

export async function ensureNotificationPermission(interactive = true): Promise<boolean> {
  if (isExpoGoAndroid()) {
    if (interactive) {
      await AsyncStorage.setItem(PERMISSION_KEY, '1');
      Alert.alert(
        'Expo Go limit',
        'Android Expo Go cannot use OS notification scheduling (SDK 53+). Watchtower will still ring with in-app alerts while the app is open. For background alarms, use a development build.',
      );
    }
    // In-app poller still works
    return true;
  }

  const mod = loadNotifications();
  if (!mod) {
    if (interactive) {
      Alert.alert('Alerts unavailable', 'This build cannot schedule device notifications. In-app reminders still work while open.');
    }
    return false;
  }

  try {
    const current = await mod.getPermissionsAsync();
    if (current.granted || current.status === 'granted') return true;
    if (!interactive) return false;

    if (Platform.OS === 'android') {
      await mod.setNotificationChannelAsync('watchtower', {
        name: 'Watchtower bells',
        importance: mod.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 120, 250],
        lightColor: '#c41e3a',
        sound: 'default',
      });
    }

    const asked = await AsyncStorage.getItem(PERMISSION_KEY);
    const result = await mod.requestPermissionsAsync();
    await AsyncStorage.setItem(PERMISSION_KEY, '1');
    if (!result.granted && asked) {
      Alert.alert(
        'Alerts blocked',
        'Enable notifications for this app in system Settings so reminders can ring in the background.',
      );
    }
    return Boolean(result.granted || result.status === 'granted');
  } catch {
    return false;
  }
}

export async function cancelSignalNotification(signalId: string) {
  const mod = loadNotifications();
  if (!mod || !signalId) return;
  try {
    await mod.cancelScheduledNotificationAsync(notifId(signalId));
  } catch {
    /* ignore */
  }
}

export async function scheduleSignalNotification(signal: SignalLike): Promise<string | null> {
  if (!signal?.id || !signal.enabled || signal.status === 'done') {
    if (signal?.id) await cancelSignalNotification(signal.id);
    return null;
  }

  const due = new Date(signal.dueAt);
  if (Number.isNaN(due.getTime())) return null;
  if (due.getTime() <= Date.now() + 1500) {
    await cancelSignalNotification(signal.id);
    return null;
  }

  const mod = loadNotifications();
  if (!mod) return null;

  const allowed = await ensureNotificationPermission(false);
  if (!allowed) return null;

  try {
    if (Platform.OS === 'android') {
      await mod.setNotificationChannelAsync('watchtower', {
        name: 'Watchtower bells',
        importance: mod.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 120, 250],
        lightColor: '#c41e3a',
        sound: 'default',
      });
    }

    await cancelSignalNotification(signal.id);
    const isAlarm = signal.kind === 'alarm';
    await mod.scheduleNotificationAsync({
      identifier: notifId(signal.id),
      content: {
        title: isAlarm ? `ALARM · ${signal.title}` : signal.title || 'Reminder',
        body: signal.note || (isAlarm ? "Ship's bell is ringing." : 'Time to check the nest.'),
        sound: signal.sound !== false,
        data: { signalId: signal.id, kind: signal.kind || 'reminder' },
        ...(Platform.OS === 'android'
          ? {
              channelId: 'watchtower',
              priority: mod.AndroidNotificationPriority.MAX,
            }
          : {}),
      },
      trigger: {
        type: mod.SchedulableTriggerInputTypes.DATE,
        date: due,
        channelId: Platform.OS === 'android' ? 'watchtower' : undefined,
      },
    });
    return notifId(signal.id);
  } catch {
    return null;
  }
}

export async function syncSignalNotifications(signals: SignalLike[]) {
  if (!nativeNotificationsSupported()) return;
  const mod = loadNotifications();
  if (!mod) return;

  try {
    const scheduled = await mod.getAllScheduledNotificationsAsync();
    const ours = scheduled.filter((n) => String(n.identifier || '').startsWith('glt-signal-'));
    const keep = new Set(
      signals
        .filter((s) => s.enabled && s.status !== 'done' && new Date(s.dueAt).getTime() > Date.now())
        .map((s) => notifId(s.id)),
    );

    for (const item of ours) {
      if (!keep.has(String(item.identifier))) {
        try {
          await mod.cancelScheduledNotificationAsync(String(item.identifier));
        } catch {
          /* ignore */
        }
      }
    }

    for (const signal of signals) {
      await scheduleSignalNotification(signal);
    }
  } catch {
    /* Expo Go / missing native module */
  }
}

export function isSignalDue(signal: SignalLike, skewMs = 2000) {
  if (!signal.enabled) return false;
  if (signal.status === 'done') return false;
  if (signal.status === 'fired' && signal.kind !== 'alarm') return false;
  const due = new Date(signal.dueAt).getTime();
  if (Number.isNaN(due)) return false;
  return due <= Date.now() + skewMs;
}

export function buzzForSignal(signal: SignalLike) {
  try {
    if (signal.kind === 'alarm') Vibration.vibrate([0, 400, 200, 400, 200, 600]);
    else Vibration.vibrate(300);
  } catch {
    /* ignore */
  }
}

export function subscribeNotificationEvents(handlers: {
  onReceive?: (signalId: string) => void;
  onResponse?: (signalId: string) => void;
}): () => void {
  const mod = loadNotifications();
  if (!mod) return () => {};

  try {
    const received = mod.addNotificationReceivedListener((notification) => {
      const signalId = notification.request.content.data?.signalId;
      if (typeof signalId === 'string') handlers.onReceive?.(signalId);
    });
    const response = mod.addNotificationResponseReceivedListener((event) => {
      const signalId = event.notification.request.content.data?.signalId;
      if (typeof signalId === 'string') handlers.onResponse?.(signalId);
    });
    return () => {
      received.remove();
      response.remove();
    };
  } catch {
    return () => {};
  }
}
