import type { Prisma } from "@/lib/prisma/generated";
import { influencerInformationFactory } from "./influencerInformation";
import { influencerAddressFactory } from "./influencerAddress";
import { influencerSnsFactory } from "./influencerSns";
import { influencerWorkFactory } from "./influencerWork";

export function influencerFactory(): Prisma.InfluencerUncheckedCreateInput {
  return {
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
