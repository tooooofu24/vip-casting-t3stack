"use client";

import { CampaignCard } from "@/app/(influencer)/campaigns/(components)/CampaignCard";
import { MOCK_CAMPAIGNS } from "@/app/(influencer)/campaigns/mock";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Field,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  NativeSelect,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import {
  LuCrown,
  LuSearch,
  LuSlidersHorizontal,
  LuStar,
  LuTrendingUp,
  LuUsers,
} from "react-icons/lu";

// 仮のデータ（後で実際のデータに置き換え）
const PLATFORMS = ["Instagram", "TikTok", "YouTube", "Twitter"];
const GENRES = [
  "ビューティー",
  "ファッション",
  "フード",
  "テクノロジー",
  "ライフスタイル",
  "トラベル",
  "フィットネス",
  "エンタメ",
];

export default function CampaignsPage() {
  return (
    <Box py={8} bg="bg.subtle">
      <Container>
        {/* Hero Section */}
        <Box
          bgGradient="to-r"
          gradientFrom="purple.700"
          gradientTo="purple.900"
          color="white"
          p={8}
          rounded="lg"
          mb={8}
        >
          <Box maxW="3xl">
            <Heading
              as="h1"
              fontSize={{ base: "4xl", md: "5xl" }}
              fontWeight="bold"
              mb={6}
              lineHeight="tight"
            >
              限定案件を探す
            </Heading>
            <Text fontSize="xl" mb={8} color="purple.100">
              VIPキャスティングだけの、厳選された高単価案件をご紹介します。
            </Text>
            <HStack gap={6}>
              <HStack gap={2}>
                <Icon as={LuCrown} color="yellow.400" />
                <Text>VIP限定案件: 10件</Text>
              </HStack>
              <HStack gap={2}>
                <Icon as={LuStar} color="yellow.400" />
                <Text>平均報酬: ¥85,000</Text>
              </HStack>
              <HStack gap={2}>
                <Icon as={LuTrendingUp} color="yellow.400" />
                <Text>新規案件: 今週10件追加</Text>
              </HStack>
            </HStack>
          </Box>
        </Box>

        {/* Search and Filter Controls */}
        <Card.Root mb={8}>
          <Card.Body p={6}>
            <Stack direction={{ base: "column", md: "row" }} gap={4} mb={4}>
              <Box flex={1}>
                <InputGroup>
                  <InputGroup
                    startElement={
                      <Icon color="fg.muted">
                        <LuSearch />
                      </Icon>
                    }
                  >
                    <Input placeholder="案件を検索..." />
                  </InputGroup>
                </InputGroup>
              </Box>
              <Button variant="outline">
                <Icon>
                  <LuSlidersHorizontal />
                </Icon>
                <Text ml={2}>フィルター</Text>
              </Button>
            </Stack>

            {/* Detailed Filters */}
            <Box borderTopWidth={1} pt={6}>
              {/* Platform Filter */}
              <Field.Root mb={6}>
                <Field.Label>プラットフォーム</Field.Label>
                <VStack align="start" gap={2}>
                  {PLATFORMS.map((platform) => (
                    <Checkbox.Root key={platform} value={platform}>
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
                      <Checkbox.Label>{platform}</Checkbox.Label>
                    </Checkbox.Root>
                  ))}
                </VStack>
              </Field.Root>

              {/* Genre Filter */}
              <Field.Root mb={6}>
                <Field.Label>カテゴリ</Field.Label>
                <Wrap gap={2}>
                  {GENRES.map((genre) => (
                    <WrapItem key={genre}>
                      <Button size="sm" variant="outline">
                        {genre}
                      </Button>
                    </WrapItem>
                  ))}
                </Wrap>
              </Field.Root>

              {/* Price Range */}
              <Field.Root mb={6}>
                <Field.Label>報酬範囲</Field.Label>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                  <InputGroup
                    startElement={
                      <Text color="fg.muted" pl={3}>
                        ¥
                      </Text>
                    }
                  >
                    <Input type="number" placeholder="最小" />
                  </InputGroup>
                  <InputGroup
                    startElement={
                      <Text color="fg.muted" pl={3}>
                        ¥
                      </Text>
                    }
                  >
                    <Input type="number" placeholder="最大" />
                  </InputGroup>
                </SimpleGrid>
              </Field.Root>

              {/* Follower Requirement */}
              <Field.Root mb={6}>
                <Field.Label>必要フォロワー数</Field.Label>
                <InputGroup
                  startElement={
                    <Icon color="fg.muted">
                      <LuUsers />
                    </Icon>
                  }
                >
                  <Input type="number" placeholder="最小フォロワー数" />
                </InputGroup>
              </Field.Root>

              {/* Campaign Type */}
              <Field.Root mb={6}>
                <Field.Label>案件種別</Field.Label>
                <Wrap gap={4}>
                  <Checkbox.Root>
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label>VIP限定案件のみ</Checkbox.Label>
                  </Checkbox.Root>
                  <Checkbox.Root>
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label>有償案件のみ</Checkbox.Label>
                  </Checkbox.Root>
                  <Checkbox.Root>
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label>無償案件のみ</Checkbox.Label>
                  </Checkbox.Root>
                </Wrap>
              </Field.Root>

              {/* Post Type */}
              <Field.Root mb={6}>
                <Field.Label>投稿形式</Field.Label>
                <HStack gap={4}>
                  <Checkbox.Root>
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label>投稿のみ</Checkbox.Label>
                  </Checkbox.Root>
                  <Checkbox.Root>
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label>下書き確認あり</Checkbox.Label>
                  </Checkbox.Root>
                </HStack>
              </Field.Root>

              {/* Campaign Status */}
              <Field.Root mb={6}>
                <Field.Label>募集状況</Field.Label>
                <NativeSelect.Root>
                  <NativeSelect.Field>
                    <option value="all">すべて</option>
                    <option value="active">募集中</option>
                    <option value="ending-soon">締切間近</option>
                    <option value="closed">締切済み</option>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              </Field.Root>

              {/* Date Range */}
              <Field.Root mb={6}>
                <Field.Label>募集期間</Field.Label>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                  <Input type="date" />
                  <Input type="date" />
                </SimpleGrid>
              </Field.Root>

              {/* Filter Actions */}
              <Box borderTopWidth={1} pt={4} textAlign="right">
                <Button variant="ghost" colorScheme="gray">
                  クリア
                </Button>
              </Box>
            </Box>
          </Card.Body>
        </Card.Root>

        {/* Sort Controls */}
        <HStack justify="space-between" mb={6}>
          <NativeSelect.Root w="auto">
            <NativeSelect.Field>
              <option value="latest">新着順</option>
              <option value="price-high">報酬額が高い順</option>
              <option value="price-low">報酬額が低い順</option>
              <option value="deadline">締切が近い順</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          <Text fontSize="sm" color="fg.muted">
            0件の案件が見つかりました
          </Text>
        </HStack>

        {/* Campaign Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8}>
          {MOCK_CAMPAIGNS.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </SimpleGrid>

        {/* Empty State */}
        {MOCK_CAMPAIGNS.length === 0 && (
          <Box py={12} textAlign="center" color="fg.muted">
            条件に一致する案件が見つかりませんでした。
          </Box>
        )}
      </Container>
    </Box>
  );
}
