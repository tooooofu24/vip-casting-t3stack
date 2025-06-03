"use client";
import { createSupabaseBrowserClient } from "@/lib/supabase/browserClient";
import { Center, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function InvitedRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");

    if (access_token && refresh_token) {
      const supabase = createSupabaseBrowserClient();
      void supabase.auth
        .setSession({ access_token, refresh_token })
        .then(() => {
          router.replace("/influencer/reset-password");
        });
    } else {
      router.replace("/influencer/login");
    }
  }, [router]);

  return (
    <Center h="full">
      <Spinner size="xl" />
    </Center>
  );
}
