import type { Prisma } from "@/lib/prisma/generated";
import { faker } from "@faker-js/faker/locale/ja";
import { companyAddressFactory } from "./companyAddress";
import { companyBusinessFactory } from "./companyBusiness";
import { companyInformationFactory } from "./companyInformation";
import { companyPaymentFactory } from "./companyPayment";

export function companyFactory(): Prisma.CompanyUncheckedCreateInput {
  return {
    isApproved: faker.datatype.boolean(),
    information: {
      create: companyInformationFactory(),
    },
    address: {
      create: companyAddressFactory(),
    },
    business: {
      create: companyBusinessFactory(),
    },
    payment: {
      create: companyPaymentFactory(),
    },
  };
}
