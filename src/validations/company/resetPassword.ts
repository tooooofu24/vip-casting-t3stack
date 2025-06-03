import { z } from "@/lib/zod";

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, { message: "8文字以上で入力してください" }),
    confirmPassword: z.string().min(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  });

export type ResetPasswordRequest = z.infer<typeof resetPasswordSchema>;
