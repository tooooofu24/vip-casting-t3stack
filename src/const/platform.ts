import { Platform } from "@/lib/prisma/generated";

export const platformValues = [
  Platform.INSTAGRAM,
  Platform.TIKTOK,
  Platform.YOUTUBE,
  Platform.X,
  Platform.FACEBOOK,
  Platform.OTHER,
] as const;

const platformLabels = {
  [Platform.INSTAGRAM]: "Instagram",
  [Platform.TIKTOK]: "TikTok",
  [Platform.YOUTUBE]: "YouTube",
  [Platform.X]: "X（旧Twitter）",
  [Platform.FACEBOOK]: "Facebook",
  [Platform.OTHER]: "その他",
} satisfies Record<Platform, string>;

export const platforms = platformValues.map((value) => ({
  value,
  label: platformLabels[value],
}));
