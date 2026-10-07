// Tiny localStorage-backed store, read through useSyncExternalStore so the
// server render (empty cart) and the client hydrate without mismatches.
import { getProduct } from "./products";

export type CartLine = { slug: string; qty: number };

const KEY = "sticky-paws-cart";
export const MAX_QTY = 20;

const EMPTY: CartLine[] = [];
let lines: CartLine[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function sanitize(value: unknown): CartLine[] {
  if (!Array.isArray(value)) return EMPTY;
  return value
    .filter((l): l is CartLine => typeof l?.slug === "string" && Number.isInteger(l?.qty) && !!getProduct(l.slug) && !getProduct(l.slug)!.comingSoon)
    .map((l) => ({ slug: l.slug, qty: Math.min(MAX_QTY, Math.max(1, l.qty)) }));
}

function load() {
  if (loaded) return;
  loaded = true;
  try {
    const raw = localStorage.getItem(KEY);
    lines = raw ? sanitize(JSON.parse(raw)) : EMPTY;
  } catch {
    lines = EMPTY;
  }
}

function commit(next: CartLine[]) {
  lines = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // storage full or blocked; cart still works for this page view
  }
  listeners.forEach((l) => l());
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  // keep multiple tabs in sync
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return;
    loaded = false;
    load();
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function getSnapshot() {
  load();
  return lines;
}

export function getServerSnapshot() {
  return EMPTY;
}

export const cartActions = {
  add(slug: string, qty = 1) {
    load();
    const existing = lines.find((l) => l.slug === slug);
    commit(
      existing
        ? lines.map((l) => (l.slug === slug ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l))
        : [...lines, { slug, qty: Math.min(MAX_QTY, qty) }],
    );
  },
  setQty(slug: string, qty: number) {
    load();
    if (qty < 1) return cartActions.remove(slug);
    commit(lines.map((l) => (l.slug === slug ? { ...l, qty: Math.min(MAX_QTY, qty) } : l)));
  },
  remove(slug: string) {
    load();
    commit(lines.filter((l) => l.slug !== slug));
  },
  clear() {
    commit(EMPTY);
  },
};
