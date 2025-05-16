"use client";

import {
  Box,
  Button,
  Card,
  Link as ChakraLink,
  Checkbox,
  Container,
  Field,
  Heading,
  HStack,
  Icon,
  Input,
  NativeSelect,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { LuCircleAlert, LuMail, LuPhone, LuSend } from "react-icons/lu";

export default function ContactPage() {
  return (
    <Box py="8" bg="gray.50">
      <Container maxW="3xl" px="4">
        <Heading as="h1" fontSize="3xl" fontWeight="bold" mb="2">
          お問い合わせ
        </Heading>
        <Text color="fg.muted" mb="8">
          ご不明な点やご要望がございましたら、以下のフォームよりお気軽にお問い合わせください。
        </Text>

        {/* Contact Information */}
        <Card.Root bg="purple.50" rounded="lg" mb="8">
          <Card.Body>
            <Heading as="h2" size="md" mb="4">
              お問い合わせ窓口
            </Heading>
            <VStack align="stretch" gap="4">
              <HStack gap="3">
                <Icon color="purple.600">
                  <LuPhone />
                </Icon>
                <Box>
                  <Text fontWeight="medium">カスタマーサポート</Text>
                  <Text fontSize="sm" color="fg.muted">
                    平日 10:00-18:00
                  </Text>
                </Box>
              </HStack>
              <HStack gap="3">
                <Icon color="purple.600">
                  <LuMail />
                </Icon>
                <Box>
                  <Text fontWeight="medium">メールでのお問い合わせ</Text>
                  <Text fontSize="sm" color="fg.muted">
                    24時間受付
                  </Text>
                </Box>
              </HStack>
            </VStack>
          </Card.Body>
        </Card.Root>

        {/* Contact Form */}
        <Card.Root bg="white" rounded="lg" shadow="sm">
          <Card.Body>
            <Stack as="form" gap="6">
              <Field.Root required>
                <Field.Label>
                  お名前
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input placeholder="お名前" />
              </Field.Root>

              <Field.Root required>
                <Field.Label>
                  メールアドレス
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input type="email" placeholder="メールアドレス" />
              </Field.Root>

              <Field.Root>
                <Field.Label>電話番号</Field.Label>
                <Input type="tel" placeholder="電話番号" />
              </Field.Root>

              <Field.Root required>
                <Field.Label>
                  お問い合わせ種別
                  <Field.RequiredIndicator />
                </Field.Label>
                <NativeSelect.Root>
                  <NativeSelect.Field placeholder="選択してください">
                    <option value="service">サービスについて</option>
                    <option value="account">アカウントについて</option>
                    <option value="payment">お支払いについて</option>
                    <option value="campaign">案件について</option>
                    <option value="bug">不具合の報告</option>
                    <option value="other">その他</option>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              </Field.Root>

              <Field.Root required>
                <Field.Label>
                  お問い合わせ内容
                  <Field.RequiredIndicator />
                </Field.Label>
                <Textarea rows={5} placeholder="お問い合わせ内容" />
              </Field.Root>

              <HStack align="start" gap="2">
                <Checkbox.Root>
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>
                    <ChakraLink asChild>
                      <Link href="/privacy">プライバシーポリシー</Link>
                    </ChakraLink>
                    に同意の上、送信します。
                  </Checkbox.Label>
                </Checkbox.Root>
              </HStack>

              <HStack justify="space-between" pt="4">
                <HStack fontSize="sm" color="fg.muted">
                  <Icon color="fg.muted">
                    <LuCircleAlert />
                  </Icon>
                  <Text>必須項目</Text>
                </HStack>
                <Button>
                  <Icon>
                    <LuSend />
                  </Icon>
                  送信する
                </Button>
              </HStack>
            </Stack>
          </Card.Body>
        </Card.Root>

        {/* FAQ Link */}
        <Box mt="8" textAlign="center">
          <Text color="fg.muted">
            よくあるご質問は
            <ChakraLink asChild>
              <Link href="/help">ヘルプセンター</Link>
            </ChakraLink>
            をご確認ください。
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
