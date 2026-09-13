import { useEffect, useState } from 'react';
import { Alert, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { router } from 'expo-router';
import {
  Banner,
  Field,
  Loading,
  Muted,
  ParchmentCard,
  PrimaryButton,
  SeaScreen,
} from '@/components/Ui';
import { IconButton, IconRow } from '@/components/IconButton';
import { PressableScale, ToolMasthead } from '@/components/OpArt';
import { WantedCard, type CaptainCard } from '@/components/WantedCard';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { colors, theme } from '@/lib/theme';

type Friend = {
  id: string;
  shareId: string;
  username: string;
  note?: string;
  avatarUrl?: string;
};

type Profile = CaptainCard & {
  shareId?: string;
  friends?: Friend[];
  publicCard?: CaptainCard;
};

export default function ProfileScreen() {
  const { token } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [username, setUsername] = useState('');
  const [friendId, setFriendId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [busy, setBusy] = useState(false);

  async function load(isRefresh = false) {
    if (!token) return;
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);
    try {
      const data = await api<Profile>('/api/profile', { token });
      setProfile(data);
      setUsername(data.username || '');
    } catch (err: any) {
      setError(err?.message || 'Could not load profile');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    load();
  }, [token]);

  async function save() {
    if (!token) return;
    setBusy(true);
    setError(null);
    try {
      const data = await api<Profile>('/api/profile', {
        method: 'PUT',
        token,
        body: { username: username.trim() },
      });
      setProfile(data);
      setUsername(data.username || '');
      Alert.alert('Saved', 'Your captain name was updated.');
    } catch (err: any) {
      setError(err?.message || 'Could not save name');
    } finally {
      setBusy(false);
    }
  }

  async function copyShareId() {
    if (!profile?.shareId) return;
    await Clipboard.setStringAsync(profile.shareId);
    Alert.alert('Copied', 'Captain ID copied to clipboard.');
  }

  async function addFriend() {
    if (!token) return;
    const shareId = friendId.trim().toUpperCase();
    if (!/^CAPT-[A-Z0-9]{6}$/.test(shareId)) {
      setError('Captain ID should look like CAPT-ABC123');
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const data = await api<Profile>('/api/profile/friends', {
        method: 'POST',
        token,
        body: { shareId },
      });
      setProfile(data);
      setFriendId('');
    } catch (err: any) {
      setError(err?.message || 'Could not add friend');
    } finally {
      setBusy(false);
    }
  }

  async function removeFriend(id: string, name: string) {
    if (!token) return;
    Alert.alert('Remove friend?', name, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: async () => {
          try {
            const data = await api<Profile>(`/api/profile/friends/${id}`, { method: 'DELETE', token });
            setProfile(data);
          } catch (err: any) {
            setError(err?.message || 'Could not remove friend');
          }
        },
      },
    ]);
  }

  if (loading) return <Loading />;

  const poster = profile?.publicCard || profile;

  return (
    <SeaScreen edges={['left', 'right', 'bottom']}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.wrap}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => load(true)} tintColor={colors.strawDeep} />}
      >
        <ToolMasthead title="Wanted poster" tint={colors.wanted} />

        {poster ? <WantedCard card={poster} /> : null}

        {profile?.shareId ? (
          <ParchmentCard entering={false}>
            <Text style={styles.shareLabel}>Captain ID</Text>
            <Text style={styles.shareId}>{profile.shareId}</Text>
            <IconRow>
              <IconButton name="copy-outline" accessibilityLabel="Copy ID" onPress={copyShareId} solid />
              <IconButton
                name="compass-outline"
                accessibilityLabel="Discover crew"
                onPress={() => router.push('/(app)/crew')}
                solid
              />
            </IconRow>
            <Muted>Fixed ID for this ship — copy it so crew can find your poster.</Muted>
          </ParchmentCard>
        ) : null}

        <ParchmentCard>
          <Field label="Captain name" value={username} onChangeText={setUsername} autoCapitalize="words" />
          <Muted>Only your name can be rewritten. Bounty, league, and the rest stay system-inked.</Muted>
          <Banner message={error} />
          <PrimaryButton label={busy ? 'Saving…' : 'Save name'} onPress={save} disabled={busy} />
        </ParchmentCard>

        <ParchmentCard entering={false}>
          <Text style={styles.sectionTitle}>Crew friends</Text>
          <Field label="Captain ID" value={friendId} onChangeText={setFriendId} placeholder="CAPT-ABC123" autoCapitalize="characters" />
          <PrimaryButton label={busy ? 'Adding…' : 'Add friend'} onPress={addFriend} disabled={busy} />
          {(profile?.friends || []).map((friend) => (
            <PressableScale
              key={friend.id}
              onPress={() => router.push({ pathname: '/(app)/captain/[shareId]', params: { shareId: friend.shareId } })}
              style={styles.friendRow}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.friendName}>{friend.username}</Text>
                <Text style={styles.friendMeta}>{friend.shareId}</Text>
                {friend.note ? <Text style={styles.friendNote}>{friend.note}</Text> : null}
              </View>
              <IconButton
                name="trash-outline"
                accessibilityLabel="Remove friend"
                danger
                onPress={() => removeFriend(friend.id, friend.username)}
              />
            </PressableScale>
          ))}
          {!profile?.friends?.length ? <Muted>No friends yet — discover crew or add by Captain ID.</Muted> : null}
        </ParchmentCard>
      </ScrollView>
    </SeaScreen>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingTop: 8, paddingBottom: 40, gap: 12 },
  shareLabel: {
    fontFamily: theme.fonts.bodyExtra,
    color: colors.seaDeep,
    marginBottom: 4,
  },
  shareId: {
    fontFamily: theme.fonts.bodyExtra,
    color: colors.wanted,
    fontSize: 18,
    letterSpacing: 1,
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: theme.fonts.pirate,
    fontSize: 24,
    color: colors.seaDeep,
    marginBottom: 8,
  },
  friendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(26,16,8,0.1)',
  },
  friendName: {
    fontFamily: theme.fonts.bodyExtra,
    color: colors.seaDeep,
    fontSize: 16,
  },
  friendMeta: {
    fontFamily: theme.fonts.body,
    color: colors.muted,
    fontSize: 12,
  },
  friendNote: {
    fontFamily: theme.fonts.body,
    color: colors.muted,
    fontSize: 13,
    marginTop: 2,
  },
});
