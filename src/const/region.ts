import { Region } from "@/lib/prisma/generated";

export const regionValues = [
  Region.ALL,
  Region.KANTO,
  Region.KANSAI,
  Region.TOKAI,
  Region.HOKKAIDO,
  Region.TOHOKU,
  Region.CHUGOKU,
  Region.SHIKOKU,
  Region.KYUSHU,
  Region.ONLINE,
] as const;

const regionLabels = {
  [Region.ALL]: "全国",
  [Region.KANTO]: "関東地方",
  [Region.KANSAI]: "関西地方",
  [Region.TOKAI]: "東海地方",
  [Region.HOKKAIDO]: "北海道地方",
  [Region.TOHOKU]: "東北地方",
  [Region.CHUGOKU]: "中国地方",
  [Region.SHIKOKU]: "四国地方",
  [Region.KYUSHU]: "九州地方",
  [Region.ONLINE]: "オンライン対応",
} satisfies Record<Region, string>;

export const regions = regionValues.map((value) => ({
  value,
  label: regionLabels[value],
}));
