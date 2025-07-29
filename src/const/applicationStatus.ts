import { ApplicationStatus } from "@/lib/prisma/generated";

export const applicationStatusValues = [
  ApplicationStatus.PENDING,
  ApplicationStatus.APPROVED,
  ApplicationStatus.REJECTED,
  ApplicationStatus.COMPLETED,
  ApplicationStatus.CANCELLED,
] as const;

export const applicationStatusLabels = {
  [ApplicationStatus.PENDING]: "審査中",
  [ApplicationStatus.APPROVED]: "承認済み",
  [ApplicationStatus.REJECTED]: "不採用",
  [ApplicationStatus.COMPLETED]: "完了",
  [ApplicationStatus.CANCELLED]: "キャンセル",
} satisfies Record<ApplicationStatus, string>;

export const applicationStatuses = applicationStatusValues.map((value) => ({
  value,
  label: applicationStatusLabels[value],
}));
