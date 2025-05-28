import { Region } from "@prisma/client";

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
  [Region.KANTO]: "関東",
  [Region.KANSAI]: "関西",
  [Region.TOKAI]: "東海",
  [Region.HOKKAIDO]: "北海道",
  [Region.TOHOKU]: "東北",
  [Region.CHUGOKU]: "中国",
  [Region.SHIKOKU]: "四国",
  [Region.KYUSHU]: "九州",
  [Region.ONLINE]: "オンライン",
} satisfies Record<Region, string>;

export const regions = regionValues.map((value) => ({
  value,
  label: regionLabels[value],
}));
