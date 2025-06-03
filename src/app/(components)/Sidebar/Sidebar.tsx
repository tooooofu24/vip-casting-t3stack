import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "@/app/(components)/constants";
import { SidebarMenuButton } from "@/app/(components)/Sidebar/SidebarMenuButton";
import {
  Avatar,
  Card,
  HStack,
  Separator,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { Route } from "next";
import type { IconType } from "react-icons/lib";

export type SidebarLink = {
  path: Route;
  label: string;
  icon: IconType;
  active: boolean;
};

type Props = {
  links: SidebarLink[];
};

export const Sidebar = ({ links }: Props) => {
  return (
    <Card.Root
      borderY={0}
      borderLeft={0}
      borderRadius={0}
      as="nav"
      w={SIDEBAR_WIDTH}
      h="full"
      position="fixed"
      left={0}
      zIndex={10}
      pt={HEADER_HEIGHT}
    >
      <Card.Body px={4} pb={0}>
        <VStack gap={2} align="start">
          {links.map((link) => (
            <SidebarMenuButton
              key={link.path}
              href={link.path}
              icon={link.icon}
              label={link.label}
              active={link.active}
            />
          ))}
        </VStack>
        <Separator mt="auto" />
        <HStack gap={4} py={4} align="center">
          <Avatar.Root size="sm">
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
      </Card.Body>
    </Card.Root>
  );
};
