import type { Prisma } from "@/lib/prisma/generated";
import { Prefecture } from "@/lib/prisma/generated";
import { faker } from "@faker-js/faker/locale/ja";

export function companyAddressFactory(): Prisma.CompanyAddressCreateWithoutCompanyInput {
  return {
    postalCode: faker.location.zipCode("#######"),
    prefecture: faker.helpers.enumValue(Prefecture),
    city: faker.location.city().slice(0, 240),
    town: faker.location.street().slice(0, 240),
    street: faker.location.buildingNumber().slice(0, 240),
    building: faker.helpers.maybe(
      () => faker.location.secondaryAddress().slice(0, 90),
      {
        probability: 0.7,
      },
    ),
  };
}
