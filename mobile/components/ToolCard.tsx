import type { ReactNode } from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { ParchmentCard } from '@/components/Ui';
import { PressableScale } from '@/components/OpArt';
import { colors, theme } from '@/lib/theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

export type ToolTone = 'sea' | 'straw' | 'wanted' | 'success' | 'ink';

const TONES: Record<ToolTone, { tint: string; soft: string; deep: string; badgeBg: string }> = {
  sea: { tint: colors.seaMid, soft: 'rgba(30,126,240,0.18)', deep: colors.seaDeep, badgeBg: 'rgba(30,126,240,0.16)' },
  straw: { tint: colors.strawDeep, soft: 'rgba(245,197,24,0.28)', deep: '#9a6b08', badgeBg: 'rgba(245,197,24,0.24)' },
  wanted: { tint: colors.wanted, soft: 'rgba(196,30,58,0.2)', deep: colors.wantedDeep, badgeBg: 'rgba(196,30,58,0.16)' },
  success: { tint: colors.success, soft: 'rgba(31,122,76,0.16)', deep: '#145536', badgeBg: 'rgba(31,122,76,0.14)' },
  ink: { tint: colors.seaDeep, soft: 'rgba(10,35,66,0.12)', deep: colors.seaDeep, badgeBg: 'rgba(10,35,66,0.1)' },
};

export function ToolCard({
  title,
  subtitle,
  meta,
  badge,
  icon,
  tone = 'sea',
  wanted,
  onPress,
  trailing,
  style,
}: {
  title: string;
  subtitle?: string;
  meta?: string;
  badge?: string;
  icon?: IconName;
  tone?: ToolTone;
  wanted?: boolean;
  onPress?: () => void;
  trailing?: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const palette = TONES[tone];
  const body = (
    <ParchmentCard
      entering={false}
      wanted={wanted || tone === 'wanted'}
      style={[tone === 'straw' ? styles.strawRing : null, style]}
      contentStyle={styles.pad}
    >
      <LinearGradient
        colors={[palette.soft, 'rgba(255,248,228,0.04)', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      {badge ? (
        <View style={[styles.badge, { borderColor: palette.tint, backgroundColor: palette.badgeBg }]}>
          {icon ? <Ionicons name={icon} size={12} color={palette.deep} /> : null}
          <Text style={[styles.badgeText, { color: palette.deep }]}>{badge}</Text>
        </View>
      ) : null}
      <View style={styles.row}>
        {icon && !badge ? (
          <View style={[styles.iconWell, { borderColor: palette.tint, backgroundColor: palette.badgeBg }]}>
            <Ionicons name={icon} size={22} color={palette.tint} />
          </View>
        ) : null}
        <View style={styles.copy}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={styles.subtitle} numberOfLines={3}>
              {subtitle}
            </Text>
          ) : null}
          {meta ? (
            <Text style={[styles.meta, { color: palette.deep }]} numberOfLines={1}>
              {meta}
            </Text>
          ) : null}
        </View>
      </View>
      {trailing ? <View style={styles.actions}>{trailing}</View> : null}
    </ParchmentCard>
  );

  if (!onPress) return body;
  return (
    <PressableScale onPress={onPress} style={styles.press}>
      {body}
    </PressableScale>
  );
}

export function LaunchTile({
  title,
  blurb,
  metric,
  icon,
  tint,
  wide,
  onPress,
}: {
  title: string;
  blurb: string;
  metric?: string;
  icon: IconName;
  tint: string;
  wide?: boolean;
  onPress?: () => void;
}) {
  const body = (
    <ParchmentCard
      entering={false}
      wanted={Boolean(wide)}
      style={styles.tileCard}
      contentStyle={wide ? [styles.tilePad, styles.tileWidePad] : styles.tilePad}
    >
      <LinearGradient
        colors={[`${tint}40`, `${tint}10`, 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      {wide ? (
        <>
          <View style={[styles.tileIcon, styles.tileIconWide, { backgroundColor: `${tint}22`, borderColor: tint }]}>
            <Ionicons name={icon} size={30} color={tint} />
          </View>
          <View style={styles.tileWideCopy}>
            <View style={styles.tileWideTitleRow}>
              <Text style={[styles.tileTitle, styles.tileTitleWide]} numberOfLines={1}>
                {title}
              </Text>
              {metric ? (
                <View style={[styles.metricPill, { borderColor: tint, backgroundColor: `${tint}18` }]}>
                  <Text style={[styles.metricText, { color: tint }]} numberOfLines={1}>
                    {metric}
                  </Text>
                </View>
              ) : null}
            </View>
            <Text style={styles.tileBlurb} numberOfLines={2}>
              {blurb}
            </Text>
          </View>
        </>
      ) : (
        <>
          <View style={styles.tileTop}>
            <View style={[styles.tileIcon, { backgroundColor: `${tint}22`, borderColor: tint }]}>
              <Ionicons name={icon} size={24} color={tint} />
            </View>
            {metric ? (
              <View style={[styles.metricPill, { borderColor: tint, backgroundColor: `${tint}18` }]}>
                <Text style={[styles.metricText, { color: tint }]} numberOfLines={1}>
                  {metric}
                </Text>
              </View>
            ) : null}
          </View>
          <View style={styles.tileCopy}>
            <Text style={styles.tileTitle} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.tileBlurb} numberOfLines={2}>
              {blurb}
            </Text>
          </View>
        </>
      )}
    </ParchmentCard>
  );

  if (!onPress) return body;
  return (
    <PressableScale onPress={onPress} style={styles.tilePress}>
      {body}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  press: { width: '100%', marginBottom: 2 },
  strawRing: {
    padding: 2,
    backgroundColor: 'rgba(245,197,24,0.28)',
  },
  pad: {
    gap: 10,
    minHeight: 112,
  },
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    fontFamily: theme.fonts.bodyExtra,
    fontSize: 10,
    letterSpacing: 1.1,
  },
  row: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  iconWell: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: { flex: 1, minWidth: 0, gap: 4 },
  title: {
    fontFamily: theme.fonts.bodyExtra,
    color: colors.seaDeep,
    fontSize: 17,
    lineHeight: 22,
  },
  subtitle: {
    fontFamily: theme.fonts.body,
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18,
  },
  meta: {
    fontFamily: theme.fonts.bodyExtra,
    fontSize: 12,
    marginTop: 2,
  },
  actions: {
    marginTop: 4,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(26,16,8,0.1)',
  },
  tilePress: { width: '100%', flex: 1 },
  tileCard: { width: '100%', flex: 1 },
  tilePad: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
    minHeight: 158,
  },
  tileWidePad: {
    minHeight: 108,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 0,
  },
  tileTop: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  tileIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    borderWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileIconWide: {
    width: 56,
    height: 56,
    borderRadius: 18,
    flexShrink: 0,
  },
  metricPill: {
    borderWidth: 1.5,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    maxWidth: '55%',
    flexShrink: 0,
  },
  metricText: {
    fontFamily: theme.fonts.bodyExtra,
    fontSize: 11,
  },
  tileCopy: {
    gap: 4,
    width: '100%',
  },
  tileWideCopy: {
    flex: 1,
    minWidth: 0,
    gap: 4,
    justifyContent: 'center',
  },
  tileWideTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  tileTitle: {
    fontFamily: theme.fonts.bodyExtra,
    color: colors.seaDeep,
    fontSize: 17,
    lineHeight: 22,
    flexShrink: 1,
  },
  tileTitleWide: {
    fontSize: 26,
    fontFamily: theme.fonts.pirate,
    lineHeight: 30,
    flex: 1,
  },
  tileBlurb: {
    fontFamily: theme.fonts.body,
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18,
  },
});
