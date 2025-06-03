import { Button, Icon } from "@chakra-ui/react";
import type { Route } from "next";
import Link from "next/link";
import type { IconType } from "react-icons/lib";

export const SidebarMenuButton = ({
  href,
  icon,
  label,
  active,
}: {
  href: Route;
  icon: IconType;
  label: string;
  active?: boolean;
}) => {
  return (
    <Button
      asChild
      w="full"
      justifyContent="flex-start"
      colorPalette="gray"
      variant={active ? "solid" : "ghost"}
    >
      <Link href={href}>
        {icon && <Icon as={icon} />}
        {label}
      </Link>
    </Button>
  );
};
