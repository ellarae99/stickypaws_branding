import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import type { Accent } from "@/lib/products";

type Variant = "pink" | "green" | "purple" | "outline";

const variantClasses: Record<Variant, string> = {
  pink: "bg-pink text-ink hover:shadow-glow-pink",
  green: "bg-green text-ink hover:shadow-glow-green",
  purple: "bg-purple text-cream hover:shadow-glow-purple",
  outline: "bg-transparent text-cream border-cream hover:border-green hover:text-green",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink px-6 py-3 font-display text-sm uppercase tracking-wide transition duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50";

export function Button({
  variant = "pink",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return <button className={`${base} ${variantClasses[variant]} ${className}`} {...props} />;
}

export function ButtonLink({
  variant = "pink",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={`${base} ${variantClasses[variant]} ${className}`} {...props} />;
}

const badgeClasses: Record<Accent, string> = {
  pink: "bg-pink text-ink",
  green: "bg-green text-ink",
  purple: "bg-purple text-cream",
};

export function Badge({
  children,
  accent = "green",
  className = "",
}: {
  children: ReactNode;
  accent?: Accent;
  className?: string;
}) {
  return (
    <span
      className={`inline-block -rotate-3 rounded-md border-2 border-ink px-2 py-0.5 font-display text-[0.7rem] uppercase shadow-sticker ${badgeClasses[accent]} ${className}`}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent = "pink",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  accent?: Accent;
  className?: string;
}) {
  const eyebrowColor = { pink: "text-pink", green: "text-green", purple: "text-purple-light" }[accent];
  return (
    <div className={className}>
      {eyebrow && (
        <p className={`mb-2 font-sans text-sm font-bold uppercase tracking-[0.25em] ${eyebrowColor}`}>{eyebrow}</p>
      )}
      <h2 className="font-display text-3xl leading-none uppercase sm:text-5xl">{title}</h2>
    </div>
  );
}

export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const row = [...items, ...items];
  return (
    <div className={`overflow-hidden border-y-2 border-ink ${className}`} aria-hidden>
      <div className="flex w-max animate-marquee gap-8 py-3">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8 font-display text-lg uppercase whitespace-nowrap">
            {item}
            <PawIcon className="h-5 w-5" />
          </span>
        ))}
      </div>
    </div>
  );
}

// Slime drip with paw prints, tiled from the brand sheet. Hangs down from whatever sits above it.
export function DripBorder({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`h-10 bg-[url(/art/drip-border.svg)] bg-size-[auto_100%] bg-repeat-x sm:h-14 ${className}`}
    />
  );
}

export function PawIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <ellipse cx="12" cy="16" rx="5.5" ry="4.5" />
      <ellipse cx="5" cy="10" rx="2.2" ry="2.8" />
      <ellipse cx="9.3" cy="6" rx="2.2" ry="2.8" />
      <ellipse cx="14.7" cy="6" rx="2.2" ry="2.8" />
      <ellipse cx="19" cy="10" rx="2.2" ry="2.8" />
    </svg>
  );
}
