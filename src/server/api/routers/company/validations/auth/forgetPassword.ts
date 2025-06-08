import { z } from "@/lib/zod";

export const companyForgetPasswordSchema = z.object({
  email: z.string().min(1).email(),
});

export type CompanyForgetPasswordRequest = z.infer<
  typeof companyForgetPasswordSchema
>;
