"use client";

import {
  Badge,
  Box,
  Card,
  Link as ChakraLink,
  Container,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  LuBuilding2,
  LuCalendar,
  LuClock,
  LuMessageSquare,
  LuTrendingUp,
  LuUsers,
} from "react-icons/lu";

// モックデータ
const mockCampaigns = [
  {
    id: "1",
    title: "美容系商品のPR募集",
    platform: "Instagram",
    draftDeadline: "2024-04-15",
    postDate: "2024-04-20",
    budget: "¥50,000",
    status: "active",
    applications: [1, 2, 3],
  },
  {
    id: "2",
    title: "食品系商品のレビュー",
    platform: "TikTok",
    draftDeadline: "2024-04-18",
    postDate: "2024-04-25",
    budget: "¥30,000",
    status: "active",
    applications: [1, 2],
  },
];

// 進行中の案件を取得
const activeCampaigns = mockCampaigns.filter(
  (campaign) => campaign.status === "active",
);

// 今月のスケジュールを生成
const scheduleEvents = activeCampaigns
  .flatMap((campaign) => {
    const events = [];

    // 下書き提出日のイベント
    if (campaign.draftDeadline) {
      events.push({
        id: `${campaign.id}-draft`,
        date: campaign.draftDeadline,
        title: `${campaign.title} - 下書き提出期限`,
        type: "下書き確認",
        campaignId: campaign.id,
      });
    }

    // 投稿日のイベント
    if (campaign.postDate) {
      events.push({
        id: `${campaign.id}-post`,
        date: campaign.postDate,
        title: `${campaign.title} - 投稿日`,
        type: "投稿",
        campaignId: campaign.id,
      });
    }

    return events;
  })
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

export default function CompanyDashboardPage() {
  return (
    <Box py="6" bg="gray.50">
      <Container maxW="container.xl">
        <Heading as="h1" size="lg" mb="6">
          企業ダッシュボード
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 4 }} gap="6" mb="8">
          {/* Overview Cards */}
          <Card.Root>
            <Card.Body>
              <Stack gap="4">
                <HStack justify="space-between">
                  <Text fontWeight="semibold">進行中の案件</Text>
                  <Icon as={LuBuilding2} color="purple.600" />
                </HStack>
                <Text fontSize="3xl" fontWeight="bold" color="purple.600">
                  {activeCampaigns.length}
                </Text>
                <Text fontSize="sm" color="fg.muted">
                  件の案件を実施中
                </Text>
              </Stack>
            </Card.Body>
          </Card.Root>

          <Card.Root>
            <Card.Body>
              <Stack gap="4">
                <HStack justify="space-between">
                  <Text fontWeight="semibold">応募者数</Text>
                  <Icon as={LuUsers} color="purple.600" />
                </HStack>
                <Text fontSize="3xl" fontWeight="bold" color="purple.600">
                  {activeCampaigns.reduce(
                    (sum, campaign) => sum + campaign.applications.length,
                    0,
                  )}
                </Text>
                <Text fontSize="sm" color="fg.muted">
                  人が応募中
                </Text>
              </Stack>
            </Card.Body>
          </Card.Root>

          <Card.Root>
            <Card.Body>
              <Stack gap="4">
                <HStack justify="space-between">
                  <Text fontWeight="semibold">メッセージ</Text>
                  <Icon as={LuMessageSquare} color="purple.600" />
                </HStack>
                <Text fontSize="3xl" fontWeight="bold" color="purple.600">
                  12
                </Text>
                <Text fontSize="sm" color="fg.muted">
                  件の未読メッセージ
                </Text>
              </Stack>
            </Card.Body>
          </Card.Root>

          <Card.Root>
            <Card.Body>
              <Stack gap="4">
                <HStack justify="space-between">
                  <Text fontWeight="semibold">総リーチ数</Text>
                  <Icon as={LuTrendingUp} color="purple.600" />
                </HStack>
                <Text fontSize="3xl" fontWeight="bold" color="purple.600">
                  1.2M
                </Text>
                <Text fontSize="sm" color="fg.muted">
                  フォロワーにリーチ
                </Text>
              </Stack>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>

        {/* Active Campaigns */}
        <Card.Root mb="8">
          <Card.Body>
            <HStack justify="space-between" mb="6">
              <Heading as="h2" size="md">
                対応中の案件
              </Heading>
              <ChakraLink asChild>
                <Link href="/company/campaigns">
                  <Text color="purple.600" fontSize="sm" fontWeight="medium">
                    すべての案件を見る →
                  </Text>
                </Link>
              </ChakraLink>
            </HStack>

            <Box overflowX="auto">
              <Table.Root>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>案件名</Table.ColumnHeader>
                    <Table.ColumnHeader>プラットフォーム</Table.ColumnHeader>
                    <Table.ColumnHeader>下書き提出</Table.ColumnHeader>
                    <Table.ColumnHeader>投稿日</Table.ColumnHeader>
                    <Table.ColumnHeader>報酬</Table.ColumnHeader>
                    <Table.ColumnHeader>ステータス</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {activeCampaigns.map((campaign) => (
                    <Table.Row key={campaign.id}>
                      <Table.Cell>
                        <ChakraLink asChild>
                          <Link href={`/company/campaigns/${campaign.id}`}>
                            <Text color="blue.600" fontWeight="medium">
                              {campaign.title}
                            </Text>
                          </Link>
                        </ChakraLink>
                      </Table.Cell>
                      <Table.Cell color="fg.muted">
                        {campaign.platform}
                      </Table.Cell>
                      <Table.Cell color="fg.muted">
                        {campaign.draftDeadline || "-"}
                      </Table.Cell>
                      <Table.Cell color="fg.muted">
                        {campaign.postDate || "-"}
                      </Table.Cell>
                      <Table.Cell color="fg.muted">
                        {campaign.budget}
                      </Table.Cell>
                      <Table.Cell>
                        <Badge variant="subtle" colorPalette="green">
                          募集中
                        </Badge>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Box>
          </Card.Body>
        </Card.Root>

        {/* Schedule */}
        <Card.Root>
          <Card.Body>
            <Heading as="h2" size="md" mb="6">
              今月のスケジュール
            </Heading>
            <VStack gap="4" align="stretch">
              {scheduleEvents.map((event) => (
                <Card.Root
                  key={event.id}
                  variant="outline"
                  _hover={{ bg: "gray.50" }}
                >
                  <Card.Body>
                    <HStack gap="4">
                      <Icon as={LuCalendar} color="purple.600" />
                      <Stack flex="1">
                        <HStack gap="2">
                          <Text fontWeight="medium">{event.title}</Text>
                          <Badge
                            variant="subtle"
                            colorPalette={
                              event.type === "下書き確認" ? "blue" : "green"
                            }
                          >
                            {event.type}
                          </Badge>
                        </HStack>
                        <HStack color="fg.muted" fontSize="sm">
                          <Icon as={LuClock} />
                          <Text>{event.date}</Text>
                        </HStack>
                      </Stack>
                    </HStack>
                  </Card.Body>
                </Card.Root>
              ))}

              {scheduleEvents.length === 0 && (
                <Box py="8" textAlign="center" color="fg.muted">
                  予定されているイベントはありません
                </Box>
              )}
            </VStack>
          </Card.Body>
        </Card.Root>
      </Container>
    </Box>
  );
}
