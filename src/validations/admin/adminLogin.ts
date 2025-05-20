import { z } from "@/lib/zod";

// 管理者ログイン用バリデーションスキーマ
export const adminLoginSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1),
});

export type AdminLoginRequest = z.infer<typeof adminLoginSchema>;
