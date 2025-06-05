import type { Prisma } from "@/lib/prisma/generated";
import { Prefecture } from "@/lib/prisma/generated";
import { faker } from "@faker-js/faker/locale/ja";

export function influencerAddressFactory(): Prisma.InfluencerAddressCreateWithoutInfluencerInput {
  return {
    postalCode: faker.location.zipCode("#######"),
    prefecture: faker.helpers.enumValue(Prefecture),
    city: faker.location.city(),
    town: faker.location.street(),
    street: faker.location.buildingNumber(),
    building: faker.helpers.maybe(() => faker.location.secondaryAddress(), {
      probability: 0.5,
    }),
  };
}
