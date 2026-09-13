import { Redirect, Stack } from 'expo-router';
import { Loading } from '@/components/Ui';
import { SignalBell } from '@/components/SignalBell';
import { useAuth } from '@/lib/auth';
import { colors } from '@/lib/theme';

export default function AppLayout() {
  const { ready, token } = useAuth();
  if (!ready) return <Loading />;
  if (!token) return <Redirect href="/login" />;

  return (
    <>
      <SignalBell />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.headerBottom },
          headerShadowVisible: true,
          headerTintColor: colors.seaDeep,
          headerTitleStyle: { fontFamily: 'Nunito_800ExtraBold', color: colors.seaDeep },
          contentStyle: { backgroundColor: colors.deckBottom },
          // Stack headers already clear the status bar; screens skip top safe-area.
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="vault" options={{ title: 'Treasure vault' }} />
        <Stack.Screen name="quests" options={{ title: 'Quests' }} />
        <Stack.Screen name="charts" options={{ title: 'Sea charts' }} />
        <Stack.Screen name="snippets" options={{ title: 'Snippets' }} />
        <Stack.Screen name="focus" options={{ title: 'Focus' }} />
        <Stack.Screen name="profile" options={{ title: 'Captain profile' }} />
        <Stack.Screen name="crew" options={{ title: 'Crew deck' }} />
        <Stack.Screen name="captain/[shareId]" options={{ title: 'Wanted poster' }} />
        <Stack.Screen name="settings" options={{ title: 'Ship settings' }} />
        <Stack.Screen name="note-reader" options={{ title: 'Log reader', presentation: 'fullScreenModal' }} />
        <Stack.Screen name="note-editor" options={{ title: 'Edit log', presentation: 'modal' }} />
      </Stack>
    </>
  );
}
