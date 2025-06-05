import type { Prisma } from "@/lib/prisma/generated";
import { faker } from "@faker-js/faker/locale/ja";
import { influencerInformationFactory } from "./influencerInformation";
import { influencerAddressFactory } from "./influencerAddress";
import { influencerSnsFactory } from "./influencerSns";
import { influencerWorkFactory } from "./influencerWork";

export function influencerFactory(): Prisma.InfluencerUncheckedCreateInput {
  return {
    id: faker.string.uuid(),
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
