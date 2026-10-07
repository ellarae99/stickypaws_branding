import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/AddToCart";
import { StickerPerk } from "@/components/StickerPerk";
import { ProductArt } from "@/components/ProductArt";
import { ProductCard } from "@/components/ProductCard";
import { Badge, PawIcon, SectionHeading } from "@/components/ui";
import { accentStyles, categories, formatPrice, getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return { title: product.name, description: product.tagline };
}

const frame = {
  pink: "border-pink shadow-glow-pink",
  green: "border-green shadow-glow-green",
  purple: "border-purple shadow-glow-purple",
};

const tagAccent = { NEW: "green", BESTSELLER: "pink", SPICY: "pink", LIMITED: "purple", SOON: "green" } as const;

export default async function ProductPage({ params }: PageProps<"/shop/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const a = accentStyles[product.accent];
  const category = categories.find((c) => c.id === product.category)!;
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);
  const more = related.length ? related : products.filter((p) => p.featured && p.slug !== product.slug).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
        <Link href="/shop" className="hover:text-green">Shop</Link>
        <span className="mx-2">/</span>
        <Link href={`/shop?category=${category.id}`} className="hover:text-green">{category.label}</Link>
        <span className="mx-2">/</span>
        <span className="text-cream">{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        <div className="relative">
          {product.tag && (
            <Badge accent={tagAccent[product.tag]} className="absolute -left-2 -top-3 z-10 text-sm">
              {product.tag}
            </Badge>
          )}
          <div className={`group overflow-hidden rounded-3xl border-2 ${frame[product.accent]}`}>
            <ProductArt product={product} />
          </div>
          {product.photos && product.photos.length > 1 && (
            <div className="mt-6 grid grid-cols-2 gap-4">
              {product.photos.slice(1).map((photo) => (
                <a
                  key={photo.src}
                  href={photo.src}
                  target="_blank"
                  rel="noreferrer"
                  className="group block overflow-hidden rounded-2xl border-2 border-ink-3 hover:border-green"
                >
                  <Image
                    src={photo.src}
                    width={photo.width}
                    height={photo.height}
                    sizes="(min-width: 768px) 25vw, 50vw"
                    alt={photo.alt}
                    className="aspect-square h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </a>
              ))}
            </div>
          )}
          {product.packaging?.back && (
            <Image
              src={product.packaging.back.src}
              width={product.packaging.back.width}
              height={product.packaging.back.height}
              alt={product.packaging.back.alt}
              className="mt-6 h-auto w-full rounded-2xl border-2 border-ink-3"
            />
          )}
        </div>

        <div className="flex flex-col">
          <p className={`mb-2 text-sm font-bold uppercase tracking-[0.25em] ${a.text}`}>{category.label}</p>
          <h1 className="font-display text-4xl leading-none uppercase sm:text-5xl">{product.name}</h1>
          <p className="mt-3 text-lg text-cream/80">{product.tagline}</p>
          <p className={`mt-6 font-display text-4xl ${a.text} ${a.textGlow}`}>{formatPrice(product.price)}</p>

          <div className="mt-8">
            <AddToCart product={product} />
          </div>

          <p className="mt-8 leading-relaxed text-cream/90">{product.description}</p>

          <div className="mt-8">
            <h2 className="mb-3 font-display text-sm uppercase text-muted">Tasting notes</h2>
            <ul className="flex flex-wrap gap-2">
              {product.notes.map((n) => (
                <li key={n} className={`rounded-full border-2 px-3 py-1 text-sm font-bold ${a.border} ${a.text}`}>
                  {n}
                </li>
              ))}
            </ul>
          </div>

          <dl className="mt-8 divide-y divide-ink-3 border-y border-ink-3 text-sm">
            <div className="flex gap-4 py-3">
              <dt className="w-28 shrink-0 font-bold uppercase text-muted">Ingredients</dt>
              <dd>{product.ingredients}</dd>
            </div>
            <div className="flex gap-4 py-3">
              <dt className="w-28 shrink-0 font-bold uppercase text-muted">Weight</dt>
              <dd>{product.weight}</dd>
            </div>
            <div className="flex gap-4 py-3">
              <dt className="w-28 shrink-0 font-bold uppercase text-muted">Shipping</dt>
              <dd>Ships in 1–2 days in an insulated box. Free over $40.</dd>
            </div>
          </dl>

          <p className="mt-6 flex items-center gap-2 text-sm text-muted">
            <PawIcon className="h-4 w-4 text-green" /> Taste-tested and approved by Bandit.
          </p>
          {product.category !== "merch" && <StickerPerk className="mt-6" />}
        </div>
      </div>

      <section className="pt-24">
        <SectionHeading
          eyebrow={related.length ? "Same crime family" : "While you're here"}
          title="You might also steal"
          accent="green"
          className="mb-10"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {more.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
