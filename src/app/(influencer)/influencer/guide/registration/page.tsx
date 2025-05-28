"use client";

import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Heading,
  Icon,
  List,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { LuCircleCheckBig, LuClock, LuTriangleAlert } from "react-icons/lu";

const steps = [
  {
    title: "基本情報の入力",
    description:
      "メールアドレス、パスワード、お名前など基本的な情報を入力します。",
    time: "約1分",
  },
  {
    title: "SNSアカウントの連携",
    description: "Instagram、Twitter、YouTubeなどのSNSアカウントを連携します。",
    time: "約1分",
  },
  {
    title: "本人確認書類のアップロード",
    description:
      "運転免許証、パスポート、マイナンバーカードのいずれかをアップロードします。",
    time: "約1分",
  },
];

const benefits = [
  "人気ブランドの案件に応募可能",
  "報酬管理機能の利用",
  "メッセージ機能で企業と直接やり取り",
  "専属マネージャーによるサポート",
];

export default function RegistrationGuidePage() {
  return (
    <Container py={8} maxW="3xl">
      <VStack gap={8} align="stretch">
        <Heading as="h1" size="2xl">
          登録方法
        </Heading>

        {/* Overview */}
        <Alert.Root status="info" variant="subtle">
          <Alert.Indicator>
            <Icon as={LuClock} />
          </Alert.Indicator>
          <Alert.Content>
            <Alert.Title>3ステップで簡単登録</Alert.Title>
            <Alert.Description>所要時間：約3分</Alert.Description>
          </Alert.Content>
        </Alert.Root>

        {/* Steps */}
        <VStack gap={6} align="stretch">
          {steps.map((step, index) => (
            <Card.Root key={index} variant="outline">
              <Card.Body>
                <Stack direction="row" gap={4}>
                  <Box
                    bg="purple.100"
                    w={8}
                    h={8}
                    rounded="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                  >
                    <Text color="purple.600" fontWeight="semibold">
                      {index + 1}
                    </Text>
                  </Box>
                  <Stack gap={2}>
                    <Card.Title>{step.title}</Card.Title>
                    <Card.Description color="gray.600">
                      {step.description}
                    </Card.Description>
                    <Stack
                      direction="row"
                      align="center"
                      color="gray.500"
                      fontSize="sm"
                    >
                      <Icon as={LuClock} />
                      <Text>{step.time}</Text>
                    </Stack>
                  </Stack>
                </Stack>
              </Card.Body>
            </Card.Root>
          ))}
        </VStack>

        {/* Benefits */}
        <Card.Root variant="outline">
          <Card.Header>
            <Card.Title>登録後のメリット</Card.Title>
          </Card.Header>
          <Card.Body>
            <List.Root listStylePosition="inside">
              {benefits.map((benefit, index) => (
                <List.Item
                  key={index}
                  display="flex"
                  alignItems="center"
                  gap={3}
                >
                  <List.Indicator asChild color="green.500">
                    <Icon as={LuCircleCheckBig} />
                  </List.Indicator>
                  <Text>{benefit}</Text>
                </List.Item>
              ))}
            </List.Root>
          </Card.Body>
        </Card.Root>

        {/* CTA */}
        <Box textAlign="center">
          <Link href="/register" passHref>
            <Button size="lg">インフルエンサーアカウントを作成する</Button>
          </Link>
        </Box>

        {/* Notes */}
        <Alert.Root status="warning" variant="subtle">
          <Alert.Indicator>
            <Icon as={LuTriangleAlert} />
          </Alert.Indicator>
          <Alert.Content>
            <Alert.Title>登録時の注意事項</Alert.Title>
            <Alert.Description>
              <List.Root listStylePosition="inside">
                <List.Item>本人確認書類は必ず原本をご用意ください</List.Item>
                <List.Item>
                  SNSアカウントは実際に運用しているものを連携してください
                </List.Item>
                <List.Item>
                  登録情報に虚偽があった場合、アカウントが停止される可能性があります
                </List.Item>
              </List.Root>
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      </VStack>
    </Container>
  );
}
