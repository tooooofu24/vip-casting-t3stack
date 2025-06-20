import { z } from "@/lib/zod";
import { influencerAddressSchema } from "@/server/api/routers/influencer/features/auth/register/validations/address";
import { influencerInformationSchema } from "@/server/api/routers/influencer/features/auth/register/validations/information";
import { influencerSnsSchema } from "@/server/api/routers/influencer/features/auth/register/validations/sns";
import { influencerWorkSchema } from "@/server/api/routers/influencer/features/auth/register/validations/work";

export const influencerRegisterSchema = z.object({
  information: influencerInformationSchema,
  address: influencerAddressSchema,
  sns: influencerSnsSchema,
  work: influencerWorkSchema,
});

export type InfluencerRegisterRequest = z.infer<
  typeof influencerRegisterSchema
>;
