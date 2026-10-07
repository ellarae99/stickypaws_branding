import Image from "next/image";
import type { Product } from "@/lib/products";
import { Raccoon } from "./Raccoon";

// Product photo when there is one, then real packaging art, otherwise the product's Bandit sticker.
const glow = {
  pink: "from-pink/35",
  green: "from-green/25",
  purple: "from-purple/60",
};

const tilt = ["-rotate-6", "rotate-3", "-rotate-2", "rotate-6"];

export function ProductArt({ product, className = "" }: { product: Product; className?: string }) {
  const photo = product.photos?.[0];
  if (photo) {
    return (
      <div className={`relative aspect-square overflow-hidden bg-ink-2 ${className}`}>
        <Image
          src={photo.src}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          alt={photo.alt}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    );
  }

  const t = tilt[product.slug.length % tilt.length];
  const pack = product.packaging?.front;
  const hover = "transition-transform duration-300 group-hover:rotate-0 group-hover:scale-105";
  return (
    <div
      className={`relative flex aspect-square items-center justify-center overflow-hidden bg-ink-2 bg-radial ${glow[product.accent]} to-transparent to-70% ${className}`}
    >
      {pack ? (
        <Image
          src={pack.src}
          width={pack.width}
          height={pack.height}
          alt={pack.alt}
          className={`${pack.width > pack.height ? "h-auto w-[92%]" : "h-[84%] w-auto"} ${t} rounded-sm shadow-[0_10px_0_rgb(0_0_0/0.45)] ${hover}`}
        />
      ) : (
        <Raccoon
          pose={product.pose}
          title=""
          className={`w-[68%] ${t} drop-shadow-[0_8px_0_rgb(0_0_0/0.45)] ${hover}`}
        />
      )}
    </div>
  );
}
