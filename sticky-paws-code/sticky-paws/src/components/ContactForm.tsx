"use client";

import { useState } from "react";
import { Button } from "./ui";

const field =
  "w-full rounded-xl border-2 border-cream/20 bg-ink px-4 py-3 outline-none transition placeholder:text-muted focus:border-pink";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-green bg-ink-2 p-10 text-center shadow-glow-green">
        <p className="font-display text-3xl uppercase text-green">Message received</p>
        <p className="mt-3 text-cream/80">We&apos;ll get back to you within a day or two. Bandit says hi.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-5 rounded-3xl border-2 border-ink-3 bg-ink-2 p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm font-bold uppercase tracking-wider">Name</span>
          <input required name="name" className={field} placeholder="Your name" />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-bold uppercase tracking-wider">Email</span>
          <input required type="email" name="email" className={field} placeholder="you@email.com" />
        </label>
      </div>
      <label className="block space-y-2">
        <span className="text-sm font-bold uppercase tracking-wider">Topic</span>
        <select name="topic" className={field} defaultValue="order">
          <option value="order">An order</option>
          <option value="wholesale">Wholesale</option>
          <option value="custom">Custom / events</option>
          <option value="other">Something else</option>
        </select>
      </label>
      <label className="block space-y-2">
        <span className="text-sm font-bold uppercase tracking-wider">Message</span>
        <textarea required name="message" rows={5} className={field} placeholder="Spill it." />
      </label>
      <Button type="submit" className="w-full sm:w-auto">
        Send it
      </Button>
    </form>
  );
}
