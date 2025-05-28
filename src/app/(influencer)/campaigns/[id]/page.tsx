"use client";

import { ApplyButton } from "@/app/(influencer)/campaigns/[id]/components/ApplyButton";
import {
  Badge,
  Box,
  Container,
  Flex,
  Grid,
  HStack,
  Icon,
  Image,
  List,
  Stack,
  Text,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { LuCalendar, LuCircleAlert, LuDollarSign } from "react-icons/lu";

// 本来はAPIから取得するデータ
const campaignData = {
  id: 1,
  company: "Beauty Co.",
  title: "春の新作コスメPRキャンペーン",
  budgetFrom: 50000,
  budgetTo: 100000,
  platform: "Instagram",
  followers: "5,000+",
  deadline: new Date("2024-04-30"),
  image:
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=500",
  genre: "ビューティー",
  description:
    "春の新作コスメについて、実際に使用した感想とメイク方法を紹介していただきます。ナチュラルメイクからフルメイクまで、様々なスタイルに対応可能な商品となっています。",
  period: {
    start: new Date("2024-05-01"),
    end: new Date("2024-05-31"),
  },
  requirements: [
    "フォロワー5,000人以上",
    "化粧品関連の投稿実績がある方",
    "20代～30代の女性",
    "日本在住の方",
  ],
  cautions: [
    "投稿内容は事前に確認させていただきます",
    "ステルスマーケティングは禁止です",
    "投稿後30日間は削除禁止です",
    "他社の競合商品の紹介は禁止です",
  ],
};

export default function CampaignDetailPage() {
  return (
    <Box minH="100vh" bg="gray.50" py="8">
      <Container maxW="container.xl" px="4">
        {/* Hero Section */}
        <Box bg="white" rounded="lg" shadow="sm" overflow="hidden" mb="8">
          <Box position="relative" h={{ base: "64", md: "96" }}>
            <Image
              src={campaignData.image}
              alt={campaignData.title}
              w="full"
              h="full"
              objectFit="cover"
            />
            <HStack position="absolute" top="4" left="4" gap="2">
              <Badge
                bg="purple.600"
                color="white"
                px="3"
                py="1"
                rounded="full"
                fontSize="sm"
              >
                {campaignData.platform}
              </Badge>
              <Badge
                bg="purple.600"
                color="white"
                px="3"
                py="1"
                rounded="full"
                fontSize="sm"
              >
                {campaignData.genre}
              </Badge>
            </HStack>
          </Box>

          <Box p="6">
            <Text fontSize="sm" color="gray.500" mb="2">
              {campaignData.company}
            </Text>
            <Text fontSize="2xl" fontWeight="bold" mb="4">
              {campaignData.title}
            </Text>

            <Flex align="center" justify="space-between" mb="6">
              <Text color="purple.600" fontWeight="semibold" fontSize="xl">
                ¥{campaignData.budgetFrom.toLocaleString()} 〜 ¥
                {campaignData.budgetTo.toLocaleString()}
              </Text>
              <ApplyButton />
            </Flex>
          </Box>
        </Box>

        <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap="8">
          {/* Main Content */}
          <Stack gap="8">
            {/* Campaign Overview */}
            <Box bg="white" rounded="lg" shadow="sm" p="6">
              <Text fontSize="xl" fontWeight="bold" mb="4">
                案件概要
              </Text>
              <Text color="gray.600" whiteSpace="pre-line">
                {campaignData.description}
              </Text>
            </Box>

            {/* Post Period */}
            <Box bg="white" rounded="lg" shadow="sm" p="6">
              <Text fontSize="xl" fontWeight="bold" mb="4">
                投稿期間
              </Text>
              <HStack color="gray.600">
                <Icon as={LuCalendar} />
                <Text>
                  {format(campaignData.period.start, "yyyy年MM月dd日", {
                    locale: ja,
                  })}{" "}
                  〜{" "}
                  {format(campaignData.period.end, "yyyy年MM月dd日", {
                    locale: ja,
                  })}
                </Text>
              </HStack>
            </Box>

            {/* Cautions */}
            <Box bg="white" rounded="lg" shadow="sm" p="6">
              <Text fontSize="xl" fontWeight="bold" mb="4">
                注意事項
              </Text>
              <List.Root listStylePosition="inside">
                {campaignData.cautions.map((caution, index) => (
                  <List.Item
                    key={index}
                    display="flex"
                    alignItems="flex-start"
                    color="gray.600"
                  >
                    <Icon as={LuCircleAlert} />
                    <Text>{caution}</Text>
                  </List.Item>
                ))}
              </List.Root>
            </Box>
          </Stack>

          {/* Sidebar */}
          <Stack gap="8">
            {/* Requirements */}
            <Box bg="white" rounded="lg" shadow="sm" p="6">
              <Text fontSize="xl" fontWeight="bold" mb="4">
                応募条件
              </Text>
              <List.Root listStylePosition="inside">
                {campaignData.requirements.map((requirement, index) => (
                  <List.Item
                    key={index}
                    display="flex"
                    alignItems="center"
                    color="gray.600"
                  >
                    <Box w="2" h="2" bg="purple.600" rounded="full" mr="2" />
                    <Text>{requirement}</Text>
                  </List.Item>
                ))}
              </List.Root>
            </Box>

            {/* Payment */}
            <Box bg="white" rounded="lg" shadow="sm" p="6">
              <Text fontSize="xl" fontWeight="bold" mb="4">
                報酬
              </Text>
              <HStack color="gray.600">
                <Icon as={LuDollarSign} />
                <Text fontSize="lg" fontWeight="semibold" color="purple.600">
                  ¥{campaignData.budgetFrom.toLocaleString()} 〜 ¥
                  {campaignData.budgetTo.toLocaleString()}
                </Text>
              </HStack>
            </Box>
          </Stack>
        </Grid>
      </Container>
    </Box>
  );
}
