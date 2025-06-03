"use client";

import {
  Box,
  Button,
  Card,
  Center,
  Link as ChakraLink,
  Checkbox,
  Container,
  Field,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  List,
  Separator,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { LuArrowRight, LuLock, LuMail } from "react-icons/lu";

const features = [
  "厳選された高単価案件のみを取扱",
  "専属マネージャーによるサポート",
  "一流企業とのマッチング",
] as const;

export default function LoginPage() {
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
                {/* Email Field */}
                <Field.Root>
                  <Field.Label>メールアドレス</Field.Label>
                  <InputGroup
                    startElement={
                      <Icon>
                        <LuMail />
                      </Icon>
                    }
                  >
                    <Input
                      type="email"
                      placeholder="example@example.com"
                      autoComplete="email"
                      required
                    />
                  </InputGroup>
                </Field.Root>

                {/* Password Field */}
                <Field.Root>
                  <Field.Label>パスワード</Field.Label>
                  <InputGroup
                    startElement={
                      <Icon>
                        <LuLock />
                      </Icon>
                    }
                  >
                    <Input
                      type="password"
                      placeholder="パスワードを入力"
                      autoComplete="current-password"
                      required
                    />
                  </InputGroup>
                </Field.Root>

                {/* Remember Me & Forgot Password */}
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  justify="space-between"
                  align={{ base: "flex-start", sm: "center" }}
                  gap={2}
                >
                  <Checkbox.Root>
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label>ログイン状態を保持</Checkbox.Label>
                  </Checkbox.Root>
                  <ChakraLink asChild fontSize="sm">
                    <NextLink href="/influencer/forget-password">
                      パスワードをお忘れですか？
                    </NextLink>
                  </ChakraLink>
                </Stack>

                {/* Login Button */}
                <Button colorPalette="primary" w="full">
                  <HStack>
                    <Text>ログイン</Text>
                    <Icon>
                      <LuArrowRight />
                    </Icon>
                  </HStack>
                </Button>

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
