import { Raccoon } from "./Raccoon";

export function StickerPerk({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 rounded-2xl border-2 border-green/60 bg-ink-2 p-4 ${className}`}>
      <Raccoon pose="backpack" title="" className="w-14 shrink-0 -rotate-6" />
      <p className="text-sm">
        <span className="font-display uppercase text-green">Free stickers inside.</span>{" "}
        Every chocolate purchase comes with Bandit stickers, so you can take him on your own adventures.
      </p>
    </div>
  );
}
