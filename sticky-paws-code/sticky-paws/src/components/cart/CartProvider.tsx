"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { cartActions, getServerSnapshot, getSnapshot, subscribe } from "@/lib/cart-store";
import { getProduct, type Product } from "@/lib/products";

export const FREE_SHIPPING_CENTS = 4000;
export const SHIPPING_CENTS = 600;

type DetailedLine = { product: Product; qty: number; total: number };

type CartContextValue = {
  lines: DetailedLine[];
  count: number;
  subtotal: number;
  shipping: number;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    const lines = raw.map((l) => {
      const product = getProduct(l.slug)!;
      return { product, qty: l.qty, total: product.price * l.qty };
    });
    const subtotal = lines.reduce((s, l) => s + l.total, 0);
    return {
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal,
      shipping: subtotal === 0 || subtotal >= FREE_SHIPPING_CENTS ? 0 : SHIPPING_CENTS,
      drawerOpen,
      openDrawer,
      closeDrawer,
      ...cartActions,
    };
  }, [raw, drawerOpen, openDrawer, closeDrawer]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
