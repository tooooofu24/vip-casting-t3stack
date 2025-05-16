"use client";

import {
  type Campaign,
  type CampaignApplication,
} from "@/app/company/campaigns/mock";
import {
  Badge,
  Box,
  Button,
  Card,
  CloseButton,
  Dialog,
  HStack,
  Icon,
  IconButton,
  Image,
  List,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  LuCalendar,
  LuDollarSign,
  LuExternalLink,
  LuInstagram,
  LuMessageSquare,
  LuUser,
} from "react-icons/lu";

type Props = {
  campaign: Campaign;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const getStatusColor = (
  status: Campaign["status"] | CampaignApplication["status"],
) => {
  switch (status) {
    case "active":
    case "completed":
      return "green";
    case "pending":
      return "blue";
    case "accepted":
      return "purple";
    case "draft":
      return "gray";
    case "cancelled":
    case "rejected":
      return "red";
    default:
      return "gray";
  }
};

const getStatusText = (
  status: Campaign["status"] | CampaignApplication["status"],
) => {
  switch (status) {
    case "active":
      return "進行中";
    case "pending":
      return "申請中";
    case "accepted":
      return "契約済み";
    case "completed":
      return "完了";
    case "draft":
      return "下書き";
    case "cancelled":
      return "キャンセル";
    case "rejected":
      return "却下";
    default:
      return status;
  }
};

export function CampaignDetailsDialog({ campaign, open, onOpenChange }: Props) {
  return (
    <Dialog.Root
      lazyMount
      open={open}
      onOpenChange={(e) => onOpenChange(e.open)}
      size="xl"
      scrollBehavior="inside"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxWidth="container.xl">
            <Dialog.Body py={8}>
              <Stack gap={6}>
                {/* ヘッダー */}
                <Stack>
                  <HStack gap={4} mb={2}>
                    <Text fontSize="2xl" fontWeight="bold">
                      {campaign.title}
                    </Text>
                    <Badge
                      variant="subtle"
                      colorScheme={getStatusColor(campaign.status)}
                    >
                      {getStatusText(campaign.status)}
                    </Badge>
                  </HStack>
                  <HStack gap={4} color="gray.600">
                    <HStack gap={1}>
                      <Icon as={LuCalendar} />
                      <Text>
                        {campaign.startDate} 〜 {campaign.endDate}
                      </Text>
                    </HStack>
                    <HStack gap={1}>
                      <Icon as={LuDollarSign} />
                      <Text>{campaign.budget}</Text>
                    </HStack>
                    <HStack gap={1}>
                      <Icon as={LuInstagram} />
                      <Text>{campaign.platform}</Text>
                    </HStack>
                  </HStack>
                </Stack>

                {/* 案件内容 */}
                {campaign.description && (
                  <Stack gap={2}>
                    <Text fontSize="lg" fontWeight="bold">
                      案件内容
                    </Text>
                    <Text color="gray.600">{campaign.description}</Text>
                  </Stack>
                )}

                {/* 応募条件 */}
                {campaign.requirements && campaign.requirements.length > 0 && (
                  <Stack gap={2}>
                    <Text fontSize="lg" fontWeight="bold">
                      応募条件
                    </Text>
                    <List.Root
                      color="fg.muted"
                      gap={2}
                      listStyleType="disc"
                      listStylePosition="inside"
                    >
                      {campaign.requirements.map((req, index) => (
                        <List.Item key={index}>{req}</List.Item>
                      ))}
                    </List.Root>
                  </Stack>
                )}

                {/* 応募者一覧 */}
                <Stack gap={4}>
                  <Text fontSize="lg" fontWeight="bold">
                    応募者一覧
                  </Text>
                  {campaign.applications.length === 0 ? (
                    <Text textAlign="center" py={8} color="gray.500">
                      該当する応募者がいません。
                    </Text>
                  ) : (
                    campaign.applications.map((application) => (
                      <Card.Root key={application.id} variant="outline">
                        <Card.Body>
                          <HStack align="start" gap={4}>
                            <Box
                              boxSize={12}
                              rounded="full"
                              overflow="hidden"
                              flexShrink={0}
                              position="relative"
                            >
                              <Image
                                src={
                                  application.profileImage ||
                                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
                                }
                                alt={application.influencerName}
                                objectFit="cover"
                                w="full"
                                h="full"
                              />
                            </Box>

                            <Stack flex={1} minW={0}>
                              <HStack
                                justify="space-between"
                                align="start"
                                mb={2}
                              >
                                <Stack>
                                  <HStack gap={2}>
                                    <Text fontWeight="medium" color="gray.900">
                                      {application.influencerName}
                                    </Text>
                                    <Badge
                                      variant="subtle"
                                      colorScheme={getStatusColor(
                                        application.status,
                                      )}
                                    >
                                      {getStatusText(application.status)}
                                    </Badge>
                                  </HStack>
                                  <Text fontSize="sm" color="gray.500">
                                    応募日: {application.appliedAt}
                                  </Text>
                                </Stack>
                                <HStack gap={2}>
                                  <IconButton
                                    variant="ghost"
                                    rounded="full"
                                    aria-label="プロフィールを見る"
                                  >
                                    <LuUser />
                                  </IconButton>
                                  <IconButton
                                    variant="ghost"
                                    rounded="full"
                                    aria-label="メッセージを送る"
                                  >
                                    <LuMessageSquare />
                                  </IconButton>
                                  <IconButton
                                    variant="ghost"
                                    rounded="full"
                                    aria-label="SNSプロフィールを見る"
                                  >
                                    <LuExternalLink />
                                  </IconButton>
                                </HStack>
                              </HStack>

                              <HStack gap={4} mb={3} fontSize="sm">
                                <HStack>
                                  <Text color="gray.500">フォロワー:</Text>
                                  <Text fontWeight="medium">
                                    {application.followers?.toLocaleString()}人
                                  </Text>
                                </HStack>
                                {application.engagement && (
                                  <HStack>
                                    <Text color="gray.500">
                                      エンゲージメント率:
                                    </Text>
                                    <Text fontWeight="medium">
                                      {application.engagement}%
                                    </Text>
                                  </HStack>
                                )}
                              </HStack>

                              <Text color="gray.600" fontSize="sm" mb={4}>
                                {application.message}
                              </Text>

                              {application.status === "pending" && (
                                <HStack gap={2}>
                                  <Button size="sm" colorScheme="green">
                                    契約する
                                  </Button>
                                  <Button size="sm" colorScheme="red">
                                    却下する
                                  </Button>
                                </HStack>
                              )}

                              {application.status === "accepted" && (
                                <HStack gap={2}>
                                  <Button size="sm" colorScheme="blue">
                                    完了にする
                                  </Button>
                                </HStack>
                              )}
                            </Stack>
                          </HStack>
                        </Card.Body>
                      </Card.Root>
                    ))
                  )}
                </Stack>
              </Stack>
            </Dialog.Body>

            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
