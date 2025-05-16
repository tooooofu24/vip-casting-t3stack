/**
 * 基本的にこのファイルを編集する必要はありません。例外は以下の場合です：
 * 1. リクエストコンテキストを変更したい場合（パート1参照）。
 * 2. 新しいミドルウェアやプロシージャタイプを作成したい場合（パート3参照）。
 *
 * 要約：tRPCサーバーの設定や拡張はここで行います。必要な部分はファイル末尾付近に記載しています。
 */
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { db } from "@/server/db";

/**
 * 1. コンテキスト
 *
 * ここではバックエンドAPIで利用できる「コンテキスト」を定義します。
 *
 * これにより、リクエスト処理時にデータベースやセッションなどへアクセスできます。
 *
 * このヘルパーはtRPC内部で使う「コンテキスト」を生成します。APIハンドラーやRSCクライアントがこれをラップして必要な情報を提供します。
 *
 * @see https://trpc.io/docs/server/context
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
  return {
    db,
    ...opts,
  };
};

/**
 * 2. 初期化
 *
 * tRPC APIの初期化を行い、コンテキストやデータ変換、エラーフォーマットを設定します。
 * Zodのバリデーションエラーも型安全にフロントエンドへ返します。
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * サーバーサイドからAPIを呼び出すためのファクトリー関数。
 *
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;

/**
 * 3. ルーターとプロシージャ（重要な部分）
 *
 * これらはtRPC APIを構築する際に使う主要な部品です。
 * "/src/server/api/routers" ディレクトリでよくインポートします。
 */

/**
 * tRPC APIで新しいルーターやサブルーターを作成する方法です。
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * プロシージャ実行時間の計測や、開発時の人工的な遅延を加えるミドルウェア。
 *
 * 不要な場合は削除しても構いません。開発時にネットワーク遅延を模擬できるため、パフォーマンス問題の発見に役立ちます。
 */
const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();

  if (t._config.isDev) {
    // artificial delay in dev
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  const result = await next();

  const end = Date.now();
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`);

  return result;
});

/**
 * 公開（認証不要）プロシージャ
 *
 * これはtRPC APIで新しいクエリやミューテーションを作成する際の基本単位です。
 * ユーザー認証は保証しませんが、セッション情報にはアクセス可能です。
 */
export const publicProcedure = t.procedure.use(timingMiddleware);
