import { genderValues } from "@/const/gender";
import { Gender } from "@/lib/prisma/generated";
import { z } from "@/lib/zod";
import type { DefaultValues } from "react-hook-form";

export const influencerInformationSchema = z.object({
  displayName: z.string().min(1).max(255),
  email: z.string().min(1).max(255).email(),
  lastName: z.string().min(1).max(100),
  firstName: z.string().min(1).max(100),
  lastNameKana: z.string().min(1).max(100),
  firstNameKana: z.string().min(1).max(100),
  birthday: z
    .string()
    .min(1)
    .regex(/^\d{4}-\d{2}-\d{2}$/),
  gender: z.enum(genderValues),
  phone: z.string().min(1).max(20),
});

export type InfluencerInformationRequest = z.infer<
  typeof influencerInformationSchema
>;

export const influencerInformationDefaultValues: DefaultValues<InfluencerInformationRequest> =
  {
    displayName: "さくらビューティー",
    email: "sakura_beauty@example.com",
    lastName: "山田",
    firstName: "さくら",
    lastNameKana: "ヤマダ",
    firstNameKana: "サクラ",
    birthday: "1995-03-15",
    gender: Gender.FEMALE,
    phone: "09012345678",
  };
