import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Redirect } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Banner,
  Field,
  Muted,
  ParchmentCard,
  PrimaryButton,
  SeaScreen,
} from '@/components/Ui';
import {
  CompassRose,
  StrawHatMark,
  VoyageSun,
  WantedStamp,
  WaveBand,
} from '@/components/OpArt';
import { useAuth } from '@/lib/auth';
import { getApiUrl, isTunnelApi } from '@/lib/api';
import { colors, theme } from '@/lib/theme';

export default function LoginScreen() {
  const { token, signIn } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (token) return <Redirect href={"/(app)/(tabs)" as any} />;

  async function onSubmit() {
    setBusy(true);
    setError(null);
    try {
      await signIn(username.trim(), password);
    } catch (err: any) {
      setError(err?.message || 'Could not sign in');
    } finally {
      setBusy(false);
    }
  }

  const apiUrl = getApiUrl();

  return (
    <SeaScreen edges={['top', 'left', 'right', 'bottom']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.wrap} showsVerticalScrollIndicator={false}>
          <View style={styles.heroShell}>
            <LinearGradient
              colors={['#061527', '#0a2342', '#0c3d87', '#1e7ef0']}
              start={{ x: 0.1, y: 0 }}
              end={{ x: 0.9, y: 1 }}
              style={styles.hero}
            >
              <VoyageSun size={52} style={styles.sun} />
              <View style={styles.hat}>
                <StrawHatMark size={78} />
              </View>
              <View style={styles.compass}>
                <CompassRose size={68} />
              </View>
              <WantedStamp label="BOARDING" />
              <Text style={styles.brand}>GRAND LINE</Text>
              <Text style={styles.heroTitle}>Set sail</Text>
              <Text style={styles.heroTag}>Sign in to your ship</Text>
              <WaveBand style={styles.waves} />
            </LinearGradient>
          </View>

          <Muted>
            {isTunnelApi() ? 'API rides the Expo tunnel (Metro /api proxy).' : `API: ${apiUrl}`}
          </Muted>
          <View style={{ height: 14 }} />
          <ParchmentCard wanted>
            <Text style={styles.poster}>WANTED: CREW ACCESS</Text>
            <Field label="Username" value={username} onChangeText={setUsername} placeholder="your_username" />
            <Field
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Your password"
            />
            <Banner message={error} />
            <PrimaryButton label={busy ? 'Setting sail…' : 'Set sail'} onPress={onSubmit} disabled={busy} />
          </ParchmentCard>
          <Muted>{apiUrl}</Muted>
        </ScrollView>
      </KeyboardAvoidingView>
    </SeaScreen>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingTop: 24, paddingBottom: 48 },
  heroShell: {
    borderRadius: 22,
    borderWidth: 3,
    borderColor: colors.edge,
    overflow: 'hidden',
    marginBottom: 14,
    shadowColor: '#061527',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 12,
  },
  hero: {
    minHeight: 200,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 28,
  },
  sun: { position: 'absolute', top: 14, right: 16 },
  hat: { position: 'absolute', right: 16, bottom: 34 },
  compass: { position: 'absolute', left: -4, bottom: 22, opacity: 0.55 },
  brand: {
    marginTop: 10,
    fontFamily: theme.fonts.bodyExtra,
    fontSize: 12,
    letterSpacing: 3,
    color: colors.strawBright,
  },
  heroTitle: {
    fontFamily: theme.fonts.pirate,
    fontSize: 42,
    color: '#fff8e4',
    lineHeight: 46,
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
  },
  heroTag: {
    marginTop: 4,
    fontFamily: theme.fonts.body,
    fontSize: 14,
    color: 'rgba(255,248,228,0.82)',
  },
  waves: { position: 'absolute', left: 0, right: 0, bottom: -1 },
  poster: {
    fontFamily: theme.fonts.pirate,
    fontSize: 22,
    color: colors.wanted,
    marginBottom: 10,
  },
});
