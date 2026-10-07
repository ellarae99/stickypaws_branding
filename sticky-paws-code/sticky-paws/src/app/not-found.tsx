import { Raccoon } from "@/components/Raccoon";
import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center sm:px-6">
      <div className="relative">
        <p className="font-display text-[9rem] leading-none text-pink text-glow-pink sm:text-[12rem]">404</p>
        <Raccoon pose="trashcan" className="absolute -bottom-10 left-1/2 w-32 -translate-x-1/2 sm:w-40" />
      </div>
      <h1 className="mt-10 font-display text-3xl uppercase sm:text-4xl">This page got stolen</h1>
      <p className="mt-4 text-cream/80">
        We checked the trash cans, the truffle trays, and under the counter. Bandit swears he didn&apos;t take it.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/shop">Back to the shop</ButtonLink>
        <ButtonLink href="/" variant="outline">
          Home
        </ButtonLink>
      </div>
    </div>
  );
}
