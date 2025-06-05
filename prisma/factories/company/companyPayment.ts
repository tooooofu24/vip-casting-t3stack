import type { Prisma } from "@/lib/prisma/generated";
import { Prefecture, AccountType } from "@/lib/prisma/generated";
import { faker } from "@faker-js/faker/locale/ja";

export function companyPaymentFactory(): Prisma.CompanyPaymentCreateWithoutCompanyInput {
  return {
    bankName: faker.helpers.arrayElement([
      "みずほ銀行",
      "三菱UFJ銀行",
      "三井住友銀行",
      "りそな銀行",
    ]),
    branchName: faker.location.city().slice(0, 90) + "支店",
    accountType: faker.helpers.enumValue(AccountType),
    accountNumber: faker.string.numeric(7),
    accountHolder: faker.person.fullName().slice(0, 90),
    billingPostalCode: faker.location.zipCode("#######"),
    billingPrefecture: faker.helpers.enumValue(Prefecture),
    billingCity: faker.location.city().slice(0, 90),
    billingAddress: faker.location.streetAddress().slice(0, 240),
    billingBuilding: faker.helpers.maybe(
      () => faker.location.secondaryAddress().slice(0, 90),
      { probability: 0.6 },
    ),
    billingContactName: faker.person.fullName().slice(0, 90),
  };
}
