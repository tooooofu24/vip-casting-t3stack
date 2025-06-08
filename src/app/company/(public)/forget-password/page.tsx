"use client";

import { ForgetPasswordForm } from "@/app/company/(public)/forget-password/(components)/ForgetPasswordForm";
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
import { useSearchParams } from "next/navigation";
import { LuMail } from "react-icons/lu";

export default function ForgetPasswordPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? undefined;

  const { mutateAsync } = api.company.password.forget.useMutation({
    onSuccess: () => {
      toaster.create({
        type: "success",
        title: "パスワードリセットメールを送信しました",
      });
    },
    onError: (error) => {
      toaster.create({
        type: "error",
        title: "送信エラー",
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
            <Icon as={LuMail} boxSize={12} color="purple.600" />
            <Heading as="h1" size={{ base: "xl", sm: "2xl" }} fontWeight="bold">
              パスワードリセット
            </Heading>
            <Text color="fg.muted" textAlign="center">
              パスワード再設定用のメールを送信します
            </Text>
          </VStack>

          {/* Forget Password Form */}
          <Card.Root w="full">
            <Card.Body>
              <ForgetPasswordForm
                onSubmit={mutateAsync}
                defaultValues={{ email }}
              />
              <ChakraLink asChild fontSize="sm" ml="auto" mt={4}>
                <NextLink href="/company/login">ログイン画面に戻る</NextLink>
              </ChakraLink>
            </Card.Body>
          </Card.Root>
        </VStack>
      </Container>
    </Center>
  );
}
