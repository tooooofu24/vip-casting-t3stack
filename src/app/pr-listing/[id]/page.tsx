"use client";

import {
  Alert,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Dialog,
  Heading,
  HStack,
  Icon,
  List,
  Stack,
  Text,
  Textarea,
  Wrap,
} from "@chakra-ui/react";
import { LuBanknote, LuCalendar, LuMessageSquare } from "react-icons/lu";

// モックデータ
const mockPrListing = {
  id: "1",
  title: "美容系インフルエンサーがスキンケア商品のPRを募集",
  status: "active",
  platforms: ["Instagram", "TikTok"],
  priceRange: { min: 50000, max: 100000 },
  period: { start: "2024-04-01", end: "2024-04-30" },
  description:
    "美容系の商品PRを募集しています。スキンケア商品のレビューや使用感などを発信していただける方を探しています。",
  requirements: [
    "フォロワー5,000人以上",
    "美容関連の投稿実績がある方",
    "20代〜30代の女性",
    "日本在住の方",
  ],
  deliverables: "商品レビュー投稿2回、ストーリーズ投稿1回",
  preferredBrands: "スキンケア、コスメ、美容関連",
  ngCategories: "医薬品、健康食品",
  additionalNotes: "商品は提供させていただきます。",
  applicants: 5,
  createdAt: "2024-03-15",
  influencer: {
    name: "Beauty Creator",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    rating: 4.8,
    prCount: 25,
  },
};

export default function PrListingDetailPage() {
  return (
    <Box py="8" bg="gray.50">
      <Container maxW="4xl">
        {/* ヘッダー */}
        <Card.Root mb="6">
          <Card.Body>
            <Stack
              justify="space-between"
              direction={{ base: "column", md: "row" }}
              gap="4"
              mb="4"
            >
              <Stack gap="2">
                <Heading as="h1" size="lg">
                  {mockPrListing.title}
                </Heading>
                <HStack color="fg.muted" gap="4">
                  <HStack>
                    <Icon as={LuCalendar} />
                    <Text fontSize="sm" color="fg.muted">
                      {mockPrListing.period.start} 〜 {mockPrListing.period.end}
                    </Text>
                  </HStack>
                  <HStack>
                    <Icon as={LuBanknote} />
                    <Text fontSize="sm" color="fg.muted">
                      ¥{mockPrListing.priceRange.min.toLocaleString()} 〜 ¥
                      {mockPrListing.priceRange.max.toLocaleString()}
                    </Text>
                  </HStack>
                </HStack>
              </Stack>
              <Stack align={{ base: "start", md: "end" }}>
                <Badge variant="subtle" colorPalette="green">
                  募集中
                </Badge>
                <Text fontSize="sm" color="fg.muted">
                  応募数: {mockPrListing.applicants}件
                </Text>
              </Stack>
            </Stack>

            <Wrap mb="4">
              {mockPrListing.platforms.map((platform) => (
                <Badge key={platform} variant="subtle">
                  {platform}
                </Badge>
              ))}
            </Wrap>

            {/* インフルエンサー情報 */}
            <Card.Root variant="subtle" bg="gray.50">
              <Card.Body>
                <HStack gap={4}>
                  <Avatar.Root size="2xl">
                    <Avatar.Fallback name={mockPrListing.influencer.name} />
                    <Avatar.Image
                      src={mockPrListing.influencer.image}
                      alt={mockPrListing.influencer.name}
                    />
                  </Avatar.Root>
                  <Stack>
                    <Text fontWeight="medium">
                      {mockPrListing.influencer.name}
                    </Text>
                    <HStack gap={2}>
                      <Text color="fg.muted" fontSize="sm">
                        評価 {mockPrListing.influencer.rating}
                      </Text>
                      <Text color="fg.muted" fontSize="sm">
                        PR実績 {mockPrListing.influencer.prCount}件
                      </Text>
                    </HStack>
                  </Stack>
                </HStack>
              </Card.Body>
            </Card.Root>
          </Card.Body>
        </Card.Root>

        {/* 詳細情報 */}
        <Card.Root mb="6">
          <Card.Body>
            <Heading as="h2" size="md" mb="4">
              募集内容
            </Heading>
            <Stack gap="6">
              <Stack>
                <Text fontWeight="medium">説明</Text>
                <Text color="fg.muted">{mockPrListing.description}</Text>
              </Stack>

              <Stack>
                <Text fontWeight="medium">応募条件</Text>
                <List.Root listStyleType="disc" listStylePosition="inside">
                  {mockPrListing.requirements.map((req, index) => (
                    <List.Item key={index} color="fg.muted">
                      {req}
                    </List.Item>
                  ))}
                </List.Root>
              </Stack>

              <Stack>
                <Text fontWeight="medium">成果物</Text>
                <Text color="fg.muted">{mockPrListing.deliverables}</Text>
              </Stack>

              <Stack>
                <Text fontWeight="medium">希望ブランド</Text>
                <Text color="fg.muted">{mockPrListing.preferredBrands}</Text>
              </Stack>

              <Stack>
                <Text fontWeight="medium">NG業種・商材</Text>
                <Text color="fg.muted">{mockPrListing.ngCategories}</Text>
              </Stack>

              {mockPrListing.additionalNotes && (
                <Stack>
                  <Text fontWeight="medium">備考</Text>
                  <Text color="fg.muted">{mockPrListing.additionalNotes}</Text>
                </Stack>
              )}
            </Stack>
          </Card.Body>
        </Card.Root>

        {/* アクションボタン */}
        <Stack gap="4" mb="6">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button size="lg" w="full">
                <Icon as={LuMessageSquare} />
                メッセージを送る
              </Button>
            </Dialog.Trigger>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>メッセージを送る</Dialog.Title>
                  <Dialog.CloseTrigger />
                </Dialog.Header>
                <Dialog.Body>
                  <Textarea
                    placeholder="メッセージを入力してください"
                    rows={5}
                  />
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="ghost">キャンセル</Button>
                  </Dialog.ActionTrigger>
                  <Dialog.ActionTrigger asChild>
                    <Button>送信</Button>
                  </Dialog.ActionTrigger>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Positioner>
          </Dialog.Root>
        </Stack>

        {/* 注意事項 */}
        <Alert.Root status="warning" variant="surface">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>応募時の注意事項</Alert.Title>
            <Alert.Description>
              <List.Root gap="1">
                <List.Item>応募前に必ず募集内容をよくご確認ください</List.Item>
                <List.Item>
                  条件に合致しない場合は、応募をお控えください
                </List.Item>
                <List.Item>
                  不明点がある場合は、メッセージにてお問い合わせください
                </List.Item>
              </List.Root>
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      </Container>
    </Box>
  );
}
