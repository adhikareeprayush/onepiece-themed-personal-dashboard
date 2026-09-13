import { useCallback, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { Banner, Loading, SeaScreen } from '@/components/Ui';
import { IconButton, IconRow } from '@/components/IconButton';
import { MarkdownView } from '@/components/MarkdownView';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { colors, theme } from '@/lib/theme';

type Note = { id: string; title: string; content: string; tags?: string[]; updatedAt?: string };

export default function NoteReaderScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { token } = useAuth();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!token || !id) {
      setLoading(false);
      setError(!id ? 'Missing note id.' : 'Not signed in.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await api<Note>(`/api/notes/${id}`, { token });
      setNote({
        ...data,
        id: String(data.id || id),
        title: data.title || 'Untitled',
        content: data.content || '',
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      });
    } catch (err: any) {
      setError(err?.message || 'Could not open log page');
      setNote(null);
    } finally {
      setLoading(false);
    }
  }, [id, token]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  function remove() {
    if (!note || !token) return;
    Alert.alert('Delete?', note.title || 'Untitled', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await api(`/api/notes/${note.id}`, { method: 'DELETE', token });
            router.back();
          } catch (err: any) {
            setError(err?.message || 'Could not delete');
          }
        },
      },
    ]);
  }

  if (loading) return <Loading label="Loading…" />;

  return (
    <SeaScreen edges={['left', 'right', 'bottom']}>
      <View style={styles.root}>
        <View style={styles.masthead}>
          <Text style={styles.title} numberOfLines={2}>
            {note?.title || 'Untitled'}
          </Text>
          {note?.tags?.length ? (
            <View style={styles.tagRow}>
              {note.tags.map((tag) => (
                <View key={tag} style={styles.tagChip}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          ) : null}
          <IconRow style={styles.tools}>
            <IconButton
              name="create-outline"
              accessibilityLabel="Edit"
              solid
              onPress={() => router.push({ pathname: '/(app)/note-editor', params: { id: note?.id } })}
            />
            <IconButton name="trash-outline" accessibilityLabel="Delete" danger onPress={remove} />
            <IconButton name="close" accessibilityLabel="Close" onPress={() => router.back()} />
          </IconRow>
        </View>

        <Banner message={error} />

        <View style={styles.page}>
          {note ? <MarkdownView markdown={note.content} token={token} fill minHeight={320} /> : null}
        </View>
      </View>
    </SeaScreen>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, minHeight: 0 },
  masthead: {
    borderWidth: 3,
    borderColor: colors.edge,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: colors.headerBottom,
  },
  title: {
    fontFamily: theme.fonts.pirate,
    fontSize: 26,
    color: colors.seaDeep,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  tagChip: {
    borderWidth: 1.5,
    borderColor: 'rgba(12,61,135,0.28)',
    backgroundColor: 'rgba(30,126,240,0.1)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagText: {
    fontFamily: theme.fonts.bodyExtra,
    color: colors.seaDeep,
    fontSize: 11,
  },
  tools: {
    marginTop: 8,
    paddingTop: 0,
    borderTopWidth: 0,
    justifyContent: 'flex-start',
  },
  page: {
    flex: 1,
    minHeight: 0,
    backgroundColor: colors.paper,
    borderWidth: 3,
    borderColor: colors.edge,
    borderRadius: 6,
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingTop: 4,
  },
});
