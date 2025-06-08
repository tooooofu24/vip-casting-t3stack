import { prefectureValues } from "@/const/prefecture";
import { Prefecture } from "@/lib/prisma/generated";
import { z } from "@/lib/zod";
import type { DefaultValues } from "react-hook-form";

export const influencerAddressSchema = z.object({
  postalCode: z
    .string()
    .min(1)
    .max(7)
    .regex(/^\d{7}$/),
  prefecture: z.enum(prefectureValues),
  city: z.string().min(1).max(255),
  town: z.string().min(1).max(255),
  street: z.string().min(1).max(255),
  building: z.string().max(100).optional(),
});

export type InfluencerAddressRequest = z.infer<typeof influencerAddressSchema>;

export const influencerAddressDefaultValues: DefaultValues<InfluencerAddressRequest> =
  {
    postalCode: "1000001",
    prefecture: Prefecture.TOKYO,
    city: "東京都",
    town: "千代田区",
    street: "永田町1-7-1",
    building: "",
  };
