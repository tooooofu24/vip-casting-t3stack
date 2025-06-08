import { z } from "@/lib/zod";

export const adminResetPasswordSchema = z.object({
  newPassword: z.string().min(8),
});

export type AdminResetPasswordRequest = z.infer<
  typeof adminResetPasswordSchema
>;
