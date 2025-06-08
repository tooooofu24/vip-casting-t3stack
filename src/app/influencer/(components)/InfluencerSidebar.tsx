"use client";

import { Sidebar, type SidebarLink } from "@/app/(components)/Sidebar/Sidebar";
import { usePathname } from "next/navigation";
import {
  LuDollarSign,
  LuLayoutDashboard,
  LuMessageSquare,
  LuSettings,
  LuStar,
  LuUser,
} from "react-icons/lu";

export const InfluencerSidebar = () => {
  const pathname = usePathname();
  const links: SidebarLink[] = [
    {
      path: "/influencer/dashboard",
      label: "ダッシュボード",
      icon: LuLayoutDashboard,
      active: pathname === "/influencer/dashboard",
    },
    {
      path: "/influencer/dashboard/campaigns",
      label: "案件一覧",
      icon: LuStar,
      active: pathname.startsWith("/influencer/dashboard/campaigns"),
    },
    {
      path: "/influencer/dashboard/campaign-management",
      label: "案件管理",
      icon: LuStar,
      active: pathname.startsWith("/influencer/dashboard/campaign-management"),
    },
    {
      path: "/influencer/dashboard/earnings",
      label: "収益管理",
      icon: LuDollarSign,
      active: pathname.startsWith("/influencer/dashboard/earnings"),
    },
    {
      path: "/influencer/dashboard/messages",
      label: "メッセージ",
      icon: LuMessageSquare,
      active: pathname.startsWith("/influencer/dashboard/messages"),
    },
    {
      path: "/influencer/dashboard/profile",
      label: "プロフィール",
      icon: LuUser,
      active: pathname.startsWith("/influencer/dashboard/profile"),
    },
    {
      path: "/influencer/dashboard/settings",
      label: "設定",
      icon: LuSettings,
      active: pathname.startsWith("/influencer/dashboard/settings"),
    },
  ];
  return <Sidebar links={links} />;
};
