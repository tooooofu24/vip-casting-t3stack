import { ageGroupValues } from "@/const/ageGroup";
import { genderValues } from "@/const/gender";
import { genreValues } from "@/const/genre";
import { objectiveValues } from "@/const/objective";
import { regionValues } from "@/const/region";
import { Gender, Genre, Objective, Region } from "@/lib/prisma/generated";
import { z } from "@/lib/zod";

export const companyBusinessSchema = z.object({
  contactName: z.string().min(1).max(100),
  department: z.string().min(1).max(100),
  position: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  email: z.string().email().min(1).max(255),
  minBudget: z.string().min(1),
  maxBudget: z.string().min(1),
  ageGroups: z.array(z.enum(ageGroupValues)).min(1),
  gender: z.enum(genderValues),
  regions: z.array(z.enum(regionValues)).min(1),
  genres: z.array(z.enum(genreValues)).min(1),
  objectives: z.array(z.enum(objectiveValues)).min(1),
  pastExperience: z.string().optional(),
  productDescription: z.string().optional(),
});

export type CompanyBusinessRequest = z.infer<typeof companyBusinessSchema>;

export const companyBusinessDefaultValues: CompanyBusinessRequest = {
  contactName: "山田花子",
  department: "マーケティング部",
  position: "マネージャー",
  phone: "03-1234-5678",
  email: "company@example.com",
  minBudget: "30000",
  maxBudget: "100000",
  ageGroups: ["EARLY_20S"],
  gender: Gender.FEMALE,
  regions: [Region.KANTO],
  genres: [Genre.BEAUTY],
  objectives: [Objective.AWARENESS],
  pastExperience: "2023年にInstagramキャンペーンを実施",
  productDescription: "新商品コスメのPR",
};
