import type { Metadata } from "next";
import Image from "next/image";
import { ProductCard } from "@/components/ProductCard";
import { poses, Raccoon, type Pose } from "@/components/Raccoon";
import { Badge, Button, DripBorder, SectionHeading } from "@/components/ui";
import { products } from "@/lib/products";

export const metadata: Metadata = { title: "Style Guide" };

const swatches = [
  { name: "Night", hex: "#1C1C1C", cls: "bg-ink", role: "Base", dark: false },
  { name: "Hot Pink", hex: "#FF2E9A", cls: "bg-pink", role: "Primary action", dark: true },
  { name: "Slime", hex: "#CFFF04", cls: "bg-green", role: "Highlights / success", dark: true },
  { name: "Ultraviolet", hex: "#5D00FF", cls: "bg-purple", role: "Accent / story", dark: false },
];

export default function StyleGuide() {
  return (
    <div className="mx-auto max-w-6xl space-y-24 px-4 py-16 sm:px-6">
      <header>
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-green">Brand system v1</p>
        <h1>
          <Image src="/art/logo.svg" width={208} height={102} alt="Sticky Paws" priority className="h-auto w-72 sm:w-96" />
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-cream/80">
          Black does the heavy lifting. Neon is the punchline: used for actions, prices, and moments of mischief,
          never as wallpaper.
        </p>
      </header>

      <section>
        <SectionHeading eyebrow="01" title="Color" className="mb-8" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {swatches.map((s) => (
            <div key={s.name} className="overflow-hidden rounded-2xl border-2 border-ink-3">
              <div className={`flex h-32 items-end p-4 ${s.cls} ${s.dark ? "text-ink" : "text-cream"}`}>
                <span className="font-display uppercase">{s.name}</span>
              </div>
              <div className="flex justify-between bg-ink-2 p-4 text-sm">
                <span className="font-mono">{s.hex}</span>
                <span className="text-muted">{s.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="02" title="Type" accent="green" className="mb-8" />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border-2 border-ink-3 bg-ink-2 p-6">
            <p className="mb-2 text-sm text-muted">Display · Jost Bold (Futura look-alike)</p>
            <p className="font-display text-5xl uppercase">Aa Bb Cc</p>
            <p className="mt-3 font-display text-xl uppercase">Headlines, prices, buttons</p>
          </div>
          <div className="rounded-2xl border-2 border-ink-3 bg-ink-2 p-6">
            <p className="mb-2 text-sm text-muted">Body · Jost (Futura look-alike)</p>
            <p className="text-5xl">Aa Bb Cc</p>
            <p className="mt-3 text-lg">
              Everything you actually read: descriptions, UI copy, and the fine print about raccoons.
            </p>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="03" title="Mascot" accent="purple" className="mb-8" />
        <div className="grid grid-cols-2 gap-6 rounded-2xl border-2 border-ink-3 bg-ink-2 p-8 sm:grid-cols-4 lg:grid-cols-7">
          {(Object.keys(poses) as Pose[]).map((pose) => (
            <figure key={pose} className="flex flex-col items-center justify-end gap-2">
              <Raccoon pose={pose} className="w-full" />
              <figcaption className="font-mono text-xs text-muted">{pose}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-[2fr_1fr]">
          <div className="space-y-4 rounded-2xl border-2 border-ink-3 bg-ink-2 p-6">
            <p className="text-sm text-muted">Packaging</p>
            <Image src="/art/label-front.svg" width={462} height={162} alt="Trash Panda Truffles label, front" className="h-auto w-full" />
            <Image src="/art/label-back.svg" width={452} height={158} alt="Trash Panda Truffles label, back" className="h-auto w-full" />
          </div>
          <div className="flex items-end justify-center gap-4 rounded-2xl border-2 border-ink-3 bg-ink-2 p-6">
            <Image src="/art/wrapper-pirate.svg" width={96} height={192} alt="Asalto en Altamar bar wrapper" className="h-auto w-1/2" />
            <Image src="/art/logo-panel.svg" width={66} height={160} alt="Vertical logo panel" className="h-auto w-1/3" />
          </div>
        </div>
        <div className="mt-6 overflow-hidden rounded-2xl border-2 border-ink-3 bg-ink-2">
          <DripBorder />
          <div className="flex items-center justify-center p-6">
            <Image src="/art/paws.svg" width={252} height={158} alt="Paw prints" className="h-auto w-56" />
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="04" title="Components" className="mb-8" />
        <div className="space-y-8 rounded-2xl border-2 border-ink-3 bg-ink-2 p-8">
          <div className="flex flex-wrap gap-3">
            <Button>Add to bag</Button>
            <Button variant="green">Checkout</Button>
            <Button variant="purple">Read more</Button>
            <Button variant="outline">Secondary</Button>
            <Button disabled>Sold out</Button>
          </div>
          <div className="flex flex-wrap gap-4">
            <Badge accent="green">New</Badge>
            <Badge accent="pink">Bestseller</Badge>
            <Badge accent="purple">Limited</Badge>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {["asalto-en-altamar", "trash-panda-truffles", "sampler-stash", "sticker-pack"].map((slug) => (
              <ProductCard key={slug} product={products.find((p) => p.slug === slug)!} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
