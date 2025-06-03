/**
 * 基本的にこのファイルを編集する必要はありません。例外は以下の場合です：
 * 1. リクエストコンテキストを変更したい場合（パート1参照）。
 * 2. 新しいミドルウェアやプロシージャタイプを作成したい場合（パート3参照）。
 *
 * 要約：tRPCサーバーの設定や拡張はここで行います。必要な部分はファイル末尾付近に記載しています。
 */
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod"; // eslint-disable-line no-restricted-imports

import { createSupabaseServerClient } from "@/lib/supabase/serverClient";
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
 * 3. routersとprocedures（重要な部分）
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
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`); // eslint-disable-line no-console

  return result;
});

/**
 * 公開（認証不要）プロシージャ
 *
 * これはtRPC APIで新しいクエリやミューテーションを作成する際の基本単位です。
 * ユーザー認証は保証しませんが、セッション情報にはアクセス可能です。
 */
export const publicProcedure = t.procedure.use(timingMiddleware);

// 管理者認証ミドルウェア
const adminMiddleware = t.middleware(async ({ ctx, next }) => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "認証が必要です" });
  }

  const isAdmin = user.user_metadata?.role === "admin";
  if (!isAdmin) {
    throw new TRPCError({ code: "FORBIDDEN", message: "管理者権限が必要です" });
  }

  return next({
    ctx: {
      ...ctx,
      user,
      isAdmin: true,
    },
  });
});

// 管理者専用プロシージャ
export const adminProcedure = t.procedure.use(adminMiddleware);

// 会社認証ミドルウェア
const companyMiddleware = t.middleware(async ({ ctx, next }) => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "認証が必要です" });
  }

  const isCompany = user.user_metadata?.role === "company";
  if (!isCompany) {
    throw new TRPCError({ code: "FORBIDDEN", message: "会社権限が必要です" });
  }

  const companyId = user.user_metadata?.companyId as string | undefined;
  if (!companyId) {
    throw new TRPCError({ code: "FORBIDDEN", message: "会社情報がありません" });
  }

  return next({
    ctx: {
      ...ctx,
      user,
      isCompany: true,
      companyId,
    },
  });
});

// 会社専用プロシージャ
export const companyProcedure = t.procedure.use(companyMiddleware);
