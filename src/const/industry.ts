import { Industry } from "@/lib/prisma/generated";

export const industryValues = [
  Industry.RETAIL,
  Industry.MANUFACTURING,
  Industry.SERVICE,
  Industry.IT,
  Industry.FINANCE,
  Industry.REAL_ESTATE,
  Industry.FOOD,
  Industry.ENTERTAINMENT,
  Industry.OTHER,
] as const;

const industryLabels = {
  [Industry.RETAIL]: "小売業",
  [Industry.MANUFACTURING]: "製造業",
  [Industry.SERVICE]: "サービス業",
  [Industry.IT]: "IT・通信",
  [Industry.FINANCE]: "金融・保険",
  [Industry.REAL_ESTATE]: "不動産",
  [Industry.FOOD]: "飲食業",
  [Industry.ENTERTAINMENT]: "エンターテインメント",
  [Industry.OTHER]: "その他",
} satisfies Record<Industry, string>;

export const industries = industryValues.map((value) => ({
  value,
  label: industryLabels[value],
}));
