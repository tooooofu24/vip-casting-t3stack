import { toaster } from "@/lib/chakra-ui/toaster";
import { createSupabaseBrowserClient } from "@/lib/supabase/browserClient";
import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function handleSession(
  access_token: string,
  refresh_token: string,
  router: AppRouterInstance,
) {
  const supabase = createSupabaseBrowserClient();

  const {
    error,
    data: { user },
  } = await supabase.auth.setSession({ access_token, refresh_token });

  if (error) {
    toaster.create({
      type: "error",
      title: "認証に失敗しました",
    });
    router.replace("/");
    return;
  }

  const role = String(user?.user_metadata?.role);

  if (role === "admin") {
    router.replace("/admin/reset-password");
    return;
  }
  if (role === "influencer") {
    router.replace("/influencer/reset-password");
    return;
  }
  if (role === "company") {
    router.replace("/company/reset-password");
    return;
  }

  toaster.create({
    type: "error",
    title: "予期せぬエラーが発生しました",
  });
  router.replace("/");
}
