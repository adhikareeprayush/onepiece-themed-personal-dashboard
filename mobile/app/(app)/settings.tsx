import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {
  Banner,
  Field,
  Muted,
  ParchmentCard,
  PrimaryButton,
  SeaScreen,
  SectionHeader,
} from '@/components/Ui';
import { IconButton } from '@/components/IconButton';
import { getApiUrl, isTunnelApi, loadApiOverride, pingShip, setApiOverride } from '@/lib/api';
import { useAuth } from '@/lib/auth';

export default function SettingsScreen() {
  const { token, signOut, user } = useAuth();
  const [override, setOverride] = useState('');
  const [resolved, setResolved] = useState(getApiUrl());
  const [message, setMessage] = useState<string | null>(null);
  const [tone, setTone] = useState<'error' | 'info'>('info');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    loadApiOverride().then((value) => {
      setOverride(value || '');
      setResolved(getApiUrl());
    });
  }, []);

  async function saveOverride() {
    setBusy(true);
    setMessage(null);
    try {
      const value = override.trim();
      await setApiOverride(value && value.toLowerCase() !== 'metro' ? value : null);
      setResolved(getApiUrl());
      setTone('info');
      setMessage(value ? 'API override saved.' : 'Using Metro / env default.');
    } finally {
      setBusy(false);
    }
  }

  async function ping() {
    setBusy(true);
    setMessage(null);
    try {
      const session = await pingShip(token);
      setTone('info');
      setMessage(
        session?.authenticated
          ? `Ship reachable. Authenticated as ${session.user?.username || user?.username}.`
          : 'Ship reachable, but session is not authenticated.',
      );
      setResolved(getApiUrl());
    } catch (err: any) {
      setTone('error');
      setMessage(err?.message || 'Ping failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <SeaScreen edges={['left', 'right', 'bottom']}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.wrap}>
        <SectionHeader title="Ship settings"  />
        <ParchmentCard wanted>
          <Muted>Resolved base</Muted>
          <Field label="Current" value={resolved} onChangeText={() => {}} />
          <Muted>
            {isTunnelApi()
              ? 'Via Expo tunnel — /api is proxied by Metro to the local ship.'
              : 'Direct API host (set override or EXPO_PUBLIC_API_URL).'}
          </Muted>
        </ParchmentCard>
        <ParchmentCard>
          <Field
            label="Override URL (blank = metro/env)"
            value={override}
            onChangeText={setOverride}
            placeholder="http://192.168.1.87:4173 or metro"
            keyboardType="url"
          />
          <Banner message={message} tone={tone} />
          <PrimaryButton label={busy ? 'Working…' : 'Save'} onPress={saveOverride} disabled={busy} />
          <PrimaryButton label="Ping" onPress={ping} disabled={busy} />
          <IconButton
            name="refresh-outline"
            accessibilityLabel="Reset API"
            onPress={async () => {
              setOverride('');
              await setApiOverride(null);
              setResolved(getApiUrl());
              setTone('info');
              setMessage('Reset to Metro / env default.');
            }}
            style={{ marginTop: 8 }}
          />
        </ParchmentCard>
        <IconButton name="log-out-outline" accessibilityLabel="Sign out" danger onPress={() => signOut()} />
      </ScrollView>
    </SeaScreen>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingTop: 8, paddingBottom: 40 },
});
