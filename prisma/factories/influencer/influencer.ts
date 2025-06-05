import type { Prisma } from "@/lib/prisma/generated";
import { influencerAddressFactory } from "./influencerAddress";
import { influencerInformationFactory } from "./influencerInformation";
import { influencerSnsFactory } from "./influencerSns";
import { influencerWorkFactory } from "./influencerWork";

export function influencerFactory(
  supabaseId: string,
): Prisma.InfluencerUncheckedCreateInput {
  return {
    supabaseId: supabaseId,
    isApproved: true,
    information: {
      create: influencerInformationFactory(),
    },
    address: {
      create: influencerAddressFactory(),
    },
    sns: {
      create: influencerSnsFactory(),
    },
    work: {
      create: influencerWorkFactory(),
    },
  };
}
