"use client";

import { CompanyLoginForm } from "@/app/(company)/public/company/login/(components)/CompanyLoginForm";
import { toaster } from "@/lib/chakra-ui/toaster";
import { createSupabaseBrowserClient } from "@/lib/supabase/browserClient";
import {
  Box,
  Button,
  Card,
  Center,
  Container,
  Heading,
  HStack,
  Icon,
  List,
  Separator,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { LuBuilding2 } from "react-icons/lu";

const features = [
  "厳選されたVIPインフルエンサーとのマッチング",
  "専任のアカウントマネージャーによるサポート",
  "効果測定レポートの提供",
] as const;

export default function CompanyLoginPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (data.user?.user_metadata.role === "company") {
      toaster.create({
        type: "success",
        title: "ログインに成功しました",
      });
      router.push("/company/dashboard");
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
        title: "企業アカウントとしてログインできません",
      });
      await supabase.auth.signOut();
    }
  };

  return (
    <Center>
      <Container maxW="xl" py={32}>
        <VStack gap={8}>
          {/* Header */}
          <VStack gap={{ base: 2, sm: 4 }} align="center">
            <Icon as={LuBuilding2} boxSize={12} color="purple.600" />
            <Heading as="h1" size={{ base: "xl", sm: "2xl" }} fontWeight="bold">
              企業アカウントにログイン
            </Heading>
            <Text color="fg.muted" textAlign="center">
              インフルエンサーマッチングを始めましょう
            </Text>
          </VStack>

          {/* Login Form */}
          <Card.Root w="full">
            <Card.Body>
              <Stack gap={6} w="full">
                <CompanyLoginForm onSubmit={signIn} />
                {/* Separator */}
                <HStack>
                  <Separator flex="1" />
                  <Text fontSize="sm" color="fg.muted" flexShrink="0">
                    または
                  </Text>
                  <Separator flex="1" />
                </HStack>

                {/* Additional Links */}
                <VStack gap={4}>
                  <NextLink href="/company/register" style={{ width: "100%" }}>
                    <Button as="span" w="full" variant="outline">
                      企業アカウントを新規登録
                    </Button>
                  </NextLink>
                  <NextLink href="/login" style={{ width: "100%" }}>
                    <Button
                      as="span"
                      w="full"
                      variant="outline"
                      colorPalette="gray"
                    >
                      インフルエンサーの方はこちら
                    </Button>
                  </NextLink>
                </VStack>

                <Separator />

                {/* Benefits Section */}
                <Box pt={6}>
                  <Text fontWeight="bold" mb={4}>
                    企業アカウントの特徴
                  </Text>
                  <List.Root listStylePosition="inside">
                    {features.map((feature) => (
                      <List.Item key={feature} color="fg.muted">
                        {feature}
                      </List.Item>
                    ))}
                  </List.Root>
                </Box>
              </Stack>
            </Card.Body>
          </Card.Root>
        </VStack>
      </Container>
    </Center>
  );
}
