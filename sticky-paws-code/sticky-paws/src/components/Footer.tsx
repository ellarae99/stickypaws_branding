import Link from "next/link";
import { Logo } from "./Navbar";
import { NewsletterForm } from "./NewsletterForm";
import { DripBorder } from "./ui";

const columns = [
  {
    title: "Shop",
    links: [
      { href: "/shop?category=bars", label: "Bars" },
      { href: "/shop?category=truffles", label: "Truffles" },
      { href: "/shop?category=boxes", label: "Gift Boxes" },
      { href: "/shop?category=merch", label: "Merch" },
    ],
  },
  {
    title: "Info",
    links: [
      { href: "/about", label: "Our Story" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
      { href: "/styleguide", label: "Style Guide" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 bg-ink-2">
      <DripBorder />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1.6fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm text-muted">
            Small-batch chocolate, made loud. Hand-crafted by humans, taste-tested by a raccoon who won&apos;t leave.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="mb-4 font-display text-sm uppercase text-green">{col.title}</h3>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-cream/80 transition hover:text-pink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h3 className="mb-4 font-display text-sm uppercase text-purple-light">Join the Gang</h3>
          <p className="mb-3 text-sm text-muted">Drops, restocks, and the occasional stolen recipe.</p>
          <NewsletterForm />
        </div>
      </div>
      <div className="border-t border-ink-3 px-4 py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} Sticky Paws Chocolate Co. A graphic design project. No raccoons were harmed.
      </div>
    </footer>
  );
}
