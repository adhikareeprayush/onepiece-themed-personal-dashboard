import { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  Banner,
  Field,
  ParchmentCard,
  PrimaryButton,
  SeaScreen,
  SearchField,
  SheetForm,
} from '@/components/Ui';
import { IconButton, IconFab, IconRow } from '@/components/IconButton';
import { PressableScale, Stagger, ToolMasthead } from '@/components/OpArt';
import { api, getApiUrl } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { formatTags, matchesQuery, parseTags } from '@/lib/forms';
import { colors, theme } from '@/lib/theme';

type Note = { id: string; title: string; content: string; tags?: string[]; updatedAt?: string };

function stripMd(text: string) {
  return String(text || '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/[#>*_`~]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function openReader(id: string) {
  router.push({ pathname: '/(app)/note-reader', params: { id } });
}

function NoteTagRow({ tags, limit = 4 }: { tags?: string[]; limit?: number }) {
  const list = (tags || []).map((t) => String(t).trim()).filter(Boolean);
  if (!list.length) return null;
  const shown = list.slice(0, limit);
  const extra = list.length - shown.length;
  return (
    <View style={styles.tagRow}>
      {shown.map((tag) => (
        <View key={tag} style={styles.tagChip}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      ))}
      {extra > 0 ? <Text style={styles.tagMore}>+{extra}</Text> : null}
    </View>
  );
}

function TagFilterRail({
  tags,
  value,
  onChange,
}: {
  tags: string[];
  value: string;
  onChange: (id: string) => void;
}) {
  if (!tags.length) return null;
  const options = [{ id: '', label: 'All' }, ...tags.map((tag) => ({ id: tag, label: tag }))];
  return (
    <View style={styles.filterRail}>
      <View style={styles.filterLead}>
        <Ionicons name="pricetag-outline" size={13} color={colors.seaMid} />
        <Text style={styles.filterLeadText}>Tags</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterChips}
        style={styles.filterScroll}
      >
        {options.map((opt) => {
          const on = opt.id === value;
          return (
            <Pressable
              key={opt.id || 'all'}
              onPress={() => onChange(opt.id)}
              hitSlop={6}
              style={[styles.filterChip, on && styles.filterChipOn]}
            >
              <Text style={[styles.filterChipText, on && styles.filterChipTextOn]} numberOfLines={1}>
                {opt.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default function NotesScreen() {
  const { token } = useAuth();
  const [items, setItems] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [composeOpen, setComposeOpen] = useState(false);
  const [editing, setEditing] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const load = useCallback(
    async (isRefresh = false) => {
      if (!token) {
        setItems([]);
        setLoading(false);
        setRefreshing(false);
        setError('Not signed in.');
        return;
      }
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);
      try {
        const data = await api<Note[]>('/api/notes', { token });
        const list = Array.isArray(data) ? data : [];
        setItems(
          list
            .filter((n) => n && n.id != null)
            .map((n) => ({
              ...n,
              id: String(n.id),
              title: n.title || 'Untitled',
              content: n.content || '',
              tags: Array.isArray(n.tags) ? n.tags.map(String) : [],
            })),
        );
      } catch (err: any) {
        setError(err?.message || `Could not load notes from ${getApiUrl()}`);
        if (!isRefresh) setItems([]);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [token],
  );

  useFocusEffect(
    useCallback(() => {
      load(true);
    }, [load]),
  );

  const allTags = useMemo(() => {
    const set = new Set<string>();
    for (const note of items) {
      for (const tag of note.tags || []) {
        const clean = String(tag).trim().toLowerCase();
        if (clean) set.add(clean);
      }
    }
    return [...set].sort();
  }, [items]);

  const visible = useMemo(() => {
    const q = query.trim();
    return items.filter((n) => {
      if (tagFilter && !(n.tags || []).map((t) => t.toLowerCase()).includes(tagFilter)) return false;
      if (!q) return true;
      return matchesQuery([n.title, n.content, ...(n.tags || [])], q);
    });
  }, [items, query, tagFilter]);

  function openCreate() {
    setEditing(null);
    setTitle('');
    setContent('');
    setTags('');
    setFormError(null);
    setComposeOpen(true);
  }

  function openEdit(note: Note) {
    setEditing(note);
    setTitle(note.title || '');
    setContent(note.content || '');
    setTags(formatTags(note.tags));
    setFormError(null);
    setComposeOpen(true);
  }

  async function save() {
    if (!token) return;
    setBusy(true);
    setFormError(null);
    try {
      if (!content.trim() && !title.trim()) throw new Error('Write a title or body first.');
      const body = {
        title: title.trim() || 'Voyage note',
        content: content.trim() || title.trim(),
        tags: parseTags(tags),
      };
      let saved: Note;
      if (editing) {
        saved = await api(`/api/notes/${editing.id}`, { method: 'PUT', token, body });
      } else {
        saved = await api('/api/notes', {
          method: 'POST',
          token,
          body: { ...body, tags: [...new Set([...body.tags, 'mobile'])] },
        });
      }
      setComposeOpen(false);
      await load(true);
      openReader(String(saved.id));
    } catch (err: any) {
      setFormError(err?.message || 'Could not save');
    } finally {
      setBusy(false);
    }
  }

  function remove(note: Note) {
    Alert.alert('Delete?', note.title || 'Untitled', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await api(`/api/notes/${note.id}`, { method: 'DELETE', token });
            setItems((prev) => prev.filter((n) => n.id !== note.id));
          } catch (err: any) {
            setError(err?.message || 'Could not delete');
          }
        },
      },
    ]);
  }

  return (
    <>
      <SeaScreen>
        <View style={styles.root}>
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => load(true)}
                tintColor={colors.strawDeep}
                colors={[colors.wanted, colors.strawDeep]}
              />
            }
          >
            <ToolMasthead
              title="Logbook"
              tint={colors.seaMid}
              trailing={<IconFab onPress={openCreate} accessibilityLabel="New note" />}
            />
            <SearchField value={query} onChangeText={setQuery} placeholder="Search logs & tags" />
            <TagFilterRail tags={allTags} value={tagFilter} onChange={setTagFilter} />
            <Banner message={error} />
            {error ? (
              <IconButton name="refresh" accessibilityLabel="Retry" onPress={() => load()} solid style={{ marginBottom: 8 }} />
            ) : null}

            {loading && !items.length ? (
              <View style={styles.center}>
                <ActivityIndicator color={colors.strawDeep} size="large" />
              </View>
            ) : null}

            {!loading && !error && !visible.length ? (
              <ParchmentCard entering={false}>
                <Text style={styles.emptyTitle}>{tagFilter || query ? 'No matching logs' : 'No notes yet'}</Text>
                {!tagFilter && !query ? (
                  <IconFab onPress={openCreate} accessibilityLabel="New note" style={{ alignSelf: 'flex-start', marginTop: 10 }} />
                ) : null}
              </ParchmentCard>
            ) : null}

            {visible.map((item, index) => {
              const preview = stripMd(item.content).slice(0, 100);
              return (
                <Stagger key={item.id} index={index}>
                  <PressableScale onPress={() => openReader(item.id)}>
                    <ParchmentCard entering={false}>
                      <Text style={styles.cardTitle} numberOfLines={1}>
                        {item.title || 'Untitled'}
                      </Text>
                      <NoteTagRow tags={item.tags} />
                      {preview ? (
                        <Text style={styles.cardBody} numberOfLines={2}>
                          {preview}
                        </Text>
                      ) : null}
                      <IconRow>
                        <IconButton name="book-outline" accessibilityLabel="Read" onPress={() => openReader(item.id)} />
                        <IconButton name="create-outline" accessibilityLabel="Edit" onPress={() => openEdit(item)} />
                        <IconButton name="trash-outline" accessibilityLabel="Delete" danger onPress={() => remove(item)} />
                      </IconRow>
                    </ParchmentCard>
                  </PressableScale>
                </Stagger>
              );
            })}
          </ScrollView>
        </View>
      </SeaScreen>

      <SheetForm
        visible={composeOpen}
        title={editing ? 'Edit' : 'New note'}
        onClose={() => setComposeOpen(false)}
      >
        <Field label="Title" value={title} onChangeText={setTitle} placeholder="Title" autoCapitalize="sentences" />
        <Field
          label="Body"
          value={content}
          onChangeText={setContent}
          multiline
          placeholder="Markdown…"
          autoCapitalize="sentences"
        />
        <Field
          label="Tags & categories"
          value={tags}
          onChangeText={setTags}
          placeholder="voyage, east-blue, quest"
        />
        <Banner message={formError} />
        <PrimaryButton label={busy ? 'Saving…' : 'Save'} onPress={save} disabled={busy} />
      </SheetForm>
    </>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { flex: 1 },
  content: { paddingTop: 8, paddingBottom: 120, flexGrow: 1 },
  center: { paddingVertical: 40, alignItems: 'center' },
  filterRail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: -2,
    marginBottom: 10,
    minHeight: 28,
  },
  filterLead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingRight: 2,
  },
  filterLeadText: {
    fontFamily: theme.fonts.bodyExtra,
    color: colors.seaDeep,
    fontSize: 11,
    letterSpacing: 0.4,
  },
  filterScroll: { flex: 1 },
  filterChips: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingRight: 8,
  },
  filterChip: {
    height: 26,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: 'rgba(12,61,135,0.22)',
    backgroundColor: 'rgba(255,253,246,0.78)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterChipOn: {
    backgroundColor: colors.seaMid,
    borderColor: colors.seaDeep,
  },
  filterChipText: {
    fontFamily: theme.fonts.bodyExtra,
    color: colors.muted,
    fontSize: 11,
    lineHeight: 13,
    textTransform: 'lowercase',
  },
  filterChipTextOn: {
    color: '#fff8e4',
  },
  emptyTitle: {
    fontFamily: theme.fonts.pirate,
    fontSize: 22,
    color: colors.seaDeep,
  },
  cardTitle: {
    fontFamily: theme.fonts.bodyExtra,
    color: colors.seaDeep,
    fontSize: 17,
  },
  cardBody: {
    fontFamily: theme.fonts.body,
    color: colors.muted,
    marginTop: 6,
    lineHeight: 20,
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
    letterSpacing: 0.2,
  },
  tagMore: {
    fontFamily: theme.fonts.body,
    color: colors.muted,
    fontSize: 12,
    alignSelf: 'center',
  },
});
