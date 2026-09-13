import { useState } from 'react';
import { Alert, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { ToolChrome } from '@/components/ToolChrome';
import { Banner, Field, PrimaryButton, SheetForm } from '@/components/Ui';
import { IconButton, IconRow } from '@/components/IconButton';
import { ToolCard } from '@/components/ToolCard';
import { api } from '@/lib/api';
import { useApiList } from '@/lib/useApiList';

type Entry = {
  id: string;
  title: string;
  username?: string;
  password?: string;
  url?: string;
  notes?: string;
};

export default function VaultScreen() {
  const list = useApiList<Entry>('/api/vault');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Entry | null>(null);
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [revealed, setRevealed] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);

  function openCreate() {
    setEditing(null);
    setTitle('');
    setUsername('');
    setPassword('');
    setUrl('');
    setNotes('');
    setFormError(null);
    setOpen(true);
  }

  async function openEdit(entry: Entry) {
    setEditing(entry);
    setTitle(entry.title);
    setUsername(entry.username || '');
    setUrl(entry.url || '');
    setNotes(entry.notes || '');
    setPassword('');
    setFormError(null);
    try {
      if (list.token) {
        const full = await api<Entry>(`/api/vault/${entry.id}`, { token: list.token });
        setPassword(full.password || '');
      }
    } catch {
      /* keep empty */
    }
    setOpen(true);
  }

  async function save() {
    if (!list.token) return;
    setBusy(true);
    setFormError(null);
    try {
      const body = {
        title: title.trim() || 'Chest',
        username: username.trim(),
        password,
        url: url.trim(),
        notes: notes.trim(),
      };
      if (editing) await api(`/api/vault/${editing.id}`, { method: 'PUT', token: list.token, body });
      else await api('/api/vault', { method: 'POST', token: list.token, body });
      setOpen(false);
      await list.reload(true);
    } catch (err: any) {
      setFormError(err?.message || 'Could not save');
    } finally {
      setBusy(false);
    }
  }

  async function reveal(id: string) {
    if (!list.token) return;
    try {
      const entry = await api<Entry>(`/api/vault/${id}`, { token: list.token });
      setRevealed((prev) => ({ ...prev, [id]: entry.password || '' }));
    } catch (err: any) {
      list.setError(err?.message || 'Could not open chest');
    }
  }

  async function copySecret(id: string) {
    let secret = revealed[id];
    if (secret == null && list.token) {
      const entry = await api<Entry>(`/api/vault/${id}`, { token: list.token });
      secret = entry.password || '';
      setRevealed((prev) => ({ ...prev, [id]: secret! }));
    }
    await Clipboard.setStringAsync(secret || '');
    setBanner('Password copied to clipboard.');
    setTimeout(() => setBanner(null), 2000);
  }

  function remove(entry: Entry) {
    Alert.alert('Delete chest?', entry.title, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await api(`/api/vault/${entry.id}`, { method: 'DELETE', token: list.token });
            list.removeOptimistic(entry.id);
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
        title="Vault"
        query={list.query}
        onQuery={list.setQuery}
        refreshing={list.refreshing}
        onRefresh={() => list.reload(true)}
        loading={list.loading}
        error={list.error || banner}
        emptyMessage="Vault is empty."
        isEmpty={!list.filtered.length}
        onCreate={openCreate}
      >
        {list.filtered.map((entry) => (
          <ToolCard
            key={entry.id}
            title={entry.title}
            subtitle={`${entry.username || 'No username'} · ${entry.url || 'No URL'}`}
            meta={revealed[entry.id] != null ? `Secret: ${revealed[entry.id] || '(empty)'}` : 'Tap eye to reveal'}
            badge="CHEST"
            icon="lock-closed"
            tone="wanted"
            wanted
            onPress={() => openEdit(entry)}
            trailing={
              <IconRow>
                <IconButton
                  name={revealed[entry.id] != null ? 'eye-off-outline' : 'eye-outline'}
                  accessibilityLabel={revealed[entry.id] != null ? 'Hide' : 'Reveal'}
                  onPress={() =>
                    revealed[entry.id] != null
                      ? setRevealed((prev) => {
                          const next = { ...prev };
                          delete next[entry.id];
                          return next;
                        })
                      : reveal(entry.id)
                  }
                />
                <IconButton name="copy-outline" accessibilityLabel="Copy" onPress={() => copySecret(entry.id)} />
                <IconButton name="trash-outline" accessibilityLabel="Delete" danger onPress={() => remove(entry)} />
              </IconRow>
            }
          />
        ))}
      </ToolChrome>

      <SheetForm visible={open} title={editing ? 'Edit chest' : 'New chest'} onClose={() => setOpen(false)}>
        <Field label="Title" value={title} onChangeText={setTitle} autoCapitalize="sentences" />
        <Field label="Username" value={username} onChangeText={setUsername} />
        <Field label="Password" value={password} onChangeText={setPassword} secureTextEntry />
        <Field label="URL" value={url} onChangeText={setUrl} keyboardType="url" />
        <Field label="Notes" value={notes} onChangeText={setNotes} multiline autoCapitalize="sentences" />
        <Banner message={formError} />
        <PrimaryButton label={busy ? 'Locking…' : 'Save chest'} onPress={save} disabled={busy} />
      </SheetForm>
    </>
  );
}
