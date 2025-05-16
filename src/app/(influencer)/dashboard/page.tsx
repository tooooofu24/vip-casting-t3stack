"use client";

import { MOCK_CAMPAIGNS } from "@/app/(influencer)/campaigns/mock";
import {
  Badge,
  Box,
  Card,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { type CampaignStatus } from "@prisma/client";
import { useState } from "react";
import { LuCalendar, LuStar, LuTrendingUp } from "react-icons/lu";
import CampaignDetailsDialog from "./(components)/CampaignDetailsDialog";

interface ScheduleEvent {
  id: number;
  date: string;
  title: string;
  type: string;
  campaignId: number;
}

const schedule: ScheduleEvent[] = [
  {
    id: 1,
    date: "2024-04-10",
    title: "Beauty Co. 商品レビュー投稿",
    type: "投稿",
    campaignId: 1,
  },
  {
    id: 2,
    date: "2024-04-15",
    title: "Fitness Lab ミーティング",
    type: "ミーティング",
    campaignId: 2,
  },
  {
    id: 3,
    date: "2024-04-20",
    title: "Fashion Brand X 撮影",
    type: "撮影",
    campaignId: 3,
  },
];

const statusConfig: Record<
  CampaignStatus,
  { colorPalette: string; label: string }
> = {
  DRAFT: { colorPalette: "gray", label: "下書き" },
  IN_PROGRESS: { colorPalette: "green", label: "進行中" },
  PENDING: { colorPalette: "yellow", label: "確認待ち" },
  COMPLETED: { colorPalette: "blue", label: "完了" },
  CANCELLED: { colorPalette: "red", label: "キャンセル" },
};

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Box py={6} px={6}>
      <Heading as="h1" fontSize="2xl" fontWeight="bold" mb={6}>
        ダッシュボード
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
        {/* Active Campaigns Card */}
        <Card.Root>
          <Card.Body p={6}>
            <Stack
              direction="row"
              justify="space-between"
              align="center"
              mb={4}
            >
              <Heading size="sm" fontWeight="semibold">
                対応中の案件
              </Heading>
              <Icon as={LuTrendingUp} color="purple.600" />
            </Stack>
            <Text fontSize="3xl" fontWeight="bold" color="purple.600" mb={2}>
              {MOCK_CAMPAIGNS.length}
            </Text>
            <Text fontSize="sm" color="gray.600">
              件の案件を実施中
            </Text>
          </Card.Body>
        </Card.Root>

        {/* Applied Campaigns Card */}
        <Card.Root>
          <Card.Body p={6}>
            <Stack
              direction="row"
              justify="space-between"
              align="center"
              mb={4}
            >
              <Heading size="sm" fontWeight="semibold">
                応募中の案件
              </Heading>
              <Icon as={LuCalendar} color="purple.600" />
            </Stack>
            <Text fontSize="3xl" fontWeight="bold" color="purple.600" mb={2}>
              {MOCK_CAMPAIGNS.length}
            </Text>
            <Text fontSize="sm" color="gray.600">
              件の案件に応募中
            </Text>
          </Card.Body>
        </Card.Root>

        {/* Average Rating Card */}
        <Card.Root>
          <Card.Body p={6}>
            <Stack
              direction="row"
              justify="space-between"
              align="center"
              mb={4}
            >
              <Heading size="sm" fontWeight="semibold">
                平均評価
              </Heading>
              <Icon as={LuStar} color="yellow.400" />
            </Stack>
            <Text fontSize="3xl" fontWeight="bold" color="yellow.400" mb={2}>
              4.8
            </Text>
            <Text fontSize="sm" color="gray.600">
              過去30日間の評価
            </Text>
          </Card.Body>
        </Card.Root>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
        {/* Active Campaigns List */}
        <Card.Root>
          <Card.Body p={6}>
            <Heading size="sm" fontWeight="semibold" mb={4}>
              対応中の案件
            </Heading>
            <VStack gap={4} align="stretch">
              {MOCK_CAMPAIGNS.map((campaign) => (
                <Box
                  key={campaign.id}
                  borderBottom="1px"
                  borderColor="gray.200"
                  _last={{ borderBottom: "none" }}
                  pb={4}
                  _hover={{ bg: "gray.50" }}
                  cursor="pointer"
                  transition="all 0.2s"
                  p={4}
                  rounded="lg"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Stack
                    direction="row"
                    justify="space-between"
                    align="start"
                    mb={2}
                  >
                    <Box>
                      <Text fontWeight="medium">{campaign.title}</Text>
                      <Text fontSize="sm" color="gray.600">
                        {campaign.companyId}
                      </Text>
                    </Box>
                    <Badge
                      size="sm"
                      variant="subtle"
                      colorPalette={statusConfig[campaign.status].colorPalette}
                    >
                      {statusConfig[campaign.status].label}
                    </Badge>
                  </Stack>
                  <Stack
                    direction="row"
                    align="center"
                    fontSize="sm"
                    color="gray.600"
                  >
                    <Icon as={LuCalendar} />
                    <Text>締切: {campaign.deadline.toLocaleDateString()}</Text>
                  </Stack>
                </Box>
              ))}
            </VStack>
          </Card.Body>
        </Card.Root>

        {/* Schedule */}
        <Card.Root>
          <Card.Body p={6}>
            <Heading size="sm" fontWeight="semibold" mb={4}>
              今月のスケジュール
            </Heading>
            <VStack gap={4} align="stretch">
              {schedule.map((event) => (
                <Stack
                  key={event.id}
                  direction="row"
                  gap={4}
                  _hover={{ bg: "gray.50" }}
                  cursor="pointer"
                  transition="all 0.2s"
                  p={4}
                  rounded="lg"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Icon as={LuCalendar} color="purple.600" flexShrink={0} />
                  <Box>
                    <Text fontWeight="medium">{event.title}</Text>
                    <Text fontSize="sm" color="gray.600">
                      {event.date} - {event.type}
                    </Text>
                  </Box>
                </Stack>
              ))}
            </VStack>
          </Card.Body>
        </Card.Root>
      </SimpleGrid>

      <CampaignDetailsDialog
        isOpen={isModalOpen}
        onClose={(e) => setIsModalOpen(e.open)}
        campaign={MOCK_CAMPAIGNS[0]!}
      />
    </Box>
  );
}
