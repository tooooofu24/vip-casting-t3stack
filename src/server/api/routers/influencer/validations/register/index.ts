import { z } from "@/lib/zod";
import { influencerAddressSchema } from "./address";
import { influencerInformationSchema } from "./information";
import { influencerSnsSchema } from "./sns";
import { influencerWorkSchema } from "./work";

export * from "./address";
export * from "./information";
export * from "./sns";
export * from "./work";

export const influencerRegisterSchema = z.object({
  information: influencerInformationSchema,
  address: influencerAddressSchema,
  sns: influencerSnsSchema,
  work: influencerWorkSchema,
});

export type InfluencerRegisterRequest = z.infer<
  typeof influencerRegisterSchema
>;
