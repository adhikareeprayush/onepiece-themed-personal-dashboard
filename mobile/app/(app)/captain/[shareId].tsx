import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Banner, Loading, PrimaryButton, SeaScreen } from '@/components/Ui';
import { WantedCard, type CaptainCard } from '@/components/WantedCard';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { colors, theme } from '@/lib/theme';

export default function CaptainScreen() {
  const { shareId } = useLocalSearchParams<{ shareId: string }>();
  const { token } = useAuth();
  const [card, setCard] = useState<CaptainCard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const id = String(shareId || '').trim().toUpperCase();
        const data = await api<CaptainCard>(`/api/captains/${encodeURIComponent(id)}`, { token });
        if (!cancelled) setCard(data);
      } catch (err: any) {
        if (!cancelled) setError(err?.message || 'Could not load captain poster');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [shareId, token]);

  async function addFriend() {
    if (!token || !card?.shareId) return;
    setBusy(true);
    setError(null);
    try {
      await api('/api/profile/friends', {
        method: 'POST',
        token,
        body: { shareId: card.shareId, username: card.username },
      });
      Alert.alert('Added', `${card.username || 'Captain'} joined your crew list.`);
    } catch (err: any) {
      setError(err?.message || 'Could not add friend');
    } finally {
      setBusy(false);
    }
  }

  if (loading) return <Loading label="Loading wanted poster…" />;

  return (
    <>
      <Stack.Screen options={{ title: card?.username || 'Captain' }} />
      <SeaScreen edges={['left', 'right', 'bottom']}>
        <ScrollView contentContainerStyle={styles.wrap}>
          {card ? <WantedCard card={card} /> : null}
          <Banner message={error} />
          {card?.shareId ? (
            <PrimaryButton label={busy ? 'Adding…' : 'Add to crew'} onPress={addFriend} disabled={busy} />
          ) : null}
          {card?.statusMessage ? (
            <View style={styles.statusBox}>
              <Text style={styles.statusLabel}>Status</Text>
              <Text style={styles.statusText}>{card.statusMessage}</Text>
            </View>
          ) : null}
        </ScrollView>
      </SeaScreen>
    </>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingTop: 8, paddingBottom: 40, gap: 12 },
  statusBox: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(26,16,8,0.12)',
    backgroundColor: 'rgba(255,253,246,0.92)',
  },
  statusLabel: {
    fontFamily: theme.fonts.bodyExtra,
    color: colors.seaDeep,
    marginBottom: 4,
  },
  statusText: {
    fontFamily: theme.fonts.body,
    color: colors.muted,
    lineHeight: 20,
  },
});
