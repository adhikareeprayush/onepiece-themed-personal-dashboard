import { useState } from 'react';
import { Alert, Linking } from 'react-native';
import { ToolChrome } from '@/components/ToolChrome';
import { Banner, Field, PrimaryButton, SheetForm } from '@/components/Ui';
import { IconButton, IconRow } from '@/components/IconButton';
import { ToolCard } from '@/components/ToolCard';
import { api } from '@/lib/api';
import { formatTags, parseTags } from '@/lib/forms';
import { useApiList } from '@/lib/useApiList';

type Chart = { id: string; title: string; url: string; notes?: string; tags?: string[] };

export default function ChartsScreen() {
  const list = useApiList<Chart>('/api/bookmarks');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Chart | null>(null);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState('');
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function openCreate() {
    setEditing(null);
    setTitle('');
    setUrl('');
    setNotes('');
    setTags('mobile');
    setFormError(null);
    setOpen(true);
  }

  function openEdit(item: Chart) {
    setEditing(item);
    setTitle(item.title);
    setUrl(item.url);
    setNotes(item.notes || '');
    setTags(formatTags(item.tags));
    setFormError(null);
    setOpen(true);
  }

  async function save() {
    if (!list.token) return;
    setBusy(true);
    setFormError(null);
    try {
      if (!url.trim()) throw new Error('URL is required.');
      const body = {
        title: title.trim() || 'Untitled chart',
        url: url.trim(),
        notes: notes.trim(),
        tags: parseTags(tags),
        source: 'mobile',
      };
      if (editing) await api(`/api/bookmarks/${editing.id}`, { method: 'PUT', token: list.token, body });
      else await api('/api/bookmarks', { method: 'POST', token: list.token, body });
      setOpen(false);
      await list.reload(true);
    } catch (err: any) {
      setFormError(err?.message || 'Could not save');
    } finally {
      setBusy(false);
    }
  }

  function remove(item: Chart) {
    Alert.alert('Delete chart?', item.title, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await api(`/api/bookmarks/${item.id}`, { method: 'DELETE', token: list.token });
            list.removeOptimistic(item.id);
          } catch (err: any) {
            list.setError(err?.message || 'Could not delete');
          }
        },
      },
    ]);
  }

  return (
    <>
      <ToolChrome
      safeTop={false}
        title="Sea charts"
                query={list.query}
        onQuery={list.setQuery}
        refreshing={list.refreshing}
        onRefresh={() => list.reload(true)}
        loading={list.loading}
        error={list.error}
        emptyMessage="No charts plotted yet."
        isEmpty={!list.filtered.length}
        onCreate={openCreate}
        createLabel="Save chart"
      >
        {list.filtered.map((item) => (
          <ToolCard
            key={item.id}
            title={item.title}
            subtitle={item.url}
            meta={(item.tags || []).length ? (item.tags || []).join(' · ') : item.notes || 'Sea chart'}
            badge="ROUTE"
            icon="map"
            tone="success"
            onPress={() => openEdit(item)}
            trailing={
              <IconRow>
                <IconButton name="open-outline" accessibilityLabel="Open" onPress={() => Linking.openURL(item.url)} />
                <IconButton name="trash-outline" accessibilityLabel="Delete" danger onPress={() => remove(item)} />
              </IconRow>
            }
          />
        ))}
      </ToolChrome>

      <SheetForm visible={open} title={editing ? 'Edit chart' : 'New chart'} onClose={() => setOpen(false)}>
        <Field label="Title" value={title} onChangeText={setTitle} autoCapitalize="sentences" />
        <Field label="URL" value={url} onChangeText={setUrl} keyboardType="url" />
        <Field label="Note" value={notes} onChangeText={setNotes} multiline autoCapitalize="sentences" />
        <Field label="Tags" value={tags} onChangeText={setTags} />
        <Banner message={formError} />
        <PrimaryButton label={busy ? 'Charting…' : 'Save'} onPress={save} disabled={busy} />
      </SheetForm>
    </>
  );
}
