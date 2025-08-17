import { z } from "@/lib/zod";

// 会話一覧取得のバリデーション（パラメータなし）
export const getConversationsSchema = z.object({});

export type GetConversationsRequest = z.infer<typeof getConversationsSchema>;
