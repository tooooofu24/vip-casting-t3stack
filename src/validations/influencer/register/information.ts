import { genderValues } from "@/const/gender";
import { z } from "@/lib/zod";

export const influencerInformationSchema = z.object({
  lastName: z.string().min(1).max(100),
  firstName: z.string().min(1).max(100),
  lastNameKana: z.string().min(1).max(100),
  firstNameKana: z.string().min(1).max(100),
  displayName: z.string().min(1).max(255),
  birthday: z
    .string()
    .min(1)
    .regex(/^[\d]{4}-[\d]{2}-[\d]{2}$/),
  gender: z.enum(genderValues),
  email: z.string().email().min(1).max(255),
  phone: z.string().min(1).max(20),
});

export type InfluencerInformationRequest = z.infer<
  typeof influencerInformationSchema
>;

export const influencerInformationDefaultValues: InfluencerInformationRequest =
  {
    lastName: "山田",
    firstName: "太郎",
    lastNameKana: "ヤマダ",
    firstNameKana: "タロウ",
    displayName: "山田太郎",
    birthday: "1990-01-01",
    gender: "MALE",
    email: "influencer@example.com",
    phone: "090-1234-5678",
  };
