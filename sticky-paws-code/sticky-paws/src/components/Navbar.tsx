"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useCart } from "./cart/CartProvider";
import { Raccoon } from "./Raccoon";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=bars", label: "Bars" },
  { href: "/shop?category=truffles", label: "Truffles" },
  { href: "/about", label: "Our Story" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { count: cartCount, openDrawer } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink-3 bg-ink/85 backdrop-blur-md">
      <div className="bg-pink py-1.5 text-center text-xs font-bold uppercase tracking-widest text-ink">
        Free shipping on hauls over $40 · We promise we didn&apos;t steal it
      </div>
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Logo />

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`text-sm font-bold uppercase tracking-wider transition hover:text-green ${
                  pathname === l.href ? "text-green" : "text-cream"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={openDrawer}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border-2 border-cream/20 transition hover:border-pink hover:text-pink"
            aria-label={`Open bag, ${cartCount} items`}
          >
            <BagIcon className="h-5 w-5" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.4 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-ink bg-green px-1 text-[0.65rem] font-bold text-ink"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-cream/20 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Menu"
          >
            <span className="relative block h-3 w-5">
              <span className={`absolute left-0 h-0.5 w-5 bg-cream transition ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-0.5 w-5 bg-cream transition ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <ul className="border-t-2 border-ink-3 px-4 pb-4 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-ink-3 py-3 font-display text-lg uppercase hover:text-green"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2" aria-label="Sticky Paws home">
      <Raccoon className="w-11 transition group-hover:animate-wiggle" title="" />
      <Image src="/art/logo.svg" width={208} height={102} alt="" priority className="h-auto w-24 sm:w-28" />
    </Link>
  );
}

function BagIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 8h14l-1 13H6L5 8Z" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" strokeLinecap="round" />
    </svg>
  );
}
