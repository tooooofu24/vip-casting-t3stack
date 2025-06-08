import { genderValues } from "@/const/gender";
import { prefectureValues } from "@/const/prefecture";
import { z } from "@/lib/zod";

export const influencerInformationSchema = z.object({
  displayName: z.string().min(1).max(100),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  firstNameKana: z.string().min(1).max(50),
  lastNameKana: z.string().min(1).max(50),
  gender: z.enum(genderValues),
  birthday: z
    .string()
    .min(1)
    .regex(/^\d{4}-\d{2}-\d{2}$/),
  phone: z.string().min(1).max(20),
  email: z.string().min(1).email(),
  password: z.string().min(8),
  prefecture: z.enum(prefectureValues),
  bio: z.string().max(500).optional(),
});

export type InfluencerInformationRequest = z.infer<typeof influencerInformationSchema>;