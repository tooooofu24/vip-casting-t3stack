import type { Prisma } from "@/lib/prisma/generated";
import { faker } from "@faker-js/faker/locale/ja";
import { companyAddressFactory } from "./companyAddress";
import { companyBusinessFactory } from "./companyBusiness";
import { companyInformationFactory } from "./companyInformation";
import { companyPaymentFactory } from "./companyPayment";

export function companyFactory(): Prisma.CompanyUncheckedCreateInput {
  const tempCompanyId = faker.string.uuid();

  return {
    isApproved: faker.datatype.boolean(),
    information: {
      create: companyInformationFactory({ companyId: tempCompanyId }),
    },
    address: {
      create: companyAddressFactory({ companyId: tempCompanyId }),
    },
    business: {
      create: companyBusinessFactory({ companyId: tempCompanyId }),
    },
    payment: {
      create: companyPaymentFactory({ companyId: tempCompanyId }),
    },
  };
}
