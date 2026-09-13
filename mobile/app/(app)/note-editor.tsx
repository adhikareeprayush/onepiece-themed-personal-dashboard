import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Banner, Field, Loading, PrimaryButton, SeaScreen, ParchmentCard } from '@/components/Ui';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { formatTags, parseTags } from '@/lib/forms';

export default function NoteEditorScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { token } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!token || !id) {
        setLoading(false);
        setError(!id ? 'Missing note id.' : 'Not signed in.');
        return;
      }
      try {
        const note = await api<{ title: string; content: string; tags?: string[] }>(`/api/notes/${id}`, { token });
        setTitle(note.title || '');
        setContent(note.content || '');
        setTags(formatTags(note.tags));
      } catch (err: any) {
        setError(err?.message || 'Could not load note');
      } finally {
        setLoading(false);
      }
    })();
  }, [id, token]);

  async function save() {
    if (!token || !id) return;
    setBusy(true);
    setError(null);
    try {
      await api(`/api/notes/${id}`, {
        method: 'PUT',
        token,
        body: {
          title: title.trim() || 'Voyage note',
          content: content.trim() || title.trim(),
          tags: parseTags(tags),
        },
      });
      router.back();
    } catch (err: any) {
      setError(err?.message || 'Could not save');
    } finally {
      setBusy(false);
    }
  }

  if (loading) return <Loading label="Loading…" />;

  return (
    <SeaScreen edges={['left', 'right', 'bottom']}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.wrap}>
        <ParchmentCard wanted entering={false}>
          <Field label="Title" value={title} onChangeText={setTitle} autoCapitalize="sentences" />
          <Field label="Body" value={content} onChangeText={setContent} multiline autoCapitalize="sentences" />
          <Field label="Tags & categories" value={tags} onChangeText={setTags} placeholder="voyage, east-blue, quest" />
          <Banner message={error} />
          <PrimaryButton label={busy ? 'Saving…' : 'Save'} onPress={save} disabled={busy} />
        </ParchmentCard>
      </ScrollView>
    </SeaScreen>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingTop: 8, paddingBottom: 40 },
});
