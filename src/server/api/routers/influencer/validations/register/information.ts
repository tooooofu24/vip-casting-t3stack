import { genderValues } from "@/const/gender";
import { prefectureValues } from "@/const/prefecture";
import { Gender } from "@/lib/prisma/generated";
import { z } from "@/lib/zod";
import type { DefaultValues } from "react-hook-form";

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

export type InfluencerInformationRequest = z.infer<
  typeof influencerInformationSchema
>;

export const influencerInformationDefaultValues: DefaultValues<InfluencerInformationRequest> =
  {
    displayName: "さくらビューティー",
    firstName: "さくら",
    lastName: "山田",
    firstNameKana: "サクラ",
    lastNameKana: "ヤマダ",
    gender: Gender.FEMALE,
    birthday: "1995-03-15",
    phone: "09012345678",
    email: "sakura_beauty@example.com",
    password: "password1234",
    prefecture: "TOKYO",
    bio: "美容・コスメが大好きなインフルエンサー。Instagramで最新トレンドを発信中！",
  };
