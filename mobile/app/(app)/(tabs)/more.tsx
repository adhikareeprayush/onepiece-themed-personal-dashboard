import { useCallback, useState } from 'react';
import { router, useFocusEffect } from 'expo-router';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { SeaScreen } from '@/components/Ui';
import { IconButton } from '@/components/IconButton';
import { Stagger, ToolMasthead } from '@/components/OpArt';
import { LaunchTile } from '@/components/ToolCard';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { colors, theme } from '@/lib/theme';

type IconName = ComponentProps<typeof Ionicons>['name'];
type Stats = Record<string, number>;

const LINKS: {
  href: string;
  title: string;
  blurb: string;
  icon: IconName;
  tint: string;
  metricLabel: (stats: Stats | null) => string;
}[] = [
  {
    href: '/(app)/vault',
    title: 'Vault',
    blurb: 'Chests of passwords and login loot.',
    icon: 'lock-closed',
    tint: colors.wantedDeep,
    metricLabel: (s) => `${s?.vault ?? 0} chests`,
  },
  {
    href: '/(app)/quests',
    title: 'Quests',
    blurb: 'Ranked missions from D to S.',
    icon: 'flag',
    tint: colors.seaMid,
    metricLabel: (s) => `${s?.questsOpen ?? 0} open`,
  },
  {
    href: '/(app)/charts',
    title: 'Charts',
    blurb: 'Mapped routes and tagged bookmarks.',
    icon: 'map',
    tint: colors.success,
    metricLabel: (s) => `${s?.bookmarks ?? 0} routes`,
  },
  {
    href: '/(app)/snippets',
    title: 'Snippets',
    blurb: 'Code scraps ready to paste.',
    icon: 'code-slash',
    tint: colors.seaDeep,
    metricLabel: (s) => `${s?.snippets ?? 0} scraps`,
  },
  {
    href: '/(app)/focus',
    title: 'Focus',
    blurb: 'Gear Second timer and session log.',
    icon: 'timer',
    tint: colors.strawDeep,
    metricLabel: (s) => `${s?.focusMinutes ?? 0} min`,
  },
  {
    href: '/(app)/profile',
    title: 'Poster',
    blurb: 'Wanted card, bounty line, and ID.',
    icon: 'person',
    tint: colors.strawDeep,
    metricLabel: () => 'Edit',
  },
  {
    href: '/(app)/crew',
    title: 'Crew',
    blurb: 'Discover captains and add friends.',
    icon: 'people',
    tint: colors.seaMid,
    metricLabel: () => 'Find',
  },
  {
    href: '/(app)/settings',
    title: 'Settings',
    blurb: 'Ship API, session, and vessel gear.',
    icon: 'settings',
    tint: colors.muted,
    metricLabel: () => 'Ship',
  },
];

export default function MoreScreen() {
  const { signOut, token } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    if (!token) return;
    try {
      const data = await api<Stats>('/api/stats', { token });
      setStats(data);
    } catch {
      /* keep last */
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load]),
  );

  async function onRefresh() {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }

  return (
    <SeaScreen>
      <ScrollView
        contentContainerStyle={styles.wrap}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.seaDeep} />}
      >
        <ToolMasthead
          title="More tools"
          tint={colors.wanted}
          trailing={
            <IconButton name="log-out-outline" accessibilityLabel="Sign out" danger solid onPress={() => signOut()} />
          }
        />
        <Text style={styles.lede}>Extra holds off the main deck — live counts on every hatch.</Text>
        <View style={styles.grid}>
          {LINKS.map((item, index) => (
            <Stagger key={item.href} index={index} style={styles.cell}>
              <LaunchTile
                title={item.title}
                blurb={item.blurb}
                icon={item.icon}
                tint={item.tint}
                metric={item.metricLabel(stats)}
                onPress={() => router.push(item.href as any)}
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
  lede: {
    fontFamily: theme.fonts.body,
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  cell: { width: '48.5%' },
});
