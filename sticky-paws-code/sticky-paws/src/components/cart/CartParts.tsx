"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { MAX_QTY } from "@/lib/cart-store";
import { accentStyles, formatPrice } from "@/lib/products";
import { ProductArt } from "../ProductArt";
import { Raccoon } from "../Raccoon";
import { ButtonLink } from "../ui";
import { FREE_SHIPPING_CENTS, useCart } from "./CartProvider";

export function CartLines({ onNavigate, size = "sm" }: { onNavigate?: () => void; size?: "sm" | "lg" }) {
  const { lines, setQty, remove } = useCart();
  const thumb = size === "lg" ? "w-28 sm:w-32" : "w-20";

  return (
    <ul className="divide-y divide-ink-3">
      <AnimatePresence initial={false}>
        {lines.map(({ product, qty, total }) => (
          <motion.li
            key={product.slug}
            layout
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24, height: 0, paddingTop: 0, paddingBottom: 0 }}
            className="flex gap-4 overflow-hidden py-4"
          >
            <Link
              href={`/shop/${product.slug}`}
              onClick={onNavigate}
              className={`${thumb} shrink-0 overflow-hidden rounded-xl border-2 border-ink-3`}
            >
              <ProductArt product={product} />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <Link
                    href={`/shop/${product.slug}`}
                    onClick={onNavigate}
                    className={`font-display leading-tight uppercase hover:underline ${size === "lg" ? "text-lg" : "text-sm"}`}
                  >
                    {product.name}
                  </Link>
                  <p className="text-xs text-muted">{formatPrice(product.price)} each</p>
                </div>
                <span className={`font-display ${accentStyles[product.accent].text}`}>{formatPrice(total)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center rounded-full border-2 border-cream/20 text-sm">
                  <button
                    className="h-8 w-8 transition hover:text-pink"
                    onClick={() => setQty(product.slug, qty - 1)}
                    aria-label={`Decrease ${product.name} quantity`}
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-bold">{qty}</span>
                  <button
                    className="h-8 w-8 transition hover:text-green disabled:opacity-30"
                    onClick={() => setQty(product.slug, qty + 1)}
                    disabled={qty >= MAX_QTY}
                    aria-label={`Increase ${product.name} quantity`}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => remove(product.slug)}
                  className="text-xs font-bold uppercase tracking-wider text-muted transition hover:text-pink"
                >
                  Remove
                </button>
              </div>
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}

export function FreeShippingMeter() {
  const { subtotal } = useCart();
  const remaining = FREE_SHIPPING_CENTS - subtotal;
  const pct = Math.min(100, (subtotal / FREE_SHIPPING_CENTS) * 100);

  return (
    <div>
      <p className="mb-2 text-sm">
        {remaining > 0 ? (
          <>
            You&apos;re <span className="font-bold text-pink">{formatPrice(remaining)}</span> away from free shipping
          </>
        ) : (
          <span className="font-bold text-green">Free shipping unlocked! 🦝</span>
        )}
      </p>
      <div className="h-2.5 overflow-hidden rounded-full bg-ink-3">
        <motion.div
          className={`h-full rounded-full ${remaining > 0 ? "bg-pink shadow-glow-pink" : "bg-green shadow-glow-green"}`}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  );
}

export function EmptyCart({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex flex-col items-center py-10 text-center">
      <Raccoon pose="shook" className="w-36" />
      <p className="mt-4 font-display text-2xl uppercase">Your bag is empty</p>
      <p className="mt-2 max-w-xs text-sm text-muted">Someone ate everything. We have a suspect.</p>
      <ButtonLink href="/shop" onClick={onNavigate} className="mt-6">
        Go find loot
      </ButtonLink>
    </div>
  );
}
