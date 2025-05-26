"use client";

import { AdminLoginForm } from "@/app/(admin)/admin-login/(components)/AdminLoginForm";
import { showErrorToast, toaster } from "@/lib/chakra-ui/toaster";
import { createSupabaseBrowserClient } from "@/lib/supabase/browserClient";
import { api } from "@/lib/trpc/react";
import type { AdminLoginRequest } from "@/validations/admin/adminLogin";
import {
  Button,
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
  const supabase = createSupabaseBrowserClient();
  const { mutateAsync: signUp, isPending: isSignUpPending } =
    api.admin.signUp.useMutation({
      onSuccess: () => {
        toaster.create({
          type: "success",
          title: "サインアップしました！",
        });
      },
      onError: (error) => {
        showErrorToast(error.data?.code);
      },
    });

  const signIn = async ({ email, password }: AdminLoginRequest) => {
    const supabase = createSupabaseBrowserClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (data.user?.user_metadata.role === "admin") {
      toaster.create({
        type: "success",
        title: "ログインに成功しました",
      });
      router.push("/admin/dashboard");
      return;
    }
    if (error) {
      toaster.create({
        type: "error",
        title: error.message,
      });
    } else {
      toaster.create({
        type: "error",
        title: "ログインに失敗しました",
      });
      await supabase.auth.signOut();
    }
  };

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
            <AdminLoginForm onSubmit={signIn} />
            <Button mt={4} onClick={() => signUp()} loading={isSignUpPending}>
              サインアップ
            </Button>
            <Button mt={4} onClick={() => supabase.auth.signOut()}>
              ログアウト
            </Button>
          </Card.Body>
        </Card.Root>
      </Container>
    </Center>
  );
}
