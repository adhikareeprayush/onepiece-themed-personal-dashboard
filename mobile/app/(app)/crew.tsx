import { useCallback, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { Banner, Loading, PrimaryButton, SearchField, SeaScreen } from '@/components/Ui';
import { PressableScale, Stagger, ToolMasthead } from '@/components/OpArt';
import { WantedCard, type CaptainCard } from '@/components/WantedCard';
import { IconButton } from '@/components/IconButton';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { colors, theme } from '@/lib/theme';

export default function CrewScreen() {
  const { token } = useAuth();
  const [query, setQuery] = useState('');
  const [captains, setCaptains] = useState<CaptainCard[]>([]);
  const [lookupId, setLookupId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = useCallback(
    async (isRefresh = false, search = query) => {
      if (!token) return;
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);
      try {
        const data = await api<{ captains: CaptainCard[] }>(
          `/api/profile/discover?q=${encodeURIComponent(search.trim())}`,
          { token },
        );
        setCaptains(Array.isArray(data.captains) ? data.captains : []);
      } catch (err: any) {
        setError(err?.message || 'Could not load crew roster');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [token, query],
  );

  useFocusEffect(
    useCallback(() => {
      load(true);
    }, [load]),
  );

  async function openCaptain(shareId: string) {
    router.push({ pathname: '/(app)/captain/[shareId]', params: { shareId } });
  }

  async function lookupCaptain() {
    const id = lookupId.trim().toUpperCase();
    if (!/^CAPT-[A-Z0-9]{6}$/.test(id)) {
      setError('Captain ID should look like CAPT-ABC123');
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await api<CaptainCard>(`/api/captains/${encodeURIComponent(id)}`, { token });
      openCaptain(id);
    } catch (err: any) {
      setError(err?.message || 'Captain not found on this ship');
    } finally {
      setBusy(false);
    }
  }

  if (loading && !captains.length) return <Loading label="Scanning the crew…" />;

  return (
    <SeaScreen edges={['left', 'right', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.wrap}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => load(true)} tintColor={colors.strawDeep} />
        }
      >
        <ToolMasthead title="Crew deck" tint={colors.seaMid} />

        <SearchField value={query} onChangeText={setQuery} placeholder="Search captains" />
        <PrimaryButton label="Search crew" onPress={() => load(false, query)} />
        <View style={{ height: 10 }} />

        <Text style={styles.label}>Lookup by Captain ID</Text>
        <SearchField value={lookupId} onChangeText={setLookupId} placeholder="CAPT-ABC123" />
        <IconButton
          name="search"
          accessibilityLabel="Lookup captain"
          solid
          onPress={lookupCaptain}
          disabled={busy}
          style={{ alignSelf: 'flex-start', marginBottom: 8 }}
        />

        <Banner message={error} />

        <Text style={styles.section}>On this ship</Text>
        <View style={styles.grid}>
          {captains.map((captain, index) => (
            <Stagger key={captain.shareId || String(index)} index={index} style={styles.cell}>
              <PressableScale onPress={() => captain.shareId && openCaptain(captain.shareId)}>
                <WantedCard card={captain} compact />
              </PressableScale>
            </Stagger>
          ))}
        </View>
        {!captains.length ? <Text style={styles.empty}>No captains matched yet.</Text> : null}
      </ScrollView>
    </SeaScreen>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingTop: 8, paddingBottom: 40 },
  label: {
    fontFamily: theme.fonts.bodyExtra,
    color: colors.seaDeep,
    marginBottom: 6,
  },
  section: {
    fontFamily: theme.fonts.pirate,
    fontSize: 24,
    color: colors.seaDeep,
    marginTop: 8,
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  cell: { width: '48.5%' },
  empty: {
    fontFamily: theme.fonts.body,
    color: colors.muted,
    marginTop: 8,
  },
});
