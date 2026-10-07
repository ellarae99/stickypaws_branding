import type { Pose } from "@/components/Raccoon";

export type Category = "bars" | "truffles" | "boxes" | "merch";
export type Accent = "pink" | "green" | "purple";

export type PackagingArt = { src: string; width: number; height: number; alt: string };

export type Product = {
  slug: string;
  name: string;
  category: Category;
  price: number; // cents
  tagline: string;
  description: string;
  notes: string[];
  ingredients: string;
  weight: string;
  accent: Accent;
  pose: Pose; // Bandit artwork shown on the product
  packaging?: { front: PackagingArt; back?: PackagingArt }; // real package art replaces the sticker when present
  photos?: PackagingArt[]; // product photography; the first one is the card image, and it wins over packaging
  tag?: "NEW" | "BESTSELLER" | "SPICY" | "LIMITED" | "SOON";
  featured?: boolean;
  comingSoon?: boolean; // listed but can't be added to the bag yet
};

export const categories: { id: Category; label: string; blurb: string; accent: Accent; pose: Pose }[] = [
  { id: "bars", pose: "snack", label: "Bars", blurb: "Snap-worthy slabs", accent: "pink" },
  { id: "truffles", pose: "king", label: "Truffles", blurb: "Little round crimes", accent: "purple" },
  { id: "boxes", pose: "backpack", label: "Gift Boxes", blurb: "Loot, pre-bagged", accent: "green" },
  { id: "merch", pose: "love", label: "Merch", blurb: "Wear the mask", accent: "pink" },
];

export const products: Product[] = [
  {
    slug: "asalto-en-altamar",
    name: "Asalto en Altamar",
    category: "bars",
    price: 1300,
    tagline: "Sea salt caramel, plundered on the high seas.",
    description:
      "A heist on the high seas. Smooth chocolate loaded with ribbons of buttery caramel and a salty-sea finish. Captain Bandit does not share the treasure.",
    notes: ["Sea salt", "Caramel", "Butter"],
    ingredients: "Chocolate (cacao, cane sugar, cocoa butter), salted caramel (sugar, cream, butter, sea salt), sea salt. Contains: milk.",
    weight: "75g",
    accent: "purple",
    pose: "sleeping",
    packaging: {
      front: { src: "/art/wrapper-pirate.svg", width: 96, height: 192, alt: "Asalto en Altamar wrapper: pirate Bandit guarding a chocolate treasure chest" },
    },
    tag: "BESTSELLER",
    featured: true,
  },
  {
    slug: "dumpster-fire",
    name: "Dumpster Fire",
    category: "bars",
    price: 1300,
    tagline: "Dark chocolate with a slow burn.",
    description:
      "Dark chocolate with ancho chili and cinnamon that starts sweet and ends in flames. Handle with gloves (optional).",
    notes: ["Ancho chili", "Cinnamon", "Heat"],
    ingredients: "Cacao beans, cane sugar, cocoa butter, chili blend, cinnamon.",
    weight: "75g",
    accent: "pink",
    pose: "running",
    tag: "SPICY",
    featured: true,
  },
  {
    slug: "royal-rubbish",
    name: "Royal Rubbish",
    category: "bars",
    price: 1300,
    tagline: "Top-secret flavor. Fit for a trash king.",
    description:
      "Bandit is still deciding what goes in this one. All we know is it'll be fancy, it'll be feral, and it'll be worth the wait.",
    notes: ["Classified", "Royal", "Coming soon"],
    ingredients: "To be announced.",
    weight: "75g",
    accent: "green",
    pose: "king",
    tag: "SOON",
    comingSoon: true,
  },
  {
    slug: "trash-panda-truffles",
    name: "Trash Panda Truffles (12 pack)",
    category: "truffles",
    price: 2400,
    tagline: "A suspiciously round pile of bandit aftermath.",
    description:
      "Is it a gourmet truffle? Is it a suspiciously round pile of bandit aftermath? Yes. We took the classic \"kitchen sink\" raid: crisp chips, sea-salted pretzels, buttery crunch, and sweet caramel ribbons, and packed it into decadent dark chocolate bites. It's chaotic, salty-sweet perfection.",
    notes: ["Salted caramel", "Pretzel", "Potato chip"],
    ingredients:
      "Dark chocolate (chocolate liquor, cane sugar, cocoa butter, soy lecithin, natural vanilla extract), heavy cream, salted caramel ribbon (sugar, corn syrup, heavy cream, butter [cream, salt], sea salt, vanilla bean paste), potato chips (potatoes, sunflower oil, flaked sea salt), crushed pretzels (enriched wheat flour [wheat flour, niacin, reduced iron, thiamine mononitrate, riboflavin, folic acid], salt, malt syrup, canola oil, yeast), buttery crunch toffee (sugar, butter [pasteurized sweet cream, salt], corn syrup, baking soda, pure vanilla), unsalted butter, invert sugar syrup, fleur de sel. Contains: milk, wheat, soy.",
    weight: "12 count · 4 oz",
    accent: "green",
    pose: "trashcan",
    photos: [
      { src: "/photos/truffles-front.jpg", width: 1600, height: 1600, alt: "Trash Panda Truffles box sliding open to show the truffles, Bandit and a dumpster on the sleeve" },
      { src: "/photos/truffles-inside.jpg", width: 1600, height: 1600, alt: "Open slime-green tray holding twelve dark chocolate truffles topped with pretzel and toffee crumbs" },
      { src: "/photos/truffles-back.jpg", width: 1533, height: 1600, alt: "Back of the Trash Panda Truffles box with nutrition facts, ingredients, and the Sweet Treats, Bigger Purpose story" },
    ],
    featured: true,
  },
  {
    slug: "sampler-stash",
    name: "Sampler Stash",
    category: "boxes",
    price: 4600,
    tagline: "Two bars + a 12 pack of truffles. A full raid.",
    description:
      "Asalto en Altamar and Dumpster Fire bars, plus a 12 pack of Trash Panda Truffles, all packed in a neon gift box.",
    notes: ["Bars", "Truffles", "Gift-ready"],
    ingredients: "See individual products.",
    weight: "263g",
    accent: "pink",
    pose: "backpack",
    featured: true,
  },
  {
    slug: "after-dark-box",
    name: "After Dark Box",
    category: "boxes",
    price: 7200,
    tagline: "The deluxe late-night haul.",
    description:
      "Two Asalto en Altamar bars, two Dumpster Fire bars, a 12 pack of Trash Panda Truffles, and a Bandit sticker pack. For birthdays, apologies, and heists that went well.",
    notes: ["4 bars", "12 truffles", "Sticker pack"],
    ingredients: "See individual products.",
    weight: "413g",
    accent: "purple",
    pose: "prowl",
  },
  {
    slug: "sticker-pack",
    name: "Bandit Sticker Pack",
    category: "merch",
    price: 600,
    tagline: "Eight holographic stickers.",
    description: "Put the raccoon on your laptop, water bottle, or the fridge you raid at night.",
    notes: ["Holographic", "Waterproof", "8 designs"],
    ingredients: "Vinyl. Do not eat.",
    weight: "—",
    accent: "green",
    pose: "love",
  },
  {
    slug: "sticky-paws-hat",
    name: "Sticky Paws Hat",
    category: "merch",
    price: 2800,
    tagline: "Embroidered cap. Hides the evidence.",
    description: "Black six-panel cap with Bandit embroidered in neon pink and slime green. One size, adjustable strap.",
    notes: ["Embroidered", "Adjustable", "One size"],
    ingredients: "Cotton twill. Do not eat.",
    weight: "—",
    accent: "pink",
    pose: "alert",
  },
  {
    slug: "sticky-paws-tee",
    name: "Sticky Paws T-Shirt",
    category: "merch",
    price: 3000,
    tagline: "Soft black tee with a loud raccoon.",
    description: "Heavyweight black cotton tee with the drippy Sticky Paws logo on the front and Bandit on the back.",
    notes: ["Organic cotton", "Screen printed", "Unisex fit"],
    ingredients: "Cotton. Also do not eat.",
    weight: "—",
    accent: "purple",
    pose: "peek",
  },
  {
    slug: "sticky-paws-phone-case",
    name: "Sticky Paws Phone Case",
    category: "merch",
    price: 2400,
    tagline: "Keep Bandit in your pocket.",
    description: "Slim, shock-absorbing phone case printed with Bandit and the slime drip. Tough enough for a dumpster dive.",
    notes: ["Slim fit", "Shock-absorbing", "Glossy print"],
    ingredients: "Polycarbonate. Definitely do not eat.",
    weight: "—",
    accent: "green",
    pose: "shook",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

// Static class maps so Tailwind can see every class name at build time
export const accentStyles: Record<Accent, { text: string; bg: string; border: string; glow: string; textGlow: string }> = {
  pink: { text: "text-pink", bg: "bg-pink", border: "border-pink", glow: "shadow-glow-pink", textGlow: "text-glow-pink" },
  green: { text: "text-green", bg: "bg-green", border: "border-green", glow: "shadow-glow-green", textGlow: "text-glow-green" },
  purple: { text: "text-purple-light", bg: "bg-purple", border: "border-purple", glow: "shadow-glow-purple", textGlow: "text-glow-purple" },
};
