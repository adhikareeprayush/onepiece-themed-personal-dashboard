import { useCallback, useEffect, useMemo, useState } from 'react';
import { api, ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';

export function useApiList<T extends { id: string }>(path: string) {
  const { token } = useAuth();
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const load = useCallback(
    async (isRefresh = false) => {
      if (!token) {
        setItems([]);
        setLoading(false);
        setRefreshing(false);
        return;
      }
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);
      try {
        const data = await api<T[] | { items?: T[]; notes?: T[] }>(path, { token });
        let list: T[] = [];
        if (Array.isArray(data)) list = data;
        else if (data && typeof data === 'object') {
          const bag = data as any;
          if (Array.isArray(bag.items)) list = bag.items;
          else if (Array.isArray(bag.notes)) list = bag.notes;
          else if (Array.isArray(bag.results)) list = bag.results;
        }
        setItems(
          list.filter((item) => item && typeof item === 'object' && item.id != null).map((item) => ({
            ...item,
            id: String(item.id),
          })),
        );
      } catch (err: any) {
        setError(err instanceof ApiError ? err.message : err?.message || 'Request failed');
        if (!isRefresh) setItems([]);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [path, token],
  );

  useEffect(() => {
    load();
  }, [load]);

  const removeOptimistic = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => JSON.stringify(item).toLowerCase().includes(q));
  }, [items, query]);

  return {
    items,
    filtered,
    setItems,
    loading,
    refreshing,
    error,
    setError,
    query,
    setQuery,
    reload: load,
    removeOptimistic,
    token,
  };
}
