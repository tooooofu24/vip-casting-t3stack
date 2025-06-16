"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/influencer/dashboard/profile/information");
  }, [router]);

  return null;
}
