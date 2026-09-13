import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radii, theme } from '@/lib/theme';
import { IconButton } from '@/components/IconButton';

/** Immersive ocean → parchment deck atmosphere with drifting waves & sun. */
function DeckBackdrop() {
  const drift = useSharedValue(0);

  useEffect(() => {
    drift.value = withRepeat(
      withTiming(1, { duration: 14000, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    );
  }, [drift]);

  const wave1 = useAnimatedStyle(() => ({
    transform: [{ translateX: drift.value * 24 }, { translateY: drift.value * -6 }],
  }));
  const wave2 = useAnimatedStyle(() => ({
    transform: [{ translateX: drift.value * -30 }, { translateY: drift.value * -4 }],
  }));
  const wave3 = useAnimatedStyle(() => ({
    transform: [{ translateX: drift.value * 16 }],
    opacity: 0.35 + drift.value * 0.12,
  }));
  const sunPulse = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + drift.value * 0.06 }],
    opacity: 0.55 + drift.value * 0.2,
  }));

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <LinearGradient
        colors={['#7eb6ff', '#b8d9ff', '#fff1c9', '#ffe8a3']}
        locations={[0, 0.28, 0.62, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View style={[styles.sunOrb, sunPulse]} />
      <View style={styles.glowFoam} />
      <View style={styles.glowStraw} />
      <View style={styles.glowWanted} />
      <Animated.View style={[styles.seaWave, styles.seaWave1, wave1]} />
      <Animated.View style={[styles.seaWave, styles.seaWave2, wave2]} />
      <Animated.View style={[styles.seaWave, styles.seaWave3, wave3]} />
      <LinearGradient
        colors={['transparent', 'rgba(255,246,220,0.55)', 'rgba(255,248,228,0.92)']}
        locations={[0, 0.45, 1]}
        style={styles.deckVeil}
      />
    </View>
  );
}

export function SeaScreen({
  children,
  style,
  edges = ['top', 'left', 'right', 'bottom'],
}: {
  children: React.ReactNode;
  style?: ViewStyle;
  edges?: ('top' | 'right' | 'bottom' | 'left')[];
}) {
  return (
    <View style={styles.seaRoot}>
      <DeckBackdrop />
      <SafeAreaView style={[styles.seaSafe, style]} edges={edges}>
        <View style={styles.seaBody}>{children}</View>
      </SafeAreaView>
    </View>
  );
}

export const Screen = SeaScreen;

export function Title({ children }: { children: React.ReactNode }) {
  return <Text style={styles.title}>{children}</Text>;
}

export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {subtitle ? <Text style={styles.muted}>{subtitle}</Text> : null}
    </View>
  );
}

export function Muted({ children }: { children: React.ReactNode }) {
  return <Text style={styles.muted}>{children}</Text>;
}

export function ParchmentCard({
  children,
  onPress,
  wanted,
  style,
  contentStyle,
  entering,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  wanted?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  entering?: boolean;
}) {
  const body = (
    <View style={[styles.cardRing, wanted && styles.cardRingWanted, theme.cardShadow, style]}>
      <View style={styles.cardOuter}>
        {wanted ? (
          <LinearGradient
            colors={[colors.wantedDeep, colors.wanted, colors.strawDeep, colors.wanted, colors.wantedDeep]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.wantedStrip}
          />
        ) : null}
        <LinearGradient
          colors={[colors.parchment, colors.parchmentMid, colors.parchmentDark]}
          locations={[0, 0.48, 1]}
          start={{ x: 0.05, y: 0 }}
          end={{ x: 0.95, y: 1 }}
          style={[styles.card, wanted && styles.cardWithStrip, contentStyle]}
        >
          <View style={styles.cardInset} pointerEvents="none" />
          {children}
        </LinearGradient>
      </View>
    </View>
  );

  const wrapped = onPress ? (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.92 : 1, transform: [{ scale: pressed ? 0.985 : 1 }] }]}
    >
      {body}
    </Pressable>
  ) : (
    body
  );

  if (entering === false) return wrapped;
  return (
    <Animated.View entering={FadeInDown.springify().damping(16)}>
      {wrapped}
    </Animated.View>
  );
}

export const Card = ParchmentCard;

export function StatTile({
  label,
  value,
  accent,
  icon,
  compact,
  fill,
}: {
  label: string;
  value: string | number;
  accent?: 'straw' | 'wanted' | 'foam' | 'ink';
  icon?: React.ReactNode;
  compact?: boolean;
  /** Stretch to parent width (dashboard 2×2 grid). */
  fill?: boolean;
}) {
  const accentColor =
    accent === 'wanted'
      ? colors.wanted
      : accent === 'foam'
        ? colors.seaMid
        : accent === 'ink'
          ? colors.seaDeep
          : colors.strawDeep;
  return (
    <ParchmentCard
      style={[styles.statTile, compact && styles.statTileCompact, fill && styles.statTileFill]}
      contentStyle={[styles.statContent, compact && styles.statContentCompact]}
      entering={false}
    >
      <View style={styles.statTop}>
        {icon ? <View style={[styles.statIcon, compact && styles.statIconCompact, { borderColor: accentColor }]}>{icon}</View> : null}
        <Text style={[styles.statLabel, compact && styles.statLabelCompact]} numberOfLines={1}>
          {label}
        </Text>
      </View>
      <Text style={[styles.statValue, compact && styles.statValueCompact, { color: accentColor }]} numberOfLines={1}>
        {value}
      </Text>
    </ParchmentCard>
  );
}

export function SearchField({
  value,
  onChangeText,
  placeholder = 'Search the log…',
}: {
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <TextInput
      style={styles.search}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="rgba(90,70,48,0.55)"
      autoCapitalize="none"
      clearButtonMode="while-editing"
    />
  );
}

export function ChipRow({
  options,
  value,
  onChange,
}: {
  options: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
      {options.map((opt) => {
        const on = opt.id === value;
        return (
          <Pressable
            key={opt.id}
            onPress={() => onChange(opt.id)}
            style={[styles.chip, on && styles.chipOn]}
          >
            <Text style={[styles.chipText, on && styles.chipTextOn]}>{opt.label}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

export function Field({
  label,
  value,
  onChangeText,
  secureTextEntry,
  multiline,
  placeholder,
  keyboardType,
  autoCapitalize = 'none',
  editable = true,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  secureTextEntry?: boolean;
  multiline?: boolean;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'url' | 'email-address';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  editable?: boolean;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.textarea, !editable && { opacity: 0.7 }]}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        editable={editable}
      />
    </View>
  );
}

export function PrimaryButton({
  label,
  onPress,
  disabled,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.primary,
        (disabled || pressed) && { opacity: disabled ? 0.45 : 0.92, transform: [{ scale: pressed ? 0.98 : 1 }] },
      ]}
    >
      <LinearGradient
        colors={[colors.strawBright, colors.straw, colors.strawDeep]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.primaryFill}
      >
        <Text style={styles.primaryText}>{label}</Text>
      </LinearGradient>
    </Pressable>
  );
}

export function GhostButton({
  label,
  onPress,
  danger,
  light,
}: {
  label: string;
  onPress: () => void;
  danger?: boolean;
  light?: boolean;
}) {
  return (
    <Pressable onPress={onPress} hitSlop={8} style={styles.ghost}>
      <Text
        style={[
          styles.ghostText,
          light ? { color: colors.parchment } : { color: colors.seaDeep },
          danger && { color: colors.wanted },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function ListRow({
  title,
  subtitle,
  meta,
  onPress,
  trailing,
}: {
  title: string;
  subtitle?: string;
  meta?: string;
  onPress?: () => void;
  trailing?: React.ReactNode;
}) {
  const body = (
    <>
      <Text style={styles.listTitle}>{title}</Text>
      {subtitle ? (
        <Text style={styles.listSubtitle} numberOfLines={4}>
          {subtitle}
        </Text>
      ) : null}
      {meta ? <Text style={styles.listMeta}>{meta}</Text> : null}
    </>
  );

  return (
    <ParchmentCard entering={false}>
      {onPress ? (
        <Pressable onPress={onPress} hitSlop={4}>
          {body}
        </Pressable>
      ) : (
        body
      )}
      {trailing ? <View style={styles.listActions}>{trailing}</View> : null}
    </ParchmentCard>
  );
}

export function EmptyState({ message, actionLabel, onAction }: { message: string; actionLabel?: string; onAction?: () => void }) {
  return (
    <ParchmentCard>
      <Text style={styles.emptyTitle}>Empty hold</Text>
      <Muted>{message}</Muted>
      {actionLabel && onAction ? <PrimaryButton label={actionLabel} onPress={onAction} /> : null}
    </ParchmentCard>
  );
}

export const Empty = EmptyState;

export function Banner({ message, tone = 'error' }: { message?: string | null; tone?: 'error' | 'info' }) {
  if (!message) return null;
  return (
    <View style={[styles.banner, tone === 'info' && styles.bannerInfo]}>
      <Text style={styles.bannerText}>{message}</Text>
    </View>
  );
}

export function ErrorText({ message }: { message?: string | null }) {
  return <Banner message={message} />;
}

export function Loading({ label = 'Loading the ship…' }: { label?: string }) {
  return (
    <SeaScreen>
      <View style={styles.loading}>
        <ActivityIndicator color={colors.strawDeep} size="large" />
        <Muted>{label}</Muted>
      </View>
    </SeaScreen>
  );
}

export function SheetForm({
  visible,
  title,
  onClose,
  children,
}: {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.sheetBackdrop}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.sheetWrap}
        >
          <View style={styles.sheet}>
            <View style={styles.sheetHandle} />
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>{title}</Text>
              <IconButton name="close" accessibilityLabel="Close" onPress={onClose} />
            </View>
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: 36 }}>
              {children}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  seaRoot: { flex: 1, backgroundColor: '#7eb6ff' },
  seaSafe: { flex: 1, paddingHorizontal: 16 },
  seaBody: { flex: 1, minHeight: 0 },
  sunOrb: {
    position: 'absolute',
    top: 36,
    right: 28,
    width: 78,
    height: 78,
    borderRadius: 78,
    backgroundColor: '#ffd84d',
    borderWidth: 3,
    borderColor: 'rgba(26,16,8,0.35)',
  },
  glowFoam: {
    position: 'absolute',
    top: 80,
    left: -50,
    width: 220,
    height: 160,
    borderRadius: 220,
    backgroundColor: 'rgba(255,255,255,0.28)',
  },
  glowStraw: {
    position: 'absolute',
    top: 20,
    right: -20,
    width: 160,
    height: 140,
    borderRadius: 160,
    backgroundColor: 'rgba(245,197,24,0.22)',
  },
  glowWanted: {
    position: 'absolute',
    bottom: 120,
    left: '25%',
    width: 180,
    height: 140,
    borderRadius: 180,
    backgroundColor: 'rgba(196,30,58,0.08)',
  },
  seaWave: {
    position: 'absolute',
    left: '-12%',
    width: '124%',
    height: '38%',
    borderRadius: 180,
  },
  seaWave1: { bottom: '18%', backgroundColor: 'rgba(30,126,240,0.28)' },
  seaWave2: { bottom: '8%', backgroundColor: 'rgba(12,61,135,0.22)' },
  seaWave3: { bottom: '-4%', backgroundColor: 'rgba(6,21,39,0.18)' },
  deckVeil: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '58%',
  },
  hazeBlob: {
    position: 'absolute',
    bottom: '-6%',
    left: '-8%',
    width: '116%',
    height: '36%',
    borderRadius: 200,
    backgroundColor: 'rgba(30,126,240,0.1)',
  },
  title: {
    fontFamily: theme.fonts.pirate,
    fontSize: 34,
    color: colors.seaDeep,
    marginBottom: 4,
  },
  sectionHeader: { marginBottom: 10, marginTop: 4 },
  sectionTitle: {
    fontFamily: theme.fonts.pirate,
    fontSize: 28,
    color: colors.seaDeep,
  },
  muted: {
    fontFamily: theme.fonts.body,
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  // Soft wanted ring + hard offset (web --card-shadow)
  cardRing: {
    marginBottom: 12,
    ...radii.card,
  },
  cardRingWanted: {
    padding: 2,
    backgroundColor: 'rgba(196,30,58,0.14)',
  },
  cardOuter: {
    borderWidth: 3,
    borderColor: colors.edge,
    ...radii.card,
    overflow: 'hidden',
    backgroundColor: colors.cardStrong,
  },
  wantedStrip: {
    height: 7,
    borderBottomWidth: 2,
    borderBottomColor: colors.edge,
  },
  card: { padding: 14, position: 'relative' },
  cardWithStrip: { paddingTop: 12 },
  cardInset: {
    ...StyleSheet.absoluteFill,
    borderWidth: 2,
    borderColor: 'rgba(255,252,240,0.7)',
  },
  statTile: { flex: 1, minWidth: '46%', marginBottom: 8 },
  statTileFill: {
    width: '100%',
    flex: 0,
    minWidth: 0,
    marginBottom: 0,
  },
  statTileCompact: {
    minWidth: 0,
    flexBasis: 0,
    marginBottom: 0,
  },
  statContent: { paddingVertical: 12, paddingHorizontal: 12, gap: 6, flexGrow: 0 },
  statContentCompact: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    gap: 4,
  },
  statTop: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  statIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,253,246,0.85)',
  },
  statIconCompact: {
    width: 22,
    height: 22,
    borderRadius: 6,
  },
  statLabel: {
    fontFamily: theme.fonts.bodyExtra,
    color: colors.muted,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    flexShrink: 1,
  },
  statLabelCompact: {
    fontSize: 10,
    letterSpacing: 0.4,
  },
  statValue: {
    fontFamily: theme.fonts.pirate,
    fontSize: 30,
    color: colors.seaDeep,
    lineHeight: 34,
  },
  statValueCompact: {
    fontSize: 18,
    lineHeight: 22,
    fontFamily: theme.fonts.bodyExtra,
  },
  search: {
    minHeight: 46,
    borderWidth: 2.5,
    borderColor: 'rgba(26,16,8,0.28)',
    ...radii.input,
    paddingHorizontal: 14,
    backgroundColor: colors.paper,
    color: colors.ink,
    fontFamily: theme.fonts.body,
    marginBottom: 10,
  },
  chipRow: { gap: 8, paddingBottom: 10 },
  chip: {
    minHeight: 36,
    paddingHorizontal: 12,
    borderRadius: radii.chip,
    borderWidth: 2,
    borderColor: 'rgba(26,16,8,0.22)',
    backgroundColor: 'rgba(255,253,246,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipOn: {
    backgroundColor: colors.straw,
    borderColor: colors.edge,
  },
  chipText: {
    fontFamily: theme.fonts.bodyExtra,
    color: colors.muted,
    textTransform: 'capitalize',
  },
  chipTextOn: { color: colors.seaDeep },
  field: { marginBottom: 10 },
  label: {
    fontFamily: theme.fonts.bodyExtra,
    color: colors.seaDeep,
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  input: {
    minHeight: 46,
    borderWidth: 2.5,
    borderColor: 'rgba(26,16,8,0.28)',
    ...radii.input,
    paddingHorizontal: 12,
    backgroundColor: colors.paper,
    fontFamily: theme.fonts.body,
    color: colors.ink,
  },
  textarea: { minHeight: 140, textAlignVertical: 'top', paddingTop: 12 },
  primary: {
    marginTop: 6,
    ...radii.button,
    borderWidth: 2.5,
    borderColor: colors.edge,
    overflow: 'hidden',
  },
  primaryFill: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  primaryText: {
    fontFamily: theme.fonts.bodyExtra,
    color: colors.seaDeep,
    fontSize: 16,
  },
  ghost: {
    minHeight: 36,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  ghostText: {
    fontFamily: theme.fonts.bodyExtra,
    fontSize: 14,
  },
  listTitle: {
    fontFamily: theme.fonts.bodyExtra,
    color: colors.seaDeep,
    fontSize: 17,
  },
  listSubtitle: {
    fontFamily: theme.fonts.body,
    color: colors.muted,
    marginTop: 6,
    lineHeight: 20,
  },
  listMeta: {
    fontFamily: theme.fonts.body,
    color: colors.wanted,
    marginTop: 8,
    fontSize: 12,
  },
  listActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(26,16,8,0.12)',
  },
  emptyTitle: {
    fontFamily: theme.fonts.pirate,
    fontSize: 22,
    color: colors.seaDeep,
    marginBottom: 4,
  },
  banner: {
    backgroundColor: 'rgba(196,30,58,0.12)',
    borderWidth: 2,
    borderColor: colors.wanted,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 8,
  },
  bannerInfo: {
    backgroundColor: 'rgba(74,163,255,0.14)',
    borderColor: colors.seaMid,
  },
  bannerText: {
    fontFamily: theme.fonts.body,
    color: colors.ink,
    lineHeight: 18,
  },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  sheetBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(6,21,39,0.62)',
    justifyContent: 'flex-end',
  },
  sheetWrap: { maxHeight: '92%' },
  sheet: {
    backgroundColor: colors.parchment,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderWidth: 3,
    borderColor: colors.edge,
    paddingHorizontal: 16,
    paddingTop: 8,
    maxHeight: '100%',
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 48,
    height: 5,
    borderRadius: 5,
    backgroundColor: 'rgba(26,16,8,0.25)',
    marginBottom: 8,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sheetTitle: {
    fontFamily: theme.fonts.pirate,
    fontSize: 26,
    color: colors.seaDeep,
  },
});
