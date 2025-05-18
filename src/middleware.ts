import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * 以下のパスを除く全てのリクエストパスにマッチします：
     * - _next/static（静的ファイル）
     * - _next/image（画像最適化ファイル）
     * - favicon.ico（ファビコンファイル）
     * 必要に応じてこのパターンに他のパスを追加してください。
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
