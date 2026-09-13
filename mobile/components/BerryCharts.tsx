import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Muted, ParchmentCard } from '@/components/Ui';
import { money } from '@/lib/forms';
import { colors, theme } from '@/lib/theme';

export type BerryItem = {
  id: string;
  title: string;
  amount: number;
  flow: 'income' | 'expense' | string;
  category?: string;
  date?: string;
};

const CAT_COLORS = ['#c41e3a', '#0c3d87', '#e8a317', '#1f7a4c', '#9e1530', '#4aa3ff', '#5a4630'];

function dayKey(offsetFromToday: number) {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() + offsetFromToday);
  return d.toISOString().slice(0, 10);
}

function dayLabel(iso: string) {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString(undefined, { weekday: 'short' }).slice(0, 2);
}

function isIncome(item: BerryItem) {
  return item.flow === 'income';
}

export function BerryCharts({ items, monthKey }: { items: BerryItem[]; monthKey: string }) {
  const trend = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => dayKey(i - 6));
    const series = days.map((day) => {
      const dayItems = items.filter((item) => String(item.date || '') === day);
      const income = dayItems.filter(isIncome).reduce((s, i) => s + Number(i.amount || 0), 0);
      const expense = dayItems.filter((i) => !isIncome(i)).reduce((s, i) => s + Number(i.amount || 0), 0);
      return { day, income, expense };
    });
    const max = Math.max(1, ...series.flatMap((r) => [r.income, r.expense]));
    return { series, max };
  }, [items]);

  const categories = useMemo(() => {
    const monthSpend = items.filter(
      (i) => !isIncome(i) && String(i.date || '').startsWith(monthKey),
    );
    const totals = new Map<string, number>();
    for (const item of monthSpend) {
      const key = String(item.category || 'other').toLowerCase();
      totals.set(key, (totals.get(key) || 0) + Number(item.amount || 0));
    }
    const rows = [...totals.entries()]
      .map(([key, amount]) => ({ key, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 6);
    const total = rows.reduce((s, r) => s + r.amount, 0) || 1;
    return { rows, total };
  }, [items, monthKey]);

  return (
    <View style={styles.wrap}>
      <ParchmentCard entering={false} contentStyle={styles.cardPad}>
        <Text style={styles.title}>Last 7 days</Text>
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.swatch, { backgroundColor: colors.strawDeep }]} />
            <Text style={styles.legendText}>In</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.swatch, { backgroundColor: colors.wanted }]} />
            <Text style={styles.legendText}>Out</Text>
          </View>
        </View>

        <View style={styles.trendPlot}>
          {trend.series.map((row) => {
            const inH = Math.max(row.income ? 4 : 0, (row.income / trend.max) * 110);
            const outH = Math.max(row.expense ? 4 : 0, (row.expense / trend.max) * 110);
            return (
              <View key={row.day} style={styles.dayCol}>
                <View style={styles.bars}>
                  <View style={[styles.bar, styles.barIn, { height: inH }]} />
                  <View style={[styles.bar, styles.barOut, { height: outH }]} />
                </View>
                <Text style={styles.dayLabel}>{dayLabel(row.day)}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.baseline} />
      </ParchmentCard>

      <ParchmentCard entering={false} contentStyle={styles.cardPad}>
        <Text style={styles.title}>Spend by category</Text>
        {!categories.rows.length ? (
          <Muted>No outflows this month.</Muted>
        ) : (
          <View style={styles.catList}>
            {categories.rows.map((row, index) => {
              const pct = Math.round((row.amount / categories.total) * 100);
              const color = CAT_COLORS[index % CAT_COLORS.length];
              return (
                <View key={row.key} style={styles.catRow}>
                  <View style={styles.catHead}>
                    <Text style={styles.catName} numberOfLines={1}>
                      {row.key}
                    </Text>
                    <Text style={styles.catAmt}>
                      {money(row.amount)} · {pct}%
                    </Text>
                  </View>
                  <View style={styles.catTrack}>
                    <View style={[styles.catFill, { width: `${Math.max(pct, 3)}%`, backgroundColor: color }]} />
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </ParchmentCard>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 4 },
  cardPad: { paddingVertical: 12, paddingHorizontal: 12 },
  title: {
    fontFamily: theme.fonts.pirate,
    fontSize: 22,
    color: colors.seaDeep,
    marginBottom: 8,
  },
  legend: { flexDirection: 'row', gap: 14, marginBottom: 10 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  swatch: { width: 12, height: 12, borderRadius: 3, borderWidth: 1.5, borderColor: colors.edge },
  legendText: { fontFamily: theme.fonts.bodyExtra, fontSize: 12, color: colors.muted },
  trendPlot: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 132,
    gap: 4,
    paddingHorizontal: 2,
  },
  dayCol: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' },
  bars: { flexDirection: 'row', alignItems: 'flex-end', gap: 3, height: 110 },
  bar: { width: 8, borderRadius: 3, borderWidth: 1, borderColor: 'rgba(26,16,8,0.25)', minHeight: 0 },
  barIn: { backgroundColor: colors.straw },
  barOut: { backgroundColor: colors.wanted },
  dayLabel: {
    marginTop: 6,
    fontFamily: theme.fonts.bodyExtra,
    fontSize: 10,
    color: colors.muted,
  },
  baseline: {
    height: 2,
    backgroundColor: 'rgba(26,16,8,0.18)',
    marginTop: -18,
    marginBottom: 14,
    zIndex: -1,
  },
  catList: { gap: 10, marginTop: 4 },
  catRow: { gap: 4 },
  catHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  catName: {
    flex: 1,
    fontFamily: theme.fonts.bodyExtra,
    fontSize: 13,
    color: colors.seaDeep,
    textTransform: 'capitalize',
  },
  catAmt: { fontFamily: theme.fonts.body, fontSize: 12, color: colors.muted },
  catTrack: {
    height: 10,
    borderRadius: 6,
    backgroundColor: 'rgba(26,16,8,0.08)',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(26,16,8,0.12)',
  },
  catFill: { height: '100%', borderRadius: 6 },
});
