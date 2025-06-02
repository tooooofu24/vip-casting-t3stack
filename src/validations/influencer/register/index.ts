import { z } from "@/lib/zod";
import { influencerAddressSchema } from "@/validations/influencer/register/address";
import { influencerInformationSchema } from "@/validations/influencer/register/information";
import { influencerSnsSchema } from "@/validations/influencer/register/sns";
import { influencerWorkSchema } from "@/validations/influencer/register/work";

export const influencerRegisterSchema = z.object({
  information: influencerInformationSchema,
  address: influencerAddressSchema,
  sns: influencerSnsSchema,
  work: influencerWorkSchema,
});

export type InfluencerRegisterRequest = z.infer<
  typeof influencerRegisterSchema
>;
