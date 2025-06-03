"use client";

import { ForgetPasswordForm } from "@/app/company/forget-password/(components)/ForgetPasswordForm";
import { showErrorToast, toaster } from "@/lib/chakra-ui/toaster";
import { createSupabaseBrowserClient } from "@/lib/supabase/browserClient";
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
import type { Route } from "next";
import NextLink from "next/link";
import { useSearchParams } from "next/navigation";
import { LuMail } from "react-icons/lu";

export default function ForgetPasswordPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? undefined;

  const onSubmit = async ({ email }: { email: string }) => {
    const route: Route = "/influencer/reset-password";
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}${route}`,
    });
    if (error) {
      showErrorToast(error.message);
      return;
    }
    toaster.create({
      type: "success",
      title: "パスワードリセットメールを送信しました",
    });
  };
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
                onSubmit={onSubmit}
                defaultValues={{ email }}
              />
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
