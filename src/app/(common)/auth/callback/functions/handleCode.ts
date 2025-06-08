import { handleSession } from "@/app/(common)/auth/callback/functions/handleSession";
import { toaster } from "@/lib/chakra-ui/toaster";
import { createSupabaseBrowserClient } from "@/lib/supabase/browserClient";
import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function handleCode(code: string, router: AppRouterInstance) {
  const supabase = createSupabaseBrowserClient();

  const codeVerifier = localStorage.getItem("pkce_code_verifier");

  if (!codeVerifier) {
    toaster.create({
      type: "error",
      title: "認証情報が不足しています",
      description: "再度パスワードリセットを実行してください",
    });
    router.replace("/");
    return;
  }

  const {
    error,
    data: { session },
  } = await supabase.auth.exchangeCodeForSession(code);

  // PKCEフロー完了後、code_verifierを削除
  localStorage.removeItem("pkce_code_verifier");

  if (error || !session) {
    console.error("Auth error:", error);
    toaster.create({
      type: "error",
      title: "認証に失敗しました",
      description: error?.message ?? "再度パスワードリセットを実行してください",
    });
    router.replace("/");
    return;
  }

  await handleSession(session.access_token, session.refresh_token, router);
}
