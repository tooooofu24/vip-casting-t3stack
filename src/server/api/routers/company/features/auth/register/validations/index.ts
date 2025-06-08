import { z } from "@/lib/zod";
import { companyAddressSchema } from "@/server/api/routers/company/features/auth/register/validations/address";
import { companyBusinessSchema } from "@/server/api/routers/company/features/auth/register/validations/business";
import { companyInformationSchema } from "@/server/api/routers/company/features/auth/register/validations/information";
import { companyPaymentSchema } from "@/server/api/routers/company/features/auth/register/validations/payment";

export const companyRegisterSchema = z.object({
  information: companyInformationSchema,
  address: companyAddressSchema,
  business: companyBusinessSchema,
  payment: companyPaymentSchema,
});

export type CompanyRegisterRequest = z.infer<typeof companyRegisterSchema>;
