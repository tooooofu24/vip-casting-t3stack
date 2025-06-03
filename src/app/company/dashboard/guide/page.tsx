"use client";

import {
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
import {
  LuCheck,
  LuClock,
  LuFileText,
  LuPencil,
  LuTriangleAlert,
  LuWallet,
} from "react-icons/lu";

const registrationSteps = [
  {
    title: "基本情報の入力",
    description: "会社名、担当者名など基本的な情報を入力します。",
    time: "約2分",
    icon: LuPencil,
  },
  {
    title: "企業情報の入力",
    description: "事業内容、資本金、従業員数などの企業情報を入力します。",
    time: "約3分",
    icon: LuFileText,
  },
  {
    title: "支払い情報の設定",
    description: "請求先情報、支払い方法を設定します。",
    time: "約2分",
    icon: LuWallet,
  },
];

const benefits = [
  "VIPインフルエンサーへの直接アプローチが可能",
  "専任のアカウントマネージャーによるサポート",
  "効果測定レポートの提供",
  "柔軟な予算設定と支払い管理",
];

export default function CompanyRegistrationGuidePage() {
  return (
    <Box py={8} bg="gray.50">
      <Container maxW="3xl" px={4}>
        <VStack gap={6} align="stretch">
          <Heading as="h1" fontSize="3xl" fontWeight="bold">
            企業アカウント登録方法
          </Heading>

          {/* Overview */}
          <Card.Root bg="purple.50" border="none" shadow="none">
            <Card.Body>
              <Heading as="h2" fontSize="xl" fontWeight="semibold" mb={4}>
                3ステップで簡単登録
              </Heading>
              <Stack direction="row" gap={4} color="purple.600">
                <Icon as={LuClock} />
                <Text>所要時間：約7分</Text>
              </Stack>
            </Card.Body>
          </Card.Root>

          {/* Steps */}
          <VStack gap={6} align="stretch">
            {registrationSteps.map((step, index) => (
              <Card.Root key={index}>
                <Card.Body p={6}>
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
                      <Heading as="h3" fontSize="lg" fontWeight="semibold">
                        {step.title}
                      </Heading>
                      <Text color="gray.600">{step.description}</Text>
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
          <Card.Root>
            <Card.Body p={6}>
              <Heading as="h2" fontSize="xl" fontWeight="semibold" mb={4}>
                登録後のメリット
              </Heading>
              <List.Root listStylePosition="inside">
                {benefits.map((benefit, index) => (
                  <List.Item
                    key={index}
                    display="flex"
                    alignItems="center"
                    gap={3}
                  >
                    <Icon as={LuCheck} color="green.500" />
                    <Text>{benefit}</Text>
                  </List.Item>
                ))}
              </List.Root>
            </Card.Body>
          </Card.Root>

          {/* CTA */}
          <Box textAlign="center">
            <Link href="/influencer/register">
              <Button
                size="lg"
                px={6}
                py={3}
                fontSize="base"
                fontWeight="medium"
                rounded="md"
              >
                企業アカウントを作成する
              </Button>
            </Link>
          </Box>

          {/* Notes */}
          <Card.Root bg="yellow.50" border="none" shadow="none">
            <Card.Body p={6}>
              <Stack direction="row" gap={3}>
                <Icon
                  as={LuTriangleAlert}
                  boxSize={6}
                  color="yellow.600"
                  flexShrink={0}
                />
                <Stack gap={2}>
                  <Heading
                    as="h3"
                    fontSize="base"
                    fontWeight="semibold"
                    color="yellow.800"
                  >
                    登録時の注意事項
                  </Heading>
                  <List.Root listStylePosition="inside" color="yellow.700">
                    <List.Item>
                      • 登録には法人であることの確認書類が必要です
                    </List.Item>
                    <List.Item>
                      • 事業内容や商品によってはご利用いただけない場合があります
                    </List.Item>
                    <List.Item>
                      •
                      登録情報に虚偽があった場合、アカウントが停止される可能性があります
                    </List.Item>
                  </List.Root>
                </Stack>
              </Stack>
            </Card.Body>
          </Card.Root>
        </VStack>
      </Container>
    </Box>
  );
}
