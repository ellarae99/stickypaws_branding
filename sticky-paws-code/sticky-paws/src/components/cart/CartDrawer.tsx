"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { formatPrice } from "@/lib/products";
import { ButtonLink } from "../ui";
import { CartLines, EmptyCart, FreeShippingMeter } from "./CartParts";
import { useCart } from "./CartProvider";

export function CartDrawer() {
  const { drawerOpen, closeDrawer, lines, count, subtotal } = useCart();
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);

  // close when the route changes (e.g. clicking a product in the drawer)
  const lastPath = useRef(pathname);
  useEffect(() => {
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      closeDrawer();
    }
  }, [pathname, closeDrawer]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeDrawer();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawerOpen, closeDrawer]);

  return (
    <AnimatePresence>
      {drawerOpen && (
        <div className="fixed inset-0 z-[60]">
          <motion.div
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            onClick={closeDrawer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            tabIndex={-1}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l-2 border-pink bg-ink-2 shadow-glow-pink outline-none"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
          >
            <header className="flex items-center justify-between border-b-2 border-ink-3 px-5 py-4">
              <h2 className="font-display text-xl uppercase">
                Your loot <span className="text-pink">({count})</span>
              </h2>
              <button
                onClick={closeDrawer}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-cream/20 text-xl transition hover:border-pink hover:text-pink"
                aria-label="Close bag"
              >
                ×
              </button>
            </header>

            {lines.length === 0 ? (
              <div className="flex-1 overflow-y-auto px-5">
                <EmptyCart onNavigate={closeDrawer} />
              </div>
            ) : (
              <>
                <div className="border-b-2 border-ink-3 px-5 py-4">
                  <FreeShippingMeter />
                </div>
                <div className="flex-1 overflow-y-auto px-5">
                  <CartLines onNavigate={closeDrawer} />
                </div>
                <footer className="space-y-3 border-t-2 border-ink-3 px-5 py-5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold uppercase tracking-wider text-muted">Subtotal</span>
                    <span className="font-display text-2xl">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="text-xs text-muted">Shipping and taxes calculated at checkout.</p>
                  <div className="grid grid-cols-2 gap-3">
                    <ButtonLink href="/cart" variant="outline" onClick={closeDrawer}>
                      View bag
                    </ButtonLink>
                    <ButtonLink href="/cart" variant="green" onClick={closeDrawer}>
                      Checkout
                    </ButtonLink>
                  </div>
                </footer>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
