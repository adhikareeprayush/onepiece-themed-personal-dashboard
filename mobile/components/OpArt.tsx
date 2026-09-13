import { forwardRef, useEffect, type ReactNode } from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle, Pressable, type PressableProps } from 'react-native';
import Animated, {
  Easing,
  FadeInDown,
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, theme } from '@/lib/theme';

type ScaleProps = PressableProps & {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
};

/** Soft press scale — Cash App / iOS-like tactile feedback. Forwards ref for Link asChild. */
export const PressableScale = forwardRef<View, ScaleProps>(function PressableScale(
  { children, onPress, style, onPressIn, onPressOut, ...rest },
  ref,
) {
  const scale = useSharedValue(1);
  const anim = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Pressable
      ref={ref}
      onPress={onPress}
      onPressIn={(e) => {
        scale.value = withSpring(0.96, { damping: 18, stiffness: 320 });
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        scale.value = withSpring(1, { damping: 14, stiffness: 220 });
        onPressOut?.(e);
      }}
      style={style}
      {...rest}
    >
      <Animated.View style={[anim, styles.scaleInner]}>{children}</Animated.View>
    </Pressable>
  );
});

export function Stagger({
  index = 0,
  children,
  style,
}: {
  index?: number;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Animated.View style={style} entering={FadeInDown.delay(Math.min(index, 10) * 55).springify().damping(15)}>
      {children}
    </Animated.View>
  );
}

export function SlideIn({
  index = 0,
  children,
  style,
}: {
  index?: number;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Animated.View style={style} entering={FadeInRight.delay(Math.min(index, 8) * 45).springify().damping(16)}>
      {children}
    </Animated.View>
  );
}

/** Straw hat mark — graphic brand glyph without assets. */
export function StrawHatMark({ size = 72, style }: { size?: number; style?: ViewStyle }) {
  const brim = size * 1.15;
  return (
    <View style={[{ width: brim, height: size * 0.72, alignItems: 'center' }, style]}>
      <View
        style={{
          width: size * 0.62,
          height: size * 0.38,
          borderRadius: size,
          backgroundColor: '#d4a017',
          borderWidth: 3,
          borderColor: colors.edge,
          marginBottom: -size * 0.08,
          zIndex: 1,
        }}
      />
      <View
        style={{
          width: brim,
          height: size * 0.22,
          borderRadius: size,
          backgroundColor: '#c4890f',
          borderWidth: 3,
          borderColor: colors.edge,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: size * 0.22,
          width: size * 0.28,
          height: size * 0.1,
          borderRadius: 4,
          backgroundColor: colors.wanted,
          borderWidth: 2,
          borderColor: colors.edge,
          zIndex: 2,
        }}
      />
    </View>
  );
}

export function CompassRose({ size = 64, style }: { size?: number; style?: ViewStyle }) {
  const spin = useSharedValue(0);
  useEffect(() => {
    spin.value = withRepeat(withTiming(1, { duration: 18000, easing: Easing.linear }), -1, false);
  }, [spin]);
  const needle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spin.value * 360}deg` }],
  }));

  return (
    <View style={[{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }, style]}>
      <View
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: size,
          borderWidth: 3,
          borderColor: 'rgba(255,248,228,0.55)',
          backgroundColor: 'rgba(6,21,39,0.35)',
        }}
      />
      <Animated.View style={[{ width: size * 0.12, height: size * 0.72 }, needle]}>
        <LinearGradient
          colors={[colors.wanted, colors.strawBright, colors.seaMid]}
          style={{ flex: 1, borderRadius: 4 }}
        />
      </Animated.View>
      <View
        style={{
          position: 'absolute',
          width: size * 0.18,
          height: size * 0.18,
          borderRadius: size,
          backgroundColor: colors.straw,
          borderWidth: 2,
          borderColor: colors.edge,
        }}
      />
    </View>
  );
}

export function VoyageSun({ size = 48, style }: { size?: number; style?: ViewStyle }) {
  const pulse = useSharedValue(0);
  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2200, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 2200, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      false,
    );
  }, [pulse]);
  const glow = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + pulse.value * 0.12 }],
    opacity: 0.75 + pulse.value * 0.25,
  }));

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size,
          backgroundColor: '#ffd56a',
          borderWidth: 3,
          borderColor: '#f0a830',
          shadowColor: '#ffb020',
          shadowOpacity: 0.55,
          shadowRadius: 16,
          elevation: 8,
        },
        glow,
        style,
      ]}
    />
  );
}

export function WantedStamp({ label = 'WANTED', style }: { label?: string; style?: ViewStyle }) {
  return (
    <View style={[styles.stamp, style]}>
      <Text style={styles.stampText}>{label}</Text>
    </View>
  );
}

export function WaveBand({
  style,
  tone = 'foam',
}: {
  style?: ViewStyle;
  /** foam = soft highlights on sea banners; deck = parchment handoff under heroes */
  tone?: 'foam' | 'deck';
}) {
  const palette =
    tone === 'deck'
      ? (['rgba(255,248,228,0.35)', 'rgba(255,232,163,0.55)', 'rgba(255,246,220,0.92)'] as const)
      : (['rgba(255,248,228,0.16)', 'rgba(126,182,255,0.22)', 'rgba(10,35,66,0.45)'] as const);

  return (
    <View style={[styles.waveBand, style]} pointerEvents="none">
      <View style={[styles.wave, styles.waveA, { backgroundColor: palette[0] }]} />
      <View style={[styles.wave, styles.waveB, { backgroundColor: palette[1] }]} />
      <View style={[styles.wave, styles.waveC, { backgroundColor: palette[2] }]} />
    </View>
  );
}

/** Compact graphic masthead for tool screens (Logbook / More / etc). */
export function ToolMasthead({
  title,
  tint = colors.seaMid,
  trailing,
}: {
  title: string;
  tint?: string;
  trailing?: ReactNode;
}) {
  return (
    <View style={styles.mast}>
      <LinearGradient
        colors={['#0a2342', '#0c3d87', tint]}
        locations={[0, 0.55, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.mastFill}
      >
        <VoyageSun size={36} style={styles.mastSun} />
        <WantedStamp label="CREW" style={styles.mastStamp} />
        <Text style={styles.mastTitle}>{title}</Text>
        <WaveBand tone="foam" style={styles.mastWaves} />
      </LinearGradient>
      {trailing ? <View style={styles.mastFab}>{trailing}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  scaleInner: {
    width: '100%',
  },
  stamp: {
    alignSelf: 'flex-start',
    borderWidth: 3,
    borderColor: colors.wanted,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    transform: [{ rotate: '-6deg' }],
    backgroundColor: 'rgba(255,248,228,0.12)',
  },
  stampText: {
    fontFamily: theme.fonts.bodyExtra,
    fontSize: 11,
    letterSpacing: 2,
    color: colors.wanted,
  },
  waveBand: {
    height: 30,
    overflow: 'hidden',
  },
  wave: {
    position: 'absolute',
    left: -24,
    right: -24,
    height: 40,
    borderRadius: 48,
  },
  waveA: { bottom: -14 },
  waveB: { bottom: -20 },
  waveC: { bottom: -26 },
  mast: {
    borderRadius: 18,
    borderWidth: 3,
    borderColor: colors.edge,
    overflow: 'hidden',
    marginBottom: 12,
    backgroundColor: '#0a2342',
  },
  mastFill: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 26,
    overflow: 'hidden',
    backgroundColor: '#0a2342',
  },
  mastSun: { position: 'absolute', top: 10, right: 12 },
  mastStamp: { marginBottom: 4, transform: [{ rotate: '-4deg' }] },
  mastTitle: {
    fontFamily: theme.fonts.pirate,
    fontSize: 28,
    color: '#fff8e4',
    lineHeight: 32,
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  mastWaves: { position: 'absolute', left: 0, right: 0, bottom: 0 },
  mastFab: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
