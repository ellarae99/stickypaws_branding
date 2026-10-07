import Link from "next/link";
import { HeroRaccoon } from "@/components/HeroRaccoon";
import { ProductCard } from "@/components/ProductCard";
import { Raccoon } from "@/components/Raccoon";
import { ButtonLink, SectionHeading } from "@/components/ui";
import { categories, products } from "@/lib/products";

const tileStyles = {
  pink: "bg-pink text-ink hover:shadow-glow-pink",
  green: "bg-green text-ink hover:shadow-glow-green",
  purple: "bg-purple text-cream hover:shadow-glow-purple",
};

export default function Home() {
  const featured = products.filter((p) => p.featured);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-pink/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-green/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <div>
            <h1 className="font-display text-5xl leading-[0.95] uppercase sm:text-7xl">
              Chocolate
              <br />
              <span className="text-pink text-glow-pink">worth</span>
              <br />
              stealing.
            </h1>
            <p className="mt-6 max-w-md text-lg text-cream/80">
              Loud bars and truffles, made in tiny batches and guarded (poorly) by a raccoon with sticky paws.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/shop">Shop the stash</ButtonLink>
              <ButtonLink href="/about" variant="outline">
                Meet the bandit
              </ButtonLink>
            </div>
          </div>
          <HeroRaccoon />
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Fresh loot" title="Most wanted" />
          <Link href="/shop" className="font-bold uppercase tracking-wider text-green hover:underline">
            See everything →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.slice(0, 4).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
        <SectionHeading eyebrow="Pick your poison" title="Raid by category" accent="green" className="mb-10" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {categories.map((c, i) => (
            <Link
              key={c.id}
              href={`/shop?category=${c.id}`}
              className={`group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-2xl border-2 border-ink p-5 shadow-sticker transition hover:-translate-y-1 ${tileStyles[c.accent]} ${i % 2 ? "rotate-1" : "-rotate-1"}`}
            >
              <div>
                <span className="font-display text-2xl leading-none uppercase sm:text-3xl">{c.label}</span>
                <span className="mt-2 block text-sm font-bold">{c.blurb} →</span>
              </div>
              <Raccoon pose={c.pose} title="" className="-mb-2 -mr-2 w-3/4 self-end drop-shadow-[4px_4px_0_var(--color-ink)] transition duration-300 group-hover:-translate-x-2 group-hover:-translate-y-2 group-hover:rotate-6" />
            </Link>
          ))}
        </div>
      </section>

      {/* STORY TEASER */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border-2 border-purple bg-ink-2 p-8 shadow-glow-purple sm:p-14">
          <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
            <div>
              <SectionHeading eyebrow="Our story" title={<>Proudly<br />feral.</>} accent="purple" />
              <p className="mt-6 max-w-xl text-cream/80">
                Sticky Paws Chocolate Company is a woman- and nonbinary-owned chocolate company serving up quality chocolate, deliciously feral flavors, and packaging that’s almost too good to eat. Inspired by our resident trash panda, Sticky Paws is here to prove that doing good doesn’t have to be boring—and chocolate definitely shouldn’t be.
              </p>
              <ButtonLink href="/about" variant="purple" className="mt-8">
                Read the rap sheet
              </ButtonLink>
            </div>
            <div className="hidden rotate-6 rounded-2xl border-2 border-ink bg-cream p-4 pb-10 shadow-sticker md:block">
              <div className="flex h-48 w-48 items-center justify-center bg-ink-3 p-4">
                <Raccoon className="w-full" />
              </div>
              <p className="mt-3 text-center font-display text-sm uppercase text-ink">Wanted: Bandit</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
