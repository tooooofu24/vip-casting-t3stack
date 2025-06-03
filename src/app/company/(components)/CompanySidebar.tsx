"use client";

import { Sidebar, type SidebarLink } from "@/app/(components)/Sidebar/Sidebar";
import { usePathname } from "next/navigation";
import {
  LuBuilding2,
  LuLayoutDashboard,
  LuMessageSquare,
  LuSettings,
  LuUser,
} from "react-icons/lu";

export const CompanySidebar = () => {
  const pathname = usePathname();
  const links: SidebarLink[] = [
    {
      path: "/company/dashboard",
      label: "ダッシュボード",
      icon: LuLayoutDashboard,
      active: pathname === "/company/dashboard",
    },
    {
      path: "/company/dashboard/campaigns",
      label: "案件管理",
      icon: LuBuilding2,
      active: pathname.startsWith("/company/dashboard/campaigns"),
    },
    {
      path: "/influencer/dashboard/messages",
      label: "メッセージ",
      icon: LuMessageSquare,
      active: pathname.startsWith("/company/dashboard/messages"),
    },
    {
      path: "/company/dashboard/profile",
      label: "プロフィール",
      icon: LuUser,
      active: pathname.startsWith("/company/dashboard/profile"),
    },
    {
      path: "/company/dashboard/settings",
      label: "設定",
      icon: LuSettings,
      active: pathname.startsWith("/company/dashboard/settings"),
    },
  ];
  return <Sidebar links={links} />;
};
