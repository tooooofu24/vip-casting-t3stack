"use client";

import { AdminLoginForm } from "@/app/admin/login/(components)/AdminLoginForm";
import { toaster } from "@/lib/chakra-ui/toaster";
import { createSupabaseBrowserClient } from "@/lib/supabase/browserClient";
import { api } from "@/lib/trpc/react";
import {
  Card,
  Center,
  Container,
  Heading,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { LuShieldCheck } from "react-icons/lu";

export default function AdminLoginPage() {
  const router = useRouter();

  const { mutateAsync } = api.admin.auth.login.useMutation({
    onSuccess: async ({ session: { access_token, refresh_token } }) => {
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.setSession({ access_token, refresh_token });
      toaster.create({
        title: "ログインしました",
        type: "success",
      });
      router.push("/admin/dashboard");
    },
    onError: (error) => {
      toaster.create({
        title: "ログインエラー",
        description: error.message,
        type: "error",
      });
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
            <AdminLoginForm onSubmit={mutateAsync} />
          </Card.Body>
        </Card.Root>
      </Container>
    </Center>
  );
}
