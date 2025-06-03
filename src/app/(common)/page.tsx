"use client";

import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { LuArrowRight, LuCrown, LuTrendingUp, LuUsers } from "react-icons/lu";

// TODO: 認証状態の管理を実装
const isAuthenticated = true;

export default function HomePage() {
  return (
    <Stack as="main" gap={0}>
      {/* Hero Section */}
      <Box
        bgGradient="to-r"
        gradientFrom="purple.900"
        gradientVia="purple.800"
        gradientTo="purple.900"
        color="white"
        py={{ base: 32, md: 40 }}
        position="relative"
        overflow="hidden"
      >
        {/* Decorative Elements */}
        <Box
          position="absolute"
          top="25%"
          right="30%"
          pointerEvents="none"
          bg="red.300"
          p="10px"
          borderRadius="full"
          opacity={0.5}
          animation="slide-from-bottom-full 2s ease-in-out infinite alternate"
        />
        <Box
          position="absolute"
          top="15%"
          right="60%"
          pointerEvents="none"
          bg="pink.300"
          p="15px"
          borderRadius="full"
          opacity={0.4}
          animation="slide-from-bottom-full 3s ease-in-out 2s infinite alternate"
        />
        <Box
          position="absolute"
          top="60%"
          right="70%"
          pointerEvents="none"
          bg="yellow.300"
          p="12px"
          borderRadius="full"
          opacity={0.8}
          animation="slide-from-bottom-full 2.5s ease-in-out 1s infinite alternate"
        />

        {/* Content */}
        <Container maxW="container.xl">
          <VStack maxW="3xl" mx="auto" textAlign="center" gap={6}>
            <Icon boxSize={12} color="yellow.400">
              <LuCrown />
            </Icon>
            <Heading
              size={{ base: "4xl", md: "5xl" }}
              lineHeight="tight"
              fontWeight="bold"
            >
              選ばれしトップインフルエンサーへ、
              <br />
              最高の舞台を。
            </Heading>
            <Text fontSize="xl" color="purple.100">
              一流企業との出会いがあなたのキャリアを加速させます。
              <br />
              VIPキャスティングで、さらなる高みへ。
            </Text>
            <HStack gap={4}>
              {!isAuthenticated && (
                <Link href="/register">
                  <Button
                    as="span"
                    bg="white"
                    color="purple.700"
                    size="lg"
                    _hover={{ bg: "purple.50" }}
                  >
                    会員登録はこちら(審査制)
                    <Icon size="lg" ml={2}>
                      <LuArrowRight />
                    </Icon>
                  </Button>
                </Link>
              )}
              <Link href="/company/campaigns">
                <Button as="span" size="lg" variant="solid">
                  限定案件を見る
                  <Icon size="lg" ml={2}>
                    <LuArrowRight />
                  </Icon>
                </Button>
              </Link>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box py={12}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 2, md: 4 }} gap={8} textAlign="center">
            <Box>
              <Text fontSize="3xl" fontWeight="bold" color="purple.600" mb={2}>
                1,000+
              </Text>
              <Text color="gray.600">選ばれしインフルエンサー</Text>
            </Box>
            <Box>
              <Text fontSize="3xl" fontWeight="bold" color="purple.600" mb={2}>
                500+
              </Text>
              <Text color="gray.600">一流企業との取引実績</Text>
            </Box>
            <Box>
              <Text fontSize="3xl" fontWeight="bold" color="purple.600" mb={2}>
                200万円
              </Text>
              <Text color="gray.600">最高月間報酬実績</Text>
            </Box>
            <Box>
              <Text fontSize="3xl" fontWeight="bold" color="purple.600" mb={2}>
                98%
              </Text>
              <Text color="gray.600">インフルエンサー満足度</Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box bg="gray.50" py={20}>
        <Container maxW="container.xl">
          <VStack gap={12}>
            <VStack gap={4}>
              <Heading as="h2" size="3xl" fontWeight="bold" textAlign="center">
                トップインフルエンサーだけの特権
              </Heading>
              <Text color="gray.600" textAlign="center" maxW="2xl">
                VIPキャスティングは、あなたの価値を最大限に引き出すための特別なプラットフォームです。
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
              <Box p={8} bg="white" borderRadius="lg" boxShadow="md">
                <VStack align="flex-start" gap={4}>
                  <Box bg="purple.100" p={3} borderRadius="lg">
                    <Icon boxSize={6} color="purple.600">
                      <LuCrown />
                    </Icon>
                  </Box>
                  <Heading size="md">限定案件のみ取扱</Heading>
                  <Text color="gray.600">
                    一般公募では出会えない、厳選された高単価案件のみを取り扱い。
                    あなたの影響力に見合った、価値ある案件をご紹介します。
                  </Text>
                </VStack>
              </Box>

              <Box p={8} bg="white" borderRadius="lg" boxShadow="md">
                <VStack align="flex-start" gap={4}>
                  <Box bg="purple.100" p={3} borderRadius="lg">
                    <Icon boxSize={6} color="purple.600">
                      <LuUsers />
                    </Icon>
                  </Box>
                  <Heading size="md">専属マネージャー</Heading>
                  <Text color="gray.600">
                    経験豊富な専属マネージャーが、案件の選定から契約まで徹底サポート。
                    あなたは創作活動に集中できます。
                  </Text>
                </VStack>
              </Box>

              <Box p={8} bg="white" borderRadius="lg" boxShadow="md">
                <VStack align="flex-start" gap={4}>
                  <Box bg="purple.100" p={3} borderRadius="lg">
                    <Icon boxSize={6} color="purple.600">
                      <LuTrendingUp />
                    </Icon>
                  </Box>
                  <Heading size="md">キャリア成長</Heading>
                  <Text color="gray.600">
                    一流企業との取引実績があなたのポートフォリオを強化。
                    ステップアップのチャンスを逃しません。
                  </Text>
                </VStack>
              </Box>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* CTA Section */}
      {!isAuthenticated && (
        <Box py={20}>
          <Container maxW="container.xl">
            <VStack gap={6}>
              <Heading as="h2" size="xl" textAlign="center">
                あなたも選ばれし1000人へ
              </Heading>
              <Text
                fontSize="xl"
                color="gray.600"
                textAlign="center"
                maxW="2xl"
              >
                審査制登録で、特別な案件があなたを待っています。
                <br />
                まずは案件をチェックしてみませんか？
              </Text>
              <Stack direction={{ base: "column", sm: "row" }} gap={4}>
                <Link href="/register">
                  <Button as="span" size="lg">
                    会員登録はこちら(審査制)
                  </Button>
                </Link>
                <Link href="/company/campaigns">
                  <Button as="span" variant="ghost" size="lg">
                    限定案件を見る
                  </Button>
                </Link>
              </Stack>
            </VStack>
          </Container>
        </Box>
      )}
    </Stack>
  );
}
