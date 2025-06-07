import { z } from "@/lib/zod";

// 管理者ログイン用バリデーションスキーマ
export const adminLoginSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1),
});

export type AdminLoginRequest = z.infer<typeof adminLoginSchema>;

// 管理者サインアップ用バリデーションスキーマ（adminLogin.tsから移動）
export const adminSignUpSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(8),
  displayName: z.string().min(1),
});

export type AdminSignUpRequest = z.infer<typeof adminSignUpSchema>;
