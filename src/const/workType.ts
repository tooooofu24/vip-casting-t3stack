import { WorkType } from "@/lib/prisma/generated";

export const workTypeValues = [
  WorkType.POST,
  WorkType.VIDEO,
  WorkType.LIVE,
  WorkType.EVENT,
  WorkType.AMBASSADOR,
  WorkType.MODEL,
  WorkType.REVIEW,
] as const;

const workTypeLabels = {
  [WorkType.POST]: "投稿作成",
  [WorkType.VIDEO]: "動画制作",
  [WorkType.LIVE]: "ライブ配信",
  [WorkType.EVENT]: "イベント出演",
  [WorkType.AMBASSADOR]: "アンバサダー",
  [WorkType.MODEL]: "モデル撮影",
  [WorkType.REVIEW]: "レビュー記事",
} satisfies Record<WorkType, string>;

export const workTypes = workTypeValues.map((value) => ({
  value,
  label: workTypeLabels[value],
}));
