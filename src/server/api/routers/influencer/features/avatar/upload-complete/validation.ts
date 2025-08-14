import { z } from "@/lib/zod";

export const uploadCompleteSchema = z.object({
  filePath: z.string().min(1, "ファイルパスは必須です"),
  fileName: z.string().min(1, "ファイル名は必須です"),
  fileSize: z.number().min(1, "ファイルサイズは必須です"),
  mimeType: z.string().min(1, "MIMEタイプは必須です"),
});
