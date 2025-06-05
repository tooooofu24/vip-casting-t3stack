import type { Prisma } from "@/lib/prisma/generated";
import { Prefecture } from "@/lib/prisma/generated";
import { faker } from "@faker-js/faker/locale/ja";

type Props = {
  influencerId: string;
};

export function influencerAddressFactory({
  influencerId,
}: Props): Prisma.InfluencerAddressUncheckedCreateInput {
  return {
    postalCode: faker.location.zipCode("###-####"),
    prefecture: faker.helpers.enumValue(Prefecture),
    city: faker.location.city(),
    town: faker.location.street(),
    street: faker.location.buildingNumber(),
    building: faker.helpers.maybe(() => faker.location.secondaryAddress(), {
      probability: 0.5,
    }),
    influencerId,
  };
}
