import { useState } from 'react';
import { Alert } from 'react-native';
import { ToolChrome } from '@/components/ToolChrome';
import { Banner, Field, PrimaryButton, SheetForm } from '@/components/Ui';
import { IconButton, IconRow } from '@/components/IconButton';
import { ToolCard } from '@/components/ToolCard';
import { api } from '@/lib/api';
import { formatTags, parseTags } from '@/lib/forms';
import { useApiList } from '@/lib/useApiList';

type Snippet = { id: string; title: string; language?: string; code?: string; tags?: string[] };

export default function SnippetsScreen() {
  const list = useApiList<Snippet>('/api/snippets');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Snippet | null>(null);
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('text');
  const [code, setCode] = useState('');
  const [tags, setTags] = useState('');
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function openCreate() {
    setEditing(null);
    setTitle('');
    setLanguage('text');
    setCode('');
    setTags('mobile');
    setFormError(null);
    setOpen(true);
  }

  function openEdit(item: Snippet) {
    setEditing(item);
    setTitle(item.title);
    setLanguage(item.language || 'text');
    setCode(item.code || '');
    setTags(formatTags(item.tags));
    setFormError(null);
    setOpen(true);
  }

  async function save() {
    if (!list.token) return;
    setBusy(true);
    setFormError(null);
    try {
      const body = {
        title: title.trim() || 'Untitled snippet',
        language: language.trim() || 'text',
        code,
        tags: parseTags(tags),
      };
      if (editing) await api(`/api/snippets/${editing.id}`, { method: 'PUT', token: list.token, body });
      else await api('/api/snippets', { method: 'POST', token: list.token, body });
      setOpen(false);
      await list.reload(true);
    } catch (err: any) {
      setFormError(err?.message || 'Could not save');
    } finally {
      setBusy(false);
    }
  }

  function remove(item: Snippet) {
    Alert.alert('Delete snippet?', item.title, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await api(`/api/snippets/${item.id}`, { method: 'DELETE', token: list.token });
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
        title="Snippets"
                query={list.query}
        onQuery={list.setQuery}
        refreshing={list.refreshing}
        onRefresh={() => list.reload(true)}
        loading={list.loading}
        error={list.error}
        emptyMessage="No snippets yet."
        isEmpty={!list.filtered.length}
        onCreate={openCreate}
        createLabel="Save snippet"
      >
        {list.filtered.map((item) => (
          <ToolCard
            key={item.id}
            title={item.title}
            subtitle={String(item.code || '').slice(0, 120) || 'Empty blueprint'}
            meta={`${item.language || 'text'}${(item.tags || []).length ? ` · ${(item.tags || []).join(', ')}` : ''}`}
            badge="CODE"
            icon="code-slash"
            tone="ink"
            onPress={() => openEdit(item)}
            trailing={
              <IconRow>
                <IconButton name="trash-outline" accessibilityLabel="Delete" danger onPress={() => remove(item)} />
              </IconRow>
            }
          />
        ))}
      </ToolChrome>

      <SheetForm visible={open} title={editing ? 'Edit snippet' : 'New snippet'} onClose={() => setOpen(false)}>
        <Field label="Title" value={title} onChangeText={setTitle} autoCapitalize="sentences" />
        <Field label="Language" value={language} onChangeText={setLanguage} />
        <Field label="Code" value={code} onChangeText={setCode} multiline />
        <Field label="Tags" value={tags} onChangeText={setTags} />
        <Banner message={formError} />
        <PrimaryButton label={busy ? 'Saving…' : 'Save'} onPress={save} disabled={busy} />
      </SheetForm>
    </>
  );
}
