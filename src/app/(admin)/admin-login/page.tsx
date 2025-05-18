"use client";

import { showErrorToast, toaster } from "@/lib/chakra-ui/toaster";
import { api } from "@/lib/trpc/react";
import {
  Card,
  Center,
  Container,
  Heading,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { LuShieldCheck } from "react-icons/lu";
import { AdminLoginForm } from "./(components)/AdminLoginForm";

export default function AdminLoginPage() {
  const { mutateAsync, isPending } = api.admin.login.useMutation({
    onSuccess: () => {
      toaster.create({
        type: "success",
        title: "ログインしました！",
      });
    },
    onError: (error) => {
      showErrorToast(error.data?.code);
    },
  });

  return (
    <Center h="full">
      <Container maxW="xl">
        <Card.Root w="full">
          <Card.Body>
            <HStack gap={4} justify="center" mb={10}>
              <Icon color="purple.600" fontSize="3xl">
                <LuShieldCheck />
              </Icon>
              <Heading
                as="h1"
                size={{ base: "lg", sm: "xl" }}
                fontWeight="bold"
              >
                管理者ログイン
              </Heading>
            </HStack>
            <AdminLoginForm onSubmit={mutateAsync} isLoading={isPending} />
          </Card.Body>
        </Card.Root>
      </Container>
    </Center>
  );
}
