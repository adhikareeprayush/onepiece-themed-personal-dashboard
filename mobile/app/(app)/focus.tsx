import { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { ToolChrome } from '@/components/ToolChrome';
import {
  Banner,
  ChipRow,
  Field,
  ParchmentCard,
  PrimaryButton,
  SectionHeader,
} from '@/components/Ui';
import { IconButton, IconRow } from '@/components/IconButton';
import { ToolCard } from '@/components/ToolCard';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { useApiList } from '@/lib/useApiList';
import { colors, theme } from '@/lib/theme';

type Session = {
  id: string;
  kind?: string;
  minutes?: number;
  label?: string;
  completedAt?: string;
};

const PRESETS = [
  { id: '25', label: '25 focus' },
  { id: '5', label: '5 break' },
  { id: '15', label: '15 long' },
];

export default function FocusScreen() {
  const { token } = useAuth();
  const list = useApiList<Session>('/api/focus');
  const [preset, setPreset] = useState('25');
  const [label, setLabel] = useState('Focus voyage');
  const [remaining, setRemaining] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [banner, setBanner] = useState<string | null>(null);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);
  const presetRef = useRef(preset);
  const labelRef = useRef(label);
  const tokenRef = useRef(token);
  const reloadRef = useRef(list.reload);
  const setErrorRef = useRef(list.setError);

  presetRef.current = preset;
  labelRef.current = label;
  tokenRef.current = token;
  reloadRef.current = list.reload;
  setErrorRef.current = list.setError;

  async function completeSession() {
    if (!tokenRef.current) return;
    try {
      await api('/api/focus', {
        method: 'POST',
        token: tokenRef.current,
        body: {
          kind: 'focus',
          label: labelRef.current.trim() || 'Focus voyage',
          minutes: Number(presetRef.current) || 25,
          completedAt: new Date().toISOString(),
        },
      });
      setBanner('Gear Second complete — session sealed.');
      await reloadRef.current(true);
      setTimeout(() => setBanner(null), 2500);
    } catch (err: any) {
      setErrorRef.current(err?.message || 'Could not log focus');
    }
  }

  useEffect(() => {
    if (!running) return;
    tick.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          if (tick.current) clearInterval(tick.current);
          setRunning(false);
          void completeSession();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (tick.current) clearInterval(tick.current);
    };
  }, [running]);

  function applyPreset(id: string) {
    setPreset(id);
    setRemaining(Number(id) * 60);
    setRunning(false);
  }

  function remove(item: Session) {
    Alert.alert('Delete session?', item.label || 'Focus', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await api(`/api/focus/${item.id}`, { method: 'DELETE', token: list.token });
            list.removeOptimistic(item.id);
          } catch (err: any) {
            list.setError(err?.message || 'Could not delete');
          }
        },
      },
    ]);
  }

  const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
  const ss = String(remaining % 60).padStart(2, '0');

  return (
    <ToolChrome
      safeTop={false}
      title="Focus"
            refreshing={list.refreshing}
      onRefresh={() => list.reload(true)}
      loading={list.loading}
      error={list.error || banner}
      emptyMessage="No focus voyages logged yet."
      isEmpty={false}
    >
      <ParchmentCard wanted>
        <Text style={styles.timer}>
          {mm}:{ss}
        </Text>
        <Field label="Label" value={label} onChangeText={setLabel} autoCapitalize="sentences" />
        <ChipRow options={PRESETS} value={preset} onChange={applyPreset} />
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <PrimaryButton
              label={running ? 'Pause' : remaining === 0 ? 'Reset' : 'Start'}
              onPress={() => {
                if (remaining === 0) {
                  applyPreset(preset);
                  return;
                }
                setRunning((v) => !v);
              }}
            />
          </View>
          <IconButton
            name="refresh-outline"
            accessibilityLabel="Reset"
            onPress={() => {
              setRunning(false);
              applyPreset(preset);
            }}
          />
          <IconButton name="checkmark-outline" accessibilityLabel="Log now" solid onPress={() => completeSession()} />
        </View>
      </ParchmentCard>

      <SectionHeader title="History" />
      {list.items.map((item) => (
        <ToolCard
          key={item.id}
          title={item.label || 'Focus session'}
          subtitle={`${item.minutes || 25} minutes on the log`}
          meta={item.completedAt ? new Date(item.completedAt).toLocaleString() : 'Completed'}
          badge="LOG"
          icon="flame"
          tone="straw"
          trailing={
            <IconRow>
              <IconButton name="trash-outline" accessibilityLabel="Delete" danger onPress={() => remove(item)} />
            </IconRow>
          }
        />
      ))}
    </ToolChrome>
  );
}

const styles = StyleSheet.create({
  timer: {
    fontFamily: theme.fonts.pirate,
    fontSize: 56,
    color: colors.seaDeep,
    textAlign: 'center',
    marginBottom: 8,
  },
  row: { flexDirection: 'row', gap: 8 },
});
