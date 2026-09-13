import { useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { ToolChrome } from '@/components/ToolChrome';
import { Banner, ChipRow, Field, PrimaryButton, SheetForm } from '@/components/Ui';
import { IconButton, IconRow } from '@/components/IconButton';
import { ToolCard } from '@/components/ToolCard';
import { api } from '@/lib/api';
import { useApiList } from '@/lib/useApiList';

type Quest = {
  id: string;
  title: string;
  description?: string;
  done?: boolean;
  level?: string;
  notes?: string;
};

const LEVELS = ['S', 'A', 'B', 'C', 'D'];

export default function QuestsScreen() {
  const list = useApiList<Quest>('/api/quests');
  const [status, setStatus] = useState('open');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Quest | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('C');
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const visible = useMemo(() => {
    return list.filtered.filter((q) => {
      if (status === 'open' && q.done) return false;
      if (status === 'done' && !q.done) return false;
      return true;
    });
  }, [list.filtered, status]);

  function openCreate() {
    setEditing(null);
    setTitle('');
    setDescription('');
    setLevel('C');
    setFormError(null);
    setOpen(true);
  }

  function openEdit(quest: Quest) {
    setEditing(quest);
    setTitle(quest.title);
    setDescription(quest.description || '');
    setLevel(quest.level || 'C');
    setFormError(null);
    setOpen(true);
  }

  async function save() {
    if (!list.token) return;
    setBusy(true);
    setFormError(null);
    try {
      const body = {
        title: title.trim() || 'Untitled quest',
        description: description.trim(),
        level,
        done: editing?.done || false,
      };
      if (editing) await api(`/api/quests/${editing.id}`, { method: 'PUT', token: list.token, body: { ...editing, ...body } });
      else await api('/api/quests', { method: 'POST', token: list.token, body });
      setOpen(false);
      await list.reload(true);
    } catch (err: any) {
      setFormError(err?.message || 'Could not save');
    } finally {
      setBusy(false);
    }
  }

  async function toggle(quest: Quest) {
    try {
      await api(`/api/quests/${quest.id}`, {
        method: 'PUT',
        token: list.token,
        body: { ...quest, done: !quest.done },
      });
      await list.reload(true);
    } catch (err: any) {
      list.setError(err?.message || 'Could not update');
    }
  }

  function remove(quest: Quest) {
    Alert.alert('Delete quest?', quest.title, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await api(`/api/quests/${quest.id}`, { method: 'DELETE', token: list.token });
            list.removeOptimistic(quest.id);
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
        title="Quests"
                query={list.query}
        onQuery={list.setQuery}
        filter={status}
        filterOptions={[
          { id: 'open', label: 'Open' },
          { id: 'done', label: 'Done' },
          { id: 'all', label: 'All' },
        ]}
        onFilter={setStatus}
        refreshing={list.refreshing}
        onRefresh={() => list.reload(true)}
        loading={list.loading}
        error={list.error}
        emptyMessage="No quests on the board."
        isEmpty={!visible.length}
        onCreate={openCreate}
        createLabel="Post quest"
      >
        {visible.map((quest) => {
          const rank = quest.level || 'C';
          const done = Boolean(quest.done);
          return (
            <ToolCard
              key={quest.id}
              title={quest.title}
              subtitle={quest.description || 'No description inked yet.'}
              meta={done ? 'Cleared' : 'Open mission'}
              badge={`RANK ${rank}`}
              icon="flag"
              tone={done ? 'success' : rank === 'S' || rank === 'A' ? 'wanted' : 'sea'}
              wanted={rank === 'S' || rank === 'A'}
              onPress={() => openEdit(quest)}
              trailing={
                <IconRow>
                  <IconButton
                    name={done ? 'refresh-outline' : 'checkmark-circle-outline'}
                    accessibilityLabel={done ? 'Reopen' : 'Done'}
                    onPress={() => toggle(quest)}
                  />
                  <IconButton name="trash-outline" accessibilityLabel="Delete" danger onPress={() => remove(quest)} />
                </IconRow>
              }
            />
          );
        })}
      </ToolChrome>

      <SheetForm visible={open} title={editing ? 'Edit quest' : 'New quest'} onClose={() => setOpen(false)}>
        <Field label="Title" value={title} onChangeText={setTitle} autoCapitalize="sentences" />
        <Field label="Description" value={description} onChangeText={setDescription} multiline autoCapitalize="sentences" />
        <ChipRow
          options={LEVELS.map((id) => ({ id, label: id }))}
          value={level}
          onChange={setLevel}
        />
        <Banner message={formError} />
        <PrimaryButton label={busy ? 'Saving…' : 'Save quest'} onPress={save} disabled={busy} />
      </SheetForm>
    </>
  );
}
