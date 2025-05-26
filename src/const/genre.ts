import { Genre } from "@prisma/client";

export const genreValues = [
  Genre.BEAUTY,
  Genre.FASHION,
  Genre.FOOD,
  Genre.TECH,
  Genre.LIFESTYLE,
  Genre.TRAVEL,
  Genre.FITNESS,
  Genre.ENTERTAINMENT,
] as const;

const genreLabels = {
  [Genre.BEAUTY]: "ビューティー",
  [Genre.FASHION]: "ファッション",
  [Genre.FOOD]: "フード",
  [Genre.TECH]: "テクノロジー",
  [Genre.LIFESTYLE]: "ライフスタイル",
  [Genre.TRAVEL]: "トラベル",
  [Genre.FITNESS]: "フィットネス",
  [Genre.ENTERTAINMENT]: "エンタメ",
} satisfies Record<Genre, string>;

export const genres = genreValues.map((value) => ({
  value,
  label: genreLabels[value],
}));
