import { Objective } from "@/lib/prisma/generated";

export const objectiveValues = [
  Objective.AWARENESS,
  Objective.SALES,
  Objective.BRAND,
  Objective.ENGAGEMENT,
  Objective.LEADS,
  Objective.SERVICE,
] as const;

export const objectiveLabels = {
  [Objective.AWARENESS]: "認知拡大",
  [Objective.SALES]: "商品販売促進",
  [Objective.BRAND]: "ブランドイメージ向上",
  [Objective.ENGAGEMENT]: "エンゲージメント獲得",
  [Objective.LEADS]: "リード獲得",
  [Objective.SERVICE]: "サービス利用促進",
} satisfies Record<Objective, string>;

export const objectives = objectiveValues.map((value) => ({
  value,
  label: objectiveLabels[value],
}));
