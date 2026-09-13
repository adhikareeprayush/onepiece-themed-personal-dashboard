import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/lib/theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

const TAB_META: Record<string, { label: string; icon: IconName; iconFocused: IconName }> = {
  index: { label: 'Deck', icon: 'compass-outline', iconFocused: 'compass' },
  notes: { label: 'Log', icon: 'book-outline', iconFocused: 'book' },
  berries: { label: 'Berries', icon: 'wallet-outline', iconFocused: 'wallet' },
  watchtower: { label: 'Bell', icon: 'notifications-outline', iconFocused: 'notifications' },
  more: { label: 'More', icon: 'grid-outline', iconFocused: 'grid' },
};

function TabBubble({
  focused,
  icon,
  iconFocused,
  label,
  onPress,
  onLongPress,
}: {
  focused: boolean;
  icon: IconName;
  iconFocused: IconName;
  label: string;
  onPress: () => void;
  onLongPress: () => void;
}) {
  const bump = useSharedValue(focused ? 1 : 0);
  useEffect(() => {
    bump.value = withSpring(focused ? 1 : 0, { damping: 14, stiffness: 220 });
  }, [focused, bump]);

  const bubble = useAnimatedStyle(() => ({
    transform: [{ translateY: -bump.value * 2 }, { scale: 1 + bump.value * 0.08 }],
  }));

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={focused ? { selected: true } : {}}
      accessibilityLabel={label}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tab}
    >
      <Animated.View style={[styles.iconWell, focused && styles.iconWellOn, bubble]}>
        {focused ? (
          <LinearGradient
            colors={[colors.strawBright, colors.straw, colors.strawDeep]}
            style={styles.iconFill}
          >
            <Ionicons name={iconFocused} size={22} color={colors.seaDeep} />
          </LinearGradient>
        ) : (
          <Ionicons name={icon} size={22} color={colors.muted} />
        )}
      </Animated.View>
    </Pressable>
  );
}

function ShipTabBar(props: any) {
  const { state, descriptors, navigation } = props;
  const insets = useSafeAreaInsets();
  const bottom = Math.max(insets.bottom, 10);

  return (
    <View style={[styles.dock, { paddingBottom: bottom }]} pointerEvents="box-none">
      <View style={styles.island}>
        <LinearGradient
          colors={['#fff8e8', '#f3e2b8', '#edd59a']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.islandFill}
        >
          {state.routes.map((route: { key: string; name: string; params?: object }, index: number) => {
            const focused = state.index === index;
            const meta = TAB_META[route.name] || {
              label: descriptors[route.key]?.options.title || route.name,
              icon: 'ellipse-outline' as IconName,
              iconFocused: 'ellipse' as IconName,
            };

            return (
              <TabBubble
                key={route.key}
                focused={focused}
                icon={meta.icon}
                iconFocused={meta.iconFocused}
                label={meta.label}
                onPress={() => {
                  const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                  });
                  if (!focused && !event.defaultPrevented) {
                    navigation.navigate(route.name, route.params);
                  }
                }}
                onLongPress={() => navigation.emit({ type: 'tabLongPress', target: route.key })}
              />
            );
          })}
        </LinearGradient>
      </View>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <ShipTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: 'transparent' },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Deck' }} />
      <Tabs.Screen name="notes" options={{ title: 'Logbook' }} />
      <Tabs.Screen name="berries" options={{ title: 'Berries' }} />
      <Tabs.Screen name="watchtower" options={{ title: 'Bell' }} />
      <Tabs.Screen name="more" options={{ title: 'More' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  dock: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  island: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: colors.edge,
    backgroundColor: '#f3e2b8',
    shadowColor: '#061527',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.28,
    shadowRadius: 18,
    elevation: 16,
  },
  islandFill: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 76,
    paddingHorizontal: 8,
    paddingTop: 14,
    paddingBottom: 12,
    borderRadius: 25,
    overflow: 'visible',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
  },
  iconWell: {
    width: 46,
    height: 46,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWellOn: {
    borderWidth: 2.5,
    borderColor: colors.edge,
  },
  iconFill: {
    width: '100%',
    height: '100%',
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
