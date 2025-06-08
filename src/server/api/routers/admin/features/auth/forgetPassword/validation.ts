import { z } from "@/lib/zod";

export const adminForgetPasswordSchema = z.object({
  email: z.string().min(1).email(),
});

export type AdminForgetPasswordRequest = z.infer<
  typeof adminForgetPasswordSchema
>;
