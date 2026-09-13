import { useMemo, useState } from 'react';
import { Alert, View } from 'react-native';
import { ToolChrome } from '@/components/ToolChrome';
import { Banner, ChipRow, Field, PrimaryButton, SheetForm } from '@/components/Ui';
import { IconButton, IconRow } from '@/components/IconButton';
import { VoyageClockPicker } from '@/components/VoyageClockPicker';
import { ToolCard } from '@/components/ToolCard';
import { api } from '@/lib/api';
import { defaultDueLocal, toLocalInput } from '@/lib/forms';
import {
  cancelSignalNotification,
  ensureNotificationPermission,
  getNotificationPermission,
  isExpoGoAndroid,
  parseLocalDateTime,
  scheduleSignalNotification,
} from '@/lib/notifications';
import { useApiList } from '@/lib/useApiList';

type Signal = {
  id: string;
  title: string;
  kind: string;
  dueAt: string;
  status?: string;
  note?: string;
  enabled?: boolean;
  sound?: boolean;
  snoozeMinutes?: number;
  repeat?: string;
};

function formatWhen(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return 'Unset';
  return date.toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function relativeLabel(iso: string) {
  const ms = new Date(iso).getTime() - Date.now();
  if (Number.isNaN(ms)) return '';
  if (ms <= 0) return 'Due now';
  const mins = Math.round(ms / 60000);
  if (mins < 60) return `in ${mins}m`;
  const hours = Math.round(mins / 60);
  if (hours < 48) return `in ${hours}h`;
  return `in ${Math.round(hours / 24)}d`;
}

export default function WatchtowerScreen() {
  const list = useApiList<Signal>('/api/signals');
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Signal | null>(null);
  const [title, setTitle] = useState('');
  const [due, setDue] = useState(defaultDueLocal());
  const [kind, setKind] = useState<'reminder' | 'alarm'>('reminder');
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [notifyHint, setNotifyHint] = useState<string | null>(null);

  const visible = useMemo(() => {
    return list.filtered.filter((item) => {
      if (filter === 'reminder' && item.kind !== 'reminder') return false;
      if (filter === 'alarm' && item.kind !== 'alarm') return false;
      if (filter === 'upcoming' && !(item.enabled && item.status === 'scheduled')) return false;
      return true;
    });
  }, [list.filtered, filter]);

  async function enableAlerts() {
    const ok = await ensureNotificationPermission(true);
    if (isExpoGoAndroid()) {
      setNotifyHint(
        'Expo Go on Android cannot schedule background OS notifications. Keep the app open (or return to it) — Watchtower polls every few seconds and shows in-app alerts + vibration.',
      );
      return;
    }
    setNotifyHint(
      ok
        ? 'Device alerts armed. Upcoming bells can notify in the background.'
        : 'Notification permission denied. Enable it in system Settings.',
    );
  }

  function openCreate() {
    setEditing(null);
    setTitle('');
    setDue(defaultDueLocal());
    setKind('reminder');
    setNote('');
    setFormError(null);
    setOpen(true);
  }

  function openEdit(item: Signal) {
    setEditing(item);
    setTitle(item.title);
    setDue(toLocalInput(item.dueAt));
    setKind(item.kind === 'alarm' ? 'alarm' : 'reminder');
    setNote(item.note || '');
    setFormError(null);
    setOpen(true);
  }

  async function save() {
    if (!list.token) return;
    setBusy(true);
    setFormError(null);
    try {
      if (!title.trim() || !due) throw new Error('Title and time are required.');
      const dueAt = parseLocalDateTime(due).toISOString();
      if (Number.isNaN(new Date(dueAt).getTime())) throw new Error('Invalid date/time.');

      const perm = await getNotificationPermission();
      if (perm !== 'granted') {
        const ok = await ensureNotificationPermission(true);
        if (!ok) {
          setNotifyHint('Saved to the ship, but this device cannot ring until notifications are allowed.');
        }
      }

      const body = {
        title: title.trim(),
        dueAt,
        kind,
        note: note.trim(),
        enabled: true,
        status: 'scheduled',
        sound: true,
        source: 'mobile',
      };
      const saved = editing
        ? await api<Signal>(`/api/signals/${editing.id}`, { method: 'PUT', token: list.token, body })
        : await api<Signal>('/api/signals', { method: 'POST', token: list.token, body });

      await scheduleSignalNotification(saved);
      setOpen(false);
      setNotifyHint(
        new Date(saved.dueAt).getTime() > Date.now()
          ? `Bell armed for ${new Date(saved.dueAt).toLocaleString()}.`
          : 'Time is already due — watch for the alert.',
      );
      await list.reload(true);
    } catch (err: any) {
      setFormError(err?.message || 'Could not save');
    } finally {
      setBusy(false);
    }
  }

  async function markDone(item: Signal) {
    try {
      await api(`/api/signals/${item.id}`, {
        method: 'PUT',
        token: list.token,
        body: { ...item, status: 'done', enabled: false },
      });
      await cancelSignalNotification(item.id);
      await list.reload(true);
    } catch (err: any) {
      list.setError(err?.message || 'Could not update');
    }
  }

  async function toggleArm(item: Signal) {
    try {
      const next = {
        ...item,
        enabled: !item.enabled,
        status: !item.enabled ? 'scheduled' : item.status,
      };
      const saved = await api<Signal>(`/api/signals/${item.id}`, {
        method: 'PUT',
        token: list.token,
        body: next,
      });
      if (saved.enabled) await scheduleSignalNotification(saved);
      else await cancelSignalNotification(item.id);
      await list.reload(true);
    } catch (err: any) {
      list.setError(err?.message || 'Could not update');
    }
  }

  function remove(item: Signal) {
    Alert.alert('Delete signal?', item.title, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await api(`/api/signals/${item.id}`, { method: 'DELETE', token: list.token });
            await cancelSignalNotification(item.id);
            list.removeOptimistic(item.id);
          } catch (err: any) {
            list.setError(err?.message || 'Could not delete');
          }
        },
      },
    ]);
  }

  return (
    <>
      <ToolChrome
        title="Watchtower"
        query={list.query}
        onQuery={list.setQuery}
        filter={filter}
        filterOptions={[
          { id: 'all', label: 'All' },
          { id: 'reminder', label: 'Reminder' },
          { id: 'alarm', label: 'Alarm' },
          { id: 'upcoming', label: 'Upcoming' },
        ]}
        onFilter={setFilter}
        refreshing={list.refreshing}
        onRefresh={() => list.reload(true)}
        loading={list.loading}
        error={list.error}
        onRetry={() => list.reload()}
        emptyMessage="No bells scheduled."
        isEmpty={!visible.length}
        onCreate={openCreate}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 8 }}>
          <IconButton name="notifications-outline" accessibilityLabel="Alert info" solid onPress={enableAlerts} />
        </View>
        <Banner message={notifyHint} tone="info" />
        {visible.map((item) => {
          const alarm = item.kind === 'alarm';
          const armed = item.enabled !== false && item.status !== 'done';
          return (
            <ToolCard
              key={item.id}
              title={item.title}
              subtitle={[item.note || (alarm ? "Ship's bell" : 'Soft nest notice'), formatWhen(item.dueAt)]
                .filter(Boolean)
                .join('\n')}
              meta={`${relativeLabel(item.dueAt)}${item.repeat && item.repeat !== 'none' ? ` · ↻ ${item.repeat}` : ''}${armed ? '' : ' · disarmed'}`}
              badge={alarm ? 'ALARM' : 'REMINDER'}
              icon={alarm ? 'alarm' : 'notifications'}
              tone={alarm ? 'wanted' : 'sea'}
              wanted={alarm}
              onPress={() => openEdit(item)}
              trailing={
                <IconRow>
                  <IconButton
                    name={item.enabled ? 'notifications-off-outline' : 'notifications-outline'}
                    accessibilityLabel={item.enabled ? 'Disarm' : 'Arm'}
                    onPress={() => toggleArm(item)}
                  />
                  {item.status !== 'done' ? (
                    <IconButton name="checkmark-circle-outline" accessibilityLabel="Done" onPress={() => markDone(item)} />
                  ) : null}
                  <IconButton name="trash-outline" accessibilityLabel="Delete" danger onPress={() => remove(item)} />
                </IconRow>
              }
            />
          );
        })}
      </ToolChrome>

      <SheetForm visible={open} title={editing ? 'Edit bell' : 'Set bell'} onClose={() => setOpen(false)}>
        <Field label="Title" value={title} onChangeText={setTitle} autoCapitalize="sentences" />
        <VoyageClockPicker value={due} onChange={setDue} />
        <ChipRow
          options={[
            { id: 'reminder', label: 'Reminder' },
            { id: 'alarm', label: 'Alarm' },
          ]}
          value={kind}
          onChange={(id) => setKind(id === 'alarm' ? 'alarm' : 'reminder')}
        />
        <Field label="Note" value={note} onChangeText={setNote} multiline autoCapitalize="sentences" />
        <Banner message={formError} />
        <PrimaryButton label={busy ? 'Arming…' : 'Save & arm bell'} onPress={save} disabled={busy} />
      </SheetForm>
    </>
  );
}
