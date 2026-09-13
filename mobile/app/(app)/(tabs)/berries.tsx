import { useMemo, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ToolChrome } from '@/components/ToolChrome';
import { BerryCharts } from '@/components/BerryCharts';
import { ChipRow, Field, PrimaryButton, SheetForm, Banner, StatTile, ParchmentCard } from '@/components/Ui';
import { IconButton, IconRow } from '@/components/IconButton';
import { PressableScale } from '@/components/OpArt';
import { api } from '@/lib/api';
import { currentMonthKey, money, todayDate } from '@/lib/forms';
import { useApiList } from '@/lib/useApiList';
import { colors, theme } from '@/lib/theme';
import { Ionicons } from '@expo/vector-icons';

type Expense = {
  id: string;
  title: string;
  amount: number;
  flow: 'income' | 'expense';
  category?: string;
  date?: string;
  note?: string;
  repeat?: 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  nextDate?: string | null;
  recurringParentId?: string | null;
};

const REPEAT_OPTIONS = [
  { id: 'none', label: 'Once' },
  { id: 'daily', label: 'Daily' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'yearly', label: 'Yearly' },
];

function BerryReceipt({
  item,
  subtitle,
  onPress,
  onDelete,
}: {
  item: Expense;
  subtitle: string;
  onPress: () => void;
  onDelete: () => void;
}) {
  const income = item.flow === 'income';
  const accent = income ? colors.strawDeep : colors.wanted;
  const accentDeep = income ? '#9a6b08' : colors.wantedDeep;
  const amountColor = income ? colors.success : colors.wanted;

  return (
    <PressableScale onPress={onPress} style={styles.receiptPress}>
      <ParchmentCard
        entering={false}
        wanted={!income}
        style={income ? styles.incomeRing : styles.expenseRing}
        contentStyle={styles.receiptPad}
      >
        <LinearGradient
          colors={
            income
              ? ['rgba(245,197,24,0.28)', 'rgba(255,248,228,0.05)', 'transparent']
              : ['rgba(196,30,58,0.22)', 'rgba(255,248,228,0.04)', 'transparent']
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
        <View
          style={[
            styles.flowBadge,
            {
              backgroundColor: income ? 'rgba(245,197,24,0.28)' : 'rgba(196,30,58,0.18)',
              borderColor: accent,
            },
          ]}
        >
          <Ionicons name={income ? 'trending-up' : 'trending-down'} size={14} color={accentDeep} />
          <Text style={[styles.flowBadgeText, { color: accentDeep }]}>{income ? 'INCOME' : 'EXPENSE'}</Text>
        </View>

        <View style={styles.receiptBody}>
          <View style={styles.receiptMain}>
            <Text style={styles.receiptTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.receiptSub} numberOfLines={2}>
              {subtitle}
            </Text>
          </View>
          <View style={styles.amountCol}>
            <Text style={[styles.amount, { color: amountColor }]}>
              {income ? '+' : '−'}
              {money(item.amount)}
            </Text>
            <View
              style={[
                styles.amountMark,
                { backgroundColor: income ? 'rgba(31,122,76,0.14)' : 'rgba(196,30,58,0.12)' },
              ]}
            >
              <Ionicons name={income ? 'wallet' : 'cart'} size={14} color={amountColor} />
            </View>
          </View>
        </View>

        <IconRow>
          <IconButton name="create-outline" accessibilityLabel="Edit" onPress={onPress} />
          <IconButton name="trash-outline" accessibilityLabel="Delete" danger onPress={onDelete} />
        </IconRow>
      </ParchmentCard>
    </PressableScale>
  );
}

export default function BerriesScreen() {
  const list = useApiList<Expense>('/api/expenses');
  const [flowFilter, setFlowFilter] = useState('all');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Expense | null>(null);
  const [flow, setFlow] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('other');
  const [date, setDate] = useState(todayDate());
  const [note, setNote] = useState('');
  const [repeat, setRepeat] = useState('none');
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const month = currentMonthKey();
  const summary = useMemo(() => {
    const monthItems = list.items.filter((i) => String(i.date || '').startsWith(month));
    const income = monthItems.filter((i) => i.flow === 'income').reduce((s, i) => s + Number(i.amount || 0), 0);
    const spend = monthItems.filter((i) => i.flow !== 'income').reduce((s, i) => s + Number(i.amount || 0), 0);
    return { income, spend, net: income - spend, count: monthItems.length };
  }, [list.items, month]);

  const visible = list.filtered.filter((item) => {
    if (flowFilter === 'income' && item.flow !== 'income') return false;
    if (flowFilter === 'expense' && item.flow === 'income') return false;
    return true;
  });

  function openCreate() {
    setEditing(null);
    setFlow('expense');
    setAmount('');
    setTitle('');
    setCategory('other');
    setDate(todayDate());
    setNote('');
    setRepeat('none');
    setFormError(null);
    setOpen(true);
  }

  function openEdit(item: Expense) {
    setEditing(item);
    setFlow(item.flow === 'income' ? 'income' : 'expense');
    setAmount(String(item.amount ?? ''));
    setTitle(item.title);
    setCategory(item.category || 'other');
    setDate(item.date || todayDate());
    setNote(item.note || '');
    setRepeat(item.repeat || 'none');
    setFormError(null);
    setOpen(true);
  }

  async function save() {
    if (!list.token) return;
    setBusy(true);
    setFormError(null);
    try {
      const value = Number(amount);
      if (!Number.isFinite(value) || value < 0) throw new Error('Enter a valid amount.');
      const body = {
        flow,
        amount: value,
        title: title.trim() || (flow === 'income' ? 'Income' : 'Expense'),
        category: category.trim() || 'other',
        date: date || todayDate(),
        note: note.trim(),
        repeat,
        source: 'mobile',
      };
      if (editing) await api(`/api/expenses/${editing.id}`, { method: 'PUT', token: list.token, body });
      else await api('/api/expenses', { method: 'POST', token: list.token, body });
      setOpen(false);
      await list.reload(true);
    } catch (err: any) {
      setFormError(err?.message || 'Could not save');
    } finally {
      setBusy(false);
    }
  }

  function remove(item: Expense) {
    Alert.alert('Delete?', item.title, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await api(`/api/expenses/${item.id}`, { method: 'DELETE', token: list.token });
            list.removeOptimistic(item.id);
          } catch (err: any) {
            list.setError(err?.message || 'Could not delete');
          }
        },
      },
    ]);
  }

  function subtitleFor(item: Expense) {
    const bits = [item.category || 'other', item.date || ''];
    if (item.repeat && item.repeat !== 'none') {
      bits.push(`↻ ${item.repeat}`);
      if (item.nextDate) bits.push(`next ${item.nextDate}`);
    } else if (item.recurringParentId) {
      bits.push('auto');
    }
    return bits.filter(Boolean).join(' · ');
  }

  return (
    <>
      <ToolChrome
        title="Berries"
        query={list.query}
        onQuery={list.setQuery}
        searchPlaceholder="Search ledger"
        filter={flowFilter}
        filterOptions={[
          { id: 'all', label: 'All' },
          { id: 'income', label: 'In' },
          { id: 'expense', label: 'Out' },
        ]}
        onFilter={setFlowFilter}
        refreshing={list.refreshing}
        onRefresh={() => list.reload(true)}
        loading={list.loading && !list.items.length}
        error={list.error}
        onRetry={() => list.reload()}
        emptyMessage="Pouch is empty."
        isEmpty={!list.items.length}
        onCreate={openCreate}
      >
        <View style={styles.summaryRow}>
          <StatTile
            compact
            label="Income"
            value={money(summary.income)}
            accent="straw"
            icon={<Ionicons name="trending-up-outline" size={12} color={colors.strawDeep} />}
          />
          <StatTile
            compact
            label="Spend"
            value={money(summary.spend)}
            accent="wanted"
            icon={<Ionicons name="trending-down-outline" size={12} color={colors.wanted} />}
          />
          <StatTile
            compact
            label="Net"
            value={money(summary.net)}
            accent={summary.net >= 0 ? 'foam' : 'wanted'}
            icon={<Ionicons name="scale-outline" size={12} color={summary.net >= 0 ? colors.seaMid : colors.wanted} />}
          />
        </View>

        <BerryCharts items={list.items} monthKey={month} />

        {visible.map((item) => (
          <BerryReceipt
            key={item.id}
            item={item}
            subtitle={subtitleFor(item)}
            onPress={() => openEdit(item)}
            onDelete={() => remove(item)}
          />
        ))}
      </ToolChrome>

      <SheetForm visible={open} title={editing ? 'Edit' : 'Log'} onClose={() => setOpen(false)}>
        <Text style={styles.repeatLabel}>Type</Text>
        <ChipRow
          options={[
            { id: 'expense', label: 'Expense' },
            { id: 'income', label: 'Income' },
          ]}
          value={flow}
          onChange={(id) => setFlow(id === 'income' ? 'income' : 'expense')}
        />
        <Field label="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" />
        <Field label="Title" value={title} onChangeText={setTitle} autoCapitalize="sentences" />
        <Field label="Category" value={category} onChangeText={setCategory} />
        <Field label="Date" value={date} onChangeText={setDate} placeholder="YYYY-MM-DD" />
        <Text style={styles.repeatLabel}>Repeats</Text>
        <ChipRow options={REPEAT_OPTIONS} value={repeat} onChange={setRepeat} />
        {repeat !== 'none' ? (
          <Text style={styles.repeatHint}>Auto-seals {repeat} after this date.</Text>
        ) : null}
        <Field label="Note" value={note} onChangeText={setNote} multiline autoCapitalize="sentences" />
        <Banner message={formError} />
        <PrimaryButton label={busy ? 'Saving…' : 'Save'} onPress={save} disabled={busy} />
      </SheetForm>
    </>
  );
}

const styles = StyleSheet.create({
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 6,
    marginBottom: 8,
  },
  receiptPress: { marginBottom: 2 },
  incomeRing: {
    padding: 2,
    backgroundColor: 'rgba(245,197,24,0.28)',
  },
  expenseRing: {},
  receiptPad: {
    gap: 8,
    overflow: 'hidden',
  },
  flowBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  flowBadgeText: {
    fontFamily: theme.fonts.bodyExtra,
    fontSize: 10,
    letterSpacing: 1.2,
  },
  receiptBody: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  receiptMain: { flex: 1, minWidth: 0 },
  receiptTitle: {
    fontFamily: theme.fonts.bodyExtra,
    color: colors.seaDeep,
    fontSize: 16,
  },
  receiptSub: {
    fontFamily: theme.fonts.body,
    color: colors.muted,
    fontSize: 12,
    marginTop: 3,
    lineHeight: 17,
  },
  amountCol: { alignItems: 'flex-end', gap: 6 },
  amount: {
    fontFamily: theme.fonts.bodyExtra,
    fontSize: 18,
  },
  amountMark: {
    width: 28,
    height: 28,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  repeatLabel: {
    fontFamily: theme.fonts.bodyExtra,
    color: colors.seaDeep,
    marginBottom: 6,
    marginTop: 4,
  },
  repeatHint: {
    fontFamily: theme.fonts.body,
    color: colors.muted,
    fontSize: 13,
    marginBottom: 8,
  },
});
