import { Box, Card, HStack, Text } from "@chakra-ui/react";
import type { Metadata } from "next";
import { type ReactNode } from "react";

export const metadata: Metadata = {
  title: "VIPキャスティング 管理画面",
  description: "VIPキャスティング 管理画面",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <Box as="main" h="full" pt={16}>
      <Card.Root
        as="header"
        h={16}
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={20}
        borderX={0}
        borderTop={0}
        borderRadius={0}
      >
        <Card.Body p={0}>
          <HStack h="100%" px={6} justify="space-between">
            <Text fontSize="lg" fontWeight="bold">
              VIPキャスティング 管理画面
            </Text>

            <HStack gap={4}>
              <Text>管理者</Text>
            </HStack>
          </HStack>
        </Card.Body>
      </Card.Root>
      {children}
    </Box>
  );
}
