import type { Metadata } from "next";
import Image from "next/image";
import { Raccoon } from "@/components/Raccoon";
import { ButtonLink, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Our Story",
  description: "How a raccoon named Bandit broke into our kitchen and became the face of Sticky Paws.",
};

const timeline = [
  { when: "2 a.m.", title: "The break-in", text: "A tray of cooling truffles. An open window. A very small, very masked intruder." },
  { when: "2:15 a.m.", title: "The evidence", text: "Chocolate paw prints across the counter, up the wall, and into the flour bin." },
  { when: "Morning", title: "The standoff", text: "We found him asleep in the truffle tray. He did not look sorry." },
  { when: "Today", title: "The job offer", text: "Bandit is now Head of Quality Control. He's paid in rejects." },
];

const values = [
  {
    title: "Small batches",
    text: "Every bar is made by hand in runs of a few hundred. When it's gone, it's gone. That's how heists work.",
    accent: "border-pink text-pink",
  },
  {
    title: "Good cacao",
    text: "We buy directly from farming co-ops and pay above fair-trade prices. The only thing we steal is the spotlight.",
    accent: "border-green text-green",
  },
  {
    title: "Loud flavors",
    text: "Sea salt caramel, a slow chili burn, and kitchen-sink crunch. If a flavor makes you say \"wait, what?\", we're interested.",
    accent: "border-purple text-purple-light",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-10 h-96 w-96 -translate-x-1/2 rounded-full bg-purple/25 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <h1 className="font-display text-5xl leading-[0.95] uppercase text-green text-glow-green sm:text-7xl">Our story</h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-cream/80">
            Sticky Paws Chocolate Company is a woman- and nonbinary-owned chocolate company serving up quality chocolate, deliciously feral flavors, and packaging that’s almost too good to eat. Inspired by our resident trash panda, Sticky Paws is here to prove that doing good doesn’t have to be boring—and chocolate definitely shouldn’t be.
          </p>
          <Image src="/art/paws.svg" width={252} height={158} alt="" className="mx-auto mt-10 h-auto w-44 -rotate-6 sm:w-56" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6">
        <h2 className="mb-14 text-center font-display text-4xl leading-[0.95] uppercase sm:text-6xl">
          It started with a <span className="text-purple-light text-glow-purple">break-in.</span>
        </h2>
        <div className="grid items-center gap-12 md:grid-cols-[auto_1fr]">
          {/* wanted poster */}
          <div className="mx-auto w-72 -rotate-3 rounded-sm border-2 border-ink bg-cream p-5 text-ink shadow-[8px_8px_0_0_var(--color-pink)]">
            <p className="text-center font-display text-4xl uppercase">Wanted</p>
            <div className="my-3 border-2 border-ink bg-ink-3 p-3">
              <Raccoon className="w-full" />
            </div>
            <p className="text-center font-display text-2xl uppercase">Bandit</p>
            <p className="mt-1 text-center text-sm font-bold">For crimes against truffles</p>
            <p className="mt-3 border-t-2 border-dashed border-ink pt-2 text-center font-display text-lg">
              Reward: 1 Chocolate Bar
            </p>
          </div>

          <ol className="relative space-y-8 border-l-2 border-ink-3 pl-8">
            {timeline.map((t, i) => (
              <li key={t.title} className="relative">
                <span
                  className={`absolute -left-[2.6rem] top-1 h-5 w-5 rounded-full border-2 border-ink ${
                    ["bg-pink", "bg-green", "bg-purple", "bg-pink"][i]
                  }`}
                />
                <p className="text-sm font-bold uppercase tracking-widest text-muted">{t.when}</p>
                <h3 className="font-display text-2xl uppercase">{t.title}</h3>
                <p className="mt-1 text-cream/80">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
        <SectionHeading eyebrow="What we stand for" title="The code of the paws" className="mb-10" />
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className={`rounded-2xl border-2 bg-ink-2 p-6 ${v.accent.split(" ")[0]}`}>
              <h3 className={`font-display text-xl uppercase ${v.accent.split(" ")[1]}`}>{v.title}</h3>
              <p className="mt-3 text-cream/80">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border-2 border-pink bg-ink-2 p-8 shadow-glow-pink sm:p-14">
          <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
            <div>
              <SectionHeading eyebrow="10% for the animals" title={<>Sweet treats.<br />Bigger purpose.</>} />
              <div className="mt-6 max-w-xl space-y-4 text-lg text-cream/90">
                <p>
                  Inspired by our sticky-fingered raccoon mascot, 10% of our net proceeds support animal rescue and
                  efforts to develop alternatives to animal testing.
                </p>
                <p>Our goal? To help make animal testing extinct—one chocolate bar at a time.</p>
                <p className="font-display text-xl uppercase text-green">
                  Sticky Paws: wildly delicious, ethically sourced, and proudly feral.
                </p>
              </div>
            </div>
            <Raccoon pose="love" title="" className="mx-auto w-40 md:w-52" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-24 text-center sm:px-6">
        <h2 className="font-display text-3xl uppercase sm:text-5xl">Ready to commit a crime?</h2>
        <ButtonLink href="/shop" variant="green" className="mt-8">
          Raid the shop
        </ButtonLink>
      </section>
    </>
  );
}
