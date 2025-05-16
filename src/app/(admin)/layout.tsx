// src/app/admin/layout.tsx
import { Box, Flex, Heading } from "@chakra-ui/react";
import { type ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <Flex minH="100vh" direction="column" bg="gray.50">
      {/* 管理画面用ヘッダー */}
      <Box as="header" bg="purple.700" color="white" py={4} px={8}>
        <Heading size="md">管理画面</Heading>
      </Box>
      {/* 管理画面用メイン */}
      <Flex flex={1} p={8}>
        {/* ここにサイドバーなど追加もOK */}
        <Box flex={1}>{children}</Box>
      </Flex>
    </Flex>
  );
}
