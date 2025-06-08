import { prefectureValues } from "@/const/prefecture";
import { z } from "@/lib/zod";

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