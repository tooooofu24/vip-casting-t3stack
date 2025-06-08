import type { AccountType } from "@/lib/prisma/generated";

export const accountTypeValues = ["NORMAL", "CURRENT"] as const;

export const accountTypeLabels: Record<AccountType, string> = {
  NORMAL: "普通",
  CURRENT: "当座",
} as const;

export const accountTypes = Object.entries(accountTypeLabels).map(
  ([value, label]) => ({
    value,
    label,
  }),
);
