"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return <p className="font-display text-sm uppercase text-green text-glow-green">You&apos;re in the gang. 🦝</p>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="flex overflow-hidden rounded-full border-2 border-cream/20 focus-within:border-pink"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="you@email.com"
        className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted"
      />
      <button className="bg-pink px-4 font-display text-xs uppercase text-ink transition hover:bg-green">Join</button>
    </form>
  );
}
