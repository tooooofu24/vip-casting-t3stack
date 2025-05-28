import { prefectureValues } from "@/const/prefecture";
import { z } from "@/lib/zod";
import { Prefecture } from "@prisma/client";

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

// 所在地情報のデフォルト値
export const influencerAddressDefaultValues: InfluencerAddressRequest = {
  postalCode: "1000001",
  prefecture: Prefecture.TOKYO,
  city: "千代田区",
  town: "千代田",
  street: "1-1",
  building: "千代田ビル302",
};
