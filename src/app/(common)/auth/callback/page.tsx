"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/browserClient";
import { Center, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SetSessionPage() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");

    if (!access_token || !refresh_token) {
      router.replace("/");
      return;
    }

    const supabase = createSupabaseBrowserClient();
    void supabase.auth
      .setSession({ access_token, refresh_token })
      .then(({ data: { user } }) => {
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
        router.replace("/");
      });
  }, [router]);

  return (
    <Center h="80vh">
      <Spinner size="xl" />
    </Center>
  );
}
