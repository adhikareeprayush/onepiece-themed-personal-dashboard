import { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, theme } from '@/lib/theme';

type Props = {
  value: string; // YYYY-MM-DDTHH:mm
  onChange: (next: string) => void;
};

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function parseLocal(value: string) {
  const match = String(value || '').match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!match) {
    const d = new Date(Date.now() + 60 * 60 * 1000);
    return {
      y: d.getFullYear(),
      m: d.getMonth() + 1,
      d: d.getDate(),
      h: d.getHours(),
      min: d.getMinutes(),
    };
  }
  return {
    y: Number(match[1]),
    m: Number(match[2]),
    d: Number(match[3]),
    h: Number(match[4]),
    min: Number(match[5]),
  };
}

function toLocal(parts: { y: number; m: number; d: number; h: number; min: number }) {
  return `${parts.y}-${pad(parts.m)}-${pad(parts.d)}T${pad(parts.h)}:${pad(parts.min)}`;
}

function dayKey(offset: number) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + offset);
  return {
    offset,
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    label: offset === 0 ? 'Today' : offset === 1 ? 'Tomorrow' : date.toLocaleDateString(undefined, { weekday: 'short' }),
    sub: date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
  };
}

const SIZE = 220;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = 78;

export function VoyageClockPicker({ value, onChange }: Props) {
  const parts = parseLocal(value);
  const hour12 = ((parts.h + 11) % 12) + 1;
  const isPm = parts.h >= 12;
  const [mode, setMode] = useState<'hour' | 'minute'>('hour');
  const spin = useSharedValue(0);
  const bob = useSharedValue(0);

  const days = useMemo(() => Array.from({ length: 7 }, (_, i) => dayKey(i)), []);
  const selectedDay = days.find((day) => day.y === parts.y && day.m === parts.m && day.d === parts.d) || days[0];

  const handDeg = mode === 'hour' ? (hour12 % 12) * 30 : (Math.round(parts.min / 5) % 12) * 30;

  useEffect(() => {
    spin.value = withSpring(handDeg, { damping: 14, stiffness: 160 });
  }, [handDeg, spin]);

  useEffect(() => {
    bob.value = withTiming(1, { duration: 1800, easing: Easing.inOut(Easing.sin) });
    const id = setInterval(() => {
      bob.value = withTiming(bob.value > 0.5 ? 0 : 1, { duration: 1800, easing: Easing.inOut(Easing.sin) });
    }, 1800);
    return () => clearInterval(id);
  }, [bob]);

  const handStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spin.value}deg` }],
  }));

  const sunStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + bob.value * 0.06 }],
    opacity: 0.55 + bob.value * 0.25,
  }));

  function emit(next: Partial<typeof parts>) {
    onChange(toLocal({ ...parts, ...next }));
  }

  function pickDay(day: (typeof days)[number]) {
    emit({ y: day.y, m: day.m, d: day.d });
  }

  function pickDial(index: number) {
    if (mode === 'hour') {
      const h12 = index === 0 ? 12 : index;
      const h24 = isPm ? (h12 % 12) + 12 : h12 % 12;
      emit({ h: h24 });
      setMode('minute');
    } else {
      emit({ min: index * 5 });
    }
  }

  function setAmPm(pm: boolean) {
    const base = hour12 % 12;
    emit({ h: pm ? base + 12 : base });
  }

  const readout = new Date(parts.y, parts.m - 1, parts.d, parts.h, parts.min).toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>Ring the bell at</Text>
      <Text style={styles.readout}>{readout}</Text>

      <View style={styles.dayRow}>
        {days.map((day) => {
          const on = day.y === selectedDay.y && day.m === selectedDay.m && day.d === selectedDay.d;
          return (
            <Pressable key={day.offset} onPress={() => pickDay(day)} style={[styles.dayChip, on && styles.dayChipOn]}>
              <Text style={[styles.dayLabel, on && styles.dayLabelOn]}>{day.label}</Text>
              <Text style={[styles.daySub, on && styles.daySubOn]}>{day.sub}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.modeRow}>
        <Pressable onPress={() => setMode('hour')} style={[styles.modeBtn, mode === 'hour' && styles.modeBtnOn]}>
          <Text style={[styles.modeText, mode === 'hour' && styles.modeTextOn]}>Hour</Text>
        </Pressable>
        <Pressable onPress={() => setMode('minute')} style={[styles.modeBtn, mode === 'minute' && styles.modeBtnOn]}>
          <Text style={[styles.modeText, mode === 'minute' && styles.modeTextOn]}>Minute</Text>
        </Pressable>
      </View>

      <View style={styles.clockShell}>
        <LinearGradient colors={['#0a2342', '#0c3d87', '#1e7ef0']} style={styles.clockFace}>
          <Animated.View style={[styles.sun, sunStyle]} />
          {[...Array(12)].map((_, i) => {
            const angle = ((i * 30 - 90) * Math.PI) / 180;
            const x = CX + Math.cos(angle) * R;
            const y = CY + Math.sin(angle) * R;
            const label = mode === 'hour' ? (i === 0 ? 12 : i) : i * 5;
            const selected = mode === 'hour' ? hour12 % 12 === i : Math.round(parts.min / 5) % 12 === i;
            return (
              <Pressable
                key={i}
                onPress={() => pickDial(i)}
                style={[
                  styles.tick,
                  {
                    left: x - 18,
                    top: y - 18,
                  },
                  selected && styles.tickOn,
                ]}
              >
                <Text style={[styles.tickText, selected && styles.tickTextOn]}>{label}</Text>
              </Pressable>
            );
          })}
          <Animated.View pointerEvents="none" style={[styles.handLayer, handStyle]}>
            <View style={styles.handBar} />
            <View style={styles.handTip} />
          </Animated.View>
          <View pointerEvents="none" style={styles.hub} />
          <Text pointerEvents="none" style={styles.clockBrand}>{mode === 'hour' ? 'HOUR' : 'MIN'}</Text>
        </LinearGradient>
      </View>

      <View style={styles.ampmRow}>
        <Pressable onPress={() => setAmPm(false)} style={[styles.ampm, !isPm && styles.ampmOn]}>
          <Text style={[styles.ampmText, !isPm && styles.ampmTextOn]}>AM</Text>
        </Pressable>
        <Pressable onPress={() => setAmPm(true)} style={[styles.ampm, isPm && styles.ampmOn]}>
          <Text style={[styles.ampmText, isPm && styles.ampmTextOn]}>PM</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 8,
    borderWidth: 3,
    borderColor: colors.edge,
    borderRadius: 18,
    padding: 12,
    backgroundColor: 'rgba(255,248,228,0.92)',
    overflow: 'hidden',
  },
  label: {
    fontFamily: theme.fonts.bodyExtra,
    color: colors.seaDeep,
    fontSize: 13,
    letterSpacing: 1,
  },
  readout: {
    fontFamily: theme.fonts.pirate,
    color: colors.wanted,
    fontSize: 26,
    marginTop: 2,
    marginBottom: 10,
  },
  dayRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  dayChip: {
    minWidth: 68,
    borderWidth: 2,
    borderColor: 'rgba(26,16,8,0.16)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: 'rgba(255,253,246,0.9)',
  },
  dayChipOn: {
    borderColor: colors.edge,
    backgroundColor: colors.straw,
  },
  dayLabel: {
    fontFamily: theme.fonts.bodyExtra,
    color: colors.seaDeep,
    fontSize: 12,
  },
  dayLabelOn: { color: colors.seaDeep },
  daySub: {
    fontFamily: theme.fonts.body,
    color: colors.muted,
    fontSize: 11,
  },
  daySubOn: { color: colors.seaDeep },
  modeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  modeBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(26,16,8,0.14)',
    backgroundColor: 'rgba(255,253,246,0.85)',
  },
  modeBtnOn: {
    backgroundColor: colors.seaMid,
    borderColor: colors.edge,
  },
  modeText: {
    fontFamily: theme.fonts.bodyExtra,
    color: colors.seaDeep,
  },
  modeTextOn: { color: '#fff8e4' },
  clockShell: {
    alignItems: 'center',
    marginBottom: 10,
  },
  clockFace: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: 4,
    borderColor: colors.straw,
    overflow: 'hidden',
  },
  sun: {
    position: 'absolute',
    top: 18,
    right: 26,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ffd56a',
  },
  tick: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,248,228,0.14)',
  },
  tickOn: {
    backgroundColor: colors.straw,
    borderWidth: 2,
    borderColor: colors.edge,
  },
  tickText: {
    fontFamily: theme.fonts.bodyExtra,
    color: '#fff8e4',
    fontSize: 12,
  },
  tickTextOn: { color: colors.seaDeep },
  handLayer: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  handBar: {
    position: 'absolute',
    top: CY - 70,
    width: 5,
    height: 70,
    borderRadius: 4,
    backgroundColor: colors.strawBright,
  },
  handTip: {
    position: 'absolute',
    top: CY - 78,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.wanted,
    borderWidth: 2,
    borderColor: colors.edge,
  },
  hub: {
    position: 'absolute',
    left: CX - 8,
    top: CY - 8,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.straw,
    borderWidth: 2,
    borderColor: colors.edge,
  },
  clockBrand: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 34,
    textAlign: 'center',
    fontFamily: theme.fonts.bodyExtra,
    color: 'rgba(255,248,228,0.7)',
    letterSpacing: 2,
    fontSize: 11,
  },
  ampmRow: {
    flexDirection: 'row',
    gap: 8,
  },
  ampm: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(26,16,8,0.14)',
    backgroundColor: 'rgba(255,253,246,0.85)',
  },
  ampmOn: {
    backgroundColor: colors.wanted,
    borderColor: colors.edge,
  },
  ampmText: {
    fontFamily: theme.fonts.bodyExtra,
    color: colors.seaDeep,
    letterSpacing: 1,
  },
  ampmTextOn: { color: '#fff8e4' },
});
