import { AgeGroup } from "@/lib/prisma/generated";

export const ageGroupValues = [
  AgeGroup.TEENS,
  AgeGroup.EARLY_20S,
  AgeGroup.LATE_20S,
  AgeGroup.EARLY_30S,
  AgeGroup.LATE_30S,
  AgeGroup.OVER_40S,
] as const;

const ageGroupLabels = {
  [AgeGroup.TEENS]: "10代",
  [AgeGroup.EARLY_20S]: "20代前半",
  [AgeGroup.LATE_20S]: "20代後半",
  [AgeGroup.EARLY_30S]: "30代前半",
  [AgeGroup.LATE_30S]: "30代後半",
  [AgeGroup.OVER_40S]: "40代以上",
} satisfies Record<AgeGroup, string>;

export const ageGroups = ageGroupValues.map((value) => ({
  value,
  label: ageGroupLabels[value],
}));
