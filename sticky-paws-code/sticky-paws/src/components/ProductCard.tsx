import Link from "next/link";
import { accentStyles, formatPrice, type Product } from "@/lib/products";
import { ProductArt } from "./ProductArt";
import { Badge } from "./ui";

const tagAccent = { NEW: "green", BESTSELLER: "pink", SPICY: "pink", LIMITED: "purple", SOON: "green" } as const;

const hoverAccent = {
  pink: "hover:border-pink hover:shadow-glow-pink",
  green: "hover:border-green hover:shadow-glow-green",
  purple: "hover:border-purple hover:shadow-glow-purple",
};

export function ProductCard({ product }: { product: Product }) {
  const a = accentStyles[product.accent];
  return (
    <Link
      href={`/shop/${product.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border-2 border-ink-3 bg-ink-2 transition duration-300 hover:-translate-y-1 ${hoverAccent[product.accent]}`}
    >
      {product.tag && (
        <Badge accent={tagAccent[product.tag]} className="absolute left-3 top-3 z-10">
          {product.tag}
        </Badge>
      )}
      <ProductArt product={product} />
      <div className="flex flex-1 flex-col gap-1 border-t-2 border-ink-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg leading-tight uppercase">{product.name}</h3>
          <span className={`font-display text-lg ${a.text}`}>{formatPrice(product.price)}</span>
        </div>
        <p className="text-sm text-muted">{product.tagline}</p>
      </div>
    </Link>
  );
}
