import { z } from "@/lib/zod";

export const forgetPasswordSchema = z.object({
  email: z.string().email("有効なメールアドレスを入力してください"),
});

export type ForgetPasswordRequest = z.infer<typeof forgetPasswordSchema>;
