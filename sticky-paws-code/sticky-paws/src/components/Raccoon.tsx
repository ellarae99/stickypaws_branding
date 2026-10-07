import Image from "next/image";

// Bandit artwork, sliced from design/Sticky_Paws_web_assets.svg into public/art/bandit-*.svg.
// Sizes are each file's viewBox, so next/image reserves the right aspect ratio.
export const poses = {
  head: [120, 98],
  peek: [126, 86],
  king: [118, 120],
  shook: [118, 84],
  alert: [136, 106],
  prowl: [134, 106],
  running: [138, 90],
  melting: [138, 122],
  sleeping: [106, 96],
  snack: [112, 102],
  boba: [110, 108],
  trashcan: [116, 118],
  backpack: [94, 106],
  love: [98, 88],
} as const;

export type Pose = keyof typeof poses;

type RaccoonProps = {
  pose?: Pose;
  className?: string;
  title?: string;
  priority?: boolean;
};

export function Raccoon({ pose = "head", className = "", title = "Bandit the raccoon", priority }: RaccoonProps) {
  const [width, height] = poses[pose];
  return (
    <Image
      src={`/art/bandit-${pose}.svg`}
      width={width}
      height={height}
      alt={title}
      priority={priority}
      draggable={false}
      className={`h-auto select-none ${className}`}
    />
  );
}
