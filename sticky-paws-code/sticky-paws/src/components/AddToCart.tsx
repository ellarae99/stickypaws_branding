"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "./cart/CartProvider";
import { Button } from "./ui";

const variant = { pink: "pink", green: "green", purple: "purple" } as const;

export function AddToCart({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const { add, openDrawer } = useCart();

  function handleAdd() {
    add(product.slug, qty);
    setQty(1);
    openDrawer();
  }

  if (product.comingSoon) {
    return (
      <Button variant={variant[product.accent]} disabled className="min-w-52 py-3.5">
        Coming soon
      </Button>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center rounded-full border-2 border-cream/20">
        <button
          className="h-12 w-12 text-xl transition hover:text-pink disabled:opacity-30"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          disabled={qty <= 1}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="w-8 text-center font-display" aria-live="polite">
          {qty}
        </span>
        <button
          className="h-12 w-12 text-xl transition hover:text-green disabled:opacity-30"
          onClick={() => setQty((q) => Math.min(20, q + 1))}
          disabled={qty >= 20}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <Button variant={variant[product.accent]} onClick={handleAdd} className="min-w-52 py-3.5">
        Add to bag
      </Button>
    </div>
  );
}
