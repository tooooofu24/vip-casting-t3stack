import type { Prisma } from "@/lib/prisma/generated";
import { Prefecture, AccountType } from "@/lib/prisma/generated";
import { faker } from "@faker-js/faker/locale/ja";

type Props = {
  companyId: string;
};

export function companyPaymentFactory({
  companyId,
}: Props): Prisma.CompanyPaymentUncheckedCreateInput {
  return {
    bankName: faker.helpers.arrayElement([
      "みずほ銀行",
      "三菱UFJ銀行",
      "三井住友銀行",
      "りそな銀行",
    ]),
    branchName: faker.location.city() + "支店",
    accountType: faker.helpers.enumValue(AccountType),
    accountNumber: faker.string.numeric(7),
    accountHolder: faker.person.fullName(),
    billingPostalCode: faker.location.zipCode("###-####"),
    billingPrefecture: faker.helpers.enumValue(Prefecture),
    billingCity: faker.location.city(),
    billingAddress: faker.location.streetAddress(),
    billingBuilding: faker.helpers.maybe(
      () => faker.location.secondaryAddress(),
      { probability: 0.6 },
    ),
    billingContactName: faker.person.fullName(),
    companyId,
  };
}
