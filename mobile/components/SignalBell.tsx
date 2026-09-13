import { useCallback, useEffect, useRef } from 'react';
import { Alert, AppState } from 'react-native';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import {
  buzzForSignal,
  isSignalDue,
  scheduleSignalNotification,
  subscribeNotificationEvents,
  syncSignalNotifications,
  type SignalLike,
} from '@/lib/notifications';

const firing = new Set<string>();

async function markFired(token: string, item: SignalLike, mode: 'done' | 'fired' | 'snooze') {
  if (mode === 'snooze') {
    const mins = item.snoozeMinutes || 5;
    const next = {
      ...item,
      status: 'scheduled',
      enabled: true,
      dueAt: new Date(Date.now() + mins * 60_000).toISOString(),
      lastFiredAt: new Date().toISOString(),
    };
    await api(`/api/signals/${item.id}`, { method: 'PUT', token, body: next });
    await scheduleSignalNotification(next as SignalLike);
    return;
  }

  const body = {
    ...item,
    status: mode,
    enabled: mode === 'done' ? false : item.enabled,
    lastFiredAt: new Date().toISOString(),
  };
  await api(`/api/signals/${item.id}`, { method: 'PUT', token, body });
}

export function SignalBell() {
  const { token } = useAuth();
  const tokenRef = useRef(token);
  tokenRef.current = token;

  const handleFire = useCallback(async (item: SignalLike) => {
    if (!tokenRef.current || firing.has(item.id)) return;
    firing.add(item.id);
    try {
      buzzForSignal(item);
      const isAlarm = item.kind === 'alarm';
      if (isAlarm) {
        await new Promise<void>((resolve) => {
          Alert.alert(
            item.title || 'Ship alarm',
            item.note || "The crow's nest is ringing.",
            [
              {
                text: `Snooze ${item.snoozeMinutes || 5}m`,
                style: 'cancel',
                onPress: () => {
                  markFired(tokenRef.current!, item, 'snooze').finally(() => resolve());
                },
              },
              {
                text: 'Dismiss',
                style: 'destructive',
                onPress: () => {
                  markFired(tokenRef.current!, item, 'done').finally(() => resolve());
                },
              },
            ],
            { cancelable: false },
          );
        });
      } else {
        await new Promise<void>((resolve) => {
          Alert.alert(item.title || 'Reminder', item.note || 'Time to check the nest.', [
            {
              text: 'Aye',
              onPress: () => {
                markFired(tokenRef.current!, item, 'fired').finally(() => resolve());
              },
            },
          ]);
        });
      }
    } catch {
      /* keep polling */
    } finally {
      firing.delete(item.id);
    }
  }, []);

  const fireById = useCallback(
    async (signalId: string) => {
      if (!tokenRef.current) return;
      try {
        const signals = await api<SignalLike[]>('/api/signals', { token: tokenRef.current });
        const item = (Array.isArray(signals) ? signals : []).find((s) => s.id === signalId);
        if (item) await handleFire(item);
      } catch {
        /* ignore */
      }
    },
    [handleFire],
  );

  const poll = useCallback(async () => {
    if (!tokenRef.current) return;
    try {
      const signals = await api<SignalLike[]>('/api/signals', { token: tokenRef.current });
      const list = Array.isArray(signals) ? signals : [];
      // Safe no-op on Expo Go Android
      await syncSignalNotifications(list);
      for (const item of list) {
        if (isSignalDue(item) && item.status === 'scheduled') {
          await handleFire(item);
        }
      }
    } catch {
      /* offline */
    }
  }, [handleFire]);

  useEffect(() => {
    if (!token) return;

    poll();
    // Faster poll in Expo Go where OS scheduling is unavailable
    const interval = setInterval(poll, 8_000);
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') poll();
    });
    const unsubscribe = subscribeNotificationEvents({
      onReceive: fireById,
      onResponse: fireById,
    });

    return () => {
      clearInterval(interval);
      sub.remove();
      unsubscribe();
    };
  }, [token, poll, fireById]);

  return null;
}
