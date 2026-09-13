export function parseTags(raw: string): string[] {
  return [
    ...new Set(
      String(raw || '')
        .split(',')
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean),
    ),
  ].slice(0, 12);
}

export function formatTags(tags?: string[]): string {
  return (tags || []).join(', ');
}

export function todayDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export function defaultDueLocal(): string {
  const date = new Date(Date.now() + 60 * 60 * 1000);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function toLocalInput(iso?: string): string {
  if (!iso) return defaultDueLocal();
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return defaultDueLocal();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function money(value: number): string {
  const n = Number(value) || 0;
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

export function matchesQuery(haystack: Array<string | undefined | null>, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return haystack.some((part) => String(part || '').toLowerCase().includes(q));
}

export function currentMonthKey(): string {
  return new Date().toISOString().slice(0, 7);
}
