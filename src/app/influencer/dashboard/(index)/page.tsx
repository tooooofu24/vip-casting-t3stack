"use client";

import CampaignDetailsDialog from "@/app/influencer/dashboard/(index)/(components)/CampaignDetailsDialog";
import { api } from "@/lib/trpc/react";
import {
  Badge,
  Box,
  Card,
  Heading,
  Icon,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuCalendar, LuStar, LuTrendingUp } from "react-icons/lu";

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

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: campaignsData, isLoading } =
    api.influencer.campaigns.getCampaigns.useQuery({ limit: 10 });

  return (
    <Box>
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
              {isLoading ? (
                <Spinner size="sm" />
              ) : (
                (campaignsData?.campaigns.length ?? 0)
              )}
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
              {isLoading ? (
                <Spinner size="sm" />
              ) : (
                (campaignsData?.campaigns.length ?? 0)
              )}
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
              {isLoading ? (
                <Spinner />
              ) : (
                campaignsData?.campaigns.slice(0, 5).map((campaign) => (
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
                      </Box>
                      <Badge size="sm" variant="subtle" colorPalette="green">
                        募集中
                      </Badge>
                    </Stack>
                    <Stack
                      direction="row"
                      align="center"
                      fontSize="sm"
                      color="gray.600"
                    >
                      <Icon as={LuCalendar} />
                      <Text>
                        締切:{" "}
                        {campaign.applicationDue
                          ? new Date(
                              campaign.applicationDue,
                            ).toLocaleDateString("ja-JP")
                          : "未定"}
                      </Text>
                    </Stack>
                  </Box>
                ))
              )}
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
        onClose={(e: { open: boolean }) => setIsModalOpen(e.open)}
        campaign={campaignsData?.campaigns[0] ?? null}
      />
    </Box>
  );
}
