"use client";

import { ResetPasswordForm } from "@/app/(company)/public/company/reset-password/(components)/ResetPasswordForm";
import { showErrorToast, toaster } from "@/lib/chakra-ui/toaster";
import { createSupabaseBrowserClient } from "@/lib/supabase/browserClient";
import type { ResetPasswordRequest } from "@/validations/company/resetPassword";
import {
  Card,
  Center,
  Container,
  Heading,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LuLock } from "react-icons/lu";

export default function ForgetPasswordPage() {
  const onSubmit = async ({ password }: ResetPasswordRequest) => {
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      showErrorToast(error.message);
      return;
    }
    toaster.create({
      type: "success",
      title: "パスワードを設定しました",
    });
  };
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
              <ResetPasswordForm onSubmit={onSubmit} />
            </Card.Body>
          </Card.Root>
        </VStack>
      </Container>
    </Center>
  );
}
