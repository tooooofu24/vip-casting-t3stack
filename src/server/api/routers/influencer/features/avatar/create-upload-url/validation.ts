import { z } from "@/lib/zod";

export const createUploadSignedUrlSchema = z.object({
  fileName: z.string().min(1, "ファイル名は必須です"),
  fileSize: z
    .number()
    .min(1, "ファイルサイズは必須です")
    .max(5 * 1024 * 1024, "ファイルサイズは5MB以下にしてください"),
  mimeType: z
    .string()
    .refine(
      (type) => type.startsWith("image/"),
      "画像ファイルのみアップロード可能です",
    ),
});
