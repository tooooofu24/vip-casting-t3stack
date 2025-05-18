import { z } from "@/lib/zod";
import type { AppRouter } from "@/server/api/root";
import type { inferProcedureInput, inferProcedureOutput } from "@trpc/server";

// 管理者ログイン用バリデーションスキーマ
export const adminLoginSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1),
});

export type AdminLoginRequest = inferProcedureInput<
  AppRouter["admin"]["login"]
>;

export type AdminLoginResponse = inferProcedureOutput<
  AppRouter["admin"]["login"]
>;
