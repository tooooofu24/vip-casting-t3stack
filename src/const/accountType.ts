import type { AccountType } from "@/lib/prisma/generated";

export const accountTypeValues = ["NORMAL", "CURRENT"] as const;

export const ACCOUNT_TYPE_LABELS: Record<AccountType, string> = {
  NORMAL: "普通",
  CURRENT: "当座",
} as const;

export const ACCOUNT_TYPE_OPTIONS = Object.entries(ACCOUNT_TYPE_LABELS).map(
  ([value, label]) => ({
    value: value as AccountType,
    label,
  }),
);
