"use client";

import { CampaignDetailsDialog } from "@/app/company/dashboard/campaigns/(components)/CampaignDetailsDialog";
import {
  mockCampaigns,
  type Campaign,
} from "@/app/company/dashboard/campaigns/mock";
import {
  Badge,
  Box,
  Button,
  Card,
  HStack,
  Icon,
  Input,
  InputGroup,
  NativeSelect,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import {
  LuCalendar,
  LuCheck,
  LuDollarSign,
  LuFileText,
  LuFlag,
  LuPlus,
  LuSearch,
  LuUsers,
} from "react-icons/lu";

const getStatusColor = (
  status: Campaign["status"] | Campaign["applications"][number]["status"],
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
  status: Campaign["status"] | Campaign["applications"][number]["status"],
) => {
  switch (status) {
    case "active":
      return "実施中";
    case "pending":
      return "審査中";
    case "accepted":
      return "承認済";
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

export default function CampaignManagementPage() {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign>(
    mockCampaigns[0] ?? ({} as Campaign),
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsDialogOpen(true);
  };

  return (
    <Box p="6">
      <Stack gap="6">
        {/* ヘッダー */}
        <HStack justify="space-between" align="center">
          <Text fontSize="2xl" fontWeight="bold">
            案件管理
          </Text>
          <HStack gap="4">
            <Link href="/influencer/dashboard/pr-listing/create">
              <Button>
                <Icon as={LuPlus} />
                案件を作成
              </Button>
            </Link>
            <Button variant="outline">
              <Icon as={LuFileText} />
              レポート出力
            </Button>
          </HStack>
        </HStack>

        {/* フィルター */}
        <Card.Root bg="white" rounded="lg" shadow="sm">
          <Card.Body>
            <Stack gap="0">
              <Stack direction={{ base: "column", md: "row" }} gap="4" mb="6">
                <Box position="relative" flex="1">
                  <InputGroup
                    startElement={<Icon as={LuSearch} color="fg.muted" />}
                  >
                    <Input placeholder="案件を検索" />
                  </InputGroup>
                </Box>

                <NativeSelect.Root w={{ base: "full", md: "auto" }}>
                  <NativeSelect.Field defaultValue="all">
                    <option value="all">すべてのステータス</option>
                    <option value="active">進行中</option>
                    <option value="draft">下書き</option>
                    <option value="completed">完了</option>
                    <option value="cancelled">中止</option>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              </Stack>

              {/* 案件リスト */}
              <Stack gap="4">
                {mockCampaigns.map((campaign) => (
                  <Card.Root key={campaign.id} variant="outline">
                    <Card.Body>
                      <Stack gap="6">
                        <HStack justify="space-between" align="start">
                          <Stack gap="1">
                            <HStack gap="2">
                              <Link
                                href={`/influencer/dashboard/campaigns/${campaign.id}`}
                              >
                                <Text fontSize="lg">{campaign.title}</Text>
                              </Link>
                              <Badge
                                variant="subtle"
                                colorScheme={getStatusColor(campaign.status)}
                              >
                                {getStatusText(campaign.status)}
                              </Badge>
                            </HStack>
                            <HStack gap="4" color="fg.muted">
                              <HStack gap="1">
                                <Icon as={LuCalendar} />
                                <Text>
                                  {campaign.startDate} 〜 {campaign.endDate}
                                </Text>
                              </HStack>
                              <HStack gap="1">
                                <Icon as={LuDollarSign} />
                                <Text>{campaign.budget}</Text>
                              </HStack>
                              <Text>{campaign.platform}</Text>
                            </HStack>
                          </Stack>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenDialog(campaign)}
                          >
                            編集
                          </Button>
                        </HStack>

                        {/* ステータスカード */}
                        <SimpleGrid columns={4} gap="4">
                          <Card.Root
                            variant="outline"
                            cursor="pointer"
                            onClick={() => handleOpenDialog(campaign)}
                            _hover={{
                              bg: "gray.50",
                              borderColor: "gray.200",
                            }}
                          >
                            <Card.Body>
                              <HStack justify="space-between" mb="2">
                                <Text color="fg.muted">全体</Text>
                                <Icon as={LuFileText} color="fg.muted" />
                              </HStack>
                              <Text fontSize="2xl" fontWeight="bold">
                                {campaign.applications.length}
                                <Text
                                  as="span"
                                  fontSize="sm"
                                  color="fg.muted"
                                  ml="1"
                                >
                                  人
                                </Text>
                              </Text>
                            </Card.Body>
                          </Card.Root>

                          <Card.Root
                            variant="outline"
                            cursor="pointer"
                            _hover={{
                              bg: "purple.50",
                              borderColor: "purple.200",
                            }}
                          >
                            <Card.Body>
                              <HStack justify="space-between" mb="2">
                                <Text color="fg.muted">応募</Text>
                                <Icon as={LuUsers} color="purple.600" />
                              </HStack>
                              <Text fontSize="2xl" fontWeight="bold">
                                {
                                  campaign.applications.filter(
                                    (app) => app.status === "pending",
                                  ).length
                                }
                                <Text
                                  as="span"
                                  fontSize="sm"
                                  color="fg.muted"
                                  ml="1"
                                >
                                  人
                                </Text>
                              </Text>
                            </Card.Body>
                          </Card.Root>

                          <Card.Root
                            variant="outline"
                            cursor="pointer"
                            _hover={{
                              bg: "green.50",
                              borderColor: "green.200",
                            }}
                          >
                            <Card.Body>
                              <HStack justify="space-between" mb="2">
                                <Text color="fg.muted">契約済み</Text>
                                <Icon as={LuCheck} color="green.600" />
                              </HStack>
                              <Text fontSize="2xl" fontWeight="bold">
                                {
                                  campaign.applications.filter(
                                    (app) => app.status === "accepted",
                                  ).length
                                }
                                <Text
                                  as="span"
                                  fontSize="sm"
                                  color="fg.muted"
                                  ml="1"
                                >
                                  人
                                </Text>
                              </Text>
                            </Card.Body>
                          </Card.Root>

                          <Card.Root
                            variant="outline"
                            cursor="pointer"
                            _hover={{
                              bg: "blue.50",
                              borderColor: "blue.200",
                            }}
                          >
                            <Card.Body>
                              <HStack justify="space-between" mb="2">
                                <Text color="fg.muted">完了</Text>
                                <Icon as={LuFlag} color="blue.600" />
                              </HStack>
                              <Text fontSize="2xl" fontWeight="bold">
                                {
                                  campaign.applications.filter(
                                    (app) => app.status === "completed",
                                  ).length
                                }
                                <Text
                                  as="span"
                                  fontSize="sm"
                                  color="fg.muted"
                                  ml="1"
                                >
                                  人
                                </Text>
                              </Text>
                            </Card.Body>
                          </Card.Root>
                        </SimpleGrid>
                      </Stack>
                    </Card.Body>
                  </Card.Root>
                ))}
              </Stack>
            </Stack>
          </Card.Body>
        </Card.Root>
      </Stack>

      <CampaignDetailsDialog
        campaign={selectedCampaign}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </Box>
  );
}
