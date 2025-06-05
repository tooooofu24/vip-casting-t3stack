import type { Prisma } from "@/lib/prisma/generated";
import { influencerInformationFactory } from "./influencerInformation";
import { influencerAddressFactory } from "./influencerAddress";
import { influencerSnsFactory } from "./influencerSns";
import { influencerWorkFactory } from "./influencerWork";

export function influencerFactory(): Prisma.InfluencerUncheckedCreateInput {
  // 一時的なinfluencerIdを生成（実際の作成時に置き換えられる）
  const tempInfluencerId = "temp-influencer-id";

  return {
    isApproved: true,
    information: {
      create: influencerInformationFactory({ influencerId: tempInfluencerId }),
    },
    address: {
      create: influencerAddressFactory({ influencerId: tempInfluencerId }),
    },
    sns: {
      create: influencerSnsFactory({ influencerId: tempInfluencerId }),
    },
    work: {
      create: influencerWorkFactory({ influencerId: tempInfluencerId }),
    },
  };
}
