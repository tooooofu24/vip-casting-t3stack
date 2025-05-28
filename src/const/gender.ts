import { Gender } from "@prisma/client";

export const genderValues = [Gender.MALE, Gender.FEMALE, Gender.OTHER] as const;

const genderLabels = {
  [Gender.MALE]: "男性",
  [Gender.FEMALE]: "女性",
  [Gender.OTHER]: "その他",
} satisfies Record<Gender, string>;

export const genders = genderValues.map((value) => ({
  value,
  label: genderLabels[value],
}));
