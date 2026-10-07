import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Raccoon } from "@/components/Raccoon";
import { StickerPerk } from "@/components/StickerPerk";
import { categories, products, type Category } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
  description: "Chocolate bars, truffles, gift boxes, and merch from Sticky Paws.",
};

const sorts = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: low → high" },
  { id: "price-desc", label: "Price: high → low" },
  { id: "name", label: "A → Z" },
] as const;

type SortId = (typeof sorts)[number]["id"];

const activeChip = {
  pink: "bg-pink text-ink border-pink",
  green: "bg-green text-ink border-green",
  purple: "bg-purple text-cream border-purple",
};

function href(category: Category | undefined, sort: SortId) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (sort !== "featured") params.set("sort", sort);
  const qs = params.toString();
  return qs ? `/shop?${qs}` : "/shop";
}

export default async function ShopPage({ searchParams }: PageProps<"/shop">) {
  const sp = await searchParams;
  const category = categories.find((c) => c.id === sp.category)?.id;
  const sort: SortId = sorts.find((s) => s.id === sp.sort)?.id ?? "featured";

  let list = category ? products.filter((p) => p.category === category) : [...products];
  if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
  else if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
  else list = [...list.filter((p) => p.featured), ...list.filter((p) => !p.featured)];

  const current = categories.find((c) => c.id === category);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <header className="relative mb-10 overflow-hidden rounded-3xl border-2 border-ink-3 bg-ink-2 p-8 sm:p-12">
        <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-pink/20 blur-3xl" />
        <Raccoon pose="running" title="" className="absolute -bottom-2 right-6 hidden w-48 sm:block" />
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-green">The stash</p>
        <h1 className="font-display text-4xl uppercase sm:text-6xl">
          {current ? current.label : "Shop all"}
        </h1>
        <p className="mt-3 max-w-lg text-cream/80">
          {current
            ? `${current.blurb}. ${list.length} item${list.length === 1 ? "" : "s"} up for grabs.`
            : `Everything we've got, all ${products.length} pieces of it. Take what you want. We won't tell.`}
        </p>
      </header>

      {category === "bars" && <StickerPerk className="mb-8" />}

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <nav aria-label="Categories" className="flex flex-wrap gap-2">
          <Chip href={href(undefined, sort)} active={!category} activeClass={activeChip.pink}>
            All
          </Chip>
          {categories.map((c) => (
            <Chip key={c.id} href={href(c.id, sort)} active={category === c.id} activeClass={activeChip[c.accent]}>
              {c.label}
            </Chip>
          ))}
        </nav>

        <nav aria-label="Sort" className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted">Sort:</span>
          {sorts.map((s) => (
            <Link
              key={s.id}
              href={href(category, s.id)}
              aria-current={sort === s.id ? "true" : undefined}
              className={`rounded-full px-3 py-1 transition ${
                sort === s.id ? "bg-cream text-ink font-bold" : "text-cream/80 hover:text-green"
              }`}
            >
              {s.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}

function Chip({
  href,
  active,
  activeClass,
  children,
}: {
  href: string;
  active: boolean;
  activeClass: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`rounded-full border-2 px-4 py-2 font-display text-xs uppercase transition ${
        active ? `${activeClass} shadow-sticker` : "border-cream/20 text-cream hover:border-cream"
      }`}
    >
      {children}
    </Link>
  );
}
