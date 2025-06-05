import type { Prisma } from "@/lib/prisma/generated";
import { Industry } from "@/lib/prisma/generated";
import { faker } from "@faker-js/faker/locale/ja";

type Props = {
  companyId: string;
};

export function companyInformationFactory({
  companyId,
}: Props): Prisma.CompanyInformationUncheckedCreateInput {
  const companyName = faker.company.name() + "株式会社";
  const displayName = faker.company.name();
  const websiteUrl = `https://${faker.internet.domainName()}`;
  const ceoName = faker.person.fullName();

  return {
    companyName,
    displayName,
    corporateNumber: faker.string.numeric(13),
    ceoName,
    establishedAt: faker.date.past({ years: 30 }),
    capital: faker.number.int({ min: 10000000, max: 500000000 }),
    numberOfEmployees: faker.number.int({ min: 10, max: 1000 }),
    industry: faker.helpers.enumValue(Industry),
    websiteUrl,
    purpose: faker.lorem.paragraph(),
    note: faker.lorem.sentence(),
    companyId,
  };
}
