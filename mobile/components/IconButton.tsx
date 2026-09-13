import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps, ReactNode } from 'react';
import { Pressable, StyleSheet, View, type ViewStyle } from 'react-native';
import { PressableScale } from '@/components/OpArt';
import { colors } from '@/lib/theme';

export type AppIconName = ComponentProps<typeof Ionicons>['name'];

type Props = {
  name: AppIconName;
  onPress: () => void;
  accessibilityLabel: string;
  danger?: boolean;
  solid?: boolean;
  size?: number;
  style?: ViewStyle;
  disabled?: boolean;
};

/** Compact icon control — prefer these over text GhostButtons on mobile. */
export function IconButton({
  name,
  onPress,
  accessibilityLabel,
  danger,
  solid,
  size = 20,
  style,
  disabled,
}: Props) {
  const tint = danger ? colors.wanted : colors.seaDeep;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
      style={({ pressed }) => [
        styles.btn,
        solid && styles.solid,
        danger && solid && styles.solidDanger,
        (disabled || pressed) && { opacity: disabled ? 0.4 : 0.75 },
        style,
      ]}
    >
      <Ionicons name={name} size={size} color={solid ? colors.paper : tint} />
    </Pressable>
  );
}

export function IconFab({
  name = 'add',
  onPress,
  accessibilityLabel = 'Add',
  style,
}: {
  name?: AppIconName;
  onPress: () => void;
  accessibilityLabel?: string;
  style?: ViewStyle;
}) {
  return (
    <PressableScale
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={style ? [styles.fab, style] : styles.fab}
    >
      <Ionicons name={name} size={28} color={colors.seaDeep} />
    </PressableScale>
  );
}

export function IconRow({ children, style }: { children: ReactNode; style?: ViewStyle }) {
  return <View style={[styles.row, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  btn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(26,16,8,0.18)',
    backgroundColor: 'rgba(255,253,246,0.9)',
  },
  solid: {
    backgroundColor: colors.straw,
    borderColor: colors.edge,
  },
  solidDanger: {
    backgroundColor: colors.wanted,
    borderColor: colors.edge,
  },
  fab: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.straw,
    borderWidth: 3,
    borderColor: colors.edge,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(26,16,8,0.1)',
  },
});
