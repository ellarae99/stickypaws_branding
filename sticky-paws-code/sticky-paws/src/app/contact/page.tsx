import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Raccoon } from "@/components/Raccoon";
import { SectionHeading } from "@/components/ui";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1fr_1.3fr]">
      <div>
        <SectionHeading eyebrow="Contact" title="Drop us a line" accent="purple" />
        <p className="mt-6 text-cream/80">
          Wholesale, events, custom orders, or just want to tell Bandit he&apos;s a good boy? We read everything.
        </p>
        <dl className="mt-8 space-y-4 text-sm">
          <div>
            <dt className="font-bold uppercase tracking-widest text-muted">Email</dt>
            <dd className="text-lg">hello@stickypaws.example</dd>
          </div>
          <div>
            <dt className="font-bold uppercase tracking-widest text-muted">Kitchen hours</dt>
            <dd className="text-lg">Tue–Sat, 10am–late</dd>
          </div>
        </dl>
        <Raccoon pose="prowl" className="mt-10 hidden w-52 -rotate-3 md:block" />
      </div>
      <ContactForm />
    </div>
  );
}
