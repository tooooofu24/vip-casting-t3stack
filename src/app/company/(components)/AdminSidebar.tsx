"use client";

import { Sidebar } from "@/app/(components)/Sidebar/Sidebar";
import type { Route } from "next";
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

export const AdminSidebar = () => {
  return <Sidebar links={sidebarLinks} />;
};
