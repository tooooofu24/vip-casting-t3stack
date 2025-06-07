"use client";

import { InfluencerLoginForm } from "@/app/influencer/login/(components)/InfluencerLoginForm";
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
  List,
  Separator,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

const features = [
  "厳選された高単価案件のみを取扱",
  "専属マネージャーによるサポート",
  "一流企業とのマッチング",
] as const;

export default function LoginPage() {
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
    if (data.user?.user_metadata.role === "influencer") {
      toaster.create({
        type: "success",
        title: "ログインに成功しました",
      });
      router.push("/influencer/dashboard");
      return;
    }
    if (error) {
      toaster.create({
        type: "error",
        title: "ログインに失敗しました",
        description: error.message,
      });
    } else {
      toaster.create({
        type: "error",
        title: "ログインに失敗しました",
        description: "インフルエンサーアカウントとしてログインできません",
      });
      await supabase.auth.signOut();
    }
  };

  return (
    <Center px={{ base: 4, sm: 0 }}>
      <Container maxW="xl" py={{ base: 6, sm: 12 }}>
        <VStack gap={8}>
          {/* Header */}
          <VStack gap={{ base: 2, sm: 4 }}>
            <Heading as="h1" size={{ base: "xl", sm: "2xl" }} fontWeight="bold">
              アカウントにログイン
            </Heading>
            <Text color="fg.muted" textAlign="center">
              インフルエンサーアカウントへのログインはこちら
            </Text>
          </VStack>

          {/* Login Form */}
          <Card.Root w="full">
            <Card.Body p={{ base: 4, sm: 6, md: 8 }}>
              <Stack gap={{ base: 4, sm: 6 }}>
                <InfluencerLoginForm onSubmit={signIn} />

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
                  <Button
                    w="full"
                    variant="outline"
                    colorPalette="gray"
                    asChild
                  >
                    <NextLink href="/influencer/register">
                      会員登録はこちら(審査制)
                    </NextLink>
                  </Button>
                  <Button
                    w="full"
                    variant="outline"
                    colorPalette="gray"
                    asChild
                  >
                    <NextLink href="/company/login">企業の方はこちら</NextLink>
                  </Button>
                </VStack>

                <Separator />

                {/* Benefits Section */}
                <Box pt={6}>
                  <Text fontWeight="bold" mb={4}>
                    VIPキャスティングの特徴
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
