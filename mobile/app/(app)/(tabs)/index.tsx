import { useCallback, useState } from 'react';
import { router, useFocusEffect } from 'expo-router';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Banner, Loading, SeaScreen, StatTile } from '@/components/Ui';
import {
  CompassRose,
  SlideIn,
  Stagger,
  StrawHatMark,
  VoyageSun,
  WantedStamp,
  WaveBand,
} from '@/components/OpArt';
import { LaunchTile } from '@/components/ToolCard';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { money } from '@/lib/forms';
import { colors, theme } from '@/lib/theme';

type Stats = Record<string, number>;
type IconName = ComponentProps<typeof Ionicons>['name'];

const SHORTCUTS: {
  href: string;
  title: string;
  blurb: string;
  icon: IconName;
  tint: string;
  wide?: boolean;
  metricKey?: string;
  metricLabel?: (stats: Stats | null) => string;
}[] = [
  {
    href: '/(app)/(tabs)/notes',
    title: 'Logbook',
    blurb: 'Voyage notes, tags, and full-screen reading.',
    icon: 'book',
    tint: colors.seaMid,
    wide: true,
    metricLabel: (s) => `${s?.notes ?? 0} logs`,
  },
  {
    href: '/(app)/(tabs)/berries',
    title: 'Berries',
    blurb: 'Income, spend, charts, and recurring seals.',
    icon: 'wallet',
    tint: colors.strawDeep,
    metricLabel: (s) => `net ${money(Number(s?.monthBalance ?? 0))}`,
  },
  {
    href: '/(app)/(tabs)/watchtower',
    title: 'Bell',
    blurb: 'Reminders and alarms on the crow’s nest.',
    icon: 'notifications',
    tint: colors.wanted,
    metricLabel: (s) => `${s?.signalsUpcoming ?? 0} armed`,
  },
  {
    href: '/(app)/focus',
    title: 'Focus',
    blurb: 'Gear Second sprints and voyage logs.',
    icon: 'timer',
    tint: colors.seaDeep,
    metricLabel: (s) => `${s?.focusMinutes ?? 0} min`,
  },
  {
    href: '/(app)/vault',
    title: 'Vault',
    blurb: 'Locked loot — usernames, secrets, and URLs.',
    icon: 'lock-closed',
    tint: colors.wantedDeep,
    metricLabel: (s) => `${s?.vault ?? 0} chests`,
  },
  {
    href: '/(app)/quests',
    title: 'Quests',
    blurb: 'Ranked missions for the swordsman’s board.',
    icon: 'flag',
    tint: colors.seaMid,
    metricLabel: (s) => `${s?.questsOpen ?? 0} open`,
  },
  {
    href: '/(app)/charts',
    title: 'Charts',
    blurb: 'Sea routes, links, and tagged bookmarks.',
    icon: 'map',
    tint: colors.success,
    metricLabel: (s) => `${s?.bookmarks ?? 0} routes`,
  },
  {
    href: '/(app)/snippets',
    title: 'Code',
    blurb: 'Blueprints and reusable ink snippets.',
    icon: 'code-slash',
    tint: colors.seaDeep,
    metricLabel: (s) => `${s?.snippets ?? 0} scraps`,
  },
  {
    href: '/(app)/profile',
    title: 'Poster',
    blurb: 'Your wanted card, bounty, and Captain ID.',
    icon: 'person',
    tint: colors.strawDeep,
    metricLabel: () => 'Edit',
  },
  {
    href: '/(app)/crew',
    title: 'Crew',
    blurb: 'Discover captains and add friends by ID.',
    icon: 'people',
    tint: colors.seaMid,
    metricLabel: () => 'Find',
  },
  {
    href: '/(app)/settings',
    title: 'Ship',
    blurb: 'API route, session, and vessel settings.',
    icon: 'settings',
    tint: colors.muted,
    metricLabel: () => 'Tune',
  },
];

export default function OverviewScreen() {
  const { token, user } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(
    async (isRefresh = false) => {
      if (!token) return;
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);
      try {
        setStats(await api<Stats>('/api/stats', { token }));
      } catch (err: any) {
        setError(err?.message || 'Could not load stats');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [token],
  );

  useFocusEffect(
    useCallback(() => {
      load(true);
    }, [load]),
  );

  if (loading && !stats) return <Loading />;

  const name = user?.displayName || user?.username || 'Captain';

  return (
    <SeaScreen>
      <ScrollView
        contentContainerStyle={styles.wrap}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => load(true)}
            tintColor={colors.strawDeep}
            colors={[colors.wanted, colors.strawDeep]}
          />
        }
      >
        <Stagger>
          <View style={styles.heroShell}>
            <LinearGradient
              colors={['#0a2342', '#0c3d87', '#1e7ef0']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.heroOcean}
            >
              <VoyageSun size={56} style={styles.heroSun} />
              <View style={styles.heroHat}>
                <StrawHatMark size={70} />
              </View>
              <View style={styles.heroCompass}>
                <CompassRose size={72} />
              </View>
              <WantedStamp label="SET SAIL" style={styles.heroStamp} />
              <Text style={styles.brand}>GRAND LINE</Text>
              <Text style={styles.heroName} numberOfLines={1}>
                {name}
              </Text>
              <Text style={styles.heroTag}>Captain's deck · live voyage tools</Text>
              <WaveBand tone="foam" style={styles.heroWaves} />
            </LinearGradient>
          </View>
        </Stagger>

        <Banner message={error} />

        <View style={styles.stats}>
          <SlideIn index={0} style={styles.statItem}>
            <StatTile
              fill
              label="Notes"
              value={stats?.notes ?? 0}
              accent="ink"
              icon={<Ionicons name="book" size={14} color={colors.seaDeep} />}
            />
          </SlideIn>
          <SlideIn index={1} style={styles.statItem}>
            <StatTile
              fill
              label="Quests"
              value={stats?.questsOpen ?? 0}
              accent="foam"
              icon={<Ionicons name="flag" size={14} color={colors.seaMid} />}
            />
          </SlideIn>
          <SlideIn index={2} style={styles.statItem}>
            <StatTile
              fill
              label="In"
              value={money(Number(stats?.monthIncome ?? 0))}
              accent="straw"
              icon={<Ionicons name="trending-up" size={14} color={colors.strawDeep} />}
            />
          </SlideIn>
          <SlideIn index={3} style={styles.statItem}>
            <StatTile
              fill
              label="Out"
              value={money(Number(stats?.monthSpend ?? 0))}
              accent="wanted"
              icon={<Ionicons name="trending-down" size={14} color={colors.wanted} />}
            />
          </SlideIn>
        </View>

        <Text style={styles.sectionLabel}>Quick launch</Text>
        <View style={styles.bento}>
          {SHORTCUTS.map((tool, index) => (
            <Stagger
              key={tool.href}
              index={index}
              style={[styles.bentoItem, tool.wide ? styles.bentoWide : undefined]}
            >
              <LaunchTile
                title={tool.title}
                blurb={tool.blurb}
                icon={tool.icon}
                tint={tool.tint}
                wide={tool.wide}
                metric={tool.metricLabel?.(stats)}
                onPress={() => router.push(tool.href as any)}
              />
            </Stagger>
          ))}
        </View>
      </ScrollView>
    </SeaScreen>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingTop: 8, paddingBottom: 120 },
  heroShell: {
    borderRadius: 22,
    borderWidth: 3,
    borderColor: colors.edge,
    overflow: 'hidden',
    marginBottom: 14,
    backgroundColor: '#0a2342',
    shadowColor: '#061527',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 12,
  },
  heroOcean: {
    minHeight: 190,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 26,
    backgroundColor: '#0a2342',
  },
  heroSun: { position: 'absolute', top: 14, right: 16 },
  heroHat: { position: 'absolute', right: 18, bottom: 36, opacity: 0.95 },
  heroCompass: { position: 'absolute', left: -6, bottom: 20, opacity: 0.55 },
  heroStamp: { marginBottom: 10 },
  brand: {
    fontFamily: theme.fonts.bodyExtra,
    fontSize: 12,
    letterSpacing: 3,
    color: colors.strawBright,
    marginBottom: 4,
  },
  heroName: {
    fontFamily: theme.fonts.pirate,
    fontSize: 40,
    color: '#fff8e4',
    lineHeight: 44,
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
    maxWidth: '70%',
  },
  heroTag: {
    marginTop: 6,
    fontFamily: theme.fonts.body,
    fontSize: 13,
    color: 'rgba(255,248,228,0.82)',
    maxWidth: '65%',
  },
  heroWaves: { position: 'absolute', left: 0, right: 0, bottom: 0 },
  stats: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    rowGap: 8,
    marginBottom: 8,
  },
  statItem: {
    width: '48.5%',
  },
  sectionLabel: {
    fontFamily: theme.fonts.pirate,
    fontSize: 24,
    color: colors.seaDeep,
    marginTop: 8,
    marginBottom: 10,
  },
  bento: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    rowGap: 12,
  },
  bentoItem: { width: '48.5%' },
  bentoWide: { width: '100%' },
});
