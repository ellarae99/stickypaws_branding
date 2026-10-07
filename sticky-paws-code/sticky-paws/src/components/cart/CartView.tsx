"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/products";
import { Button } from "../ui";
import { CartLines, EmptyCart, FreeShippingMeter } from "./CartParts";
import { useCart } from "./CartProvider";

export function CartView() {
  const { lines, count, subtotal, shipping, clear } = useCart();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-green">Checkout</p>
      <h1 className="font-display text-4xl uppercase sm:text-6xl">
        Your bag {count > 0 && <span className="text-pink text-glow-pink">({count})</span>}
      </h1>

      {lines.length === 0 ? (
        <div className="mt-10 rounded-3xl border-2 border-ink-3 bg-ink-2">
          <EmptyCart />
        </div>
      ) : (
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1fr_380px]">
          <section className="rounded-3xl border-2 border-ink-3 bg-ink-2 px-5 sm:px-8">
            <CartLines size="lg" />
            <div className="flex justify-between border-t-2 border-ink-3 py-4 text-sm">
              <Link href="/shop" className="font-bold text-green hover:underline">
                ← Keep shopping
              </Link>
              <button onClick={clear} className="font-bold uppercase tracking-wider text-muted hover:text-pink">
                Empty bag
              </button>
            </div>
          </section>

          <aside className="space-y-5 rounded-3xl border-2 border-pink bg-ink-2 p-6 shadow-glow-pink lg:sticky lg:top-32">
            <h2 className="font-display text-xl uppercase">Order summary</h2>
            <FreeShippingMeter />
            <dl className="space-y-2 border-t-2 border-ink-3 pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Shipping</dt>
                <dd>{shipping === 0 ? <span className="font-bold text-green">FREE</span> : formatPrice(shipping)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Tax</dt>
                <dd className="text-muted">At checkout</dd>
              </div>
            </dl>
            <div className="flex items-baseline justify-between border-t-2 border-ink-3 pt-4">
              <span className="font-bold uppercase tracking-wider">Total</span>
              <span className="font-display text-3xl text-pink">{formatPrice(subtotal + shipping)}</span>
            </div>
            {/* TODO(phase 5): start a Stripe Checkout session */}
            <Button variant="green" className="w-full py-4" title="Stripe checkout is wired up in phase 5">
              Checkout securely
            </Button>
            <p className="text-center text-xs text-muted">Test mode. No real money moves, only chocolate feelings.</p>
          </aside>
        </div>
      )}
    </div>
  );
}
