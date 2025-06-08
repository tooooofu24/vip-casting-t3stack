"use client";

import { handleSession } from "@/app/(common)/auth/callback/functions/handleSession";
import { toaster } from "@/lib/chakra-ui/toaster";
import { Center, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SetSessionPage() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const hashParams = new URLSearchParams(hash);
    const access_token = hashParams.get("access_token");
    const refresh_token = hashParams.get("refresh_token");

    if (access_token && refresh_token) {
      void handleSession(access_token, refresh_token, router);
      return;
    }

    toaster.create({
      type: "error",
      title: "不正なURLです",
    });
    router.replace("/");
  }, [router]);

  return (
    <Center h="80vh">
      <Spinner size="xl" />
    </Center>
  );
}
