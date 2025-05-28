"use client";

import { RegistrationSteps } from "@/app/(influencer)/public/register/(components)/RegistrationSteps";
import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Heading,
  Icon,
  List,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { LuCheck, LuChevronRight } from "react-icons/lu";

export default function CompletePage() {
  return (
    <Box py={{ base: 8, md: 12 }}>
      <Container maxW="2xl">
        <VStack gap={12} align="stretch">
          {/* Header */}
          <VStack align="center" gap={2}>
            <Heading size="3xl" fontWeight="bold">
              インフルエンサー登録
            </Heading>
            <Text color="fg.muted" fontSize="md">
              VIPキャスティングで、あなたのキャリアをさらなる高みへ
            </Text>
          </VStack>

          <VStack gap={4} align="stretch">
            <RegistrationSteps step={4} />

            {/* Content */}
            <Card.Root>
              <Card.Body>
                <VStack gap={8} align="center" py={8}>
                  {/* Success Icon */}
                  <Box
                    bg="green.100"
                    color="green.500"
                    p={4}
                    borderRadius="full"
                  >
                    <Icon as={LuCheck} boxSize={12} />
                  </Box>

                  {/* Message */}
                  <VStack gap={2}>
                    <Heading size="lg">登録申請を受け付けました</Heading>
                    <Text color="fg.muted" textAlign="center">
                      内容を確認の上、3営業日以内にご登録いただいたメールアドレスへ
                      <br />
                      審査結果をお送りいたします。
                    </Text>
                  </VStack>

                  {/* Actions */}
                  <Link href="/" style={{ textDecoration: "none" }}>
                    <Button size="lg">
                      トップページへ戻る
                      <Icon>
                        <LuChevronRight />
                      </Icon>
                    </Button>
                  </Link>
                </VStack>
              </Card.Body>
            </Card.Root>

            {/* Note */}
            <Alert.Root status="neutral" variant="subtle" colorPalette="gray">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>審査完了までの流れ</Alert.Title>
                <Alert.Description mt={2}>
                  <List.Root as="ol" listStylePosition="inside">
                    <List.Item>プロフィール内容の確認（1-2営業日）</List.Item>
                    <List.Item>SNSアカウントの確認（1営業日）</List.Item>
                    <List.Item>審査結果のご連絡</List.Item>
                  </List.Root>
                  <Text color="fg.muted" fontSize="sm" mt={4}>
                    ※ 審査状況により、お時間をいただく場合がございます。
                  </Text>
                </Alert.Description>
              </Alert.Content>
            </Alert.Root>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
