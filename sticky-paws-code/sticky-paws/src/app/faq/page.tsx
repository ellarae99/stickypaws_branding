import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui";

export const metadata: Metadata = { title: "FAQ" };

const faqs = [
  {
    q: "How long does shipping take?",
    a: "Orders ship within 1–2 business days and usually arrive 2–5 days later. Shipping is free on orders over $40.",
  },
  {
    q: "Will my chocolate melt?",
    a: "Not on our watch. Every order ships in an insulated box, with cold packs added automatically from May to September.",
  },
  {
    q: "Are your products vegan or allergen-free?",
    a: "Not currently. Our chocolate contains milk, and everything is made in a kitchen that handles milk, nuts, wheat, and soy. Every product page lists its full ingredients.",
  },
  {
    q: "How long does the chocolate last?",
    a: "Bars stay at their best for about 9 months. Truffles are fresh-made and best within 3 weeks. Keep them somewhere cool and dry (and raccoon-proof).",
  },
  {
    q: "Is Bandit a real raccoon?",
    a: "He's real in our hearts. Legally, we're told we can't comment.",
  },
  {
    q: "Do I get stickers?",
    a: "Yes! Every chocolate purchase comes with Bandit stickers, so you can take him on your own adventures.",
  },
  {
    q: "Can I return an order?",
    a: "Food can't be returned, but if something arrives damaged or wrong, email us within 7 days and we'll make it right.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <SectionHeading eyebrow="Help" title="Questions, answered" accent="green" />
      <div className="mt-10 space-y-3">
        {faqs.map((f) => (
          <details
            key={f.q}
            className="group rounded-2xl border-2 border-ink-3 bg-ink-2 open:border-pink [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-bold">
              {f.q}
              <span className="font-display text-2xl text-pink transition group-open:rotate-45">+</span>
            </summary>
            <p className="px-5 pb-5 text-cream/80">{f.a}</p>
          </details>
        ))}
      </div>
      <p className="mt-10 text-cream/80">
        Still stuck?{" "}
        <Link href="/contact" className="font-bold text-green hover:underline">
          Send us a message
        </Link>
        .
      </p>
    </div>
  );
}
