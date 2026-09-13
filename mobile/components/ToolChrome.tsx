import React from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { Banner, ChipRow, EmptyState, Loading, SeaScreen, SearchField } from '@/components/Ui';
import { IconButton, IconFab } from '@/components/IconButton';
import { ToolMasthead } from '@/components/OpArt';
import { colors } from '@/lib/theme';

export function ToolChrome({
  title,
  query,
  onQuery,
  searchPlaceholder,
  filter,
  filterOptions,
  onFilter,
  refreshing,
  onRefresh,
  loading,
  error,
  emptyMessage,
  isEmpty,
  onCreate,
  onRetry,
  children,
  data,
  keyExtractor,
  renderItem,
  safeTop = true,
}: {
  title: string;
  /** @deprecated ignored — keep screens quiet */
  subtitle?: string;
  query?: string;
  onQuery?: (v: string) => void;
  searchPlaceholder?: string;
  filter?: string;
  filterOptions?: { id: string; label: string }[];
  onFilter?: (id: string) => void;
  refreshing: boolean;
  onRefresh: () => void;
  loading: boolean;
  error?: string | null;
  emptyMessage: string;
  isEmpty: boolean;
  onCreate?: () => void;
  createLabel?: string;
  onRetry?: () => void;
  children?: React.ReactNode;
  data?: any[];
  keyExtractor?: (item: any, index: number) => string;
  renderItem?: ({ item, index }: { item: any; index: number }) => React.ReactElement | null;
  safeTop?: boolean;
}) {
  if (loading) return <Loading label="Loading…" />;

  const edges = safeTop
    ? (['top', 'left', 'right', 'bottom'] as const)
    : (['left', 'right', 'bottom'] as const);

  const header = (
    <View style={styles.header}>
      <ToolMasthead
        title={title}
        tint={colors.strawDeep}
        trailing={onCreate ? <IconFab onPress={onCreate} accessibilityLabel="Add" /> : null}
      />
      {onQuery ? (
        <SearchField value={query || ''} onChangeText={onQuery} placeholder={searchPlaceholder || 'Search'} />
      ) : null}
      {filterOptions && onFilter && filter != null ? (
        <ChipRow options={filterOptions} value={filter} onChange={onFilter} />
      ) : null}
      <Banner message={error} />
      {error && onRetry ? (
        <View style={styles.retryRow}>
          <IconButton name="refresh" accessibilityLabel="Retry" onPress={onRetry} solid />
        </View>
      ) : null}
    </View>
  );

  if (data && keyExtractor && renderItem) {
    return (
      <SeaScreen edges={[...edges]}>
        <FlatList
          style={styles.list}
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListHeaderComponent={header}
          ListEmptyComponent={
            isEmpty && !error ? (
              <EmptyState message={emptyMessage} actionLabel={onCreate ? 'Add' : undefined} onAction={onCreate} />
            ) : (
              <View style={{ height: 1 }} />
            )
          }
          contentContainerStyle={[styles.content, data.length === 0 && styles.contentEmpty]}
          keyboardShouldPersistTaps="handled"
          removeClippedSubviews={false}
          initialNumToRender={12}
          windowSize={8}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.strawDeep}
              colors={[colors.wanted, colors.strawDeep]}
            />
          }
        />
      </SeaScreen>
    );
  }

  return (
    <SeaScreen edges={[...edges]}>
      <FlatList
        style={styles.list}
        data={[]}
        keyExtractor={() => 'x'}
        renderItem={() => null}
        ListHeaderComponent={
          <>
            {header}
            {isEmpty && !error ? (
              <EmptyState message={emptyMessage} actionLabel={onCreate ? 'Add' : undefined} onAction={onCreate} />
            ) : (
              children
            )}
          </>
        }
        contentContainerStyle={[styles.content, styles.contentEmpty]}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.strawDeep}
            colors={[colors.wanted, colors.strawDeep]}
          />
        }
      />
    </SeaScreen>
  );
}

const styles = StyleSheet.create({
  list: { flex: 1 },
  header: { paddingBottom: 4 },
  retryRow: { marginBottom: 8 },
  content: { paddingTop: 8, paddingBottom: 120 },
  contentEmpty: { flexGrow: 1 },
});
