"use client";

import { ResetPasswordForm } from "@/app/influencer/(public)/reset-password/(components)/ResetPasswordForm";
import { toaster } from "@/lib/chakra-ui/toaster";
import { api } from "@/lib/trpc/react";
import {
  Card,
  Center,
  Link as ChakraLink,
  Container,
  Heading,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { LuLock } from "react-icons/lu";

export default function ResetPasswordPage() {
  const { mutateAsync } = api.influencer.password.reset.useMutation({
    onSuccess: () => {
      toaster.create({
        type: "success",
        title: "パスワードを設定しました",
      });
    },
    onError: (error) => {
      toaster.create({
        type: "error",
        title: "設定エラー",
        description: error.message,
      });
    },
  });

  return (
    <Center>
      <Container maxW="xl" py={32}>
        <VStack gap={8}>
          {/* Header */}
          <VStack gap={{ base: 2, sm: 4 }} align="center">
            <Icon as={LuLock} boxSize={12} color="purple.600" />
            <Heading as="h1" size={{ base: "xl", sm: "2xl" }} fontWeight="bold">
              パスワード設定
            </Heading>
            <Text color="fg.muted" textAlign="center">
              新しいパスワードを入力してください
            </Text>
          </VStack>

          {/* Set Password Form */}
          <Card.Root w="full">
            <Card.Body>
              <ResetPasswordForm onSubmit={mutateAsync} />
              <ChakraLink asChild fontSize="sm" ml="auto" mt={4}>
                <NextLink href="/influencer/login">ログイン画面に戻る</NextLink>
              </ChakraLink>
            </Card.Body>
          </Card.Root>
        </VStack>
      </Container>
    </Center>
  );
}
