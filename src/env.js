import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * サーバーサイドで利用する環境変数のスキーマをここで定義します。
   * これにより、無効な環境変数でアプリがビルドされるのを防げます。
   */
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },

  /**
   * クライアントサイドで利用する環境変数のスキーマをここで定義します。
   * 無効な値でビルドされるのを防げます。クライアントで使う場合は
   * 変数名の先頭に `NEXT_PUBLIC_` を付けてください。
   */
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  },

  /**
   * Next.jsのEdgeランタイム（例: middlewares）やクライアントサイドでは
   * process.envを通常のオブジェクトのように分割代入できません。
   * そのため、ここで個別に指定します。
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  /**
   * `SKIP_ENV_VALIDATION` を付けて `build` や `dev` を実行すると
   * 環境変数のバリデーションをスキップできます。
   * Dockerビルド時などに便利です。
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * 空文字列を undefined として扱います。
   * 例: `SOME_VAR: z.string()` かつ `SOME_VAR=''` の場合はエラーになります。
   */
  emptyStringAsUndefined: true,
});
