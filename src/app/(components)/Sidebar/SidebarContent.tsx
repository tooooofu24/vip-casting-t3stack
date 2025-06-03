"use client";

import {
  Avatar,
  Button,
  HStack,
  Icon,
  Separator,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { Route } from "next";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { IconType } from "react-icons/lib";
import {
  LuBell,
  LuBuilding2,
  LuFileText,
  LuLayoutDashboard,
  LuMail,
  LuMessageSquare,
  LuSettings,
  LuUser,
} from "react-icons/lu";

const sidebarLinks: { path: Route; label: string; icon: IconType }[] = [
  {
    path: "/influencer/dashboard",
    label: "ダッシュボード",
    icon: LuLayoutDashboard,
  },
  {
    path: "/influencer/dashboard/campaign-management",
    label: "案件管理",
    icon: LuBuilding2,
  },
  {
    path: "/influencer/dashboard/campaigns",
    label: "案件を探す",
    icon: LuFileText,
  },
  {
    path: "/influencer/dashboard/pr-listing",
    label: "案件を募集する",
    icon: LuMail,
  },
  {
    path: "/influencer/dashboard/messages",
    label: "メッセージ",
    icon: LuMessageSquare,
  },
  { path: "/", label: "通知", icon: LuBell },
  {
    path: "/influencer/dashboard/profile",
    label: "プロフィール",
    icon: LuUser,
  },
  { path: "/influencer/dashboard/settings", label: "設定", icon: LuSettings },
];

export function SidebarContent() {
  const pathname = usePathname();

  return (
    <VStack gap={2} align="stretch" as="nav" bg="bg.surface" py={4}>
      <HStack gap={3} p={{ base: 2, md: 4 }}>
        <Avatar.Root>
          <Avatar.Fallback />
          <Avatar.Image />
        </Avatar.Root>
        <Stack gap="0">
          <Text fontSize="md">山田太郎</Text>
          <Text color="fg.muted" fontSize="xs">
            user@example.com
          </Text>
        </Stack>
      </HStack>
      <Separator />
      <Stack gap={2} p={{ base: 2, md: 4 }}>
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.path;
          return (
            <NextLink href={link.path} key={link.path}>
              <Button
                as="span"
                w="full"
                colorPalette="gray"
                justifyContent="flex-start"
                variant={isActive ? "solid" : "ghost"}
              >
                <Icon>
                  <link.icon />
                </Icon>
                <Text>{link.label}</Text>
              </Button>
            </NextLink>
          );
        })}
      </Stack>
    </VStack>
  );
}
