import { NavbarLink } from "@/app/(components)/Navbar/NavbarLink";
import { HStack } from "@chakra-ui/react";
import type { Route } from "next";

const navLinks: { path: Route; label: string }[] = [
  { path: "/influencer/dashboard", label: "ダッシュボード" },
  { path: "/influencer/campaign-management", label: "案件管理" },
  { path: "/influencer/campaigns", label: "案件を探す" },
  { path: "/influencer/pr-listing", label: "案件を募集する" },
  { path: "/influencer/messages", label: "メッセージ" },
];

export function NavigationLinks() {
  return (
    <HStack gap={6}>
      {navLinks.map((link) => (
        <NavbarLink key={link.path} path={link.path}>
          {link.label}
        </NavbarLink>
      ))}
    </HStack>
  );
}
