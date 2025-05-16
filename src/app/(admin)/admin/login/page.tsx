"use client";

import { Box, Button, Heading, Input, Stack, Text } from "@chakra-ui/react";

export default function AdminLoginPage() {
  return (
    <Box
      maxW="sm"
      mx="auto"
      mt={24}
      p={8}
      bg="white"
      rounded="lg"
      boxShadow="md"
    >
      <Heading as="h1" size="lg" mb={6} textAlign="center">
        管理者ログイン
      </Heading>
      <Stack gap={4}>
        <Box>
          <Text mb={1}>メールアドレス</Text>
          <Input type="email" placeholder="admin@example.com" />
        </Box>
        <Box>
          <Text mb={1}>パスワード</Text>
          <Input type="password" placeholder="パスワード" />
        </Box>
        <Button colorScheme="purple" size="lg" mt={4} w="full">
          ログイン
        </Button>
      </Stack>
    </Box>
  );
}
