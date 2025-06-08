import { z } from "@/lib/zod";

export const companyResetPasswordSchema = z.object({
  newPassword: z.string().min(8),
});

export type CompanyResetPasswordRequest = z.infer<
  typeof companyResetPasswordSchema
>;
