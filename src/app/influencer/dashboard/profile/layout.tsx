"use client";

import { BreadcrumbSection } from "@/app/(components)/BreadcrumbSection";
import { Tabs, VStack } from "@chakra-ui/react";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaInstagram } from "react-icons/fa6";
import { LuBriefcase, LuMapPin, LuUser } from "react-icons/lu";

const TAB_CONFIG: {
  path: Route;
  label: string;
  icon: React.ElementType;
  value: string;
}[] = [
  {
    path: "/influencer/dashboard/profile/information",
    label: "基本情報",
    icon: LuUser,
    value: "information",
  },
  {
    path: "/influencer/dashboard/profile/address",
    label: "住所情報",
    icon: LuMapPin,
    value: "address",
  },
  {
    path: "/influencer/dashboard/profile/sns",
    label: "SNS情報",
    icon: FaInstagram,
    value: "sns",
  },
  {
    path: "/influencer/dashboard/profile/work",
    label: "案件情報",
    icon: LuBriefcase,
    value: "work",
  },
];

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const currentTab =
    TAB_CONFIG.find((tab) => pathname === tab.path)?.value ?? "information";

  return (
    <VStack gap={6} align="stretch">
      {/* Breadcrumb Section */}
      <BreadcrumbSection
        items={[{ label: "プロフィール" }]}
        title="プロフィール"
        description="プロフィールを編集して、ブランドとのマッチングをサポートしましょう。"
      />

      <Tabs.Root value={currentTab}>
        <Tabs.List>
          {TAB_CONFIG.map((tab) => {
            const Icon = tab.icon;
            return (
              <Tabs.Trigger key={tab.value} value={tab.value} asChild>
                <Link href={tab.path}>
                  <Icon />
                  {tab.label}
                </Link>
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>

        {children}
      </Tabs.Root>
    </VStack>
  );
}
