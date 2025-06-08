import { z } from "@/lib/zod";

// インフルエンサーログイン用バリデーションスキーマ
export const influencerLoginSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1),
});

export type InfluencerLoginRequest = z.infer<typeof influencerLoginSchema>;
