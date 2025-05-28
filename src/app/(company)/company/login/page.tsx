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
import { LuArrowRight, LuBuilding2, LuLock, LuMail } from "react-icons/lu";

const features = [
  "厳選されたVIPインフルエンサーとのマッチング",
  "専任のアカウントマネージャーによるサポート",
  "効果測定レポートの提供",
] as const;

export default function CompanyLoginPage() {
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
                      placeholder="company@example.com"
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
                    <NextLink href="">パスワードをお忘れですか？</NextLink>
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
                  <List.Root px={4} gap={2}>
                    {features.map((feature) => (
                      <List.Item key={feature}>
                        <Text color="fg.muted">{feature}</Text>
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
