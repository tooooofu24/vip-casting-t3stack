import { NavbarLink } from "@/app/(components)/Navbar/NavbarLink";
import { HStack } from "@chakra-ui/react";

const navLinks = [
  { path: "/dashboard", label: "ダッシュボード" },
  { path: "/campaign-management", label: "案件管理" },
  { path: "/campaigns", label: "案件を探す" },
  { path: "/pr-listing", label: "案件を募集する" },
  { path: "/messages", label: "メッセージ" },
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
