import { Image, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { ParchmentCard } from '@/components/Ui';
import { colors, theme } from '@/lib/theme';
import { getApiUrl } from '@/lib/api';

export type CaptainCard = {
  shareId?: string;
  username?: string;
  bio?: string;
  avatarUrl?: string;
  title?: string;
  location?: string;
  favoriteCrew?: string;
  statusMessage?: string;
  bounty?: string;
  points?: number;
  league?: string;
};

function resolveAvatar(url?: string) {
  const raw = String(url || '/assets/crew-captain.png?v=2');
  if (raw.startsWith('http')) return raw;
  return `${getApiUrl()}${raw.startsWith('/') ? raw : `/${raw}`}`;
}

export function WantedCard({
  card,
  compact,
  style,
}: {
  card: CaptainCard;
  compact?: boolean;
  style?: ViewStyle;
}) {
  const bounty =
    card.bounty?.trim() ||
    `${(card.points ?? 0).toLocaleString()} pts · ${card.league || 'Cabin Boy'}`;

  return (
    <ParchmentCard wanted={!compact} entering={false} style={style} contentStyle={compact ? styles.compactPad : styles.pad}>
      <Text style={styles.kicker}>WANTED</Text>
      <Image source={{ uri: resolveAvatar(card.avatarUrl) }} style={compact ? styles.avatarSm : styles.avatar} />
      <Text style={[styles.name, compact && styles.nameSm]} numberOfLines={1}>
        {card.username || 'Captain'}
      </Text>
      <Text style={styles.bounty} numberOfLines={1}>
        {bounty}
      </Text>
      <Text style={styles.title} numberOfLines={1}>
        {card.title || 'Rookie pirate'}
      </Text>
      {!compact && card.bio ? (
        <Text style={styles.bio} numberOfLines={3}>
          {card.bio}
        </Text>
      ) : null}
      <Text style={styles.meta} numberOfLines={1}>
        {card.location || 'Unknown seas'} · {card.favoriteCrew || 'Independent'}
      </Text>
      {card.shareId ? <Text style={styles.shareId}>{card.shareId}</Text> : null}
    </ParchmentCard>
  );
}

const styles = StyleSheet.create({
  pad: { alignItems: 'center', gap: 6 },
  compactPad: { alignItems: 'center', gap: 4, paddingVertical: 10 },
  kicker: {
    fontFamily: theme.fonts.bodyExtra,
    color: colors.wanted,
    letterSpacing: 3,
    fontSize: 11,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(26,16,8,0.15)',
    backgroundColor: '#fff',
  },
  avatarSm: {
    width: 56,
    height: 56,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'rgba(26,16,8,0.15)',
    backgroundColor: '#fff',
  },
  name: {
    fontFamily: theme.fonts.pirate,
    fontSize: 32,
    color: colors.seaDeep,
    textAlign: 'center',
  },
  nameSm: { fontSize: 22 },
  bounty: {
    fontFamily: theme.fonts.bodyExtra,
    color: colors.wanted,
    fontSize: 16,
    textAlign: 'center',
  },
  title: {
    fontFamily: theme.fonts.body,
    color: colors.muted,
    fontSize: 14,
    textAlign: 'center',
  },
  bio: {
    fontFamily: theme.fonts.body,
    color: colors.ink,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  meta: {
    fontFamily: theme.fonts.body,
    color: colors.muted,
    fontSize: 12,
    textAlign: 'center',
  },
  shareId: {
    marginTop: 4,
    fontFamily: theme.fonts.bodyExtra,
    color: colors.seaDeep,
    fontSize: 12,
    letterSpacing: 1,
  },
});
